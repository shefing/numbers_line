/*!
	Colorbox v1.4.33 - 2013-10-31
	jQuery lightbox and modal window plugin
	(c) 2013 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=Z+o),n&&(r.style.cssText=n),e(r)}function n(){return i.innerHeight?i.innerHeight:e(i).height()}function r(e){var t=k.length,i=(z+e)%t;return 0>i?t+i:i}function h(e,t){return Math.round((/%/.test(e)?("x"===t?E.width():n())/100:1)*parseInt(e,10))}function l(e,t){return e.photo||e.photoRegex.test(t)}function s(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function a(e){"contains"in g[0]&&!g[0].contains(e.target)&&(e.stopPropagation(),g.focus())}function d(){var t,i=e.data(N,Y);null==i?(B=e.extend({},X),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},i);for(t in B)e.isFunction(B[t])&&"on"!==t.slice(0,2)&&(B[t]=B[t].call(N));B.rel=B.rel||N.rel||e(N).data("rel")||"nofollow",B.href=B.href||e(N).attr("href"),B.title=B.title||N.title,"string"==typeof B.href&&(B.href=e.trim(B.href))}function c(i,o){e(t).trigger(i),lt.triggerHandler(i),e.isFunction(o)&&o.call(N)}function u(i){q||(N=i,d(),k=e(N),z=0,"nofollow"!==B.rel&&(k=e("."+et).filter(function(){var t,i=e.data(this,Y);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===B.rel}),z=k.index(N),-1===z&&(k=k.add(N),z=k.length-1)),w.css({opacity:parseFloat(B.opacity),cursor:B.overlayClose?"pointer":"auto",visibility:"visible"}).show(),J&&g.add(w).removeClass(J),B.className&&g.add(w).addClass(B.className),J=B.className,B.closeButton?K.html(B.close).appendTo(y):K.appendTo("<div/>"),U||(U=$=!0,g.css({visibility:"hidden",display:"block"}),H=o(st,"LoadedContent","width:0; height:0; overflow:hidden"),y.css({width:"",height:""}).append(H),O=x.height()+C.height()+y.outerHeight(!0)-y.height(),_=b.width()+T.width()+y.outerWidth(!0)-y.width(),D=H.outerHeight(!0),A=H.outerWidth(!0),B.w=h(B.initialWidth,"x"),B.h=h(B.initialHeight,"y"),H.css({width:"",height:B.h}),Q.position(),c(tt,B.onOpen),P.add(L).hide(),g.focus(),B.trapFocus&&t.addEventListener&&(t.addEventListener("focus",a,!0),lt.one(rt,function(){t.removeEventListener("focus",a,!0)})),B.returnFocus&&lt.one(rt,function(){e(N).focus()})),m())}function f(){!g&&t.body&&(V=!1,E=e(i),g=o(st).attr({id:Y,"class":e.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),w=o(st,"Overlay").hide(),F=e([o(st,"LoadingOverlay")[0],o(st,"LoadingGraphic")[0]]),v=o(st,"Wrapper"),y=o(st,"Content").append(L=o(st,"Title"),S=o(st,"Current"),I=e('<button type="button"/>').attr({id:Z+"Previous"}),R=e('<button type="button"/>').attr({id:Z+"Next"}),M=o("button","Slideshow"),F),K=e('<button type="button"/>').attr({id:Z+"Close"}),v.append(o(st).append(o(st,"TopLeft"),x=o(st,"TopCenter"),o(st,"TopRight")),o(st,!1,"clear:left").append(b=o(st,"MiddleLeft"),y,T=o(st,"MiddleRight")),o(st,!1,"clear:left").append(o(st,"BottomLeft"),C=o(st,"BottomCenter"),o(st,"BottomRight"))).find("div div").css({"float":"left"}),W=o(st,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),P=R.add(I).add(S).add(M),e(t.body).append(w,g.append(v,W)))}function p(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||e.ctrlKey||(e.preventDefault(),u(this))}return g?(V||(V=!0,R.click(function(){Q.next()}),I.click(function(){Q.prev()}),K.click(function(){Q.close()}),w.click(function(){B.overlayClose&&Q.close()}),e(t).bind("keydown."+Z,function(e){var t=e.keyCode;U&&B.escKey&&27===t&&(e.preventDefault(),Q.close()),U&&B.arrowKey&&k[1]&&!e.altKey&&(37===t?(e.preventDefault(),I.click()):39===t&&(e.preventDefault(),R.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+Z,"."+et,i):e("."+et).live("click."+Z,i)),!0):!1}function m(){var n,r,a,u=Q.prep,f=++at;$=!0,j=!1,N=k[z],d(),c(ht),c(it,B.onLoad),B.h=B.height?h(B.height,"y")-D-O:B.innerHeight&&h(B.innerHeight,"y"),B.w=B.width?h(B.width,"x")-A-_:B.innerWidth&&h(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=h(B.maxWidth,"x")-A-_,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=h(B.maxHeight,"y")-D-O,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,G=setTimeout(function(){F.show()},100),B.inline?(a=o(st).hide().insertBefore(e(n)[0]),lt.one(ht,function(){a.replaceWith(H.children())}),u(e(n))):B.iframe?u(" "):B.html?u(B.html):l(B,n)?(n=s(B,n),j=t.createElement("img"),e(j).addClass(Z+"Photo").bind("error",function(){B.title=!1,u(o(st,"Error").html(B.imgError))}).one("load",function(){var t;f===at&&(e.each(["alt","longdesc","aria-describedby"],function(t,i){var o=e(N).attr(i)||e(N).attr("data-"+i);o&&j.setAttribute(i,o)}),B.retinaImage&&i.devicePixelRatio>1&&(j.height=j.height/i.devicePixelRatio,j.width=j.width/i.devicePixelRatio),B.scalePhotos&&(r=function(){j.height-=j.height*t,j.width-=j.width*t},B.mw&&j.width>B.mw&&(t=(j.width-B.mw)/j.width,r()),B.mh&&j.height>B.mh&&(t=(j.height-B.mh)/j.height,r())),B.h&&(j.style.marginTop=Math.max(B.mh-j.height,0)/2+"px"),k[1]&&(B.loop||k[z+1])&&(j.style.cursor="pointer",j.onclick=function(){Q.next()}),j.style.width=j.width+"px",j.style.height=j.height+"px",setTimeout(function(){u(j)},1))}),setTimeout(function(){j.src=n},1)):n&&W.load(n,B.data,function(t,i){f===at&&u("error"===i?o(st,"Error").html(B.xhrError):e(this).contents())})}var w,g,v,y,x,b,T,C,k,E,H,W,F,L,S,M,R,I,K,P,B,O,_,D,A,N,z,j,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1},Y="colorbox",Z="cbox",et=Z+"Element",tt=Z+"_open",it=Z+"_load",ot=Z+"_complete",nt=Z+"_cleanup",rt=Z+"_closed",ht=Z+"_purge",lt=e("<a/>"),st="div",at=0,dt={},ct=function(){function e(){clearTimeout(h)}function t(){(B.loop||k[z+1])&&(e(),h=setTimeout(Q.next,B.slideshowSpeed))}function i(){M.html(B.slideshowStop).unbind(s).one(s,o),lt.bind(ot,t).bind(it,e),g.removeClass(l+"off").addClass(l+"on")}function o(){e(),lt.unbind(ot,t).unbind(it,e),M.html(B.slideshowStart).unbind(s).one(s,function(){Q.next(),i()}),g.removeClass(l+"on").addClass(l+"off")}function n(){r=!1,M.hide(),e(),lt.unbind(ot,t).unbind(it,e),g.removeClass(l+"off "+l+"on")}var r,h,l=Z+"Slideshow_",s="click."+Z;return function(){r?B.slideshow||(lt.unbind(nt,n),n()):B.slideshow&&k[1]&&(r=!0,lt.one(nt,n),B.slideshowAuto?i():o(),M.show())}}();e.colorbox||(e(f),Q=e.fn[Y]=e[Y]=function(t,i){var o=this;if(t=t||{},f(),p()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,Y,e.extend({},e.data(this,Y)||X,t))}).addClass(et),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&u(o[0])}return o},Q.position=function(t,i){function o(){x[0].style.width=C[0].style.width=y[0].style.width=parseInt(g[0].style.width,10)-_+"px",y[0].style.height=b[0].style.height=T[0].style.height=parseInt(g[0].style.height,10)-O+"px"}var r,l,s,a=0,d=0,c=g.offset();if(E.unbind("resize."+Z),g.css({top:-9e4,left:-9e4}),l=E.scrollTop(),s=E.scrollLeft(),B.fixed?(c.top-=l,c.left-=s,g.css({position:"fixed"})):(a=l,d=s,g.css({position:"absolute"})),d+=B.right!==!1?Math.max(E.width()-B.w-A-_-h(B.right,"x"),0):B.left!==!1?h(B.left,"x"):Math.round(Math.max(E.width()-B.w-A-_,0)/2),a+=B.bottom!==!1?Math.max(n()-B.h-D-O-h(B.bottom,"y"),0):B.top!==!1?h(B.top,"y"):Math.round(Math.max(n()-B.h-D-O,0)/2),g.css({top:c.top,left:c.left,visibility:"visible"}),v[0].style.width=v[0].style.height="9999px",r={width:B.w+A+_,height:B.h+D+O,top:a,left:d},t){var u=0;e.each(r,function(e){return r[e]!==dt[e]?(u=t,void 0):void 0}),t=u}dt=r,t||g.css(r),g.dequeue().animate(r,{duration:t||0,complete:function(){o(),$=!1,v[0].style.width=B.w+A+_+"px",v[0].style.height=B.h+D+O+"px",B.reposition&&setTimeout(function(){E.bind("resize."+Z,Q.position)},1),i&&i()},step:o})},Q.resize=function(e){var t;U&&(e=e||{},e.width&&(B.w=h(e.width,"x")-A-_),e.innerWidth&&(B.w=h(e.innerWidth,"x")),H.css({width:B.w}),e.height&&(B.h=h(e.height,"y")-D-O),e.innerHeight&&(B.h=h(e.innerHeight,"y")),e.innerHeight||e.height||(t=H.scrollTop(),H.css({height:"auto"}),B.h=H.height()),H.css({height:B.h}),t&&H.scrollTop(t),Q.position("none"===B.transition?0:B.speed))},Q.prep=function(i){function n(){return B.w=B.w||H.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function h(){return B.h=B.h||H.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(U){var a,d="none"===B.transition?0:B.speed;H.empty().remove(),H=o(st,"LoadedContent").append(i),H.hide().appendTo(W.show()).css({width:n(),overflow:B.scrolling?"auto":"hidden"}).css({height:h()}).prependTo(y),W.hide(),e(j).css({"float":"none"}),a=function(){function i(){e.support.opacity===!1&&g[0].style.removeAttribute("filter")}var n,h,a=k.length,u="frameBorder",f="allowTransparency";U&&(h=function(){clearTimeout(G),F.hide(),c(ot,B.onComplete)},L.html(B.title).add(H).show(),a>1?("string"==typeof B.current&&S.html(B.current.replace("{current}",z+1).replace("{total}",a)).show(),R[B.loop||a-1>z?"show":"hide"]().html(B.next),I[B.loop||z?"show":"hide"]().html(B.previous),ct(),B.preloading&&e.each([r(-1),r(1)],function(){var i,o,n=k[this],r=e.data(n,Y);r&&r.href?(i=r.href,e.isFunction(i)&&(i=i.call(n))):i=e(n).attr("href"),i&&l(r,i)&&(i=s(r,i),o=t.createElement("img"),o.src=i)})):P.hide(),B.iframe?(n=o("iframe")[0],u in n&&(n[u]=0),f in n&&(n[f]="true"),B.scrolling||(n.scrolling="no"),e(n).attr({src:B.href,name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",h).appendTo(H),lt.one(ht,function(){n.src="//about:blank"}),B.fastIframe&&e(n).trigger("load")):h(),"fade"===B.transition?g.fadeTo(d,1,i):i())},"fade"===B.transition?g.fadeTo(d,0,function(){Q.position(0,a)}):Q.position(d,a)}},Q.next=function(){!$&&k[1]&&(B.loop||k[z+1])&&(z=r(1),u(k[z]))},Q.prev=function(){!$&&k[1]&&(B.loop||z)&&(z=r(-1),u(k[z]))},Q.close=function(){U&&!q&&(q=!0,U=!1,c(nt,B.onCleanup),E.unbind("."+Z),w.fadeTo(B.fadeOut||0,0),g.stop().fadeTo(B.fadeOut||0,0,function(){g.add(w).css({opacity:1,cursor:"auto"}).hide(),c(ht),H.empty().remove(),setTimeout(function(){q=!1,c(rt,B.onClosed)},1)}))},Q.remove=function(){g&&(g.stop(),e.colorbox.close(),g.stop().remove(),w.remove(),q=!1,g=null,e("."+et).removeData(Y).removeClass(et),e(t).unbind("click."+Z))},Q.element=function(){return e(N)},Q.settings=X)})(jQuery,document,window);
/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.4.2
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2013-11-25
 * @link    http://jscolor.com
 */


var jscolor = {


	dir : '', // location of jscolor directory (leave empty to autodetect)
	bindClass : 'color', // class name
	binding : true, // automatic binding via <input class="...">
	preloading : true, // use image preloading?


	install : function() {
		jscolor.addEvent(window, 'load', jscolor.init);
	},


	init : function() {
		if(jscolor.binding) {
			jscolor.bind();
		}
		if(jscolor.preloading) {
			jscolor.preload();
		}
	},


	getDir : function() {
		if(!jscolor.dir) {
			var detected = jscolor.detectDir();
			jscolor.dir = detected!==false ? detected : 'jscolor/';
		}
		return jscolor.dir;
	},


	detectDir : function() {
		var base = location.href;

		var e = document.getElementsByTagName('base');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].href) { base = e[i].href; }
		}

		var e = document.getElementsByTagName('script');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(e[i].src)) {
				var src = new jscolor.URI(e[i].src);
				var srcAbs = src.toAbsolute(base);
				srcAbs.path = srcAbs.path.replace(/[^\/]+$/, ''); // remove filename
				srcAbs.query = null;
				srcAbs.fragment = null;
				return srcAbs.toString();
			}
		}
		return false;
	},


	bind : function() {
		var matchClass = new RegExp('(^|\\s)('+jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
		var e = document.getElementsByTagName('input');
		for(var i=0; i<e.length; i+=1) {
			var m;
			if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
				var prop = {};
				if(m[3]) {
					try {
						prop = (new Function ('return (' + m[3] + ')'))();
					} catch(eInvalidProp) {}
				}
				e[i].color = new jscolor.color(e[i], prop);
			}
		}
	},


	preload : function() {
		for(var fn in jscolor.imgRequire) {
			if(jscolor.imgRequire.hasOwnProperty(fn)) {
				jscolor.loadImage(fn);
			}
		}
	},


	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},


	requireImage : function(filename) {
		jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
		if(!jscolor.imgLoaded[filename]) {
			jscolor.imgLoaded[filename] = new Image();
			jscolor.imgLoaded[filename].src = jscolor.getDir()+filename;
		}
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
	},


	addEvent : function(el, evnt, func) {
		if(el.addEventListener) {
			el.addEventListener(evnt, func, false);
		} else if(el.attachEvent) {
			el.attachEvent('on'+evnt, func);
		}
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(document.createEvent) {
			var ev = document.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(document.createEventObject) {
			var ev = document.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
			el['on'+evnt]();
		}
	},


	getElementPos : function(e) {
		var e1=e, e2=e;
		var x=0, y=0;
		if(e1.offsetParent) {
			do {
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(e) {
		return [e.offsetWidth, e.offsetHeight];
	},


	getRelMousePos : function(e) {
		var x = 0, y = 0;
		if (!e) { e = window.event; }
		if (typeof e.offsetX === 'number') {
			x = e.offsetX;
			y = e.offsetY;
		} else if (typeof e.layerX === 'number') {
			x = e.layerX;
			y = e.layerY;
		}
		return { x: x, y: y };
	},


	getViewPos : function() {
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			return [document.body.scrollLeft, document.body.scrollTop];
		} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			return [document.body.clientWidth, document.body.clientHeight];
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},


	URI : function(uri) { // See RFC3986

		this.scheme = null;
		this.authority = null;
		this.path = '';
		this.query = null;
		this.fragment = null;

		this.parse = function(uri) {
			var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
			this.scheme = m[3] ? m[2] : null;
			this.authority = m[5] ? m[6] : null;
			this.path = m[7];
			this.query = m[9] ? m[10] : null;
			this.fragment = m[12] ? m[13] : null;
			return this;
		};

		this.toString = function() {
			var result = '';
			if(this.scheme !== null) { result = result + this.scheme + ':'; }
			if(this.authority !== null) { result = result + '//' + this.authority; }
			if(this.path !== null) { result = result + this.path; }
			if(this.query !== null) { result = result + '?' + this.query; }
			if(this.fragment !== null) { result = result + '#' + this.fragment; }
			return result;
		};

		this.toAbsolute = function(base) {
			var base = new jscolor.URI(base);
			var r = this;
			var t = new jscolor.URI;

			if(base.scheme === null) { return false; }

			if(r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
				r.scheme = null;
			}

			if(r.scheme !== null) {
				t.scheme = r.scheme;
				t.authority = r.authority;
				t.path = removeDotSegments(r.path);
				t.query = r.query;
			} else {
				if(r.authority !== null) {
					t.authority = r.authority;
					t.path = removeDotSegments(r.path);
					t.query = r.query;
				} else {
					if(r.path === '') {
						t.path = base.path;
						if(r.query !== null) {
							t.query = r.query;
						} else {
							t.query = base.query;
						}
					} else {
						if(r.path.substr(0,1) === '/') {
							t.path = removeDotSegments(r.path);
						} else {
							if(base.authority !== null && base.path === '') {
								t.path = '/'+r.path;
							} else {
								t.path = base.path.replace(/[^\/]+$/,'')+r.path;
							}
							t.path = removeDotSegments(t.path);
						}
						t.query = r.query;
					}
					t.authority = base.authority;
				}
				t.scheme = base.scheme;
			}
			t.fragment = r.fragment;

			return t;
		};

		function removeDotSegments(path) {
			var out = '';
			while(path) {
				if(path.substr(0,3)==='../' || path.substr(0,2)==='./') {
					path = path.replace(/^\.+/,'').substr(1);
				} else if(path.substr(0,3)==='/./' || path==='/.') {
					path = '/'+path.substr(3);
				} else if(path.substr(0,4)==='/../' || path==='/..') {
					path = '/'+path.substr(4);
					out = out.replace(/\/?[^\/]*$/, '');
				} else if(path==='.' || path==='..') {
					path = '';
				} else {
					var rm = path.match(/^\/?[^\/]*/)[0];
					path = path.substr(rm.length);
					out = out + rm;
				}
			}
			return out;
		}

		if(uri) {
			this.parse(uri);
		}

	},


	//
	// Usage example:
	// var myColor = new jscolor.color(myInputElement)
	//

	color : function(target, prop) {


		this.required = true; // refuse empty values?
		this.adjust = true; // adjust value to uniform notation?
		this.hash = false; // prefix color with # symbol?
		this.caps = true; // uppercase?
		this.slider = true; // show the value/saturation slider?
		this.valueElement = target; // value holder
		this.styleElement = target; // where to reflect current color
		this.onImmediateChange = null; // onchange callback (can be either string or function)
		this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
		this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1
		this.minH = 0; // read-only  0-6
		this.maxH = 6; // read-only  0-6
		this.minS = 0; // read-only  0-1
		this.maxS = 1; // read-only  0-1
		this.minV = 0; // read-only  0-1
		this.maxV = 1; // read-only  0-1

		this.pickerOnfocus = true; // display picker on focus?
		this.pickerMode = 'HSV'; // HSV | HVS
		this.pickerPosition = 'bottom'; // left | right | top | bottom
		this.pickerSmartPosition = true; // automatically adjust picker position when necessary
		this.pickerButtonHeight = 20; // px
		this.pickerClosable = false;
		this.pickerCloseText = 'Close';
		this.pickerButtonColor = 'ButtonText'; // px
		this.pickerFace = 10; // px
		this.pickerFaceColor = 'ThreeDFace'; // CSS color
		this.pickerBorder = 1; // px
		this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
		this.pickerInset = 1; // px
		this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
		this.pickerZIndex = 10000;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}


		this.hidePicker = function() {
			if(isPickerOwner()) {
				removePicker();
			}
		};


		this.showPicker = function() {
			if(!isPickerOwner()) {
				var tp = jscolor.getElementPos(target); // target pos
				var ts = jscolor.getElementSize(target); // target size
				var vp = jscolor.getViewPos(); // view pos
				var vs = jscolor.getViewSize(); // view size
				var ps = getPickerDims(this); // picker size
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left': a=1; b=0; c=-1; break;
					case 'right':a=1; b=0; c=1; break;
					case 'top':  a=0; b=1; c=-1; break;
					default:     a=0; b=1; c=1; break;
				}
				var l = (ts[b]+ps[b])/2;

				// picker pos
				if (!this.pickerSmartPosition) {
					var pp = [
						tp[a],
						tp[b]+ts[b]-l+l*c
					];
				} else {
					var pp = [
						-vp[a]+tp[a]+ps[a] > vs[a] ?
							(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
							tp[a],
						-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
							(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
							(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
					];
				}
				drawPicker(pp[a], pp[b]);
			}
		};


		this.importColor = function() {
			if(!valueElement) {
				this.exportColor();
			} else {
				if(!this.adjust) {
					if(!this.fromString(valueElement.value, leaveValue)) {
						styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
						styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
						styleElement.style.color = styleElement.jscStyle.color;
						this.exportColor(leaveValue | leaveStyle);
					}
				} else if(!this.required && /^\s*$/.test(valueElement.value)) {
					valueElement.value = '';
					styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
					styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
					styleElement.style.color = styleElement.jscStyle.color;
					this.exportColor(leaveValue | leaveStyle);

				} else if(this.fromString(valueElement.value)) {
					// OK
				} else {
					this.exportColor();
				}
			}
		};


		this.exportColor = function(flags) {
			if(!(flags & leaveValue) && valueElement) {
				var value = this.toString();
				if(this.caps) { value = value.toUpperCase(); }
				if(this.hash) { value = '#'+value; }
				valueElement.value = value;
			}
			if(!(flags & leaveStyle) && styleElement) {
				styleElement.style.backgroundImage = "none";
				styleElement.style.backgroundColor =
					'#'+this.toString();
				styleElement.style.color =
					0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? '#FFF' : '#000';
			}
			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) { // null = don't change
			if(h !== null) { h = Math.max(0.0, this.minH, Math.min(6.0, this.maxH, h)); }
			if(s !== null) { s = Math.max(0.0, this.minS, Math.min(1.0, this.maxS, s)); }
			if(v !== null) { v = Math.max(0.0, this.minV, Math.min(1.0, this.maxV, v)); }

			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);

			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) { // null = don't change
			if(r !== null) { r = Math.max(0.0, Math.min(1.0, r)); }
			if(g !== null) { g = Math.max(0.0, Math.min(1.0, g)); }
			if(b !== null) { b = Math.max(0.0, Math.min(1.0, b)); }

			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : r,
				g===null ? this.rgb[1] : g,
				b===null ? this.rgb[2] : b
			);
			if(hsv[0] !== null) {
				this.hsv[0] = Math.max(0.0, this.minH, Math.min(6.0, this.maxH, hsv[0]));
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1]===null ? null : Math.max(0.0, this.minS, Math.min(1.0, this.maxS, hsv[1]));
			}
			this.hsv[2] = hsv[2]===null ? null : Math.max(0.0, this.minV, Math.min(1.0, this.maxV, hsv[2]));

			// update RGB according to final HSV, as some values might be trimmed
			var rgb = HSV_RGB(this.hsv[0], this.hsv[1], this.hsv[2]);
			this.rgb[0] = rgb[0];
			this.rgb[1] = rgb[1];
			this.rgb[2] = rgb[2];

			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) { // 6-char notation
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else { // 3-char notation
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r, g, b) {
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) { return [ null, 0, v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h, s, v) {
			if(h === null) { return [ v, v, v ]; }
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0: return [v,n,m];
				case 1: return [n,v,m];
				case 2: return [m,v,n];
				case 3: return [m,n,v];
				case 4: return [n,m,v];
				case 5: return [v,m,n];
			}
		}


		function removePicker() {
			delete jscolor.picker.owner;
			document.getElementsByTagName('body')[0].removeChild(jscolor.picker.boxB);
		}


		function drawPicker(x, y) {
			if(!jscolor.picker) {
				jscolor.picker = {
					box : document.createElement('div'),
					boxB : document.createElement('div'),
					pad : document.createElement('div'),
					padB : document.createElement('div'),
					padM : document.createElement('div'),
					sld : document.createElement('div'),
					sldB : document.createElement('div'),
					sldM : document.createElement('div'),
					btn : document.createElement('div'),
					btnS : document.createElement('span'),
					btnT : document.createTextNode(THIS.pickerCloseText)
				};
				for(var i=0,segSize=4; i<jscolor.images.sld[1]; i+=segSize) {
					var seg = document.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					jscolor.picker.sld.appendChild(seg);
				}
				jscolor.picker.sldB.appendChild(jscolor.picker.sld);
				jscolor.picker.box.appendChild(jscolor.picker.sldB);
				jscolor.picker.box.appendChild(jscolor.picker.sldM);
				jscolor.picker.padB.appendChild(jscolor.picker.pad);
				jscolor.picker.box.appendChild(jscolor.picker.padB);
				jscolor.picker.box.appendChild(jscolor.picker.padM);
				jscolor.picker.btnS.appendChild(jscolor.picker.btnT);
				jscolor.picker.btn.appendChild(jscolor.picker.btnS);
				jscolor.picker.box.appendChild(jscolor.picker.btn);
				jscolor.picker.boxB.appendChild(jscolor.picker.box);
			}

			var p = jscolor.picker;

			// controls interaction
			p.box.onmouseup =
			p.box.onmouseout = function() { target.focus(); };
			p.box.onmousedown = function() { abortBlur=true; };
			p.box.onmousemove = function(e) {
				if (holdPad || holdSld) {
					holdPad && setPad(e);
					holdSld && setSld(e);
					if (document.selection) {
						document.selection.empty();
					} else if (window.getSelection) {
						window.getSelection().removeAllRanges();
					}
					dispatchImmediateChange();
				}
			};
			if('ontouchstart' in window) { // if touch device
				var handle_touchmove = function(e) {
					var event={
						'offsetX': e.touches[0].pageX-touchOffset.X,
						'offsetY': e.touches[0].pageY-touchOffset.Y
					};
					if (holdPad || holdSld) {
						holdPad && setPad(event);
						holdSld && setSld(event);
						dispatchImmediateChange();
					}
					e.stopPropagation(); // prevent move "view" on broswer
					e.preventDefault(); // prevent Default - Android Fix (else android generated only 1-2 touchmove events)
				};
				p.box.removeEventListener('touchmove', handle_touchmove, false)
				p.box.addEventListener('touchmove', handle_touchmove, false)
			}
			p.padM.onmouseup =
			p.padM.onmouseout = function() { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } };
			p.padM.onmousedown = function(e) {
				// if the slider is at the bottom, move it up
				switch(modeID) {
					case 0: if (THIS.hsv[2] === 0) { THIS.fromHSV(null, null, 1.0); }; break;
					case 1: if (THIS.hsv[1] === 0) { THIS.fromHSV(null, 1.0, null); }; break;
				}
				holdSld=false;
				holdPad=true;
				setPad(e);
				dispatchImmediateChange();
			};
			if('ontouchstart' in window) {
				p.padM.addEventListener('touchstart', function(e) {
					touchOffset={
						'X': e.target.offsetParent.offsetLeft,
						'Y': e.target.offsetParent.offsetTop
					};
					this.onmousedown({
						'offsetX':e.touches[0].pageX-touchOffset.X,
						'offsetY':e.touches[0].pageY-touchOffset.Y
					});
				});
			}
			p.sldM.onmouseup =
			p.sldM.onmouseout = function() { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } };
			p.sldM.onmousedown = function(e) {
				holdPad=false;
				holdSld=true;
				setSld(e);
				dispatchImmediateChange();
			};
			if('ontouchstart' in window) {
				p.sldM.addEventListener('touchstart', function(e) {
					touchOffset={
						'X': e.target.offsetParent.offsetLeft,
						'Y': e.target.offsetParent.offsetTop
					};
					this.onmousedown({
						'offsetX':e.touches[0].pageX-touchOffset.X,
						'offsetY':e.touches[0].pageY-touchOffset.Y
					});
				});
			}

			// picker
			var dims = getPickerDims(THIS);
			p.box.style.width = dims[0] + 'px';
			p.box.style.height = dims[1] + 'px';

			// picker border
			p.boxB.style.position = 'absolute';
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = THIS.pickerZIndex;
			p.boxB.style.border = THIS.pickerBorder+'px solid';
			p.boxB.style.borderColor = THIS.pickerBorderColor;
			p.boxB.style.background = THIS.pickerFaceColor;

			// pad image
			p.pad.style.width = jscolor.images.pad[0]+'px';
			p.pad.style.height = jscolor.images.pad[1]+'px';

			// pad border
			p.padB.style.position = 'absolute';
			p.padB.style.left = THIS.pickerFace+'px';
			p.padB.style.top = THIS.pickerFace+'px';
			p.padB.style.border = THIS.pickerInset+'px solid';
			p.padB.style.borderColor = THIS.pickerInsetColor;

			// pad mouse area
			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			// slider image
			p.sld.style.overflow = 'hidden';
			p.sld.style.width = jscolor.images.sld[0]+'px';
			p.sld.style.height = jscolor.images.sld[1]+'px';

			// slider border
			p.sldB.style.display = THIS.slider ? 'block' : 'none';
			p.sldB.style.position = 'absolute';
			p.sldB.style.right = THIS.pickerFace+'px';
			p.sldB.style.top = THIS.pickerFace+'px';
			p.sldB.style.border = THIS.pickerInset+'px solid';
			p.sldB.style.borderColor = THIS.pickerInsetColor;

			// slider mouse area
			p.sldM.style.display = THIS.slider ? 'block' : 'none';
			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			try {
				p.sldM.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.sldM.style.cursor = 'hand';
			}

			// "close" button
			function setBtnBorder() {
				var insetColors = THIS.pickerInsetColor.split(/\s+/);
				var pickerOutsetColor = insetColors.length < 2 ? insetColors[0] : insetColors[1] + ' ' + insetColors[0] + ' ' + insetColors[0] + ' ' + insetColors[1];
				p.btn.style.borderColor = pickerOutsetColor;
			}
			p.btn.style.display = THIS.pickerClosable ? 'block' : 'none';
			p.btn.style.position = 'absolute';
			p.btn.style.left = THIS.pickerFace + 'px';
			p.btn.style.bottom = THIS.pickerFace + 'px';
			p.btn.style.padding = '0 15px';
			p.btn.style.height = '18px';
			p.btn.style.border = THIS.pickerInset + 'px solid';
			setBtnBorder();
			p.btn.style.color = THIS.pickerButtonColor;
			p.btn.style.font = '12px sans-serif';
			p.btn.style.textAlign = 'center';
			try {
				p.btn.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.btn.style.cursor = 'hand';
			}
			p.btn.onmousedown = function () {
				THIS.hidePicker();
			};
			p.btnS.style.lineHeight = p.btn.style.height;

			// load images in optimal order
			switch(modeID) {
				case 0: var padImg = 'hs.png'; break;
				case 1: var padImg = 'hv.png'; break;
			}
			p.padM.style.backgroundImage = "url('"+jscolor.getDir()+"cross.gif')";
			p.padM.style.backgroundRepeat = "no-repeat";
			p.sldM.style.backgroundImage = "url('"+jscolor.getDir()+"arrow.gif')";
			p.sldM.style.backgroundRepeat = "no-repeat";
			p.pad.style.backgroundImage = "url('"+jscolor.getDir()+padImg+"')";
			p.pad.style.backgroundRepeat = "no-repeat";
			p.pad.style.backgroundPosition = "0 0";

			// place pointers
			redrawPad();
			redrawSld();

			jscolor.picker.owner = THIS;
			document.getElementsByTagName('body')[0].appendChild(p.boxB);
		}


		function getPickerDims(o) {
			var dims = [
				2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[0] +
					(o.slider ? 2*o.pickerInset + 2*jscolor.images.arrow[0] + jscolor.images.sld[0] : 0),
				o.pickerClosable ?
					4*o.pickerInset + 3*o.pickerFace + jscolor.images.pad[1] + o.pickerButtonHeight :
					2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[1]
			];
			return dims;
		}


		function redrawPad() {
			// redraw the pad pointer
			switch(modeID) {
				case 0: var yComponent = 1; break;
				case 1: var yComponent = 2; break;
			}
			var x = Math.round((THIS.hsv[0]/6) * (jscolor.images.pad[0]-1));
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.pad[1]-1));
			jscolor.picker.padM.style.backgroundPosition =
				(THIS.pickerFace+THIS.pickerInset+x - Math.floor(jscolor.images.cross[0]/2)) + 'px ' +
				(THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.cross[1]/2)) + 'px';

			// redraw the slider image
			var seg = jscolor.picker.sld.childNodes;

			switch(modeID) {
				case 0:
					var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
					for(var i=0; i<seg.length; i+=1) {
						seg[i].style.backgroundColor = 'rgb('+
							(rgb[0]*(1-i/seg.length)*100)+'%,'+
							(rgb[1]*(1-i/seg.length)*100)+'%,'+
							(rgb[2]*(1-i/seg.length)*100)+'%)';
					}
					break;
				case 1:
					var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
					var i = Math.floor(THIS.hsv[0]);
					var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
					switch(i) {
						case 6:
						case 0: rgb=[0,1,2]; break;
						case 1: rgb=[1,0,2]; break;
						case 2: rgb=[2,0,1]; break;
						case 3: rgb=[2,1,0]; break;
						case 4: rgb=[1,2,0]; break;
						case 5: rgb=[0,2,1]; break;
					}
					for(var i=0; i<seg.length; i+=1) {
						s = 1 - 1/(seg.length-1)*i;
						c[1] = c[0] * (1 - s*f);
						c[2] = c[0] * (1 - s);
						seg[i].style.backgroundColor = 'rgb('+
							(c[rgb[0]]*100)+'%,'+
							(c[rgb[1]]*100)+'%,'+
							(c[rgb[2]]*100)+'%)';
					}
					break;
			}
		}


		function redrawSld() {
			// redraw the slider pointer
			switch(modeID) {
				case 0: var yComponent = 2; break;
				case 1: var yComponent = 1; break;
			}
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.sld[1]-1));
			jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			return jscolor.picker && jscolor.picker.owner === THIS;
		}


		function blurTarget() {
			if(valueElement === target) {
				THIS.importColor();
			}
			if(THIS.pickerOnfocus) {
				THIS.hidePicker();
			}
		}


		function blurValue() {
			if(valueElement !== target) {
				THIS.importColor();
			}
		}


		function setPad(e) {
			var mpos = jscolor.getRelMousePos(e);
			var x = mpos.x - THIS.pickerFace - THIS.pickerInset;
			var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
			switch(modeID) {
				case 0: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), 1 - y/(jscolor.images.pad[1]-1), null, leaveSld); break;
				case 1: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), null, 1 - y/(jscolor.images.pad[1]-1), leaveSld); break;
			}
		}


		function setSld(e) {
			var mpos = jscolor.getRelMousePos(e);
			var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
			switch(modeID) {
				case 0: THIS.fromHSV(null, null, 1 - y/(jscolor.images.sld[1]-1), leavePad); break;
				case 1: THIS.fromHSV(null, 1 - y/(jscolor.images.sld[1]-1), null, leavePad); break;
			}
		}


		function dispatchImmediateChange() {
			if (THIS.onImmediateChange) {
				var callback;
				if (typeof THIS.onImmediateChange === 'string') {
					callback = new Function (THIS.onImmediateChange);
				} else {
					callback = THIS.onImmediateChange;
				}
				callback.call(THIS);
			}
		}


		var THIS = this;
		var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
		var abortBlur = false;
		var
			valueElement = jscolor.fetchElement(this.valueElement),
			styleElement = jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false,
			touchOffset = {};
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		// target
		jscolor.addEvent(target, 'focus', function() {
			if(THIS.pickerOnfocus) { THIS.showPicker(); }
		});
		jscolor.addEvent(target, 'blur', function() {
			if(!abortBlur) {
				window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
			} else {
				abortBlur = false;
			}
		});

		// valueElement
		if(valueElement) {
			var updateField = function() {
				THIS.fromString(valueElement.value, leaveValue);
				dispatchImmediateChange();
			};
			jscolor.addEvent(valueElement, 'keyup', updateField);
			jscolor.addEvent(valueElement, 'input', updateField);
			jscolor.addEvent(valueElement, 'blur', blurValue);
			valueElement.setAttribute('autocomplete', 'off');
		}

		// styleElement
		if(styleElement) {
			styleElement.jscStyle = {
				backgroundImage : styleElement.style.backgroundImage,
				backgroundColor : styleElement.style.backgroundColor,
				color : styleElement.style.color
			};
		}

		// require images
		switch(modeID) {
			case 0: jscolor.requireImage('hs.png'); break;
			case 1: jscolor.requireImage('hv.png'); break;
		}
		jscolor.requireImage('cross.gif');
		jscolor.requireImage('arrow.gif');

		this.importColor();
	}

};


jscolor.install();


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
    })(cet.Units || (cet.Units = {}));
    var Units = cet.Units;
})(cet || (cet = {}));


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

    if (cet.Stage) {
      if (cet.Stage.scale) {
        scale = cet.Stage.scale();
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

///<reference path='ui.ts'/>
///<reference path='../../../../lib/modules/draggable.ts'/>
///<reference path='../../../../lib/modules/units.ts'/>
///<reference path='../../../../lib/external/jquery.d.ts'/>
var basketdata = (function () {
  function basketdata(top, left, height, width, realTimeCreation, text, image, id, color, hiddenOnRuntime) {
        if (typeof height === "undefined") { height = 94; }
        if (typeof width === "undefined") { width = 118; }
        if (typeof realTimeCreation === "undefined") { realTimeCreation = true; }
        if (typeof text === "undefined") { text = ''; }
        if (typeof image === "undefined") { image = ''; }
        if (typeof id === "undefined") { id = null; }
        if (typeof color === "undefined") { color = null; }
        this.top = top;
        this.left = left;
        this.height = height;
        this.width = width;
        this.realTimeCreation = realTimeCreation;
        this.text = text;
        this.image = image;
        this.id = id;
        this.color = color;
        this.hiddenOnRuntime = hiddenOnRuntime
    }
    basketdata.prototype.toPixels = function () {
        this.height = cet.Units.Utils.percentageToPixel(this.height, Stage.height);
        this.width = cet.Units.Utils.percentageToPixel(this.width, Stage.width);

        this.top = cet.Units.Utils.percentageToPixel(this.top, Stage.height);
        this.left = cet.Units.Utils.percentageToPixel(this.left, Stage.width);
    };
    return basketdata;
})();

///<reference path='ui.ts'/>
///<reference path='../../../../lib/modules/draggable.ts'/>
///<reference path='../../../../lib/modules/units.ts'/>
///<reference path='basketdata.ts'/>
///<reference path='../../../../lib/external/jquery.d.ts'/>
var basket = (function () {
  function basket(data) {
    var self = this;

    self.$basket = $(
      '<div class="basket" >' +
        '<div class="test" ></div>' +
        '<div class="linked-icon" ></div >' +
        '<div class="hidden-on-runtime-icon" ></div >' +
        '<div class="text-parent" ><span class="text" ></span></div>' +
        '<div class="n-handle" ></div ><div class="e-handle" ></div><div class="s-handle" ></div><div class="w-handle" ></div><div class="se-handle" ></div>' +
      '</div>');
    self.InitId(data);
    self.$linkedIcon = self.$basket.find('.linked-icon');
    self.$basket.append('<div class="background"></div>');

    if (data.realTimeCreation)
      self.$basket.addClass('active');

    self.$basket.css({
      top: data.top,
      left: data.left,
      height: data.height + 'px',
      width: data.width + 'px',
      'border-color': wizard.basketBorderColor,
      'opacity': wizard.basketOpacity,
    });
    self.$basket.appendTo($('.stage'));

    self.$backColor = self.$basket.find('.background');
    self.$backColor.css('background-color', wizard.basketBackgroundColor);

    self.$text = self.$basket.find('.text');
    self.image = data.image;
    self.text = data.text;
    self.color = data.color;

    self.draggie = new draggable(self.$basket, '.stage');
    UI.setAsResizable(self.$basket, '.stage', false);
    self.$basket.on('resizeend', function () {
      self.draggie.setScaledDimentions();
    })
    self.$basket.on('mousedown', function (e) {
      e.stopPropagation();
      $.proxy(self.activate, self)();
      //return false;
    });

    self.$basket.on('mouseup', $.proxy(self.bubbleMouseUpToUnderlyingElement, self));
    self._units = new cet.Units.units(self.$basket);


    self.hiddenOnRuntime = data.hiddenOnRuntime;
  }

  Object.defineProperty(basket.prototype, "hiddenOnRuntime", {
    get: function () {
      return this.$basket.hasClass('hidden-on-runtime');
    },
    set: function (val) {
      if (val) {
        this.$basket.addClass('hidden-on-runtime');
      }
      else {
        this.$basket.removeClass('hidden-on-runtime');
      }

      this.change();
    },
    enumerable: true,
    configurable: true
  });


  Object.defineProperty(basket.prototype, "id", {
    get: function () {
      return this.$basket.attr('id');
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "units", {
    get: function () {
      return this._units;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "image", {
    get: function () {
      //return this.$backColor.css('background-image'); //.replace(/url\(/g, '').replace(')', '').replace(/\"/g, '');
      return this.$backColor.css('background-image').replace(/url\(/g, '').slice(0, -1);
    },
    set: function (val) {
      if (val && val.indexOf('none') == -1)
        this.$backColor.css('background-image', 'url(' + '"' + val.replace(/\"/g, '') + '"' + ')');
      else
        this.$backColor.css('background-image', 'none');

      this.change();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "text", {
    get: function () {
      return this.$text.text();
    },
    set: function (val) {
      this.$text.text(val);
      this.change();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "color", {
    get: function () {
      return this.$text.css('color');
    },
    set: function (val) {
      this.$text.css('color', val);
      this.change();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "opacity", {
    get: function () {
      return this.$basket.css('opacity');
    },
    set: function (val) {
      this.$basket.css('opacity', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "backgroundColor", {
    set: function (val) {
      this.$backColor.css('background-color', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "borderColor", {
    set: function (val) {
      this.$basket.css('border-color', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(basket.prototype, "data", {
    get: function () {
      return new basketdata(this._units.pixel.top, this._units.pixel.left, this._units.pixel.height, this._units.pixel.width, true, this.text, this.image, this.id, this.color);
    },
    enumerable: true,
    configurable: true
  });

  basket.prototype.bubbleMouseUpToUnderlyingElement = function (e) {
    if (e.clientX != undefined && e.clientY != undefined) {
      this.$basket.hide();
      $(document.elementFromPoint(e.clientX, e.clientY)).trigger("mouseup");
      this.$basket.show();
    }
    wizard.changesDone();
  };
  basket.prototype.InitId = function (data) {
    var id = data.id;
    if (!id) {
      var index = $('.basket').length;
      while (!id) {
        if ($('#basket-' + index).length == 0)
          id = 'basket-' + index;
        index = index + 1;
      }
    }
    this.$basket.attr('id', id);
  };

  basket.prototype.initChangesListener = function () {
    if (typeof MutationObserver == 'undefined')
      return;

    var self = this;

    var observer, callback;
    callback = function (recordqueue) {
      //setTimeout(function () { if (self._onChanged) self._onChanged(self); }, 1);
      setTimeout(function () {
        self.$basket.trigger('change', self);
      }, 1);
    };
    observer = new MutationObserver(callback);

    var options = {
      'childList': true,
      'attributes': true
    };

    observer.observe(this.$basket[0], options);
  };

  basket.prototype.change = function () {
    this.$basket.trigger('change', this);
  };

  basket.prototype.getOptionBasketsIds = function (link) {
    var ids = [];

    for (var i = 0; link && i < link.baskets.length; i++) {
      ids.push(link.baskets[i].id);
    }
    if (ids.length == 0)
      ids.push(this.id);

    //var group = Groups.getGroupByBasketId(this.id);
    var groups = Groups.getGroupsByBasketIds(ids);

    for (var j = 0; groups && j < groups.length; j++) {
      var group = groups[j];
      for (var i = 0; i < group.baskets.length; i++) {
        var candidateBasketId = group.baskets[i];
        if (ids.indexOf(candidateBasketId) == -1)
          ids.push(candidateBasketId);
      }
    }

    return ids;
  };

  basket.prototype.activate = function () {
    if (this.$basket.hasClass('active'))
      return;

    this.$basket.addClass('active');
    this.$basket.trigger('active', this);
  };

  basket.prototype.toJson = function () {
    return {
      id: this.id,
      width: this.units.percentage.width,
      height: this.units.percentage.height,
      top: this.units.percentage.top,
      left: this.units.percentage.left,
      backgroundColor: wizard.basketBackgroundColor,
      borderColor: wizard.basketBorderColor,
      color: this.color,
      opacity: wizard.basketOpacity,//(wizard.basketOpacity == 0.1) ? 0 : wizard.basketOpacity,//
      text: this.text,
      image: this.image,
      hiddenOnRuntime: this.hiddenOnRuntime
    };
  };

  basket.prototype.toOptionJson = function () {
    var link = Links.getLinkByBasket(this);
    var basketIds = this.getOptionBasketsIds(link);
    var optionId = link ? link.generateOptionId() : this.generateOptionId();

    return {
      text: this.text,
      color: this.color,
      id: optionId,
      sound: "",
      image: this.image,
      baskets: basketIds,
      isLinked: link ? true : false
    };
  };

  basket.prototype.generateOptionId = function () {
    return this.id.replace('basket', 'option');
  };

  basket.prototype.deactivate = function () {
    this.$basket.removeClass('active');
  };

  basket.prototype.isActive = function () {
    return this.$basket.hasClass('active');
  };

  basket.prototype.delete = function () {
    this.$basket.remove();
  };

  basket.prototype.clone = function () {
    var data = this.data;
    data.top = data.top + 5;
    data.left = data.left + 5;
    data.id = null;
    var newBasket = Baskets.createNewBasket(null, null, data);
    Baskets.deactivateAllBasketsExceptMe(newBasket);
    newBasket.activate();
    Properties.setActiveComponent(newBasket);
    return newBasket;
  };

  basket.prototype.cloneAsLinked = function () {
    var data = this.data;
    data.top = data.top + 5;
    data.left = data.left + 5;
    data.id = null;
    var newBasket = Baskets.createNewBasket(null, null, data);
    Links.addBasket(newBasket);

    Baskets.deactivateAllBasketsExceptMe(newBasket);

    newBasket.activate();
    Properties.setActiveComponent(newBasket);
    return newBasket;
  };

  basket.prototype.on = function (event, callback) {
    this.$basket.on(event, callback);
  };

  basket.prototype.off = function (event, callback) {
    if (typeof event === "undefined") { event = null; }
    if (typeof callback === "undefined") { callback = null; }
    this.$basket.off(event, callback);
  };

  basket.prototype.hideLinkedIcon = function () {
    this.$linkedIcon.hide();
  };

  basket.prototype.showLinkedIcon = function () {
    this.$linkedIcon.show();
  };

  basket.prototype.isLinked = function () {
    return Links.getLinkByBasket(this) != null;

  };

  return basket;
})();


var Baskets;
(function (Baskets) {
    var baskets = [];

    function deactivateAllBasketsExceptMe(me) {
        for (var i = 0; i < baskets.length; i++) {
            if (baskets[i].id == me.id)
                continue;
            baskets[i].deactivate();
        }
    }
    Baskets.deactivateAllBasketsExceptMe = deactivateAllBasketsExceptMe;

    function getActiveBasket() {
        for (var i = 0; i < baskets.length; i++) {
            if (baskets[i].isActive())
                return baskets[i];
        }
    }
    Baskets.getActiveBasket = getActiveBasket;

    function removeActiveBasket() {
        for (var i = 0; i < baskets.length; i++) {
            if (baskets[i].isActive()) {
                Links.removeBasket(baskets[i]);
                baskets[i].delete();
                baskets.splice(i, 1);
                return;
            }
        }
    }
    Baskets.removeActiveBasket = removeActiveBasket;

    function getBasketById(id) {
        for (var i = 0; i < baskets.length; i++) {
            if (baskets[i].id == id)
                return baskets[i];
        }
    }
    Baskets.getBasketById = getBasketById;

    function cloneActiveBasket() {
        var activeBasket = Baskets.getActiveBasket();
        if (!activeBasket)
            return;
        var data = activeBasket.data;
        data.top = data.top + 5;
        data.left = data.left + 5;
        var newBasket = Baskets.createNewBasket(null, null, data);
        deactivateAllBasketsExceptMe(newBasket);
    }
    Baskets.cloneActiveBasket = cloneActiveBasket;

    function createNewBasketFromJson(basketJson) {
      var data = new basketdata(basketJson.top, basketJson.left, basketJson.height, basketJson.width, false, basketJson.text, basketJson.image, basketJson.id, basketJson.color, basketJson.hiddenOnRuntime);
        data.toPixels();

        supprtOldJsonSchema(data, basketJson);

        return createNewBasket(undefined, undefined, data);
    }
    Baskets.createNewBasketFromJson = createNewBasketFromJson;

    function supprtOldJsonSchema(data, basketJson) {
        if (!data.text && !data.image) {
            var option = preset.getBasketOptionById(basketJson.id);
            data.text = option.text;
            data.image = option.image;
        }
    }

    function createNewBasket(top, left, basketData) {
        if (typeof basketData === "undefined") { basketData = new basketdata(top, left); }
        Stage.fixComponentOverflow(basketData);
        basketData.color = Properties.color;

        var newBasket = new basket(basketData);

        //newBasket.on('active', function (e, activatedBasket) {
        // deactivateAllBasketsExceptMe(activatedBasket);
        // Properties.setActiveComponent(activatedBasket);
        // //Links.refresh();
        //});
        //if (basketData.realTimeCreation)
        // Properties.setActiveComponent(newBasket);
        baskets.push(newBasket);

        return newBasket;
    }
    Baskets.createNewBasket = createNewBasket;

    function getBaskets() {
        return baskets;
    }
    Baskets.getBaskets = getBaskets;
})(Baskets || (Baskets = {}));

///<reference path='stage.ts' />
var groupdata = (function () {
    function groupdata(top, left, height, width, realTimeCreation, text, image, id, baskets, color) {
        if (typeof height === "undefined") { height = 240; }
        if (typeof width === "undefined") { width = 290; }
        if (typeof realTimeCreation === "undefined") { realTimeCreation = true; }
        if (typeof text === "undefined") { text = ''; }
        if (typeof image === "undefined") { image = ''; }
        if (typeof id === "undefined") { id = null; }
        if (typeof baskets === "undefined") { baskets = null; }
        if (typeof color === "undefined") { color = null; }
        this.top = top;
        this.left = left;
        this.height = height;
        this.width = width;
        this.realTimeCreation = realTimeCreation;
        this.text = text;
        this.image = image;
        this.id = id;
        this.baskets = baskets;
        this.color = color;
    }
    groupdata.prototype.toPixels = function () {
        this.height = cet.Units.Utils.percentageToPixel(this.height, Stage.height);
        this.width = cet.Units.Utils.percentageToPixel(this.width, Stage.width);

        this.top = cet.Units.Utils.percentageToPixel(this.top, Stage.height);
        this.left = cet.Units.Utils.percentageToPixel(this.left, Stage.width);
    };
    return groupdata;
})();

///<reference path='../../../../lib/modules/units.ts' />
///<reference path='groupdata.ts' />
var group = (function () {
    function group(data) {
        var self = this;

        self.$group = $('<div class="group" ><div class="test"></div><div class="linked-icon"></div><div class="n-handle"></div><div class="e-handle"></div><div class="s-handle"></div><div class="w-handle"></div><div class="se-handle"></div></div>');
        self.InitId(data);
        self.baskets = data.baskets;
        
        self.$group.append('<div class="background"></div>');

        if (data.realTimeCreation)
            this.$group.addClass('active');

        self.$group.css({
            top: data.top,
            left: data.left,
            height: data.height + 'px',
            width: data.width + 'px',
            'border-color': wizard.groupBorderColor,
            'opacity': wizard.groupOpacity
        });

        self.$group.appendTo($('.stage'));
        self.$backColor = self.$group.find('.background');
        self.$backColor.css('background-color', wizard.groupBackgroundColor);
        self.image = data.image;

        self.draggie = new draggable(self.$group, '.stage');
        UI.setAsResizable(self.$group, '.stage', false);
        self.$group.on('resizeend', function () {
          self.draggie.setScaledDimentions();
        })
        self.$group.on('mousedown', function (e) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $.proxy(self.activate, self)();
            }
            e.stopPropagation();
            return false;
        });
        self.$group.on('mouseup', wizard.changesDone);
        
        self._units = new cet.Units.units(self.$group);
    }
    Object.defineProperty(group.prototype, "id", {
        get: function () {
            return this.$group.attr('id');
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "units", {
        get: function () {
            return this._units;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "image", {
        get: function () {
            return this.$backColor.css('background-image').replace(/url\(/g, '').replace(')', '').replace(/\"/g, '');
        },
        set: function (val) {
            if (val && val.indexOf('none') == -1)
                this.$backColor.css('background-image', 'url(' + val + ')');
            else
                this.$backColor.css('background-image', 'none');

            this.change();
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "opacity", {
        get: function () {
            return this.$group.css('opacity');
        },
        set: function (val) {
            this.$group.css('opacity', val);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "backgroundColor", {
        set: function (val) {
            this.$backColor.css('background-color', val);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "borderColor", {
        set: function (val) {
            this.$group.css('border-color', val);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(group.prototype, "data", {
        get: function () {
            //constructor(top: number, left: number, height: number = 94, width: number = 118, realTimeCreation: boolean = true, text: string = '', image: string = '', id: string = null, options: string[]= null, color: string = null) {
            return new groupdata(this._units.pixel.top, this._units.pixel.left, this._units.pixel.height, this._units.pixel.width, true, this.text, this.image, this.id, this.options, this.color);
        },
        enumerable: true,
        configurable: true
    });

    group.prototype.InitId = function (data) {
        var id = data.id;
        if (!id) {
            var index = $('.group').length;
            while (!id) {
                if ($('#group-' + index).length == 0)
                    id = 'group-' + index;
                index = index + 1;
            }
        }
        this.$group.attr('id', id);
    };

    group.prototype.initChangesListener = function () {
        if (typeof MutationObserver == 'undefined')
            return;

        var self = this;

        var observer, callback;
        callback = function (recordqueue) {
            //setTimeout(function () { if (self._onChanged) self._onChanged(self); }, 1);
            setTimeout(function () {
                self.$group.trigger('change', self);
            }, 1);
        };
        observer = new MutationObserver(callback);

        var options = {
            'childList': true,
            'attributes': true
        };

        observer.observe(this.$group[0], options);
    };

    group.prototype.change = function () {
        this.$group.trigger('change', this);
    };

    group.prototype.activate = function () {
        if (!this.$group.hasClass('active'))
            this.$group.addClass('active');
        this.$group.trigger('active', this);
    };

    group.prototype.resolveBaskets = function () {
        var self = this;

        self.baskets = [];
        var allBaskets = Baskets.getBaskets();

        for (var i = 0; i < allBaskets.length; i++) {
            var basket = allBaskets[i];
            if (basket.units.pixel.left < self.units.pixel.left)
                continue;
            if (basket.units.pixel.left > self.units.pixel.right)
                continue;
            if (basket.units.pixel.top < self.units.pixel.top)
                continue;
            if (basket.units.pixel.top > self.units.pixel.bottom)
                continue;

            self.baskets.push(basket.id);
        }
        return self.baskets;
    };

    group.prototype.deactivate = function () {
        this.$group.removeClass('active');
    };

    group.prototype.isActive = function () {
        return this.$group.hasClass('active');
    };

    group.prototype.delete = function () {
        this.$group.remove();
    };

    group.prototype.clone = function () {
        var data = this.data;
        data.top = data.top + 5;
        data.left = data.left + 5;
        data.id = null;
        var newGroup = Groups.createNewGroup(null, null, data);
        Groups.deactivateAllGroupsExceptMe(newGroup);
        newGroup.activate();
        Properties.setActiveComponent(newGroup);
        return newGroup;
    };

    group.prototype.on = function (event, callback) {
        this.$group.on(event, callback);
    };

    group.prototype.off = function (event, callback) {
        this.$group.off(event, callback);
    };

    group.prototype.containsBasket = function (basketId) {
        if (!this.baskets)
            return;

        for (var i = 0; i < this.baskets.length; i++) {
            if (this.baskets[i] == basketId)
                return true;
        }
        return false;
    };

    group.prototype.toJson = function () {
        return {
            id: this.id,
            width: Math.round(this.units.percentage.width),
            height: Math.round(this.units.percentage.height),
            top: Math.round(this.units.percentage.top),
            left: Math.round(this.units.percentage.left),
            backgroundColor: wizard.groupBackgroundColor,
            borderColor: wizard.groupBorderColor,
            opacity: wizard.groupOpacity,
            baskets: this.resolveBaskets()
        };
    };

    group.prototype.hasBaskets = function () {
     
      return this.baskets && this.baskets.length > 0;
    };

    group.prototype.hasHiddenBasket = function () {

      if (!this.baskets || this.baskets.length == 0)
        return false;
      for (var i = 0; i < this.baskets.length; i++) {
        var basket = Baskets.getBasketById(this.baskets[i]);
        if (basket.hiddenOnRuntime)
          return true;
      }
      return false;
    };

    return group;
})();


var Groups;
(function (Groups) {
  var groups = [];

  function getActiveGroup() {
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].isActive())
        return groups[i];
    }
  }
  Groups.getActiveGroup = getActiveGroup;

  function deactivateAllGroupsExceptMe(me) {
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].id == me.id)
        continue;
      groups[i].deactivate();
    }
  }
  Groups.deactivateAllGroupsExceptMe = deactivateAllGroupsExceptMe;

  function removeActiveGroup() {
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].isActive()) {
        groups[i].delete();
        groups.splice(i, 1);
        return;
      }
    }
  }
  Groups.removeActiveGroup = removeActiveGroup;

  function createNewGroup(top, left, groupData) {
    /*
    
    var active = getActiveBasket();
    if (active) {
    LinkedBaskets.deactivateactiveLink();
    active.deactivate();
    
    Properties.removeActiveComponent();
    return;
    }
    var basketData = new basketdata(e.pageY - $stage.offset().top, e.pageX - $stage.offset().left);
    
    
    
    fixOverflowBaskets(basketData);
    basketData.color = Properties.color;
    createNewBasket(basketData);
    */
    if (typeof groupData === "undefined") { groupData = new groupdata(top, left); }
    //fixOverflowGroups(groupData);
    //groupData.color = groupProperties.color;
    Stage.fixComponentOverflow(groupData);
    var newGroup = new group(groupData);

    //newGroup.on('active', function (e, activatedGroup) {
    // Groups.deactivateAllGroupsExceptMe(activatedGroup);
    // Properties.setActiveComponent(activatedGroup);
    //});
    //if (groupData.realTimeCreation)
    // Properties.setActiveComponent(newGroup);
    newGroup.on('active', Stage.componentActivatedHandler);
    groups.push(newGroup);

    return newGroup;
  }
  Groups.createNewGroup = createNewGroup;

  function getGroups() {
    return groups;
  }
  Groups.getGroups = getGroups;

  function getGroupsByBasketIds(basketIds) {
    var result = [];

    for (var i = 0; i < basketIds.length; i++) {
      var group = getGroupByBasketId(basketIds[i]);
      var found = false;
      for (var j = 0; group && j < result.length; j++) {
        if (result[j].id == group.id)
          found = true;
      }
      if (!found && group)
        result.push(group);
    }
    return result;
  }
  Groups.getGroupsByBasketIds = getGroupsByBasketIds;

  function getGroupByBasketId(basketId) {
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].containsBasket(basketId))
        return groups[i];
    }
  }
  Groups.getGroupByBasketId = getGroupByBasketId;

  function resolveBaskets() {
    for (var i = 0; i < groups.length; i++) {
      groups[i].resolveBaskets();
    }
  }
  Groups.resolveBaskets = resolveBaskets;

  function emptyGroupExists() {
    resolveBaskets();
    for (var i = 0; i < groups.length; i++) {
      
      if (!groups[0].hasBaskets())
        return true;
    }
    return false;

  }
  Groups.emptyGroupExists = emptyGroupExists;

  function groupWithHiddenBasketExists() {
    resolveBaskets();
    for (var i = 0; i < groups.length; i++) {

      if (groups[0].hasHiddenBasket())
        return true;
    }
    return false;

  }
  Groups.groupWithHiddenBasketExists = groupWithHiddenBasketExists;
  
})(Groups || (Groups = {}));

///<reference path='stage.ts' />
var mediadata = (function () {
    function mediadata(top, left, height, width, realTimeCreation, text, image, id, color) {
        if (typeof height === "undefined") { height = 70; }
        if (typeof width === "undefined") { width = 250; }
        if (typeof realTimeCreation === "undefined") { realTimeCreation = true; }
        if (typeof text === "undefined") { text = ''; }
        if (typeof image === "undefined") { image = ''; }
        if (typeof id === "undefined") { id = null; }
        if (typeof color === "undefined") { color = null; }
        this.top = top;
        this.left = left;
        this.height = height;
        this.width = width;
        this.realTimeCreation = realTimeCreation;
        this.text = text;
        this.image = image;
        this.id = id;

        this.color = color;
    }
    mediadata.prototype.toPixels = function () {
        this.height = cet.Units.Utils.percentageToPixel(this.height, Stage.height);
        this.width = cet.Units.Utils.percentageToPixel(this.width, Stage.width);

        this.top = cet.Units.Utils.percentageToPixel(this.top, Stage.height);
        this.left = cet.Units.Utils.percentageToPixel(this.left, Stage.width);
    };
    return mediadata;
})();

///<reference path='../../../../lib/modules/units.ts' />
///<reference path='mediadata.ts' />
var media = (function () {
  function media(data) {
    var self = this;

    self.$media = $('<div class="media" ><div class="test"></div><div class="linked-icon"></div><div class="n-handle"></div><div class="e-handle"></div><div class="s-handle"></div><div class="w-handle"></div><div class="se-handle"></div></div>');
    self.InitId(data);
    self.baskets = data.baskets;

    self.$media.append('<div class="background"></div>');

    if (data.realTimeCreation)
      self.$media.addClass('active');

    self.$media.append('<div class="text-parent" ><span class="text" ></span></div>');
    self.$text = self.$media.find('.text');
    self.text = data.text;
    self.$media.css({
      top: data.top,
      left: data.left,
      height: data.height + 'px',
      width: data.width + 'px',
      'border-color': wizard.mediaBorderColor,
      'opacity': wizard.mediaOpacity
    });

    self.$media.appendTo($('.stage'));
    self.$backColor = self.$media.find('.background');
    self.$backColor.css('background-color', wizard.mediaBackgroundColor);
    self.image = data.image;
    self.color = data.color;

    self.draggie = new draggable(self.$media, '.stage');
    UI.setAsResizable(self.$media, '.stage', false);
    self.$media.on('resizeend', function () {
      self.draggie.setScaledDimentions();
    })

    self.$media.on('mousedown', function (e) {
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        $.proxy(self.activate, self)();
      }
      e.stopPropagation();
      return false;
    });
    self.$media.on('mouseup', wizard.changesDone);
    self._units = new cet.Units.units(self.$media);
  }
  Object.defineProperty(media.prototype, "id", {
    get: function () {
      return this.$media.attr('id');
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "units", {
    get: function () {
      return this._units;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "image", {
    get: function () {
      //var url = this.$backColor.css('background-image'); //.replace(/url\(/g, '').replace(')', '').replace(/\"/g, '');
      var url = this.$backColor.css('background-image').replace(/url\(/g, '').slice(0, -1);
      return url == 'none' ? null : url;
    },
    set: function (val) {
      if (val && val.indexOf('none') == -1)
        this.$backColor.css('background-image', 'url(' + '"' + val.replace(/\"/g, '') + '"' + ')');
      else
        this.$backColor.css('background-image', 'none');

      this.change();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "opacity", {
    get: function () {
      return this.$media.css('opacity');
    },
    set: function (val) {
      this.$media.css('opacity', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "backgroundColor", {
    set: function (val) {
      this.$backColor.css('background-color', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "borderColor", {
    set: function (val) {
      this.$media.css('border-color', val);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "data", {
    get: function () {
      //constructor(top: number, left: number, height: number = 94, width: number = 118, realTimeCreation: boolean = true, text: string = '', image: string = '', id: string = null, options: string[]= null, color: string = null) {
      return new mediadata(this._units.pixel.top, this._units.pixel.left, this._units.pixel.height, this._units.pixel.width, true, this.text, this.image, this.id, this.color);
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "text", {
    get: function () {
      return this.$text.text();
    },
    set: function (val) {
      this.$text.text(val);
      this.change();
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(media.prototype, "color", {
    get: function () {
      return cet.Utils.rgb2hex(this.$text.css('color'));
    },
    set: function (val) {
      this.$text.css('color', val);
      this.change();
    },
    enumerable: true,
    configurable: true
  });

  media.prototype.InitId = function (data) {
    var id = data.id;
    if (!id) {
      var index = $('.media').length;
      while (!id) {
        if ($('#media-' + index).length == 0)
          id = 'media-' + index;
        index = index + 1;
      }
    }
    this.$media.attr('id', id);
  };

  media.prototype.initChangesListener = function () {
    if (typeof MutationObserver == 'undefined')
      return;

    var self = this;

    var observer, callback;
    callback = function (recordqueue) {
      //setTimeout(function () { if (self._onChanged) self._onChanged(self); }, 1);
      setTimeout(function () {
        self.$media.trigger('change', self);
      }, 1);
    };
    observer = new MutationObserver(callback);

    var options = {
      'childList': true,
      'attributes': true
    };

    observer.observe(this.$media[0], options);
  };

  media.prototype.change = function () {
    this.$media.trigger('change', this);
  };

  media.prototype.activate = function () {
    if (!this.$media.hasClass('active'))
      this.$media.addClass('active');
    this.$media.trigger('active', this);
  };

  media.prototype.resolveBaskets = function () {
    var self = this;

    self.baskets = [];
    var allBaskets = Baskets.getBaskets();

    for (var i = 0; i < allBaskets.length; i++) {
      var basket = allBaskets[i];
      if (basket.units.pixel.left < self.units.pixel.left)
        continue;
      if (basket.units.pixel.left > self.units.pixel.right)
        continue;
      if (basket.units.pixel.top < self.units.pixel.top)
        continue;
      if (basket.units.pixel.top > self.units.pixel.bottom)
        continue;

      self.baskets.push(basket.id);
    }
    return self.baskets;
  };

  media.prototype.deactivate = function () {
    this.$media.removeClass('active');
  };

  media.prototype.isActive = function () {
    return this.$media.hasClass('active');
  };

  media.prototype.delete = function () {
    this.$media.remove();
  };

  media.prototype.clone = function () {
    var data = this.data;
    data.top = data.top + 5;
    data.left = data.left + 5;
    data.id = null;
    var newMedia = Medias.createNewMedia(null, null, data);
    Medias.deactivateAllMediasExceptMe(newMedia);
    newMedia.activate();
    Properties.setActiveComponent(newMedia);
    return newMedia;
  };

  media.prototype.on = function (event, callback) {
    this.$media.on(event, callback);
  };

  media.prototype.off = function (event, callback) {
    this.$media.off(event, callback);
  };

  media.prototype.containsBasket = function (basketId) {
    if (!this.baskets)
      return;

    for (var i = 0; i < this.baskets.length; i++) {
      if (this.baskets[i] == basketId)
        return true;
    }
    return false;
  };

  media.prototype.toJson = function () {
    return {
      id: this.id,
      width: Math.round(this.units.percentage.width),
      height: Math.round(this.units.percentage.height),
      top: Math.round(this.units.percentage.top),
      left: Math.round(this.units.percentage.left),
      backgroundColor: wizard.mediaBackgroundColor,
      borderColor: wizard.mediaBorderColor,
      opacity: wizard.mediaOpacity,
      text: this.text,
      image: this.image,
      color: this.color
    };
  };
  return media;
})();

///<reference path='mediadata.ts' />
///<reference path='media.ts' />
///<reference path='stage.ts' />
///<reference path='properties.ts' />
var Medias;
(function (Medias) {
    var medias = [];

    function getActiveMedia() {
        for (var i = 0; i < medias.length; i++) {
            if (medias[i].isActive())
                return medias[i];
        }
    }
    Medias.getActiveMedia = getActiveMedia;

    function deactivateAllMediasExceptMe(me) {
        for (var i = 0; i < medias.length; i++) {
            if (medias[i].id == me.id)
                continue;
            medias[i].deactivate();
        }
    }
    Medias.deactivateAllMediasExceptMe = deactivateAllMediasExceptMe;

    function removeActiveMedia() {
        for (var i = 0; i < medias.length; i++) {
            if (medias[i].isActive()) {
                medias[i].delete();
                medias.splice(i, 1);
                return;
            }
        }
    }
    Medias.removeActiveMedia = removeActiveMedia;

    function createNewMedia(top, left, mediaData) {
        /*
        
        var active = getActiveBasket();
        if (active) {
        LinkedBaskets.deactivateactiveLink();
        active.deactivate();
        
        Properties.removeActiveComponent();
        return;
        }
        var basketData = new basketdata(e.pageY - $stage.offset().top, e.pageX - $stage.offset().left);
        
        
        
        fixOverflowBaskets(basketData);
        basketData.color = Properties.color;
        createNewBasket(basketData);
        */
        if (typeof mediaData === "undefined") { mediaData = new mediadata(top, left); }
        //fixOverflowMedias(mediaData);
        //mediaData.color = mediaProperties.color;
        Stage.fixComponentOverflow(mediaData);
        var newMedia = new media(mediaData);

        //newMedia.on('active', function (e, activatedMedia) {
        // Medias.deactivateAllMediasExceptMe(activatedMedia);
        // Properties.setActiveComponent(activatedMedia);
        //});
        //if (mediaData.realTimeCreation)
        // Properties.setActiveComponent(newMedia);
        newMedia.on('active', Stage.componentActivatedHandler);
        medias.push(newMedia);

        return newMedia;
    }
    Medias.createNewMedia = createNewMedia;

    function getMedias() {
        return medias;
    }
    Medias.getMedias = getMedias;
})(Medias || (Medias = {}));

///<reference path='../../../../lib/external/jquery.d.ts'/>
var Properties;
(function (Properties) {
  var $text;
  var $innerText;
  var $textDisableMask;
  var $width;
  var $height;
  var $top;
  var $left;
  var $image;
  var $color;
  var $element;
  var $disableMask;
  var $file;
  var stageDimentions;
  var $btnDuplicateLinked;
  var $cbIsDistractingOption;

  var basketStoragePreview;
  var activeComponent;

  var keyCodes = { del: 46, left: 37, up: 38, right: 39, down: 40, i: 73, enter: 13, b: 66, c: 67 };

  $(function () {
    $element = $('.properties');
    $disableMask = $('.properties-disable-mask');

    $text = $('.properties .text-input .input');
    $textDisableMask = $('.properties .text-disable-mask');
    $color = $('.properties .text-input .color');
    $width = $('.properties .width-input  input');
    $height = $('.properties .height-input  input');
    $top = $('.properties .top-input  input');
    $left = $('.properties .left-input  input');
    $btnDuplicateLinked = $('#component-duplicate-linked');

    $isDistractingOptionContainer = $('.properties .is-distracting-option');
    $cbIsDistractingOption = $isDistractingOptionContainer.find('input');

    var $stage = $('.stage');
    stageDimentions = { width: $stage.width(), height: $stage.height() };


    basketStoragePreview = (function () {
      var $_element = $element.find('.basket-storage-preview');
      var $_background = $_element.find('.background');
      var $_text = $_element.find('.text');
      return {


        text: function (val) {
          $_text.text(val);
        },
        image: function (val) {
          if (val && val.indexOf('none') == -1)
            $_background.css('background-image', 'url(' + '"' + val + '"' + ')');
          else
            $_background.css('background-image', 'none');
        },
        show: function () {
          $_element.show();
        },
        hide: function () {
          $_element.hide();
        }
      }

    })();



    $text.on('keyup', function (e) {
      if (activeComponent) {
        activeComponent.text = Properties.text;
        basketStoragePreview.text(Properties.text);
        wizard.changesDone();
      }
    });

    $text.on("paste", function (e) {
      e.preventDefault();

      var text;
      var clp = (e.originalEvent || e).clipboardData;
      if (clp === undefined || clp === null) {

        text = window.clipboardData.getData("text") || "";
        if (text !== "") {
          if (window.getSelection) {
            var selection = getSelection();
            var range = selection.getRangeAt(0);
            var newNode = document.createElement("span");
            newNode.innerHTML = text;
            range.deleteContents();
            range.insertNode(newNode);
          } else {
            document.selection.createRange().pasteHTML(text);
          }
        }
      } else {
        text = clp.getData('text/plain') || "";
        if (text !== "") {
          document.execCommand('insertText', false, text);
        }
      }
    });

    $width.on('change', function () {
      if (activeComponent) {
        var newWidth = parseInt($width.val());
        if (withinStageDimentions(null, null, newWidth, null))
          activeComponent.units.pixel.width = newWidth;
        else
          $width.val(activeComponent.units.pixel.width);
        wizard.changesDone();
      }
    });
    $height.on('change', function () {
      if (activeComponent) {
        var newHeight = parseInt($height.val());
        if (withinStageDimentions(null, null, null, newHeight))
          activeComponent.units.pixel.height = newHeight;
        else
          $height.val(activeComponent.units.pixel.height);
        wizard.changesDone();
      }
    });
    $top.on('change', function () {
      if (activeComponent) {
        var newTop = parseInt($top.val());
        if (withinStageDimentions(null, newTop, null, null))
          activeComponent.units.pixel.top = newTop;
        else
          $top.val(activeComponent.units.pixel.top);
        wizard.changesDone();
      }
    });
    $left.on('change', function () {
      if (activeComponent) {
        var newLeft = parseInt($left.val());
        if (withinStageDimentions(newLeft, null, null, null))
          activeComponent.units.pixel.left = newLeft;
        else
          $left.val(activeComponent.units.pixel.left);
        wizard.changesDone();
      }
    });
    $color.on('change', function (color) {
      var sColor = '#' + $color[0].color.toString();
      color = sColor;
      if (activeComponent) {
        activeComponent.color = sColor;
      }
      wizard.changesDone();
    });
    $text.on('keydown', function (e) {
      e.stopPropagation();
    });
    $width.on('keydown', function (e) {
      if (e.keyCode == keyCodes.enter) {

        $width.trigger('change');
        return;
      }
      e.stopPropagation();
    });
    $height.on('keydown', function (e) {
      if (e.keyCode == keyCodes.enter) {
        $height.trigger('change');
        return;
      }
      e.stopPropagation();
    });
    $top.on('keydown', function (e) {
      if (e.keyCode == keyCodes.enter) {
        $top.trigger('change');
        return;
      }
      e.stopPropagation();
    });
    $left.on('keydown', function (e) {
      if (e.keyCode == keyCodes.enter) {
        $left.trigger('change');
        return;
      }
      e.stopPropagation();
    });
    $color.on('keydown', function (e) {
      e.stopPropagation();
    });

    imageUploadHandler();

    $(document).on('keydown', function (e) {
      if (!activeComponent)
        return;

      if (e.keyCode == keyCodes.del) {
        Stage.removeActiveComponent();
      }
      if (e.keyCode == keyCodes.right) {
        activeComponent.units.pixel.left = activeComponent.units.pixel.left + 1;
        e.preventDefault();
        wizard.changesDone();
      }
      if (e.keyCode == keyCodes.left) {
        activeComponent.units.pixel.left = activeComponent.units.pixel.left - 1;
        e.preventDefault();
        wizard.changesDone();
      }
      if (e.keyCode == keyCodes.up) {
        activeComponent.units.pixel.top = activeComponent.units.pixel.top - 1;
        e.preventDefault();
        wizard.changesDone();
      }
      if (e.keyCode == keyCodes.down) {
        activeComponent.units.pixel.top = activeComponent.units.pixel.top + 1;
        e.preventDefault();
        wizard.changesDone();
      }
    });

    $('#component-delete').on('mouseup touchend', function () {
      Stage.removeActiveComponent();
      wizard.changesDone();
    });
    $('#component-duplicate').on('click', function () {
      Stage.cloneActiveComponent();
      wizard.changesDone();
    });
    $btnDuplicateLinked.on('click', function () {
      Stage.cloneActiveBasketAsLinked();
      wizard.changesDone();
    });
    $cbIsDistractingOption.on('change', function () {
      if (activeComponent) {
        activeComponent.hiddenOnRuntime = $cbIsDistractingOption.is(':checked');
        setDuplicateLinkedButtonVisibility();
        wizard.changesDone();
      }
    });
  });

  function withinStageDimentions(newLeft, newTop, newWidth, newHeight) {
    if (newLeft) {
      if ((newLeft + activeComponent.units.pixel.width) > stageDimentions.width)
        return false;
    }
    if (newTop) {
      if ((newTop + activeComponent.units.pixel.height) > stageDimentions.height)
        return false;
    }
    if (newWidth) {
      if ((newWidth + activeComponent.units.pixel.left) > stageDimentions.width)
        return false;
    }
    if (newHeight) {
      if ((newHeight + activeComponent.units.pixel.top) > stageDimentions.height)
        return false;
    }
    return true;
  }

  function imageUploadHandler() {
    var self = this;
    $file = $('.properties .image-input  input[type=file]');
    var $submit = $('.properties .image-input  input[type=submit]');
    var $body = $("body");
    var myUpload = false;
    $file.on('change', function () {
      myUpload = true;
      $body.css("cursor", "progress");
      $submit.click();
    });

    window.addEventListener("message", function (e) {
      if (e.data.substring(0, 12) == "file-upload:" && myUpload) {
        var fileInfo = jQuery.parseJSON(e.data.substring(12));
        if (fileInfo.files[0].errorCode == 'file_too_big') {
          alert("לא ניתן להעלות תמונות גדולות מKB-500 ");
          var inputControl = $('input[type=file]');
          inputControl.val("");
        } else {
          var imgUrl = fileInfo.files[0].url;
          activeComponent.image = imgUrl;
          basketStoragePreview.image(imgUrl);
          wizard.changesDone();
        }
        myUpload = false;
        $body.css("cursor", "default");
      }
    });

    $('.image-input .delete-icon').on('click', function (e) {
      activeComponent.image = null;
      basketStoragePreview.image(null);
      var clonedFile = $file.val('').clone(true);
      $file.replaceWith(clonedFile);
      $file = clonedFile;

      e.preventDefault();
      wizard.changesDone();
    });
  }

  function activeComponentChangesHandler() {
    var self = this;
    if (!activeComponent)
      return;

    $width.val(parseInt(activeComponent.units.pixel.width));
    $height.val(parseInt(activeComponent.units.pixel.height));
    $top.val(parseInt(activeComponent.units.pixel.top));
    $left.val(parseInt(activeComponent.units.pixel.left));
  }

  function disableText() {
    $textDisableMask.show();
    $text.blur();
  }

  function enableText() {
    $textDisableMask.hide();
  }

  function setDuplicateLinkedButtonVisibility() {
    if (!wizard.perishableStorage && activeComponent.constructor == basket && !activeComponent.hiddenOnRuntime) {
      showDuplicateLinkedButton();
    } else {
      hideDuplicateLinkedButton();
    }

  }
  function setActiveComponent(newActiveComponent) {
    var self = this;

    $disableMask.hide();


    activeComponent = newActiveComponent;
    activeComponent.on('change', activeComponentChangesHandler);
    if (activeComponent.text) {
      Properties.text = activeComponent.text;

      Properties.color = activeComponent.color;
      $color[0].color.fromString(cet.Utils.rgb2hex(activeComponent.color));
    } else {
      Properties.text = '';

      activeComponent.color = Properties.color;
    }


    setDuplicateLinkedButtonVisibility(activeComponent);
    

    if (activeComponent.constructor == group) {
      disableText();
    } else {
      enableText();
    }

    if (activeComponent.constructor == basket) {
      basketStoragePreview.text(activeComponent.text);
      basketStoragePreview.image(activeComponent.image);
      basketStoragePreview.show();
      activeComponent.isLinked() ? $isDistractingOptionContainer.hide() : $isDistractingOptionContainer.show();

    }
    else {
      basketStoragePreview.hide();
      $isDistractingOptionContainer.hide();
    }


    $width.val(parseInt(activeComponent.units.pixel.width));
    $height.val(parseInt(activeComponent.units.pixel.height));
    $top.val(parseInt(activeComponent.units.pixel.top));
    $left.val(parseInt(activeComponent.units.pixel.left));

    $cbIsDistractingOption.prop('checked', activeComponent.hiddenOnRuntime);
    var clonedFile = $file.val('').clone(true);
    $file.replaceWith(clonedFile);
    $file = clonedFile;
  }
  Properties.setActiveComponent = setActiveComponent;

  function removeActiveComponent() {
    //timeout is here for a very specific scenario, 
    //1. one of ther components properties was changed
    //2. user clicked on stage, and component lost activation
    //3. 'change' event of the property arrives after the component losses activation and we lose the chane
    //4. therefore we delay the 'removal' of the activation with 'setTimeout'.
    //setTimeout(function () {
    if (!activeComponent)
      return;
    $width.val('');
    $height.val('');
    $top.val('');
    $left.val('');

    activeComponent.off('changed', activeComponentChangesHandler);
    activeComponent = null;

    Properties.text = null;
    Properties.color = null;
    $disableMask.show();
    basketStoragePreview.hide();
    //}, 10);
  }
  Properties.removeActiveComponent = removeActiveComponent;

  function enable() {
  }
  Properties.enable = enable;

  function disable() {
  }
  Properties.disable = disable;

  function showDuplicateLinkedButton() {
    $btnDuplicateLinked.show();
  }
  Properties.showDuplicateLinkedButton = showDuplicateLinkedButton;
  function hideDuplicateLinkedButton() {
    $btnDuplicateLinked.hide();
  }
  Properties.hideDuplicateLinkedButton = hideDuplicateLinkedButton;

  Object.defineProperty(Properties, 'color', {
    get: function () {
      return $text.css('color');
    },
    set: function (val) {
      $text.css('color', val);
    }
  });

  Object.defineProperty(Properties, 'text', {
    get: function () {
      return $text.val();
    },
    set: function (val) {
      $text.val(val);
    }
  });
})(Properties || (Properties = {}));

///<reference path='basket.ts'/>
var link = (function () {
    function link(basket) {
        if (typeof basket === "undefined") { basket = null; }
        this._self = this;

        this._baskets = [];
        if (basket)
            this.addBasket(basket);
        this._isActive = false;
    }
    Object.defineProperty(link.prototype, "baskets", {
        get: function () {
            return this._baskets;
        },
        enumerable: true,
        configurable: true
    });

    link.prototype.addBasket = function (basket) {
        var self = this;
        basket.on('change', $.proxy(self.basketChangedHandler, self));
        basket.on('active', $.proxy(self.basketActivatedHandler, self));
        this._baskets.push(basket);
    };

    link.prototype.removeBasket = function (basket) {
        var self = this;
        basket.off('change');
        basket.off('active');
        for (var i = 0; i < self._baskets.length; i++) {
            if (self._baskets[i].id == basket.id) {
                self._baskets.splice(i, 1);
                break;
            }
        }
    };

    link.prototype.contains = function (basket) {
        for (var i = 0; i < this._baskets.length; i++) {
            if (basket.id == this._baskets[i].id)
                return true;
        }
        return false;
    };

    link.prototype.generateOptionId = function () {
        var result = '';
        for (var i = 0; i < this._baskets.length; i++) {
            result += '|' + this._baskets[i].generateOptionId();
        }
        return result;
    };

    link.prototype.isActive = function () {
        return this._isActive;
    };

    link.prototype.deactivate = function () {
        this._isActive = false;
        for (var i = 0; i < this._baskets.length; i++) {
            this._baskets[i].hideLinkedIcon();
        }
    };

    link.prototype.remove = function () {
        this._isActive = false;
        for (var i = 0; i < this._baskets.length; i++) {
            this._baskets[i].off('change', $.proxy(this.basketChangedHandler, this));
            this._baskets[i].off('active', $.proxy(this.basketActivatedHandler, this));
            this._baskets[i].hideLinkedIcon();
        }
    };

    link.prototype.activate = function () {
        this._isActive = true;
        for (var i = 0; i < this._baskets.length; i++) {
            this._baskets[i].showLinkedIcon();
        }
    };

    link.prototype.syncBaskets = function (dominator) {
        for (var i = 0; i < this._baskets.length; i++) {
            if (this._baskets[i].id == dominator.id)
                continue;
            if (this._baskets[i].image != dominator.image)
                this._baskets[i].image = dominator.image;
            if (this._baskets[i].text != dominator.text)
                this._baskets[i].text = dominator.text;
            if (this._baskets[i].color != dominator.color)
                this._baskets[i].color = dominator.color;
        }
    };

    link.prototype.toJson = function () {
        var result = {
            optionId: this.generateOptionId(),
            baskets: []
        };
        for (var i = 0; i < this._baskets.length; i++) {
            result.baskets.push(this._baskets[i].id);
        }
        return result;
    };

    link.prototype.fromJson = function (json) {
        if (!json)
            return;
        for (var i = 0; i < json.length; i++) {
            var newBasket = Baskets.getBasketById(json[i]);
            if (!newBasket)
                continue;
            this.addBasket(newBasket);
        }
    };

    link.prototype.hasMultipleBaskets = function () {
        return this._baskets.length > 1;
    };

    link.prototype.basketChangedHandler = function (e, changedBasket) {
        this._self.syncBaskets(changedBasket);
    };

    link.prototype.basketActivatedHandler = function (e, activatedBasket) {
        var activeLink = Links.getActiveLink();
        if (activeLink && activeLink == this._self)
            return;

        if (activeLink)
            activeLink.deactivate();

        this._self.activate();
    };
    return link;
})();

///<reference path='basket.ts'/>
var Links;
(function (Links) {
    var links = [];

    function addBasket(newBasket) {
        var self = this;
        var activeBasket = Baskets.getActiveBasket();
        var activeLink = Links.getLinkByBasket(activeBasket);
        if (!activeLink) {
            activeLink = new link(activeBasket);
            links.push(activeLink);
        }

        activeLink.addBasket(newBasket);
        activeLink.activate();
    }
    Links.addBasket = addBasket;

    function removeBasket(removeBasket) {
        var relatedLink = Links.getLinkByBasket(removeBasket);
        if (!relatedLink)
            return;
        relatedLink.removeBasket(removeBasket);
        if (!relatedLink.hasMultipleBaskets()) {
            links.splice(links.indexOf(relatedLink), 1);
            relatedLink.remove();
        }
    }
    Links.removeBasket = removeBasket;

    function generateNewLinkId() {
        return 'option-' + links.length;
    }

    function getLinkByBasket(basket) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].contains(basket))
                return links[i];
        }
    }
    Links.getLinkByBasket = getLinkByBasket;

    function getActiveLink() {
        for (var i = 0; i < links.length; i++) {
            if (links[i].isActive())
                return links[i];
        }
        return null;
    }
    Links.getActiveLink = getActiveLink;

    function deactivatAll() {
        //if (!activeLink)
        //{
        // setTimeout(Link.deactivateactiveLink, 10);
        // return;
        //}
        var active = getActiveLink();
        if (active)
            active.deactivate();
    }
    Links.deactivatAll = deactivatAll;

    function getAll() {
        return links;
    }
    Links.getAll = getAll;

    function reload() {
        var activeBasket = Baskets.getActiveBasket();
        var activeBasketLink = Links.getLinkByBasket(activeBasket);
        if (!activeBasketLink) {
            Links.deactivatAll();
            return;
        }
        if (!activeBasketLink.isActive())
            activeBasketLink.activate();
    }
    Links.reload = reload;

    function toJson() {
        var result = [];
        for (var i = 0; i < links.length; i++) {
            result.push(links[i].toJson());
        }
        return result;
    }
    Links.toJson = toJson;

    function fromJson(json) {
        if (!json)
            return;
        for (var i = 0; i < json.length; i++) {
            var newLink = new link();
            newLink.fromJson(json[i].baskets);
            links.push(newLink);
        }
    }
    Links.fromJson = fromJson;

    function isEmpty() {
        return links.length == 0;
    }
    Links.isEmpty = isEmpty;

    function deactivatAllLinksExceptMe(me) {
        var active = getActiveLink();
        if (active && active != me)
            active.deactivate();
    }
    Links.deactivatAllLinksExceptMe = deactivatAllLinksExceptMe;
})(Links || (Links = {}));

///<reference path='basketdata.ts'/>
///<reference path='basket.ts'/>
///<reference path='Links.ts'/>
///<reference path='baskets.ts'/>
///<reference path='group.ts'/>
///<reference path='groups.ts'/>
///<reference path='media.ts'/>
///<reference path='medias.ts'/>
///<reference path='properties.ts'/>
///<reference path='../../../../lib/modules/units.ts'/>
var Stage;
(function (Stage) {
  //var startPosition;
  var $stage;
  //var position;
  var offset;
  var self;



  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  function fixComponentOverflow(componentData) {
    var overFlowX = componentData.left + componentData.width - $stage.width();
    if (!UI.isIE())
      overFlowX += 6;
    if (overFlowX > 0)
      componentData.left -= overFlowX;
    if (!UI.isIE())
      overFlowY += 6;
    var overFlowY = componentData.top + componentData.height - $stage.height();

    if (overFlowY > 0)
      componentData.top -= overFlowY;
  }
  Stage.fixComponentOverflow = fixComponentOverflow;

  function deactivateActiveComponent() {
    var active = Stage.getActiveComponent();
    if (active) {
      Links.deactivatAll();
      active.deactivate();
      Properties.removeActiveComponent();

    }
  }
  Stage.deactivateActiveComponent = deactivateActiveComponent;


  function getActiveComponent() {
    var comp = Baskets.getActiveBasket();
    if (!comp)
      comp = Groups.getActiveGroup();
    if (!comp)
      comp = Medias.getActiveMedia();
    return comp;
  }
  Stage.getActiveComponent = getActiveComponent;

  function removeActiveComponent() {
    Baskets.removeActiveBasket();
    Groups.removeActiveGroup();
    Medias.removeActiveMedia();
    wizard.changesDone();
  }
  Stage.removeActiveComponent = removeActiveComponent;

  function cloneActiveComponent() {
    var activeComponent = Baskets.getActiveBasket();
    if (!activeComponent)
      activeComponent = Groups.getActiveGroup();
    if (!activeComponent)
      activeComponent = Medias.getActiveMedia();
    var newComponent = activeComponent.clone();
    newComponent.on('active', componentActivatedHandler);
    wizard.changesDone();
  }
  Stage.cloneActiveComponent = cloneActiveComponent;

  function cloneActiveBasketAsLinked() {
    var activeBasket = Baskets.getActiveBasket();
    var newBasket = activeBasket.cloneAsLinked();
    newBasket.on('active', componentActivatedHandler);
    wizard.changesDone();
  }
  Stage.cloneActiveBasketAsLinked = cloneActiveBasketAsLinked;

  function getHtml() {
    return $stage.html();
  }
  Stage.getHtml = getHtml;

  function addClass(name) {
    $stage.addClass(name);
  }
  Stage.addClass = addClass;

  function removeClass(name) {
    $stage.removeClass(name);
  }
  Stage.removeClass = removeClass;

  function componentActivatedHandler(e, activatedComponent) {
    Links.deactivatAllLinksExceptMe(Links.getLinkByBasket(activatedComponent));
    Baskets.deactivateAllBasketsExceptMe(activatedComponent);
    Groups.deactivateAllGroupsExceptMe(activatedComponent);
    Medias.deactivateAllMediasExceptMe(activatedComponent);

    Properties.setActiveComponent(activatedComponent);
    $stage.focus();
  }
  Stage.componentActivatedHandler = componentActivatedHandler;

  function containsPoint(pointer) {
    if (!offset)
      offset = $stage.offset();

    if (pointer.pageX < offset.left)
      return false;

    if (pointer.pageX > (offset.left + $stage.width()))
      return false;

    if (pointer.pageY < offset.top)
      return false;

    if (pointer.pageY > (offset.top + $stage.height()))
      return false;

    return true;
  }
  Stage.containsPoint = containsPoint;

  function removeTooltip() {
    $('.stage-tooltip').remove();
  }
  Stage.removeTooltip = removeTooltip;
  Object.defineProperty(Stage, 'backgroundImage', {
    get: function () {
      //return $stage.css('background-image'); //.replace(/url\(/g, '').replace(')', '').replace(/\"/g, '');
      return $stage.css('background-image').replace(/url\(/g, '').slice(0, -1);
    },
    set: function (val) {
      if (val && val != 'none')
        $stage.css('background-image', 'url(' + '"' + val.replace(/\"/g, '') + '"' + ')');
      else
        $stage.css('background-image', 'none');
    }
  });

  Object.defineProperty(Stage, 'height', {
    get: function () {
      return $stage.height();
    }
  });

  Object.defineProperty(Stage, 'width', {
    get: function () {
      return $stage.width();
    }
  });

  Object.defineProperty(Stage, 'backgroundColor', {
    set: function (val) {
      $stage.css('backgroundColor', val);
    },
    get: function () {
      return rgb2hex($stage.css('backgroundColor'));
    }
  });

  Object.defineProperty(Stage, 'borderColor', {
    set: function (val) {
      $stage.css('border-color', val);
    },
    get: function () {
      return rgb2hex($stage.css('borderColor'));
    }
  });

  Object.defineProperty(Stage, 'offsetTop', {
    get: function () {
      return $stage.offset().top;
    }
  });

  Object.defineProperty(Stage, 'offsetLeft', {
    get: function () {
      return $stage.offset().left;
    }
  });

  $(function () {
    self = this;
    $stage = $('.stage');
    //position = { top: $stage.offset().top, left: $stage.offset().left };

    $stage.on('mousedown', function (e) {
      Stage.deactivateActiveComponent();
      return;
      var active = Stage.getActiveComponent();
      if (active) {
        Links.deactivatAll();
        active.deactivate();
        Properties.removeActiveComponent();
        return;
      }
      return;
      Stage.removeTooltip();
      var top = e.pageY - Stage.offsetTop;
      var left = e.pageX - Stage.offsetLeft;
      var newComponent;
      switch (getCreationMode()) {
        case ComponentType.basket:
          newComponent = Baskets.createNewBasket(top, left);
          break;
        case ComponentType.group:
          newComponent = Groups.createNewGroup(top, left);
          break;
        case ComponentType.media:
          newComponent = Medias.createNewMedia(top, left);
          break;
      }
      Properties.setActiveComponent(newComponent);
      newComponent.on('active', componentActivatedHandler);
      wizard.changesDone();
    });

    //$stage.focus();

    var $file = $('.background-image-input  input[type=file]');
    var $submit = $('.background-image-input  input[type=submit]');
    var $body = $("body");
    var myUpload = false;
    $file.on('change', function () {
      myUpload = true;
      $body.css("cursor", "progress");
      $submit.click();
    });

    window.addEventListener("message", function (e) {
      if (e.data.substring(0, 12) == "file-upload:" && myUpload) {
        var fileInfo = jQuery.parseJSON(e.data.substring(12));
        if (fileInfo.files[0].errorCode == 'file_too_big') {
          alert("לא ניתן להעלות תמונות גדולות מKB-500 ");
          var inputControl = $('input[type=file]');
          inputControl.val("");
        } else {
          var imgUrl = fileInfo.files[0].url;

          //$stage.css('background-image', 'url(' + imgUrl + ')');
          Stage.backgroundImage = imgUrl;
        }
        $body.css("cursor", "default");
      }
      myUpload = false;
    });

    $('.background-image-input .delete-icon').on('click', function (e) {
      Stage.backgroundImage = null;
      $file.replaceWith($file.val('').clone(true));
      e.preventDefault();
    });




  });
})(Stage || (Stage = {}));

///<reference path='../../../../lib/external/jquery.d.ts'/>
var UI;
(function (UI) {
    var resizeType = {
        south: 1,
        east: 2,
        southeast: 3,
        north: 4,
        west: 5
    };

    function activateResize($element, type, eDown, containment) {
        var self = this;
        var startSize = {
            width: $element.width(),
            height: $element.height(),
            left: parseFloat($element.css('left').replace('px', '')),
            top: parseFloat($element.css('top').replace('px', ''))
        };

        var $containment = $(containment);
        var containmentBoundries = {
            top: 0,
            left: 0,
            bottom: $containment.height() - 6,
            right: $containment.width() - 6
        };

        if (UI.isIE()) {
            containmentBoundries.top += 6;
            containmentBoundries.left += 6;
        }

        $(document).on('mousemove', resizeMousemoveHandler);

        $(document).on('mouseup', resizeMouseupHandler);

        function resizeMousemoveHandler(eMove) {
            var delta = { width: eMove.pageX - eDown.pageX, height: eMove.pageY - eDown.pageY };

            if (type == resizeType.west)
                delta.width = -delta.width;
            if (type == resizeType.north)
                delta.height = -delta.height;

            var position = $element.position();

            var newMeasures = {
                width: startSize.width + delta.width,
                height: startSize.height + delta.height,
                top: null,
                left: null
            };

            //north/west change top/left accordingly
            if (type == resizeType.west)
                newMeasures.left = startSize.left - delta.width;
            if (type == resizeType.north)
                newMeasures.top = startSize.top - delta.height;

            var right = newMeasures.left ? newMeasures.left + newMeasures.width : position.left + newMeasures.width;
            var bottom = newMeasures.top ? newMeasures.top + newMeasures.height : position.top + newMeasures.height;

            //check if within containment
            if (type == resizeType.east) {
                newMeasures.height = null;
                if (right > containmentBoundries.right)
                    newMeasures.width = null;
            }
            if (type == resizeType.south) {
                newMeasures.width = null;
                if (bottom > containmentBoundries.bottom)
                    newMeasures.height = null;
            }

            if (type == resizeType.southeast) {
                if (bottom > containmentBoundries.bottom)
                    newMeasures.height = null;
                if (right > containmentBoundries.right)
                    newMeasures.width = null;
            }

            if (type == resizeType.north) {
                newMeasures.left = null;
                newMeasures.width = null;
                if (newMeasures.top < 0) {
                    newMeasures.height = null;
                    newMeasures.top = null;
                }
            }
            if (type == resizeType.west) {
                newMeasures.height = null;
                newMeasures.top = null;
                if (newMeasures.left < 0) {
                    newMeasures.width = null;
                    newMeasures.left = null;
                }
            }

            $element.css(newMeasures);
        }

        function resizeMouseupHandler(e) {
            $(document).off('mousemove', resizeMousemoveHandler);
            $(document).off('mouseup', resizeMouseupHandler);
            $element.trigger('resizeend')
            wizard.changesDone();
            
        }
    }

    function setAsResizable(element, containment, resizeOnCreattion) {
        var $element = $(element);
        $element.find('.e-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.east, e, containment);
            e.stopPropagation();
        });
        $element.find('.s-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.south, e, containment);
            e.stopPropagation();
        });
        $element.find('.n-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.north, e, containment);
            e.stopPropagation();
        });
        $element.find('.w-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.west, e, containment);
            e.stopPropagation();
        });
        $element.find('.se-handle').on('mousedown', function (e) {
            activateResize($element, resizeType.southeast, e, containment);
            e.stopPropagation();
        });

        if (resizeOnCreattion) {
            var fakeEvent = { pageX: $element.position().left + $('.stage').offset().left, pageY: $element.position().top + $('.stage').offset().top };
            activateResize($element, resizeType.southeast, fakeEvent, containment);
        }
    }
    UI.setAsResizable = setAsResizable;

    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return myNav.indexOf('msie') != -1 || myNav.indexOf('trident') != -1;
    }
    UI.isIE = isIE;
})(UI || (UI = {}));

var preset;
(function (preset) {
    var backgroundImage;
    var backgroundColor;
    var MdistractorBackgroundColor;
    var MdistractorArrowColor;
    var fontSize;
    var fontSizePx;
    var fontName;
    var fontFamily;

    var feedbackSuccessText;
    var feedbackFailureText;

    var model = {
        font: {
          size: '',
          sizePx: '',
          name: '',
          family: ''
        },
        feedback: {
            showFinalFeedback: true,
            errorsRemoval: "automaticaly",
            successText: "כל הכבוד",
            failureText: "נסו שוב"
        },
        welcomeSound: "",
        backgroundImage: "",
        backgroundColor: "",
        borderColor: "",
        MdistractorBackgroundColor: "",
        MdistractorArrowColor:"",
        basketBackgroundColor: "",
        basketBorderColor: "",
        basketOpacity: "",
        groupBackgroundColor: "",
        groupBorderColor: "",
        groupOpacity: "",
        mediaBackgroundColor: "",
        mediaBorderColor: "",
        mediaOpacity: "",
        perishableStorage: false,
        freeGroupMode: false,
        options: [],
        baskets: [],
        groups: [],
        links: [],
        ddd: '',
        medias: []
    };

    function getOption(id) {
        for (var i = 0; i < model.options.length; i++) {
            if (model.options[i].id == id)
                return model.options[i];
        }
        return null;
    }

    function clearBasketsAndOptions() {
        model.baskets = [];
        model.options = [];
        model.groups = [];
        model.links = [];
        model.medias = [];
    }
    preset.clearBasketsAndOptions = clearBasketsAndOptions;

    function getBasketOption(basket) {
        for (var i = 0; i < model.options.length; i++) {
             {
                for (var j = 0; j < model.options[i].baskets.length; j++) {
                    if (basket.id == model.options[i].baskets[j]) {
                        return model.options[i];
                    }
                }
            }
        }

        return null;
    }
    preset.getBasketOption = getBasketOption;

    function addMedia(media) {
        model.medias.push(media.toJson());
    }
    preset.addMedia = addMedia;

    function addGroup(group) {
        model.groups.push(group.toJson());
    }
    preset.addGroup = addGroup;

    function addBasket(basket) {
        model.baskets.push(basket);
    }
    preset.addBasket = addBasket;

    function addOption(option) {
        if (getOption(option.id)) {
            return;
        }
        model.options.push(option);
    }
    preset.addOption = addOption;

    function stringify() {
        return encodeURIComponent( JSON.stringify(model));
    }
    preset.stringify = stringify;

    function decodeURLRecursively(str) {

      // decode only valid str
      var pattern = "\\%[0-9a-f]{2}";
      var re = new RegExp(pattern);
      var result = re.exec(str);

      if (result) {
        try {
          return decodeURLRecursively(decodeURIComponent(str));
        }
        catch (err) {
          throw err.message + '  - Invalid Basket name with %[0-9a-f]{2} charachters - Remove %[0-9a-f]{2} from Basket name';
        }
      } else {
        return str;
      }
    }
    function parse(str) {
      model = JSON.parse(decodeURLRecursively(str));
    }
    preset.parse = parse;

    function setBasketsAndOptions(baskets) {
        preset.clearBasketsAndOptions();

        for (var i = 0; i < baskets.length; i++) {
          preset.addBasket(baskets[i].toJson());
          preset.addOption(baskets[i].toOptionJson());
        }
    }
    preset.setBasketsAndOptions = setBasketsAndOptions;

    function setMedias(medias) {
        for (var i = 0; i < medias.length; i++) {
            preset.addMedia(medias[i]);
        }
    }
    preset.setMedias = setMedias;

    function setGroups(groups) {
        for (var i = 0; i < groups.length; i++) {
            preset.addGroup(groups[i]);
        }
    }
    preset.setGroups = setGroups;

    function getModel() {
        return model;
    }
    preset.getModel = getModel;

    function getBasketOptionById(basketId) {
        for (var i = 0; i < model.options.length; i++) {
            for (var j = 0; j < model.options[i].baskets.length; j++) {
                if (basketId == model.options[i].baskets[j]) {
                    return model.options[i];
                }
            }
        }

        return null;
    }
    preset.getBasketOptionById = getBasketOptionById;

    Object.defineProperty(preset, 'basketShowBorder', {
        get: function () {
            return model.basketBorderColor;
        }
    });

    Object.defineProperty(preset, 'basketBackgroundColor', {
        get: function () {
            return model.basketBackgroundColor;
        },
        set: function (val) {
            model.basketBackgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'basketBorderColor', {
        get: function () {
            return model.basketBorderColor;
        },
        set: function (val) {
            model.basketBorderColor = val;
        }
    });
    Object.defineProperty(preset, 'basketOpacity', {
      get: function () {
            return model.basketOpacity;
        },
        set: function (val) {
            model.basketOpacity = val;
        }
    });

    Object.defineProperty(preset, 'groupBackgroundColor', {
        get: function () {
            return model.groupBackgroundColor;
        },
        set: function (val) {
            model.groupBackgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'groupBorderColor', {
        get: function () {
            return model.groupBorderColor;
        },
        set: function (val) {
            model.groupBorderColor = val;
        }
    });
    Object.defineProperty(preset, 'groupOpacity', {
        get: function () {
            return model.groupOpacity;
        },
        set: function (val) {
            model.groupOpacity = val;
        }
    });

    Object.defineProperty(preset, 'mediaBackgroundColor', {
        get: function () {
            return model.mediaBackgroundColor;
        },
        set: function (val) {
            model.mediaBackgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'mediaBorderColor', {
        get: function () {
            return model.mediaBorderColor;
        },
        set: function (val) {
            model.mediaBorderColor = val;
        }
    });
    Object.defineProperty(preset, 'mediaOpacity', {
        get: function () {
            return model.mediaOpacity;
        },
        set: function (val) {
            model.mediaOpacity = val;
        }
    });

    Object.defineProperty(preset, 'numberOfOptions', {
        get: function () {
            return model.options.length;
        }
    });
    Object.defineProperty(preset, 'backgroundImage', {
        get: function () {
            return model.backgroundImage;
        },
        set: function (val) {
            model.backgroundImage = val;
        }
    });
    Object.defineProperty(preset, 'backgroundColor', {
        get: function () {
            return model.backgroundColor;
        },
        set: function (val) {
            model.backgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'borderColor', {
        get: function () {
          return model.borderColor;
        },
        set: function (val) {
          model.borderColor = val;
        }
    });
    Object.defineProperty(preset, 'MdistractorBackgroundColor', {
        get: function () {
          return model.MdistractorBackgroundColor;
        },
        set: function (val) {
          model.MdistractorBackgroundColor = val;
        }
    });
    Object.defineProperty(preset, 'MdistractorArrowColor', {
        get: function () {
          return model.MdistractorArrowColor;
        },
        set: function (val) {
          model.MdistractorArrowColor = val;
        }
    });
    Object.defineProperty(preset, 'perishableStorage', {
        get: function () {
            return model.perishableStorage == undefined ? true : model.perishableStorage;
        },
        set: function (val) {
            model.perishableStorage = val;
        }
    });

    Object.defineProperty(preset, 'freeGroupMode', {
        get: function () {
            return model.freeGroupMode == undefined ? true : model.freeGroupMode;
        },
        set: function (val) {
            model.freeGroupMode = val;
        }
    });

    Object.defineProperty(preset, 'fontSize', {
        get: function () {
            return model.font.size;
        },
        set: function (val) {
            model.font.size = val;
        }
    });
    Object.defineProperty(preset, 'fontSizePx', {
        get: function () {
            return model.font.sizePx;
        },
        set: function (val) {
            model.font.sizePx = val;
        }
    });
    Object.defineProperty(preset, 'fontName', {
        get: function () {
            return model.font.name;
        },
        set: function (val) {
            model.font.name = val;
        }
    });
    Object.defineProperty(preset, 'fontFamily', {
        get: function () {
            return model.font.family;
        },
        set: function (val) {
            model.font.family = val;
        }
    });
    Object.defineProperty(preset, 'feedbackErrorsRemoval', {
        get: function () {
            return model.feedback.errorsRemoval;
        },
        set: function (val) {
            model.feedback.errorsRemoval = val;
        }
    });
    Object.defineProperty(preset, 'feedbackSuccessText', {
        get: function () {
            return model.feedback.successText;
        },
        set: function (val) {
            model.feedback.successText = val;
        }
    });
    Object.defineProperty(preset, 'feedbackFailureText', {
        get: function () {
            return model.feedback.failureText;
        },
        set: function (val) {
            model.feedback.failureText = val;
        }
    });

    Object.defineProperty(preset, 'baskets', {
        get: function () {
            return model.baskets;
        }
    });

    Object.defineProperty(preset, 'groups', {
        get: function () {
            return model.groups;
        }
    });

    Object.defineProperty(preset, 'medias', {
        get: function () {
            return model.medias;
        }
    });

    Object.defineProperty(preset, 'links', {
        get: function () {
            return model.links;
        },
        set: function (val) {
            model.links = val;
        }
    });
})(preset || (preset = {}));


var wizard;
(function (wizard) {
  var _L;

  var nOptionPixelWidth = 100;
  var nOptionPixelMargin = 10;
  var nOptionPercentageWidth;
  var nOptionPercentageMargin;
  var nOptionPercentageHeight = 90;
  var nOptionPercentageTop = 5;

  var nStagePixelWidth = 800;
  var nStagePixelHeight = 600;

  var nStoragePercentageWidth = 83;
  var nStoragePercentageLeft = 9;
  var nStoragePixelWidth = (nStoragePercentageWidth * nStagePixelWidth) / 100;

  var $backgroundColor;
  var $borderColor;

  var $MdistractorBackgroundColor;
  var $MdistractorArrowColor;

  var $basketBackgroundColor;
  var $basketBorderColor;
  var $basketShowBorderOn;
  var $basketShowBorderOff;
  var $basketTransparency;

  var $groupBackgroundColor;
  var $groupBorderColor;
  var $groupShowBorderOn;
  var $groupShowBorderOff;
  var $groupTransparency;

  var $mediaBackgroundColor;
  var $mediaBorderColor;
  var $mediaShowBorderOn;
  var $mediaShowBorderOff;
  var $mediaTransparency;

  var $fontSizeSmall;
  var $fontSizeMedium;
  var $fontSizeLarge;

  var $languageHebrew;
  var $languageArabic;

  var $perishableStorageTrue;
  var $perishableStorageFalse;

  var $freeGroupModeTrue;
  var $freeGroupModeFalse;
  var $body;

  var basketOpacityType = { on: 0.7, off: 1 };
  var alertRequest;

  function initTabs() {
    var $tabTitles = $('.tab-title');
    var $tabContents = $('.tab-content');

    $tabTitles.on('click', function (title) {
      $tabTitles.removeClass('selected');
      $tabContents.hide();

      var selectedTab = $(this);
      selectedTab.addClass('selected');
      $('.tab-content[data-tab=' + selectedTab.attr('data-tab') + ']').show();
    });

    $tabTitles.first().trigger('click');
  }

  function initBasketsCommonFields() {
    $basketBackgroundColor = $('#basket-background-color');
    $basketBackgroundColor.on('change', function (color) {
      var newColor = '#' + $basketBackgroundColor[0].color.toString();
      var baskets = Baskets.getBaskets();
      for (var i = 0; i < baskets.length; i++) {
        baskets[i].backgroundColor = newColor;
      }
      wizard.changesDone();
    });

    $basketBorderColor = $('#basket-border-color');
    $basketBorderColor.on('change', function (color) {
      var newColor = '#' + $basketBorderColor[0].color.toString();
      var baskets = Baskets.getBaskets();
      for (var i = 0; i < baskets.length; i++) {
        baskets[i].borderColor = newColor;
      }
      wizard.changesDone();
    });

    $perishableStorageTrue = $('#perishable-storage-true');
    $perishableStorageFalse = $('#perishable-storage-false');

    $freeGroupModeTrue = $('#free-group-mode-true');
    $freeGroupModeFalse = $('#free-group-mode-false');
    $('#free-group-mode-true, #free-group-mode-false').on('change', function () {
      wizard.changesDone();
    });


    $basketTransparency = $('#basket-transparency');
    $basketTransparency.on('input change', function (color) {
      var opacity = $basketTransparency.val() / 10;
      var baskets = Baskets.getBaskets();
      for (var i = 0; i < baskets.length; i++) {
        baskets[i].opacity = opacity;
      }
      wizard.changesDone();
    });

    $basketShowBorderOn = $('#basket-show-border-on');
    $basketShowBorderOff = $('#basket-show-border-off');

    $('#basket-show-border-off, #basket-show-border-on').on('change', function () {
      if ($basketShowBorderOff.is(':checked')) {
        $basketBorderColor.css({
          'background-color': 'rgb(235, 235, 228)',
          'color': 'rgb(84, 84, 84)'
        });
        $basketBorderColor.attr('disabled', true);
      } else {
        wizard.basketBorderColor = wizard.basketBorderColor;
        $basketBorderColor.attr('disabled', false);
      }

      var baskets = Baskets.getBaskets();
      var color = wizard.basketBorderColor;
      for (var i = 0; i < baskets.length; i++) {
        baskets[i].borderColor = color;
      }
      wizard.changesDone();
    });
  }

  function initGroupsCommonFields() {
    $groupBackgroundColor = $('#group-background-color');
    $groupBackgroundColor.on('change', function (color) {
      var newColor = '#' + $groupBackgroundColor[0].color.toString();
      var groups = Groups.getGroups();
      for (var i = 0; i < groups.length; i++) {
        groups[i].backgroundColor = newColor;
      }
      wizard.changesDone();
    });

    $groupBorderColor = $('#group-border-color');
    $groupBorderColor.on('change', function (color) {
      var newColor = '#' + $groupBorderColor[0].color.toString();
      var groups = Groups.getGroups();
      for (var i = 0; i < groups.length; i++) {
        groups[i].borderColor = newColor;
      }
      wizard.changesDone();
    });

    $groupTransparency = $('#group-transparency');
    $groupTransparency.on('input change', function (color) {
      var opacity = $groupTransparency.val() / 10;
      var groups = Groups.getGroups();
      for (var i = 0; i < groups.length; i++) {
        groups[i].opacity = opacity;
      }
      wizard.changesDone();
    });

    $groupShowBorderOn = $('#group-show-border-on');
    $groupShowBorderOff = $('#group-show-border-off');

    $('#group-show-border-off, #group-show-border-on').on('change', function () {
      if ($groupShowBorderOff.is(':checked')) {
        $groupBorderColor.css({
          'background-color': 'rgb(235, 235, 228)',
          'color': 'rgb(84, 84, 84)'
        });
        $groupBorderColor.attr('disabled', true);
      } else {
        wizard.groupBorderColor = wizard.groupBorderColor;
        $groupBorderColor.attr('disabled', false);
      }

      var groups = Groups.getGroups();
      var color = wizard.groupBorderColor;
      for (var i = 0; i < groups.length; i++) {
        groups[i].borderColor = color;
      }
      wizard.changesDone();
    });
  }

  function initMediasCommonFields() {
    $mediaBackgroundColor = $('#media-background-color');
    $mediaBackgroundColor.on('change', function (color) {
      var newColor = '#' + $mediaBackgroundColor[0].color.toString();
      var medias = Medias.getMedias();
      for (var i = 0; i < medias.length; i++) {
        medias[i].backgroundColor = newColor;
      }
      wizard.changesDone();
    });

    $mediaBorderColor = $('#media-border-color');
    $mediaBorderColor.on('change', function (color) {
      var newColor = '#' + $mediaBorderColor[0].color.toString();
      var medias = Medias.getMedias();
      for (var i = 0; i < medias.length; i++) {
        medias[i].borderColor = newColor;
      }
      wizard.changesDone();
    });

    $mediaTransparency = $('#media-transparency');
    $mediaTransparency.on('input change', function (color) {
      var opacity = $mediaTransparency.val() / 10;
      var medias = Medias.getMedias();
      for (var i = 0; i < medias.length; i++) {
        medias[i].opacity = opacity;
      }
      wizard.changesDone();
    });

    $mediaShowBorderOn = $('#media-show-border-on');
    $mediaShowBorderOff = $('#media-show-border-off');

    $('#media-show-border-off, #media-show-border-on').on('change', function () {
      if ($mediaShowBorderOff.is(':checked')) {
        $mediaBorderColor.css({
          'background-color': 'rgb(235, 235, 228)',
          'color': 'rgb(84, 84, 84)'
        });
        $mediaBorderColor.attr('disabled', true);
      } else {
        wizard.mediaBorderColor = wizard.mediaBorderColor;
        $mediaBorderColor.attr('disabled', false);
      }

      var medias = Medias.getMedias();
      var color = wizard.mediaBorderColor;
      for (var i = 0; i < medias.length; i++) {
        medias[i].borderColor = color;
      }
      wizard.changesDone();
    });
  }

  function getLanguage() {
    return cet.content.RunTime.language;
  }

  function initGroupsButtonsVisibility() {
    if (document.location.search.indexOf('groups=no') != -1)
      $body.addClass('no-groups-template');
  }

  function showAlert(message, withCancelButton) {
    //if (withCancelButton)
    //  $('.ht-cancel').show();
    //else
    //  $('.ht-cancel').hide();
    $("#alert-dialog > .body").html(message);
    var height = $("#alert-dialog .body").height();

    height = 50;

    $.colorbox({
      inline: true,
      href: '#alert-dialog',
      transition: 'none',
      speed: 0,
      open: true,
      height: (80 + height) + 'px',
      width: '500px',
      title: _L('myStudio'),
      overlayClose: false,
      closeButton: true
    });
  }
  wizard.showAlert = showAlert;

  function init() {
    
    $backgroundColor = $('#background-color');
    $backgroundColor.on('change', function (color) {
      var newColor = '#' + $backgroundColor[0].color.toString();
      Stage.backgroundColor = newColor;
      wizard.changesDone();
    });

    $borderColor = $('#template-border-color');
    $borderColor.on('change', function (color) {
      var newColor = '#' + $borderColor[0].color.toString();
      Stage.borderColor = newColor;
      wizard.changesDone();
    });

    $MdistractorBackgroundColor = $('#Mdistractor-background-color');
    $MdistractorBackgroundColor.on('change', function (color) {
      var newColor = '#' + $MdistractorBackgroundColor[0].color.toString();
      Stage.$MdistractorBackgroundColor = newColor;
      wizard.changesDone();
    });

    $MdistractorArrowColor = $('#arrows-color');
    $MdistractorArrowColor.on('change', function (color) {
      var newColor = '#' + $MdistractorArrowColor[0].color.toString();
      Stage.$MdistractorArrowColor = newColor;
      wizard.changesDone();
    });

    $perishableStorageTrue = $('#perishable-storage-true');
    $perishableStorageFalse = $('#perishable-storage-false');

    initBasketsCommonFields();

    initGroupsCommonFields();

    initMediasCommonFields();

    $('#perishable-storage-true, #perishable-storage-false').on('change', function () {
      if ($perishableStorageTrue.is(':checked')) {
        if (!Links.isEmpty()) {
          $perishableStorageFalse.prop('checked', true);
          wizard.showAlert(_L('removeDestructorsError'), true);
          return;
        }

        Properties.hideDuplicateLinkedButton();
      } else
        Properties.showDuplicateLinkedButton();
      wizard.changesDone();
    });

    $languageArabic = $("#languageArabic");
    $languageHebrew = $("#languageHebrew");

    $("#languageArabic, #languageHebrew").on('change', function () {
      Stage.removeClass($languageArabic.val() + ' ' + $languageHebrew.val());
      Stage.addClass($("input:radio[name=language]:checked").val());

      wizard.changesDone();
    });
    $languageHebrew.trigger('change');
    $languageHebrew.focus();

    $fontSizeSmall = $("#fontSmall");
    $fontSizeMedium = $("#fontMedium");
    $fontSizeLarge = $("#fontLarge");
    $fontSizeOther = $("#fontOther");
    $("#fontSmall, #fontMedium, #fontLarge, #fontOther").on('change', function () {

      var allSizeClasses =
        getFontSizeClassName($fontSizeSmall.val()) + ' ' +
        getFontSizeClassName($fontSizeMedium.val()) + ' ' +
        getFontSizeClassName($fontSizeLarge.val()) + ' ' +
        getFontSizeClassName($fontSizeOther.val());
      Stage.removeClass(allSizeClasses);
      $body.removeClass(allSizeClasses);

      Stage.removeClass(function (index, css) {
        return (css.match (/\bsize-\S+/g) || []).join(' '); // removes anything that starts with "size-"
      });
      $body.removeClass(function (index, css) {
        return (css.match(/\bsize-\S+/g) || []).join(' '); // removes anything that starts with "size-"
      });

      var selectedSize = getFontSizeClassName($("input:radio[name=font]:checked").val());     
      if (selectedSize == "font-other") {
        var fontSize = $("select[name='fontOther'] option:selected").val();//$(this).children("option:selected").val();
        Stage.addClass("size-" + fontSize);
        $body.addClass("size-" + fontSize);
      }

      Stage.addClass(selectedSize);
      $body.addClass(selectedSize);
    
      wizard.changesDone();
    });
    $fontSizeMedium.trigger('change');

    $("select[name='fontName']").on('change', function () {
      Stage.removeClass(function (index, css) {
        return (css.match(/\bfontName-\S+/g) || []).join(' '); // removes anything that starts with "size-"
      });
      $body.removeClass(function (index, css) {
        return (css.match(/\bfontName-\S+/g) || []).join(' '); // removes anything that starts with "size-"
      });
      var fontName = $("select[name='fontName'] option:selected").val();
      Stage.addClass("fontName-" + fontName);
      $body.addClass("fontName-" + fontName);
      wizard.changesDone();
    });
    
    
    $("#errorRemovalTrue, #errorRemovalFalse").on('change', function () {
      wizard.changesDone();
    });

    initTabs();
    initGroupsButtonsVisibility();
    //var $btnBasket = $('#btn-basket');
    //setAsToolbarButton($btnBasket);


    //function setAsToolbarButton($element) {
    //  var basketDraggie = new draggable($element, 'body');
    //  basketDraggie.on('dragend', function (sheker, pointer) {
    //    Stage.removeTooltip();
    //    var top = pointer.pageY - Stage.offsetTop;
    //    var left = pointer.pageX - Stage.offsetLeft;
    //    var newComponent = Baskets.createNewBasket(top, left);

    //    Properties.setActiveComponent(newComponent);
    //    newComponent.on('active', Stage.componentActivatedHandler);
    //    $element.remove();
    //    wizard.changesDone();
    //  })

    //  basketDraggie.on('dragstart', function (sheker, pointer) {
    //    var $clone = $element.clone();
    //    $element.parent().append($clone);
    //    setAsToolbarButton($clone)
    //  });
    //}

  }
  wizard.init = init;

  function serialize() {
    Groups.resolveBaskets();

    var baskets = Baskets.getBaskets();
    preset.setBasketsAndOptions(baskets);

    var groups = Groups.getGroups();
    preset.setGroups(groups);

    var medias = Medias.getMedias();
    preset.setMedias(medias);

    var links = Links.toJson();

    preset.links = links;

    preset.backgroundImage = Stage.backgroundImage;
    preset.backgroundColor = Stage.backgroundColor;
    preset.borderColor = Stage.borderColor;

    preset.MdistractorBackgroundColor = wizard.MdistractorBackgroundColor;
    preset.MdistractorArrowColor = wizard.MdistractorArrowColor;

    preset.basketBackgroundColor = wizard.basketBackgroundColor;
    preset.basketBorderColor = wizard.basketBorderColor;
    preset.basketOpacity = wizard.basketOpacity;

    preset.groupBackgroundColor = wizard.groupBackgroundColor;
    preset.groupBorderColor = wizard.groupBorderColor;
    preset.groupOpacity = wizard.groupOpacity;

    preset.mediaBackgroundColor = wizard.mediaBackgroundColor;
    preset.mediaBorderColor = wizard.mediaBorderColor;
    preset.mediaOpacity = wizard.mediaOpacity;

    preset.perishableStorage = wizard.perishableStorage;
    preset.freeGroupMode = wizard.freeGroupMode;

    preset.fontSize = $("input:radio[name=font]:checked").val();
    preset.fontSizePx = $("select[name='fontOther'] option:selected").val();
    preset.fontName = $("select[name='fontName'] option:selected").val();

    preset.fontFamily = getLanguage();

    preset.feedbackErrorsRemoval = $("#errorRemovalTrue").is(':checked') ? 'automaticaly' : null;


    return preset.stringify();
  }
  wizard.serialize = serialize;

  function deserialize(presetStr) {
    if (!presetStr)
      return;
    if (presetStr.substr(0, 3) == '%7B')
      presetStr = decodeURIComponent(presetStr);
    preset.parse(presetStr);

    wizard.basketBackgroundColor = preset.basketBackgroundColor;
    wizard.basketBorderColor = preset.basketBorderColor;
    wizard.basketOpacity = preset.basketOpacity;

    wizard.groupBackgroundColor = preset.groupBackgroundColor;
    wizard.groupBorderColor = preset.groupBorderColor;
    wizard.groupOpacity = preset.groupOpacity;

    wizard.mediaBackgroundColor = preset.mediaBackgroundColor;
    wizard.mediaBorderColor = preset.mediaBorderColor;
    wizard.mediaOpacity = preset.mediaOpacity;

    if (preset.baskets.length > 0 || preset.groups.length > 0 || preset.medias.length > 0)
      Stage.removeTooltip();

    for (var i = 0; i < preset.baskets.length; i++) {
      var newBasket = Baskets.createNewBasketFromJson(preset.baskets[i]);
      newBasket.on('active', Stage.componentActivatedHandler);
    }

    Links.fromJson(preset.links);

    for (var i = 0; preset.groups && i < preset.groups.length; i++) {
      var gData = new groupdata(preset.groups[i].top, preset.groups[i].left, preset.groups[i].height, preset.groups[i].width, false);
      gData.toPixels();
      Groups.createNewGroup(null, null, gData);
    }

    for (var i = 0; preset.medias && i < preset.medias.length; i++) {
      var mData = new mediadata(preset.medias[i].top, preset.medias[i].left, preset.medias[i].height, preset.medias[i].width, false, preset.medias[i].text, preset.medias[i].image, preset.medias[i].id, preset.medias[i].color);
      mData.toPixels();
      Medias.createNewMedia(null, null, mData);
    }

    Stage.backgroundImage = preset.backgroundImage;
    Stage.backgroundColor = preset.backgroundColor;
    wizard.backgroundColor = preset.backgroundColor;

    Stage.borderColor = preset.borderColor;
    wizard.borderColor = preset.borderColor;

    //Stage.MdistractorBackgroundColor = preset.MdistractorBackgroundColor;
    wizard.MdistractorBackgroundColor = preset.MdistractorBackgroundColor;
    wizard.MdistractorArrowColor = preset.MdistractorArrowColor;

    wizard.perishableStorage = preset.perishableStorage;
    wizard.freeGroupMode = preset.freeGroupMode;

    if (wizard.perishableStorage)
      Properties.hideDuplicateLinkedButton();
    else
      Properties.showDuplicateLinkedButton();

    var fontId;
    switch (preset.fontSize) {
      case 'small':
        fontId = 'fontSmall';
        break;
      case 'medium':
        fontId = 'fontMedium';
        break;
      case 'large':
        fontId = 'fontLarge';
      case 'other':
        fontId = 'fontOther';
    }
    $('input:radio[id=' + fontId + ']').prop('checked', true).change();
   
    $("select[name='fontOther'] option[value=" + preset.fontSizePx + "]").prop('selected', true);
    $("select[name='fontName'] option[value=" + preset.fontName + "]").prop('selected', true);
    Stage.removeClass(function (index, css) {
      return (css.match(/\bsize-\S+/g) || []).join(' '); });
    $body.removeClass(function (index, css) {
      return (css.match(/\bsize-\S+/g) || []).join(' '); });
    Stage.addClass("size-" + preset.fontSizePx);
    $body.addClass("size-" + preset.fontSizePx);
    Stage.addClass("fontName-" + preset.fontName);
    $body.addClass("fontName-" + preset.fontName);

    var langId;
    switch (preset.fontFamily) {
      case 'hebrew':
        langId = 'languageHebrew';
        break;
      case 'arabic':
        langId = 'languageArabic';
        break;
    }
    $('input:radio[id=' + langId + ']').prop('checked', true).change();

    if (preset.feedbackErrorsRemoval == 'automaticaly')
      $("#errorRemovalTrue").prop('checked', true);
    else
      $("#errorRemovalFalse").prop('checked', true);
  }
  wizard.deserialize = deserialize;

  function isInvalidBasketName(baskets) {
    var isInvalid = false;
    for (var i=0; i < baskets.length; i++) {
      // validate str 
      var pattern = "\\%[0-9a-f]{2}";
      var re = new RegExp(pattern);
      var result = re.exec(baskets[i].text);
      isInvalid = (result) ? true : false;
    }
    return isInvalid;
  }
  wizard.isInvalidBasketName = isInvalidBasketName;

  function validate() {
    
    var baskets = Baskets.getBaskets();
    var errors = [];

    if (isInvalidBasketName(baskets)) {
      errors.push(_L('inputInvalidBasketName'));
    }
    if (baskets.length < 2) {
      errors.push(_L('inputTwoDestructorsError'));
    }
    if (Groups.emptyGroupExists()) {
      errors.push(_L('emptyGroupError'));
    }

    if (Groups.groupWithHiddenBasketExists()) {
      errors.push(_L('hiddenBasketInGroupError'));
    }

    if (errors.length == 0)
      return true;
    return errors;
  }
  wizard.validate = validate;

  function changesDone() {
    cet.content.DesignTime.notifyChange();
  }
  wizard.changesDone = changesDone;

  function updateContainerHeight() {
    var bodyHeight = $body.height();
    if (bodyHeight) {
      cet.content.UI.setHeight(bodyHeight + 20);
    }
  }
  wizard.updateContainerHeight = updateContainerHeight;

  function setJsColorToDomElement(elem, val) {
    if (elem.color) {
      elem.color.fromString(val);
    } else if (jscolor) {
      jscolor.init();
      setTimeout(function () {
        elem.color.fromString(val);
      }, 500);
    }
  }
  ;

  Object.defineProperty(wizard, 'backgroundColor', {
    get: function () {
      return '#' + $backgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($backgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'borderColor', {
    get: function () {
      return '#' + $borderColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($borderColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'MdistractorBackgroundColor', {
    get: function () {
      return '#' + $MdistractorBackgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($MdistractorBackgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'MdistractorArrowColor', {
    get: function () {
      return '#' + $MdistractorArrowColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($MdistractorArrowColor[0], val);
      }
    }
  });
  Object.defineProperty(wizard, 'basketBackgroundColor', {
    get: function () {
      return '#' + $basketBackgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($basketBackgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'basketBorderColor', {
    get: function () {
      if (!$basketShowBorderOn.is(':checked'))
        return 'transparent';
      return '#' + $basketBorderColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($basketBorderColor[0], val);
      }

      var showBorder = val != 'transparent';
      $basketShowBorderOff.prop("checked", !showBorder);
      $basketShowBorderOn.prop("checked", showBorder);
    }
  });

  Object.defineProperty(wizard, 'basketOpacity', {
    get: function () {      
      return $basketTransparency.val() / 10;
      //$basketTransparencyOn.is(':checked') ? basketOpacityType.on : basketOpacityType.off;
    },
    set: function (val) {
      $basketTransparency.val(val * 10);
      //var isOn = val == basketOpacityType.on;
      //$basketTransparencyOn.prop('checked', isOn);
      //$basketTransparencyOff.prop('checked', !isOn);
    }
  });

  Object.defineProperty(wizard, 'groupBackgroundColor', {
    get: function () {
      return '#' + $groupBackgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($groupBackgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'groupBorderColor', {
    get: function () {
      if (!$groupShowBorderOn.is(':checked'))
        return 'transparent';
      return '#' + $groupBorderColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($groupBorderColor[0], val);
      }

      var showBorder = val != 'transparent';
      $groupShowBorderOff.prop("checked", !showBorder);
      $groupShowBorderOn.prop("checked", showBorder);
    }
  });

  Object.defineProperty(wizard, 'groupOpacity', {
    get: function () {
      return $groupTransparency.val() / 10;
      //$groupTransparencyOn.is(':checked') ? groupOpacityType.on : groupOpacityType.off;
    },
    set: function (val) {
      $groupTransparency.val(val * 10);
      //var isOn = val == groupOpacityType.on;
      //$groupTransparencyOn.prop('checked', isOn);
      //$groupTransparencyOff.prop('checked', !isOn);
    }
  });

  Object.defineProperty(wizard, 'mediaBackgroundColor', {
    get: function () {
      return '#' + $mediaBackgroundColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($mediaBackgroundColor[0], val);
      }
    }
  });

  Object.defineProperty(wizard, 'mediaBorderColor', {
    get: function () {
      if (!$mediaShowBorderOn.is(':checked'))
        return 'transparent';
      return '#' + $mediaBorderColor[0].color.toString();
    },
    set: function (val) {
      if (val && val != 'none') {
        setJsColorToDomElement($mediaBorderColor[0], val);
      }

      var showBorder = val != 'transparent';
      $mediaShowBorderOff.prop("checked", !showBorder);
      $mediaShowBorderOn.prop("checked", showBorder);
    }
  });

  Object.defineProperty(wizard, 'mediaOpacity', {
    get: function () {
      return $mediaTransparency.val() / 10;
      //$mediaTransparencyOn.is(':checked') ? mediaOpacityType.on : mediaOpacityType.off;
    },
    set: function (val) {
      $mediaTransparency.val(val * 10);
      //var isOn = val == mediaOpacityType.on;
      //$mediaTransparencyOn.prop('checked', isOn);
      //$mediaTransparencyOff.prop('checked', !isOn);
    }
  });

  Object.defineProperty(wizard, 'perishableStorage', {
    get: function () {
      return $perishableStorageTrue.is(':checked');
    },
    set: function (val) {
      $perishableStorageTrue.prop('checked', val);
      $perishableStorageFalse.prop('checked', !val);
    }
  });

  Object.defineProperty(wizard, 'freeGroupMode', {
    get: function () {
      return $freeGroupModeTrue.is(':checked');
    },
    set: function (val) {
      $freeGroupModeTrue.prop('checked', val);
      $freeGroupModeFalse.prop('checked', !val);
    }
  });

  function getFontSizeClassName(name) {
    switch (name) {
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

  $(function () {
    /* Add listener to localized event to show the wizard only after it was localized */
    $body = $('body');

    $body.hide();
    window.addEventListener('localized', function () {
      $body.show();
    }, false);

    cet.content.on('clientready', function () {
      var language = cet.content.DesignTime.language;
      document.webL10n = initWebL10n(window, document, undefined, language);
      document.webL10n.ready(function () {
        // define helper function
        _L = document.webL10n.get;

        $('html').attr('lang', language);
        $body.attr('data-dir', document.webL10n.getDirection());

        cet.content.DesignTime.onValidationRequested = wizard.validate;
        cet.content.DesignTime.onPresetRequested = wizard.serialize;
        wizard.init();
        wizard.deserialize(cet.content.DesignTime.preset);
      });
    });
    wizard.updateContainerHeight();
  });
})(wizard || (wizard = {}));


var toolbar;
(function (toolbar) {

  var $btnBasket;
  var $btnMedia;
  var $btnGroup;


  function createNewComponent($btn, pointer) {

    //var top = pointer.pageY - Stage.offsetTop;
    //var left = pointer.pageX - Stage.offsetLeft;

    var top = $btn.offset().top - Stage.offsetTop;
    var left = $btn.offset().left - Stage.offsetLeft;

    if ($btn.hasClass('btn-basket'))
      return Baskets.createNewBasket(top, left);
    else if ($btn.hasClass('btn-group'))
      return Groups.createNewGroup(top, left);
    else
      return Medias.createNewMedia(top, left);

  }

  function droppedOnCanvas(pointer) {
    return pointer && Stage.containsPoint(pointer);
  }

  function setAsToolbarButton($element) {

    var basketDraggie = new draggable($element, 'body');

    basketDraggie.on('dragend', function (event, pointer) {
      if (!droppedOnCanvas(pointer)) {
        $element.remove();
        return;
      }

      Stage.removeTooltip();
      Stage.deactivateActiveComponent();
      var newComponent = createNewComponent($element, pointer);
      Properties.setActiveComponent(newComponent);
      newComponent.on('active', Stage.componentActivatedHandler);
      $element.remove();
      wizard.changesDone();
    })

    basketDraggie.on('dragstart', function (event, pointer) {

      var $clone = $element.clone();
      $element.addClass('dragged');
      //$clone.isClone = true;
      $element.parent().append($clone);
      setAsToolbarButton($clone);
    });

  }

  $(function () {

    $btnBasket = $('#btn-basket');
    $btnMedia = $('#btn-media');
    $btnGroup = $('#btn-group');

    setAsToolbarButton($btnBasket);
    setAsToolbarButton($btnMedia);
    setAsToolbarButton($btnGroup);

  });

})(toolbar || (toolbar = {}));