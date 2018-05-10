/*
 RequireJS i18n 2.0.2 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/requirejs/i18n for details
*/
(function(){function s(a,b,d,h,g,e){b[a]||(a=a.replace(/^zh-(Hans|Hant)-([^-]+)$/,"zh-$2"));return b[a]?(d.push(a),!0!==b[a]&&1!==b[a]||h.push(g+a+"/"+e),!0):!1}function B(a){var b=a.toLowerCase().split(/-|_/);a=[b[0]];var d=1,h;for(h=1;h<b.length;h++){var g=b[h],e=g.length;if(1==e)break;switch(d){case 1:if(d=2,4==e){a.push(g.charAt(0).toUpperCase()+g.slice(1));break}case 2:d=3;a.push(g.toUpperCase());break;default:a.push(g)}}if(!("zh"!=a[0]||1<a.length&&4==a[1].length)){b="Hans";d=1<a.length?a[1]:
null;if("TW"===d||"MO"===d||"HK"===d)b="Hant";a.splice(1,0,b)}return a}function w(a,b){for(var d in b)b.hasOwnProperty(d)&&(null==a[d]?a[d]=b[d]:"object"===typeof b[d]&&"object"===typeof a[d]&&w(a[d],b[d]))}var x=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;define('ojL10n',["module"],function(a){var b=a.config?a.config():{};return{version:"2.0.1+",load:function(a,h,g,e){e=e||{};e.locale&&(b.locale=e.locale);var c=x.exec(a),n=c[1],f,p=c[5],q,k=[],t={},y,r="",z,A,l,u,v,m;c[5]?(n=c[1],a=n+p,f=c[4]):(p=c[4],f=b.locale,
"undefined"!==typeof document?(f||(f=e.isBuild?"root":document.documentElement.lang)||(f=void 0===navigator?"root":navigator.language||navigator.userLanguage||"root"),b.locale=f):f="root");q=B(f);z=b.noOverlay;A=b.defaultNoOverlayLocale;if(c=b.merge)if(l=c[n+p])c=x.exec(l),u=c[1],v=c[4];m=[];for(c=0;c<q.length;c++)y=q[c],r+=(r?"-":"")+y,m.push(r);e.isBuild?(k.push(a),l&&k.push(l),h(k,function(){g()})):("query"==b.includeLocale&&(a=h.toUrl(a+".js"),a+=(-1===a.indexOf("?")?"?":"&")+"loc="+f),e=[a],
l&&e.push(l),h(e,function(a,b){var d=[],c=function(a,b,c){for(var e=z||!0===a.__noOverlay,h=A||a.__defaultNoOverlayLocale,g=!1,f=m.length-1;0<=f&&(!g||!e);f--)g=s(m[f],a,d,k,b,c);f=1===m.length&&"root"===m[0];e&&(f||!g)&&h&&s(h,a,d,k,b,c);f||s("root",a,d,k,b,c)};c(a,n,p);var e=d.length;b&&c(b,u,v);h(k,function(){var c=function(a,b,c,e,f){for(;b<c&&d[b];b++){var g=d[b],k=a[g];if(!0===k||1===k)k=h(e+g+"/"+f);w(t,k)}};c(b,e,d.length,u,v);c(a,0,e,n,p);t._ojLocale_=q.join("-");g(t)})}))}}})})();

define('pcs/resources/nls/pcsSnippetsResource',{root:!0,de:!0,es:!0,fr:!0,it:!0,ja:!0,ko:!0,pt:!0,"zh-Hans":!0,"zh-Hant":!0});

/**
 * @license text 2.0.15 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
  define, window, process, Packages,
  java, location, Components, FileUtils */

define('text',['module'], function (module) {
    'use strict';

    var text, fs, Cc, Ci, xpcIsWindows,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = {},
        masterConfig = (module.config && module.config()) || {};

    function useDefault(value, defaultValue) {
        return value === undefined || value === '' ? defaultValue : value;
    }

    //Allow for default ports for http and https.
    function isSamePort(protocol1, port1, protocol2, port2) {
        if (port1 === port2) {
            return true;
        } else if (protocol1 === protocol2) {
            if (protocol1 === 'http') {
                return useDefault(port1, '80') === useDefault(port2, '80');
            } else if (protocol1 === 'https') {
                return useDefault(port1, '443') === useDefault(port2, '443');
            }
        }
        return false;
    }

    text = {
        version: '2.0.15',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var modName, ext, temp,
                strip = false,
                index = name.lastIndexOf("."),
                isRelative = name.indexOf('./') === 0 ||
                             name.indexOf('../') === 0;

            if (index !== -1 && (!isRelative || index > 1)) {
                modName = name.substring(0, index);
                ext = name.substring(index + 1);
            } else {
                modName = name;
            }

            temp = ext || modName;
            index = temp.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = temp.substring(index + 1) === "strip";
                temp = temp.substring(0, index);
                if (ext) {
                    ext = temp;
                } else {
                    modName = temp;
                }
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || isSamePort(uProtocol, uPort, protocol, port));
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config && config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config && config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName +
                    (parsed.ext ? '.' + parsed.ext : ''),
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            // Do not load if it is an empty: url
            if (url.indexOf('empty:') === 0) {
                onLoad();
                return;
            }

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                extPart = parsed.ext ? '.' + parsed.ext : '',
                nonStripName = parsed.moduleName + extPart,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node &&
            !process.versions['node-webkit'] &&
            !process.versions['atom-shell'])) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback, errback) {
            try {
                var file = fs.readFileSync(url, 'utf8');
                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
                if (file[0] === '\uFEFF') {
                    file = file.substring(1);
                }
                callback(file);
            } catch (e) {
                if (errback) {
                    errback(e);
                }
            }
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback, headers) {
            var xhr = text.createXhr(), header;
            xhr.open('GET', url, true);

            //Allow plugins direct access to xhr headers
            if (headers) {
                for (header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
                    }
                }
            }

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status || 0;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        if (errback) {
                            errback(err);
                        }
                    } else {
                        callback(xhr.responseText);
                    }

                    if (masterConfig.onXhrComplete) {
                        masterConfig.onXhrComplete(xhr, url);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                if (line !== null) {
                    stringBuffer.append(line);
                }

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
            typeof Components !== 'undefined' && Components.classes &&
            Components.interfaces)) {
        //Avert your gaze!
        Cc = Components.classes;
        Ci = Components.interfaces;
        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
        xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

        text.get = function (url, callback) {
            var inStream, convertStream, fileObj,
                readData = {};

            if (xpcIsWindows) {
                url = url.replace(/\//g, '\\');
            }

            fileObj = new FileUtils.File(url);

            //XPCOM, you so crazy
            try {
                inStream = Cc['@mozilla.org/network/file-input-stream;1']
                           .createInstance(Ci.nsIFileInputStream);
                inStream.init(fileObj, 1, 0, false);

                convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
                                .createInstance(Ci.nsIConverterInputStream);
                convertStream.init(inStream, "utf-8", inStream.available(),
                Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

                convertStream.readString(inStream.available(), readData);
                convertStream.close();
                inStream.close();
                callback(readData.value);
            } catch (e) {
                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
            }
        };
    }
    return text;
});


define('text!pcs/identityBrowser/view/idBrowser.html',[],function () { return '<!-- parent VM which consumes this should have USer Defined idbConfig object with configuration details -->\n\n<select  data-bind="attr: {id: idbID, placeholder : placeholder}, ojComponent: { component: \'ojIdentity\', value: value,\n\t\toptions: $.proxy(getIdentities, $data),\n\t\tmultiple: multiple, selectAll: true, selectLabel: selectLabel,\n\t\tdefaultScope: scope}">\n</select>\n';});

/**
 * Created by rojv on 9/23/2016.
 */

define('pcs/identityBrowser/viewModel/Identity',[], function() {
    'use strict';

    function Identity(identity) {
        //Identity Rest API: 1.0, 2.0, 3.0
        this.id = identity.id || identity.identityName;
        this.type = identity.type || identity.identityType;
        this.title = identity.title;
        this.firstName = identity.firstName || identity.userFirstName;
        this.lastName = identity.lastName || identity.userLastName;
        this.email = identity.email;
        this.mobile = identity.mobile || identity.userMobile;
    }

    Identity.prototype = {
        getId: function() {
            return this.id;
        },
        getType: function() {
            return this.type;
        },
        getTitle: function() {
            return this.title;
        },
        getFirstName: function() {
            return this.title;
        },
        getLastName: function() {
            return this.title;
        },
        getFullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        getEmail: function() {
            return this.email;
        },
        getMobile: function() {
            return this.email;
        }
    };

    return Identity;
});

/**
 * Created by rojv on 9/23/2016.
 */
define('pcs/identityBrowser/viewModel/Identities',[], function() {
    'use strict';

    function Identities() {
        this._identities = [];
        this._selectedIdentities = [];
    }

    Identities.prototype = {
        setIdentities: function(identities) {
            this._identities = identities;
        },

        getIdentities: function() {
            return this._identities;
        },

        setSelectedIdentities: function(identities) {
            this._selectedIdentities = identities;
        },

        getSelectedIdentities: function() {
            return this._selectedIdentities;
        }
    };

    return Identities;

});

/**
 * Created by nisabhar on 4/9/18.
 */

define('pcs/util/loggerUtil',['jquery'],function($){
	'use strict';

	function PCSLogger() {
		var self= this;
		self.enableLog = false;

		return {
			log: function(value) {
				if (self.enableLog) {
					console.log(value);
				}
			},
			error : function (value) {
				if (self.enableLog) {
					console.error(value);
				}
			},
			debug : function (value) {
				if (self.enableLog) {
					console.debug(value);
				}
			},
			warn : function (value) {
				if (self.enableLog) {
					console.warn(value);
				}
			},
			enableLog :  function (){
				self.enableLog = true;
			},
			disableLog : function(){
				self.enableLog = false;
			}
		}
	}

	var instance  = new PCSLogger();
	//console.log('####Intitating logger Util');

	return instance;

});


/**
 * Created by nisabhar on 3/11/2016.
 */

define('pcs/util/pcsUtil',['module', 'knockout', 'ojs/ojcore', 'jquery','pcs/util/loggerUtil'], function(module, ko, oj, $,loggerUtil) {
    'use strict';

    var eventList = {};

    //A Pub/Sub system based on JQuery callbacks
    $.CustomEvent = function(eventId) {
        var callbacks;
        var pubsub = eventId && eventList[eventId];

        if (!pubsub) {
            callbacks = $.Callbacks();
            pubsub = {
                publish: callbacks.fire,
                subscribe: callbacks.add,
                unsubscribe: callbacks.remove
            };
            if (eventId) {
                eventList[eventId] = pubsub;
            }
        }
        return pubsub;
    };

    //IE polyfill for the CustomEvent constructor
	(function () {
		if ( typeof window.CustomEvent === "function" ) return false; //If not IE

		function CustomEvent ( event, params ) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent( 'CustomEvent' );
			evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
			return evt;
		}

		CustomEvent.prototype = window.Event.prototype;

		window.CustomEvent = CustomEvent;
	})();

    var _eventHandler = {
        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        },
        removeHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        }
    };

    if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', {
            enumerable: false,
            value: function(searchString, position) {
                position = position || 0;
                return this.substr(position, searchString.length) === searchString;
            }
        });
    }

    if (!String.prototype.endsWith) {
        Object.defineProperty(String.prototype, 'endsWith', {
            enumerable: false,
            value: function(searchString, position) {
                var subjectString = this.toString();
                if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
                    position = subjectString.length;
                }
                position -= searchString.length;
                var lastIndex = subjectString.indexOf(searchString, position);
                return lastIndex !== -1 && lastIndex === position;
            }
        });
    }

    //TODO nisabhar : Remove this both commented code, We can not assume where snippets is being consumed
    //util for centering any element in the center of the page
    //stackoverflow - http://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen
    //$.fn.center = function () {
    //    this.css('position','absolute');
    //    this.css('top', Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
    //            $(window).scrollTop()) + 'px');
    //    this.css('left', Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
    //            $(window).scrollLeft()) + 'px');
    //    return this;
    //};
    //
    ////show loading animation for any ajax event
    //$(document).bind('ajaxStart', function(){
    //    $('body').append('<img id='pcs-loading-anim' src='css/pcs/images/spin.gif'/>');
    //    $('#pcs-loading-anim').center();
    //}).bind('ajaxStop', function(){
    //    $('#pcs-loading-anim').remove();
    //});

    /**
     * This method is to do dummy ADF call
     * @param url
     * @private
     */
    var _adfProxyCall = function(url) {
        // Let the container handle if container is willing to
        if (typeof window.doADFProxyCall === 'function') {
            window.doADFProxyCall(url);
        }
        // else handle ourself
        else {
            if (url) {
                window.location.assign(url);
            }
        }
    };

    /**
     * Method to parse multi part data used by startform plugin
     * @param jqXHR
     * @returns {{}}
     * @private
     */
    var _multipartParse = function(jqXHR) {
        var contentType = jqXHR.getResponseHeader('Content-Type');
        var body = jqXHR.response;

        // Examples for content types:
        //      multipart/form-data; boundary='----7dd322351017c'; ...
        //      multipart/form-data; boundary=----7dd322351017c; ...
        var m = contentType.match(/boundary=(?:'([^']+)'|([^;]+))/i);

        if (!m) {
            throw new Error('Bad content-type header, no multipart boundary');
        }

        var boundary = m[1] || m[2];
        var isRaw = typeof(body) !== 'string';
        var s, i;

        function Header_parse(headerString) {

            var headers = headerString.split('\r\n');

            var contentType = 'text/plain';
            var fieldName = 'pcsFormUrl';

            //Result object
            var headerFields = {
                contentType: contentType,
                fieldName: fieldName
            };

            for (var j = 1; j < headers.length; j++) {
                var header = headers[j];
                /*jshint validthis:true */
                var matchResult = header.match(/^.*filename="([^"]*)"/);
                if (matchResult) {
                    headerFields.fieldName = matchResult[1];
                } else {
                    var searchStr = 'Content-Type:';
                    if (header.indexOf(searchStr) > -1) {
                        matchResult = header.substring(header.indexOf(searchStr) + searchStr.length);
                    }
                    if (matchResult) {
                        headerFields.contentType = matchResult.trim();
                    }
                }
            }
            return headerFields;
        }

        // \r\n is part of the boundary.
        boundary = '\r\n--' + boundary;

        if (isRaw) {
            var view = new Uint8Array(body);
            //s = String.fromCharCode.apply(null, view);

            var CHUNK_SZ = 0x8000;
            var c = [];
            for (i = 0; i < view.length; i += CHUNK_SZ) {
                c.push(String.fromCharCode.apply(null, view.subarray(i, i + CHUNK_SZ)));
            }
            s = c.join('');
        } else {
            s = body;
        }

        // Prepend what has been stripped by the body parsing mechanism.
        s = '\r\n' + s;

        var parts = s.split(new RegExp(boundary)),
            partsByName = {};

        // First part is a preamble, last part is closing '--'
        for (i = 1; i < parts.length - 1; i++) {
            // var subparts = parts[i].split('\r\n\r\n');
            // var headers = subparts[0].split('\r\n');
            // partsByName[fieldName] = isRaw?rawStringToBuffer(subparts[1]):subparts[1];

            var searchStr = '\r\n\r\n';
            var data = parts[i].substring(parts[i].indexOf(searchStr) + searchStr.length); // we need to igonore the two enters in string thats why +3
            var header = parts[i].substring(0, parts[i].indexOf(searchStr));

            var headerResult = Header_parse(header);

            var convertDataToBuffer = false;

            if (isRaw && !headerResult.contentType.startsWith('text')) {
                convertDataToBuffer = true;
            }

            partsByName[headerResult.fieldName] = {
                data: data,
                contentType: headerResult.contentType,
                fileName: headerResult.fieldName
            };
        }
        return partsByName;
    };

    //Usage =hideStartform=false&filter={'processName':'AttachApplicationProcess'}&hideSave=true&hideDiscard=true&submitLabel='My Submit'
    // Read a page's GET URL variables and return them as an associative array.
    function _getUrlParametersObject() {
        var vars = {},
            hash;

        //no query params
        if (window.location.href.indexOf('?') === -1) {
            return vars;
        }
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            //vars[hash[0]] = hash[1];
            var key = decodeURIComponent(hash[0]);
            var val = decodeURIComponent(hash[1]);
            var obj = JSON.parse(val);
            vars[key] = obj;
        }

        return vars;
    }

    var _getAuthToken = function(url) {
        return $.ajax({
            type: 'GET',
            url: url,
            dataType: 'text',
            xhrFields: {
                withCredentials: true
            }
        });
    };

    return {
        adfProxyCall: _adfProxyCall,
        getAuthToken: _getAuthToken,
        multipartParse: _multipartParse,
        getUrlParametersObject: _getUrlParametersObject,
        eventHandler: _eventHandler,
        initComponentForIFrame: function(options, loadComponent, element) {
            if (!$.isEmptyObject($.pcsConnection)) {
                loadComponent();
            } else {
                $.pcsConnection = {};
                //$.pcsConnection.serverURL = "http://den02biu.us.oracle.com:7001";

				// See if test mode is passed
				if(!$.isEmptyObject(options)){
					if(options.testMode) {
						$.pcsConnection.testMode = options.testMode;
					}
					if(options.serverURL){
						$.pcsConnection.serverURL =options.serverURL;
					}
					if(options.authInfo){
						$.pcsConnection.authInfo =options.authInfo;
						loadComponent();
						return;
					}
				}

                var util = this;
                var scriptCallback = function() {
                    var serverURL = util.getServerURL();
                    loggerUtil.log('Script loaded and ready, getting token');
                    util.getAuthToken(serverURL + '/ic/process/workspace/auth/token')
                        .done(function(data) {
                            if (data && data.startsWith('<html')) {
                                element.text('User cannot be authorized').show();
                            } else {
                                $.pcsConnection.authInfo = 'Bearer ' + data;
                                loadComponent();
                            }
                        })
                        .fail(function(jqXHR) {
                            element.text('User cannot be authorized').show();
                        });
                };

                //Load a script tag on PCS Server
                var script = document.createElement('script');
                //real browsers
                script.onload = scriptCallback;
                //Internet explorer
                script.onreadystatechange = function() {
                    if (this.readyState === 'complete') {
                        scriptCallback();
                    }
                };

                var serverURL = this.getServerURL();
                script.src = serverURL + '/ic/process/workspace/faces/js/homePage.js';
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        },
        getCookie: function(key) {
            var result;
            return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
        },
		storeLoggedInUser : function (data) {

			$.pcsConnection['isAdmin'] = data.adminFlag;
			$.pcsConnection['isProcessOwner'] = false;

			if(data.roles && data.roles.items){
				$.each(data.roles.items, function(index, role) {
					if(role.id.endsWith('.ProcessOwner')){
						$.pcsConnection['isProcessOwner'] = true;
						return false;
					}
				});
			}
		},
        getServerURL: function() {
            if ($.pcsConnection && $.pcsConnection.serverURL) {
                return $.pcsConnection.serverURL.endsWith('/') ? $.pcsConnection.serverURL.substring(0, $.pcsConnection.serverURL.length - 1) : $.pcsConnection.serverURL;
            } else {
            	var url = window.location.origin;
				if (!$.pcsConnection) {
					$.pcsConnection= {};
				}
				$.pcsConnection.serverURL =url;
                return url;
            }
        },
        getRestUri: function() {
            //if($.pcsConnection.restURI){
            //    return $.pcsConnection.restURI  ;
            //}else{
            return '/bpm/api/4.0/';
            //}
        },
        getAuthInfo: function() {
            if ($.pcsConnection && $.pcsConnection.authInfo) {
                var authInfo = $.pcsConnection.authInfo;
                if (!authInfo.startsWith('Bearer ') && !authInfo.startsWith('Basic ')) {
                    authInfo = 'Bearer ' + authInfo;
                }
                return authInfo;
            }
            return '';
        },
        getRestURL: function() {
            if ($.pcsConnection && $.pcsConnection.restURL) {
                return $.pcsConnection.restURL;
            } else {
                var url = this.getServerURL() + this.getRestUri();
                if ($.pcsConnection) {
                    $.pcsConnection.restURL = url;
                }
                return url;
            }
        },
        getDpServerURL: function() {
            if ($.pcsConnection && $.pcsConnection.dpServerURL) {
                return $.pcsConnection.dpServerURL.endsWith('/') ? $.pcsConnection.dpServerURL.substring(0, $.pcsConnection.dpServerURL.length - 1) : $.pcsConnection.dpServerURL;
            } else {
				return this.getServerURL();
            }
        },
        getDpRestURL: function() {
            var url = this.getDpServerURL() + '/bpm/api/4.0/';
            return url;
        },
		beforeRequestCallback: function(xhr,util){
			//Dummy ADF call
			util.adfProxyCall();

			xhr.setRequestHeader('Authorization', util.getAuthInfo());
			if (util.isTestMode()) {
				xhr.setRequestHeader('pcs_mode', 'dev');
			}
			var locale = requirejs.s.contexts._.config.locale;
			if(locale){
				xhr.setRequestHeader('Accept-Language', locale);
			}
		},
        isTestMode: function() {
            if ($.pcsConnection && $.pcsConnection.testMode) {
                return true;
            } else {
                return false;
            }
        },
        taskIconColor: function(str) {
			var colorCodes = [ '#6e8598', '#754b9a', '#45ac62', '#ed813d', '#3f92d0', '#E85E93',
				'#81BB5F', '#DFE146', '#FABC39', '#EB5B60', '#1FB4AD', '#00B6D1'];

            if (!str) {
                return 'grey';
            }
            var hash = 0,
                i, chr, len;

            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }

            // var code = hash;
            // var B = code & 0xFF;
            //
            // code >>= 8;
            // var G = code & 0xFF;
            //
            // code >>= 8;
            // var R = code & 0xFF;
            //
            // return 'rgb(' + R + ',' + G + ',' + B + ')';

            var index = hash % (colorCodes.length) ;

            return colorCodes[Math.abs(index)];
        },
        taskInitials: function(taskName) {
            if (!taskName) {
                return 'NA';
            }

            taskName = taskName.replace(' ', '');
            var firstCharUpper = taskName.charAt(0).toUpperCase();
            var secondCharUpper = '';
            for (var i = 1; i < taskName.length; i++) {
                if (taskName.charAt(i) === taskName.charAt(i).toUpperCase()) {
                    secondCharUpper = taskName.charAt(i);
                    break;

                }
            }

            return firstCharUpper + secondCharUpper;

        },
		getRandomInt : function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
        },
		unApplyBindings : function($node, remove) {
			// unbind events
			$node.find('*').each(function() {
				$(this).off();
				$(this).unbind();
			});

			$node.off();

			// Remove KO subscriptions and references
			if (remove) {
				ko.cleanNode($node[0]);
				$node.find('*').each(function() {
					$(this).remove();
				});
				ko.removeNode($node);
			} else {
				ko.cleanNode($node);
				$node.find('*').each(function() {
					$(this).remove();
				});
			}
		},
        compositeVersion: function (formMetadataURL) {
            //'webforms/oracleinternalpcs~Mortgage_Underwriting!1*soa_1b4254aa-b094-4cc2-9ea7-29fd58919997~6f5740fb-a6d3-4f82-a022-49854f89accb~c3f48544-3ea0-4238-9d8c-a3e8cedec34c',
            var version;
            if (formMetadataURL){
                try{
                    var splitOnEsclamation = formMetadataURL.split('!');
                    var splitOnStar = splitOnEsclamation[1].split('*');
                    version = splitOnStar[0];
                }
                catch (err){
                    loggerUtil.error('Error while getting version');
                }

            }
            return version;
        },
		applicationName: function (formMetadataURL) {
			//'webforms/oracleinternalpcs~Mortgage_Underwriting!1*soa_1b4254aa-b094-4cc2-9ea7-29fd58919997~6f5740fb-a6d3-4f82-a022-49854f89accb~c3f48544-3ea0-4238-9d8c-a3e8cedec34c',
			var applicationName;
			if (formMetadataURL){
				try{
					var splitOnTilde = formMetadataURL.split('~');
					var splitOnEscalamation = splitOnTilde[1].split('*');
					applicationName = splitOnEscalamation[0];
				}
				catch (err){
					loggerUtil.error('Error while getting application Name');
				}

			}
			return applicationName;
		}
    };
});

define('pcs/data-services/DataServices',['require','jquery','pcs/util/pcsUtil'],function(require) {
    'use strict';
    var $ = require('jquery'),
        pcsUtil = require('pcs/util/pcsUtil');
    return (function() {
        var instance,

            getBaseURL = function(version) {
                if (version && version === 'dp') {
                    return pcsUtil.getDpServerURL() + '/bpm/api/4.0';
                }
                if (version) {
                    return pcsUtil.getServerURL() + '/bpm/api/' + version;
                }
                return pcsUtil.getServerURL() + '/bpm/api/4.0';
            },

            //callback to set authorization request header for every call
            beforeRequestCallback = function(xhr) {
				pcsUtil.beforeRequestCallback(xhr,pcsUtil);
            },

            serializeData = function(contentType, payload) {
                var data = JSON.stringify(payload);
                if (!contentType && contentType.startsWith('multipart')) {
                    data = new Uint8Array(payload.length);
                    for (var i = 0; i < payload.length; i++) {
                        data[i] = payload.charCodeAt(i);
                    }
                }
                return data;
            };

        function init() {
            return {
                get: function(url, options, version) {
                    if (url.indexOf(getBaseURL(version)) === -1) {
                        url = getBaseURL(version) + url;
                    }
                    //add URL query parameters for GET
                    if (options && options.queryParams) {
                    	var queryParams = $.param(options.queryParams, true) ;
                        url += '?' + queryParams;
                    }
                    //alert(url);
					//Dummy ADF call
					pcsUtil.adfProxyCall();

                    return $.ajax({
                        type: 'GET',
                        url: url,
                        beforeSend: beforeRequestCallback,
                        xhrFields: {
                            withCredentials: true
                        },
                        contentType: (options && options.contentType) ? options.contentType : 'application/json',
                        dataType: (options && options.dataType) ? options.dataType : 'json'
                    });
                },

                post: function(url, options, version) {
                    if (url.indexOf(getBaseURL(version)) === -1) {
                        url = getBaseURL(version) + url;
                    }
					if (!options.contentType) {
                        options.contentType = 'application/json';
                    }
                    var payload = serializeData(options.contentType, options.payload);

					//Dummy ADF call
					pcsUtil.adfProxyCall();

                    return $.ajax({
                        type: 'POST',
                        url: url,
                        cache: false,
                        processData: false,
                        data: payload,
                        beforeSend: beforeRequestCallback,
                        xhrFields: {
                            withCredentials: true
                        },
						contentType: (options && options.contentType) ? options.contentType : 'application/json',
                        dataType: (options && options.dataType) ? options.dataType : 'json'
                    });
                },

                put: function(url, options, version) {
                    if (url.indexOf(getBaseURL(version)) === -1) {
                        url = getBaseURL(version) + url;
                    }
                    if (!options.contentType) {
                        options.contentType = 'application/json';
                    }

                    var payload = serializeData(options.contentType, options.payload);

					//Dummy ADF call
					pcsUtil.adfProxyCall();

                    return $.ajax({
                        type: 'PUT',
                        url: url,
                        cache: false,
                        processData: false,
                        data: payload,
                        beforeSend: beforeRequestCallback,
                        xhrFields: {
                            withCredentials: true
                        },
						contentType: (options && options.contentType) ? options.contentType : 'application/json',
                        dataType: (options && options.dataType) ? options.dataType : 'json'
                    });
                },

                delete: function(url, options, version) {
                    if (url.indexOf(getBaseURL(version)) === -1) {
                        url = getBaseURL(version) + url;
                    }

					//Dummy ADF call
					pcsUtil.adfProxyCall();

                    return $.ajax({
                        type: 'DELETE',
                        url: url + '/' + options.payload,
                        beforeSend: beforeRequestCallback,
                        xhrFields: {
                            withCredentials: true
                        },
                        contentType: (options && options.contentType) ? options.contentType : 'application/json',
                        cache: false,
                        processData: false
                    });
                }
            };
        }

        return {
            // Get the Singleton instance if one exists
            // or create one if it doesn't
            getInstance: function(connection) {
                if (!instance) {
                    instance = init();
                }
                if (connection) {
                    instance.connection = connection;
                }
                return instance;
            },

            setConnection: function(connection) {
                if (!instance) {
                    instance = init();
                }
                instance.connection = connection;
            }
        };

    })();
});

/**
 * Created by rojv on 9/23/2016.
 */

define('pcs/identityBrowser/viewModel/IdentityService',['pcs/identityBrowser/viewModel/Identity', 'pcs/identityBrowser/viewModel/Identities','pcs/data-services/DataServices'],
    function(Identity, Identities, DataServices) {
        'use strict';

        var resourceUrlConfig = {
            identities: '/identities'
        };
        var dataServices = DataServices.getInstance();

        function IdentityService() {
            this._identities = new Identities();
        }

        IdentityService.prototype = {
            getIdentity: function(index) {
                return this._identities.getIdentities[index];
            },

            setIdentities: function(identities) {
                this._identities.setIdentities(this.parseIdentity(identities));
            },

            getIdentities: function() {
                return [].concat(this._identities.getIdentities());
            },

            setSelectedIdentities: function(identities) {
                this._identities.setSelectedIdentities(this.parseIdentity(identities));
            },

            getSelectedIdentities: function() {
                return this._identities.getSelectedIdentities();
            },

            parseIdentity: function(identities) {
                var _identities = [];
                if (identities && Array.isArray(identities)) {
                    for (var i = 0, len = identities.length; i < len; i++) {
                        _identities.push(new Identity(identities[i]));
                    }
                }

                return _identities;
            },


            restCall: function(params) {
                var _this = this;
                return new Promise(function(fulfill, reject) {
                    var url = resourceUrlConfig.identities;
                    var options = {
                        contentType: 'application/json; charset=utf-8',
                        queryParams: params,
						traditional:true
                    };
                    dataServices.get(url, options, null, params).then(function(data) {
                        _this.setIdentities(data.items || []);
                        fulfill(_this.getIdentities());
                    }).fail(function(error) {
                        //return the cache
                        reject(_this.getIdentities());
                    });
                });
            }

        };

        return IdentityService;

    });

define("ojidentity",["jquery","ojs/ojcore","ojs/ojeditablevalue"],function(a,b,c){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a["default"]}:function(){return a};return b.d(c,"a",c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p="../../../resources/js/node_modules/composer.js.core/dist/",b(b.s="./src/main/js/ojidentity.js")}({"./node_modules/babel-runtime/core-js/json/stringify.js":function(a,b,c){a.exports={"default":c("./node_modules/core-js/library/fn/json/stringify.js"),__esModule:!0}},"./node_modules/core-js/library/fn/json/stringify.js":function(a,b,c){var d=c("./node_modules/core-js/library/modules/_core.js"),e=d.JSON||(d.JSON={stringify:JSON.stringify});a.exports=function(a){return e.stringify.apply(e,arguments)}},"./node_modules/core-js/library/modules/_core.js":function(a,b){var c=a.exports={version:"2.5.1"};"number"==typeof __e&&(__e=c)},'./node_modules/css-loader/index.js?{"importLoaders":1,"sourceMap":false,"minimize":true}!./node_modules/postcss-loader/lib/index.js?{"config":{"path":"/Users/talabes/repositories2/identity-browser/node_modules/composer-front-end-config/conf/webpack../postcss.config.js"}}!./src/main/css/ojidentity.css':function(a,b,c){b=a.exports=c("./node_modules/css-loader/lib/css-base.js")(!1),b.push([a.i,'.oj-identity{max-width:100%;width:100%;min-width:100px}.oj-identity.hasFilter{max-width:calc(100% - 32px);width:calc(100% - 32px);min-width:100px}.oj-identity .oj-select-search-field{line-height:36px}.oj-identity .oj-select-choice{height:32px;line-height:32px}.oj-identity.oj-select-multi.oj-disabled .oj-select-selected-choice{border-color:#d5d5d5}.oj-identity-type{display:inline-block;width:24px;height:24px;vertical-align:middle;margin:0 2px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAABICAMAAAGsIPWrAAACc1BMVEUkJCT///8kJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCRPcgFcAAAA0HRSTlMAAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISMkJSYnKCkqKywtLi8wMTIzNTY3ODk6Ozw+P0JDREVGSUxNTk9QUVJUVVZXWFlaW1xdXl9gYmNoaWpsbW5vcHFyc3R1dnh5en1+f4CBg4WGiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKkpaanqKmqq6ytrq+wsbKztLW2uLq+v8DBwsPFx8jLzc7T1tfa293e4OPm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+TvcGFAAAA5VJREFUOMutVPtfk1UYf97bxmbMqVvOFQIlhWVhxs3mNS8pmIqSycosp5Y3AjUFQQG3vMIGbbBLqJkoXsoyK5FLOUYivOw950/qnLN3c5sf/Rifvj+85/m+3/Oc8zzfcz4HOI4DLjsfsjAGFn//I3DxuKsTuKCdxYABDuPGRDyGIywO+gIQCn5OYyZVZysFO+KMg2L5dQCOd6JzPHCLKBJaMBDY0p1gqQOEFfLhd7ovH5Rg30OMJw6kTQEYGiAfEDASyZDXd/9NgExMkAez6T5ZaQmfBXw+/0JwBAKhLBs4gsFD9vdSpyQIgGbPr3VkWRKJtXstd1G/qeYLCSR78yVSC47eOlFGplnOtjLkpy9A65q1xEQHSoQLCKMrYozAvL/Q0KyYsnKU1ov/+Zh4UzURx7b0cpLJC/XOjTMoTBrgHMRCgoaqkC1O6qZqywlZ7zxJ4XKdKnjWas8gAJabt4mlKvkW4R6RRnzx0bytY0q97ciLpIc3GnPL++RdS06YAXLrTv1J23nQVjcdKg9cUlhzv9VuIGmfxpw6/B8qIKtLRYVC3ESNd1z28yp5ZxzhqGoizB/HWDGpRGydUNrUHO2mG7Lyc5WeEm1PlFaDbs4gxMliknVWAK4/7vuAAbjSRSpKpUn5JpQ5G8zsfAwcmDsC/k4fuXVdDRzM9LKz+m6jszlB2qbtbEmQpZLla0J8QYpt9k/2cjDtODtFp8tV/bwVPL/ATOJNtopVVilmWJJgXHtnDON71QZeFQgMxavnZ2S7wtS4nteMBcuyBary4urG5m8KjXPcg8rED8v0FY0th+ZqyX+t+f19Tfu/9NwZGEXK33/0Hm9o2v7uVAlMHx5tcnr7ZZxAuPdkU81y0FlyckpODw4Phx8QhIcjkcjtdW/Py2FVCbpMQxKmiJPv/ClCzBD9woMXr16seUsDKmICb60eUhB5hyL7NXyyIJT0jrObpfyUK6ZkmL8alBFCcniHmJphyPvo2iOkXF2Tb3ycIWQsP/f7mBwlGVF59F5HuSlmvVB04xHdWAVSHl5fq6NC4V30+HdM+uWDDCLs7huJpGLkvmN6vMEn8X+aSHwqWry45OW0HYDTLaj1dXd3HamsYNhEsHmFlQgzHV72cLFrHwx0tnr83S22JIEhdL4s02IPPSm0168xWrecOZYu+Lda9Tq9IauylAjm7e5OL4PP6233eDxud0c9FSTjK6+m4yX9JDr/F3FKodbfNrouAAAAAElFTkSuQmCC) no-repeat}.user{background-position:center -16px;background-size:80%}.group{background-position:0 0}.approle,.role{background-position:0 -50px}.oj-identity-select{max-height:106px;overflow:auto;background-color:#fcfdfe;border:1px solid #dfe4e7;border-radius:2px 0 0 2px}.oj-identity-select .oj-select-choices{background:none;border-width:0}.oj-identity-container .oj-listbox-result-label{width:calc(100% - 54px);display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle}.oj-identity-checkbox{display:inline-block;width:14px;height:14px;margin:0 4px 0 8px;vertical-align:middle;border-radius:2px;-webkit-box-shadow:0 0 1px #000;box-shadow:0 0 1px #000;background:-webkit-gradient(linear,left bottom,left top,from(#fff),to(#efeff1));background:linear-gradient(0deg,#fff,#efeff1);cursor:pointer}.oj-identity-checkbox:after{-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:alpha(opacity=0);opacity:0;content:"";position:absolute;width:9px;height:3px;background:transparent;margin:3px 1px;border:2px solid #737373;border-top:none;border-right:none;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.oj-identity-checkbox.selected:after{-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";filter:alpha(opacity=100);opacity:1}.oj-identity-filter{background:#fcfdfe url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAEMiUU4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE4NUNBNzUwODA4MjExRTZCMjVBQzhFMEMzMkQxRjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4NUNBNzUxODA4MjExRTZCMjVBQzhFMEMzMkQxRjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTg1Q0E3NEU4MDgyMTFFNkIyNUFDOEUwQzMyRDFGMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTg1Q0E3NEY4MDgyMTFFNkIyNUFDOEUwQzMyRDFGMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4hiR9yAAAFtklEQVR42mL8//8/AzJgAhFLlixJgNK5jFhVQGXrQDSGChYQce3atZNAyg+I17FAJcyhtDUTkurTIAIggHDbgu6w60B8CCwC0rJ48WJdEA3C2M0AukMLiA3gDgOCKiAWBGJvmMA0ID4GYgAEEIYZWJ0Bdcp0ZAkgvxfuLBgGOs8GShvjdCZOK3ABmKtBfrsApAyQ5E5qaWmZI5sAkrRCCn9zorwJEECUOxIWX1XoEkAxF2QTemACUMk4IHUIxQ1AQSkgxQHEzED8MCYm5heKG4ACz4CUKRBHwiSxxcUOZD514oK4yAJGlAKQ8gDiTVBfhAPxYmBkvYTF5l8gXgXE76D8qUAsgmzFYyC2gbLZgFgeKoZID1Djw6HJewYuRyoB8QmSohsggAgqIDrNQiMUFARlQOwLxM+B+C4QfwNiXiBWgfp8PhAvgsUnC5qBeUD8BYhtgQr+YrMRaEkJNMT2YfUCUAEnkFoPxLlAQ24jiTsBqXygmD+KBvTUg5SyzIE4EsrOAPGxqcOXVliB+B80u5gB8XmaxAITA4WAYgNQohGYLRig2cERiCOgSRMUFj+A+CoQLweVaSBFwKzCgC0dLALiWUC8B4qxAVAa0IKqw/ACqLz5CMS7oS5BBuJAfAUqPwurF6DgMhC7QmuWi0C8FZoNQUCHlEAElXw8UAxK4udIjQVQhRACxHygehaIb9MkIQEE0HBLicCcB0ogHUDMDcR3gPgl1BJpIFaEllLF0JoGazpYB8QmQAVfcJRGskDqLBBL4vICqJzjxONiZmgZiTMMooF4I9AmNiy2CwGppUBsgdMAoNNByRhUaK6Alo3I5SQoo2UD1bzGGwtABaCG1EogLodqBrlmIRD3AeUuEBuNO6D1OQO0LmAHat5HbjoA5YU/RKUDNPAf6Hx+qPMTSTXgLzQbHwHiIOQKZhhmpmFgALaaCVQbhUILUlCLChRNr6F1xVoQG1YrYUsHE6CFyRIgXg3EX6FZmBtaoEwC4ktA3I7LAFCTMQxaLqADUGI6AC1Q2nGFwXVomxMXSIc2OXF6AVQeLoPWfwfR5NyglWomvlgAaQwE4gaoYhgwBuIiUCOLmGj8Ba2lp0D5oBw5HWrwL2LTwScg/g5lg2LgGRKf5IRkC8RPyClQQE2bDCAWgvqfJAO+QJvtoDpgHo50MUgKFIAA7Zk7SwNREIWDMYoYEVMEqxQBsVLRQk1tk9JaDIh2pvGBWIiNqF1Kf4I/wPgCwcpUgm2wCiIqiA9EhMSgwRn8FtaQxL2bLFpkYap93LmPOefM2boz+HM4aCicVFEEfrq4KBXRJxGGNQIWBUm8c36127ukOciVU7HjLZCBFVkWJGJA0AVg8YDyLkBflurw0353kuAgCUckDvQ0SjL3JiuwASsvS5z/aNmdXSfoilGg4Mku0J2cgTVmrJgSRx45vlBECp8pIPTYuAqQFhFgVmezqWqhWj/LO9qSDKmakjhT6wrZ5r4MWUolikWJW4lt+Wi2wjMDbJ2f85P7beuMcACNnJBQQyglHz+0rVSc86JLnpZ7eS9w4BVezVOGPhtl9EAbV04HdwtELWWrEoRyEtDOc0OBqMJVAoCiMrjS1Rw+SVKlkWm5mibwBigp1Y1I7EuoEfPoAieaZNRMoJlA7TKUXkfxvJ8yi9FxK8K9aNkh4wvgQisuRYjoBiuuJU4ljvQd6YuKJjiwisRXJpwCA0wv5Y5JxEyikhtYawvy6OkuZud3kYC+044+L5megR38G+2S9jBE2xwOHGL1dnGXxnEdjKC4iI2pbcmwhP7bm2drbqo0Sx2clyX0YhIDsi4u0IHUQ5qF9dL4SWpA5XjG+v+xJdFLf5mp1RK5KcM7fKgZvKgx2z2tkAn2e8X3/Yuh6BUOBGy0bPe0wvhaH17rAasRsbrvJFihDv06fqlnSPgJAAUx4TJMYpozknW69E098G8S+AIIhC7zaRQqwQAAAABJRU5ErkJggg==") no-repeat center -33px;width:32px;height:32px;display:none;top:0;position:absolute;cursor:pointer;right:-32px;border:1px solid #dfe4e7;border-left-width:0;-webkit-box-sizing:border-box;box-sizing:border-box}.oj-identity-filter:hover{background-position:-1px 0}.oj-identity-filter.showFilter{display:inline-block}.oj-identity-filter-drop{line-height:24px;min-width:100px}.oj-identity-filter-drop input{vertical-align:middle}.oj-identity-container .info{color:#c3c3c3;font-size:12px}.oj-identity .oj-select-choice{border-radius:2px 0 0 2px}.oj-identity-filter.multiple:hover{background-position:-1px 6px}.oj-identity-filter.multiple{background-position:center -27px;padding:21px 0 20px}.oj-identity-loading-container{width:22px;height:22px;position:absolute;margin:3px 0 0 -50px;display:none;top:7px;right:28px}.oj-select-multi .oj-identity-loading-container{top:5px;right:2px}.oj-multi-loading{margin:5px 0 0 -22px}.identity-show-inline{display:inline-block}.oj-identity-loading{width:22px;height:22px;display:inline-block;background:url("data:image/gif;base64,R0lGODlhPAA8APf/AIfc/ly6/rXs/njR/sPw/lm3/mWz/lKy/oPC/ovU/mnE/n3J/tXt/2XB/mzH/mK//jyg/k6v/vT6/1+8/jab/t70/1Ks/li2/oPJ/pLU/t3x/1Cw/nzD/pPb/o/j/pvO/37S/tb1/2/J/lSz/nK7/rrm/4rf/nbP/ur6/9Hx/8Lu/87p/1W0/vf8/9nt//L5/+H2/7bc/+r2/0qm/nLE/qXV/8vn/4rG/pLi/tjx//j9/9Xx/5Dk/r3p/12v/tLq/0Gk/u34/4ne/sHg/8bp/5bk/q3Z/8nr/73h/7LZ/53m/qHh/s7u/6Ll/qLV/7rf/8Xl/0us/mrB/pnm/kGh/sXu/2m1/rPh/4rJ/q7d/6nZ/7jt/pbN/jqf/rXm/m24/sDk/3m//tzv/6np/pXh/pje/sHq/8jy/6nd/s3y/zid/q3k/uHz/6Xd/pnR/qzq/o3a/p3U/qrl/rHl/mG5/k6p/rXh/4XW/tHu/2S8/tn0/1+0/oHR/rrq/l6y/qLZ/p7Q/67h/q/s/pro/nbJ/ub3/2W5/qXa/uT4/5DJ/qXp/pjV/ubz//H8/6bl/liw/rTa/5jj/p7Y/srs/5LO/onO/qbi/qLc/r7u/pzi/pnZ/qHT/2e3/uT1/43e/r/n/4bQ/mm8/oLU/qbT/5Pm/o3P/qrh/lu1/onY/m7E/qjW/9L0/2zE/rLc/5ze/nLI/mC4/oDX/kKl/nrS/n3U/oTa/kyt/kao/oPZ/n/W/kWn/oXb/nDK/kep/mbC/kmq/j+j/nXO/oLY/le2/nPN/oHY/nTN/n7V/o3h/nzU/kSn/la1/ojd/kOm/kiq/mnF/j+i/kmr/k+v/mG+/nfQ/kqr/j6i/nvT/mfD/mvG/k2u/m3I/nLM/ozg/nHL/l+9/kSm/o3i/oLZ/obb/n3V/nPM/jme/j2h/l27/ovg/nLL/jug/mfC/mO//nHK/ozh/pHl/rvg/+j0/8Tj/0uo/kak/nzP/nnN/kSj/kCg/t33/4vc/lm0/s/z/26//v///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAwD/ACwAAAAAPAA8AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTDqxQIkOCUpUqYcCghYHKgj3uEOPl4Jmvdt8CFFh2wFCNm3rgzDqxs+fPoEMPSLO1BwrKPrFoLW3qE6hQolN/6eJiUgWurFt5doUK1pZYWYBIrgJwVitTtU+/SnWrSxa0GCJRmKCL9q5Tr1HD9oU2w0XITIPrbr0XCE+OyyucwNr7FhoEHyD7IYtcuERCLYr9QlAD6aOS0YS1mlaoiq9qNQg8IuIBu+6Shhg6f37hkQBv0nd0NJSwYbEf4h4FHSfc42GNvvQkgBw0/Wyhh2J01f8RE5JU91gRLZAPeeZMlSoqzHiJqMmMChVV2ouUwCkirVi1AGBCODyEJIEBsqzXUCH/BThgESF9AYwsRjxERIMChvMGSAhAMKEf2jHUAioYDkjARwio4aEstxzFUAmzlBiOPh7dQIGKE97ySysLmXFCjAAKiMNHSdy4oo62UJJQG8T8WOIZINWBI4u/2LLBKWCE+E8LRBDCS5NABhiJch/ZMCWSGxywTAEBfNOOL8848KWTQeoh0gdHVpnmmm2+GeecYfZBUiI56qkmm27CKSeY/wlaUgxUWnlon4oCSksKKM3DiaF8Jvpnkx3koJIEHzyyJ6J+ymnPHGTeJAESWNAggaovr2hyRAs35arrrrz26uuvwAYr7LDEFmvsscgaGxAAIfkECQMA/wAsAAAAADwAPAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoUwrUAcOMK1dlNGXIsOgKG5UFU3gSlivZgBPleDl45otVHAY4GzkCUKvYsWvUgqkTkU1BgwcTAmCQgTIEDiHjcMWiNeuEMXfbnmFrMA1dgAuwbJgkEC4ds108rw0Ixk3EUF/tvgUoMGzEAVUkQ/BAZoJpLHKzqBnzRtUq1sHLDmywFU8kIngeuoEV6/MEMV5p17Z9y+JAhCgbxIQcwyOcibt5qWkKhEdDjiuSpAwuvEFbtV4kQIYg5YGxY3JLdByUsKhA5s3RbjVb8VEQaNG7xOX/YrIQTOvXznTJ+vKRgBLbzJquaUip+HFlQM65AIlCgCdcHUjHkAT82JJdM8BAkMhIehzxkBtRpCcLNBBYIVIMj8jmkAbHgZNfFxSAFIMFwMgS0S+3yJKgOSF2lEQdXZwDBDgR9YKfNesgwEhHM1CgxjrWAKFLRNoBoeNHFFBgDgQl3sKVQzLocoM8IRlAQYwz9pLEQ1DcJFIiakAAjSy6OPOIBA7BkYscKYRkgznnANPMLdHYghhDPdASSy0A4LCFPh9ZEKQyvVSjzQZgLMTENccUswszJoSjyEcrlFhmFBEcwIIRCZUwQDK5iLOLEN14AOhHJMxZ5wYHLFMADVDkvjCQBiWIQs0s5OwJgAnIKBGSPIRGoc0BIwxTQADftOPLMw6IwE0wA1yTizCPRoqCSE/8Yos0ml4QADrTNIDNM9u4Y8wJs+iJyziknkGSG4eO4GoAEzzQgALZiOBNMNQwWgyfJmxhkhvEGotOsss2++yn0z4qAEoMhHLsBOGOW+656caCiyd64AQGDd/Yi68I6vDLaBkqCIjTP2xcsQizvJRzAiprvLDyzTjnrPPOPPfs889ABy300EQXbXRKAQEAIfkECQMA/wAsAAAAADwAPAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoUw5slOaNoyZLlljqUUilwRCKkJlgNg5XsWPXBpwwFqiTzUZjeIRLJwRArWK5ks2iFoybiG2XjJ4MQUppt6a1hEWdWpXXtmwKUjExyZWHh24mnIqlRbacu7MKfDWQsoJkI1LwPLzbuUtcLHLXqJ0g5k2Eg2fsGkz7FoABSX1FdDLbhSsWUKHGGj/G1uDBN3QB8mggiQIHz85welSYrQFPm1ekTaMusGxBSR2ZnppBGORKu2m7l404gOS3nBQLD00IUGAYiwMb6Hh8YcMGpA+AwpD/MNJwUfXrG7RFEdNxFAUKarqcA1ZHQkMJ/liMSB/lF5eOBsAnHzCy/OeQHctFYEs0vZDQERUUDCiLMuw5JMMBCjKojCwdUWAOBNAAAc4tEUljSzW96CILMB19aA0QzdziTETaVOOMLs0AYU1H67wYozNRRBSFM7fkaA0EHc0niy69VGPLag5p8Mst4AABDQT1dETCkk3aIk1zDhnRizJAAANBF1Z0xIUyvURjSwQHhPKQHxsCc04XanzQkRi3RBNFBBuMsIwdDTmhSx0kfIHABx8w4tEeUWizwQEsDFMAGAsRsVZJ8UhKqaUBTHBIEAj1QEsuc5hkyAEjgDrBNO2kwYKGVgLt4EoyuRRTixw6kMSAoAUEgM437TSAzTMOiKCOMScMkMwxxeAyjhBN9DoSGMEO+4CxyIrgDbMDXHNMLLjswowJyBRhrUh2BPDNtscm+22z15ATizjmoutBCCatsEAD7CiQzTbuEBMMNbPQEoswuwBgwjse6INSC2gIvA0v5RyccC7C1AKAEN00gYJNnWjCCzca46rrxzicsa5NLUxiCirP6urJG6vYpPPOPPfs889ABy300EQXbfTRSCeNdEAAIfkECQMA/wAsAAAAADwAPAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoUw5EdEbQmzdjxgiokkKHSoI6zowhBc9DOGQmhDAbVwvXkhw3/+kYBI+HB2TpTDADsAuXsFjHaLkqdPOMz25Bqda6movWtVnUQExSqSNS0KG1xBXLRS7ZrAHUghnjVkLlqqlFi2FNdg3vib3eRGz7JJKRgRs2CDaxitUs2hPBynnjtc1BtmdIQRqgQEFNvTAx5MHoMKeC6wo7TBFTx0uE52fYfBECmYS0uS4QrAEDciPIwRaatn1WwK5Bg2lQPvpQA/zccFlYFqJRgM35g2kTFnj/dFEdGhBZ4LIzXNSg3bRv6AIEYNMR0Dlr55vpsiChYZD3E8hXwAVGdBTGcM0oc4szBToUR3wFFDAMC+Jx9IgsCvYSTRQ/PLRChBOOcMApHYGjSy+/VGOLNhBJMMwyIh4gDYscLVhNFNpIs0FELIi4QQS2RNHRhrZEsMEBI0R0wI/aRFGNMx09YuQBB7CwTGQOaTCjLU/2YkFHHFA5wjLDFLDIQ6oEGU0vtyhDQkdxjMBCmQUE0EB/DEkAy5ptNgMEFx3ZsMwFdQYwwTcZNOSGM7fo4icw1ojhkT/yofPNNO00cMVCT/SiCziyAAHNOV98lAU6E0zzQAO+YKOAHQhJ0MBFm6ECcw4EXUDykQQ0rNqAq884sE0CR7QwUCFrJNPJEzfQYw2u5lgRUg4NsKPAM9lsIwIv3BgTDDUDzHINObnMMZAYH/hAgQsiXYGtA9t6Q0wwJ1AjLi25xCJMLTCodIm23pRjTL0DXJPMMbEUg8suADhyUwndfhvuwbkUI04t4zAjhAmr3FQBCPZeg6++tTC8cTfhKJGUDj3cgbAwCwPAjAndIOPBG/3YtHIKczRBhsbpIKPEFiEkZfTRSCet9NJMN+3001BHLfXUVFedUkAAIfkECQMA/wAsAAAAADwAPAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoUxZEIailoDcC+qFQqRAeDx4ePIQLh6zJKh0qXzAqqITnu27pTJgQIoRMI5Qu8lH4QHCMUqbMmAEAsGvXPhgmIVEYq8bH0H8qto7rWqsWLnHCisVKQRKSOXNduqyDMCPGPz1u4RaTGytXrmPkaDERuQIChHPnrFkDBgxIGA2xCh9OnCzZtWuzZokqFNIANMpAgMiS1awOByMVYleogmrWgAHUcp84cQdkDNWswSnTdYuLBISXTgQLZswYsXLcJn3kpIv4rV69nEFZiIabOm/ueIn/EMHHo5jsv6JVqxalRsM2IrZtc+AgW7ZOHZNEiWLLljZt/BzHUAuEZPPMMwoogA0aHWEQQQTSbLDBAXE8hAY22PjiSwMNlNKRIQeEOMKIGjzEBIftPPDANAt0NCILLCyzzDAQsTHNNN98M8EE6HQ0zDAXFCBkARGhg04ASCLZUQFJIomOgA4FMGQBF9DIUQPo7JjjNCs8xMaPMsIYSkeV3PhAO+00wKBDMbAwYogHcNDRFRw24As72NDwUCghSihNBKp0lAM2CR74TDZ2NNTKg//1F0WJHRVIn3zjHbFQPLbsV0000Tizx0dejMcLL954ww03JQSBUA0H/OIMdrfcvqKLESDdw005zRmz3AkgMAGUQD8Y4Ues1SkDTjOyPBLSDsHslhs1t4X2WTK0gOHHsaulBgRl84jUwwDSXkMtLcccY1gsMEhwA2XQWAMZBH6NtAYt5JibS2bFCCMMLrioINA8M0CQlzlUlZTCYMKIg0tbXY0DgAADMWKFGvhAglIhcuziMABZMWVCEwUlcVZKeiCjlAnpdPMOMuHQlBAKmCiRkwc3zeTyzTjnrPPOPPfs889ABy300EQXbbRKAQEAIfkECQMA/wAsAAAAADwAPAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoUw5kxMVGwRCrUKgsOKQOBQr5XhCEB4/UmH4zxVjoYs6cGjUkBjYK56EpDyWIUMawZu3cOQgQunQZIhCGiXTd3iELFw6TyU2ygKgFBgxa1Rny/qlgxkyIEBN4020h6eSWLl3KwDWTlVZtUjm1du0aBwAAXSFmQ0KpFu2Xs169bvkFLNhImWLChOHCVSvxLgAwQEowpM2WrShRKEcLZeSHbTE9LN3JlStWLNDicGUC2erAhg3SIkTQps0NQh1ektEid4y37xQfQ43YfqD7ASQLd8z/mnXtWjLpcDwyGMZ+2TIWLOI0LEGt/oAB4wt1/BOggH//dEjQUAv2GBNMMCecQE0PHVWCDjoBRBjAHw8F4o063JRDjDGadLTANNN8880EE6zwUCfbiKAiL+7w0VEDMLbTzgPTsAHRM9lk44AD22zTkQLYYMOOLzBGFKQCCjyDY0c5KvkMkhC1AGMDvvgSZEd8iNDjjtl08tAKID4gYwOpdNSBN97wwouKnzx0CDokijhNJR2VEIwxxpTDjTouOpSHhBGik0VHFdSX4IHGmNGQHexd8F8BDHgkynj31UcNEwsxsN0I8LlHx0dmkEMLLcmUN4soDB4kARL8HOfdASNow/GRDp74xtsxoiYDRxUVEAQFLK7ZwlwE0mxwioAf6VELLuIIU0wxtuYCBxeaYeaMM9FEUw1sroEXUh8AKLZLacwKs4QEjzTTjDLK6FJtL9c6N5IAQtDFTGOKqfDPCsCoBQRhzYDDLhYmbdENXibYxQx2/yRilTXQsKXWDSjpU0Q4yCDTTTcyCeSDVutgNcM8KumwRRFNeUCQCzepgY8qMw2kQwgCRDbQKCRwFfPOPPfs889ABy300EQXbfTRSCetNEoBAQAh+QQJAwD/ACwAAAAAPAA8AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTDpQQA9CHlx+GqEQIhQQQYNYgdDFHwcfMghrC9LqlTNbNczrVMBqoQ0AjlEj42armrJcucEahnVsXY+AZHqRCmNRyYEMEbVGo3tLV7Ka1MAIb4QjnAZ7YkXaWsRhRNoKtKNGGFgVCT6AAIemQ0b0LkkGAAsOW8S2r7e8vwbLEwNgFgJmJbsg8oAhJA91jyJIPHKBk44frH1iMLBFWi7OQz01AEnnwbYLpApCxSDioo0yuYuJqjWN2e9VHQg3aTesdIMCfhWuOxSqGizOzSB5zPP/D5iv69FIN19DKFUtYdwCjOQZy8EwBtgYNHgRpqEPUtfXt1aJCRwmIsE029bEjyUNmDDBLMscct0RHxKjDiwgOINjJQ4WcQM0A10CICkc6nBBMOd7wso0DERETjIez/MdRBQNQc4Ix3HgjQkS8cGNMMB/O8sJGOiQzS43B4BjRNiJ44yOQOnCUCy3XzGJjMPs5FEQ2DjDpTTnGdFRGLMdQWWMJD12BzTNcisALHx31gUsxuRxjJCpRMtQCKw2wowCb27TREQq71CJOLLmQk4wXDWUwzQP4YfMnHh5FAkChwiBKCxMLZREAOt882oAvNHy0ignMXIpLpsd4kadBRgzPU0B1E4TazhUgRWKCEMyMU8uccHCBhRgrIeHPCCwsAxytNLQAEiLhdLPrpbWkME8zuvTiTDVRaCPNBgcgK+usDIhEgAfISCuEIwIBIQs42f5SjS3eqjbCMsMYQRImPKCbDgwChQGMu8rc0ks0UdgSAbgjUGISAfB4sMVAqkBgzcDNFOwMwtpEoAVKIUzxlEAumLPOOda4i622j/zwE0F1qNEFBOdA424dTgz38kAfWOHzF18gEIPOOxdt9NFIJ6300kw37fTTUEct9dRUExQQACH5BAkDAP8ALAAAAAA8ADwAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFMS1FAjDImXX758cKGyoIY4ByLYinZLGRBgELpQmJGkJptSw1gc2KAtyq9b4IBAg2COggGVK6QEKJB0aVNnt5oBsUY1UUoirKZN2NqVaTVnusRaW/cBJRFsDdpNQ7d12YgD0mxV66VLFrBzgAg2EtmJ0DO8D77xLeAX8M5eygyvEKhDwBQdIFskEOHgcYPI6PK4scGAwY8fNfxk3qyjCTIPAkCWIOZORLZn7BpMyyIDoRNwYgp5EpIuHA99H0EEK8drWzYFvtAsfJIDVS0AQrqF/1PkcccsasG4Vc/2p6GlXMK+h/eAoqOXZOeNcRNhr0VDHXfEIs4uzJjwDiYdlXHMNQOcYIw6nzzkxTGx4EKgCWN0hEssCzZoTBAPFXINhRYW2NEu4sRCzjXUnBDRLMnkUkwt4wjREQC1CJMLLedFRA2MMn7XkRA46shjRMH8SAt8tXSUDpG1FJNLMoU81AkxSV5DSyzCdDSGCcyMg0sxx1Tx0BHeGHPCANeQs0RHmCAD5i4bwvGQPSKkueY1XnSEiAfvzJliDw2V8IwDIqhjDDUD7OCREh50YwIAuwgzhxELEeGLAtlswws3wYDwUQg8hNMNkSnI04wTCMlwyDQNbM3aKS/llACSIKXioMc/KwABDglQrOREHgFMACs7nG7Dh38foTBFEfXxCgwQytwSTRQRHDDCMhcEEMA3DzSAzaEaiKQPaAKpcg4wsijTSzS2ZLttAQGgA664dqD0QRfryqJLL9XYIo22y9Brbzva6avGOucA4S/A2gw8wjD0LrBZSgZQYA4E1gDRzC3ORKHNBgewMMwfEtSUxAwac+zxLb+IvAEW5dYk0AtDIGABBND46gcC8aRs89BEF2300UgnrfTSTDft9NNQRy01SgEBACH5BAkDAP8ALAAAAAA8ADwAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFMOZJOlFIYFHDiEQWBkhcqCQSSxmhCgwLIDG2xFu9XskZibLS4989XuW89hIw5oi9JLGRBrXxih3HFv2zNsDaahC3CBxQFptn7dkgUMgrlRJpkEUycim4IGD3j6HLFBW7Ve4ICc60LhBskdA06UE+FgaVN0BaAeiBDFma6r69TUGfnizixqxtx5BTtNr1m0Q9m6hTRyybFr1ObWVZBKUhYGuBnYoPM38DkLI2GIy5UscTleDi61OCghkWVZ0GKMdFQrFq3PxrwdWRiPKD0JIhsx/9tV7HVsNA25KNs0sFE/HR3TCNk1vDiI5QwlcJKgI0WTdx6E0JEgJgBQHTmzzPEQHpYIswsz6XggQEdKmDCeMLlcU8hDhRxTTC0AmBCOEh150I0Q4+BiXUS0xIILAEIA2BEPyBRYS3kRXZOLgxCG0xE84aRzYS4RzeIhiCYg09EUHrwjBAAqvvBQELO0iMs4QuAwIA/hWFjLOJM8ZMYAOvI4RkerwGOiAHr8Q4JDLdhDzSzkxAJiFR01IkAI8P0TgyzsMVQCMScMkEwu4uyCwkgWAKHMEwsdIQI3wVBzjYcdjDTEOcA0Y0E8CV2RzTbeGDNnizCMZAUE0MiiizNhqMMiw0AMQEEIO884wEs5hSazxEg2UNDFOUCA00s12mwwwjIFBPDNAw0okI0I6lQqipQiGUCBORAAI8stv9gizQEsXBDABNM0gM0z27hjzAk7kIQABWqsY42jvUShzQEjDFMAOt+040uuk4ZZ0ijCEtvMLdHYoiyz50Ir7T0GmzSEBd266kwU45YbADrpYgNKJzep8gW++vLrr7OEEHETQfJswknDGxywTClZsPHyzjz37PPPQAct9NBEF2300UgnrXRKAQEAIfkEBQMA/wAsAAAAADwAPAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoUw6sUCJDglKVKmHAYISByoI9EhDj5eCZr3bfAhRYdsBQjZt64Mw6sbPnz6BDD2ywtQcKyj6xaC1t6hOoUKJTf93iYlJFraxbeXaFCtaWWFmASK4CcFYrU7VPv0p1e0sWsBgiUZigi/auU69Rw/YFNsNFSCWD6269FwhPjssrnNDZ+xYYBB8g+4WLXLhEQi2K/UJQA+mjktGEtZpWqIWvajUIPCLiAbvukoYYOn9+4ZEAb9J3dDSUsGGxH+IeBR0n3ONhjb70JIAcNP1soYdibtX/EROSVPdYES2QD3mmfRUVKrxE1GTGjIoqVc6IlMApIq1YuABgAjI8hCSBAbKs11Ah/wU4YBEhfQGNLEY8RESDAiLzBkgIQDChH9ox1AIqGA5IwEcIqOGhLLocxVAJs5SIjD4e3UCBihPq8ksrC5lxQowACkjGR0ncuKKOtlCSUBvE/FhiFSDVgSOLv9gizSlghPhPC0QQwkuTQAYYiXIf2TAlktIcsEwBAXzTji/POPClk0HqIdIHR1aZ5pptvhnnnGH2QVIiOeqpJptuwiknmP8JWlIMVFp5aJ+KAkpLCijNw4mhfCb6Z5Md5KCSBB88sieifsppzxxk3iQBEljAIIKqL69ockQLN+Wq66689urrr8AGK+ywxBZr7LHIGhsQADs=") no-repeat 50%;background-size:30px}.disabled-filter{background-color:#efeff1;border-color:#dfe4e7;cursor:default}.oj-select-choice+.disabled-filter{border-color:#efeff1}.disabled-filter.multiple:hover{background-position:center -27px}.disabled-filter:hover{background-position:center -33px}html[dir=rtl] .oj-identity-filter{left:-32px;right:auto;border-left-width:1px;border-right-width:0}html[dir=rtl] .oj-identity-checkbox:after{margin:3px 1px;right:4px}html[dir=rtl] .oj-multi-loading{margin:5px 0 0;left:8px}html[dir=rtl] .oj-select-loading{left:30px;margin:3px 0 0}.oj-disabled .oj-identity-select{background-color:#efeff1}.oj-identity-container{z-index:1052}.oj-identity-container .oj-listbox-no-results{height:18px}',""])},"./node_modules/css-loader/lib/css-base.js":function(a,b){function c(a,b){var c=a[1]||"",e=a[3];if(!e)return c;if(b&&"function"==typeof btoa){var f=d(e);return[c].concat(e.sources.map(function(a){return"/*# sourceURL="+e.sourceRoot+a+" */"})).concat([f]).join("\n")}return[c].join("\n")}function d(a){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"}a.exports=function(a){var b=[];return b.toString=function(){return this.map(function(b){var d=c(b,a);return b[2]?"@media "+b[2]+"{"+d+"}":d}).join("")},b.i=function(a,c){"string"==typeof a&&(a=[[null,a,""]]);for(var d={},e=0;e<this.length;e++){var f=this[e][0];"number"==typeof f&&(d[f]=!0)}for(e=0;e<a.length;e++){var g=a[e];"number"==typeof g[0]&&d[g[0]]||(c&&!g[2]?g[2]=c:c&&(g[2]="("+g[2]+") and ("+c+")"),b.push(g))}},b}},"./node_modules/style-loader/lib/addStyles.js":function(a,b,c){function d(a,b){for(var c=0;c<a.length;c++){var d=a[c],e=o[d.id];if(e){e.refs++;for(var f=0;f<e.parts.length;f++)e.parts[f](d.parts[f]);for(;f<d.parts.length;f++)e.parts.push(k(d.parts[f],b))}else{for(var g=[],f=0;f<d.parts.length;f++)g.push(k(d.parts[f],b));o[d.id]={id:d.id,refs:1,parts:g}}}}function e(a,b){for(var c=[],d={},e=0;e<a.length;e++){var f=a[e],g=b.base?f[0]+b.base:f[0],h=f[1],i=f[2],j=f[3],k={css:h,media:i,sourceMap:j};d[g]?d[g].parts.push(k):c.push(d[g]={id:g,parts:[k]})}return c}function f(a,b){var c=q(a.insertInto);if(!c)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var d=t[t.length-1];if("top"===a.insertAt)d?d.nextSibling?c.insertBefore(b,d.nextSibling):c.appendChild(b):c.insertBefore(b,c.firstChild),t.push(b);else if("bottom"===a.insertAt)c.appendChild(b);else{if("object"!=typeof a.insertAt||!a.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var e=q(a.insertInto+" "+a.insertAt.before);c.insertBefore(b,e)}}function g(a){if(null===a.parentNode)return!1;a.parentNode.removeChild(a);var b=t.indexOf(a);b>=0&&t.splice(b,1)}function h(a){var b=document.createElement("style");return a.attrs.type="text/css",j(b,a.attrs),f(a,b),b}function i(a){var b=document.createElement("link");return a.attrs.type="text/css",a.attrs.rel="stylesheet",j(b,a.attrs),f(a,b),b}function j(a,b){Object.keys(b).forEach(function(c){a.setAttribute(c,b[c])})}function k(a,b){var c,d,e,f;if(b.transform&&a.css){if(!(f=b.transform(a.css)))return function(){};a.css=f}if(b.singleton){var j=s++;c=r||(r=h(b)),d=l.bind(null,c,j,!1),e=l.bind(null,c,j,!0)}else a.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(c=i(b),d=n.bind(null,c,b),e=function(){g(c),c.href&&URL.revokeObjectURL(c.href)}):(c=h(b),d=m.bind(null,c),e=function(){g(c)});return d(a),function(b){if(b){if(b.css===a.css&&b.media===a.media&&b.sourceMap===a.sourceMap)return;d(a=b)}else e()}}function l(a,b,c,d){var e=c?"":d.css;if(a.styleSheet)a.styleSheet.cssText=v(b,e);else{var f=document.createTextNode(e),g=a.childNodes;g[b]&&a.removeChild(g[b]),g.length?a.insertBefore(f,g[b]):a.appendChild(f)}}function m(a,b){var c=b.css,d=b.media;if(d&&a.setAttribute("media",d),a.styleSheet)a.styleSheet.cssText=c;else{for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(document.createTextNode(c))}}function n(a,b,c){var d=c.css,e=c.sourceMap,f=b.convertToAbsoluteUrls===undefined&&e;(b.convertToAbsoluteUrls||f)&&(d=u(d)),e&&(d+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */");var g=new Blob([d],{type:"text/css"}),h=a.href;a.href=URL.createObjectURL(g),h&&URL.revokeObjectURL(h)}var o={},p=function(a){var b;return function(){return void 0===b&&(b=a.apply(this,arguments)),b}}(function(){return window&&document&&document.all&&!window.atob}),q=function(a){var b={};return function(c){if("undefined"==typeof b[c]){var d=a.call(this,c);if(d instanceof window.HTMLIFrameElement)try{d=d.contentDocument.head}catch(e){d=null}b[c]=d}return b[c]}}(function(a){return document.querySelector(a)}),r=null,s=0,t=[],u=c("./node_modules/style-loader/lib/urls.js");a.exports=function(a,b){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");b=b||{},b.attrs="object"==typeof b.attrs?b.attrs:{},b.singleton||(b.singleton=p()),b.insertInto||(b.insertInto="head"),b.insertAt||(b.insertAt="bottom");var c=e(a,b);return d(c,b),function(a){for(var f=[],g=0;g<c.length;g++){var h=c[g],i=o[h.id];i.refs--,f.push(i)}if(a){d(e(a,b),b)}for(var g=0;g<f.length;g++){var i=f[g];if(0===i.refs){for(var j=0;j<i.parts.length;j++)i.parts[j]();delete o[i.id]}}}};var v=function(){var a=[];return function(b,c){return a[b]=c,a.filter(Boolean).join("\n")}}()},"./node_modules/style-loader/lib/urls.js":function(a,b){a.exports=function(a){var b="undefined"!=typeof window&&window.location;if(!b)throw new Error("fixUrls requires window.location");if(!a||"string"!=typeof a)return a;var c=b.protocol+"//"+b.host,d=c+b.pathname.replace(/\/[^\/]*$/,"/");return a.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(a,b){var e=b.trim().replace(/^"(.*)"$/,function(a,b){return b}).replace(/^'(.*)'$/,function(a,b){return b});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(e))return a;var f;return f=0===e.indexOf("//")?e:0===e.indexOf("/")?c+e:d+e.replace(/^\.\//,""),"url("+JSON.stringify(f)+")"})}},"./src/main/css/ojidentity.css":function(a,b,c){var d,e=0,f=c('./node_modules/css-loader/index.js?{"importLoaders":1,"sourceMap":false,"minimize":true}!./node_modules/postcss-loader/lib/index.js?{"config":{"path":"/Users/talabes/repositories2/identity-browser/node_modules/composer-front-end-config/conf/webpack../postcss.config.js"}}!./src/main/css/ojidentity.css');"string"==typeof f&&(f=[[a.i,f,""]]),f.locals&&(b.locals=f.locals),b.use=b.ref=function(){return e++||(d=c("./node_modules/style-loader/lib/addStyles.js")(f,{hmr:!0})),b},b.unuse=b.unref=function(){e>0&&!--e&&(d(),d=null)}},"./src/main/js/ojidentity.js":function(a,b,c){var d,e,d,e;d=[c("./node_modules/babel-runtime/core-js/json/stringify.js")],(e=function(f){"use strict";var g=function(a){return a&&a.__esModule?a:{"default":a}}(f);d=[c,c("ojs/ojcore"),c("jquery"),c("ojs/ojeditablevalue")],(e=function(require,a,b){c("./src/main/css/ojidentity.css").use();var d={GENERATED_OPTIONS_SELECTOR:"oj-select-options-generated",KEY:{TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isControl:function(a){switch(a.which){case d.KEY.SHIFT:case d.KEY.CTRL:case d.KEY.ALT:return!0}return!(!a.metaKey&&!a.ctrlKey)},isFunctionKey:function(a){return(a=a.which?a.which:a)>=112&&a<=123}},DEFAULT_QUERY_DELAY:70,ValueChangeTriggerTypes:{ENTER_PRESSED:"enter_pressed",OPTION_SELECTED:"option_selected",OPTION_REMOVED:"option_removed",BLUR:"blur",SEARCH_ICON_CLICKED:"search_icon_clicked"},lastMousePosition:{x:0,y:0},nextUid:function(){var a=1;return function(){return a++}}(),scrollBarDimensions:null,each2:function(a,c){for(var d=b(b.isFunction(a[0])?a[0]():a[0]),e=-1,f=a.length;++e<f&&(d.context=d[0]=b.isFunction(a[0])?a[e]():a[e])&&!1!==c.call(d[0],e,d););return a},measureScrollbar:function(){var a=b("<div class='oj-listbox-measure-scrollbar'></div>");a.appendTo("body");var c={width:a.width()-a[0].clientWidth,height:a.height()-a[0].clientHeight};return a.remove(),c},splitVal:function(a,c){var d,e,f;if(null===a||a.length<1)return[];for(d=a.split(c),e=0,f=d.length;e<f;e+=1)d[e]=b.trim(d[e]);return d},getSideBorderPadding:function(a){return a.outerWidth(!1)-a.width()},installKeyUpChangeEvent:function(a){var c="keyup-change-value";a.on("keydown",function(){b.data(a,c)===undefined&&b.data(a,c,a.val())}),a.on("keyup",function(e){if(e.which===d.KEY.ENTER)return void e.stopPropagation();var f=b.data(a,c);f!==undefined&&a.val()!==f&&(b.removeData(a,c),a.trigger("keyup-change"))})},installFilteredMouseMove:function(a){a.on("mousemove",function(a){var c=d.lastMousePosition;c!==undefined&&c.x===a.pageX&&c.y===a.pageY||(b(a.target).trigger("mousemove-filtered",a),d.lastMousePosition.x=a.pageX,d.lastMousePosition.y=a.pageY)})},thunk:function(a){var b,c=!1;return function(){return!1===c&&(b=a(),c=!0),b}},_focus:function(a){a[0]!==document.activeElement&&window.setTimeout(function(){var b,c=a[0],d=a.val().length;a.focus(),a.is(":visible")&&c===document.activeElement&&(c.setSelectionRange?c.setSelectionRange(d,d):c.createTextRange&&(b=c.createTextRange(),b.collapse(!1),b.select()))},40)},getCursorInfo:function(a){a=b(a)[0];var c=0,d=0;if("selectionStart"in a)c=a.selectionStart,d=a.selectionEnd-c;else if("selection"in document){a.focus();var e=document.selection.createRange();d=document.selection.createRange().text.length,e.moveStart("character",-a.value.length),c=e.text.length-d}return{offset:c,length:d}},killEvent:function(a){a.preventDefault(),a.stopPropagation()},killEventImmediately:function(a){a.preventDefault(),a.stopImmediatePropagation()},defaultEscapeMarkup:function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return String(a).replace(/[&<>"'\\]/g,function(a){return b[a]})},local:function(a,c){var e,f,g=a,h=function(a){return""+a.label};b.isArray(g)&&(f=g,g={results:f}),!1===b.isFunction(g)&&(f=g,g=function(){return f});var i=g();return i&&i.text&&(h=i.text,b.isFunction(h)||(e=i.text,h=function(a){return a[e]})),function(a){var e=a.term,f={results:[]};if(""===e&&!c)return void a.callback(g());g()&&d.each2(b(g().results),function(b,e){d._processData(a,e,f.results,c,!0,h)}),a.callback(f)}},cleanupResults:function(a){a.children().remove(),a.removeClass("oj-listbox-result-with-children")},remote:function(c,e){return function(f){var g={},h=this,i=function(a){var c={results:[]};h.inputSearch=g.searchPattern,d.each2(b(a),function(a,b){d._processData(f,b,c.results,e,!1)}),f.callback(c)};if(f.value)i(f.value);else{var j=b.trim(f.term);if(j&&(g.searchPattern="*"!==j?"*"+f.term+"*":j),b.extend(!0,g,{scope:this.defaultScope}),!g.searchPattern)return void i(this.results||[]);this.inputSearch&&this.inputSearch===g.searchPattern?i(this.results):(clearTimeout(this.queryTimer),this.queryTimer=setTimeout(function(){h.loading.hasClass("identity-show-inline")||h.loading.addClass("identity-show-inline"),c(g).then(function(a){h.results=a&&Array.isArray(a)?a:[],i(h.results),
h.loading.removeClass("identity-show-inline"),h.ojContext._setOption("messagesCustom",[])})["catch"](function(b,c){h.loading.removeClass("identity-show-inline"),h.ojContext._setOption("messagesCustom",[new a.Message(b,c)])})},1e3))}}},_processData:function(a,c,e,f,g,h){var i,j,k={};if(b.extend(!0,k,c[0]),c[0].label&&f&&f.label&&"label"!==f.label&&(k[f.label]=c[0].label,delete k.label),c[0].value&&f&&f.value&&"value"!==f.label&&(k[f.value]=c[0].value,delete k.value),!k.children&&f&&f.children&&(k.children=k[f.children],delete k[f.children]),k.children){i={};for(j in k)k.hasOwnProperty(j)&&(i[j]=k[j]);i.children=[],d.each2(b(k.children),function(b,c){d._processData(a,c,i.children,f&&f.childKeys?f.childKeys:null,g,h)}),(!g||i.children.length||a.matcher(a.term,i[f.label],k))&&e.push(i)}else g&&!a.matcher(a.term,k[f.label],k)||e.push(k)},clazz:function(c,d){var e=function(){};return a.Object.createSubclass(e,c,""),e.prototype=b.extend(e.prototype,d),e},LAST_QUERY_RESULT:"last-query-result",getLastQueryResult:function(a){return b.data(a.container,a._classNm+"-"+d.LAST_QUERY_RESULT)},saveLastQueryResult:function(a,c){b.data(a.container,a._classNm+"-"+d.LAST_QUERY_RESULT,c)}},e=d.clazz(Object,{_bind:function(a){var b=this;return function(){a.apply(b,arguments)}},_init:function(c){var e,f=this._classNm,g=this._elemNm;this.ojContext=c.ojContext,this.ojContext.validate=function(){if(this.options.value.length)return!0;var b=a.Translations.getTranslatedString("oj-validator.required.summary");return this._setOption("messagesCustom",[new a.Message(b)]),!1},this.opts=c=this._prepareOpts(c),this.id=c.id,this.headerInitialized=!1,c.element.data(g)!==undefined&&null!==c.element.data(g)&&c.element.data(g)._destroy(),this.container=this._createContainer();var h=this.opts.rootAttributes;this.containerId=h&&h.id?h.id:"ojChoiceId_"+(c.element.attr("id")||"autogen"+d.nextUid()),this.containerSelector="#"+this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1"),this.container.attr("id",this.containerId),this.body=d.thunk(function(){return b("#__oj_zorder_container").length?b("#__oj_zorder_container"):c.element.closest("body")}),this.container.attr("style",c.element.attr("style")),this.elementTabIndex=this.opts.element.attr("tabindex"),this.opts.showScopeFilter&&(this.container.addClass("hasFilter"),this.container.find(".oj-identity-filter").addClass("showFilter")),this.opts.element.data(g,this).attr("tabindex","-1").before(this.container),this.container.data(g,this),this.dropdown=this.container.find(".oj-listbox-drop"),this.dropdown.data("ojlistbox",this),this.opts.showScopeFilter&&this.container.on("click",".oj-identity-filter",b.proxy(this._showFilter,this)),this.opts.loading=this.container.find(".oj-identity-loading-container");var i=this.containerId;if(this.dropdown.attr("data-oj-containerid",i),this.results=this.container.find(".oj-listbox-results"),this.results.on("click",d.killEvent),c.list&&b("#"+c.list).is("ul")){var j=b("#"+c.list);this.dropdownListParent=j.parent(),j.addClass("oj-listbox-results").attr("role","listbox"),this.results.replaceWith(j),this.results=this.container.find(".oj-listbox-results"),this.results.css("display","")}e="oj-select"==f?this.container.find("input.oj-listbox-input"):this.container.find("input."+f+"-input"),this.search=e,this.queryCount=0,this.resultsPage=0,this.context=null,this._initContainer(),this.container.on("click",d.killEvent),d.installFilteredMouseMove(this.results),this.dropdown.on("mousemove-filtered touchstart touchmove touchend",".oj-listbox-results",this._bind(this._highlightUnderEvent)),b(this.container).on("change","."+f+"-input",function(a){a.stopPropagation()}),b(this.dropdown).on("change","."+f+"-input",function(a){a.stopPropagation()});var k=this;d.installKeyUpChangeEvent(e),e.on("keyup-change input paste",this._bind(this._updateResults)),e.on("focus",function(){e.addClass(f+"-focused"),"oj-select"!==f&&k.container.addClass("oj-focus")}),e.on("blur",function(){e.removeClass(f+"-focused"),"oj-select"!==f&&k.container.removeClass("oj-focus")}),this.dropdown.on("mouseup",".oj-listbox-results",this._bind(function(a){var c=b(a.target);if(this._selectionEvent=a,c.closest(".oj-listbox-result-selectable").length>0){if(this.opts.multiple&&this.opts.selectAll&&c.hasClass("oj-identity-checkbox")){var e=this.getVal(),f=c.closest(".oj-listbox-result").data(this._elemNm),g=e?e.slice(0):[],h={optionMetadata:{trigger:d.ValueChangeTriggerTypes.OPTION_SELECTED}};c.hasClass("selected")?(g.splice(this.opts.indexOf.call(g,f),1),h.optionMetadata.trigger=d.ValueChangeTriggerTypes.OPTION_REMOVED,c.attr("checked",!1)):g.push(f),this.opts.contains.call(this.opts.results,g)?this.opts.checkAll.addClass("selected"):this.opts.checkAll.removeClass("selected"),c.toggleClass("selected"),this.setVal(g,a,h)}else this._highlightUnderEvent(a),this._selectHighlighted(null,a)}else if(this.opts.multiple&&this.opts.selectAll&&c.hasClass("oj-identity-checkbox")){var i=c.parent().nextAll().find(".oj-identity-checkbox"),j=this,e=this.getVal(),g=e?e.slice(0):[],h={optionMetadata:{trigger:d.ValueChangeTriggerTypes.OPTION_SELECTED}};c.toggleClass("selected");var k=c.hasClass("selected");i.each(function(){var a=b(this.parentNode).data(j._elemNm);k?g.push(a):g.splice(j.opts.indexOf.call(g,a),1)}),k?i.addClass("selected"):(h.optionMetadata.trigger=d.ValueChangeTriggerTypes.OPTION_REMOVED,c.attr("checked",!1),i.removeClass("selected")),this.setVal(g,a,h)}})),this.dropdown.on("click mouseup mousedown",function(a){a.stopPropagation()}),b.isFunction(this.opts.initSelection)&&this._initSelection();var l=c.element.prop("disabled");l===undefined&&(l=!1),this._enable(!l);var m=c.element.prop("readonly");m===undefined&&(m=!1),this._readonly(m),d.scrollBarDimensions=d.scrollBarDimensions||d.measureScrollbar(),this.autofocus=c.element.prop("autofocus"),c.element.prop("autofocus",!1),this.autofocus&&this._focus()},_showFilter:function(a){var c=a.target;if(a=b.Event(a),this._enabled){if(!this.filterDropdown){var e=this,f=this.opts.scopesOptions||[],g=d.nextUid();this.filterDropdown=b('<div class="oj-identity-filter-drop"></div>');for(var h=0,i=f.length;h<i;h++){var j=b('<div><input type="checkbox" name="oj-identity-'+g+'" value="'+f[h].value+'" '+(-1!=e.opts.defaultScope.indexOf(f[h].value)?"checked ":"")+"/> "+f[h].label+"</div>");this.filterDropdown.append(j)}this.filterDropdown.on("click","input",function(){b(this).is(":checked")&&e.opts.defaultScope.indexOf(b(this).val())?e.opts.defaultScope.push(b(this).val()):e.opts.defaultScope.splice(e.opts.defaultScope.indexOf(b(this).val()),1)}),this.filterDropdown.appendTo(document.body),this.filterDropdown.ojPopup(),this.filterDropdown.ojPopup("option",{tail:"none",modality:"modeless",initialFocus:"none"})}this.filterDropdown.ojPopup("isOpen")||this.filterDropdown.ojPopup("open",c)}},_clickAwayHandler:function(a){var c,d=this.dropdown;b(a.target).closest(d).length||b(a.target).closest("#"+d.attr("data-oj-containerid")).length||d.length>0&&(c=d.data("ojlistbox"))&&c.close(a)},_surrogateRemoveHandler:function(){this.dropdown&&this.dropdown.remove()},_destroy:function(){var a=this._closeDelayTimer;isNaN(a)||(delete this._closeDelayTimer,window.clearTimeout(a));var b=this.opts.element,c=b.data(this._elemNm);this.close(),this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),this.opts.list&&this.results&&(this._cleanupList(this.results),this.dropdownListParent&&this.dropdownListParent.append(this.results)),c!==undefined&&(c.container.remove(),c.dropdown.remove(),b.removeAttr("aria-hidden").removeData(this._elemNm).off("."+this._classNm).prop("autofocus",this.autofocus||!1),this.elementTabIndex?b.attr({tabindex:this.elementTabIndex}):b.removeAttr("tabindex"),b.show())},_cleanupList:function(a){if(a&&a.is("ul")){a.removeClass("oj-listbox-results oj-listbox-result-sub"),a.removeAttr("role");for(var c=a.children().length-1;c>=0;c--)this._cleanupList(b(a.children()[c]))}else if(a.is("li")){(a.hasClass("oj-listbox-placeholder")||a.hasClass("oj-listbox-no-results"))&&a.remove(),a.attr("class")&&a.attr("class",a.attr("class").replace(/\oj-listbox-\S+/g,""));var d=a.children(".oj-listbox-result-label");d&&d.contents().unwrap(),"none"==a.css("display")&&a.css("display",""),this._cleanupList(a.children("ul"))}},_optionToData:function(a){if(a.is("option"))return{value:a.prop("value"),label:a.text(),element:a.get(),css:a.attr("class"),disabled:a.prop("disabled"),locked:"locked"===a.attr("locked")||!0===a.data("locked")};if(a.is("optgroup"))return{label:a.attr("label"),children:[],element:a.get(),css:a.attr("class")};if(a.is("li")){var b,c=null,d=a.children();return d&&d.length>0&&d.is("ul")?(b=a.attr("oj-data-label")?a.attr("oj-data-label"):a.clone().children().remove().end().text().trim(),c=[]):b=a.attr("oj-data-label")?a.attr("oj-data-label"):a.text().trim(),{value:a.attr("oj-data-value"),label:b,element:a.get(),css:a.attr("class"),children:c}}},_prepareOpts:function(a){var c,e,g=this;a.options&&Array.isArray(a.options)&&a.optionsKeys&&(a.options=b.extend(!0,[],a.options)),c=a.element;var h=c.get(0).tagName.toLowerCase();return"input"===h&&c.attr("list")?this.datalist=e=b("#"+c.attr("list")):"select"===h&&c.children().length>0?this.datalist=e=c:a.list&&(this.datalist=e=b("#"+a.list)),a=b.extend({},{populateResults:function(c,e,f,g){var h,i=b.proxy(this.opts.id,this),j=this,k=this.opts.optionRenderer;"function"!=typeof k&&(k=null),(h=function(c,e,g,l,m){var n,o,p,q,r,s,t,u,v=function(a,c){if(c.children&&c.children.length>0){var d=c.element&&b(c.element[0]).is("li")&&b(c.element[0]).children("ul"),e=d?b(c.element[0]).children("ul"):b("<ul></ul>");e.hasClass("oj-listbox-result-sub")||e.addClass("oj-listbox-result-sub"),h(c,c.children,e,l+1,!1),d||a.append(e)}},w=function(a,b,c){function d(a,c){var e=0;if(3===a.nodeType){var f=a.data.toUpperCase().indexOf(c);if(f>=0){var g=document.createElement("span");g.className=b;var h=a.splitText(f),i=(h.splitText(c.length),h.cloneNode(!0));g.appendChild(i),h.parentNode.replaceChild(g,h),e=1}}else if(1===a.nodeType&&a.childNodes&&!/(script|style)/i.test(a.tagName))for(var j=0;j<a.childNodes.length;++j)j+=d(a.childNodes[j],c);return e}a.length&&c&&c.length&&a.each(function(){d(this,c.toUpperCase())})},x=function(c){a._placeholderData||(p={},p[a.optionsKeys.label]=c,a.optionsKeys.label!==a.optionsKeys.value&&(p[a.optionsKeys.value]=""),a._placeholderData=p),s=b("<li></li>"),s.addClass("oj-listbox-placeholder oj-listbox-results-depth-0 oj-listbox-result oj-listbox-result-selectable"),s.attr("role","presentation"),t=b(document.createElement("div")),t.addClass("oj-listbox-result-label"),t.attr("id","oj-listbox-result-label-"+d.nextUid()),t.attr("role","option"),t.text(a._placeholderData[a.optionsKeys.label]),s.append(t),s.data(j._elemNm,a._placeholderData),g.prepend(s)},y=j._getPlaceholder(),z=j.getVal();z&&0!==z.length&&(m&&y&&!f.term?x(y):a.multiple||(x(""),a.placeholder=""));var A=a.multiple&&a.selectAll;if(a.results=e,z=j.getVal(),A){var B=b("<li class='oj-listbox-results-depth-0' role='presentation'></li>"),C=d.nextUid(),D=b(document.createElement("input")),E=!1;z&&Array.isArray(z)&&(E=a.contains.call(e,z));var F=b(document.createElement("span"));F.addClass("oj-listbox-result-label"),F.attr("id","oj-listbox-result-label-"+C),F.attr("role","option"),F.text(a.selectLabel),D.attr({id:"oj-checkbox-"+C,"class":"oj-identity-checkbox",type:"checkbox",checked:E});var G=b(document.createElement("label"));G.attr({"for":"oj-checkbox-"+C,"class":"oj-identity-checkbox"+(E?" selected":""),"aria-label":E?"selected":"unselected"}),a.checkAll=G,B.append([G,F]),g.prepend(B)}var H=!(!a.resultTemplateKeys||!Array.isArray(a.resultTemplateKeys));for(n=0,o=e.length;n<o;n+=1){p=e[n],r=!0===p.disabled,q=!r&&i(p)!==undefined;var I=p.element&&b(p.element[0]).is("li");if(s=b(I?p.element[0]:"<li></li>"),s.hasClass("oj-listbox-result"))p.children&&p.children.length>0&&v(s,p),b(p.element[0]).css("display","");else{var J=d.nextUid();if(s.addClass("oj-listbox-results-depth-"+l),s.addClass("oj-listbox-result"),s.addClass(q?"oj-listbox-result-selectable":"oj-listbox-result-unselectable"),r&&s.addClass("oj-disabled"),p.children&&s.addClass("oj-listbox-result-with-children"),s.attr("role","presentation"),A){var E=!1;z&&Array.isArray(z)&&(E=-1!==a.indexOf.call(z,p));var G=b(document.createElement("label"));G.attr({"for":"oj-checkbox-"+J,"class":"oj-identity-checkbox"+(E?" selected":""),"aria-label":E?"selected":"unselected"}),s.append(G)}var K=p.identityType?p.identityType:"";if(K||(K=p.type||""),K){var L=b(document.createElement("span"));L.attr("class","oj-identity-type "+K),s.append(L)}if(t=b(document.createElement("div")),t.addClass("oj-listbox-result-label"),t.attr("id","oj-listbox-result-label-"+J),t.attr("role","option"),r&&t.attr("aria-disabled","true"),!I){if(function(b,d){if(k){var e={index:n,depth:l,leaf:!d.children,parent:c,data:d,component:a.ojContext,parentElement:b.get(0)},g=k.call(a.ojContext,e);null!==g&&(null===g.parentNode||g.parentNode instanceof DocumentFragment)&&b.appendChild(g)}else(u=a.formatResult(d))!==undefined&&b.text(u);if(!0!==f.initial){var h=b.find(".oj-listbox-highlighter-section");h.length||(h=b),w(h,"oj-listbox-highlighter",f.term)}}(t,p),H)for(var M=a.resultTemplateKeys,N=0,O=M.length;N<O;N++)p.hasOwnProperty(M[N])&&p[M[N]]&&t.append([b("<span> | </span>"),b("<span class='info'> "+p[M[N]]+"</span>")]);else p.email&&t.append([b("<span> | <span>"),b("<span class='info'> "+p.email+"</span>")]);t[0].title=t.text(),s.append(t)}p.children&&p.children.length>0&&v(s,p),s.data(j._elemNm,p),I?(b(p.element[0]).contents().filter(function(){return"UL"!==this.tagName}).wrapAll(t),b(p.element[0]).css("display","")):g.append(s)}}})(null,e,c,0,g)}},f,a),a.id=function(a){return a[this.opts.optionsKeys.value]},a.formatResult=function(a){return isNaN(a[this.optionsKeys.label])?a[this.optionsKeys.label]:this.ojContext._formatValue(a[this.optionsKeys.label])},a.formatSelection=function(a){return a&&a[this.optionsKeys.label]?isNaN(a[this.optionsKeys.label])?a[this.optionsKeys.label]:this.ojContext._formatValue(a[this.optionsKeys.label]):undefined},"select"!==h&&null!==a.manageNewEntry&&(a.manageNewEntry=function(c){var d={};return d[a.optionsKeys.value]=d[a.optionsKeys.label]=b.trim(c),d}),e?a.query=this._bind(function(a){var b,c,f={results:[],more:!1},h=a.term;c=function(b,e){var f,i=b.children()&&b.children().length>0&&b.children().is("ul");b.is("option")||b.is("li")&&!i?a.matcher(h,b.text(),b)&&e.push(g._optionToData(b)):(b.is("optgroup")||b.is("li")&&i)&&(f=g._optionToData(b),d.each2(b.is("optgroup")?b.children():b.children("ul").children(),function(a,b){c(b,f.children)}),f.children.length>0&&e.push(f))},b=e.children(),this._getPlaceholder()!==undefined&&b.length>0&&""==b.first().attr("value")&&(b=b.slice(1)),d.each2(b,function(a,b){c(b,f.results)}),a.callback(f)}):"options"in a&&(b.isFunction(a.options)?a.query=d.remote(a.options,a.optionsKeys?a.optionsKeys:null):a.query=d.local(a.options,a.optionsKeys?a.optionsKeys:null)),a},_createHeader:function(){var a=this.opts.element.find(".oj-listbox-header");if(a.length){this.header=b("<li>",{"class":"oj-listbox-result-header oj-listbox-result-unselectable",role:"presentation"}),this.header.append(a.children()),this._initializeHeaderItems();var c=b("<ul>",{"class":"oj-listbox-results-with-header",role:"listbox"});c.append(this.header),c.appendTo(this.results.parent());var d=b("<li>",{role:"presentation"});c.append(d),this.results.attr("role","presentation"),this.results.appendTo(d)}this.headerInitialized=!0},_initializeHeaderItems:function(){this.headerItems=this.header.find("li[role='option'], li:not([role])"),this.headerItems.uniqueId(),this.header.find("ul").attr("role","presentation"),this.header.find("li:not([role])").attr("role","option");this.header.find("a, input, select, textarea, button, object, .oj-component-initnode").each(function(){b(this).attr("tabIndex",-1)})},_isHeaderItem:function(a){var c=!1;return this.headerItems.each(function(){if(b(this).attr("id")===a)return c=!0,!1}),c},_getNextHeaderItem:function(a){if(!this.headerItems)return null;if(!a)return this.headerItems.first();var c=!1,d=null;return this.headerItems.each(function(){if(c)return d=b(this),!1;c=b(this).attr("id")===a}),d},_getPreviousHeaderItem:function(a){if(!this.headerItems)return null;var c=null;return this.headerItems.each(function(){if(b(this).attr("id")===a)return!1;c=b(this)}),c},_setFocusOnHeaderItem:function(a){var b=a.find(".oj-component .oj-enabled").first();if(0===b.length){b=a.find("a, input, select, textarea, button, object, .oj-component-initnode").first(),0===b.length&&(b=a.children().first())}b&&b.addClass("oj-focus")},_removeHighlightFromHeaderItems:function(){this.headerItems&&this.headerItems.find(".oj-focus").removeClass("oj-focus")},_triggerSelect:function(a){var c=b.Event(this._elemNm+"-selecting",{val:this.id(a),object:a});return this.opts.element.trigger(c),!c.isDefaultPrevented()},_isInterfaceEnabled:function(){return!0===this.enabledInterface},_enableInterface:function(){var a=this._enabled&&!this._readonly,b=!a;return a!==this.enabledInterface&&(this.container.toggleClass("oj-disabled",b),this.close(),this.enabledInterface=a,!0)},_enable:function(a){a===undefined&&(a=!0),this._enabled!==a&&(this._enabled=a,this.opts.element.prop("disabled",!a),this.container.toggleClass("oj-enabled",a),this.container.find(".oj-identity-filter").toggleClass("disabled-filter",!a),this._enableInterface())},_disable:function(){this._enable(!1)},_readonly:function(a){return a===undefined&&(a=!1),this._readonly!==a&&(this._readonly=a,this.opts.element.prop("readonly",a),this._enableInterface(),!0)},_opened:function(){return this.container.hasClass("oj-listbox-dropdown-open")},_usingHandler:function(a,c){if(o(c))return void(this._closeDelayTimer=window.setTimeout(b.proxy(this.close,this),1));var d=this.container,e=c.element.element;e.css(a),"bottom"===c.vertical?(d.addClass("oj-listbox-drop-above"),e.addClass("oj-listbox-drop-above")):(d.removeClass("oj-listbox-drop-above"),e.removeClass("oj-listbox-drop-above"))},_getDropdownPosition:function(){var a={my:"start top",at:"start bottom",of:this.container.children().first(),collision:"flip",using:b.proxy(this._usingHandler,this)},c="rtl"===l();return p(a,c)},_positionDropdown:function(){this.dropdown.css("width",this.container.outerWidth()),this.dropdown.position(this._getDropdownPosition())},_shouldOpen:function(a){if(this._opened())return b.isFunction(this.opts.options);if(!1===this._enabled||!0===this._readonly)return!1;var c={component:this.opts.element};return this.ojContext._trigger("beforeExpand",a,c)},_clearDropdownAlignmentPreference:function(){this.container.removeClass("oj-listbox-drop-above"),this.dropdown.removeClass("oj-listbox-drop-above")},open:function(a,b){return!!this._shouldOpen(a)&&(this._opening(a,b),!0)},_opening:function(){this.headerInitialized||this._createHeader(),this.container.addClass("oj-listbox-dropdown-open")},_showDropDown:function(){if(this._opened()){this.windowEventBind=b.proxy(this._positionDropdown,this),this.documentEventBind=b.proxy(this._clickAwayHandler,this),window.addEventListener("resize",this.windowEventBind,!0),window.addEventListener("scroll",this.windowEventBind,!0),document.documentElement.addEventListener("mousedown",this.documentEventBind,!0);if("true"!==this._getActiveContainer().attr("aria-expanded")){this._clearDropdownAlignmentPreference(),this.dropdown[0]!==this.body().children().last()[0]&&this.dropdown.detach().appendTo(this.body()),this.dropdown.appendTo(this.body()),this.header&&(this.dropdown.find(".oj-listbox-results-with-header").prepend(this.header),this.header.show()),this.dropdown.position(this._getDropdownPosition()).show(),b("#oj-listbox-drop").removeAttr("id"),this.dropdown.attr("id","oj-listbox-drop");var a=this.containerId;this.dropdown.attr("data-oj-containerid",a),this._positionDropdown(),this._getActiveContainer().attr("aria-expanded",!0)}}},close:function(a){if(this._opened()){if(this._selectionEvent&&this._selectionEvent.target&&b(this._selectionEvent.target).hasClass("oj-identity-checkbox"))return void(this._selectionEvent=null);this.container.removeClass("oj-listbox-dropdown-open");var c=this._getActiveContainer().attr("aria-expanded");if(c&&"false"!==c){window.removeEventListener("resize",this.windowEventBind,!0),window.removeEventListener("scroll",this.windowEventBind,!0),document.documentElement.removeEventListener("mousedown",this.documentEventBind,!0);var d=this.containerId,e="scroll."+d,f="resize."+d,g="orientationchange."+d;this.container.parents().add(window).each(function(){b(this).off(e).off(f).off(g)}),this._clearDropdownAlignmentPreference(),this.header&&(this.header.hide(),this.header.appendTo(this.container)),this.dropdown.removeAttr("data-oj-containerid"),this.dropdown.removeAttr("id"),this.opts.list?this._removeHighlight():(this.dropdown.detach(),this.results.empty()),this._getActiveContainer().attr("aria-expanded",!1),this.ojContext._IsRequired()&&this.ojContext.validate()}}},_clearSearch:function(){},_ensureHighlightVisible:function(){var a,c,d,e,f,g,h,i=this.results;if(!((c=this._highlight())<0)){if(0==c)return void i.scrollTop(0);a=this._findHighlightableChoices().find(".oj-listbox-result-label"),d=b(a[c]),e=d.offset().top+d.outerHeight(!0),c===a.length-1&&(h=i.find("li.oj-listbox-more-results"),h.length>0&&(e=h.offset().top+h.outerHeight(!0))),f=i.offset().top+i.outerHeight(!0),e>f&&i.scrollTop(i.scrollTop()+(e-f)),g=d.offset().top-i.offset().top,g<0&&"none"!=d.css("display")&&i.scrollTop(i.scrollTop()+g)}},_findHighlightableChoices:function(){return this.results.find(".oj-listbox-result-selectable:not(.oj-disabled, .oj-selected)").filter(function(){return"none"!=b(this).css("display")})},_moveHighlight:function(a){var c=this._findHighlightableChoices(),d=this._highlight();if(this.header&&(d<=0||d===c.length-1)){var e=this._getActiveContainer().attr("aria-activedescendant"),f=this._isHeaderItem(e);f||(e=null);var g=null;if(a>0&&(d<0||d===c.length-1)?g=this._getNextHeaderItem(e):a<0&&(f&&d<0||0===d)&&(g=this._getPreviousHeaderItem(e)),g)return this._removeHighlight(),this._setFocusOnHeaderItem(g),void this._getActiveContainer().attr("aria-activedescendant",g.attr("id"));f&&a<0&&(d=0)}for(;d>=-1&&d<c.length;){d+=a,d==c.length?d=0:-1==d&&(d=c.length-1);var h=b(c[d]);if(h.hasClass("oj-listbox-result-selectable")&&!h.hasClass("oj-disabled")&&!h.hasClass("oj-selected")){this._highlight(d);break}}},_highlight:function(a){var c,d=this._findHighlightableChoices();if(0===arguments.length){var e=d.filter(".oj-hover");return e.length||(e=d.children(".oj-hover").closest(".oj-listbox-result")),d.get().indexOf(e[0])}a>=d.length&&(a=d.length-1),a<0&&(a=0),this._removeHighlight(),c=b(d[a]),c.hasClass("oj-listbox-result-with-children")?c.children(".oj-listbox-result-label").addClass("oj-hover"):c.addClass("oj-hover"),this._getActiveContainer().attr("aria-activedescendant",c.find(".oj-listbox-result-label").attr("id")),this._ensureHighlightVisible()},_removeHighlight:function(){this.results.find(".oj-hover").removeClass("oj-hover"),this._removeHighlightFromHeaderItems()},_highlightUnderEvent:function(a){var c=b(a.target).closest(".oj-listbox-result-selectable");if(c.length>0&&!c.is(".oj-hover")){var d=this._findHighlightableChoices();this._highlight(d.index(c))}else 0==c.length&&this._removeHighlight()},_updateResults:function(a){var c=this.search,e=this,f=c.val(),g=b.data(this.container,this._classNm+"-last-term");if((!0===a||!g||f!==g)&&(g||f||!a||"input"!==a.type)){b.data(this.container,this._classNm+"-last-term",f);var h=this.opts.minLength||0;f.length>=h?(clearTimeout(this.queryTimer),a&&!0!==a?this.queryTimer=setTimeout(function(){e._queryResults(a)},d.DEFAULT_QUERY_DELAY):this._queryResults(a)):this.close()}},_queryResults:function(a){function c(){if(i._positionDropdown(),i.header&&i.headerItems.length){var a=i._findHighlightableChoices(),b=i.headerItems.length+a.length;if(i.headerItems.attr("aria-setsize",b),a.length){var c=a.children("[role='option']");c.attr("aria-setsize",b),c.first().attr("aria-posinset",i.headerItems.length+1)}}}var e,f=this.search,g=this.results,h=this.opts,i=this,j=f.val();if((h.minLength||0)>j.length)return void this.close();this.open(null,!0),++this.queryCount,this._removeHighlight(),e=this.search.val(),j=e!==undefined&&null!==e&&(!0!==a||h.inputSearch||h.minLength>0)?e:"",this.resultsPage=1,h.query({element:h.element,term:j,page:this.resultsPage,context:null,matcher:h.matcher,callback:this._bind(function(e){if(this._opened())if(this.context=e&&e.context!==undefined?e.context:null,e&&0!==e.results.length)d.saveLastQueryResult(this,e.results),this._showDropDown(),this._preprocessResults(g),i.opts.populateResults.call(this,g,e.results,{term:f.val(),page:this.resultsPage,context:null,initial:a},this._showPlaceholder()),this._postprocessResults(e,a),c();else if("oj-select"===this._classNm&&!0!==this.opts.multiple||this.opts.inputSearch&&""!==b.trim(this.opts.inputSearch)||this.header){var j=b("<li>");j.addClass("oj-listbox-no-results"),j.text(h.noMatchesFound),this._showDropDown(),this._preprocessResults(g),g.append(j),c()}})})},_preprocessResults:function(a){if(this.opts.list){var b=a.children();this._hideResultList(b)}else a.empty()},_hideResultList:function(a){for(var c=0;c<a.length;c++){b(a[c]).is("LI")&&((b(a[c]).hasClass("oj-listbox-no-results")||b(a[c]).hasClass("oj-listbox-placeholder"))&&b(a[c]).remove(),b(a[c]).css("display","none"),b(a[c]).hasClass("oj-selected")&&b(a[c]).removeClass("oj-selected"));var d=b(a[c]).children("ul");d&&d.children()&&this._hideResultList(d.children())}},_cancel:function(a){this.close(a)},_focusSearch:function(){d._focus(this.search)},_selectHighlighted:function(a,c){if(this.header){var e=this._getActiveContainer().attr("aria-activedescendant");if(this._isHeaderItem(e)){var f=b("#"+e),g=f.find("a, input, select, textarea, button, object").first();return 0===g.length&&(g=f.children()),g.length&&g[0].click(),void this.close(c)}}var h=this._highlight(),i=this.results.find(".oj-hover"),j=i.closest(".oj-listbox-result").data(this._elemNm);j?(this._highlight(h),a=a||{},a.trigger=d.ValueChangeTriggerTypes.OPTION_SELECTED,j!==this.opts._placeholderData?this._onSelect(j,a,c):this._onSelect([],a,c)):a&&a.noFocus&&this.close(c)},_getPlaceholder:function(){return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||this.opts.placeholder},_setPlaceholder:function(){var a=this._getPlaceholder();a&&(this.search.attr("placeholder",a),this.container.removeClass(this._classNm+"-allowclear"))},_initContainerWidth:function(){function a(){var a,b,c,d,e,f;if((a=this.opts.element.attr("style"))!==undefined)for(b=a.split(";"),d=0,e=b.length;d<e;d+=1)if(f=b[d].replace(/\s/g,""),null!==(c=f.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i))&&c.length>=1)return c[1]}var b=a.call(this);null!==b&&this.container.css("width",b)},getVal:function(){return this.ojContext.option("value")},setVal:function(a,b,c){var d={doValueChangeCheck:!1};c&&(d._context=c),"string"!=typeof a&&Array.isArray(a)||(a=[a]),this.opts.element.val(0!==a.length?a:null),this.ojContext._updateValue(a,b,d)},_showPlaceholder:function(){return!1},_getActiveContainer:function(){return this.search},_hasSearchBox:function(){return this.opts.minimumResultsForSearch!==undefined&&this.container._hasSearchBox!==undefined},_findItem:function(a,c){for(var d=0;d<a.length;d++)if(b(a[d]).data(this._elemNm).value===c)return a[d];return null}}),f={closeOnSelect:!0,openOnEnter:!0,id:function(a){return a.id},matcher:function(a,b){return(""+b).toUpperCase().indexOf((""+a).toUpperCase())>=0},separator:","},h=d.clazz(e,{_enableInterface:function(){h.superclass._enableInterface.apply(this,arguments)&&this.search.prop("disabled",!this._isInterfaceEnabled())},_focus:function(){this._opened()&&this.close()},_destroy:function(){b("label[for='"+this.search.attr("id")+"']").attr("for",this.opts.element.attr("id")),h.superclass._destroy.apply(this,arguments)},_clear:function(a){this.selection.data(this._elemNm);this.search.val(""),this.selection.removeData(this._elemNm),this._setPlaceholder()},_initSelection:function(){var a=this.opts.element;this.opts.initSelection.call(null,a,this._bind(this._updateSelectedOption))},_containerKeydownHandler:function(a){if(this._isInterfaceEnabled()){if(a.which===d.KEY.PAGE_UP||a.which===d.KEY.PAGE_DOWN)return void d.killEvent(a);switch(a.which){case d.KEY.UP:case d.KEY.DOWN:return this._opened()?this._moveHighlight(a.which===d.KEY.UP?-1:1):this.open(a),void d.killEvent(a);case d.KEY.ENTER:return this._selectHighlighted(null,a),d.killEvent(a),void(this._opened()||(this._userTyping=!1));case d.KEY.TAB:return this.close(a),void(this._userTyping=!1);case d.KEY.ESC:return this._opened()&&(this._cancel(a),d.killEvent(a)),void(this._userTyping=!1)}this._userTyping=!0}},_containerKeyupHandler:function(a){this._isInterfaceEnabled()&&(this._opened()||this.open(a))},_initContainer:function(){var a,c,e=this.container,f=(this.dropdown,this.opts.rootAttributes),g=f&&f.id?f.id:this.opts.element.attr("id")||d.nextUid();this.selection=a=e.find("."+this._classNm+"-choice"),a.attr("id",this._classNm+"-choice-"+g),c=b("label[for='"+this.opts.element.attr("id")+"']"),c.attr("id")||c.attr("id",this._classNm+"-label-"+g),a.find("."+this._classNm+"-input").attr("id",this._classNm+"-input-"+g),this.results.attr("id")||this.results.attr("id","oj-listbox-results-"+g),this.search.attr("aria-owns",this.results.attr("id")),this.search.attr("aria-labelledby",c.attr("id")),this.opts.element.attr("aria-labelledby",c.attr("id")),this.search.attr("id")&&c.attr("for",this.search.attr("id")),this.opts.element.attr("aria-label")&&this.search.attr("aria-label",this.opts.element.attr("aria-label")),this.opts.element.attr("aria-controls")&&this.search.attr("aria-controls",this.opts.element.attr("aria-controls")),a.on("keydown",this._bind(this._containerKeydownHandler)),a.on("mousedown","abbr",this._bind(function(a){this._isInterfaceEnabled()&&(this._clear(a),d.killEventImmediately(a),this.close(a),this.selection.focus())})),a.on("mousedown",this._bind(function(a){this.opts.element.prop("disabled")&&d.killEvent(a),this._opened()?this.close(a):this._isInterfaceEnabled()&&this.open(a);var b=this.search.parent().attr("aria-hidden");b&&"true"==b?this.selection.focus():this.search.focus(),this.container.addClass("oj-active")})),a.on("mouseup",this._bind(function(a){this.container.removeClass("oj-active")})),a.on("focus",this._bind(function(a){d.killEvent(a)})),this.search.on("blur keyup",this._bind(function(a){if("keyup"!==a.type||10===a.keyCode||13===a.keyCode){if(this.search.val()!==undefined&&this.results.find(".oj-hover").length<=0)if(this.opts.manageNewEntry){var b=this.selection.data(this._elemNm);if(!b&&""!==this.search.val()||b&&(b.label!==this.search.val()||!this.ojContext.isValid())){var c=this.opts.manageNewEntry(this.search.val()),e="blur"===a.type?d.ValueChangeTriggerTypes.BLUR:d.ValueChangeTriggerTypes.ENTER_PRESSED,f={trigger:e};this._onSelect(c,f,a)}}else if(null==this.opts.manageNewEntry){var c=this.selection.data(this._elemNm);if(""==this.search.val())this._clear(a);else if("oj-select"!==this._classNm){var g=this.opts.formatSelection(c);g!==undefined&&this.search.val(g)}}this.search.removeClass(this._classNm+"-focused"),this.container.removeClass("oj-focus")}})),this._initContainerWidth(),this.opts.element.hide().attr("aria-hidden",!0),this._setPlaceholder()},_prepareOpts:function(){var a=h.superclass._prepareOpts.apply(this,arguments),c=this,e=this.getVal(),f=a.element.get(0).tagName.toLowerCase();if("input"===f&&a.element.attr("list")||"select"===f&&a.element.children().length>0||a.list){var i=a.list?"li":"option";a.initSelection=function(a,b){var d,e=c.getVal();Array.isArray(e)&&(e=e[0]),
d=e!==undefined&&null!==e?c._optionToData(a.find(i).filter(function(){return"li"==i?this.getAttribute("oj-data-value")===e:"option"==i?this.value===e:void 0})):c._optionToData(a.find(i).filter(function(){return"li"==i?!0===this.getAttribute("oj-data-selected"):"option"==i?this.selected:void 0})),b(d)},a.validate=function(a,b){var d;return b!==undefined&&null!==b&&(d=c._optionToData(a.find(i).filter(function(){return"li"==i?this.getAttribute("oj-data-value")===b:"option"==i?this.value===b:void 0}))),!!d}}else("options"in a||e&&e.length>0)&&(b.isFunction(a.options)?(a.initSelection=function(f,h){var i=function n(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];if((0,g["default"])(b)===(0,g["default"])(e))return e;if(e.children){var f=n(e.children,b);if(f)return f}}return null};e=c.getVal();var j="";e&&e.length&&(j=e[0]);var k=null;if(!j)return void h(k);var l=d.getLastQueryResult(c);if(l&&(k=i(l,j)),!k){var m=c.currentItem;m&&m.length&&j===m[0]&&(k=m[0])}k||c.valueChangeTrigger?h(k):a.query({value:[j],callback:b.isFunction(h)?function(a){a&&a.results&&(k=i(a.results,j)),h(k)}:b.noop})},a.validate||(a.validate=function(a,b){return!0})):(a.initSelection=function(d,h){var i="";(e=c.getVal())&&e.length&&(i=e[0]);var j="select"==f&&c.ojContext._HasPlaceholderSet()&&!c.ojContext._IsRequired(),k=j?c._getPlaceholder():null,l=null;a.query({matcher:function(a,b,c){var d=(0,g["default"])(i)===(0,g["default"])(c);return d&&(l=c),d},callback:b.isFunction(h)?function(){l||"select"!==f||(l=k),h(l)}:b.noop})},a.validate=function(c,d){var e=d,f=null;return a.query({matcher:function(a,b,c){var d=(0,g["default"])(e)===(0,g["default"])(c);return d&&(f=c),d},callback:b.noop}),!!f}));return a},_postprocessResults:function(a,b,c){var e,f=-1,g=this;e=this._findHighlightableChoices(),d.each2(e,function(a,b){var c=g.getVal();if(c&&c[0]===g.id(b.data(g._elemNm)))return f=a,!1}),!1!==c&&!0===b&&f>=0&&this._highlight(f)},_onSelect:function(a,b,c){if(this._triggerSelect(a)){var d;b&&b.trigger&&(d={optionMetadata:{trigger:b.trigger}}),this.setVal(a||[],c,d),this.close(c),this._focusSearch()}},_clearSearch:function(){this.search.val("")}}),i=d.clazz(h,{_elemNm:"ojidentity",_classNm:"oj-select",_userTyping:!1,_createContainer:function(){return b(document.createElement("div")).attr({"class":"oj-identity oj-select oj-component"}).html(["<div class='oj-select-choice' tabindex='0' role='combobox' ","\t aria-autocomplete='none' aria-expanded='false' aria-ready='true'>","  <span class='oj-select-chosen'></span>","  <abbr class='oj-select-search-choice-close' role='presentation'></abbr>","  <a class='oj-select-arrow oj-component-icon oj-clickable-icon-nocontext oj-select-open-icon' role='presentation'>","</a></div>","<span class='oj-identity-filter'></span>","<div class='oj-listbox-drop oj-identity-container' style='display:none' role='presentation'>","  <div class='oj-listbox-search-wrapper'>","  <div class='oj-listbox-search'>","\t<input type='text' autocomplete='off' autocorrect='off' autocapitalize='off'","\t\t   spellcheck='false' class='oj-listbox-input' title='Search field' ","\t\t   role='combobox' aria-expanded='false' aria-autocomplete='list' />","\t<span class='oj-listbox-spyglass-box'>","\t  <span class='oj-component-icon oj-clickable-icon-nocontext oj-listbox-search-icon' role='presentation'>","\t   <b role='presentation'></b></span>","\t</span>","\t<span class='oj-identity-loading-container oj-select-loading'>","\t  <span class='oj-identity-loading' role='presentation'>","\t   &nbsp;</span>","\t</span>","  </div>","  </div>","   <ul class='oj-listbox-results' role='listbox'>","   </ul>","</div>"].join(""))},_enable:function(a){i.superclass._enable.apply(this,arguments),this._enabled?(this.container.find(".oj-select-choice").attr("tabindex","0"),this.container.find(".oj-select-arrow").removeClass("oj-disabled")):(this.container.find(".oj-select-choice").attr("tabindex","-1"),this.container.find(".oj-select-arrow").addClass("oj-disabled"))},close:function(a){this._opened()&&(i.superclass.close.apply(this,arguments),this.container.find(".oj-select-choice").attr("aria-expanded",!1),this._testClear(a)||this._clearSearch(),a instanceof MouseEvent&&a.target!=this.selection&&a.target!=this.search||d._focus(this.selection),this.container.find(".oj-listbox-spyglass-box").off("mouseup click"))},_opening:function(a,b){i.superclass._opening.apply(this,arguments);var c;a&&"keydown"==a.type&&a.which!=d.KEY.UP&&a.which!=d.KEY.DOWN&&a.which!=d.KEY.LEFT&&a.which!=d.KEY.RIGHT&&(c=String.fromCharCode(a.which),d.killEvent(a)),this._opened()&&(c=this.search.val()),this._showSearchBox(c),b||(c?this._updateResults():this._updateResults(!0))},_showDropDown:function(){if(this._opened()){i.superclass._showDropDown.apply(this,arguments),this.container.find(".oj-select-choice").attr("aria-expanded",!0);var a,b,c;this._hasSearchBox()&&(a=this.search.get(0),a.createTextRange?(b=a.createTextRange(),b.collapse(!1),b.select()):a.setSelectionRange&&(c=this.search.val().length,a.setSelectionRange(c,c)))}},_initContainer:function(){var a=this.containerId+"_selected";this.text=this.container.find(".oj-select-chosen").attr("id",a),i.superclass._initContainer.apply(this,arguments),this.container.find(".oj-select-choice").attr({"aria-owns":this.search.attr("aria-owns"),"aria-labelledby":this.search.attr("aria-labelledby"),"aria-describedby":a});var b=this.opts.element.attr("aria-label");b&&this.selection.attr("aria-label",b),this.search.on("keydown",this._bind(this._containerKeydownHandler)),this.search.on("keyup-change input",this._bind(this._containerKeyupHandler));var c=this;this.selection.on("blur",function(a){c._testClear(a)})},_initSelection:function(){this._isPlaceholderOptionSelected()?(this._updateSelection(null),this.close(),this._setPlaceholder()):i.superclass._initSelection.apply(this,arguments)},_updateSelectedOption:function(a){if(a!==undefined&&null!==a){var b=this.getVal();b=Array.isArray(b)?b[0]:b,(0,g["default"])(b)!==(0,g["default"])(a)&&(b===undefined||null===b?this.ojContext.options.value=Array.isArray(a)?a:[a]:this.setVal(Array.isArray(a)?a:[a])),this._updateSelection(a),this.close()}},_updateSelection:function(a){this.selection.data(this._elemNm,a),null!==a&&this.text.text(a[this.opts.optionsKeys.label]),a&&""!=a.id&&this.text.removeClass(this._classNm+"-default"),this.opts.allowClear&&this.container.addClass(this._classNm+"-allowclear")},_getActiveContainer:function(){return this.search.attr("aria-expanded")&&this._hasSearchBox()?this.search:this.selection},_isPlaceholderOptionSelected:function(){if(null===this._getPlaceholder())return!1;var a=this.getVal();return""===(a=Array.isArray(a)?a[0]:a)||a===undefined||null===a},_getPlaceholder:function(){return this.opts.placeholder},_showPlaceholder:function(){return!0},_setPlaceholder:function(){var a=this._getPlaceholder();this._isPlaceholderOptionSelected()&&a!==undefined&&(a===undefined&&(a=""),this.text.text(a).addClass(this._classNm+"-default"),this.container.removeClass(this._classNm+"-allowclear"))},setVal:function(a,b,c){i.superclass.setVal.call(this,a,b,c),this.selection.data("selectVal",a)},_containerKeydownHandler:function(a){if(!(d.KEY.isControl(a)&&a.which!=d.KEY.SHIFT||d.KEY.isFunctionKey(a))){switch(a.which){case d.KEY.TAB:return this.close(a),this.selection.focus(),void this._testClear(a);case d.KEY.ENTER:if(a.target===this.selection[0]&&!this._opened())return this.open(a),void d.killEvent(a)}var b=this._hasSearchBox();if(i.superclass._containerKeydownHandler.apply(this,arguments),this._userTyping&&!this._opened()&&this.open(a),!b&&this._userTyping){var c;a.which!=d.KEY.LEFT&&a.which!=d.KEY.RIGHT&&(c=String.fromCharCode(a.which)),this._showSearchBox(c),this._updateResults(),d.killEvent(a)}}},_testClear:function(a){return""==this.text.text()&&(this._clear(a),!0)},_showSearchBox:function(a){var c=!1,e=this.dropdown.find(".oj-listbox-search");if(e&&(this._hasSearchBox()?(this.dropdown.find(".oj-listbox-search-wrapper").removeClass("oj-helper-hidden-accessible"),b(e).removeAttr("aria-hidden"),this.search.val(a),c=!0):(this.dropdown.find(".oj-listbox-search-wrapper").addClass("oj-helper-hidden-accessible"),b(e).attr("aria-hidden","true"))),d._focus(c?this.search:this.selection),c){var f=this;e.find(".oj-listbox-spyglass-box").on("mouseup click",function(a){f.search.focus(),a.stopPropagation()})}},_hasSearchBox:function(){var a=this.opts.minimumResultsForSearch;return(this.opts.list?b("#"+this.opts.list).find("li").length:this.datalist?this.datalist[0].length:this.opts.options?this.opts.options.length:0)>a||this._userTyping||b.isFunction(this.opts.options)}}),j=d.clazz(e,{_prepareOpts:function(){var a=j.superclass._prepareOpts.apply(this,arguments),c=this,e=a.element.get(0).tagName.toLowerCase();if("input"===e&&a.element.attr("list")||"select"===e&&a.element.children().length>0||a.list){var f=a.list?"li":"option";a.initSelection=function(a,b){var g,h=[],i=c.getVal();if(i)for(var j=i,k=0;k<j.length;k++){var l=j[k];g=a.find(f).filter(function(){return"option"===f?this.value===l:"li"===f?this.getAttribute("oj-data-value")===l:void 0}),g&&g.length?h.push(c._optionToData(g)):h.push({value:l,label:l})}else"select"!==e&&(g=a.find(f).filter(function(){return"option"===f?this.selected:"li"===f?!0===this.getAttribute("oj-data-selected"):void 0}),d.each2(g,function(a,b){h.push(c._optionToData(b))}));b(h)}}else"options"in a&&(b.isFunction(a.options)?a.initSelection=function(e,f){var h=function m(c,d){for(var e=[],f=0,g=c.length;f<g;f++){var h=c[f];if(a.indexOf.call(c,h)>=0&&e.push(h),h.children){var i=m(h.children,d);i&&i.length&&b.merge(e,i)}}return e},i=c.getVal(),j=[],k=d.getLastQueryResult(c);k&&(j=h(k,i));var l=function(){for(var a=[],b=0;b<i.length;b++){for(var d=i[b],e=!1,h=0;h<j.length;h++){var k=j[h];if((0,g["default"])(d)===(0,g["default"])(k)){a.push(k),j.splice(h,1),e=!0;break}}if(!e){var l=c.currentItem;if(l&&l.length)for(var m=0;m<l.length;m++)if((0,g["default"])(d)===(0,g["default"])(l[m])){a.push(l[m]),e=!0;break}e||a.push(d)}}f(a)};c.valueChangeTrigger?l():a.query({value:i,callback:function(a){if(a&&a.results){var c=h(a.results,i);c&&c.length&&b.merge(j,c)}l()}})}:a.initSelection=a.initSelection||function(d,e){var f=c.getVal(),h=[];a.query({matcher:function(a,c,d){var e=b.grep(f,function(a){return(0,g["default"])(a)===(0,g["default"])(d)}).length;return e&&h.push(d),e},callback:b.isFunction(e)?function(){for(var a=[],b=0;b<f.length;b++){for(var c=f[b],d=!1,i=0;i<h.length;i++){var j=h[i];if((0,g["default"])(c)===(0,g["default"])(j)){a.push(j),h.splice(i,1),d=!0;break}}d||a.push(c)}e(a)}:b.noop})});return a},_selectChoice:function(a){var b=this.container.find("."+this._classNm+"-selected-choice.oj-focus");b.length&&a&&a[0]==b[0]||(b.length&&this.opts.element.trigger("choice-deselected",b),b.removeClass("oj-focus"),a&&a.length&&(this.close(),a.addClass("oj-focus"),this.container.find("."+this._classNm+"-description").text(a.attr("valueText")+". Press back space to delete.").attr("aria-live","assertive"),this.opts.element.trigger("choice-selected",a)))},_destroy:function(){b("label[for='"+this.search.attr("id")+"']").attr("for",this.opts.element.attr("id")),j.superclass._destroy.apply(this,arguments)},_initContainer:function(){var a,c,e="."+this._classNm+"-choices",f=d.nextUid();this.searchContainer=this.container.find("."+this._classNm+"-search-field"),this.selection=a=this.container.find(e);var g=this;this.selection.on("click","."+this._classNm+"-selected-choice:not(."+this._classNm+"-locked)",function(a){g.search[0].focus(),g._selectChoice(b(this))}),c=b("label[for='"+this.opts.element.attr("id")+"']"),c.attr("id")||c.attr("id",this._classNm+"-label-"+f),a.find("."+this._classNm+"-input").attr("id",this._classNm+"-input-"+f),this.results.attr("id")||this.results.attr("id","oj-listbox-results-"+f),this.search.attr("aria-owns",this.results.attr("id")),this.search.attr("aria-labelledby",c.attr("id")),this.opts.element.attr("aria-labelledby",c.attr("id")),this.search.attr("id")&&c.attr("for",this.search.attr("id")),this.opts.element.attr("aria-label")&&this.search.attr("aria-label",this.opts.element.attr("aria-label")),this.opts.element.attr("aria-controls")&&this.search.attr("aria-controls",this.opts.element.attr("aria-controls")),this.search.attr("tabindex",this.elementTabIndex),this.keydowns=0,this.search.on("keydown",this._bind(function(b){if(this._isInterfaceEnabled()){++this.keydowns;var c=a.find("."+this._classNm+"-selected-choice.oj-focus"),e=c.prev("."+this._classNm+"-selected-choice:not(."+this._classNm+"-locked)"),f=c.next("."+this._classNm+"-selected-choice:not(."+this._classNm+"-locked)"),g=d.getCursorInfo(this.search);if(c.length&&(b.which==d.KEY.LEFT||b.which==d.KEY.RIGHT||b.which==d.KEY.BACKSPACE||b.which==d.KEY.DELETE||b.which==d.KEY.ENTER)){var h=c;return b.which==d.KEY.LEFT&&e.length?h=e:b.which==d.KEY.RIGHT?h=f.length?f:null:b.which===d.KEY.BACKSPACE?(this._unselect(c.first(),b),this.search.width(10),h=e.length?e:f):b.which==d.KEY.DELETE?(this._unselect(c.first(),b),this.search.width(10),h=f.length?f:null):b.which==d.KEY.ENTER&&(h=null),this._selectChoice(h),d.killEvent(b),void(h&&h.length||this.open())}if((b.which===d.KEY.BACKSPACE&&1==this.keydowns||b.which==d.KEY.LEFT)&&0==g.offset&&!g.length)return this._selectChoice(a.find("."+this._classNm+"-selected-choice:not(."+this._classNm+"-locked)").last()),void d.killEvent(b);if(this._selectChoice(null),this._opened())switch(b.which){case d.KEY.UP:case d.KEY.DOWN:return this._moveHighlight(b.which===d.KEY.UP?-1:1),void d.killEvent(b);case d.KEY.ENTER:return this._selectHighlighted(null,b),void d.killEvent(b);case d.KEY.TAB:return void this.close(b);case d.KEY.ESC:return this._cancel(b),void d.killEvent(b)}if(!(b.which===d.KEY.TAB||d.KEY.isControl(b)||d.KEY.isFunctionKey(b)||b.which===d.KEY.ESC||b.which===d.KEY.ENTER&&this.search.val()&&"ojcombobox"===this._elemNm))switch(b.which){case d.KEY.UP:case d.KEY.DOWN:return this.open(),void d.killEvent(b);case d.KEY.PAGE_UP:case d.KEY.PAGE_DOWN:case d.KEY.ENTER:return void d.killEvent(b)}}})),this.search.on("keyup",this._bind(function(a){this.keydowns=0})),this.search.on("blur keyup",this._bind(function(a){if("keyup"!==a.type||10===a.keyCode||13===a.keyCode){if(this.opts.manageNewEntry&&this.search.val()&&this.results.find(".oj-hover").length<=0){var b=this.opts.manageNewEntry(this.search.val()),c="blur"===a.type?d.ValueChangeTriggerTypes.BLUR:d.ValueChangeTriggerTypes.ENTER_PRESSED,e={trigger:c};this._onSelect(b,e,a)}this.search.removeClass(this._classNm+"-focused"),this.container.removeClass("oj-focus"),this._selectChoice(null),this._opened()||this._clearSearch(),a.stopImmediatePropagation()}})),this.container.on("click touchstart",e,this._bind(function(a){this._isInterfaceEnabled()&&(b(a.target).closest("."+this._classNm+"-selected-choice").length>0||(this._selectChoice(null),this._opened()?this.close(a):(this.open(),this._focusSearch()),a.preventDefault()))})),this.container.on("focus",e,this._bind(function(){this._isInterfaceEnabled()})),this._initContainerWidth(),this.opts.element.hide().attr("aria-hidden",!0),this._clearSearch()},_enableInterface:function(){j.superclass._enableInterface.apply(this,arguments)&&this.search.prop("disabled",!this._isInterfaceEnabled())},_initSelection:function(){var a=this.getVal();if(null!==a&&0!==a.length||"oj-select"!==this._classNm&&""!==this.opts.element.text()||(this._updateSelection([]),this.close(),this._clearSearch()),null!==a&&a.length){var b=this,c=this.opts.element;this.opts.initSelection.call(null,c,function(a){a!==undefined&&null!==a&&0!==a.length&&(b._updateSelection(a),b.close(),b._clearSearch())})}},_clearSearch:function(){var a=this._getPlaceholder(),b=this._getMaxSearchWidth(),c=this.getVal();a===undefined||c&&0!==c.length?(this.search.attr("placeholder",""),this.search.val("").width(10),this.searchContainer.width("auto")):(this.search.attr("placeholder",a),this.search.val("").width(b>0?b:this.container.css("width")),this.searchContainer.width("100%"))},_opening:function(a,b){this._resizeSearch(),j.superclass._opening.apply(this,arguments),this._focusSearch(),b||this._updateResults(!0),this.search.focus()},close:function(a){this._opened()&&j.superclass.close.apply(this,arguments)},_focus:function(){this.close(),this.search.focus()},_updateSelection:function(a){var c=[],d=[],e=this;b(a).each(function(){e.opts.indexOf.call(c,this)<0&&(c.push(this),d.push(this))}),a=d,this.selection.find("."+this._classNm+"-selected-choice").remove(),b(a).each(function(){e._addSelectedChoice(this)}),this.currentItem=a,this.opts.element.val(0===c.length?[]:c),e._postprocessResults(),setTimeout(function(){e._positionDropdown()},0)},_onSelect:function(a,c,d){if(this._triggerSelect(a)){var e,f=this;c&&c.trigger&&(e={optionMetadata:{trigger:c.trigger}});var g=this.getVal(),h=g?g.slice(0):[];b(a).each(function(){f.opts.indexOf.call(h,this)<0&&h.push(this)}),this.setVal(h,d,e),!this.select&&this.opts.closeOnSelect||this._postprocessResults(a,!1,!0===this.opts.closeOnSelect),this.opts.closeOnSelect&&(this.close(d),this.search.width(10)),c&&c.noFocus||this._focusSearch()}},_cancel:function(a){this.close(a),this._focusSearch()},_addSelectedChoice:function(a){var c,e=!a.locked,f=b("<li class='"+this._classNm+"-selected-choice'>\t<div></div>\t<a href='#' onclick='return false;' role='button' aria-label='remove' class='"+this._classNm+"-clear-entry \t  oj-component-icon oj-clickable-icon-nocontext "+this._classNm+"-clear-entry-icon' tabindex='-1'>\t</a></li>"),g=b("<li class='"+this._classNm+"-selected-choice "+this._classNm+"-locked'><div></div></li>"),h=e?f:g;this.id(a);c=this.opts.formatSelection(a),c!==undefined&&(h.find("div").addClass(this._classNm+"-selected-choice-label").text(c),h.find("."+this._classNm+"-clear-entry").attr("aria-label",c+" remove"),h.attr("valueText",c)),e&&h.find("."+this._classNm+"-clear-entry").on("mousedown",d.killEvent).on("click dblclick",this._bind(function(a){this._isInterfaceEnabled()&&(b(a.target).closest("."+this._classNm+"-selected-choice").fadeOut("fast",this._bind(function(){this._unselect(b(a.target),a),this.selection.find("."+this._classNm+"-selected-choice.oj-focus").removeClass("oj-focus"),this.close(a),this._focusSearch()})).dequeue(),d.killEvent(a))})),h.data(this._elemNm,a),h.insertBefore(this.searchContainer)},_unselect:function(a,b){var c,d,e=this.getVal(),f=e?e.slice(0):[],g=this;if(a=a.closest("."+this._classNm+"-selected-choice"),0===a.length)throw"Invalid argument: "+a+". Must be ."+this._classNm+"-selected-choice";if(c=a.data(this._elemNm)){for(;(d=g.opts.indexOf.call(f,c))>=0;)f.splice(d,1),this.setVal(f,b),this.select&&this._postprocessResults();this.ojContext._IsRequired()&&0===f.length||a.remove(),this.ojContext._IsRequired()&&this.ojContext.validate()}},_postprocessResults:function(a,b,c){var e=this.getVal(),f=e&&(this.opts.element.val()||this.ojContext.isValid())?e:[],g=this.results.find(".oj-listbox-result"),h=this;d.each2(g,function(a,b){var c=h.id(b.data(h._elemNm));f&&h.opts.indexOf.call(f,c)>=0&&(b.addClass("oj-selected"),b.find(".oj-listbox-result-selectable").addClass("oj-selected"))}),!g.filter(".oj-listbox-result:not(.oj-selected)").length>0&&this.close()},_getMaxSearchWidth:function(){return this.selection.width()-d.getSideBorderPadding(this.search)},_textWidth:function(a){var c=document.createElement("span"),d=document.createTextNode(a);c.style.display="none",c.appendChild(d),b("body").append(c);var e=b("body").find("span:last").width();return b("body").find("span:last").remove(),e},_resizeSearch:function(){var a,b,c,e,f,g=d.getSideBorderPadding(this.search);a=this._textWidth(this.search.val())+10,b=this.search.offset().left,c=this.selection.width(),e=this.selection.offset().left,f=c-(b-e)-g,f<a&&(f=c-g),f<40&&(f=c-g),f<=0&&(f=a),this.search.width(Math.floor(f))},setVal:function(a,b,c){var e=[],f=this;"string"==typeof a&&(a=d.splitVal(a,this.opts.separator));for(var g=0;g<a.length;g++)f.opts.indexOf.call(e,a[g])<0&&e.push(a[g]);var h={doValueChangeCheck:!1};c&&(h._context=c),this.opts.element.val(0!==a.length?a:null),this.ojContext._updateValue(e,b,h),this.search.attr("aria-activedescendant",this.opts.element.attr("id"))}}),k=d.clazz(j,{_elemNm:"ojidentity",_classNm:"oj-select",_createContainer:function(){return b(document.createElement("div")).attr({"class":"oj-identity oj-select oj-select-multi oj-component"}).html(["<div class='oj-identity-select'>","  <ul class='oj-select-choices'>","\t<li class='oj-select-search-field'>","\t  <input type='text' role='combobox' aria-expanded='false' aria-autocomplete='list' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='oj-listbox-input'>","\t<span class='oj-identity-loading-container oj-multi-loading'>","\t  <span class='oj-identity-loading' role='presentation'>","\t   &nbsp;</span>","\t</li>","  </ul>","</div>","<span class='oj-identity-filter multiple'></span>","<div class='oj-select-description oj-helper-hidden-accessible'/>","<div class='oj-listbox-drop oj-identity-container oj-listbox-drop-multi' style='display:none'>","   <ul class='oj-listbox-results' role='listbox'>","   </ul>","</div>"].join(""))}}),l=function(){var a=document.documentElement.getAttribute("dir");return a&&(a=a.toLowerCase()),"rtl"===a?"rtl":"ltr"},m=function(){var a=20;if(b.isNumeric(a))return a;var c=b("<div />");b(document.body).append(c),c.width(50).height(50).css({overflow:"scroll",visibility:"hidden",position:"absolute"});var d=b("<div />");d.height(1),c.append(d);var e=d.width(),f=c.width();return c.remove(),a=f-e}(),n=function(a,c){function d(a,b){if(a.bottom-b.top<-1)return!1;var c="auto"===b.overflowY||"scroll"===b.overflowY?m:0;return!(b.bottom-c-a.top<1)&&(c="auto"!==b.overflowX&&"scroll"!==b.overflowX||"rtl"!==l()?0:m,!(a.right-(b.left+c)<-1)&&(c="auto"!==b.overflowX&&"scroll"!==b.overflowX||"ltr"!==l()?0:m,!(a.left-(b.right-c)>-1)))}function e(a){var c=a[0];if(1===c.nodeType){var d=c.getBoundingClientRect();return d.overflowX=a.css("overflow-x"),d.overflowY=a.css("overflow-y"),d}if(b.isWindow(c)){var d={width:c.innerWidth,height:c.innerHeight,top:0,bottom:c.innerHeight,left:0,right:c.innerWidth};return d}return{height:0,width:0}}if(!a)return!1;var f=e(a);if(c&&!d(f,e(b(window))))return!1;for(var g=!0,h=a.parent();g&&h&&h.length>0&&1===h[0].nodeType;){if(function(a){return"visible"!==a.css("overflow-x")||"visible"!==a.css("overflow-y")}(h)){var i=e(h);i.height>0&&i.width>0&&(g=d(f,i))}h=h.parent()}return g},o=function(a){if(a.target&&a.target.height>0&&a.target.width>0){var b=a.target.element;return!n(b)}return!1},p=function(a,c){for(var d=b.extend({},a),e=0;e<q.length;e++){var f=q[e],g=d[f];g&&(d[f]=g.replace("start",c?"right":"left").replace("end",c?"left":"right").replace("<",c?"+":"-").replace(">",c?"-":"+"))}return d},q=["my","at"],r={defaultElement:"<select>",widgetEventPrefix:"oj",options:{minimumResultsForSearch:10,noMatchesFound:"No matches found",placeholder:null,list:undefined,required:!1,multiple:!0,options:null,optionsKeys:{label:"id",value:"id"},beforeExpand:null,selectAll:!0,selectLabel:"Select All",defaultScope:["user"],showScopeFilter:!1,scopesOptions:[{label:"User",value:"user"},{label:"Group",value:"group"},{label:"Role",value:"role"}],indexOf:function(a){if(!a)return-1;var b=this.length,c=0;for(a=(0,g["default"])(a);c<b;c++){if((0,g["default"])(this[c])===a)return c}return-1},contains:function(a){if(!a)return!1;for(var b=a.length,c=this.length,d=0,e=0,f=0;d<c;d++){var h=(0,g["default"])(this[d]);for(e=0;e<b;e++){if(h===(0,g["default"])(a[e])){++f;break}}}return f===c}},widget:function(){return this.select?this.select.container:this.element.parent()},_ComponentCreate:function(){this._super(),this._setup()},_nativeSetDisabled:function(a){a?(this.element.attr("disabled",""),this.element.parent().addClass("oj-disabled").removeClass("oj-enabled")):(this.element.removeAttr("disabled"),this.element.parent().removeClass("oj-disabled").addClass("oj-enabled"))},_nativeChangeHandler:function(a){},_jetSetup:function(){var a={},c=this.options.multiple;a.element=this.element,a.ojContext=this,a=b.extend(this.options,a),b.isArray(a.defaultScope)||(a.defaultScope=[a.defaultScope]),this.select=c?new k:new i,this.select._init(a);var d=this.select.opts;this.select.container.addClass("oj-select-jet oj-form-control"),this.element.val=function(a){return arguments.length&&(d.value=a),d.value||[]}},_setup:function(){this._jetSetup()},refresh:function(){this._super(),this._cleanup(),this._setup()},_destroy:function(){this._super(),this._cleanup()},_NotifyDetached:function(){this.select.close()},_NotifyHidden:function(){this.select.close()},_SetPlaceholder:function(a){},_updateValue:function(a,c,d){c&&(d._context=d._context||{},b.extend(!0,d._context,{optionMetadata:{trigger:"option_selected",writeback:"shouldWrite"},originalEvent:c.originalEvent||c}),this.valueUpdated=!0,this.option({value:a},d),this.select._initSelection()),this._IsRequired()&&0!==a.length&&(this.select.container.removeClass("oj-invalid"),this.select.container.find(".oj-messaging-inline-container").remove())},_SetPlaceholderOption:function(a){this._super(a)},_HasPlaceholderSet:function(){return"string"==typeof this.options.placeholder},_IsRequired:function(){return this.options.required},_ClearPlaceholder:function(){this._SetPlaceholderOption(null),this._SetPlaceholder(null)},_InitOptions:function(b,c){var e=[{attribute:"disabled",validateOption:!0},{attribute:"placeholder"},{attribute:"required",coerceDomValue:!0,validateOption:!0},{attribute:"title"}];if(this._super(b,c),a.EditableValueUtils.initializeOptionsFromDom(e,c,this),this.options.value===undefined)this.options.value=this.element.attr("value")!==undefined?d.splitVal(this.element.val(),","):null;else{var f=this.options.value;Array.isArray(f)&&(f=f.slice(0)),this.options.value=f}},_SetDisplayValue:function(a){this.element.val(a)},_GetDisplayValue:function(){return this.element.val()},_updateDisplayValue:function(){this.valueUpdated?this.valueUpdated=!1:this.select._initSelection()},_setOption:function(a,c,d){if("value"===a){var e=this.select.opts.element;c||(c=[]),Array.isArray(c)||(c=[c]);for(var f=[],g=0;g<c.length;g++)(this.options.multiple||this.select.opts.validate(e,c[g]))&&f.push(c[g]);return this._super(a,f,d),void this._updateDisplayValue()}"placeholder"===a?(this.select.opts.placeholder=c||null,this.select._setPlaceholder()):"minimumResultsForSearch"===a?this.select.opts.minimumResultsForSearch=c:"multiple"===a?(this.options.multiple=c,this.refresh()):"defaultScope"===a?(c?b.isArray(c)||(c=[c]):c=["user"],this.options.defaultScope=c,this.refresh()):"optionsKeys"===a?(this.options.optionsKeys=c,this.refresh()):"options"===a&&(this.options.options=c,this.refresh()),"disabled"===a?(c?this.select._disable():this.select._enable(),this.options.disabled=!!c):"options"===a?(this.select.opts.options=c,this.select.opts=this.select._prepareOpts(this.select.opts),this._super("value",this.select.getVal())):this._super(a,c,d)},_getDropdown:function(){if(this.select&&this.select._opened()){var a=this.select.dropdown;if(a&&a.attr("data-oj-containerid")===this.select.containerId)return a}return null},_cleanup:function(){this.select._destroy(),this.select=undefined},getNodeBySubId:function(a){var c,d=null;if(null==a){var e=this.widget();return e?e[0]:null}if(this._isNative())return null;if(!(d=this._super(a))){var f=this._getDropdown();switch(c=a.subId){case"oj-select-drop":f&&(d=f[0]);break;case"oj-select-results":f&&(d=f.find(".oj-listbox-results")[0]);break;case"oj-select-search":f&&(d=f.find(".oj-listbox-search")[0]);break;case"oj-select-input":case"oj-listbox-input":!0===this.options.multiple?d=this.widget().find(".oj-listbox-input")[0]:f&&(d=f.find(".oj-listbox-input")[0]);break;case"oj-select-choice":case"oj-select-chosen":case"oj-select-arrow":d=this.widget().find("."+c)[0];break;case"oj-listitem":if(f){var g=f.find(".oj-listbox-result");d=this.select._findItem(g,a.value)}break;case"oj-select-remove":var h=this.widget().find(".oj-select-selected-choice"),i=this.select._findItem(h,a.value);d=i?b(i).find(".oj-select-clear-entry-icon")[0]:null;break;case"oj-listbox-result-label":if(f){var j=b("#"+this.select.results.attr("id")).children(),k=a.index;j.length&&k<j.length&&(d=j.eq(k).find("."+c)[0])}}}return d||null},getSubIdByNode:function(a){if(this._isNative())return this._super(a);var c=null;if(null!=a){var d=b(a);d.hasClass("oj-listbox-input")?c={subId:"oj-select-input"}:d.hasClass("oj-select-arrow")?c={subId:"oj-select-arrow"}:d.hasClass("oj-listbox-result")?c={subId:"oj-listitem",value:d.data("ojidentity").value}:d.hasClass("oj-select-clear-entry-icon")&&(c={subId:"oj-select-remove",value:d.closest(".oj-select-selected-choice").data("ojidentity").value})}return c},_GetDefaultStyleClass:function(){return"oj-select"},_GetMessagingLauncherElement:function(){return this.select?this.select.selection:this.element}};!function(a,c,d,e){if(b.widget(a,c,d),e){var f=a.split(".")[1];delete b.fn[f]}if("oj.oj"===a.substring(0,5)||"oj._oj"===a.substring(0,6))var g=a.split(".");var h,i=g[0],j=g[1],k=i+"-"+j,l="_"===j.substring(0,1);h=l?"_"+i+"-"+j.substring(3):i+"-"+j.substring(2),b.expr[":"][h.toLowerCase()]=function(a){return!!b.data(a,k)}}("oj.ojIdentity",b.oj.editableValue,r)}.apply(b,d))!==undefined&&(a.exports=e)}.apply(b,d))!==undefined&&(a.exports=e)},jquery:function(b,c){b.exports=a},"ojs/ojcore":function(a,c){a.exports=b},"ojs/ojeditablevalue":function(a,b){a.exports=c}})});
/**
 * Created by rojv on 9/23/2016.
 */

define('pcs/identityBrowser/viewModel/IdentityViewModel',['knockout', 'pcs/identityBrowser/viewModel/IdentityService','ojidentity', 'ojL10n!pcs/resources/nls/pcsSnippetsResource'], function(ko, IdentityService) {
    'use strict';

    function IdentityViewModel(params) {
        var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

        //Set the resourcebundle
        self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');
        self.service = new IdentityService();
        //self.value = ko.observableArray([]); //ko observable array
        self.value = params.hasOwnProperty('value') ? params.value : ko.observableArray([]); //ko observable array
		self.valueSubscription = self.value.subscribe(function(value) {
            self.service.setSelectedIdentities(value);
        });
        self.multiple = params.hasOwnProperty('multiple') && ko.utils.unwrapObservable(params.multiple) === true;
        self.scope = (params.hasOwnProperty('scope') ? ko.utils.unwrapObservable(params.scope) : 'user');
        if(!self.scope){
        	self.scope = 'all';
		}
        self.placeholder = (params.hasOwnProperty('placehoderTxt') ? ko.utils.unwrapObservable(params.placehoderTxt) : self.bundle.pcs.idBrowser.placeholderTxt);
        self.idbID = (params.hasOwnProperty('idbID') ? ko.utils.unwrapObservable(params.idbID) : 'identityBrowser');
		self.selectLabel = params.hasOwnProperty('selectLabel') ? params.selectLabel : 'Select All';

		/**
		 * method to clean up everything
		 */
		self.dispose = function() {
			loggerUtil.log('dispose in IVM');
			self.valueSubscription.dispose();

			// clean up the events
		};
    }

    IdentityViewModel.prototype = {
        //set the default selected Identities
        setValue: function(value) {
            this.value(value);
        },
        getValue: function() {
            return this.service.getSelectedIdentities();
        },
        getUserIDs: function() {
            var values = this.service.getSelectedIdentities();
            return values.map(function(item) {
                return item.id;
            });
        },
        getUserTypes: function() {
            var values = this.service.getSelectedIdentities();
            return values.map(function(item) {
                return item.type;
            });
        },
        //this will return promise that will resolve to list of identities
        getIdentities: function(params) {
            return this.service.restCall(params);
        },
        getIdentityIndex: function(identities, identity) {
            if (!Array.isArray(identities)) {
                throw 'argument type in not array';
            }
            if (!identity) {
                return -1;
            }

            var arrLen = identities.length;
            var i = 0;
            var childElem = JSON.stringify(identity);

            for (; i < arrLen; i++) {
                // fastest way.
                // will fail if the object keys are unordered with comparing one
                var parentElem = JSON.stringify(identities[i]);

                if (parentElem === childElem) {
                    return i;
                }
            }
            return -1;
        }
    };

    return IdentityViewModel;

});

/**
 * Created by srayker on 05/23/2016.
 */

requirejs.config(
	{
		shim: {
			'pcs/identityBrowser/viewModel/IdentityViewModel': {
				deps: ['pcs/config/debug-config']
			}
		}
	}
);


define('pcs/identityBrowser/loader',['ojs/ojcore', 'knockout', '!text!pcs/identityBrowser/view/idBrowser.html', 'pcs/identityBrowser/viewModel/IdentityViewModel'],

    function(oj, ko, view, viewModel) {
        'use strict';
        // oj.Composite.register('pcs-idBrowser', {
        //     view: {
        //         inline: view
        //     },
        //     viewModel: {
        //         inline: viewModel
        //     },
        //     metadata: {
        //         inline: JSON.parse(metadata)
        //     }
        // });

		var loggerUtil =  require('pcs/util/loggerUtil');

        if (!ko.components.isRegistered('pcs-identity-browser')) {
            ko.components.register('pcs-identity-browser', {
                template: view,
                viewModel: {
                    createViewModel: function(params, componentInfo) {
                        return new viewModel(params, componentInfo);
                    }
                }
            });
            loggerUtil.log('pcs-idBrowser registered');
        }
    }
);

/**
 * Created by srayker on 05/23/2016.
 */




define('pcs/pcs.identitybrowser',['ojs/ojcore', 'knockout', 'jquery', 'ojL10n!pcs/resources/nls/pcsSnippetsResource',
        'ojs/ojknockout',
        'pcs/identityBrowser/loader','pcs/util/loggerUtil'
    ],

    function(oj) {
        'use strict';
		//loggerUtil.log('loaded identity browser file');
    }
);


//# sourceMappingURL=pcs.identitybrowser.js.map