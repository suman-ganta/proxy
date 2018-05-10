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


define('text!pcs/conversation/templates/pcs-conversation.html',[],function () { return '<div id="pcs-conv-mainContainer" class="oj-row oj-panel">\n\n    <div id="pcs-conv-error-msg-container" style="display: none">\n        <span class="oj-component-icon oj-message-status-icon oj-message-error-icon" role="img"\n              id="pcs-conv-error-msg-icon" style="float: left ;margin-right:10px" ></span>\n        <pre id="pcs-conv-error-msg" class="pcs-conv-error-msg"></pre>\n    </div>\n\n    <div id="pcs-conv-loading-msg" style="display: none"></div>\n\n    <div class="pcs-conv-applink-container" style="margin:20px">\n\n        <div class="oj-sm-12 pcs-common-center-align" id="pcs-conv-loading">\n            <div class="pcs-common-center-align pcs-common-loading"/>\n        </div>\n\n        <iframe src="about:blank" frameborder="0"\n                scrolling="no" id="pcs-conv-applink" name="if1"\n                style="width:100%;  height:50px;" seamless="seamless">\n            &lt;/div&gt;&lt;/div&gt;&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;\n        </iframe>\n    </div>\n</div>\n';});

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

/**
 * Created by nisabhar on 8/26/2016.
 */

define('pcs/conversation/services/conversationDataService',['jquery', 'pcs/util/pcsUtil'],
    function($, pcsUtil) {
        'use strict';

        function ConversationDataService() {
            var self = this;

            self.paths = {
                'tasksConversations': 'tasks/{taskId}/conversations',
                'processConversations': 'processes/{processId}/conversations',
                'loggedInUser': 'identities/loggedInUser'
            };

			//callback to set authorization request header for every call
			var beforeRequestCallback = function(xhr) {
				pcsUtil.beforeRequestCallback(xhr,pcsUtil);
			};

            // wrapper function for HTTP GET
            var doGet = function(url) {

                return $.ajax({
                    type: 'GET',
                    url: url,
                    beforeSend:beforeRequestCallback,
                    xhrFields: {
                        withCredentials: true
                    },
                    contentType: 'application/json',
                    dataType: 'json'
                });
            };

            self.getConversations = function(mode, id) {
                var serverPath;
                if (mode === 'task') {
                    serverPath = pcsUtil.getRestURL() + self.paths.tasksConversations.replace('{taskId}', id);
                } else if (mode === 'process') {
                    serverPath = pcsUtil.getRestURL() + self.paths.processConversations.replace('{processId}', id);
                }
                return doGet(serverPath);
            };

            self.getAppLink = function(link) {
                return doGet(link);
            };

            self.getLoggedInUser = function() {
                var serverPath = pcsUtil.getRestURL() + self.paths.loggedInUser;
                return doGet(serverPath);
            };

        }

        return new ConversationDataService();
    }
);

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
 * Created by nisabhar on 8/26/2016.
 */

define('pcs/conversation/viewModel/conversationContainer',['knockout', 'pcs/conversation/services/conversationDataService',
        'pcs/util/pcsUtil', 'ojL10n!pcs/resources/nls/pcsSnippetsResource'
    ],
    function(ko, services, pcsUtil) {
        'use strict';
        /**
         * The view model for the main content view template
         */
        function ConversationContainer(params) {
            var self = this;

			var loggerUtil =  require('pcs/util/loggerUtil');

            //Set the resourcebundle
            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

            //all the data passed to the container
            self.data = params.data;

            //the jquery element where the widget is pushed, all the selectors will work in context of this element
            self.rootElement = self.data.rootElement;

            function loadOSNAppLink(appLink, user) {
                var parsedAppLink = JSON.parse(appLink); //extractOSNInfo(appLink);
                var appLinkURL = parsedAppLink.appLinkURL;
                var converstationDetail = appLinkURL.substring(appLinkURL.indexOf('/conversations'), appLinkURL.length);
                var token = parsedAppLink.accessToken;
                //var cListURL = 'https://socialnetwork71482-lab5osndoc10081pr1-social.vfarm.oraclecorp.com/osn/web/cList?hide=navMenu+sidebar+fullView+search+uploadAndCopy+documents+help';
                var cListURL = appLinkURL.substring(0, appLinkURL.indexOf('/conversations')) + '?hide=navMenu+sidebar+fullView+search+uploadAndCopy+documents+help';
                $('#pcs-conv-applink', self.rootElement)[0].src = 'about:blank';
                $('#pcs-conv-applink', self.rootElement).hide();

                var iframeReady = $.Deferred();

                iframeReady.done(function() {
                    $(window).one('message', function(event) {
                        var evt = event;

                        if (evt.originalEvent.data.message === 'navigate-ack') {
                            loggerUtil.log('Event message received::' + evt.originalEvent.data.message);
                            //Hide loading
                            $('#pcs-conv-loading', self.rootElement).hide();
                            $('#pcs-conv-loading-msg', self.rootElement).hide();

                            $('#pcs-conv-applink', self.rootElement).css('height', '500px').show();
                        } else {
                            loggerUtil.log('OOPS - stray postMessage caused listener to stop; retry last action');
                        }
                    });

                    var message = {
                        message: 'navigate',
                        path: converstationDetail,
                        accessToken: token,
                        highlight: user
                    };
                    loggerUtil.log('Posting message: ' + message);
                    $('#pcs-conv-applink', self.rootElement)[0].contentWindow.postMessage(message, '*');
                });


                if (!$('#pcs-conv-applink', self.rootElement)[0].src || ($('#pcs-conv-applink', self.rootElement)[0].src === 'about:blank')) {
                    // eventHandler.addHandler(window,'message',tryMe);
                    $(window).one('message', function(event) {
                        var evt = event;

                        if (evt.originalEvent.data.status === 'listening') {
                            loggerUtil.log('Event Message:' + evt.originalEvent.data.status);
                            iframeReady.resolve();
                        } else {
                            loggerUtil.log('OOPS - stray postMessage caused listener to stop; reload');
                        }
                    });
                    $('#pcs-conv-applink', self.rootElement)[0].src = cListURL;

                    var msg = self.bundle.pcs.conversation.docs_wait;
                    $('#pcs-conv-loading-msg', self.rootElement).text(msg).show();



                } else {
                    iframeReady.resolve();
                }
            }

            // Error handler method for the plugin
            self.ajaxErrorHandler = function(jqXHR, customMsg) {
                var msg;
                if (jqXHR && jqXHR.status === 0) {
                    msg = self.bundle.pcs.common.server_not_reachable;
                }
                if (jqXHR && (jqXHR.status === 500 || jqXHR.status === 401 || jqXHR.status === 404)) {
                    msg = self.bundle.pcs.common.internal_server_err;
                }

                if (msg === undefined || msg === '') {
                    msg = customMsg;
                }

                $('#pcs-conv-error-msg', self.rootElement).text(msg);
                $('#pcs-conv-error-msg-container', self.rootElement).show();

                //Hide loading
                $('#pcs-conv-loading', self.rootElement).hide();
            };


            // Method to load the conversations
            self.initConversation = function() {

                if (self.data.mode === 'task') {
                    // Get the Conversation list
                    services.getConversations(self.data.mode, self.data.id).done(
                        function(data) {
                            // Read the conversation List
                            if (data && data.conversationInstanceList && data.conversationInstanceList.length > 0) {

                                //TODO :-  For this release we ahve 1 conversation per task.
                                var link = data.conversationInstanceList[0].links[0].href;

                                //get the access token
                                services.getAppLink(link).done(
                                    function(data) {
                                        if (data && data.appLink) {
                                            var applink = data.appLink;
                                            //Get the logged in user
                                            services.getLoggedInUser().done(
                                                function(data) {
                                                    if (data && data.id) {
                                                        loadOSNAppLink(applink, data.id);
                                                    } else {
                                                        var customMsg = self.bundle.pcs.conversation.user_fetch_error;
                                                        self.ajaxErrorHandler(undefined, customMsg);
                                                    }
                                                    self.rootElement.trigger('conversations:loaded');
                                                }
                                            ).fail(
                                                function(jqXHR, textStatus, errorThrown) {
                                                    var customMsg = self.bundle.pcs.conversation.user_fetch_error;
                                                    self.ajaxErrorHandler(jqXHR, customMsg);
                                                    self.rootElement.trigger('conversations:loaded');
                                                }
                                            );
                                        } else {
                                            var customMsg = self.bundle.pcs.conversation.conv_connection_error;
                                            self.ajaxErrorHandler(undefined, customMsg);
                                            self.rootElement.trigger('conversations:loaded');
                                        }
                                    }
                                ).fail(
                                    function(jqXHR, textStatus, errorThrown) {
                                        var customMsg = self.bundle.pcs.conversation.conv_connection_error;
                                        self.ajaxErrorHandler(jqXHR, customMsg);
                                        self.rootElement.trigger('conversations:loaded');
                                    }
                                );
                            } else {
                                var customMsg = self.bundle.pcs.conversation.no_conversation;
                                self.ajaxErrorHandler(undefined, customMsg);
                                self.rootElement.trigger('conversations:loaded');
                            }
                        }
                    ).fail(
                        function(jqXHR, textStatus, errorThrown) {
                            var customMsg = self.bundle.pcs.conversation.conv_load_error;
                            self.ajaxErrorHandler(jqXHR, customMsg);
                            self.rootElement.trigger('conversations:loaded');
                        }
                    );
                } else if (self.data.mode === 'process') {
                    //ToDO : Add process logic
                } else {
                    var customMsg = self.bundle.pcs.conversation.conv_mode_error;
                    self.ajaxErrorHandler(undefined, customMsg);
                }
            };

            self.clearOSNFrame = function(event) {
                $('#pcs-conv-applink', self.rootElement)[0].src = 'about:blank';
                loggerUtil.log('Conversation iframe src set to aboutb:blank');
            };


			/**
			 * method to clean up everything
			 */
			self.dispose = function() {
				loggerUtil.log('dispose in conversation Containor');
				self.clearOSNFrame();
				// clean up the events
			};

            //Load the conversation
            self.initConversation();
        }

        return ConversationContainer;
    });


define('text!pcs/conversation/templates/pcs-conversation-error.html',[],function () { return '<div class="oj-message oj-message-error">\n    <span class="oj-component-icon oj-message-status-icon oj-message-error-icon"\n          role="img">\n    </span>\n    <span class="oj-message-content">\n        <div class="oj-message-summary">\n            Required parameters are missing\n        </div>\n        <div class="oj-message-detail">\n            <span>This component requires these values -</span>\n            <pre>\n    *id : \'\'\n    </pre>\n        </div>\n    </span>\n</div>\n';});

/**
 * Created by nisabhar on 8/26/2016.
 */

define('pcs/pcs.conversation',['ojs/ojcore', 'knockout', 'jquery', '!text!pcs/conversation/templates/pcs-conversation.html',
        'pcs/conversation/viewModel/conversationContainer', '!text!pcs/conversation/templates/pcs-conversation-error.html',
        'ojL10n!pcs/resources/nls/pcsSnippetsResource', 'pcs/util/loggerUtil','jqueryui-amd/widget'
    ],
    function(oj, ko, $, tmpl, conversation, errortmpl, bundle,loggerUtil) {
        'use strict';
        // define your widget under pcs namespace
        $.widget('pcs.conversation', {

            //Options to be used as defaults
            options: {
                //Mode for task or process
                mode: 'task',
                id: '',
            },


            // Check if the Required options are provided to the widget
            _isValid: function() {
                if (this.options.id === undefined || this.options.id === '' ||
                    this.options.mode === undefined || this.options.mode === '') {
                    return false;
                }
                if (this.options.mode.toLowerCase() === 'task' || this.options.mode.toLowerCase() === 'process') {
                    return true;
                }
                return false;
            },

            _create: function() {
                // _create will automatically run the first time
                // this widget is called. Put the initial widget
                // setup code here, then you can access the element
                // on which the widget was called via this.element.
                // The options defined above can be accessed
                // via this.options this.element.addStuff();
                var widget = this;

                // Check if PCSConenction is set
                if ($.pcsConnection === undefined) {
                    this.element.html('<div style=\'color:red\'>' + bundle.pcs.common.pcs_connection + ' </div>');
                    return;
                }

                // check if the the plugin is initialized correctly
                if (!this._isValid()) {
                    this.element.html(errortmpl);
                    return;
                }


                var data = this.options;
                data.rootElement = widget.element;

                var params = {
                    data: data
                };

                this.element.html(tmpl);
                var vm = new conversation(params);
                this.model = vm;

                //ko.cleanNode(this.element['0']);
                ko.applyBindings(vm, this.element['0']);
            },

            // Destroy an instantiated plugin and clean up modifications
            // that the widget has made to the DOM
            destroy: function() {
                //t his.element.removeStuff();
                // For UI 1.8, destroy must be invoked from the base
                // widget
                $.Widget.prototype.destroy.call(this);
                // For UI 1.9, define _destroy instead and don't worry
                // about calling the base widget
            },

			_destroy: function (){
				loggerUtil.log('Destroying conversation');
				// clean everything up
				if (this.model) {
					this.model.dispose();
				}
			},

            // Respond to any changes the user makes to the option method
            _setOption: function(key, value) {
                this.options[key] = value;

                // For UI 1.8, _setOption must be manually invoked
                // from the base widget
                $.Widget.prototype._setOption.apply(this, arguments);
                // For UI 1.9 the _super method can be used instead
                // this._super( '_setOption', key, value );
            }
        });
    });


//# sourceMappingURL=pcs.conversation.js.map