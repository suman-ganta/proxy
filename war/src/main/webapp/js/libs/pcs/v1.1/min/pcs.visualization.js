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


define('text!pcs/charts/visualization/templates/pcs-visualization.html',[],function () { return '<div id="bpm-vis-mainContainer">\n\t<div  class="oj-row bpm-vis-center-align">\n\t\t<div id="bpm-vis-loading-indicator" class="bpm-vis-center-align bpm-vis-loading"/>\n\t</div>\n\t<div class="oj-row">\n\t\t<div class="oj-xl-12 oj-lg-12 oj-md-12 oj-col">\n\t\t\t<div id="visualizationContainer" data-bind="ojModule: { name: \'pcs/charts/visualization/viewModel/visualizationContainer\', viewName: \'pcs/charts/visualization/view/visualizationContainer\',\n\t\t\t\tparams: {parent: $data}}"></div>\n\t\t</div>\n\t</div>\n</div>\n';});

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

/*
 RequireJS i18n 2.0.2 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/requirejs/i18n for details
*/
(function(){function s(a,b,d,h,g,e){b[a]||(a=a.replace(/^zh-(Hans|Hant)-([^-]+)$/,"zh-$2"));return b[a]?(d.push(a),!0!==b[a]&&1!==b[a]||h.push(g+a+"/"+e),!0):!1}function B(a){var b=a.toLowerCase().split(/-|_/);a=[b[0]];var d=1,h;for(h=1;h<b.length;h++){var g=b[h],e=g.length;if(1==e)break;switch(d){case 1:if(d=2,4==e){a.push(g.charAt(0).toUpperCase()+g.slice(1));break}case 2:d=3;a.push(g.toUpperCase());break;default:a.push(g)}}if(!("zh"!=a[0]||1<a.length&&4==a[1].length)){b="Hans";d=1<a.length?a[1]:
null;if("TW"===d||"MO"===d||"HK"===d)b="Hant";a.splice(1,0,b)}return a}function w(a,b){for(var d in b)b.hasOwnProperty(d)&&(null==a[d]?a[d]=b[d]:"object"===typeof b[d]&&"object"===typeof a[d]&&w(a[d],b[d]))}var x=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;define('ojL10n',["module"],function(a){var b=a.config?a.config():{};return{version:"2.0.1+",load:function(a,h,g,e){e=e||{};e.locale&&(b.locale=e.locale);var c=x.exec(a),n=c[1],f,p=c[5],q,k=[],t={},y,r="",z,A,l,u,v,m;c[5]?(n=c[1],a=n+p,f=c[4]):(p=c[4],f=b.locale,
"undefined"!==typeof document?(f||(f=e.isBuild?"root":document.documentElement.lang)||(f=void 0===navigator?"root":navigator.language||navigator.userLanguage||"root"),b.locale=f):f="root");q=B(f);z=b.noOverlay;A=b.defaultNoOverlayLocale;if(c=b.merge)if(l=c[n+p])c=x.exec(l),u=c[1],v=c[4];m=[];for(c=0;c<q.length;c++)y=q[c],r+=(r?"-":"")+y,m.push(r);e.isBuild?(k.push(a),l&&k.push(l),h(k,function(){g()})):("query"==b.includeLocale&&(a=h.toUrl(a+".js"),a+=(-1===a.indexOf("?")?"?":"&")+"loc="+f),e=[a],
l&&e.push(l),h(e,function(a,b){var d=[],c=function(a,b,c){for(var e=z||!0===a.__noOverlay,h=A||a.__defaultNoOverlayLocale,g=!1,f=m.length-1;0<=f&&(!g||!e);f--)g=s(m[f],a,d,k,b,c);f=1===m.length&&"root"===m[0];e&&(f||!g)&&h&&s(h,a,d,k,b,c);f||s("root",a,d,k,b,c)};c(a,n,p);var e=d.length;b&&c(b,u,v);h(k,function(){var c=function(a,b,c,e,f){for(;b<c&&d[b];b++){var g=d[b],k=a[g];if(!0===k||1===k)k=h(e+g+"/"+f);w(t,k)}};c(b,e,d.length,u,v);c(a,0,e,n,p);t._ojLocale_=q.join("-");g(t)})}))}}})})();

define('pcs/resources/nls/dashboardResource',{root:!0,de:!0,es:!0,fr:!0,it:!0,ja:!0,ko:!0,pt:!0,"zh-Hans":!0,"zh-Hant":!0});

/**
 * Created by nisabhar on 11/20/2015.
 */

/**
 * Created by nisabhar on 6/30/2015.
 */


define('pcs/charts/visualization/viewModel/util/visualizationUtil',['jquery', 'knockout', 'ojL10n!pcs/resources/nls/dashboardResource'], function ($, ko, bundle) {


	var _columnAlias = function(data) {
		if (data.columnsInfo) {
			var ret = {};
			var i;
			for (i = 0; i < data.columnsInfo.length; i++) {
				ret[data.columnsInfo[i].columnName.replace("TASK","PROCESS")] = i;
			}
			return ret;
		}
	};

	var _adfProxyCall = function(url){
		// Let the container handle if container is willing to
		if (typeof doADFProxyCall == 'function') {
			doADFProxyCall(url);
		}
		// else handle ourself
		else{
			if(url) {
				window.location.assign(url);
			}
		}
	};

	var _errorHandler = function (jqXHR, customMsg){
		$("#bpm-dsb-error-dialog").ojDialog("open");

		var msg = bundle.container.generic_error_msg;

		if(customMsg){
			msg = customMsg;
		}

		else if (jqXHR && jqXHR.status === 401){
			msg= bundle.container.access_error_msg;
		}

		$("#bpm-dsb-error-dialog-custom-text").text(msg);

	};


	var _constants ={
		queries : {
			//Custom
			APPLICATION_LIST : "PROCESS_LABEL_LIST"
		},
		dataType : {
			TIMESTAMP : 'TIMESTAMP',
			DATETIME : 'DATETIME',
			INT : 'INT'
		},
		misc : {
			ANY : 'ANY',
			ALL : 'ALL',
			VALUE : 'value',
			VISIBLE : 'visible'
		},
		chartType :{
			BAR : 'bar',
			LINE:'line',
			AREA :'area',
			PIE:'pie',
			LINEWITHAREA:'lineWithArea',
			FUNNEL:'funnel',
			COMBO :'combo'
		},
		columnTypes : {
			ATTRIBUTE : 'ATTRIBUTE',
			DIMENSION : 'DIMENSION',
			MEASURE : 'MEASURE'
		},
		dataSource :{
			PROCESS :'PROCESS',
			ACTIVITY:'ACTIVITY',
			TASK:'TASK',
			ASSIGNMENT:'ASSIGNMENT'
		},
		functionList :{
			SUM:'SUM',
			COUNT:'COUNT',
			AVG:'AVG',
			MIN:'MIN',
			MEDIAN:'MEDIAN',
			MAX:'MAX',
			STDDEV:'STDDEV',
			COUNTDISTINCT:'COUNTDISTINCT',
			VARIANCE:'VARIANCE'
		},
		timeGroups : [
			'YEAR',
			'QUARTER',
			'MONTH',
			'WEEK',
			'DAYOFYEAR',
			'DAYOFMONTH',
			'DAYOFWEEK',
			'HOUR',
			'MINUTE',
			'SECOND'
		],
		lastNDays : {
			'7': '1WEEK',
			'30': '1MONTH',
			'60': '2MONTHS',
			'90': '3MONTHS',
			'180': '6MONTHS',
			'270': '9MONTHS',
			'365': '1YEAR'
		}

	};

	return {
		columnAlias : _columnAlias,
		constants : _constants,
		drilldown : _adfProxyCall,
		errorHandler : _errorHandler,
		refreshAll : function(observableArray, fromArray){
			//push all the items from a array to an observable array and
			//notify the subscribers to the observableArray at the end
			observableArray.valueWillMutate();
			observableArray.removeAll();
			ko.utils.arrayPushAll(observableArray, fromArray);
			observableArray.valueHasMutated();
		},
		addAll : function (observableArray, fromArray){
			//Add all the items from a array to an observable array and
			//notify the subscribers to the observableArray at the end
			observableArray.valueWillMutate();
			ko.utils.arrayPushAll(observableArray, fromArray);
			observableArray.valueHasMutated();
		},
		startsWith : function(str, searchString, position){
			position = position || 0;
			return str.substr(position, searchString.length) === searchString;
		}
	};
});



/**
 * Created by srayker on 12/10/2015.
 */
define('pcs/charts/visualization/viewModel/services/DataServices',['jquery', 'pcs/charts/visualization/viewModel/util/visualizationUtil'],
	function($, utils){
		var self = this;
		//Object for maintaining all service path information
		var paths = {
			'applicationNameList' : 'ootbqueries/APPLICATION_NAME_LIST',
			'datasources' : 'businessquery-metadata/datasources',
			'columnsListByApp' : 'businessquery-metadata/datasources/{dataSource}/columns?applicationName={appName}',
			'processList' : 'ootbqueries/PROCESS_LABEL_LIST',
			'aggregateOperations' : 'businessquery-metadata/aggregateoperations',
			'comparisonOperators': 'businessquery-metadata/comparisonoperators',
			'businessQuery' : 'businessquery',
			'businessQueries' : 'businessquery-metadata/businessqueries',
			'businessQueryById' : 'businessquery-metadata/businessqueries/{businessQueryId}'
		};

		var authInfo = "";
		var baseRestURL = "";

		// Handle errors during a ajax call
		function ajaxErrorHandler(jqXHR){
			var defaultErrMsg = oj.Translations.getTranslatedString('vis.error_msg.data_fetch_error');
			if(jqXHR.status === 400 || jqXHR.status === 500){
				var respJSON = $.parseJSON(jqXHR.responseText);
				var respMsg = respJSON && respJSON.detail ? respJSON.detail : defaultErrMsg;
				utils.errorHandler('', respMsg);
			} else if (jqXHR.status !== 403 && jqXHR.status !== 404 && jqXHR.status !== 204){
				utils.errorHandler('', defaultErrMsg);
			}
		}

		// wrapper function for HTTP GET
		var doGet = function(url){
			utils.drilldown();
			return doAjax(url, 'GET');
		};

		// wrapper function for HTTP POST
		var doPost = function(url, payload){
			utils.drilldown();
			return doAjax(url, 'POST', payload);
		};

		// wrapper function for HTTP PUT
		var doPut = function(url, payload){
			utils.drilldown();
			return doAjax(url, 'PUT', payload);
		};

		// wrapper function for HTTP DELETE
		var doDelete = function(url, payload){
			utils.drilldown();
			return doAjax(url, 'DELETE', payload);
		};

		//AJAX utility function
		var doAjax = function(url, method, payload){
			var promise =  $.ajax
			({
				type: method,
				url: url,
				data: payload,
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', authInfo);
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				dataType: 'json',
				error: function(jqXHR){
					ajaxErrorHandler(jqXHR);
				}
			});
			return promise;
		};

		var replacePlaceHolders = function(str, paramsObj){
			return  str.replace(/{\w+}/g,
				function(placeHolder) {
					return paramsObj[placeHolder];
				}
			);
		};

		//List of services
		var services = {
			setAuthInfo : function(data){
				authInfo = data;
			},
			setBaseRestURL : function(data){
				baseRestURL = data
			},
			getAppNameList : function(){
				var serverPath = baseRestURL + paths.applicationNameList;
				return doGet(serverPath);
			},
			getDataSourceList : function(){
				var serverPath = baseRestURL + paths.datasources;
				return doGet(serverPath);
			},
			getColumnListByApp : function(params){
				var serverPath = baseRestURL + paths.columnsListByApp;
				serverPath = replacePlaceHolders(serverPath, params);
				return doGet(serverPath);
			},
			getProcessList : function(){
				var serverPath = baseRestURL + paths.processList;
				return doGet(serverPath);
			},
			getAggregateOperations : function(){
				var serverPath = baseRestURL + paths.aggregateOperations;
				return doGet(serverPath);
			},
			getComparisonOperators : function(){
				var serverPath = baseRestURL + paths.comparisonOperators;
				return doGet(serverPath);
			},
			getChartData : function(payload){
				var serverPath = baseRestURL + paths.businessQuery;
				return doPost(serverPath, payload);
			},
			getSavedQueries : function(){
				var serverPath = baseRestURL + paths.businessQueries;
				return doGet(serverPath);
			},
			saveQuery : function(payload){
				var serverPath = baseRestURL + paths.businessQueries;
				return doPost(serverPath, payload);
			},
			updateQuery : function(payload, params){
				var serverPath = baseRestURL + paths.businessQueryById;
				serverPath = replacePlaceHolders(serverPath, params);
				return doPut(serverPath, payload);
			},
			deleteQuery : function(params){
				var serverPath = baseRestURL + paths.businessQueryById;
				serverPath = replacePlaceHolders(serverPath, params);
				return doDelete(serverPath);
			},
			getQuery : function(params){
				var serverPath = baseRestURL + paths.businessQueryById;
				serverPath = replacePlaceHolders(serverPath, params);
				return doGet(serverPath);
			}
		};

		return services;
	}
);

/**
 * Created by nisabhar on 11/19/2015.
 */

define('pcs/charts/visualization/viewModel/custom/customDashboard',['ojs/ojcore', 'knockout', 'pcs/charts/visualization/viewModel/util/visualizationUtil', 'pcs/charts/visualization/viewModel/services/DataServices', 'ojs/ojradioset', 'ojs/ojdialog',
	'ojs/ojselectcombobox', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojdatetimepicker', 'ojs/ojtable', 'ojL10n!pcs/resources/nls/dashboardResource',
	'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojdatacollection-common'], function (oj, ko, util, services) {
	/**
	 * The view model for the main content view template
	 */
	function customDashboardContainerModel(params) {

		var self = this;
		self.oj = oj;

		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		self.parent = params.parent;	// hold the instance of dashboardContainer
		services.setAuthInfo(self.parent.authInfo); // Login credentials
		services.setBaseRestURL(self.parent.baseRestUrl);
		self.rootElement = this.parent.rootElement;
		self.processList = ko.observableArray([]);
		self.columnDataList = ko.observableArray(['']);
		self.columnDataBIList = ko.observableArray(['']);
		self.measureList = ko.observableArray([{name: '', displayName: ''}]);
		self.measureBIList = ko.observableArray([{name: '', displayName: ''}]);
		self.dimensionList = ko.observableArray([{name: '', displayName: ''}]);
		self.dimensionBIList = ko.observableArray([{name: '', displayName: ''}]);
		self.attributeList = ko.observableArray([]);
		self.filterCriteriaList = ko.observableArray([]);
		self.functionList = ko.observableArray([{name: '', displayName: ''}]);
		self.allFunctionArr = [];

		self.chartTypeList = [
			{
				name: util.constants.chartType.BAR,
				displayName: self.bundle.vis.button.bar,
				icon: 'oj-fwk-icon btn-bar-chart'
			},
			{
				name: util.constants.chartType.LINE,
				displayName: self.bundle.vis.button.line,
				icon: 'oj-fwk-icon btn-line-chart'
			},
			{
				name: util.constants.chartType.AREA,
				displayName: self.bundle.vis.button.area,
				icon: 'oj-fwk-icon btn-area-chart'
			},
			{
				name: util.constants.chartType.LINEWITHAREA,
				displayName: self.bundle.vis.button.line_with_area,
				icon: 'oj-fwk-icon btn-linewitharea-chart'
			},
			{
				name: util.constants.chartType.COMBO,
				displayName: self.bundle.vis.button.combo,
				icon: 'oj-fwk-icon btn-combo-chart'
			}
		];

		//Create select data for Time Group field
		self.timeGroups = util.constants.timeGroups.map(function (item) {
			return {
				id: item,
				label: self.bundle.vis.timeGroups[item]
			};
		});
		//Set default value for Time Group field
		self.selectedSrsTimeGroup = ko.observableArray([]);
		self.selectedGrpTimeGroup = ko.observableArray([]);

		self.selectedVisualizationName = ko.observable('');
		self.selectedDataSource = ko.observableArray(['']);
		self.selectedProcess = ko.observableArray([util.constants.misc.ANY]);
		self.selectedSeries = ko.observableArray(['']);
		self.selectedGroup = ko.observableArray(['']);
		self.selectedMeasure = ko.observableArray(['']);
		self.selectedFunction = ko.observableArray(['']);
		self.selectedFilterType = ko.observable(util.constants.misc.ALL);
		self.selectedAppName = ko.observableArray([util.constants.misc.ANY]);
		self.measureDisabled = ko.observable(false);
		self.queryName = ko.observable('');
		self.description = ko.observable('');
		self.savedQueries = ko.observableArray([]);
		self.queriesDS = new oj.ArrayTableDataSource(self.savedQueries, {idAttribute: "id"});
		self.selectedQuery = ko.observableArray([]);
		self.selectedQueryJSON = null;
		self.dataSourceList = ko.observableArray([{name: '', displayName: ''}]);
		//define appNameList variable
		self.appNameList = ko.observableArray(['']);
		self.formState = 'new';
		self.lastNDaysFilter = loadLastNDaysFilter();
		self.selectedLastDays = ko.observableArray(['30']);


		initialize();
		//initialize and fetch data for the view
		function initialize() {
			loadSavedQueries();
			loadFormData();
		}

		function loadFormData() {
			services.getDataSourceList().done(
				function (data) {
					util.refreshAll(self.dataSourceList, formDSData(data));
					self.selectedDataSource([self.dataSourceList()[0].name]);
					//loggerUtil.log("datasource list " +ko.toJSON(self.dataSourceList()[0]));
					loadFunctionList();
					loadAppList();
				}
			);
		}

		function formDSData(data) {
			return data.map(function (item) {
				return {name: item, displayName: self.bundle.vis.datasource[item]};
			});
		}

		// Function to determine display of Time Group field
		function displayTimeGroup(data, field) {
			var filterCondition = function (item) {
				return item.name === data.value[0];
			};
			if (data.option == util.constants.misc.VALUE) {
				var selectedItem = self.dimensionList().filter(filterCondition);
				selectedItem = selectedItem.length === 0 ? self.dimensionBIList().filter(filterCondition) : selectedItem;
				if (selectedItem.length > 0 && selectedItem[0].dataType === util.constants.dataType.DATETIME) {
					$('#bpm-vis-' + field + '-timegroups').show();
				}
				else {
					$('#bpm-vis-' + field + '-timegroups').hide();
					if (field === 'srs') {
						self.selectedSrsTimeGroup([]);
					} else if (field === 'grp') {
						self.selectedGrpTimeGroup([]);
					}
				}
			}
		}

		function loadFunctionList() {
			services.getAggregateOperations().done(
				function (data) {
					self.allFunctionArr = data;
					util.refreshAll(self.functionList, formFunctionData(data));
					self.selectedFunction([self.functionList()[0].name]);
					//loggerUtil.log("getAggregateOperations " +ko.toJSON(data));
					// Remove overlays for loading
				}
			);
		}

		function formFunctionData(data) {
			var arr = data.map(function (item) {
				return {name: item, displayName: self.bundle.vis.functions[item]};
			});
			return arr;
		}

		// On change of Measure update the corresponding Aggregation or Function List
		function refreshAggregations(item, selectedValue) {
			if (item.name === selectedValue) {
				var functionObjData;
				if (item.supportedAggregations && item.supportedAggregations.length > 0) {
					functionObjData = formFunctionData(item.supportedAggregations);
					self.selectedFunction([functionObjData[0].name]);
				} else {
					functionObjData = formFunctionData(self.allFunctionArr);
				}
				util.refreshAll(self.functionList, functionObjData);
			}
		}


		function formatData(rows) {
			if (rows) {
				rows = rows.map(function (item) {
					return {'name': item.values[0], 'displayName': item.values[1]};
				});
			}
			return rows;
		}

		function loadAppList() {
			//trigger service to fetch data for appNameList
			services.getAppNameList().done(
				function (data) {
					util.refreshAll(self.appNameList, formatData(data.rows));
					self.selectedAppName([util.constants.misc.ANY]);
				}
			);
		}


		function loadColumnData(dataSource, appName) {
			var params;
			if (appName == util.constants.misc.ANY) {
				params = {'{dataSource}': dataSource, '{appName}': ''};
			} else {
				//params to fetch data for selected app name
				params = {'{dataSource}': dataSource, '{appName}': appName};
			}

			services.getColumnListByApp(params).done(
				function (response) {
					populateColumnData(response);
					//loggerUtil.log(ko.toJSON(data));
					// Remove overlays for loading
					$('#bpm-vis-cust-query-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
				}
			);
		}

		function populateColumnData(data) {
			var attributeArr = [];
			var dimensionArr = [];
			var dimensionBIArr = [];
			var measureArr = [];
			var measureBIArr = [];
			var allChartAttribs = [];
			var allChartBIAttribs = [];
			data.map(
				function (item) {
					switch (item.type) {
						case util.constants.columnTypes.ATTRIBUTE:
							updateList(attributeArr, item);
							break;
						case util.constants.columnTypes.DIMENSION:
							if (util.startsWith(item.name, 'B_') || util.startsWith(item.name, 'R_')) {
								updateList(dimensionBIArr, item);
							} else {
								updateList(dimensionArr, item);
							}
							break;
						case util.constants.columnTypes.MEASURE:
							if (util.startsWith(item.name, 'B_') || util.startsWith(item.name, 'R_')) {
								updateList(measureBIArr, item);
							} else {
								updateList(measureArr, item);
							}
							break;
						default :
							loggerUtil.log('missing type info' + ko.toJSON(item));

					}
					if (util.startsWith(item.name, 'B_') || util.startsWith(item.name, 'R_')) {
						updateList(allChartBIAttribs, item);
					} else {
						updateList(allChartAttribs, item);
					}

				}
			);
			util.refreshAll(self.columnDataList, allChartAttribs);
			util.refreshAll(self.columnDataBIList, allChartBIAttribs);
			util.refreshAll(self.measureList, measureArr);
			util.refreshAll(self.measureBIList, measureBIArr);
			util.refreshAll(self.dimensionList, dimensionArr);
			util.refreshAll(self.dimensionBIList, dimensionBIArr);
			util.refreshAll(self.attributeList, attributeArr);
			setSelectBoxValues();
		}

		//Set the select box selection values based of state
		function setSelectBoxValues() {
			if (self.formState === 'reload' && self.selectedQueryJSON) {
				var selectedSrs = self.selectedQueryJSON.legend;
				self.selectedSeries([selectedSrs]);
				var selectedGrp = self.selectedQueryJSON.groups[0];
				self.selectedGroup([selectedGrp]);
				self.selectedFunction([self.selectedQueryJSON.dataSeries[0].aggregateOperation]);
				self.selectedMeasure([self.selectedQueryJSON.dataSeries[0].measureColumn]);
				if (self.selectedQueryJSON.lastNDays) {
					self.selectedLastDays([self.selectedQueryJSON.lastNDays.toString()]);
				}
				if (self.selectedQueryJSON.timeGroupings) {
					if (self.selectedQueryJSON.timeGroupings[selectedSrs]) {
						self.selectedSrsTimeGroup([self.selectedQueryJSON.timeGroupings[selectedSrs].timeGroupingUnits[0]]);
					}

					if (self.selectedQueryJSON.timeGroupings[selectedGrp]) {
						self.selectedGrpTimeGroup([self.selectedQueryJSON.timeGroupings[selectedGrp].timeGroupingUnits[0]]);
					}
				}
				if (self.selectedQueryJSON.filter) {
					self.selectedFilterType(self.selectedQueryJSON.filter.filterType);
					var filters = [];
					self.selectedQueryJSON.filter.filterEntries.map(function (item) {
						var filter = new FilterModel();
						filter.columnDataValue([item.columnName]);
						filter.operatorValue([item.operator]);
						filter.dataType(item.columnDataType);
						filters.push(filter);
					});
					util.refreshAll(self.filterCriteriaList, filters);
					self.selectedQueryJSON.filter.filterEntries.map(function (entry) {
						self.filterCriteriaList().map(function (criteria) {
							if (entry.columnName === criteria.columnDataValue()[0]) {
								if (criteria.dataType() === util.constants.dataType.DATETIME && entry.value && entry.value !== '') {
									var date = new Date(parseInt(entry.value));
									var iso = self.oj.IntlConverterUtils.dateToLocalIso(date);
									criteria.selectedValue(iso);
								} else {
									criteria.selectedValue(entry.value);
								}
							}
						});
					});
				}
				if (self.selectedQueryJSON.properties) {
					self.selectedQueryJSON.properties.map(function (item) {
						if (item.name && item.name === 'chartType') {
							self.selectedChartType(item.value ? item.value : util.constants.chartType.BAR);
						}
					});
				} else {
					self.selectedChartType(util.constants.chartType.BAR);
				}
			} else if (self.formState === 'new') {
				self.selectedFilterType(util.constants.misc.ALL);
				self.selectedLastDays(['30']);
				self.selectedSeries([self.dimensionList()[0].name]);
				self.selectedGroup([self.dimensionList()[1].name]);
				if (self.selectedFunction()[0] !== util.constants.functionList.COUNT) {
					self.selectedMeasure([self.measureList()[0].name]);
				}
			}
		}

		//function to create data object for option item
		var updateList = function (arr, item) {
			arr.push({
				name: item.name,
				displayName: item.displayName,
				dataType: item.dataType,
				supportedAggregations: item.supportedAggregations
			});
		};

		function loadChartData(oj, payload) {
			//self.load(query,self.populateChartData);
			var payloadData = payload ? payload : getPayloadForChartData(oj);
			self.groupKey = payloadData.groups[0];
			self.seriesKey = payloadData.legend;
			//If Count is selected then replace with X as backend passes same
			var measrClmn = payloadData.dataSeries[0].measureColumn === '*' ? 'X' : payloadData.dataSeries[0].measureColumn;
			self.measureKey = payloadData.dataSeries[0].aggregateOperation + measrClmn;

			//Call the rest service to fetch chart data
			services.getChartData(JSON.stringify(payloadData)).done(
				function (data) {
					self.populateChartData(data);
				}
			).fail(
				function () {
					$('#bpm-vis-cust-chart-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
					util.errorHandler('', self.bundle.vis.error_msg.data_fetch_error);
				}
			);
		}

		function getPayloadForChartData(oj) {
			var filtersObj = {filterType: self.selectedFilterType(), filterEntries: []};
			self.filterCriteriaList().map(function (item) {
				var value = item.selectedValue() instanceof Array ? item.selectedValue()[0] : item.selectedValue();
				var dataType = item.dataType();
				//Date to be in long format as per Service requirements
				if (dataType === util.constants.dataType.DATETIME && value && value !== '') {
					value = oj.IntlConverterUtils.isoToLocalDate(value).getTime();
				} else if (dataType === util.constants.dataType.INT && value !== '') {
					value = parseInt(value);
				}

				filtersObj.filterEntries.push({
					'columnName': item.columnDataValue()[0],
					'operator': item.operatorValue()[0],
					'value': value,
					'columnDataType': dataType
				});
			});

			var obj = {
				'id': self.selectedQueryJSON ? self.selectedQueryJSON.id : '',
				'title': self.queryName(),
				'description': self.description(),
				'dataSource': self.selectedDataSource()[0],
				'applicationName': self.selectedAppName()[0] === util.constants.misc.ANY ? null : self.selectedAppName()[0],
				'queryType': 'GROUP',
				'dataSeries': [{
					measureColumn: self.selectedMeasure()[0],
					aggregateOperation: self.selectedFunction()[0]
				}],
				'groups': [self.selectedGroup()[0] === util.constants.misc.ANY ? '*' : self.selectedGroup()[0]],
				'legend': self.selectedSeries()[0] === util.constants.misc.ANY ? '*' : self.selectedSeries()[0],
				'filter': filtersObj,
				'topN': null,
				'sortEntries': null,
				'lastNDays': self.selectedLastDays()[0],
				'properties': [{'name': 'chartType', 'value': self.selectedChartType()}]
			};
			obj.timeGroupings = {};
			//add time group section if a time group was selected
			if (self.selectedSrsTimeGroup().length > 0) {
				obj.timeGroupings[self.selectedSeries()[0]] = {
					"timeGroupingUnits": [self.selectedSrsTimeGroup()[0]]
				}
			}
			if (self.selectedGrpTimeGroup().length > 0) {
				obj.timeGroupings[self.selectedGroup()[0]] = {
					"timeGroupingUnits": [self.selectedGrpTimeGroup()[0]]
				}
			}
			//loggerUtil.log("Payload data : "+ko.toJSON(obj));
			return obj;
		}

		/*
		 Extract data returned from the rest api, massage it as per Graph data format
		 and update the graph data objects
		 */
		self.populateChartData = function (data) {
			self.groupsArray = [];
			self.seriesArray = [];
			var options = {formatType: 'date', pattern: 'M/d/y h:mm'};
			var converter = self.oj.Validation.converterFactory("datetime").createConverter(options);
			//get the index of Group, series and measure data from columnsInfo
			data.columnsInfo.map(function (item, index) {
				if (item.columnName.indexOf(self.groupKey) >= 0) {
					self.groupIndex = index;
					self.groupType = item.type;
				} else if (item.columnName.indexOf(self.seriesKey) >= 0) {
					self.seriesIndex = index;
					self.seriesType = item.type;
				} else if (item.columnName === self.measureKey) {
					self.measureIndex = index;
					self.measureType = item.type;
				}
			});

			//Create a group and series array from row data
			data.rows.map(function (rowItem) {
				var grp = rowItem.values[self.groupIndex] === null ? '' : rowItem.values[self.groupIndex];
				var srs = rowItem.values[self.seriesIndex] === null ? '' : rowItem.values[self.seriesIndex];

				grp = self.groupType === util.constants.dataType.TIMESTAMP && grp !== '' ? converter.format(self.oj.IntlConverterUtils.dateToLocalIso(new Date(grp))) : grp;
				srs = self.seriesType === util.constants.dataType.TIMESTAMP && srs !== '' ? converter.format(self.oj.IntlConverterUtils.dateToLocalIso(new Date(srs))) : srs;

				if (!self.groupsArray[grp]) {
					self.groupsArray[grp] = 0;
				}

				if (!self.seriesArray[srs]) {
					self.seriesArray[srs] = [];
				}

				rowItem.values[self.groupIndex] = grp;
				rowItem.values[self.seriesIndex] = srs;
			});

			//populate series array elements with cloned group array
			Object.keys(self.seriesArray).forEach(function (key) {
				var copy_arr = $.extend({}, self.groupsArray);
				this[key] = copy_arr;
			}, self.seriesArray);


			setChartGridData(data);

			//prepare data for charts as a bidimensional arraycloseErrorDialog
			data.rows.map(function (rowItem) {
				var grp = rowItem.values[self.groupIndex] === null ? '' : rowItem.values[self.groupIndex];
				var srs = rowItem.values[self.seriesIndex] === null ? '' : rowItem.values[self.seriesIndex];
				var measr = rowItem.values[self.measureIndex];

				self.seriesArray[srs][grp] = measr;
			});


			//reset the chart data
			chartSeries = [];
			chartGroups = [];
			//Generate chart data
			//Since it is a associative array, using Object.keys to iterate
			Object.keys(self.seriesArray).forEach(function (key) {
				var obj = {};
				obj.name = self.selectedSrsTimeGroup().length > 0 ? key + ' ' + self.bundle.vis.timeGroups[self.selectedSrsTimeGroup()[0]] : key;
				obj.items = [];
				var grpDtaArr = this[key];
				Object.keys(grpDtaArr).forEach(function (key) {
					obj.items.push(this[key]);
				}, grpDtaArr);
				chartSeries.push(obj);
			}, self.seriesArray);

			Object.keys(self.groupsArray).forEach(function (key) {
				key = self.selectedGrpTimeGroup().length > 0 ? key + ' ' + self.bundle.vis.timeGroups[self.selectedGrpTimeGroup()[0]] : key;
				chartGroups.push(key);
			}, self.groupsArray);

			self.barSeriesValue(chartSeries);
			self.barGroupsValue(chartGroups);

			// remove overlays for loading
			$('#bpm-vis-cust-chart-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
		};

		/**
		 Prepare the chart grid data and set it to the grid
		 */
		function setChartGridData(data) {
			var dataArray = [];
			self.csvGridData = self.groupKey + ', ' + self.seriesKey + ', ' + self.measureKey;

			//prepare coma seperated data for chart grid
			data.rows.map(function (rowItem) {
				var grp = rowItem.values[self.groupIndex];
				var srs = rowItem.values[self.seriesIndex];
				var measr = rowItem.values[self.measureIndex];

				var obj = {};
				obj[self.groupKey] = grp;
				obj[self.seriesKey] = srs;
				obj[self.measureKey] = measr;
				dataArray.push(obj);

				self.csvGridData += '\n' + grp + ', ' + srs + ', ' + measr;
			});

			var grpHeaderTxt = '';
			var srsHeaderTxt = '';
			var measrHeaderTxt = 'Count';

			//Chart Result data does not contain label info, hence extract it from columns info
			self.columnDataList().map(function (item) {
				switch (item.name) {
					case self.groupKey:
						grpHeaderTxt = item.displayName;
						break;
					case self.seriesKey:
						srsHeaderTxt = item.displayName;
						break;
				}
			});
			//Chart Result data does not contain label info, hence extract it from columns info
			self.columnDataBIList().map(function (item) {
				switch (item.name) {
					case self.groupKey:
						grpHeaderTxt = item.displayName;
						break;
					case self.seriesKey:
						srsHeaderTxt = item.displayName;
						break;
				}
			});
			//Chart Result data does not contain label info, hence extract it from columns info
			self.measureList().map(function (item) {
				var measrName = self.selectedFunction()[0] + item.name;
				if (measrName === self.measureKey) {
					measrHeaderTxt = item.displayName;
				}
			});
			//Chart Result data does not contain label info, hence extract it from columns info
			self.measureBIList().map(function (item) {
				var measrName = self.selectedFunction()[0] + item.name;
				if (measrName === self.measureKey) {
					measrHeaderTxt = item.displayName;
				}
			});

			//Set Graph labels
			self.xLabel(grpHeaderTxt);
			self.yLabel(measrHeaderTxt);

			//prepare header data for the chart grid
			var headerArr = [{headerText: grpHeaderTxt, field: self.groupKey},
				{headerText: srsHeaderTxt, field: self.seriesKey},
				{headerText: measrHeaderTxt, field: self.measureKey}];

			//reset header info
			util.refreshAll(self.headerTextArr, headerArr);
			//reset Grid datasource
			self.gridDataSource.reset(dataArray);
		}

		//Creates the data object for last N days filter
		function loadLastNDaysFilter() {
			var arr = [];
			for (var key in util.constants.lastNDays) {
				var obj = {};
				obj.id = key;
				obj.label = self.bundle.vis.lastNDays[util.constants.lastNDays[key]];
				arr.push(obj);
			}
			return arr;
		}

		// Load the saved queries in the Saved Query list
		// selectedQuery: Query ID to be selected after loading queries
		function loadSavedQueries(selectedQuery) {
			services.getSavedQueries().done(function (data) {
				util.refreshAll(self.savedQueries, processQueryAPIData(data));
				if (selectedQuery) {
					self.selectedQuery([selectedQuery]);
				} else {
					var queryIdArr = self.savedQueries().length > 0 ? [self.savedQueries()[0].id] : [];
					self.selectedQuery(queryIdArr);
				}
				//refresh the select UI to handle rename of query
				$("#bpm-vis-query-listview").ojListView("refresh");
				showSplashScreenOnStart();
			})
		}

		//Display splash screen if there are no saved queries to prompt user to create a query
		function showSplashScreenOnStart() {
			if (self.savedQueries().length <= 0) {
				if($('#bpm-vis-popup1').ojPopup('isOpen')){
					$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
				}

				$('#bpm-vis-business-analytics').hide();
				$('#bpm-vis-main-splash').show();
				return true;
			} else {
				$('#bpm-vis-main-splash').hide();
				$('#bpm-vis-business-analytics').show();
				return false;
			}
		}

		//Process the saved queries api result data for UI consumption
		function processQueryAPIData(data) {
			return data.map(function (item) {
				var queryIdIndex = item.href.lastIndexOf('/');
				return {id: item.href.slice(++queryIdIndex), label: item.title};
			});
		}

		//update the form fields with query JSON data
		function setFormFieldsFromJSON() {
			self.selectedSrsTimeGroup([]);
			self.selectedGrpTimeGroup([]);
			self.queryName(self.selectedQueryJSON.title);
			self.description(self.selectedQueryJSON.description);

			var appName = self.selectedQueryJSON.applicationName ? self.selectedQueryJSON.applicationName : util.constants.misc.ANY;
			self.selectedAppName([appName]);
			self.selectedDataSource([self.selectedQueryJSON.dataSource]);
		}

		function displayCharts(oj, payload){
			$('#bpm-vis-cust-splash').hide();
			$('#bpm-vis-chart-tools').show();
			$('#bpm-vis-chart-row1').show();
			$('#bpm-vis-chart-row2').show();

			// Add overlays for loading
			$('#bpm-vis-cust-chart-overlay', self.rootElement).addClass('bpm-vis-load-overlay');
			loadChartData(oj, payload);
			$('#bpm-vis-cust-chart-container').show();
		}

		//reset the fields and initialise the query fields, chart view
		function resetAndInitialize() {
			self.selectedQueryJSON = null;
			self.queryName('');
			self.description('');
			self.selectedDataSource.removeAll();
			self.selectedAppName([util.constants.misc.ANY]);
			loadFormData();
			self.formState = 'new';
			$('#bpm-vis-cust-saved-queries').ojSelect('refresh');
			$('#bpm-vis-cust-splash').show();
			$('#bpm-vis-cust-chart-container').hide();
			$('#bpm-vis-chart-tools').hide();
			$('#bpm-vis-chart-row1').hide();
			$('#bpm-vis-chart-row2').hide();
		}

		//--------------Click / Select Handlers ---------------------
		//Save the query
		self.saveQuery = function (event, data) {
			if (self.queryName().trim() === '') {
				$('#bpm-dsb-warning-dialog').ojDialog('open');
				var msg = self.bundle.vis.error_msg.enter_query_name;
				$("#bpm-vis-warning-dialog-text").text(msg);
				return;
			}
			//Validation to check if same series and group fields have been selected
			if (self.selectedSeries()[0] === self.selectedGroup()[0]) {
				util.errorHandler('', self.bundle.vis.error_msg.fields_cant_be_same);
				return;
			}
			var payload = getPayloadForChartData(event.oj);
			//If JSON object exists for selected query, then update otherwise save new
			if (self.selectedQueryJSON) {
				var selectedQueryId = self.selectedQuery()[0];
				services.updateQuery(JSON.stringify(payload), {'{businessQueryId}': selectedQueryId}).done(function (data) {
					loadSavedQueries(selectedQueryId);
				});
			} else {
				services.saveQuery(JSON.stringify(payload)).done(function (data) {
					var queryId;
					//extract the queryId of the saved query
					if (data.href) {
						var queryIdIndex = data.href.lastIndexOf('/');
						queryId = data.href.slice(++queryIdIndex);
					}
					loadSavedQueries(queryId);
				});
			}

		};
		self.deleteConfirm = function () {
			if (self.selectedQueryJSON) {
				$('#bpm-dsb-confirm-dialog').ojDialog('open');
				var msg = self.bundle.vis.error_msg.delete_confirm;
				$('#bpm-vis-confirm-dialog-text').text(msg);
			} else {
				$('#bpm-dsb-warning-dialog').ojDialog('open');
				var msg1 = self.bundle.vis.error_msg.no_query_selected;
				$('#bpm-vis-warning-dialog-text').text(msg1);
			}
		};
		//Delete a saved query
		self.deleteQuery = function (event, data) {
			if($('#bpm-vis-popup1').ojPopup('isOpen')){
				$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
			}
			$('#bpm-dsb-confirm-dialog').ojDialog('close');
			services.deleteQuery({'{businessQueryId}': self.selectedQuery()[0]}).done(function (data) {
				loadSavedQueries();
				resetAndInitialize();
			});
			if ($('#bpm-vis-delete-app').ojDialog('isOpen')) {
				$('#bpm-vis-delete-app').ojDialog('close');
			}
		};
		//Handler for New Query action
		self.newQuery = function (event, data) {
			resetAndInitialize();

			self.queryName(self.bundle.vis.formlbl.default_query_name);
			$('#bpm-vis-chart-row1').show();
			$('#bpm-vis-chart-row2').show();
			self.selectedQuery([]);
			self.selectedQueryBtn([util.constants.misc.VISIBLE]);

			self.selectedQuery.removeAll();
			if ($('#bpm-vis-delete-app').ojDialog('isOpen')) {
				$('#bpm-vis-delete-app').ojDialog('close');
			}
		};
		//Handler for Copy Query action
		self.copyQuery = function (event, data) {
			if (self.selectedQueryJSON) {
				self.selectedQueryJSON = null;
				self.selectedQuery.removeAll();
				self.selectedQueryBtn([util.constants.misc.VISIBLE]);
				var queryName = self.bundle.vis.formlbl.copy_of + ' ' + self.queryName();
				self.queryName(queryName);
			}
		};
		//Handler for change in selection of Saved Query
		self.queryChangeHandler = function (event, data) {
			if (data.option == util.constants.misc.VALUE) {
				var currentVal = data.value[0];
				if (currentVal) {
					$('#bpm-vis-cust-query-overlay', self.rootElement).addClass('bpm-vis-load-overlay');
					services.getQuery({'{businessQueryId}': currentVal}).done(function (data) {
						self.formState = 'reload';
						self.selectedQueryJSON = data;
						setFormFieldsFromJSON();
						displayCharts(self.oj, self.selectedQueryJSON);
					}).fail(
						function (jqXHR) {
							$('#bpm-vis-cust-query-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
							if (jqXHR.status === 403) {
								var respJSON = $.parseJSON(jqXHR.responseText);
								var respMsg = respJSON && respJSON.message ? respJSON.message : '';
								$('#bpm-vis-delete-app').ojDialog('open');
								$("#bpm-vis-delete-app-text").text(respMsg);
							}
						}
					);
				}
				if (!currentVal && self.savedQueries().length > 0 && data.optionMetadata.writeback === 'shouldWrite') {
					$('#bpm-vis-cust-query-overlay', self.rootElement).addClass('bpm-vis-load-overlay');
					resetAndInitialize();
				}
			}
		};

		//Handler for reset action
		self.resetQuery = function (event, data) {
			self.formState = 'reload';
			if (self.selectedQueryJSON) {
				setFormFieldsFromJSON();
				displayCharts(self.oj, self.selectedQueryJSON);
			} else {
				self.selectedQueryJSON = null;
				self.selectedDataSource.removeAll();
				self.selectedAppName([util.constants.misc.ANY]);
				loadFormData();
				self.formState = 'new';
				$('#bpm-vis-cust-splash').show();
				$('#bpm-vis-cust-chart-container').hide();
				self.selectedQuery.removeAll();
			}
		};

		self.dataSourceChangeHandler = function (event, data) {
			// Add overlays for loading
			$('#bpm-vis-cust-query-overlay', self.rootElement).addClass('bpm-vis-load-overlay');

			if (data.option == util.constants.misc.VALUE) {
				if (data.optionMetadata.writeback === 'shouldWrite') {
					self.formState = 'new';
				}
				loadColumnData(self.selectedDataSource()[0], self.selectedAppName()[0]);
				self.filterCriteriaList.removeAll();
			}
		};
		//define the handler on select of item in appNameList
		self.appNameChangeHandler = function (event, data) {
			if (data.option == util.constants.misc.VALUE) {
				if (data.optionMetadata.writeback === 'shouldWrite') {
					self.formState = 'new';
					var selectedValue = self.selectedAppName()[0];
					// Add overlays for loading
					$('#bpm-vis-cust-query-overlay', self.rootElement).addClass('bpm-vis-load-overlay');
					loadColumnData(self.selectedDataSource()[0], selectedValue);
				}
				self.filterCriteriaList.removeAll();
			}
		};

		// Handle on change event for series field
		self.seriesChangeHandler = function (event, data) {
			displayTimeGroup(data, 'srs');
		};
		// Handle on change event for group  field
		self.groupChangeHandler = function (event, data) {
			displayTimeGroup(data, 'grp');
		};

		self.functionChangeHandler = function (event, data) {
			if (data.option == util.constants.misc.VALUE) {
				var selectedValue = data.value[0];
				// If count is selected, then disable measure field
				if (selectedValue === util.constants.functionList.COUNT && !self.measureDisabled()) {
					self.measureDisabled(true);
					self.selectedMeasure(['*']);
				} else if (selectedValue !== util.constants.functionList.COUNT && self.measureDisabled()) {
					self.measureDisabled(false);
					if (self.selectedMeasure().length < 1 || self.selectedMeasure()[0] === '*') {
						self.selectedMeasure([self.measureList()[0].name]);
					}
				}
			}
		};

		self.measureChangeHandler = function (event, data) {
			if (data.option == util.constants.misc.VALUE) {
				var selectedValue = data.value[0];

				self.measureList().map(function (item) {
					refreshAggregations(item, selectedValue);
				});

				self.measureBIList().map(function (item) {
					refreshAggregations(item, selectedValue);
				});

			}
		};


		// Handler for change in Last N Days selection
		self.handleLastNDaySelect = function (event, data) {
			if (data.option == util.constants.misc.VALUE && data.optionMetadata.writeback === 'shouldWrite') {
				self.runQuery(event, data);
			}
		};

		// Handler for click of Visualize button
		self.visualize = function (event, data) {
			self.selectedChartType(util.constants.chartType.BAR);
			self.runQuery(event, data);
		};

		//Run the query and display the charts
		self.runQuery = function(event, data){
			//Validation to check if same series and group fields have been selected
			if (self.selectedSeries()[0] === self.selectedGroup()[0]) {
				util.errorHandler('', self.bundle.vis.error_msg.fields_cant_be_same);
				return;
			}
			self.closePopup();
			displayCharts(event.oj);
		};

		// Handler for click of Start button
		self.handleStartClick = function (event, data) {
			$('#bpm-vis-main-splash').hide();
			$('#bpm-vis-business-analytics').show();
			$("#bpm-vis-chart-row1").show();
			$("#bpm-vis-chart-row2").show();
			self.queryName(self.bundle.vis.formlbl.default_query_name);
			self.selectedQuery([]);
			self.selectedQueryBtn([util.constants.misc.VISIBLE]);
		};

		self.addFilter = function () {
			var filter = new FilterModel();
			self.filterCriteriaList.push(filter);
		};

		self.removeFilter = function (filter) {
			self.filterCriteriaList.remove(filter);
		};

		self.handleSnapBtnClick = function (event, data) {
			var isPopupOpen = false;
			var toggleOptions = {
				duration: 'slide',
				start: function () {
					$("#bpm-vis-chart").hide();
					isPopupOpen = $('#bpm-vis-popup1').ojPopup('isOpen');
					$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
				},
				complete: function () {
					$("#bpm-vis-chart").show().toggleClass("oj-lg-11");
					if(isPopupOpen){
						$('#bpm-vis-popup1').ojPopup('open', '#bpm-vis-querybtn');
					}
				}
			};
			$("#bpm-vis-cust-drawer").toggle(toggleOptions).toggleClass('closed');


			if ($("#bpm-vis-cust-drawer").is(".closed")) {
				$("#show-hide-navigation").toggleClass("bpm-vis-show-navlist");
			} else {
				$("#show-hide-navigation").toggleClass("bpm-vis-show-navlist");
			}

		};

		self.selectedQuery.subscribe(function (newValue) {
			if (newValue.length > 0) {
				$("#bpm-vis-copy").ojButton({"disabled": false});
				$("#bpm-vis-delete").ojButton({"disabled": false});
			} else {
				$("#bpm-vis-copy").ojButton({"disabled": true});
				$("#bpm-vis-delete").ojButton({"disabled": true});
			}

			if (newValue.length > 0) {
				var currentVal = newValue;
				if (currentVal) {
					services.getQuery({'{businessQueryId}': currentVal}).done(function (data) {
						self.formState = 'reload';
						self.selectedQueryJSON = data;
						setFormFieldsFromJSON();
						displayCharts(self.oj, self.selectedQueryJSON);
					}).fail(
						function (jqXHR) {
							$('#bpm-vis-cust-query-overlay', self.rootElement).removeClass('bpm-vis-load-overlay');
							if (jqXHR.status === 403) {
								var respJSON = $.parseJSON(jqXHR.responseText);
								var respMsg = respJSON && respJSON.message ? respJSON.message : '';
								$('#bpm-vis-delete-app').ojDialog('open');
								$("#bpm-vis-delete-app-text").text(respMsg);
							}
						}
					);
				}
			}
		});

		self.selectedQueryBtn = ko.observableArray([]);

		//Handle on click of Query Button
		self.selectedQueryBtn.subscribe(function (newValue) {
			if(util.constants.misc.VISIBLE === newValue[0]){
				$('#bpm-vis-popup1').ojPopup( { "position": { "my": "start top","at": "start bottom", "of": "#bpm-vis-querybtn"} } );
				$('#bpm-vis-popup1').ojPopup('open', '#bpm-vis-querybtn');
			} else {
				$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
			}
		});

		self.closePopup = function(){
			self.selectedQueryBtn([]);
		};

		$('#bpm-unifiedCharts-tabs').ojTabs({
			"deselect": function( event, ui ) {
				if($('#bpm-vis-popup1').ojPopup('isOpen')){
					$('#bpm-vis-popup1').ojPopup('close', '#bpm-vis-querybtn');
					self.selectedQueryBtn([]);
				}
			}
		});


		// ------------------Chart related Code ----
		var converterFactory = oj.Validation.converterFactory('number');
		/* toggle button variables */
		self.stackValue = ko.observable('off');
		self.orientationValue = ko.observable('vertical');
		self.selectedChartType = ko.observable(util.constants.chartType.BAR);
		self.xLabel = ko.observable('');
		self.yLabel = ko.observable('');

		/* chart data */
		var chartSeries = [];
		var chartGroups = [];
		var decimalConverter = converterFactory.createConverter({minimumFractionDigits: 0, maximumFractionDigits: 3});

		self.barSeriesValue = ko.observableArray(chartSeries);
		self.barGroupsValue = ko.observableArray(chartGroups);
		self.yAxisConverter = ko.observable(decimalConverter);

		/* toggle buttons*/
		self.stackOptions = [
			{
				id: 'unstacked',
				label: self.bundle.vis.chart.unstacked,
				value: 'off',
				icon: 'oj-icon demo-bar-unstack'
			},
			{
				id: 'stacked',
				label: self.bundle.vis.chart.stacked,
				value: 'on',
				icon: 'oj-icon demo-bar-stack'
			}
		];
		self.orientationOptions = [
			{
				id: 'vertical',
				label: self.bundle.vis.chart.vertical,
				value: 'vertical',
				icon: 'oj-icon demo-bar-vert'
			},
			{
				id: 'horizontal',
				label: self.bundle.vis.chart.horizontal,
				value: 'horizontal',
				icon: 'oj-icon demo-bar-horiz'
			}
		];

		self.selectedGridToggle = ko.observableArray([]);
		var lastSelectedChartType;

		self.selectedGridToggle.subscribe(function (newValue) {
			if (newValue.length > 0) {
				$('#bpm-vis-cust-chart').hide();
				$('#bpm-vis-cust-grid-data').show();
				$('#bpm-vis-cust-table').ojTable('refresh');
				if (self.selectedChartType() !== null) {
					lastSelectedChartType = self.selectedChartType();
					self.selectedChartType(null);
				}
			} else {
				self.selectedChartType(lastSelectedChartType);
				$('#bpm-vis-cust-chart').show();
				$('#bpm-vis-cust-chart').ojChart('refresh');
				$('#bpm-vis-cust-grid-data').hide();
			}

		});

		self.selectedChartType.subscribe(function (newValue) {
			if (newValue !== null) {
				lastSelectedChartType = newValue;
				self.selectedGridToggle([]);
			}
		});

		//------------------ Graph Data Grid Code --------------

		self.downloadCsv = function (data) {
			var filename, link, csv;

			filename = 'export.csv';

			csv = data.csvGridData;
			csv = 'data:text/csv;charset=utf-8,' + csv;
			data = encodeURI(csv);

			link = document.createElement('a');
			link.style = "visibility:hidden";
			link.setAttribute('href', data);
			link.setAttribute('download', filename);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		};

		self.csvGridData = '';
		self.headerTextArr = ko.observableArray([]);
		self.graphGridDataArray = ko.observableArray([]);


		self.gridDataSource = new oj.ArrayTableDataSource(self.graphGridDataArray(), {});


		// ------ Loading Mechanism -------------------


		function FilterModel() {
			var filter = this;
			filter.columnDataValue = ko.observableArray([self.columnDataList()[0].name]);
			filter.operatorValue = ko.observableArray(['EQ']);
			filter.selectedValue = ko.observableArray(['']);
			filter.dataType = ko.observable(self.columnDataList()[0].dataType);

			filter.columnDataValueChangeHandler = function (event, data) {
				filter.selectedValue('');
				if (data.option == "value") {
					var columnName = data.value[0];
					//loggerUtil.log("New Type of Chart-" +columnName);
					for (var i = 0; i < self.columnDataList().length; i++) {
						var name = self.columnDataList()[i].name;
						if (name === columnName) {
							var type = self.columnDataList()[i].dataType;
							//loggerUtil.log("tyep is - " + type );
							filter.dataType(type);
							filter.operatorValue(['EQ']);
							break;
						}
					}
					//loggerUtil.log("New Type of Chart-" +columnName);
					for (var j = 0; j < self.columnDataBIList().length; j++) {
						var name1 = self.columnDataBIList()[j].name;
						if (name1 === columnName) {
							var type1 = self.columnDataBIList()[j].dataType;
							//loggerUtil.log("tyep is - " + type1 );
							filter.dataType(type1);
							filter.operatorValue(['EQ']);
							break;
						}
					}
				}
			};

		}

		self.closeErrorDialog = function (event, data) {
			$("#bpm-dsb-warning-dialog").ojDialog("close");
		};

	}

	return customDashboardContainerModel;
});


define('text!pcs/charts/visualization/view/custom/businessAnalytics.html',[],function () { return '<div class="bpm-vis-panel">\n\t<div id="bpm-vis-business-analytics" class="demo-grid-sizes demo-grid-display">\n\t\t<div class="oj-flex">\n\t\t\t<div id="bpm-vis-cust-drawer" class="oj-flex-item oj-xl-3 oj-lg-3 oj-md-3 oj-sm-12  oj-panel bpm-vis-query-style">\n\t\t\t\t<div id="bpm-vis-cust-querytoolbar" class="bpm-vis-querytoolbar">\n\t\t\t\t\t<div aria-label="Query Toolbar">\n\t\t\t\t\t\t<span id="bpm-vis-left-headericon">\n\t\t                </span>\n\t\t\t\t\t\t<span id="reportsHeader" data-bind="text:bundle.vis.formlbl.reports"></span>\n\t\t\t\t\t\t<button id="bpm-vis-delete" class="bpm-vis-floatright"\n\t\t\t\t\t\t\t\tdata-bind="click:deleteConfirm, ojComponent: {\n\t\t\t\t                    component:\'ojButton\', label: bundle.vis.button.delete, display: \'icons\',  disabled: \'true\', chroming: \'half\',\n\t\t\t\t                    icons: {start:\'oj-fwk-icon bpm-vis-trash-icon\'}\n\t\t\t\t                }">\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button id="bpm-vis-copy" class="bpm-vis-floatright"\n\t\t\t\t\t\t\t\tdata-bind="click: copyQuery, ojComponent: {\n\t\t\t\t                    component:\'ojButton\', label: bundle.vis.button.copy, display: \'icons\', disabled: \'true\', chroming: \'half\',\n\t\t\t\t                    icons: {start:\'oj-fwk-icon bpm-vis-copy-icon\'}\n\t\t\t\t                }">\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button id="bpm-vis-new" class="bpm-vis-floatright"\n\t\t\t\t\t\t\t\tdata-bind="click: newQuery, ojComponent: {\n\t\t\t\t                    component:\'ojButton\', label: bundle.vis.button.new, display: \'icons\', chroming: \'half\',\n\t\t\t\t                    icons: {start:\'oj-fwk-icon bpm-vis-new-icon\'}\n\t\t\t\t                }">\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<ul id="bpm-vis-query-listview"\n\t\t\t\t\tdata-bind="ojComponent: {\n\t\t\t\t       \t\tcomponent: \'ojListView\',\n\t\t\t\t       \t\tdata: queriesDS,\n\t\t\t\t       \t\tselection: selectedQuery,\n\t\t\t\t       \t\tselectionMode: \'single\',\n\t\t\t\t       \t\titem: {\n\t\t\t\t       \t\t\t\ttemplate: \'bpm-vis-listTemplate\'\n\t\t\t\t\t            }\n\t\t\t\t       \t\t},\n\t\t\t\t       \t\ttranslations : { msgNoData  : bundle.vis.chart.no_saved_queries},\n\t\t\t\t       \t\t">\n\t\t\t\t</ul>\n\t\t\t\t<script type="text/html" id="bpm-vis-listTemplate">\n\t\t\t\t\t<li class="bpm-vis-queryItem">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class="">\n\t\t\t\t                <span class=\'bpm-vis-listitem clipped\' data-bind="text:label, attr:{title:label}">\n\t\t\t\t                </span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t</script>\n\t\t\t</div>\n\t\t\t<div class="oj-flex-item oj-lg-1 oj-md-1 oj-sm-12  bpm-vis-snap-out">\n\t\t\t\t<div class="bpm-vis-snap-middle">\n\t\t\t\t\t<div id="show-hide-navigation" class="bpm-vis-hide-navlist"\n\t\t\t\t\t\t data-bind="click: handleSnapBtnClick"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id="bpm-vis-chart" class="oj-flex-item oj-lg-8 oj-md-8 oj-sm-12 ">\n\t\t\t\t<div class="bpm-vis-hidden box-shadow" id="bpm-vis-chart-row1">\n\t\t\t\t\t<div id="bpm-vis-title-area">\n\t\t\t\t\t\t<input id="bpm-vis-chartname-input"  type="text" aria-label="Query Name"\n\t\t\t\t\t\t\t   data-bind="ojComponent: {component: \'ojInputText\', value: queryName, rootAttributes:{style: \'margin-bottom:2px;\'}}"/>\n\t\t\t\t\t\t<input id="bpm-vis-chartname-desc"  type="text" aria-label="Query Description"\n\t\t\t\t\t\t\t   data-bind="ojComponent: {component: \'ojInputText\', value: description, placeholder:bundle.vis.formlbl.description}"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span id="bpm-vis-btnset">\n\t\t\t\t\t    <a id="bpm-vis-cust-download-btn" href="#" class="bpm-vis-floatright"\n\t\t\t\t\t\t   data-bind="click: downloadCsv, attr: {title: bundle.vis.button.download_csv},\n\t\t\t                                   ojComponent: {component:\'ojButton\',\n\t\t\t                                   label: bundle.vis.button.download_csv,\n\t\t\t                                   display: \'icons\', chroming: \'half\',\n\t\t\t                                   icons: {start: \'bpm-vis-download-icon oj-fwk-icon\'}\n\t\t\t                        }">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<button id="bpm-vis-save" class="bpm-vis-floatright"\n\t\t\t\t\t\t\t\tdata-bind="click: saveQuery, ojComponent: {\n\t\t\t\t\t                    component:\'ojButton\', chroming: \'half\', label: bundle.vis.button.save, display: \'icons\',\n\t\t\t\t\t                    icons: {start:\'oj-fwk-icon bpm-vis-save-icon\'}\n\t\t\t\t\t                }">\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button id="bpm-vis-refresh" class="bpm-vis-floatright"\n\t\t\t\t\t\t\t\tdata-bind="click: resetQuery, ojComponent: {\n\t\t\t\t\t                    component:\'ojButton\', chroming: \'half\', label: bundle.vis.button.reset, display: \'icons\',\n\t\t\t\t\t                    icons: {start:\'oj-fwk-icon bpm-vis-refresh-icon\'}\n\t\t\t\t\t                }">\n\t\t\t\t\t\t</button>\n\n\t\t\t\t\t</span>\n\n\t\t\t\t</div>\n\t\t\t\t<div class="bpm-vis-hidden bpm-vis-chart-row2" id="bpm-vis-chart-row2">\n\t\t\t\t\t<!--<button id="bpm-vis-querybtn" data-bind="ojComponent: {component: \'ojButton\',-->\n\t\t\t\t\t<!--label: bundle.vis.button.query,-->\n\t\t\t\t\t<!--icons:{end:\'oj-fwk-icon-arrow02-s oj-fwk-icon\'},-->\n\t\t\t\t\t<!--chroming: \'outlined\'},-->\n\t\t\t\t\t<!--click: handleQueryBtn">-->\n\t\t\t\t\t<!--</button>-->\n\t\t\t\t\t<span id="bpm-vis-querybtn" data-bind="ojComponent: {component: \'ojButtonset\', checked: selectedQueryBtn}">\n\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-querybtn"></label>\n\t\t\t\t\t\t\t\t<input type="checkbox" id="bpm-vis-cust-querybtn" value="visible"\n\t\t\t\t\t\t\t\t\t   data-bind="attr:{title:bundle.vis.button.query},\n\t\t\t\t\t\t\t\t\t\tojComponent: { component: \'ojButton\',\n\t\t\t\t\t\t\t\t\t\tlabel: bundle.vis.button.query,\n\t\t\t\t\t\t\t\t\t\tchroming: \'outlined\',\n\t\t\t\t\t\t\t\t\t\ticons:{end:\'oj-fwk-icon-arrow02-s oj-fwk-icon\'},\n\t\t\t\t\t\t\t\t\t\trootAttributes: {style:\'font-weight: bold;\'}}"/>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span id="bpm-vis-chart-tools">\n\t\t\t\t\t\t<span id=\'bpm-vis-cust-chart-selection\'>\n\t\t\t\t\t\t\t<!-- Grid Toggle button -->\n\t\t                    <span id="bpm-vis-cust-chart-icons"\n\t\t\t\t\t\t\t\t  data-bind="ojComponent: {component: \'ojButtonset\', checked: selectedChartType, chroming: \'outlined\'}"\n\t\t\t\t\t\t\t\t  aria-label="Select chart type.">\n\t\t\t\t\t\t\t\t<!-- ko foreach: chartTypeList -->\n\t\t\t\t\t\t\t\t\t\t<label data-bind="attr: {for: name}"></label>\n\t\t\t\t\t\t\t\t\t\t<input type="radio" name="chart-types"\n\t\t\t\t\t\t\t\t\t\t\t   data-bind="value: name, attr: {id: name},\n\t\t\t\t\t\t\t\t\t\tojComponent: { component: \'ojButton\', label: displayName, icons: {start: icon}, display: \'icons\'}"/>\n\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t                    </span>\n\t\t                    <span id="bpm-vis-cust-grid-toggle"\n\t\t\t\t\t\t\t\t  data-bind="ojComponent: {component: \'ojButtonset\', checked: selectedGridToggle}">\n\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-data-grid"></label>\n\t\t\t\t\t\t\t\t<input type="checkbox" id="bpm-vis-cust-data-grid" value="dataGrid"\n\t\t\t\t\t\t\t\t\t   data-bind="attr:{title:bundle.vis.button.graph_data},\n\t\t\t\t\t\t\t\t\t\tojComponent: { component: \'ojButton\',\n\t\t\t\t\t\t\t\t\t\tlabel: bundle.vis.button.graph_data,\n\t\t\t\t\t\t\t\t\t\tdisplay: \'icons\', chroming: \'outlined\',\n\t\t\t\t\t\t\t\t\t\ticons: {start: \'bpm-vis-table-icon oj-fwk-icon\'}}"/>\n\t\t\t\t\t\t\t</span>\n\t\t                </span>\n\t\t\t\t\t</span>\n\t\t\t\t\t<div id="bpm-vis-lastNDays" class="bpm-vis-floatright">\n\t\t\t\t\t\t<select id="bpm-vis-lastNDaySelect" aria-label="Data for last" data-bind="ojComponent: {component: \'ojSelect\',\n                                                    value: selectedLastDays,\n                                                    optionChange: handleLastNDaySelect,\n                                                    rootAttributes: {style:\'max-width:6em\'}}">\n\t\t\t\t\t\t\t<!-- ko foreach: lastNDaysFilter -->\n\t\t\t\t\t\t\t<option data-bind="value:id, text:label ,title:label"></option>\n\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="bpm-vis-ndaystxt" class="bpm-vis-floatright"><span id="bpm-vis-ndaysspan"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text: bundle.vis.formlbl.data_last"></span>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="oj-lg-12 oj-md-12 oj-sm-12 bpm-vis-hidden" id="bpm-vis-popup1"\n\t\t\t\t\t\t data-bind="ojComponent:{component: \'ojPopup\', initialFocus: \'none\', autoDismiss : \'none\', rootAttributes: {style:\'margin-top:40px\'}}">\n\t\t\t\t\t\t<!-- <div id="bpm-vis-pop-container" data-bind="ojModule: {viewName: \'custom/queryForm\'" ></div> -->\n\t\t\t\t\t\t<div class="">\n\t\t\t\t\t\t\t<div class="oj-form oj-md-odd-cols-4 oj-md-labels-inline">\n\t\t\t\t\t\t\t\t<div  class=" oj-md-labels-inline ">\n\t\t\t\t\t\t\t\t\t<div class="oj-flex oj-sm-justify-content-flex-end">\n\t\t\t\t\t\t\t\t\t\t<button id="bpm-vis-close-popup" class="bpm-vis-floatright"\n\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="click: closePopup, ojComponent: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tcomponent:\'ojButton\', label: bundle.vis.button.close, display: \'icons\', chroming: \'half\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ticons: {start:\'oj-fwk-icon oj-fwk-icon-cross\'}\n\t\t\t\t\t\t\t\t\t\t\t\t\t}">\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div id="bpm-vis-cust-ds-div" class="oj-flex oj-md-labels-inline">\n\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-data-source-list"\n\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.data_source_type"></label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t<select id="bpm-vis-cust-data-source-list" data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: selectedDataSource, optionChange: dataSourceChangeHandler,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trootAttributes: {style:\'max-width:20em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: dataSourceList -->\n\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName, title:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div id="bpm-vis-cust-app-div" class="oj-flex oj-md-labels-inline">\n\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-app-list"\n\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.select_application"></label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t<select id="bpm-vis-cust-app-list" data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: selectedAppName, optionChange: appNameChangeHandler,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trootAttributes: {style:\'max-width:20em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t<option value="ANY"\n\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text: bundle.vis.formlbl.select_application_opt1"></option>\n\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: appNameList -->\n\t\t\t\t\t\t\t\t\t\t\t<option data-bind="text:name, title:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<fieldset class="oj-form oj-md-odd-cols-4 oj-md-labels-inline">\n\t\t\t\t\t\t\t\t\t<legend class="bold-txt"\n\t\t\t\t\t\t\t\t\t\t\tdata-bind="text: bundle.vis.formlbl.x_axis"></legend>\n\t\t\t\t\t\t\t\t\t<div class="oj-flex">\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-series-list"\n\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.series"></label>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<select id="bpm-vis-cust-series-list" data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: selectedSeries, optionChange : seriesChangeHandler,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trootAttributes: {style:\'max-width:20em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t\t<optgroup\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="attr:{label: bundle.vis.formlbl.business_indicators}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: dimensionBIList -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\n\t\t\t\t\t\t\t\t\t\t\t\t<optgroup\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="attr:{label: bundle.vis.formlbl.system_indicators}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: dimensionList -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div id="bpm-vis-srs-timegroups" class="oj-flex bpm-vis-timegroups">\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-timegroups-series"\n\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.timegroups"></label>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<select id="bpm-vis-cust-timegroups-series" data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: selectedSrsTimeGroup, placeholder: bundle.vis.formlbl.select_none, rootAttributes: {style:\'max-width:20em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: timeGroups -->\n\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:id, text:label"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="oj-flex">\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-group-list"\n\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.group"></label>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<select id="bpm-vis-cust-group-list" data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: selectedGroup, optionChange : groupChangeHandler, rootAttributes: {style:\'max-width:20em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t\t<optgroup\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="attr:{label: bundle.vis.formlbl.business_indicators}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: dimensionBIList -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\n\t\t\t\t\t\t\t\t\t\t\t\t<optgroup\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="attr:{label: bundle.vis.formlbl.system_indicators}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: dimensionList -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div id="bpm-vis-grp-timegroups" class="oj-flex bpm-vis-timegroups">\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-timegroups-group"\n\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.timegroups"></label>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<select id="bpm-vis-cust-timegroups-group" data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: selectedGrpTimeGroup, placeholder: bundle.vis.formlbl.select_none, rootAttributes: {style:\'max-width:20em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: timeGroups -->\n\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:id, text:label"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</fieldset>\n\t\t\t\t\t\t\t\t<fieldset class="oj-form oj-md-odd-cols-4 oj-md-labels-inline">\n\t\t\t\t\t\t\t\t\t<legend class="bold-txt"\n\t\t\t\t\t\t\t\t\t\t\tdata-bind="text: bundle.vis.formlbl.y_axis"></legend>\n\t\t\t\t\t\t\t\t\t<div class="oj-flex">\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-measure-list"\n\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.measure"></label>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<select id="bpm-vis-cust-measure-list"\n\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="ojComponent: {component: \'ojSelect\', disabled:measureDisabled, value: selectedMeasure, optionChange: measureChangeHandler, rootAttributes: {style:\'max-width:20em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t\t<option value=\'*\' disabled\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text: bundle.vis.formlbl.select_none"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<optgroup\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="attr:{label: bundle.vis.formlbl.business_indicators}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: measureBIList -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\n\t\t\t\t\t\t\t\t\t\t\t\t<optgroup\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="attr:{label: bundle.vis.formlbl.system_indicators}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: measureList -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="oj-flex">\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-function-list"\n\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.function"></label>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t\t<select id="bpm-vis-cust-function-list" data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: selectedFunction, optionChange: functionChangeHandler,rootAttributes: {style:\'max-width:20em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: functionList -->\n\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</fieldset>\n\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<div class="">\n\t\t\t\t\t\t\t\t\t<div class="oj-label-inline">\n\t\t\t\t\t\t\t\t\t\t<label id="bpm-vis-cust-match" class="oj-label-inline"\n\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.match"></label>\n\t\t\t\t\t\t\t\t\t\t<div data-bind="ojComponent: {component: \'ojRadioset\' ,value :selectedFilterType}"\n\t\t\t\t\t\t\t\t\t\t\t aria-labelledby="bpm-vis-cust-match">\n\t\t\t\t\t\t\t\t\t\t\t<span class="oj-choice-row-inline">\n\t\t\t\t\t\t\t\t\t\t\t\t<input id="bpm-vis-cust-match-all" type="radio" name="filterType"\n\t\t\t\t\t\t\t\t\t\t\t\t\t   value="ALL">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-match-all"\n\t\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.all"></label>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="oj-choice-row-inline">\n\t\t\t\t\t\t\t\t\t\t\t\t<input id="bpm-vis-cust-match-any" type="radio" name="filterType"\n\t\t\t\t\t\t\t\t\t\t\t\t\t   value="ANY">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for="bpm-vis-cust-match-any"\n\t\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="text: bundle.vis.formlbl.any"></label>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="bpm-vis-floatright">\n\t\t\t\t\t\t\t\t\t\t<button data-bind="click: addFilter, attr: {title: bundle.vis.button.add_filter},\n\t\t\t\t\t\t\t\t\t\t\t   ojComponent: {component:\'ojButton\',\n\t\t\t\t\t\t\t\t\t\t\t   label: bundle.vis.button.add_filter,\n\t\t\t\t\t\t\t\t\t\t\t   icons: {start: \'bpm-vis-add-filter-icon oj-fwk-icon\'}}">\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="">\n\t\t\t\t\t\t\t\t\t<hr/>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=" oj-cols-nopad">\n\t\t\t\t\t\t\t\t\t<!-- ko foreach: filterCriteriaList -->\n\t\t\t\t\t\t\t\t\t<div class="oj-flex oj-cols-nopad bpm-vis-filters-style">\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item oj-lg-4 oj-md-8 oj-sm-12 ">\n\n\t\t\t\t\t\t\t\t\t\t\t<select data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: columnDataValue, optionChange: columnDataValueChangeHandler}">\n\t\t\t\t\t\t\t\t\t\t\t\t<optgroup\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="attr:{label: $parent.bundle.vis.formlbl.business_indicators}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: $parent.columnDataBIList -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName ,title:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\n\t\t\t\t\t\t\t\t\t\t\t\t<optgroup\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="attr:{label: $parent.bundle.vis.formlbl.system_indicators}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko foreach: $parent.columnDataList -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option data-bind="value:name, text:displayName ,title:displayName"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item oj-lg-4 oj-md-8 oj-sm-12 ">\n\t\t\t\t\t\t\t\t\t\t\t<select data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: operatorValue}">\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="EQ"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filter.equal"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="NE"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filter.not_equal"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="NULL"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filter.null"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="NOTNULL"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filter.not_null"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko ifnot: dataType() == \'VARCHAR\' || dataType() == \'BOOLEAN\'-->\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="LT"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filter.lesser"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="LE"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filter.lesser_equal, attr:{title:$parent.bundle.vis.filter.lesser_equal}"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="GT"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filter.greater"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="GE"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filter.greater_equal"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- ko if: dataType() == \'VARCHAR\' -->\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="LIKE" data-bind="text:$parent.bundle.vis.filter.like"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="NOTLIKE" data-bind="text:$parent.bundle.vis.filter.not_like" ></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="oj-flex-item oj-lg-4 oj-md-8 oj-sm-12 ">\n\t\t\t\t\t\t\t\t\t\t\t<!-- ko ifnot: operatorValue()== \'NULL\' || operatorValue()== \'NOTNULL\'-->\n\t\t\t\t\t\t\t\t\t\t\t<!-- ko if: dataType()== \'BOOLEAN\' -->\n\t\t\t\t\t\t\t\t\t\t\t<select data-bind="ojComponent: {component: \'ojSelect\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: selectedValue}">\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="TRUE"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filterValues.true"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tselected="selected"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t<option value="FALSE"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="text:$parent.bundle.vis.filterValues.false"></option>\n\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t<!-- ko if: dataType()== \'VARCHAR\'-->\n\t\t\t\t\t\t\t\t\t\t\t<input data-bind="ojComponent: {component: \'ojInputText\',validators : [{type: \'regExp\', options : {pattern: \'[a-zA-Z0-9. _-]{1,}\',hint: $parent.bundle.vis.error_msg.hintAlphanumeric, messageSummary: \'Value \\\'{value}\\\' Invalid\',messageDetail: $parent.bundle.vis.error_msg.msgAlphanumeric}}], value:selectedValue, rootAttributes: {style:\'max-width:16em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t<!-- ko if: dataType()== \'INT\' || dataType()== \'DECIMAL\'-->\n\t\t\t\t\t\t\t\t\t\t\t<input data-bind="ojComponent: {component: \'ojInputText\', validators : [{type: \'regExp\', options : {pattern: \'[0-9.]{1,}\',hint: $parent.bundle.vis.error_msg.hintNumber, messageSummary: \'Value \\\'{value}\\\' Invalid\',messageDetail: $parent.bundle.vis.error_msg.msgNumber}}], value:selectedValue, rootAttributes: {style:\'max-width:16em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t<!-- ko if: dataType()== \'DATETIME\' -->\n\t\t\t\t\t\t\t\t\t\t\t<input data-bind="ojComponent: {component: \'ojInputDateTime\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: selectedValue, rootAttributes: {style:\'max-width:16em\'}}">\n\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t\t\t\t<button id="bpm-vis-delete-row" class="bpm-vis-floatright"\n\t\t\t\t\t\t\t\t\t\t\t\t\tdata-bind="click:$parent.removeFilter, ojComponent: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tcomponent:\'ojButton\', label: $parent.bundle.vis.button.delete, display: \'icons\', chroming: \'half\',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ticons: {start:\'oj-fwk-icon oj-fwk-icon-cross02\'}\n\t\t\t\t\t\t\t\t\t\t\t\t\t}">\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t<div class="oj-flex oj-sm-justify-content-center ">\n\t\t\t\t\t\t\t\t\t<button id="bpm-vis-visualize-btn" class="oj-button-primary" data-bind="click: visualize,\n\t\t\t\t\t\t\t\t\t\t\t\t\tattr: {title: bundle.vis.button.visualize},\n\t\t\t\t\t\t\t\t\t\t\t\t\tojComponent: {component:\'ojButton\', label: bundle.vis.button.visualize}">\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="">\n\t\t\t\t\t<div id="bpm-vis-cust-main" class="oj-lg-12 oj-md-12 oj-sm-12 ">\n\t\t\t\t\t\t<div class="">\n\t\t\t\t\t\t\t<div id="bpm-vis-cust-splash" class="bpm-vis-splash-style">\n\t\t\t\t\t\t\t\t<span class="bpm-vis-chart-msg"\n\t\t\t\t\t\t\t\t\t  data-bind="text:bundle.vis.chart.blank_chart_header"></span><br><br>\n\t\t\t\t\t\t\t\t<span class="bpm-vis-chart-msgdtl"\n\t\t\t\t\t\t\t\t\t  data-bind="text:bundle.vis.chart.blank_chart_details"></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div id="bpm-vis-cust-chart-container" class="  bpm-vis-center-align bpm-vis-hidden">\n\t\t\t\t\t\t\t\t<div id="bpm-vis-cust-chart" class="bpm-vis-center-align bpm-vis-chart-style"\n\t\t\t\t\t\t\t\t\t data-bind="ojComponent: {\n\t\t                                    component: \'ojChart\',\n\t\t                                    type: selectedChartType,\n\t\t                                    orientation: orientationValue,\n\t\t                                    stack: stackValue,\n\t\t                                    animationOnDisplay: \'auto\',\n\t\t                                    animationOnDataChange: \'auto\',\n\t\t\t\t\t\t\t                hoverBehavior: \'dim\',\n\t\t\t\t\t\t\t                zoomAndScroll: \'live\',\n\t\t\t\t\t\t\t                overview: {rendered: \'on\', height: \'65px\'},\n\t\t                                    yAxis: {title: yLabel()},\n\t\t                                    xAxis: {title: xLabel()},\n\t\t                                    legend: {position: \'end\'},\n\t\t\t\t\t\t\t                translations : { labelNoData : bundle.vis.chart.no_chart_data},\n\t\t\t\t\t\t\t                title : {text :  selectedVisualizationName() , halign : \'plotAreaCenter\' },\n\t\t\t\t\t\t\t                hideAndShowBehavior: \'withRescale\',\n\t\t                                    series: barSeriesValue,\n\t\t                                    groups: barGroupsValue,\n\t\t                                }">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div id="bpm-vis-cust-grid-data" class="bpm-vis-center-align bpm-vis-hidden">\n\t\t\t\t\t\t\t\t\t<table id="bpm-vis-cust-table" summary="Chart Data Table"\n\t\t\t\t\t\t\t\t\t\t   aria-label="Chart Data Table"\n\t\t\t\t\t\t\t\t\t\t   data-bind="ojComponent: {component: \'ojTable\',\n\t\t                                                            data: gridDataSource,\n\t\t                                                            display: \'grid\',\n\t\t                                                            translations: {msgNoData : bundle.vis.chart.no_chart_data},\n\t\t                                                            columnsDefault: {sortable: \'none\'},\n\t\t                                                            columns: headerTextArr,\n\t\t                                                            rootAttributes: {\'style\':\'width: 600px; height: 600px;margin-top:20px;\'}}">\n\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div id="bpm-vis-cust-chart-overlay"></div>\n\t\t\t\t\t\t\t\t<div class="bpm-vis-center-align bpm-vis-tool-style oj-flex oj-sm-justify-content-center" id="bpm-vis-cust-toolbar"\n\t\t\t\t\t\t\t\t\t aria-label="Chart Display Options Toolbar"\n\t\t\t\t\t\t\t\t\t data-bind="ojComponent: {component:\'ojToolbar\'}">\n\t\t                            <span id="bpm-vis-cust-graph-tools" class="oj-flex-item">\n\t\t\t\t\t\t\t\t\t\t<!-- vertical/horizontal toggle button -->\n\t\t                                <span id="bpm-vis-cust-radio-buttonset"\n\t\t\t\t\t\t\t\t\t\t\t  data-bind="ojComponent: {component: \'ojButtonset\', focusManagement:\'none\', checked: orientationValue}"\n\t\t\t\t\t\t\t\t\t\t\t  class="oj-button-half-chrome" aria-label="Choose an orientation.">\n\t\t                                    <!-- ko foreach: orientationOptions -->\n\t\t                                    <label data-bind="attr: {for: id}"></label>\n\t\t                                    <input type="radio" name="orientation"\n\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="value: value, attr: {id: id},\n\t\t                                            ojComponent: {component: \'ojButton\', label: label,\n\t\t                                            icons: {start: icon}, display: \'icons\'}"/>\n\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t                                </span>\n\t\t                                <span role="separator" aria-orientation="vertical"\n\t\t\t\t\t\t\t\t\t\t\t  class="oj-toolbar-separator"></span>\n\t\t\t\t\t\t\t\t\t\t<!-- unstacked/stacked toggle button -->\n\t\t                                <span id="bpm-vis-cust-radio-buttonset2"\n\t\t\t\t\t\t\t\t\t\t\t  data-bind="ojComponent: {component: \'ojButtonset\', focusManagement:\'none\', checked: stackValue}"\n\t\t\t\t\t\t\t\t\t\t\t  class="oj-button-half-chrome" aria-label="Choose a stack setting.">\n\t\t                                    <!-- ko foreach: stackOptions -->\n\t\t                                    <label data-bind="attr: {for: id}"></label>\n\t\t                                    <input type="radio" name="stack"\n\t\t\t\t\t\t\t\t\t\t\t\t   data-bind="value: value, attr: {id: id},\n\t\t                                               ojComponent: {component: \'ojButton\', label: label,\n\t\t                                                icons: {start: icon}, display: \'icons\'}"/>\n\t\t\t\t\t\t\t\t\t\t\t<!-- /ko -->\n\t\t                                </span>\n\t\t                            </span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="bpm-vis-hidden" id="bpm-dsb-warning-dialog"\n\t\t data-bind="attr : { title : bundle.vis.dialog.warning }, ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\'}">\n\t\t<div class="oj-dialog-body">\n\t\t\t<div id="bpm-vis-warning-dialog-text"></div>\n\t\t</div>\n\t\t<div class="oj-dialog-footer">\n\t\t\t<button data-bind="click : closeErrorDialog , ojComponent: {component: \'ojButton\', label: bundle.vis.dialog.ok}"></button>\n\t\t</div>\n\t</div>\n\t<div class="bpm-vis-hidden" id="bpm-dsb-confirm-dialog"\n\t\t data-bind="attr : { title : bundle.vis.dialog.confirm }, ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\'}">\n\t\t<div class="oj-dialog-body">\n\t\t\t<div id="bpm-vis-confirm-dialog-text"></div>\n\t\t</div>\n\t\t<div class="oj-dialog-footer">\n\t\t\t<button id="bpm-vis-cancelButton"\n\t\t\t\t\tdata-bind="click : function(){$(\'#bpm-dsb-confirm-dialog\').ojDialog(\'close\');} , ojComponent: {component: \'ojButton\', label: bundle.vis.dialog.cancel}"></button>\n\t\t\t<button id="bpm-vis-okButton"\n\t\t\t\t\tdata-bind="click : deleteQuery , ojComponent: {component: \'ojButton\', label: bundle.vis.dialog.ok}"></button>\n\t\t</div>\n\t</div>\n\t<div class="bpm-vis-hidden" id="bpm-vis-delete-app"\n\t\t data-bind="attr : { title : bundle.vis.dialog.confirm }, ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\', cancelBehavior: \'none\'}">\n\t\t<div class="oj-dialog-body">\n\t\t\t<div id="bpm-vis-delete-app-text"></div>\n\t\t\t</br>\n\t\t\t<div data-bind="text: bundle.vis.dialog.delete_app_msg"></div>\n\t\t</div>\n\t\t<div class="oj-dialog-footer">\n\t\t\t<button id="bpm-vis-deleteButton"\n\t\t\t\t\tdata-bind="click : deleteQuery , ojComponent: {component: \'ojButton\', label: bundle.vis.dialog.delete}"></button>\n\t\t\t<button id="bpm-vis-continueButton"\n\t\t\t\t\tdata-bind="click : newQuery , ojComponent: {component: \'ojButton\', label: bundle.vis.dialog.continue}"></button>\n\t\t</div>\n\t</div>\n\t<div id="bpm-vis-main-splash" style="display: none" class="bpm-vis-splash-style ">\n\t\t<span class="bpm-vis-chart-msg"\n\t\t\t  data-bind="text:bundle.vis.formlbl.start_msg"></span><br><br>\n\t\t<button id="bpm-vis-startButton" class="bpm-vis-startBtn oj-button-confirm" data-bind="click : handleStartClick , ojComponent: {component: \'ojButton\', label: bundle.vis.button.start,\n\t\t\t\t\ticons: {end:\'oj-fwk-icon bpm-vis-start-icon\'}}"></button>\n\t</div>\n</div>\n';});

/**
 * Created by nisabhar on 11/20/2015.
 */

define('pcs/charts/visualization/viewModel/visualizationContainer',['ojs/ojcore' ,'knockout', 'pcs/charts/visualization/viewModel/util/visualizationUtil', 'ojs/ojknockout',
	'pcs/charts/visualization/viewModel/custom/customDashboard',
	'!text!pcs/charts/visualization/view/custom/businessAnalytics.html', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko,util) {
	/**
	 * The view model for the main content view template
	 */
	function visualizationContainerModel(params) {
		var self = this;
		this.parent = params.parent;
		this.baseURL = this.parent.baseURL; //server address
		this.baseRestUrl = this.parent.baseRestURL; //Rest

		this.authInfo = this.parent.authInfo; // Login credentials

		this.chartEndpoint = "analytics/ootbqueries/";

		this.processTrackingPage = this.parent.processTrackingPage;
		this.tasksPage = this.parent.tasksPage;

		this.rootElement= this.parent.rootElement;

		// Hide the dashboard loading indicator
		$("#bpm-vis-loading-indicator",this.rootElement).hide();

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');
	}

	return visualizationContainerModel;
});


define('text!pcs/charts/visualization/view/visualizationContainer.html',[],function () { return '<div id="bpm-vis-container">\n\t<div id="bpm-vis-custom" class="bpm-vis-tab-panel">\n\t\t<div id="bpm-vis-custom-container" data-bind="ojModule: { name: \'pcs/charts/visualization/viewModel/custom/customDashboard\',\n        viewName: \'pcs/charts/visualization/view/custom/businessAnalytics\', params: {parent: $data}}">\n\t\t</div>\n\t</div>\n\n</div>\n';});

/**
 * Created by nisabhar on 11/20/2015.
 */


define('pcs/pcs.visualization',['ojs/ojcore', 'knockout', 'jquery','!text!pcs/charts/visualization/templates/pcs-visualization.html', 'pcs/util/pcsUtil', 'pcs/util/loggerUtil',
	'pcs/charts/visualization/viewModel/visualizationContainer','!text!pcs/charts/visualization/view/visualizationContainer.html',
	'ojs/ojmodule' , 'jqueryui-amd/widget'],
	function( oj, ko, $, tmpl,pcsUtil) {
		'use strict';
		// define your widget under pcs namespace
		$.widget('pcs.visualization', {
			//Options to be used as defaults
			options: {
				//data sources
				baseUri: '',
				baseRestUri : '/bpm/api/3.0/analytics/',
				username : 'weblogic',
				password : 'weblogic1',
				processTrackingPage: 'processTracking.jspx',
				tasksPage          : 'worklist.jspx'

			},

			/**
			 * Creates basic auth header for given username and password
			 */
			_authHeader: function () {
				return pcsUtil.getAuthInfo();
			},

			//Setup widget (eg. element creation, apply theming
			// , bind events etc.)
			_create: function () {
				// _create will automatically run the first time
				// this widget is called. Put the initial widget
				// setup code here, then you can access the element
				// on which the widget was called via this.element.
				// The options defined above can be accessed
				// via this.options this.element.addStuff();
				var widget = this;

				this.options.baseUri= pcsUtil.getServerURL();

				function rootViewModel() {
					var self = this;
					self.baseURL = widget.options.baseUri;
					self.baseRestURL = self.baseURL + widget.options.baseRestUri;
					self.processTrackingPage = self.baseURL + widget.options.processTrackingPage;
					self.tasksPage = self.baseURL + widget.options.tasksPage;
					self.authInfo = widget._authHeader(); // Login credentials
					self.rootElement= widget.element;
				}

				var vm = new rootViewModel();

				this.element.html(tmpl);

				//bind your ViewModel for the content of whole page body.
				ko.applyBindings(vm, this.element['0']);
			},



			// Respond to any changes the user makes to the option method
			_setOption: function (key, value) {
				this.options[key] = value;

				// For UI 1.8, _setOption must be manually invoked
				// from the base widget
				$.Widget.prototype._setOption.apply(this, arguments);
				// For UI 1.9 the _super method can be used instead
				// this._super( "_setOption", key, value );
			}
		});
	});


//# sourceMappingURL=pcs.visualization.js.map