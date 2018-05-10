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


define('text!pcs/taskhistory/templates/pcs-task-history-container.html',[],function () { return '<div id="pcs-th-panelPage">\n\t<div class="oj-flex">\n\t\t<div class="oj-sm-12 oj-panel oj-panel-alt2 oj-margin demo-mypanel"  style="background-color: #e9ebee;">\n\t\t\t<div >\n\t\t\t\t<h3 style="background-color: #c9d3dd; padding: 10px; margin: -14px;" data-bind="text:bundle.pcs.taskHistory.history"></h3>\n\t\t\t\t<div>\n\t\t\t\t\t<div style="padding-left: 30px; padding-top: 30px; margin-right: 100px;">\n\t\t\t\t\t\t<ul style="border-left: 3px solid #6ae25d; list-style: none outside;">\n\t\t\t\t\t\t\t<div id="pcs-th-taskHistoryDiv-new">\n\n\t\t\t\t\t\t\t\t<!-- ko foreach: procHistData -->\n\n\t\t\t\t\t\t\t\t<li data-bind="visible: $data.activityType === \'START_EVENT\'" class=\'pcs-th-green-dot-image\'>\n\n\t\t\t\t\t\t\t\t\t<span data-bind="html: $data.displayMessage"/>\n\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-date\' data-bind="text: $data.creationDate"/>\n\t\t\t\t\t\t\t\t\t<br><br><br>\n\n\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t<li data-bind="visible: $data.activityType === \'END_EVENT\'" class=\'pcs-th-green-dot-image\'>\n\n\t\t\t\t\t\t\t\t\t<span data-bind="text: $data.displayMessage"/>\n\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-date\' data-bind="text: $data.creationDate"/>\n\t\t\t\t\t\t\t\t\t<br><br><br>\n\n\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t<li data-bind="visible: $data.activityType === \'FUTURE_TASK\'" class=\'pcs-th-grey-dot-image\'>\n\n\t\t\t\t\t\t\t\t\t<span data-bind="html: $data.displayMessage"/>\n\t\t\t\t\t\t\t\t\t<br><br><br>\n\n\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t<li data-bind="visible: ($data.activityType === \'USER_TASK\' && $data.showExpanded === \'false\')" class=\'pcs-th-green-dot-image\'>\n\n\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-task-title\' data-bind="text: $data.displayMessage"/>\n\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-date\' data-bind="text: $data.creationDate"/>\n\t\t\t\t\t\t\t\t\t<br><br><br>\n\n\t\t\t\t\t\t\t\t</li>\n\n\n\t\t\t\t\t\t\t\t<div data-bind="visible: ($data.activityType === \'USER_TASK\' && $data.showExpanded === \'true\')">\n\n\t\t\t\t\t\t\t\t\t<li  class=\'pcs-th-blue-dot-image pcs-th-history-user-task-top\'>\n\n\t\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-task-title\' data-bind="text: $data.displayMessage"/>\n\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-date\' data-bind="text: $data.creationDate"/>\n\t\t\t\t\t\t\t\t\t\t<br><br>\n\n\t\t\t\t\t\t\t\t\t\t<!--assigneesHTMLTable starts -->\n\n\n\t\t\t\t\t\t\t\t\t\t<!--<table>\n                                            <tr>\n                                                <td rowspan=\'2\' style=\'padding-left: 0px\'>\n                                                    <table>\n                                                        <tr>\n                                                            <td class=\'pcs-th-assignee-table\'>\n                                                                <div data-bind="attr: { class: $data.routingTypeImageClass, title: $data.routingTypeImageTitle }"/>\n                                                                &lt;!&ndash;<img data-bind="attr: { class: $data.routingTypeImageClass, title: $data.routingTypeImageTitle }">&ndash;&gt;\n                                                            </td>\n                                                        </tr>\n                                                        <tr>\n                                                            <td class=\'pcs-th-assignee-table\'>\n                                                                <span data-bind="text: $data.routingTypeMoreInfo"/>\n                                                            </td>\n                                                        </tr>\n                                                    </table>\n                                                </td>\n                                                &lt;!&ndash; ko foreach: $data.originalAssignees &ndash;&gt;\n\n                                                    <td class=\'pcs-th-assignee-table\'>\n                                                        <div data-bind="css: $data.assigneeTypeImageClass"/>\n                                                        &lt;!&ndash;<img data-bind="css: $data.assigneeTypeImageClass">&ndash;&gt;\n                                                    </td>\n\n                                                &lt;!&ndash; /ko&ndash;&gt;\n                                            </tr>\n                                            <tr>\n                                                &lt;!&ndash; ko foreach: $data.originalAssignees &ndash;&gt;\n                                                    <td class=\'pcs-th-assignee-table\'>\n                                                        <span class=\'pcs-th-history-assignee-text\' data-bind="text: $data.id">\n                                                        </span>\n                                                    </td>\n                                                &lt;!&ndash; /ko&ndash;&gt;\n                                            </tr>\n                                        </table>-->\n\n\t\t\t\t\t\t\t\t\t\t<!--assigneesHTMLTable ends -->\n\n\t\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t\t<!-- ko foreach: $data.detailedHistory -->\n\n\t\t\t\t\t\t\t\t\t<li data-bind="visible: $data.actionType === \'REGULAR\'" class=\'pcs-th-history-user-task-other-rows\' style=\'padding-bottom: 26px;\'>\n\n\t\t\t\t\t\t\t\t\t\t<div style=\'float:left; padding-right: 34px; margin-left: -10px\' data-bind="css: $data.imageClass">\n\t\t\t\t\t\t\t\t\t\t\t<!--<img data-bind="css: $data.imageClass">-->\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<span style=\'padding-top: 11px; float: left;\' data-bind="html: $data.displayMessage"/> &nbsp &nbsp\n\t\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-date pcs-th-history-date-float-right\' style=\'padding-top: 11px;\' data-bind="text: $data.creationDate"/>\n\n\t\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t\t<li data-bind="visible: $data.actionType === \'COMMENT_ADDED\'" class=\'pcs-th-history-user-task-other-rows\'>\n\t\t\t\t\t\t\t\t\t\t<div style=\'float:left; padding-right: 34px; margin-left: -10px\' data-bind="css: $data.imageClass">\n\t\t\t\t\t\t\t\t\t\t\t<!--<img data-bind="css: $data.imageClass">-->\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<span data-bind="html: $data.displayMessage"></span> &nbsp &nbsp\n\t\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-date pcs-th-history-date-float-right\' data-bind="text: $data.creationDate"></span>\n\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-comment\' data-bind="text: $data.comments"></span>\n\t\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t\t<li data-bind="visible: $data.actionType === \'ATTACHMENT_ADDED\'" class=\'pcs-th-history-user-task-other-rows\'>\n\n\t\t\t\t\t\t\t\t\t\t<div style=\'float:left; padding-right: 34px; margin-left: -10px\' data-bind="css: $data.imageClass">\n\t\t\t\t\t\t\t\t\t\t\t<!--<img data-bind="css: $data.imageClass">-->\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<span data-bind="html: $data.displayMessage"></span> &nbsp &nbsp\n\t\t\t\t\t\t\t\t\t\t<span class=\'pcs-th-history-date pcs-th-history-date-float-right\' data-bind="text: $data.creationDate"></span>\n\t\t\t\t\t\t\t\t\t\t<br>\n\n\t\t\t\t\t\t\t\t\t\t<!--<span class=\'pcs-th-history-comment\' data-bind="text: $data.attachmentName"></span>-->\n\n\t\t\t\t\t\t\t\t\t\t<a href="#"  data-bind="text: $data.attachmentName, value : $data.attachmentURL, click:$root.onAttachmentClick"/>\n\n\n\n\t\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t\t<!-- /ko-->\n\n\t\t\t\t\t\t\t\t\t<br><br>\n\n\n\t\t\t\t\t\t\t\t</div>\n\n\n\n\t\t\t\t\t\t\t\t<!-- /ko-->\n\n\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n\n<!--<div id="pcs-th-panelPage-temp">\n\t<div class="oj-flex">\n\t\t<div class="oj-panel oj-panel-alt2 oj-margin demo-mypanel"  style="background-color: #e9ebee;">\n\t\t\t<div >\n\t\t\t\t<h3 style="background-color: #c9d3dd; padding: 10px; margin: -14px;" data-bind="text:bundle.pcs.taskHistory.history"></h3>\n\t\t\t\t<div>\n\t\t\t\t\t<div style="padding-left: 30px; padding-top: 30px; margin-right: 100px;">\n\t\t\t\t\t\t<ul style="border-left: 3px solid #6ae25d; list-style: none outside;">\n\t\t\t\t\t\t\t<div id="pcs-th-taskHistoryDiv">\n\n\n\n\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>-->\n';});

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
 * Created by nisabhar on 11/7/17.
 */

define('pcs/util/dateUtil',['knockout', 'ojs/ojcore', 'jquery','ojs/ojdatetimepicker'], function(ko, oj, $) {
	'use strict';


	/**
	 * ,method to convert time in string
	 * @param millisecs
	 * @returns {string}
	 */
	var _getTimeDurationTxt = function (millisecs) {

		if (!millisecs){
			return '';
		}

		var durationTxt = '';
		// get total seconds between the times
		var delta = Math.abs(millisecs) / 1000;

		// calculate (and subtract) whole days
		var days = Math.floor(delta / 86400);
		delta -= days * 86400;
		durationTxt = days > 0 ? durationTxt + days + 'd ' : durationTxt;

		// calculate (and subtract) whole hours
		var hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;
		durationTxt = hours > 0 ? durationTxt + hours + 'h ' : durationTxt;

		// calculate (and subtract) whole minutes
		var minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;
		durationTxt = minutes > 0 ? durationTxt + minutes + 'm' : durationTxt;

		if (durationTxt === ''){
			var seconds = Math.floor(delta);
			durationTxt = seconds + 's';
		}

		return durationTxt;
	};

	/**
	 * Convert the given utc date to user timezone
	 * @param utcDate
	 */
	var _getDateInUserTimezone = function(utcDate){
		if(!utcDate){
			return null;
		}

		var date;
		if (typeof utcDate === 'string' || typeof utcDate === 'number'){
			//string format or longTime format
			date = new Date(utcDate)
		}else if(utcDate instanceof Date){
			date = utcDate;
		}else{
			return utcDate;
		}

		var convertedDate = oj.IntlConverterUtils.dateToLocalIso(date);

		return convertedDate;
	};


	/**
	 * convert the requested date in the given pattern, do not change the timezone
	 * @param requestedDate
	 * @param datePattern
	 * @returns {string}
	 */
	var _getFormattedDate =  function (requestedDate, datePattern) {
		if(!requestedDate || requestedDate === ''){
			return '';
		}
		var pattern = datePattern ? datePattern : 'MMM dd yyyy, hh:mm a';
		var dateOptions = {
			pattern: pattern
		};
		var dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter(dateOptions);

		return dateConverter.format(requestedDate);
	};


	/**
	* method to convert
	* @param userDate
	* @returns {Date}
	*/
	var _getDateStingInUTCTimezone= function(userDate){

		var date;
		if (typeof userDate === 'string' || typeof userDate === 'number'){
			//string format or longTime format
			date = new Date(userDate)
		}else if(userDate instanceof Date){
			date = userDate;
		}else{
			return userDate.toString();
		}

		date =date.toISOString();

		return date;
	};


	/**
	 * custom handlers to convert date pattern
	 * @type {{update: update}}
	 */
	ko.bindingHandlers.pcsFormatDate = {
		update: function(element, valueAccessor, allBindings) {
			var valueUnwrapped = ko.unwrap(valueAccessor());

			if (!valueUnwrapped) {
				return;
			}

			var formattedValue = _getFormattedDate (valueUnwrapped, allBindings().datePattern);

			ko.bindingHandlers.text.update(element, function() {
				return formattedValue;
			});
		}
	};


	return {

		getTimeDurationTxt : _getTimeDurationTxt,

		getDateInUserTimezone: _getDateInUserTimezone,

		getFormattedDate : _getFormattedDate,

		getDateStingInUTCTimezone: _getDateStingInUTCTimezone
	};
});

define('pcs/tasklist/viewModel/Task',['pcs/util/dateUtil'], function(dateUtil) {
    'use strict';
    return function(data) {

		//store the server dates
		data.serverAssignedDate = data.assignedDate;
		data.serverDueDate = data.dueDate;
		data.serverUpdatedDate = data.updatedDate;
		data.serverCreateDate = data.createdDate;

		//convert to local dates
		data.assignedDate = dateUtil.getDateInUserTimezone(data.serverAssignedDate);
		data.dueDate =  dateUtil.getDateInUserTimezone(data.serverDueDate);
		data.updatedDate = dateUtil.getDateInUserTimezone(data.serverUpdatedDate);
		data.createdDate =  dateUtil.getDateInUserTimezone(data.serverCreateDate);

        return {
            getTitle: function() {
                return data.title;
            },
            getNumber: function() {
                return data.number;
            },
            getFromUser: function() {
                return data.fromUserDisplayName;
            },
            getState: function() {
                return data.state;
            },
            getAssignees: function() {
                return data.assignees.items;
            },
            getCreator: function() {
                return data.creatorName;
            },
            getAssignedDate: function() {
                return data.assignedDate;
            },
            getCreatedDate: function() {
                return data.createdDate;
            },
            getPriority: function() {
                return data.priority;
            },
            getFromUserName: function() {
                return data.fromUserName;
            },
            getFromUserDisplayName: function() {
                return data.fromUserDisplayName;
            },
            getShortSummary: function() {
                return data.shortSummary;
            },
            getDueDate: function() {
                return data.dueDate;
            },
            getProcessName: function() {
                return data.processName;
            },
            getUpdatedDate: function() {
                return data.updatedDate;
            },
            getActionList: function() {
                return data.actionList;
            }
        };
    };
});

define('pcs/taskhistory/viewModel/TaskHistory',['jquery','pcs/data-services/DataServices','pcs/tasklist/viewModel/Task' ],
	function($,DataServices, Task) {
    'use strict';
    var resourceUrlConfig = {
            tasks: '/tasks',
            processAudit: '/processes'
        },
        dataServices = DataServices.getInstance();


    //TODO: refactor to remove jquery deferred and use Promise when moving to JET 2.1
    return function(options) {
        //entire UI state of the task list is stored in _state
        var _state = {};
        //options will contain all preferences or customizations that can be
        //passed to task list via component. It will also contain language
        //and timezone
        _state.options = options;

        /*
                var resourcePaths = {
                        tasks: {
                            url: '/tasks'
                        }
                    },
                    createIdObjectArray = function(identityId, identityType) {
                        var idArray = [];
                        for (var i = 0; i < identityId.length; i++) {
                            idArray.push({
                                id: identityId[i],
                                type: identityType[i]
                            });
                        }
                        return idArray;
                    };
        */

        return {
            fetchTask: function(taskNumber) {
                var url = resourceUrlConfig.tasks;
                var promise = $.Deferred();

                url += '/' + taskNumber;
                dataServices.get(url, null, '4.0').done(function(data) {
                    promise.resolve(data);
                }).fail(function(error) {
                    promise.reject(error);
                });
                return promise;
            },
            fetchProcessAuditInfo: function(procInstId, currentTaskNumber) {
                var url = resourceUrlConfig.processAudit;
                var promise = $.Deferred();

                url += '/' + procInstId;
                url += '/audit?graphicFlag=false&filterActivitiesBy=USER_TASK&filterActivitiesBy=START_EVENT&filterActivitiesBy=END_EVENT&includeFutureTasksFlag=true';
                url += '&currentTaskNumber=' + currentTaskNumber;
                dataServices.get(url, null, '4.0').done(function(data) {
                    promise.resolve(data);
                }).fail(function(error) {
                    promise.reject(error);
                });
                return promise;
            }
        };
    };
});

/**
 * Created by vijagarw on 16/09/2016.
 */

define('pcs/taskhistory/viewModel/taskHistoryVM',['ojs/ojcore', 'knockout', 'jquery', 'pcs/util/pcsUtil', 'pcs/taskhistory/viewModel/TaskHistory', 'ojs/ojknockout', 'ojs/ojcollapsible', 'ojL10n!pcs/resources/nls/pcsSnippetsResource', 'ojs/ojvalidation'],

    function(oj, ko, $, pcsUtil, TaskHistory) {
        'use strict';

        function TaskHistoryVM(params) {

            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');

            self.procHistData = ko.observableArray([]);

            //var taskJSONData;
            //var taskNumber;
            //var service;

            //Set the resource bundle

            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

            function init() {

                var service = new TaskHistory();

                var currentTaskNumber = params.data.taskNumber;

                service.fetchTask(currentTaskNumber).then(function(taskJSON) {

                    var processInstanceID = taskJSON.processId;

                    var currentTaskNumber = taskJSON.number;

                    if (processInstanceID != null) {

                        //self.taskData = data;
                        //taskJSONData = data;
                        //getProcessAuditData(taskJSON);

                        service.fetchProcessAuditInfo(processInstanceID, currentTaskNumber).then(function(processAuditJSON) {
                            /*self.procHistData(processAuditJSON.processHistory);
                             var json = {
                             'processId' : processAuditJSON.processId
                             };
                             loggerUtil.log(json);*/



                            self.buildTaskHistoryViewJSON(taskJSON, processAuditJSON);




                            //self.getTaskHistory(taskJSON, processAuditJSON);
                        });
                    }
                });
            }

            init();

            /*function getProcessAuditData(taskJSON){
             service.fetchProcessAuditInfo(taskJSON.processId).then(function(processAuditJSON){
             self.procHistData(processAuditJSON.processHistory);
             self.getTaskHistory(taskJSON, processAuditJSON);
             });
             }*/

            function downloadFile(url, success) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.setRequestHeader('Authorization', pcsUtil.getAuthInfo());
                xhr.setRequestHeader('pcs_mode', 'dev');
                xhr.responseType = 'blob';
                xhr.onreadystatechange = function() {
                    if (xhr.status === 200 && xhr.readyState === 4) {
                        if (success) {
                            success(xhr.response);
                        }
                    }
                };
                xhr.send(null);
            }



            self.onAttachmentClick = function(data, event) {

                var attachmentURL = event.target.value;
                var attachmentName = event.target.text;

                //var win = window.open('_blank');

                downloadFile(attachmentURL, function(blob) {

                    var url = URL.createObjectURL(blob);

                    var a = document.createElement('a');
                    a.style = 'display: none';
                    a.href = url;
                    a.download = attachmentName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);


                    //win.location = url;
                });


            };

            self.buildTaskHistoryViewJSON = function(taskJSON, processAuditJSON) {

                var currentTaskNumber = taskJSON.number;

                if (taskJSON.rootTaskNumber) {
                    currentTaskNumber = taskJSON.rootTaskNumber;
                }


                var data = processAuditJSON;

                var taskHistoryJSON = {};

                taskHistoryJSON.taskNumber = currentTaskNumber;
                taskHistoryJSON.history = [];


                if (data.processHistory) {
                    for (var i = 0; i < data.processHistory.length; i++) {


                        var historyElement = {};

                        historyElement.activityType = data.processHistory[i].activityType;

                        if (data.processHistory[i].activityType === 'START_EVENT') {

                            var displayMessage = self.bundle.pcs.taskHistory.proc_inst_started;
                            displayMessage = oj.Translations.applyParameters(displayMessage, {
                                '0': data.processHistory[i].processName
                            });
                            historyElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].creationDate, 'MMM d, yyyy hh:mm:ss a');

                            if (data.processHistory[i].updatedBy) {

                                var updatedByMsg = self.bundle.pcs.taskHistory.proc_inst_started_by;

                                updatedByMsg = oj.Translations.applyParameters(updatedByMsg, {
                                    '0': data.processHistory[i].processName,
                                    '1': data.processHistory[i].updatedBy
                                });
                                displayMessage = updatedByMsg;
                            }



                            historyElement.displayMessage = displayMessage;

                        }

                        if (data.processHistory[i].activityType === 'END_EVENT') {

                            historyElement.displayMessage = self.bundle.pcs.taskHistory.proc_inst_ended;
                            historyElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].creationDate, 'MMM d, yyyy hh:mm:ss a');

                        }

                        if (data.processHistory[i].activityType === 'FUTURE_TASK') {

                            var futureTaskMsg = self.bundle.pcs.taskHistory.pcs_history_user_task_pending;
                            futureTaskMsg = oj.Translations.applyParameters(futureTaskMsg, {
                                '0': data.processHistory[i].activityName
                            });

                            historyElement.displayMessage = futureTaskMsg;

                        }


                        if (data.processHistory[i].activityType === 'USER_TASK') {

                            var displayMsg;

                            if (data.processHistory[i].userTaskTitle) {
                                displayMsg = data.processHistory[i].userTaskTitle;
                            } else {
                                displayMsg = data.processHistory[i].activityName;
                            }

                            historyElement.displayMessage = displayMsg;
                            historyElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].creationDate, 'MMM d, yyyy hh:mm:ss a');
                            historyElement.showExpanded = 'false';

                            if (data.processHistory[i].userTaskNumber && currentTaskNumber === parseInt(data.processHistory[i].userTaskNumber)) {

                                historyElement.detailedHistory = [];
                                historyElement.showExpanded = 'true';


                                var routingType = taskJSON.routingType;

                                if (routingType === 'SINGLE') {
                                    historyElement.routingTypeImageClass = 'pcs-th-single-assignee-img';
                                    historyElement.routingTypeImageTitle = 'Single Assignee';
                                } else if (routingType === 'PARALLEL') {

                                    historyElement.routingTypeImageClass = 'pcs-th-parallel-assignee-img';
                                    historyElement.routingTypeImageTitle = 'Parallel Assignees';
                                    historyElement.routingTypeMoreInfo = 'Consensus : ' + taskJSON.outcomePercentage + ' %';

                                } else if (routingType === 'SEQUENTIAL') {

                                    historyElement.routingTypeImageClass = 'pcs-th-sequential-assignee-img';
                                    historyElement.routingTypeImageTitle = 'Sequential Assignees';

                                } else if (routingType === 'MANAGEMENT CHAIN') {

                                    historyElement.routingTypeImageClass = 'pcs-th-management-chain-assignee-img';
                                    historyElement.routingTypeImageTitle = 'Management Chain in Sequence';
                                    historyElement.routingTypeMoreInfo = 'Number of levels : ' + taskJSON.managementChainLevel;
                                }


                                historyElement.originalAssignees = [];

                                for (var k = 0; k < taskJSON.originalAssignees.items.length; k++) {

                                    var originalAssigneesElement = {};

                                    originalAssigneesElement.type = taskJSON.originalAssignees.items[k].type;
                                    originalAssigneesElement.id = taskJSON.originalAssignees.items[k].id;

                                    var type = taskJSON.originalAssignees.items[k].type;

                                    if (type === 'user') {

                                        originalAssigneesElement.assigneeTypeImageClass = 'pcs-th-history-user-img';


                                    } else if (type === 'group') {

                                        originalAssigneesElement.assigneeTypeImageClass = 'pcs-th-history-group-img';

                                    } else if (type === 'application_role') {

                                        originalAssigneesElement.assigneeTypeImageClass = 'pcs-th-history-approle-img';

                                    }

                                    historyElement.originalAssignees.push(originalAssigneesElement);
                                }

                                for (var j = 0; j < data.processHistory[i].taskHistory.length; j++) {

                                    var detailedHistoryElement = {};


                                    if (data.processHistory[i].taskHistory[j].actionName === 'System Update') {

                                        continue;
                                        // do nothing
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Withdrawn') {

                                        var withDrawnMsg = self.bundle.pcs.taskHistory.pcs_history_withdrawn_message;
                                        withDrawnMsg = oj.Translations.applyParameters(withDrawnMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = withDrawnMsg;

                                        //detailedHistoryElement.displayMsg = 'Withdrawn from ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-withdrawn-action-img';
                                        detailedHistoryElement.actionType = 'REGULAR';


                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-withdrawn-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Withdrawn from ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +


                                         '</li>';*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Resumed') {

                                        var resumedMesage = self.bundle.pcs.taskHistory.pcs_history_resumed_message;
                                        resumedMesage = oj.Translations.applyParameters(resumedMesage, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = resumedMesage;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        //detailedHistoryElement.displayMsg = 'Resumed by ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-resumed-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-resumed-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Resumed by ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


                                         '</span>' +


                                         '</li>';*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Suspended') {

                                        var suspendedMsg = self.bundle.pcs.taskHistory.pcs_history_suspended_message;
                                        suspendedMsg = oj.Translations.applyParameters(suspendedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = suspendedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        //detailedHistoryElement.displayMsg = 'Suspended by ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-suspended-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-suspended-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Suspended by ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


                                         '</span>' +


                                         '</li>';*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Escalated') {

                                        var escalatedMsg = self.bundle.pcs.taskHistory.pcs_history_escalated_message;
                                        escalatedMsg = oj.Translations.applyParameters(escalatedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = escalatedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        //detailedHistoryElement.displayMsg = 'Escalated to ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-escalated-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-escalated-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Escalated to ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +


                                         '</li>';*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Delegated') {

                                        var delegatedMsg = self.bundle.pcs.taskHistory.pcs_history_delegated_message;
                                        delegatedMsg = oj.Translations.applyParameters(delegatedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = delegatedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        //detailedHistoryElement.displayMsg = 'Delegated to ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-delegated-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-delegated-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Delegated to ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +


                                         '</li>';*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Approved') {

                                        var approvedMsg = self.bundle.pcs.taskHistory.pcs_history_approved_message;
                                        approvedMsg = oj.Translations.applyParameters(approvedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = approvedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        //detailedHistoryElement.displayMsg = 'Approved by ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-approved-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-approved-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Approved by ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +


                                         '</li>';*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Rejected') {

                                        var rejectedMsg = self.bundle.pcs.taskHistory.pcs_history_rejected_message;
                                        rejectedMsg = oj.Translations.applyParameters(rejectedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = rejectedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        //detailedHistoryElement.displayMsg = 'Rejected by ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-rejected-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-rejected-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Rejected by ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


                                         '</span>' +


                                         '</li>';*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName.toString().startsWith('Task Completed')) {

                                        var actionNameStr = data.processHistory[i].taskHistory[j].actionName.toString();

                                        var strArray = actionNameStr.split('-');
                                        var action = strArray[1].trim();

                                        var detailedHistoryElementForAction = {};

                                        if (data.processHistory[i].taskHistory[j].displayName) {


                                            if (action === 'Rejected') {

                                                detailedHistoryElementForAction.imageClass = 'pcs-th-rejected-action-img';

                                            } else if (action === 'Approved') {

                                                detailedHistoryElementForAction.imageClass = 'pcs-th-approved-action-img';

                                            } else {

                                                detailedHistoryElementForAction.imageClass = 'pcs-th-undefined-action-img';
                                            }



                                            var actionMsg = self.bundle.pcs.taskHistory.pcs_history_any_action_message;
                                            actionMsg = oj.Translations.applyParameters(actionMsg, {
                                                '0': action,
                                                '1': data.processHistory[i].taskHistory[j].displayName
                                            });
                                            detailedHistoryElementForAction.displayMessage = actionMsg;


                                            //detailedHistoryElementForAction.displayMsg = action + ' by ' + data.processHistory[i].taskHistory[j].displayName;

                                            detailedHistoryElementForAction.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                            detailedHistoryElementForAction.actionType = 'REGULAR';
                                            historyElement.detailedHistory.push(detailedHistoryElementForAction);
                                        }

                                        var taskCompletedMsg = self.bundle.pcs.taskHistory.pcs_history_task_completed;
                                        detailedHistoryElement.displayMessage = taskCompletedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        //detailedHistoryElement.displayMsg = taskCompletedString;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-task-Completed-action-img';


                                        /*var actionNameStr = data.processHistory[i].taskHistory[j].actionNameStr.toString();

                                         var strArray = actionNameStr.split('-');
                                         var taskCompletedString = strArray[0].trim();
                                         var action = strArray[1].trim();


                                         if(data.processHistory[i].taskHistory[j].displayName) {
                                         historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>';

                                         if (action === 'Rejected') {

                                         historyHTML = historyHTML +
                                         '<img class='pcs-th-rejected-action-img'>';
                                         }
                                         else if (action === 'Approved') {

                                         historyHTML = historyHTML +
                                         '<img class='pcs-th-approved-action-img'>';
                                         } else {

                                         historyHTML = historyHTML +
                                         '<img class='pcs-th-undefined-action-img'>';
                                         }


                                         historyHTML = historyHTML +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>' +

                                         action + ' by ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +


                                         '</li>';
                                         }

                                         historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-task-Completed-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>' +

                                         taskCompletedString +

                                         '</span>' + '&nbsp &nbsp' +

                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +


                                         '</li>';*/


                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Information Submitted') {

                                        var infoSubmittedMsg = self.bundle.pcs.taskHistory.pcs_history_info_submitted_message;
                                        infoSubmittedMsg = oj.Translations.applyParameters(infoSubmittedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName,
                                            '1': data.processHistory[i].taskHistory[j].infoSubmittedTo
                                        });
                                        //updatedByMsg = oj.Translations.applyParameters(updatedByMsg, { '1' :data.processHistory[i].taskHistory[j].displayName});
                                        detailedHistoryElement.displayMessage = infoSubmittedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';


                                        //detailedHistoryElement.displayMsg = '' + 'submitted more Information to ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-info-submitted-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-info-submitted-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>' +

                                         '<span class='pcs-th-history-user-name'>' + '' + '</span> ' +

                                         'submitted more Information to ' + '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '&nbsp &nbsp' + '</span> ' +

                                         '</span>' +

                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +

                                         '</li>';*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Task Updated') {



                                        if (data.processHistory[i].taskHistory[j].displayName) {

                                            var taskHistoryUpdatedMsg = self.bundle.pcs.taskHistory.pcs_history_task_updated_message;
                                            taskHistoryUpdatedMsg = oj.Translations.applyParameters(taskHistoryUpdatedMsg, {
                                                '0': data.processHistory[i].taskHistory[j].displayName
                                            });
                                            detailedHistoryElement.displayMessage = taskHistoryUpdatedMsg;
                                            detailedHistoryElement.actionType = 'REGULAR';

                                            //detailedHistoryElement.displayMsg = 'Task updated by ' + data.processHistory[i].taskHistory[j].displayName;
                                            detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                            detailedHistoryElement.imageClass = 'pcs-th-task-updated-action-img';
                                        }

                                        /*										if(data.processHistory[i].taskHistory[j].displayName)

                                         historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-task-updated-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Task updated by ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +

                                         '</li>';*/

                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Information Requested') {

                                        var infoRequestedMsg = self.bundle.pcs.taskHistory.pcs_history_info_requested_message;

                                        var infoRequestedFrom = data.processHistory[i].taskHistory[j].infoRequestedFrom;

                                        infoRequestedMsg = oj.Translations.applyParameters(infoRequestedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName,
                                            '1': infoRequestedFrom
                                        });

                                        //updatedByMsg = oj.Translations.applyParameters(updatedByMsg, { '1' : infoRequestedFrom});

                                        detailedHistoryElement.displayMessage = infoRequestedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        //detailedHistoryElement.displayMsg = data.processHistory[i].taskHistory[j].displayName + 'requested for more Information from ' + '' ;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-info-requested-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-info-requested-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span> ' +

                                         'requested for more Information from ' + '<span class='pcs-th-history-user-name'>' + '' + '&nbsp &nbsp' + '</span> ' +

                                         '</span>' +

                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


                                         '</span>' +


                                         '</li>';*/

                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Reassigned') {

                                        var reassignedMsg = self.bundle.pcs.taskHistory.pcs_history_reassigned_message;
                                        reassignedMsg = oj.Translations.applyParameters(reassignedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = reassignedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        //detailedHistoryElement.displayMsg = 'Reassigned to ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-reassigned-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-reassigned-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Reassigned to ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +


                                         '</li>';*/

                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Assigned') {

                                        var assignedMsg = self.bundle.pcs.taskHistory.pcs_history_assigned_message;
                                        assignedMsg = oj.Translations.applyParameters(assignedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = assignedMsg;
                                        detailedHistoryElement.actionType = 'REGULAR';
                                        //detailedHistoryElement.displayMsg = 'Assigned to ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-assigned-action-img';

                                        /*historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-assigned-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>Assigned to ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +


                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


                                         '</span>' +


                                         '</li>';*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Attachment Added') {

                                        var attachmentAddedMsg = self.bundle.pcs.taskHistory.pcs_history_doc_attached_message;
                                        attachmentAddedMsg = oj.Translations.applyParameters(attachmentAddedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = attachmentAddedMsg;
                                        detailedHistoryElement.attachmentName = data.processHistory[i].taskHistory[j].reason;
                                        detailedHistoryElement.actionType = 'ATTACHMENT_ADDED';
                                        detailedHistoryElement.attachmentURL = data.processHistory[i].taskHistory[j].attachmentUri.href + '/stream';

                                        //detailedHistoryElement.displayMsg = 'Document attached by ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-att-added-action-img';

                                        /*var attURL = data.processHistory[i].taskHistory[j].attachmentUri.href;
                                         var attachmentLinkHTML = '';


                                         doGet(attURL, 'application/json', 'json').done(
                                         function(attJSON){

                                         var mimeType = attJSON.mimeType;
                                         var attName = attJSON.attachmentName;
                                         var attURI = attJSON.uri.href;

                                         doGet(attURI, mimeType, 'text').done(
                                         function(attContent){

                                         var content = attContent.toString();

                                         var hrefStr = 'data:'+ mimeType + ';charset=utf-8,' + content;

                                         attachmentLinkHTML = attachmentLinkHTML +
                                         '<a href='' + hrefStr + '' download='' + attName + ''>' + attName + '</a>';


                                         historyHTML = historyHTML + '<li class='pcs-th-history-user-task-other-rows'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-att-added-action-img'>' +

                                         '</div>' +

                                         'Document attached by ' +

                                         '<span class='pcs-th-history-user-name'>' +

                                         data.processHistory[i].taskHistory[j].displayName + '&nbsp &nbsp' +

                                         '</span>' +


                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +



                                         '</span>' +
                                         '<br>' +

                                         attachmentLinkHTML +

                                         '</li>';


                                         }
                                         ).fail(
                                         function(jqXHR, textStatus, errorThrown){
                                         alert('Attachment rest call failed');
                                         }
                                         );
                                         }
                                         ).fail(function(jqXHR, textStatus, errorThrown){
                                         alert('The JSON REST call for attachment failed');
                                         }
                                         );*/
                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Attachment Removed') {

                                        var attachmentreemovedMsg = self.bundle.pcs.taskHistory.pcs_history_doc_removed_message;
                                        attachmentreemovedMsg = oj.Translations.applyParameters(attachmentreemovedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = attachmentreemovedMsg;
                                        //detailedHistoryElement.attachmentName = data.processHistory[i].taskHistory[j].reason;
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-att-removed-action-img';

                                    } else if (data.processHistory[i].taskHistory[j].actionName === 'Comment Added') {

                                        var commentedMsg = self.bundle.pcs.taskHistory.pcs_history_commented_message;
                                        commentedMsg = oj.Translations.applyParameters(commentedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = commentedMsg;


                                        //detailedHistoryElement.displayMsg = 'Commented by ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-comment-added-action-img';
                                        detailedHistoryElement.comments = '' + data.processHistory[i].taskHistory[j].reason + '';
                                        detailedHistoryElement.actionType = 'COMMENT_ADDED';


                                        /*historyHTML = historyHTML + '<li class='pcs-th-history-user-task-other-rows'>' +


                                         '<div style='float:left; padding-right: 13px;'>' +

                                         '<img class='pcs-th-comment-added-action-img'>' +

                                         '</div>' +

                                         'Commented by ' +

                                         '<span class='pcs-th-history-user-name'>' +

                                         data.processHistory[i].taskHistory[j].displayName +

                                         '</span>' + '&nbsp &nbsp' +


                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +

                                         '<br>' +

                                         '<span class='pcs-th-history-comment'>' +

                                         ''' +

                                         data.processHistory[i].taskHistory[j].reason +

                                         ''' +

                                         '</span>' +

                                         '</li>';*/
                                    } else {

                                        var resumedMsg = self.bundle.pcs.taskHistory.pcs_history_resumed_message;
                                        resumedMsg = oj.Translations.applyParameters(resumedMsg, {
                                            '0': data.processHistory[i].taskHistory[j].displayName
                                        });
                                        detailedHistoryElement.displayMessage = resumedMsg;

                                        //for all custom actions. We can not hardcode custom actions
                                        var actionName = data.processHistory[i].taskHistory[j].actionName;

                                        detailedHistoryElement.displayMessage = actionName + ' by ' + data.processHistory[i].taskHistory[j].displayName;
                                        detailedHistoryElement.creationDate = self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a');
                                        detailedHistoryElement.imageClass = 'pcs-th-custom-action-img';
                                        detailedHistoryElement.actionType = 'REGULAR';

                                        /*//for all custom actions. We can not hardcode custom actions
                                         var actionNameStr = data.processHistory[i].taskHistory[j].actionNameStr;

                                         if(data.processHistory[i].taskHistory[j].displayName)

                                         historyHTML = historyHTML +

                                         '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

                                         '<div style='float:left; padding-right: 15px;'>' +

                                         '<img class='pcs-th-custom-action-img'>' +

                                         '</div>' +

                                         '<span style='padding-top: 11px; float: left;'>' +

                                         actionNameStr + ' by ' +

                                         '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
                                         '</span>' + '&nbsp &nbsp' +
                                         '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

                                         self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

                                         '</span>' +


                                         '</li>';*/


                                    }


                                    historyElement.detailedHistory.push(detailedHistoryElement);
                                }


                            }
                        }





                        taskHistoryJSON.history.push(historyElement);

                    }
                }




                self.procHistData(taskHistoryJSON.history);
                loggerUtil.log(taskHistoryJSON);

            };



            // wrapper function for HTTP GET

            self.formatTaskHistoryDate = function formatDate(dateISOStr, pattern) {
                var options = {
                    formatType: 'date',
                    pattern: pattern
                };
                var dateConverter = oj.Validation.converterFactory('datetime').createConverter(options);
                return dateConverter.format(oj.IntlConverterUtils.dateToLocalIso(new Date(dateISOStr)));
            };



			/**
			 * method to clean up everything
			 */
			self.dispose = function() {
				loggerUtil.log('dispose in taskHistoryVm');

				// clean up the events
			};






            /*self.getTaskHistory = function (taskJSON, processAuditJSON) {

             var currentTaskNumber = taskJSON.number;

             if(taskJSON.parentTaskPresentFlag)
             currentTaskNumber = taskJSON.parentTaskNumber;

             var data = processAuditJSON;

             var historyHTML = '';

             for (var i = 0; i < data.processHistory.length; i++) {

             if(data.processHistory[i].activityType === 'START_EVENT') {


             historyHTML = historyHTML +

             '<li class='pcs-th-green-dot-image'>' +

             self.bundle.pcs.taskHistory.proc_inst_started +

             '<br>' +

             '<span class='pcs-th-history-date'>' +

             self.formatTaskHistoryDate(data.processHistory[i].creationDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +

             '<br><br><br>' +

             '</li>';
             }

             if(data.processHistory[i].activityType === 'FUTURE_TASK') {

             historyHTML = historyHTML +

             '<li class='pcs-th-grey-dot-image'>' +

             'User Task ' +

             '<span class='pcs-th-history-task-title'>' +

             data.processHistory[i].activityName +

             '</span>' +

             ' is pending' +

             '<br><br><br>' +

             '</li>';

             }

             if(data.processHistory[i].activityType === 'END_EVENT') {

             historyHTML = historyHTML +

             '<li class='pcs-th-green-dot-image'>' +

             'Process Instance Ended' +

             '<br>' +

             '<span class='pcs-th-history-date'>' +

             self.formatTaskHistoryDate(data.processHistory[i].creationDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +

             '<br><br><br>' +

             '</li>';

             }


             if(data.processHistory[i].activityType === 'USER_TASK') {

             if(currentTaskNumber === data.processHistory[i].userTaskNumber) {


             var assigneesHTMLTable = '';
             var routingType = taskJSON.routingType;

             var routingTypeTable = '';

             if(routingType === 'SINGLE') {

             routingTypeTable = routingTypeTable +

             '<table>' +
             '<tr>' +
             '<td class='pcs-th-assignee-table'>' +

             '<img class='pcs-th-single-assignee-img' title='Single Assignee'>' +

             '</td>' +
             '</tr>' +

             '</table>';

             }
             else if(routingType === 'PARALLEL') {

             routingTypeTable = routingTypeTable +

             '<table>' +
             '<tr>' +
             '<td class='pcs-th-assignee-table'>' +

             '<img class='pcs-th-parallel-assignee-img' title='Parallel Assignees'>' +

             '</td>' +
             '</tr>' +

             '<tr>' +
             '<td class='pcs-th-assignee-table'>' +

             'Consensus : ' +  taskJSON.outcomePercentage + ' %' +

             '</td>' +
             '</tr>' +

             '</table>';

             }
             else if(routingType === 'SEQUENTIAL'){

             routingTypeTable = routingTypeTable +

             '<table>' +
             '<tr>' +
             '<td class='pcs-th-assignee-table'>' +

             '<img class='pcs-th-sequential-assignee-img' title='Sequential Assignees'>' +

             '</td>' +
             '</tr>' +



             '</table>';

             }
             else if(routingType === 'MANAGEMENT CHAIN'){
             routingTypeTable = routingTypeTable +

             '<table>' +
             '<tr>' +
             '<td class='pcs-th-assignee-table'>' +

             '<img class='pcs-th-management-chain-assignee-img' title='Management Chain in Sequence'>' +

             '</td>' +
             '</tr>' +

             '<tr>' +
             '<td class='pcs-th-assignee-table'>' +

             'Number of levels : ' + taskJSON.managementChainLevel +

             '</td>' +
             '</tr>' +

             '</table>';
             }

             assigneesHTMLTable = assigneesHTMLTable +

             '<table>' +
             '<tr>' +

             '<td rowspan='2' style='padding-left: 0px'>' +

             routingTypeTable +

             '</td>';

             for (var k = 0; k < taskJSON.originalAssignees.items.length; k++) {

             var type = taskJSON.originalAssignees.items[k].type;

             if(type === 'user'){

             assigneesHTMLTable = assigneesHTMLTable +
             '<td class='pcs-th-assignee-table'>' +

             '<img class='pcs-th-history-user-img'>' +

             '</td>';

             } else if(type === 'group'){

             assigneesHTMLTable = assigneesHTMLTable +
             '<td class='pcs-th-assignee-table'>' +

             '<img class='pcs-th-history-group-img'>' +

             '</td>';

             } else if(type === 'application_role') {

             assigneesHTMLTable = assigneesHTMLTable +
             '<td class='pcs-th-assignee-table'>' +

             '<img class='pcs-th-history-approle-img'>' +

             '</td>';

             }
             }

             assigneesHTMLTable = assigneesHTMLTable +

             '</tr>' +

             '<tr>';

             for (var k = 0; k < taskJSON.originalAssignees.items.length; k++) {


             assigneesHTMLTable = assigneesHTMLTable +
             '<td class='pcs-th-assignee-table'>' +
             '<span class='pcs-th-history-assignee-text'>' +
             taskJSON.originalAssignees.items[k].id +
             '</span>' +

             '</td>';
             }

             assigneesHTMLTable = assigneesHTMLTable +
             '</tr>' +

             '</table>';

             historyHTML = historyHTML +

             '<li class='pcs-th-blue-dot-image pcs-th-history-user-task-top'>' +

             /!*'<span class='pcs-th-history-task-title'>' +

             data.processHistory[i].activityName +

             '</span>' +

             ' - ' +*!/

             '<span class='pcs-th-history-task-title'>' +

             data.processHistory[i].userTaskTitle +

             '</span>' +

             '<br>' +

             '<span class='pcs-th-history-date'>' +

             self.formatTaskHistoryDate(data.processHistory[i].creationDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +

             '<br><br>' +

             assigneesHTMLTable +

             '</li>';



             for (var j = 0; j < data.processHistory[i].taskHistory.length; j++) {


             if (data.processHistory[i].taskHistory[j].actionName === 'System Update') {

             // do nothing
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Withdrawn') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-withdrawn-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Withdrawn from ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +


             '</li>';
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Resumed') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-resumed-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Resumed by ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


             '</span>' +


             '</li>';
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Suspended') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-suspended-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Suspended by ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


             '</span>' +


             '</li>';
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Escalated') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-escalated-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Escalated to ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +


             '</li>';
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Delegated') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-delegated-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Delegated to ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +


             '</li>';
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Approved') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-approved-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Approved by ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +


             '</li>';
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Rejected') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-rejected-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Rejected by ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


             '</span>' +


             '</li>';
             }

             else if (data.processHistory[i].taskHistory[j].actionName.toString().startsWith('Task Completed')) {

             var actionName = data.processHistory[i].taskHistory[j].actionName.toString();

             var strArray = actionName.split('-');
             var taskCompletedString = strArray[0].trim();
             var action = strArray[1].trim();


             if(data.processHistory[i].taskHistory[j].displayName) {
             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>';

             if (action === 'Rejected') {

             historyHTML = historyHTML +
             '<img class='pcs-th-rejected-action-img'>';
             }
             else if (action === 'Approved') {

             historyHTML = historyHTML +
             '<img class='pcs-th-approved-action-img'>';
             } else {

             historyHTML = historyHTML +
             '<img class='pcs-th-undefined-action-img'>';
             }


             historyHTML = historyHTML +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>' +

             action + ' by ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +


             '</li>';
             }

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-task-Completed-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>' +

             taskCompletedString +

             '</span>' + '&nbsp &nbsp' +

             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +


             '</li>';


             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Information Submitted') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-info-submitted-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>' +

             '<span class='pcs-th-history-user-name'>' + '' + '</span> ' +

             'submitted more Information to ' + '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '&nbsp &nbsp' + '</span> ' +

             '</span>' +

             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +

             '</li>';
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Task Updated') {

             if(data.processHistory[i].taskHistory[j].displayName)

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-task-updated-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Task updated by ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +


             '</li>';

             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Information Requested') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-info-requested-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span> ' +

             'requested for more Information from ' + '<span class='pcs-th-history-user-name'>' + '' + '&nbsp &nbsp' + '</span> ' +

             '</span>' +

             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


             '</span>' +


             '</li>';

             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Reassigned') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-reassigned-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Reassigned to ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +


             '</li>';

             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Assigned') {

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-assigned-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>Assigned to ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +


             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +


             '</span>' +


             '</li>';
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Attachment Added') {

             var attURL = data.processHistory[i].taskHistory[j].attachmentUri.href;
             var attachmentLinkHTML = '';


             /!*doGet(attURL, 'application/json', 'json').done(
             function(attJSON){

             var mimeType = attJSON.mimeType;
             var attName = attJSON.attachmentName;
             var attURI = attJSON.uri.href;

             doGet(attURI, mimeType, 'application/json').done(
             function(attContent){

             var content = attContent.toString();

             var hrefStr = 'data:'+ mimeType + ';charset=utf-8,' + content;

             attachmentLinkHTML = attachmentLinkHTML +
             '<a href='' + hrefStr + '' download='' + attName + ''>' + attName + '</a>';


             historyHTML = historyHTML + '<li class='pcs-th-history-user-task-other-rows'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-att-added-action-img'>' +

             '</div>' +

             'Document attached by ' +

             '<span class='pcs-th-history-user-name'>' +

             data.processHistory[i].taskHistory[j].displayName + '&nbsp &nbsp' +

             '</span>' +


             '<span class='pcs-th-history-date pcs-th-history-date-float-right'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +



             '</span>' +
             '<br>' +

             attachmentLinkHTML +

             '</li>';


             }
             ).fail(
             function(jqXHR, textStatus, errorThrown){
             alert('Attachment rest call failed');
             }
             );
             }
             ).fail(function(jqXHR, textStatus, errorThrown){
             alert('The JSON REST call for attachment failed');
             }
             );*!/
             }

             else if (data.processHistory[i].taskHistory[j].actionName === 'Comment Added') {
             historyHTML = historyHTML + '<li class='pcs-th-history-user-task-other-rows'>' +


             '<div style='float:left; padding-right: 13px;'>' +

             '<img class='pcs-th-comment-added-action-img'>' +

             '</div>' +

             'Commented by ' +

             '<span class='pcs-th-history-user-name'>' +

             data.processHistory[i].taskHistory[j].displayName +

             '</span>' + '&nbsp &nbsp' +


             '<span class='pcs-th-history-date pcs-th-history-date-float-right'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +

             '<br>' +

             '<span class='pcs-th-history-comment'>' +

             ''' +

             data.processHistory[i].taskHistory[j].reason +

             ''' +

             '</span>' +

             '</li>';
             }

             else {

             //for all custom actions. We can not hardcode custom actions
             var actionName = data.processHistory[i].taskHistory[j].actionName;

             if(data.processHistory[i].taskHistory[j].displayName)

             historyHTML = historyHTML +

             '<li class='pcs-th-history-user-task-other-rows' style='padding-bottom: 45px;'>' +

             '<div style='float:left; padding-right: 15px;'>' +

             '<img class='pcs-th-custom-action-img'>' +

             '</div>' +

             '<span style='padding-top: 11px; float: left;'>' +

             actionName + ' by ' +

             '<span class='pcs-th-history-user-name'>' + data.processHistory[i].taskHistory[j].displayName + '</span>' +
             '</span>' + '&nbsp &nbsp' +
             '<span class='pcs-th-history-date pcs-th-history-date-float-right' style='padding-top: 11px;'>' +

             self.formatTaskHistoryDate(data.processHistory[i].taskHistory[j].updatedDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +


             '</li>';


             }
             }

             historyHTML = historyHTML + '<br><br>';

             }

             else {

             historyHTML = historyHTML +

             '<li class='pcs-th-green-dot-image'>' +



             /!*'<span class='pcs-th-history-task-title'>' +

             data.processHistory[i].activityName +

             '</span>' +

             ' - ' +*!/

             '<span class='pcs-th-history-task-title'>' +

             data.processHistory[i].userTaskTitle +

             '</span>' +

             '<br>' +

             '<span class='pcs-th-history-date'>' +

             self.formatTaskHistoryDate(data.processHistory[i].creationDate, 'MMM d, yyyy hh:mm:ss a' ) +

             '</span>' +

             '<br><br><br>' +

             '</li>';

             }

             }
             }



             $('#pcs-th-taskHistoryDiv').html(historyHTML);






             };*/

        }


        return TaskHistoryVM;
    }
);


define('text!pcs/taskhistory/templates/pcs-taskhistory-error.html',[],function () { return '<div class="oj-message oj-message-error">\n    <span class="oj-component-icon oj-message-status-icon oj-message-error-icon"\n          role="img">\n    </span>\n    <span class="oj-message-content">\n        <div class="oj-message-summary">\n            Required parameters are missing\n        </div>\n        <div class="oj-message-detail">\n            <span>This component requires these values -</span>\n            <pre>\n    *taskNumber : \'\'\n    </pre>\n        </div>\n    </span>\n</div>\n';});

/**
 * Created by srayker on 8/25/2016.
 */

define('pcs/pcs.taskhistory',['ojs/ojcore', 'knockout', 'jquery', 'ojL10n!pcs/resources/nls/pcsSnippetsResource',
		'!text!pcs/taskhistory/templates/pcs-task-history-container.html', 'pcs/taskhistory/viewModel/taskHistoryVM',
		'!text!pcs/taskhistory/templates/pcs-taskhistory-error.html', 'pcs/util/loggerUtil',
         'jqueryui-amd/widget'
    ],
    function(oj, ko, $, bundle, tmpl, taskhistory,  errortmpl,loggerUtil) {
        'use strict';
        $.widget('pcs.taskhistory', {

            //Options to be used as defaults
            options: {
                taskNumber: '',
            },

			// Check if the Required options are provided to the widget
			_isValid: function() {
				if (this.options.taskNumber === undefined || this.options.taskNumber === '') {
					return false;
				}
				return true;
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
                var vm = new taskhistory(params);
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
				loggerUtil.log('Destroying history');
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
                // this._super( "_setOption", key, value );
            }
        });
    }
);


//# sourceMappingURL=pcs.taskhistory.js.map