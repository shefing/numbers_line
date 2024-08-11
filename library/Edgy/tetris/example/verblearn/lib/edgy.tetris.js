///#source 1 1 /lib/js/external/jquery/2.0.3/jquery-2.0.3.min.js
/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.3.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);

///#source 1 1 /Edgy/lib/external/soundmanager2/soundmanager2-nodebug-jsmin.js
/** @license
 *
 * SoundManager 2: JavaScript Sound for the Web
 * ----------------------------------------------
 * http://schillmania.com/projects/soundmanager2/
 *
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License:
 * http://schillmania.com/projects/soundmanager2/license.txt
 *
 * V2.97a.20130512
 */
(function(l,h){function V(V,la){function W(b){return c.preferFlash&&D&&!c.ignoreFlash&&c.flash[b]!==h&&c.flash[b]}function r(b){return function(c){var d=this._s;return!d||!d._a?null:b.call(this,c)}}this.setupOptions={url:V||null,flashVersion:8,debugMode:!0,debugFlash:!1,useConsole:!0,consoleOnly:!0,waitForWindowLoad:!1,bgColor:"#ffffff",useHighPerformance:!1,flashPollingInterval:null,html5PollingInterval:null,flashLoadTimeout:1E3,wmode:null,allowScriptAccess:"always",useFlashBlock:!1,useHTML5Audio:!0,
html5Test:/^(probably|maybe)$/i,preferFlash:!0,noSWFCache:!1,idPrefix:"sound"};this.defaultOptions={autoLoad:!1,autoPlay:!1,from:null,loops:1,onid3:null,onload:null,whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onposition:null,onstop:null,onfailure:null,onfinish:null,multiShot:!0,multiShotEvents:!1,position:null,pan:0,stream:!0,to:null,type:null,usePolicyFile:!1,volume:100};this.flash9Options={isMovieStar:null,usePeakData:!1,useWaveformData:!1,useEQData:!1,onbufferchange:null,
ondataerror:null};this.movieStarOptions={bufferTime:3,serverURL:null,onconnect:null,duration:null};this.audioFormats={mp3:{type:['audio/mpeg; codecs\x3d"mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],required:!0},mp4:{related:["aac","m4a","m4b"],type:['audio/mp4; codecs\x3d"mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],required:!1},ogg:{type:["audio/ogg; codecs\x3dvorbis"],required:!1},opus:{type:["audio/ogg; codecs\x3dopus","audio/opus"],required:!1},
wav:{type:['audio/wav; codecs\x3d"1"',"audio/wav","audio/wave","audio/x-wav"],required:!1}};this.movieID="sm2-container";this.id=la||"sm2movie";this.debugID="soundmanager-debug";this.debugURLParam=/([#?&])debug=1/i;this.versionNumber="V2.97a.20130512";this.altURL=this.movieURL=this.version=null;this.enabled=this.swfLoaded=!1;this.oMC=null;this.sounds={};this.soundIDs=[];this.didFlashBlock=this.muted=!1;this.filePattern=null;this.filePatterns={flash8:/\.mp3(\?.*)?$/i,flash9:/\.mp3(\?.*)?$/i};this.features=
{buffering:!1,peakData:!1,waveformData:!1,eqData:!1,movieStar:!1};this.sandbox={};this.html5={usingFlash:null};this.flash={};this.ignoreFlash=this.html5Only=!1;var Ja,c=this,Ka=null,k=null,X,p=navigator.userAgent,La=l.location.href.toString(),n=document,ma,Ma,na,m,u=[],L=!1,M=!1,q=!1,x=!1,oa=!1,N,w,pa,Y,qa,E,F,G,Na,ra,Z,sa,$,ta,H,ua,O,va,aa,I,Oa,wa,Pa,xa,Qa,P=null,ya=null,Q,za,J,ba,ca,s,R=!1,Aa=!1,Ra,Sa,Ta,da=0,S=null,ea,Ua=[],fa,v=null,Va,ga,T,y,ha,Ba,Wa,t,fb=Array.prototype.slice,z=!1,Ca,D,Da,Xa,
B,ia,Ya=0,U=p.match(/(ipad|iphone|ipod)/i),Za=p.match(/android/i),C=p.match(/msie/i),gb=p.match(/webkit/i),ja=p.match(/safari/i)&&!p.match(/chrome/i),Ea=p.match(/opera/i),hb=p.match(/firefox/i),Fa=p.match(/(mobile|pre\/|xoom)/i)||U||Za,$a=!La.match(/usehtml5audio/i)&&!La.match(/sm2\-ignorebadua/i)&&ja&&!p.match(/silk/i)&&p.match(/OS X 10_6_([3-7])/i),Ga=n.hasFocus!==h?n.hasFocus():null,ka=ja&&(n.hasFocus===h||!n.hasFocus()),ab=!ka,bb=/(mp3|mp4|mpa|m4a|m4b)/i,Ha=n.location?n.location.protocol.match(/http/i):
null,cb=!Ha?"http://":"",db=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,eb="mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),ib=RegExp("\\.("+eb.join("|")+")(\\?.*)?$","i");this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;this.useAltURL=!Ha;var Ia;try{Ia=Audio!==h&&(Ea&&opera!==h&&10>opera.version()?new Audio(null):new Audio).canPlayType!==h}catch(jb){Ia=!1}this.hasHTML5=Ia;this.setup=function(b){var e=!c.url;b!==h&&q&&v&&c.ok();pa(b);
b&&(e&&(O&&b.url!==h)&&c.beginDelayedInit(),!O&&(b.url!==h&&"complete"===n.readyState)&&setTimeout(H,1));return c};this.supported=this.ok=function(){return v?q&&!x:c.useHTML5Audio&&c.hasHTML5};this.getMovie=function(b){return X(b)||n[b]||l[b]};this.createSound=function(b,e){function d(){a=ba(a);c.sounds[a.id]=new Ja(a);c.soundIDs.push(a.id);return c.sounds[a.id]}var a,f=null;if(!q||!c.ok())return!1;e!==h&&(b={id:b,url:e});a=w(b);a.url=ea(a.url);void 0===a.id&&(a.id=c.setupOptions.idPrefix+Ya++);if(s(a.id,
!0))return c.sounds[a.id];if(ga(a))f=d(),f._setup_html5(a);else{if(c.html5Only||c.html5.usingFlash&&a.url&&a.url.match(/data\:/i))return d();8<m&&null===a.isMovieStar&&(a.isMovieStar=!(!a.serverURL&&!(a.type&&a.type.match(db)||a.url&&a.url.match(ib))));a=ca(a,void 0);f=d();8===m?k._createSound(a.id,a.loops||1,a.usePolicyFile):(k._createSound(a.id,a.url,a.usePeakData,a.useWaveformData,a.useEQData,a.isMovieStar,a.isMovieStar?a.bufferTime:!1,a.loops||1,a.serverURL,a.duration||null,a.autoPlay,!0,a.autoLoad,
a.usePolicyFile),a.serverURL||(f.connected=!0,a.onconnect&&a.onconnect.apply(f)));!a.serverURL&&(a.autoLoad||a.autoPlay)&&f.load(a)}!a.serverURL&&a.autoPlay&&f.play();return f};this.destroySound=function(b,e){if(!s(b))return!1;var d=c.sounds[b],a;d._iO={};d.stop();d.unload();for(a=0;a<c.soundIDs.length;a++)if(c.soundIDs[a]===b){c.soundIDs.splice(a,1);break}e||d.destruct(!0);delete c.sounds[b];return!0};this.load=function(b,e){return!s(b)?!1:c.sounds[b].load(e)};this.unload=function(b){return!s(b)?
!1:c.sounds[b].unload()};this.onposition=this.onPosition=function(b,e,d,a){return!s(b)?!1:c.sounds[b].onposition(e,d,a)};this.clearOnPosition=function(b,e,d){return!s(b)?!1:c.sounds[b].clearOnPosition(e,d)};this.start=this.play=function(b,e){var d=null,a=e&&!(e instanceof Object);if(!q||!c.ok())return!1;if(s(b,a))a&&(e={url:e});else{if(!a)return!1;a&&(e={url:e});e&&e.url&&(e.id=b,d=c.createSound(e).play())}null===d&&(d=c.sounds[b].play(e));return d};this.setPosition=function(b,e){return!s(b)?!1:c.sounds[b].setPosition(e)};
this.stop=function(b){return!s(b)?!1:c.sounds[b].stop()};this.stopAll=function(){for(var b in c.sounds)c.sounds.hasOwnProperty(b)&&c.sounds[b].stop()};this.pause=function(b){return!s(b)?!1:c.sounds[b].pause()};this.pauseAll=function(){var b;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].pause()};this.resume=function(b){return!s(b)?!1:c.sounds[b].resume()};this.resumeAll=function(){var b;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].resume()};this.togglePause=function(b){return!s(b)?
!1:c.sounds[b].togglePause()};this.setPan=function(b,e){return!s(b)?!1:c.sounds[b].setPan(e)};this.setVolume=function(b,e){return!s(b)?!1:c.sounds[b].setVolume(e)};this.mute=function(b){var e=0;b instanceof String&&(b=null);if(b)return!s(b)?!1:c.sounds[b].mute();for(e=c.soundIDs.length-1;0<=e;e--)c.sounds[c.soundIDs[e]].mute();return c.muted=!0};this.muteAll=function(){c.mute()};this.unmute=function(b){b instanceof String&&(b=null);if(b)return!s(b)?!1:c.sounds[b].unmute();for(b=c.soundIDs.length-
1;0<=b;b--)c.sounds[c.soundIDs[b]].unmute();c.muted=!1;return!0};this.unmuteAll=function(){c.unmute()};this.toggleMute=function(b){return!s(b)?!1:c.sounds[b].toggleMute()};this.getMemoryUse=function(){var b=0;k&&8!==m&&(b=parseInt(k._getMemoryUse(),10));return b};this.disable=function(b){var e;b===h&&(b=!1);if(x)return!1;x=!0;for(e=c.soundIDs.length-1;0<=e;e--)Pa(c.sounds[c.soundIDs[e]]);N(b);t.remove(l,"load",F);return!0};this.canPlayMIME=function(b){var e;c.hasHTML5&&(e=T({type:b}));!e&&v&&(e=b&&
c.ok()?!!(8<m&&b.match(db)||b.match(c.mimePattern)):null);return e};this.canPlayURL=function(b){var e;c.hasHTML5&&(e=T({url:b}));!e&&v&&(e=b&&c.ok()?!!b.match(c.filePattern):null);return e};this.canPlayLink=function(b){return b.type!==h&&b.type&&c.canPlayMIME(b.type)?!0:c.canPlayURL(b.href)};this.getSoundById=function(b,e){return!b?null:c.sounds[b]};this.onready=function(b,c){if("function"===typeof b)c||(c=l),qa("onready",b,c),E();else throw Q("needFunction","onready");return!0};this.ontimeout=function(b,
c){if("function"===typeof b)c||(c=l),qa("ontimeout",b,c),E({type:"ontimeout"});else throw Q("needFunction","ontimeout");return!0};this._wD=this._writeDebug=function(b,c){return!0};this._debug=function(){};this.reboot=function(b,e){var d,a,f;for(d=c.soundIDs.length-1;0<=d;d--)c.sounds[c.soundIDs[d]].destruct();if(k)try{C&&(ya=k.innerHTML),P=k.parentNode.removeChild(k)}catch(h){}ya=P=v=k=null;c.enabled=O=q=R=Aa=L=M=x=z=c.swfLoaded=!1;c.soundIDs=[];c.sounds={};Ya=0;if(b)u=[];else for(d in u)if(u.hasOwnProperty(d)){a=
0;for(f=u[d].length;a<f;a++)u[d][a].fired=!1}c.html5={usingFlash:null};c.flash={};c.html5Only=!1;c.ignoreFlash=!1;l.setTimeout(function(){ta();e||c.beginDelayedInit()},20);return c};this.reset=function(){return c.reboot(!0,!0)};this.getMoviePercent=function(){return k&&"PercentLoaded"in k?k.PercentLoaded():null};this.beginDelayedInit=function(){oa=!0;H();setTimeout(function(){if(Aa)return!1;aa();$();return Aa=!0},20);G()};this.destruct=function(){c.disable(!0)};Ja=function(b){var e,d,a=this,f,g,K,
A,l,n,r=!1,p=[],q=0,v,x,u=null,y;d=e=null;this.sID=this.id=b.id;this.url=b.url;this._iO=this.instanceOptions=this.options=w(b);this.pan=this.options.pan;this.volume=this.options.volume;this.isHTML5=!1;this._a=null;y=this.url?!1:!0;this.id3={};this._debug=function(){};this.load=function(b){var e=null,d;b!==h?a._iO=w(b,a.options):(b=a.options,a._iO=b,u&&u!==a.url&&(a._iO.url=a.url,a.url=null));a._iO.url||(a._iO.url=a.url);a._iO.url=ea(a._iO.url);d=a.instanceOptions=a._iO;if(!d.url&&!a.url)return a;
if(d.url===a.url&&0!==a.readyState&&2!==a.readyState)return 3===a.readyState&&d.onload&&ia(a,function(){d.onload.apply(a,[!!a.duration])}),a;a.loaded=!1;a.readyState=1;a.playState=0;a.id3={};if(ga(d))e=a._setup_html5(d),e._called_load||(a._html5_canplay=!1,a.url!==d.url&&(a._a.src=d.url,a.setPosition(0)),a._a.autobuffer="auto",a._a.preload="auto",a._a._called_load=!0,d.autoPlay&&a.play());else{if(c.html5Only||a._iO.url&&a._iO.url.match(/data\:/i))return a;try{a.isHTML5=!1,a._iO=ca(ba(d)),d=a._iO,
8===m?k._load(a.id,d.url,d.stream,d.autoPlay,d.usePolicyFile):k._load(a.id,d.url,!!d.stream,!!d.autoPlay,d.loops||1,!!d.autoLoad,d.usePolicyFile)}catch(f){I({type:"SMSOUND_LOAD_JS_EXCEPTION",fatal:!0})}}a.url=d.url;return a};this.unload=function(){0!==a.readyState&&(a.isHTML5?(A(),a._a&&(a._a.pause(),u=ha(a._a))):8===m?k._unload(a.id,"about:blank"):k._unload(a.id),f());return a};this.destruct=function(b){a.isHTML5?(A(),a._a&&(a._a.pause(),ha(a._a),z||K(),a._a._s=null,a._a=null)):(a._iO.onfailure=
null,k._destroySound(a.id));b||c.destroySound(a.id,!0)};this.start=this.play=function(b,e){var d,f,g,K,A;f=!0;f=null;e=e===h?!0:e;b||(b={});a.url&&(a._iO.url=a.url);a._iO=w(a._iO,a.options);a._iO=w(b,a._iO);a._iO.url=ea(a._iO.url);a.instanceOptions=a._iO;if(!a.isHTML5&&a._iO.serverURL&&!a.connected)return a.getAutoPlay()||a.setAutoPlay(!0),a;ga(a._iO)&&(a._setup_html5(a._iO),l());1===a.playState&&!a.paused&&(d=a._iO.multiShot,d||(a.isHTML5&&a.setPosition(a._iO.position),f=a));if(null!==f)return f;
b.url&&b.url!==a.url&&(!a.readyState&&!a.isHTML5&&8===m&&y?y=!1:a.load(a._iO));a.loaded||(0===a.readyState?(!a.isHTML5&&!c.html5Only?(a._iO.autoPlay=!0,a.load(a._iO)):a.isHTML5?a.load(a._iO):f=a,a.instanceOptions=a._iO):2===a.readyState&&(f=a));if(null!==f)return f;!a.isHTML5&&(9===m&&0<a.position&&a.position===a.duration)&&(b.position=0);if(a.paused&&0<=a.position&&(!a._iO.serverURL||0<a.position))a.resume();else{a._iO=w(b,a._iO);if(null!==a._iO.from&&null!==a._iO.to&&0===a.instanceCount&&0===a.playState&&
!a._iO.serverURL){d=function(){a._iO=w(b,a._iO);a.play(a._iO)};if(a.isHTML5&&!a._html5_canplay)a.load({oncanplay:d}),f=!1;else if(!a.isHTML5&&!a.loaded&&(!a.readyState||2!==a.readyState))a.load({onload:d}),f=!1;if(null!==f)return f;a._iO=x()}(!a.instanceCount||a._iO.multiShotEvents||a.isHTML5&&a._iO.multiShot&&!z||!a.isHTML5&&8<m&&!a.getAutoPlay())&&a.instanceCount++;a._iO.onposition&&0===a.playState&&n(a);a.playState=1;a.paused=!1;a.position=a._iO.position!==h&&!isNaN(a._iO.position)?a._iO.position:
0;a.isHTML5||(a._iO=ca(ba(a._iO)));a._iO.onplay&&e&&(a._iO.onplay.apply(a),r=!0);a.setVolume(a._iO.volume,!0);a.setPan(a._iO.pan,!0);a.isHTML5?2>a.instanceCount?(l(),f=a._setup_html5(),a.setPosition(a._iO.position),f.play()):(g=new Audio(a._iO.url),K=function(){t.remove(g,"onended",K);a._onfinish(a);ha(g);g=null},A=function(){t.remove(g,"canplay",A);try{g.currentTime=a._iO.position/1E3}catch(b){}g.play()},t.add(g,"ended",K),a._iO.position?t.add(g,"canplay",A):g.play()):(f=k._start(a.id,a._iO.loops||
1,9===m?a.position:a.position/1E3,a._iO.multiShot||!1),9===m&&!f&&a._iO.onplayerror&&a._iO.onplayerror.apply(a))}return a};this.stop=function(b){var c=a._iO;1===a.playState&&(a._onbufferchange(0),a._resetOnPosition(0),a.paused=!1,a.isHTML5||(a.playState=0),v(),c.to&&a.clearOnPosition(c.to),a.isHTML5?a._a&&(b=a.position,a.setPosition(0),a.position=b,a._a.pause(),a.playState=0,a._onTimer(),A()):(k._stop(a.id,b),c.serverURL&&a.unload()),a.instanceCount=0,a._iO={},c.onstop&&c.onstop.apply(a));return a};
this.setAutoPlay=function(b){a._iO.autoPlay=b;a.isHTML5||(k._setAutoPlay(a.id,b),b&&!a.instanceCount&&1===a.readyState&&a.instanceCount++)};this.getAutoPlay=function(){return a._iO.autoPlay};this.setPosition=function(b){b===h&&(b=0);var c=a.isHTML5?Math.max(b,0):Math.min(a.duration||a._iO.duration,Math.max(b,0));a.position=c;b=a.position/1E3;a._resetOnPosition(a.position);a._iO.position=c;if(a.isHTML5){if(a._a){if(a._html5_canplay){if(a._a.currentTime!==b)try{a._a.currentTime=b,(0===a.playState||
a.paused)&&a._a.pause()}catch(e){}}else if(b)return a;a.paused&&a._onTimer(!0)}}else b=9===m?a.position:b,a.readyState&&2!==a.readyState&&k._setPosition(a.id,b,a.paused||!a.playState,a._iO.multiShot);return a};this.pause=function(b){if(a.paused||0===a.playState&&1!==a.readyState)return a;a.paused=!0;a.isHTML5?(a._setup_html5().pause(),A()):(b||b===h)&&k._pause(a.id,a._iO.multiShot);a._iO.onpause&&a._iO.onpause.apply(a);return a};this.resume=function(){var b=a._iO;if(!a.paused)return a;a.paused=!1;
a.playState=1;a.isHTML5?(a._setup_html5().play(),l()):(b.isMovieStar&&!b.serverURL&&a.setPosition(a.position),k._pause(a.id,b.multiShot));!r&&b.onplay?(b.onplay.apply(a),r=!0):b.onresume&&b.onresume.apply(a);return a};this.togglePause=function(){if(0===a.playState)return a.play({position:9===m&&!a.isHTML5?a.position:a.position/1E3}),a;a.paused?a.resume():a.pause();return a};this.setPan=function(b,c){b===h&&(b=0);c===h&&(c=!1);a.isHTML5||k._setPan(a.id,b);a._iO.pan=b;c||(a.pan=b,a.options.pan=b);return a};
this.setVolume=function(b,e){b===h&&(b=100);e===h&&(e=!1);a.isHTML5?a._a&&(a._a.volume=Math.max(0,Math.min(1,b/100))):k._setVolume(a.id,c.muted&&!a.muted||a.muted?0:b);a._iO.volume=b;e||(a.volume=b,a.options.volume=b);return a};this.mute=function(){a.muted=!0;a.isHTML5?a._a&&(a._a.muted=!0):k._setVolume(a.id,0);return a};this.unmute=function(){a.muted=!1;var b=a._iO.volume!==h;a.isHTML5?a._a&&(a._a.muted=!1):k._setVolume(a.id,b?a._iO.volume:a.options.volume);return a};this.toggleMute=function(){return a.muted?
a.unmute():a.mute()};this.onposition=this.onPosition=function(b,c,e){p.push({position:parseInt(b,10),method:c,scope:e!==h?e:a,fired:!1});return a};this.clearOnPosition=function(a,b){var c;a=parseInt(a,10);if(isNaN(a))return!1;for(c=0;c<p.length;c++)if(a===p[c].position&&(!b||b===p[c].method))p[c].fired&&q--,p.splice(c,1)};this._processOnPosition=function(){var b,c;b=p.length;if(!b||!a.playState||q>=b)return!1;for(b-=1;0<=b;b--)c=p[b],!c.fired&&a.position>=c.position&&(c.fired=!0,q++,c.method.apply(c.scope,
[c.position]));return!0};this._resetOnPosition=function(a){var b,c;b=p.length;if(!b)return!1;for(b-=1;0<=b;b--)c=p[b],c.fired&&a<=c.position&&(c.fired=!1,q--);return!0};x=function(){var b=a._iO,c=b.from,e=b.to,d,f;f=function(){a.clearOnPosition(e,f);a.stop()};d=function(){if(null!==e&&!isNaN(e))a.onPosition(e,f)};null!==c&&!isNaN(c)&&(b.position=c,b.multiShot=!1,d());return b};n=function(){var b,c=a._iO.onposition;if(c)for(b in c)if(c.hasOwnProperty(b))a.onPosition(parseInt(b,10),c[b])};v=function(){var b,
c=a._iO.onposition;if(c)for(b in c)c.hasOwnProperty(b)&&a.clearOnPosition(parseInt(b,10))};l=function(){a.isHTML5&&Ra(a)};A=function(){a.isHTML5&&Sa(a)};f=function(b){b||(p=[],q=0);r=!1;a._hasTimer=null;a._a=null;a._html5_canplay=!1;a.bytesLoaded=null;a.bytesTotal=null;a.duration=a._iO&&a._iO.duration?a._iO.duration:null;a.durationEstimate=null;a.buffered=[];a.eqData=[];a.eqData.left=[];a.eqData.right=[];a.failures=0;a.isBuffering=!1;a.instanceOptions={};a.instanceCount=0;a.loaded=!1;a.metadata={};
a.readyState=0;a.muted=!1;a.paused=!1;a.peakData={left:0,right:0};a.waveformData={left:[],right:[]};a.playState=0;a.position=null;a.id3={}};f();this._onTimer=function(b){var c,f=!1,g={};if(a._hasTimer||b){if(a._a&&(b||(0<a.playState||1===a.readyState)&&!a.paused))c=a._get_html5_duration(),c!==e&&(e=c,a.duration=c,f=!0),a.durationEstimate=a.duration,c=1E3*a._a.currentTime||0,c!==d&&(d=c,f=!0),(f||b)&&a._whileplaying(c,g,g,g,g);return f}};this._get_html5_duration=function(){var b=a._iO;return(b=a._a&&
a._a.duration?1E3*a._a.duration:b&&b.duration?b.duration:null)&&!isNaN(b)&&Infinity!==b?b:null};this._apply_loop=function(a,b){a.loop=1<b?"loop":""};this._setup_html5=function(b){b=w(a._iO,b);var c=z?Ka:a._a,e=decodeURI(b.url),d;z?e===decodeURI(Ca)&&(d=!0):e===decodeURI(u)&&(d=!0);if(c){if(c._s)if(z)c._s&&(c._s.playState&&!d)&&c._s.stop();else if(!z&&e===decodeURI(u))return a._apply_loop(c,b.loops),c;d||(f(!1),c.src=b.url,Ca=u=a.url=b.url,c._called_load=!1)}else a._a=b.autoLoad||b.autoPlay?new Audio(b.url):
Ea&&10>opera.version()?new Audio(null):new Audio,c=a._a,c._called_load=!1,z&&(Ka=c);a.isHTML5=!0;a._a=c;c._s=a;g();a._apply_loop(c,b.loops);b.autoLoad||b.autoPlay?a.load():(c.autobuffer=!1,c.preload="auto");return c};g=function(){if(a._a._added_events)return!1;var b;a._a._added_events=!0;for(b in B)B.hasOwnProperty(b)&&a._a&&a._a.addEventListener(b,B[b],!1);return!0};K=function(){var b;a._a._added_events=!1;for(b in B)B.hasOwnProperty(b)&&a._a&&a._a.removeEventListener(b,B[b],!1)};this._onload=function(b){var c=
!!b||!a.isHTML5&&8===m&&a.duration;a.loaded=c;a.readyState=c?3:2;a._onbufferchange(0);a._iO.onload&&ia(a,function(){a._iO.onload.apply(a,[c])});return!0};this._onbufferchange=function(b){if(0===a.playState||b&&a.isBuffering||!b&&!a.isBuffering)return!1;a.isBuffering=1===b;a._iO.onbufferchange&&a._iO.onbufferchange.apply(a);return!0};this._onsuspend=function(){a._iO.onsuspend&&a._iO.onsuspend.apply(a);return!0};this._onfailure=function(b,c,e){a.failures++;if(a._iO.onfailure&&1===a.failures)a._iO.onfailure(a,
b,c,e)};this._onfinish=function(){var b=a._iO.onfinish;a._onbufferchange(0);a._resetOnPosition(0);a.instanceCount&&(a.instanceCount--,a.instanceCount||(v(),a.playState=0,a.paused=!1,a.instanceCount=0,a.instanceOptions={},a._iO={},A(),a.isHTML5&&(a.position=0)),(!a.instanceCount||a._iO.multiShotEvents)&&b&&ia(a,function(){b.apply(a)}))};this._whileloading=function(b,c,e,d){var f=a._iO;a.bytesLoaded=b;a.bytesTotal=c;a.duration=Math.floor(e);a.bufferLength=d;a.durationEstimate=!a.isHTML5&&!f.isMovieStar?
f.duration?a.duration>f.duration?a.duration:f.duration:parseInt(a.bytesTotal/a.bytesLoaded*a.duration,10):a.duration;a.isHTML5||(a.buffered=[{start:0,end:a.duration}]);(3!==a.readyState||a.isHTML5)&&f.whileloading&&f.whileloading.apply(a)};this._whileplaying=function(b,c,e,d,f){var g=a._iO;if(isNaN(b)||null===b)return!1;a.position=Math.max(0,b);a._processOnPosition();!a.isHTML5&&8<m&&(g.usePeakData&&(c!==h&&c)&&(a.peakData={left:c.leftPeak,right:c.rightPeak}),g.useWaveformData&&(e!==h&&e)&&(a.waveformData=
{left:e.split(","),right:d.split(",")}),g.useEQData&&(f!==h&&f&&f.leftEQ)&&(b=f.leftEQ.split(","),a.eqData=b,a.eqData.left=b,f.rightEQ!==h&&f.rightEQ&&(a.eqData.right=f.rightEQ.split(","))));1===a.playState&&(!a.isHTML5&&(8===m&&!a.position&&a.isBuffering)&&a._onbufferchange(0),g.whileplaying&&g.whileplaying.apply(a));return!0};this._oncaptiondata=function(b){a.captiondata=b;a._iO.oncaptiondata&&a._iO.oncaptiondata.apply(a,[b])};this._onmetadata=function(b,c){var e={},d,f;d=0;for(f=b.length;d<f;d++)e[b[d]]=
c[d];a.metadata=e;a._iO.onmetadata&&a._iO.onmetadata.apply(a)};this._onid3=function(b,c){var e=[],d,f;d=0;for(f=b.length;d<f;d++)e[b[d]]=c[d];a.id3=w(a.id3,e);a._iO.onid3&&a._iO.onid3.apply(a)};this._onconnect=function(b){b=1===b;if(a.connected=b)a.failures=0,s(a.id)&&(a.getAutoPlay()?a.play(h,a.getAutoPlay()):a._iO.autoLoad&&a.load()),a._iO.onconnect&&a._iO.onconnect.apply(a,[b])};this._ondataerror=function(b){0<a.playState&&a._iO.ondataerror&&a._iO.ondataerror.apply(a)}};va=function(){return n.body||
n._docElement||n.getElementsByTagName("div")[0]};X=function(b){return n.getElementById(b)};w=function(b,e){var d=b||{},a,f;a=e===h?c.defaultOptions:e;for(f in a)a.hasOwnProperty(f)&&d[f]===h&&(d[f]="object"!==typeof a[f]||null===a[f]?a[f]:w(d[f],a[f]));return d};ia=function(b,c){!b.isHTML5&&8===m?l.setTimeout(c,0):c()};Y={onready:1,ontimeout:1,defaultOptions:1,flash9Options:1,movieStarOptions:1};pa=function(b,e){var d,a=!0,f=e!==h,g=c.setupOptions;for(d in b)if(b.hasOwnProperty(d))if("object"!==typeof b[d]||
null===b[d]||b[d]instanceof Array||b[d]instanceof RegExp)f&&Y[e]!==h?c[e][d]=b[d]:g[d]!==h?(c.setupOptions[d]=b[d],c[d]=b[d]):Y[d]===h?a=!1:c[d]instanceof Function?c[d].apply(c,b[d]instanceof Array?b[d]:[b[d]]):c[d]=b[d];else if(Y[d]===h)a=!1;else return pa(b[d],d);return a};t=function(){function b(a){a=fb.call(a);var b=a.length;d?(a[1]="on"+a[1],3<b&&a.pop()):3===b&&a.push(!1);return a}function c(b,e){var h=b.shift(),k=[a[e]];if(d)h[k](b[0],b[1]);else h[k].apply(h,b)}var d=l.attachEvent,a={add:d?
"attachEvent":"addEventListener",remove:d?"detachEvent":"removeEventListener"};return{add:function(){c(b(arguments),"add")},remove:function(){c(b(arguments),"remove")}}}();B={abort:r(function(){}),canplay:r(function(){var b=this._s,c;if(b._html5_canplay)return!0;b._html5_canplay=!0;b._onbufferchange(0);c=b._iO.position!==h&&!isNaN(b._iO.position)?b._iO.position/1E3:null;if(b.position&&this.currentTime!==c)try{this.currentTime=c}catch(d){}b._iO._oncanplay&&b._iO._oncanplay()}),canplaythrough:r(function(){var b=
this._s;b.loaded||(b._onbufferchange(0),b._whileloading(b.bytesLoaded,b.bytesTotal,b._get_html5_duration()),b._onload(!0))}),ended:r(function(){this._s._onfinish()}),error:r(function(){this._s._onload(!1)}),loadeddata:r(function(){var b=this._s;!b._loaded&&!ja&&(b.duration=b._get_html5_duration())}),loadedmetadata:r(function(){}),loadstart:r(function(){this._s._onbufferchange(1)}),play:r(function(){this._s._onbufferchange(0)}),playing:r(function(){this._s._onbufferchange(0)}),progress:r(function(b){var c=
this._s,d,a,f=0,f=b.target.buffered;d=b.loaded||0;var g=b.total||1;c.buffered=[];if(f&&f.length){d=0;for(a=f.length;d<a;d++)c.buffered.push({start:1E3*f.start(d),end:1E3*f.end(d)});f=1E3*(f.end(0)-f.start(0));d=Math.min(1,f/(1E3*b.target.duration))}isNaN(d)||(c._onbufferchange(0),c._whileloading(d,g,c._get_html5_duration()),d&&(g&&d===g)&&B.canplaythrough.call(this,b))}),ratechange:r(function(){}),suspend:r(function(b){var c=this._s;B.progress.call(this,b);c._onsuspend()}),stalled:r(function(){}),
timeupdate:r(function(){this._s._onTimer()}),waiting:r(function(){this._s._onbufferchange(1)})};ga=function(b){return!b||!b.type&&!b.url&&!b.serverURL?!1:b.serverURL||b.type&&W(b.type)?!1:b.type?T({type:b.type}):T({url:b.url})||c.html5Only||b.url.match(/data\:/i)};ha=function(b){var c;b&&(c=ja&&!U?null:hb?"about:blank":null,b.src=c,void 0!==b._called_unload&&(b._called_load=!1));z&&(Ca=null);return c};T=function(b){if(!c.useHTML5Audio||!c.hasHTML5)return!1;var e=b.url||null;b=b.type||null;var d=c.audioFormats,
a;if(b&&c.html5[b]!==h)return c.html5[b]&&!W(b);if(!y){y=[];for(a in d)d.hasOwnProperty(a)&&(y.push(a),d[a].related&&(y=y.concat(d[a].related)));y=RegExp("\\.("+y.join("|")+")(\\?.*)?$","i")}a=e?e.toLowerCase().match(y):null;!a||!a.length?b&&(e=b.indexOf(";"),a=(-1!==e?b.substr(0,e):b).substr(6)):a=a[1];a&&c.html5[a]!==h?e=c.html5[a]&&!W(a):(b="audio/"+a,e=c.html5.canPlayType({type:b}),e=(c.html5[a]=e)&&c.html5[b]&&!W(b));return e};Wa=function(){function b(a){var b,d,f=b=!1;if(!e||"function"!==typeof e.canPlayType)return b;
if(a instanceof Array){b=0;for(d=a.length;b<d;b++)if(c.html5[a[b]]||e.canPlayType(a[b]).match(c.html5Test))f=!0,c.html5[a[b]]=!0,c.flash[a[b]]=!!a[b].match(bb);b=f}else a=e&&"function"===typeof e.canPlayType?e.canPlayType(a):!1,b=!(!a||!a.match(c.html5Test));return b}if(!c.useHTML5Audio||!c.hasHTML5)return v=c.html5.usingFlash=!0,!1;var e=Audio!==h?Ea&&10>opera.version()?new Audio(null):new Audio:null,d,a,f={},g;g=c.audioFormats;for(d in g)if(g.hasOwnProperty(d)&&(a="audio/"+d,f[d]=b(g[d].type),f[a]=
f[d],d.match(bb)?(c.flash[d]=!0,c.flash[a]=!0):(c.flash[d]=!1,c.flash[a]=!1),g[d]&&g[d].related))for(a=g[d].related.length-1;0<=a;a--)f["audio/"+g[d].related[a]]=f[d],c.html5[g[d].related[a]]=f[d],c.flash[g[d].related[a]]=f[d];f.canPlayType=e?b:null;c.html5=w(c.html5,f);c.html5.usingFlash=Va();v=c.html5.usingFlash;return!0};sa={};Q=function(){};ba=function(b){8===m&&(1<b.loops&&b.stream)&&(b.stream=!1);return b};ca=function(b,c){if(b&&!b.usePolicyFile&&(b.onid3||b.usePeakData||b.useWaveformData||
b.useEQData))b.usePolicyFile=!0;return b};ma=function(){return!1};Pa=function(b){for(var c in b)b.hasOwnProperty(c)&&"function"===typeof b[c]&&(b[c]=ma)};xa=function(b){b===h&&(b=!1);(x||b)&&c.disable(b)};Qa=function(b){var e=null;if(b)if(b.match(/\.swf(\?.*)?$/i)){if(e=b.substr(b.toLowerCase().lastIndexOf(".swf?")+4))return b}else b.lastIndexOf("/")!==b.length-1&&(b+="/");b=(b&&-1!==b.lastIndexOf("/")?b.substr(0,b.lastIndexOf("/")+1):"./")+c.movieURL;c.noSWFCache&&(b+="?ts\x3d"+(new Date).getTime());
return b};ra=function(){m=parseInt(c.flashVersion,10);8!==m&&9!==m&&(c.flashVersion=m=8);var b=c.debugMode||c.debugFlash?"_debug.swf":".swf";c.useHTML5Audio&&(!c.html5Only&&c.audioFormats.mp4.required&&9>m)&&(c.flashVersion=m=9);c.version=c.versionNumber+(c.html5Only?" (HTML5-only mode)":9===m?" (AS3/Flash 9)":" (AS2/Flash 8)");8<m?(c.defaultOptions=w(c.defaultOptions,c.flash9Options),c.features.buffering=!0,c.defaultOptions=w(c.defaultOptions,c.movieStarOptions),c.filePatterns.flash9=RegExp("\\.(mp3|"+
eb.join("|")+")(\\?.*)?$","i"),c.features.movieStar=!0):c.features.movieStar=!1;c.filePattern=c.filePatterns[8!==m?"flash9":"flash8"];c.movieURL=(8===m?"soundmanager2.swf":"soundmanager2_flash9.swf").replace(".swf",b);c.features.peakData=c.features.waveformData=c.features.eqData=8<m};Oa=function(b,c){if(!k)return!1;k._setPolling(b,c)};wa=function(){};s=this.getSoundById;J=function(){var b=[];c.debugMode&&b.push("sm2_debug");c.debugFlash&&b.push("flash_debug");c.useHighPerformance&&b.push("high_performance");
return b.join(" ")};za=function(){Q("fbHandler");var b=c.getMoviePercent(),e={type:"FLASHBLOCK"};if(c.html5Only)return!1;c.ok()?c.oMC&&(c.oMC.className=[J(),"movieContainer","swf_loaded"+(c.didFlashBlock?" swf_unblocked":"")].join(" ")):(v&&(c.oMC.className=J()+" movieContainer "+(null===b?"swf_timedout":"swf_error")),c.didFlashBlock=!0,E({type:"ontimeout",ignoreInit:!0,error:e}),I(e))};qa=function(b,c,d){u[b]===h&&(u[b]=[]);u[b].push({method:c,scope:d||null,fired:!1})};E=function(b){b||(b={type:c.ok()?
"onready":"ontimeout"});if(!q&&b&&!b.ignoreInit||"ontimeout"===b.type&&(c.ok()||x&&!b.ignoreInit))return!1;var e={success:b&&b.ignoreInit?c.ok():!x},d=b&&b.type?u[b.type]||[]:[],a=[],f,e=[e],g=v&&!c.ok();b.error&&(e[0].error=b.error);b=0;for(f=d.length;b<f;b++)!0!==d[b].fired&&a.push(d[b]);if(a.length){b=0;for(f=a.length;b<f;b++)a[b].scope?a[b].method.apply(a[b].scope,e):a[b].method.apply(this,e),g||(a[b].fired=!0)}return!0};F=function(){l.setTimeout(function(){c.useFlashBlock&&za();E();"function"===
typeof c.onload&&c.onload.apply(l);c.waitForWindowLoad&&t.add(l,"load",F)},1)};Da=function(){if(D!==h)return D;var b=!1,c=navigator,d=c.plugins,a,f=l.ActiveXObject;if(d&&d.length)(c=c.mimeTypes)&&(c["application/x-shockwave-flash"]&&c["application/x-shockwave-flash"].enabledPlugin&&c["application/x-shockwave-flash"].enabledPlugin.description)&&(b=!0);else if(f!==h&&!p.match(/MSAppHost/i)){try{a=new f("ShockwaveFlash.ShockwaveFlash")}catch(g){a=null}b=!!a}return D=b};Va=function(){var b,e,d=c.audioFormats;
if(U&&p.match(/os (1|2|3_0|3_1)/i))c.hasHTML5=!1,c.html5Only=!0,c.oMC&&(c.oMC.style.display="none");else if(c.useHTML5Audio&&(!c.html5||!c.html5.canPlayType))c.hasHTML5=!1;if(c.useHTML5Audio&&c.hasHTML5)for(e in fa=!0,d)if(d.hasOwnProperty(e)&&d[e].required)if(c.html5.canPlayType(d[e].type)){if(c.preferFlash&&(c.flash[e]||c.flash[d[e].type]))b=!0}else fa=!1,b=!0;c.ignoreFlash&&(b=!1,fa=!0);c.html5Only=c.hasHTML5&&c.useHTML5Audio&&!b;return!c.html5Only};ea=function(b){var e,d,a=0;if(b instanceof Array){e=
0;for(d=b.length;e<d;e++)if(b[e]instanceof Object){if(c.canPlayMIME(b[e].type)){a=e;break}}else if(c.canPlayURL(b[e])){a=e;break}b[a].url&&(b[a]=b[a].url);b=b[a]}return b};Ra=function(b){b._hasTimer||(b._hasTimer=!0,!Fa&&c.html5PollingInterval&&(null===S&&0===da&&(S=setInterval(Ta,c.html5PollingInterval)),da++))};Sa=function(b){b._hasTimer&&(b._hasTimer=!1,!Fa&&c.html5PollingInterval&&da--)};Ta=function(){var b;if(null!==S&&!da)return clearInterval(S),S=null,!1;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].isHTML5&&
c.sounds[c.soundIDs[b]]._hasTimer&&c.sounds[c.soundIDs[b]]._onTimer()};I=function(b){b=b!==h?b:{};"function"===typeof c.onerror&&c.onerror.apply(l,[{type:b.type!==h?b.type:null}]);b.fatal!==h&&b.fatal&&c.disable()};Xa=function(){if(!$a||!Da())return!1;var b=c.audioFormats,e,d;for(d in b)if(b.hasOwnProperty(d)&&("mp3"===d||"mp4"===d))if(c.html5[d]=!1,b[d]&&b[d].related)for(e=b[d].related.length-1;0<=e;e--)c.html5[b[d].related[e]]=!1};this._setSandboxType=function(b){};this._externalInterfaceOK=function(b){if(c.swfLoaded)return!1;
c.swfLoaded=!0;ka=!1;$a&&Xa();setTimeout(na,C?100:1)};aa=function(b,e){function d(a,b){return'\x3cparam name\x3d"'+a+'" value\x3d"'+b+'" /\x3e'}if(L&&M)return!1;if(c.html5Only)return ra(),c.oMC=X(c.movieID),na(),M=L=!0,!1;var a=e||c.url,f=c.altURL||a,g=va(),k=J(),l=null,l=n.getElementsByTagName("html")[0],m,r,q,l=l&&l.dir&&l.dir.match(/rtl/i);b=b===h?c.id:b;ra();c.url=Qa(Ha?a:f);e=c.url;c.wmode=!c.wmode&&c.useHighPerformance?"transparent":c.wmode;if(null!==c.wmode&&(p.match(/msie 8/i)||!C&&!c.useHighPerformance)&&
navigator.platform.match(/win32|win64/i))Ua.push(sa.spcWmode),c.wmode=null;g={name:b,id:b,src:e,quality:"high",allowScriptAccess:c.allowScriptAccess,bgcolor:c.bgColor,pluginspage:cb+"www.macromedia.com/go/getflashplayer",title:"JS/Flash audio component (SoundManager 2)",type:"application/x-shockwave-flash",wmode:c.wmode,hasPriority:"true"};c.debugFlash&&(g.FlashVars="debug\x3d1");c.wmode||delete g.wmode;if(C)a=n.createElement("div"),r=['\x3cobject id\x3d"'+b+'" data\x3d"'+e+'" type\x3d"'+g.type+'" title\x3d"'+
g.title+'" classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase\x3d"'+cb+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version\x3d6,0,40,0"\x3e',d("movie",e),d("AllowScriptAccess",c.allowScriptAccess),d("quality",g.quality),c.wmode?d("wmode",c.wmode):"",d("bgcolor",c.bgColor),d("hasPriority","true"),c.debugFlash?d("FlashVars",g.FlashVars):"","\x3c/object\x3e"].join("");else for(m in a=n.createElement("embed"),g)g.hasOwnProperty(m)&&a.setAttribute(m,g[m]);wa();k=J();if(g=
va())if(c.oMC=X(c.movieID)||n.createElement("div"),c.oMC.id)q=c.oMC.className,c.oMC.className=(q?q+" ":"movieContainer")+(k?" "+k:""),c.oMC.appendChild(a),C&&(m=c.oMC.appendChild(n.createElement("div")),m.className="sm2-object-box",m.innerHTML=r),M=!0;else{c.oMC.id=c.movieID;c.oMC.className="movieContainer "+k;m=k=null;c.useFlashBlock||(c.useHighPerformance?k={position:"fixed",width:"8px",height:"8px",bottom:"0px",left:"0px",overflow:"hidden"}:(k={position:"absolute",width:"6px",height:"6px",top:"-9999px",
left:"-9999px"},l&&(k.left=Math.abs(parseInt(k.left,10))+"px")));gb&&(c.oMC.style.zIndex=1E4);if(!c.debugFlash)for(q in k)k.hasOwnProperty(q)&&(c.oMC.style[q]=k[q]);try{C||c.oMC.appendChild(a),g.appendChild(c.oMC),C&&(m=c.oMC.appendChild(n.createElement("div")),m.className="sm2-object-box",m.innerHTML=r),M=!0}catch(s){throw Error(Q("domError")+" \n"+s.toString());}}return L=!0};$=function(){if(c.html5Only)return aa(),!1;if(k||!c.url)return!1;k=c.getMovie(c.id);k||(P?(C?c.oMC.innerHTML=ya:c.oMC.appendChild(P),
P=null,L=!0):aa(c.id,c.url),k=c.getMovie(c.id));"function"===typeof c.oninitmovie&&setTimeout(c.oninitmovie,1);return!0};G=function(){setTimeout(Na,1E3)};Na=function(){var b,e=!1;if(!c.url||R)return!1;R=!0;t.remove(l,"load",G);if(ka&&!Ga)return!1;q||(b=c.getMoviePercent(),0<b&&100>b&&(e=!0));setTimeout(function(){b=c.getMoviePercent();if(e)return R=!1,l.setTimeout(G,1),!1;!q&&ab&&(null===b?c.useFlashBlock||0===c.flashLoadTimeout?c.useFlashBlock&&za():!c.useFlashBlock&&fa?l.setTimeout(function(){c.setup({preferFlash:!1}).reboot();
c.didFlashBlock=!0;c.beginDelayedInit()},1):E({type:"ontimeout",ignoreInit:!0}):0!==c.flashLoadTimeout&&xa(!0))},c.flashLoadTimeout)};Z=function(){if(Ga||!ka)return t.remove(l,"focus",Z),!0;Ga=ab=!0;R=!1;G();t.remove(l,"focus",Z);return!0};N=function(b){if(q)return!1;if(c.html5Only)return q=!0,F(),!0;var e=!0,d;if(!c.useFlashBlock||!c.flashLoadTimeout||c.getMoviePercent())q=!0,x&&(d={type:!D&&v?"NO_FLASH":"INIT_TIMEOUT"});if(x||b)c.useFlashBlock&&c.oMC&&(c.oMC.className=J()+" "+(null===c.getMoviePercent()?
"swf_timedout":"swf_error")),E({type:"ontimeout",error:d,ignoreInit:!0}),I(d),e=!1;x||(c.waitForWindowLoad&&!oa?t.add(l,"load",F):F());return e};Ma=function(){var b,e=c.setupOptions;for(b in e)e.hasOwnProperty(b)&&(c[b]===h?c[b]=e[b]:c[b]!==e[b]&&(c.setupOptions[b]=c[b]))};na=function(){if(q)return!1;if(c.html5Only)return q||(t.remove(l,"load",c.beginDelayedInit),c.enabled=!0,N()),!0;$();try{k._externalInterfaceTest(!1),Oa(!0,c.flashPollingInterval||(c.useHighPerformance?10:50)),c.debugMode||k._disableDebug(),
c.enabled=!0,c.html5Only||t.add(l,"unload",ma)}catch(b){return I({type:"JS_TO_FLASH_EXCEPTION",fatal:!0}),xa(!0),N(),!1}N();t.remove(l,"load",c.beginDelayedInit);return!0};H=function(){if(O)return!1;O=!0;Ma();wa();!D&&c.hasHTML5&&c.setup({useHTML5Audio:!0,preferFlash:!1});Wa();!D&&v&&(Ua.push(sa.needFlash),c.setup({flashLoadTimeout:1}));n.removeEventListener&&n.removeEventListener("DOMContentLoaded",H,!1);$();return!0};Ba=function(){"complete"===n.readyState&&(H(),n.detachEvent("onreadystatechange",
Ba));return!0};ua=function(){oa=!0;t.remove(l,"load",ua)};ta=function(){if(Fa&&(c.setupOptions.useHTML5Audio=!0,c.setupOptions.preferFlash=!1,U||Za&&!p.match(/android\s2\.3/i)))U&&(c.ignoreFlash=!0),z=!0};ta();Da();t.add(l,"focus",Z);t.add(l,"load",G);t.add(l,"load",ua);n.addEventListener?n.addEventListener("DOMContentLoaded",H,!1):n.attachEvent?n.attachEvent("onreadystatechange",Ba):I({type:"NO_DOM2_EVENTS",fatal:!0})}var la=null;if(void 0===l.SM2_DEFER||!SM2_DEFER)la=new V;l.SoundManager=V;l.soundManager=
la})(window);
///#source 1 1 /Edgy/lib/external/jquery.pause.min.js
/*
 * Pause jQuery plugin v0.1
 *
 * Copyright 2010 by Tobia Conforto <tobia.conforto@gmail.com>
 *
 * Based on Pause-resume-animation jQuery plugin by Joe Weitzel
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or(at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
(function () { var e = jQuery, f = "jQuery.pause", d = 1, b = e.fn.animate, a = {}; function c() { return new Date().getTime() } e.fn.animate = function (k, h, j, i) { var g = e.speed(h, j, i); g.complete = g.old; return this.each(function () { if (!this[f]) { this[f] = d++ } var l = e.extend({}, g); b.apply(e(this), [k, e.extend({}, l)]); a[this[f]] = { run: true, prop: k, opt: l, start: c(), done: 0 } }) }; e.fn.pause = function () { return this.each(function () { if (!this[f]) { this[f] = d++ } var g = a[this[f]]; if (g && g.run) { g.done += c() - g.start; if (g.done > g.opt.duration) { delete a[this[f]] } else { e(this).stop(); g.run = false } } }) }; e.fn.resume = function () { return this.each(function () { if (!this[f]) { this[f] = d++ } var g = a[this[f]]; if (g && !g.run) { g.opt.duration -= g.done; g.done = 0; g.run = true; g.start = c(); b.apply(e(this), [g.prop, e.extend({}, g.opt)]) } }) } })();
///#source 1 1 /Edgy/lib/external/jquery.animate-colors-min.js
/*
 Color animation 1.6.0
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011, 2013 Edwin Martin <edwin@bitstorm.org>
 Released under the MIT and GPL licenses.
*/
'use strict';(function(d){function h(a,b,e){var c="rgb"+(d.support.rgba?"a":"")+"("+parseInt(a[0]+e*(b[0]-a[0]),10)+","+parseInt(a[1]+e*(b[1]-a[1]),10)+","+parseInt(a[2]+e*(b[2]-a[2]),10);d.support.rgba&&(c+=","+(a&&b?parseFloat(a[3]+e*(b[3]-a[3])):1));return c+")"}function f(a){var b;return(b=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a))?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16),1]:(b=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a))?[17*parseInt(b[1],16),17*parseInt(b[2],
16),17*parseInt(b[3],16),1]:(b=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))?[parseInt(b[1]),parseInt(b[2]),parseInt(b[3]),1]:(b=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(a))?[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10),parseFloat(b[4])]:l[a]}d.extend(!0,d,{support:{rgba:function(){var a=d("script:first"),b=a.css("color"),e=!1;if(/^rgba/.test(b))e=!0;else try{e=b!=a.css("color","rgba(0, 0, 0, 0.5)").css("color"),
a.css("color",b)}catch(c){}return e}()}});var k="color backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor outlineColor".split(" ");d.each(k,function(a,b){d.Tween.propHooks[b]={get:function(a){return d(a.elem).css(b)},set:function(a){var c=a.elem.style,g=f(d(a.elem).css(b)),m=f(a.end);a.run=function(a){c[b]=h(g,m,a)}}}});d.Tween.propHooks.borderColor={set:function(a){var b=a.elem.style,e=[],c=k.slice(2,6);d.each(c,function(b,c){e[c]=f(d(a.elem).css(c))});var g=f(a.end);
a.run=function(a){d.each(c,function(d,c){b[c]=h(e[c],g,a)})}}};var l={aqua:[0,255,255,1],azure:[240,255,255,1],beige:[245,245,220,1],black:[0,0,0,1],blue:[0,0,255,1],brown:[165,42,42,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgrey:[169,169,169,1],darkgreen:[0,100,0,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkviolet:[148,0,211,1],fuchsia:[255,
0,255,1],gold:[255,215,0,1],green:[0,128,0,1],indigo:[75,0,130,1],khaki:[240,230,140,1],lightblue:[173,216,230,1],lightcyan:[224,255,255,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],magenta:[255,0,255,1],maroon:[128,0,0,1],navy:[0,0,128,1],olive:[128,128,0,1],orange:[255,165,0,1],pink:[255,192,203,1],purple:[128,0,128,1],violet:[128,0,128,1],red:[255,0,0,1],silver:[192,192,192,1],white:[255,255,255,1],yellow:[255,255,
0,1],transparent:[255,255,255,0]}})(jQuery);

///#source 1 1 /Edgy/lib/external/modernizr.js
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-shiv-cssclasses-teststyles-prefixes-load
 */
;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
///#source 1 1 /Edgy/lib/external/device.min.js
/*! device.js 0.1.58 */
(function(){var a,b,c,d,e,f,g,h,i,j;a=window.device,window.device={},c=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return d("iphone")},device.ipod=function(){return d("ipod")},device.ipad=function(){return d("ipad")},device.android=function(){return d("android")},device.androidPhone=function(){return device.android()&&d("mobile")},device.androidTablet=function(){return device.android()&&!d("mobile")},device.blackberry=function(){return d("blackberry")||d("bb10")||d("rim")},device.blackberryPhone=function(){return device.blackberry()&&!d("tablet")},device.blackberryTablet=function(){return device.blackberry()&&d("tablet")},device.windows=function(){return d("windows")},device.windowsPhone=function(){return device.windows()&&d("phone")},device.windowsTablet=function(){return device.windows()&&d("touch")},device.fxos=function(){return d("(mobile; rv:")||d("(tablet; rv:")},device.fxosPhone=function(){return device.fxos()&&d("mobile")},device.fxosTablet=function(){return device.fxos()&&d("tablet")},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.portrait=function(){return 90!==Math.abs(window.orientation)},device.landscape=function(){return 90===Math.abs(window.orientation)},device.noConflict=function(){return window.device=a,this},d=function(a){return-1!==j.indexOf(a)},f=function(a){var b;return b=new RegExp(a,"i"),c.className.match(b)},b=function(a){return f(a)?void 0:c.className+=" "+a},h=function(a){return f(a)?c.className=c.className.replace(a,""):void 0},device.ios()?device.ipad()?b("ios ipad tablet"):device.iphone()?b("ios iphone mobile"):device.ipod()&&b("ios ipod mobile"):device.android()?device.androidTablet()?b("android tablet"):b("android mobile"):device.blackberry()?device.blackberryTablet()?b("blackberry tablet"):b("blackberry mobile"):device.windows()?device.windowsTablet()?b("windows tablet"):device.windowsPhone()?b("windows mobile"):b("desktop"):device.fxos()?device.fxosTablet()?b("fxos tablet"):b("fxos mobile"):b("desktop"),e=function(){return device.landscape()?(h("portrait"),b("landscape")):(h("landscape"),b("portrait"))},i="onorientationchange"in window,g=i?"orientationchange":"resize",window.addEventListener?window.addEventListener(g,e,!1):window.attachEvent?window.attachEvent(g,e):window[g]=e,e()}).call(this);
///#source 1 1 /Edgy/lib/external/jquery.touchSwipe.js
/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.5
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*
* Changelog
* $Date: 2010-12-12 (Wed, 12 Dec 2010) $
* $version: 1.0.0
* $version: 1.0.1 - removed multibyte comments
*
* $Date: 2011-21-02 (Mon, 21 Feb 2011) $
* $version: 1.1.0 	- added allowPageScroll property to allow swiping and scrolling of page
*					- changed handler signatures so one handler can be used for multiple events
* $Date: 2011-23-02 (Wed, 23 Feb 2011) $
* $version: 1.2.0 	- added click handler. This is fired if the user simply clicks and does not swipe. The event object and click target are passed to handler.
*					- If you use the http://code.google.com/p/jquery-ui-for-ipad-and-iphone/ plugin, you can also assign jQuery mouse events to children of a touchSwipe object.
* $version: 1.2.1 	- removed console log!
*
* $version: 1.2.2 	- Fixed bug where scope was not preserved in callback methods.
*
* $Date: 2011-28-04 (Thurs, 28 April 2011) $
* $version: 1.2.4 	- Changed licence terms to be MIT or GPL inline with jQuery. Added check for support of touch events to stop non compatible browsers erroring.
*
* $Date: 2011-27-09 (Tues, 27 September 2011) $
* $version: 1.2.5 	- Added support for testing swipes with mouse on desktop browser (thanks to https://github.com/joelhy)
*
* $Date: 2012-14-05 (Mon, 14 May 2012) $
* $version: 1.2.6 	- Added timeThreshold between start and end touch, so user can ignore slow swipes (thanks to Mark Chase). Default is null, all swipes are detected
*
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.7 	- Changed time threshold to have null default for backwards compatibility. Added duration param passed back in events, and refactored how time is handled.
*
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.8 	- Added the possibility to return a value like null or false in the trigger callback. In that way we can control when the touch start/move should take effect or not (simply by returning in some cases return null; or return false;) This effects the ontouchstart/ontouchmove event.
*
* $Date: 2012-06-06 (Wed, 06 June 2012) $
* $version: 1.3.0 	- Refactored whole plugin to allow for methods to be executed, as well as exposed defaults for user override. Added 'enable', 'disable', and 'destroy' methods
*
* $Date: 2012-05-06 (Fri, 05 June 2012) $
* $version: 1.3.1 	- Bug fixes  - bind() with false as last argument is no longer supported in jQuery 1.6, also, if you just click, the duration is now returned correctly.
*
* $Date: 2012-29-07 (Sun, 29 July 2012) $
* $version: 1.3.2	- Added fallbackToMouseEvents option to NOT capture mouse events on non touch devices.
* 			- Added "all" fingers value to the fingers property, so any combination of fingers triggers the swipe, allowing event handlers to check the finger count
*
* $Date: 2012-09-08 (Thurs, 9 Aug 2012) $
* $version: 1.3.3	- Code tidy prep for minefied version
*
* $Date: 2012-04-10 (wed, 4 Oct 2012) $
* $version: 1.4.0	- Added pinch support, pinchIn and pinchOut
*
* $Date: 2012-11-10 (Thurs, 11 Oct 2012) $
* $version: 1.5.0	- Added excludedElements, a jquery selector that specifies child elements that do NOT trigger swipes. By default, this is one select that removes all form, input select, button and anchor elements.
*
* $Date: 2012-22-10 (Mon, 22 Oct 2012) $
* $version: 1.5.1	- Fixed bug with jQuery 1.8 and trailing comma in excludedElements
*					- Fixed bug with IE and eventPreventDefault()
* $Date: 2013-01-12 (Fri, 12 Jan 2013) $
* $version: 1.6.0	- Fixed bugs with pinching, mainly when both pinch and swipe enabled, as well as adding time threshold for multifinger gestures, so releasing one finger beofre the other doesnt trigger as single finger gesture.
*					- made the demo site all static local HTML pages so they can be run locally by a developer
*					- added jsDoc comments and added documentation for the plugin	
*					- code tidy
*					- added triggerOnTouchLeave property that will end the event when the user swipes off the element.
* $Date: 2013-03-23 (Sat, 23 Mar 2013) $
* $version: 1.6.1	- Added support for ie8 touch events
* $version: 1.6.2	- Added support for events binding with on / off / bind in jQ for all callback names.
*                   - Deprecated the 'click' handler in favour of tap.
*                   - added cancelThreshold property
*                   - added option method to update init options at runtime
*
* $version 1.6.3    - added doubletap, longtap events and longTapThreshold, doubleTapThreshold property
* $Date: 2013-04-04 (Thurs, 04 April 2013) $
* $version 1.6.4    - Fixed bug with cancelThreshold introduced in 1.6.3, where swipe status no longer fired start event, and stopped once swiping back.
*
* $Date: 2013-08-24 (Sat, 24 Aug 2013) $
* $version 1.6.5    - Merged a few pull requests fixing various bugs, added AMD support.

*/

/**
 * See (http://jquery.com/).
 * @name $
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (http://jquery.com/)
 * @name fn
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */



(function (factory) {
 if (typeof define === 'function' && define.amd && define.amd.jQuery) {
  // AMD. Register as anonymous module.
  define(['jquery'], factory);
 } else {
  // Browser globals.
  factory(jQuery);
 }
}(function ($) {
 "use strict";

 //Constants
 var LEFT = "left",
   RIGHT = "right",
   UP = "up",
   DOWN = "down",
   IN = "in",
   OUT = "out",

   NONE = "none",
   AUTO = "auto",

   SWIPE = "swipe",
   PINCH = "pinch",
   TAP = "tap",
   DOUBLE_TAP = "doubletap",
   LONG_TAP = "longtap",

   HORIZONTAL = "horizontal",
   VERTICAL = "vertical",

   ALL_FINGERS = "all",

   DOUBLE_TAP_THRESHOLD = 10,

   PHASE_START = "start",
   PHASE_MOVE = "move",
   PHASE_END = "end",
   PHASE_CANCEL = "cancel",

   SUPPORTS_TOUCH = 'ontouchstart' in window,

   PLUGIN_NS = 'TouchSwipe';



 /**
 * The default configuration, and available options to configure touch swipe with.
 * You can set the default values by updating any of the properties prior to instantiation.
 * @name $.fn.swipe.defaults
 * @namespace
 * @property {int} [fingers=1] The number of fingers to detect in a swipe. Any swipes that do not meet this requirement will NOT trigger swipe handlers.
 * @property {int} [threshold=75] The number of pixels that the user must move their finger by before it is considered a swipe. 
 * @property {int} [cancelThreshold=null] The number of pixels that the user must move their finger back from the original swipe direction to cancel the gesture.
 * @property {int} [pinchThreshold=20] The number of pixels that the user must pinch their finger by before it is considered a pinch. 
 * @property {int} [maxTimeThreshold=null] Time, in milliseconds, between touchStart and touchEnd must NOT exceed in order to be considered a swipe. 
 * @property {int} [fingerReleaseThreshold=250] Time in milliseconds between releasing multiple fingers.  If 2 fingers are down, and are released one after the other, if they are within this threshold, it counts as a simultaneous release. 
 * @property {int} [longTapThreshold=500] Time in milliseconds between tap and release for a long tap
   * @property {int} [doubleTapThreshold=200] Time in milliseconds between 2 taps to count as a double tap
 * @property {function} [swipe=null] A handler to catch all swipes. See {@link $.fn.swipe#event:swipe}
 * @property {function} [swipeLeft=null] A handler that is triggered for "left" swipes. See {@link $.fn.swipe#event:swipeLeft}
 * @property {function} [swipeRight=null] A handler that is triggered for "right" swipes. See {@link $.fn.swipe#event:swipeRight}
 * @property {function} [swipeUp=null] A handler that is triggered for "up" swipes. See {@link $.fn.swipe#event:swipeUp}
 * @property {function} [swipeDown=null] A handler that is triggered for "down" swipes. See {@link $.fn.swipe#event:swipeDown}
 * @property {function} [swipeStatus=null] A handler triggered for every phase of the swipe. See {@link $.fn.swipe#event:swipeStatus}
 * @property {function} [pinchIn=null] A handler triggered for pinch in events. See {@link $.fn.swipe#event:pinchIn}
 * @property {function} [pinchOut=null] A handler triggered for pinch out events. See {@link $.fn.swipe#event:pinchOut}
 * @property {function} [pinchStatus=null] A handler triggered for every phase of a pinch. See {@link $.fn.swipe#event:pinchStatus}
 * @property {function} [tap=null] A handler triggered when a user just taps on the item, rather than swipes it. If they do not move, tap is triggered, if they do move, it is not. 
 * @property {function} [doubleTap=null] A handler triggered when a user double taps on the item. The delay between taps can be set with the doubleTapThreshold property. See {@link $.fn.swipe.defaults#doubleTapThreshold}
 * @property {function} [longTap=null] A handler triggered when a user long taps on the item. The delay between start and end can be set with the longTapThreshold property. See {@link $.fn.swipe.defaults#doubleTapThreshold}
 * @property {boolean} [triggerOnTouchEnd=true] If true, the swipe events are triggered when the touch end event is received (user releases finger).  If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically. 
 * @property {boolean} [triggerOnTouchLeave=false] If true, then when the user leaves the swipe object, the swipe will end and trigger appropriate handlers. 
 * @property {string|undefined} [allowPageScroll='auto'] How the browser handles page scrolls when the user is swiping on a touchSwipe object. See {@link $.fn.swipe.pageScroll}.  <br/><br/>
                   <code>"auto"</code> : all undefined swipes will cause the page to scroll in that direction. <br/>
                   <code>"none"</code> : the page will not scroll when user swipes. <br/>
                   <code>"horizontal"</code> : will force page to scroll on horizontal swipes. <br/>
                   <code>"vertical"</code> : will force page to scroll on vertical swipes. <br/>
 * @property {boolean} [fallbackToMouseEvents=true] If true mouse events are used when run on a non touch device, false will stop swipes being triggered by mouse events on non tocuh devices. 
 * @property {string} [excludedElements="button, input, select, textarea, a, .noSwipe"] A jquery selector that specifies child elements that do NOT trigger swipes. By default this excludes all form, input, select, button, anchor and .noSwipe elements. 
 
 */
 var defaults = {
  fingers: 1,
  threshold: 75,
  cancelThreshold: null,
  pinchThreshold: 20,
  maxTimeThreshold: null,
  fingerReleaseThreshold: 250,
  longTapThreshold: 500,
  doubleTapThreshold: 200,
  swipe: null,
  swipeLeft: null,
  swipeRight: null,
  swipeUp: null,
  swipeDown: null,
  swipeStatus: null,
  pinchIn: null,
  pinchOut: null,
  pinchStatus: null,
  click: null, //Deprecated since 1.6.2
  tap: null,
  doubleTap: null,
  longTap: null,
  triggerOnTouchEnd: true,
  triggerOnTouchLeave: false,
  allowPageScroll: "auto",
  fallbackToMouseEvents: true,
  excludedElements: "label, button, input, select, textarea, a, .noSwipe"
 };



 /**
 * Applies TouchSwipe behaviour to one or more jQuery objects.
 * The TouchSwipe plugin can be instantiated via this method, or methods within 
 * TouchSwipe can be executed via this method as per jQuery plugin architecture.
 * @see TouchSwipe
 * @class
 * @param {Mixed} method If the current DOMNode is a TouchSwipe object, and <code>method</code> is a TouchSwipe method, then
 * the <code>method</code> is executed, and any following arguments are passed to the TouchSwipe method.
 * If <code>method</code> is an object, then the TouchSwipe class is instantiated on the current DOMNode, passing the 
 * configuration properties defined in the object. See TouchSwipe
 *
 */
 $.fn.swipe = function (method) {
  var $this = $(this),
    plugin = $this.data(PLUGIN_NS);

  //Check if we are already instantiated and trying to execute a method	
  if (plugin && typeof method === 'string') {
   if (plugin[method]) {
    return plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
   } else {
    $.error('Method ' + method + ' does not exist on jQuery.swipe');
   }
  }
   //Else not instantiated and trying to pass init object (or nothing)
  else if (!plugin && (typeof method === 'object' || !method)) {
   return init.apply(this, arguments);
  }

  return $this;
 };

 //Expose our defaults so a user could override the plugin defaults
 $.fn.swipe.defaults = defaults;

 /**
 * The phases that a touch event goes through.  The <code>phase</code> is passed to the event handlers. 
 * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
 * @namespace
 * @readonly
 * @property {string} PHASE_START Constant indicating the start phase of the touch event. Value is <code>"start"</code>.
 * @property {string} PHASE_MOVE Constant indicating the move phase of the touch event. Value is <code>"move"</code>.
 * @property {string} PHASE_END Constant indicating the end phase of the touch event. Value is <code>"end"</code>.
 * @property {string} PHASE_CANCEL Constant indicating the cancel phase of the touch event. Value is <code>"cancel"</code>.
 */
 $.fn.swipe.phases = {
  PHASE_START: PHASE_START,
  PHASE_MOVE: PHASE_MOVE,
  PHASE_END: PHASE_END,
  PHASE_CANCEL: PHASE_CANCEL
 };

 /**
 * The direction constants that are passed to the event handlers. 
 * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
 * @namespace
 * @readonly
 * @property {string} LEFT Constant indicating the left direction. Value is <code>"left"</code>.
 * @property {string} RIGHT Constant indicating the right direction. Value is <code>"right"</code>.
 * @property {string} UP Constant indicating the up direction. Value is <code>"up"</code>.
 * @property {string} DOWN Constant indicating the down direction. Value is <code>"cancel"</code>.
 * @property {string} IN Constant indicating the in direction. Value is <code>"in"</code>.
 * @property {string} OUT Constant indicating the out direction. Value is <code>"out"</code>.
 */
 $.fn.swipe.directions = {
  LEFT: LEFT,
  RIGHT: RIGHT,
  UP: UP,
  DOWN: DOWN,
  IN: IN,
  OUT: OUT
 };

 /**
 * The page scroll constants that can be used to set the value of <code>allowPageScroll</code> option
 * These properties are read only
 * @namespace
 * @readonly
 * @see $.fn.swipe.defaults#allowPageScroll
 * @property {string} NONE Constant indicating no page scrolling is allowed. Value is <code>"none"</code>.
 * @property {string} HORIZONTAL Constant indicating horizontal page scrolling is allowed. Value is <code>"horizontal"</code>.
 * @property {string} VERTICAL Constant indicating vertical page scrolling is allowed. Value is <code>"vertical"</code>.
 * @property {string} AUTO Constant indicating either horizontal or vertical will be allowed, depending on the swipe handlers registered. Value is <code>"auto"</code>.
 */
 $.fn.swipe.pageScroll = {
  NONE: NONE,
  HORIZONTAL: HORIZONTAL,
  VERTICAL: VERTICAL,
  AUTO: AUTO
 };

 /**
 * Constants representing the number of fingers used in a swipe.  These are used to set both the value of <code>fingers</code> in the 
 * options object, as well as the value of the <code>fingers</code> event property.
 * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
 * @namespace
 * @readonly
 * @see $.fn.swipe.defaults#fingers
 * @property {string} ONE Constant indicating 1 finger is to be detected / was detected. Value is <code>1</code>.
 * @property {string} TWO Constant indicating 2 fingers are to be detected / were detected. Value is <code>1</code>.
 * @property {string} THREE Constant indicating 3 finger are to be detected / were detected. Value is <code>1</code>.
 * @property {string} ALL Constant indicating any combination of finger are to be detected.  Value is <code>"all"</code>.
 */
 $.fn.swipe.fingers = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  ALL: ALL_FINGERS
 };

 /**
 * Initialise the plugin for each DOM element matched
 * This creates a new instance of the main TouchSwipe class for each DOM element, and then
 * saves a reference to that instance in the elements data property.
 * @internal
 */
 function init(options) {
  //Prep and extend the options
  if (options && (options.allowPageScroll === undefined && (options.swipe !== undefined || options.swipeStatus !== undefined))) {
   options.allowPageScroll = NONE;
  }

  //Check for deprecated options
  //Ensure that any old click handlers are assigned to the new tap, unless we have a tap
  if (options.click !== undefined && options.tap === undefined) {
   options.tap = options.click;
  }

  if (!options) {
   options = {};
  }

  //pass empty object so we dont modify the defaults
  options = $.extend({}, $.fn.swipe.defaults, options);

  //For each element instantiate the plugin
  return this.each(function () {
   var $this = $(this);

   //Check we havent already initialised the plugin
   var plugin = $this.data(PLUGIN_NS);

   if (!plugin) {
    plugin = new TouchSwipe(this, options);
    $this.data(PLUGIN_NS, plugin);
   }
  });
 }

 /**
 * Main TouchSwipe Plugin Class.
 * Do not use this to construct your TouchSwipe object, use the jQuery plugin method $.fn.swipe(); {@link $.fn.swipe}
 * @private
 * @name TouchSwipe
 * @param {DOMNode} element The HTML DOM object to apply to plugin to
 * @param {Object} options The options to configure the plugin with.  @link {$.fn.swipe.defaults}
 * @see $.fh.swipe.defaults
 * @see $.fh.swipe
   * @class
 */
 function TouchSwipe(element, options) {
  var useTouchEvents = (SUPPORTS_TOUCH || !options.fallbackToMouseEvents),
    START_EV = useTouchEvents ? 'touchstart' : 'mousedown',
    MOVE_EV = useTouchEvents ? 'touchmove' : 'mousemove',
    END_EV = useTouchEvents ? 'touchend' : 'mouseup',
    LEAVE_EV = useTouchEvents ? null : 'mouseleave', //we manually detect leave on touch devices, so null event here
    CANCEL_EV = 'touchcancel';



  //touch properties
  var distance = 0,
    direction = null,
    duration = 0,
    startTouchesDistance = 0,
    endTouchesDistance = 0,
    pinchZoom = 1,
    pinchDistance = 0,
    pinchDirection = 0,
    maximumsMap = null;



  //jQuery wrapped element for this instance
  var $element = $(element);

  //Current phase of th touch cycle
  var phase = "start";

  // the current number of fingers being used.
  var fingerCount = 0;

  //track mouse points / delta
  var fingerData = null;

  //track times
  var startTime = 0,
    endTime = 0,
    previousTouchEndTime = 0,
    previousTouchFingerCount = 0,
    doubleTapStartTime = 0;

  //Timeouts
  var singleTapTimeout = null;

  // Add gestures to all swipable areas if supported
  try {
   $element.bind(START_EV, touchStart);
   $element.bind(CANCEL_EV, touchCancel);
  }
  catch (e) {
   $.error('events not supported ' + START_EV + ',' + CANCEL_EV + ' on jQuery.swipe');
  }

  //
  //Public methods
  //

  /**
  * re-enables the swipe plugin with the previous configuration
  * @function
  * @name $.fn.swipe#enable
  * @return {DOMNode} The Dom element that was registered with TouchSwipe 
  * @example $("#element").swipe("enable");
  */
  this.enable = function () {
   $element.bind(START_EV, touchStart);
   $element.bind(CANCEL_EV, touchCancel);
   return $element;
  };

  /**
  * disables the swipe plugin
  * @function
  * @name $.fn.swipe#disable
  * @return {DOMNode} The Dom element that is now registered with TouchSwipe
    * @example $("#element").swipe("disable");
  */
  this.disable = function () {
   removeListeners();
   return $element;
  };

  /**
  * Destroy the swipe plugin completely. To use any swipe methods, you must re initialise the plugin.
  * @function
  * @name $.fn.swipe#destroy
  * @return {DOMNode} The Dom element that was registered with TouchSwipe 
  * @example $("#element").swipe("destroy");
  */
  this.destroy = function () {
   removeListeners();
   $element.data(PLUGIN_NS, null);
   return $element;
  };


  /**
   * Allows run time updating of the swipe configuration options.
   * @function
 * @name $.fn.swipe#option
 * @param {String} property The option property to get or set
   * @param {Object} [value] The value to set the property to
* @return {Object} If only a property name is passed, then that property value is returned.
* @example $("#element").swipe("option", "threshold"); // return the threshold
   * @example $("#element").swipe("option", "threshold", 100); // set the threshold after init
   * @see $.fn.swipe.defaults
   *
   */
  this.option = function (property, value) {
   if (options[property] !== undefined) {
    if (value === undefined) {
     return options[property];
    } else {
     options[property] = value;
    }
   } else {
    $.error('Option ' + property + ' does not exist on jQuery.swipe.options');
   }

   return null;
  }

  //
  // Private methods
  //

  //
  // EVENTS
  //
  /**
  * Event handler for a touch start event.
  * Stops the default click event from triggering and stores where we touched
  * @inner
  * @param {object} jqEvent The normalised jQuery event object.
  */
  function touchStart(jqEvent) {
   //If we already in a touch event (a finger already in use) then ignore subsequent ones..
   if (getTouchInProgress())
    return;

   //Check if this element matches any in the excluded elements selectors,  or its parent is excluded, if so, DON'T swipe
   if ($(jqEvent.target).closest(options.excludedElements, $element).length > 0)
    return;

   //As we use Jquery bind for events, we need to target the original event object
   //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
   var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

   var ret,
     evt = SUPPORTS_TOUCH ? event.touches[0] : event;

   phase = PHASE_START;

   //If we support touches, get the finger count
   if (SUPPORTS_TOUCH) {
    // get the total number of fingers touching the screen
    fingerCount = event.touches.length;
   }
    //Else this is the desktop, so stop the browser from dragging the image
   else {
    jqEvent.preventDefault(); //call this on jq event so we are cross browser
   }

   //clear vars..
   distance = 0;
   direction = null;
   pinchDirection = null;
   duration = 0;
   startTouchesDistance = 0;
   endTouchesDistance = 0;
   pinchZoom = 1;
   pinchDistance = 0;
   fingerData = createAllFingerData();
   maximumsMap = createMaximumsData();
   cancelMultiFingerRelease();


   // check the number of fingers is what we are looking for, or we are capturing pinches
   if (!SUPPORTS_TOUCH || (fingerCount === options.fingers || options.fingers === ALL_FINGERS) || hasPinches()) {
    // get the coordinates of the touch
    createFingerData(0, evt);
    startTime = getTimeStamp();

    if (fingerCount == 2) {
     //Keep track of the initial pinch distance, so we can calculate the diff later
     //Store second finger data as start
     createFingerData(1, event.touches[1]);
     startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
    }

    if (options.swipeStatus || options.pinchStatus) {
     ret = triggerHandler(event, phase);
    }
   }
   else {
    //A touch with more or less than the fingers we are looking for, so cancel
    ret = false;
   }

   //If we have a return value from the users handler, then return and cancel
   if (ret === false) {
    phase = PHASE_CANCEL;
    triggerHandler(event, phase);
    return ret;
   }
   else {
    setTouchInProgress(true);
   }

   return null;
  };



  /**
  * Event handler for a touch move event. 
  * If we change fingers during move, then cancel the event
  * @inner
  * @param {object} jqEvent The normalised jQuery event object.
  */
  function touchMove(jqEvent) {

   //As we use Jquery bind for events, we need to target the original event object
   //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
   var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

   //If we are ending, cancelling, or within the threshold of 2 fingers being released, don't track anything..
   if (phase === PHASE_END || phase === PHASE_CANCEL || inMultiFingerRelease())
    return;

   var ret,
     evt = SUPPORTS_TOUCH ? event.touches[0] : event;


   //Update the  finger data 
   var currentFinger = updateFingerData(evt);
   endTime = getTimeStamp();

   if (SUPPORTS_TOUCH) {
    fingerCount = event.touches.length;
   }

   phase = PHASE_MOVE;

   //If we have 2 fingers get Touches distance as well
   if (fingerCount == 2) {

    //Keep track of the initial pinch distance, so we can calculate the diff later
    //We do this here as well as the start event, in case they start with 1 finger, and the press 2 fingers
    if (startTouchesDistance == 0) {
     //Create second finger if this is the first time...
     createFingerData(1, event.touches[1]);

     startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
    } else {
     //Else just update the second finger
     updateFingerData(event.touches[1]);

     endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end);
     pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end);
    }


    pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance);
    pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance);
   }


   if ((fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !SUPPORTS_TOUCH || hasPinches()) {

    direction = calculateDirection(currentFinger.start, currentFinger.end);

    //Check if we need to prevent default event (page scroll / pinch zoom) or not
    validateDefaultEvent(jqEvent, direction);

    //Distance and duration are all off the main finger
    distance = calculateDistance(currentFinger.start, currentFinger.end);
    duration = calculateDuration();

    //Cache the maximum distance we made in this direction
    setMaxDistance(direction, distance);


    if (options.swipeStatus || options.pinchStatus) {
     ret = triggerHandler(event, phase);
    }


    //If we trigger end events when threshold are met, or trigger events when touch leaves element
    if (!options.triggerOnTouchEnd || options.triggerOnTouchLeave) {

     var inBounds = true;

     //If checking if we leave the element, run the bounds check (we can use touchleave as its not supported on webkit)
     if (options.triggerOnTouchLeave) {
      var bounds = getbounds(this);
      inBounds = isInBounds(currentFinger.end, bounds);
     }

     //Trigger end handles as we swipe if thresholds met or if we have left the element if the user has asked to check these..
     if (!options.triggerOnTouchEnd && inBounds) {
      phase = getNextPhase(PHASE_MOVE);
     }
      //We end if out of bounds here, so set current phase to END, and check if its modified 
     else if (options.triggerOnTouchLeave && !inBounds) {
      phase = getNextPhase(PHASE_END);
     }

     if (phase == PHASE_CANCEL || phase == PHASE_END) {
      triggerHandler(event, phase);
     }
    }
   }
   else {
    phase = PHASE_CANCEL;
    triggerHandler(event, phase);
   }

   if (ret === false) {
    phase = PHASE_CANCEL;
    triggerHandler(event, phase);
   }
  }



  /**
  * Event handler for a touch end event. 
  * Calculate the direction and trigger events
  * @inner
  * @param {object} jqEvent The normalised jQuery event object.
  */
  function touchEnd(jqEvent) {
   //As we use Jquery bind for events, we need to target the original event object
   var event = jqEvent.originalEvent;


   //If we are still in a touch with another finger return
   //This allows us to wait a fraction and see if the other finger comes up, if it does within the threshold, then we treat it as a multi release, not a single release.
   if (SUPPORTS_TOUCH) {
    if (event.touches.length > 0) {
     startMultiFingerRelease();
     return true;
    }
   }

   //If a previous finger has been released, check how long ago, if within the threshold, then assume it was a multifinger release.
   //This is used to allow 2 fingers to release fractionally after each other, whilst maintainig the event as containg 2 fingers, not 1
   if (inMultiFingerRelease()) {
    fingerCount = previousTouchFingerCount;
   }

   //call this on jq event so we are cross browser 
   jqEvent.preventDefault();

   //Set end of swipe
   endTime = getTimeStamp();

   //Get duration incase move was never fired
   duration = calculateDuration();

   //If we trigger handlers at end of swipe OR, we trigger during, but they didnt trigger and we are still in the move phase
   if (didSwipeBackToCancel()) {
    phase = PHASE_CANCEL;
    triggerHandler(event, phase);
   } else if (options.triggerOnTouchEnd || (options.triggerOnTouchEnd == false && phase === PHASE_MOVE)) {
    phase = PHASE_END;
    triggerHandler(event, phase);
   }
    //Special cases - A tap should always fire on touch end regardless,
    //So here we manually trigger the tap end handler by itself
    //We dont run trigger handler as it will re-trigger events that may have fired already
   else if (!options.triggerOnTouchEnd && hasTap()) {
    //Trigger the pinch events...
    phase = PHASE_END;
    triggerHandlerForGesture(event, phase, TAP);
   }
   else if (phase === PHASE_MOVE) {
    phase = PHASE_CANCEL;
    triggerHandler(event, phase);
   }

   setTouchInProgress(false);

   return null;
  }



  /**
  * Event handler for a touch cancel event. 
  * Clears current vars
  * @inner
  */
  function touchCancel() {
   // reset the variables back to default values
   fingerCount = 0;
   endTime = 0;
   startTime = 0;
   startTouchesDistance = 0;
   endTouchesDistance = 0;
   pinchZoom = 1;

   //If we were in progress of tracking a possible multi touch end, then re set it.
   cancelMultiFingerRelease();

   setTouchInProgress(false);
  }


  /**
  * Event handler for a touch leave event. 
  * This is only triggered on desktops, in touch we work this out manually
  * as the touchleave event is not supported in webkit
  * @inner
  */
  function touchLeave(jqEvent) {
   var event = jqEvent.originalEvent;

   //If we have the trigger on leave property set....
   if (options.triggerOnTouchLeave) {
    phase = getNextPhase(PHASE_END);
    triggerHandler(event, phase);
   }
  }

  /**
  * Removes all listeners that were associated with the plugin
  * @inner
  */
  function removeListeners() {
   $element.unbind(START_EV, touchStart);
   $element.unbind(CANCEL_EV, touchCancel);
   $element.unbind(MOVE_EV, touchMove);
   $element.unbind(END_EV, touchEnd);

   //we only have leave events on desktop, we manually calculate leave on touch as its not supported in webkit
   if (LEAVE_EV) {
    $element.unbind(LEAVE_EV, touchLeave);
   }

   setTouchInProgress(false);
  }


  /**
   * Checks if the time and distance thresholds have been met, and if so then the appropriate handlers are fired.
   */
  function getNextPhase(currentPhase) {

   var nextPhase = currentPhase;

   // Ensure we have valid swipe (under time and over distance  and check if we are out of bound...)
   var validTime = validateSwipeTime();
   var validDistance = validateSwipeDistance();
   var didCancel = didSwipeBackToCancel();

   //If we have exceeded our time, then cancel	
   if (!validTime || didCancel) {
    nextPhase = PHASE_CANCEL;
   }
    //Else if we are moving, and have reached distance then end
   else if (validDistance && currentPhase == PHASE_MOVE && (!options.triggerOnTouchEnd || options.triggerOnTouchLeave)) {
    nextPhase = PHASE_END;
   }
    //Else if we have ended by leaving and didn't reach distance, then cancel
   else if (!validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave) {
    nextPhase = PHASE_CANCEL;
   }

   return nextPhase;
  }


  /**
  * Trigger the relevant event handler
  * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
  * @param {object} event the original event object
  * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
  * @inner
  */
  function triggerHandler(event, phase) {

   var ret = undefined;

   // SWIPE GESTURES
   if (didSwipe() || hasSwipes()) { //hasSwipes as status needs to fire even if swipe is invalid
    //Trigger the swipe events...
    ret = triggerHandlerForGesture(event, phase, SWIPE);
   }

    // PINCH GESTURES (if the above didn't cancel)
   else if ((didPinch() || hasPinches()) && ret !== false) {
    //Trigger the pinch events...
    ret = triggerHandlerForGesture(event, phase, PINCH);
   }

   // CLICK / TAP (if the above didn't cancel)
   if (didDoubleTap() && ret !== false) {
    //Trigger the tap events...
    ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP);
   }

    // CLICK / TAP (if the above didn't cancel)
   else if (didLongTap() && ret !== false) {
    //Trigger the tap events...
    ret = triggerHandlerForGesture(event, phase, LONG_TAP);
   }

    // CLICK / TAP (if the above didn't cancel)
   else if (didTap() && ret !== false) {
    //Trigger the tap event..
    ret = triggerHandlerForGesture(event, phase, TAP);
   }



   // If we are cancelling the gesture, then manually trigger the reset handler
   if (phase === PHASE_CANCEL) {
    touchCancel(event);
   }

   // If we are ending the gesture, then manually trigger the reset handler IF all fingers are off
   if (phase === PHASE_END) {
    //If we support touch, then check that all fingers are off before we cancel
    if (SUPPORTS_TOUCH) {
     if (event.touches.length == 0) {
      touchCancel(event);
     }
    }
    else {
     touchCancel(event);
    }
   }

   return ret;
  }



  /**
  * Trigger the relevant event handler
  * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
  * @param {object} event the original event object
  * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
  * @param {string} gesture the gesture to trigger a handler for : PINCH or SWIPE {@link $.fn.swipe.gestures}
  * @return Boolean False, to indicate that the event should stop propagation, or void.
  * @inner
  */
  function triggerHandlerForGesture(event, phase, gesture) {

   var ret = undefined;

   //SWIPES....
   if (gesture == SWIPE) {
    //Trigger status every time..

    //Trigger the event...
    $element.trigger('swipeStatus', [phase, direction || null, distance || 0, duration || 0, fingerCount]);

    //Fire the callback
    if (options.swipeStatus) {
     ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount);
     //If the status cancels, then dont run the subsequent event handlers..
     if (ret === false) return false;
    }




    if (phase == PHASE_END && validateSwipe()) {
     //Fire the catch all event
     $element.trigger('swipe', [direction, distance, duration, fingerCount]);

     //Fire catch all callback
     if (options.swipe) {
      ret = options.swipe.call($element, event, direction, distance, duration, fingerCount);
      //If the status cancels, then dont run the subsequent event handlers..
      if (ret === false) return false;
     }

     //trigger direction specific event handlers	
     switch (direction) {
      case LEFT:
       //Trigger the event
       $element.trigger('swipeLeft', [direction, distance, duration, fingerCount]);

       //Fire the callback
       if (options.swipeLeft) {
        ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount);
       }
       break;

      case RIGHT:
       //Trigger the event
       $element.trigger('swipeRight', [direction, distance, duration, fingerCount]);

       //Fire the callback
       if (options.swipeRight) {
        ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount);
       }
       break;

      case UP:
       //Trigger the event
       $element.trigger('swipeUp', [direction, distance, duration, fingerCount]);

       //Fire the callback
       if (options.swipeUp) {
        ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount);
       }
       break;

      case DOWN:
       //Trigger the event
       $element.trigger('swipeDown', [direction, distance, duration, fingerCount]);

       //Fire the callback
       if (options.swipeDown) {
        ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount);
       }
       break;
     }
    }
   }


   //PINCHES....
   if (gesture == PINCH) {
    //Trigger the event
    $element.trigger('pinchStatus', [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom]);

    //Fire the callback
    if (options.pinchStatus) {
     ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom);
     //If the status cancels, then dont run the subsequent event handlers..
     if (ret === false) return false;
    }

    if (phase == PHASE_END && validatePinch()) {

     switch (pinchDirection) {
      case IN:
       //Trigger the event
       $element.trigger('pinchIn', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom]);

       //Fire the callback
       if (options.pinchIn) {
        ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom);
       }
       break;

      case OUT:
       //Trigger the event
       $element.trigger('pinchOut', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom]);

       //Fire the callback
       if (options.pinchOut) {
        ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom);
       }
       break;
     }
    }
   }





   if (gesture == TAP) {
    if (phase === PHASE_CANCEL || phase === PHASE_END) {


     //Cancel any existing double tap
     clearTimeout(singleTapTimeout);

     //If we are also looking for doubelTaps, wait incase this is one...
     if (hasDoubleTap() && !inDoubleTap()) {
      //Cache the time of this tap
      doubleTapStartTime = getTimeStamp();

      //Now wait for the double tap timeout, and trigger this single tap
      //if its not cancelled by a double tap
      singleTapTimeout = setTimeout($.proxy(function () {
       doubleTapStartTime = null;
       //Trigger the event
       $element.trigger('tap', [event.target]);


       //Fire the callback
       if (options.tap) {
        ret = options.tap.call($element, event, event.target);
       }
      }, this), options.doubleTapThreshold);

     } else {
      doubleTapStartTime = null;

      //Trigger the event
      $element.trigger('tap', [event.target]);


      //Fire the callback
      if (options.tap) {
       ret = options.tap.call($element, event, event.target);
      }
     }
    }
   }

   else if (gesture == DOUBLE_TAP) {
    if (phase === PHASE_CANCEL || phase === PHASE_END) {
     //Cancel any pending singletap 
     clearTimeout(singleTapTimeout);
     doubleTapStartTime = null;

     //Trigger the event
     $element.trigger('doubletap', [event.target]);

     //Fire the callback
     if (options.doubleTap) {
      ret = options.doubleTap.call($element, event, event.target);
     }
    }
   }

   else if (gesture == LONG_TAP) {
    if (phase === PHASE_CANCEL || phase === PHASE_END) {
     //Cancel any pending singletap (shouldnt be one)
     clearTimeout(singleTapTimeout);
     doubleTapStartTime = null;

     //Trigger the event
     $element.trigger('longtap', [event.target]);

     //Fire the callback
     if (options.longTap) {
      ret = options.longTap.call($element, event, event.target);
     }
    }
   }

   return ret;
  }




  //
  // GESTURE VALIDATION
  //

  /**
  * Checks the user has swipe far enough
  * @return Boolean if <code>threshold</code> has been set, return true if the threshold was met, else false.
  * If no threshold was set, then we return true.
  * @inner
  */
  function validateSwipeDistance() {
   var valid = true;
   //If we made it past the min swipe distance..
   if (options.threshold !== null) {
    valid = distance >= options.threshold;
   }

   return valid;
  }

  /**
  * Checks the user has swiped back to cancel.
  * @return Boolean if <code>cancelThreshold</code> has been set, return true if the cancelThreshold was met, else false.
  * If no cancelThreshold was set, then we return true.
  * @inner
  */
  function didSwipeBackToCancel() {
   var cancelled = false;
   if (options.cancelThreshold !== null && direction !== null) {
    cancelled = (getMaxDistance(direction) - distance) >= options.cancelThreshold;
   }

   return cancelled;
  }

  /**
  * Checks the user has pinched far enough
  * @return Boolean if <code>pinchThreshold</code> has been set, return true if the threshold was met, else false.
  * If no threshold was set, then we return true.
  * @inner
  */
  function validatePinchDistance() {
   if (options.pinchThreshold !== null) {
    return pinchDistance >= options.pinchThreshold;
   }
   return true;
  }

  /**
  * Checks that the time taken to swipe meets the minimum / maximum requirements
  * @return Boolean
  * @inner
  */
  function validateSwipeTime() {
   var result;
   //If no time set, then return true

   if (options.maxTimeThreshold) {
    if (duration >= options.maxTimeThreshold) {
     result = false;
    } else {
     result = true;
    }
   }
   else {
    result = true;
   }

   return result;
  }


  /**
  * Checks direction of the swipe and the value allowPageScroll to see if we should allow or prevent the default behaviour from occurring.
  * This will essentially allow page scrolling or not when the user is swiping on a touchSwipe object.
  * @param {object} jqEvent The normalised jQuery representation of the event object.
  * @param {string} direction The direction of the event. See {@link $.fn.swipe.directions}
  * @see $.fn.swipe.directions
  * @inner
  */
  function validateDefaultEvent(jqEvent, direction) {
   if (options.allowPageScroll === NONE || hasPinches()) {
    jqEvent.preventDefault();
   } else {
    var auto = options.allowPageScroll === AUTO;

    switch (direction) {
     case LEFT:
      if ((options.swipeLeft && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
       jqEvent.preventDefault();
      }
      break;

     case RIGHT:
      if ((options.swipeRight && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
       jqEvent.preventDefault();
      }
      break;

     case UP:
      if ((options.swipeUp && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
       jqEvent.preventDefault();
      }
      break;

     case DOWN:
      if ((options.swipeDown && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
       jqEvent.preventDefault();
      }
      break;
    }
   }

  }


  // PINCHES
  /**
   * Returns true of the current pinch meets the thresholds
   * @return Boolean
   * @inner
  */
  function validatePinch() {
   var hasCorrectFingerCount = validateFingers();
   var hasEndPoint = validateEndPoint();
   var hasCorrectDistance = validatePinchDistance();
   return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;

  }

  /**
   * Returns true if any Pinch events have been registered
   * @return Boolean
   * @inner
  */
  function hasPinches() {
   //Enure we dont return 0 or null for false values
   return !!(options.pinchStatus || options.pinchIn || options.pinchOut);
  }

  /**
   * Returns true if we are detecting pinches, and have one
   * @return Boolean
   * @inner
   */
  function didPinch() {
   //Enure we dont return 0 or null for false values
   return !!(validatePinch() && hasPinches());
  }




  // SWIPES
  /**
   * Returns true if the current swipe meets the thresholds
   * @return Boolean
   * @inner
  */
  function validateSwipe() {
   //Check validity of swipe
   var hasValidTime = validateSwipeTime();
   var hasValidDistance = validateSwipeDistance();
   var hasCorrectFingerCount = validateFingers();
   var hasEndPoint = validateEndPoint();
   var didCancel = didSwipeBackToCancel();

   // if the user swiped more than the minimum length, perform the appropriate action
   // hasValidDistance is null when no distance is set 
   var valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;

   return valid;
  }

  /**
   * Returns true if any Swipe events have been registered
   * @return Boolean
   * @inner
  */
  function hasSwipes() {
   //Enure we dont return 0 or null for false values
   return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown);
  }


  /**
   * Returns true if we are detecting swipes and have one
   * @return Boolean
   * @inner
  */
  function didSwipe() {
   //Enure we dont return 0 or null for false values
   return !!(validateSwipe() && hasSwipes());
  }

  /**
* Returns true if we have matched the number of fingers we are looking for
* @return Boolean
* @inner
*/
  function validateFingers() {
   //The number of fingers we want were matched, or on desktop we ignore
   return ((fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !SUPPORTS_TOUCH);
  }

  /**
* Returns true if we have an end point for the swipe
* @return Boolean
* @inner
*/
  function validateEndPoint() {
   //We have an end value for the finger
   return fingerData[0].end.x !== 0;
  }

  // TAP / CLICK
  /**
   * Returns true if a click / tap events have been registered
   * @return Boolean
   * @inner
  */
  function hasTap() {
   //Enure we dont return 0 or null for false values
   return !!(options.tap);
  }

  /**
   * Returns true if a double tap events have been registered
   * @return Boolean
   * @inner
  */
  function hasDoubleTap() {
   //Enure we dont return 0 or null for false values
   return !!(options.doubleTap);
  }

  /**
   * Returns true if any long tap events have been registered
   * @return Boolean
   * @inner
  */
  function hasLongTap() {
   //Enure we dont return 0 or null for false values
   return !!(options.longTap);
  }

  /**
   * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
   * @return Boolean
   * @inner
  */
  function validateDoubleTap() {
   if (doubleTapStartTime == null) {
    return false;
   }
   var now = getTimeStamp();
   return (hasDoubleTap() && ((now - doubleTapStartTime) <= options.doubleTapThreshold));
  }

  /**
   * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
   * @return Boolean
   * @inner
  */
  function inDoubleTap() {
   return validateDoubleTap();
  }


  /**
   * Returns true if we have a valid tap
   * @return Boolean
   * @inner
  */
  function validateTap() {
   return ((fingerCount === 1 || !SUPPORTS_TOUCH) && (isNaN(distance) || distance === 0));
  }

  /**
   * Returns true if we have a valid long tap
   * @return Boolean
   * @inner
  */
  function validateLongTap() {
   //slight threshold on moving finger
   return ((duration > options.longTapThreshold) && (distance < DOUBLE_TAP_THRESHOLD));
  }

  /**
   * Returns true if we are detecting taps and have one
   * @return Boolean
   * @inner
  */
  function didTap() {
   //Enure we dont return 0 or null for false values
   return !!(validateTap() && hasTap());
  }


  /**
   * Returns true if we are detecting double taps and have one
   * @return Boolean
   * @inner
  */
  function didDoubleTap() {
   //Enure we dont return 0 or null for false values
   return !!(validateDoubleTap() && hasDoubleTap());
  }

  /**
   * Returns true if we are detecting long taps and have one
   * @return Boolean
   * @inner
  */
  function didLongTap() {
   //Enure we dont return 0 or null for false values
   return !!(validateLongTap() && hasLongTap());
  }




  // MULTI FINGER TOUCH
  /**
   * Starts tracking the time between 2 finger releases, and keeps track of how many fingers we initially had up
   * @inner
  */
  function startMultiFingerRelease() {
   previousTouchEndTime = getTimeStamp();
   previousTouchFingerCount = event.touches.length + 1;
  }

  /**
   * Cancels the tracking of time between 2 finger releases, and resets counters
   * @inner
  */
  function cancelMultiFingerRelease() {
   previousTouchEndTime = 0;
   previousTouchFingerCount = 0;
  }

  /**
   * Checks if we are in the threshold between 2 fingers being released 
   * @return Boolean
   * @inner
  */
  function inMultiFingerRelease() {

   var withinThreshold = false;

   if (previousTouchEndTime) {
    var diff = getTimeStamp() - previousTouchEndTime
    if (diff <= options.fingerReleaseThreshold) {
     withinThreshold = true;
    }
   }

   return withinThreshold;
  }


  /**
  * gets a data flag to indicate that a touch is in progress
  * @return Boolean
  * @inner
  */
  function getTouchInProgress() {
   //strict equality to ensure only true and false are returned
   return !!($element.data(PLUGIN_NS + '_intouch') === true);
  }

  /**
  * Sets a data flag to indicate that a touch is in progress
  * @param {boolean} val The value to set the property to
  * @inner
  */
  function setTouchInProgress(val) {

   //Add or remove event listeners depending on touch status
   if (val === true) {
    $element.bind(MOVE_EV, touchMove);
    $element.bind(END_EV, touchEnd);

    //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
    if (LEAVE_EV) {
     $element.bind(LEAVE_EV, touchLeave);
    }
   } else {
    $element.unbind(MOVE_EV, touchMove, false);
    $element.unbind(END_EV, touchEnd, false);

    //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
    if (LEAVE_EV) {
     $element.unbind(LEAVE_EV, touchLeave, false);
    }
   }


   //strict equality to ensure only true and false can update the value
   $element.data(PLUGIN_NS + '_intouch', val === true);
  }


  /**
   * Creates the finger data for the touch/finger in the event object.
   * @param {int} index The index in the array to store the finger data (usually the order the fingers were pressed)
   * @param {object} evt The event object containing finger data
   * @return finger data object
   * @inner
  */
  function createFingerData(index, evt) {
   var id = evt.identifier !== undefined ? evt.identifier : 0;

   fingerData[index].identifier = id;
   fingerData[index].start.x = fingerData[index].end.x = evt.pageX || evt.clientX;
   fingerData[index].start.y = fingerData[index].end.y = evt.pageY || evt.clientY;

   return fingerData[index];
  }

  /**
   * Updates the finger data for a particular event object
   * @param {object} evt The event object containing the touch/finger data to upadte
   * @return a finger data object.
   * @inner
  */
  function updateFingerData(evt) {

   var id = evt.identifier !== undefined ? evt.identifier : 0;
   var f = getFingerData(id);

   f.end.x = evt.pageX || evt.clientX;
   f.end.y = evt.pageY || evt.clientY;

   return f;
  }

  /**
   * Returns a finger data object by its event ID.
   * Each touch event has an identifier property, which is used 
   * to track repeat touches
   * @param {int} id The unique id of the finger in the sequence of touch events.
   * @return a finger data object.
   * @inner
  */
  function getFingerData(id) {
   for (var i = 0; i < fingerData.length; i++) {
    if (fingerData[i].identifier == id) {
     return fingerData[i];
    }
   }
  }

  /**
   * Creats all the finger onjects and returns an array of finger data
   * @return Array of finger objects
   * @inner
  */
  function createAllFingerData() {
   var fingerData = [];
   for (var i = 0; i <= 5; i++) {
    fingerData.push({
     start: { x: 0, y: 0 },
     end: { x: 0, y: 0 },
     identifier: 0
    });
   }

   return fingerData;
  }

  /**
   * Sets the maximum distance swiped in the given direction. 
   * If the new value is lower than the current value, the max value is not changed.
   * @param {string}  direction The direction of the swipe
   * @param {int}  distance The distance of the swipe
   * @inner
  */
  function setMaxDistance(direction, distance) {
   distance = Math.max(distance, getMaxDistance(direction));
   maximumsMap[direction].distance = distance;
  }

  /**
* gets the maximum distance swiped in the given direction. 
* @param {string}  direction The direction of the swipe
* @return int  The distance of the swipe
* @inner
*/
  function getMaxDistance(direction) {
   if (maximumsMap[direction]) return maximumsMap[direction].distance;
   return undefined;
  }

  /**
   * Creats a map of directions to maximum swiped values.
   * @return Object A dictionary of maximum values, indexed by direction.
   * @inner
  */
  function createMaximumsData() {
   var maxData = {};
   maxData[LEFT] = createMaximumVO(LEFT);
   maxData[RIGHT] = createMaximumVO(RIGHT);
   maxData[UP] = createMaximumVO(UP);
   maxData[DOWN] = createMaximumVO(DOWN);

   return maxData;
  }

  /**
   * Creates a map maximum swiped values for a given swipe direction
   * @param {string} The direction that these values will be associated with
   * @return Object Maximum values
   * @inner
  */
  function createMaximumVO(dir) {
   return {
    direction: dir,
    distance: 0
   }
  }


  //
  // MATHS / UTILS
  //

  /**
  * Calculate the duration of the swipe
  * @return int
  * @inner
  */
  function calculateDuration() {
   return endTime - startTime;
  }

  /**
  * Calculate the distance between 2 touches (pinch)
  * @param {point} startPoint A point object containing x and y co-ordinates
    * @param {point} endPoint A point object containing x and y co-ordinates
    * @return int;
  * @inner
  */
  function calculateTouchesDistance(startPoint, endPoint) {
   var diffX = Math.abs(startPoint.x - endPoint.x);
   var diffY = Math.abs(startPoint.y - endPoint.y);

   return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
  }

  /**
  * Calculate the zoom factor between the start and end distances
  * @param {int} startDistance Distance (between 2 fingers) the user started pinching at
    * @param {int} endDistance Distance (between 2 fingers) the user ended pinching at
    * @return float The zoom value from 0 to 1.
  * @inner
  */
  function calculatePinchZoom(startDistance, endDistance) {
   var percent = (endDistance / startDistance) * 1;
   return percent.toFixed(2);
  }


  /**
  * Returns the pinch direction, either IN or OUT for the given points
  * @return string Either {@link $.fn.swipe.directions.IN} or {@link $.fn.swipe.directions.OUT}
  * @see $.fn.swipe.directions
  * @inner
  */
  function calculatePinchDirection() {
   if (pinchZoom < 1) {
    return OUT;
   }
   else {
    return IN;
   }
  }


  /**
  * Calculate the length / distance of the swipe
  * @param {point} startPoint A point object containing x and y co-ordinates
    * @param {point} endPoint A point object containing x and y co-ordinates
    * @return int
  * @inner
  */
  function calculateDistance(startPoint, endPoint) {
   return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
  }

  /**
  * Calculate the angle of the swipe
  * @param {point} startPoint A point object containing x and y co-ordinates
    * @param {point} endPoint A point object containing x and y co-ordinates
    * @return int
  * @inner
  */
  function calculateAngle(startPoint, endPoint) {
   var x = startPoint.x - endPoint.x;
   var y = endPoint.y - startPoint.y;
   var r = Math.atan2(y, x); //radians
   var angle = Math.round(r * 180 / Math.PI); //degrees

   //ensure value is positive
   if (angle < 0) {
    angle = 360 - Math.abs(angle);
   }

   return angle;
  }

  /**
  * Calculate the direction of the swipe
  * This will also call calculateAngle to get the latest angle of swipe
  * @param {point} startPoint A point object containing x and y co-ordinates
    * @param {point} endPoint A point object containing x and y co-ordinates
    * @return string Either {@link $.fn.swipe.directions.LEFT} / {@link $.fn.swipe.directions.RIGHT} / {@link $.fn.swipe.directions.DOWN} / {@link $.fn.swipe.directions.UP}
  * @see $.fn.swipe.directions
  * @inner
  */
  function calculateDirection(startPoint, endPoint) {
   var angle = calculateAngle(startPoint, endPoint);

   if ((angle <= 45) && (angle >= 0)) {
    return LEFT;
   } else if ((angle <= 360) && (angle >= 315)) {
    return LEFT;
   } else if ((angle >= 135) && (angle <= 225)) {
    return RIGHT;
   } else if ((angle > 45) && (angle < 135)) {
    return DOWN;
   } else {
    return UP;
   }
  }


  /**
  * Returns a MS time stamp of the current time
  * @return int
  * @inner
  */
  function getTimeStamp() {
   var now = new Date();
   return now.getTime();
  }



  /**
   * Returns a bounds object with left, right, top and bottom properties for the element specified.
   * @param {DomNode} The DOM node to get the bounds for.
   */
  function getbounds(el) {
   el = $(el);
   var offset = el.offset();

   var bounds = {
    left: offset.left,
    right: offset.left + el.outerWidth(),
    top: offset.top,
    bottom: offset.top + el.outerHeight()
   }

   return bounds;
  }


  /**
   * Checks if the point object is in the bounds object.
   * @param {object} point A point object.
   * @param {int} point.x The x value of the point.
   * @param {int} point.y The x value of the point.
   * @param {object} bounds The bounds object to test
   * @param {int} bounds.left The leftmost value
   * @param {int} bounds.right The righttmost value
   * @param {int} bounds.top The topmost value
  * @param {int} bounds.bottom The bottommost value
   */
  function isInBounds(point, bounds) {
   return (point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom);
  };


 }




 /**
  * A catch all handler that is triggered for all swipe directions. 
  * @name $.fn.swipe#swipe
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
  * @param {int} distance The distance the user swiped
  * @param {int} duration The duration of the swipe in milliseconds
  * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
  */




 /**
  * A handler that is triggered for "left" swipes.
  * @name $.fn.swipe#swipeLeft
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
  * @param {int} distance The distance the user swiped
  * @param {int} duration The duration of the swipe in milliseconds
  * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
  */

 /**
  * A handler that is triggered for "right" swipes.
  * @name $.fn.swipe#swipeRight
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
  * @param {int} distance The distance the user swiped
  * @param {int} duration The duration of the swipe in milliseconds
  * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
  */

 /**
  * A handler that is triggered for "up" swipes.
  * @name $.fn.swipe#swipeUp
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
  * @param {int} distance The distance the user swiped
  * @param {int} duration The duration of the swipe in milliseconds
  * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
  */

 /**
  * A handler that is triggered for "down" swipes.
  * @name $.fn.swipe#swipeDown
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
  * @param {int} distance The distance the user swiped
  * @param {int} duration The duration of the swipe in milliseconds
  * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
  */

 /**
  * A handler triggered for every phase of the swipe. This handler is constantly fired for the duration of the pinch.
  * This is triggered regardless of swipe thresholds.
  * @name $.fn.swipe#swipeStatus
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {string} phase The phase of the swipe event. See {@link $.fn.swipe.phases}
  * @param {string} direction The direction the user swiped in. This is null if the user has yet to move. See {@link $.fn.swipe.directions}
  * @param {int} distance The distance the user swiped. This is 0 if the user has yet to move.
  * @param {int} duration The duration of the swipe in milliseconds
  * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
  */

 /**
  * A handler triggered for pinch in events.
  * @name $.fn.swipe#pinchIn
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
  * @param {int} distance The distance the user pinched
  * @param {int} duration The duration of the swipe in milliseconds
  * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
  * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
  */

 /**
  * A handler triggered for pinch out events.
  * @name $.fn.swipe#pinchOut
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
  * @param {int} distance The distance the user pinched
  * @param {int} duration The duration of the swipe in milliseconds
  * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
  * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
  */

 /**
  * A handler triggered for all pinch events. This handler is constantly fired for the duration of the pinch. This is triggered regardless of thresholds.
  * @name $.fn.swipe#pinchStatus
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
  * @param {int} distance The distance the user pinched
  * @param {int} duration The duration of the swipe in milliseconds
  * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
  * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
  */

 /**
  * A click handler triggered when a user simply clicks, rather than swipes on an element.
  * This is deprecated since version 1.6.2, any assignment to click will be assigned to the tap handler.
  * You cannot use <code>on</code> to bind to this event as the default jQ <code>click</code> event will be triggered.
  * Use the <code>tap</code> event instead.
  * @name $.fn.swipe#click
  * @event
  * @deprecated since version 1.6.2, please use {@link $.fn.swipe#tap} instead 
  * @default null
  * @param {EventObject} event The original event object
  * @param {DomObject} target The element clicked on.
  */

 /**
 * A click / tap handler triggered when a user simply clicks or taps, rather than swipes on an element.
 * @name $.fn.swipe#tap
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {DomObject} target The element clicked on.
 */

 /**
  * A double tap handler triggered when a user double clicks or taps on an element.
  * You can set the time delay for a double tap with the {@link $.fn.swipe.defaults#doubleTapThreshold} property. 
  * Note: If you set both <code>doubleTap</code> and <code>tap</code> handlers, the <code>tap</code> event will be delayed by the <code>doubleTapThreshold</code>
  * as the script needs to check if its a double tap.
  * @name $.fn.swipe#doubleTap
  * @see  $.fn.swipe.defaults#doubleTapThreshold
  * @event
  * @default null
  * @param {EventObject} event The original event object
  * @param {DomObject} target The element clicked on.
  */

 /**
 * A long tap handler triggered when a user long clicks or taps on an element.
 * You can set the time delay for a long tap with the {@link $.fn.swipe.defaults#longTapThreshold} property. 
 * @name $.fn.swipe#longTap
 * @see  $.fn.swipe.defaults#longTapThreshold
 * @event
 * @default null
 * @param {EventObject} event The original event object
 * @param {DomObject} target The element clicked on.
 */

}));
///#source 1 1 /Edgy/lib/modules/Content.js
window.cet = window.cet || {};

(function () {



  //#region meta declarations
  var Audio;
  var option;
  var Baskets;
  var Stage;
  var Storage;
  var Buttons;
  var Lms;
  var Feedback;
  var DragSync;
  //#endregion

  var Content = (function () {

    var contentJson = null;
    var basePath = '';





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
      }).fail(function () { alert('error');  });
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

    return {

      load: function (data) {
        load(data);
      },

      init: function () {
        //#region meta declarations
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;

        Stage = cet.Stage;
        Storage = cet.Storage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        DragSync = cet.DragSync;
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
      getBackgroundColor: function () {
        if (this.getContentJson().backgroundColor)
          return this.getContentJson().backgroundColor;
        return null;
      }


    };
  })();

  cet.Content = Content;



})();

///#source 1 1 /Edgy/lib/modules/FinalFeedback.js
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

        Content = cet.Content;
        Stage = cet.Stage;
        App = cet.App;
        Audio = cet.Audio;

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
        
        Audio.load('FeedbackBad')
        Audio.load('FeedbackGood')
      },
      showSuccess: function () {

        if (!jqElement || Feedback.isVisible())
          return;
        jqElement.show();

        if (jqElementSuccess.length == 0)
          return;
        jqElementFailure.hide();
        jqElementSuccess.show();

        if (symbolSuccess)
          symbolSuccess.play();

        Audio.play('FeedbackGood')
      },
      showFailure: function () {
        jqElement.show();
        jqElementSuccess.hide();
        jqElementFailure.show();
        symbolFailure.play();
        Audio.play('FeedbackBad')
      },
      hide: function () {

        if (!jqElement)
          return;
        if (!jqElementSuccess.is(':visible') && !jqElementFailure.is(':visible'))
          return;

        jqElement.hide();
        jqElementSuccess.hide();
        jqElementFailure.hide();
        Stage.trigger('change', self);
      },
      isVisible: function () {
        return jqElement && jqElement.is(':visible');
      }
    }
  })();

  cet.Feedback = Feedback;

})();

///#source 1 1 /Edgy/lib/modules/Stage.js
window.cet = window.cet || {};
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
      init: function () {
        //#region meta declarations
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        App = cet.App;
        //#endregion

        Stage.symbol = App.composition().getStage();
        Stage.jqElement = $(Stage.symbol.getSymbolElementNode());
        
      },
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
      getSymbol: function (selector) {
        if (typeof selector == 'undefined')
          return null;
        if (selector.length == 0)
          return null;

        if (typeof selector != 'string')
          selector = selector.attr('id');
        if (selector[0] != '#')
          selector = '#' + selector
        return Stage.symbol.getSymbol(selector);

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
      eliminateIPadBounceEffect: function () {
        Stage.jqElement.on('touchmove', function (jQueryEvent) {
          jQueryEvent.preventDefault();
        });
      },
      addClass: function (name) {
        Stage.jqElement.addClass(name)

      },
      append: function ($element) {
        Stage.jqElement.append($element);
      }
    };
  })();




  cet.Stage = Stage;

})();

///#source 1 1 /Edgy/lib/modules/Lifes.js
window.cet = window.cet || {};

(function () {

 //#region meta declarations

 var Audio;
 var option;
 var Baskets;
 var Content;
 var Stage;
 var Storage;
 var Buttons;
 var Lms;
 var Feedback;
 var DragSync;

 //#endregion


 var Lifes = (function () {
  
  var left;
  var jqElements = [];
  var eternal;
  return {
   init: function () {
    //#region meta declarations

    Audio = cet.Audio;
    option = cet.option;
    Baskets = cet.Baskets;
    Content = cet.Content;
    Stage = cet.Stage;
    Storage = cet.Storage;
    Buttons = cet.Buttons;
    Lms = cet.Lms;
    Feedback = cet.Feedback;
    DragSync = cet.DragSync;

    //#endregion
    
    left = Content.getLifes();
    eternal = left == 'eternal';

    var tmp = $('.life').hide();
    
    if (eternal)
     return;

    for (var i = tmp.length - left; i < (tmp.length + left); i++) {
     jqElements.push($(tmp[i]).show());
    }

    Lifes.restart();

   },
   restart: function () {
    if (eternal)
     return;

    left = Content.getLifes();
    for (var i = 0; i < jqElements.length; i++) {
     jqElements[i].find('.alive').show();
     jqElements[i].find('.dead').hide();
    }
   },
   killOne: function () {
    if (eternal)
     return;
    left--;
    jqElements[left].find('.alive').hide();
    jqElements[left].find('.dead').show();
   },
   anyLeft: function () {
    if (eternal)
     return true;
    return left > 0;
   },
   hide: function () {
    if (eternal)
     return;
    jqElements[0].parent().hide();

   },
   show: function () {
    if (eternal)
     return;
    jqElements[0].parent().show();

   }

  }
 })();

 cet.Lifes = Lifes;

})();

///#source 1 1 /Edgy/lib/modules/Lms.js
(function () {

 //#region meta declarations
 var Stage;
 var Buttons;
 var App;
 var Baskets;
 //#endregion

 var Lms = (function () {

  var userInteractionAccurred = false;
  function finishImplementingLmsApi() {
   if (cet.content.lms.Activity.engagement.mode == 'review') {
    App.showFeedback();
   }

   if (cet.content.lms.Activity.engagement.access == 'read') {
    App.setAsReadOnly();
   }

   Lms.setExternalButtonsVisibility();
   
   cet.content.lms.Activity.bind('check', function () { App.showFeedback(); });
   cet.content.lms.Activity.bind('reset', function () { App.restart(); });
   cet.content.lms.Activity.bind('showsolution', function () { App.showSolution(); });

  }

  return {
   init: function () {
    //#region meta declarations
    Stage = cet.Stage;
    Buttons = cet.Buttons;
    App = cet.App;
    Baskets = cet.Baskets;
    //#endregion

     cet.content.on('clientready', Lms.implementLmsApi);

   },
   implementLmsApi: function () {
    if (cet.content.lms.Settings.supported && cet.content.lms.Activity.engagement.store == 'readwrite')
     Stage.bind('change', Lms.save);
    
    if (cet.content.lms.Settings.supported) {
     if (cet.content.lms.Activity.engagement.mode != 'browse') {
      Buttons.hideCheckButton();

     }

     if (cet.content.lms.Activity.engagement.mode == 'solved') {
      App.showSolution();
      finishImplementingLmsApi();
      return;
     }

     if (cet.content.lms.Activity.engagement.store != 'disabled') {
      cet.content.State.load(function (data) {
       App.restoreState(data);
       finishImplementingLmsApi();
      });
     }
     else {
      finishImplementingLmsApi();
     }

    }
   },
   save: function () {

    if (cet.content.lms.Settings.supported) {

     if (cet.content.lms.Activity.engagement.store == 'readwrite') {
      if (!userInteractionAccurred) {
       userInteractionAccurred = true;
       cet.content.lms.Activity.start()
      }
      var state = App.getState();
      if (!state)
       return;
      cet.content.State.save(state);
      cet.content.lms.Activity.score(Lms.getScore());

     }

    }

    //});
   },
   getScore: function () {
    //debugger;
    var errors = 0;
    var total = 0;

    for (basketKey in Baskets.baskets) {
     var basket = Baskets.baskets[basketKey];
     total++;

     if (!basket.isPopulated()) {
      errors++;
     }
     else if (!basket.isValid()) {
      errors++;
     }
    }

    var corrects = total - errors;
    return parseInt(100 * (corrects / total));
   },
   isBrowseMode: function () {
    return !cet.content.lms.Settings.supported || (cet.content.lms.Activity.engagement.mode == 'browse');
   },
   setExternalButtonsVisibility: function () {
    cet.content.lms.Activity.settings.supportsCheck(true);
    cet.content.lms.Activity.settings.supportsRegenerate(false);
    cet.content.lms.Activity.settings.supportsReset(true);
    cet.content.lms.Activity.settings.supportsShowSolution(true);
   }


  };
 })();

 cet.Lms = Lms;

})();

///#source 1 1 /Edgy/lib/modules/GoogleAnalytics.js
(function () {
 
 var GoogleAnalytics = (function () {
 var _gaq = _gaq || [];
 _gaq.push(['_setAccount', 'UA-36292948-13']);
 _gaq.push(['_trackPageview']);

 (function () {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();

 })();

 cet.GoogleAnalytics = GoogleAnalytics;

})();

///#source 1 1 /Edgy/lib/modules/Resources.js
window.cet = window.cet || {};
//cet.content.clientLoaded();
(function () {

 var Resources = (function () {

  return {
   load: function (path) {
    yepnope(
       {
        load: [
         path
        ],
       });
   },
   init: function () {
    Resources.load('css/font.large.css');
   }

  }
 })();


 cet.Resources = Resources;

})();

///#source 1 1 /Edgy/lib/modules/Audio.js
window.cet = window.cet || {};

(function () {

  var Audio = (function () {
    var elements = {};
    var notLoaded = [];
    var ready = false;
    var mute = false;
    function getUrl(audioFileName) {
      if (audioFileName.indexOf('http') == -1)
        return 'sounds/' + audioFileName + '.mp3';
      return audioFileName + '.mp3'

    }

    function threadSafePlay(audioFileName, method) {
      elements[audioFileName].play({
        // allow onfinish() to fire for each "shot", instead of only last shot
        multiShotEvents: true,
        onfinish: function () {
          if (method)
            method();
        }
      });
      return true;
    }
    return {
      init: function () {
        var Stage = cet.Stage;
        soundManager.setup({
          // required: path to directory containing SM2 SWF files
          url: 'lib/soundmanager2/swf/',
          preferFlash: false
        });

        soundManager.onready(function () {

          ready = true;
          for (var i = notLoaded.length - 1; i >= 0 ; i--) {
            Audio.load(notLoaded[i]);
            notLoaded.pop();
          }
          Stage.trigger('audioReady')

        });

      },
      load: function (audioFileName) {

        if (!audioFileName) {
          //debugger;
        }
        if (!ready) {
          notLoaded.push(audioFileName);
          return;
        }

        var url = getUrl(audioFileName)
        thisSound = soundManager.createSound({
          id: audioFileName,
          url: url,
          //onplay: self.events.play,
          //onstop: self.events.stop,
          //onpause: self.events.pause,
          //onresume: self.events.resume,
          //onfinish: self.events.finish,
          //type: (o.type || null)
        });
        if (!thisSound) {
          //debugger;
        }
        elements[audioFileName] = thisSound;

      },
      play: function (audioFileName, method) {
        if (!mute) {

          try {
            var self = this;
            if (!elements[audioFileName])
              this.load(audioFileName);
            return threadSafePlay(audioFileName, method);
          }
          catch (err) {
            if (method) {
              method();
            }
            return false;
          }

        }
        else {
          if (method) {
            method();
          }
          return true;
        }
      },
      isReady: function () {
        return ready;
      },
      stop: function (audioFileName) {
        elements[audioFileName].stop();
      },
      stopAll: function () {
        soundManager.stopAll();
      },
      mute: function () {
        mute = true;
        soundManager.mute();
      },
      unmute: function () {
        mute = false;
        soundManager.unmute();
      }
    }
  })();
	cet.Audio = Audio;

})();

///#source 1 1 /Edgy/lib/modules/Preloader.js

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


 cet.Preloader = Preloader;

})();

///#source 1 1 /Edgy/lib/modules/App.js
window.cet = window.cet || {};
cet.content.clientLoaded();
(function () {

 var App = (function () {
  var version = '1.0.2';
  var composition;

  var hidedElements;
  var initiated = false;
  cet.Preloader.show();
  if (typeof AdobeEdge != 'undefined') {
   AdobeEdge.bootstrapCallback(function (compId) {
    AdobeEdge.Symbol.bindElementAction(compId, 'stage', "document", "compositionReady", function (sym, e) {
     if (!initiated) {
      initiated = true;

      App.init(compId);
      init();
      cet.Preloader.waitOneSecAndHide();


     }
    });
   });
   setTimeout(function () { App.recoverEdgeDelay(); }, 5000);
  }
  

  
  function init() {
    if (!cet.Content.isReady()) {
      cet.Stage.bind('contentReady', init);
      return;
    }
    setTimeout(function () { App.playWelcomeSound(); }, 1500);
   initIntructionButtonSound();
  }
  function initIntructionButtonSound() {
   var instructionsButton = $('.button-instructions');
   if (instructionsButton.length > 0)
   {
    instructionsButtonSymbol = cet.Stage.getSymbol(instructionsButton);
    instructionsButton.hover(function () { instructionsButtonSymbol.stop('hover'); }, function () { instructionsButtonSymbol.stop('normal'); });
    instructionsButton.on('mousedown', function () {
     instructionsButtonSymbol.stop('down');
     var path = cet.Content.getInstructionsSound();
     if (path) {
      if (cet.Audio.isReady())
       cet.Audio.play(path);
      else
       cet.Stage.bind('audioReady', function () {
        cet.Audio.play(path);
       })

     }
    });
    instructionsButton.on('mouseup', function () {
     instructionsButtonSymbol.stop('hover');
    })
   }
  }
  return {
   recoverEdgeDelay: function () {
    if (initiated)
     return;
    if(window.location.href.indexOf('recoveryAtempt') != -1)
    {
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
   restoreState: function (state) {

   },
   getState: function () {

   },
   setAsReadOnly: function () {

   },
   restart: function () {


   },
   showSolution: function () {



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
    if ($('meta[name=viewport]').length != 0)
     return;
    var viewPortTag = document.createElement('meta');
    viewPortTag.id = "viewport";
    viewPortTag.name = "viewport";
    viewPortTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.getElementsByTagName('head')[0].appendChild(viewPortTag);
   },
   playWelcomeSound: function () {
    var path = cet.Content.getWelcomeSound();
    if (path) {
     if (cet.Audio.isReady())
      cet.Audio.play(path);
     else
      cet.Stage.bind('audioReady', function () {
       cet.Audio.play(path);
      })

    }
   },
   getVersion: function () {
    return version;
   }

  }
 })();


 cet.App = App;

})();

///#source 1 1 /Edgy/lib/modules/button.js
window.cet = window.cet || {};

(function () {

	var Button = (function myfunction() {

		return {
			init: function () {
				var jqElement = $('.edge-btn, .edgy-button');

				if (Modernizr.touch)
				{
					//alert('Modernizr.touch ' + Modernizr.touch);
					jqElement.on('touchstart', function () {
						if (!$(this).hasClass('disabled'))
							cet.Stage.getSymbol($(this)).stop('down');
						return false;
					})
					jqElement.on('touchend', function () {
						if (!$(this).hasClass('disabled')) {
							cet.Stage.getSymbol($(this)).stop('normal');
							$(this).trigger('click');
						}
						return false;
					})

				}
				else {
					jqElement.on('mousedown', function () {
						if (!$(this).hasClass('disabled'))
							cet.Stage.getSymbol($(this)).stop('down');
					})
					jqElement.on('mouseup', function () {
						if (!$(this).hasClass('disabled'))
							cet.Stage.getSymbol($(this)).stop('hover');
					})
					jqElement.hover(function () {
						if (!$(this).hasClass('disabled'))
							cet.Stage.getSymbol($(this)).stop('hover');
					}, function () {
						if (!$(this).hasClass('disabled'))
							cet.Stage.getSymbol($(this)).stop('normal');
					})
				}

			},
			disable: function (jqElement) {
				jqElement.addClass('disabled');

				jqElement.css({
					'cursor':'default'
				});

				cet.Stage.getSymbol(jqElement).stop('disable');
			},
			enable: function (jqElement) {
				jqElement.removeClass('disabled');

				jqElement.css({
					'cursor': 'pointer'
				});

				cet.Stage.getSymbol(jqElement).stop('normal');
			},
			disableAll: function () {

			 var $allButtons = $('.edge-btn, .edgy-button');

				for (var i = 0; i < $allButtons.length; i++) {
					cet.Button.disable($($allButtons[i]));
				}

			}
		}

	})();


	cet.Button = Button;

})();
///#source 1 1 /Edgy/lib/modules/Utils.js

window.cet = window.cet || {};

(function () {

 var Utils = (function () {


  return {

   isAndroid: function () {
    return navigator.userAgent.toLowerCase().indexOf('android') != -1;

   },
   isIE9: function () {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) && (parseInt(myNav.split('msie')[1]) == 9);
   },
   isIE: function () {
    var myNav = navigator.userAgent.toLowerCase();
    return myNav.indexOf('msie') != -1 || myNav.indexOf('trident') != -1;
   },
   rgb2hex: function (rgb) {
     if (!rgb)
       return '#ffffff';
     if (rgb.indexOf('#') != -1)
       return rgb;
     if (rgb.indexOf('rgb') == -1)
       return '#ffffff';
     rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
     function hex(x) {
       return ("0" + parseInt(x).toString(16)).slice(-2);
     }
     return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
   }

  }
 })();


 cet.Utils = Utils;

})();

///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/dropPosition.js

(function () {

  var option;
  var Baskets;
  var Content;
  var Stage;
  var Utils;
  var Proportions;

  var dropPosition = function (position) {
    option = cet.option;
    Baskets = cet.Baskets;
    Content = cet.Content;
    Stage = cet.Stage;
    Utils = cet.Utils;
    Proportions = cet.Proportions;

    this.position = position;

    //var jqElement = $('<div style="position:absolute;"></div>')
    //jqElement.css({ width: Proportions.getBasketWidth() + '%', height: '0.2%', top: position.top, left: position.left, 'background-color': '#606569', 'z-index': 30 })
    //$('#Stage').append(jqElement)
    //this.jqElement = $(elem);
    //this.symbol = Stage.getSymbol(this.jqElement);


  }


  dropPosition.prototype.getOption = function () {
    return this.option;
    //var self = this;
    //var dropPositionId = optionJqElement.parents('.drop-position').attr('id');
    //var symbolTypeName = Stage.getSymbol('#' + dropPositionId).getSymbolTypeName();
    //return self.dropPositions[symbolTypeName].option;
  }
  dropPosition.prototype.unpopulate = function (completeMethod) {
    var self = this;
    if (self.isPopulated()) {
      Storage.addOption(self.option);
      self.removeOption();
    }

    if (completeMethod)
      completeMethod();
  }
  dropPosition.prototype.isPopulated = function () {
    //return this.jqElement.find('.option1, .option2, .option3, .option4, .option5, .option6, .option7, .option8').length > 0;
    return this.option != null;
  }
  dropPosition.prototype.addOption = function (option, fromResize) {
    var self = this;
    self.option = option;
    //self.removeFeedback();

    option.position(this.position, fromResize)

  }
  dropPosition.prototype.removeOption = function (option) {

    this.option = null;

  }
  dropPosition.prototype.setZindex = function (val) {
    this.jqElement.css('z-index', val);
  }
  dropPosition.prototype.getId = function () {
    return this.jqElement.attr('class').split(' ')[2];
  }
  dropPosition.prototype.width = function () {
    return this.jqElement.width();
  }
  dropPosition.prototype.height = function () {
    return this.jqElement.height();
  }
  dropPosition.prototype.top = function () {
    return this.jqElement[0].style.top;

  }
  dropPosition.prototype.left = function () {
    return this.jqElement[0].style.left;
  }
  dropPosition.prototype.leftAsNumber = function () {
    return parseFloat(this.left().replace('%', ''));
  }
  dropPosition.prototype.contains = function (option) {
    return (this.option && this.option.getId() == option.getId());
  }
  dropPosition.prototype.containsValidOption = function () {
    return (this.option && this.option.isValid());
  }




  cet.dropPosition = dropPosition;

})();
///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/startDialog.js

//#region meta declarations
var Stage;
var Buttons;
var App;
var Baskets;
var Stage;
//#endregion

var StartDialog = (function () {

  var jqElement;
  return {
    init: function () {
      Stage = cet.Stage;

      jqElement = $('.start-dialog');
      jqElement.css('z-index', 111111);


      Stage.on('enterPress', function () {

        if (StartDialog.isVisible()) {
          StartDialog.hide();
          Stage.trigger('startClick');
        }
      })
      $('.button-start').on('mousedown touchstart', function () {
        StartDialog.hide();
        Stage.trigger('startClick');
      })

    },
    hide: function () {
      jqElement.hide();
    },
    isVisible: function () {
      return jqElement.is(':visible');

    },
    show: function () {
      jqElement.show();
    }
  }
})();

cet.StartDialog = StartDialog;


///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/basket.js
window.cet = window.cet || {};

(function () {

  var option;
  var Baskets;
  var Content;
  var Stage;
  var Utils;
  var dropPosition;
  var Proportions;

  var basket = function (id, pos) {

    //#region meta declarations

    option = cet.option;
    Baskets = cet.Baskets;
    Content = cet.Content;
    Stage = cet.Stage;
    Utils = cet.Utils;
    dropPosition = cet.dropPosition;
    Proportions = cet.Proportions;

    //#endregion

    var self = this;
    self.symbol = Stage.createSymbol('basket', 'Stage');

    self.id = id;

    self.jqElement = $(self.symbol.getSymbolElementNode());
    self.background = self.jqElement.find('.basket-background');
    self.titleBackground = self.jqElement.find('.basket-title-background');
    self.titleText = self.jqElement.find('.text');



    $.extend(pos, { position: 'absolute', width: Proportions.getBasketWidth() + 'px', height: Proportions.getBasketHeight() + 'px', bottom: '74px' })
    self.jqElement.css(pos);
    self.initDropPositions();
    //self.jqElement.find('.basket-title-background').css('height', Proportions.getBasketTitleHeight() + '%')
    self.titleBackground.css('z-index', 10);

    var titleHeight = ((30 * 21 / self.heightAsNumber())) + '%';
    self.titleBackground.css('height', titleHeight);

    //var titleTextTop = (((0.0605 * 0.21) / self.heightAsNumber()) * 100) + '%';
    var titleTextTop = '7px';

    self.titleText.css('top', titleTextTop);
    self.titleText.css('z-index', 10);
    self.jqElement.css('z-index', 10);
    self.background.css('z-index', 0);

    self.backgroundColor = self.jqElement.find('div:first-child').css('background-color');
    self.titleBackgroundColor = self.titleBackground.css('background-color')

    self.jqElement.find('.text').html(decodeURIComponent(Content.getBasketName(id)));

  }

  basket.prototype.initDropPositions = function () {
    var self = this;
    self.dropPositions = [];
    var numberOfDropPositions = Content.getNumberOfOptionsInBasket();
    //var marginTop = Proportions.getOptionMarginTop();
    var marginTop = 0;

    var marginLeft = ((Proportions.getBasketWidth() - Proportions.getOptionWidth()) / 2);//3.99;
    //   var dropPositionHeight = Proportions.getOptionHeight();
    var basketTitleHeight = 37;
    var dropPositionHeight = 26;

    var dropPositionLeft = self.leftAsNumber() + marginLeft;
    for (var i = 0; i < numberOfDropPositions; i++) {
      var newTop = self.top() +
basketTitleHeight +
//cellHeightPrecents
+(marginTop + dropPositionHeight) * i;
      var newBottom = parseInt(self.jqElement.css('bottom').replace('px', '')) + 4 + (dropPositionHeight) * (numberOfDropPositions - 1 - i);
      var newPosition = { left: dropPositionLeft + '%', top: newTop + 'px', bottom: newBottom + 'px' };
      self.dropPositions.push(new dropPosition(newPosition));
    }

  }
  basket.prototype.getNextDropPosition = function () {
    var self = this;
    //var idTemplate = this.jqElement.attr('id');
    for (var i = 0; i < self.dropPositions.length; i++) {
      var dropPosition = self.dropPositions[i];
      if (!dropPosition)
        return null;
      if (!dropPosition.isPopulated())
        return dropPosition;
    }
  }
  //basket.prototype.getOption = function (optionJqElement) {
  // return this.option;
  // //var self = this;
  // //var dropPositionId = optionJqElement.parents('.drop-position').attr('id');
  // //var symbolTypeName = Stage.getSymbol('#' + dropPositionId).getSymbolTypeName();
  // //return self.dropPositions[symbolTypeName].option;
  //}
  basket.prototype.getOptions = function () {
    var self = this;
    var options = [];
    for (var i = 0; i < self.dropPositions.length; i++) {
      if (self.dropPositions[i].isPopulated())
        options[i] = self.dropPositions[i].getOption().getId();
    }
    return options;

  },
  basket.prototype.getOptionsObjects = function () {
    var self = this;
    var options = [];
    for (var i = 0; i < self.dropPositions.length; i++) {
      if (self.dropPositions[i].isPopulated())
        options[i] = self.dropPositions[i].getOption();
    }
    return options;

  }
  basket.prototype.unpopulate = function (completeMethod) {

    if (this.isPopulated()) {
      this.removeFeedback();
      for (var i = this.dropPositions.length - 1; i >= 0 ; i--) {
        this.dropPositions[i].unpopulate()
      }
    }

    if (completeMethod)
      completeMethod();
  }
  basket.prototype.isPopulated = function () {
    //return this.jqElement.find('.option1, .option2, .option3, .option4, .option5, .option6, .option7, .option8').length > 0;
    return this.dropPositions != null && this.dropPositions.length > 0;
  }
  basket.prototype.addOption = function (option, fromResize) {
    var self = this;
    if (!fromResize) {
      fromResize = false;
    }
    self.getNextDropPosition().addOption(option, fromResize);
    option.showAsInBasket(self.getId());

  }
  basket.prototype.setZindex = function (val) {
    this.jqElement.css('z-index', val);
  }
  basket.prototype.getId = function () {
    return this.id;
  }
  basket.prototype.showFeedback = function () {
    var self = this;
    for (var i = 0; i < self.dropPositions.length; i++) {
      if (self.dropPositions[i].isPopulated()) {
        self.dropPositions[i].getOption().showFeedback();

      }
    }

  }
  basket.prototype.removeFeedback = function () {
    this.jqElement.find('.feedback-correct, .feedback-error').hide();
  }
  basket.prototype.feedbackExists = function () {
    return this.jqElement.find('.feedback-correct, .feedback-error').is(':visible');
  }
  basket.prototype.width = function () {
    return this.jqElement.width();
  }
  basket.prototype.height = function () {
    return this.jqElement[0].style.height;
  }
  basket.prototype.heightAsNumber = function () {
    return parseFloat(this.height().replace('%', ''));
  }
  basket.prototype.top = function () {
    var stageHeight = parseInt($('#Stage').css('height').replace('px', ''), 10);

    return stageHeight - 218;


  }
  basket.prototype.topAsNumber = function () {
    return parseFloat(this.top().replace('%', ''));
  }
  basket.prototype.left = function () {
    return this.jqElement[0].style.left;
  }
  basket.prototype.leftAsNumber = function () {
    return parseFloat(this.left().replace('%', ''));
  }

  basket.prototype.showHover = function () {
    if (this.isPopulated())
      return;
    if (this.symbol.getPosition() == this.hoverLabelPosition)
      return;
    this.symbol.stop('hover');
  }
  basket.prototype.hideHover = function () {
    if (this.isPopulated())
      return;
    if (this.symbol.getPosition() == this.normalLabelPosition)
      return;
    this.symbol.stop('normal');
  }
  basket.prototype.contains = function (option) {
    return (this.option && this.option.getId() == option.getId());
  }
  basket.prototype.isFull = function () {
    return this.getNextDropPosition() == null;
  }
  basket.prototype.showFullFeedback = function () {
    var self = this;
    var titleColor = '#ad2c31'
    var backgroundColor = '#6f1d21';

    self.background.css('background-color', backgroundColor);
    self.titleBackground.css('background-color', titleColor);

    //this.symbol.stop('error')
    //this.
  }
  basket.prototype.showErrorFeedback = function () {

    var self = this;
    var titleColor = '#ad2c31'
    var backgroundColor1 = '#ffb2b2';
    self.jqElement.find('div:first-child').animate({ backgroundColor: backgroundColor1 }, 300);
    self.titleBackground.animate({ backgroundColor: titleColor }, 300);
  }
  basket.prototype.showCorrectFeedback = function () {
    var self = this;
    var titleColor = '#98ae28'
    var backgroundColor1 = '#c4ffb2';

    self.jqElement.find('div:first-child').animate({ backgroundColor: backgroundColor1 }, 300);
    self.titleBackground.animate({ backgroundColor: titleColor }, 300);
  }
  basket.prototype.hideFeedback = function () {
    var self = this;
    self.jqElement.find('div:first-child').animate({ backgroundColor: self.backgroundColor }, 300);
    self.titleBackground.animate({ backgroundColor: self.titleBackgroundColor }, 300);
  }
  basket.prototype.isValid = function () {
    return false;
  }
  basket.prototype.getNumberOfCorrectOptions = function () {

    var self = this;
    var count = 0;
    for (var i = 0; i < self.dropPositions.length; i++) {
      if (self.dropPositions[i].containsValidOption())
        count++;
    }
    return count;
  },
  basket.prototype.resizeAdjustmens = function (winSize) {
    var options = this.getOptionsObjects();
    this.initDropPositions();
    for (var i = 0; i < options.length; i++) {
      this.addOption(options[i], true);
    }
  }




  cet.basket = basket;

})();

///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/Baskets.js
window.cet = window.cet || {};

(function () {

  var Baskets = (function () {
    //#region meta declarations

    var App;
    var Audio;
    var option;
    var Content;
    var Stage;
    var Buttons;
    var Lms;
    var Feedback;
    var basket;
    var Proportions;

    //#endregion

    var baskets;
    var basketsArray;
    var basketTop;
    var horizontalShift;



    var count;

    function sortBasketsByLeftPosition(a, b) {
      return a.leftAsNumber() > b.leftAsNumber();
    }

    return {
      init: function () {
        //#region meta declarations

        App = cet.App;
        Audio = cet.Audio;
        option = cet.option;
        Content = cet.Content;
        Stage = cet.Stage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        basket = cet.basket;
        Proportions = cet.Proportions;

        //#endregion
        // clean baskets from Dom
        this.cleanFromDom();

        baskets = {};
        basketsArray = [];
        var basketIds = Content.getBasketIds();
        Baskets.count(basketIds.length);

        var basketMarginLeft = Proportions.getBasketMarginLeft();
        var basketsLeft = Proportions.getBasketsLeft();
        var basketsTop = Proportions.getBasketsTop();
        var basketWidth = Proportions.getBasketWidth();

        for (var i = 0; i < basketIds.length; i++) {
          var currLeft = basketsLeft + (i * (basketWidth + basketMarginLeft));
          var newBasket = new basket(basketIds[i], { left: currLeft + '%' });
          baskets[newBasket.getId()] = newBasket;
          basketsArray.push(newBasket);
        }
        $("#Stage_basket").css('display', 'none');

        basketsArray.sort(sortBasketsByLeftPosition)
        this.setBasketsBackground();

      },
      setBasketsBackground: function () {

        var style = {
          position: 'absolute',
          width: '100%',
          height: (Proportions.getBasketHeight() - Proportions.getBasketTitleHeight() + 1) + '%',
          backgroundColor: '#363437',
          left: 0,
          top: (Proportions.getBasketsTop() + Proportions.getBasketTitleHeight()) + '%',
          display: 'none'
        }
        var background = $('<div id="baskets-background" ></div>').css(style);

        $('#Stage').append(background);

      },
      getBasketByJqElement: function (elem) {
        if (!elem.hasClass('basket'))
          elem = elem.parents('.basket');
        if (elem.length == 0)
          return null;
        var basketId = elem.attr('class').split(' ')[2];
        return baskets[basketId];
      },
      showFeedback: function () {
        for (var key in baskets) {
          baskets[key].showFeedback();
        }
      },
      isPerfectSolution: function () {

        for (var key in baskets) {
          if (!baskets[key].isValid()) {
            return false;
          }
        }
        return true;

      },
      unpopulate: function () {

        for (var key in baskets) {
          if (baskets[key].isPopulated()) {
            baskets[key].unpopulate();
          }
          else
            baskets[key].removeFeedback();
        }


      },
      getPopulation: function () {
        var population = {}
        for (var key in baskets) {

          var options = baskets[key].getOptions();

          if (options)
            population[key] = options;

        }

        return population;

      },
      getBasketByOption: function (option) {
        var self = this;
        option = option.jqElement ? option.jqElement : option;

        return Baskets.getBasketByJqElement(option.parents('.basket'));

      },
      setAllzIndexesToZero: function () {

        for (var key in baskets) {
          var basket = baskets[key];
          basket.setZindex(0);

        }

      },
      getBasketById: function (id) {
        return baskets[id]
      },
      count: function (countParam) {
        if (countParam)
          count = countParam;
        if (!count)
          count = $('.basket').length;
        return count;

      },
      getBasketTop: function (winSize) {
        if (!winSize) {
          winSize = $(window).height();
        }
        //      var stageHeight = parseInt($('#Stage').css('height').replace('px', ''), 10);
        return winSize - 218;
      },
      getRandomBasket: function () {

        for (var key in baskets) {
          return baskets[key];
        }

      },
      getHorizontalShift: function () {
        //if (horizontalShift)
        //  return horizontalShift;

        horizontalShift = 11111111111111;
        for (var i = 1; i < basketsArray.length; i++) {
          var tmpShift = basketsArray[i].leftAsNumber() - basketsArray[0].leftAsNumber();
          if (tmpShift < horizontalShift)
            horizontalShift = tmpShift;
        }
        return horizontalShift;
      },
      getBaskets: function () {
        return baskets;
      },
      getSelectedBasket: function (droppedOption) {
        try {
          for (var i = 0; i < basketsArray.length - 1; i++) {
            var optionLeft = Math.ceil(droppedOption.leftAsNumber());
            var currentBasketLeft = Math.floor(basketsArray[i].leftAsNumber())
            var nextBasketLeft = Math.floor(basketsArray[i + 1].leftAsNumber())

            if (optionLeft >= currentBasketLeft && optionLeft < nextBasketLeft) {
              return basketsArray[i];
            }
          }
          return basketsArray[basketsArray.length - 1];
        }
        catch (e) {
          //debugger;

        }

      },
      getNumberOfCorrectOptions: function () {
        var corrects = 0;
        for (basketKey in baskets) {
          corrects += baskets[basketKey].getNumberOfCorrectOptions();
        }
        return corrects;
      },
      resizeAdjustment: function () {
        for (basketKey in baskets) {
          baskets[basketKey].resizeAdjustmens();
        }
      },
      cleanFromDom: function () {
        var baskets = Baskets.getBaskets();
        for (key in baskets) {
          baskets[key].jqElement.remove();
        }
        $('#baskets-background').remove();
      }
    }

  })();

  cet.Baskets = Baskets;

})();
///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/Option.js
(function () {


  var Audio;
  var Baskets;
  var Stage;
  var App;
  var Content;
  var Proportions;

  var option = function (optionData) {

    Audio = cet.Audio;
    Baskets = cet.Baskets;
    Stage = cet.Stage;
    App = cet.App;
    Content = cet.Content;
    Buttons = cet.Buttons;
    Proportions = cet.Proportions;

    var self = this;
    self.symbol = Stage.createSymbol('option', 'Stage');
    self.id = optionData.id;

    self.jqElement = $(self.symbol.getSymbolElementNode());
    self.jqElement.addClass(optionData.id);


    self.feedbackError = self.jqElement.find('.feedback-error');
    self.feedbackCorrect = self.jqElement.find('.feedback-correct');

    self.feedbackConstX = (self.feedbackWidthAsNumber() * self.widthAsNumber()) / 100;
    self.feedbackConstY = (self.feedbackHeightAsNumber() * self.heightAsNumber()) / 100;






    self.jqElement.find('.text').html(decodeURIComponent(optionData.text));

    self.baskets = optionData.baskets;

    self.jqElement.css({ position: 'absolute', top: '-50px', width: Proportions.getOptionWidth() + '%' });
    self.jqElement.addClass('option')
    self.originalColor = self.jqElement.find('.option-background').css('background-color');
    self.setInteractionVisualEffects();


    self.startTop = 30;
    self.droppingDuration = Content.getDroppingDuration();
    self.endTop = Baskets.getBasketTop();// - Proportions.getOptionHeight();
    self.currentTop = self.startTop;

    self.velocity = (self.endTop - self.startTop) / self.droppingDuration;

  }

  option.prototype.setInteractionVisualEffects = function () {
    var self = this;
    self.jqElement.hover(function () {
      self.showLabel('hover');
    }, function () {
      var label = self.isInBasket() ? 'in_target' : 'normal';
      self.showLabel(label);
    })

    self.jqElement.on('mousedown', function () {
      self.showLabel('drag');
    });

    self.jqElement.on('mouseup', function () {
      self.showLabel('hover');
    });

  }
  option.prototype.showAsInBasket = function (basketId) {
    var self = this;

    this.jqElement.addClass('dropped');
    this.hostBasketId = basketId;

    this.jqElement.find('.option-background').css({ 'background-color': 'transparent', 'z-index': 20, 'background-image': 'none', '-webkit-box-shadow': 'none', 'box-shadow': 'none', 'height': '100%' });
    this.jqElement.find('.text').css({ 'color': '#313131', 'top': '0', 'height': '100%', 'padding-top': '0', 'z-index': 20, 'line-height': '23px', 'font-size': '18px' });
    this.jqElement.css({ 'z-index': 20, 'height': '25px', 'padding-top': '0' });

    this.setFeedbacksProportions();
  }
  option.prototype.showAsLeadingOption = function (basketId) {

    var self = this;
    //this.jqElement.find('.option-background').css({ 'background-color': '#6F6F6F' });
    //this.jqElement.find('.text').css({'color':'#6F6F6F','font-size':'17px !important'});
  }
  option.prototype.setFeedbacksProportions = function () {
    var self = this;
    self.feedbackCorrect.css({ left: '', right: 0, width: (((self.feedbackConstX / self.widthAsNumber()) * 100) + '%'), height: (((self.feedbackConstY / self.heightAsNumber()) * 100) + '%') });
    self.feedbackError.css({ left: '', right: 0, width: (((self.feedbackConstX / self.widthAsNumber()) * 100) + '%'), height: (((self.feedbackConstY / self.heightAsNumber()) * 100) + '%') });


  }

  option.prototype.showAsInStorage = function (basketId) {

    this.jqElement.removeClass('dropped');
    this.hostBasketId = null;
    this.hideFeedback();

    this.jqElement.find('.option-background').css({ 'background-color': this.originalColor, 'z-index': 'auto' });
    this.jqElement.css({ 'z-index': 'auto', 'height': Proportions.getBasketTitleHeight() + '%', 'top': '-15%' });
    this.jqElement.find('.text').css('z-index', 'auto');

  }
  option.prototype.startDropping = function () {
    var self = this;
    cet.droppingOption = this;
    self.endTop = Baskets.getBasketTop()
    self.jqElement.css({ "top": "90px", "left": Proportions.getOptionStartingLeft() + "%", 'width': '25%', 'height': '35px' });
    var background = self.jqElement.find('.option-background');
    background.css({ 'left': 'initial', 'position': 'relative', 'margin': 'auto', 'background-image': 'linear-gradient(#fff 0%, #9E9E9E 100%)' });

    var text = self.jqElement.find('.text');
    text.css({ 'margin-left': '-74px', 'left': '50%', 'top': '-3px', 'color': '#222222', 'padding-top': '4px', 'line-height': '30px', 'font-size': '20px' });
    self.jqElement.animate({ "top": self.endTop + 'px' }, {
      queue: false, duration: self.droppingDuration, easing: 'linear', complete: function () {

        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });


  }
  option.prototype.resumeDropping = function () {
    var self = this;
    cet.droppingOption = this;
    self.lastEndTop = self.endTop;
    self.endTop = Baskets.getBasketTop();
    self.jqElement.css({ "top": self.calcNewTop(self) + "px" });

    self.jqElement.animate({ "top": self.endTop + 'px' }, {
      queue: false, duration: self.calcResumeDuration(self), easing: 'linear', complete: function () {

        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });


  },
  option.prototype.calcNewTop = function (self) {
    var oldTop = parseInt(self.jqElement.css('top').replace('px', ''));
    return (oldTop / self.lastEndTop) * self.endTop;
  },
  option.prototype.calcResumeDuration = function (self) {
    var top = parseInt(self.jqElement.css('top').replace('px', ''));
    return self.droppingDuration * (1 - top / (self.endTop - self.startTop))
  },
  option.prototype.dropFaster = function () {

    var self = this;
    self.stopDropping();
    var distance = (self.endTop - self.currentTop);
    var time = distance / (self.velocity * 16);
    this.jqElement.animate({ "top": self.endTop + 'px' }, {
      queue: false, duration: time, easing: 'linear', complete: function () {
        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });

  }
  option.prototype.dropSlower = function () {

    var self = this;
    self.stopDropping();
    var distance = (self.endTop - self.currentTop);
    var time = distance / (self.velocity);
    this.jqElement.animate({ "top": self.endTop + 'px' }, {
      queue: false, duration: time, easing: 'linear', complete: function () {

        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });

  }
  option.prototype.finishDropAnimation = function () {
    this.jqElement.stop(true, true);
  }
  option.prototype.showLabel = function (label) {

    this.symbol.stop(label);
  }
  option.prototype.isInBasket = function () {
    return this.jqElement.parents('.basket').length > 0;
  }
  option.prototype.notifyEverybodyWithTheChange = function () {

    setTimeout(function () { Stage.trigger('change', this); }, 500);
  }
  option.prototype.reloadData = function (optionData) {
    this.jqElement.removeClass(this.id);
    this.id = optionData.id;
    this.jqElement.addClass(optionData.id);
    this.baskets = optionData.baskets;
    this.jqElement.find('.text').html(decodeURIComponent(optionData.text));
    this.jqElement.find('.img').css('background-image', 'url(' + optionData.image + ')');
    this.baskets = optionData.baskets;
  }
  option.prototype.disable = function () {
    this.draggie.disable();
  }
  option.prototype.enable = function () {
    this.draggie.enable();
  }
  option.prototype.setPosition = function (position) {
    this.jqElement.css(position);
  }
  option.prototype.isDraggedToValidBasket = function (ui) {
    return this.jqElement.hasClass('dropped');

  }
  option.prototype.getId = function () {
    return this.id;
  }
  option.prototype.remove = function () {
    this.jqElement.remove();
    //this.symbol.deleteSymbol();
  }
  option.prototype.animate = function (pos, duration, completeMethod) {

    var self = this;
    var currentPos = self.getDistanceFromStage();
    Stage.jqElement.append(self.jqElement);
    self.setPosition(currentPos);

    self.disableHorizontalAnimationInStorage();


    self.jqElement.animate(pos, duration, null, completeMethod);
  }
  option.prototype.getCloneObj = function () {
    //if (this.cloneObj)
    //  return this.cloneObj;
    return Storage.getOptionBySymbolTypeName(this.getSymbolTypeName());
  }
  option.prototype.getDistanceFromStage = function () {
    var self = this;
    var pos = { top: 0, left: 0 };
    var elem = self.jqElement;
    while (elem.attr('id') != 'Stage') {
      pos.left += parseInt(elem.css('left').replace('px', ''));
      pos.top += parseInt(elem.css('top').replace('px', ''));
      elem = elem.parent();
    }
    return pos;
  }
  option.prototype.position = function (newPosition, fromResize) {
    if (newPosition) {
      if (fromResize) {
        this.jqElement.css({ 'left': newPosition.left, 'top': newPosition.top, 'display': 'block' }).css({ 'bottom': newPosition.bottom, 'top': 'initial' });
      }
      else {
        this.jqElement.animate({ 'left': newPosition.left, 'top': newPosition.top, 'display': 'block', 'bottom': newPosition.bottom }, {
          duration: 300
          , complete: function () {
            $(this).css({ 'bottom': newPosition.bottom, 'top': 'initial' });
          }
        });
      }

    }
    return { top: this.top(), left: this.left() };
  }
  option.prototype.hide = function () {
    return this.jqElement.hide();
  }
  option.prototype.show = function () {
    return this.jqElement.show();
  }
  option.prototype.fadeTo = function (val) {
    this.jqElement.fadeTo(0, val);
  }
  option.prototype.shiftLeft = function () {
    var self = this;
    var newLeft = (this.leftAsNumber() - Baskets.getHorizontalShift()) + '%';
    self.moving = true;
    self.jqElement.animate({ "left": newLeft }, 50, "linear", function () {
      self.moving = false;
    });
  }
  option.prototype.shiftRight = function () {
    var self = this;
    var newLeft = (this.leftAsNumber() + Baskets.getHorizontalShift()) + '%';
    self.moving = true;
    this.jqElement.animate({ "left": newLeft }, 50, "linear", function () {
      self.moving = false;
    });
  }
  option.prototype.canMoveLeft = function () {
    return !this.moving && ((this.leftAsNumber() - Baskets.getHorizontalShift()) > 0);
  }
  option.prototype.canMoveRight = function () {
    return !this.moving && ((this.leftAsNumber() + Baskets.getHorizontalShift() + this.widthAsNumber()) < 100);
  }
  option.prototype.left = function () {
    return this.jqElement[0].style.left;
  }
  option.prototype.leftAsNumber = function () {
    return parseFloat(this.left().replace('%', ''));
  }
  option.prototype.top = function () {
    return this.jqElement[0].style.top;
  }
  option.prototype.topAsNumber = function () {
    return parseFloat(this.top().replace('%', ''));
  }
  option.prototype.bringToFront = function () {
    Baskets.setAllzIndexesToZero();
    Storage.setZindexes(0);
    Buttons.setZindexes(0);
    this.jqElement.parents().css('z-index', 100);
    this.setZindex(100);
    this.jqElement.fadeTo(0, 0.7);
  }
  option.prototype.removeFromFront = function () {
    Storage.bringToFront();
    this.setZindex(0);
    this.jqElement.fadeTo(0, 1);
  }
  option.prototype.setZindex = function (val) {
    this.jqElement.css('z-index', val);
  }
  option.prototype.text = function () {
    return this.jqElement.find('.text').text();
  }
  option.prototype.widthAsNumber = function () {
    return parseFloat(this.jqElement[0].style.width.replace('%', ''));
  }
  option.prototype.feedbackWidthAsNumber = function () {
    return parseFloat(this.feedbackCorrect[0].style.width.replace('%', ''));
  }
  option.prototype.heightAsNumber = function () {
    return parseFloat(this.jqElement[0].style.height.replace('%', ''));
  }
  option.prototype.feedbackHeightAsNumber = function () {
    return parseFloat(this.feedbackCorrect[0].style.height.replace('%', ''));
  }
  option.prototype.height = function () {
    return this.jqElement.height();
  }
  option.prototype.stopDropping = function () {
    return this.jqElement.stop(true, false);
  }
  option.prototype.isCorrectBasket = function (basket) {

    return this.baskets.indexOf(basket.getId()) != -1;
  }
  option.prototype.getBasketId = function () {

    return this.baskets[0];
  }
  option.prototype.showFeedback = function () {

    if (this.isValid()) {
      this.feedbackError.hide()
      this.feedbackCorrect.show();
    }
    else {
      this.feedbackError.show()
      this.feedbackCorrect.hide();
    }

  }
  option.prototype.hideFeedback = function () {

    this.feedbackError.hide()
    this.feedbackCorrect.hide();

  }
  option.prototype.isValid = function () {

    return this.baskets[0] == this.hostBasketId;
  }

  option.prototype.resizeAdjustment = function (winSize) {
    self.endTop = Baskets.getBasketTop(winSize);
    self.velocity = (self.endTop - self.startTop) / self.droppingDuration;
  }
  cet.option = option;

})();
///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/Content.js
window.cet = window.cet || {};
(function () {

  var Content = (function () {
    var options = [];
    var basketIds;

    function allBasketsMatched() {
      var numberOfOptions = cet.Content.getContentJson().random.optionsInBasket * cet.Content.getContentJson().random.numberOfBaskets
      return options.length > numberOfOptions;
    }
    function hasUnmatchedBasket(option) {
      var usedBaskets = {}
      var usedBasketsCount = 0;
      for (var usedOptionKey in options) {
        var usedOption = options[usedOptionKey];
        if (!usedBaskets[usedOption.baskets[0]]) {

          usedBaskets[usedOption.baskets[0]] = 0;
          usedBasketsCount++;
        }
        usedBaskets[usedOption.baskets[0]]++;
      }
      if (usedBasketsCount == cet.Content.getContentJson().random.numberOfBaskets && !usedBaskets[option.baskets[0]])
        return false;

      if (!usedBaskets[option.baskets[0]] || (usedBaskets[option.baskets[0]] < cet.Content.getContentJson().random.optionsInBasket))
        return true;
      return false;

    }
    return {

      getOptionByIndex: function (optionIndex) {
        return options[optionIndex];
      },
      getQuestionTitle: function (optionIndex) {
        return options[optionIndex].title;
      },
      getNumberOfOptions: function () {
        return options.length;
      },

      shuffle: function () {
        if (this.getContentJson().random.options) {
          options = [];
          var tmpOptions = this.getContentJson().options.slice(0);
          var numberOfOptions = this.getContentJson().random.optionsInBasket * this.getContentJson().random.numberOfBaskets
          while (options.length < numberOfOptions) {
            var randomIndex = this.getRandomNumber(this.getContentJson().options.length)
            var candidate = tmpOptions[randomIndex];
            if (!candidate)
              continue;
            if (hasUnmatchedBasket(candidate, options)) {
              options.push(candidate);
              tmpOptions[randomIndex] = null;
            }
          }
        }
        else {
          options = this.getContentJson().options.slice(0);
        }

      },
      shuffleWithoutReload: function () {
        var numberOfOptions = options.length
        var tmpOptions = options;
        options = [];
        while (options.length < numberOfOptions) {
          var randomIndex = this.getRandomNumber(numberOfOptions)
          var candidate = tmpOptions[randomIndex];
          if (!candidate)
            continue;
          options.push(candidate);
          tmpOptions[randomIndex] = null;

        }



      },
      loadSpecificOptions: function (specificOptions) {
        options = [];
        var allOptions = this.getContentJson().options.slice(0);
        if (this.getNumberOfOptions() != specificOptions.length)
          throw 'Content trying to load illegal number of options';
        for (var specificOptionKey in specificOptions) {
          var specificOption = specificOptions[specificOptionKey];
          for (var j = 0; j < allOptions.length; j++) {
            var generalOption = allOptions[j]
            if (specificOption.option == generalOption.id)
              options.push(generalOption);
          }
        }
        basketIds = null;
      },


      getOptions: function () {
        return options;
      },
      getSolution: function () {
        var solution = [];
        var basketFound = false;

        for (var i = 0; i < options.length; i++) {
          var option = options[i];
          solution.push({
            "option": option.id,
            "basket": option.baskets[0]
          })
        }
        return solution;
      },
      getNumberOfOptionsInBasket: function () { return this.getContentJson().random.optionsInBasket; },
      getNumberOfBaskets: function () { return this.getContentJson().random.numberOfBaskets; },
      getBasketIds: function () {
        if (!basketIds) {
          basketIds = [];
          for (var i = 0; i < options.length; i++) {
            if (basketIds.indexOf(options[i].baskets[0]) == -1)
              basketIds.push(options[i].baskets[0])
          }
          basketIds.sort();
        }
        return basketIds;
      },
      getBasketName: function (id) {
        for (var i = 0; i < this.getContentJson().baskets.length; i++) {
          var basket = this.getContentJson().baskets[i];
          if (basket.id == id)
            return basket.name;
        }
      },
      getNumberOfOptions: function () {
        return this.getNumberOfOptionsInBasket() * this.getNumberOfBaskets();
      },
      getFontSize: function () {
        if (this.getContentJson().font)
          return this.getContentJson().font.size;
        return null;
      },
      getFontFamily: function () {
        if (this.getContentJson().font)
          return this.getContentJson().font.family;
        return null;
      },
      getFinalFeedbackSuccessText: function () {
        return this.getContentJson().feedback.successText;
      },
      getFinalFeedbackFailureText: function () {
        return this.getContentJson().feedback.failureText;
      },
      getDroppingDuration: function () {
        return this.getContentJson().droppingOptions && this.getContentJson().droppingOptions.droppingDuration ? this.getContentJson().droppingOptions.droppingDuration : 10000;
      },
      isMultipleDroppingOptions: function () {
        return this.getContentJson().droppingOptions && this.getContentJson().droppingOptions.multipleDroppingOptions;
      },
      getConcurrentOptionsNumber: function () {
        return this.getContentJson().droppingOptions && this.getContentJson().droppingOptions.concurrentOptionsNumber ? this.getContentJson().droppingOptions.concurrentOptionsNumber : 3;
      },

    };
  })();

  $.extend(cet.Content, Content);

})();
///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/Buttons.js
window.cet = window.cet || {};

(function () {

  var Buttons = (function () {
    //#region meta declarations

    var Audio;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var Storage;
    var Buttons;
    var Lms;
    var Feedback;
    var DragSync;
    var App;
    var Lifes;

    //#endregion



    var btnRestart;
    var jqElementMuteOnBtn;
    var jqElementMuteOffBtn;
    var btnLeft;
    var btnRight;
    var btnDown;

    var mute = false;


    function btnRestartClickHandler() {

      App.restart();
      Stage.trigger('change', self);


    }

    function initNavigationButtons() {
      btnLeft = $('.button-left');
      btnRight = $('.button-right');
      btnDown = $('.button-down');

      btnLeft.on('mousedown touchstart', function () { Stage.trigger('leftArrowDown') });
      btnRight.on('mousedown touchstart', function () { Stage.trigger('rightArrowDown') });
      btnDown.on('mousedown touchstart', function () { Stage.trigger('downArrowKeyDown') });
      btnDown.on('mouseup touchend', function () { Stage.trigger('downArrowKeyUp') });
    }

    function initNavigationTouchEvents() {
      if (!Modernizr.touch)
        return;

      var swiped = false;
      $("body").swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingers) {
          if (distance < 10)
            swiped = false;
          if (!swiped && distance >= 10) {
            swiped = true;
            if (direction == 'right')
              Stage.trigger('rightArrowDown');
            else if (direction == 'left')
              Stage.trigger('leftArrowDown')
            else if (direction == 'down') {
              Stage.trigger('downArrowKeyDown');
            }
          }

        },
        swipe: function (event, direction, distance, duration, fingerCount) {

          if (direction == 'down') {
            Stage.trigger('downArrowKeyUp');
          }
        }
      });


    }

    function initMuteButton() {

      jqElementMuteOnBtn = $('.mute-on');
      jqElementMuteOffBtn = $('.mute-off');

      jqElementMuteOffBtn.hide();

      jqElementMuteOnBtn.on('click', buttonMuteOnClickHandler);

      jqElementMuteOffBtn.on('click', buttonMuteOffClickHandler);
    }
    function buttonMuteOffClickHandler() {


      jqElementMuteOffBtn.hide();
      jqElementMuteOnBtn.show();

      mute = false;
      Audio.unmute();


    }
    function buttonMuteOnClickHandler() {

      jqElementMuteOffBtn.show();
      jqElementMuteOnBtn.hide();

      mute = true;
      Audio.mute();



    }

    function initRestartButton() {
      btnRestart = $('.button-restart');
      btnRestart.css('z-index', 1000);
      btnRestart.on('click', btnRestartClickHandler);
    }

    return {
      init: function () {
        //#region meta declarations
        App = cet.App;
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        Lifes = cet.Lifes;

        //#endregion


        initRestartButton();

        initMuteButton()

        initNavigationButtons();

        //initNavigationTouchEvents();



        var keyCodes = { left: 37, up: 38, right: 39, down: 40, i: 73, enter: 13, b: 66, c: 67 };

        var keyUpOccurred = true;


        $(document).on("keydown", function (e) {

          var stopPropagation = false;

          if (e.ctrlKey && e.keyCode == keyCodes.i) { Stage.trigger('pauseResume') };
          if (e.ctrlKey && e.keyCode == keyCodes.b) {

            Lms.isBrowseMode(!Lms.isBrowseMode()) ? Lifes.show() : Lifes.hide();
            App.restart();
          };


          if (e.ctrlKey && e.keyCode == keyCodes.c) { App.check(); };
          if (e.keyCode == keyCodes.enter) { Stage.trigger('enterPress') };

          if (!keyUpOccurred)
            return false;
          keyUpOccurred = false;
          if (e.keyCode == keyCodes.left) { Stage.trigger('leftArrowDown'); stopPropagation = true };
          if (e.keyCode == keyCodes.right) { Stage.trigger('rightArrowDown'); stopPropagation = true };
          if (e.keyCode == keyCodes.down) { Stage.trigger('downArrowKeyDown'); stopPropagation = true };

          if (stopPropagation) {
            Buttons.stopPropagation();
            return false;
          }

        });
        $(document).on("keyup", function (e) {
          keyUpOccurred = true;
          if (e.keyCode == keyCodes.down) { Stage.trigger('downArrowKeyUp') };
        });

      },
      stopPropagation: function () {

        //IE9 & Other Browsers
        if (window.event.stopPropagation) {
          window.event.stopPropagation();
        }
          //IE8 and Lower
        else {
          window.event.cancelBubble = true;
        }
      },
      disableAll: function () {

        btnRestart.addClass('disabled');
        jqElementMuteOnBtn.addClass('disabled');
        jqElementMuteOffBtn.addClass('disabled');
        btnLeft.addClass('disabled');
        btnRight.addClass('disabled');
        btnDown.addClass('disabled');

        btnRestart.off('click');
        jqElementMuteOnBtn.off('click');
        jqElementMuteOffBtn.off('click');
      },
      enableAll: function () {
        Buttons.disableAll();

        btnRestart.removeClass('disabled');
        jqElementMuteOnBtn.removeClass('disabled');
        jqElementMuteOffBtn.removeClass('disabled');
        btnLeft.removeClass('disabled');
        btnRight.removeClass('disabled');
        btnDown.removeClass('disabled');

        btnRestart.bind('click', btnRestartClickHandler);

        jqElementMuteOnBtn.on('click', buttonMuteOnClickHandler);
        jqElementMuteOffBtn.on('click', buttonMuteOffClickHandler);

      },
      mute: function (cond) {
        if (cond) {
          buttonMuteOnClickHandler();
        }
        else {
          buttonMuteOffClickHandler();
        }
      },

      setZindexes: function (val) {

        btnRestart.css('z-index', val);
      },
      hideCheckButton: function () { }

    }
  })();
  cet.Buttons = Buttons;

})();
///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/Proportions.js
window.cet = window.cet || {};

(function () {

  var Proportions = (function () {

    //#region meta declarations

    var Audio;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var Buttons;
    var Lms;
    var Feedback;
    var Lifes

    //#endregion

    var optionHeight;
    var optionMarginTop;
    var optionWidth;

    var basketWidth;
    var basketHeight;
    var basketsLeft;
    var basketMarginLeft;
    var basketsTop;
    var optionMarginLeft;
    var footerHeight;

    function calculateBasketWidth() {
      switch (Content.getNumberOfBaskets()) {
        case 2: return 29.6;
        case 3: return 22.6;
        case 4: return 22.7;
        case 5: return 18;
        case 6: return 15.1;
        default: return 33;
      };
    }

    function calculateBasketMarginLeft() {
      switch (Content.getNumberOfBaskets()) {
        case 2: return 4;
        case 3: return 7;
        case 4: return 2;
        case 5: return 1.5;
        case 6: return 1;
        default: return 33;
      };
    }

    function getFontClassName() {
      return 'font-small';
      switch (Content.getFontSize()) {
        case 'small':
          return 'font-small';
        case 'medium':
          return 'font-medium';

        case 'large':
          return 'font-large';

        default:
          return 'font-small';

      }

    }
    function calculateBasketsLeft() {
      var basketsWidth = Content.getNumberOfBaskets() * basketWidth;
      var marginsWidth = (Content.getNumberOfBaskets() - 1) * basketMarginLeft;
      switch (Content.getNumberOfBaskets()) {
        case 2: return 20.26;
        case 3: return 7.69;
      }
      return (7.69)
    }

    function calculateOptionHeight() {
      switch (Content.getNumberOfOptionsInBasket()) {
        case 2: return 23;
        case 3: return 23;
        case 4: return 23;
        case 5: return 23;
        case 6: return 23;
        default: return 23;
      };
    }
    return {
      init: function (compId) {
        //#region meta declarations
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        Storage = cet.Storage;
        Lifes = cet.Lifes;

        //#endregion

        var self = this;

        Stage.addClass(getFontClassName());
        Stage.addClass(Content.getFontFamily());

        optionHeight = 35;
        optionMarginTop = 10;

        basketMarginLeft = calculateBasketMarginLeft();
        basketWidth = calculateBasketWidth();
        basketsLeft = calculateBasketsLeft();
        basketTitleHeight = 6.2;
        basketHeight = 144;

        footerHeight = 12.7;

        basketsTop = 100 - basketHeight - footerHeight;
        optionWidth = basketWidth;// * 0.85;
        optionMarginLeft = (basketWidth - optionWidth) / 2;

      },
      getOptionMarginTop: function () {
        return optionMarginTop;
      },
      getOptionHeight: function () {
        return optionHeight;
      }, 
      getBasketWidth: function () { return basketWidth; },
      getBasketHeight: function () { return basketHeight; },
      getBasketTitleHeight: function () { return basketTitleHeight; },
      getOptionWidth: function () {
        return basketWidth;
      },
      getBasketsLeft: function () { return basketsLeft; },
      getBasketMarginLeft: function () { return basketMarginLeft; },
      getBasketsTop: function () { return basketsTop; },
      getOptionStartingLeft: function () {
        var numberOfBaskets = Content.getNumberOfBaskets();
        var index = Math.floor((Math.random() * numberOfBaskets));
        return calculateBasketsLeft() + (index * (basketWidth + basketMarginLeft)) + optionMarginLeft;
      }



    }
  })();


  cet.Proportions = Proportions;

})();
///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/DroppingOptions.js
(function () {

  function resolveDurationBetweenOptions() {
    switch (cet.Content.getConcurrentOptionsNumber()) {
      case 2:
        return cet.Content.getDroppingDuration() / 1.5;
      case 3:
        return cet.Content.getDroppingDuration() / 2.2;
      default:
        return cet.Content.getDroppingDuration() / 2.2;

    }

  }
  var DroppingOptions = (function () {

    var options = [];
    function startMultipleDropping() {
      if (!cet.Content.isMultipleDroppingOptions())
        return;
      var durationBetweenOptions = resolveDurationBetweenOptions();
      DroppingOptions.multipleDroppingOptionsInterval = setInterval(function () {
        if (!cet.Storage.hasMoreOptions()) {
          clearInterval(DroppingOptions.multipleDroppingOptionsInterval);
          DroppingOptions.multipleDroppingOptionsInterval = null;
        }
        else
          DroppingOptions.add(Storage.dropOption());
      }, durationBetweenOptions);
    }

    function stopAutomaticDropping() {
      if (!cet.Content.isMultipleDroppingOptions())
        return;
      clearInterval(DroppingOptions.multipleDroppingOptionsInterval);

    }
    return {

      add: function (option) {
        if (options.length == 0)
          option.showAsLeadingOption();
        options.push(option);

      },
      getLeadingOption: function () {
        return options.length == 0 ? null : options[0];
      },
      removeLeadingOption: function () {
        for (var i = 0; i < options.length - 1; i++) {
          options[i] = options[i + 1];
        }

        options.pop();

        if (options.length > 0)
          options[0].showAsLeadingOption();


      },
      isEmpty: function () {

        return options.length == 0;
      },
      getState: function () {
        var result = []
        for (var i = 0; i < options.length; i++) {
          result.push({ option: options[i].getId() });
        }
      },
      getAll: function () {
        return options;
      },
      removeAll: function () {
        var tmp = options;
        options = [];
        return tmp;
      },
      pause: function () {
        stopAutomaticDropping();
        for (var i = 0; i < options.length; i++) {
          options[i].stopDropping();
        }
      },
      resume: function () {
        for (var i = 0; i < options.length; i++) {
          options[i].resumeDropping();
        }
        startMultipleDropping();

      },
      startDropping: function () {

        if (!cet.Storage.hasMoreOptions())
          return;

        stopAutomaticDropping();
        var leadingOpt = Storage.dropOption();
        leadingOpt.showAsLeadingOption();
        DroppingOptions.add(leadingOpt);
        startMultipleDropping();

        //for (var i = 0; i < options.length - 1; i++) {
        // options[i].startDropping();
        //}
      },
      resizeAdjustment: function (winSize) {
        var options = this.getAll();
        for (var i = 0; i < options.length; i++) {
          options[i].resizeAdjustment(winSize);
          this.pause();
          this.resume();
        }
      }



    };
  })();

  cet.DroppingOptions = DroppingOptions;

})();

///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/App.js
window.cet = window.cet || {};

(function () {

  var App = (function () {

    //#region meta declarations

    var Audio;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var Buttons;
    var Lms;
    var Feedback;
    var Lifes
    var Proportions;
    var StartDialog;
    var Resources;
    var DroppingOptions;

    //#endregion

    var animationStopped = false;
    var pause = false;
    var disableAll = false;
    var $window;
    var $body;
    var myWidth = 0;
    (function ($, sr) {

      // debouncing function from John Hann
      // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
      var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
          var obj = this, args = arguments;
          function delayed() {
            if (!execAsap) func.apply(obj, args);
            timeout = null;
          };

          if (timeout)
            clearTimeout(timeout);
          else if (execAsap)
            func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 300);
        };
      }
      // smartresize 
      jQuery.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery, 'smartresize');



    $(window).smartresize(function () { // do it on the window resize

      resizeHandle($(window).height());

    });

    var resizeHandle = function (winSize) {
      App.resizeAdjustments(winSize);
    };
    var Preloader = (function () {
      var preloader = '<img src="data:image/gif;base64,R0lGODlhIAAgAPMAAP///wAAAMbGxoSEhLa2tpqamjY2NlZWVtjY2OTk5Ly8vB4eHgQEBAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQACgABACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQACgACACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkEAAoAAwAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkEAAoABAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAAKAAUALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAAKAAYALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQACgAHACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAAKAAgALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAAKAAkALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQACgAKACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkEAAoACwAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==">'
      var html = '<div id="cet-preloader" style="width:100%; height:100%; position: absolute; z-index:1111111; top: 0; left: 0; background-color:#323539; ">' +
                  '<div style="width:32px; height:32px; position: fixed;  top: 50%;  left: 50%;  margin-top: -16px;  margin-left: -16px;">' + preloader + '</div>' +
                 '</div>';

      return {

        show: function () {
          var preloader = $('#cet-preloader');
          if (!preloader.length) {
            $('body').append(html);
          }
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


    cet.Preloader = Preloader;



    function dropCompletedHandler(droppedOption) {

      var selectedBasket = Baskets.getSelectedBasket(droppedOption);
      cet.DroppingOptions.removeLeadingOption();

      if (selectedBasket.isFull()) {
        Storage.addOption(droppedOption);
        selectedBasket.showErrorFeedback();
        setTimeout(function () { selectedBasket.hideFeedback(); }, 300)
      }
      else {
        selectedBasket.addOption(droppedOption);
        Stage.trigger('change');
        if (cet.Storage.isEmpty() && DroppingOptions.isEmpty()) {
          return;
        }

      }

      if (DroppingOptions.isEmpty()) {
        DroppingOptions.startDropping();
      }

    }

    function dropCompletedBrowseModeHandler(droppedOption) {

      var selectedBasket = Baskets.getSelectedBasket(droppedOption);
      if (selectedBasket.isFull()) {

        Storage.addOption(droppedOption);

        Audio.play('wrong');
        selectedBasket.showErrorFeedback();
        Lifes.killOne();

      }
      else if (!droppedOption.isCorrectBasket(selectedBasket)) {
        Storage.addOption(droppedOption);
        Audio.play('wrong');
        selectedBasket.showErrorFeedback();

        Lifes.killOne();
      }
      else {
        Audio.play('correct');
        selectedBasket.showCorrectFeedback();
        selectedBasket.addOption(droppedOption);

      }

      cet.DroppingOptions.removeLeadingOption();


      Stage.trigger('change');

      setTimeout(function () { selectedBasket.hideFeedback(); }, 300)

      setTimeout(function () {
        if (!Lifes.anyLeft()) {
          Feedback.showFailure();
          App.pause();
          return;
        }

        if (cet.Storage.isEmpty() && DroppingOptions.isEmpty()) {
          Feedback.showSuccess();
          return;
        }

        if (DroppingOptions.isEmpty()) {
          DroppingOptions.startDropping();
        }
      }, 600)

    }

    function initLmsBrowseMode() {
      if (!Lms.isBrowseMode())
        Lifes.hide();
    }

    function adjustSize() {
      cet.display.getHostClientSize(function (size) {

        //AZ iPad workaround
        var jqBody = $('body');
        jqBody.css({ display: "none" });

        var jqWindow = $(window);               // take host window - may be correct size
        var jqWindowWidth = jqWindow.width();
        var jqWindowHeight = jqWindow.height();
        jqBody.css({ display: "block" });


        //        Stage.css({ display: "none" });
        var windowMaxPossibleHeight = size.height;
        // az - tablet issue - leave spare for upper and bottom player bars
        var windowHeight;
        if (Modernizr.touch)
          windowHeight = windowMaxPossibleHeight - 50;
        else
          windowHeight = Math.max(jqWindowHeight, windowMaxPossibleHeight);

        var xRatio = jqWindowWidth / Stage.width();
        //var yRatio = $window.height() / Stage.height();
        var yRatio = windowHeight / Stage.height();
        var ratio = xRatio > yRatio ? yRatio : xRatio;
        //        Stage.css({ display: "block" });
        var newWidth = Stage.width() * ratio;
        var newHeight = Stage.height() * ratio;
        var newFontSize = parseInt($body.css('font-size'), 10) * ratio;

        if (myWidth != newWidth) {
          myWidth = newWidth;
          Stage.css({ width: newWidth, height: '100%', fontSize: newFontSize });
          cet.content.UI.setHeight(newHeight);
        }
      });
    }

    function setLocalizedResources() {
      $('.final-feedback-success .feedback-text').text(Content.getFinalFeedbackSuccessText())
      $('.final-feedback-failure .feedback-text').text(Content.getFinalFeedbackFailureText())
    }

    function applyAndroidRendringFix() {
      if (!cet.Utils.isAndroid())
        return;
      setTimeout(function () {
        var ratio = 0.5;
        var newWidth = Stage.width() * ratio;
        var newHeight = Stage.height() * ratio;
        myWidth = newWidth;
        Stage.css({ width: newWidth, height: newHeight });
        adjustSize();
      }, 100);




    }

    function applyTabletsSoundsHack() {
      //helps tablets who refuse to play sound without user interaction
      Audio.play('quartersec');
    }
    var i = 0;
    function initMessaging() {
      cet.content.Messaging.subscribe('getreq', 'userDidSomeWork', function (app, msg) {

        var baskets = Baskets.getBaskets();
        var isFull = true;
        for (var k1 in baskets) {
          if (!baskets[k1].isFull()) {
            isFull = false;
            break;
          }
        }
        if (isFull) {
          return false;
        }

        var basketsPopulation = Baskets.getPopulation();
        for (var k2 in basketsPopulation) {
          if (basketsPopulation[k2].length > 0) {
            return true;
          }
        }
        return false;
      })

      cet.content.Messaging.subscribe('set', 'new.content', function (content) {
        cet.Preloader.show();
        //App.restart();
        //Stage.trigger('change', this);
        //     pause = false;
        DroppingOptions.pause();
        Feedback.hide();
        Baskets.unpopulate();
        Lifes.restart();
        //DroppingOptions.removeAll()
        if (!DroppingOptions.isEmpty()) {
          Storage.addOptions(DroppingOptions.removeAll());
        }


        cet.Content.newContent = content.value.preset;
        Content.init(content.value.preset);
        var state = App.getState();

        App.restoreState(state);
        cet.Preloader.hide();

        StartDialog.show();

        //  Lms.isBrowseMode() ? Storage.shuffleOptions() : Storage.reloadOptionsContent();
        if (content.toRestart) {
          pause = false;

          DroppingOptions.startDropping();

        }
        else {
          StartDialog.show();
        }

      })

      cet.content.Messaging.subscribe('set', 'mute', function (cond) {
        Buttons.mute(cond.value);

      });

    }

    var inited = false;



    return {
      init: function (compId) {
        //#region meta declarations
        Audio = cet.Audio;
        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        Buttons = cet.Buttons;
        Lms = cet.Lms;
        Feedback = cet.Feedback;
        Storage = cet.Storage;
        Lifes = cet.Lifes;
        Proportions = cet.Proportions;
        StartDialog = cet.StartDialog;
        Resources = cet.Resources;
        DroppingOptions = cet.DroppingOptions;

        //#endregion

        $body = $('body');
        $window = $(window);

        var self = this;
        self.addNoScaleMetaTag();
        self.composition(AdobeEdge.getComposition(compId));
        Stage.init();
        //Stage.eliminateIPadBounceEffect();


        Stage.bind('contentReady', function () {

          Audio.init();
          Proportions.init();
          Baskets.init();
          Storage.init();
          Buttons.init();
          Lms.init();
          Feedback.init();
          Lifes.init();

          initLmsBrowseMode();
          setLocalizedResources();
          adjustSize();


          cet.Button.init();
          if (inited) {
            return;
          }
          StartDialog.init();
          initMessaging();
          $('#Stage_start-dialog_disableBG').css('height', '62px');

          Stage.on('leftArrowDown', function () {
            if (!DroppingOptions.getLeadingOption() || !DroppingOptions.getLeadingOption().canMoveLeft())
              return;
            DroppingOptions.getLeadingOption().shiftLeft();
          })
          Stage.on('rightArrowDown', function () {
            if (!DroppingOptions.getLeadingOption() || !DroppingOptions.getLeadingOption().canMoveRight())
              return;
            DroppingOptions.getLeadingOption().shiftRight();
          })

          Stage.on('downArrowKeyDown', function () {
            if (DroppingOptions.getLeadingOption())
              DroppingOptions.getLeadingOption().dropFaster();
          })
          Stage.on('downArrowKeyUp', function () {

            if (DroppingOptions.getLeadingOption())
              DroppingOptions.getLeadingOption().dropSlower();
          })
          Stage.on('dropCompleted', function (droppedOption) {
            if (Lms.isBrowseMode()) {
              dropCompletedBrowseModeHandler(droppedOption);
            }
            else {
              dropCompletedHandler(droppedOption);
            }

          })

          Stage.on('pauseResume', function () {
            App.isPaused() ? App.resume() : App.pause();
          })
          Stage.on('startClick', function () {
            applyTabletsSoundsHack();
            applyAndroidRendringFix()
            DroppingOptions.startDropping();
          })
          inited = true;
        });
        Content.init();
        $(window).resize(function () { adjustSize(); });


      },
      restoreState: function (state) {
        if (!state)
          return;
        var options = state.options ? state.options : state;

        Content.loadSpecificOptions(options);

        Storage.reloadOptionsContent();

        Baskets.init();

        for (var i = 0; i < options.length; i++) {

          var restoreMe = options[i];

          if (!restoreMe.basket)
            continue;
          var basket = Baskets.getBasketById(restoreMe.basket);

          var option = Storage.getOptionById(restoreMe.option);
          Storage.removeOption(option);
          basket.addOption(option);
          if (restoreMe.feedbackExists)
            basket.showFeedback();

        }

        if (state.finalFeedback) {
          setTimeout(Feedback.showSuccess, 240);
          StartDialog.hide();
        }

      },
      getState: function () {
        var options = [];
        var storageOptions = Storage.getOptions();
        for (var key in storageOptions) {
          options.push({ option: storageOptions[key].getId() });
        }

        if (!DroppingOptions.isEmpty())
          options.concat(cet.DroppingOptions.getState());

        var baskets = Baskets.getPopulation();

        for (var key in baskets) {
          var basketOptions = baskets[key];
          for (var i = 0; i < basketOptions.length; i++) {
            options.push({
              option: basketOptions[i],
              basket: key
            });
          }
        }

        if (options.length != Content.getOptions().length)
          return null;

        var result = {
          options: options,
          finalFeedback: Feedback.isVisible()
        }
        return result;
      },
      restart: function () {
        pause = false;
        DroppingOptions.pause();
        Feedback.hide();
        Baskets.unpopulate();
        Lifes.restart();
        if (!DroppingOptions.isEmpty()) {
          Storage.addOptions(DroppingOptions.removeAll());
        }
        Lms.isBrowseMode() ? Storage.shuffleOptions() : Storage.reloadOptionsContent();
        DroppingOptions.startDropping();

      },
      showSolution: function () {
        App.pause();
        if (!DroppingOptions.isEmpty())
          Storage.addOptions(DroppingOptions.removeAll());
        Baskets.unpopulate();
        StartDialog.hide();
        setTimeout(function () {
          App.restoreState(Content.getSolution());
        }, 200);

      },
      animationStopped: function (val) {
        if (typeof val != 'undefined') {
          animationStopped = val;
        }
        return animationStopped;
      },
      pause: function () {
        if (!pause) {
          DroppingOptions.pause();
          pause = true;
        }
      },
      resume: function () {
        DroppingOptions.resume()
        pause = false;
      },
      isPaused: function () {
        return pause;
      },
      check: function () {
        Baskets.showFeedback();
        if (Baskets.isPerfectSolution()) {

          successTimeoutId = setTimeout(function () {
            Feedback.showSuccess();
            Stage.trigger('change', self);

          }, 1000);
          return;
        }
        //if (Content.getFeedbackErrorRemoval() == 'automaticaly')
        // Baskets.removeAllErrors();

        Stage.trigger('change', self);
      },
      setAsReadOnly: function () {
        App.pause();
        Buttons.disableAll();
        StartDialog.hide();
      },
      showFeedback: function () {
        Baskets.showFeedback();
        StartDialog.hide();
      },
      resizeAdjustments: function (winSize) {
        Baskets.resizeAdjustment(winSize);
        Storage.resizeAdjustment(winSize);
        DroppingOptions.resizeAdjustment(winSize);
      }
    }
  })();


  $.extend(cet.App, App);

})();
///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/Lms.js
(function () {

  //#region meta declarations
  var Stage;
  var Buttons;
  var App;
  var Baskets;
  var Lifes;
  //#endregion

  var Lms = (function () {

    var isBrowseMode;
    return {

      getScore: function () {

        var total = cet.Content.getNumberOfOptions();
        var corrects = cet.Baskets.getNumberOfCorrectOptions();
        return parseInt(100 * (corrects / total));

      },
      isBrowseMode: function (val) {
        if (typeof val != 'undefined')
          isBrowseMode = val;
        if (typeof isBrowseMode != 'undefined')
          return isBrowseMode;
        return !cet.content.lms.Settings.supported || (cet.content.lms.Activity.engagement.mode == 'browse');
      },
      setExternalButtonsVisibility: function () {
        cet.content.lms.Activity.settings.supportsCheck(false);
        cet.content.lms.Activity.settings.supportsRegenerate(false);
        cet.content.lms.Activity.settings.supportsReset(false);
        cet.content.lms.Activity.settings.supportsShowSolution(false);
      }

    };
  })();

  $.extend(cet.Lms, Lms);

})();

///#source 1 1 /Edgy/tetris/example/verblearn/lib/modules/Storage.js
(function () {

  var Storage = (function () {

    var hangingElement = null;
    var numberOfOptions;
    var jqStorage;
    var options;
    var order;
    var option;
    var Baskets;
    var Content;
    var Stage;
    var App;


    function getOptionClass(elem) {
      var classes = elem.attr('class').split(' ');
      for (var i in classes) {
        if (i && classes[i].indexOf('option') != -1 && classes[i].length == 7)
          return classes[i];
      }
      return null;

    }
    function getOptionByOrder(index) {
      return options[order[index]];
    }
    function isStorageEmpty() {

      for (var i = 0; i < order.length; i++) {
        if (order[i])
          return false;
      }
      return true;
    }

    return {
      init: function () {

        option = cet.option;
        Baskets = cet.Baskets;
        Content = cet.Content;
        Stage = cet.Stage;
        App = cet.App;

        for (var key in options) {
          options[key].jqElement.remove();

        }

        options = {};
        order = [];

        numberOfOptions = Content.getNumberOfOptions();

        for (var index = 0; index < numberOfOptions; index++) {
          var optionData = Content.getOptionByIndex(index)
          if (!optionData)
            debugger;

          var newOption = new option(optionData);


          options[newOption.getId()] = newOption;
          order.push(newOption.getId());
        }

      },
      shuffleOptions: function () {

        Content.shuffleWithoutReload();
        Storage.reloadOptionsContent();


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
        if (!options[option.getId()]) {
          options[option.getId()] = option;
          //add option in a random order index
          var randomIndex = Math.floor((Math.random() * order.length));
          order.splice(randomIndex, 0, option.getId());
          option.showAsInStorage();
        }
      },
      addOptions: function (options) {
        for (var i = 0; i < options.length; i++) {
          Storage.addOption(options[i]);
        }
      },
      removeOption: function (option) {

        if (!options[option.getId()])
          return;//throw 'cannot add existing option to storage'

        delete options[option.getId()];
        var optionIndex = order.indexOf(option.getId());
        order[optionIndex] = null;
        order = order.filter(function (n) { return n });
        hangingElement = null;
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
      setZindexes: function (val) {
        jqStorage.css('z-index', val);
        for (var key in options) {
          options[key].setZindex(val);
        }
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

        var pos = { top: 0, left: 0 };
        var elem = jqStorage;
        while (elem.attr('id') != 'Stage') {
          pos.left += parseInt(elem.css('left').replace('px', ''));
          pos.top += parseInt(elem.css('top').replace('px', ''));
          elem = elem.parent();
        }
        return pos;
      },
      getOptionById: function (id) {
        return options[id];

      },
      hide: function () {
        jqStorage.hide();
        navigationArrowLeft.hide();
        navigationArrowRight.hide();
      },
      show: function () {
        jqStorage.show();
      },
      getOptions: function () {
        return options;
      },
      getOrder: function () {
        return order;
      },
      dropOption: function () {
        var dropId = order[order.length - 1];
        var imDropping = options[dropId];
        imDropping.startDropping();
        order.pop();
        options[dropId] = null;
        delete options[dropId];
        return imDropping;
      },
      hasMoreOptions: function () {
        return order.length > 0;
      },
      isEmpty: function () {
        return !Storage.hasMoreOptions();
      },

      resizeAdjustment: function (winSize) {
        var options = this.getOptions();
        options = $.map(options, function (value, index) { 
          return [value];
        });
        for (var i = 0; i < options.length; i++) {
          options[i].resizeAdjustment(winSize);
        }
      }


    };
  })();


  cet.Storage = Storage;

})();

///#source 1 1 /Edgy/tetris/example/localization.js
var cet = cet || {};
cet.localization = {

  'successText': {
    'he': 'כל הכבוד',
    'en': 'well done',
    'ar': 'أحسنت',
    'vi': 'làm tốt'
  },
  'failureText': {
    'he': 'נסו שוב',
    'en': 'try again',
    'ar': 'حاول مرة أخرى',
    'vi': 'thử lại'
  }

};

