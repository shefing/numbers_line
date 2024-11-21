/*!

 handlebars v1.2.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
var Handlebars = (function() {
// handlebars/safe-string.js
var __module4__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module3__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  /*jshint -W004 */
  var SafeString = __dependency1__;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr] || "&amp;";
  }

  function extend(obj, value) {
    for(var key in value) {
      if(Object.prototype.hasOwnProperty.call(value, key)) {
        obj[key] = value[key];
      }
    }
  }

  __exports__.extend = extend;var toString = Object.prototype.toString;
  __exports__.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  var isFunction;
  __exports__.isFunction = isFunction;
  var isArray = Array.isArray || function(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  };
  __exports__.isArray = isArray;

  function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (!string && string !== 0) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;
  return __exports__;
})(__module4__);

// handlebars/exception.js
var __module5__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(/* message */) {
    var tmp = Error.prototype.constructor.apply(this, arguments);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module2__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "1.2.0";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 4;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '>= 1.0.0'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var isArray = Utils.isArray,
      isFunction = Utils.isFunction,
      toString = Utils.toString,
      objectType = '[object Object]';

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn, inverse) {
      if (toString.call(name) === objectType) {
        if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        if (inverse) { fn.not = inverse; }
        this.helpers[name] = fn;
      }
    },

    registerPartial: function(name, str) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = str;
      }
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(arg) {
      if(arguments.length === 2) {
        return undefined;
      } else {
        throw new Error("Missing helper: '" + arg + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse || function() {}, fn = options.fn;

      if (isFunction(context)) { context = context.call(this); }

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        return fn(context);
      }
    });

    instance.registerHelper('each', function(context, options) {
      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0);
              data.last  = (i === (context.length-1));
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) { 
                data.key = key; 
                data.index = i;
                data.first = (i === 0);
              }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      if (!Utils.isEmpty(context)) return options.fn(context);
    });

    instance.registerHelper('log', function(context, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, context);
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, obj) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, obj);
        }
      }
    }
  };
  __exports__.logger = logger;
  function log(level, obj) { logger.log(level, obj); }

  __exports__.log = log;var createFrame = function(object) {
    var obj = {};
    Utils.extend(obj, object);
    return obj;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module3__, __module5__);

// handlebars/runtime.js
var __module6__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Error("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Error("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    if (!env) {
      throw new Error("No environment passed to template");
    }

    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as psuedo-supported APIs.
    var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
      var result = env.VM.invokePartial.apply(this, arguments);
      if (result != null) { return result; }

      if (env.compile) {
        var options = { helpers: helpers, partials: partials, data: data };
        partials[name] = env.compile(partial, { data: data !== undefined }, env);
        return partials[name](context, options);
      } else {
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      }
    };

    // Just add water
    var container = {
      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = {};
          Utils.extend(ret, common);
          Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: env.VM.programWithDepth,
      noop: env.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var namespace = options.partial ? options : env,
          helpers,
          partials;

      if (!options.partial) {
        helpers = options.helpers;
        partials = options.partials;
      }
      var result = templateSpec.call(
            container,
            namespace, context,
            helpers,
            partials,
            options.data);

      if (!options.partial) {
        env.VM.checkRevision(container.compilerInfo);
      }

      return result;
    };
  }

  __exports__.template = template;function programWithDepth(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var prog = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    prog.program = i;
    prog.depth = args.length;
    return prog;
  }

  __exports__.programWithDepth = programWithDepth;function program(i, fn, data) {
    var prog = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    prog.program = i;
    prog.depth = 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;
  return __exports__;
})(__module3__, __module5__, __module2__);

// handlebars.runtime.js
var __module1__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module2__, __module4__, __module5__, __module3__, __module6__);

// handlebars/compiler/ast.js
var __module7__ = (function(__dependency1__) {
  "use strict";
  var __exports__;
  var Exception = __dependency1__;

  var AST = {
    ProgramNode: function(statements, inverseStrip, inverse) {
      this.type = "program";
      this.statements = statements;
      this.strip = {};

      if(inverse) {
        this.inverse = new AST.ProgramNode(inverse, inverseStrip);
        this.strip.right = inverseStrip.left;
      } else if (inverseStrip) {
        this.strip.left = inverseStrip.right;
      }
    },

    MustacheNode: function(rawParams, hash, open, strip) {
      this.type = "mustache";
      this.hash = hash;
      this.strip = strip;

      // Open may be a string parsed from the parser or a passed boolean flag
      if (open != null && open.charAt) {
        // Must use charAt to support IE pre-10
        var escapeFlag = open.charAt(3) || open.charAt(2);
        this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
      } else {
        this.escaped = !!open;
      }

      var id = this.id = rawParams[0];
      var params = this.params = rawParams.slice(1);

      // a mustache is an eligible helper if:
      // * its id is simple (a single part, not `this` or `..`)
      var eligibleHelper = this.eligibleHelper = id.isSimple;

      // a mustache is definitely a helper if:
      // * it is an eligible helper, and
      // * it has at least one parameter or hash segment
      this.isHelper = eligibleHelper && (params.length || hash);

      // if a mustache is an eligible helper but not a definite
      // helper, it is ambiguous, and will be resolved in a later
      // pass or at runtime.
    },

    PartialNode: function(partialName, context, strip) {
      this.type         = "partial";
      this.partialName  = partialName;
      this.context      = context;
      this.strip = strip;
    },

    BlockNode: function(mustache, program, inverse, close) {
      if(mustache.id.original !== close.path.original) {
        throw new Exception(mustache.id.original + " doesn't match " + close.path.original);
      }

      this.type = "block";
      this.mustache = mustache;
      this.program  = program;
      this.inverse  = inverse;

      this.strip = {
        left: mustache.strip.left,
        right: close.strip.right
      };

      (program || inverse).strip.left = mustache.strip.right;
      (inverse || program).strip.right = close.strip.left;

      if (inverse && !program) {
        this.isInverse = true;
      }
    },

    ContentNode: function(string) {
      this.type = "content";
      this.string = string;
    },

    HashNode: function(pairs) {
      this.type = "hash";
      this.pairs = pairs;
    },

    IdNode: function(parts) {
      this.type = "ID";

      var original = "",
          dig = [],
          depth = 0;

      for(var i=0,l=parts.length; i<l; i++) {
        var part = parts[i].part;
        original += (parts[i].separator || '') + part;

        if (part === ".." || part === "." || part === "this") {
          if (dig.length > 0) { throw new Exception("Invalid path: " + original); }
          else if (part === "..") { depth++; }
          else { this.isScoped = true; }
        }
        else { dig.push(part); }
      }

      this.original = original;
      this.parts    = dig;
      this.string   = dig.join('.');
      this.depth    = depth;

      // an ID is simple if it only has one part, and that part is not
      // `..` or `this`.
      this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

      this.stringModeValue = this.string;
    },

    PartialNameNode: function(name) {
      this.type = "PARTIAL_NAME";
      this.name = name.original;
    },

    DataNode: function(id) {
      this.type = "DATA";
      this.id = id;
    },

    StringNode: function(string) {
      this.type = "STRING";
      this.original =
        this.string =
        this.stringModeValue = string;
    },

    IntegerNode: function(integer) {
      this.type = "INTEGER";
      this.original =
        this.integer = integer;
      this.stringModeValue = Number(integer);
    },

    BooleanNode: function(bool) {
      this.type = "BOOLEAN";
      this.bool = bool;
      this.stringModeValue = bool === "true";
    },

    CommentNode: function(comment) {
      this.type = "comment";
      this.comment = comment;
    }
  };

  // Must be exported as an object rather than the root of the module as the jison lexer
  // most modify the object to operate properly.
  __exports__ = AST;
  return __exports__;
})(__module5__);

// handlebars/compiler/parser.js
var __module9__ = (function() {
  "use strict";
  var __exports__;
  /* jshint ignore:start */
  /* Jison generated parser */
  var handlebars = (function(){
  var parser = {trace: function trace() { },
  yy: {},
  symbols_: {"error":2,"root":3,"statements":4,"EOF":5,"program":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"partial_option0":27,"inMustache_repetition0":28,"inMustache_option0":29,"dataName":30,"param":31,"STRING":32,"INTEGER":33,"BOOLEAN":34,"hash":35,"hash_repetition_plus0":36,"hashSegment":37,"ID":38,"EQUALS":39,"DATA":40,"pathSegments":41,"SEP":42,"$accept":0,"$end":1},
  terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",38:"ID",39:"EQUALS",40:"DATA",42:"SEP"},
  productions_: [0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[35,1],[37,3],[26,1],[26,1],[26,1],[30,2],[21,1],[41,3],[41,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[36,1],[36,2]],
  performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

  var $0 = $$.length - 1;
  switch (yystate) {
  case 1: return new yy.ProgramNode($$[$0-1]); 
  break;
  case 2: return new yy.ProgramNode([]); 
  break;
  case 3:this.$ = new yy.ProgramNode([], $$[$0-1], $$[$0]);
  break;
  case 4:this.$ = new yy.ProgramNode($$[$0-2], $$[$0-1], $$[$0]);
  break;
  case 5:this.$ = new yy.ProgramNode($$[$0-1], $$[$0], []);
  break;
  case 6:this.$ = new yy.ProgramNode($$[$0]);
  break;
  case 7:this.$ = new yy.ProgramNode([]);
  break;
  case 8:this.$ = new yy.ProgramNode([]);
  break;
  case 9:this.$ = [$$[$0]];
  break;
  case 10: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
  break;
  case 11:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0]);
  break;
  case 12:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0]);
  break;
  case 13:this.$ = $$[$0];
  break;
  case 14:this.$ = $$[$0];
  break;
  case 15:this.$ = new yy.ContentNode($$[$0]);
  break;
  case 16:this.$ = new yy.CommentNode($$[$0]);
  break;
  case 17:this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2], stripFlags($$[$0-2], $$[$0]));
  break;
  case 18:this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2], stripFlags($$[$0-2], $$[$0]));
  break;
  case 19:this.$ = {path: $$[$0-1], strip: stripFlags($$[$0-2], $$[$0])};
  break;
  case 20:this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2], stripFlags($$[$0-2], $$[$0]));
  break;
  case 21:this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], $$[$0-2], stripFlags($$[$0-2], $$[$0]));
  break;
  case 22:this.$ = new yy.PartialNode($$[$0-2], $$[$0-1], stripFlags($$[$0-3], $$[$0]));
  break;
  case 23:this.$ = stripFlags($$[$0-1], $$[$0]);
  break;
  case 24:this.$ = [[$$[$0-2]].concat($$[$0-1]), $$[$0]];
  break;
  case 25:this.$ = [[$$[$0]], null];
  break;
  case 26:this.$ = $$[$0];
  break;
  case 27:this.$ = new yy.StringNode($$[$0]);
  break;
  case 28:this.$ = new yy.IntegerNode($$[$0]);
  break;
  case 29:this.$ = new yy.BooleanNode($$[$0]);
  break;
  case 30:this.$ = $$[$0];
  break;
  case 31:this.$ = new yy.HashNode($$[$0]);
  break;
  case 32:this.$ = [$$[$0-2], $$[$0]];
  break;
  case 33:this.$ = new yy.PartialNameNode($$[$0]);
  break;
  case 34:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0]));
  break;
  case 35:this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0]));
  break;
  case 36:this.$ = new yy.DataNode($$[$0]);
  break;
  case 37:this.$ = new yy.IdNode($$[$0]);
  break;
  case 38: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
  break;
  case 39:this.$ = [{part: $$[$0]}];
  break;
  case 42:this.$ = [];
  break;
  case 43:$$[$0-1].push($$[$0]);
  break;
  case 46:this.$ = [$$[$0]];
  break;
  case 47:$$[$0-1].push($$[$0]);
  break;
  }
  },
  table: [{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,38:[1,28],40:[1,27],41:26},{17:29,21:24,30:25,38:[1,28],40:[1,27],41:26},{17:30,21:24,30:25,38:[1,28],40:[1,27],41:26},{17:31,21:24,30:25,38:[1,28],40:[1,27],41:26},{21:33,26:32,32:[1,34],33:[1,35],38:[1,28],41:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,38:[1,28],40:[1,27],41:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,42],24:[2,42],28:43,32:[2,42],33:[2,42],34:[2,42],38:[2,42],40:[2,42]},{18:[2,25],24:[2,25]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],38:[2,37],40:[2,37],42:[1,44]},{21:45,38:[1,28],41:26},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],38:[2,39],40:[2,39],42:[2,39]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,40],21:50,27:49,38:[1,28],41:26},{18:[2,33],38:[2,33]},{18:[2,34],38:[2,34]},{18:[2,35],38:[2,35]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,38:[1,28],41:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,44],21:56,24:[2,44],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:55,36:61,37:62,38:[1,63],40:[1,27],41:26},{38:[1,64]},{18:[2,36],24:[2,36],32:[2,36],33:[2,36],34:[2,36],38:[2,36],40:[2,36]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,65]},{18:[2,41]},{18:[1,66]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24]},{18:[2,43],24:[2,43],32:[2,43],33:[2,43],34:[2,43],38:[2,43],40:[2,43]},{18:[2,45],24:[2,45]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],38:[2,26],40:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],38:[2,27],40:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],38:[2,28],40:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],38:[2,29],40:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],38:[2,30],40:[2,30]},{18:[2,31],24:[2,31],37:67,38:[1,68]},{18:[2,46],24:[2,46],38:[2,46]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],38:[2,39],39:[1,69],40:[2,39],42:[2,39]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],38:[2,38],40:[2,38],42:[2,38]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{18:[2,47],24:[2,47],38:[2,47]},{39:[1,69]},{21:56,30:60,31:70,32:[1,57],33:[1,58],34:[1,59],38:[1,28],40:[1,27],41:26},{18:[2,32],24:[2,32],38:[2,32]}],
  defaultActions: {3:[2,2],16:[2,1],50:[2,41]},
  parseError: function parseError(str, hash) {
      throw new Error(str);
  },
  parse: function parse(input) {
      var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      this.lexer.setInput(input);
      this.lexer.yy = this.yy;
      this.yy.lexer = this.lexer;
      this.yy.parser = this;
      if (typeof this.lexer.yylloc == "undefined")
          this.lexer.yylloc = {};
      var yyloc = this.lexer.yylloc;
      lstack.push(yyloc);
      var ranges = this.lexer.options && this.lexer.options.ranges;
      if (typeof this.yy.parseError === "function")
          this.parseError = this.yy.parseError;
      function popStack(n) {
          stack.length = stack.length - 2 * n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
      }
      function lex() {
          var token;
          token = self.lexer.lex() || 1;
          if (typeof token !== "number") {
              token = self.symbols_[token] || token;
          }
          return token;
      }
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
              action = this.defaultActions[state];
          } else {
              if (symbol === null || typeof symbol == "undefined") {
                  symbol = lex();
              }
              action = table[state] && table[state][symbol];
          }
          if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                  expected = [];
                  for (p in table[state])
                      if (this.terminals_[p] && p > 2) {
                          expected.push("'" + this.terminals_[p] + "'");
                      }
                  if (this.lexer.showPosition) {
                      errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                  } else {
                      errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                  }
                  this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
              }
          }
          if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
          }
          switch (action[0]) {
          case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0)
                      recovering--;
              } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
              }
              break;
          case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
              if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
              if (typeof r !== "undefined") {
                  return r;
              }
              if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
          case 3:
              return true;
          }
      }
      return true;
  }
  };


  function stripFlags(open, close) {
    return {
      left: open.charAt(2) === '~',
      right: close.charAt(0) === '~' || close.charAt(1) === '~'
    };
  }

  /* Jison generated lexer */
  var lexer = (function(){
  var lexer = ({EOF:1,
  parseError:function parseError(str, hash) {
          if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
          } else {
              throw new Error(str);
          }
      },
  setInput:function (input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
          if (this.options.ranges) this.yylloc.range = [0,0];
          this.offset = 0;
          return this;
      },
  input:function () {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
          } else {
              this.yylloc.last_column++;
          }
          if (this.options.ranges) this.yylloc.range[1]++;

          this._input = this._input.slice(1);
          return ch;
      },
  unput:function (ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
          //this.yyleng -= len;
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length-1);
          this.matched = this.matched.substr(0, this.matched.length-1);

          if (lines.length-1) this.yylineno -= lines.length-1;
          var r = this.yylloc.range;

          this.yylloc = {first_line: this.yylloc.first_line,
            last_line: this.yylineno+1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
                this.yylloc.first_column - len
            };

          if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          return this;
      },
  more:function () {
          this._more = true;
          return this;
      },
  less:function (n) {
          this.unput(this.match.slice(n));
      },
  pastInput:function () {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
      },
  upcomingInput:function () {
          var next = this.match;
          if (next.length < 20) {
              next += this._input.substr(0, 20-next.length);
          }
          return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
      },
  showPosition:function () {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c+"^";
      },
  next:function () {
          if (this.done) {
              return this.EOF;
          }
          if (!this._input) this.done = true;

          var token,
              match,
              tempMatch,
              index,
              col,
              lines;
          if (!this._more) {
              this.yytext = '';
              this.match = '';
          }
          var rules = this._currentRules();
          for (var i=0;i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                  match = tempMatch;
                  index = i;
                  if (!this.options.flex) break;
              }
          }
          if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {first_line: this.yylloc.last_line,
                             last_line: this.yylineno+1,
                             first_column: this.yylloc.last_column,
                             last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                  this.yylloc.range = [this.offset, this.offset += this.yyleng];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return;
          }
          if (this._input === "") {
              return this.EOF;
          } else {
              return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                      {text: "", token: null, line: this.yylineno});
          }
      },
  lex:function lex() {
          var r = this.next();
          if (typeof r !== 'undefined') {
              return r;
          } else {
              return this.lex();
          }
      },
  begin:function begin(condition) {
          this.conditionStack.push(condition);
      },
  popState:function popState() {
          return this.conditionStack.pop();
      },
  _currentRules:function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
      },
  topState:function () {
          return this.conditionStack[this.conditionStack.length-2];
      },
  pushState:function begin(condition) {
          this.begin(condition);
      }});
  lexer.options = {};
  lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {


  function strip(start, end) {
    return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
  }


  var YYSTATE=YY_START
  switch($avoiding_name_collisions) {
  case 0:
                                     if(yy_.yytext.slice(-2) === "\\\\") {
                                       strip(0,1);
                                       this.begin("mu");
                                     } else if(yy_.yytext.slice(-1) === "\\") {
                                       strip(0,1);
                                       this.begin("emu");
                                     } else {
                                       this.begin("mu");
                                     }
                                     if(yy_.yytext) return 14;
                                   
  break;
  case 1:return 14;
  break;
  case 2:
                                     this.popState();
                                     return 14;
                                   
  break;
  case 3:strip(0,4); this.popState(); return 15;
  break;
  case 4:return 25;
  break;
  case 5:return 16;
  break;
  case 6:return 20;
  break;
  case 7:return 19;
  break;
  case 8:return 19;
  break;
  case 9:return 23;
  break;
  case 10:return 22;
  break;
  case 11:this.popState(); this.begin('com');
  break;
  case 12:strip(3,5); this.popState(); return 15;
  break;
  case 13:return 22;
  break;
  case 14:return 39;
  break;
  case 15:return 38;
  break;
  case 16:return 38;
  break;
  case 17:return 42;
  break;
  case 18:// ignore whitespace
  break;
  case 19:this.popState(); return 24;
  break;
  case 20:this.popState(); return 18;
  break;
  case 21:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 32;
  break;
  case 22:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 32;
  break;
  case 23:return 40;
  break;
  case 24:return 34;
  break;
  case 25:return 34;
  break;
  case 26:return 33;
  break;
  case 27:return 38;
  break;
  case 28:yy_.yytext = strip(1,2); return 38;
  break;
  case 29:return 'INVALID';
  break;
  case 30:return 5;
  break;
  }
  };
  lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s])))/,/^(?:false(?=([~}\s])))/,/^(?:-?[0-9]+(?=([~}\s])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
  lexer.conditions = {"mu":{"rules":[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[3],"inclusive":false},"INITIAL":{"rules":[0,1,30],"inclusive":true}};
  return lexer;})()
  parser.lexer = lexer;
  function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
  return new Parser;
  })();__exports__ = handlebars;
  /* jshint ignore:end */
  return __exports__;
})();

// handlebars/compiler/base.js
var __module8__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var parser = __dependency1__;
  var AST = __dependency2__;

  __exports__.parser = parser;

  function parse(input) {
    // Just return if an already-compile AST was passed in.
    if(input.constructor === AST.ProgramNode) { return input; }

    parser.yy = AST;
    return parser.parse(input);
  }

  __exports__.parse = parse;
  return __exports__;
})(__module9__, __module7__);

// handlebars/compiler/javascript-compiler.js
var __module11__ = (function(__dependency1__) {
  "use strict";
  var __exports__;
  var COMPILER_REVISION = __dependency1__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency1__.REVISION_CHANGES;
  var log = __dependency1__.log;

  function Literal(value) {
    this.value = value;
  }

  function JavaScriptCompiler() {}

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(parent, name /* , type*/) {
      var wrap,
          ret;
      if (parent.indexOf('depth') === 0) {
        wrap = true;
      }

      if (/^[0-9]+$/.test(name)) {
        ret = parent + "[" + name + "]";
      } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        ret = parent + "." + name;
      }
      else {
        ret = parent + "['" + name + "']";
      }

      if (wrap) {
        return '(' + parent + ' && ' + ret + ')';
      } else {
        return ret;
      }
    },

    compilerInfo: function() {
      var revision = COMPILER_REVISION,
          versions = REVISION_CHANGES[revision];
      return "this.compilerInfo = ["+revision+",'"+versions+"'];\n";
    },

    appendToBuffer: function(string) {
      if (this.environment.isSimple) {
        return "return " + string + ";";
      } else {
        return {
          appendToBuffer: true,
          content: string,
          toString: function() { return "buffer += " + string + ";"; }
        };
      }
    },

    initializeBuffer: function() {
      return this.quotedString("");
    },

    namespace: "Handlebars",
    // END PUBLIC API

    compile: function(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options || {};

      log('debug', this.environment.disassemble() + "\n\n");

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        programs: [],
        environments: [],
        aliases: { }
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];
      this.registers = { list: [] };
      this.compileStack = [];
      this.inlineStack = [];

      this.compileChildren(environment, options);

      var opcodes = environment.opcodes, opcode;

      this.i = 0;

      for(var l=opcodes.length; this.i<l; this.i++) {
        opcode = opcodes[this.i];

        if(opcode.opcode === 'DECLARE') {
          this[opcode.name] = opcode.value;
        } else {
          this[opcode.opcode].apply(this, opcode.args);
        }

        // Reset the stripNext flag if it was not set by this operation.
        if (opcode.opcode !== this.stripNext) {
          this.stripNext = false;
        }
      }

      // Flush any trailing content that might be pending.
      this.pushSource('');

      return this.createFunctionContext(asObject);
    },

    preamble: function() {
      var out = [];

      if (!this.isChild) {
        var namespace = this.namespace;

        var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
        if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
        if (this.options.data) { copies = copies + " data = data || {};"; }
        out.push(copies);
      } else {
        out.push('');
      }

      if (!this.environment.isSimple) {
        out.push(", buffer = " + this.initializeBuffer());
      } else {
        out.push("");
      }

      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = out;
    },

    createFunctionContext: function(asObject) {
      var locals = this.stackVars.concat(this.registers.list);

      if(locals.length > 0) {
        this.source[1] = this.source[1] + ", " + locals.join(", ");
      }

      // Generate minimizer alias mappings
      if (!this.isChild) {
        for (var alias in this.context.aliases) {
          if (this.context.aliases.hasOwnProperty(alias)) {
            this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
          }
        }
      }

      if (this.source[1]) {
        this.source[1] = "var " + this.source[1].substring(2) + ";";
      }

      // Merge children
      if (!this.isChild) {
        this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
      }

      if (!this.environment.isSimple) {
        this.pushSource("return buffer;");
      }

      var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

      for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
        params.push("depth" + this.environment.depths.list[i]);
      }

      // Perform a second pass over the output to merge content when possible
      var source = this.mergeSource();

      if (!this.isChild) {
        source = this.compilerInfo()+source;
      }

      if (asObject) {
        params.push(source);

        return Function.apply(this, params);
      } else {
        var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
        log('debug', functionSource + "\n\n");
        return functionSource;
      }
    },
    mergeSource: function() {
      // WARN: We are not handling the case where buffer is still populated as the source should
      // not have buffer append operations as their final action.
      var source = '',
          buffer;
      for (var i = 0, len = this.source.length; i < len; i++) {
        var line = this.source[i];
        if (line.appendToBuffer) {
          if (buffer) {
            buffer = buffer + '\n    + ' + line.content;
          } else {
            buffer = line.content;
          }
        } else {
          if (buffer) {
            source += 'buffer += ' + buffer + ';\n  ';
            buffer = undefined;
          }
          source += line + '\n  ';
        }
      }
      return source;
    },

    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      this.replaceStack(function(current) {
        params.splice(1, 0, current);
        return "blockHelperMissing.call(" + params.join(", ") + ")";
      });
    },

    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      var current = this.topStack();
      params.splice(1, 0, current);

      // Use the options value generated from the invocation
      params[params.length-1] = 'options';

      this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
    },

    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(content) {
      if (this.pendingContent) {
        content = this.pendingContent + content;
      }
      if (this.stripNext) {
        content = content.replace(/^\s+/, '');
      }

      this.pendingContent = content;
    },

    // [strip]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Removes any trailing whitespace from the prior content node and flags
    // the next operation for stripping if it is a content node.
    strip: function() {
      if (this.pendingContent) {
        this.pendingContent = this.pendingContent.replace(/\s+$/, '');
      }
      this.stripNext = 'strip';
    },

    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      // Force anything that is inlined onto the stack so we don't have duplication
      // when we examine local
      this.flushInline();
      var local = this.popStack();
      this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
      if (this.environment.isSimple) {
        this.pushSource("else { " + this.appendToBuffer("''") + " }");
      }
    },

    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      this.context.aliases.escapeExpression = 'this.escapeExpression';

      this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
    },

    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(depth) {
      if(this.lastContext !== depth) {
        this.lastContext = depth;
      }
    },

    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(name) {
      this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
    },

    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral('depth' + this.lastContext);
    },

    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.context.aliases.functionType = '"function"';

      this.replaceStack(function(current) {
        return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
      });
    },

    // [lookup]
    //
    // On stack, before: value, ...
    // On stack, after: value[name], ...
    //
    // Replace the value on the stack with the result of looking
    // up `name` on `value`
    lookup: function(name) {
      this.replaceStack(function(current) {
        return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
      });
    },

    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function() {
      this.push('data');
    },

    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(string, type) {
      this.pushStackLiteral('depth' + this.lastContext);

      this.pushString(type);

      if (typeof string === 'string') {
        this.pushString(string);
      } else {
        this.pushStackLiteral(string);
      }
    },

    emptyHash: function() {
      this.pushStackLiteral('{}');

      if (this.options.stringParams) {
        this.register('hashTypes', '{}');
        this.register('hashContexts', '{}');
      }
    },
    pushHash: function() {
      this.hash = {values: [], types: [], contexts: []};
    },
    popHash: function() {
      var hash = this.hash;
      this.hash = undefined;

      if (this.options.stringParams) {
        this.register('hashContexts', '{' + hash.contexts.join(',') + '}');
        this.register('hashTypes', '{' + hash.types.join(',') + '}');
      }
      this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
    },

    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(string) {
      this.pushStackLiteral(this.quotedString(string));
    },

    // [push]
    //
    // On stack, before: ...
    // On stack, after: expr, ...
    //
    // Push an expression onto the stack
    push: function(expr) {
      this.inlineStack.push(expr);
      return expr;
    },

    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(value) {
      this.pushStackLiteral(value);
    },

    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },

    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(paramSize, name) {
      this.context.aliases.helperMissing = 'helpers.helperMissing';

      var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

      this.push(helper.name + ' || ' + nonHelper);
      this.replaceStack(function(name) {
        return name + ' ? ' + name + '.call(' +
            helper.callParams + ") " + ": helperMissing.call(" +
            helper.helperMissingParams + ")";
      });
    },

    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(paramSize, name) {
      var helper = this.setupHelper(paramSize, name);
      this.push(helper.name + ".call(" + helper.callParams + ")");
    },

    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(name, helperCall) {
      this.context.aliases.functionType = '"function"';

      this.pushStackLiteral('{}');    // Hash value
      var helper = this.setupHelper(0, name, helperCall);

      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
      var nextStack = this.nextStack();

      this.pushSource('if (' + nextStack + ' = ' + helperName + ') { ' + nextStack + ' = ' + nextStack + '.call(' + helper.callParams + '); }');
      this.pushSource('else { ' + nextStack + ' = ' + nonHelper + '; ' + nextStack + ' = typeof ' + nextStack + ' === functionType ? ' + nextStack + '.call(' + helper.callParams + ') : ' + nextStack + '; }');
    },

    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(name) {
      var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

      if (this.options.data) {
        params.push("data");
      }

      this.context.aliases.self = "this";
      this.push("self.invokePartial(" + params.join(", ") + ")");
    },

    // [assignToHash]
    //
    // On stack, before: value, hash, ...
    // On stack, after: hash, ...
    //
    // Pops a value and hash off the stack, assigns `hash[key] = value`
    // and pushes the hash back onto the stack.
    assignToHash: function(key) {
      var value = this.popStack(),
          context,
          type;

      if (this.options.stringParams) {
        type = this.popStack();
        context = this.popStack();
      }

      var hash = this.hash;
      if (context) {
        hash.contexts.push("'" + key + "': " + context);
      }
      if (type) {
        hash.types.push("'" + key + "': " + type);
      }
      hash.values.push("'" + key + "': (" + value + ")");
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function(environment, options) {
      var children = environment.children, child, compiler;

      for(var i=0, l=children.length; i<l; i++) {
        child = children[i];
        compiler = new this.compiler();

        var index = this.matchExistingProgram(child);

        if (index == null) {
          this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
          index = this.context.programs.length;
          child.index = index;
          child.name = 'program' + index;
          this.context.programs[index] = compiler.compile(child, options, this.context);
          this.context.environments[index] = child;
        } else {
          child.index = index;
          child.name = 'program' + index;
        }
      }
    },
    matchExistingProgram: function(child) {
      for (var i = 0, len = this.context.environments.length; i < len; i++) {
        var environment = this.context.environments[i];
        if (environment && environment.equals(child)) {
          return i;
        }
      }
    },

    programExpression: function(guid) {
      this.context.aliases.self = "this";

      if(guid == null) {
        return "self.noop";
      }

      var child = this.environment.children[guid],
          depths = child.depths.list, depth;

      var programParams = [child.index, child.name, "data"];

      for(var i=0, l = depths.length; i<l; i++) {
        depth = depths[i];

        if(depth === 1) { programParams.push("depth0"); }
        else { programParams.push("depth" + (depth - 1)); }
      }

      return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
    },

    register: function(name, val) {
      this.useRegister(name);
      this.pushSource(name + " = " + val + ";");
    },

    useRegister: function(name) {
      if(!this.registers[name]) {
        this.registers[name] = true;
        this.registers.list.push(name);
      }
    },

    pushStackLiteral: function(item) {
      return this.push(new Literal(item));
    },

    pushSource: function(source) {
      if (this.pendingContent) {
        this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
        this.pendingContent = undefined;
      }

      if (source) {
        this.source.push(source);
      }
    },

    pushStack: function(item) {
      this.flushInline();

      var stack = this.incrStack();
      if (item) {
        this.pushSource(stack + " = " + item + ";");
      }
      this.compileStack.push(stack);
      return stack;
    },

    replaceStack: function(callback) {
      var prefix = '',
          inline = this.isInline(),
          stack;

      // If we are currently inline then we want to merge the inline statement into the
      // replacement statement via ','
      if (inline) {
        var top = this.popStack(true);

        if (top instanceof Literal) {
          // Literals do not need to be inlined
          stack = top.value;
        } else {
          // Get or create the current stack name for use by the inline
          var name = this.stackSlot ? this.topStackName() : this.incrStack();

          prefix = '(' + this.push(name) + ' = ' + top + '),';
          stack = this.topStack();
        }
      } else {
        stack = this.topStack();
      }

      var item = callback.call(this, stack);

      if (inline) {
        if (this.inlineStack.length || this.compileStack.length) {
          this.popStack();
        }
        this.push('(' + prefix + item + ')');
      } else {
        // Prevent modification of the context depth variable. Through replaceStack
        if (!/^stack/.test(stack)) {
          stack = this.nextStack();
        }

        this.pushSource(stack + " = (" + prefix + item + ");");
      }
      return stack;
    },

    nextStack: function() {
      return this.pushStack();
    },

    incrStack: function() {
      this.stackSlot++;
      if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
      return this.topStackName();
    },
    topStackName: function() {
      return "stack" + this.stackSlot;
    },
    flushInline: function() {
      var inlineStack = this.inlineStack;
      if (inlineStack.length) {
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            this.pushStack(entry);
          }
        }
      }
    },
    isInline: function() {
      return this.inlineStack.length;
    },

    popStack: function(wrapped) {
      var inline = this.isInline(),
          item = (inline ? this.inlineStack : this.compileStack).pop();

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        if (!inline) {
          this.stackSlot--;
        }
        return item;
      }
    },

    topStack: function(wrapped) {
      var stack = (this.isInline() ? this.inlineStack : this.compileStack),
          item = stack[stack.length - 1];

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        return item;
      }
    },

    quotedString: function(str) {
      return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
        .replace(/\u2029/g, '\\u2029') + '"';
    },

    setupHelper: function(paramSize, name, missingParams) {
      var params = [];
      this.setupParams(paramSize, params, missingParams);
      var foundHelper = this.nameLookup('helpers', name, 'helper');

      return {
        params: params,
        name: foundHelper,
        callParams: ["depth0"].concat(params).join(", "),
        helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
      };
    },

    // the params and contexts arguments are passed in arrays
    // to fill in
    setupParams: function(paramSize, params, useRegister) {
      var options = [], contexts = [], types = [], param, inverse, program;

      options.push("hash:" + this.popStack());

      inverse = this.popStack();
      program = this.popStack();

      // Avoid setting fn and inverse if neither are set. This allows
      // helpers to do a check for `if (options.fn)`
      if (program || inverse) {
        if (!program) {
          this.context.aliases.self = "this";
          program = "self.noop";
        }

        if (!inverse) {
         this.context.aliases.self = "this";
          inverse = "self.noop";
        }

        options.push("inverse:" + inverse);
        options.push("fn:" + program);
      }

      for(var i=0; i<paramSize; i++) {
        param = this.popStack();
        params.push(param);

        if(this.options.stringParams) {
          types.push(this.popStack());
          contexts.push(this.popStack());
        }
      }

      if (this.options.stringParams) {
        options.push("contexts:[" + contexts.join(",") + "]");
        options.push("types:[" + types.join(",") + "]");
        options.push("hashContexts:hashContexts");
        options.push("hashTypes:hashTypes");
      }

      if(this.options.data) {
        options.push("data:data");
      }

      options = "{" + options.join(",") + "}";
      if (useRegister) {
        this.register('options', options);
        params.push('options');
      } else {
        params.push(options);
      }
      return params.join(", ");
    }
  };

  var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for(var i=0, l=reservedWords.length; i<l; i++) {
    compilerWords[reservedWords[i]] = true;
  }

  JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
    if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
      return true;
    }
    return false;
  };

  __exports__ = JavaScriptCompiler;
  return __exports__;
})(__module2__);

// handlebars/compiler/compiler.js
var __module10__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__) {
  "use strict";
  var __exports__ = {};
  var Exception = __dependency1__;
  var parse = __dependency2__.parse;
  var JavaScriptCompiler = __dependency3__;
  var AST = __dependency4__;

  function Compiler() {}

  __exports__.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
  // function in a context. This is necessary for mustache compatibility, which
  // requires that context functions in blocks are evaluated by blockHelperMissing,
  // and then proceed as if the resulting value was provided to blockHelperMissing.

  Compiler.prototype = {
    compiler: Compiler,

    disassemble: function() {
      var opcodes = this.opcodes, opcode, out = [], params, param;

      for (var i=0, l=opcodes.length; i<l; i++) {
        opcode = opcodes[i];

        if (opcode.opcode === 'DECLARE') {
          out.push("DECLARE " + opcode.name + "=" + opcode.value);
        } else {
          params = [];
          for (var j=0; j<opcode.args.length; j++) {
            param = opcode.args[j];
            if (typeof param === "string") {
              param = "\"" + param.replace("\n", "\\n") + "\"";
            }
            params.push(param);
          }
          out.push(opcode.opcode + " " + params.join(" "));
        }
      }

      return out.join("\n");
    },

    equals: function(other) {
      var len = this.opcodes.length;
      if (other.opcodes.length !== len) {
        return false;
      }

      for (var i = 0; i < len; i++) {
        var opcode = this.opcodes[i],
            otherOpcode = other.opcodes[i];
        if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
          return false;
        }
        for (var j = 0; j < opcode.args.length; j++) {
          if (opcode.args[j] !== otherOpcode.args[j]) {
            return false;
          }
        }
      }

      len = this.children.length;
      if (other.children.length !== len) {
        return false;
      }
      for (i = 0; i < len; i++) {
        if (!this.children[i].equals(other.children[i])) {
          return false;
        }
      }

      return true;
    },

    guid: 0,

    compile: function(program, options) {
      this.opcodes = [];
      this.children = [];
      this.depths = {list: []};
      this.options = options;

      // These changes will propagate to the other compiler components
      var knownHelpers = this.options.knownHelpers;
      this.options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true
      };
      if (knownHelpers) {
        for (var name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
        }
      }

      return this.accept(program);
    },

    accept: function(node) {
      var strip = node.strip || {},
          ret;
      if (strip.left) {
        this.opcode('strip');
      }

      ret = this[node.type](node);

      if (strip.right) {
        this.opcode('strip');
      }

      return ret;
    },

    program: function(program) {
      var statements = program.statements;

      for(var i=0, l=statements.length; i<l; i++) {
        this.accept(statements[i]);
      }
      this.isSimple = l === 1;

      this.depths.list = this.depths.list.sort(function(a, b) {
        return a - b;
      });

      return this;
    },

    compileProgram: function(program) {
      var result = new this.compiler().compile(program, this.options);
      var guid = this.guid++, depth;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;

      for(var i=0, l=result.depths.list.length; i<l; i++) {
        depth = result.depths.list[i];

        if(depth < 2) { continue; }
        else { this.addDepth(depth - 1); }
      }

      return guid;
    },

    block: function(block) {
      var mustache = block.mustache,
          program = block.program,
          inverse = block.inverse;

      if (program) {
        program = this.compileProgram(program);
      }

      if (inverse) {
        inverse = this.compileProgram(inverse);
      }

      var type = this.classifyMustache(mustache);

      if (type === "helper") {
        this.helperMustache(mustache, program, inverse);
      } else if (type === "simple") {
        this.simpleMustache(mustache);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('blockValue');
      } else {
        this.ambiguousMustache(mustache, program, inverse);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('ambiguousBlockValue');
      }

      this.opcode('append');
    },

    hash: function(hash) {
      var pairs = hash.pairs, pair, val;

      this.opcode('pushHash');

      for(var i=0, l=pairs.length; i<l; i++) {
        pair = pairs[i];
        val  = pair[1];

        if (this.options.stringParams) {
          if(val.depth) {
            this.addDepth(val.depth);
          }
          this.opcode('getContext', val.depth || 0);
          this.opcode('pushStringParam', val.stringModeValue, val.type);
        } else {
          this.accept(val);
        }

        this.opcode('assignToHash', pair[0]);
      }
      this.opcode('popHash');
    },

    partial: function(partial) {
      var partialName = partial.partialName;
      this.usePartial = true;

      if(partial.context) {
        this.ID(partial.context);
      } else {
        this.opcode('push', 'depth0');
      }

      this.opcode('invokePartial', partialName.name);
      this.opcode('append');
    },

    content: function(content) {
      this.opcode('appendContent', content.string);
    },

    mustache: function(mustache) {
      var options = this.options;
      var type = this.classifyMustache(mustache);

      if (type === "simple") {
        this.simpleMustache(mustache);
      } else if (type === "helper") {
        this.helperMustache(mustache);
      } else {
        this.ambiguousMustache(mustache);
      }

      if(mustache.escaped && !options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },

    ambiguousMustache: function(mustache, program, inverse) {
      var id = mustache.id,
          name = id.parts[0],
          isBlock = program != null || inverse != null;

      this.opcode('getContext', id.depth);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      this.opcode('invokeAmbiguous', name, isBlock);
    },

    simpleMustache: function(mustache) {
      var id = mustache.id;

      if (id.type === 'DATA') {
        this.DATA(id);
      } else if (id.parts.length) {
        this.ID(id);
      } else {
        // Simplified ID for `this`
        this.addDepth(id.depth);
        this.opcode('getContext', id.depth);
        this.opcode('pushContext');
      }

      this.opcode('resolvePossibleLambda');
    },

    helperMustache: function(mustache, program, inverse) {
      var params = this.setupFullMustacheParams(mustache, program, inverse),
          name = mustache.id.parts[0];

      if (this.options.knownHelpers[name]) {
        this.opcode('invokeKnownHelper', params.length, name);
      } else if (this.options.knownHelpersOnly) {
        throw new Error("You specified knownHelpersOnly, but used the unknown helper " + name);
      } else {
        this.opcode('invokeHelper', params.length, name);
      }
    },

    ID: function(id) {
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);

      var name = id.parts[0];
      if (!name) {
        this.opcode('pushContext');
      } else {
        this.opcode('lookupOnContext', id.parts[0]);
      }

      for(var i=1, l=id.parts.length; i<l; i++) {
        this.opcode('lookup', id.parts[i]);
      }
    },

    DATA: function(data) {
      this.options.data = true;
      if (data.id.isScoped || data.id.depth) {
        throw new Exception('Scoped data references are not supported: ' + data.original);
      }

      this.opcode('lookupData');
      var parts = data.id.parts;
      for(var i=0, l=parts.length; i<l; i++) {
        this.opcode('lookup', parts[i]);
      }
    },

    STRING: function(string) {
      this.opcode('pushString', string.string);
    },

    INTEGER: function(integer) {
      this.opcode('pushLiteral', integer.integer);
    },

    BOOLEAN: function(bool) {
      this.opcode('pushLiteral', bool.bool);
    },

    comment: function() {},

    // HELPERS
    opcode: function(name) {
      this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
    },

    declare: function(name, value) {
      this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
    },

    addDepth: function(depth) {
      if(isNaN(depth)) { throw new Error("EWOT"); }
      if(depth === 0) { return; }

      if(!this.depths[depth]) {
        this.depths[depth] = true;
        this.depths.list.push(depth);
      }
    },

    classifyMustache: function(mustache) {
      var isHelper   = mustache.isHelper;
      var isEligible = mustache.eligibleHelper;
      var options    = this.options;

      // if ambiguous, we can possibly resolve the ambiguity now
      if (isEligible && !isHelper) {
        var name = mustache.id.parts[0];

        if (options.knownHelpers[name]) {
          isHelper = true;
        } else if (options.knownHelpersOnly) {
          isEligible = false;
        }
      }

      if (isHelper) { return "helper"; }
      else if (isEligible) { return "ambiguous"; }
      else { return "simple"; }
    },

    pushParams: function(params) {
      var i = params.length, param;

      while(i--) {
        param = params[i];

        if(this.options.stringParams) {
          if(param.depth) {
            this.addDepth(param.depth);
          }

          this.opcode('getContext', param.depth || 0);
          this.opcode('pushStringParam', param.stringModeValue, param.type);
        } else {
          this[param.type](param);
        }
      }
    },

    setupMustacheParams: function(mustache) {
      var params = mustache.params;
      this.pushParams(params);

      if(mustache.hash) {
        this.hash(mustache.hash);
      } else {
        this.opcode('emptyHash');
      }

      return params;
    },

    // this will replace setupMustacheParams when we're done
    setupFullMustacheParams: function(mustache, program, inverse) {
      var params = mustache.params;
      this.pushParams(params);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      if(mustache.hash) {
        this.hash(mustache.hash);
      } else {
        this.opcode('emptyHash');
      }

      return params;
    }
  };

  function precompile(input, options) {
    if (input == null || (typeof input !== 'string' && input.constructor !== AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
    }

    options = options || {};
    if (!('data' in options)) {
      options.data = true;
    }

    var ast = parse(input);
    var environment = new Compiler().compile(ast, options);
    return new JavaScriptCompiler().compile(environment, options);
  }

  __exports__.precompile = precompile;function compile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
    }

    options = options || {};

    if (!('data' in options)) {
      options.data = true;
    }

    var compiled;

    function compileInput() {
      var ast = parse(input);
      var environment = new Compiler().compile(ast, options);
      var templateSpec = new JavaScriptCompiler().compile(environment, options, undefined, true);
      return env.template(templateSpec);
    }

    // Template is only compiled on first use and cached after that point.
    return function(context, options) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled.call(this, context, options);
    };
  }

  __exports__.compile = compile;
  return __exports__;
})(__module5__, __module8__, __module11__, __module7__);

// handlebars.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var Handlebars = __dependency1__;

  // Compiler imports
  var AST = __dependency2__;
  var Parser = __dependency3__.parser;
  var parse = __dependency3__.parse;
  var Compiler = __dependency4__.Compiler;
  var compile = __dependency4__.compile;
  var precompile = __dependency4__.precompile;
  var JavaScriptCompiler = __dependency5__;

  var _create = Handlebars.create;
  var create = function() {
    var hb = _create();

    hb.compile = function(input, options) {
      return compile(input, options, hb);
    };
    hb.precompile = precompile;

    hb.AST = AST;
    hb.Compiler = Compiler;
    hb.JavaScriptCompiler = JavaScriptCompiler;
    hb.Parser = Parser;
    hb.parse = parse;

    return hb;
  };

  Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module7__, __module8__, __module10__, __module11__);

  return __module0__;
})();

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-shiv-cssclasses-teststyles-prefixes-load
 */
;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
(function () {

  var Content;
  var Stage;
  var App;
  var Audio;

  var Feedback = (function () {

    var jqElement = null;

    var jqElementSuccess = null;
    var jqElementFailure = null;

    var symbolSuccess = null;
    var symbolFailure = null;

    function restart() {
      if (jqElementFailure.is(':visible'))
        App.restart();
    }
    return {
      init: function () {

        Content = cet.dragndrop.Content;
        Stage = cet.dragndrop.Stage;
        App = cet.dragndrop.App;
        Audio = cet.dragndrop.Audio;

        if (!Content.getShowFinalFeedback())
          return;
        jqElement = $('.final-feedback');
        jqElement.css('z-index', 1000);
        jqElement.hide();

        jqElementSuccess = jqElement.find('.final-feedback-success');
        symbolSuccess = Stage.getSymbol(jqElementSuccess);

        jqElementFailure = jqElement.find('.final-feedback-failure');
        symbolFailure = Stage.getSymbol(jqElementFailure);

        jqElement.find('.button-feedback-close').on('click', Feedback.hide)
        jqElement.find('.try-again').on('click', restart);

        Stage.on('enterPress', restart);
        
      },
      showSuccess: function () {
        //logic removal of the success message 
        return;
        if (!jqElement || Feedback.isVisible())
          return;
        jqElement.show();

        if (jqElementSuccess.length == 0)
          return;
        jqElementFailure.hide();
        jqElementSuccess.show();

        if (symbolSuccess)
          symbolSuccess.play();

      },
      showFailure: function () {
        jqElement.show();
        jqElementSuccess.hide();
        jqElementFailure.show();
        symbolFailure.play();
        
      },
      hide: function () {

        if (!jqElement)
          return;
        if (!jqElementSuccess.is(':visible') && !jqElementFailure.is(':visible'))
          return;

        jqElement.hide();
        jqElementSuccess.hide();
        jqElementFailure.hide();
        Stage.trigger('hidefinalfeedback', self);
      },
      isVisible: function () {
        return jqElement && jqElement.is(':visible');
      }
    }
  })();

  cet.dragndrop.Feedback = Feedback;

})();

/// <reference path="App.js"/>
/// <reference path="xapi.js"/>
(function () {

  //#region meta declarations
  var Stage;
  var Buttons;
  var App;
  var Baskets;
  var Xapi;
  //#endregion

  var Host = (function () {

    var userInteractionAccurred = false;
    var isHostApiImplemented = false;
    function finishImplementingHostApi() {
      if (cet.content.lms.Activity.engagement.mode === 'review' || cet.content.lms.Activity.engagement.mode === 'browse_review') {
        App.showFeedback(true);
      }

      if (cet.content.lms.Activity.engagement.access === 'read') {
        App.setAsReadOnly();
      }

      Host.setExternalButtonsVisibility();

      cet.content.lms.Activity.bind('check', cet.content.lms.Activity.engagement.mode === 'normal' ? () => {} : outerCheckEventHandler);
      cet.content.lms.Activity.bind('reset', outerResetEventHandler);
      cet.content.lms.Activity.bind('showsolution', cet.content.lms.Activity.engagement.mode === 'normal' ? () => {} : outerShowSolutionEventHandler);

    }

    function isAnswered() {
      var bAns = false;
      var answers = cet.dragndrop.App.getFullAnswers();
      for (var key in answers) {
        if (answers[key]) {
          bAns = true;
          break;
        }
      }
      return bAns;
    }

    function outerCheckEventHandler() {
      cet.dragndrop.App.showFeedback();

      cet.content.lms.Activity.isAnswered(isAnswered());
      cet.content.lms.Activity.score(cet.dragndrop.App.getScore());
      Xapi.sendMessage(Xapi.actions.asked_check, cet.dragndrop.App.getScore(), cet.dragndrop.App.getScores(), cet.dragndrop.App.getFullAnswers());
    }

    function outerResetEventHandler() {
      cet.dragndrop.App.restart();
      userInteractionAccurred = false;
      cet.content.lms.Activity.isAnswered(false);
      cet.content.lms.Activity.score(0);
      Xapi.sendMessage(Xapi.actions.cleared, cet.dragndrop.App.getScore(), cet.dragndrop.App.getScores(), cet.dragndrop.App.getFullAnswers());
    }

    function outerShowSolutionEventHandler() {
      cet.dragndrop.App.showSolution();
      cet.content.lms.Activity.isAnswered(false);
      cet.content.lms.Activity.score(0);
      Xapi.sendMessage(Xapi.actions.asked_showAnswer, cet.dragndrop.App.getScore(), cet.dragndrop.App.getScores(), cet.dragndrop.App.getFullAnswers());
    }

    return {
      init: function () {
        //#region meta declarations
        Stage = cet.dragndrop.Stage;
        Buttons = cet.dragndrop.Buttons;
        App = cet.dragndrop.App;
        Baskets = cet.dragndrop.Baskets;
        Xapi = cet.dragndrop.Xapi;
        //#endregion

        cet.content.on('clientready', Host.implementHostApi);

      },
      implementHostApi: function () {
        if (isHostApiImplemented)
          return;
        isHostApiImplemented = true;
        if (cet.content.lms.Settings.supported && cet.content.lms.Activity.engagement.store === 'readwrite') {

          Stage.bind('dragended', function () {
            var trySendXapi = function () {  // sometime there are errors, because of the multitude of bags in the code.
              try {
                cet.content.lms.Activity.score(cet.dragndrop.App.getScore());
                Xapi.sendMessage(Xapi.actions.answered, cet.dragndrop.App.getScore(), cet.dragndrop.App.getScores(), cet.dragndrop.App.getFullAnswers());
                Host.save();
              } catch (e) {
                requestAnimationFrame(trySendXapi);
              }
            }
            trySendXapi();
          });
          Stage.bind('allbasketoptionsincorrectandreturnedtostorage', Host.save);

          cet.content.Messaging.getValue('isSilentSaveSupported', function (key, value) {
            var silentSaveOrDefault = null;
            if (value)
              silentSaveOrDefault = cet.dragndrop.Host.silentSave;
            else
              silentSaveOrDefault = cet.dragndrop.Host.save;

            Stage.bind('showsolution', silentSaveOrDefault);
            Stage.bind('showfeedback', silentSaveOrDefault);
            Stage.bind('removeallerrors', silentSaveOrDefault);
            Stage.bind('hidefinalfeedback', silentSaveOrDefault);
          });

        }

        if (cet.content.lms.Settings.supported) {

          if (Buttons.hideCheckButton)
            Buttons.hideCheckButton();
          if (Buttons.hideRestartButton)
            Buttons.hideRestartButton();

          if (cet.content.lms.Activity.engagement.mode === 'solved') {
            App.showSolution();
            finishImplementingHostApi();
            return;
          }

          if (cet.content.lms.Activity.engagement.store !== 'disabled') {
            cet.content.State.load(function (data) {
              App.restoreState(data);
              finishImplementingHostApi();
            });
          }
          else {
            finishImplementingHostApi();
          }

        }
      },
      silentSave: function () {

        if (cet.content.lms.Settings.supported) {

          if (cet.content.lms.Activity.engagement.store === 'readwrite') {
            var state = App.getState();
            if (!state)
              return;
            cet.content.State.silentSave(state);
          }
        }
      },
      save: function () {

        if (cet.content.lms.Settings.supported) {

          if (cet.content.lms.Activity.engagement.store === 'readwrite') {
            if (!userInteractionAccurred) {
              userInteractionAccurred = true;
              cet.content.lms.Activity.start();
              cet.content.lms.Activity.isAnswered(isAnswered());
            }
            var state = App.getState();
            if (!state)
              return;
            cet.content.State.save(state);
            var score = cet.dragndrop.App.getScore();
            cet.content.lms.Activity.score(score);
            cet.content.lms.Activity.isAnswered(isAnswered());

          }
        }
      },

      isBrowseMode: function () {
        return !cet.content.lms.Settings.supported || cet.content.lms.Activity.engagement.mode === 'browse';
      },

      setExternalButtonsVisibility: function () {
        cet.content.lms.Activity.settings.supportsCheck(true);
        cet.content.lms.Activity.settings.supportsRegenerate(false);
        cet.content.lms.Activity.settings.supportsReset(true);
        cet.content.lms.Activity.settings.supportsShowSolution(true);
        cet.content.lms.Activity.settings.supportsHostFullscreen(true);
      }
    };
  })();

  cet.dragndrop.Host = Host;

})();


(function () {

 var Preloader = (function () {
  var preloader = '<img src="data:image/gif;base64,R0lGODlhIAAgAPMAAP///wAAAMbGxoSEhLa2tpqamjY2NlZWVtjY2OTk5Ly8vB4eHgQEBAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQACgABACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQACgACACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkEAAoAAwAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkEAAoABAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAAKAAUALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAAKAAYALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQACgAHACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAAKAAgALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAAKAAkALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQACgAKACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkEAAoACwAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==">'
  var html = '<div id="cet-preloader" style="width:100%; height:100%; position: absolute; z-index:1111111; top: 0; left: 0; background-color:white; ">' +
              '<div style="width:32px; height:32px; position: fixed;  top: 50%;  left: 50%;  margin-top: -16px;  margin-left: -16px;">' + preloader + '</div>' +
             '</div>';

  return {
  
   show: function () {
    
    $('body').append( html );
   },
   hide: function () {
    
    var tmp = $('#cet-preloader');
    tmp.fadeOut(100, tmp.remove);
    
   },
   waitOneSecAndHide: function () {
    setTimeout(Preloader.hide, 1000);
   }
   

  }
 })();


 cet.dragndrop.Preloader = Preloader;

})();


var draggable = (function () {
  function draggable(element, containment) {
    this._disabled = false;
    var self = this;
    self.$element = $(element);
    self.$containment = $(containment);
    self.$document = $(document);

    self.setScaledDimentions();

    function containmetMouseLeaveHandler() {
      if (!self.pDown)
        return;
      self.$element.trigger('mouseup');
    }

    function mouseUpHandler(event) {
      
      if (self.endDelayed)
        return;
      if (self._disabled)
        return;
      
      event.preventDefault();

      self.pDown = null;
      var pointer = self.getPointer(event);
      //support old binding
      if (self._end)
        self.end(pointer);

      if (self.moving) {
        self.moving = false;
        //new binding
        self.$element.trigger('dragend', pointer);
      }
      self.endDelayed = true;
      setTimeout(function () {
        self.startDelayed = false;
      }, 800);
    }

    function mouseMoveHandler(eMove) {
      if (self._disabled)
        return;
      //support old binding
      if (!self.pDown)
        return;
      
      
      if (self.beforeMove) {
        self.beforeMove = false;
        self.moving = true;
        //new binding
        self.$element.trigger('dragstart', pMove);
      }

      eMove.preventDefault();

      var pMove = self.getPointer(eMove);
      var delta = { top: pMove.pageY - self.pDown.pageY, left: pMove.pageX - self.pDown.pageX };

      delta.top = delta.top / self.scale();
      delta.left = delta.left / self.scale();

      var newPosition = { top: self.startPosition.top + delta.top, left: self.startPosition.left + delta.left };

      if (newPosition.top < self.containmentBoundries.top)
        newPosition.top = self.containmentBoundries.top;

      if (newPosition.left < self.containmentBoundries.left)
        newPosition.left = self.containmentBoundries.left;

      if (newPosition.left > self.containmentBoundries.right)
        newPosition.left = self.containmentBoundries.right;

      if (newPosition.top > self.containmentBoundries.bottom)
        newPosition.top = self.containmentBoundries.bottom;

      newPosition.top += 'px';
      newPosition.left += 'px';
      self.$element.css(newPosition);
      //support old binding
      if (self._move)
        self.move(pMove);
      //new binding
      self.$element.trigger('dragmove', pMove);
    }

    function mouseStartHandler(eDown) {
      
      if (self.startDelayed){
        return;
      }
      if (self._disabled){
        return;
      }
      if (self.pDown) {
        return;
        
      }

      eDown.preventDefault();

      self.startDelayed = true;
      self.endDelayed = false;
      self.beforeMove = true;

      var parentOffset = self.$element.parent().offset();
      var containmentOffset = self.$containment.offset();
      var elementBorderWidth = parseInt(self.$element.css('border-left-width').replace('px', ''));

      self.containmentBoundries = {
        top: containmentOffset.top - parentOffset.top,
        left: containmentOffset.left - parentOffset.left,
        bottom: containmentOffset.top + self.containmentHeight - parentOffset.top - self.elementHeight - 2 - elementBorderWidth,
        right: containmentOffset.left + self.containmentWidth - parentOffset.left - self.elementWidth - 2 - elementBorderWidth
      };

      self.containmentBoundries.top = self.containmentBoundries.top / self.scale();
      self.containmentBoundries.left = self.containmentBoundries.left / self.scale();
      self.containmentBoundries.bottom = self.containmentBoundries.bottom / self.scale();
      self.containmentBoundries.right = self.containmentBoundries.right / self.scale();

      self.pDown = self.getPointer(eDown);
      self.startPosition = self.$element.position();
      self.startPosition.top = self.startPosition.top / self.scale();
      self.startPosition.left = self.startPosition.left / self.scale();

      if (self._start)
        self.start(eDown);

    }

    self.$element.on('mousedown touchstart', mouseStartHandler);

    self.$document.on('mousemove touchmove', mouseMoveHandler);

    self.$element.on('mouseup touchend', mouseUpHandler);

    self.$containment.on('mouseleave', containmetMouseLeaveHandler);
  }
  draggable.prototype.setScaledDimentions = function () {
    var self = this;
    self.elementWidth = self.$element.width() * self.scale();
    self.elementHeight = self.$element.height() * self.scale();

    self.containmentWidth = self.$containment.width() * self.scale();
    self.containmentHeight = self.$containment.height() * self.scale();
  };
  draggable.prototype.disable = function () {
    this._disabled = true;
  };
  draggable.prototype.enable = function () {
    this._disabled = false;
  };

  draggable.prototype.getPointer = function (event) {
    var pointer;
    if (!event.originalEvent)
      return null;
    if (event.originalEvent.changedTouches && event.originalEvent.changedTouches.length)
      pointer = event.originalEvent.changedTouches[0];
    else if (event.originalEvent.touches && event.originalEvent.touches.length)
      pointer = event.originalEvent.touches[0];
    else
      pointer = event;

    return {
      pageX: pointer.pageX,
      pageY: pointer.pageY
    };
  };
  draggable.prototype.scale = function () {
    var scale = 1;

    if (cet.dragndrop.Stage) {
      if (cet.dragndrop.Stage.scale) {
        scale = cet.dragndrop.Stage.scale();
      }
    }
    return scale;
  };
  draggable.prototype.on = function (eventName, method) {
    var self = this;
    self.$element.on(eventName, method)
  }
  Object.defineProperty(draggable.prototype, "start", {
    get: function () {
      return this._start;
    },
    set: function (val) {
      this._start = val;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(draggable.prototype, "end", {
    get: function () {
      return this._end;
    },
    set: function (val) {
      this._end = val;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(draggable.prototype, "move", {
    get: function () {
      return this._move;
    },
    set: function (val) {
      this._move = val;
    },
    enumerable: true,
    configurable: true
  });
  return draggable;
})();

var cet;
(function (cet) {
    (function (Units) {
        var percentage = (function () {
            function percentage($element) {
                this;
                this._$element = $element;
            }
            Object.defineProperty(percentage.prototype, "width", {
                get: function () {
                    var sWidth = this._$element[0].style.width;
                    if (sWidth.indexOf('%') != -1)
                        return parseFloat(sWidth.replace('%', ''));
                    var nPixelWidth = parseFloat(sWidth.replace('px', ''));
                    var nParentPixelWidth = this._$element.parent().width();

                    return (nPixelWidth / nParentPixelWidth) * 100;
                },
                set: function (val) {
                    this._$element.css('width', val + '%');
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(percentage.prototype, "height", {
                get: function () {
                    var sHeight = this._$element[0].style.height;
                    if (sHeight.indexOf('%') != -1)
                        return parseFloat(sHeight.replace('%', ''));
                    var nPixelHeight = parseFloat(sHeight.replace('px', ''));
                    var nParentPixelHeight = this._$element.parent().height();

                    return (nPixelHeight / nParentPixelHeight) * 100;
                },
                set: function (val) {
                    this._$element.css('height', val + '%');
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(percentage.prototype, "left", {
                get: function () {
                    var sLeft = this._$element[0].style.left;
                    if (sLeft.indexOf('%') != -1)
                        return parseFloat(sLeft.replace('%', ''));
                    var nPixelLeft = parseFloat(sLeft.replace('px', ''));
                    var nParentPixelWidth = this._$element.parent().width();

                    return (nPixelLeft / nParentPixelWidth) * 100;
                },
                set: function (val) {
                    this._$element.css('left', val + '%');
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(percentage.prototype, "top", {
                get: function () {
                    var sTop = this._$element[0].style.top;
                    if (sTop.indexOf('%') != -1)
                        return parseFloat(sTop.replace('%', ''));
                    var nPixelTop = parseFloat(sTop.replace('px', ''));
                    var nParentPixelHeight = this._$element.parent().height();

                    return (nPixelTop / nParentPixelHeight) * 100;
                },
                set: function (val) {
                    this._$element.css('top', val + '%');
                },
                enumerable: true,
                configurable: true
            });
            return percentage;
        })();
        Units.percentage = percentage;

        var pixel = (function () {
            function pixel($element) {
                this._$element = $element;
            }
            Object.defineProperty(pixel.prototype, "width", {
                get: function () {
                    return this._$element.width();
                },
                set: function (val) {
                    this._$element.width(val);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "height", {
                get: function () {
                    return this._$element.height();
                },
                set: function (val) {
                    this._$element.height(val);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "top", {
                get: function () {
                    return parseInt(this._$element.css('top'));
                },
                set: function (val) {
                    this._$element.css('top', val);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "left", {
                get: function () {
                    return parseInt(this._$element.css('left'));
                },
                set: function (val) {
                    this._$element.css('left', val);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "right", {
                get: function () {
                    return parseInt(this.left + this.width);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(pixel.prototype, "bottom", {
                get: function () {
                    return parseInt(this.top + this.height);
                },
                enumerable: true,
                configurable: true
            });
            return pixel;
        })();
        Units.pixel = pixel;

        var units = (function () {
            function units($element) {
                this._percentage = new Units.percentage($element);
                this._pixel = new Units.pixel($element);
                this._$element = $element;
            }
            units.prototype.switchToPercentage = function () {
                var size = {
                    width: this._percentage.width + '%',
                    height: this._percentage.height + '%'
                };
                this._$element.css(size);
            };
            Object.defineProperty(units.prototype, "percentage", {
                get: function () {
                    return this._percentage;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(units.prototype, "pixel", {
                get: function () {
                    return this._pixel;
                },
                enumerable: true,
                configurable: true
            });
            return units;
        })();
        Units.units = units;

        (function (Utils) {
            function percentageToPixel(percentage, entirePixels) {
                percentage = typeof percentage == 'string' ? parseFloat(percentage.replace('%', '')) : percentage;
                entirePixels = typeof entirePixels == 'string' ? parseFloat(entirePixels.replace('px', '')) : entirePixels;

                return (percentage / 100) * entirePixels;
            }
            Utils.percentageToPixel = percentageToPixel;

            function percentageToPixel(percentage, entirePixels) {
                percentage = typeof percentage == 'string' ? parseFloat(percentage.replace('%', '')) : percentage;
                entirePixels = typeof entirePixels == 'string' ? parseFloat(entirePixels.replace('px', '')) : entirePixels;

                return (percentage / 100) * entirePixels;
            }
            Utils.percentageToPixel = percentageToPixel;
        })(Units.Utils || (Units.Utils = {}));
        var Utils = Units.Utils;
    })(cet.dragndrop.Units || (cet.dragndrop.Units = {}));
    var Units = cet.dragndrop.Units;
})(cet || (cet = {}));

window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};

(function () {

  var Utils = (function () {
    return {
      getDistanceFromStage: function (elem) {

        var pos = { top: 0, left: 0 };

        while (elem.attr('id') != 'stage') {
          pos.left += parseInt(elem.css('left').replace('px', ''));
          pos.top += parseInt(elem.css('top').replace('px', ''));
          elem = elem.parent();
        }
        return pos;
      },
      getDistanceFromBody: function (elem) {

        var pos = { top: 0, left: 0 };

        while (!elem.is('body')) {
          pos.left += parseInt(elem.css('left').replace('px', ''));
          pos.top += parseInt(elem.css('top').replace('px', ''));
          elem = elem.parent();
        }
        return pos;
      },
      supportOldIds: function (id) {
        if (id.indexOf('-') == -1) {
          return id.replace('basket', 'basket-').replace('option', 'option-');
        }
        return id;
      }
    }
  })();
  cet.dragndrop.Utils = Utils;

})();

(function () {

  var DragSync = (function () {
    var Storage;
    var Baskets;

    var isDragging = false;
    var isEndStarted = false;

    var option = null;
    return {
      init: function () {
        Storage = cet.dragndrop.Storage;
        Baskets = cet.dragndrop.Baskets;
      },
      isDragging: function (val) {
        if (typeof val == "boolean")
          isDragging = val;
        return isDragging;
      },
      option: function (val) {
        if (val)
          option = val;
        return option;
      },
      isEndStarted: function (val) {
        if (typeof val == "boolean")
          isEndStarted = val;
        return isEndStarted;
      },
      isMyDragEnded: function (dragOption) {
        
        if (!isDragging)
          return false;
        if (option != dragOption) {
          return false;
        }
        if (isEndStarted) {
          return false;
        }
        return true;

      },
      end: function () {
        
        if (!isDragging)
          return;
        
        isEndStarted = false;
        option = null;
        isDragging = false;
        Storage.enableAllOptions();
        Storage.enableNavigationArrows();
        Baskets.enableAllOptions();
      },
      start: function (dragOption) {
        
        isDragging = true;
        option = dragOption;
        isEndStarted = false;
        Storage.disableAllOptionsExceptMe(option);
        Storage.disableNavigationArrows();
        Baskets.disableAllOptionsExceptMe(option);
      }



    }
  })();

  cet.dragndrop.DragSync = DragSync;

})();

window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};

(function () {

  var Baskets = (function () {
    //#region meta declarations

    var App;
    var Audio;
    var option;
    var Content;
    var Stage;
    var Storage;
    var Buttons;
    var Feedback;
    var DragSync;
    var basket;

    //#endregion

    var count;
    function unpopulateBasket(basket, delay) {
      //App.animationStopped(true);
      //Stage.jqElement.addClass('animation-stopped');


      setTimeout(function () {
        var option = basket.getOption();
        basket.unpopulate(function () {
          option.disable();
        });
      }, delay);


    }

    return {
      init: function () {
        //#region meta declarations

        App = cet.dragndrop.App;
        Audio = cet.dragndrop.Audio;
        option = cet.dragndrop.option;
        Content = cet.dragndrop.Content;
        Stage = cet.dragndrop.Stage;
        Storage = cet.dragndrop.Storage;
        Buttons = cet.dragndrop.Buttons;
        Feedback = cet.dragndrop.Feedback;
        DragSync = cet.dragndrop.DragSync;
        basket = cet.dragndrop.basket;
        //#endregion

        Baskets.baskets = {};
        var baskets = $('.basket');
        Baskets.count(baskets.length);
        $.each(baskets, function (index, elem) {
          var newBasket = new basket(elem);
          Baskets.baskets[newBasket.getId()] = newBasket;
        });
      },
      getBasketByJqElement: function (elem) {
        if (!elem.hasClass('basket'))
          elem = elem.parents('.basket');
        if (elem.length == 0)
          return null;
        var classes = elem.attr('class').split(' ')
        var basketId;
        for (var i = 0; i < classes.length; i++) {
          if (classes[i].indexOf('basket-') != -1)
            basketId = classes[i];
        }
        return Baskets.baskets[basketId];
      },
      showFeedback: function () {
        for (var key in Baskets.baskets) {
          Baskets.baskets[key].showFeedback();
        }
      },
      unpopulateErrors: function (completeMethod) {

        var delay = 0;
        for (var key in Baskets.baskets) {

          if (Baskets.baskets[key].isPopulated()) {
            if (!Baskets.baskets[key].isValid()) {

              unpopulateBasket(Baskets.baskets[key], delay);
              delay += 550;
            }
          }
          else
            Baskets.baskets[key].removeFeedback();
        }
        Storage.eliminateSpaces();
        if (completeMethod)
          setTimeout(completeMethod, delay);

      },
      isPerfectSolution: function () {

        for (var key in Baskets.baskets) {
          if (!Baskets.baskets[key].isValid()) {
            return false;
          }
        }
        return true;

      },
      unpopulate: function () {

        App.animationStopped(true);
        Stage.jqElement.addClass('animation-stopped');

        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated()) {
            Baskets.baskets[key].unpopulate();
          }
          else
            Baskets.baskets[key].removeFeedback();
        }


        setTimeout(function () {
          Stage.jqElement.removeClass('animation-stopped');
          App.animationStopped(false);
          Storage.eliminateSpaces();
        }, 150);


      },
      getPopulation: function () {
        var population = {}
        for (var key in Baskets.baskets) {

          var option = Baskets.baskets[key].getOption();

          if (option)
            population[key] = option.getId();

        }

        return population;

      },
      getBasketByOption: function (option) {
        var self = this;
        option = option.jqElement ? option.jqElement : option;

        return Baskets.getBasketByJqElement(option.parents('.basket'));

      },
      setAllzIndexesToZero: function () {

        for (var key in Baskets.baskets) {
          var basket = Baskets.baskets[key];
          basket.setZindex(0);

        }

      },
      setZindexes: function (val) {

        for (var key in Baskets.baskets) {
          var basket = Baskets.baskets[key];
          basket.setZindex(val);

        }

      },
      getBasketById: function (id) {
        id = cet.dragndrop.Utils.supportOldIds(id);
        return Baskets.baskets[id]
      },
      disableAllOptions: function () {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated())
            Baskets.baskets[key].getOption().disable();
        }
      },
      disableAllOptionsExceptMe: function (option) {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated() && Baskets.baskets[key].getOption() != option)
            Baskets.baskets[key].getOption().disable();
        }
      },
      enableAllOptions: function () {

        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated())
            Baskets.baskets[key].getOption().enable();
        }
      },
      getHoveredBasket: function (point, updateHover) {
        if (updateHover == null)
          updateHover == true;
        var hovered = [];
        for (var key in Baskets.baskets) {
          var basket = Baskets.baskets[key];
          if (basket.isPointContained(point)) {
            hovered.push(basket)
          }
          if (updateHover)
            basket.hideHover();
        }

        var winner = null;

        for (var i = 0; i < hovered.length; i++) {
          if (winner == null) {
            winner = hovered[i];
            continue;
          }

          if (updateHover && hovered[i].getContainmentSize(point) >= winner.getContainmentSize(point))
            winner.hideHover();
          winner = hovered[i];
        }
        if (winner && updateHover)
          winner.showHover();

        return winner;
      },
      updateAndGetHoveredBasket: function (point) {
        var hovered = [];
        for (var key in Baskets.baskets) {
          var basket = Baskets.baskets[key];
          if (basket.isPointContained(point)) {
            hovered.push(basket)
          }
          basket.hideHover();
        }

        var winner = null;

        for (var i = 0; i < hovered.length; i++) {
          if (winner == null) {
            winner = hovered[i];
            continue;
          }

          if (hovered[i].getContainmentSize(point) >= winner.getContainmentSize(point))
            winner.hideHover();
          winner = hovered[i];
        }
        if (winner)
          winner.showHover();

        return winner;
      },
      removeAllErrors: function () {
        if (!Baskets.errorFeedbackExists())
          return;
        Storage.disableAll();
        Baskets.disableAllOptions();
        Buttons.disableAll();

        App.resizeLocked(true);

        setTimeout(function () {
          Baskets.unpopulateErrors(function () {
            Storage.enableAll();
            Baskets.enableAllOptions();
            Buttons.enableAll();
            Stage.trigger('removeallerrors', self);
            App.resizeLocked(false);
            
            // remove feedback and add the LO TEST button only after all options are in stage 
            // to avoid clicking the button while options are returning to stage
            if (!cet.dragndrop.Baskets.anyValidBaskets() && !cet.dragndrop.Baskets.anyPopulatedBasket()) {
              cet.dragndrop.Stage.trigger('allbasketoptionsincorrectandreturnedtostorage', self);
            }  
          });
        }, 1000);
      },
      errorFeedbackExists: function () {

        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].feedbackExists() && !Baskets.baskets[key].isValid())
            return true;
        }
        return false;


      },
      anyFeedbackExists: function () {

        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].feedbackExists())
            return true;
        }
        return false;
      },
      removeAllErrorFeedbacks: function () {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].feedbackExists() && !Baskets.baskets[key].isValid())
            Baskets.baskets[key].removeFeedback()
        }
      },
      count: function (countParam) {
        if (countParam)
          count = countParam;
        if (!count)
          count = $('.basket').length;
        return count;

      },
      anyValidBaskets: function () {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isValid()) {
            return true;
          }
        }
        return false;
      },
      anyPopulatedBasket: function () {
        for (var key in Baskets.baskets) {
          if (Baskets.baskets[key].isPopulated()) {
            return true;
          }
        }
        return false;
      },

      updateDropBoxes: function () {
        for (var key in Baskets.baskets) {
          Baskets.baskets[key].updateDropBox();
        }
      },
      resizeHandler: function () {

        for (var key in Baskets.baskets) {
          Baskets.baskets[key].resizeHandler();
        }
      },
      removeFromFront: function () {
        this.setAllzIndexesToZero();
      },
      add: function (basket) {
        Baskets.baskets[basket.getId()] = basket;
        Baskets.count(Baskets.count() + 1);
      },
      remove: function (basket) {
        delete Baskets.baskets[basket.getId()];
        Baskets.count(Baskets.count() - 1);
      },
      all: function () {
        return this.baskets;
      },
      createBasket: function (options) {
        if (!options.id)
          options.id = 'basket-' + Math.random().toString().replace('.', '');
        var bsktHtml = cet.dragndrop.HtmlBuilder.buildBasketHtml(options);
        var $basket = $(bsktHtml);
        if (options.isExtra)
          $basket.addClass('extra');
        $('.canvas').append($basket);
        var newBasket = new cet.dragndrop.basket($basket);
        cet.dragndrop.Baskets.add(newBasket);
        return newBasket;

      },
      restoreOriginalPozitions: function () {
        var contentBaskets = cet.dragndrop.Content.getBaskets();
        for (var key in contentBaskets) {
          var contentBasket = contentBaskets[key];
          var actualBasket = Baskets.getBasketById(contentBasket.id);
          actualBasket.position({
            top: contentBasket.top + '%',
            left: contentBasket.left + '%'
          })
          
        }
      },

    }

  })();

  cet.dragndrop.Baskets = Baskets;

})();

window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};

(function () {

  var option;
  var Baskets;
  var Content;
  var Stage;
  var Utils;

  var basket = function (elem) {
    option = cet.dragndrop.option;
    Baskets = cet.dragndrop.Baskets;
    Content = cet.dragndrop.Content;
    Stage = cet.dragndrop.Stage;
    Utils = cet.dragndrop.Utils;

    this.$element = $(elem);
    this.jqElement = this.$element;
    this.symbol = Stage.getSymbol(this.$element);
    this.dropBox = this.getDropBox();
    this.normalLabelPosition = this.symbol.getLabelPosition('normal')
    this.hoverLabelPosition = this.symbol.getLabelPosition('hover')
    this._isValid = null;
    this.isVisible = !this.$element.hasClass('hidden');
  }

  basket.prototype.updateDropBox = function () {
    this.dropBox = this.getDropBox();
  }
  basket.prototype.initDropPositions = function () {
    var self = this;
    self.dropPositions = {};
    var dropPositions = self.$element.find('.drop-position');
    $.each(dropPositions, function (index, value) {
      var symbol = Stage.getSymbol('#' + value.attributes['id'].value);
      self.dropPositions[symbol.getSymbolTypeName()] = new dropPosition(symbol);
    });
  }
  basket.prototype.getNextDropPosition = function () {
    var self = this;
    //var idTemplate = this.$element.attr('id');
    for (var i = 1; i < 6; i++) {
      var dropPosition = self.dropPositions['drop-position_' + i];
      if (!dropPosition)
        return null;
      if (!dropPosition.isPopulated())
        return dropPosition;
    }
  }
  basket.prototype.eliminateSpaces = function () {
    var self = this;
    //var idTemplate = this.$element.attr('id');
    for (var i = 1; i < 5; i++) {
      var strongDropPosition = self.dropPositions['drop-position_' + i];
      var weakDropPosition = self.dropPositions['drop-position_' + (i + 1)];
      if (!strongDropPosition || !weakDropPosition)
        return;
      if (!strongDropPosition.isPopulated() && weakDropPosition.isPopulated()) {
        strongDropPosition.populate(weakDropPosition.getOption());
        if (weakDropPosition.feedbackExists())
          strongDropPosition.showFeedback();
        else
          strongDropPosition.removeFeedback();
        weakDropPosition.unpopulate();
      }
    }
  }
  basket.prototype.getOption = function () {
    return this.option;
  }
  basket.prototype.unpopulate = function (completeMethod) {

    this._isValid = null;

    if (!this.isPopulated()) {
      if (completeMethod)
        completeMethod();
      return;
    }

    this.option.animateBackToStorage(completeMethod);
    this.removeOption();

  }
  basket.prototype.isPopulated = function () {
    //return this.$element.find('.option1, .option2, .option3, .option4, .option5, .option6, .option7, .option8').length > 0;
    return this.option != null;
  }
  basket.prototype.addOptionWithoutAnimation = function (option) {
    this.addOption(option, false)
  }
  basket.prototype.addOption = function (option, softAnimation) {

    var self = this;
    option.disable();
    option.fadeTo(1);
    self.option = option;
    self.removeFeedback();



    var targetPos = Utils.getDistanceFromStage(self.$element);

    var posInBasket = {
      left: self.width() / 2 - option.pixelWidth() / 2,
      top: self.height() / 2 - option.pixelHeight() / 2
    }
    targetPos.top += posInBasket.top;
    targetPos.left += posInBasket.left;

    var animationCompleteMethod = function () {
      self.$element.append(option.$element);
      option.$element.css({ top: 0, left: 0 });
      option.$element.css(posInBasket);

      var targetCss = {top: 0, left: 0}
      var animateDuration = 0;
      if (!cet.dragndrop.Content.isFreeGroupMode() || !self.isGroupMember()) {
        targetCss.width = '100%';
        targetCss.height = '100%';
        animateDuration = 400;
      }
      option.animate(targetCss, animateDuration);
      option.enable();
      option.showAsInTarget();
      self.showOccupied();

      if (cet.dragndrop.Content.isFreeGroupMode()) {
        self.setResponsive(option);
      }

    }
    if (typeof softAnimation != 'undefined' && !softAnimation) {
      animationCompleteMethod();
      return;
    }

    option.animatePosition(targetPos, self.animateOptionToBasketDuration(), animationCompleteMethod);
  }
  basket.prototype.animateOptionToBasketDuration = function () {
    if (cet.dragndrop.Content.isFreeGroupMode())
      return 0;
    return 150;
  }

  basket.prototype.showOccupied = function () {

    var self = this;
    if (!isNaN(self.symbol.getLabelPosition('occupied')))
      self.symbol.stop('occupied');
  }
  basket.prototype.removeOption = function (option) {
    this._isValid = null;
    this.removeFeedback();
    this.option = null;
    this.symbol.stop('normal');
    var grp = cet.dragndrop.Groups.getGroupByBasket(this);
    if (grp)
      grp.removeFeedback();


  }
  basket.prototype.setZindex = function (val) {
    this.$element.css('z-index', val);
  }
  basket.prototype.getSymbolTypeName = function () {
    return this.symbol.getSymbolTypeName();
  }
  basket.prototype.getId = function () {
    //var val = this.$element.attr('class').split(' ')[2];
    //if (!val)
    //  val = this.$element.attr('class').split(' ')[1];
    //return val;

    var classes = this.$element.attr('class').split(' ')
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('basket-') != -1)
        return classes[i];
      if (classes[i].indexOf('basket') == 0 && classes[i].length > 'basket'.length)
        return classes[i];
    }
  }
  basket.prototype.isValid = function (val) {

    var self = this;

    if (typeof val != 'undefined')
      self._isValid = val;

    if (self._isValid != null)
      return self._isValid;

    if (!self.isVisible)
      return true;

    if (!self.isPopulated())
      return false;

  

    var option = self.getOption();
    var basketId = self.getId();
    for (var i = 0; i < option.baskets.length; i++) {
      if (option.baskets[i] == basketId)
        return true;
    }
    return false;

  }
  basket.prototype.showFeedback = function () {

    var self = this;
    self.$element.find('.feedback-correct, .feedback-error').hide();
    self.$element.addClass('feedback-visible');

    var feedbackIconSelector = '.feedback-';
    feedbackIconSelector += self.isValid() ? 'correct' : 'error';

    self.$element.find(feedbackIconSelector).css({ 'z-index': 1000, display: 'block' }).show();

  }
  basket.prototype.removeFeedback = function () {
    this.$element.removeClass('feedback-visible');
    this.$element.find('.feedback-correct, .feedback-error').hide();
  }
  basket.prototype.feedbackExists = function () {
    return this.$element.find('.feedback-correct, .feedback-error').is(':visible');
  }
  basket.prototype.getDropBox = function () {
    var self = this;
    var offset = self.$element.offset();
    var factor = 8;
    //self.$element.text(
    //  'top: '+ (offset.top - factor ) +
    //  ', left: ' + (offset.left - factor)
    //  )
    //self.$element.css('font-size', '14px')
    var box = {
      top: offset.top - factor,
      left: offset.left - factor,
      right: offset.left + (self.width() * cet.dragndrop.Stage.scale()) + factor,
      bottom: offset.top + (self.height() * cet.dragndrop.Stage.scale()) + factor
    }

    //box.top = box.top * cet.dragndrop.Stage.scale();
    //box.left = box.left * cet.dragndrop.Stage.scale();
    //box.right = box.right * cet.dragndrop.Stage.scale();
    //box.bottom = box.bottom * cet.dragndrop.Stage.scale();

    return box;
  }
  basket.prototype.width = function () {
    return this.$element.width();
  }
  basket.prototype.height = function () {
    return this.$element.height();
  }
  basket.prototype.isBoxOverlaping = function (box) {
    var self = this;
    if (box.right < self.dropBox.left) {
      return false;
    }

    if (box.left > self.dropBox.right) {
      return false;
    }
    if (box.top > self.dropBox.bottom) {
      return false;
    }
    if (box.bottom < self.dropBox.top) {
      return false;
    }
    return true;

  }
  basket.prototype.getOverlappingSize = function (box) {
    var self = this;
    var x = 0;
    if (self.dropBox.left <= box.right && box.right <= self.dropBox.right)
      x = box.right - self.dropBox.left;
    else
      x = self.dropBox.right - box.left;

    var y = 0;
    if (self.dropBox.bottom >= box.top && box.top >= self.dropBox.top)
      y = self.dropBox.bottom - box.top;
    else
      y = box.bottom - self.dropBox.top;


    return x + y;

  }
  basket.prototype.isPointContained = function (pointer) {
    var self = this;
    if (!self.isVisible)
      return false;
    if (!pointer)
      return false;
    if (pointer.pageX < self.dropBox.left || pointer.pageX > self.dropBox.right || pointer.pageY > self.dropBox.bottom || pointer.pageY < self.dropBox.top) {

      return false;
    }
    return true;

  }
  basket.prototype.getContainmentSize = function (pointer) {
    var self = this;
    var x = 0;
    var boxMiddleX = self.dropBox.left + ((self.dropBox.right - self.dropBox.left) / 2)

    if (pointer.pageX >= boxMiddleX)
      x = self.dropBox.right - pointer.pageX;
    else
      x = pointer.pageX - self.dropBox.left;


    var boxMiddleY = self.dropBox.top + ((self.dropBox.bottom - self.dropBox.top) / 2)
    if (pointer.pageY >= boxMiddleY)
      y = self.dropBox.bottom - pointer.pageY;
    else
      y = pointer.pageY - self.dropBox.top;

    return x + y;

  }
  basket.prototype.showHover = function () {

    if (this.isPopulated())
      return;
    if (this.symbol.getPosition() == this.hoverLabelPosition)
      return;
    this.symbol.stop('hover');
  }
  basket.prototype.hideHover = function () {

    if (this.isPopulated()) {
      return;
    }
    if (this.symbol.getPosition() == this.normalLabelPosition)
      return;
    this.symbol.stop('normal');
  }
  basket.prototype.contains = function () {
    return (this.option && this.option.getId() == option.getId());
  }
  basket.prototype.resizeHandler = function () {
    this.updateDropBox();;;;
    if (this.isPopulated())
      this.getOption().resizeHandler();
  }
  basket.prototype.position = function (newPosition) {
    if(newPosition)
      this.$element.css(newPosition);
    return this.$element.position();
  }
  basket.prototype.remove = function () {
    this.$element.remove();
  }
  basket.prototype.isExtra = function () {
   return this.$element.hasClass('extra');
  }
  basket.prototype.addClass = function (className) {
    this.$element.addClass(className);
  }
  basket.prototype.isGroupMember = function () {
    return this.$element.hasClass('group-member');
  }
  basket.prototype.setResponsive = function (option) {

    var $option = option.$element;
    var $optionBasket = $option.parent('.basket');
    var $optionBasketWidth = ($optionBasket.width() != 0) ? $optionBasket.width() : $option.width();
    var $optionBasketHeight = ($optionBasket.height() != 0) ? $optionBasket.height() : $option.height();

    var basketPercentTop = $optionBasket.position().top / $optionBasket.parent().height() * 100;
    var basketPercentLeft = $optionBasket.position().left / $optionBasket.parent().width() * 100;
    var basketPercentHeight = $optionBasketHeight / $optionBasket.parent().height() * 100;
    var basketPercentWidth = $optionBasketWidth / $optionBasket.parent().width() * 100;

    $optionBasket.css({ 'top': basketPercentTop + '%' });
    $optionBasket.css({ 'left': basketPercentLeft + '%' });
    $optionBasket.css({ 'height': basketPercentHeight + '%' });
    $optionBasket.css({ 'width': basketPercentWidth + '%' });

    var optionPercentTop = $option.position().top / $option.parent().height() * 100;
    var optionPercentLeft = $option.position().left / $option.parent().width() * 100;
    var optionPercentHeight = $option.height() / $option.parent().height() * 100;
    var optionPercentWidth = $option.width() / $option.parent().width() * 100;

    $option.css({ 'top': optionPercentTop + '%' });
    $option.css({ 'left': optionPercentLeft + '%' });
    $option.css({ 'height': optionPercentHeight + '%' });
    $option.css({ 'width': optionPercentWidth + '%' });
  }
  cet.dragndrop.basket = basket;

})();


var cet;
(function (cet) {
  (function (HtmlBuilder) {
    ///some of the css properties are here following 2 reasons
    ///1. number of options is changing from one content to another, and percentage implementation requires some calculations
    ///2. d&d requires some sizes to be on the element 'style' property.
    var nOptionPixelWidth = 119;
    var nOptionPixelMargin = 8;
    var nOptionPercentageWidth;
    var nOptionPercentageMargin;
    var nOptionPercentageHeight = 70;
    var nOptionPercentageTop = 14;
    var nOptionsPercentageTop = 0;

    var nStagePixelWidth = 860;
    var nStagePixelHeight = 557;
    

    var nStoragePercentageWidth = 88.4;
    var nStoragePercentageLeft = 5.8;
    var nStoragePixelWidth = ( nStoragePercentageWidth/100 ) * nStagePixelWidth;


    function build() {
      var stageInnerHtml = '<div class="canvas" ></div >' + '<div class="storage" >' + ' <div class="options" ></div >' + '</div >' + '<div class="button-navigation-left" ><svg ><use href="images/icons.svg#arrowLeft"></use></svg></div >' + '<div class="button-navigation-right" ><svg ><use href="images/icons.svg#arrowRight"></use></svg></div >' + '<div class="button-check" ></div >' + '<div class="button-restart" ></div >' + '<div class="storage-background-right" ></div >' + '<div class="storage-background-left" ></div >' + '<div class="buttons-background" ></div >' + '<div class="stage-border" ></div >' + '<div class="final-feedback" ></div>';

      var $stage = $('#stage');
      $stage.empty();
      $stage.append(stageInnerHtml);

      $stage.css('width', nStagePixelWidth + 'px');
      $stage.css('height', nStagePixelHeight + 'px');

      var $options = $stage.find('.options');

      var baskets = cet.dragndrop.Content.getBaskets();
      var options = cet.dragndrop.Content.getOptions();
      var groups = cet.dragndrop.Content.getGroups();
      var medias = cet.dragndrop.Content.getMedias();

      var $storage = $stage.find('.storage');
      var $storageR = $stage.find('.storage-background-right');
      var $storageL = $stage.find('.storage-background-left');
      var $stageBorder = $stage.find('.stage-border');
      $storage.css({
        width: nStoragePercentageWidth + '%',
        left: nStoragePercentageLeft + '%'
      });
      if (cet.dragndrop.Content.getStorageBackgroundColor() && (cet.dragndrop.Content.getStorageBackgroundColor()).toUpperCase() != "#4A4D52") {
        $storage.css('background-color', cet.dragndrop.Content.getStorageBackgroundColor());
        $storageR.css('background-color', cet.dragndrop.Content.getStorageBackgroundColor());
        $storageL.css('background-color', cet.dragndrop.Content.getStorageBackgroundColor());
      }

      if (cet.dragndrop.Content.getBorderColor())
        $stageBorder.css('background-color', cet.dragndrop.Content.getBorderColor());



      var $arrowL = $stage.find('.button-navigation-left svg');
      var $arrowR = $stage.find('.button-navigation-right svg');
      if (cet.dragndrop.Content.getStorageStorageArrowColor() && (cet.dragndrop.Content.getStorageBackgroundColor()).toUpperCase() != "#4A4D52") {        
        $arrowL.css({ stroke: cet.dragndrop.Content.getStorageStorageArrowColor() });
        $arrowR.css({ stroke: cet.dragndrop.Content.getStorageStorageArrowColor() });
      } else {
        $arrowL.css({ stroke: '#FFFFFF' });
        $arrowR.css({ stroke: '#FFFFFF' });
      }

      var nOptionsPixelWidth = ((nOptionPixelWidth + nOptionPixelMargin) * options.length) + nOptionPixelMargin;
      var nOptionsPercentageWidth = (nOptionsPixelWidth / nStoragePixelWidth) * 100;

      nOptionPercentageWidth = (nOptionPixelWidth / nOptionsPixelWidth) * 100;
      nOptionPercentageMargin = (nOptionPixelMargin / nOptionsPixelWidth) * 100;

      $options.css({
        width: nOptionsPercentageWidth + '%',
        top: nOptionsPercentageTop + '%'
      });

      var optionsLeft = (100 - nOptionsPercentageWidth) / 2;

      if (options.length > 6 && options.length % 2 != 0)
        optionsLeft = optionsLeft + 8.5;

      $options.css('left', optionsLeft + '%');

      $options.empty();
      var $canvas = $stage.find('.canvas');

      for (var i = 0; i < baskets.length; i++) {
        $canvas.append(buildBasketHtml(baskets[i]));
      }
      for (var i = 0; i < options.length; i++) {
        $options.append(buildOptionHtml(options[i], i));
      }

      for (var i = 0; i < groups.length; i++) {
        $canvas.append(buildGroupHtml(groups[i]));
      }

      for (var i = 0; i < medias.length; i++) {
        $canvas.append(buildMediaHtml(medias[i]));
      }

      fixTextVerticalAlignment();
      fixFinalFeedbackAnimationFlash();

      if (cet.dragndrop.Content.getBackgroundImage())
        $canvas.css('background-image', 'url(' + cet.dragndrop.Content.getBackgroundImage() + ')');

      if (cet.dragndrop.Content.getBackgroundColor())
        $canvas.css('background-color', cet.dragndrop.Content.getBackgroundColor());

      $stage.addClass(getFontSizeClassName());
      if (getFontSizeClassName() == "font-other") {
        var fontSizePx = cet.dragndrop.Content.getFontSizePx();
        var classSizeName = "size-" + fontSizePx;
        $stage.addClass(classSizeName);
      }
      if (cet.dragndrop.Content.getFontName()) {
        $stage.css('font-family', cet.dragndrop.Content.getFontName());
      }
      if ((cet.dragndrop.Localization.language == "ar" && cet.dragndrop.Content.getFontName() && cet.dragndrop.Content.getFontName() == "Alef") 
          || (cet.dragndrop.Localization.language == "ar" && !cet.dragndrop.Content.getFontName())) {
        $stage.css('font-family', 'Amiri-Bold');
      }
      $stage.addClass(cet.dragndrop.Localization.language);

      if (cet.dragndrop.Content.isFreeGroupMode())
        $stage.addClass('free-group');

      $stage.find('.final-feedback').append(getFinalFeedbackHtml());

      if (baskets.length < 7)
        $stage.find('.button-navigation-left, .button-navigation-right').hide();

      if (cet.dragndrop.Content.isNonePerishableStorage())
        $.extend(cet.dragndrop.Storage, cet.dragndrop.NonPerishableStorage);

      return $stage;
    }
    HtmlBuilder.build = build;

    function fixFinalFeedbackAnimationFlash() {
      //seems like causing performance issues in tablets, and not necessary
      if (!(Modernizr.touch))
        $('#stage').css('-webkit-backface-visibility', 'hidden');
    }

    function fixTextVerticalAlignment() {
      setTimeout(function () {
        var options = $('.option .text');
        for (var i = 0; i < options.length; i++) {
          var opt = options[i];
          if ((opt.clientHeight / opt.scrollHeight) < 0.8)
            $(opt).css('height', '100%');
        }
      }, 500);
    }

    function getFontSizeClassName() {
      switch (cet.dragndrop.Content.getFontSize()) {
        case 'small':
          return 'font-small';
        case 'medium':
          return 'font-medium';
        case 'large':
          return 'font-large';
        case 'other':
          return 'font-other';
        default:
          return 'font-medium';
      }
    }

    function getFinalFeedbackHtml() {
      return '' + ' <div class="final-feedback-failure" >' + '  <div class="final-feedback-fade" ></div>' + '  <div class="final-feedback-popup" >' + '   <div class="final-feedback-popup-rectangle" ></div>' + '    <img class="final-feedback-popup-opening" src="images/UI/tetris_opening.svg" >' + '  </div>      ' + '  <div class="edge-btn try-again" >' + '   <div class="try-again-ellipse" ></div>' + '   <div class="try-again-restart-icon-anim" >' + '     <img class="try-again-restart-icon-anim-img" src="images/UI/tetris_restartIcon.svg" >' + '   </div>    ' + '  </div>      ' + '  <div class="feedback-text" ></div>' + '  <div class="button-feedback-close edgy-button" >' + '     <div class="button-feedback-close-background" ></div>' + '     <div class="button-feedback-close-x eg-svg-image" ></div>' + '  </div>    ' + ' </div>      ' + ' <div class="final-feedback-success" symbol="finalFeedbackSuccess" >' + '  <div class="final-feedback-fade" ></div>' + '  <div class="final-feedback-popup" >' + '   <div class="final-feedback-popup-rectangle" ></div>' + '   <img class="final-feedback-popup-opening" src="images/UI/tetris_opening.svg" >' + '  </div>    ' + '  <img class="final-feedback-stars" src="images/UI/tetris_stars.svg" >' + '  <img class="final-feedback-ribbon" src="images/UI/tetris_feedbackRibbon.svg" >' + '  <div class="feedback-text" ></div > ' + '  <div class="button-feedback-close edgy-button" >' + '    <div class="button-feedback-close-background" ></div>' + '    <div class="button-feedback-close-x eg-svg-image" ></div>' + '  </div>' + ' </div>';
    }

    function buildBasketHtml(basket) {
      var op = "";
      if (basket.opacity == 0.1) {
        basket.opacity = 0;
        op = "opacity:0;";
      }
      var template = Handlebars.compile(
        '<div class="basket {{id}} {{hidden}}" style="{{styleProperty \'width\' width \'%\'}}; {{styleProperty \'height\' height \'%\'}} {{styleProperty \'top\' top \'%\'}} {{styleProperty \'left\' left \'%\'}} border-color:{{borderColor}}; {{styleProperty \'opacity\' opacity}} '+op+'" >' +
          '<div class="feedback-error" ></div> ' +
          '<div class="feedback-correct" ></div > ' +
          '<div class="background-color" style="background-color:{{backgroundColor}}" ></div > ' +
        '</div> ');
      basket.hidden = basket.hiddenOnRuntime ? 'hidden' : '';
      return template(basket);
    }
    HtmlBuilder.buildBasketHtml = buildBasketHtml;

    function buildGroupHtml(group) {
      var template = Handlebars.compile(
        '<div class="group {{id}}" style="width:{{width}}%; height:{{height}}%; top: {{top}}%; left :{{left}}%; border-color:{{borderColor}};  " >' +
          '<div class="feedback-error" ></div> ' +
          '<div class="feedback-correct" ></div> ' +
          '<div class="background-color" style="background-color:{{backgroundColor}}; opacity: {{opacity}};" ></div > ' +
        '</div> ');
      return template(group);
    }

    function buildMediaHtml(media) {
      var template = Handlebars.compile('<div class="media {{id}}" style="width:{{width}}%; height:{{height}}%; top: {{top}}%; left :{{left}}%; color:{{color}}; border-color:{{borderColor}}; opacity: {{opacity}}; background-color:{{backgroundColor}}; background-image:url({{image}})" ><div class="text-parent"><span class="text">{{text}}</span></div></div> ');
      return template(media);
    }

    function buildOptionHtml(option, i) {
      var left = i * (nOptionPercentageWidth + nOptionPercentageMargin) + nOptionPercentageMargin;
      var template = Handlebars.compile('<div class="option {{id}}" style="position:absolute; width:{{width}}%; height:{{height}}%; left:{{left}}%; top: {{top}}%; color: {{color}}" ><div class="text-parent" ><div class="text"></div></div></div>');
      return template({ id: option.id, left: left, width: nOptionPercentageWidth, height: nOptionPercentageHeight, top: nOptionPercentageTop, color: option.color });
    }

    //#region public properties
    Object.defineProperty(cet.dragndrop.HtmlBuilder, 'OptionPercentageWidth', {
      get: function () {
        return nOptionPercentageWidth;
      }
    });

    Object.defineProperty(cet.dragndrop.HtmlBuilder, 'OptionPercentageHeight', {
      get: function () {
        return nOptionPercentageHeight;
      }
    });

    Object.defineProperty(cet.dragndrop.HtmlBuilder, 'OptionPercentageTop', {
      get: function () {
        return nOptionPercentageTop;
      }
    });

    Object.defineProperty(cet.dragndrop.HtmlBuilder, 'OptionPercentageMargin', {
      get: function () {
        return nOptionPercentageMargin;
      }
    });

    //#endregion
    Handlebars.registerHelper('styleProperty', function (name, value, value2) {
      
      if (!value)
        return '';
      if (typeof value2 == "string")
        value = value + value2;
      return name + ': ' + value + ';';
    });
  })(cet.dragndrop.HtmlBuilder || (cet.dragndrop.HtmlBuilder = {}));
  var HtmlBuilder = cet.dragndrop.HtmlBuilder;
})(cet || (cet = {}));

var cet;
(function (cet) {
  (function (Buttons) {
    var btnCheck;
    var btnRestart;


    function btnCheckClickHandler() {
      cet.dragndrop.Stage.trigger('checkClick', self);
    }

    function btnRestartClickHandler() {
      cet.dragndrop.Stage.trigger('restartClick', self);
    }

    function setInteractionVisualEffects() {
      var btnCheckSymbol = cet.dragndrop.Stage.getSymbol(btnCheck);
      btnCheck.hover(function () {
        btnCheckSymbol.stop('hover');
      }, function () {
        btnCheckSymbol.stop('normal');
      });
      btnCheck.on('mousedown', function () {
        btnCheckSymbol.stop('down');
      });
      btnCheck.on('mouseup', function () {
        btnCheckSymbol.stop('hover');
      });

      var btnRestartSymbol = cet.dragndrop.Stage.getSymbol(btnRestart);
      btnRestart.hover(function () {
        btnRestartSymbol.stop('hover');
      }, function () {
        btnRestartSymbol.stop('normal');
      });
      btnRestart.on('mousedown', function () {
        btnRestartSymbol.stop('down');
      });
      btnRestart.on('mouseup', function () {
        btnRestartSymbol.stop('hover');
      });
    }

    function init() {
      btnCheck = $('.button-check');
      btnCheck.css('z-index', 1000);
      btnCheck.on('mouseup', btnCheckClickHandler);
      ;

      btnRestart = $('.button-restart');
      btnRestart.css('z-index', 1000);
      btnRestart.on('mouseup', btnRestartClickHandler);

      setInteractionVisualEffects();
    }
    Buttons.init = init;
    function disableAll() {
      btnCheck.off('mouseup mousedown');
      btnRestart.off('mouseup mousedown');
    }
    Buttons.disableAll = disableAll;
    function enableAll() {
      Buttons.disableAll();

      btnCheck.on('mouseup', btnCheckClickHandler);
      ;
      btnRestart.bind('mouseup', btnRestartClickHandler);

      setInteractionVisualEffects();
    }
    Buttons.enableAll = enableAll;
    function hideCheckButton() {
      btnCheck.hide();
    }
    Buttons.hideCheckButton = hideCheckButton;
    function hideRestartButton() {
      btnRestart.hide();
    }
    Buttons.hideRestartButton = hideRestartButton;
    function setZindexes(val) {
      btnCheck.css('z-index', val);
      btnRestart.css('z-index', val);
    }
    Buttons.setZindexes = setZindexes;

  })(cet.dragndrop.Buttons || (cet.dragndrop.Buttons = {}));
  var Buttons = cet.dragndrop.Buttons;
})(cet || (cet = {}));

var finalFeedbackSuccess = (function () {
    function finalFeedbackSuccess($element) {
        var self = this;
        this.$element = $element;
        $('.button-feedback-close').on('click', function () {
            self.$element.removeClass('show');
        });
    }
    finalFeedbackSuccess.prototype.play = function () {
        var self = this;

        //delayed till parent element will be displayed, IE issue...
        setTimeout(function () {
            self.$element.addClass('show');
        }, 50);
    };
    return finalFeedbackSuccess;
})();

//leftour from edge... should be removed!!!

function symbol($element) {
  this.$element = $element;
  this.position = 0;
  this.labels = { normal: 0, hover: 1, in_target: 2, occupied: 3 }

  this.symbol = $element.attr('symbol');
  if(this.symbol)
    this.symbol = new window[this.symbol]($element);

}

symbol.prototype.play = function () {
  if (this.symbol)
    this.symbol.play();
}
symbol.prototype.stop = function (label) {
  this.$element.removeClass('normal hover in_target occupied')
  this.$element.addClass(label);
  this.position = this.labels[label];

}
symbol.prototype.getLabelPosition = function (label) {
  return this.labels[label];
}
symbol.prototype.getPosition = function () {
  return this.position;
}


window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
(function () {
  //#region meta declarations
  var Audio;
  var option;
  var Baskets;
  var Content;
  var App;

  //#endregion
  var Stage = (function () {
    var scaleFactor;
    return {


      resetScale: function () {
        scaleFactor = null;
      },
      trigger: function (event, data) {
        Stage.jqElement.trigger(event, data);
      },
      bind: function (event, method) {
        //drgNdrp behaviour
        //Stage.jqElement.on(event, function (event) { method(event.data); })
        Stage.jqElement.on(event, function (event, data) {
          method(data);
        })
      },
      unbind: function (event) {
        Stage.jqElement.off(event)
      },
      on: function (event, method) {
        //drgNdrp behaviour
        //Stage.jqElement.on(event, function (event) { method(event.data); })
        Stage.jqElement.on(event, function (event, data) {
          method(data);
        })
      },
      off: function (event) {
        Stage.jqElement.off(event)
      },
      getSymbolTypeNameBySelector: function (selector) {
        return Stage.getSymbol(selector).getSymbolTypeName();

      },
      createSymbol: function (typeName, parentElementName) {
        return Stage.symbol.createChildSymbol(typeName, parentElementName);

      },
      width: function (size) {
        if (size)
          Stage.jqElement.width(size);
        return Stage.jqElement.width();
      },
      height: function (size) {
        if (size)
          Stage.jqElement.height(size);
        return Stage.jqElement.height();
      },
      scale: function (size) {

        if (size) {
          Stage.jqElement.css({
            '-moz-transform': 'scale(' + size + ')',
            '-webkit-transform': 'scale(' + size + ')',
            '-ms-transform': 'scale(' + size + ')',
            'transform': 'scale(' + size + ')'

          });
          scaleFactor = size;
        }
        if (!scaleFactor) {
          var propertyValue = Stage.jqElement.css('transform');
          if (!propertyValue)
            propertyValue = Stage.jqElement.css('-webkit-transform');
          if (propertyValue && propertyValue != 'none')
            scaleFactor = parseFloat(propertyValue.replace(/^matrix(3d)?\((.*)\)$/, '$2').split(/, /)[0]);
          else
            scaleFactor = 1;
        }
        return scaleFactor;
      },
      css: function (cssObj) {
        if (cssObj)
          this.jqElement.css(cssObj);
        if (typeof cssObj == 'string')
          return this.jqElement.css(cssObj);
      },
      fontSize: function () {
        var fs = this.jqElement[0].style.fontSize;
        if (!fs)
          fs = this.css('font-size');
        return fs;

      },
      addClass: function (name) {
        Stage.jqElement.addClass(name)

      },
      append: function ($element) {
        Stage.jqElement.append($element);
      },
      isReadOnly: function () {
        return Stage.jqElement.hasClass('readonly');
      },
      setAsReadOnly: function () {
        Stage.addClass('readonly')
      },
      unsetAsReadOnly: function () {
        Stage.jqElement.removeClass('readonly');
      },
      init: function () {
        //#region meta declarations
        Audio = cet.dragndrop.Audio;
        option = cet.dragndrop.option;
        Baskets = cet.dragndrop.Baskets;
        Content = cet.dragndrop.Content;
        App = cet.dragndrop.App;
        //#endregion
        cet.dragndrop.Stage.$element = $('#stage');
        cet.dragndrop.Stage.jqElement = cet.dragndrop.Stage.$element;
      },
      getSymbol: function (selector) {
        return new symbol(selector);
      },
      eliminateIPadBounceEffect: function () { }
    };
  })();



  cet.dragndrop.Stage = Stage;


})();


var cet;
(function (cet) {
  var option = (function () {
    function option(elem, optionData) {
      this.creationTime = new Date().getTime();
      var self = this;

      self.id = optionData.id;
      self.$element = $(elem);
      self.jqElement = self.$element;
      self.$parent = self.$element.parent();
      self.$element.addClass(optionData.id);
      self.enableHorizontalAnimationInStorage();
      self.units = new cet.dragndrop.Units.units(self.$element);

      self.setAsDraggable();
      self.$element.find('.text').html(optionData.text);

      //self.$element.find('.img').css('background-image', 'url(' + optionData.image + ')');
      if (optionData.image && optionData.image.indexOf('none') == -1)
        self.$element.css('background-image', 'url(' + optionData.image + ')');

      self.baskets = optionData.baskets;
      self.animateBackToStorageDuration = 400;

      self.symbol = new symbol(self.$element);


      self.setInteractionVisualEffects();
    }
    option.prototype.resizeHandler = function () {
      this.reloadDraggable();
    };
    option.prototype.reloadDraggable = function () {
      this.draggie.setScaledDimentions();
    };
    option.prototype.setAsDraggable = function () {
      var self = this;

      self.draggie = new draggable(self.$element, '#stage');

      self.draggie.end = function (pointer) {
        self.showLabel('normal');
        if (!cet.dragndrop.DragSync.isMyDragEnded(self))
          return;

        cet.dragndrop.DragSync.isEndStarted(true);
        self.notifyEverybodyDragEnded();

        self.disableHorizontalAnimationInStorage();

        var group = cet.dragndrop.Groups.updateAndGetHoveredGroup(pointer);
        if (group) {
          var basket = group.getAvailableBasket(pointer);

          if (basket && cet.dragndrop.Content.isFreeGroupMode())
            basket.position(self.getDistanceFromCanvas());
          group.hideHover();
        }
        if (!basket) {
          var basket = cet.dragndrop.Baskets.getHoveredBasket(pointer, true);
          if (!basket) {
            self.animateBackToStorage(cet.dragndrop.DragSync.end);
            return;
          }
        }

        if (self.isSrcBasket(basket)) {
          basket.addOptionWithoutAnimation(self);
          cet.dragndrop.DragSync.end();
          return;
        }
        if (basket.isPopulated()) {
          self.disable();
          basket.unpopulate(cet.dragndrop.DragSync.end);
          cet.dragndrop.Storage.removeOption(self);
          basket.addOption(self);
          return;
        }

        cet.dragndrop.Storage.removeOptionAndEliminateSpaces(self);

        cet.dragndrop.Storage.bringToFront();

        self.appendToStage();

        basket.addOption(self);

        if (cet.dragndrop.Content.isFreeGroupMode()) {
          cet.dragndrop.Groups.rearrangeBaskets();
        }

        //delay cet.dragndrop.DragSync.end till option is added to basket.
        setTimeout(function () {
          self.showAsInTarget();
          cet.dragndrop.DragSync.end();
        }, 150);
      };

      self.draggie.start = function (pointer) {
        if (cet.dragndrop.DragSync.isDragging())
          return;

        cet.dragndrop.DragSync.start(self);

        if (cet.dragndrop.Content.getFeedbackErrorRemoval() == 'onUserInteraction')
          cet.dragndrop.Baskets.removeAllErrorFeedbacks();

        self.srcBasket = cet.dragndrop.Baskets.getBasketByOption(self);

        if (self.srcBasket) {
          self.srcBasket.removeOption();
        } else if (cet.dragndrop.Content.isNonePerishableStorage()) {
          var newOption = self.clone();
          newOption.disable();
          cet.dragndrop.Storage.overrideOption(newOption);
        }
        cet.dragndrop.Storage.setElementAsHanging(self);

        self.showLabel('hover');
        self.disableHorizontalAnimationInStorage();
        self.bringToFront();
      };

      self.draggie.move = function (pointer) {
        var group = cet.dragndrop.Groups.updateAndGetHoveredGroup(pointer);
        if (!group)
          cet.dragndrop.Baskets.updateAndGetHoveredBasket(pointer);
      };
    };
    option.prototype.convertPercentageToPixels = function () {
      //important when size is given with precentage, so when an option is attached somewhere else in the DOM, it preservs its correct size;
      var self = this;
      self.width(self.pixelWidth());
      self.height(self.pixelHeight());
      //self.$element.css('left', self.$element.css('left'))
      //self.$element.css('top', self.$element.css('top'));
    };
    option.prototype.convertPixelsToPercentage = function () {

      var self = this;
      self.width(self.units.percentage.width + '%');
      self.height(self.units.percentage.height + '%');

    };
    option.prototype.setInteractionVisualEffects = function () {
      var self = this;
      self.$element.hover(function () {
        self.showLabel('hover');
      }, function () {
        var label = self.isInBasket() ? 'in_target' : 'normal';

        self.showLabel(label);
      });

      self.$element.on('mousedown', function () {
        self.showLabel('drag');
      });

      self.$element.on('mouseup', function () {
        self.showLabel('hover');
      });
    };
    option.prototype.showAsInTarget = function () {
      this.symbol.stop('in_target');
    };
    option.prototype.showLabel = function (label) {
      this.symbol.stop(label);
    };
    option.prototype.isInBasket = function () {
      return this.$element.parents('.basket').length > 0;
    };
    option.prototype.notifyEverybodyDragEnded = function () {
      requestAnimationFrame(function () {
        cet.dragndrop.Stage.trigger('dragended', this);
      });
    };
    option.prototype.isSrcBasket = function (basket) {
      if (basket.isPopulated())
        return false;
      return (this.srcBasket && this.srcBasket.getId() == basket.getId()) || basket.isPopulated() && basket.getOption().getId() == this.getId();
    };
    option.prototype.getDragMargins = function (pointer) {
      var self = this;

      var distanceFromBody = self.$element.offset();

      var topMargin = pointer.pageY - distanceFromBody.top;
      var leftMargin = pointer.pageX - distanceFromBody.left;

      var rightMargin = self.width() - leftMargin;
      var bottomMargin = self.height() - topMargin;

      return {
        'top': topMargin,
        'left': leftMargin,
        'right': rightMargin,
        'bottom': bottomMargin
      };
    };
    option.prototype.getDragBox = function (pointer) {
      var self = this;

      var top = pointer.pageY - self.dragMargins.top;
      var left = pointer.pageX - self.dragMargins.left;

      var right = pointer.pageX + self.dragMargins.right;
      var bottom = pointer.pageY + self.dragMargins.bottom;

      return {
        'top': top,
        'left': left,
        'right': right,
        'bottom': bottom
      };
    };
    option.prototype.reloadData = function (optionData) {
      this.$element.removeClass(this.id);
      this.id = optionData.id;
      this.$element.addClass(optionData.id);
      this.baskets = optionData.baskets;
      this.$element.find('.text').text(optionData.text);
      this.$element.find('.img').css('background-image', 'url(' + optionData.image + ')');
      this.baskets = optionData.baskets;
    };
    option.prototype.enableHorizontalAnimationInStorage = function () {
      if (this.$element.hasClass('animate-transition'))
        return;
      this.$element.addClass('animate-transition');
    };
    option.prototype.disableHorizontalAnimationInStorage = function () {
      this.$element.removeClass('animate-transition');
    };
    option.prototype.getLandingElement = function (pointer) {
      var self = this;
      self.hide();
      var obj = $(document.elementFromPoint(pointer.clientX, pointer.clientY));
      self.show();
      return obj;
    };
    option.prototype.disable = function () {
      this.draggie.disable();
    };
    option.prototype.enable = function () {
      this.draggie.enable();
    };
    option.prototype.setPosition = function (position) {
      this.$element.css(position);
    };
    option.prototype.isDraggedToValidBasket = function (ui) {
      return this.$element.data('dropped');
    };
    option.prototype.getId = function () {
      return this.id;
    };
    option.prototype.isDraggedFromStorage = function () {
      return this.$element.parents('.storage').length;
    };
    option.prototype.remove = function () {
      this.$element.remove();
      //this.symbol.deleteSymbol();
    };
    option.prototype.animateBackToStorage = function (completeMethod) {
      var self = this;
      self.disable();
      self.appendToStage();

      var positionInStorage = cet.dragndrop.Storage.makeRoom(self);
      var storagePosition = cet.dragndrop.Storage.getDistanceFromStage();

      var targetPos = {
        left: storagePosition.left + positionInStorage.left,
        top: storagePosition.top + positionInStorage.top
      };

      self.disableHorizontalAnimationInStorage();

      var methodAfterAnimate = function () {
        self.addMyselfToStorage(positionInStorage);
        self.enableHorizontalAnimationInStorage();
        self.enable();
        if (completeMethod)
          completeMethod();
        self.showLabel('normal');
        self.$element.fadeTo(0, 1);
        cet.dragndrop.DragSync.end();
      };

      if (cet.dragndrop.App.animationStopped() || cet.dragndrop.Storage.isOptionInValidStoragePosition(self)) {
        methodAfterAnimate();
        return;
      }

      self.animate(targetPos, self.animateBackToStorageDuration, null, methodAfterAnimate);
    };
    option.prototype.animatePosition = function (pos, duration, completeMethod) {
      var self = this;

      self.width(self.pixelWidth());
      self.height(self.pixelHeight());

      var currentPos = self.getDistanceFromStage();
      cet.dragndrop.Stage.$element.append(self.$element);
      self.setPosition(currentPos);

      self.disableHorizontalAnimationInStorage();

      self.$element.animate(pos, duration, null, completeMethod);
    };
    option.prototype.addMyselfToStorage = function (storagePos) {
      var self = this;
      var storagePosByPercentage = cet.dragndrop.Storage.getPositionByPercentage(storagePos);
      self.setPosition(storagePosByPercentage);

      cet.dragndrop.Storage.addOption(self);

      self.units.switchToPercentage();
    };

    option.prototype.getDistanceFromCanvas = function () {
      var canvasTop = parseFloat($('.canvas').css('top').replace('px', ''));
      var canvasLeft = parseFloat($('.canvas').css('left').replace('px', ''));

      var distanceFromStage = this.getDistanceFromStage();
      distanceFromStage.top -= canvasTop;
      distanceFromStage.left -= canvasLeft;

      return distanceFromStage;
    };
    option.prototype.getDistanceFromStage = function () {
      var self = this;
      var pos = {
        top: 0, left: 0
      };
      var elem = self.$element;

      while (elem.attr('id') != 'stage') {
        var left = elem[0].style.left ? elem[0].style.left : elem.css('left');
        var top = elem[0].style.top ? elem[0].style.top : elem.css('top');

        if (left.indexOf('px') != -1) {
          pos.left += parseFloat(left.replace('px', ''));
        } else {
          pos.left += (parseFloat(left.replace('%', '')) / 100) * elem.parent().width();
        }
        if (top.indexOf('px') != -1) {
          pos.top += parseFloat(top.replace('px', ''));
        } else {
          pos.top += (parseFloat(top.replace('%', '')) / 100) * elem.parent().height();
        }

        elem = elem.parent();
      }

      return pos;
    };
    option.prototype.position = function (position) {
      if (position)
        this.$element.css(position);

      return {
        top: this.top(), left: this.left()
      };
    };
    option.prototype.hide = function () {
      return this.$element.hide();
    };
    option.prototype.show = function () {
      return this.$element.css('display', 'table');
      //return this.$element.css('display', 'block');
    };
    option.prototype.fadeTo = function (val) {
      this.$element.fadeTo(0, val);
    };

    option.prototype.shift = function (x) {
      var self = this;
      self.$element.css({
        left: x + '%'
      });
      return;

      //I DONT KNOW IT IS NECESSARY BUT IT WORKS!!!
      var duration = cet.dragndrop.App.animationStopped() ? 0 : 10;
      setTimeout(function () {
        self.$element.css({ left: x });
      }, duration);
    };
    option.prototype.left = function () {
      //return parseInt(this.$element.css('left').replace('px', ''));
      return parseFloat(this.$element[0].style.left.replace('%', ''));
    };
    option.prototype.pixelLeft = function () {
      var val = this.$element[0].style.left;
      if (!val)
        val = this.$element.css('left');

      if (val.indexOf('%') != -1)
        return parseFloat(val.replace('%', '')) * this.$parent.width() / 100;
      return parseFloat(val.replace('px', ''));
    };
    option.prototype.top = function () {
      return parseFloat(this.$element[0].style.top.replace('%', ''));
    };

    option.prototype.bringToFront = function () {
      cet.dragndrop.Baskets.setZindexes(1);
      cet.dragndrop.Storage.setZindexes(0);
      cet.dragndrop.Buttons.setZindexes(0);
      this.$element.parents().css('z-index', 100);
      this.setZindex(100);
      this.$element.fadeTo(0, 0.7);
    };
    option.prototype.removeFromFront = function () {
      cet.dragndrop.Storage.bringToFront();
      this.$element.parents().css('z-index', 0);
      this.setZindex(0);
      this.$element.fadeTo(0, 1);
    };
    option.prototype.setZindex = function (val) {
      this.$element.css('z-index', val);
    };
    option.prototype.text = function () {
      return this.$element.find('.text').text();
    };
    option.prototype.width = function (newWidth) {
      if (newWidth)
        this.$element.css('width', newWidth);
      return this.$element[0].style.width;
    };
    option.prototype.pixelWidth = function () {
      return this.$element.width();
    };
    option.prototype.height = function (newHeight) {
      if (newHeight)
        this.$element.css('height', newHeight);
      return this.$element[0].style.height;
    };
    option.prototype.pixelHeight = function () {
      return this.$element.height();
    };
    option.prototype.appendToStage = function () {
      var self = this;
      self.convertPercentageToPixels();
      var targetPos = cet.dragndrop.Utils.getDistanceFromStage(self.$element);
      self.$element.css(targetPos);
      cet.dragndrop.Stage.append(self.$element);
    };

    option.prototype.clone = function () {
      var self = this;

      var optionData = {
        id: self.id,
        text: self.$element.find('.text').html(),
        image: self.$element.css('background-image').replace('url(', '').replace(')', ''),
        baskets: self.baskets
      };

      var clone$element = this.$element.clone();
      this.$element.parent().append(clone$element);
      return new option(clone$element, optionData);
    };
    option.prototype.adjustOptionSize = function () {
      this.draggie.setScaledDimentions();
    };
    option.prototype.animate = function (targetCss, animateDuration, easing, complete) {
      var self = this;
      var completeAdjustment = function () {
        if(complete)
          complete();
        setTimeout(function () {
          self.adjustOptionSize();
        }, animateDuration + 20);
        
      }
      self.$element.animate(targetCss, animateDuration, completeAdjustment);

    };
    return option;
  })();
  cet.dragndrop.option = option;
})(cet || (cet = {}));

window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
(function () {


  function group(element, data) {
    this.$element = $(element);
    this.dropBox = this.getDropBox();
    this.data = data;
    this.baskets = [];
    for (var i = 0; i < this.data.baskets.length; i++) {
      var basketId = this.data.baskets[i];
      var basket = cet.dragndrop.Baskets.getBasketById(basketId);
      basket.addClass('group-member');

      this.baskets.push(basket);
    }
  }
  group.prototype.getDropBox = function () {
    var self = this;
    var offset = self.$element.offset();
    var factor = 8;

    return {
      'top': offset.top - factor,
      'left': offset.left - factor,
      'right': offset.left + self.$element.width() + factor,
      'bottom': offset.top + self.$element.height() + factor
    };
  };

  group.prototype.getUnpopulatedBasket = function () {
    for (var i = 0; i < this.baskets.length; i++) {
      var candidateBasket = this.baskets[i];
      if (!candidateBasket.isPopulated()) {
        return candidateBasket;
      }
    }
    return null;
  };

  group.prototype.getInvalidBasket = function () {
    for (var i = 0; i < this.baskets.length; i++) {
      var candidateBasket = this.baskets[i];
      if (!candidateBasket.isExtra() && !candidateBasket.isValid()) {
        return candidateBasket;
      }
    }
    return null;
  };

  group.prototype.isValidOption = function (option) {
    for (var i = 0; i < this.baskets.length; i++) {
      var candidateBasket = this.baskets[i];
      var basketId = candidateBasket.getId();
      for (var j = 0; j < option.baskets.length; j++) {
        if (option.baskets[j] == basketId)
          return true;
      }
    }
    return false;
  };

  group.prototype.isPointContained = function (pointer) {
    var self = this;
    if (!pointer)
      return false;
    if (pointer.pageX < self.dropBox.left || pointer.pageX > self.dropBox.right || pointer.pageY > self.dropBox.bottom || pointer.pageY < self.dropBox.top) {
      return false;
    }

    return true;
  };

  group.prototype.getContainmentSize = function (pointer) {
    var self = this;
    var x = 0;
    var y = 0;

    var boxMiddleX = self.dropBox.left + ((self.dropBox.right - self.dropBox.left) / 2);

    if (pointer.pageX >= boxMiddleX)
      x = self.dropBox.right - pointer.pageX;
    else
      x = pointer.pageX - self.dropBox.left;

    var boxMiddleY = self.dropBox.top + ((self.dropBox.bottom - self.dropBox.top) / 2);
    if (pointer.pageY >= boxMiddleY)
      y = self.dropBox.bottom - pointer.pageY;
    else
      y = pointer.pageY - self.dropBox.top;
    return x + y;
  };

  group.prototype.updateDropBox = function () {
    this.dropBox = this.getDropBox();
  };

  group.prototype.id = function () {
    //var val = this.jqElement.attr('class').split(' ')[2];
    //if (!val)
    //  val = this.jqElement.attr('class').split(' ')[1];
    //return val;
    var classes = this.$element.attr('class').split(' ');
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('group-') != -1)
        return classes[i];
      if (classes[i].indexOf('group') == 0 && classes[i].length > 'group'.length)
        return classes[i];
    }
  };

  group.prototype.hideHover = function () {
    this.$element.removeClass('hover');
  };

  group.prototype.showHover = function () {
    this.$element.addClass('hover');
    this.removeFeedback();
  };

  group.prototype.getAvailableBasket = function (pointer) {
    //return hovered basket if available
    var hoveredBasket = cet.dragndrop.Baskets.getHoveredBasket(pointer, false);
    if (hoveredBasket && !hoveredBasket.isPopulated())
      return hoveredBasket;

    //return first available basket
    var candidateBasket = this.getUnpopulatedBasket();
    if (candidateBasket)
      return candidateBasket;

    if (cet.dragndrop.Content.isFreeGroupMode()) {
      return this.createBasket();
    }

    if (hoveredBasket)
      return hoveredBasket;

    if (!this.data.baskets || this.data.baskets.length == 0)
      return null;

    var lastBasketId = this.data.baskets[this.data.baskets.length - 1];
    var selectedBasket = cet.dragndrop.Baskets.getBasketById(lastBasketId);
    return selectedBasket;
  };

  group.prototype.getBaskets = function () {
    return this.baskets;
  };

  group.prototype.getBasketsIds = function () {
    var ids = []
    for (var key in this.baskets) {
      ids.push(this.baskets[key].getId());
    }
    return ids;
  };

  group.prototype.createBasket = function (id) {
    //id is received only when restoring already created basket
    if (!id)
      id = 'basket-' + Math.random().toString().replace('.', '');
    var newBasket = cet.dragndrop.Baskets.createBasket({ id: id, isExtra: true });
    newBasket.addClass('group-member');
    this.baskets.push(newBasket);
    return newBasket;

  };

  group.prototype.addBasket = function (bskt) {
    this.baskets.push(bskt);
  };

  group.prototype.rearrangeBaskets = function () {
    var self = this;
    //since we splice and change array during loop we start from the last element
    for (var i = this.baskets.length - 1; i > 0 ; i--) {
      var basket = this.baskets[i];

      if (basket.isExtra()) {
        //not popultaed extra basket has no meaning
        if (!basket.isPopulated()) {
          cet.dragndrop.Baskets.remove(basket);
          this.baskets.splice(i, 1);
          continue;
        }

        //move option into an unpopulted 'none extra' basket
        var unpopulatedBasket = this.getUnpopulatedBasket();
        if (unpopulatedBasket) {
          unpopulatedBasket.position(basket.position());
          unpopulatedBasket.addOption(basket.getOption());
          cet.dragndrop.Baskets.remove(basket);
          this.baskets.splice(i, 1);
          basket.remove();
          continue;
        }

        //switch options with 'errored' baskets
        var invalidBasket = self.getInvalidBasket();
        if (self.isValidOption(basket.getOption()) && invalidBasket) {
          var invalidBasketPosition = invalidBasket.position();
          invalidBasket.position(basket.position());
          basket.position(invalidBasketPosition);

          var invalidOption = invalidBasket.getOption();
          invalidBasket.addOption(basket.getOption());
          basket.addOption(invalidOption);
        }
      }
    }
  };

  group.prototype.isValid = function () {
    var self = this;
    for (var key in self.baskets) {
      if (!self.baskets[key].isValid()) {
        return false;
      }
    }
    return true;
  }

  group.prototype.showFeedback = function () {
    var self = this;
    

    self.$element.find('.feedback-correct, .feedback-error').hide();
    self.$element.addClass('feedback-visible');

    var feedbackIconSelector = '.feedback-';
    feedbackIconSelector += self.isValid() ? 'correct' : 'error';

    self.$element.find(feedbackIconSelector).css({ 'z-index': 1000, display: 'block' }).show();
  };

  group.prototype.hideFeedback = function () {
    this.removeFeedback();
  };

  group.prototype.removeFeedback = function () {
    this.$element.removeClass('feedback-visible');
    this.$element.find('.feedback-correct, .feedback-error').hide();
  };

  group.prototype.feedbackExists = function () {
    return this.$element.find('.feedback-correct, .feedback-error').is(':visible');
  }

  group.prototype.containsBasket = function (basket) {
    for (var key in this.baskets) {
      if (this.baskets[key].getId() == basket.getId()) {
        return true;
      }
    }
    return false;
  };

  cet.dragndrop.group = group;

})();


(function (cet) {
  (function (Groups) {
    var groups;

    function init() {
        groups = {};
        var $groups = $('.group');

        $.each($groups, function (index, elem) {
            var newGroupData = cet.dragndrop.Content.getGroupByIndex(index);
            var newGroup = new cet.dragndrop.group(elem, newGroupData);
            groups[newGroup.id()] = newGroup;
        });
    }
    Groups.init = init;

    function updateAndGetHoveredGroup(pointer) {
        var hovered = [];
        for (var key in groups) {
            var group = groups[key];
            if (group.isPointContained(pointer)) {
                hovered.push(group);
            }
            group.hideHover();
        }

        var winner = null;

        for (var i = 0; i < hovered.length; i++) {
            if (winner == null) {
                winner = hovered[i];
                continue;
            }

            if (hovered[i].getContainmentSize(pointer) >= winner.getContainmentSize(pointer))
                winner.hideHover();
            winner = hovered[i];
        }
        if (winner)
            winner.showHover();

        return winner;
    }
    Groups.updateAndGetHoveredGroup = updateAndGetHoveredGroup;

    function all() {
      return groups;
    }
    Groups.all = all;

    function getGroups() {
        return groups;
    }
    Groups.getGroups = getGroups;

    function getGroupBaskets(groupId) {
        return groups[groupId].getBaskets();
    }
    Groups.getGroupBaskets = getGroupBaskets;

    function validateBaskets() {
        var optionsUsage = {};
        var usedBaskets = cet.dragndrop.Baskets.getPopulation();
        for (var usedBasketId in usedBaskets) {
            if (!optionsUsage[usedBaskets[usedBasketId]])
                optionsUsage[usedBaskets[usedBasketId]] = [];
            optionsUsage[usedBaskets[usedBasketId]].push(usedBasketId);
        }

        for (var optionId in optionsUsage) {
            var numberOfInvalidBaskets = optionsUsage[optionId].length - Links.getNumberOfLinksByOptionId(optionId);
            for (var j = 1; j < numberOfInvalidBaskets; j++) {
                cet.dragndrop.Baskets.getBasketById(optionsUsage[optionId][j]).showError();
            }
        }
    }
    Groups.validateBaskets = validateBaskets;

    function updateDropBoxes() {
        for (var key in groups) {
            groups[key].updateDropBox();
        }
    }
    Groups.updateDropBoxes = updateDropBoxes;

    function rearrangeBaskets() {
        for (var groupId in groups) {
            groups[groupId].rearrangeBaskets();
        }
    }
    Groups.rearrangeBaskets = rearrangeBaskets;

    function showFeedback() {
        for (var key in groups) {
            groups[key].showFeedback();
        }
    }
    Groups.showFeedback = showFeedback;

    function removeFeedback() {
      for (var key in groups) {
        groups[key].removeFeedback();
      }
    }
    Groups.removeFeedback = removeFeedback;

    function removeAllErrors() {
      setTimeout(function () {
        for (var key in groups) {
          if (groups[key].feedbackExists() && !groups[key].isValid())
          groups[key].removeFeedback();
        }
      }, 1000);
    }
    Groups.removeAllErrors = removeAllErrors;

    function getGroupByBasket(basket) {
        for (var key in groups) {
            if (groups[key].containsBasket(basket))
                return groups[key];
        }
        return null;
    }
    Groups.getGroupByBasket = getGroupByBasket;

    function getGroupById(id) {
      return groups[id];
    }
    Groups.getGroupById = getGroupById;

  })(cet.dragndrop.Groups || (cet.dragndrop.Groups = {}));
  var Groups = cet.dragndrop.Groups;
})(cet || (cet = {}));


(function (cet) {
  (function (GroupsLinks) {
    var groupsLinks = [];
    function init() {
        var groups = cet.dragndrop.Content.getGroups();
        for (var i = 0; i < groups.length; i++) {
            groupsLinks.push(new groupLinks(groups[i]));
        }
    }
    GroupsLinks.init = init;

    function validate() {
        var isValid = true;
        for (var i = 0; i < groupsLinks.length; i++) {
            if (!groupsLinks[i].validate())
                isValid = false;
        }
        return isValid;
    }
    GroupsLinks.validate = validate;

  })(cet.dragndrop.GroupsLinks || (cet.dragndrop.GroupsLinks = {}));
  var GroupsLinks = cet.dragndrop.GroupsLinks;
})(cet || (cet = {}));




var groupLinks = (function () {
    function groupLinks(newgroup) {
        this.links = [];
        this.groupBaskets = [];
        this.optionLinkedBaskets = {};
        var self = this;
        self.groupBaskets = cet.dragndrop.Groups.getGroupBaskets(newgroup.id);
        self.groupOptions = self.getGroupOptions();
        self.optionLinkedBaskets = self.getOptionsLinkedBaskets();
    }
    groupLinks.prototype.basketIsLinkedToOption = function (option, basketId) {
        var self = this;
        var allLinks = cet.dragndrop.Content.getLinks();
        for (var i = 0; i < allLinks.length; i++) {
            if (allLinks[i].optionId == option.id) {
                for (var j = 0; j < allLinks[i].baskets.length; j++) {
                    if (allLinks[i].baskets[j] == basketId)
                        return true;
                }
            }
        }
        return false;
    };
    groupLinks.prototype.basketBelongToGroup = function (basketId) {
        var self = this;
        for (var i = 0; i < self.groupBaskets.length; i++) {
            if (self.groupBaskets[i].getId() == basketId)
                return true;
        }
        return false;
    };

    groupLinks.prototype.getOptionNumberOfBaskets = function (option) {
        var self = this;
        var count = 0;
        for (var i = 0; i < option.baskets.length; i++) {
            if (self.basketIsLinkedToOption(option, option.baskets[i]) && self.basketBelongToGroup(option.baskets[i]))
                count++;
        }
        return count;
    };

    groupLinks.prototype.getGroupOptions = function () {
        var self = this;
        var allOptions = cet.dragndrop.Content.getOptions();
        var groupOptions = [];

        for (var i = 0; i < allOptions.length; i++) {
            for (var j = 0; j < allOptions[i].baskets.length; j++) {
                if (self.basketBelongToGroup(allOptions[i].baskets[j])) {
                    groupOptions.push(allOptions[i]);
                    j = allOptions[i].baskets.length;
                }
            }
        }

        return groupOptions;
    };

    groupLinks.prototype.getOptionsLinkedBaskets = function () {
        var self = this;
        var optionLinkedBaskets = {};
        for (var i = 0; i < self.groupOptions.length; i++) {
            var option = self.groupOptions[i];
            optionLinkedBaskets[option.id] = option.isLinked ? self.getOptionNumberOfBaskets(option) : 1;
        }

        return optionLinkedBaskets;
    };

    groupLinks.prototype.getOptionsDistribution = function () {
        var self = this;
        var optionsDistribution = {};
        for (var i = 0; i < self.groupBaskets.length; i++) {
            var currBasket = self.groupBaskets[i];
            if (!currBasket.isPopulated())
                continue;
            var optionId = currBasket.getOption().getId();
            if (!optionsDistribution[optionId])
                optionsDistribution[optionId] = [];
            optionsDistribution[optionId].push(currBasket.getId());
        }

        return optionsDistribution;
    };

    groupLinks.prototype.validate = function () {
        var self = this;
        var isValid = true;
        var optionsDistribution = self.getOptionsDistribution();

        for (var optionId in optionsDistribution) {
            var optionPopulatedBaskets = optionsDistribution[optionId];
            var numberOfInvalidBaskets = optionPopulatedBaskets.length - self.optionLinkedBaskets[optionId];

            for (var j = optionPopulatedBaskets.length - numberOfInvalidBaskets; j < optionPopulatedBaskets.length; j++) {
                cet.dragndrop.Baskets.getBasketById(optionPopulatedBaskets[j]).isValid(false);
                isValid = false;
            }
        }

        return isValid;
    };
    return groupLinks;
})();

///<reference path='../../../../lib/external/jquery.d.ts'/>
///<reference path='group.ts'/>
(function () {

  var Links = (function () {
    return {
      getLinkedBasketsByOptionId: function (optionId) {
        var links = cet.dragndrop.Content.getLinks();
        if (!links || links.length == 0)
          return null;
        for (var i = 0; i < links.length; i++) {
          if (links[i].optionId == optionId)
            return links[i].baskets;
        }
      }
    }
  })();

  cet.dragndrop.Links = Links;

})();

window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
(function () {

  var Content = (function () {

    var contentJson = null;
    var basePath = '';
    var options = [];
    var baskets = [];




    function load(data) {

      if (typeof data == 'object') {
        loadFromObject(data);
        return;
      }


      // check if data is a json string
      if (data.charAt(0) == '{') {
        loadFromPreset(data);
        return;
      }


      //check if data is URI encoded string
      if (data.substr(0, 3) == '%7B') {
        data = decodeURIComponent(data);
        loadFromPreset(data);
      }
      else {
        loadFromUrl(data);
      }

    };
    function loadFromUrl(url) {
      $.getJSON(url, function (data) {
        contentJson = data;
        Content.shuffle();
        Stage.trigger('contentReady');
      }).fail(function () { alert('error');});
    };
    function fixContentApiErrors(string) {
      return string.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\r?\n|\r/g, '').replace(/&nbsp;/g, ' ');
    }
    function loadFromPreset(string) {

      //string = fixContentApiErrors(string)

      // convert Json string to real object
      contentJson = JSON.parse(string);
      Content.shuffle();
      Stage.trigger('contentReady');
    };
    function loadFromObject(obj) {
      contentJson = obj;
      Content.shuffle();
      Stage.trigger('contentReady');
    };
    function allBasketsMatched() {
      return options.length > cet.dragndrop.Baskets.count();
    }
    function hasUnmatchedBasket(option) {
      var usedBaskets = {};

      for (var usedOptionKey in options) {
        var usedOption = options[usedOptionKey];
        var basketFound = false;
        for (var i = 0; i < usedOption.baskets.length && !basketFound; i++) {
          var usedBasket = usedOption.baskets[i];
          if (!usedBaskets[usedBasket]) {
            usedBaskets[usedBasket] = true;
            basketFound = true;
          }
        }
      }

      for (var optionalBasketKey in option.baskets) {
        var optionalBasket = option.baskets[optionalBasketKey];
        if (!usedBaskets[optionalBasket])
          return true;
      }
      return false;


    }
    return {

      load: function (data) {
        load(data);
      },
      init: function () {
        //#region meta declarations
        Audio = cet.dragndrop.Audio;
        option = cet.dragndrop.option;
        Baskets = cet.dragndrop.Baskets;

        Stage = cet.dragndrop.Stage;
        Storage = cet.dragndrop.Storage;
        Buttons = cet.dragndrop.Buttons;
        Feedback = cet.dragndrop.Feedback;
        DragSync = cet.dragndrop.DragSync;
        //#endregion
        if (self == top) {
          var contentFromUrl = Content.getContentFromUrl();
          if (!contentFromUrl) {
            contentFromUrl = 'content1.js';
          }
          Content.load(contentFromUrl);
          return;
        }
        cet.content.on('clientready', function () {
          var file = cet.content.Settings.preset || 'content1.js'
          Content.load(file);
        });
      },
      isReady: function () {
        return contentJson != null;
      },
      getContentFromUrl: function () {
        var params = document.location.search.replace('?', '').split('&');
        for (var i in params) {
          if (params[i].toLowerCase().indexOf('content') != -1)
            return params[i].split('=')[1];
        }
        return null;
      },
      getContentJson: function () {
        return contentJson;
      },
      getRandomNumber: function (upperBound) {
        return Math.floor((Math.random() * upperBound));
      },
      getShowFinalFeedback: function () {
        if (!contentJson.feedback)
          return true;
        return contentJson.feedback.showFinalFeedback;
      },
      getFeedbackErrorRemoval: function () {
        return contentJson.feedback && contentJson.feedback.errorsRemoval;

      },
      getLifes: function () {
        return contentJson.lifes ? contentJson.lifes : 5;
      },
      getWelcomeSound: function () {
        return this.getContentJson().welcomeSound;
      },
      getInstructionsSound: function () {
        return this.getContentJson().instructionsSound;
      },
      getFontSize: function () {
        if (this.getContentJson().font)
          return this.getContentJson().font.size;
        return null;
      },
      getFontFamily: function () {
        var fontFamily = null;
        if (this.getContentJson().font)
          fontFamily = this.getContentJson().font.family;
        if (fontFamily && fontFamily.length > 2)
          fontFamily = fontFamily.substr(0, 2);
        return fontFamily;
      },
      getBorderColor: function () {
        if (this.getContentJson().borderColor)
          return this.getContentJson().borderColor;
        return null;
      },
      getBackgroundColor: function () {
        if (this.getContentJson().backgroundColor)
          return this.getContentJson().backgroundColor;
        return null;
      },
      getStorageBackgroundColor: function () {
        if (this.getContentJson().MdistractorBackgroundColor)
          return this.getContentJson().MdistractorBackgroundColor;
        return null;
      },
      getStorageStorageArrowColor: function () {
        if (this.getContentJson().MdistractorArrowColor)
          return this.getContentJson().MdistractorArrowColor;
        return null;
      },
      getOptionByIndex: function (optionIndex) {
        return options[optionIndex];
      },
      getQuestionTitle: function (optionIndex) {
        return options[optionIndex].title;
      },
      getNumberOfOptions: function () {
        return options.length;
      },
      loadSpecificOptions: function (specificOptions) {
        options = [];
        var allOptions = this.getContentJson().options.slice(0);
        for (var specificOptionKey in specificOptions) {
          var specificOption = specificOptions[specificOptionKey];
          var specificOptionId = cet.dragndrop.Utils.supportOldIds(specificOption.option)
          for (var j = 0; j < allOptions.length; j++) {
            var generalOption = allOptions[j]
            if (specificOptionId == generalOption.id)
              options.push(generalOption);
          }
        }
      },
      getOptions: function () {
        return options;
      },
      setOptions: function (val) {
        options = val;
      },
      getFadeOnDrag: function () {
        if (typeof this.getContentJson().fadeOnDrag === "boolean")
          return this.getContentJson().fadeOnDrag;
        return true;
      },

      shuffle: function () {
        var self = this;
        var options = self.getContentJson().options.slice(0);
        for (var j, x, i = options.length; i; j = Math.floor(Math.random() * i), x = options[--i], options[i] = options[j], options[j] = x);
        self.setOptions(options);
        baskets = self.getContentJson().baskets.slice(0);
      },
      getBaskets: function () {
        return baskets;
      },
      getGroups: function () {
        return this.getContentJson().groups || [];
      },
      getMedias: function () {
        return this.getContentJson().medias || [];
      },
      getBackgroundImage: function () {
        if (this.getContentJson().backgroundImage == 'none')
          return null;
        return this.getContentJson().backgroundImage;
      },
      getFontSize: function () {
        if (this.getContentJson().font)
          return this.getContentJson().font.size;
        return null;
      },
      getFontSizePx: function () {
        if (this.getContentJson().font && this.getContentJson().font.sizePx)
          return this.getContentJson().font.sizePx;
        return null;
      },
      getFontName: function () {
        if (this.getContentJson().font && this.getContentJson().font.name)
          return this.getContentJson().font.name;
        return "Alef";
      },
      getFinalFeedbackSuccessText: function () {
        return cet.dragndrop.Localization.data.successText;
      },
      getFinalFeedbackFailureText: function () {
        return cet.dragndrop.Localization.data.failureText;
      },
      isNonePerishableStorage: function () {
        return this.getContentJson().perishableStorage == undefined ? false : !this.getContentJson().perishableStorage;
      },
      isFreeGroupMode: function () {
        return this.getContentJson().freeGroupMode == undefined ? false : this.getContentJson().freeGroupMode;
      },
      getGroupByIndex: function (index) {
        return this.getContentJson().groups[index];
      },
      getLinks: function () {
        return this.getContentJson().links;
      },
      getSolution: function () {
        var baskets = [];
        var basketFound = false;
        var options = this.getOptions();

        for (var i = 0; i < options.length; i++) {
          var option = options[i];

          var optionLinkedBaskets = cet.dragndrop.Links.getLinkedBasketsByOptionId(option.id)
          if (!optionLinkedBaskets) {
            baskets.push({ option: option.id, basket: option.baskets[0] });
            continue;
          }
          for (var j = 0; j < optionLinkedBaskets.length; j++) {
            baskets.push({ option: option.id, basket: optionLinkedBaskets[j] });
          }
        }
        return {
          options: baskets
        };

      }

    };
  })();


  cet.dragndrop.Content = Content;

})();

window.cet = window.cet || {};
window.cet.localization = window.cet.localization || {};
window.cet.localization.ar = {

  "successText": "أحسنت",
  "failureText":"حاول مرة أخرى"

};

window.cet = window.cet || {};
window.cet.localization = window.cet.localization || {};
window.cet.localization.he = {

  "successText": "כל הכבוד",
  "failureText": "נסו שוב"

}

window.cet = window.cet || {};
window.cet.localization = window.cet.localization || {};
window.cet.localization.en = {
  "successText":"well done",
  "failureText":"try again"
}

window.cet = window.cet || {};
window.cet.localization = window.cet.localization || {};
window.cet.localization.vi = {

  "successText": "làm tốt",
  "failureText": "thử lại"

}

window.cet = window.cet || {};
window.cet.localization = window.cet.localization || {};
window.cet.localization.zh = {
  "successText": "真棒！",
  "failureText": "请重新回答"
};

window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};

(function () {

  cet.dragndrop.Localization = (function () {
    var data;
    var language;

    function getLang() {
      return cet.dragndrop.Content.getFontFamily();
    }
    return {
      init: function () {
        language = getLang();
        data = cet.localization[language];
      },
      get language() {
        return language;
      },
      get data() {
        if (!data) return undefined;
        return data;
      }
    }
  })();
})();

(function () {

  var Storage = (function () {
    var numberOfVisiblePositions;
    var hangingElement = null;
    var optionsContainerLeft;
    var optionsContainerWidth;
    var numberOfOptions;
    var navigationArrowLeft;
    var navigationArrowRight;
    var navigationArrowLeftSymbol;
    var navigationArrowRightSymbol;
    var jqStorage;
    var jqOptions
    var jqOptionsWidth;
    var options;
    var order;
    var positions;
    var distanceFromStage;

    var moving = false;

    var option;
    var Baskets;
    var Content;
    var Stage;
    var App;


    function hideOverflow() {

      jqStorage.css('overflow', 'hidden');
    }
    function showOverflow() {

      jqStorage.css('overflow', 'visible');
    }
    function showAll() {
      for (var key in options) {
        options[key].show();
      }
    }
    function getOptionClass(elem) {
      var classes = elem.attr('class').split(' ');
      for (var i in classes) {
        if (i && classes[i].indexOf('option') != -1 && classes[i].length == 7)
          return classes[i];
      }
      return null;

    }

    function getStorageLeft() {
      return parseFloat(jqStorage[0].style.left.replace('%', ''))
    }
    function getStoragePixelWidth() {
      return jqStorage.width();
    }
    function getStoragePixelHeight() {
      return jqStorage.height();
    }
    function isHiddenOnRight(option) {

      var optionsContainerPixelLeft = parseFloat(jqOptions.css('left').replace('px', ''))
      var optionRight = optionsContainerPixelLeft + option.pixelLeft() + option.pixelWidth();

      if (optionRight > getStoragePixelWidth())
        return true;
      return false;
    }
    function isHiddenOnLeft(option) {
      var optionsContainerPixelLeft = parseFloat(jqOptions.css('left').replace('px', ''))
      var tmp = optionsContainerPixelLeft + option.pixelLeft();

      if (tmp <= 0)
        return true;
      return false;
    }
    function isOptionVisible(option) {
      if (isHiddenOnLeft(option) || isHiddenOnRight(option))
        return false;
      return true;

    }
    function isOrderIndexVisible(index) {
      var optionsContainerPixelLeft = parseFloat(jqOptions.css('left').replace('px', ''))
      var pixelPosition = ((positions[index] * jqOptions.width()) / 100);
      var tmp = optionsContainerPixelLeft + pixelPosition;

      if (tmp < 0 || tmp + 5 > jqStorage.width())
        return false;
      return true;

    }
    function setOptionsVisibility() {

      for (var key in options) {
        var opt = options[key];
        if (isOptionVisible(opt))
          opt.show();
        else
          opt.hide();
      }

      setNavigationArrowsVisibility();

    }
    function getOptionByOrder(index) {
      return options[order[index]];
    }
    function getRequiredIndex(option) {
      var anchor = getStorageLeft();
      var delta = jqStorage.width() / numberOfVisiblePositions;
      var orderIndexOfFirstVisibleOption = getOrderIndexOfFirstVisibleOption()
      if (orderIndexOfFirstVisibleOption == -1)
        return 0;
      for (var i = 0; i < numberOfVisiblePositions; i++) {
        anchor += delta;
        if (option.units.percentage.left < anchor)
          return i + orderIndexOfFirstVisibleOption;
      }


      return orderIndexOfFirstVisibleOption + numberOfVisiblePositions;

      //for (var i = 0; i < order.length; i++) {
      // var option = options[order[i]];
      // if (isOptionVisible(option))
      //  return i + 2;
      //}
      throw 'no required index'
    }
    function isLastLeftOptionVisible() {
      return isOptionVisible(options[order[0]]);
    }
    function getOrderIndexOfFirstVisibleOption() {
      for (var i = 0; i < order.length; i++) {
        var option = getOptionByOrder(i);
        if (option && isOptionVisible(option))
          return i;
      }
      throw -1;
    }
    function getOrderIndexOfLastVisibleOption() {
      for (var i = order.length - 1; i >= 0; i--) {
        var option = getOptionByOrder(i);
        if (option && isOptionVisible(option))
          return i;
      }
      return -1;
    }
    function sortOptionsbyLeftPosition(id1, id2) {
      var option1 = options[id1];
      var option2 = options[id2];

      if (option1.left() < option2.left())
        return -1

      return 1;
    }
    function initStoragePositions() {
      for (var i = 0; i < order.length; i++) {
        positions[i] = options[order[i]].left();
      }
    }
    function emptyPositionExits() {

      var orderIndexOfFirstVisibleOption = getOrderIndexOfFirstVisibleOption();
      //var lastLeftHiddenOption = orderIndexOfFirstVisibleOption == 0 ? 0 : orderIndexOfFirstVisibleOption;
      for (var i = 0; i < numberOfVisiblePositions; i++) {
        if (!order[i + orderIndexOfFirstVisibleOption])
          return true;
      }
      return false;

    }
    function hiddenOptionsExists() {
      return hiddenLeftOptionsExists() || hiddenRightOptionsExists();
    }
    function hiddenLeftOptionsExists() {
      var index = 0;
      for (var i = order.length; i >= 0 ; i--) {
        if (order[i])
          index = i;
      }

      if (!order[index])
        return false;

      var lastOption = options[order[index]];
      if (isHiddenOnLeft(lastOption))
        return true;
      return false;
    }
    function hiddenRightOptionsExists() {
      var index = 0;
      for (var i = 0; i < order.length; i++) {
        if (order[i])
          index = i;
      }

      if (!order[index])
        return false;
      var lastOption = options[order[index]];
      if (isHiddenOnRight(lastOption))
        return true;
      return false;
    }
    function shiftAllLeft() {

      //var delta = ((optionsContainerWidth - cet.dragndrop.HtmlBuilder.OptionPercentageMargin) / numberOfOptions);
      var delta = delta = 16.775;
      optionsContainerLeft = optionsContainerLeft + delta;
      jqOptions.css('left', optionsContainerLeft + '%');
    }
    function shiftAllRight() {

      //var delta = ((optionsContainerWidth - cet.dragndrop.HtmlBuilder.OptionPercentageMargin) / numberOfOptions);
      var delta = delta = 16.775;
      optionsContainerLeft = optionsContainerLeft - delta;
      jqOptions.css('left', optionsContainerLeft + '%');
    }
    function getFirstLeftVisibleOrderIndex() {
      //if (!order[getVisibilityLeftBoundry()])
      //  return getVisibilityLeftBoundry();
      for (var i = 0; i < order.length; i++) {
        if (isOrderIndexVisible(i)) {
          return i;
        }
      }
      throw 'no visible options';
    }
    function getFirstRightVisibleOrderIndex() {
      for (var i = order.length - 1; i >= 0; i--) {
        if (isOrderIndexVisible(i)) {
          return i;
        }
      }
      throw 'no visible options';
    }
    function getVisibilityLeftBoundry() {
      return (numberOfOptions - numberOfVisiblePositions) / 2;
    }
    function getVisibilityRightBoundry() {
      return ((numberOfOptions - numberOfVisiblePositions) / 2) + numberOfVisiblePositions - 1;
    }
    function isStorageEmpty() {

      for (var i = 0; i < order.length; i++) {
        if (order[i])
          return false;
      }
      return true;
    }
    function isMovingRight() {

      var lastIndex = order[order.length - 1];
      return lastIndex == null;

    }
    function shiftRight(requiredIndex) {
      var newRoomPosition;
      for (var i = order.length - 1; i > requiredIndex; i--) {
        var key = order[i - 1];
        if (!key)
          continue;
        var option = options[key];

        newRoomPosition = option.position();
        option.shift(positions[i]);

        order[i] = order[i - 1];
        order[i - 1] = null;

      }

      return newRoomPosition;
    }
    function shiftLeft(requiredIndex) {
      var newRoomPosition;
      for (var i = 0; i < requiredIndex; i++) {
        var key = order[i + 1];
        if (!key)
          continue;

        var option = options[key];

        newRoomPosition = option.position();
        option.shift(positions[i]);

        order[i] = order[i + 1];
        order[i + 1] = null;

      }
      return newRoomPosition;
    }
    function getNextRightOptionIndex(index) {
      for (var i = 1; i + index < order.length; i++) {
        if (order[i + index])
          return i + index;
      }
      return -1;

    }
    function getNextLeftOptionIndex(index) {
      for (var i = index; i >= 0; i--) {
        if (order[i])
          return i;
      }
      return -1;

    }
   

    function disableNavigationArrows() {
      disableNavigationLeftArrow();
      disableNavigationRightArrow();
    }
    function disableNavigationLeftArrow() {
      navigationArrowLeftSymbol.stop('disable');
      navigationArrowLeft.removeClass('disable hover').addClass('disable');
    }
    function disableNavigationRightArrow() {
      navigationArrowRightSymbol.stop('disable');
      navigationArrowRight.removeClass('disable hover').addClass('disable');
    }

    function enableNavigationArrows() {
      if (hiddenRightOptionsExists()) {
        enableNavigationRightArrow();
      }
      if (hiddenLeftOptionsExists()) {
        enableNavigationLeftArrow();
      }
    }

    function enableNavigationRightArrow() {
      bringNavigationButtonsToFront();
      navigationArrowRight.removeClass('disable');
      var label = navigationArrowRight.hasClass('hover') ? 'hover' : 'normal'
      navigationArrowRightSymbol.stop(label);
    }
    function enableNavigationLeftArrow() {
      bringNavigationButtonsToFront();
      navigationArrowLeft.removeClass('disable');
      var label = navigationArrowLeft.hasClass('hover') ? 'hover' : 'normal'
      navigationArrowLeftSymbol.stop(label);
    }

    function initNavigationArrows () {

      navigationArrowLeft = $('.button-navigation-left');
      navigationArrowRight = $('.button-navigation-right');
      navigationArrowLeftSymbol = new symbol(navigationArrowLeft);
      navigationArrowRightSymbol = new symbol(navigationArrowRight);

      /********************* left ******************************/
      navigationArrowLeft.hover(
       function () {
         if (navigationArrowLeft.hasClass('disable'))
           return;
         navigationArrowLeftSymbol.stop('hover');
         navigationArrowLeft.addClass('hover')
       },
       function () {
         if (navigationArrowLeft.hasClass('disable'))
           return;
         navigationArrowLeft.removeClass('hover')
         navigationArrowLeftSymbol.stop('normal');
       }
      )
      navigationArrowLeft.on('mousedown', function () {
        if (navigationArrowLeft.hasClass('disable'))
          return;
        navigationArrowLeftSymbol.stop('down');
        navigationArrowLeft.removeClass('active').addClass('active');
      });
      navigationArrowLeft.on('mouseup', function () {
        if (navigationArrowLeft.hasClass('disable'))
          return;
        navigationArrowLeftSymbol.stop('hover');
        navigationArrowLeft.removeClass('active');
        navigationArrowLeftClickHandler();
      });

      /******************** right ******************************/
      navigationArrowRight.hover(
       function () {
         if (navigationArrowRight.hasClass('disable'))
           return;
         navigationArrowRightSymbol.stop('hover');
         navigationArrowRight.addClass('hover')
       },
       function () {
         if (navigationArrowRight.hasClass('disable'))
           return;
         navigationArrowRight.removeClass('hover')
         navigationArrowRightSymbol.stop('normal');
       }
      )
      navigationArrowRight.on('mousedown', function () {
        if (navigationArrowRight.hasClass('disable'))
          return;
        navigationArrowRightSymbol.stop('down');
        navigationArrowRight.removeClass('active').addClass('active');

      });
      navigationArrowRight.on('mouseup', function () {

        if (navigationArrowRight.hasClass('disable'))
          return;
        navigationArrowRightSymbol.stop('hover');
        navigationArrowRight.removeClass('active');
        nevigationArrowRightClickHandler();
      });
    }

    function navigationArrowLeftClickHandler() {
      setNavigationArrowsVisibility();

      if (moving)
        return;
      if (navigationArrowLeft.hasClass('disable'))
        return;

      moving = true;
      hideOverflow();
      showAll();
      shiftAllLeft();


      setTimeout(function () {
        setOptionsVisibility();
        showOverflow();
        moving = false;
      }, 500);
    }
    function nevigationArrowRightClickHandler() {
      setNavigationArrowsVisibility();

      if (moving)
        return;

      if (navigationArrowRight.hasClass('disable'))
        return;

      moving = true;
      hideOverflow()
      showAll();

      shiftAllRight();


      setTimeout(function () {

        setOptionsVisibility();
        showOverflow();
        moving = false;

      }, 500);
    }

    function isEliminateSpacesNecessary() {

      if (hiddenOptionsExists())
        return true;

      for (var i = 0; i < order.length - 2; i++) {
        if (order[i]) {//option exists
          for (var j = i + 1; j < order.length; j++) {
            if (!order[j]) {//missing option
              for (var k = j + 1; k < order.length; k++) {
                if (order[k])//options exists
                  return true;
              }
            }
          }
        }
      }
    }
    function setStorageAnimationClass() {
      if (jqOptions.hasClass('animate-transition'))
        return;
      jqOptions.addClass('animate-transition');
    }
    function bringNavigationButtonsToFront() {
      navigationArrowLeft.css('z-index', '');
      navigationArrowRight.css('z-index', '');
    }
    function initNumberOfVisibleOptions() {
      //fix merge

      var widthWithMargin = options[order[1]].left() - options[order[0]].left();
      var width = options[order[0]].width();

      var calculatedWidth = width;
      var counter = 0;
      while (calculatedWidth < jqStorage.width()) {
        calculatedWidth += widthWithMargin;
        counter++;

      }
      numberOfVisiblePositions = counter;


      numberOfVisiblePositions = parseInt(getStoragePixelWidth() / options[order[0]].pixelWidth());
    }

    function setNavigationArrowsVisibility() {
      
      /************* left *******************/
      if (!navigationArrowLeft.hasClass('active')) {
        if (hiddenLeftOptionsExists()) {
          enableNavigationLeftArrow();
        }
        else {
          disableNavigationLeftArrow();
        }
      }

      /************* right *******************/
      if (!navigationArrowRight.hasClass('active')) {
        if (hiddenRightOptionsExists()) {
          enableNavigationRightArrow();
        }
        else {
          disableNavigationRightArrow();
        }
      }
    }

    return {
      getOrder: function () { return order; },
      init: function () {
        var self = this;

        option = cet.dragndrop.option;
        Baskets = cet.dragndrop.Baskets;
        Content = cet.dragndrop.Content;
        Stage = cet.dragndrop.Stage;
        App = cet.dragndrop.App;


        jqStorage = $('.storage');
        jqOptions = $('.options');
        jqOptionsWidth = jqOptions.width();
        options = {};
        order = [];
        positions = [];


        var optionJqElements = jqOptions.find('.option');
        if (optionJqElements.length != Content.getOptions().length)
          throw 'number of options on page do not match number of options on content.js';
        

        $.each(optionJqElements, function (index, elem) {
          var optionData = Content.getOptionByIndex(index)
          if (!optionData)
            debugger;
          var newOption = new option(elem, optionData);


          options[newOption.getId()] = newOption;
          order.push(newOption.getId());
        });

        initNavigationArrows();
        order.sort(sortOptionsbyLeftPosition);
        initNumberOfVisibleOptions();
        initStoragePositions();
        setOptionsVisibility();
        setStorageAnimationClass();

        numberOfOptions = optionJqElements.length;
      
        optionsContainerLeft = parseFloat(jqOptions[0].style.left.replace('%', ''));

        optionsContainerWidth = parseFloat(jqOptions[0].style.width.replace('%', ''));

        //this call is important, for an IPAD issue 67299
        self.eliminateSpaces();


      },
      reloadOptionsContent: function () {
        var optionsData = Content.getOptions();

        var tmpOrder = order;
        order = [];

        var tmpOptions = options;
        options = {};

        for (var i = 0; i < optionsData.length; i++) {
          var optionData = optionsData[i];
          //var option = tmpOptions[optionData.id];
          var option = tmpOptions[tmpOrder[i]];
          if (!option)
            debugger;
          option.reloadData(optionData);
          options[option.getId()] = option;
          order.push(option.getId());
        };

      },
      addOption: function (option) {
        if (!options[option.getId()])
          options[option.getId()] = option;
        order[Storage.getAvailableOrderIndex()] = option.getId();

        var targetCss = {
          width: cet.dragndrop.HtmlBuilder.OptionPercentageWidth + '%',
          height: cet.dragndrop.HtmlBuilder.OptionPercentageHeight + '%'
        }

        option.animate(targetCss);

        option.width(targetCss.width);
        option.height(targetCss.height);

        //option.width(cet.dragndrop.HtmlBuilder.OptionPercentageWidth + '%')
        //option.height(cet.dragndrop.HtmlBuilder.OptionPercentageHeight + '%')

        jqOptions.append(option.jqElement);
        option.enableHorizontalAnimationInStorage();
        setOptionsVisibility();
        option.removeFromFront();
        hangingElement = null;
      },
      removeOption: function (option) {

        if (!options[option.getId()])
          return;//throw 'cannot add existing option to storage'

        delete options[option.getId()];
        var optionIndex = order.indexOf(option.getId());
        order[optionIndex] = null;
        hangingElement = null;
      },
      removeOptionAndEliminateSpaces: function (option) {
        Storage.removeOption(option);
        Storage.eliminateSpaces();

      },
      eliminateSpaces: function () {


        var duration = App.animationStopped() ? 0 : 500;
        hideOverflow();
        showAll();
        if (hiddenRightOptionsExists()) {

          for (var i = getFirstLeftVisibleOrderIndex() ; i < order.length - 1; i++) {
            var currentOption = order[i];
            if (currentOption == null) {

              var nextOptionIndex = getNextRightOptionIndex(i);
              if (nextOptionIndex == -1) {
                if (emptyPositionExits() && hiddenOptionsExists())
                  shiftLeft();

                setTimeout(function () {
                  setOptionsVisibility();
                  showOverflow();
                }, duration);
                return;
              }
              var nextOption = order[nextOptionIndex];
              options[nextOption].shift(positions[i]);
              order[i] = nextOption;
              order[nextOptionIndex] = null;
            }
          }

          setTimeout(function () {
            setOptionsVisibility();
            showOverflow();
          }, duration);
        }
        else if (hiddenLeftOptionsExists()) {

          for (var i = getFirstRightVisibleOrderIndex() ; i >= 0 && isEliminateSpacesNecessary() ; i--) {
            var currentOption = order[i];
            if (currentOption == null) {
              var nextOptionIndex = getNextLeftOptionIndex(i);
              if (nextOptionIndex == -1) {
                if (emptyPositionExits() && hiddenOptionsExists())
                  shiftLeft();
                setTimeout(function () {
                  setOptionsVisibility();
                  showOverflow();
                }, duration);
                return;
              }
              var nextOption = order[nextOptionIndex];
              options[nextOption].shift(positions[i]);
              order[i] = nextOption;
              order[nextOptionIndex] = null;
            }
          }



          setTimeout(function () {
            //fixOrderGaps();
            setOptionsVisibility();
            showOverflow();
          }, duration);
        }
        else {
          for (var i = getOrderIndexOfLastVisibleOption() ; i >= 0 && isEliminateSpacesNecessary() ; i--) {
            var currentOption = order[i];
            if (currentOption == null) {
              var nextOptionIndex = getNextLeftOptionIndex(i);
              if (nextOptionIndex == -1) {
                if (emptyPositionExits() && hiddenOptionsExists())
                  shiftLeft();
                setTimeout(function () {
                  setOptionsVisibility();
                  showOverflow();
                }, duration);
                return;
              }
              var nextOption = order[nextOptionIndex];
              options[nextOption].shift(positions[i]);
              order[i] = nextOption;
              order[nextOptionIndex] = null;
            }
          }



          setTimeout(function () {
            //fixOrderGaps();
            setOptionsVisibility();
            showOverflow();
          }, duration);
        }
      },
      forgetOption: function (option) {
        delete options[option.getSymbolTypeName()];
      },
      getOptionByJQueryElement: function (jqElement) {
        var optionId = getOptionClass(jqElement);
        if (optionId)
          return this.options[optionId];
        return null;
      },
      bringToFront: function () {
        bringNavigationButtonsToFront();
      },
      setZindexes: function (val) {
        jqStorage.css('z-index', val);
        navigationArrowLeft.css('z-index', val);
        navigationArrowRight.css('z-index', val);

        for (var key in options) {
          options[key].setZindex(val);
        }
      },
      makeRoom: function (option) {

        var newRoomPosition = Storage.getAvailableRoom();
        if (newRoomPosition) {
          return newRoomPosition;
        }
        hideOverflow();

        var requiredIndex = getRequiredIndex(option);

        if (isMovingRight()) {
          newRoomPosition = shiftRight(requiredIndex);
        }
        else {
          newRoomPosition = shiftLeft(requiredIndex);
        }

        var duration = App.animationStopped() ? 0 : 500;
        setTimeout(function () {

          setOptionsVisibility();
          showOverflow();

        }, duration);

        newRoomPosition.left = cet.dragndrop.Units.Utils.percentageToPixel(newRoomPosition.left, jqOptions.width());
        newRoomPosition.top = cet.dragndrop.Units.Utils.percentageToPixel(newRoomPosition.top, jqOptions.height());

        return newRoomPosition;

      },
      getAvailableRoom: function () {

        var orderIndex = Storage.getAvailableOrderIndex();
        if (orderIndex == null)
          return null;
        //var leftPosition = cet.dragndrop.Utils.percentageToPixel(positions[orderIndex], getStoragePixelWidth());
        var leftPosition = cet.dragndrop.Units.Utils.percentageToPixel(positions[orderIndex], jqOptions.width());
        var topPosition = cet.dragndrop.Units.Utils.percentageToPixel(cet.dragndrop.HtmlBuilder.OptionPercentageTop, jqOptions.height());

        return { left: leftPosition, top: topPosition };

      },
      getAvailableOrderIndex: function () {

        //var lastLeftHiddenOption = (order.length - numberOfVisiblePositions) / 2;
        //var firstRightHiddenOption = order.length - lastLeftHiddenOption;

        if (isStorageEmpty()) {
          return parseInt(getFirstLeftVisibleOrderIndex());
          //return parseInt((getFirstLeftVisibleOrderIndex() + (numberOfVisiblePositions / 2)) - 1);
        }

        if (hangingElement) {

          for (var i = 0; i < order.length; i++) {
            if (order[i] == hangingElement.getId())
              return i;

          }
        }

        //for (var i = lastLeftHiddenOption; i < firstRightHiddenOption; i++) {

        //  //when more then one index available, return the one next the a populated one
        //  if (order[i] == null && order[i + 1] != null)
        //    return i;

        //  //when the available index is the last one.
        //  //if (order[i] == null && i == (firstRightHiddenOption - 1))
        //  if (order[i] == null && order[i - 1] != null)
        //    return i;
        //}

        var availableIndex = null;
        for (var i = 0; i < order.length; i++) {
          if (isOrderIndexVisible(i)) {
            if (!order[i])
              availableIndex = i;
            else if ((i + 1) < order.length && !order[i + 1] && isOrderIndexVisible(i + 1))
              return i + 1;
          }

        }

        return availableIndex;
      },
      getNumberOfOptionsInStorage: function () {
        var count = 0;
        for (var i = 0; i < order.length; i++) {
          if (order[i])
            count++;
        }
        return count;
      },
      getDistanceFromStage: function () {
        if (!distanceFromStage) {
          var pos = { top: 0, left: 0 };
          var $elem = jqOptions;

          while ($elem.attr('id') != 'stage') {

            //pos.left += cet.dragndrop.Utils.percentageToPixel(parseFloat($elem[0].style.left.replace('%', '')), $elem.parent().width());
            //pos.top += cet.dragndrop.Utils.percentageToPixel(parseFloat($elem[0].style.top.replace('%', '')), $elem.parent().height());
            pos.left += parseFloat($elem.css('left').replace('%', ''));
            pos.top += parseFloat($elem.css('top').replace('px', ''));
            $elem = $elem.parent();
          }

          distanceFromPage = pos;
        }
        return distanceFromPage;
      },
      setOptionsVisibility: function () {

        for (var key in options) {
          var opt = options[key];
          if (isOptionVisible(opt))
            opt.show();
          else
            opt.hide();
        }

      },
      setElementAsHanging: function (option) {
        hangingElement = option;

      },
      getOptionById: function (id) {
        return options[id];

      },
      hideContainer: function () {
        jqStorage.hide();
      },
      showContainer: function () {
        jqOptions.show();
        jqStorage.show();
      },
      hide: function () {
        jqStorage.hide();
        navigationArrowLeft.hide();
        navigationArrowRight.hide();
      },
      show: function () {
        jqStorage.show();
        if (Baskets.count() > 6) {
          navigationArrowLeft.show();
          navigationArrowRight.show();
        }
      },
      enableNavigationArrows: function () {
        enableNavigationArrows();
      },
      disableNavigationArrows: function () {
        disableNavigationArrows();
      },
      disableAllOptions: function () {
        for (var key in options) {
          options[key].disable();
        }
      },
      disableAll: function () {
        Storage.disableAllOptions();
        disableNavigationArrows();
      },
      enableAll: function () {
        Storage.enableAllOptions();
        setNavigationArrowsVisibility();

      },
      disableAllOptionsExceptMe: function (option) {
        for (var key in options) {
          if (options[key] != option)
            options[key].disable();
        }
      },
      enableAllOptions: function () {
        for (var key in options) {
          options[key].enable();
        }
      },
      getOptions: function () {
        return options;
      },
      getPositions: function () {
        return positions;
      },
      resizeHandler: function () {
        for (var key in options) {
          options[key].resizeHandler();
        }
      },
      isOptionInValidStoragePosition: function (option) {
        var self = this;
        var optionDistanceFromStage = option.getDistanceFromStage();
        var storageDistanceFromStage = Storage.getDistanceFromStage();
        if (optionDistanceFromStage.top < storageDistanceFromStage.top)
          return false;
        var positionLeft = optionDistanceFromStage.left - storageDistanceFromStage.left;
        for (var i = 0; i < positions.length; i++) {
          if (positionLeft == positions[i])
            return true;
        }

        return false;
      },
      getPositionByPercentage: function (posByPixel) {
        jqOptionsWidth = jqOptions.width();
        return {
          left: (100 * (posByPixel.left / jqOptionsWidth)) + '%',
          top: cet.dragndrop.HtmlBuilder.OptionPercentageTop + '%'
        };
      },
      optionsHeight: function () {
        return jqOptions.height();

      },
      optionsWidth: function () {
        return jqOptions.width();
      },
      resizeOptions: function () { },
      adjustOptionsSize: function () {
        for (var key in options) {
          options[key].adjustOptionSize();
        }
        
      }


    }
  })();



  cet.dragndrop.Storage = Storage;


})();

(function () {

  var NonPerishableStorage = (function () {

    return {
      addOption: function (option) {
        option.remove();
      },
      removeOption: function (option) { },
      removeOptionAndEliminateSpaces: function (option) { },
      overrideOption: function (option) {
        var options = cet.dragndrop.Storage.getOptions();
        options[option.getId()] = option;
      },
      eliminateSpaces: function () {
        if (cet.dragndrop.Storage.getNumberOfOptionsInStorage() < 7) {
          $('.button-navigation-left').hide();
          $('.button-navigation-right').hide();
        }
      },
      getOptionPosition: function (option) {

        var order = cet.dragndrop.Storage.getOrder();
        var positions = cet.dragndrop.Storage.getPositions();

        var index;
        for (var i = 0; i < order.length; i++) {
          if (order[i] == option.getId())
            index = i;
        }

        return positions[index];
      },

      makeRoom: function (option) {
        var optionPosition = cet.dragndrop.Storage.getOptionPosition(option);
        var leftPosition = cet.dragndrop.Units.Utils.percentageToPixel(optionPosition, cet.dragndrop.Storage.optionsWidth());
        var topPosition = cet.dragndrop.Units.Utils.percentageToPixel(cet.dragndrop.HtmlBuilder.OptionPercentageTop, cet.dragndrop.Storage.optionsHeight());
        return { left: leftPosition, top: topPosition };
      }
    }
  })();

  cet.dragndrop.NonPerishableStorage = NonPerishableStorage;

})();


 
(function () {
  var Xapi = (function () {
    //var supported;

    return {
      init: function () {
        //supported = cet.content.xapiSupported;
      },
      sendMessage: function (action, score, scores, fullAnswer) {
        if (!cet.content.xapiSupported)
          return;
        var request = {}
        request.fullQuestion = {};
        request.fullQuestion.initialState = {};

        request.verb = action;
        request.fullAnswer = {};
        request.fullAnswer.currentState = {};

        request.result = {};
        request.result.extensions = {};
        request.result.extensions['http://xapi.cet.ac.il/full_answer'] = fullAnswer;
        request.result.extensions['http://xapi.cet.ac.il/score'] = scores;

        request.result.scaled = score / 100;
        request.result.success = (score == 100);
        request.result.completion = true; // (score == 100 && bJustChecked);
        cet.content.xapi.send(request);
      },
      actions: {
        "answered": "answered",
        "asked_check": "asked_check",
        "asked_showAnswer": "asked_showAnswer",
        "cleared": "cleared"
      }
    }
    

  })();

  cet.dragndrop.Xapi = Xapi;

})();
/// <reference path="Baskets.js"/>
window.cet = window.cet || {}; window.cet.dragndrop = window.cet.dragndrop || {};
cet.content.clientLoaded();
(function () {

  var App = (function () {

    //#region meta declarations

    var option;
    var Baskets;
    var Content;
    var Stage;
    var Storage;
    var Buttons;
    var Host;
    var Feedback;
    var DragSync;
    var HtmlBuilder;
    var Groups;
    var GroupsLinks;
    var Localization;
    var Xapi;

    //#endregion

    cet.dragndrop.Preloader.show();
    var version = '1.0.2';
    var composition;
    var hidedElements;
    var initiated = false;
    var animationStopped = false;
    var resizeLocked = 0;
    var ratio;
    var restored = false;
    var successTimeoutId;
    var showSolutionTimeoutId;
    //some tablets have less height then app requires in config file (plugins xml).
    //so we decrease app height in order to show app without the need to scroll.
    //var hostClientHeight;
    setTimeout(function () { App.init(); }, 1);

    var originalFontSize;
    var originalWidth;

    function getRatio() {
      if (!ratio)
        ratio = cet.dragndrop.Stage.height() / cet.dragndrop.Stage.width();
      return ratio;
    }

    function initResizeHandlers() {

      $(window).resize(function () {
        //window.onresize();//cet.content.onresize(adjustSize);//
        adjustSize();
        Stage.resetScale();
        Baskets.resizeHandler();
        Storage.resizeHandler();
      });
    }

    function adjustSize(sizing) {

      var MIN_SCREEN_WIDTH = 1024;

      if (!sizing)
        sizing = cet.content.UI.getSizingSettings();

      var optimalWidth = 860, optimalHeight = 557;//631;
      var ratio = optimalHeight / optimalWidth; // content height/width

      var width = sizing.width || sizing.maxWidth;
      var height = sizing.height || sizing.maxHeight;

      //var height = width / optimalWidth * optimalHeight;

      if (height > ratio * width) {
        height = ratio * width;
      }

      var isFullScreen = (window.screen.width > MIN_SCREEN_WIDTH && window.screen.width * 0.85 < width) ? true : false;
      if (isFullScreen) {
        var width = width * 0.58;
        var height = height * 0.58;
      }


      if (!originalFontSize)
        originalFontSize = parseFloat(Stage.fontSize().replace('px'));
      if (!originalWidth)
        originalWidth = Stage.width();

      var newFontSize = originalFontSize * width / originalWidth;

      Stage.css({
        'width': width,
        'height': height,
        'font-size': newFontSize
      });

      var newsize = { width: width, height: height };

      //if (sizing.height === undefined || sizing.width === undefined) { // otherwize calling resize does not take effect
      //  cet.content.UI.resizeTo(newsize);
      //}

      setTimeout(function() {
        cet.dragndrop.Baskets.updateDropBoxes();
        cet.dragndrop.Groups.updateDropBoxes();
        cet.dragndrop.Storage.adjustOptionsSize();
        cet.dragndrop.Storage.setOptionsVisibility();
      }, 0);
    }

    function setLocalizedResources() {
      $('.final-feedback-success .feedback-text').text(Content.getFinalFeedbackSuccessText());
      $('.final-feedback-failure .feedback-text').text(Content.getFinalFeedbackFailureText());
    }

    function fixIPadOverflowIssue() {
      //for an IPAD issue 67299
      setTimeout(function () {
        var opts = $('.options');
        opts.hide();
        $('.storage').css('overflow', 'visible');
        opts.show();
      }, 1200);
    }

    function restoreFreeGroupsState(state) {
      if (!cet.dragndrop.Content.isFreeGroupMode())
        return;
      if (!state.groups)
        return;

      var groups = state.groups;
      for (var i = 0; i < groups.length; i++) {
        var group = cet.dragndrop.Groups.getGroupById(groups[i].id);
        for (var j = 0; j < groups[i].baskets.length; j++) {
          var basket = cet.dragndrop.Baskets.getBasketById(groups[i].baskets[j].id);
          if (!basket) {
            basket = group.createBasket(groups[i].baskets[j].id)
            group.addBasket(basket);
          }
          basket.position(groups[i].baskets[j].position);
        }
      }
    }

    function restoreFreeGroupsStateFeedbackAfterOptionsRestore(state) {
      if (!cet.dragndrop.Content.isFreeGroupMode())
        return;
      if (!state.groups)
        return;

      var groups = state.groups;
      for (var i = 0; i < groups.length; i++) {
        var group = cet.dragndrop.Groups.getGroupById(groups[i].id);
        if (groups[i].feedbackExists)
          group.showFeedback();
      }
    }

    function restoreOptionsState(state) {
      var options = state.options ? state.options : state;
      for (var i = 0; i < options.length; i++) {

        var restoreMe = options[i];

        if (!restoreMe.basket)
          continue;
        var basket = Baskets.getBasketById(restoreMe.basket);
        basket.unpopulate(false);
        var option = Storage.getOptionById(restoreMe.option);

        if (cet.dragndrop.Content.isNonePerishableStorage()) {
          option = option.clone();
        }
        else {
          Storage.removeOption(option);
        }

        basket.addOption(option);
        if (restoreMe.feedbackExists)
          basket.showFeedback();

      }
    }

    function getOptionsState() {
      var options = [];
      var storageOptions = Storage.getOptions();
      for (var key in storageOptions) {
        options.push({ option: storageOptions[key].getId() });
      }
      var basketsPopulation = Baskets.getPopulation();
      for (var pkey in basketsPopulation) {
        options.push({
          option: basketsPopulation[pkey],
          basket: pkey,
          feedbackExists: Baskets.getBasketById(pkey).feedbackExists()
        });
      }
      return options;
    }

    function getGroupsState() {
      var groups = Groups.all();
      var groupsData = [];
      for (var key in groups) {
        var group = groups[key];
        var groupData = {
          id: key,
          feedbackExists: group.feedbackExists(),
          baskets: []
        };

        for (var bkey in group.baskets) {
          groupData.baskets.push({
            id: group.baskets[bkey].getId(),
            position: group.baskets[bkey].position()
          });
        }
        groupsData.push(groupData);
      }
      return groupsData;
    }

    function nonePerishableStorageWEIRDConditionIsTrue(options) {
      return !cet.dragndrop.Content.isNonePerishableStorage() && options.length !== Content.getOptions().length;
    }

    function getScorePerBasket() {

      var errors = 0;
      var total = 0;

      //var score = new Array();
      var optionBasket = {};
      var scoreBasket = {};
      var optionCounter = 0;

      for (basketKey in cet.dragndrop.Baskets.baskets) {

        optionCounter++;
        optionBasket[basketKey] = "option-" + optionCounter;

        var basket = cet.dragndrop.Baskets.baskets[basketKey];
        //isDistractingOption is not relevant to score
        if (!basket.isVisible)
          continue;

        //extra baskets are never a part of score calculation,
        //since it always populate an 'error' option, which will be calculated on its valid basket.
        if (basket.isExtra())
          continue;
        total++;

        if (!basket.isPopulated()) {
          errors++;
          scoreBasket[basketKey] = 0;
        }
        else if (!basket.isValid()) {
          errors++;
          scoreBasket[basketKey] = 0;
        } else {
          scoreBasket[basketKey] = 1;
        }
      }
      return scoreBasket;

    }

    return {
      recoverEdgeDelay: function () {
        if (initiated)
          return;
        if (window.location.href.indexOf('recoveryAtempt') !== -1) {
          alert('Due to network limitations, page cannot be loaded.');
          return;
        }
        window.location.href = window.location.search ? window.location.href + 'recoveryAtempt' : window.location.href + '?recoveryAtempt';
      },
      composition: function (val) {
        if (val)
          composition = val;
        return composition;
      },
      disableAll: function () {

      },
      adjustSize: function () {
        var jqWindow = $(window);

        var xRatio = jqWindow.width() / Stage.width();
        var yRatio = jqWindow.height() / Stage.height();
        var ratio = xRatio > yRatio ? yRatio : xRatio;
        Stage.scale(ratio);

      },
      addNoScaleMetaTag: function () {
        if ($('meta[name=viewport]').length !== 0)
          return;
        var viewPortTag = document.createElement('meta');
        viewPortTag.id = "viewport";
        viewPortTag.name = "viewport";
        viewPortTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.getElementsByTagName('head')[0].appendChild(viewPortTag);
      },
      getVersion: function () {
        return version;
      },
      resizeLocked: function (val) {
        if (typeof val !== 'undefined') {

          if (val === true) {
            resizeLocked = resizeLocked + 1;
          } else if (val === false) {
            resizeLocked = resizeLocked - 1;
          }
        }

        if (resizeLocked > 0) {
          return true;
        }
        else {
          return false;
        }
      },
      init: function () {
        //#region meta declarations
        option = cet.dragndrop.option;
        Baskets = cet.dragndrop.Baskets;
        Content = cet.dragndrop.Content;
        Stage = cet.dragndrop.Stage;
        Storage = cet.dragndrop.Storage;
        Buttons = cet.dragndrop.Buttons;
        Host = cet.dragndrop.Host;
        Feedback = cet.dragndrop.Feedback;
        DragSync = cet.dragndrop.DragSync;
        HtmlBuilder = cet.dragndrop.HtmlBuilder;
        Groups = cet.dragndrop.Groups;
        GroupsLinks = cet.dragndrop.GroupsLinks;
        Localization = cet.dragndrop.Localization;
        Xapi = cet.dragndrop.Xapi;
        //#endregion

        var self = this;

        cet.dragndrop.App.addNoScaleMetaTag();
        Stage.init();
        Stage.eliminateIPadBounceEffect();

        Stage.bind('contentReady', function () {

          Localization.init();
          HtmlBuilder.build();
          DragSync.init();
          Storage.init();
          Baskets.init();
          Groups.init();
          GroupsLinks.init();
          Buttons.init();
          Host.init();
          Feedback.init();
          initResizeHandlers();
          Xapi.init();
          adjustSize();//$(window).onresize();//cet.content.onresize(adjustSize);//
          cet.dragndrop.Preloader.waitOneSecAndHide();
          setLocalizedResources();

          fixIPadOverflowIssue();//this call is important, for an IPAD issue 67299
        });
        Stage.bind('restartClick', self.restart);
        Stage.bind('checkClick', self.showFeedback);
        Content.init();

      },
      restoreState: function (state) {
        if (!state)
          return;
        if (restored)
          return;
        restored = true;
        //next line remark: free group was having problems here, while switching the options from % to px.
        //Storage.hideContainer();

        restoreFreeGroupsState(state);

        restoreOptionsState(state);
        
        restoreFreeGroupsStateFeedbackAfterOptionsRestore(state);

        Storage.eliminateSpaces();
        setTimeout(Storage.eliminateSpaces, 400);
        //next line remark: free group was having problems here, while switching the options from % to px.
        //setTimeout(Storage.showContainer, 220);
        if (state.finalFeedback)
          setTimeout(Feedback.showSuccess, 240);

        if (state.readonly)
          App.setAsReadOnly();
      },
      getState: function () {

        var options = getOptionsState();
        if (nonePerishableStorageWEIRDConditionIsTrue(options))
          return null;
        var groups = getGroupsState();

        var result = {
          options: options,
          groups: groups,
          finalFeedback: Feedback.isVisible(),
          readonly: Stage.isReadOnly()
        };
        return result;
      },
      setAsReadOnly: function () {
        //delayed in order to enable restored options to be set in basket.
        Stage.setAsReadOnly();
        setTimeout(function () {
          Storage.disableAll();
          Baskets.disableAllOptions();
          Buttons.disableAll();
        }, 300);
      },
      unsetAsReadOnly: function () {
        //delayed in order to enable restored options to be set in basket.
        setTimeout(function () {
          Storage.enableAll();
          Baskets.enableAllOptions();
          Buttons.enableAll();
          Stage.unsetAsReadOnly();
        }, 300);
      },
      restart: function () {

        //check if studio param errorRemoval is ON and remove errors 'manually'
        if (cet.dragndrop.Content.getFeedbackErrorRemoval() === null) {
          Baskets.unpopulate();
        }
        //check all errors are back to storage and only then clean
        if (!Baskets.errorFeedbackExists()) {
          var timeOut = 0;
          if (Baskets.anyFeedbackExists()) {
          //wait till errors go back to storage
            timeOut = 500;
          }
          setTimeout(function () {
            clearTimeout(successTimeoutId);
            clearInterval(showSolutionTimeoutId);
            //reset score to sero
            cet.content.lms.Activity.score(0);
            Storage.show();
            Feedback.hide();
            Baskets.unpopulate();
            Groups.removeFeedback();
            App.unsetAsReadOnly();
            restored = false;
          }, timeOut);
        }
      },
      showSolution: function () {
        var self = this;
        Baskets.unpopulate();

        showSolutionTimeoutId = setInterval(function () {
          if (!Baskets.anyFeedbackExists()) {
            clearInterval(showSolutionTimeoutId);
            setTimeout(function () {
                restored = false;

                App.restoreState(Content.getSolution());
                Baskets.restoreOriginalPozitions();
                App.setAsReadOnly();
                Stage.trigger('showsolution', self);
            }, 0);
          }
        }, 600);
      },
      animationStopped: function (val) {
        if (typeof val !== 'undefined') {
          animationStopped = val;
        }
        return animationStopped;
      },
      showFeedback: function (avoidAutomaticErrorRemoval) {

        var self = this;
        cet.dragndrop.Groups.rearrangeBaskets();
        cet.dragndrop.GroupsLinks.validate();
        cet.dragndrop.Baskets.showFeedback();
        cet.dragndrop.Groups.showFeedback();

        if (cet.dragndrop.Baskets.isPerfectSolution()) {
          successTimeoutId = setTimeout(function () {
            cet.dragndrop.Feedback.showSuccess();
            cet.dragndrop.Stage.trigger('showfeedback', self);
          }, 1000);
          return;
        }

        if (!avoidAutomaticErrorRemoval && cet.dragndrop.Content.getFeedbackErrorRemoval() === 'automaticaly') {
          cet.dragndrop.Baskets.removeAllErrors();
          cet.dragndrop.Groups.removeAllErrors();

        }

      },
      isPercentageHtml: function () {
        return true;
      },
      getScore: function () {

        var errors = 0;
        var total = 0;

        for (basketKey in cet.dragndrop.Baskets.baskets) {
          var basket = cet.dragndrop.Baskets.baskets[basketKey];
          //isDistractingOption is not relevant to score
          if (!basket.isVisible)
            continue;

          //extra baskets are never a part of score calculation,
          //since it always populate an 'error' option, which will be calculated on its valid basket.
          if (basket.isExtra())
            continue;

          total++;
          
          if (!basket.isPopulated()) {
            errors++;
          }
          else if (!basket.isValid()) {
            errors++;
          }
        }

        var corrects = total - errors;
        var score = parseInt(100 * (corrects / total));
        return score;
      },
      getScores: function () {

        // get all groups' baskets
        var groups = cet.dragndrop.App.getState().groups;
        var baskets = cet.dragndrop.Baskets.baskets;

        // get all scores per basket
        var allScores = getScorePerBasket();

        var totalAnswersPerGroup = {};
        var correctGroupScores = {};
        var totalGroupScore = {};

        // groups don't have option data if the question failed so we need to join opitons in baskets and baskets in groups
        // check if there are groups or baskets
        if (groups.length === 0) {
          return allScores;
        } else {
          for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.baskets.length; j++) {
              var basket = group.baskets[j].id;
              if (allScores[basket] != undefined) {
                totalGroupScore[group.id + "|" + basket] = allScores[basket];
              } else {
                // Distracting option
                totalGroupScore[group.id + "|" + basket] = 0;
              }
            }
          }
          return totalGroupScore;
        }
      },
      getFullAnswers: function () {
        var groups = cet.dragndrop.App.getState().groups;
        var baskets = cet.dragndrop.Baskets.baskets;
        var answers = {};
        var groupAnswers = {};

        // get all baskets' optionts
        var options = cet.dragndrop.App.getState().options;
        for (var basket in baskets) {
          if (baskets[basket]['option'] != undefined) {
            answers[basket] = baskets[basket]['option']['id'];
          } else if (baskets[basket].isVisible) {
            answers[basket] = '';
          }
        }

          // groups don't have option data if the question failed so we need to join opitons in baskets and baskets in groups
          // check if there are groups or baskets
        if (groups.length === 0) {
          return answers;
        } else {
          // join options in basket with baskets in groups
          for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.baskets.length; j++) {
              var basket = group.baskets[j].id;
              if(answers[basket]!= undefined){
                groupAnswers[group.id + "|" + basket] = answers[basket];
              } else {
                // Distracting option
                groupAnswers[group.id + "|" + basket] = '';
              }
            }
          }

          // append all baskets which "defined" outside of groups to "special" group
          var extra = cet.dragndrop.App.getSpecialGroup(answers, groupAnswers);
          $.extend(groupAnswers, extra);
          return groupAnswers;
        }
      },
      getSpecialGroup: function (answers, groupAnswers) {
        // clone answers;
        var ans = JSON.parse(JSON.stringify(answers));
        for (key in groupAnswers) {
          var basketId = key.split('|')[1];
          if (ans[basketId] !== undefined)
            delete ans[basketId];
        }
        var extraGroup = {};
        var extraId = 'group-Z';
        for (key in ans) {
          extraGroup[extraId + "|" + key] = ans[key];
        }
        return extraGroup;
      }
  }
  })();

  cet.dragndrop.App = App;

})();