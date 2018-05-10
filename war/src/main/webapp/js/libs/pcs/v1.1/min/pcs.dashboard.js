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


define('text!pcs/charts/dashboard/templates/pcs-dashboard.html',[],function () { return '<div id="bpm-charts-mainContainer">\n\t<div  class="oj-sm-12 bpm-dsb-center-align">\n\t\t<div id="bpm-dsb-loading-indicator" class="bpm-dsb-center-align bpm-dsb-loading"/>\n\t</div>\n\t<div class="oj-flex">\n\t\t<div class="oj-xl-12 oj-lg-12 oj-md-12 oj-col">\n\t\t\t<div id="dashboardContainer" data-bind="ojModule: { name: \'pcs/charts/dashboard/viewModel/dashboardContainer\', viewName: \'pcs/charts/dashboard/view/dashboardContainer\',\n\t\t\t\tparams: {parent: $data}}"></div>\n\t\t</div>\n\t</div>\n</div>\n';});

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
 * Created by nisabhar on 6/30/2015.
 */


define('pcs/charts/dashboard/util',[], function () {

	_columnAlias = function(data) {
		if (data.columnsInfo) {
			var ret = {};
			var i;
			for (i = 0; i < data.columnsInfo.length; i++) {
				ret[data.columnsInfo[i].columnName.replace("TASK","PROCESS")] = i;
			}
			return ret;
		}
	};

	// method to create the parameter list for the query
	_paramList= function(chart){
		var param ="";
		var filterPanel = chart.parent.filterPanel;

		if (filterPanel){

			// If the user has not selected all process add the process name in parameter list
			if(!filterPanel.selectedSelectAllProcess) {
				// add  all the processes added
				for (var i = 0; i < filterPanel.selectedProcesses.length; i++) {
					param = param + "&processNames=" + encodeURIComponent(filterPanel.selectedProcesses[i]);
				}
				// if no process is added, then send with empty process name
				if(param === ""){
					param = param + "&processNames=";
				}
			}

			if(filterPanel.selectedAssignees && filterPanel.selectedAssignees.length === 1){
				param = param + "&assigneeType=" + encodeURIComponent(filterPanel.selectedAssignees[0]);
			}

			if (filterPanel.selectedTopN)
				param = param + "&topN=" + filterPanel.selectedTopN;

			if (filterPanel.selectedDateRange)
				param = param + "&daysAgo=" + filterPanel.selectedDateRange;

			if (param.length > 0)
				param = "?" + param.substring(1);
		}
		//loggerUtil.log(param);
		// to make sure ADF session remain active we do this
		_adfProxyCall();
		return param;
	};

	_adfProxyCall = function(url){
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


	_errorHandler = function (jqXHR, customMsg){
		$("#bpm-dsb-error-dialog").ojDialog("open");

		var msg = oj.Translations.getTranslatedString('container.generic_error_msg');

		if(customMsg){
			msg = customMsg;
		}

		else if (jqXHR && jqXHR.status === 401){
			msg= oj.Translations.getTranslatedString('container.access_error_msg');
		}

		$("#bpm-dsb-error-dialog-custom-text").text(msg);

	};

	_queries = {
		//Workload
		WORKLOAD_ANALYSIS_BILLBOARD : "WORKLOAD_ANALYSIS_BILLBOARD",
		// Workload top 10 Task
		OPEN_TASK_ON_TRACK_ANALYSIS_CHART : "OPEN_TASK_ON_TRACK_ANALYSIS_CHART",
		OPEN_TASK_OVER_DUE_ANALYSIS_CHART :"OPEN_TASK_OVER_DUE_ANALYSIS_CHART",
		OPEN_TASK_DUE_SOON_ANALYSIS_CHART : "OPEN_TASK_DUE_SOON_ANALYSIS_CHART",
		// Workload top 10 Assignee
		OPEN_ASSIGNEES_ON_TRACK_ANALYSIS_CHART : "OPEN_ASSIGNEES_ON_TRACK_ANALYSIS_CHART",
		OPEN_ASSIGNEES_DUE_SOON_ANALYSIS_CHART : "OPEN_ASSIGNEES_DUE_SOON_ANALYSIS_CHART",
		OPEN_ASSIGNEES_OVER_DUE_ANALYSIS_CHART: "OPEN_ASSIGNEES_OVER_DUE_ANALYSIS_CHART",
		// Workload bootleneck
		DUE_DATE_ANALYSIS_BY_OPEN_PROCESS_TREEMAP : "DUE_DATE_ANALYSIS_BY_OPEN_PROCESS_TREEMAP",
		DUE_DATE_ANALYSIS_BY_ASSIGNEE_TREEMAP : "DUE_DATE_ANALYSIS_BY_ASSIGNEE_TREEMAP",
		DUE_DATE_ANALYSIS_BY_OPEN_TASKS_TREEMAP :"DUE_DATE_ANALYSIS_BY_OPEN_TASKS_TREEMAP",

		// Health
		PROCESS_HEALTH_BILLBOARD :"PROCESS_HEALTH_BILLBOARD",
		PROCESS_HEALTH_TABLE : "PROCESS_HEALTH_TABLE"

	};


	return {
		columnAlias : _columnAlias,
		queries : _queries,
		paramList : _paramList,
		drilldown : _adfProxyCall,
		errorHandler : _errorHandler
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
 * Created by nisabhar on 6/12/2015.
 */

define('pcs/charts/dashboard/viewModel/dashboards/healthDashboard',['ojs/ojcore' ,'knockout','pcs/charts/dashboard/util', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko,util) {
	/**
	 * The view model for the main content view template
	 */
	function healthDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		self.parent = params.parent;	// hold the instance of dashboardContainer

		self.baseRestUrl = self.parent.baseRestUrl;
		self.restEndPoint = self.parent.baseRestUrl + self.parent.chartEndpoint;
		var authInfo =self.parent.authInfo; // Login credentials

		//count related bindings
		self.openCount = ko.observable(0);  // No of open task
		self.progressCount = ko.observable(0);  // No of active task
		self.recoverableCount = ko.observable(0);  //No.of recoverable task
		self.suspendedCount = ko.observable(0);  // No.of suspended task

		self.processTrackingPage = self.parent.processTrackingPage;
		self.totalCountURL= self.processTrackingPage;
		self.progressCountURL = self.processTrackingPage+"?status=OPEN&userRole=USER_ROLE_ADMIN";    // No of active task
		self.recoverableCountURL = self.processTrackingPage +"?status=FAULTED_RECOVERABLE&userRole=USER_ROLE_ADMIN";   //No.of recoverable task
		self.suspendedCountURL = self.processTrackingPage+ "?status=SUSPENDED&userRole=USER_ROLE_ADMIN" ;  // No.of suspended task

		//chart convertors for percentage
		//var converterFactory = oj.Validation.converterFactory('number');
		//var converterOptions = {style: 'percent'};

		//chart related bindings
		self.barSeriesValue = ko.observableArray();  // List of count on x axis
		self.barGroupsValue = ko.observableArray(); // List of processes on Y axis
		//self.yConverter = converterFactory.createConverter(converterOptions);

		//  Method to refresh the content
		self.refresh = function(){
			self.loadData();
			//Refresh Process list too
			self.parent.loadProcessList();
		};

		// method to create the parameter list for the query
		self.paramList= function(){
			var param = util.paramList(self);
			return param;
		};

		// Primary function for load/reload process data to display
		self.loadData = function() {
			var param =self.paramList();

			// Add overlays for loading
			$('#bpm-dsb-health-chart-overlay').addClass('bpm-dsb-load-overlay');

			//Load count data
			self.load(util.queries.PROCESS_HEALTH_BILLBOARD+param,self.populateHealthBillboardData);
			//Load chart data
			self.load(util.queries.PROCESS_HEALTH_TABLE+param,self.populateHealthTable);
		};

		// function for loading  data using AJAX
		self.load = function(query ,populate){
			var url = self.restEndPoint + query;
			$.ajax
			({
				type: "GET",
				url: url,
				beforeSend: function (xhr) {
					if (authInfo) {
						xhr.setRequestHeader('Authorization', authInfo);
					}
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				success: function (json) {
					populate(json);
				},
				error: function ( jqXHR) {
					populate();
					util.errorHandler(jqXHR);
				},
				failure: function () {
					loggerUtil.log('failed in loading health data -' + query);
				}
			});
		};

		// method to populate Billboard data
		self.populateHealthBillboardData = function(data){
			if(data && data.rows){
				var c = util.columnAlias(data);
				var row = data.rows[0]; // all the data is in the first row

				self.openCount(row.values[c.TOTAL_OPEN]+0);
				self.progressCount(row.values[c.TOTAL_ACTIVE]+0);
				self.suspendedCount(row.values[c.TOTAL_SUSPENDED]+0);
				self.recoverableCount(row.values[c.TOTAL_FAULTED_RECOVERABLE]+0);
			}
		};

		// method to populate charts
		// Data columns - "PROCESS_LABEL" , "PROCESS_INSTANCE_STATUS","TOTALCOUNT","PERCENTAGE"
		self.populateHealthTable = function(data){
			var barGroups = [];     //["Process 1", "Process 2" ,"Process 3", "Process 4" ,"Process 5"];
			var barSeriesNames =  [];  // Active, Recoverable ,Suspended

			var barSeriesItems = [];
			var barSeries = [];

			var barsColorArray = {
				'ACTIVE' :'#bde2a0',
				'RECOVERABLE' : '#f0a7a8',
				'SUSPENDED' :'#bee5f6',
				'ABORT':'#003366'
			};




			var stateMap ={}; //'ACTIVE' :0, 'RECOVERABLE' :1, 'SUSPENDED' :2, 'ABORT' :3 ....
			var processes = {}; // Create a object list in which process object has its states listed

			if(data && data.rows) {
				var c = util.columnAlias(data);
				for(var i=0 ;i< data.rows.length; i++){
					// Get the values for each column in the response
					var procName = data.rows[i].values[c.PROCESS_LABEL];
					var state = data.rows[i].values[c.PROCESS_INSTANCE_STATUS];
					var count = data.rows[i].values[c.TOTALCOUNT];
					var percent = data.rows[i].values[c.PERCENTAGE];
					var procId =data.rows[i].values[c.PROCESS_NAME];
					// create the list of distinct states being returned
					if(barSeriesNames.indexOf(state) === -1 ){
						stateMap[state] = barSeriesNames.length ;  //Add the state in stateMap and the index will be the current length of states added i.e first will be 0 , second 1 and so on
						barSeriesNames.push(state);
						barSeriesItems.push([]);
					}
					//create the list of distinct process being returned
					if(barGroups.map(function(e) { return e.id; }).indexOf(procId) === -1){
						barGroups.push({
							name : procName,
							id : procId,
							shortDesc : self.bundle.health.chart.process_id+ " : " + procId
						});
						processes[procId] = {'title' : procName};
					}
					// add the current state and the count info the the process object
					processes[procId][state] = {'COUNT' : count, 'PERCENT' :percent};
				}

				// Now we have the complete process list with all state info
				// Iterate over all the process object
				for (var proc in processes) {
					var process = processes[proc];
					// Iterate over all the sattes for this particular process
					for (var j=0; j<barSeriesNames.length ; j ++ ){
						var state = barSeriesNames[j];
						var stateName = oj.Translations.getTranslatedString(state);
						stateName = stateName ? stateName :state;
						// Check if this process has any instance in this particular state , add the values if it has else add 0
						if( process[state]  != undefined){
							barSeriesItems[stateMap[state]].push({
								y :process[state]['PERCENT'],
								label:process[state]['COUNT'],
								labelPosition:'auto',
								shortDesc: self.bundle.health.chart.state + " : " + stateName +
								"&lt;br/&gt;"+ self.bundle.health.chart.process_name + " : " + process.title +
								"&lt;br/&gt;"+ self.bundle.health.chart.process_id + " : " + proc +
								"&lt;br/&gt;" +	self.bundle.health.chart.no_instances + " : " + process[state]['COUNT'] +
								"&lt;br/&gt;" +	self.bundle.health.chart.percentage + " : " + process[state]['PERCENT'] + "%"
							});
						}else{
							barSeriesItems[stateMap[state]].push({y :0, label:0, labelPosition:'auto'});
						}
					}
				}

				// Create the chart  series using the above data
				for(var i=0 ;i<barSeriesNames.length ; i++){
					var state = barSeriesNames[i];
					stateName = stateName ? stateName :state;
					var stateName = oj.Translations.getTranslatedString(state);
					barSeries.push({name:  stateName, items: barSeriesItems[stateMap[state]] ,color : barsColorArray[state] , id :state});
				}
			}

			// remove overlays for loading
			$('#bpm-dsb-health-chart-overlay').removeClass('bpm-dsb-load-overlay');

			// Populate the chart
			self.barSeriesValue(barSeries);
			self.barGroupsValue(barGroups);
		};

		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 0){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 0) {
				self.loadData();
			}
		});


		//--------------- Drill down ----------------------

		self.totalDrilldown = function (){
			util.drilldown(self.totalCountURL);
		};

		self.activeDrilldown = function (){
			util.drilldown(self.progressCountURL);
		};

		self.recoverableDrilldown = function (){
			util.drilldown(self.recoverableCountURL);
		};

		self.suspendedDrilldown = function (){
			util.drilldown(self.suspendedCountURL);
		}

		this.handleAttached = function(info)
		{
			// if the param is passed then load the content immediately
			if (params.loadImmediate){
				self.loadData();
			}


			//The DOM is already inserted
			$("#bpm-dsb-health-chart").ojChart({
				"drill": function(event, ui) {
					var processName = '';
					var status ='';
					if(ui['series'])
						status = ui['series'];
					if(ui['group'])
						processName = ui['group'];

					loggerUtil.log(processName + ";" + status);

					if(processName === ''){
						return;
					}
					if (status === ''){
						util.drilldown(self.processTrackingPage+ '?processName=' +processName);
					}
					else if (status === 'ACTIVE'){
						util.drilldown(self.processTrackingPage+ '?processName=' +processName+ '&status=OPEN&userRole=USER_ROLE_ADMIN');
					}
					else if(status === 'RECOVERABLE'){
						util.drilldown(self.processTrackingPage+ '?processName=' +processName + '&status=FAULTED_RECOVERABLE&userRole=USER_ROLE_ADMIN');
					}
					else if(status === 'SUSPENDED'){
						util.drilldown(self.processTrackingPage+ '?processName=' +processName + '&status=SUSPENDED&userRole=USER_ROLE_ADMIN');
					}
				}
			});
		}
	}

	return healthDashboardContainerModel;
});


define('text!pcs/charts/dashboard/view/dashboards/healthDashboard.html',[],function () { return '<div class="oj-offcanvas-outer-wrapper bpm-dsb-panel">\n\n\t<div data-bind="template: { name: \'bpm-dsb-icon-bar-template\', data: $data }"></div>\n\n\t<h1 data-bind="text: bundle.health.title"></h1>\n\n\t<div  class="oj-sm-12 bpm-dsb-center-align" >\n\t\t<div  class="bpm-dsb-center-align" >\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-dark-grey-bg right-width-zero">\n\t\t\t\t<div class="bpm-dsb-billboard-number">\n\t\t\t\t\t<a data-bind="click : totalDrilldown" class="bpm-dsb-dark-black-numb" style=" text-decoration: none;cursor: pointer;"><span data-bind="text:openCount" ></span></a>\n\t\t\t\t</div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.health.billboard.total_open  , attr : { title : bundle.health.billboard.total_open }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-green-bg right-width-zero">\n\t\t\t\t<div class="bpm-dsb-billboard-number"  >\n\t\t\t\t\t<a data-bind="click : activeDrilldown" class="bpm-dsb-dark-green-numb" style=" text-decoration: none;cursor: pointer;"><span data-bind="text:progressCount" ></span></a>\n\t\t\t\t</div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.health.billboard.in_progress  , attr : { title : bundle.health.billboard.in_progress }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-red-bg right-width-zero" >\n\t\t\t\t<div class="bpm-dsb-billboard-number">\n\t\t\t\t\t<a  data-bind="click : recoverableDrilldown" class="bpm-dsb-dark-red-numb" style=" text-decoration: none;cursor: pointer;"><span data-bind="text:recoverableCount" ></span></a>\n\t\t\t\t</div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.health.billboard.recoverable  , attr : { title : bundle.health.billboard.recoverable }"></div>\n\t\t\t</div>\n\t\t\t<div style="background-color: #bee5f6"  class="bpm-dsb-billb-box" >\n\t\t\t\t<div class="bpm-dsb-billboard-number">\n\t\t\t\t\t<a  data-bind="click : suspendedDrilldown" style="color:#101356;text-decoration: none;cursor: pointer;"><span data-bind="text:suspendedCount" ></span></a>\n\t\t\t\t</div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.health.billboard.suspended  , attr : { title : bundle.health.billboard.suspended }"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\n\t<div class="oj-flex bpm-dsb-chart-container" id="bpm-dsb-health-chart-container">\n\t\t<div id="bpm-dsb-health-chart" class="oj-sm-12 oj-md-12 oj-lg-12 oj-xl-12 oj-col bpm-dsb-chart-height" data-bind="ojComponent: {\n            component: \'ojChart\',\n            type: \'bar\',\n            orientation: \'horizontal\',\n            stack: \'on\',\n            series: barSeriesValue,\n            groups: barGroupsValue,\n            zoomAndScroll: \'live\',\n            animationOnDisplay: \'auto\',\n            animationOnDataChange: \'auto\',\n            hoverBehavior: \'dim\',\n            drilling:\'on\',\n            selectionMode: \'single\',\n            hideAndShowBehavior: \'withRescale\'\n        }">\n\t\t</div>\n\t\t<div id="bpm-dsb-health-chart-overlay"/>\n\t</div>\n\n</div>\n';});

/**
 * Created by nisabhar on 6/12/2015.
 */

define('pcs/charts/dashboard/viewModel/dashboards/openDashboard',['ojs/ojcore' ,'knockout','pcs/charts/dashboard/util', 'jquery', 'ojs/ojtable', 'ojs/ojbutton', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko, util, $) {
	/**
	 * The view model for the Open Process Summary Dashboard
	 */
	function openDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.parent = params.parent;	// dashboardContainer
		this.baseRestUrl = this.parent.baseRestUrl;
		this.restEndPoint = this.parent.baseRestUrl + this.parent.chartEndpoint;
		this.drilldownUrl = this.parent.processTrackingPage + '?processName=';
		var authInfo =this.parent.authInfo; // Login credentials

		self.processes = ko.observableArray([]);
		self.datasource = new oj.ArrayTableDataSource(self.processes,{idAttribute: "index"});

		self.totals = ko.observable([0,0,0,0,0,0]);

		// handles rendering of two line column header, since ojTable does not seem to do this natively
		self.renderHeader = function(context) {
			var column = context.columnIndex;
			if (column == 3)
				var lines = self.bundle.open.table.due_this_week.split("\n");
			else if (column == 7)
				var lines = self.bundle.open.table.opened_today.split("\n");
			else
				var lines = self.bundle.open.table.closed_today.split("\n");
			context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
			{
				for (var i=0; i<lines.length; i++) {
					var headerTextDiv = $(document.createElement('div'));
					headerTextDiv.text(lines[i]);
					headerContentDiv.append(headerTextDiv);
				}
				headerContentDiv.parent().attr("style", "height:auto; text-align: center;");
			});
		};

		self.columns = [ {headerText: self.bundle.open.table.application, field: 'application', style: 'width: 15%'},
			{style: 'width: 15%',headerTemplate: 'bpm_charts_open_proc_header', template:'bpm_charts_open_proc_proc_name'},
			{headerText: self.bundle.open.table.on_track,field: 'ontrack', style: 'width: 10%', className: 'bpm-dsb-open-tbl-ontrack-column bpm-dsb-light-green-bg'},
			{headerRenderer: self.renderHeader, field: 'due', style: 'width: 10%', className: 'bpm-dsb-open-tbl-due-column bpm-dsb-light-orange-bg'},
			{headerText: self.bundle.open.table.overdue, field: 'overdue', style: 'width: 10%', className: 'bpm-dsb-open-tbl-overdue-column bpm-dsb-light-red-bg'},
			{headerText: self.bundle.open.table.recoverable, field: 'recoverable', style: 'width: 10%', className: 'bpm-dsb-open-tbl-column'},
			{headerText: self.bundle.open.table.suspended, field: 'suspended', style: 'width: 10%', className: 'bpm-dsb-open-tbl-column'},
			{headerRenderer: self.renderHeader, field: 'opened', style: 'width: 10%', className: 'bpm-dsb-open-tbl-today-column bpm-dsb-light-grey-bg'},
			{headerRenderer: self.renderHeader, field: 'closed', style: 'width: 10%', className: 'bpm-dsb-open-tbl-today-column bpm-dsb-light-grey-bg'}
		];

		//  Method to refresh the content
		self.refresh = function(){
			self.loadData();
			//Refresh Process list too
			self.parent.loadProcessList();
		};

		// method to create the parameter list for the query
		self.paramList= function(){
			var param = util.paramList(self);
			return param;
		};

		// load/reload process data to display
		this.loadData = function() {
			var param =self.paramList();
			//reset the current row to show non selected
			$("#openProcesses").ojTable("option", "currentRow", null);
			// Add overlays for loading
			$('#bpm-dsb-open-table-overlay').addClass('bpm-dsb-load-overlay');

			self.load("OPEN_PROCESS_SUMMARY_BILLBOARD"+param, self.populateOpenBillboard);
			self.load("OPEN_PROCESS_SUMMARY_TABLE"+param, self.populateOpenTable);
		}

		self.load = function(query, populate){
			var url = self.restEndPoint + query;
			$.ajax
			({
				type: "GET",
				url: url,
				beforeSend: function (xhr) {
					if (authInfo) {
						xhr.setRequestHeader('Authorization', authInfo);
					}
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				success: function (json) {
					populate(json);
				},
				error: function ( jqXHR) {
					populate();
					util.errorHandler(jqXHR);
				},
				failure: function () {
					loggerUtil.log('failed in ' + query);
				}
			});
		};

		self.populateOpenBillboard = function(data){
			if(data && data.rows){
				var totals = [0,0,0,0,0,0];
				var c = util.columnAlias(data);
				var row = data.rows[0];
				totals[0] = row.values[c.TOTAL_OPEN]+0;
				totals[1] = row.values[c.TOTAL_OPEN_NOT_DUE_SOON]+0;	// ??
				totals[2] = row.values[c.TOTAL_DUE_SOON]+0;
				totals[3] = row.values[c.TOTAL_OVERDUE]+0;
				totals[4] = row.values[c.TOTAL_OPENED_TODAY]+0;
				totals[5] = row.values[c.TOTAL_CLOSED_TODAY]+0;
				self.totals(totals);
			}
		}

		self.populateOpenTable = function(data){
			var p_array = [];
			if (data && data.rows) {
				var c = util.columnAlias(data);
				$.each(data.rows,function(index,row) {
					var p = {};
					p.index = index;	// for id Attribute needed by ojTable for some reason
					p.application = row.values[c.COMPOSITE_NAME];
					p.process = row.values[c.PROCESS_LABEL];
					p.ontrack = row.values[c.TOTAL_OPEN_NOT_DUE_SOON];
					p.due = row.values[c.TOTAL_DUE_SOON];
					p.overdue = row.values[c.TOTAL_OVERDUE];
					p.recoverable = row.values[c.TOTAL_FAULTED_RECOVERABLE];
					p.suspended = row.values[c.TOTAL_SUSPENDED];
					p.opened = row.values[c.TOTAL_OPENED_TODAY];
					p.closed = row.values[c.TOTAL_CLOSED_TODAY];
					p.processId = row.values[c.PROCESS_NAME];
					p_array.push(p);
				});
			}
			// remove overlays for loading
			$('#bpm-dsb-open-table-overlay').removeClass('bpm-dsb-load-overlay');

			self.processes(p_array);
		};

		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 1){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 1) {
				self.loadData();
			}
		});

		this.processDrillDown = function(data,event) {
			//ignore keypress other than enter
			if (event.type === 'keypress' && event.keyCode != 13) {
				return;
			}
			util.drilldown(self.drilldownUrl+data.processId);
		};

		this.handleAttached = function(info) {
			//self.loadData();
		}
	}

	return openDashboardContainerModel;
});


define('text!pcs/charts/dashboard/view/dashboards/openDashboard.html',[],function () { return '<div class="oj-offcanvas-outer-wrapper bpm-dsb-panel">\n\n\t<div data-bind="template: { name: \'bpm-dsb-icon-bar-template\', data: $data }"></div>\n\n\t<h1 data-bind="text: bundle.open.title"></h1>\n\n\n\t<div  class="oj-sm-12 bpm-dsb-center-align">\n\t\t<div class="bpm-dsb-center-align">\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-dark-grey-bg">\n\t\t\t\t<div class="bpm-dsb-billboard-number" data-bind="text: totals()[0]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.open.billboard.total_open  , attr : { title : bundle.open.billboard.total_open }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-green-bg open-on-track" >\n\t\t\t\t<div class="bpm-dsb-billboard-number bpm-dsb-dark-green-numb" data-bind="text: totals()[1]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.open.billboard.on_track  , attr : { title : bundle.open.billboard.on_track }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-orange-bg right-width-zero" >\n\t\t\t\t<div class="bpm-dsb-billboard-number bpm-dsb-dark-orange-numb" data-bind="text: totals()[2]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.open.billboard.due_this_week  , attr : { title : bundle.open.billboard.due_this_week }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-red-bg" >\n\t\t\t\t<div class="bpm-dsb-billboard-number bpm-dsb-dark-red-numb" data-bind="text: totals()[3]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.open.billboard.overdue  , attr : { title : bundle.open.billboard.overdue }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-grey-bg open-opened-today" >\n\t\t\t\t<div class="bpm-dsb-billboard-number" data-bind="text: totals()[4]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.open.billboard.opened_today  , attr : { title : bundle.open.billboard.opened_today }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-grey-bg" >\n\t\t\t\t<div class="bpm-dsb-billboard-number"  data-bind="text: totals()[5]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.open.billboard.closed_today  , attr : { title : bundle.open.billboard.closed_today }"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class="bpm-dsb-chart-container oj-flex">\n\t\t<table id="openProcesses" summary="Open Processes" aria-label="Open Processes Table"\n\t\t\t   data-bind="ojComponent: {component: \'ojTable\',\n\t\t\t\t\t\t\t\t data: datasource,\n\t\t\t\t\t\t\t\t columns: columns,\n\t\t\t\t\t\t\t\t rootAttributes: {\'style\': \'width: 100%; height: 100%; font-size: 16px; \'}}">\n\t\t</table>\n\t\t<div id="bpm-dsb-open-table-overlay"></div>\n\t</div>\n\n\t<!-- This template is used in the process name Column of the above table -->\n\t<script type="text/html" id="bpm_charts_open_proc_header">\n\t\t<th style="padding-left: 5px; padding-right: 5px;">\n\t\t\t<span data-bind="text:$parent.bundle.open.table.process"></span>\n\t\t</th>\n\t</script>\n\t<script type="text/html" id="bpm_charts_open_proc_proc_name">\n\t\t<td>\n\t\t\t<a tabindex="0" data-bind="click : $parent.processDrillDown,text: process , attr: { title: processId },\n\t\t\t\t\t\t\t\tevent: {keypress: $parent.processDrillDown }" style="cursor:pointer;"></a>\n\t\t</td>\n\t</script>\n\n</div>\n\n';});

/**
 * Created by nisabhar on 6/12/2015.
 */

define('pcs/charts/dashboard/viewModel/dashboards/workloadDashboard',['ojs/ojcore' ,'knockout','pcs/charts/dashboard/util','ojs/ojtreemap' ,'ojs/ojlegend', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko,util) {
	/**
	 * The view model for the main content view template
	 */
	function workloadDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.parent = params.parent;	// hold the instance of dashboardContainer

		// Rest related parameters
		self.baseRestUrl = this.parent.baseRestUrl;
		self.restEndPoint = this.parent.baseRestUrl + this.parent.chartEndpoint;
		self.authInfo =this.parent.authInfo; // Login credentials

		//---------------------- data Type----------------------------------------
		self.dataType = ko.observable("top10_by_task");

		self.dataTypeRadios = [
			{id: 'top10_by_task', label: self.bundle.workload.type.top10_by_task},
			{id: 'top10_by_assignee', label: self.bundle.workload.type.top10_by_assignee},
			{id: 'bottleneck_by_process', label: self.bundle.workload.type.bottleneck_by_process},
			{id: 'bottleneck_by_task', label: self.bundle.workload.type.bottleneck_by_task},
			{id: 'bottleneck_by_assignee', label: self.bundle.workload.type.bottleneck_by_assignee}
		];

		self.handleDataTypeChange = function(event, ui) {
			//set the tab info in parent which is used by filter panel
			self.parent.workloadSubTab(self.dataType());

			//Load chart data
			self.loadChartData();
		};


		//---------Count related bindings-------------------------
		self.openCount = ko.observable(0);  // No of open task
		self.onTrackCount = ko.observable(0);  // No of active task
		self.dueCount = ko.observable(0);  //No.of recoverable task
		self.overdueCount = ko.observable(0);  // No.of suspended task


		//--------Top 10 Chart data bindings--------------------------------------
		self.barSeriesValueOnTrack = ko.observableArray();
		self.barGroupsValueOnTrack = ko.observableArray();

		self.barSeriesValueDueWeek = ko.observableArray();
		self.barGroupsValueDueWeek = ko.observableArray();

		self.barSeriesValueOverdue = ko.observableArray();
		self.barGroupsValueOverdue = ko.observableArray();

		var chartDatatype = {
			ON_TRACK :1,
			DUE_SOON :2,
			OVER_DUE :3
		};


		//--------Bottleneck Treemap data bindings--------------------------------------
		var handler = new oj.ColorAttributeGroupHandler();
		//handler.addMatchRule('0','#990000');
		//handler.addMatchRule('1', '#6E8992');
		//handler.addMatchRule('2', '#7B9AA4');
		//handler.addMatchRule('3', '#89ABB6');
		//handler.addMatchRule('4', '#97BCC8');
		//handler.addMatchRule('5','#A5CDDB');
		//handler.addMatchRule('6','#B2DEED');
		//handler.addMatchRule('7','#C0EFFF');
		//handler.addMatchRule('8','#D0FFFF');
		handler.addMatchRule('on_track','#bde2a0');
		handler.addMatchRule('due', '#FFF2CC');
		handler.addMatchRule('overdue', '#f0a7a8');


		// Empty , ON_TRACK , DUE_SOON , OVER_DUE
		var top10ColorPalette =[
			["","",""],
			["#38761d","#FFF2CC","#f0a7a8"],
			["#bde2a0","#bf9000","#f0a7a8"],
			["#bde2a0","#FFF2CC","#990000"]
		];

		var treeMapDatatype = {
			PROCESS :1,
			TASK :2,
			ASSIGNEE :3
		};

		//var legendSections = [{items : [
		//	{text : oj.Translations.getTranslatedString('workload.legend.lt_0'),
		//		color : handler.getValue('0')},
		//	{text :  oj.Translations.getTranslatedString('workload.legend.0_to_1'),
		//		color : handler.getValue('1')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.1_to_2'),
		//		color : handler.getValue('2')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.2_to_3'),
		//		color : handler.getValue('3')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.3_to_4'),
		//		color : handler.getValue('4')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.4_to_5'),
		//		color : handler.getValue('5')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.5_to_6'),
		//		color : handler.getValue('6')},
		//	{text : oj.Translations.getTranslatedString('workload.legend.6_to_7'),
		//		color : handler.getValue('7')},
		//	{text :oj.Translations.getTranslatedString('workload.legend.gt_7'),
		//		color : handler.getValue('8')}
		//
		//]}];

		self.nodeValues = ko.observableArray([]);
		//self.legendSections =ko.observableArray(legendSections);


		// --------------- Methods -----------
		self.refresh = function(){
			self.loadData();
			//Refresh Process list too
			self.parent.loadProcessList();
		};

		// method to create the parameter list for the query
		self.paramList= function(){
			return util.paramList(self);
		};

		//------------------ Load Methods -------------------

		// Main method which loads all the data for this page
		self.loadData = function() {
			//Load count data
			self.load(util.queries.WORKLOAD_ANALYSIS_BILLBOARD +self.paramList(),self.populateWorkloadBillboardData );

			//Load chart data
			self.loadChartData();
		};

		self.loadChartData = function(){
			if(self.dataType() == 'bottleneck_by_process' || self.dataType() == 'bottleneck_by_task' || self.dataType() == 'bottleneck_by_assignee' ){
				$("#bpm-dsb-wkld-treemap-container").show();
				$("#bpm-dsb-wkld-chart-container").hide();
				self.loadBottleneckData();
			}
			else{
				$("#bpm-dsb-wkld-treemap-container").hide();
				$("#bpm-dsb-wkld-chart-container").show();
				self.loadTop10Data();
			}
		};

		// Primary function for loading top10 data to display
		self.loadTop10Data = function() {
			var param =self.paramList();

			// Add overlays for loading
			$('#bpm-dsb-wrkld-chart-ontrack-overlay').addClass('bpm-dsb-load-overlay');
			$('#bpm-dsb-wrkld-chart-due-overlay').addClass('bpm-dsb-load-overlay');
			$('#bpm-dsb-wrkld-chart-overdue-overlay').addClass('bpm-dsb-load-overlay');

			// Queries for data by Assignee
			if(self.dataType() === 'top10_by_assignee'){
				self.load(util.queries.OPEN_ASSIGNEES_ON_TRACK_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.ON_TRACK);
				self.load(util.queries.OPEN_ASSIGNEES_OVER_DUE_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.OVER_DUE);
				self.load(util.queries.OPEN_ASSIGNEES_DUE_SOON_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.DUE_SOON);
			}
			// Queries for data by TAsks
			else if(self.dataType() === 'top10_by_task'){
				self.load(util.queries.OPEN_TASK_ON_TRACK_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.ON_TRACK);
				self.load(util.queries.OPEN_TASK_OVER_DUE_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.OVER_DUE);
				self.load(util.queries.OPEN_TASK_DUE_SOON_ANALYSIS_CHART +param ,self.populateTop10ChartData, chartDatatype.DUE_SOON);
			}
		};

		// Primary function for loading bottleneck data to display
		self.loadBottleneckData = function() {
			var param =self.paramList();

			// Add overlays for loading
			$('#bpm-dsb-wkld-bottleneck-treemap-overlay').addClass('bpm-dsb-load-overlay');

			if(self.dataType() === 'bottleneck_by_process') {
				self.load(util.queries.DUE_DATE_ANALYSIS_BY_OPEN_PROCESS_TREEMAP + param,self.populateBottleneckData ,treeMapDatatype.PROCESS );
			}
			else if(self.dataType() === 'bottleneck_by_task') {
				self.load(util.queries.DUE_DATE_ANALYSIS_BY_OPEN_TASKS_TREEMAP + param, self.populateBottleneckData, treeMapDatatype.TASK);
			}
			else if(self.dataType() === 'bottleneck_by_assignee') {
				self.load(util.queries.DUE_DATE_ANALYSIS_BY_ASSIGNEE_TREEMAP + param, self.populateBottleneckData, treeMapDatatype.ASSIGNEE);
			}

			// populate the legend section
			//self.legendSections(legendSections);
		};


		// Method to do the Rest call, takes a callback function and its parameter which is called when Rest call is  a success
		self.load= function(query, populate,parameter){
			var url = self.restEndPoint + query;
			$.ajax
			({
				type: "GET",
				url: url,
				beforeSend: function (xhr) {
					if (self.authInfo) {
						xhr.setRequestHeader('Authorization', self.authInfo);
					}
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				success: function (json) {
					populate(json,parameter);
				},
				error: function ( jqXHR) {
					populate(null,parameter);
					util.errorHandler(jqXHR);
				},
				failure: function () {
					loggerUtil.log('failed in load -' + query);
				}
			});
		};


		//------------------ Pouplate Methods -------------------
		self.populateWorkloadBillboardData = function(data){
			if(data && data.rows){
				var c = util.columnAlias(data);
				var row = data.rows[0]; // all the data is in the first row

				self.openCount(row.values[c.TOTAL_OPEN]+0);
				self.onTrackCount(row.values[c.TOTAL_OPEN_AND_NOT_DUE_SOON]+0);
				self.dueCount(row.values[c.TOTAL_DUE_SOON]+0);
				self.overdueCount(row.values[c.TOTAL_OVERDUE]+0);
			}

		};

		// Data columns - "TASK_LABEL" , "TOTAL_ON_TRACK","TOTAL_DUE_SOON","TOTAL_OVERDUE"
		self.populateTop10ChartData = function(data,type){
			var barGroups = [];     //["Process 1","Process 2","Process 3","Process 4","Process 5"];
			var typeSize = 3;  // On track/ Overdue / Due Soon
			var barSeriesItems = [];  //{y :1, label :1}
			var barSeries = [];  // [ {items: [{y :1, label :1}, {y :4, label :4},{y :2, label :2},{y :7, label :7},{y :2, label :2}]}];
			var barSeriesNames =  [ self.bundle.workload.billboard.on_track,self.bundle.workload.billboard.due_soon,self.bundle.workload.billboard.overdue];
			var color = top10ColorPalette[type];

			if(data && data.rows){

				// populae the 3 states items
				for(var i=0 ;i<typeSize ; i++){
					barSeriesItems.push([]);
				}
				// Get the count for each process instance in each state
				// Outer loop iterates of each row of data
				// Iner loop iterates for each state for a particluar row
				for(var i=0 ;i< data.rows.length ; i++){
					barGroups.push(data.rows[i].values[0]);
					for(var j=0 ;j<typeSize ; j++) {
						var val = data.rows[i].values[j+1];
						barSeriesItems[j].push({y: val, label: "" + val,
							shortDesc: "&lt;b&gt;" + val + " " + barSeriesNames[j]  , labelPosition:'auto'});
					}
				}
				// Create the X-axis by iterating over different state
				for(var i=0 ;i<typeSize ; i++){

					// make the major state visible and other 2 satte hidden by default . USer can show them
					// By selecting it from the legend
					// For ON_Track show 1sst , For Due Soon Show 2nd and for overdue show 3rd
					var visibility = "hidden";
					if(i+1 == type){
						visibility = "visible";
					}
					barSeries.push({name: barSeriesNames[i], items: barSeriesItems[i], color :color[i],  visibility: visibility});
				}
			}
			if(type === chartDatatype.ON_TRACK ){
				// remove overlays for loading
				$('#bpm-dsb-wrkld-chart-ontrack-overlay').removeClass('bpm-dsb-load-overlay');

				//Workaround for JET bug , Recreate the knockout binding
				var chart = document.getElementById("bpm-dsb-wrkld-chart-ontrack");
				ko.cleanNode(chart);
				ko.applyBindings(self,chart);

				self.barSeriesValueOnTrack(barSeries);
				self.barGroupsValueOnTrack(barGroups);
			}
			else if(type === chartDatatype.DUE_SOON ){
				// remove overlays for loading
				$('#bpm-dsb-wrkld-chart-due-overlay').removeClass('bpm-dsb-load-overlay');

				//Workaround for JET bug , Recreate the knockout binding
				var chart = document.getElementById("bpm-dsb-wrkld-chart-due");
				ko.cleanNode(chart);
				ko.applyBindings(self,chart);

				self.barSeriesValueDueWeek(barSeries);
				self.barGroupsValueDueWeek(barGroups);
			}
			else if(type === chartDatatype.OVER_DUE ){
				// remove overlays for loading
				$('#bpm-dsb-wrkld-chart-overdue-overlay').removeClass('bpm-dsb-load-overlay');

				//Workaround for JET bug , Recreate the knockout binding
				var chart = document.getElementById("bpm-dsb-wrkld-chart-overdue");
				ko.cleanNode(chart);
				ko.applyBindings(self,chart);

				self.barSeriesValueOverdue(barSeries);
				self.barGroupsValueOverdue(barGroups);
			}
		};

		//By process --- {"POCESS_LABEL","TITLE","ASSIGNEE_DISP_NAME","AVG_DAYS_UNTIL_DUE_DATE","TOTALCOUNT","BAM_GROUPING_1","BAM_GROUPING_2","BAM_GROUPING_3",
		//By Assignee ----"ASSIGNEE_DISP_NAME","TITLE","AVG_DAYS_UNTIL_DUE_DATE","TOTALCOUNT","BAM_GROUPING_1","BAM_GROUPING_2",
		//By Taskk --- "TITLE","ASSIGNEE_DISP_NAME","AVG_DAYS_UNTIL_DUE_DATE","TOTALCOUNT","BAM_GROUPING_1","BAM_GROUPING_2",
		self.populateBottleneckData = function(data,type){
			if(data && data.rows && data.rows.length >0 ){
				var c = util.columnAlias(data); // column name- index alias
				var processTree = createNode("Process",0, 1 ,0,1);
				for(var i=0 ;i< data.rows.length ; i++){
					var level = 0;  // to hold what level the current node is

					var g1= data.rows[i].values[c.BAM_GROUPING_1];
					var g2= data.rows[i].values[c.BAM_GROUPING_2];
					var g3= data.rows[i].values[c.BAM_GROUPING_3];
					if (type === treeMapDatatype.PROCESS){
						var lev =  g1 + g2 + g3; // get the current level , Process will be 2 , task will be 1 , assigness will be 0
						level = 2-lev;  //  Reversing the order
					}else{
						var lev =  g1 + g2; // get the current level task will be 1 , assigness will be 0  OR  assigness will be 1 , task will be 0
						level = 1-lev; //  Reversing the order
					}
					var depth = level;  // To hold at what depth we are at currently
					appendChildNodes(processTree, data.rows[i] ,level,depth, c.AVG_DAYS_UNTIL_DUE_DATE, c.TOTALCOUNT,type);
				}
				self.nodeValues([processTree]);
			}else{
				self.nodeValues([]);
			}
			// remove overlays for loading
			$('#bpm-dsb-wkld-bottleneck-treemap-overlay').removeClass('bpm-dsb-load-overlay');
		};

		// ---- helper methods for Bottle neck Treemaps----------------------

		// Method to create a node of the tree map
		// Calculate lebel by checking the type and current level
		function createNode(title, days, count,level,type) {
			var quartile = '8';
			if(days){
				days = +days.toFixed(2);
			}
			var dateString = days ? days : 'N.A';

			var label = "";
			if(type === treeMapDatatype.PROCESS){
				label = level === 0 ? self.bundle.workload.treemap.process : level ===1 ?  self.bundle.workload.treemap.task :  self.bundle.workload.treemap.assignee;
			}else if(type === treeMapDatatype.TASK){
				label = level === 0 ?  self.bundle.workload.treemap.task : self.bundle.workload.treemap.assignee;
			}else{
				label = level === 1 ?   self.bundle.workload.treemap.task : self.bundle.workload.treemap.assignee;
			}

			//if (days < 0) // 1st quartile
			//	quartile = '0';
			//else if (days >= 0 && days <1)
			//	quartile = '1';
			//else if (days >= 1 && days <2)
			//	quartile = '2';
			//else if (days >= 2 && days <3)
			//	quartile = '3';
			//else if (days >= 3 && days <4)
			//	quartile = '4';
			//else if (days >= 4 && days <5)
			//	quartile = '5';
			//else if (days >= 5 && days <6)
			//	quartile = '6';
			//else if (days >= 6 && days <7)
			//	quartile = '7';

			if (days < 0) // 1st quartile
				quartile = 'overdue';
			else if (days > 0 && days <7)
				quartile = 'due';
			else
				quartile = 'on_track';


			return {label: title,
				id: title,
				value: count,
				color: getColor(quartile),
				nodes : [],
				shortDesc: label + " : " + title +
				"&lt;br/&gt;"+ self.bundle.workload.treemap.sizeLabel + " : " + count +
				"&lt;br/&gt;" +  self.bundle.workload.treemap.colorLabel + " : " + dateString
			};
		}

		function getColor(quartile) {
			return handler.getValue(quartile);
		}

		// recursive function to insert the node at correct postion of the tree
		// Didn't have much time to write this algo , See if it can be improved performance wise
		function appendChildNodes(parentNode, child,level,depth ,dateIndex , countIndex , type) {
			if (depth === 0){
				// we are at the leaf node , create a node and push it in the parent node list
				var node = createNode(child.values[level],child.values[dateIndex], child.values[countIndex],  level ,type);
				parentNode.nodes.push(node);
			}else{
				// we are not at leaf yet , find the correct new parent from the parentNode child list
				// and pass this node to the new parent to handle
				for (var i=0 ;i<parentNode.nodes.length; i++){
					if (parentNode.nodes[i].id === child.values[level-depth]){
						appendChildNodes(parentNode.nodes[i], child ,level ,depth-1,dateIndex,countIndex, type);
						break;
					}
				}
			}
		}

		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 2){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 2) {
				self.loadData();
			}
		});


		this.handleAttached = function(info) {
			//self.loadData();
		}

	}

	return workloadDashboardContainerModel;
});


define('text!pcs/charts/dashboard/view/dashboards/workloadDashboard.html',[],function () { return '<div class="oj-offcanvas-outer-wrapper bpm-dsb-panel">\n\n\t<div data-bind="template: { name: \'bpm-dsb-icon-bar-template\', data: $data }"></div>\n\n\t<h1 data-bind="text: bundle.workload.title"></h1>\n\n\t<div  class="oj-sm-12 bpm-dsb-center-align" >\n\t\t<div  class="bpm-dsb-center-align" >\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-dark-grey-bg right-width-zero">\n\t\t\t\t<div data-bind="text:openCount" class="bpm-dsb-billboard-number"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.workload.billboard.total_open , attr : { title : bundle.workload.billboard.total_open }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-green-bg right-width-zero">\n\t\t\t\t<div data-bind="text:onTrackCount" class="bpm-dsb-billboard-number bpm-dsb-dark-green-numb"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.workload.billboard.on_track , attr : { title : bundle.workload.billboard.on_track }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-orange-bg right-width-zero">\n\t\t\t\t<div data-bind="text:dueCount" class="bpm-dsb-billboard-number bpm-dsb-dark-orange-numb"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.workload.billboard.due_this_week , attr : { title : bundle.workload.billboard.due_this_week }"></div>\n\t\t\t</div>\n\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-red-bg">\n\t\t\t\t<div data-bind="text:overdueCount" class="bpm-dsb-billboard-number bpm-dsb-dark-red-numb"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.workload.billboard.overdue , attr : { title : bundle.workload.billboard.overdue }"></div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n\n\n\t<div id=\'buttons-container\' style="text-align: center;" class="stats-margin">\n\t\t<div id="chartType"  class="workload-chartType oj-button-half-chrome oj-button-primary" data-bind="ojComponent: {component: \'ojButtonset\', checked: dataType,\n\t\t\t\t\t\t\toptionChange: handleDataTypeChange}"\n\t\t\t aria-label="Choose Chart Type">\n\t\t\t<!-- ko foreach: dataTypeRadios -->\n\t\t\t<label data-bind="attr: {for: id , title: label}"></label>\n\t\t\t<input type="radio" name="chart" data-bind="value: id, attr: {id: id},\n\t\t\t\t\t\t\tojComponent: { component: \'ojButton\', label: label }"/>\n\t\t\t<span class="btn-separator"></span>\n\t\t\t<!-- /ko -->\n\t\t</div>\n\t</div>\n\n\t<div class="oj-flex " id=\'bpm-dsb-wkld-chart-container\'>\n\t\t<div class="oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-4 oj-col ">\n\t\t\t<!--<h3 style="text-align: center"><span data-bind="text: bundle.workload.billboard.on_track"></span></h3>-->\n\t\t\t<div class="bpm-dsb-chart-container">\n\t\t\t\t<div id="bpm-dsb-wrkld-chart-ontrack" data-bind="ojComponent: {\n\t\t\t\t\t\tcomponent: \'ojChart\',\n\t\t\t\t\t\ttype: \'bar\',\n\t\t\t\t\t\torientation: \'horizontal\',\n\t\t\t\t\t\tstack: \'on\',\n\t\t\t\t\t\tseries: barSeriesValueOnTrack,\n\t\t\t\t\t\tgroups: barGroupsValueOnTrack,\n\t\t\t\t\t\tzoomAndScroll: \'live\',\n\t\t\t\t\t\toverview: {rendered: \'on\'},\n\t\t\t\t\t\tdataCursor:\'on\',\n\t\t\t\t\t\tlegend: {rendered: \'on\'},\n\t\t\t\t\t\tanimationOnDisplay: \'auto\',\n\t\t\t\t\t\tanimationOnDataChange: \'auto\',\n\t\t\t\t\t\thoverBehavior: \'dim\',\n\t\t\t\t\t\thideAndShowBehavior: \'withRescale\',\n\t\t\t\t\t\tyAxis: {minStep :1},\n\t\t\t\t\t\ttranslations : { labelNoData :  bundle.workload.chart.no_open_task},\n\t\t\t\t\t\ttitle : {text :  bundle.workload.billboard.on_track , halign : \'center\' }\n\t\t\t\t\t}"\n\t\t\t\t\t class="bpm-dsb-chart-height">\n\t\t\t\t</div>\n\t\t\t\t<div id="bpm-dsb-wrkld-chart-ontrack-overlay"/>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-4 oj-col verticalLine">\n\t\t\t<!--<h3 style="text-align: center"><span data-bind="text: bundle.workload.billboard.due_this_week"></span></h3>-->\n\t\t\t<div class="bpm-dsb-chart-container">\n\t\t\t\t<div id="bpm-dsb-wrkld-chart-due" data-bind="ojComponent: {\n\t\t\t\t\t\tcomponent: \'ojChart\',\n\t\t\t\t\t\ttype: \'bar\',\n\t\t\t\t\t\torientation: \'horizontal\',\n\t\t\t\t\t\tstack: \'on\',\n\t\t\t\t\t\tseries: barSeriesValueDueWeek,\n\t\t\t\t\t\tgroups: barGroupsValueDueWeek,\n\t\t\t\t\t\tlegend: {rendered: \'on\'},\n\t\t\t\t\t\tzoomAndScroll: \'live\',\n\t\t\t\t\t\toverview: {rendered: \'on\'},\n\t\t\t\t\t\tdataCursor:\'on\',\n\t\t\t\t\t\tanimationOnDisplay: \'auto\',\n\t\t\t\t\t\tanimationOnDataChange: \'auto\',\n\t\t\t\t\t\thoverBehavior: \'dim\',\n\t\t\t\t\t\thideAndShowBehavior: \'withRescale\',\n\t\t\t\t\t\ttranslations : { labelNoData :  bundle.workload.chart.due_this_week},\n\t\t\t\t\t\ttitle : {text :  bundle.workload.billboard.due_this_week , halign : \'center\' },\n\t\t\t\t\t\tyAxis: {minStep :1}\n\t\t\t\t\t}"\n\t\t\t\t\t class="bpm-dsb-chart-height">\n\t\t\t\t</div>\n\t\t\t\t<div id="bpm-dsb-wrkld-chart-due-overlay"/>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="oj-flex-item oj-sm-12 oj-md-6 oj-lg-4 oj-xl-4 oj-col verticalLine">\n\t\t\t<!--<h3 style="text-align: center"><span data-bind="text: bundle.workload.billboard.overdue"></span></h3>-->\n\t\t\t<div class="bpm-dsb-chart-container">\n\t\t\t\t<div id="bpm-dsb-wrkld-chart-overdue" data-bind="ojComponent: {\n\t\t\t\t\t\tcomponent: \'ojChart\',\n\t\t\t\t\t\ttype: \'bar\',\n\t\t\t\t\t\torientation: \'horizontal\',\n\t\t\t\t\t\tstack: \'on\',\n\t\t\t\t\t\tseries: barSeriesValueOverdue,\n\t\t\t\t\t\tgroups: barGroupsValueOverdue,\n\t\t\t\t\t\tzoomAndScroll: \'live\',\n\t\t\t\t\t\toverview: {rendered: \'on\'},\n\t\t\t\t\t\tdataCursor:\'on\',\n\t\t\t\t\t\tlegend: {rendered: \'on\'},\n\t\t\t\t\t\tanimationOnDisplay: \'auto\',\n\t\t\t\t\t\tanimationOnDataChange: \'auto\',\n\t\t\t\t\t\thoverBehavior: \'dim\',\n\t\t\t\t\t\thideAndShowBehavior: \'withRescale\',\n\t\t\t\t\t\tyAxis: {minStep :1},\n\t\t\t\t\t\ttranslations : { labelNoData : bundle.workload.chart.overdue},\n\t\t\t\t\t\ttitle : {text :  bundle.workload.billboard.overdue , halign : \'center\' }\n\t\t\t\t\t}"\n\t\t\t\t\t class="bpm-dsb-chart-height">\n\t\t\t\t</div>\n\t\t\t\t<div id="bpm-dsb-wrkld-chart-overdue-overlay"/>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class="oj-flex " id=\'bpm-dsb-wkld-treemap-container\' style="display:none">\n\n\t\t<div class="bpm-dsb-chart-container">\n\t\t\t<div id=\'bpm-dsb-wkld-bottleneck-treemap\' data-bind="ojComponent: {\n\t\t\t\tcomponent: \'ojTreemap\',\n\t\t\t\tanimationOnDisplay: \'auto\',\n\t\t\t\tanimationOnDataChange: \'auto\',\n\t\t\t\tcolorLabel: bundle.workload.treemap.colorLabel,\n\t\t\t\tsizeLabel: bundle.workload.treemap.sizeLabel,\n\t\t\t\tnodes: nodeValues\n\t\t\t}"\n\t\t\t\t class="bpm-dsb-chart-height" style="border:none;">\n\t\t\t</div>\n\t\t\t<div id="bpm-dsb-wkld-bottleneck-treemap-overlay"/>\n\t\t</div>\n\n\t\t<!--<div id=\'legend-container\' class="bpm-dsb-center-align" style="width: 100%">-->\n\t\t<!--<div data-bind="ojComponent: {-->\n\t\t<!--component: \'ojLegend\',-->\n\t\t<!--orientation: \'horizontal\',-->\n\t\t<!--textStyle: \'font-size:14px;\',-->\n\t\t<!--sections: legendSections-->\n\t\t<!--}"-->\n\t\t<!--style="min-width:500px;" class="bpm-dsb-center-align" >-->\n\t\t<!--</div>-->\n\t\t<!--</div>-->\n\t</div>\n\n\n</div>\n';});

/**
 * Created by nisabhar on 6/12/2015.
 */

define('pcs/charts/dashboard/viewModel/dashboards/cycleTimeDashboard',['ojs/ojcore' ,'knockout', 'pcs/charts/dashboard/util', 'ojs/ojchart', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko, util) {
	/**
	 * The view model for the main content view template
	 */
	function cycleTimeDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.parent = params.parent;	// dashboardContainer
		this.baseRestUrl = this.parent.baseRestUrl;
		self.restEndPoint = this.parent.baseRestUrl + this.parent.chartEndpoint;
		var authInfo =this.parent.authInfo; // Login credentials

		// --- knockout bindings ------
		self.cycleSeries = ko.observableArray();
		self.cycleGroups = ko.observableArray();
		self.workloadSeries = ko.observableArray();
		self.workloadGroups = ko.observableArray();

		self.total = ko.observable(0);
		self.opened = ko.observable(0);
		self.closed = ko.observable(0);

		var converterFactory = oj.Validation.converterFactory('number');

		// to remove decimal  in the workload chart values
		var workloadDecimalConverter = converterFactory.createConverter({minimumFractionDigits: 0, maximumFractionDigits: 0});
		self.workloadValueConverter  = ko.observable(workloadDecimalConverter);

		// to remove decimal  in the cycle time chart values
		var cycleDecimalConverter = converterFactory.createConverter({minimumFractionDigits: 0, maximumFractionDigits: 2});
		self.cycleValueConverter  = ko.observable(cycleDecimalConverter);


		self.viewBy = new ko.observable('BY_PROCESS');
		self.viewByLabel1 = ko.computed(function() {return self.viewBy() === 'BY_PROCESS' ?
			self.bundle.cycleTime.chart.process_cycle_time :
			self.bundle.cycleTime.chart.task_cycle_time;
		});
		self.viewByLabel2 = ko.computed(function() {return self.viewBy() === 'BY_PROCESS' ?
			self.bundle.cycleTime.chart.process_workload :
			self.bundle.cycleTime.chart.task_workload;
		});

		self.viewButtons = [
			{id: 'BY_PROCESS', label: self.bundle.cycleTime.button.by_process},
			{id: 'BY_TASK', label: self.bundle.cycleTime.button.by_task}
		];

		//  Method to refresh the content
		self.refresh = function(){
			self.loadData();
			//Refresh Process list too
			self.parent.loadProcessList();
		};

		// method to create the parameter list for the query
		self.paramList= function(){
			var param = util.paramList(self);
			return param;
		};

		// load/reload process data to display
		this.loadData = function() {
			var param =self.paramList();

			// Add overlays for loading
			$('#bpm-dsb-cycle-chart-cycle-overlay').addClass('bpm-dsb-load-overlay');
			$('#bpm-dsb-cycle-chart-wkld-overlay').addClass('bpm-dsb-load-overlay');

			self.load("CYCLE_TIME_"+self.viewBy()+"_BILLBOARD"+param, self.populateCycleTimeBillboard);
			self.load("CYCLE_TIME_"+self.viewBy()+"_CHART"+param, self.populateCycleTimeChart);
			self.load("WORKLOAD_"+self.viewBy()+"_CHART"+param, self.populateWorkloadChart);
		}

		self.load = function(query, populate){
			var url = self.restEndPoint + query;
			$.ajax
			({
				type: "GET",
				url: url,
				beforeSend: function (xhr) {
					if (authInfo) {
						xhr.setRequestHeader('Authorization', authInfo);
					}
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				success: function (json) {
					populate(json);
				},
				error: function ( jqXHR) {
					populate();
					util.errorHandler(jqXHR);
				},
				failure: function () {
					loggerUtil.log('failed in ' + query);
				}
			});
		};

		self.populateCycleTimeBillboard = function(data) {
			if (data && data.rows) {
				var c = util.columnAlias(data);
				var row = data.rows[0];
				self.total(row.values[c.TOTAL_OPEN]+0);
				self.opened(row.values[c.TOTAL_OPENED_TODAY]+0);
				self.closed(row.values[c.TOTAL_CLOSED_TODAY]+0);
			}
		}

		self.populateCycleTimeChart = function(data) {
			var dateRange = [];
			var series = [];

			if (data && data.rows && data.rows.length >0) {
				var c = util.columnAlias(data);
				var processes = {};	// or tasks
				dateRange = self.setDateRange(data.rows, c);
				var startDate = dateRange[0];
				$.each(data.rows, function (index, row) {
					var offset = self.dayOffset(row, startDate, c);
					var procLabel = row.values[c.PROCESS_LABEL];
					if (!(procLabel in processes)) {
						processes[procLabel] = [];	// sparse array for chart data

						for (var i=0 ;i <dateRange.length ;i++ ){
							processes[procLabel][i] = 0;
						}

					}
					processes[procLabel][offset] = row.values[c.AVG_CYCLE_TIME];
				});

				for (var proc in processes) {
					series.push({name: proc, items: processes[proc]});
				}
			}
			// remove overlays for loading
			$('#bpm-dsb-cycle-chart-cycle-overlay').removeClass('bpm-dsb-load-overlay');

			self.cycleSeries(series);
			self.cycleGroups(dateRange);

		};

		self.populateWorkloadChart = function(data) {
			var dateRange = [];
			var series = [];

			if (data && data.rows  && data.rows.length >0) {
				var c = util.columnAlias(data);
				var processes = {};	// or tasks
				dateRange = self.setDateRange(data.rows,c);
				var startDate = dateRange[0];
				$.each(data.rows,function(index,row) {
					var offset = self.dayOffset(row,startDate,c);
					var procLabel = row.values[c.PROCESS_LABEL];
					if (!(procLabel in processes))
						processes[procLabel] = [];	// sparse array for chart data
					processes[procLabel][offset] = row.values[c.TOTALWORKLOAD];
				});

				for (var proc in processes) {
					series.push({name: proc, items: processes[proc]});
				}
			}
			// remove overlays for loading
			$('#bpm-dsb-cycle-chart-wkld-overlay').removeClass('bpm-dsb-load-overlay');

			self.workloadSeries(series);
			self.workloadGroups(dateRange);
		};

		// utility function to calculate day offset for chart positioning
		self.dayOffset = function(row,startDate,c) {
			var d = new Date(row.values[c.YEAR_PROCESS_DATE],row.values[c.MONTH_PROCESS_DATE]-1,row.values[c.DAYOFMONTH_PROCESS_DATE]);
			return (d.getTime() - startDate.getTime()) / (24*60*60*1000);
		};

		// utility function to set up data range for charts
		self.setDateRange = function(rowData,c) {
			var v = rowData[0].values;
			var startingDate = new Date(v[c.YEAR_PROCESS_DATE],v[c.MONTH_PROCESS_DATE]-1,v[c.DAYOFMONTH_PROCESS_DATE]);
			v = rowData[rowData.length-1].values;
			var endingDate = new Date(v[c.YEAR_PROCESS_DATE],v[c.MONTH_PROCESS_DATE]-1,v[c.DAYOFMONTH_PROCESS_DATE]);
			var nDays = (endingDate.getTime() - startingDate.getTime() + 1) / (24*60*60*1000);
			var d = new Date(startingDate);
			d.setHours(0,0,0,0);
			var dateRange = [];
			for (var i=0; i<nDays; i++) {
				dateRange.push(new Date(d));
				d.setDate(d.getDate()+1);
			}
			return dateRange;
		}



		self.viewBy.subscribe(function() {self.loadData();});


		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 3){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 3) {
				self.loadData();
			}
		});

		this.handleAttached = function(info) {
			//self.loadData();
		}
	}

	return cycleTimeDashboardContainerModel;
});


define('text!pcs/charts/dashboard/view/dashboards/cycleTimeDashboard.html',[],function () { return '<div class="oj-offcanvas-outer-wrapper bpm-dsb-panel">\n\n\t<div data-bind="template: { name: \'bpm-dsb-icon-bar-template\', data: $data }"></div>\n\n\t<h1 data-bind="text: bundle.cycleTime.title"></h1>\n\n\t<div id="viewBy-container" class="trend-viewBy-container">\n\t\t<div id="viewBy" class="oj-button-half-chrome oj-button-primary trend-viewBy"\n\t\t\t data-bind="ojComponent: {component: \'ojButtonset\', checked: viewBy}"\n\t\t\t aria-label="Select a view">\n\t\t\t<!-- ko foreach: viewButtons -->\n\t\t\t<label data-bind="attr: {for: id , title: label}"></label>\n\t\t\t<input type="radio" name="viewBy"\n\t\t\t\t   data-bind="value: id, attr: {id: id},\n\t\t\t\t\t\t\t  ojComponent: {component: \'ojButton\', label: label}"/>\n\t\t\t<span class="btn-separator"></span>\n\t\t\t<!-- /ko -->\n\t\t</div>\n\t</div>\n\t<div  class="oj-sm-12 bpm-dsb-center-align stats-margin">\n\t\t<div   class="bpm-dsb-center-align" >\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-dark-grey-bg right-width-zero">\n\t\t\t\t<div class="bpm-dsb-billboard-number" data-bind="text: total"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.cycleTime.billboard.total_open , attr : { title : bundle.cycleTime.billboard.total_open }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-grey-bg right-width-zero">\n\t\t\t\t<div class="bpm-dsb-billboard-number" data-bind="text: opened"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.cycleTime.billboard.opened_today , attr : { title : bundle.cycleTime.billboard.opened_today }"></div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-grey-bg">\n\t\t\t\t<div class="bpm-dsb-billboard-number" data-bind="text: closed"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title"\n\t\t\t\t\t data-bind="text: bundle.cycleTime.billboard.closed_today , attr : { title : bundle.cycleTime.billboard.closed_today }"></div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n\t<div class="oj-flex">\n\t\t<div id="cycleTimeChart" class="oj-flex-item oj-col oj-sm-12 oj-md-6">\n\t\t\t<!--<h3 data-bind="text: viewByLabel1"></h3>-->\n\t\t\t<div class="bpm-dsb-chart-container">\n\t\t\t\t<div\n\t\t\t\t\t\tdata-bind="ojComponent: {\n\t\t\t\t\tcomponent: \'ojChart\',\n\t\t\t\t\ttype: \'line\',\n\t\t\t\t\tseries: cycleSeries,\n\t\t\t\t\tgroups: cycleGroups,\n\t\t\t\t\tanimationOnDisplay: \'auto\',\n\t\t\t\t\thoverBehavior: \'dim\',\n\t\t\t\t\ttimeAxisType: \'enabled\',\n\t\t\t\t\tzoomAndScroll: \'live\',\n\t\t\t\t\toverview: {rendered: \'on\'},\n\t\t\t\t\thideAndShowBehavior: \'withRescale\',\n\t\t\t\t\tyAxis: {title: bundle.cycleTime.chart.days},\n\t\t\t\t\tstyleDefaults: {markerSize: 18},\n\t\t\t\t\txAxis: {step :86400000},\n\t\t\t\t\ttranslations : { labelNoData : bundle.cycleTime.chart.no_data_cycle},\n\t\t\t\t\ttitle : {text :  viewByLabel1() , halign : \'plotAreaCenter\' },\n\t\t\t\t\tvalueFormats: [{type: \'series\', tooltipLabel:  bundle.cycleTime.chart.process},\n\t\t\t\t\t \t\t\t\t{type: \'value\', tooltipLabel:  bundle.cycleTime.chart.time_days, scaling : \'none\'  ,converter : ko.toJS(cycleValueConverter)}]\n\t\t\t\t}" style="width: 100%; height: 500px">\n\t\t\t\t</div>\n\t\t\t\t<div id="bpm-dsb-cycle-chart-cycle-overlay"/>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div id="workloadChart" class="oj-flex-item oj-col oj-sm-12 oj-md-6 verticalLine">\n\t\t\t<!--<h3 data-bind="text: viewByLabel2"></h3>-->\n\t\t\t<div class="bpm-dsb-chart-container">\n\t\t\t\t<div\n\t\t\t\t\t\tdata-bind="ojComponent: {\n\t\t\t\t\tcomponent: \'ojChart\',\n\t\t\t\t\ttype: \'line\',\n\t\t\t\t\tseries: workloadSeries,\n\t\t\t\t\tgroups: workloadGroups,\n\t\t\t\t\tanimationOnDisplay: \'auto\',\n\t\t\t\t\thoverBehavior: \'dim\',\n\t\t\t\t\ttimeAxisType: \'enabled\',\n\t\t\t\t\tzoomAndScroll: \'live\',\n\t\t\t\t\toverview: {rendered: \'on\'},\n\t\t\t\t\thideAndShowBehavior: \'withRescale\',\n\t\t\t\t\ttranslations : { labelNoData : bundle.cycleTime.chart.no_data_wkld},\n\t\t\t\t\ttitle : {text :  viewByLabel2() , halign : \'plotAreaCenter\' },\n\t\t\t\t\tyAxis: {minStep :1 , title: bundle.cycleTime.chart.count},\n\t\t\t\t\txAxis: {step :86400000},\n\t\t\t\t\tvalueFormats: [{type: \'series\', tooltipLabel:  bundle.cycleTime.chart.process},\n\t\t\t\t\t \t\t\t\t{type: \'value\', tooltipLabel: bundle.cycleTime.chart.count, scaling : \'none\'  ,converter : ko.toJS(workloadValueConverter)}]\n\t\t\t\t}" style="width: 100%; height: 500px">\n\t\t\t\t</div>\n\t\t\t\t<div id="bpm-dsb-cycle-chart-wkld-overlay"/>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n';});

/**
 * Created by nisabhar on 6/12/2015.
 */

define('pcs/charts/dashboard/viewModel/dashboards/closedDashboard',['ojs/ojcore' ,'knockout','pcs/charts/dashboard/util', 'jquery', 'ojs/ojtable', 'ojs/ojbutton', 'ojL10n!pcs/resources/nls/dashboardResource'
], function(oj, ko, util, $) {
	/**
	 * The view model for the main content view template
	 */
	function closedDashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.parent = params.parent;	// dashboardContainer
		this.baseRestUrl = this.parent.baseRestUrl;
		this.restEndPoint = this.parent.baseRestUrl + this.parent.chartEndpoint;
		var authInfo =this.parent.authInfo; // Login credentials

		// --- knockout bindings ------
		self.processes = ko.observableArray([]);
		self.datasource = new oj.ArrayTableDataSource(self.processes,{idAttribute: "index"});
		self.period = ko.observable('today');

		self.periodButtons = [
			{id: 'today', label: self.bundle.closed.button.today},
			{id: 'week', label: self.bundle.closed.button.this_week},
			{id: 'month', label: self.bundle.closed.button.this_month}
		];

		self.periodLabels = {
			today: [self.bundle.closed.period.today,
				self.bundle.closed.period.yesterday],
			week: [self.bundle.closed.period.this_week,
				self.bundle.closed.period.last_week],
			month: [self.bundle.closed.period.this_month,
				self.bundle.closed.period.last_month]
		};

		self.periodQueries = {
			today: 'TODAY',
			week: 'THIS_WEEK',
			month: 'THIS_MONTH'
		};

		self.totals = ko.observable([0,0,0,0]);

		self.handlePeriodChange = function() {
			self.loadData();
			// temporary hack due to OJTABLE: CHANGING COLUMNS DOES NOT CHANGE COLUMN HEADERS
			var table = document.getElementById("closedProcesses");
			ko.cleanNode(table);
			ko.applyBindings(self,table);
		};

		self.renderHeader = function(context) {
			var column = context.columnIndex;
			if (column > 4) {
				var labels = [self.bundle.closed.table.completed,
					self.bundle.closed.table.aborted,
					self.bundle.closed.table.errored,
					self.bundle.closed.table.avg_cycle,
					self.bundle.closed.table.avg_cycle,
					self.bundle.closed.table.max_cycle
				];
				var lines = [labels[column-2], self.periodLabels[self.period()][(column == 6) ? 1 : 0]];
				context.columnHeaderSortableIconRenderer(null, function(headerContentDiv)
				{
					for (var i=0; i<lines.length; i++) {
						var headerTextDiv = $(document.createElement('div'));
						headerTextDiv.text(lines[i]);
						headerContentDiv.append(headerTextDiv);
					}
					headerContentDiv.parent().attr("style", "height:auto; text-align: center;");
				});
			}
		};


		self.columns = [{headerText: self.bundle.closed.table.application, field: 'application', style: 'width: 24%'},
			{headerText: self.bundle.closed.table.process, field: 'process', style: 'width: 25%'},
			{headerText: self.bundle.closed.table.completed, field: 'completed', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-succ-column bpm-dsb-light-green-bg'},
			{headerText: self.bundle.closed.table.aborted, field: 'aborted', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-fail-column bpm-dsb-light-red-bg'},
			{headerText:  self.bundle.closed.table.errored, field: 'errored', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-fail-column bpm-dsb-light-red-bg'},
			{field: 'avgThis', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-column', template: 'bpm_charts_closed_proc_avg_cycle_tmpl'},
			{field: 'avgLast', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-column'},
			{field: 'max', style: 'width: 8.5%', className: 'bpm-dsb-closed-tbl-max-column'}
		];

		//  Method to refresh the content
		self.refresh = function(){
			self.loadData();
			//Refresh Process list too
			self.parent.loadProcessList();
		};

		// method to create the parameter list for the query
		self.paramList= function(){
			var param = util.paramList(self);
			return param;
		};

		// load/reload process data to display
		this.loadData = function() {
			var param =self.paramList();

			// Add overlays for loading
			$('#bpm-dsb-closed-table-overlay').addClass('bpm-dsb-load-overlay');

			var q = "CLOSED_PROCESS_ANALYSIS_" + self.periodQueries[self.period()];
			self.load(q + "_BILLBOARD" + param, self.populateClosedBillboard);
			self.load(q + "_TABLE" + param, self.populateClosedTable);
		};

		self.load = function(query, populate){
			var url = self.restEndPoint + query;
			$.ajax
			({
				type: "GET",
				url: url,
				beforeSend: function (xhr) {
					if (authInfo) {
						xhr.setRequestHeader('Authorization', authInfo);
					}
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				success: function (json) {
					populate(json);
				},
				error: function ( jqXHR) {
					populate();
					util.errorHandler(jqXHR);
				},
				failure: function () {
					loggerUtil.log('failed in ' + query);
				}
			});
		};

		self.populateClosedBillboard = function(data){
			if(data && data.rows){
				var totals = [0,0,0,0];
				var c = util.columnAlias(data);
				var row = data.rows[0];
				totals[0] = row.values[c.TOTAL_CLOSED]+0;
				totals[1] = row.values[c.TOTAL_COMPLETED]+0;
				totals[2] = row.values[c.TOTAL_ABORTED]+0;
				totals[3] = row.values[c.TOTAL_FAULTED]+0;
				self.totals(totals);
			}
		};

		self.populateClosedTable = function(data){
			var p_array = [];

			if (data && data.rows) {
				var c = util.columnAlias(data);
				$.each(data.rows,function(index,row) {
					var p = {};
					p.index = index;	// for idAttribute needed by ojTable for some reason
					p.application = row.values[c.COMPOSITE_NAME];
					p.process = row.values[c.PROCESS_LABEL];
					p.completed = row.values[c.TOTAL_COMPLETED]+0;
					p.aborted = row.values[c.TOTAL_ABORTED]+0;
					p.errored = row.values[c.TOTAL_FAULTED]+0;
					p.avgThis = (row.values[c.CURR_AVG_CYCLE_TIME_IN_DAYS]+0).toFixed(1);
					p.avgLast = (row.values[c.PREV_AVG_CYCLE_TIME_IN_DAYS]+0).toFixed(1);
					p.isCycletimeIncreasing = row.values[c.IS_CYCLE_TIME_INCREASING]+0;
					p.max = (row.values[c.MAX_CYCLE_TIME_IN_DAYS]+0).toFixed(1);
					p_array.push(p);
				});
			}
			// remove overlays for loading
			$('#bpm-dsb-closed-table-overlay').removeClass('bpm-dsb-load-overlay');

			self.processes(p_array);
		};

		// ------ Loading Mechanism -------------------
		self.parent.selectedTab.subscribe(function(tab) {
			if (tab === 4){
				self.loadData();
			}
		});

		// ------- Code for Filtering and offCanvas --------------------------
		self.parent.filterApplied.subscribe(function() {
			if (self.parent.selectedTab() === 4) {
				self.loadData();
			}
		});

		this.handleAttached = function(info) {
			//self.loadData();
		}

	}

	return closedDashboardContainerModel;
});


define('text!pcs/charts/dashboard/view/dashboards/closedDashboard.html',[],function () { return '<div class="oj-offcanvas-outer-wrapper bpm-dsb-panel">\n\n\t<div data-bind="template: { name: \'bpm-dsb-icon-bar-template\', data: $data }"></div>\n\n\t<h1 data-bind="text: bundle.closed.title"></h1>\n\n\t<div id="period-container" class="closed-period-container">\n\t\t<div id="period" class="closed-period oj-button-half-chrome oj-button-primary"\n\t\t\t data-bind="ojComponent: {component: \'ojButtonset\', checked: period,\n\t\t\t\t\t\t\t\t  optionChange: handlePeriodChange}"\n\t\t\t aria-label="Select a reporting period">\n\t\t\t<!-- ko foreach: periodButtons -->\n\t\t\t<label data-bind="attr: {for: id, title: label}"></label>\n\t\t\t<input type="radio" name="period"\n\t\t\t\t   data-bind="value: id, attr: {id: id},\n\t\t\t\t\t\t\t  ojComponent: {component: \'ojButton\', label: label}"/>\n\t\t\t<span class="btn-separator"></span>\n\t\t\t<!-- /ko -->\n\t\t</div>\n\t</div>\n\t<div  class="oj-sm-12 bpm-dsb-center-align stats-margin">\n\t\t<div class="bpm-dsb-center-align" >\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-dark-grey-bg right-width-zero">\n\t\t\t\t<div class="bpm-dsb-billboard-number" data-bind="text: totals()[0]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title">\n\t\t\t\t\t<span data-bind="text:bundle.closed.billboard.total_closed , attr : { title : bundle.closed.billboard.total_closed }"></span>\n\t\t\t\t\t<!--<br/>-->\n\t\t\t\t\t<!--<span data-bind="text: periodLabels[period()][0]"></span>-->\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-green-bg right-width-zero">\n\t\t\t\t<div class="bpm-dsb-billboard-number bpm-dsb-dark-green-numb" data-bind="text: totals()[1]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title">\n\t\t\t\t\t<span data-bind="text:bundle.closed.billboard.completed , attr : { title : bundle.closed.billboard.completed }"></span>\n\t\t\t\t\t<!--<br/>-->\n\t\t\t\t\t<!--<span data-bind="text: periodLabels[period()][0]"></span>-->\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-red-bg right-width-zero">\n\t\t\t\t<div class="bpm-dsb-billboard-number bpm-dsb-dark-red-numb" data-bind="text: totals()[2]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title">\n\t\t\t\t\t<span data-bind="text:bundle.closed.billboard.aborted , attr : { title : bundle.closed.billboard.aborted }"></span>\n\t\t\t\t\t<!--<br/>-->\n\t\t\t\t\t<!--<span data-bind="text: periodLabels[period()][0]"></span>-->\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="bpm-dsb-billb-box bpm-dsb-light-red-bg">\n\t\t\t\t<div class="bpm-dsb-billboard-number bpm-dsb-dark-red-numb" data-bind="text: totals()[3]"></div>\n\t\t\t\t<div class="bpm-dsb-billboard-title">\n\t\t\t\t\t<span data-bind="text:bundle.closed.billboard.errored , attr : { title : bundle.closed.billboard.errored }"></span>\n\t\t\t\t\t<!--<br/>-->\n\t\t\t\t\t<!--<span data-bind="text: periodLabels[period()][0]"></span>-->\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n\n\t<div class="bpm-dsb-chart-container oj-flex">\n\t\t<table id="closedProcesses" summary="Closed Processes" aria-label="Closed Processes Table"\n\t\t\t   data-bind="ojComponent: {component: \'ojTable\',\n\t\t\t\t\t\t\t\t data: datasource,\n\t\t\t\t\t\t\t\t columns: columns,\n\t\t\t\t\t\t\t\t columnsDefault: {headerRenderer: renderHeader},\n\t\t\t\t\t\t\t\t rootAttributes: {\'style\': \'width: 100%; height: 100%; font-size: 16px\'}}">\n\t\t</table>\n\t\t<div id="bpm-dsb-closed-table-overlay"/>\n\t</div>\n\n\t<!-- This template is used in the Avg cycle Column of the above table -->\n\t<script type="text/html" id="bpm_charts_closed_proc_avg_cycle_tmpl">\n\t\t<td>\n\t\t\t<span data-bind="text: avgThis"></span>\n\t\t\t<!-- ko if: isCycletimeIncreasing === 1 -->\n\t\t\t<span class="bpm-dsb-closed-tbl-cycle-inc" data-bind="attr :{title : $parent.bundle.closed.table.increased}"></span>\n\t\t\t<!-- /ko -->\n\t\t\t<!-- ko if: isCycletimeIncreasing === -1 -->\n\t\t\t<span class="bpm-dsb-closed-tbl-cycle-dec" data-bind="attr :{title : $parent.bundle.closed.table.decreased}"></span>\n\t\t\t<!-- /ko -->\n\t\t</td>\n\t</script>\n\n</div>\n';});

/**
 * Created by nisabhar on 6/25/2015.
 */

define('pcs/charts/dashboard/viewModel/dashboards/filters/processFilter',['ojs/ojcore', 'knockout', 'pcs/charts/dashboard/util',   'ojs/ojinputnumber','ojs/ojoffcanvas', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojcheckboxset', 'ojL10n!pcs/resources/nls/dashboardResource'
], function (oj, ko, util) {
	/**
	 * The view model for the main content view template
	 */
	function processFilterModel(params) {
		var self = this;

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		self.parent = params.parent;	// hold the instance of Container

		// ---- bindings for  UI -------
		self.searchText = ko.observable();

		self.processList =	ko.observableArray();  // List of processes to show in UI
		self.actualProcessList = [];  // temp list to hold the all processes names returned by the Rest. used for remove duplicates

		self.processes = ko.observableArray();  // list of currently selected prcocesses

		// Custom Binding for 'ALL' check box , Its checked when all processes are selected, and unchecked if not
		self.selectAllProcess = ko.computed({
			read: function () {
				var isAllSelected = self.processes().length === self.actualProcessList.length;
				return isAllSelected;
			},
			write: function (value) {
				self.processes.removeAll();
				if(value === true){
					for(var i=0 ;i <self.processList().length ;i ++){
						var proc = self.processList()[i];
						self.processes.push(proc);
					}
				}
			}
		});

		self.showSelectAll = ko.computed(function() {

			if (self.processList().length != self.actualProcessList.length){
				return false;
			}
			return true;
		});

		// --- knocut bindings for the filter panel
		self.assignees = ko.observable(["Roles and Groups","Users"]);
		self.dateRange = ko.observable(30);
		self.topN = ko.observable(10);

		// The saved values which will be used for creating parameter list
		self.selectedAssignees = ["Roles and Groups","Users"]; // By default all the assignee is selected
		self.selectedDateRange = 30;			// binding for date range
		self.selectedTopN = 10;		// binding for tpp N
		self.selectedProcesses = [];
		self.selectedSelectAllProcess = true;


		// to refresh the process list
		self.parent.processListChangeSwitch.subscribe(function() {
			self.populateProcessList(self.parent.processData);
		});

		//-- Method to populate Process List
		self.populateProcessList = function(data){
			var isAllSelected = self.selectAllProcess();

			// clean the old list
			self.processList.removeAll();
			self.actualProcessList = [];

			// If user has not altered the selected process , recreate it too
			// else retain the selectedProcessList as the chart data will be according the selected process list
			if  (isAllSelected){
				self.processes.removeAll();
			}

			if(data && data.rows &&  data.rows.length >0){
				for(var i=0 ;i <data.rows.length ;i ++){
					self.actualProcessList.push(data.rows[i].values[0]);
					self.processList.push(data.rows[i].values[0]);
					if  (isAllSelected){
						self.processes.push(data.rows[i].values[0]);
					}
				}
			}
			// copy the local saved process  in saved process object
			self.selectedProcesses = self.processes.slice();

			// Refresh the JEt bindings
			$(".bpm-dsb-processSetId").ojCheckboxset("refresh");
			$(".bpm-dsb-process-list-loading").hide();
		};

		// -- method to search for a process locally
		self.search = function(){
			var key = self.searchText();
			if(key != undefined && key != null){
				key = key.trim().toLowerCase();
				self.processList.removeAll();
				self.processes.removeAll();

				for(var i=0 ;i <self.actualProcessList.length ;i ++){
					if(self.actualProcessList[i].toLowerCase().indexOf(key) !== -1){
						self.processList.push(self.actualProcessList[i]);
					}
				}
				// Refresh the JEt bindings
				$(".bpm-dsb-processSetId").ojCheckboxset("refresh");
			}
		};

		//-- populate the list once Module binding has been applied
		this.handleBindingsApplied = function(info) {
			self.populateProcessList(self.parent.processData);
		};


		self.apply = function(){
			// save the values -
			self.selectedAssignees = self.assignees(); // By default all the assignee is selected
			self.selectedDateRange = self.dateRange();			// binding for date range
			self.selectedTopN = self.topN();
			self.selectedProcesses = self.processes.slice();
			self.selectedSelectAllProcess = self.selectAllProcess();

			self.parent.filterPanel = self ;
			self.parent.apply();
		};

		self.reset= function(){
			self.assignees(self.selectedAssignees);
			self.dateRange(self.selectedDateRange);
			self.topN(self.selectedTopN);
			self.processes.removeAll();
			for(var i=0 ;i <self.selectedProcesses.length ;i++){
				self.processes.push(self.selectedProcesses[i]);
			}
		};

		self.handleAttached = function(info) {
			//add a close listener so when a offcanvas is autoDismissed we can synchronize the page state.
			$("#endDrawer").on("ojclose",
				function () {
					// reset the values
					self.reset();
				});
			// by default populate the filter panel object in parent
			self.parent.filterPanel = self ;
		};



	}

	return processFilterModel;
});


define('text!pcs/charts/dashboard/view/dashboards/filters/processFilter.html',[],function () { return '<div class="demo-offcanvas-close">\n\t<button class="oj-button-sm "\n\t\t\taria-label="close" role="button"\n\t\t\tdata-bind="click: $parent.closeInner, ojComponent: {component:\'ojButton\',\n                                     label: bundle.processFilter.close,\n                                     display: \'icons\',\n                                     icons: {start: \'oj-fwk-icon-cross oj-fwk-icon\'}}">\n\t</button>\n</div>\n\n<br/>\n\n<div class="bpm-dsb-parameter-box-width" >\n\n\t<div data-bind="if : $parent.selectedTab() === 3">\n\t\t<label for="dateRangeInput" ><span data-bind="text: bundle.processFilter.date_range"></span>\t</label>\n\t\t<input id="dateRangeInput"\n\t\t\t   data-bind="ojComponent: {component: \'ojInputNumber\',min:0,value:dateRange} , attr :{placeholder : bundle.processFilter.days}"/>\n\t\t<br/>\n\t\t<br/>\n\t\t<hr/>\n\t\t<br/>\n\t</div>\n\n\t<div>\n\t\t<label for="input" id="processlabelid"><span data-bind="text: bundle.processFilter.select_process"></span>\t</label>\n\t\t<input id="input" placeholder="" data-bind="ojComponent: {component: \'ojInputText\',value : searchText}, attr :{placeholder : bundle.processFilter.search_process}">\n\t\t<button  data-bind="click: search,\n\t\t\t\t\t\t\t\t\t   ojComponent: {component:\'ojButton\',\n\t\t\t\t\t\t\t\t\t   label:  bundle.processFilter.search,\n\t\t\t\t\t\t\t\t\t\tdisplay: \'icons\',\n\t\t\t\t\t\t\t\t\t   icons: {start: \'oj-fwk-icon-magnifier oj-fwk-icon\'}}">\n\t\t</button>\n\n\n\t\t<div  style="margin-top: 10px" data-bind="if: showSelectAll">\n\t\t\t<input type="checkbox" id="checkboxAll" data-bind="checked: selectAllProcess " />\n\t\t\t<label for="checkboxAll" style="margin-left: 8px;" ><span data-bind="text: bundle.processFilter.all"></span> </label>\n\t\t</div>\n\t\t<div class="bpm-dsb-process-list-loading bpm-dsb-parameter-box-width bpm-dsb-center-align">\n\t\t\t<div class="bpm-dsb-loading bpm-dsb-center-align"></div>\n\t\t</div>\n\t\t<div id="processSetId" class="bpm-dsb-processSetId bpm-dsb-parameter-box-width" aria-labelledby="processlabelid" data-bind="ojComponent: {component: \'ojCheckboxset\', value: processes}">\n\t\t\t<!-- ko foreach:processList -->\n\t\t\t<span class="oj-choice-row">\n\t\t\t\t\t<input data-bind="attr: { value: $data , id: $data }" type="checkbox">\n\t\t\t\t\t<label data-bind="attr: { for: $data }"><span data-bind="text :$data"></span> </label>\n\t\t\t\t</span>\n\t\t\t<!-- /ko  -->\n\t\t</div>\n\n\n\t\t<br/>\n\t\t<br/>\n\t\t<hr/>\n\t\t<br/>\n\t</div>\n\n\t<div data-bind="if :$parent.selectedTab() === 2 && $parent.workloadSubTab() !== \'top10_by_task\'">\n\t\t<label id="assigneelabelid"><span data-bind="text: bundle.processFilter.show_assignee"></span></label>\n\t\t<div id="assigneeSetId" aria-labelledby="assigneelabelid"\n\t\t\t data-bind="ojComponent: {\n\t\t\t  component: \'ojCheckboxset\',\n\t\t\t  value: assignees}" >\n\t\t  <span class="oj-choice-row">\n\t\t\t<input id="roles&Groups" type="checkbox" value="Roles and Groups">\n\t\t\t<label for="roles&Groups"><span data-bind="text: bundle.processFilter.roles_groups"></span></label>\n\t\t  </span>\n\t\t\t<span class="oj-choice-row">\n\t\t\t<input id="user" type="checkbox" value="Users">\n\t\t\t<label for="user"><span data-bind="text: bundle.processFilter.users"></span></label>\n\t\t  </span>\n\t\t</div>\n\t\t<br/>\n\t\t<br />\n\t\t<hr/>\n\t\t<br/>\n\t</div>\n\n\t<div data-bind="if : $parent.selectedTab() === 3">\n\t\t<label for="topNRangeInput" ><span data-bind="text: bundle.processFilter.show_top_N"></span></label>\n\t\t<input id="topNRangeInput"\n\t\t\t   data-bind="ojComponent: {component: \'ojInputNumber\',min:0,value:topN}, attr :{placeholder : bundle.processFilter.top_N}"/>\n\t\t<br/>\n\t\t<br/>\n\t\t<hr/>\n\t\t<br/>\n\t</div>\n\n\t<div class="bpm-dsb-param-apply">\n\t\t<button  data-bind="click: apply, attr: {title: bundle.processFilter.apply},\n\t\t\t\t\t\t\tojComponent: {component:\'ojButton\',\n\t\t\t\t\t\t\t  label: bundle.processFilter.apply,\n\t\t\t\t\t\t\t}">\n\t\t</button>\n\t</div>\n\n</div>\n\n';});

/**
 * Created by nisabhar on 6/12/2015.
 */

define('pcs/charts/dashboard/viewModel/dashboardContainer',['ojs/ojcore' ,'knockout', 'pcs/charts/dashboard/util', 'ojs/ojknockout' ,'ojs/ojtabs', 'ojs/ojoffcanvas', 'ojs/ojbutton' ,
	'ojs/ojinputtext', 'ojs/ojcheckboxset' ,'ojs/ojchart', 'ojs/ojlegend', 'ojs/ojdialog', 'ojL10n!pcs/resources/nls/dashboardResource',
	'pcs/charts/dashboard/viewModel/dashboards/healthDashboard', '!text!pcs/charts/dashboard/view/dashboards/healthDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/openDashboard', '!text!pcs/charts/dashboard/view/dashboards/openDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/workloadDashboard', '!text!pcs/charts/dashboard/view/dashboards/workloadDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/cycleTimeDashboard', '!text!pcs/charts/dashboard/view/dashboards/cycleTimeDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/closedDashboard', '!text!pcs/charts/dashboard/view/dashboards/closedDashboard.html',
	'pcs/charts/dashboard/viewModel/dashboards/filters/processFilter', '!text!pcs/charts/dashboard/view/dashboards/filters/processFilter.html'
], function(oj, ko,util) {
	/**
	 * The view model for the main content view template
	 */
	function dashboardContainerModel(params) {
		var self = this;
		var loggerUtil =  require('pcs/util/loggerUtil');

		this.parent = params.parent;
		this.baseURL = this.parent.baseURL; //server address
		this.baseRestUrl = this.parent.baseRestURL; //Rest  '/bpm/api/1.0/'

		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');

		this.authInfo = this.parent.authInfo; // Login credentials

		this.chartEndpoint = "analytics/ootbqueries/";

		this.processTrackingPage = this.parent.processTrackingPage;
		this.tasksPage = this.parent.tasksPage;

		this.selectedTab = ko.observable(0);  // Binding for left side currently selected tabs
		this.workloadSubTab = ko.observable('top10_by_task') ; // Sub tab selected on workload page

		//----For Process List data ------
		self.processRestEndPoint = this.baseRestUrl + this.chartEndpoint + "PROCESS_LABEL_LIST";
		self.processListChangeSwitch = ko.observable(false);   // A switch we will just do on off so that subscribers know data has been changed
		self.processData = [];

		// REST CALL to populate Process List
		self.loadProcessList = function(){
			//  loggerUtil.log(self.processRestEndPoint);
			var url = self.processRestEndPoint ;
			var response = $.ajax
			({
				type: "GET",
				url: url,
				beforeSend: function (xhr) {
					if (self.authInfo) {
						xhr.setRequestHeader('Authorization', self.authInfo);
					}
				},
				xhrFields: {
					withCredentials: true
				},
				contentType: 'application/json',
				success: function (json) {
					self.populateProcessList(json);
				},
				error: function ( jqXHR) {
					util.errorHandler(jqXHR);
				},
				failure: function () {
					loggerUtil.log('error in loadProcessList');
				}
			});
		};

		//-- Method to populate Process List----
		self.populateProcessList = function(data) {
			self.processData = data;
			self.processListChangeSwitch( !self.processListChangeSwitch());
		};

		self.loadProcessList();

		//----For off canvas data ------
		self.filterApplied = ko.observable(false);

		// An object that maps launcher ids to offcanvas objects
		self.offcanvasMap =
			{
				"displayMode": "overlay",
				"selector": "#endDrawer"
			};

		// toggle show/hide offcanvas
		self.toggleDrawer = function(model, event)
		{
			var launcherId = event.currentTarget.id;
			var drawer = self.offcanvasMap;
			drawer.launcherId = launcherId;
			return oj.OffcanvasUtils.open(drawer);
		}

		// hide offcanvas from the viewport
		self.closeInner = function() {
			return oj.OffcanvasUtils.close( self.offcanvasMap);
		};

		self.apply = function(){
			self.filterApplied( !self.filterApplied());
			self.closeInner();
		};


		self.closeErrorDialog= function(){
			$("#bpm-dsb-error-dialog").ojDialog("close");
		};

		// Hide the dashboard loading indicator
		$("#bpm-dsb-loading-indicator").hide();

	}

	return dashboardContainerModel;
});


define('text!pcs/charts/dashboard/view/dashboardContainer.html',[],function () { return '<div id="bpm-dsb-tabs-container">\n\t<!-- offcanvas outer most wrapper -->\n\t<div class="oj-offcanvas-outer-wrapper">\n\t\t<div id="bpm-dsb-vtabs" class="oj-tabs-text-icon"\n\t\t\t data-bind="ojComponent:{component: \'ojTabs\' , edge : \'start\', selected: selectedTab}">\n\t\t\t<ul>\n\t\t\t\t<li>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="oj-top bpm-dsb-health-icon demo-icon-font bpm-dsb-nav-icon"\n\t\t\t\t\t\t\t data-bind="attr: {title: bundle.container.health}"\n\t\t\t\t\t\t\t role="img">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="oj-sm-only-hide bpm-dsb-nav-text"\n\t\t\t\t\t\t\t data-bind="text: bundle.container.health, attr: {title: bundle.container.health}"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="oj-start bpm-dsb-open-icon demo-icon-font bpm-dsb-nav-icon"\n\t\t\t\t\t\t\t data-bind="attr: {title: bundle.container.open}"\n\t\t\t\t\t\t\t role="img">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="oj-sm-only-hide bpm-dsb-nav-text"\n\t\t\t\t\t\t\t data-bind="text: bundle.container.open, attr: {title: bundle.container.open}"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="oj-start bpm-dsb-wkld-icon demo-icon-font bpm-dsb-nav-icon"\n\t\t\t\t\t\t\t data-bind="attr: {title: bundle.container.workload}"\n\t\t\t\t\t\t\t role="img">\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="oj-sm-only-hide bpm-dsb-nav-text"\n\t\t\t\t\t\t\t data-bind="text: bundle.container.workload, attr: {title: bundle.container.workload}"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="oj-start bpm-dsb-cycle-icon demo-icon-font bpm-dsb-nav-icon"\n\t\t\t\t\t\t\t data-bind="attr: {title: bundle.container.cycleTime}"\n\t\t\t\t\t\t\t role="img">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="oj-sm-only-hide bpm-dsb-nav-text"\n\t\t\t\t\t\t\t data-bind="text: bundle.container.cycleTime, attr: {title: bundle.container.cycleTime}"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="oj-start bpm-dsb-closed-icon demo-icon-font  bpm-dsb-nav-icon"\n\t\t\t\t\t\t\t data-bind="attr: {title: bundle.container.closed}"\n\t\t\t\t\t\t\t role="img">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="oj-sm-only-hide bpm-dsb-nav-text"\n\t\t\t\t\t\t\t data-bind="text: bundle.container.closed, attr: {title: bundle.container.closed}"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t\t<div id="bpm-dsb-health" class="bpm-dsb-tab-panel">\n\t\t\t\t<div id="bpm-dsb-health-container" data-bind="ojModule: { name: \'pcs/charts/dashboard/viewModel/dashboards/healthDashboard\', viewName: \'pcs/charts/dashboard/view/dashboards/healthDashboard\',\n\t\t\t\t\tparams: {parent: $data, loadImmediate: true}}">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id="bpm-dsb-open" class="bpm-dsb-tab-panel">\n\t\t\t\t<div id="bpm-dsb-open-container" data-bind="ojModule: { name: \'pcs/charts/dashboard/viewModel/dashboards/openDashboard\', viewName: \'pcs/charts/dashboard/view/dashboards/openDashboard\',\n\t\t\t\t\tparams: {parent: $data}}">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id="bpm-dsb-work" class="bpm-dsb-tab-panel">\n\t\t\t\t<div id="bpm-dsb-work-container"\n\t\t\t\t\t data-bind="ojModule: { name: \'pcs/charts/dashboard/viewModel/dashboards/workloadDashboard\', viewName: \'pcs/charts/dashboard/view/dashboards/workloadDashboard\',\n\t\t\t\t\tparams: {parent: $data}}">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id="bpm-dsb-cycle" class="bpm-dsb-tab-panel">\n\t\t\t\t<div id="bpm-dsb-cycle-container"\n\t\t\t\t\t data-bind="ojModule: { name: \'pcs/charts/dashboard/viewModel/dashboards/cycleTimeDashboard\', viewName: \'pcs/charts/dashboard/view/dashboards/cycleTimeDashboard\',\n\t\t\t\t\tparams: {parent: $data}}">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id="bpm-dsb-closed" class="bpm-dsb-tab-panel">\n\t\t\t\t<div id="bpm-dsb-closed-container" data-bind="ojModule: { name: \'pcs/charts/dashboard/viewModel/dashboards/closedDashboard\', viewName: \'pcs/charts/dashboard/view/dashboards/closedDashboard\',\n\t\t\t\t\tparams: {parent: $data}}">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<!-- end offcanvas -->\n\t\t<div id="endDrawer" class="oj-offcanvas-end oj-panel"\t>\n\t\t\t<div id="bpm-dsb-proc-filter" data-bind="ojModule: { name: \'pcs/charts/dashboard/viewModel/dashboards/filters/processFilter\', viewName: \'pcs/charts/dashboard/view/dashboards/filters/processFilter\',\n\t \t\t\t\t\t\t\t\tparams: {parent: $data}}"></div>\n\t\t</div>\n\n\t</div>\n\n\t<script type="text/html" id="bpm-dsb-icon-bar-template">\n\t\t<div class="demo-main-content" style="float: right" >\n\t\t\t<button data-bind="click: parent.toggleDrawer, attr: {title: $parent.bundle.container.parameters},\n\t\t\t\t\t\t\t\t\t   ojComponent: {component:\'ojButton\',\n\t\t\t\t\t\t\t\t\t   label: bundle.container.parameters,\n\t\t\t\t\t\t\t\t\t   icons: {start: \'bpm-dsb-filter-icon oj-fwk-icon\'}}">\n\t\t\t</button>\n\t\t\t<button  data-bind="click: refresh, attr: {title: $parent.bundle.container.refresh},\n\t\t\t\t\t\t\t\t\t   ojComponent: {component:\'ojButton\',\n\t\t\t\t\t\t\t\t\t   label: bundle.container.refresh,\n\t\t\t\t\t\t\t\t\t   icons: {start: \'bpm-dsb-refresh-icon oj-fwk-icon\'}}">\n\t\t\t</button>\n\t\t</div>\n\t</script>\n\t<div style="display:none" id="bpm-dsb-error-dialog"\n\t\t data-bind="attr : { title : bundle.container.error }, ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\'}">\n\t\t<div class="oj-dialog-body">\n\t\t\t<div id="bpm-dsb-error-dialog-custom-text"/>\n\t\t</div>\n\t\t<div class="oj-dialog-footer">\n\t\t\t<button id="okButton"  data-bind="click : closeErrorDialog , ojComponent: {component: \'ojButton\', label: bundle.container.ok}"> </button>\n\t\t</div>\n\t</div>\n</div>\n';});

/**
 * Created by nisabhar on 9/19/17.
 */


define('pcs/pcs.dashboard',['ojs/ojcore', 'knockout', 'jquery','!text!pcs/charts/dashboard/templates/pcs-dashboard.html', 'pcs/util/pcsUtil', 'pcs/util/loggerUtil',
		'pcs/charts/dashboard/viewModel/dashboardContainer', '!text!pcs/charts/dashboard/view/dashboardContainer.html',
		'ojs/ojmodule', 'jqueryui-amd/widget'],
	function( oj, ko, $, tmpl,pcsUtil) {
		'use strict';
		// define your widget under pcs namespace
		$.widget('pcs.dashboard', {
			//Options to be used as defaults
			options: {
				//data sources
				baseUri: '',
				baseRestUri : '/bpm/api/3.0/',
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
				}

				var vm = new rootViewModel();

				this.element.html(tmpl);

				//$('#globalBody').show();

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


//# sourceMappingURL=pcs.dashboard.js.map