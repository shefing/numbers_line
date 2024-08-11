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
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-shiv-cssclasses-teststyles-prefixes-load
 */
;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*! device.js 0.1.58 */
(function(){var a,b,c,d,e,f,g,h,i,j;a=window.device,window.device={},c=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return d("iphone")},device.ipod=function(){return d("ipod")},device.ipad=function(){return d("ipad")},device.android=function(){return d("android")},device.androidPhone=function(){return device.android()&&d("mobile")},device.androidTablet=function(){return device.android()&&!d("mobile")},device.blackberry=function(){return d("blackberry")||d("bb10")||d("rim")},device.blackberryPhone=function(){return device.blackberry()&&!d("tablet")},device.blackberryTablet=function(){return device.blackberry()&&d("tablet")},device.windows=function(){return d("windows")},device.windowsPhone=function(){return device.windows()&&d("phone")},device.windowsTablet=function(){return device.windows()&&d("touch")},device.fxos=function(){return d("(mobile; rv:")||d("(tablet; rv:")},device.fxosPhone=function(){return device.fxos()&&d("mobile")},device.fxosTablet=function(){return device.fxos()&&d("tablet")},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.portrait=function(){return 90!==Math.abs(window.orientation)},device.landscape=function(){return 90===Math.abs(window.orientation)},device.noConflict=function(){return window.device=a,this},d=function(a){return-1!==j.indexOf(a)},f=function(a){var b;return b=new RegExp(a,"i"),c.className.match(b)},b=function(a){return f(a)?void 0:c.className+=" "+a},h=function(a){return f(a)?c.className=c.className.replace(a,""):void 0},device.ios()?device.ipad()?b("ios ipad tablet"):device.iphone()?b("ios iphone mobile"):device.ipod()&&b("ios ipod mobile"):device.android()?device.androidTablet()?b("android tablet"):b("android mobile"):device.blackberry()?device.blackberryTablet()?b("blackberry tablet"):b("blackberry mobile"):device.windows()?device.windowsTablet()?b("windows tablet"):device.windowsPhone()?b("windows mobile"):b("desktop"):device.fxos()?device.fxosTablet()?b("fxos tablet"):b("fxos mobile"):b("desktop"),e=function(){return device.landscape()?(h("portrait"),b("landscape")):(h("landscape"),b("portrait"))},i="onorientationchange"in window,g=i?"orientationchange":"resize",window.addEventListener?window.addEventListener(g,e,!1):window.attachEvent?window.attachEvent(g,e):window[g]=e,e()}).call(this);
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

window.cet = window.cet || {};

(function () {

  //#region meta declarations

  var Option;
  var Trivia;
  var Content;
  var Stage;
  var Game;
  var Feedback;
  var Progressbar;
  var Audio;
  var Title;
  var WelcomeScreen;
  var Button;
  var Timer;
  var Hints;
  var App;
  var Lms;

  var myWidth = 0;
  //#endregion

  var App = (function () {

    this.lmsLoaded;
    this.lmsActive;
    this.preloaderHidden;
    this.soundActive;
    this.soundTestFinnished;
    this.isMobile = false;

    function adjustSize() {


      var size = cet.content.UI.getSizingSettings();
        //AZ iPad workaround
        var jqBody = $('body');
        jqBody.css({ display: "none" });

        //var jqBodyWidth = jqBody.width();       // store current body width
        //jqBody.width(0);                        // zero it
        var jqWindow = $(window);               // take host window - may be correct size
        var jqWindowWidth = jqWindow.width();

        //jqBody.width(jqBodyWidth);              // restore body width
        jqBody.css({ display: "block" });

        var windowMaxPossibleHeight = size.maxHeight;
        var windowHeight = Math.max(jqWindow.height(), windowMaxPossibleHeight);
        //Stage.css({ display: "none" });
        var xRatio = jqWindowWidth / Stage.width();
        var yRatio = windowHeight / Stage.height();
        var ratio = xRatio > yRatio ? yRatio : xRatio;
        //Stage.css({ display: "block" });

        var newWidth = Stage.width() * ratio;
        var newHeight = Stage.height() * ratio;
        if (myWidth != newWidth) {
          myWidth = newWidth;
          Stage.css({
            'width': newWidth,
            'height': newHeight,
            'font-size': ratio * 100 + '%',
          });
          cet.content.UI.setHeight(newHeight);
        }
      

    }

    
    function centerAppInScreen() {
      $('#Stage').css({
        'margin': 'auto',
        'position': 'absolute',
        'top': 0,
        //'bottom': 0,
        'left': 0,
        'right': 0
      });
    }


    // TODO: check if we need this at all ? 
    function checkSound() {
      var t;

      var times = 0;

      t = setInterval(function () {

        //alert('testing sound ' + times);

        // stop checking for sound after 5 seconds / 5 atempts
        if (times == 5) {
          clearInterval(t);
          App.soundTestFinnished = true;
          updateInitScreen();
        }

        times++;

        //alert(App.preloaderHidden);

        //	if (App.preloaderHidden != true){
        //		if (App.lmsLoaded) {
        //			setTimeout(function () {
        //				//alert('hiding preloader');
        //				App.preloaderHidden = true;
        //				App.hidePreloader();
        //			}, 1000);
        //		}
        //}

        Audio.load('UI/quartersec');
        Audio.play('UI/quartersec', function () {

          Stage.trigger('SoundActive');
          clearInterval(t);
        });

      }, 1000);

    }

    function updateInitScreen() {

      if (App.lmsLoaded == true && App.soundActive == true) {
        //App.hidePreloader();
        App.hideSoundMsg();
      }

      if (App.soundActive == true) {
        App.hideSoundMsg();
      }

      if (App.soundActive == true && App.lmsActive != true) {
        //App.hidePreloader();
      }

      if (App.soundTestFinnished == true && App.soundActive != true) {
        if (Modernizr.touch) {
          //alert('touch');
          App.hideSoundMsg();
        }
        //App.hidePreloader();
      }

    }


    // Global
    this.timerEnabled = false;



    return {
      init: function (compId) {
        //#region meta declarations
        Option = cet.Option;
        Trivia = cet.Trivia;
        Content = cet.Content;
        Stage = cet.Stage;
        Game = cet.Game;
        Feedback = cet.Feedback;
        Progressbar = cet.Progressbar;
        Audio = cet.Audio;
        Title = cet.Title;
        WelcomeScreen = cet.WelcomeScreen;
        Button = cet.Button;
        Timer = cet.Timer;
        Hints = cet.Hints;
        App = cet.App;
        Lms = cet.Lms;
        //#endregion

        this.lmsLoaded = false;
        this.lmsActive = true;
        this.preloaderHidden = false;
        this.soundActive = false;
        this.soundTestFinnished = false;

        this.isMobile = App.mobilecheck();

        this.addNoScaleMetaTag();
        cet.App.composition(AdobeEdge.getComposition(compId))

        Stage.init();

        adjustSize();

        Stage.bind('contentReady', function () {

          Audio.init();

          Stage.bind('audioReady', function () {

            checkSound();
          });

          Stage.bind('LmsLoaded', function () {
            //alert('Lms Loaded');
            App.lmsLoaded = true;

            updateInitScreen();
          });

          Stage.bind('SoundActive', function () {
            //$('.no-sound').hide();
            App.soundActive = true;
            App.soundTestFinnished = true;
            //alert('Sound Active');

            updateInitScreen();
          });
          Button.init();
          WelcomeScreen.init();

          Progressbar.init();

          if (Content.showTimer()) {
            Timer.init();
            App.timerEnabled = true;
          }
          else {
            // hide timer, need to be moved to a better place
            $('.timer').hide();
          }


          if (Content.showHints() && App.timerEnabled) {
            Hints.init();
          }
          else {
            // hide all hints, need to be moved to a better place
            $('.hint-50').hide();
            $('.hint-replace').hide();
            $('.hint-time').hide();
          }



          Game.init();
          Title.init();
          Feedback.init();

          Trivia.init();
          Lms.init();
          adjustSize();
          centerAppInScreen();


          if (Content.previewMode()) {


            $('#Stage').append('<div class="mask" style="position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.01);"></div>');

            App.hidePreloader();


            Game.start();
            //Timer.stop();
          }

        });

        Content.init();

        $('.btn-restart').show();

        $(window).resize(function () {
          adjustSize();
        });

      },

      setAsReadOnly: function () {
        Button.disableAll();
      },
      noRestart: function () {
        $('.btn-restart').hide();
      },
      hidePreloader: function () {
        $('#cet-preloader').hide();
      },
      hideSoundMsg: function () {
        $('.no-sound').hide();
      },


      mobilecheck: function () {
        ////// http://stackoverflow.com/a/11381730/989439
        //var check = false;
        //(function (a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
        //return check;


        var mobile = false;

        if (device.mobile() || device.tablet()) {
          mobile = true;
        }

        return mobile;
      }
    }
  })();

  $.extend(cet.App, App);

})();
window.cet = window.cet || {};

(function () {
	//#region meta declarations
	var Option;
	var Trivia;
	var Content;
	var Stage;
	var Game;
	var Feedback;
	var Progressbar;
	var Audio;
	var Title;
	var WelcomeScreen;
	var Button;
	var Timer;
	var Hints;
	var App;
	var Lms;
	//#endregion

	var Option = function (optionData, jqElement) {

		//#region meta declarations
		Option = cet.Option;
		Trivia = cet.Trivia;
		Content = cet.Content;
		Stage = cet.Stage;
		Game = cet.Game;
		Feedback = cet.Feedback;
		Progressbar = cet.Progressbar;
		Audio = cet.Audio;
		Title = cet.Title;
		WelcomeScreen = cet.WelcomeScreen;
		Button = cet.Button;
		Timer = cet.Timer;
		Hints = cet.Hints;
		App = cet.App;
		Lms = cet.Lms;
		//#endregion


		var self = this;

		self.jqElement = jqElement;
		self.symbol = cet.Stage.getSymbol('#' + self.jqElement.attr('id'));

		self.jqText = self.jqElement.find('.text');
		if (self.jqText.length > 0) {
			//self.jqText.text(optionData['text']);
			//self.jqText.html(optionData['text']);



			self.jqText.html('<div class="option-text vertical-pos-parent lang-' + Content.getLanguage() + ' font-size-' + Content.getFontSize() + '"><div class="vertical-pos-child">' + optionData['text'] + '</div></div>');
		}

		self.optionNormal = self.jqElement.find('.option-normal');
		if (self.optionNormal.length > 0)
			self.optionNormalSymbol = cet.Stage.getSymbol(self.optionNormal);

		self.optionRight = self.jqElement.find('.option-right');
		if (self.optionRight.length > 0)
			self.optionRightSymbol = cet.Stage.getSymbol(self.optionRight);

		self.optionError = self.jqElement.find('.option-error');
		if (self.optionError.length > 0)
			self.optionErrorSymbol = cet.Stage.getSymbol(self.optionError);

		// update classes for answers
		if (optionData.correct) {
			self.jqElement.removeClass('error');
			self.jqElement.addClass('correct');
		}
		else {
			self.jqElement.removeClass('correct');
			self.jqElement.addClass('error');
		}

		//self.hoverIsActive = true;
		// initHoverEffect();

		initFeedback();

		if (optionData['sound']) {
			Audio.load(optionData['sound']);
		}

		self.jqElement.off('click').on('click', function (event) {

			var opt = {
				"optionData": optionData,
				"jqElement": jqElement
			}

			Stage.trigger('optionSelected', opt);
		})

		function initFeedback() {
			self.jqElement.show();
			self.optionNormal.show();
			self.optionRight.hide();
			self.optionError.hide();
		}

	}

	cet.Option = Option;

})();
window.cet = window.cet || {};

(function () {

	var Button = (function myfunction() {

		return {
			init: function () {
				var jqElement = $('.edge-btn');

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

				var $allButtons = $('.edge-btn');

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
	//#region meta declarations
	var Option;
	var Trivia;
	var Content;
	var Stage;
	var Game;
	var Feedback;
	var Progressbar;
	var Audio;
	var Title;
	var WelcomeScreen;
	var Button;
	var Timer;
	var Hints;
	var App;
	var Lms;
	//#endregion

	var Content = (function () {
		// Changes XML to JSON

		var contentJson = null;

		var numOfQuestions = 0;
		var extraQuestion = false;
		var questions = [];

		function getRandomNumber(upperBound) {
			return Math.floor((Math.random() * upperBound));
		}

		return {

			getWelcomeText: function () {
				return contentJson.welcomeText;
			},
			getWelcomeImage : function () {
				return contentJson.welcomeImg;
			},

			getBackgroundImage : function () {
				return contentJson.backgroundImage;
			},
			getFinalText: function () {
				return contentJson.finalFeedbackText;
			},
			getFinalBestText: function () {
				return contentJson.finalFeedbackBestText;
			},
			getFinalFeedbackTextTeacherFirstPlay: function () {
				return contentJson.finalFeedbackTextTeacherFirstPlay;
			},
			getFinalFeedbackTextTeacher: function () {
				return contentJson.finalFeedbackTextTeacher;
			},

			showTimer: function () {
				return contentJson.common.timer;
			},
			showHints: function () {
				return contentJson.common.helpers;
			},
			getLanguage: function () {
        // default
			  var lang = 'he';

			  switch (contentJson.common.language) {
			    case 'hebrew':
			      lang = 'he';
			      break;
			    case 'arabic':
			      lang = 'ar';
			      break;
			    case 'english':
			      lang = 'en';
			      break;
			    default:
			      lang = contentJson.common.language;
			  }

			  return lang;
			},
			previewMode : function () {
				return contentJson.previewMode;
			},

			//getFont: function(){
			//	var font = 'Alef-Regular';

			//	if (Content.getLanguage() == 'hebrew') {
			//		font = 'Alef-Regular';
			//	}
			//	else {
			//		// Arabic
			//		font = 'Amiri-Regular';
			//	}

			//	return font;
			//},

			getFontSize: function () {
				var fontSize = 'medium';

				if(contentJson.common.fontSize){
					fontSize = contentJson.common.fontSize;
				}

				return fontSize;
			},

			getTimer: function () {

				
				//return contentJson.timer;

				return '30';
			},
			getScoreInterval: function () {
				return contentJson.scoreInterval;
			},

			getOptionByIndex: function (questionIndex, optionIndex) {
				return questions[questionIndex].options[optionIndex];
			},
			getQuestionTitle: function (questionIndex) {
				return questions[questionIndex].title;
			},
			getNumberOfQuestions: function () {
				numOfQuestions = contentJson.random.numberOfQuestions;

				if (extraQuestion) {
					numOfQuestions = numOfQuestions + 1;
				}

				return numOfQuestions;
			},

			shuffle: function () {
				

				contentJson = cet.Content.getContentJson();

				// need to be removed from here to a bette place
				questions = contentJson.questions.slice(0);


				if (contentJson.random.questions) {
					questions = [];
					var tmpQuestions = contentJson.questions.slice(0);
					var numberOfQuestionsPlusExtra = contentJson.random.numberOfQuestions + 1;
					while (questions.length < numberOfQuestionsPlusExtra) {
						var randomIndex = getRandomNumber(contentJson.questions.length)
						if (tmpQuestions[randomIndex]) {
							questions.push(tmpQuestions[randomIndex]);
							tmpQuestions[randomIndex] = null;
						}
					}
				}

				if (contentJson.random.options) {
					for (var i = 0; i < questions.length; i++) {
						var tmpOptions = questions[i].options.slice(0);
						var newOptions = [];
						while (newOptions.length < questions[i].options.length) {
							var randomIndex = getRandomNumber(questions[i].options.length)
							if (tmpOptions[randomIndex]) {
								newOptions.push(tmpOptions[randomIndex]);
								tmpOptions[randomIndex] = null;
							}
						}
						questions[i].options = newOptions;
					}
				}
			},
			getContentFromUrl: function () {
				var params = document.location.search.replace('?', '').split('&');
				for (var i in params) {
					if (params[i].toLowerCase().indexOf('content') != -1)
						return params[i].split('=')[1];
				}
				return null;
			},
			getBgImage: function myfunction() {
				return contentJson.bgImage;
			}
		};

	})();

	$.extend(cet.Content, Content);

})();
window.cet = window.cet || {};

(function () {

  //#region meta declarations
  var Option;
  var Trivia;
  var Content;
  var Stage;
  var Game;
  var Feedback;
  var Progressbar;
  var Audio;
  var Title;
  var WelcomeScreen;
  var Button;
  var Timer;
  var Hints;
  var App;
  var Lms;
  //#endregion

  var Feedback = (function () {

    var jqElement = null;
    //var jqElementFirstGame = null;
    //var jqElementBestGame = null;
    var symbol = null;
    //var symbolFirstGame = null;
    //var symbolNextGame = null;

    //var finalText = '';
    //var finalBestText = '';

    var firstGame = true;

    var numOfQuestions = 0;

    function updateFeedback() {

      var jqFirstFeedbackText = $('.feedback-current-score.text');
      var jqBestFeedbackText = $('.feedback-best-score.text');

      //finalText = Content.getFinalText();
      //finalBestText = Content.getFinalBestText();

      var currentState = {};
      var bestState = {};

      currentState.totalNumberOfQuestions = numOfQuestions;
      currentState.score = Trivia.getScore();
      currentState.totalCorrectAns = Trivia.getTotalCorrectAnswers();

      if (jqFirstFeedbackText.length > 0) {

        if (Content.isReady()) {
          jqFirstFeedbackText.html(currentState.totalNumberOfQuestions + '<br>' + currentState.totalCorrectAns + '<br>' + currentState.score);
        }
        else
          Stage.bind('contentReady', function () {
            jqFirstFeedbackText.html(currentState.totalNumberOfQuestions + '<br>' + currentState.totalCorrectAns + '<br>' + currentState.score);
          });
      }

      if (!Lms.isFirstGame()) {
        if (jqFirstFeedbackText.length > 0) {

          bestState = Lms.getBestScore();

          if (bestState.score < currentState.score) {
            bestState = currentState;
          }

          if (Content.isReady()) {
            jqFirstFeedbackText.html(currentState.totalNumberOfQuestions + '<br>' + currentState.totalCorrectAns + '<br>' + currentState.score);
          }
          else
            Stage.bind('contentReady', function () {
              jqFirstFeedbackText.html(currentState.totalNumberOfQuestions + '<br>' + currentState.totalCorrectAns + '<br>' + currentState.score);
            });
        }
      }
    }

    return {
      init: function () {

        //#region meta declarations
        Option = cet.Option;
        Trivia = cet.Trivia;
        Content = cet.Content;
        Stage = cet.Stage;
        Game = cet.Game;
        Feedback = cet.Feedback;
        Progressbar = cet.Progressbar;
        Audio = cet.Audio;
        Title = cet.Title;
        WelcomeScreen = cet.WelcomeScreen;
        Button = cet.Button;
        Timer = cet.Timer;
        Hints = cet.Hints;
        App = cet.App;
        Lms = cet.Lms;
        //#endregion

        //Content.getLanguage() returns    he / ar / en
        jqElement = $('.feedback-' + Content.getLanguage());

        jqElement.hide();

        //jqElementFirstGame = $('.feedback-first-game');
        //jqElementFirstGame.hide();
        //jqElementBestGame = $('.feedback-next-game');
        //jqElementBestGame.hide();

        symbol = Stage.getSymbol(jqElement);
        //symbolFirstGame = Stage.getSymbol(jqElementFirstGame);
        //symbolNextGame = Stage.getSymbol(jqElementBestGame);

        Audio.load('UI/FeedbackGood');


        firstGame = Lms.isFirstGame();


        //finalText = Content.getFinalText();
        //finalBestText = Content.getFinalBestText();

        Stage.bind('restart', function () {
          Feedback.hide();
        })

      },
      showFeedback: function () {

        Stage.trigger('endGame');

        numOfQuestions = Content.getNumberOfQuestions();

        updateFeedback();
        jqElement.show();

        //symbol.play();

        //symbol.play();
        Audio.play('UI/FeedbackGood');

      },
      showTeacherFeedback: function () {

        var jqFirstFeedbackText = $('.feedback-current-score.text');

        //finalBestText = Content.getFinalBestText();
        firstGame = Lms.isFirstGame();

        var finalFeedbackTextTeacher = Content.getFinalFeedbackTextTeacher();
        var finalFeedbackTextTeacherFirstPlay = Content.getFinalFeedbackTextTeacherFirstPlay();

        var currentState = {};

        if (jqFirstFeedbackText.length > 0) {


          if (firstGame) {
            if (Content.isReady()) {
              $('.student-not-played-yet-' + Content.getLanguage()).show();
            }
            else {
              Stage.bind('contentReady', function () {
                $('.student-not-played-yet-' + Content.getLanguage()).show();
              });
            }
          }
          else {
            currentState = Lms.getBestScore();

            if (Content.isReady()) {
              jqFirstFeedbackText.html(currentState.totalNumberOfQuestions + '<br>' + currentState.totalCorrectAns + '<br>' + currentState.score);
            }
            else {
              Stage.bind('contentReady', function () {
                jqFirstFeedbackText.html(currentState.totalNumberOfQuestions + '<br>' + currentState.totalCorrectAns + '<br>' + currentState.score);
              });
            }
          }

        }

        //Stage.trigger('endGame');
        //numOfQuestions = Content.getNumberOfQuestions();
        //updateFeedback();
        jqElement.show();

        //jqElementFirstGame.show();
        symbol.play();

        //symbol.play();
        //Audio.play('UI/FeedbackGood');

      },
      hide: function () {
        jqElement.hide();
      },
    }

  })();

  cet.Feedback = Feedback;

})();
window.cet = window.cet || {};

(function () {

	//#region meta declarations
	var Option;
	var Trivia;
	var Content;
	var Stage;
	var Game;
	var Feedback;
	var Progressbar;
	var Audio;
	var Title;
	var WelcomeScreen;
	var Button;
	var Timer;
	var Hints;
	var App;
	var Lms;
	//#endregion

	var Game = (function () {

		// Globals
		var mute = false;

		var currentQuestion = 0;
		var gameInitDone = false;
		var gameEnded;


		function initMuteButton() {

			var jqElementMuteOnBtn = $('.mute-on');
			var jqElementMuteOffBtn = $('.mute-off');

			jqElementMuteOffBtn.hide();

			jqElementMuteOnBtn.on('click', function () {
				if (!$(this).hasClass('disabled')) {

				
				jqElementMuteOffBtn.show();
				jqElementMuteOnBtn.hide();

				mute = true;
				Audio.mute();
				}
			});

			jqElementMuteOffBtn.on('click', function () {
				if (!$(this).hasClass('disabled')) {
					jqElementMuteOffBtn.hide();
					jqElementMuteOnBtn.show();

					mute = false;
					Audio.unmute();
				}
			});
		}

		function initBackground() {

			var jqBackground = $('.background');
			var jqImg = jqBackground.find('.img');

			if (jqImg.length == 1) {

				var newImageSrc = Content.getBackgroundImage();

				if (newImageSrc) {
					jqImg.attr('src', newImageSrc);
				}
			}
		}

		function initRestartButton() {
			var jqElement = $('.btn-restart');
			var symbol = Stage.getSymbol(jqElement);

			$('.btn-restart').on('click', function () {
				if (!$(this).hasClass('disabled') && !Trivia.isSelectedOption()) {
					Game.restart();
				}
			})

			if (Modernizr.touch)
				return;
		}



		return {
			init: function () {

				//#region meta declarations
				Option = cet.Option;
				Trivia = cet.Trivia;
				Content = cet.Content;
				Stage = cet.Stage;
				Game = cet.Game;
				Feedback = cet.Feedback;
				Progressbar = cet.Progressbar;
				Audio = cet.Audio;
				Title = cet.Title;
				WelcomeScreen = cet.WelcomeScreen;
				Button = cet.Button;
				Timer = cet.Timer;
				Hints = cet.Hints;
				App = cet.App;
				Lms = cet.Lms;
				//#endregion

				initMuteButton();

				gameEnded = false;

				if (Content.isReady()) {
					Content.shuffle();
				}
				else {
					Stage.bind('contentReady', function () {
						Content.shuffle();
					});
				}



				initBackground();


				// DIMA
				gameInitDone = true;
				Lms.saveXapi(0);

				Stage.bind('Answer', function () {

					currentQuestion++;
					if (Content.getNumberOfQuestions() == currentQuestion) {
						gameEnded = true;

						Progressbar.set('end');

						//Feedback.showFeedback();
						return;
					}
					Game.showQuestion(currentQuestion);
					Progressbar.set(currentQuestion + 1);
				})

				initRestartButton();
			},
			showQuestion: function (questionIndex) {

				Title.set(Content.getQuestionTitle(questionIndex));

				// init all options style
				$('.option').css({
					'visibility': 'visible'
				});

				$('.option').each(function (optionIndex, value) {

					if (Content.getOptionByIndex(questionIndex, optionIndex)) {
						new Option(Content.getOptionByIndex(questionIndex, optionIndex), $(value));
					}
					else {
						// hide options that have no data
						$($('.option')[optionIndex])
							.removeClass('correct')
							.removeClass('error')
							.css({
								'visibility': 'hidden'
						});		
					}	
				});

				
			},
			getCurrentQuestionIndex: function () {
				return currentQuestion;
			},
			//getCurrentQuestionCompletionSound: function () {
			//	return Content.getQuestionCompletionSound(currentQuestion);
			//},
			restart: function () {

				currentQuestion = 0;
				Content.shuffle();
				Stage.trigger('restart');
				if (App.timerEnabled) {
					Timer.stop();
				}
				//Title.set(Content.getQuestionTitle(currentQuestion));
				gameEnded = false;
				//$('.option').each(function (optionIndex, value) {
				//	new Option(Content.getOptionByIndex(currentQuestion, optionIndex), $(value));
				//});
				Lms.saveXapi(4);
				Game.showQuestion(currentQuestion);

			},
			start: function () {

			  Stage.trigger('start');
			  Lms.saveXapi(5);

				Game.showQuestion(currentQuestion);
				Progressbar.set(currentQuestion + 1);


				if (gameInitDone == false) {
					Game.init();
				}
			},
			showExtraQuestion: function () {

				var extraQuestionIndex = Content.getNumberOfQuestions();

				//Title.set(Content.getQuestionTitle(extraQuestionIndex));

				//$('.option').each(function (optionIndex, value) {
				//	new Option(Content.getOptionByIndex(extraQuestionIndex, optionIndex), $(value));
				//});

				Game.showQuestion(extraQuestionIndex);


				Timer.start();
			},
			isGameEnded: function () {
				return gameEnded;
			}
		}
	})();

	cet.Game = Game;

})();
window.cet = window.cet || {};

(function () {

	//#region meta declarations
	var Option;
	var Trivia;
	var Content;
	var Stage;
	var Game;
	var Feedback;
	var Progressbar;
	var Audio;
	var Title;
	var WelcomeScreen;
	var Button;
	var Timer;
	var Hints;
	var App;
	var Lms;
	//#endregion

	var Hints = (function () {

		var jqHint50;
		var jqHintReplace;
		var jqHintTime;

		var symbolHint50;
		var symbolHintReplace;
		var symbolHintTime;

		// helper function
		function getRandomNumber(upperBound) {
			return Math.floor((Math.random() * upperBound));
		}

		return {
			init: function () {

				//#region meta declarations
				Option = cet.Option;
					Trivia = cet.Trivia;
				Content = cet.Content;
					Stage = cet.Stage;
					Game = cet.Game;
				Feedback = cet.Feedback;
				Progressbar = cet.Progressbar;
				Audio = cet.Audio;
					Title = cet.Title;
				WelcomeScreen = cet.WelcomeScreen;
					Button = cet.Button;
					Timer = cet.Timer;
					Hints = cet.Hints;
				App = cet.App;
				Lms = cet.Lms;
				//#endregion

				jqHint50 = $('.hint-50');
				jqHintReplace = $('.hint-replace');
				jqHintTime = $('.hint-time');

				//// TODO bind restart trigger
				//Stage.bind('restart', function () {
				//	Hints.restart();
				//})

				jqHint50.on('click', function () {
					if (!jqHint50.hasClass('disabled') && !Trivia.isSelectedOption()) {
						Hints.hint50();
						Button.disable(jqHint50);
					}

				});

				jqHintTime.on('click', function () {
					if (!jqHintTime.hasClass('disabled') && !Trivia.isSelectedOption()) {
						Hints.hintTime();
						Button.disable(jqHintTime);
					}
				});

				jqHintReplace.on('click', function () {
					if (!jqHintReplace.hasClass('disabled') && !Trivia.isSelectedOption()) {
						Hints.hintReplace();
						Button.disable(jqHintReplace);
					}
				})
			},
			hint50: function () {

				var wrongOptoins = $('.option.error');

				var randNum = getRandomNumber(wrongOptoins.length);

				wrongOptoins.hide();


				// show only one wrong option
				$(wrongOptoins[randNum]).show();

			},
			hintReplace: function () {
				// enlarge number of questions by one
				//Title.stopAudio();
				Game.showExtraQuestion();
			},
			hintTime: function () {
				Timer.start();
			},
			restart: function () {
				cet.Button.enable(jqHint50);
				cet.Button.enable(jqHintReplace);
				cet.Button.enable(jqHintTime);
			},
			hideAll: function () {
				jqHint50.hide();
				jqHintReplace.hide();
				jqHintTime.hide();
			},
			disableAll: function () {
				cet.Button.disable($('.hint-50'));
				cet.Button.disable($('.hint-replace'));
				cet.Button.disable($('.hint-time'));
			}

		}
	})();

	cet.Hints = Hints;

})();
/* http://keith-wood.name/countdown.html
   Countdown for jQuery v1.6.3.
   Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */
(function($){function Countdown(){this.regional=[];this.regional['']={labels:['Years','Months','Weeks','Days','Hours','Minutes','Seconds'],labels1:['Year','Month','Week','Day','Hour','Minute','Second'],compactLabels:['y','m','w','d'],whichLabels:null,digits:['0','1','2','3','4','5','6','7','8','9'],timeSeparator:':',isRTL:false};this._defaults={until:null,since:null,timezone:null,serverSync:null,format:'dHMS',layout:'',compact:false,significant:0,description:'',expiryUrl:'',expiryText:'',alwaysExpire:false,onExpiry:null,onTick:null,tickInterval:1};$.extend(this._defaults,this.regional['']);this._serverSyncs=[];var c=(typeof Date.now=='function'?Date.now:function(){return new Date().getTime()});var d=(window.performance&&typeof window.performance.now=='function');function timerCallBack(a){var b=(a<1e12?(d?(performance.now()+performance.timing.navigationStart):c()):a||c());if(b-f>=1000){x._updateTargets();f=b}e(timerCallBack)}var e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null;var f=0;if(!e||$.noRequestAnimationFrame){$.noRequestAnimationFrame=null;setInterval(function(){x._updateTargets()},980)}else{f=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||c();e(timerCallBack)}}var Y=0;var O=1;var W=2;var D=3;var H=4;var M=5;var S=6;$.extend(Countdown.prototype,{markerClassName:'hasCountdown',propertyName:'countdown',_rtlClass:'countdown_rtl',_sectionClass:'countdown_section',_amountClass:'countdown_amount',_rowClass:'countdown_row',_holdingClass:'countdown_holding',_showClass:'countdown_show',_descrClass:'countdown_descr',_timerTargets:[],setDefaults:function(a){this._resetExtraLabels(this._defaults,a);$.extend(this._defaults,a||{})},UTCDate:function(a,b,c,e,f,g,h,i){if(typeof b=='object'&&b.constructor==Date){i=b.getMilliseconds();h=b.getSeconds();g=b.getMinutes();f=b.getHours();e=b.getDate();c=b.getMonth();b=b.getFullYear()}var d=new Date();d.setUTCFullYear(b);d.setUTCDate(1);d.setUTCMonth(c||0);d.setUTCDate(e||1);d.setUTCHours(f||0);d.setUTCMinutes((g||0)-(Math.abs(a)<30?a*60:a));d.setUTCSeconds(h||0);d.setUTCMilliseconds(i||0);return d},periodsToSeconds:function(a){return a[0]*31557600+a[1]*2629800+a[2]*604800+a[3]*86400+a[4]*3600+a[5]*60+a[6]},_attachPlugin:function(a,b){a=$(a);if(a.hasClass(this.markerClassName)){return}var c={options:$.extend({},this._defaults),_periods:[0,0,0,0,0,0,0]};a.addClass(this.markerClassName).data(this.propertyName,c);this._optionPlugin(a,b)},_addTarget:function(a){if(!this._hasTarget(a)){this._timerTargets.push(a)}},_hasTarget:function(a){return($.inArray(a,this._timerTargets)>-1)},_removeTarget:function(b){this._timerTargets=$.map(this._timerTargets,function(a){return(a==b?null:a)})},_updateTargets:function(){for(var i=this._timerTargets.length-1;i>=0;i--){this._updateCountdown(this._timerTargets[i])}},_optionPlugin:function(a,b,c){a=$(a);var d=a.data(this.propertyName);if(!b||(typeof b=='string'&&c==null)){var e=b;b=(d||{}).options;return(b&&e?b[e]:b)}if(!a.hasClass(this.markerClassName)){return}b=b||{};if(typeof b=='string'){var e=b;b={};b[e]=c}if(b.layout){b.layout=b.layout.replace(/&lt;/g,'<').replace(/&gt;/g,'>')}this._resetExtraLabels(d.options,b);var f=(d.options.timezone!=b.timezone);$.extend(d.options,b);this._adjustSettings(a,d,b.until!=null||b.since!=null||f);var g=new Date();if((d._since&&d._since<g)||(d._until&&d._until>g)){this._addTarget(a[0])}this._updateCountdown(a,d)},_updateCountdown:function(a,b){var c=$(a);b=b||c.data(this.propertyName);if(!b){return}c.html(this._generateHTML(b)).toggleClass(this._rtlClass,b.options.isRTL);if($.isFunction(b.options.onTick)){var d=b._hold!='lap'?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date());if(b.options.tickInterval==1||this.periodsToSeconds(d)%b.options.tickInterval==0){b.options.onTick.apply(a,[d])}}var e=b._hold!='pause'&&(b._since?b._now.getTime()<b._since.getTime():b._now.getTime()>=b._until.getTime());if(e&&!b._expiring){b._expiring=true;if(this._hasTarget(a)||b.options.alwaysExpire){this._removeTarget(a);if($.isFunction(b.options.onExpiry)){b.options.onExpiry.apply(a,[])}if(b.options.expiryText){var f=b.options.layout;b.options.layout=b.options.expiryText;this._updateCountdown(a,b);b.options.layout=f}if(b.options.expiryUrl){window.location=b.options.expiryUrl}}b._expiring=false}else if(b._hold=='pause'){this._removeTarget(a)}c.data(this.propertyName,b)},_resetExtraLabels:function(a,b){var c=false;for(var n in b){if(n!='whichLabels'&&n.match(/[Ll]abels/)){c=true;break}}if(c){for(var n in a){if(n.match(/[Ll]abels[02-9]|compactLabels1/)){a[n]=null}}}},_adjustSettings:function(a,b,c){var d;var e=0;var f=null;for(var i=0;i<this._serverSyncs.length;i++){if(this._serverSyncs[i][0]==b.options.serverSync){f=this._serverSyncs[i][1];break}}if(f!=null){e=(b.options.serverSync?f:0);d=new Date()}else{var g=($.isFunction(b.options.serverSync)?b.options.serverSync.apply(a,[]):null);d=new Date();e=(g?d.getTime()-g.getTime():0);this._serverSyncs.push([b.options.serverSync,e])}var h=b.options.timezone;h=(h==null?-d.getTimezoneOffset():h);if(c||(!c&&b._until==null&&b._since==null)){b._since=b.options.since;if(b._since!=null){b._since=this.UTCDate(h,this._determineTime(b._since,null));if(b._since&&e){b._since.setMilliseconds(b._since.getMilliseconds()+e)}}b._until=this.UTCDate(h,this._determineTime(b.options.until,d));if(e){b._until.setMilliseconds(b._until.getMilliseconds()+e)}}b._show=this._determineShow(b)},_destroyPlugin:function(a){a=$(a);if(!a.hasClass(this.markerClassName)){return}this._removeTarget(a[0]);a.removeClass(this.markerClassName).empty().removeData(this.propertyName)},_pausePlugin:function(a){this._hold(a,'pause')},_lapPlugin:function(a){this._hold(a,'lap')},_resumePlugin:function(a){this._hold(a,null)},_hold:function(a,b){var c=$.data(a,this.propertyName);if(c){if(c._hold=='pause'&&!b){c._periods=c._savePeriods;var d=(c._since?'-':'+');c[c._since?'_since':'_until']=this._determineTime(d+c._periods[0]+'y'+d+c._periods[1]+'o'+d+c._periods[2]+'w'+d+c._periods[3]+'d'+d+c._periods[4]+'h'+d+c._periods[5]+'m'+d+c._periods[6]+'s');this._addTarget(a)}c._hold=b;c._savePeriods=(b=='pause'?c._periods:null);$.data(a,this.propertyName,c);this._updateCountdown(a,c)}},_getTimesPlugin:function(a){var b=$.data(a,this.propertyName);return(!b?null:(b._hold=='pause'?b._savePeriods:(!b._hold?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date()))))},_determineTime:function(k,l){var m=function(a){var b=new Date();b.setTime(b.getTime()+a*1000);return b};var n=function(a){a=a.toLowerCase();var b=new Date();var c=b.getFullYear();var d=b.getMonth();var e=b.getDate();var f=b.getHours();var g=b.getMinutes();var h=b.getSeconds();var i=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;var j=i.exec(a);while(j){switch(j[2]||'s'){case's':h+=parseInt(j[1],10);break;case'm':g+=parseInt(j[1],10);break;case'h':f+=parseInt(j[1],10);break;case'd':e+=parseInt(j[1],10);break;case'w':e+=parseInt(j[1],10)*7;break;case'o':d+=parseInt(j[1],10);e=Math.min(e,x._getDaysInMonth(c,d));break;case'y':c+=parseInt(j[1],10);e=Math.min(e,x._getDaysInMonth(c,d));break}j=i.exec(a)}return new Date(c,d,e,f,g,h,0)};var o=(k==null?l:(typeof k=='string'?n(k):(typeof k=='number'?m(k):k)));if(o)o.setMilliseconds(0);return o},_getDaysInMonth:function(a,b){return 32-new Date(a,b,32).getDate()},_normalLabels:function(a){return a},_generateHTML:function(c){var d=this;c._periods=(c._hold?c._periods:this._calculatePeriods(c,c._show,c.options.significant,new Date()));var e=false;var f=0;var g=c.options.significant;var h=$.extend({},c._show);for(var i=Y;i<=S;i++){e|=(c._show[i]=='?'&&c._periods[i]>0);h[i]=(c._show[i]=='?'&&!e?null:c._show[i]);f+=(h[i]?1:0);g-=(c._periods[i]>0?1:0)}var j=[false,false,false,false,false,false,false];for(var i=S;i>=Y;i--){if(c._show[i]){if(c._periods[i]){j[i]=true}else{j[i]=g>0;g--}}}var k=(c.options.compact?c.options.compactLabels:c.options.labels);var l=c.options.whichLabels||this._normalLabels;var m=function(a){var b=c.options['compactLabels'+l(c._periods[a])];return(h[a]?d._translateDigits(c,c._periods[a])+(b?b[a]:k[a])+' ':'')};var n=function(a){var b=c.options['labels'+l(c._periods[a])];return((!c.options.significant&&h[a])||(c.options.significant&&j[a])?'<span class="'+x._sectionClass+'">'+'<span class="'+x._amountClass+'">'+d._translateDigits(c,c._periods[a])+'</span><br/>'+(b?b[a]:k[a])+'</span>':'')};return(c.options.layout?this._buildLayout(c,h,c.options.layout,c.options.compact,c.options.significant,j):((c.options.compact?'<span class="'+this._rowClass+' '+this._amountClass+(c._hold?' '+this._holdingClass:'')+'">'+m(Y)+m(O)+m(W)+m(D)+(h[H]?this._minDigits(c,c._periods[H],2):'')+(h[M]?(h[H]?c.options.timeSeparator:'')+this._minDigits(c,c._periods[M],2):'')+(h[S]?(h[H]||h[M]?c.options.timeSeparator:'')+this._minDigits(c,c._periods[S],2):''):'<span class="'+this._rowClass+' '+this._showClass+(c.options.significant||f)+(c._hold?' '+this._holdingClass:'')+'">'+n(Y)+n(O)+n(W)+n(D)+n(H)+n(M)+n(S))+'</span>'+(c.options.description?'<span class="'+this._rowClass+' '+this._descrClass+'">'+c.options.description+'</span>':'')))},_buildLayout:function(c,d,e,f,g,h){var j=c.options[f?'compactLabels':'labels'];var k=c.options.whichLabels||this._normalLabels;var l=function(a){return(c.options[(f?'compactLabels':'labels')+k(c._periods[a])]||j)[a]};var m=function(a,b){return c.options.digits[Math.floor(a/b)%10]};var o={desc:c.options.description,sep:c.options.timeSeparator,yl:l(Y),yn:this._minDigits(c,c._periods[Y],1),ynn:this._minDigits(c,c._periods[Y],2),ynnn:this._minDigits(c,c._periods[Y],3),y1:m(c._periods[Y],1),y10:m(c._periods[Y],10),y100:m(c._periods[Y],100),y1000:m(c._periods[Y],1000),ol:l(O),on:this._minDigits(c,c._periods[O],1),onn:this._minDigits(c,c._periods[O],2),onnn:this._minDigits(c,c._periods[O],3),o1:m(c._periods[O],1),o10:m(c._periods[O],10),o100:m(c._periods[O],100),o1000:m(c._periods[O],1000),wl:l(W),wn:this._minDigits(c,c._periods[W],1),wnn:this._minDigits(c,c._periods[W],2),wnnn:this._minDigits(c,c._periods[W],3),w1:m(c._periods[W],1),w10:m(c._periods[W],10),w100:m(c._periods[W],100),w1000:m(c._periods[W],1000),dl:l(D),dn:this._minDigits(c,c._periods[D],1),dnn:this._minDigits(c,c._periods[D],2),dnnn:this._minDigits(c,c._periods[D],3),d1:m(c._periods[D],1),d10:m(c._periods[D],10),d100:m(c._periods[D],100),d1000:m(c._periods[D],1000),hl:l(H),hn:this._minDigits(c,c._periods[H],1),hnn:this._minDigits(c,c._periods[H],2),hnnn:this._minDigits(c,c._periods[H],3),h1:m(c._periods[H],1),h10:m(c._periods[H],10),h100:m(c._periods[H],100),h1000:m(c._periods[H],1000),ml:l(M),mn:this._minDigits(c,c._periods[M],1),mnn:this._minDigits(c,c._periods[M],2),mnnn:this._minDigits(c,c._periods[M],3),m1:m(c._periods[M],1),m10:m(c._periods[M],10),m100:m(c._periods[M],100),m1000:m(c._periods[M],1000),sl:l(S),sn:this._minDigits(c,c._periods[S],1),snn:this._minDigits(c,c._periods[S],2),snnn:this._minDigits(c,c._periods[S],3),s1:m(c._periods[S],1),s10:m(c._periods[S],10),s100:m(c._periods[S],100),s1000:m(c._periods[S],1000)};var p=e;for(var i=Y;i<=S;i++){var q='yowdhms'.charAt(i);var r=new RegExp('\\{'+q+'<\\}([\\s\\S]*)\\{'+q+'>\\}','g');p=p.replace(r,((!g&&d[i])||(g&&h[i])?'$1':''))}$.each(o,function(n,v){var a=new RegExp('\\{'+n+'\\}','g');p=p.replace(a,v)});return p},_minDigits:function(a,b,c){b=''+b;if(b.length>=c){return this._translateDigits(a,b)}b='0000000000'+b;return this._translateDigits(a,b.substr(b.length-c))},_translateDigits:function(b,c){return(''+c).replace(/[0-9]/g,function(a){return b.options.digits[a]})},_determineShow:function(a){var b=a.options.format;var c=[];c[Y]=(b.match('y')?'?':(b.match('Y')?'!':null));c[O]=(b.match('o')?'?':(b.match('O')?'!':null));c[W]=(b.match('w')?'?':(b.match('W')?'!':null));c[D]=(b.match('d')?'?':(b.match('D')?'!':null));c[H]=(b.match('h')?'?':(b.match('H')?'!':null));c[M]=(b.match('m')?'?':(b.match('M')?'!':null));c[S]=(b.match('s')?'?':(b.match('S')?'!':null));return c},_calculatePeriods:function(c,d,e,f){c._now=f;c._now.setMilliseconds(0);var g=new Date(c._now.getTime());if(c._since){if(f.getTime()<c._since.getTime()){c._now=f=g}else{f=c._since}}else{g.setTime(c._until.getTime());if(f.getTime()>c._until.getTime()){c._now=f=g}}var h=[0,0,0,0,0,0,0];if(d[Y]||d[O]){var i=x._getDaysInMonth(f.getFullYear(),f.getMonth());var j=x._getDaysInMonth(g.getFullYear(),g.getMonth());var k=(g.getDate()==f.getDate()||(g.getDate()>=Math.min(i,j)&&f.getDate()>=Math.min(i,j)));var l=function(a){return(a.getHours()*60+a.getMinutes())*60+a.getSeconds()};var m=Math.max(0,(g.getFullYear()-f.getFullYear())*12+g.getMonth()-f.getMonth()+((g.getDate()<f.getDate()&&!k)||(k&&l(g)<l(f))?-1:0));h[Y]=(d[Y]?Math.floor(m/12):0);h[O]=(d[O]?m-h[Y]*12:0);f=new Date(f.getTime());var n=(f.getDate()==i);var o=x._getDaysInMonth(f.getFullYear()+h[Y],f.getMonth()+h[O]);if(f.getDate()>o){f.setDate(o)}f.setFullYear(f.getFullYear()+h[Y]);f.setMonth(f.getMonth()+h[O]);if(n){f.setDate(o)}}var p=Math.floor((g.getTime()-f.getTime())/1000);var q=function(a,b){h[a]=(d[a]?Math.floor(p/b):0);p-=h[a]*b};q(W,604800);q(D,86400);q(H,3600);q(M,60);q(S,1);if(p>0&&!c._since){var r=[1,12,4.3482,7,24,60,60];var s=S;var t=1;for(var u=S;u>=Y;u--){if(d[u]){if(h[s]>=t){h[s]=0;p=1}if(p>0){h[u]++;p=0;s=u;t=1}}t*=r[u]}}if(e){for(var u=Y;u<=S;u++){if(e&&h[u]){e--}else if(!e){h[u]=0}}}return h}});var w=['getTimes'];function isNotChained(a,b){if(a=='option'&&(b.length==0||(b.length==1&&typeof b[0]=='string'))){return true}return $.inArray(a,w)>-1}$.fn.countdown=function(a){var b=Array.prototype.slice.call(arguments,1);if(isNotChained(a,b)){return x['_'+a+'Plugin'].apply(x,[this[0]].concat(b))}return this.each(function(){if(typeof a=='string'){if(!x['_'+a+'Plugin']){throw'Unknown command: '+a;}x['_'+a+'Plugin'].apply(x,[this].concat(b))}else{x._attachPlugin(this,a||{})}})};var x=$.countdown=new Countdown()})(jQuery);
(function () {
  //#region meta declarations
  var Option;
  var Trivia;
  var Content;
  var Stage;
  var Game;
  var Feedback;
  var Progressbar;
  var Audio;
  var Title;
  var WelcomeScreen;
  var Button;
  var Timer;
  var Hints;
  var App;
  var Lms;
  //#endregion

  var questionNo;

  var Lms = (function () {

    var firstGame = true;

    var state = {};

    var lastState = {};

    var bestState = {};

    var userInteractionAccurred = false;


    function calculateScore(curState) {
      return Math.round((100 * curState.totalCorrectAns / curState.totalNumberOfQuestions) * 100) / 100;
    }

    function finishImplementingLmsApi() {

      if (cet.content.lms.Activity.engagement.mode == 'review') {

        //App.setAsReadOnly();
        //WelcomeScreen.hide();
        //Feedback.showTeacherFeedback();
        //App.noRestart();
      }

      if (cet.content.lms.Activity.engagement.access == 'read') {

        if (cet.content.lms.Activity.engagement.mode != null) {

          if (cet.content.lms.Activity.engagement.mode == 'solved') {
            // teacher plays as usual but no saving is done

          }
          else {

            // show teacher feedback
            App.setAsReadOnly();
            WelcomeScreen.hide();
            Feedback.showTeacherFeedback();
            App.noRestart();
          }



        }
      }
      else {
        if (!Lms.isFirstGame()) {
          WelcomeScreen.hide();
          Feedback.showTeacherFeedback();
        }
      }


      //cet.content.lms.Activity.settings.supportsCheck(true);
      //cet.content.lms.Activity.settings.supportsRegenerate(false);
      //cet.content.lms.Activity.settings.supportsReset(true);
      //cet.content.lms.Activity.settings.supportsShowSolution(true);

      //cet.content.lms.Activity.bind('check', function () { Baskets.showFeedback(); });
      //cet.content.lms.Activity.bind('reset', function () { App.restart(); });
      //cet.content.lms.Activity.bind('showsolution', function () { App.showSolution(); });

    }

    return {
      init: function () {
        //#region meta declarations
        Option = cet.Option;
        Trivia = cet.Trivia;
        Content = cet.Content;
        Stage = cet.Stage;
        Game = cet.Game;
        Feedback = cet.Feedback;
        Progressbar = cet.Progressbar;
        Audio = cet.Audio;
        Title = cet.Title;
        WelcomeScreen = cet.WelcomeScreen;
        Button = cet.Button;
        Timer = cet.Timer;
        Hints = cet.Hints;
        App = cet.App;
        Lms = cet.Lms;
        //#endregion


        if (!cet.content.lms.Settings.supported) {
          App.lmsActive = false;
        }

        if (cet.content.UI.clientReady()) {
          Lms.getState();
        }
        else {
          cet.content.UI.bind('clientready', Lms.getState);
        }

        Stage.bind('restart', function () {
          if (cet.content.lms.Settings.supported && cet.content.lms.Activity.engagement.store == 'readwrite') {
            //Lms.getState();
          }
        });

        Stage.bind('endGame', function () {
          if (cet.content.lms.Settings.supported && cet.content.lms.Activity.engagement.store == 'readwrite') {
            Lms.save();
          }
        });

      },



      saveXapi: function (lastAction, bCorrect) {

        //cet.content.xapiSupported = true;


        if (cet.content.xapiSupported) {

          this.actionStrings = ["", "answered", "asked_check", "asked_showAnswer", "cleared", "launched", "loaded", "asked_generate"];
          this.actNONE = 0;
          this.actANSWER = 1;
          this.actCHECK = 2;
          this.actSOLUTION = 3;
          this.actCLEAN = 4;
          this.actLAUNCH = 5;
          this.actLOAD = 6;
          this.actGENERATE = 7;





          Xapi = {};
          if (lastAction != this.actNONE) {
            Xapi.verb = this.actionStrings[lastAction];

            Xapi.object = {};
            Xapi.object.definition = {};
            Xapi.object.definition = { type: "http://adlnet.gov/expapi/activities/cmi.interaction.asset." + "Trivia" };

            //if (lastAction == actGENERATE || lastAction == actLOAD) {
            //  Xapi.object.objectAdditionalInformation = { state: State };
            //  lastAction = actNONE;
            //}

            function fieldsResponce() {
              questionNo = Game.getCurrentQuestionIndex();
              var key = 'option' + questionNo;
              var result = {};
              result[key] = cet.Content.getContentJson().questions[questionNo];
              return result;
            }
            function fieldsScore() {
              questionNo = Game.getCurrentQuestionIndex();
              var key = 'option' + questionNo;
              var result = {};
              result[key] = (bCorrect) ? 1 : 0;
              return result;
            }

            Xapi.result = {};

            if (lastAction == this.actANSWER || lastAction == this.actCHECK) {



              Xapi.result.extensions = {};
              Xapi.result.extensions['http://xapi.cet.ac.il/full_answer'] = fieldsResponce();
              Xapi.result.extensions['http://xapi.cet.ac.il/score'] = fieldsScore();
            }

            var curState = Trivia.getState();

            var score = calculateScore(curState);


            Xapi.result.scaled = (Math.round((score / 100) * 100)) / 100;
            Xapi.result.success = (score == 100);
            Xapi.result.completion = true; // (score == 100 && bJustChecked);



            cet.content.xapi.send(Xapi);
          }
        }

      },

      save: function () {

        if (!userInteractionAccurred) {
          userInteractionAccurred = true;
          cet.content.lms.Activity.start()
        }

        var curState = Trivia.getState();

        cet.content.State.save(curState);

        cet.content.lms.Activity.score(calculateScore(curState));


        //if (firstGame) {
        //	cet.content.State.save(curState);
        //}
        //else {

        //	//Lms.getState();

        //	if (curState.score > bestState.score) {
        //		cet.content.State.save(curState);
        //	}
        //}
      },

      getState: function () {


        cet.content.State.load(function (data) {

          if (data) {
            firstGame = false;
            bestState = data;
          }

          Stage.trigger('LmsLoaded');
          finishImplementingLmsApi();
        });

      },

      getBestScore: function () {
        return bestState;
      },

      isFirstGame: function () {
        return firstGame;
      }

    };
  })();

  cet.Lms = Lms;

})();
(function () {
	//#region meta declarations
	var Option;
	var Trivia;
	var Content;
	var Stage;
	var Game;
	var Feedback;
	var Progressbar;
	var Audio;
	var Title;
	var WelcomeScreen;
	var Button;
	var Timer;
	var Hints;
	var App;
	var Lms;
	//#endregion

	var Progressbar = (function () {

		var jqElement = null;
		var symbol = null;

		return {
			init: function () {

				//#region meta declarations
				Stage = cet.Stage;
				//#endregion

				jqElement = $('.progress');
				// No Progress Bar
				if (jqElement.length == 0) {
					return;
				}

				symbol = Stage.getSymbol(jqElement);

				Stage.bind('restart', function () {
					symbol.stop('1');
				})
			},
			set: function (questionIndex) {

				symbol.stop(questionIndex + '');

			},
			updateQuestionState: function (questionNumber,questionState) {


				var $progressItem = $('.progress-item-' + questionNumber);

				var $progressRight = $progressItem.find('.progress-right');
				var $progressError = $progressItem.find('.progress-error');

				if (questionState == true) {
					$progressRight.show();
					$progressError.hide();
				}
				else {
					$progressRight.hide();
					$progressError.show();
				}

			}
		}

	})();

	cet.Progressbar = Progressbar;

})();
window.cet = window.cet || {};

(function () {

	//#region meta declarations

	var Option;
	var Trivia;
	var Content;
	var Stage;
	var Game;
	var Feedback;
	var Progressbar;
	var Audio;
	var Title;
	var WelcomeScreen;
	var Button;
	var Timer;
	var Hints;
	var App;
	var Lms;


	//#endregion

	var Timer = (function () {

		var jqTimer;
		var symbolTimer;
		var costumeTime;
		//var secondsToGo;
		//var animateToEndInterval;

		function countdownEnded() {
			Audio.load('UI/wrong');

			Audio.play('UI/wrong');

			Stage.trigger('countdownEnded');
		}

		function watchCountdown(periods) {
			//$('#monitor').text('Just ' + periods[5] + ' minutes and ' +
			//    periods[6] + ' seconds to go');
			var secondsToGo = periods[6];
			var label = (costumeTime - secondsToGo).toString();
			symbolTimer.stop(label);





			if (!App.isMobile) {

				if (label < 15) {
					// 0 - 15
					// no sound here
					//Audio.play('UI/timer_tick');
				}
				else {
					if (label < 23) {
						// 16 - 23
						//Audio.play('UI/timer_tick');
					}
					else {
						// 24 - 30
						if (label != 30) {
							Audio.play('UI/timer_tick');
						}

					}
				}

			}



			//if (label > 1) {
			//	// play tick sound
			//	Audio.play('UI/timer_tick');
			//}


		}

		return {
			init: function () {

				//#region meta declarations
				Option = cet.Option;
				Trivia = cet.Trivia;
				Content = cet.Content;
				Stage = cet.Stage;
				Game = cet.Game;
				Feedback = cet.Feedback;
				Progressbar = cet.Progressbar;
				Audio = cet.Audio;
				Title = cet.Title;
				WelcomeScreen = cet.WelcomeScreen;
				Button = cet.Button;
				Timer = cet.Timer;
				Hints = cet.Hints;
				App = cet.App;
				Lms = cet.Lms;
				//#endregion



				jqTimer = $('.timer');

				Audio.load('UI/timer_tick');

				if (jqTimer.length > 0) {
					symbolTimer = Stage.getSymbol(jqTimer);
					symbolTimer.stop(0);

					if (Content.isReady()) {
						if (Content.getTimer() != '') {
							costumeTime = Content.getTimer();

						}
					}
					else
						CET.Stage.bind('contentReady', function () {
							if (Content.getTimer() != '') {
								costumeTime = Content.getTimer();
							}
						});
				}

				Stage.bind('start', function () {

					if (!Content.previewMode()) {
						Timer.start();
					}

					
				});

				Stage.bind('endGame', function () {
					Timer.stop();
				});
			},
			hideTimer : function () {
				jqTimer.hide();
			},
			start: function () {


				$('#hiddenTimer').remove();
				$('body').append('<div id="hiddenTimer" style="display:none;"></div>');
				$('#hiddenTimer').countdown({
					until: costumeTime,
					onExpiry: countdownEnded, onTick: watchCountdown
				});
			},
			//getTimeLeft: function () {
			//	Timer.stop();
			//	//var timeLeft;
			//	//timeLeft = costumeTime - Math.round(symbolTimer.getPosition() / 1000);
			//	//return timeLeft;
			//	return secondsToGo;
			//},
			stop: function () {
				//symbolTimer.stop();

				$('#hiddenTimer').remove();
				Audio.stop('UI/timer_tick');
				
				//$('#hiddenTimer').countdown('pause');
			},
			//animateToEnd: function () {
			//	Timer.stop();

			//	var n = secondsToGo;
			//	//var scoreInterval = parseInt(Content.getScoreInterval());

			//	animateToEndInterval = setInterval(countDown, 50);

			//	function countDown() {
			//		n--;

			//		var label = (costumeTime - n).toString();
			//		symbolTimer.stop(label);

			//		Trivia.updateScore(Trivia.getScore() + scoreInterval);
			//		Trivia.updateScoreUi();

			//		if (n == 0) {
			//			clearInterval(animateToEndInterval);
			//		}
			//	}

			//},
			//stopAnimateToEnd: function () {
			//	clearInterval(animateToEndInterval);
			//},
			goToStart: function () {
				symbolTimer.stop('1');
			}
		}

	})();

	cet.Timer = Timer;

})();
window.cet = window.cet || {};

(function () {

	//#region meta declarations
	var Option;
	var Trivia;
	var Content;
	var Stage;
	var Game;
	var Feedback;
	var Progressbar;
	var Audio;
	var Title;
	var WelcomeScreen;
	var Button;
	var Timer;
	var Hints;
	var App;
	var Lms;
	//#endregion

	var Title = (function () {

		var jqElement;
		var symbol;

		var jqImg;
		var jqText;
		var jqSound;
		var soundSymbol;
		//var jqTitleSoundAnim;

		return {
			init: function () {
				//#region meta declarations
				Option = cet.Option;
				Trivia = cet.Trivia;
				Content = cet.Content;
				Stage = cet.Stage;
				Game = cet.Game;
				Feedback = cet.Feedback;
				Progressbar = cet.Progressbar;
				Audio = cet.Audio;
				Title = cet.Title;
				WelcomeScreen = cet.WelcomeScreen;
				Button = cet.Button;
				Timer = cet.Timer;
				Hints = cet.Hints;
				App = cet.App;
				Lms = cet.Lms;
				//#endregion

				jqElement = $('.title');
				//jqTitleSoundAnim = $('.title-sound-anim');
				symbol = Stage.getSymbol(jqElement);

				//jqImg = jqElement.find('.img');
				jqText = jqElement.find('.text');
				//jqSound = jqElement.find('.sound');

				//soundSymbol = Stage.getSymbol(jqTitleSoundAnim);

				Stage.bind('Answer', function () {
					//soundSymbol.stop('stop');
					//Button.enable(jqSound);
				});

				Stage.bind('countdownEnded', function () {
					//Title.stopAudio();
				});

			},

			set: function (titleData) {

				//if (jqImg.length > 0) {
				//	jqImg.css('background-image', 'url(' + titleData.img + ')');
				//}
				if (jqText.length > 0) {
					//jqText.text(titleData);


					var html = '<div class="title-text vertical-pos-parent lang-' + Content.getLanguage() + ' font-size-' + Content.getFontSize() + '"><div class="vertical-pos-child">' + titleData + '</div></div>';

					jqText.html(html);
				}

			},

		}
	})();

	cet.Title = Title;

})();

(function () {

	//#region meta declarations
	var Option;
	var Trivia;
	var Content;
	var Stage;
	var Game;
	var Feedback;
	var Progressbar;
	var Audio;
	var Title;
	var WelcomeScreen;
	var Button;
	var Timer;
	var Hints;
	var App;
	var Lms;
	//#endregion

	var Trivia = (function () {

		var jqElement = null;
		var correctJqElement = null;
		var errorJqElement = null;
		var scoreJqElement = null;
		var score = 0;
		var totalCorrectAnswers = 0;

		this.nextTriviaInterval;

		var correctSymbol = null;
		var errorSymbol = null;

		var showingSelection = false;

		var selectedOptionData = null;

		//function completionSoundSupported() {
		//	return navigator.userAgent.toLowerCase().indexOf('android') == -1;
		//}

		function playSoundsAndNextTrivia() {



			var playMe = selectedOptionData.correct ? 'UI/correct' : 'UI/wrong';
			var playMethodAfterSound = null;

			playMethodAfterSound = nextTrivia;



			Audio.play(playMe);

			//Audio.play(playMe, playMethodAfterSound);
			nextTrivia();


			

		}

		function nextTrivia() {


			setTimeout(function () {



				Stage.trigger('Answer');

				if (Game.isGameEnded()) {
					Feedback.showFeedback();				
				}
				else {			
					if (App.timerEnabled) {
						Timer.start();
					}
				}

				initOptionStates();

			}, 2500);


			//Trivia.nextTriviaInterval = setInterval(function () {

			//	Stage.trigger('Answer');

			//	if (Game.isGameEnded()) {
			//		Feedback.showFeedback();
			//		initOptionStates();
			//	}
			//	else {
			//		initOptionStates();
			//		if (App.timerEnabled) {
			//			Timer.start();
			//		}
			//	}

			//	clearInterval(Trivia.nextTriviaInterval);
			//}, 2500);

		}

		function initOptionStates() {

			var $options = $('.option');

			// init all options
			$options.show();


			// enable all option buttons
			for (var i = 0; i < $options.length; i++) {
				Button.enable($($options[i]).find('.edge-btn'));
			}



			// init all options states
			$('.option-normal').show();
			$('.option-error').hide();
			$('.option-right').hide();

			var correctEl = $('.correct').find('.option-right');
			var correctElSymbol = Stage.getSymbol(correctEl);
			correctElSymbol.stop('right');

			showingSelection = false;
		}

		//function calcScore() {
		//	var secondsLeft = Timer.getTimeLeft();
		//	score += secondsLeft;
		//}

		function calcScore() {
			var pointsToAdd = '10';
			score += pointsToAdd;
		}

		function pad(str, max) {
			// Adding extra zeros in front of a number
			// pad(85, 5) as well as pad("85", 5) => 00085
			str = str.toString();
			function main(str, max) {
				return str.length < max ? main("0" + str, max) : str;
			}
			return main(str, max);
		}

		return {
			init: function () {

				//#region meta declarations
				Option = cet.Option;
				Trivia = cet.Trivia;
				Content = cet.Content;
				Stage = cet.Stage;
				Game = cet.Game;
				Feedback = cet.Feedback;
				Progressbar = cet.Progressbar;
				Audio = cet.Audio;
				Title = cet.Title;
				WelcomeScreen = cet.WelcomeScreen;
				Button = cet.Button;
				Timer = cet.Timer;
				Hints = cet.Hints;
				App = cet.App;
				Lms = cet.Lms;
				//#endregion

				scoreJqElement = $('.score .text');

				Trivia.updateScoreUi();

				Stage.bind('restart', function () {
					Trivia.restart();
				});

				Audio.load('UI/correct');
				Audio.load('UI/wrong');



				Stage.bind('countdownEnded', function () {

				  Lms.saveXapi(2, false);

					var falseOptData = {
						correct: false,
						img: "",
						text: ""
					};

					selectedOptionData = falseOptData;

					showingSelection = true;

					Trivia.showSemiCorrectAnswer();

					
					nextTrivia();

					//playSoundsAndNextTrivia();
				});

				Stage.bind('optionSelected', function (opt) {

					Trivia.handleOptionSelected(opt);
					//Title.stopAudio();
				});
			},
			restart: function () {
				Trivia.updateScore(0);
				Trivia.updateScoreUi();
				totalCorrectAnswers = 0;

				//Title.stopAudio();
				Audio.stop('UI/correct');
				Audio.stop('UI/wrong');
				showingSelection = false;

				//Timer.stopAnimateToEnd();
				if (App.timerEnabled) {
					Timer.stop();
					Timer.goToStart();
				}

				initOptionStates();

				clearInterval(Trivia.nextTriviaInterval);
			},
			getScore: function () {
				return score;
			},
			getState: function () {

				var state = {};

				state.score = Trivia.getScore();
				state.totalCorrectAns = Trivia.getTotalCorrectAnswers();
				state.totalNumberOfQuestions = Content.getNumberOfQuestions();

				return state;
			},
			getTotalCorrectAnswers: function () {
				return totalCorrectAnswers;
			},
			updateTotalCorrectAnswers: function (total) {
				totalCorrectAnswers = total;
			},
			updateScoreUi: function () {
				//scoreJqElement.text(pad(score, 5));
				scoreJqElement.text(pad(score, 3));
			},
			updateScore: function (newScore) {
				score = newScore;
			},
			handleOptionSelected: function (option) {



				selectedOptionData = option.optionData;
				if (!showingSelection) {

					showingSelection = true;
					option.jqElement.find('.option-normal').hide();

					if (option.optionData.correct) {

					  
						totalCorrectAnswers++;
						Trivia.showCorrectOption();
						//Timer.animateToEnd();
						if (App.timerEnabled) {
							Timer.stop();
						}
						Trivia.animateScore();

						Lms.saveXapi(2, true);

					}
					else {
					  

						Trivia.showErrorOption(option.jqElement);
						if (App.timerEnabled) {
							Timer.stop();
						}
						Lms.saveXapi(2, false);
					}

					playSoundsAndNextTrivia();
				}

			},
			showCorrectOption: function () {

				Progressbar.updateQuestionState((Game.getCurrentQuestionIndex() + 1), true);

				correctJqElement = $('.correct');
				correctJqElement.find('.option-right').show();

				// disable all options exept the correct one
				var $options = $('.option');
				for (var i = 0; i < $options.length; i++) {
					if (!$($options[i]).hasClass('correct')) {
						Button.disable($($options[i]).find('.edge-btn'));
					}
				}


			},
			showErrorOption: function (errorJqElement) {

				Progressbar.updateQuestionState((Game.getCurrentQuestionIndex() + 1), false);

				errorJqElement.find('.option-error').show();

				// disable all options exept the wrong one
				var $options = $('.option');
				for (var i = 0; i < $options.length; i++) {
					if ($($options[i]) != errorJqElement) {
						Button.disable($($options[i]).find('.edge-btn'));
					}
				}

				// show semi correct optin after one second
				var tm = setInterval(semi, 1000);

				function semi() {
					Trivia.showSemiCorrectAnswer();

					clearInterval(tm);
				}

			},
			showSemiCorrectAnswer: function () {

				Progressbar.updateQuestionState((Game.getCurrentQuestionIndex() + 1), false);


				correctJqElement = $('.correct');

				// disable all options exept the wrong one
				var $options = $('.option');
				for (var i = 0; i < $options.length; i++) {
					if ($($options[i]) != correctJqElement) {
						Button.disable($($options[i]).find('.edge-btn'));
					}
				}


				var correctNoV = correctJqElement.find('.option-right');
				var correctNoVSymbol = Stage.getSymbol(correctNoV);

				// hide corrects answer normal state and show the semi correct state
				// option-right + no_V
				correctJqElement.find('.option-normal').hide();
				correctJqElement.find('.option-right').show();
				correctNoVSymbol.stop('no_V');
			},
			isSelectedOption: function () {
				return showingSelection;
			},
			animateScore: function () {

				var n = 10;
				var scoreInterval = 1;

				animateToEndInterval = setInterval(countDown, 50);

				function countDown() {
					n--;

					Trivia.updateScore(Trivia.getScore() + scoreInterval);
					Trivia.updateScoreUi();

					if (n == 0) {
						clearInterval(animateToEndInterval);
					}
				}

			}
		};
	})();

	cet.Trivia = Trivia;

})();
window.cet = window.cet || {};

(function () {
	//#region meta declarations
	var Option;
	var Trivia;
	var Content;
	var Stage;
	var Game;
	var Feedback;
	var Progressbar;
	var Audio;
	var Title;
	var WelcomeScreen;
	var Button;
	var Timer;
	var Hints;
	var App;
	var Lms;
	//#endregion

	var WelcomeScreen = (function () {

		var jqWelcomeScreen;
		var jqTitle;
		var symbolTitle;
		var jqImg;

		return {
			init: function () {

				//#region meta declarations
				Option = cet.Option;
				Trivia = cet.Trivia;
				Content = cet.Content;
				Stage = cet.Stage;
				Game = cet.Game;
				Feedback = cet.Feedback;
				Progressbar = cet.Progressbar;
				Audio = cet.Audio;
				Title = cet.Title;
				WelcomeScreen = cet.WelcomeScreen;
				Button = cet.Button;
				Timer = cet.Timer;
				Hints = cet.Hints;
				App = cet.App;
				Lms = cet.Lms;
				//#endregion

				jqWelcomeScreen = $('.welcome-screen');

				// No Welcome Screen
				if (jqWelcomeScreen.length == 0) {
					return;
				}

				jqTitle = $('.welcome-title');

				if (jqTitle.length > 0) {
					symbolTitle = cet.Stage.getSymbol(jqTitle);

					if (Content.getWelcomeText() != '') {
						jqTitle.text(Content.getWelcomeText());
					}
				}

				jqImg = jqWelcomeScreen.find('.img');

				if (jqImg.length > 0) {
					jqImg.attr('src', Content.getWelcomeImage());

					// update image size by 0.1 percent to refresh it's drawing rectangle in chrome on load.
					var imgWidthPercentageString = jqImg[0].style.width;
					var justPercentage = parseFloat((imgWidthPercentageString.split('%'))[0]);
					setTimeout(function () {
						jqImg.width(justPercentage + 0.1 + '%');
					}, 1000)			
				}

				cet.Stage.bind('restart', function () {
					WelcomeScreen.restart();
				})

				cet.Stage.bind('start', function () {
					WelcomeScreen.hide();
				})

				
				
					Hints.disableAll();
				

				$('.edge-btn-start').on('click', function (e) {
					if (!$(this).hasClass('disabled')) {

						// Hack for ios, play first sound on trigger
						// to let other sounds that are not human triggered to be active
						Audio.load('UI/quartersec');
						Audio.play('UI/quartersec');
						Audio.stop('UI/quartersec');

						if (Content.showHints() && App.timerEnabled) {
							Hints.restart();
						}
						

						Game.start();

					}
					return false;
				})

			},
			hide: function () {
				jqWelcomeScreen.hide();
			},
			// set not in use
			set: function (titleData) {

			},
			restart: function () {
				jqWelcomeScreen.show();
				if (Content.showHints() && App.timerEnabled) {
					Hints.disableAll();
				}
				
			}
		}

	})();

	cet.WelcomeScreen = WelcomeScreen;

})();