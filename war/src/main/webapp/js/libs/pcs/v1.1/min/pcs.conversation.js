define("text",["module"],function(e){"use strict";function n(e,n){return void 0===e||""===e?n:e}function t(e,t,o,r){if(t===r)return!0;if(e===o){if("http"===e)return n(t,"80")===n(r,"80");if("https"===e)return n(t,"443")===n(r,"443")}return!1}var o,r,s,i,a,c=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],l=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,p=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,u="undefined"!=typeof location&&location.href,d=u&&location.protocol&&location.protocol.replace(/\:/,""),v=u&&location.hostname,f=u&&(location.port||void 0),g={},m=e.config&&e.config()||{};return o={version:"2.0.15",strip:function(e){if(e){e=e.replace(l,"");var n=e.match(p);n&&(e=n[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:m.createXhr||function(){var e,n,t;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(n=0;3>n;n+=1){t=c[n];try{e=new ActiveXObject(t)}catch(o){}if(e){c=[t];break}}return e},parseName:function(e){var n,t,o,r=!1,s=e.lastIndexOf("."),i=0===e.indexOf("./")||0===e.indexOf("../");return-1!==s&&(!i||s>1)?(n=e.substring(0,s),t=e.substring(s+1)):n=e,o=t||n,s=o.indexOf("!"),-1!==s&&(r="strip"===o.substring(s+1),o=o.substring(0,s),t?t=o:n=o),{moduleName:n,ext:t,strip:r}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,s){var i,a,c,l=o.xdRegExp.exec(e);return l?(i=l[2],a=l[3],a=a.split(":"),c=a[1],a=a[0],(!i||i===n)&&(!a||a.toLowerCase()===r.toLowerCase())&&(!c&&!a||t(i,c,n,s))):!0},finishLoad:function(e,n,t,r){t=n?o.strip(t):t,m.isBuild&&(g[e]=t),r(t)},load:function(e,n,t,r){if(r&&r.isBuild&&!r.inlineText)return void t();m.isBuild=r&&r.isBuild;var s=o.parseName(e),i=s.moduleName+(s.ext?"."+s.ext:""),a=n.toUrl(i),c=m.useXhr||o.useXhr;return 0===a.indexOf("empty:")?void t():void(!u||c(a,d,v,f)?o.get(a,function(n){o.finishLoad(e,s.strip,n,t)},function(e){t.error&&t.error(e)}):n([i],function(e){o.finishLoad(s.moduleName+"."+s.ext,s.strip,e,t)}))},write:function(e,n,t,r){if(g.hasOwnProperty(n)){var s=o.jsEscape(g[n]);t.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,t,r,s){var i=o.parseName(n),a=i.ext?"."+i.ext:"",c=i.moduleName+a,l=t.toUrl(i.moduleName+a)+".js";o.load(c,t,function(n){var t=function(e){return r(l,e)};t.asModule=function(e,n){return r.asModule(e,l,n)},o.write(e,c,t,s)},s)}},"node"===m.env||!m.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]&&!process.versions["atom-shell"]?(r=require.nodeRequire("fs"),o.get=function(e,n,t){try{var o=r.readFileSync(e,"utf8");"\ufeff"===o[0]&&(o=o.substring(1)),n(o)}catch(s){t&&t(s)}}):"xhr"===m.env||!m.env&&o.createXhr()?o.get=function(e,n,t,r){var s,i=o.createXhr();if(i.open("GET",e,!0),r)for(s in r)r.hasOwnProperty(s)&&i.setRequestHeader(s.toLowerCase(),r[s]);m.onXhr&&m.onXhr(i,e),i.onreadystatechange=function(o){var r,s;4===i.readyState&&(r=i.status||0,r>399&&600>r?(s=new Error(e+" HTTP status: "+r),s.xhr=i,t&&t(s)):n(i.responseText),m.onXhrComplete&&m.onXhrComplete(i,e))},i.send(null)}:"rhino"===m.env||!m.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?o.get=function(e,n){var t,o,r="utf-8",s=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),r)),c="";try{for(t=new java.lang.StringBuffer,o=a.readLine(),o&&o.length()&&65279===o.charAt(0)&&(o=o.substring(1)),null!==o&&t.append(o);null!==(o=a.readLine());)t.append(i),t.append(o);c=String(t.toString())}finally{a.close()}n(c)}:("xpconnect"===m.env||!m.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(s=Components.classes,i=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),a="@mozilla.org/windows-registry-key;1"in s,o.get=function(e,n){var t,o,r,c={};a&&(e=e.replace(/\//g,"\\")),r=new FileUtils.File(e);try{t=s["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream),t.init(r,1,0,!1),o=s["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream),o.init(t,"utf-8",t.available(),i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),o.readString(t.available(),c),o.close(),t.close(),n(c.value)}catch(l){throw new Error((r&&r.path||"")+": "+l)}}),o}),define("text!pcs/conversation/templates/pcs-conversation.html",[],function(){return'<div id="pcs-conv-mainContainer" class="oj-row oj-panel">\n\n    <div id="pcs-conv-error-msg-container" style="display: none">\n        <span class="oj-component-icon oj-message-status-icon oj-message-error-icon" role="img"\n              id="pcs-conv-error-msg-icon" style="float: left ;margin-right:10px" ></span>\n        <pre id="pcs-conv-error-msg" class="pcs-conv-error-msg"></pre>\n    </div>\n\n    <div id="pcs-conv-loading-msg" style="display: none"></div>\n\n    <div class="pcs-conv-applink-container" style="margin:20px">\n\n        <div class="oj-sm-12 pcs-common-center-align" id="pcs-conv-loading">\n            <div class="pcs-common-center-align pcs-common-loading"/>\n        </div>\n\n        <iframe src="about:blank" frameborder="0"\n                scrolling="no" id="pcs-conv-applink" name="if1"\n                style="width:100%;  height:50px;" seamless="seamless">\n            &lt;/div&gt;&lt;/div&gt;&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;\n        </iframe>\n    </div>\n</div>\n'}),define("pcs/util/loggerUtil",["jquery"],function(e){"use strict";function n(){var e=this;return e.enableLog=!1,{log:function(n){e.enableLog&&console.log(n)},error:function(n){e.enableLog&&console.error(n)},debug:function(n){e.enableLog&&console.debug(n)},warn:function(n){e.enableLog&&console.warn(n)},enableLog:function(){e.enableLog=!0},disableLog:function(){e.enableLog=!1}}}var t=new n;return t}),define("pcs/util/pcsUtil",["module","knockout","ojs/ojcore","jquery","pcs/util/loggerUtil"],function(e,n,t,o,r){"use strict";function s(){var e,n={};if(-1===window.location.href.indexOf("?"))return n;for(var t=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),o=0;o<t.length;o++){e=t[o].split("=");var r=decodeURIComponent(e[0]),s=decodeURIComponent(e[1]),i=JSON.parse(s);n[r]=i}return n}var i={};o.CustomEvent=function(e){var n,t=e&&i[e];return t||(n=o.Callbacks(),t={publish:n.fire,subscribe:n.add,unsubscribe:n.remove},e&&(i[e]=t)),t},function(){function e(e,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var t=document.createEvent("CustomEvent");return t.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),t}return"function"==typeof window.CustomEvent?!1:(e.prototype=window.Event.prototype,void(window.CustomEvent=e))}();var a={addHandler:function(e,n,t){e.addEventListener?e.addEventListener(n,t,!1):e.attachEvent?e.attachEvent("on"+n,t):e["on"+n]=t},removeHandler:function(e,n,t){e.removeEventListener?e.removeEventListener(n,t,!1):e.detachEvent?e.detachEvent("on"+n,t):e["on"+n]=null}};String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{enumerable:!1,value:function(e,n){return n=n||0,this.substr(n,e.length)===e}}),String.prototype.endsWith||Object.defineProperty(String.prototype,"endsWith",{enumerable:!1,value:function(e,n){var t=this.toString();("number"!=typeof n||!isFinite(n)||Math.floor(n)!==n||n>t.length)&&(n=t.length),n-=e.length;var o=t.indexOf(e,n);return-1!==o&&o===n}});var c=function(e){"function"==typeof window.doADFProxyCall?window.doADFProxyCall(e):e&&window.location.assign(e)},l=function(e){function n(e){for(var n=e.split("\r\n"),t="text/plain",o="pcsFormUrl",r={contentType:t,fieldName:o},s=1;s<n.length;s++){var i=n[s],a=i.match(/^.*filename="([^"]*)"/);if(a)r.fieldName=a[1];else{var c="Content-Type:";i.indexOf(c)>-1&&(a=i.substring(i.indexOf(c)+c.length)),a&&(r.contentType=a.trim())}}return r}var t=e.getResponseHeader("Content-Type"),o=e.response,r=t.match(/boundary=(?:'([^']+)'|([^;]+))/i);if(!r)throw new Error("Bad content-type header, no multipart boundary");var s,i,a=r[1]||r[2],c="string"!=typeof o;if(a="\r\n--"+a,c){var l=new Uint8Array(o),p=32768,u=[];for(i=0;i<l.length;i+=p)u.push(String.fromCharCode.apply(null,l.subarray(i,i+p)));s=u.join("")}else s=o;s="\r\n"+s;var d=s.split(new RegExp(a)),v={};for(i=1;i<d.length-1;i++){var f="\r\n\r\n",g=d[i].substring(d[i].indexOf(f)+f.length),m=d[i].substring(0,d[i].indexOf(f)),h=n(m),b=!1;c&&!h.contentType.startsWith("text")&&(b=!0),v[h.fieldName]={data:g,contentType:h.contentType,fileName:h.fieldName}}return v},p=function(e){return o.ajax({type:"GET",url:e,dataType:"text",xhrFields:{withCredentials:!0}})};return{adfProxyCall:c,getAuthToken:p,multipartParse:l,getUrlParametersObject:s,eventHandler:a,initComponentForIFrame:function(e,n,t){if(o.isEmptyObject(o.pcsConnection)){if(o.pcsConnection={},!o.isEmptyObject(e)&&(e.testMode&&(o.pcsConnection.testMode=e.testMode),e.serverURL&&(o.pcsConnection.serverURL=e.serverURL),e.authInfo))return o.pcsConnection.authInfo=e.authInfo,void n();var s=this,i=function(){var e=s.getServerURL();r.log("Script loaded and ready, getting token"),s.getAuthToken(e+"/ic/process/workspace/auth/token").done(function(e){e&&e.startsWith("<html")?t.text("User cannot be authorized").show():(o.pcsConnection.authInfo="Bearer "+e,n())}).fail(function(e){t.text("User cannot be authorized").show()})},a=document.createElement("script");a.onload=i,a.onreadystatechange=function(){"complete"===this.readyState&&i()};var c=this.getServerURL();a.src=c+"/ic/process/workspace/faces/js/homePage.js",document.getElementsByTagName("head")[0].appendChild(a)}else n()},getCookie:function(e){var n;return(n=new RegExp("(?:^|; )"+encodeURIComponent(e)+"=([^;]*)").exec(document.cookie))?n[1]:null},storeLoggedInUser:function(e){o.pcsConnection.isAdmin=e.adminFlag,o.pcsConnection.isProcessOwner=!1,e.roles&&e.roles.items&&o.each(e.roles.items,function(e,n){return n.id.endsWith(".ProcessOwner")?(o.pcsConnection.isProcessOwner=!0,!1):void 0})},getServerURL:function(){if(o.pcsConnection&&o.pcsConnection.serverURL)return o.pcsConnection.serverURL.endsWith("/")?o.pcsConnection.serverURL.substring(0,o.pcsConnection.serverURL.length-1):o.pcsConnection.serverURL;var e=window.location.origin;return o.pcsConnection||(o.pcsConnection={}),o.pcsConnection.serverURL=e,e},getRestUri:function(){return"/bpm/api/4.0/"},getAuthInfo:function(){if(o.pcsConnection&&o.pcsConnection.authInfo){var e=o.pcsConnection.authInfo;return e.startsWith("Bearer ")||e.startsWith("Basic ")||(e="Bearer "+e),e}return""},getRestURL:function(){if(o.pcsConnection&&o.pcsConnection.restURL)return o.pcsConnection.restURL;var e=this.getServerURL()+this.getRestUri();return o.pcsConnection&&(o.pcsConnection.restURL=e),e},getDpServerURL:function(){return o.pcsConnection&&o.pcsConnection.dpServerURL?o.pcsConnection.dpServerURL.endsWith("/")?o.pcsConnection.dpServerURL.substring(0,o.pcsConnection.dpServerURL.length-1):o.pcsConnection.dpServerURL:this.getServerURL()},getDpRestURL:function(){var e=this.getDpServerURL()+"/bpm/api/4.0/";return e},beforeRequestCallback:function(e,n){n.adfProxyCall();var t=n.getAuthInfo();t&&e.setRequestHeader("Authorization",t),n.isTestMode()&&e.setRequestHeader("pcs_mode","dev");var o=requirejs.s.contexts._.config.locale;o&&e.setRequestHeader("Accept-Language",o)},isTestMode:function(){return o.pcsConnection&&o.pcsConnection.testMode?!0:!1},taskIconColor:function(e){var n=["#6e8598","#754b9a","#45ac62","#ed813d","#3f92d0","#E85E93","#81BB5F","#DFE146","#FABC39","#EB5B60","#1FB4AD","#00B6D1"];if(!e)return"grey";var t,o,r,s=0;for(t=0,r=e.length;r>t;t++)o=e.charCodeAt(t),s=(s<<5)-s+o,s|=0;var i=s%n.length;return n[Math.abs(i)]},taskInitials:function(e){if(!e)return"NA";e=e.replace(" ","");for(var n=e.charAt(0).toUpperCase(),t="",o=1;o<e.length;o++)if(e.charAt(o)===e.charAt(o).toUpperCase()){t=e.charAt(o);break}return n+t},getRandomInt:function(e,n){return Math.floor(Math.random()*(n-e+1))+e},unApplyBindings:function(e,t){e.find("*").each(function(){o(this).off(),o(this).unbind()}),e.off(),t?(n.cleanNode(e[0]),e.find("*").each(function(){o(this).remove()}),n.removeNode(e)):(n.cleanNode(e),e.find("*").each(function(){o(this).remove()}))},compositeVersion:function(e){var n;if(e)try{var t=e.split("!"),o=t[1].split("*");n=o[0]}catch(s){r.error("Error while getting version")}return n},applicationName:function(e){var n;if(e)try{var t=e.split("~"),o=t[1].split("*");n=o[0]}catch(s){r.error("Error while getting application Name")}return n}}}),define("pcs/conversation/services/conversationDataService",["jquery","pcs/util/pcsUtil"],function(e,n){"use strict";function t(){var t=this;t.paths={tasksConversations:"tasks/{taskId}/conversations",processConversations:"processes/{processId}/conversations",loggedInUser:"identities/loggedInUser"};var o=function(e){n.beforeRequestCallback(e,n)},r=function(n){return e.ajax({type:"GET",url:n,beforeSend:o,xhrFields:{withCredentials:!0},contentType:"application/json",dataType:"json"})};t.getConversations=function(e,o){var s;return"task"===e?s=n.getRestURL()+t.paths.tasksConversations.replace("{taskId}",o):"process"===e&&(s=n.getRestURL()+t.paths.processConversations.replace("{processId}",o)),r(s)},t.getAppLink=function(e){return r(e)},t.getLoggedInUser=function(){var e=n.getRestURL()+t.paths.loggedInUser;return r(e)}}return new t}),function(){function e(e,n,t,o,r,s){return n[e]||(e=e.replace(/^zh-(Hans|Hant)-([^-]+)$/,"zh-$2")),n[e]?(t.push(e),!0!==n[e]&&1!==n[e]||o.push(r+e+"/"+s),!0):!1}function n(e){var n=e.toLowerCase().split(/-|_/);e=[n[0]];var t,o=1;for(t=1;t<n.length;t++){var r=n[t],s=r.length;if(1==s)break;switch(o){case 1:if(o=2,4==s){e.push(r.charAt(0).toUpperCase()+r.slice(1));break}case 2:o=3,e.push(r.toUpperCase());break;default:e.push(r)}}return"zh"!=e[0]||1<e.length&&4==e[1].length||(n="Hans",o=1<e.length?e[1]:null,("TW"===o||"MO"===o||"HK"===o)&&(n="Hant"),e.splice(1,0,n)),e}function t(e,n){for(var o in n)n.hasOwnProperty(o)&&(null==e[o]?e[o]=n[o]:"object"==typeof n[o]&&"object"==typeof e[o]&&t(e[o],n[o]))}var o=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;define("ojL10n",["module"],function(r){var s=r.config?r.config():{};return{version:"2.0.1+",load:function(r,i,a,c){c=c||{},c.locale&&(s.locale=c.locale);var l,p,u,d,v,f,g,m,h,b=o.exec(r),y=b[1],C=b[5],w=[],L={},E="";for(b[5]?(y=b[1],r=y+C,l=b[4]):(C=b[4],l=s.locale,"undefined"!=typeof document?(l||(l=c.isBuild?"root":document.documentElement.lang)||(l=void 0===navigator?"root":navigator.language||navigator.userLanguage||"root"),s.locale=l):l="root"),p=n(l),d=s.noOverlay,v=s.defaultNoOverlayLocale,(b=s.merge)&&(f=b[y+C])&&(b=o.exec(f),g=b[1],m=b[4]),h=[],b=0;b<p.length;b++)u=p[b],E+=(E?"-":"")+u,h.push(E);c.isBuild?(w.push(r),f&&w.push(f),i(w,function(){a()})):("query"==s.includeLocale&&(r=i.toUrl(r+".js"),r+=(-1===r.indexOf("?")?"?":"&")+"loc="+l),c=[r],f&&c.push(f),i(c,function(n,o){var r=[],s=function(n,t,o){for(var s=d||!0===n.__noOverlay,i=v||n.__defaultNoOverlayLocale,a=!1,c=h.length-1;c>=0&&(!a||!s);c--)a=e(h[c],n,r,w,t,o);c=1===h.length&&"root"===h[0],s&&(c||!a)&&i&&e(i,n,r,w,t,o),c||e("root",n,r,w,t,o)};s(n,y,C);var c=r.length;o&&s(o,g,m),i(w,function(){var e=function(e,n,o,s,a){for(;o>n&&r[n];n++){var c=r[n],l=e[c];(!0===l||1===l)&&(l=i(s+c+"/"+a)),t(L,l)}};e(o,c,r.length,g,m),e(n,0,c,y,C),L._ojLocale_=p.join("-"),a(L)})}))}}})}(),define("pcs/resources/nls/pcsSnippetsResource",{root:!0,de:!0,es:!0,fr:!0,it:!0,ja:!0,ko:!0,pt:!0,"zh-Hans":!0,"zh-Hant":!0}),define("pcs/conversation/viewModel/conversationContainer",["knockout","pcs/conversation/services/conversationDataService","pcs/util/pcsUtil","ojL10n!pcs/resources/nls/pcsSnippetsResource"],function(e,n,t){"use strict";function o(e){function t(e,n){var t=JSON.parse(e),s=t.appLinkURL,i=s.substring(s.indexOf("/conversations"),s.length),a=t.accessToken,c=s.substring(0,s.indexOf("/conversations"))+"?hide=navMenu+sidebar+fullView+search+uploadAndCopy+documents+help";$("#pcs-conv-applink",o.rootElement)[0].src="about:blank",$("#pcs-conv-applink",o.rootElement).hide();var l=$.Deferred();if(l.done(function(){$(window).one("message",function(e){var n=e;"navigate-ack"===n.originalEvent.data.message?(r.log("Event message received::"+n.originalEvent.data.message),$("#pcs-conv-loading",o.rootElement).hide(),$("#pcs-conv-loading-msg",o.rootElement).hide(),$("#pcs-conv-applink",o.rootElement).css("height","500px").show()):r.log("OOPS - stray postMessage caused listener to stop; retry last action")});var e={message:"navigate",path:i,accessToken:a,highlight:n};r.log("Posting message: "+e),$("#pcs-conv-applink",o.rootElement)[0].contentWindow.postMessage(e,"*")}),$("#pcs-conv-applink",o.rootElement)[0].src&&"about:blank"!==$("#pcs-conv-applink",o.rootElement)[0].src)l.resolve();else{$(window).one("message",function(e){var n=e;"listening"===n.originalEvent.data.status?(r.log("Event Message:"+n.originalEvent.data.status),l.resolve()):r.log("OOPS - stray postMessage caused listener to stop; reload")}),$("#pcs-conv-applink",o.rootElement)[0].src=c;var p=o.bundle.pcs.conversation.docs_wait;$("#pcs-conv-loading-msg",o.rootElement).text(p).show()}}var o=this,r=require("pcs/util/loggerUtil");o.bundle=require("ojL10n!pcs/resources/nls/pcsSnippetsResource"),o.data=e.data,o.rootElement=o.data.rootElement,o.ajaxErrorHandler=function(e,n){var t;e&&0===e.status&&(t=o.bundle.pcs.common.server_not_reachable),!e||500!==e.status&&401!==e.status&&404!==e.status||(t=o.bundle.pcs.common.internal_server_err),(void 0===t||""===t)&&(t=n),$("#pcs-conv-error-msg",o.rootElement).text(t),$("#pcs-conv-error-msg-container",o.rootElement).show(),$("#pcs-conv-loading",o.rootElement).hide()},o.initConversation=function(){if("task"===o.data.mode)n.getConversations(o.data.mode,o.data.id).done(function(e){if(e&&e.conversationInstanceList&&e.conversationInstanceList.length>0){var r=e.conversationInstanceList[0].links[0].href;n.getAppLink(r).done(function(e){if(e&&e.appLink){var r=e.appLink;n.getLoggedInUser().done(function(e){if(e&&e.id)t(r,e.id);else{var n=o.bundle.pcs.conversation.user_fetch_error;o.ajaxErrorHandler(void 0,n)}o.rootElement.trigger("conversations:loaded")}).fail(function(e,n,t){var r=o.bundle.pcs.conversation.user_fetch_error;o.ajaxErrorHandler(e,r),o.rootElement.trigger("conversations:loaded")})}else{var s=o.bundle.pcs.conversation.conv_connection_error;o.ajaxErrorHandler(void 0,s),o.rootElement.trigger("conversations:loaded")}}).fail(function(e,n,t){var r=o.bundle.pcs.conversation.conv_connection_error;o.ajaxErrorHandler(e,r),o.rootElement.trigger("conversations:loaded")})}else{var s=o.bundle.pcs.conversation.no_conversation;o.ajaxErrorHandler(void 0,s),o.rootElement.trigger("conversations:loaded")}}).fail(function(e,n,t){var r=o.bundle.pcs.conversation.conv_load_error;o.ajaxErrorHandler(e,r),o.rootElement.trigger("conversations:loaded")});else if("process"===o.data.mode);else{var e=o.bundle.pcs.conversation.conv_mode_error;o.ajaxErrorHandler(void 0,e)}},o.clearOSNFrame=function(e){$("#pcs-conv-applink",o.rootElement)[0].src="about:blank",r.log("Conversation iframe src set to aboutb:blank")},o.dispose=function(){r.log("dispose in conversation Containor"),o.clearOSNFrame()},o.initConversation()}return o}),define("text!pcs/conversation/templates/pcs-conversation-error.html",[],function(){return'<div class="oj-message oj-message-error">\n    <span class="oj-component-icon oj-message-status-icon oj-message-error-icon"\n          role="img">\n    </span>\n    <span class="oj-message-content">\n        <div class="oj-message-summary">\n            Required parameters are missing\n        </div>\n        <div class="oj-message-detail">\n            <span>This component requires these values -</span>\n            <pre>\n    *id : \'\'\n    </pre>\n        </div>\n    </span>\n</div>\n'}),define("pcs/pcs.conversation",["ojs/ojcore","knockout","jquery","!text!pcs/conversation/templates/pcs-conversation.html","pcs/conversation/viewModel/conversationContainer","!text!pcs/conversation/templates/pcs-conversation-error.html","ojL10n!pcs/resources/nls/pcsSnippetsResource","pcs/util/loggerUtil","jqueryui-amd/widget"],function(e,n,t,o,r,s,i,a){"use strict";t.widget("pcs.conversation",{options:{mode:"task",id:""},_isValid:function(){return void 0===this.options.id||""===this.options.id||void 0===this.options.mode||""===this.options.mode?!1:"task"===this.options.mode.toLowerCase()||"process"===this.options.mode.toLowerCase()?!0:!1},_create:function(){var e=this;if(void 0===t.pcsConnection)return void this.element.html("<div style='color:red'>"+i.pcs.common.pcs_connection+" </div>");if(!this._isValid())return void this.element.html(s);var a=this.options;a.rootElement=e.element;var c={data:a};this.element.html(o);var l=new r(c);this.model=l,n.applyBindings(l,this.element[0])},destroy:function(){t.Widget.prototype.destroy.call(this)},_destroy:function(){a.log("Destroying conversation"),this.model&&this.model.dispose()},_setOption:function(e,n){this.options[e]=n,t.Widget.prototype._setOption.apply(this,arguments)}})});
//# sourceMappingURL=pcs.conversation.js.map