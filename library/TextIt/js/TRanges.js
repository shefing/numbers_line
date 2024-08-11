"use strict";

var TRange = function (from, to) {
  this.set(from, to);
}
//-------------------------------------------------------
TRange.prototype.set = function (from, to) {
  this.from = from;
  this.to = to;
}
//-------------------------------------------------------
TRange.prototype.clone = function () {
  return new TRange(this.from, this.to);
}
//-------------------------------------------------------
TRange.prototype.serialize = function () {
  return [this.from, this.to];
}
//-------------------------------------------------------
var TRanges = function (serializedState) {
  this.array = [];
  if (serializedState !== undefined) {
    var ar = this.array;
    for (var i = 0; i < serializedState.length; i++) {
      var range = new TRange(serializedState[i][0], serializedState[i][1]);
      if (ar.length == 0 || range.from > ar[ar.length - 1].to)
        ar.push(range);
      else {
        // on the right track the following code should never be reached 'cause the ranges should be sorted...
        for (var j = 0; j < ar.length; j++) {
          if (range.to < ar[j].from) {
            ar.splice(j, 0, range);
            break;
          }
        }
      }
    }
  }
}
//-------------------------------------------------------
TRanges.prototype.addRange = function (range) {
  if (range == null) {
    return;
  }
  range = range.clone();
  var overlappedRanges = [];
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].from <= range.to && this.array[i].to >= range.from) {
      overlappedRanges.push(i);
      range.from = Math.min(range.from, this.array[i].from);
      range.to = Math.max(range.to, this.array[i].to);
    }
  }
  for (var i = overlappedRanges.length - 1; i >= 0; i--) {
    this.array.splice(overlappedRanges[i], 1);
  }
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].from > range.from) {
      this.array.splice(i, 0, range);
      return;
    }
  }
  this.array.push(range);
}
//-------------------------------------------------------
TRanges.prototype.removeRange = function (range) {
  if (range == null) {
    return;
  }
  for (var i = 0; i < this.array.length; i++) {
    var r = this.array[i];
    if (r.from >= range.from && r.to <= range.to) {
      this.array.splice(i, 1);
      i -= 1;
    }
    else if (r.from < range.from && r.to >= range.from) {
      if (range.to < r.to) {
        this.array.splice(i + 1, 0, new TRange(range.to + 1, r.to));
        i += 1;
      }
      r.to = range.from - 1;
    }
    else if (r.to > range.to) {
      if (range.to >= r.from) {
        r.from = range.to + 1;
      }
      return;
    } 
  }
}
//-------------------------------------------------------
TRanges.prototype.findDifferences = function (ranges) {
  var diff = {
    add: [],
    remove: []
  };
  var ranges1 = this.array;
  var ranges2 = ranges.array;
  var value = 0;
  var rangeIdx1 = 0;
  var rangeIdx2 = 0;

  var range1Active = false;
  var range1Start = false;
  var range1End = false;
  var range2Active = false;
  var range2Start = false;
  var range2End = false;

  while (true) {
    if (range1Active) {
      if (ranges1[rangeIdx1].to < value) {
        rangeIdx1++;
        range1Active = false;
      }
    }
    if (!range1Active) {
      if ((rangeIdx1 < ranges1.length) && (ranges1[rangeIdx1].from == value)) {
        range1Active = true;
      }
    }
    range1Start = (range1Active && (ranges1[rangeIdx1].from == value));
    range1End = (range1Active && (ranges1[rangeIdx1].to == value));

    if (range2Active) {
      if (ranges2[rangeIdx2].to < value) {
        rangeIdx2++;
        range2Active = false;
      }
    }
    if (!range2Active) {
      if ((rangeIdx2 < ranges2.length) && (ranges2[rangeIdx2].from == value)) {
        range2Active = true;
      }
    }
    range2Start = (range2Active && (ranges2[rangeIdx2].from == value));
    range2End = (range2Active && (ranges2[rangeIdx2].to == value));

    if (range1Start && !range2Active) {
      diff.remove.push({ from: { value: value, beforeHereAfter: 0 } });
    }
    if (range1Start && range2Active && !range2Start) {
      var addIndex = diff.add.length - 1;
      diff.add[addIndex].to = { value: value, beforeHereAfter: -1 };
    }
    if (range2Start && !range1Active) {
      diff.add.push({ from: { value: value, beforeHereAfter: 0 } });
    }
    if (range2Start && range1Active && !range1Start) {
      var removeIndex = diff.remove.length - 1;
      diff.remove[removeIndex].to = { value: value, beforeHereAfter: -1 };
    }
    if (range1End && range2Active && !range2End) {
      diff.add.push({ from: { value: value, beforeHereAfter: 1 } });
    }
    if (range1End && !range2Active) {
      var removeIndex = diff.remove.length - 1;
      diff.remove[removeIndex].to = { value: value, beforeHereAfter: 0 };
    }
    if (range2End && range1Active && !range1End) {
      diff.remove.push({ from: { value: value, beforeHereAfter: 1 } });
    }
    if (range2End && !range1Active) {
      var addIndex = diff.add.length - 1;
      diff.add[addIndex].to = { value: value, beforeHereAfter: 0 };
    }

    if (rangeIdx1 == ranges1.length && rangeIdx2 == ranges2.length) {
      return diff;
    }
    value++;
  }
}
//-------------------------------------------------------
TRanges.prototype.findChanges = function (ranges) {
  var added = [];
  var removed = [];
  var unchanged = [];

  function hasRange(rangesArray, range) {
    for (var markIndex = 0; markIndex < rangesArray.length; markIndex++)
      if (rangesArray[markIndex].from == range.from && rangesArray[markIndex].to == range.to)
        return true;
    return false;
  }

  var range;
  for (var i = 0; i < ranges.array.length; i++) {
    if (hasRange(this.array, ranges.array[i])) unchanged.push(ranges.array[i]);
    else added.push(ranges.array[i]);
  }
  // find removed ranges (ones that no longer exist in their previous form)
  for (var i = 0; i < this.array.length; i++) {
    range = this.array[i];
    if (!hasRange(unchanged, range) && // if range isn't in unchanged 
        !hasRange(added, range)) { // or in added, it was removed
      removed.push(range);
    }
  }
  return { added: added, removed: removed, unchanged: unchanged }
}
//-------------------------------------------------------
TRanges.prototype.findRange = function (value) {
  for (var i = 0; i < this.array.length; i++) {
    if (value >= this.array[i].from && value <= this.array[i].to) {
      return {
        range: this.array[i],
        index: i
      };
    }
  }
  return null;
}
//-------------------------------------------------------
TRanges.prototype.clone = function () {
  var cloneRanges = [];
  for (var i = 0; i < this.array.length; i++) {
    cloneRanges.push(this.array[i].clone());
  }
  var clone = new TRanges();
  clone.array = cloneRanges;
  return clone;
}
//-------------------------------------------------------
TRanges.prototype.get = function () {
  return this.ranges;
}
//-------------------------------------------------------
TRanges.prototype.serialize = function () {
  var state = [];
  for (var i = 0; i < this.array.length; i++) {
    state.push(this.array[i].serialize());
  }
  return state;
}
//-------------------------------------------------------
