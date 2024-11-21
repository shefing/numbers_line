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
 * V2.97a.20170601
 */
(function(g,h){function v(gb,v){function Z(b){return c.preferFlash&&z&&!c.ignoreFlash&&c.flash[b]!==h&&c.flash[b]}function q(b){return function(c){var d=this._s;return d&&d._a?b.call(this,c):null}}this.setupOptions={url:gb||null,flashVersion:8,debugMode:!0,debugFlash:!1,useConsole:!0,consoleOnly:!0,waitForWindowLoad:!1,bgColor:"#ffffff",useHighPerformance:!1,flashPollingInterval:null,html5PollingInterval:null,flashLoadTimeout:1E3,wmode:null,allowScriptAccess:"always",useFlashBlock:!1,useHTML5Audio:!0,
forceUseGlobalHTML5Audio:!1,ignoreMobileRestrictions:!1,html5Test:/^(probably|maybe)$/i,preferFlash:!1,noSWFCache:!1,idPrefix:"sound"};this.defaultOptions={autoLoad:!1,autoPlay:!1,from:null,loops:1,onid3:null,onerror:null,onload:null,whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onposition:null,onstop:null,onfinish:null,multiShot:!0,multiShotEvents:!1,position:null,pan:0,playbackRate:1,stream:!0,to:null,type:null,usePolicyFile:!1,volume:100};this.flash9Options={onfailure:null,
isMovieStar:null,usePeakData:!1,useWaveformData:!1,useEQData:!1,onbufferchange:null,ondataerror:null};this.movieStarOptions={bufferTime:3,serverURL:null,onconnect:null,duration:null};this.audioFormats={mp3:{type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],required:!0},mp4:{related:["aac","m4a","m4b"],type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],required:!1},ogg:{type:["audio/ogg; codecs=vorbis"],required:!1},
opus:{type:["audio/ogg; codecs=opus","audio/opus"],required:!1},wav:{type:['audio/wav; codecs="1"',"audio/wav","audio/wave","audio/x-wav"],required:!1},flac:{type:["audio/flac"],required:!1}};this.movieID="sm2-container";this.id=v||"sm2movie";this.debugID="soundmanager-debug";this.debugURLParam=/([#?&])debug=1/i;this.versionNumber="V2.97a.20170601";this.altURL=this.movieURL=this.version=null;this.enabled=this.swfLoaded=!1;this.oMC=null;this.sounds={};this.soundIDs=[];this.didFlashBlock=this.muted=
!1;this.filePattern=null;this.filePatterns={flash8:/\.mp3(\?.*)?$/i,flash9:/\.mp3(\?.*)?$/i};this.features={buffering:!1,peakData:!1,waveformData:!1,eqData:!1,movieStar:!1};this.sandbox={};this.html5={usingFlash:null};this.flash={};this.ignoreFlash=this.html5Only=!1;var M,c=this,Na=null,k=null,aa,t=navigator.userAgent,Oa=g.location.href.toString(),n=document,oa,Pa,pa,m,x=[],N=!1,O=!1,l=!1,A=!1,qa=!1,P,w,ra,ba,sa,E,G,H,Qa,ta,ua,ca,I,da,F,va,Q,wa,ea,J,Ra,xa,ya,za,Sa,R=null,Aa=null,S,Ba,K,fa,ga,p,T=
!1,Ca=!1,Ta,Ua,Va,ha=0,U=null,ia,V=[],W,u=null,Wa,ja,X,Xa,C,ka,Da,Ya,r,hb=Array.prototype.slice,y=!1,Ea,z,Fa,Za,B,Y,$a=0,Ga,Ha=t.match(/(ipad|iphone|ipod)/i),Ia=t.match(/android/i),D=t.match(/msie|trident/i),ib=t.match(/webkit/i),la=t.match(/safari/i)&&!t.match(/chrome/i),Ja=t.match(/opera/i),ma=t.match(/(mobile|pre\/|xoom)/i)||Ha||Ia,ab=!Oa.match(/usehtml5audio/i)&&!Oa.match(/sm2-ignorebadua/i)&&la&&!t.match(/silk/i)&&t.match(/OS\sX\s10_6_([3-7])/i),Ka=n.hasFocus!==h?n.hasFocus():null,na=la&&(n.hasFocus===
h||!n.hasFocus()),bb=!na,cb=/(mp3|mp4|mpa|m4a|m4b)/i,La=n.location?n.location.protocol.match(/http/i):null,jb=La?"":"//",db=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4|m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,eb="mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),kb=new RegExp("\\.("+eb.join("|")+")(\\?.*)?$","i");this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;this.useAltURL=!La;Xa=[null,"MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED"];
var Ma;try{Ma=Audio!==h&&(Ja&&opera!==h&&10>opera.version()?new Audio(null):new Audio).canPlayType!==h}catch(lb){Ma=!1}this.hasHTML5=Ma;this.setup=function(b){var e=!c.url;b!==h&&l&&u&&c.ok();ra(b);if(!y)if(ma){if(!c.setupOptions.ignoreMobileRestrictions||c.setupOptions.forceUseGlobalHTML5Audio)V.push(I.globalHTML5),y=!0}else c.setupOptions.forceUseGlobalHTML5Audio&&(V.push(I.globalHTML5),y=!0);if(!Ga&&ma)if(c.setupOptions.ignoreMobileRestrictions)V.push(I.ignoreMobile);else if(c.setupOptions.useHTML5Audio=
!0,c.setupOptions.preferFlash=!1,Ha)c.ignoreFlash=!0;else if(Ia&&!t.match(/android\s2\.3/i)||!Ia)y=!0;b&&(e&&Q&&b.url!==h&&c.beginDelayedInit(),Q||b.url===h||"complete"!==n.readyState||setTimeout(F,1));Ga=!0;return c};this.supported=this.ok=function(){return u?l&&!A:c.useHTML5Audio&&c.hasHTML5};this.getMovie=function(b){return aa(b)||n[b]||g[b]};this.createSound=function(b,e){function d(){a=fa(a);c.sounds[a.id]=new M(a);c.soundIDs.push(a.id);return c.sounds[a.id]}var a,f=null;if(!l||!c.ok())return!1;
e!==h&&(b={id:b,url:e});a=w(b);a.url=ia(a.url);a.id===h&&(a.id=c.setupOptions.idPrefix+$a++);if(p(a.id,!0))return c.sounds[a.id];if(ja(a))f=d(),f._setup_html5(a);else{if(c.html5Only||c.html5.usingFlash&&a.url&&a.url.match(/data:/i))return d();8<m&&null===a.isMovieStar&&(a.isMovieStar=!!(a.serverURL||a.type&&a.type.match(db)||a.url&&a.url.match(kb)));a=ga(a,void 0);f=d();8===m?k._createSound(a.id,a.loops||1,a.usePolicyFile):(k._createSound(a.id,a.url,a.usePeakData,a.useWaveformData,a.useEQData,a.isMovieStar,
a.isMovieStar?a.bufferTime:!1,a.loops||1,a.serverURL,a.duration||null,a.autoPlay,!0,a.autoLoad,a.usePolicyFile),a.serverURL||(f.connected=!0,a.onconnect&&a.onconnect.apply(f)));a.serverURL||!a.autoLoad&&!a.autoPlay||f.load(a)}!a.serverURL&&a.autoPlay&&f.play();return f};this.destroySound=function(b,e){if(!p(b))return!1;var d=c.sounds[b],a;d.stop();d._iO={};d.unload();for(a=0;a<c.soundIDs.length;a++)if(c.soundIDs[a]===b){c.soundIDs.splice(a,1);break}e||d.destruct(!0);delete c.sounds[b];return!0};this.load=
function(b,e){return p(b)?c.sounds[b].load(e):!1};this.unload=function(b){return p(b)?c.sounds[b].unload():!1};this.onposition=this.onPosition=function(b,e,d,a){return p(b)?c.sounds[b].onposition(e,d,a):!1};this.clearOnPosition=function(b,e,d){return p(b)?c.sounds[b].clearOnPosition(e,d):!1};this.start=this.play=function(b,e){var d=null,a=e&&!(e instanceof Object);if(!l||!c.ok())return!1;if(p(b,a))a&&(e={url:e});else{if(!a)return!1;a&&(e={url:e});e&&e.url&&(e.id=b,d=c.createSound(e).play())}null===
d&&(d=c.sounds[b].play(e));return d};this.setPlaybackRate=function(b,e,d){return p(b)?c.sounds[b].setPlaybackRate(e,d):!1};this.setPosition=function(b,e){return p(b)?c.sounds[b].setPosition(e):!1};this.stop=function(b){return p(b)?c.sounds[b].stop():!1};this.stopAll=function(){for(var b in c.sounds)c.sounds.hasOwnProperty(b)&&c.sounds[b].stop()};this.pause=function(b){return p(b)?c.sounds[b].pause():!1};this.pauseAll=function(){var b;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].pause()};
this.resume=function(b){return p(b)?c.sounds[b].resume():!1};this.resumeAll=function(){var b;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].resume()};this.togglePause=function(b){return p(b)?c.sounds[b].togglePause():!1};this.setPan=function(b,e){return p(b)?c.sounds[b].setPan(e):!1};this.setVolume=function(b,e){var d,a;if(b!==h&&!isNaN(b)&&e===h){d=0;for(a=c.soundIDs.length;d<a;d++)c.sounds[c.soundIDs[d]].setVolume(b);return!1}return p(b)?c.sounds[b].setVolume(e):!1};this.mute=function(b){var e=
0;b instanceof String&&(b=null);if(b)return p(b)?c.sounds[b].mute():!1;for(e=c.soundIDs.length-1;0<=e;e--)c.sounds[c.soundIDs[e]].mute();return c.muted=!0};this.muteAll=function(){c.mute()};this.unmute=function(b){b instanceof String&&(b=null);if(b)return p(b)?c.sounds[b].unmute():!1;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].unmute();c.muted=!1;return!0};this.unmuteAll=function(){c.unmute()};this.toggleMute=function(b){return p(b)?c.sounds[b].toggleMute():!1};this.getMemoryUse=function(){var b=
0;k&&8!==m&&(b=parseInt(k._getMemoryUse(),10));return b};this.disable=function(b){var e;b===h&&(b=!1);if(A)return!1;A=!0;for(e=c.soundIDs.length-1;0<=e;e--)ya(c.sounds[c.soundIDs[e]]);ya(c);P(b);r.remove(g,"load",G);return!0};this.canPlayMIME=function(b){var e;c.hasHTML5&&(e=X({type:b}));!e&&u&&(e=b&&c.ok()?!!(8<m&&b.match(db)||b.match(c.mimePattern)):null);return e};this.canPlayURL=function(b){var e;c.hasHTML5&&(e=X({url:b}));!e&&u&&(e=b&&c.ok()?!!b.match(c.filePattern):null);return e};this.canPlayLink=
function(b){return b.type!==h&&b.type&&c.canPlayMIME(b.type)?!0:c.canPlayURL(b.href)};this.getSoundById=function(b,e){return b?c.sounds[b]:null};this.onready=function(b,c){if("function"===typeof b)c||(c=g),sa("onready",b,c),E();else throw S("needFunction","onready");return!0};this.ontimeout=function(b,c){if("function"===typeof b)c||(c=g),sa("ontimeout",b,c),E({type:"ontimeout"});else throw S("needFunction","ontimeout");return!0};this._wD=this._writeDebug=function(b,c){return!0};this._debug=function(){};
this.reboot=function(b,e){var d,a,f;for(d=c.soundIDs.length-1;0<=d;d--)c.sounds[c.soundIDs[d]].destruct();if(k)try{D&&(Aa=k.innerHTML),R=k.parentNode.removeChild(k)}catch(h){}Aa=R=u=k=null;c.enabled=Q=l=T=Ca=N=O=A=y=c.swfLoaded=!1;c.soundIDs=[];c.sounds={};$a=0;Ga=!1;if(b)x=[];else for(d in x)if(x.hasOwnProperty(d))for(a=0,f=x[d].length;a<f;a++)x[d][a].fired=!1;c.html5={usingFlash:null};c.flash={};c.html5Only=!1;c.ignoreFlash=!1;g.setTimeout(function(){e||c.beginDelayedInit()},20);return c};this.reset=
function(){return c.reboot(!0,!0)};this.getMoviePercent=function(){return k&&"PercentLoaded"in k?k.PercentLoaded():null};this.beginDelayedInit=function(){qa=!0;F();setTimeout(function(){if(Ca)return!1;ea();da();return Ca=!0},20);H()};this.destruct=function(){c.disable(!0)};M=function(b){var e,d,a=this,f,L,fb,g,n,q,t=!1,l=[],u=0,x,A,v=null,z;d=e=null;this.sID=this.id=b.id;this.url=b.url;this._iO=this.instanceOptions=this.options=w(b);this.pan=this.options.pan;this.volume=this.options.volume;this.isHTML5=
!1;this._a=null;z=!this.url;this.id3={};this._debug=function(){};this.load=function(b){var e=null,d;b!==h?a._iO=w(b,a.options):(b=a.options,a._iO=b,v&&v!==a.url&&(a._iO.url=a.url,a.url=null));a._iO.url||(a._iO.url=a.url);a._iO.url=ia(a._iO.url);d=a.instanceOptions=a._iO;if(!d.url&&!a.url)return a;if(d.url===a.url&&0!==a.readyState&&2!==a.readyState)return 3===a.readyState&&d.onload&&Y(a,function(){d.onload.apply(a,[!!a.duration])}),a;a.loaded=!1;a.readyState=1;a.playState=0;a.id3={};if(ja(d))e=a._setup_html5(d),
e._called_load||(a._html5_canplay=!1,a.url!==d.url&&(a._a.src=d.url,a.setPosition(0)),a._a.autobuffer="auto",a._a.preload="auto",a._a._called_load=!0);else{if(c.html5Only||a._iO.url&&a._iO.url.match(/data:/i))return a;try{a.isHTML5=!1,a._iO=ga(fa(d)),a._iO.autoPlay&&(a._iO.position||a._iO.from)&&(a._iO.autoPlay=!1),d=a._iO,8===m?k._load(a.id,d.url,d.stream,d.autoPlay,d.usePolicyFile):k._load(a.id,d.url,!!d.stream,!!d.autoPlay,d.loops||1,!!d.autoLoad,d.usePolicyFile)}catch(f){J({type:"SMSOUND_LOAD_JS_EXCEPTION",
fatal:!0})}}a.url=d.url;return a};this.unload=function(){0!==a.readyState&&(a.isHTML5?(g(),a._a&&(a._a.pause(),v=ka(a._a))):8===m?k._unload(a.id,"about:blank"):k._unload(a.id),f());return a};this.destruct=function(b){a.isHTML5?(g(),a._a&&(a._a.pause(),ka(a._a),y||fb(),a._a._s=null,a._a=null)):(a._iO.onfailure=null,k._destroySound(a.id));b||c.destroySound(a.id,!0)};this.start=this.play=function(b,e){var d,f,g,L;d=!0;e=e===h?!0:e;b||(b={});a.url&&(a._iO.url=a.url);a._iO=w(a._iO,a.options);a._iO=w(b,
a._iO);a._iO.url=ia(a._iO.url);a.instanceOptions=a._iO;if(!a.isHTML5&&a._iO.serverURL&&!a.connected)return a.getAutoPlay()||a.setAutoPlay(!0),a;ja(a._iO)&&(a._setup_html5(a._iO),n());if(1===a.playState&&!a.paused&&(d=a._iO.multiShot,!d))return a.isHTML5&&a.setPosition(a._iO.position),a;b.url&&b.url!==a.url&&(a.readyState||a.isHTML5||8!==m||!z?a.load(a._iO):z=!1);if(!a.loaded)if(0===a.readyState){if(a.isHTML5||c.html5Only)if(a.isHTML5)a.load(a._iO);else return a;else a._iO.autoPlay=!0,a.load(a._iO);
a.instanceOptions=a._iO}else if(2===a.readyState)return a;!a.isHTML5&&9===m&&0<a.position&&a.position===a.duration&&(b.position=0);a.paused&&0<=a.position&&(!a._iO.serverURL||0<a.position)?a.resume():(a._iO=w(b,a._iO),(!a.isHTML5&&null!==a._iO.position&&0<a._iO.position||null!==a._iO.from&&0<a._iO.from||null!==a._iO.to)&&0===a.instanceCount&&0===a.playState&&!a._iO.serverURL&&(d=function(){a._iO=w(b,a._iO);a.play(a._iO)},a.isHTML5&&!a._html5_canplay?a.load({_oncanplay:d}):a.isHTML5||a.loaded||a.readyState&&
2===a.readyState||a.load({onload:d}),a._iO=A()),(!a.instanceCount||a._iO.multiShotEvents||a.isHTML5&&a._iO.multiShot&&!y||!a.isHTML5&&8<m&&!a.getAutoPlay())&&a.instanceCount++,a._iO.onposition&&0===a.playState&&q(a),a.playState=1,a.paused=!1,a.position=a._iO.position===h||isNaN(a._iO.position)?0:a._iO.position,a.isHTML5||(a._iO=ga(fa(a._iO))),a._iO.onplay&&e&&(a._iO.onplay.apply(a),t=!0),a.setVolume(a._iO.volume,!0),a.setPan(a._iO.pan,!0),1!==a._iO.playbackRate&&a.setPlaybackRate(a._iO.playbackRate),
a.isHTML5?2>a.instanceCount?(n(),d=a._setup_html5(),a.setPosition(a._iO.position),d.play()):(f=new Audio(a._iO.url),g=function(){r.remove(f,"ended",g);a._onfinish(a);ka(f);f=null},L=function(){r.remove(f,"canplay",L);try{f.currentTime=a._iO.position/1E3}catch(b){}f.play()},r.add(f,"ended",g),a._iO.volume!==h&&(f.volume=Math.max(0,Math.min(1,a._iO.volume/100))),a.muted&&(f.muted=!0),a._iO.position?r.add(f,"canplay",L):f.play()):(d=k._start(a.id,a._iO.loops||1,9===m?a.position:a.position/1E3,a._iO.multiShot||
!1),9!==m||d||a._iO.onplayerror&&a._iO.onplayerror.apply(a)));return a};this.stop=function(b){var c=a._iO;1===a.playState&&(a._onbufferchange(0),a._resetOnPosition(0),a.paused=!1,a.isHTML5||(a.playState=0),x(),c.to&&a.clearOnPosition(c.to),a.isHTML5?a._a&&(b=a.position,a.setPosition(0),a.position=b,a._a.pause(),a.playState=0,a._onTimer(),g()):(k._stop(a.id,b),c.serverURL&&a.unload()),a.instanceCount=0,a._iO={},c.onstop&&c.onstop.apply(a));return a};this.setAutoPlay=function(b){a._iO.autoPlay=b;a.isHTML5||
(k._setAutoPlay(a.id,b),b&&(a.instanceCount||1!==a.readyState||a.instanceCount++))};this.getAutoPlay=function(){return a._iO.autoPlay};this.setPlaybackRate=function(b){b=Math.max(.5,Math.min(4,b));if(a.isHTML5)try{a._iO.playbackRate=b,a._a.playbackRate=b}catch(c){}return a};this.setPosition=function(b){b===h&&(b=0);var c=a.isHTML5?Math.max(b,0):Math.min(a.duration||a._iO.duration,Math.max(b,0));a.position=c;b=a.position/1E3;a._resetOnPosition(a.position);a._iO.position=c;if(!a.isHTML5)b=9===m?a.position:
b,a.readyState&&2!==a.readyState&&k._setPosition(a.id,b,a.paused||!a.playState,a._iO.multiShot);else if(a._a){if(a._html5_canplay){if(a._a.currentTime.toFixed(3)!==b.toFixed(3))try{a._a.currentTime=b,(0===a.playState||a.paused)&&a._a.pause()}catch(d){}}else if(b)return a;a.paused&&a._onTimer(!0)}return a};this.pause=function(b){if(a.paused||0===a.playState&&1!==a.readyState)return a;a.paused=!0;a.isHTML5?(a._setup_html5().pause(),g()):(b||b===h)&&k._pause(a.id,a._iO.multiShot);a._iO.onpause&&a._iO.onpause.apply(a);
return a};this.resume=function(){var b=a._iO;if(!a.paused)return a;a.paused=!1;a.playState=1;a.isHTML5?(a._setup_html5().play(),n()):(b.isMovieStar&&!b.serverURL&&a.setPosition(a.position),k._pause(a.id,b.multiShot));!t&&b.onplay?(b.onplay.apply(a),t=!0):b.onresume&&b.onresume.apply(a);return a};this.togglePause=function(){if(0===a.playState)return a.play({position:9!==m||a.isHTML5?a.position/1E3:a.position}),a;a.paused?a.resume():a.pause();return a};this.setPan=function(b,c){b===h&&(b=0);c===h&&
(c=!1);a.isHTML5||k._setPan(a.id,b);a._iO.pan=b;c||(a.pan=b,a.options.pan=b);return a};this.setVolume=function(b,d){b===h&&(b=100);d===h&&(d=!1);a.isHTML5?a._a&&(c.muted&&!a.muted&&(a.muted=!0,a._a.muted=!0),a._a.volume=Math.max(0,Math.min(1,b/100))):k._setVolume(a.id,c.muted&&!a.muted||a.muted?0:b);a._iO.volume=b;d||(a.volume=b,a.options.volume=b);return a};this.mute=function(){a.muted=!0;a.isHTML5?a._a&&(a._a.muted=!0):k._setVolume(a.id,0);return a};this.unmute=function(){a.muted=!1;var b=a._iO.volume!==
h;a.isHTML5?a._a&&(a._a.muted=!1):k._setVolume(a.id,b?a._iO.volume:a.options.volume);return a};this.toggleMute=function(){return a.muted?a.unmute():a.mute()};this.onposition=this.onPosition=function(b,c,d){l.push({position:parseInt(b,10),method:c,scope:d!==h?d:a,fired:!1});return a};this.clearOnPosition=function(a,b){var c;a=parseInt(a,10);if(!isNaN(a))for(c=0;c<l.length;c++)a!==l[c].position||b&&b!==l[c].method||(l[c].fired&&u--,l.splice(c,1))};this._processOnPosition=function(){var b,c;b=l.length;
if(!b||!a.playState||u>=b)return!1;for(--b;0<=b;b--)c=l[b],!c.fired&&a.position>=c.position&&(c.fired=!0,u++,c.method.apply(c.scope,[c.position]));return!0};this._resetOnPosition=function(a){var b,c;b=l.length;if(!b)return!1;for(--b;0<=b;b--)c=l[b],c.fired&&a<=c.position&&(c.fired=!1,u--);return!0};A=function(){var b=a._iO,c=b.from,d=b.to,e,f;f=function(){a.clearOnPosition(d,f);a.stop()};e=function(){if(null!==d&&!isNaN(d))a.onPosition(d,f)};null===c||isNaN(c)||(b.position=c,b.multiShot=!1,e());return b};
q=function(){var b,c=a._iO.onposition;if(c)for(b in c)if(c.hasOwnProperty(b))a.onPosition(parseInt(b,10),c[b])};x=function(){var b,c=a._iO.onposition;if(c)for(b in c)c.hasOwnProperty(b)&&a.clearOnPosition(parseInt(b,10))};n=function(){a.isHTML5&&Ta(a)};g=function(){a.isHTML5&&Ua(a)};f=function(b){b||(l=[],u=0);t=!1;a._hasTimer=null;a._a=null;a._html5_canplay=!1;a.bytesLoaded=null;a.bytesTotal=null;a.duration=a._iO&&a._iO.duration?a._iO.duration:null;a.durationEstimate=null;a.buffered=[];a.eqData=
[];a.eqData.left=[];a.eqData.right=[];a.failures=0;a.isBuffering=!1;a.instanceOptions={};a.instanceCount=0;a.loaded=!1;a.metadata={};a.readyState=0;a.muted=!1;a.paused=!1;a.peakData={left:0,right:0};a.waveformData={left:[],right:[]};a.playState=0;a.position=null;a.id3={}};f();this._onTimer=function(b){var c,f=!1,h={};(a._hasTimer||b)&&a._a&&(b||(0<a.playState||1===a.readyState)&&!a.paused)&&(c=a._get_html5_duration(),c!==e&&(e=c,a.duration=c,f=!0),a.durationEstimate=a.duration,c=1E3*a._a.currentTime||
0,c!==d&&(d=c,f=!0),(f||b)&&a._whileplaying(c,h,h,h,h));return f};this._get_html5_duration=function(){var b=a._iO;return(b=a._a&&a._a.duration?1E3*a._a.duration:b&&b.duration?b.duration:null)&&!isNaN(b)&&Infinity!==b?b:null};this._apply_loop=function(a,b){a.loop=1<b?"loop":""};this._setup_html5=function(b){b=w(a._iO,b);var c=y?Na:a._a,d=decodeURI(b.url),e;y?d===decodeURI(Ea)&&(e=!0):d===decodeURI(v)&&(e=!0);if(c){if(c._s)if(y)c._s&&c._s.playState&&!e&&c._s.stop();else if(!y&&d===decodeURI(v))return a._apply_loop(c,
b.loops),c;e||(v&&f(!1),c.src=b.url,Ea=v=a.url=b.url,c._called_load=!1)}else b.autoLoad||b.autoPlay?(a._a=new Audio(b.url),a._a.load()):a._a=Ja&&10>opera.version()?new Audio(null):new Audio,c=a._a,c._called_load=!1,y&&(Na=c);a.isHTML5=!0;a._a=c;c._s=a;L();a._apply_loop(c,b.loops);b.autoLoad||b.autoPlay?a.load():(c.autobuffer=!1,c.preload="auto");return c};L=function(){if(a._a._added_events)return!1;var b;a._a._added_events=!0;for(b in B)B.hasOwnProperty(b)&&a._a&&a._a.addEventListener(b,B[b],!1);
return!0};fb=function(){var b;a._a._added_events=!1;for(b in B)B.hasOwnProperty(b)&&a._a&&a._a.removeEventListener(b,B[b],!1)};this._onload=function(b){var c=!!b||!a.isHTML5&&8===m&&a.duration;a.loaded=c;a.readyState=c?3:2;a._onbufferchange(0);c||a.isHTML5||a._onerror();a._iO.onload&&Y(a,function(){a._iO.onload.apply(a,[c])});return!0};this._onerror=function(b,c){a._iO.onerror&&Y(a,function(){a._iO.onerror.apply(a,[b,c])})};this._onbufferchange=function(b){if(0===a.playState||b&&a.isBuffering||!b&&
!a.isBuffering)return!1;a.isBuffering=1===b;a._iO.onbufferchange&&a._iO.onbufferchange.apply(a,[b]);return!0};this._onsuspend=function(){a._iO.onsuspend&&a._iO.onsuspend.apply(a);return!0};this._onfailure=function(b,c,d){a.failures++;if(a._iO.onfailure&&1===a.failures)a._iO.onfailure(b,c,d)};this._onwarning=function(b,c,d){if(a._iO.onwarning)a._iO.onwarning(b,c,d)};this._onfinish=function(){var b=a._iO.onfinish;a._onbufferchange(0);a._resetOnPosition(0);a.instanceCount&&(a.instanceCount--,a.instanceCount||
(x(),a.playState=0,a.paused=!1,a.instanceCount=0,a.instanceOptions={},a._iO={},g(),a.isHTML5&&(a.position=0)),(!a.instanceCount||a._iO.multiShotEvents)&&b&&Y(a,function(){b.apply(a)}))};this._whileloading=function(b,c,d,e){var f=a._iO;a.bytesLoaded=b;a.bytesTotal=c;a.duration=Math.floor(d);a.bufferLength=e;a.durationEstimate=a.isHTML5||f.isMovieStar?a.duration:f.duration?a.duration>f.duration?a.duration:f.duration:parseInt(a.bytesTotal/a.bytesLoaded*a.duration,10);a.isHTML5||(a.buffered=[{start:0,
end:a.duration}]);(3!==a.readyState||a.isHTML5)&&f.whileloading&&f.whileloading.apply(a)};this._whileplaying=function(b,c,d,e,f){var g=a._iO;if(isNaN(b)||null===b)return!1;a.position=Math.max(0,b);a._processOnPosition();!a.isHTML5&&8<m&&(g.usePeakData&&c!==h&&c&&(a.peakData={left:c.leftPeak,right:c.rightPeak}),g.useWaveformData&&d!==h&&d&&(a.waveformData={left:d.split(","),right:e.split(",")}),g.useEQData&&f!==h&&f&&f.leftEQ&&(b=f.leftEQ.split(","),a.eqData=b,a.eqData.left=b,f.rightEQ!==h&&f.rightEQ&&
(a.eqData.right=f.rightEQ.split(","))));1===a.playState&&(a.isHTML5||8!==m||a.position||!a.isBuffering||a._onbufferchange(0),g.whileplaying&&g.whileplaying.apply(a));return!0};this._oncaptiondata=function(b){a.captiondata=b;a._iO.oncaptiondata&&a._iO.oncaptiondata.apply(a,[b])};this._onmetadata=function(b,c){var d={},e,f;e=0;for(f=b.length;e<f;e++)d[b[e]]=c[e];a.metadata=d;a._iO.onmetadata&&a._iO.onmetadata.call(a,a.metadata)};this._onid3=function(b,c){var d=[],e,f;e=0;for(f=b.length;e<f;e++)d[b[e]]=
c[e];a.id3=w(a.id3,d);a._iO.onid3&&a._iO.onid3.apply(a)};this._onconnect=function(b){b=1===b;if(a.connected=b)a.failures=0,p(a.id)&&(a.getAutoPlay()?a.play(h,a.getAutoPlay()):a._iO.autoLoad&&a.load()),a._iO.onconnect&&a._iO.onconnect.apply(a,[b])};this._ondataerror=function(b){0<a.playState&&a._iO.ondataerror&&a._iO.ondataerror.apply(a)}};wa=function(){return n.body||n.getElementsByTagName("div")[0]};aa=function(b){return n.getElementById(b)};w=function(b,e){var d=b||{},a,f;a=e===h?c.defaultOptions:
e;for(f in a)a.hasOwnProperty(f)&&d[f]===h&&(d[f]="object"!==typeof a[f]||null===a[f]?a[f]:w(d[f],a[f]));return d};Y=function(b,c){b.isHTML5||8!==m?c():g.setTimeout(c,0)};ba={onready:1,ontimeout:1,defaultOptions:1,flash9Options:1,movieStarOptions:1};ra=function(b,e){var d,a=!0,f=e!==h,g=c.setupOptions;for(d in b)if(b.hasOwnProperty(d))if("object"!==typeof b[d]||null===b[d]||b[d]instanceof Array||b[d]instanceof RegExp)f&&ba[e]!==h?c[e][d]=b[d]:g[d]!==h?(c.setupOptions[d]=b[d],c[d]=b[d]):ba[d]===h?
a=!1:c[d]instanceof Function?c[d].apply(c,b[d]instanceof Array?b[d]:[b[d]]):c[d]=b[d];else if(ba[d]===h)a=!1;else return ra(b[d],d);return a};r=function(){function b(a){a=hb.call(a);var b=a.length;d?(a[1]="on"+a[1],3<b&&a.pop()):3===b&&a.push(!1);return a}function c(b,e){var h=b.shift(),g=[a[e]];if(d)h[g](b[0],b[1]);else h[g].apply(h,b)}var d=g.attachEvent,a={add:d?"attachEvent":"addEventListener",remove:d?"detachEvent":"removeEventListener"};return{add:function(){c(b(arguments),"add")},remove:function(){c(b(arguments),
"remove")}}}();B={abort:q(function(){}),canplay:q(function(){var b=this._s,c;if(!b._html5_canplay){b._html5_canplay=!0;b._onbufferchange(0);c=b._iO.position===h||isNaN(b._iO.position)?null:b._iO.position/1E3;if(this.currentTime!==c)try{this.currentTime=c}catch(d){}b._iO._oncanplay&&b._iO._oncanplay()}}),canplaythrough:q(function(){var b=this._s;b.loaded||(b._onbufferchange(0),b._whileloading(b.bytesLoaded,b.bytesTotal,b._get_html5_duration()),b._onload(!0))}),durationchange:q(function(){var b=this._s,
c;c=b._get_html5_duration();isNaN(c)||c===b.duration||(b.durationEstimate=b.duration=c)}),ended:q(function(){this._s._onfinish()}),error:q(function(){var b=Xa[this.error.code]||null;this._s._onload(!1);this._s._onerror(this.error.code,b)}),loadeddata:q(function(){var b=this._s;b._loaded||la||(b.duration=b._get_html5_duration())}),loadedmetadata:q(function(){}),loadstart:q(function(){this._s._onbufferchange(1)}),play:q(function(){this._s._onbufferchange(0)}),playing:q(function(){this._s._onbufferchange(0)}),
progress:q(function(b){var c=this._s,d,a,f=0,f=b.target.buffered;d=b.loaded||0;var h=b.total||1;c.buffered=[];if(f&&f.length){d=0;for(a=f.length;d<a;d++)c.buffered.push({start:1E3*f.start(d),end:1E3*f.end(d)});f=1E3*(f.end(0)-f.start(0));d=Math.min(1,f/(1E3*b.target.duration))}isNaN(d)||(c._whileloading(d,h,c._get_html5_duration()),d&&h&&d===h&&B.canplaythrough.call(this,b))}),ratechange:q(function(){}),suspend:q(function(b){var c=this._s;B.progress.call(this,b);c._onsuspend()}),stalled:q(function(){}),
timeupdate:q(function(){this._s._onTimer()}),waiting:q(function(){this._s._onbufferchange(1)})};ja=function(b){return b&&(b.type||b.url||b.serverURL)?b.serverURL||b.type&&Z(b.type)?!1:b.type?X({type:b.type}):X({url:b.url})||c.html5Only||b.url.match(/data:/i):!1};ka=function(b){var e;b&&(e=la?"about:blank":c.html5.canPlayType("audio/wav")?"data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==":"about:blank",b.src=e,b._called_unload!==h&&(b._called_load=!1));y&&(Ea=
null);return e};X=function(b){if(!c.useHTML5Audio||!c.hasHTML5)return!1;var e=b.url||null;b=b.type||null;var d=c.audioFormats,a;if(b&&c.html5[b]!==h)return c.html5[b]&&!Z(b);if(!C){C=[];for(a in d)d.hasOwnProperty(a)&&(C.push(a),d[a].related&&(C=C.concat(d[a].related)));C=new RegExp("\\.("+C.join("|")+")(\\?.*)?$","i")}(a=e?e.toLowerCase().match(C):null)&&a.length?a=a[1]:b&&(e=b.indexOf(";"),a=(-1!==e?b.substr(0,e):b).substr(6));a&&c.html5[a]!==h?e=c.html5[a]&&!Z(a):(b="audio/"+a,e=c.html5.canPlayType({type:b}),
e=(c.html5[a]=e)&&c.html5[b]&&!Z(b));return e};Ya=function(){function b(a){var b,d=b=!1;if(!e||"function"!==typeof e.canPlayType)return b;if(a instanceof Array){k=0;for(b=a.length;k<b;k++)if(c.html5[a[k]]||e.canPlayType(a[k]).match(c.html5Test))d=!0,c.html5[a[k]]=!0,c.flash[a[k]]=!!a[k].match(cb);b=d}else a=e&&"function"===typeof e.canPlayType?e.canPlayType(a):!1,b=!(!a||!a.match(c.html5Test));return b}if(!c.useHTML5Audio||!c.hasHTML5)return u=c.html5.usingFlash=!0,!1;var e=Audio!==h?Ja&&10>opera.version()?
new Audio(null):new Audio:null,d,a,f={},g,k;g=c.audioFormats;for(d in g)if(g.hasOwnProperty(d)&&(a="audio/"+d,f[d]=b(g[d].type),f[a]=f[d],d.match(cb)?(c.flash[d]=!0,c.flash[a]=!0):(c.flash[d]=!1,c.flash[a]=!1),g[d]&&g[d].related))for(k=g[d].related.length-1;0<=k;k--)f["audio/"+g[d].related[k]]=f[d],c.html5[g[d].related[k]]=f[d],c.flash[g[d].related[k]]=f[d];f.canPlayType=e?b:null;c.html5=w(c.html5,f);c.html5.usingFlash=Wa();u=c.html5.usingFlash;return!0};I={};S=function(){};fa=function(b){8===m&&
1<b.loops&&b.stream&&(b.stream=!1);return b};ga=function(b,c){b&&!b.usePolicyFile&&(b.onid3||b.usePeakData||b.useWaveformData||b.useEQData)&&(b.usePolicyFile=!0);return b};oa=function(){return!1};ya=function(b){for(var c in b)b.hasOwnProperty(c)&&"function"===typeof b[c]&&(b[c]=oa)};za=function(b){b===h&&(b=!1);(A||b)&&c.disable(b)};Sa=function(b){var e=null;if(b)if(b.match(/\.swf(\?.*)?$/i)){if(e=b.substr(b.toLowerCase().lastIndexOf(".swf?")+4))return b}else b.lastIndexOf("/")!==b.length-1&&(b+=
"/");b=(b&&-1!==b.lastIndexOf("/")?b.substr(0,b.lastIndexOf("/")+1):"./")+c.movieURL;c.noSWFCache&&(b+="?ts="+(new Date).getTime());return b};ua=function(){m=parseInt(c.flashVersion,10);8!==m&&9!==m&&(c.flashVersion=m=8);var b=c.debugMode||c.debugFlash?"_debug.swf":".swf";c.useHTML5Audio&&!c.html5Only&&c.audioFormats.mp4.required&&9>m&&(c.flashVersion=m=9);c.version=c.versionNumber+(c.html5Only?" (HTML5-only mode)":9===m?" (AS3/Flash 9)":" (AS2/Flash 8)");8<m?(c.defaultOptions=w(c.defaultOptions,
c.flash9Options),c.features.buffering=!0,c.defaultOptions=w(c.defaultOptions,c.movieStarOptions),c.filePatterns.flash9=new RegExp("\\.(mp3|"+eb.join("|")+")(\\?.*)?$","i"),c.features.movieStar=!0):c.features.movieStar=!1;c.filePattern=c.filePatterns[8!==m?"flash9":"flash8"];c.movieURL=(8===m?"soundmanager2.swf":"soundmanager2_flash9.swf").replace(".swf",b);c.features.peakData=c.features.waveformData=c.features.eqData=8<m};Ra=function(b,c){k&&k._setPolling(b,c)};xa=function(){};p=this.getSoundById;
K=function(){var b=[];c.debugMode&&b.push("sm2_debug");c.debugFlash&&b.push("flash_debug");c.useHighPerformance&&b.push("high_performance");return b.join(" ")};Ba=function(){S("fbHandler");var b=c.getMoviePercent(),e={type:"FLASHBLOCK"};c.html5Only||(c.ok()?c.oMC&&(c.oMC.className=[K(),"movieContainer","swf_loaded"+(c.didFlashBlock?" swf_unblocked":"")].join(" ")):(u&&(c.oMC.className=K()+" movieContainer "+(null===b?"swf_timedout":"swf_error")),c.didFlashBlock=!0,E({type:"ontimeout",ignoreInit:!0,
error:e}),J(e)))};sa=function(b,c,d){x[b]===h&&(x[b]=[]);x[b].push({method:c,scope:d||null,fired:!1})};E=function(b){b||(b={type:c.ok()?"onready":"ontimeout"});if(!l&&b&&!b.ignoreInit||"ontimeout"===b.type&&(c.ok()||A&&!b.ignoreInit))return!1;var e={success:b&&b.ignoreInit?c.ok():!A},d=b&&b.type?x[b.type]||[]:[],a=[],f,e=[e],h=u&&!c.ok();b.error&&(e[0].error=b.error);b=0;for(f=d.length;b<f;b++)!0!==d[b].fired&&a.push(d[b]);if(a.length)for(b=0,f=a.length;b<f;b++)a[b].scope?a[b].method.apply(a[b].scope,
e):a[b].method.apply(this,e),h||(a[b].fired=!0);return!0};G=function(){g.setTimeout(function(){c.useFlashBlock&&Ba();E();"function"===typeof c.onload&&c.onload.apply(g);c.waitForWindowLoad&&r.add(g,"load",G)},1)};Fa=function(){if(z!==h)return z;var b=!1,c=navigator,d,a=g.ActiveXObject,f;try{f=c.plugins}catch(k){f=void 0}if(f&&f.length)(c=c.mimeTypes)&&c["application/x-shockwave-flash"]&&c["application/x-shockwave-flash"].enabledPlugin&&c["application/x-shockwave-flash"].enabledPlugin.description&&
(b=!0);else if(a!==h&&!t.match(/MSAppHost/i)){try{d=new a("ShockwaveFlash.ShockwaveFlash")}catch(n){d=null}b=!!d}return z=b};Wa=function(){var b,e,d=c.audioFormats;Ha&&t.match(/os (1|2|3_0|3_1)\s/i)?(c.hasHTML5=!1,c.html5Only=!0,c.oMC&&(c.oMC.style.display="none")):!c.useHTML5Audio||c.html5&&c.html5.canPlayType||(c.hasHTML5=!1);if(c.useHTML5Audio&&c.hasHTML5)for(e in W=!0,d)d.hasOwnProperty(e)&&d[e].required&&(c.html5.canPlayType(d[e].type)?c.preferFlash&&(c.flash[e]||c.flash[d[e].type])&&(b=!0):
(W=!1,b=!0));c.ignoreFlash&&(b=!1,W=!0);c.html5Only=c.hasHTML5&&c.useHTML5Audio&&!b;return!c.html5Only};ia=function(b){var e,d,a=0;if(b instanceof Array){e=0;for(d=b.length;e<d;e++)if(b[e]instanceof Object){if(c.canPlayMIME(b[e].type)){a=e;break}}else if(c.canPlayURL(b[e])){a=e;break}b[a].url&&(b[a]=b[a].url);b=b[a]}return b};Ta=function(b){b._hasTimer||(b._hasTimer=!0,!ma&&c.html5PollingInterval&&(null===U&&0===ha&&(U=setInterval(Va,c.html5PollingInterval)),ha++))};Ua=function(b){b._hasTimer&&(b._hasTimer=
!1,!ma&&c.html5PollingInterval&&ha--)};Va=function(){var b;if(null===U||ha)for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].isHTML5&&c.sounds[c.soundIDs[b]]._hasTimer&&c.sounds[c.soundIDs[b]]._onTimer();else clearInterval(U),U=null};J=function(b){b=b!==h?b:{};"function"===typeof c.onerror&&c.onerror.apply(g,[{type:b.type!==h?b.type:null}]);b.fatal!==h&&b.fatal&&c.disable()};Za=function(){if(ab&&Fa()){var b=c.audioFormats,e,d;for(d in b)if(b.hasOwnProperty(d)&&("mp3"===d||"mp4"===d)&&(c.html5[d]=
!1,b[d]&&b[d].related))for(e=b[d].related.length-1;0<=e;e--)c.html5[b[d].related[e]]=!1}};this._setSandboxType=function(b){};this._externalInterfaceOK=function(b){c.swfLoaded||(c.swfLoaded=!0,na=!1,ab&&Za(),setTimeout(pa,D?100:1))};ea=function(b,e){function d(a,b){return'<param name="'+a+'" value="'+b+'" />'}if(N&&O)return!1;if(c.html5Only)return ua(),c.oMC=aa(c.movieID),pa(),O=N=!0,!1;var a=e||c.url,f=c.altURL||a,g=wa(),k=K(),m=null,m=n.getElementsByTagName("html")[0],l,q,p,m=m&&m.dir&&m.dir.match(/rtl/i);
b=b===h?c.id:b;ua();c.url=Sa(La?a:f);e=c.url;c.wmode=!c.wmode&&c.useHighPerformance?"transparent":c.wmode;null!==c.wmode&&(t.match(/msie 8/i)||!D&&!c.useHighPerformance)&&navigator.platform.match(/win32|win64/i)&&(V.push(I.spcWmode),c.wmode=null);g={name:b,id:b,src:e,quality:"high",allowScriptAccess:c.allowScriptAccess,bgcolor:c.bgColor,pluginspage:jb+"www.macromedia.com/go/getflashplayer",title:"JS/Flash audio component (SoundManager 2)",type:"application/x-shockwave-flash",wmode:c.wmode,hasPriority:"true"};
c.debugFlash&&(g.FlashVars="debug=1");c.wmode||delete g.wmode;if(D)a=n.createElement("div"),q=['<object id="'+b+'" data="'+e+'" type="'+g.type+'" title="'+g.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',d("movie",e),d("AllowScriptAccess",c.allowScriptAccess),d("quality",g.quality),c.wmode?d("wmode",c.wmode):"",d("bgcolor",c.bgColor),d("hasPriority","true"),c.debugFlash?d("FlashVars",g.FlashVars):
"","</object>"].join("");else for(l in a=n.createElement("embed"),g)g.hasOwnProperty(l)&&a.setAttribute(l,g[l]);xa();k=K();if(g=wa())if(c.oMC=aa(c.movieID)||n.createElement("div"),c.oMC.id)p=c.oMC.className,c.oMC.className=(p?p+" ":"movieContainer")+(k?" "+k:""),c.oMC.appendChild(a),D&&(l=c.oMC.appendChild(n.createElement("div")),l.className="sm2-object-box",l.innerHTML=q),O=!0;else{c.oMC.id=c.movieID;c.oMC.className="movieContainer "+k;l=k=null;c.useFlashBlock||(c.useHighPerformance?k={position:"fixed",
width:"8px",height:"8px",bottom:"0px",left:"0px",overflow:"hidden"}:(k={position:"absolute",width:"6px",height:"6px",top:"-9999px",left:"-9999px"},m&&(k.left=Math.abs(parseInt(k.left,10))+"px")));ib&&(c.oMC.style.zIndex=1E4);if(!c.debugFlash)for(p in k)k.hasOwnProperty(p)&&(c.oMC.style[p]=k[p]);try{D||c.oMC.appendChild(a),g.appendChild(c.oMC),D&&(l=c.oMC.appendChild(n.createElement("div")),l.className="sm2-object-box",l.innerHTML=q),O=!0}catch(r){throw Error(S("domError")+" \n"+r.toString());}}return N=
!0};da=function(){if(c.html5Only)return ea(),!1;if(k||!c.url)return!1;k=c.getMovie(c.id);k||(R?(D?c.oMC.innerHTML=Aa:c.oMC.appendChild(R),R=null,N=!0):ea(c.id,c.url),k=c.getMovie(c.id));"function"===typeof c.oninitmovie&&setTimeout(c.oninitmovie,1);return!0};H=function(){setTimeout(Qa,1E3)};ta=function(){g.setTimeout(function(){c.setup({preferFlash:!1}).reboot();c.didFlashBlock=!0;c.beginDelayedInit()},1)};Qa=function(){var b,e=!1;c.url&&!T&&(T=!0,r.remove(g,"load",H),z&&na&&!Ka||(l||(b=c.getMoviePercent(),
0<b&&100>b&&(e=!0)),setTimeout(function(){b=c.getMoviePercent();e?(T=!1,g.setTimeout(H,1)):!l&&bb&&(null===b?c.useFlashBlock||0===c.flashLoadTimeout?c.useFlashBlock&&Ba():!c.useFlashBlock&&W?ta():E({type:"ontimeout",ignoreInit:!0,error:{type:"INIT_FLASHBLOCK"}}):0!==c.flashLoadTimeout&&(!c.useFlashBlock&&W?ta():za(!0)))},c.flashLoadTimeout)))};ca=function(){if(Ka||!na)return r.remove(g,"focus",ca),!0;Ka=bb=!0;T=!1;H();r.remove(g,"focus",ca);return!0};P=function(b){if(l)return!1;if(c.html5Only)return l=
!0,G(),!0;var e=!0,d;c.useFlashBlock&&c.flashLoadTimeout&&!c.getMoviePercent()||(l=!0);d={type:!z&&u?"NO_FLASH":"INIT_TIMEOUT"};if(A||b)c.useFlashBlock&&c.oMC&&(c.oMC.className=K()+" "+(null===c.getMoviePercent()?"swf_timedout":"swf_error")),E({type:"ontimeout",error:d,ignoreInit:!0}),J(d),e=!1;A||(c.waitForWindowLoad&&!qa?r.add(g,"load",G):G());return e};Pa=function(){var b,e=c.setupOptions;for(b in e)e.hasOwnProperty(b)&&(c[b]===h?c[b]=e[b]:c[b]!==e[b]&&(c.setupOptions[b]=c[b]))};pa=function(){if(l)return!1;
if(c.html5Only)return l||(r.remove(g,"load",c.beginDelayedInit),c.enabled=!0,P()),!0;da();try{k._externalInterfaceTest(!1),Ra(!0,c.flashPollingInterval||(c.useHighPerformance?10:50)),c.debugMode||k._disableDebug(),c.enabled=!0,c.html5Only||r.add(g,"unload",oa)}catch(b){return J({type:"JS_TO_FLASH_EXCEPTION",fatal:!0}),za(!0),P(),!1}P();r.remove(g,"load",c.beginDelayedInit);return!0};F=function(){if(Q)return!1;Q=!0;Pa();xa();!z&&c.hasHTML5&&c.setup({useHTML5Audio:!0,preferFlash:!1});Ya();!z&&u&&(V.push(I.needFlash),
c.setup({flashLoadTimeout:1}));n.removeEventListener&&n.removeEventListener("DOMContentLoaded",F,!1);da();return!0};Da=function(){"complete"===n.readyState&&(F(),n.detachEvent("onreadystatechange",Da));return!0};va=function(){qa=!0;F();r.remove(g,"load",va)};Fa();r.add(g,"focus",ca);r.add(g,"load",H);r.add(g,"load",va);n.addEventListener?n.addEventListener("DOMContentLoaded",F,!1):n.attachEvent?n.attachEvent("onreadystatechange",Da):J({type:"NO_DOM2_EVENTS",fatal:!0})}if(!g||!g.document)throw Error("SoundManager requires a browser with window and document objects.");
var M=null;g.SM2_DEFER!==h&&SM2_DEFER||(M=new v);"object"===typeof module&&module&&"object"===typeof module.exports?(module.exports.SoundManager=v,module.exports.soundManager=M):"function"===typeof define&&define.amd&&define(function(){return{constructor:v,getInstance:function(h){!g.soundManager&&h instanceof Function&&(h=h(v),h instanceof v&&(g.soundManager=h));return g.soundManager}}});g.SoundManager=v;g.soundManager=M})(window);
/*!
 * Draggabilly PACKAGED v1.0.8
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 */


/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

(function (window) {



  // class helper functions from bonzo https://github.com/ded/bonzo

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;

  if ('classList' in document.documentElement) {
    hasClass = function (elem, c) {
      return elem.classList.contains(c);
    };
    addClass = function (elem, c) {
      elem.classList.add(c);
    };
    removeClass = function (elem, c) {
      elem.classList.remove(c);
    };
  }
  else {
    hasClass = function (elem, c) {
      return classReg(c).test(elem.className);
    };
    addClass = function (elem, c) {
      if (!hasClass(elem, c)) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function (elem, c) {
      elem.className = elem.className.replace(classReg(c), ' ');
    };
  }

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
  }

  var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define('classie/classie', classie);
  } else {
    // browser global
    window.classie = classie;
  }

})(window);

/*!
 * EventEmitter v4.2.4 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {


  /**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
  function EventEmitter() { }

  // Shortcuts to improve speed and size

  // Easy access to the prototype
  var proto = EventEmitter.prototype;

  /**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
  function indexOfListener(listeners, listener) {
    var i = listeners.length;
    while (i--) {
      if (listeners[i].listener === listener) {
        return i;
      }
    }

    return -1;
  }

  /**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
  function alias(name) {
    return function aliasClosure() {
      return this[name].apply(this, arguments);
    };
  }

  /**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
  proto.getListeners = function getListeners(evt) {
    var events = this._getEvents();
    var response;
    var key;

    // Return a concatenated array of all matching events if
    // the selector is a regular expression.
    if (typeof evt === 'object') {
      response = {};
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          response[key] = events[key];
        }
      }
    }
    else {
      response = events[evt] || (events[evt] = []);
    }

    return response;
  };

  /**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
  proto.flattenListeners = function flattenListeners(listeners) {
    var flatListeners = [];
    var i;

    for (i = 0; i < listeners.length; i += 1) {
      flatListeners.push(listeners[i].listener);
    }

    return flatListeners;
  };

  /**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
  proto.getListenersAsObject = function getListenersAsObject(evt) {
    var listeners = this.getListeners(evt);
    var response;

    if (listeners instanceof Array) {
      response = {};
      response[evt] = listeners;
    }

    return response || listeners;
  };

  /**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.addListener = function addListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt);
    var listenerIsWrapped = typeof listener === 'object';
    var key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
        listeners[key].push(listenerIsWrapped ? listener : {
          listener: listener,
          once: false
        });
      }
    }

    return this;
  };

  /**
	 * Alias of addListener
	 */
  proto.on = alias('addListener');

  /**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.addOnceListener = function addOnceListener(evt, listener) {
    return this.addListener(evt, {
      listener: listener,
      once: true
    });
  };

  /**
	 * Alias of addOnceListener.
	 */
  proto.once = alias('addOnceListener');

  /**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.defineEvent = function defineEvent(evt) {
    this.getListeners(evt);
    return this;
  };

  /**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.defineEvents = function defineEvents(evts) {
    for (var i = 0; i < evts.length; i += 1) {
      this.defineEvent(evts[i]);
    }
    return this;
  };

  /**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.removeListener = function removeListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt);
    var index;
    var key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        index = indexOfListener(listeners[key], listener);

        if (index !== -1) {
          listeners[key].splice(index, 1);
        }
      }
    }

    return this;
  };

  /**
	 * Alias of removeListener
	 */
  proto.off = alias('removeListener');

  /**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.addListeners = function addListeners(evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(false, evt, listeners);
  };

  /**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.removeListeners = function removeListeners(evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(true, evt, listeners);
  };

  /**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
    var i;
    var value;
    var single = remove ? this.removeListener : this.addListener;
    var multiple = remove ? this.removeListeners : this.addListeners;

    // If evt is an object then pass each of it's properties to this method
    if (typeof evt === 'object' && !(evt instanceof RegExp)) {
      for (i in evt) {
        if (evt.hasOwnProperty(i) && (value = evt[i])) {
          // Pass the single listener straight through to the singular method
          if (typeof value === 'function') {
            single.call(this, i, value);
          }
          else {
            // Otherwise pass back to the multiple function
            multiple.call(this, i, value);
          }
        }
      }
    }
    else {
      // So evt must be a string
      // And listeners must be an array of listeners
      // Loop over it and pass each one to the multiple method
      i = listeners.length;
      while (i--) {
        single.call(this, evt, listeners[i]);
      }
    }

    return this;
  };

  /**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.removeEvent = function removeEvent(evt) {
    var type = typeof evt;
    var events = this._getEvents();
    var key;

    // Remove different things depending on the state of evt
    if (type === 'string') {
      // Remove all listeners for the specified event
      delete events[evt];
    }
    else if (type === 'object') {
      // Remove all events matching the regex.
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          delete events[key];
        }
      }
    }
    else {
      // Remove all listeners in all events
      delete this._events;
    }

    return this;
  };

  /**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
  proto.removeAllListeners = alias('removeEvent');

  /**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.emitEvent = function emitEvent(evt, args) {
    var listeners = this.getListenersAsObject(evt);
    var listener;
    var i;
    var key;
    var response;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        i = listeners[key].length;

        while (i--) {
          // If the listener returns true then it shall be removed from the event
          // The function is executed either with a basic call or an apply if there is an args array
          listener = listeners[key][i];

          if (listener.once === true) {
            this.removeListener(evt, listener.listener);
          }

          response = listener.listener.apply(this, args || []);

          if (response === this._getOnceReturnValue()) {
            this.removeListener(evt, listener.listener);
          }
        }
      }
    }

    return this;
  };

  /**
	 * Alias of emitEvent
	 */
  proto.trigger = alias('emitEvent');

  /**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.emit = function emit(evt) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(evt, args);
  };

  /**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
  proto.setOnceReturnValue = function setOnceReturnValue(value) {
    this._onceReturnValue = value;
    return this;
  };

  /**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
  proto._getOnceReturnValue = function _getOnceReturnValue() {
    if (this.hasOwnProperty('_onceReturnValue')) {
      return this._onceReturnValue;
    }
    else {
      return true;
    }
  };

  /**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
  proto._getEvents = function _getEvents() {
    return this._events || (this._events = {});
  };

  // Expose the class either via AMD, CommonJS or the global object
  if (typeof define === 'function' && define.amd) {
    define('eventEmitter/EventEmitter', [], function () {
      return EventEmitter;
    });
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = EventEmitter;
  }
  else {
    this.EventEmitter = EventEmitter;
  }
}.call(this));

/*!
 * eventie v1.0.3
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

(function (window) {



  var docElem = document.documentElement;

  var bind = function () { };

  if (docElem.addEventListener) {
    bind = function (obj, type, fn) {
      obj.addEventListener(type, fn, false);
    };
  } else if (docElem.attachEvent) {
    bind = function (obj, type, fn) {
      obj[type + fn] = fn.handleEvent ?
        function () {
          var event = window.event;
          // add event.target
          event.target = event.target || event.srcElement;
          fn.handleEvent.call(fn, event);
        } :
        function () {
          var event = window.event;
          // add event.target
          event.target = event.target || event.srcElement;
          fn.call(obj, event);
        };
      obj.attachEvent("on" + type, obj[type + fn]);
    };
  }

  var unbind = function () { };

  if (docElem.removeEventListener) {
    unbind = function (obj, type, fn) {
      obj.removeEventListener(type, fn, false);
    };
  } else if (docElem.detachEvent) {
    unbind = function (obj, type, fn) {
      obj.detachEvent("on" + type, obj[type + fn]);
      try {
        delete obj[type + fn];
      } catch (err) {
        // can't delete window object properties
        obj[type + fn] = undefined;
      }
    };
  }

  var eventie = {
    bind: bind,
    unbind: unbind
  };

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define('eventie/eventie', eventie);
  } else {
    // browser global
    window.eventie = eventie;
  }

})(this);

/*!
 * getStyleProperty by kangax
 * http://perfectionkills.com/feature-testing-css-properties/
 */

/*jshint browser: true, strict: true, undef: true */
/*globals define: false */

(function (window) {



  var prefixes = 'Webkit Moz ms Ms O'.split(' ');
  var docElemStyle = document.documentElement.style;

  function getStyleProperty(propName) {
    if (!propName) {
      return;
    }

    // test standard property first
    if (typeof docElemStyle[propName] === 'string') {
      return propName;
    }

    // capitalize
    propName = propName.charAt(0).toUpperCase() + propName.slice(1);

    // test vendor specific properties
    var prefixed;
    for (var i = 0, len = prefixes.length; i < len; i++) {
      prefixed = prefixes[i] + propName;
      if (typeof docElemStyle[prefixed] === 'string') {
        return prefixed;
      }
    }
  }

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define('get-style-property/get-style-property', [], function () {
      return getStyleProperty;
    });
  } else {
    // browser global
    window.getStyleProperty = getStyleProperty;
  }

})(window);

/**
 * getSize v1.1.5
 * measure size of elements
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false */

(function (window, undefined) {



  // -------------------------- helpers -------------------------- //

  var defView = document.defaultView;
  var isComputedStyle = defView && defView.getComputedStyle;

  var getStyle = isComputedStyle ?
    function (elem) {
      return defView.getComputedStyle(elem, null);
    } :
    function (elem) {
      return elem.currentStyle;
    };

  // get a number from a string, not a percentage
  function getStyleSize(value) {
    var num = parseFloat(value);
    // not a percent like '100%', and a number
    var isValid = value.indexOf('%') === -1 && !isNaN(num);
    return isValid && num;
  }

  // -------------------------- measurements -------------------------- //

  var measurements = [
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopWidth',
    'borderBottomWidth'
  ];

  function getZeroSize() {
    var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    };
    for (var i = 0, len = measurements.length; i < len; i++) {
      var measurement = measurements[i];
      size[measurement] = 0;
    }
    return size;
  }



  function defineGetSize(getStyleProperty) {

    // -------------------------- box sizing -------------------------- //

    var boxSizingProp = getStyleProperty('boxSizing');
    var isBoxSizeOuter;

    /**
     * WebKit measures the outer-width on style.width on border-box elems
     * IE & Firefox measures the inner-width
     */
    (function () {
      if (!boxSizingProp) {
        return;
      }

      var div = document.createElement('div');
      div.style.width = '200px';
      div.style.padding = '1px 2px 3px 4px';
      div.style.borderStyle = 'solid';
      div.style.borderWidth = '1px 2px 3px 4px';
      div.style[boxSizingProp] = 'border-box';

      var body = document.body || document.documentElement;
      body.appendChild(div);
      var style = getStyle(div);

      isBoxSizeOuter = getStyleSize(style.width) === 200;
      body.removeChild(div);
    })();


    // -------------------------- getSize -------------------------- //

    function getSize(elem) {
      // use querySeletor if elem is string
      if (typeof elem === 'string') {
        elem = document.querySelector(elem);
      }

      // do not proceed on non-objects
      if (!elem || typeof elem !== 'object' || !elem.nodeType) {
        return;
      }

      var style = getStyle(elem);

      // if hidden, everything is 0
      if (style.display === 'none') {
        return getZeroSize();
      }

      var size = {};
      size.width = elem.offsetWidth;
      size.height = elem.offsetHeight;

      var isBorderBox = size.isBorderBox = !!(boxSizingProp &&
        style[boxSizingProp] && style[boxSizingProp] === 'border-box');

      // get all measurements
      for (var i = 0, len = measurements.length; i < len; i++) {
        var measurement = measurements[i];
        var value = style[measurement];
        value = mungeNonPixel(elem, value);
        var num = parseFloat(value);
        // any 'auto', 'medium' value will be 0
        size[measurement] = !isNaN(num) ? num : 0;
      }

      var paddingWidth = size.paddingLeft + size.paddingRight;
      var paddingHeight = size.paddingTop + size.paddingBottom;
      var marginWidth = size.marginLeft + size.marginRight;
      var marginHeight = size.marginTop + size.marginBottom;
      var borderWidth = size.borderLeftWidth + size.borderRightWidth;
      var borderHeight = size.borderTopWidth + size.borderBottomWidth;

      var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

      // overwrite width and height if we can get it from style
      var styleWidth = getStyleSize(style.width);
      if (styleWidth !== false) {
        size.width = styleWidth +
          // add padding and border unless it's already including it
          (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
      }

      var styleHeight = getStyleSize(style.height);
      if (styleHeight !== false) {
        size.height = styleHeight +
          // add padding and border unless it's already including it
          (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
      }

      size.innerWidth = size.width - (paddingWidth + borderWidth);
      size.innerHeight = size.height - (paddingHeight + borderHeight);

      size.outerWidth = size.width + marginWidth;
      size.outerHeight = size.height + marginHeight;

      return size;
    }

    // IE8 returns percent values, not pixels
    // taken from jQuery's curCSS
    function mungeNonPixel(elem, value) {
      // IE8 and has percent value
      if (isComputedStyle || value.indexOf('%') === -1) {
        return value;
      }
      var style = elem.style;
      // Remember the original values
      var left = style.left;
      var rs = elem.runtimeStyle;
      var rsLeft = rs && rs.left;

      // Put in the new values to get a computed value out
      if (rsLeft) {
        rs.left = elem.currentStyle.left;
      }
      style.left = value;
      value = style.pixelLeft;

      // Revert the changed values
      style.left = left;
      if (rsLeft) {
        rs.left = rsLeft;
      }

      return value;
    }

    return getSize;

  }

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define('get-size/get-size', ['get-style-property/get-style-property'], defineGetSize);
  } else {
    // browser global
    window.getSize = defineGetSize(window.getStyleProperty);
  }

})(window);

/*!
 * Draggabilly v1.0.8
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 */

(function (window) {



  // vars
  var document = window.document;

  // -------------------------- helpers -------------------------- //

  // extend objects
  function extend(a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }
    return a;
  }

  function noop() { }

  // ----- get style ----- //

  var defView = document.defaultView;

  var getStyle = defView && defView.getComputedStyle ?
    function (elem) {
      return defView.getComputedStyle(elem, null);
    } :
    function (elem) {
      return elem.currentStyle;
    };


  // http://stackoverflow.com/a/384380/182183
  var isElement = (typeof HTMLElement === 'object') ?
    function isElementDOM2(obj) {
      return obj instanceof HTMLElement;
    } :
    function isElementQuirky(obj) {
      return obj && typeof obj === 'object' &&
        obj.nodeType === 1 && typeof obj.nodeName === 'string';
    };

  // -------------------------- requestAnimationFrame -------------------------- //

  // https://gist.github.com/1866474

  var lastTime = 0;
  var prefixes = 'webkit moz ms o'.split(' ');
  // get unprefixed rAF and cAF, if present
  var requestAnimationFrame = window.requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame;
  // loop through vendor prefixes and get prefixed rAF and cAF
  var prefix;
  for (var i = 0; i < prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame) {
      break;
    }
    prefix = prefixes[i];
    requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
    cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] ||
                              window[prefix + 'CancelRequestAnimationFrame'];
  }

  // fallback to setTimeout and clearTimeout if either request/cancel is not supported
  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    cancelAnimationFrame = function (id) {
      window.clearTimeout(id);
    };
  }

  // -------------------------- definition -------------------------- //

  function draggabillyDefinition(classie, EventEmitter, eventie, getStyleProperty, getSize) {

    // -------------------------- support -------------------------- //

    var transformProperty = getStyleProperty('transform');
    // TODO fix quick & dirty check for 3D support
    var is3d = !!getStyleProperty('perspective');

    // --------------------------  -------------------------- //

    function Draggabilly(element, options) {
      // querySelector if string
      this.element = typeof element === 'string' ?
        document.querySelector(element) : element;

      this.options = extend({}, this.options);
      extend(this.options, options);

      this._create();
    }

    // inherit EventEmitter methods
    extend(Draggabilly.prototype, EventEmitter.prototype);

    Draggabilly.prototype.options = {
    };

    Draggabilly.prototype._create = function () {

      // properties
      this.position = {};
      this._getPosition();

      this.startPoint = { x: 0, y: 0 };
      this.dragPoint = { x: 0, y: 0 };

      this.startPosition = extend({}, this.position);

      // set relative positioning
      var style = getStyle(this.element);
      if (style.position !== 'relative' && style.position !== 'absolute') {
        this.element.style.position = 'relative';
      }

      this.enable();
      this.setHandles();

    };

    /**
     * set this.handles and bind start events to 'em
     */
    Draggabilly.prototype.setHandles = function () {
      this.handles = this.options.handle ?
        this.element.querySelectorAll(this.options.handle) : [this.element];

      for (var i = 0, len = this.handles.length; i < len; i++) {
        var handle = this.handles[i];
        // bind pointer start event
        // listen for both, for devices like Chrome Pixel
        //   which has touch and mouse events
        eventie.bind(handle, 'mousedown', this);
        eventie.bind(handle, 'touchstart', this);
        disableImgOndragstart(handle);
      }
    };

    // remove default dragging interaction on all images in IE8
    // IE8 does its own drag thing on images, which messes stuff up

    function noDragStart() {
      return false;
    }

    // TODO replace this with a IE8 test
    var isIE8 = 'attachEvent' in document.documentElement;

    // IE8 only
    var disableImgOndragstart = !isIE8 ? noop : function (handle) {

      if (handle.nodeName === 'IMG') {
        handle.ondragstart = noDragStart;
      }

      var images = handle.querySelectorAll('img');
      for (var i = 0, len = images.length; i < len; i++) {
        var img = images[i];
        img.ondragstart = noDragStart;
      }
    };


    // get left/top position from style
    Draggabilly.prototype._getPosition = function () {
      // properties
      var style = getStyle(this.element);

      var x = parseInt(style.left, 10);
      var y = parseInt(style.top, 10);

      // clean up 'auto' or other non-integer values
      this.position.x = isNaN(x) ? 0 : x;
      this.position.y = isNaN(y) ? 0 : y;

      this._addTransformPosition(style);
    };

    // add transform: translate( x, y ) to position
    Draggabilly.prototype._addTransformPosition = function (style) {
      if (!transformProperty) {
        return;
      }
      var transform = style[transformProperty];
      // bail out if value is 'none'
      if (transform.indexOf('matrix') !== 0) {
        return;
      }
      // split matrix(1, 0, 0, 1, x, y)
      var matrixValues = transform.split(',');
      // translate X value is in 12th or 4th position
      var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
      var translateX = parseInt(matrixValues[xIndex], 10);
      // translate Y value is in 13th or 5th position
      var translateY = parseInt(matrixValues[xIndex + 1], 10);
      this.position.x += translateX;
      this.position.y += translateY;
    };

    // -------------------------- events -------------------------- //

    // trigger handler methods for events
    Draggabilly.prototype.handleEvent = function (event) {
      var method = 'on' + event.type;
      if (this[method]) {
        this[method](event);
      }
    };

    // returns the touch that we're keeping track of
    Draggabilly.prototype.getTouch = function (touches) {
      for (var i = 0, len = touches.length; i < len; i++) {
        var touch = touches[i];
        if (touch.identifier === this.pointerIdentifier) {
          return touch;
        }
      }
    };

    // ----- start event ----- //

    Draggabilly.prototype.onmousedown = function (event) {
      // dismiss clicks from right or middle buttons
      var button = event.button;
      if (button && (button !== 0 && button !== 1)) {
        return;
      }
      this.dragStart(event, event);
    };

    Draggabilly.prototype.ontouchstart = function (event) {
      // disregard additional touches
      if (this.isDragging) {
        return;
      }

      this.dragStart(event, event.changedTouches[0]);
    };

    function setPointerPoint(point, pointer) {
      point.x = pointer.pageX !== undefined ? pointer.pageX : pointer.clientX;
      point.y = pointer.pageY !== undefined ? pointer.pageY : pointer.clientY;
    }

    /**
     * drag start
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    Draggabilly.prototype.dragStart = function (event, pointer) {
      if (!this.isEnabled) {
        return;
      }

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }

      var isTouch = event.type === 'touchstart';

      // save pointer identifier to match up touch events
      this.pointerIdentifier = pointer.identifier;

      this._getPosition();

      this.measureContainment();

      // point where drag began
      setPointerPoint(this.startPoint, pointer);
      // position _when_ drag began
      this.startPosition.x = this.position.x;
      this.startPosition.y = this.position.y;

      // reset left/top style
      this.setLeftTop();

      this.dragPoint.x = 0;
      this.dragPoint.y = 0;

      // bind move and end events
      this._bindEvents({
        events: isTouch ? ['touchmove', 'touchend', 'touchcancel'] :
          ['mousemove', 'mouseup'],
        // IE8 needs to be bound to document
        node: event.preventDefault ? window : document
      });

      classie.add(this.element, 'is-dragging');

      // reset isDragging flag
      this.isDragging = true;

      this.emitEvent('dragStart', [this, event, pointer]);

      // start animation
      this.animate();
    };

    Draggabilly.prototype._bindEvents = function (args) {
      for (var i = 0, len = args.events.length; i < len; i++) {
        var event = args.events[i];
        eventie.bind(args.node, event, this);
      }
      // save these arguments
      this._boundEvents = args;
    };

    Draggabilly.prototype._unbindEvents = function () {
      var args = this._boundEvents;
      // IE8 can trigger dragEnd twice, check for _boundEvents
      if (!args || !args.events) {
        return;
      }

      for (var i = 0, len = args.events.length; i < len; i++) {
        var event = args.events[i];
        eventie.unbind(args.node, event, this);
      }
      delete this._boundEvents;
    };

    Draggabilly.prototype.measureContainment = function () {
      var containment = this.options.containment;
      if (!containment) {
        return;
      }

      this.size = getSize(this.element);
      var elemRect = this.element.getBoundingClientRect();

      // use element if element
      var container = isElement(containment) ? containment :
        // fallback to querySelector if string
        typeof containment === 'string' ? document.querySelector(containment) :
        // otherwise just `true`, use the parent
        this.element.parentNode;

      this.containerSize = getSize(container);
      var containerRect = container.getBoundingClientRect();

      this.relativeStartPosition = {
        x: elemRect.left - containerRect.left,
        y: elemRect.top - containerRect.top
      };
    };

    // ----- move event ----- //

    Draggabilly.prototype.onmousemove = function (event) {
      this.dragMove(event, event);
    };

    Draggabilly.prototype.ontouchmove = function (event) {
      var touch = this.getTouch(event.changedTouches);
      if (touch) {
        this.dragMove(event, touch);
      }
    };

    /**
     * drag move
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    Draggabilly.prototype.dragMove = function (event, pointer) {

      setPointerPoint(this.dragPoint, pointer);
      var dragX = this.dragPoint.x - this.startPoint.x;
      var dragY = this.dragPoint.y - this.startPoint.y;

      var grid = this.options.grid;
      var gridX = grid && grid[0];
      var gridY = grid && grid[1];

      dragX = applyGrid(dragX, gridX);
      dragY = applyGrid(dragY, gridY);

      if (this.options.containment) {
        var relX = this.relativeStartPosition.x;
        var relY = this.relativeStartPosition.y;
        var minX = applyGrid(-relX, gridX, 'ceil');
        var minY = applyGrid(-relY, gridY, 'ceil');
        var maxX = this.containerSize.width - relX - this.size.width;
        var maxY = this.containerSize.height - relY - this.size.height;
        maxX = applyGrid(maxX, gridX, 'floor');
        maxY = applyGrid(maxY, gridY, 'floor');
        dragX = Math.min(maxX, Math.max(minX, dragX));
        dragY = Math.min(maxY, Math.max(minY, dragY));
      }

      this.position.x = this.startPosition.x + dragX;
      this.position.y = this.startPosition.y + dragY;
      // set dragPoint properties
      this.dragPoint.x = dragX;
      this.dragPoint.y = dragY;

      this.emitEvent('dragMove', [this, event, pointer]);
    };

    function applyGrid(value, grid, method) {
      method = method || 'round';
      return grid ? Math[method](value / grid) * grid : value;
    }


    // ----- end event ----- //

    Draggabilly.prototype.onmouseup = function (event) {
      this.dragEnd(event, event);
    };

    Draggabilly.prototype.ontouchend = function (event) {
      var touch = this.getTouch(event.changedTouches);
      if (touch) {
        this.dragEnd(event, touch);
      }
    };

    /**
     * drag end
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    Draggabilly.prototype.dragEnd = function (event, pointer) {
      this.isDragging = false;

      delete this.pointerIdentifier;

      // use top left position when complete
      if (transformProperty) {
        this.element.style[transformProperty] = '';
        this.setLeftTop();
      }

      // remove events
      this._unbindEvents();

      classie.remove(this.element, 'is-dragging');

      this.emitEvent('dragEnd', [this, event, pointer]);

    };

    // ----- cancel event ----- //

    // coerce to end event
    Draggabilly.prototype.ontouchcancel = function (event) {
      var touch = this.getTouch(event.changedTouches);
      this.dragEnd(event, touch);
    };

    // -------------------------- animation -------------------------- //

    Draggabilly.prototype.animate = function () {
      // only render and animate if dragging
      if (!this.isDragging) {
        return;
      }

      this.positionDrag();

      var _this = this;
      requestAnimationFrame(function animateFrame() {
        _this.animate();
      });

    };

    // transform translate function
    var translate = is3d ?
      function (x, y) {
        return 'translate3d( ' + x + 'px, ' + y + 'px, 0)';
      } :
      function (x, y) {
        return 'translate( ' + x + 'px, ' + y + 'px)';
      };

    // left/top positioning
    Draggabilly.prototype.setLeftTop = function () {
      this.element.style.left = this.position.x + 'px';
      this.element.style.top = this.position.y + 'px';
    };

    Draggabilly.prototype.positionDrag = transformProperty ?
      function () {
        // position with transform
        this.element.style[transformProperty] = translate(this.dragPoint.x, this.dragPoint.y);
      } : Draggabilly.prototype.setLeftTop;

    Draggabilly.prototype.enable = function () {
      this.isEnabled = true;
    };

    Draggabilly.prototype.disable = function () {
      this.isEnabled = false;
      if (this.isDragging) {
        this.dragEnd();
      }
    };

    return Draggabilly;

  } // end definition

  // -------------------------- transport -------------------------- //

  if (typeof define === 'function' && define.amd) {
    // AMD
    define([
        'classie/classie',
        'eventEmitter/EventEmitter',
        'eventie/eventie',
        'get-style-property/get-style-property',
        'get-size/get-size'
    ],
      draggabillyDefinition);
  } else {
    // browser global
    window.Draggabilly = draggabillyDefinition(
      window.classie,
      window.EventEmitter,
      window.eventie,
      window.getStyleProperty,
      window.getSize
    );
  }

})(window);
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

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-shiv-cssclasses-teststyles-prefixes-load
 */
;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*! device.js 0.1.58 */
(function(){var a,b,c,d,e,f,g,h,i,j;a=window.device,window.device={},c=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return d("iphone")},device.ipod=function(){return d("ipod")},device.ipad=function(){return d("ipad")},device.android=function(){return d("android")},device.androidPhone=function(){return device.android()&&d("mobile")},device.androidTablet=function(){return device.android()&&!d("mobile")},device.blackberry=function(){return d("blackberry")||d("bb10")||d("rim")},device.blackberryPhone=function(){return device.blackberry()&&!d("tablet")},device.blackberryTablet=function(){return device.blackberry()&&d("tablet")},device.windows=function(){return d("windows")},device.windowsPhone=function(){return device.windows()&&d("phone")},device.windowsTablet=function(){return device.windows()&&d("touch")},device.fxos=function(){return d("(mobile; rv:")||d("(tablet; rv:")},device.fxosPhone=function(){return device.fxos()&&d("mobile")},device.fxosTablet=function(){return device.fxos()&&d("tablet")},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.portrait=function(){return 90!==Math.abs(window.orientation)},device.landscape=function(){return 90===Math.abs(window.orientation)},device.noConflict=function(){return window.device=a,this},d=function(a){return-1!==j.indexOf(a)},f=function(a){var b;return b=new RegExp(a,"i"),c.className.match(b)},b=function(a){return f(a)?void 0:c.className+=" "+a},h=function(a){return f(a)?c.className=c.className.replace(a,""):void 0},device.ios()?device.ipad()?b("ios ipad tablet"):device.iphone()?b("ios iphone mobile"):device.ipod()&&b("ios ipod mobile"):device.android()?device.androidTablet()?b("android tablet"):b("android mobile"):device.blackberry()?device.blackberryTablet()?b("blackberry tablet"):b("blackberry mobile"):device.windows()?device.windowsTablet()?b("windows tablet"):device.windowsPhone()?b("windows mobile"):b("desktop"):device.fxos()?device.fxosTablet()?b("fxos tablet"):b("fxos mobile"):b("desktop"),e=function(){return device.landscape()?(h("portrait"),b("landscape")):(h("landscape"),b("portrait"))},i="onorientationchange"in window,g=i?"orientationchange":"resize",window.addEventListener?window.addEventListener(g,e,!1):window.attachEvent?window.attachEvent(g,e):window[g]=e,e()}).call(this);
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
      }).fail(function () { alert('error'); });
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
      var jqElementMuteOnBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOn_muteIconOnAnim_trivia_muteOnIcon_id');
      var jqElementMuteOffBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOff_muteIconOffAnim_trivia_muteOffIcon_id');
      var btnRestartobj = document.querySelector('.Stage_btnRestartCopy2_restartIconAnim_trivia_hintIcon50_id');
      jqElementMuteOnBtnobj.setAttribute('tabindex', '0');
      jqElementMuteOffBtnobj.setAttribute('tabindex', '0');
      btnRestartobj.setAttribute('tabindex', '0'); 
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
        jqElement.find('.button-feedback-close').on('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            Feedback.hide();
          }
      });
        jqElement.find('.try-again').on('click', restart);
        jqElement.find('.try-again').on('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            restart();
          }
      });
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
        var jqElementMuteOnBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOn_muteIconOnAnim_trivia_muteOnIcon_id');
        var jqElementMuteOffBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOff_muteIconOffAnim_trivia_muteOffIcon_id');
        var cancelButton = document.querySelector('.Stage_final-feedback_feedbackGood_close_tetris_feedbackClose_id.eg-svg-image') 
        cancelButton.focus();
        jqElementMuteOnBtnobj.setAttribute('tabindex', '-1');
        jqElementMuteOffBtnobj.setAttribute('tabindex', '-1'); 
      },
      showFailure: function () {
        jqElement.show();
        jqElementSuccess.hide();
        jqElementFailure.show();
        symbolFailure.play();
        var jqElementMuteOnBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOn_muteIconOnAnim_trivia_muteOnIcon_id');
        var jqElementMuteOffBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOff_muteIconOffAnim_trivia_muteOffIcon_id');
        jqElementMuteOnBtnobj.setAttribute('tabindex', '-1');
        jqElementMuteOffBtnobj.setAttribute('tabindex', '-1');
        var restart= document.querySelector('.Stage_final-feedback_feedbackWrong_btnFeedbackRestart_restartIconAnim_trivia_hintIcon50_id')
        restart.focus();
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

(function () {

 //#region meta declarations
 var Stage;
 var Buttons;
 var App;
 var Baskets;
 //#endregion

 

 var Lms = (function () {

   var userInteractionAccurred = false;
   var isLmsApiImplementes = false;
  function finishImplementingLmsApi() {
   if (cet.content.lms.Activity.engagement.mode == 'review') {
    App.showFeedback();
   }

   if (cet.content.lms.Activity.engagement.access == 'read') {
    App.setAsReadOnly();
   }

   Lms.setExternalButtonsVisibility();
   
   cet.content.lms.Activity.bind('check', function () { cet.content.lms.Activity.engagement.mode != 'normal' && App.showFeedback(); });
   cet.content.lms.Activity.bind('reset', function () { App.restart(); });
   cet.content.lms.Activity.bind('showsolution', function () { cet.content.lms.Activity.engagement.mode != 'normal' && App.showSolution(); });

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
     if (isLmsApiImplementes)
       return;
     isLmsApiImplementes = true;
    if (cet.content.lms.Settings.supported && cet.content.lms.Activity.engagement.store == 'readwrite')
     Stage.bind('change', Lms.save);
    
    if (cet.content.lms.Settings.supported) {
      
      if (Buttons.hideCheckButton)
        Buttons.hideCheckButton();
      if (Buttons.hideRestartButton)
        Buttons.hideRestartButton();

     if (cet.content.lms.Activity.engagement.mode == 'solved') {
      App.showSolution();
      finishImplementingLmsApi();
      return;
     }

     if (cet.content.lms.Activity.engagement.store != 'disabled') {
      cet.content.State.load(function (data) {
       App.restoreState(data);
       finishImplementingLmsApi();
       lastAction = actLOAD;
       Lms.save();
      });
     }
     else {
      finishImplementingLmsApi();
     }

    }
   },
   save: function () {

     function fieldsResponce() {
       return { options: state.options };
     }

     function fieldsScore() {
       var arr = new Array();
       for (var i = 0; i < state.options.length; i++) {
         arr.push((state.options[i].basket === undefined) ? 0 : 1);
       }
       return { options: arr };
     }
     function isAnswered() {
       if (lastAction == actSOLUTION)
         return false;
       else {
         // any anwer is "answered"
         return true;
       }

     }

     if (cet.content.lms.Settings.supported || cet.content.xapiSupported) {

     if (cet.content.lms.Activity.engagement.store == 'readwrite') {
      if (!userInteractionAccurred) {
       userInteractionAccurred = true;
       cet.content.lms.Activity.start()
      }
      var state = App.getState();
      if (state) {
        cet.content.State.save(state);
        cet.content.lms.Activity.score(Lms.getScore());
        cet.content.lms.Activity.isAnswered(isAnswered());
      }
     }


     if (cet.content.xapiSupported) {

       

       var Xapi = {};
       if (lastAction != actNONE) {
         Xapi.verb = actionStrings[lastAction];

         Xapi.object = {};
         Xapi.object.definition = {};
         Xapi.object.definition = { type: "http://adlnet.gov/expapi/activities/cmi.interaction.asset." + "Tetris" };

         if (lastAction == actGENERATE || lastAction == actLOAD) {
           Xapi.object.objectAdditionalInformation = { state: state };
           lastAction = actNONE;
         }

         Xapi.result = {};


         if (lastAction == actANSWER || lastAction == actCHECK) {
           Xapi.result.extensions = {};
           Xapi.result.extensions['http://xapi.cet.ac.il/full_answer'] = fieldsResponce();
           Xapi.result.extensions['http://xapi.cet.ac.il/score'] = fieldsScore();
           lastAction = actNONE;
         }
         var score = Lms.getScore();

         Xapi.result.scaled = (Math.round((score / 100) * 100)) / 100;
         Xapi.result.success = (score == 100);
         Xapi.result.completion = true; // (score == 100 && bJustChecked);

         cet.content.xapi.send(Xapi);
       }
     }

    }

    //});
   },
   getScore: function () {
    
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
   },
   restart: function () {
     userInteractionAccurred = false;
  }


  };
 })();

 cet.Lms = Lms;

})();

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

window.cet = window.cet || {};

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

    var jqElement = $('<div style="position:absolute;"></div>')
    jqElement.css({ width: Proportions.getBasketWidth() + '%', height: '0.2%', top: position.top, left: position.left, 'background-color': '#606569', 'z-index': 30 })
    $('#Stage').append(jqElement)
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
  dropPosition.prototype.addOption = function (option) {
    var self = this;
    self.option = option;
    //self.removeFeedback();

    option.position(this.position)

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

(function () {

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
    $('.button-start').on('click', function () {
     StartDialog.hide();
     Stage.trigger('startClick');
    })
    $('.button-start').on('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        var jqElementMuteOnBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOn_muteIconOnAnim_trivia_muteOnIcon_id');
        var jqElementMuteOffBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOff_muteIconOffAnim_trivia_muteOffIcon_id');
        var btnRestartobj = document.querySelector('.Stage_btnRestartCopy2_restartIconAnim_trivia_hintIcon50_id');
        jqElementMuteOnBtnobj.setAttribute('tabindex', '0');
        jqElementMuteOffBtnobj.setAttribute('tabindex', '0');
        btnRestartobj.setAttribute('tabindex', '0'); 
        StartDialog.hide();
        Stage.trigger('startClick');
      }
  });

   },
   hide: function () {
    jqElement.hide();
   },
   isVisible: function () {
    return jqElement.is(':visible');

   }
  }
 })();

 cet.StartDialog = StartDialog;

})();

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



    $.extend(pos, { position: 'absolute', width: Proportions.getBasketWidth() + '%', height: Proportions.getBasketHeight() + '%' })
    self.jqElement.css(pos);
    self.initDropPositions();
    //self.jqElement.find('.basket-title-background').css('height', Proportions.getBasketTitleHeight() + '%')
    self.titleBackground.css('z-index', 10);

    var titleHeight = ((30 * 21 / self.heightAsNumber())) + '%';
    self.titleBackground.css('height', titleHeight);

    //var titleTextTop = (((0.0605 * 0.21) / self.heightAsNumber()) * 100) + '%';
    var titleTextTop = (((6.05 * 21) / self.heightAsNumber())) + '%';

    self.titleText.css('top', titleTextTop);
    self.titleText.css('z-index', 10);

    self.jqElement.css('z-index', 10);
    self.background.css('z-index', 0);

    self.backgroundColor = self.background.css('background-color')
    self.titleBackgroundColor = self.titleBackground.css('background-color')

    if (Content.getBasketName(id).substr(0, 1) === '%')
      try {
        self.jqElement.find('.text').html(decodeURIComponent(Content.getBasketName(id)));
      }
      catch (error) {
        console.error(error);
        self.jqElement.find('.text').html(Content.getBasketName(id));
      }
    else
      self.jqElement.find('.text').html(Content.getBasketName(id));

  }

  basket.prototype.initDropPositions = function () {
    var self = this;
    self.dropPositions = [];
    var numberOfDropPositions = Content.getNumberOfOptionsInBasket();
    var marginTop = Proportions.getOptionMarginTop();

    var marginLeft = ((Proportions.getBasketWidth() - Proportions.getOptionWidth()) / 2);//3.99;
    var dropPositionHeight = Proportions.getOptionHeight();
    var basketTitleHeight = Proportions.getBasketTitleHeight();
    var dropPositionLeft = self.leftAsNumber() + marginLeft;

    for (var i = 0; i < numberOfDropPositions; i++) {
      var newTop = self.topAsNumber() + basketTitleHeight + (marginTop + dropPositionHeight) * i;
      var newPosition = { left: dropPositionLeft + '%', top: newTop + '%' };
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
  basket.prototype.addOption = function (option) {
    var self = this;

    self.getNextDropPosition().addOption(option);
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
      if (self.dropPositions[i].isPopulated())
        self.dropPositions[i].getOption().showFeedback();
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
    return this.jqElement[0].style.top;

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
    var backgroundColor1 = '#6f1d21';

    self.background.animate({ backgroundColor: backgroundColor1 }, 300);
    self.titleBackground.animate({ backgroundColor: titleColor }, 300);
  }
  basket.prototype.showCorrectFeedback = function () {
    var self = this;
    var titleColor = '#98ae28'
    var backgroundColor1 = '#72821f';

    self.background.animate({ backgroundColor: backgroundColor1 }, 300);
    self.titleBackground.animate({ backgroundColor: titleColor }, 300);
  }
  basket.prototype.hideFeedback = function () {
    var self = this;

    self.background.animate({ backgroundColor: self.backgroundColor }, 300);
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
  }




  cet.basket = basket;

})();

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
          var newBasket = new basket(basketIds[i], { left: currLeft + '%', top: basketsTop + '%' });
          baskets[newBasket.getId()] = newBasket;
          basketsArray.push(newBasket);
        }


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
          top: (Proportions.getBasketsTop() + Proportions.getBasketTitleHeight()) + '%'
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
      getBasketTop: function () {
        if (!basketTop) {
          basketTop = this.getRandomBasket().top();
        }
        return basketTop;
      },
      getRandomBasket: function () {

        for (var key in baskets) {
          return baskets[key];
        }

      },
      getHorizontalShift: function () {
        if (horizontalShift)
          return horizontalShift;

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
      }
    }

  })();

  cet.Baskets = Baskets;

})();

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




    if (optionData.text.substr(0, 1) === '%')
      try {
        self.jqElement.find('.text').html(decodeURIComponent(optionData.text));
      }
      catch (error) {
        console.error(error);
        self.jqElement.find('.text').html(optionData.text);
      }
    else
      self.jqElement.find('.text').html(optionData.text);

    self.baskets = optionData.baskets;

    self.jqElement.css({ position: 'absolute', top: '-15%', width: Proportions.getOptionWidth() + '%' });
    self.jqElement.addClass('option')
    self.originalColor = self.jqElement.find('.option-background').css('background-color');
    //self.setInteractionVisualEffects();


    self.startTop = 5.3;
    self.droppingDuration = Content.getDroppingDuration();
    self.endTop = parseFloat(Baskets.getBasketTop().replace('%', ''));// - Proportions.getOptionHeight();
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

    this.jqElement.find('.option-background').css({ 'background-color': 'transparent', 'z-index': 20 });
    this.jqElement.css({ 'z-index': 20, 'height': Proportions.getOptionHeight() + '%' });
    this.jqElement.find('.text').css('z-index', 20);
    this.setFeedbacksProportions();

  }
  option.prototype.showAsLeadingOption = function (basketId) {

    var self = this;
    this.jqElement.find('.option-background').css({ 'background-color': '#f59756' });
    this.jqElement.find('.text').css('color', 'white');
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
    self.jqElement.css({ "top": "0%", "left": Proportions.getOptionStartingLeft() + "%" });

    self.jqElement.animate({ "top": self.endTop + '%' }, {
      queue: false, duration: self.droppingDuration, easing: 'linear', complete: function () {

        Stage.trigger('dropCompleted', self);
      },
      step: function (currentTop) {
        self.currentTop = currentTop;
      }
    });


  }
  option.prototype.dropFaster = function () {

    var self = this;
    self.stopDropping();
    var distance = (self.endTop - self.currentTop);
    var time = distance / (self.velocity * 16);
    this.jqElement.animate({ "top": self.endTop + '%' }, {
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
    this.jqElement.animate({ "top": self.endTop + '%' }, {
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
  option.prototype.position = function (newPosition) {
    if (newPosition) {
      //this.jqElement.css({ 'left': newPosition.left, 'top': newPosition.top });
      this.jqElement.animate({ 'left': newPosition.left, 'top': newPosition.top }, 300);
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
  cet.option = option;

})();
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
      getFinalFeedbackSuccessText: function () {
        return cet.Localization.data.successText;
      },
      getFinalFeedbackFailureText: function () {
        return cet.Localization.data.failureText;
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

(function () {

  cet.Localization = (function () {
    var data;
    var language;

    function getLang() {
      return cet.Content.getFontFamily();
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
      var jqElementMuteOnBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOn_muteIconOnAnim_trivia_muteOnIcon_id');
      var jqElementMuteOffBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOff_muteIconOffAnim_trivia_muteOffIcon_id');
      var btnRestartobj = document.querySelector('.Stage_btnRestartCopy2_restartIconAnim_trivia_hintIcon50_id');
      jqElementMuteOnBtnobj.setAttribute('tabindex', '0');
      jqElementMuteOffBtnobj.setAttribute('tabindex', '0');
      btnRestartobj.setAttribute('tabindex', '0'); 
      App.restart();
      Lms.save();
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
      jqElementMuteOnBtn.on('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          buttonMuteOnClickHandler();
        }
    });

      jqElementMuteOffBtn.on('click', buttonMuteOffClickHandler);
      jqElementMuteOffBtn.on('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          buttonMuteOffClickHandler();
        }
    });
    }
    function buttonMuteOffClickHandler() {


      jqElementMuteOffBtn.hide();
      jqElementMuteOnBtn.show();
      var jqElementMuteOnBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOn_muteIconOnAnim_trivia_muteOnIcon_id');
      jqElementMuteOnBtnobj.focus();
      mute = false;
      Audio.unmute();


    }
    function buttonMuteOnClickHandler() {

      jqElementMuteOffBtn.show();
      jqElementMuteOnBtn.hide();
      var jqElementMuteOffBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOff_muteIconOffAnim_trivia_muteOffIcon_id');
      jqElementMuteOffBtnobj.focus();
      mute = true;
      Audio.mute();



    }

    function initRestartButton() {
      btnRestart = $('.button-restart');
      btnRestart.css('z-index', 1000);
      btnRestart.on('click', btnRestartClickHandler);
      btnRestart.on('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          btnRestartClickHandler();
        }
    });
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
        var jqElementMuteOnBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOn_muteIconOnAnim_trivia_muteOnIcon_id');
        var jqElementMuteOffBtnobj = document.querySelector('.Stage_muteCopy2_btnMuteOff_muteIconOffAnim_trivia_muteOffIcon_id');
        var btnRestartobj = document.querySelector('.Stage_btnRestartCopy2_restartIconAnim_trivia_hintIcon50_id');
        jqElementMuteOnBtnobj.setAttribute('tabindex', '-1');
        jqElementMuteOffBtnobj.setAttribute('tabindex', '-1');
        btnRestartobj.setAttribute('tabindex', '-1'); 
    
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
        jqElementMuteOnBtn.on('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            buttonMuteOnClickHandler();
          }
      });
  
        jqElementMuteOffBtn.on('click', buttonMuteOffClickHandler);
        jqElementMuteOffBtn.on('keydown', function(event) {
          if (event.key === 'Enter' || event.key === ' ') {
            buttonMuteOffClickHandler();
          }
      });

      },

      setZindexes: function (val) {

        btnRestart.css('z-index', val);
      },
      hideCheckButton: function () { }

    }
  })();
  cet.Buttons = Buttons;

})();

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
        case 3: return 29.6;
        case 4: return 22.7;
        case 5: return 18;
        case 6: return 15.1;
        default: return 33;
      };
    }

    function calculateBasketMarginLeft() {
      switch (Content.getNumberOfBaskets()) {
        case 2: return 6;
        case 3: return 3;
        case 4: return 2;
        case 5: return 1.5;
        case 6: return 1;
        default: return 33;
      };
    }

    function getFontClassName() {
      switch (Content.getFontSize()) {
        case 'small':
          return 'font-small';
        case 'medium':
          return 'font-medium';

        case 'large':
          return 'font-large';

        default:
          return 'font-medium';

      }

    }
    function calculateBasketsLeft() {
      var basketsWidth = Content.getNumberOfBaskets() * basketWidth;
      var marginsWidth = (Content.getNumberOfBaskets() - 1) * basketMarginLeft;
      return (100 - basketsWidth - marginsWidth) / 2
    }

    function calculateOptionHeight() {
      switch (Content.getNumberOfOptionsInBasket()) {
        case 2: return 29.6;
        case 3: return 4.8;
        case 4: return 22.7;
        case 5: return 18;
        case 6: return 15.1;
        default: return 33;
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

        optionHeight = 4.8
        optionMarginTop = 0.2;

        basketMarginLeft = calculateBasketMarginLeft();
        basketWidth = calculateBasketWidth();
        basketsLeft = calculateBasketsLeft();
        basketTitleHeight = 6.2;
        basketHeight = basketTitleHeight + Content.getNumberOfOptionsInBasket() * (optionHeight + optionMarginTop);

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
      getOptionWidth: function () { return optionWidth; },
      getBasketsLeft: function () { return basketsLeft; },
      getBasketMarginLeft: function () { return basketMarginLeft; },
      getBasketsTop: function () { return basketsTop; },
      getOptionStartingLeft: function () {
        var numberOfBaskets = Content.getNumberOfBaskets();
        var index = Math.floor((Math.random() * numberOfBaskets));
        return basketsLeft + (index * (basketWidth + basketMarginLeft)) + optionMarginLeft;

      }



    }
  })();


  cet.Proportions = Proportions;

})();
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
          options[i].startDropping();
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
      }


    };
  })();

  cet.DroppingOptions = DroppingOptions;

})();

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
    var Localization;

    //#endregion

    var animationStopped = false;
    var pause = false;
    var disableAll = false;
    var $window;
    var $body;
    var myWidth = 0;


  
    this.actionStrings = ["", "answered", "asked_check", "asked_showAnswer", "cleared", "launched", "loaded", "asked_generate"];
    this.actNONE = 0;
    this.actANSWER = 1;
    this.actCHECK = 2;
    this.actSOLUTION = 3;
    this.actCLEAN = 4;
    this.actLAUNCH = 5;
    this.actLOAD = 6;
    this.actGENERATE = 7;

    this.lastAction = this.actNONE;

    cet.content.xapiSupported = true;

    function dropCompletedHandler(droppedOption) {
      lastAction = actCHECK;
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
      lastAction = actCHECK;
      var selectedBasket = Baskets.getSelectedBasket(droppedOption);
      if (selectedBasket.isFull()) {

        Storage.addOption(droppedOption);

        Audio.play('wrong');
        selectedBasket.showFullFeedback();
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
      
        var size = cet.content.UI.getSizingSettings();
        //AZ iPad workaround
        var jqBody = $('body');
        jqBody.css({ display: "none" });

        var jqWindow = $(window);               // take host window - may be correct size
        var jqWindowWidth = jqWindow.width();
        var jqWindowHeight = jqWindow.height();
        jqBody.css({ display: "block" });


        //        Stage.css({ display: "none" });
        var windowMaxPossibleHeight = size.maxHeight;
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
          Stage.css({ width: newWidth, height: newHeight, fontSize: newFontSize });
          cet.content.UI.setHeight(newHeight);
        }
     
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
        Localization = cet.Localization;

        //#endregion

        $body = $('body');
        $window = $(window);

        var self = this;
        self.addNoScaleMetaTag();
        self.composition(AdobeEdge.getComposition(compId));
        Stage.init();
        //Stage.eliminateIPadBounceEffect();

        Stage.bind('contentReady', function () {

          Localization.init();
          Audio.init();
          Proportions.init();
          Baskets.init();
          Storage.init();
          StartDialog.init();
          Buttons.init();
          Lms.init();
          Feedback.init();
          Lifes.init();


          initLmsBrowseMode();
          setLocalizedResources();
          adjustSize();




          cet.Button.init();

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
            lastAction = actLAUNCH;
            Lms.save();
            applyTabletsSoundsHack();
            applyAndroidRendringFix()
            DroppingOptions.startDropping();
          })

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

        lastAction = actCLEAN;
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

      }
    }
  })();


  $.extend(cet.App, App);

})();

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

    // AZ - 26/11/18 if mode=null - also isBrowseMode (aka Training)
    return !cet.content.lms.Settings.supported || (cet.content.lms.Activity.engagement.mode == 'browse') || (cet.content.lms.Activity.engagement.mode == null);
   },
   setExternalButtonsVisibility: function () {
    cet.content.lms.Activity.settings.supportsCheck(false);
    cet.content.lms.Activity.settings.supportsRegenerate(false);
    cet.content.lms.Activity.settings.supportsReset(false);
    cet.content.lms.Activity.settings.supportsShowSolution(false);
    cet.content.lms.Activity.settings.supportsHostFullscreen(true);
   }

  };
 })();

 $.extend(cet.Lms, Lms);

})();

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
      }


    };
  })();


  cet.Storage = Storage;

})();