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


define('text!pcs/attachments/templates/pcs-attachments.html',[],function () { return '<div data-bind=\'component: {\n    name: "attachmentComponent",\n\tparams : {data : data}\n}\'></div>\n';});

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


define('text!pcs/attachments/templates/pcs-attachments-error.html',[],function () { return '<div class="oj-message oj-message-error">\n    <span class="oj-component-icon oj-message-status-icon oj-message-error-icon"\n          role="img">\n    </span>\n    <span class="oj-message-content">\n        <div class="oj-message-summary">\n            Required parameters are missing\n        </div>\n        <div class="oj-message-detail">\n            <span>This component requires these values -</span>\n            <pre>\n    *id : \'\'\n    </pre>\n        </div>\n    </span>\n</div>\n';});


define('text!pcs/attachments/view/attachmentsContainer.html',[],function () { return '<div class="oj-margin pcs-attachments-detailBox">\n\n\t<div data-bind="if:showAttachments() && showDcsFolders()">\n\t\t<div class="oj-flex oj-sm-flex-items-initial">\n\t\t\t<div class="oj-flex-item pcs-attachments-caret-icon"  role="img" data-bind="attr:{title:bundle.pcs.attachments.foldersText}"></div>\n\t\t\t<div class="oj-flex-item pcs-attachments-folders-text"><a href="#" data-bind="click : closeFolder,text:bundle.pcs.attachments.foldersText"></a></div>\n\t\t</div>\n\t</div>\n\n\t<div data-bind="if:showAttachments()">\n\t\t<div class="oj-flex oj-flex-bar">\n\t\t\t<div data-bind="ifnot:showDcsFolders" class="pcs-attachments-title oj-flex-bar-start">\n\t\t\t\t<label class="pcs-attachments-title" data-bind="text:bundle.pcs.attachments.title"></label>\n\t\t\t</div>\n\t\t\t<div data-bind="if:showDcsFolders" class="pcs-attachments-title oj-flex-bar-start">\n\t\t\t\t<label class="pcs-attachments-title" data-bind="text:dscSelectedFolderName"></label>\n\t\t\t</div>\n\t\t\t<div class="pcs-attachments-uploadLink oj-flex-bar-end" style="padding-right:10px;" data-bind="ifnot:$data.displayDcs()">\n\t\t\t\t<a href="#" data-bind="click : openUploadDialog, text:bundle.pcs.attachments.uploadLink"></a>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div id="pcs-attachments-success-msg-container" style="display: none;margin-bottom:20px">\n\t\t<span title="Success" role="img" class="oj-fwk-icon-status-confirmation oj-fwk-icon"></span>\n\t\t<span id="pcs-attachments-success-msg" class="pcs-attachments-success-msg"></span>\n\t</div>\n\n\t<div id="pcs-attachments-error-msg-container" class="pcs-attachments-error-msg-container"  style="display: none">\n\t\t<span class="oj-component-icon oj-message-status-icon oj-message-error-icon" role="img" id="pcs-attachments-error-msg-icon" style="float: left ;margin-right:10px" ></span>\n\t\t<pre id="pcs-attachments-error-msg" class="pcs-attachments-error-msg"></pre>\n\t</div>\n</div>\n\n<div class="pcs-attachments-actionBox oj-panel oj-margin">\n\n\n\t<div data-bind="ifnot:showAttachments()">\n\t\t<div class="oj-flex oj-sm-flex-items-initial" data-bind="visible:isDcsFolderVisible">\n\n\t\t\t<ul class="pcs-attachments-attachmentsList" data-bind="foreach:dcsFolderList ">\n\t\t\t\t<li>\n\t\t\t\t\t<div class="oj-flex oj-flex-bar">\n\t\t\t\t\t\t<div class="oj-flex-bar-start">\n\t\t\t\t\t\t\t<!-- ko if:isFolder -->\n\t\t\t\t\t\t\t<div class="oj-flex-item pcs-attachments-folder-icon"  role="img" data-bind="attr:{title:$parent.bundle.pcs.attachments.folderText}"></div>\n\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t<!-- ko ifnot:isFolder -->\n\t\t\t\t\t\t\t<div class="oj-flex-item pcs-attachments-file-icon"  role="img" data-bind="attr:{title:$parent.bundle.pcs.attachments.fileText}"></div>\n\t\t\t\t\t\t\t<!-- /ko -->\n\t\t\t\t\t\t\t<div class="oj-flex-item"><a href="#" data-bind="click : $parent.openFolder,text:folderName"></a></div>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t\t<div id="pcs-attachments-docs-error"></div>\n\t\t</div>\n\t\t<div class="pcs-attachment-inline-div" data-bind="visible:!isDcsFolderVisible()">\n\t\t\t<div data-bind="visible:dcsFolderList().length > 1" style="display: none;">\n\t\t\t\t<span class="pcs-attachments-folders-back" data-bind="click:showFolders"></span>\n\t\t\t\t<a class="pcs-attachments-folders-text" data-bind="click:showFolders , text : bundle.pcs.attachments.foldersText"></a>\n\t\t\t</div>\n\t\t\t<div class="pcs-attachment-iframe-inline">\n\t\t\t\t<iframe id="pcs-attachment-iframe-inline" style="width: 100%;min-height: 550px" target="_top" data-bind="attr: {src: $data.dscSelectedAppLink}" frameborder="0" seamless="seamless" scrolling="auto">\n\t\t\t\t\t<p>Your browser does not support iframes.</p>\n\t\t\t\t</iframe>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n\n\t<div data-bind="if:showAttachments()">\n\n\t\t<!-- ko ifnot: $data.displayDcs() -->\n\t\t<div data-bind="if:attachmentList().length == 0">\n\t\t\t<span data-bind="text:bundle.pcs.attachments.noItemsText"></span>\n\t\t</div>\n\n\t\t<ul class="pcs-attachments-attachmentsList" data-bind="foreach:attachmentList ">\n\t\t\t<li>\n\t\t\t\t<div class="oj-flex oj-flex-bar">\n\t\t\t\t\t<div class="oj-flex-bar-start">\n\t\t\t\t\t\t<div data-bind="attr:{class:$parent.iconClass(filename, contentType)}">\n\t\t\t\t\t\t\t<span>&nbsp;&nbsp;</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="pcs-attachments-text">\n\t\t\t\t\t\t\t<a data-bind="attr :{href:href , download : filename }, click:$parent.viewAttachment" target="_blank">\n\t\t\t\t\t\t\t\t<p class="">\n\t\t\t\t\t\t\t\t\t<span data-bind="text: filename"></span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<span class="date pcs-attachments-sub-text">\n\t\t\t\t\t\t\t\t<span data-bind="text: fileInfoText"></span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="pcs-attachments-removeFile oj-flex-bar-end">\n\t\t\t\t\t\t<a href="#" data-bind="click:$parent.removeFileFromList">\n\t\t\t\t\t\t\t<span class="oj-icon pcs-attachments-remove-icon" role="img" data-bind="attr:{title:$parent.bundle.pcs.attachments.removeFile}"></span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div style="display:none"  class="pcs-attachments-delete-dialog"\n\t\t\t\t\t\t data-bind="attr : { title : $parent.bundle.pcs.attachments.dialog_confirm}, ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\'}">\n\t\t\t\t\t\t<div class="oj-dialog-body">\n\t\t\t\t\t\t\t<div data-bind="text : $parent.bundle.pcs.attachments.dialog_discard_msg"/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="oj-dialog-footer">\n\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\tdata-bind="click : $parent.yesDeleteDialog ,\n                    ojComponent: {component: \'ojButton\', label: $parent.bundle.pcs.attachments.dialog_yes}"></button>\n\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\tdata-bind="click : $parent.noDeleteDialog ,\n                    ojComponent: {component: \'ojButton\', label: $parent.bundle.pcs.attachments.dialog_no}"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<hr/>\n\t\t\t</li>\n\t\t</ul>\n\t\t<!-- /ko -->\n\t</div>\n\t<div id="pcs-attachments-overlay"/>\n\n</div>\n\n<div style="display:none" class="pcs-attachments-modalDialog"\n\t data-bind="attr: {title: bundle.pcs.attachments.uploadDialogTitle},\n\t ojComponent:{\n\t\tcomponent: \'ojDialog\',\n\t\tinitialVisibility: \'hide\',\n\t\tclose: handleDialogClose,\n\t\trootAttributes: { style: \'width: 500px; min-width: 200px; max-width 500px;\'}\n\t }">\n\t<div class="oj-dialog-body oj-form">\n\t\t<div class="oj-flex">\n\t\t\t<div class="oj-flex-item">\n\t\t\t\t<div data-bind="ifnot:showDcsFolders">\n\t\t\t\t\t<div class="pcs-attachments-note-txt" data-bind="text:bundle.pcs.attachments.uploadSizeLimitText"></div>\n\t\t\t\t</div>\n\t\t\t\t<div data-bind="if:showDcsFolders">\n\t\t\t\t\t<div class="pcs-attachments-note-txt" data-bind="text:bundle.pcs.attachments.docsUploadSizeLimitText"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="pcs-attachments-error-txt" data-bind="visible:isSizeLimitExceeding, text:bundle.pcs.attachments.fileSizeExceeded"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="oj-flex pcs-attachments-dialog-error-msg">\n\t\t\t<span class="oj-fwk-icon oj-fwk-icon-status-error oj-flex-item"></span>\n\t\t\t<span class="oj-flex-item" data-bind="text: bundle.pcs.attachments.fileExists"></span>\n\t\t</div>\n\t\t<div class="oj-flex oj-sm-odd-cols-12 oj-md-odd-cols-4 oj-md-labels-inline\n\t\t\t oj-form-cols-labels-inline oj-form-cols-max2">\n\t\t\t<div class="oj-flex-item">\n\t\t\t\t<label for="pcs-attachments-fileControl" data-bind="text:bundle.pcs.attachments.browseToUploadLabel"></label>\n\t\t\t</div>\n\t\t\t<div class="oj-flex-item">\n\t\t\t\t<input id="pcs-attachments-fileControl" type="file" class="pcs-attach-file-name"  title="Upload file" style="float:left;" />\n\t\t\t\t<div class="pcs-empty-file-name-text" style="display: none;color:red;clear: both;" class="text-error" data-bind="text:bundle.pcs.attachments.emptyAddFileText"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="oj-dialog-footer">\n\t\t<button class="pcs-attachments-upload-btn"\n\t\t\t\tdata-bind="click: uploadAttachment, ojComponent: {component: \'ojButton\', label: bundle.pcs.attachments.upload, disabled : \'true\'} , attr : { title : bundle.pcs.attachments.upload}"> </button>\n\t</div>\n</div>\n\n<div style="display:none" class="pcs-attachments-dcsModalDialog"\n\t   data-bind="attr: {title: bundle.pcs.attachments.documents_dialog_title}, ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\', close :dcsDialogClose, rootAttributes: { style: \'width: 800px; min-width: 300px; max-width 800px;\'}}">\n\t<div class="oj-dialog-body" style="height:600px">\n\t\t<iframe id="pcs-attachment-iframe" target="_top" data-bind="attr: {src: $data.dscSelectedAppLink}" frameborder="0" seamless="seamless" scrolling="auto"\n\t\t\t\tstyle="overflow-x:hidden; width:100%;" height=550px" >\n\t\t\t<p>Your browser does not support iframes.</p>\n\t\t</iframe>\n\n\t</div>\n\n</div>\n';});

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
 * Created by lwagner on 4/9/2016.
 */


define('pcs/attachments/services/attachmentsDataService',['jquery', 'pcs/util/pcsUtil'],
    function($, pcsUtil) {
        'use strict';

        function AttachmentsDataService() {
            var self = this;

            self.paths = {
                'taskAttachmentList': 'tasks/{taskId}/attachments',
                'ProcessesAttachmentList': 'processes/{processId}/attachments',
                'taskDcsFolderList': 'tasks/{taskId}/folders',
                'taskDcsFolderInfo': 'tasks/{taskId}/folders/{folderId}',
				'processDcsFolderList': 'processes/{id}/folders',
				'processDcsFolderInfo': 'processes/{id}/folders/{folderId}',
                'dpDcsFolderList': 'dp-instances/{id}/folders',
                'dpDcsFolderInfo': 'dp-instances/{id}/folders/{folderId}'
            };

            // get to array buffer for binary data. Must be used for attachments
            var doGetToArrayBuffer = function(url, attachment, callback) {
                var oReq = new XMLHttpRequest();
                //oReq.onload = callback;
                oReq.onreadystatechange = function() {
                    if (oReq.readyState === 4 && oReq.status === 200) {
                        callback(attachment, oReq.response);
                    }
                };

                oReq.open('GET', url, true);
                oReq.withCredentials = true;
                oReq.responseType = 'arraybuffer';
                oReq.setRequestHeader('Authorization', pcsUtil.getAuthInfo());
                if (pcsUtil.isTestMode()) {
                    oReq.setRequestHeader('pcs_mode', 'dev');
                }

                oReq.send();

                return oReq;
            };

			//callback to set authorization request header for every call
			var beforeRequestCallback = function(xhr) {
				pcsUtil.beforeRequestCallback(xhr,pcsUtil);
			};

            // wrapper function for HTTP GET
            var doGet = function(url) {

                return $.ajax({
                    type: 'GET',
                    cache: false,

                    url: url,
                    beforeSend: beforeRequestCallback,
                    xhrFields: {
                        withCredentials: true
                    },
                    contentType: 'application/json',
                    dataType: 'json'
                });
            };

            // wrapper function for HTTP POST
            var doPost = function(url, payload, contentType) {

                var bytes = new Uint8Array(payload.length);
                for (var i = 0; i < payload.length; i++) {
                    bytes[i] = payload.charCodeAt(i);
                }

                return $.ajax({
                    type: 'POST',
                    url: url,
                    cache: false,
                    processData: false,
                    data: bytes,
                    contentType: contentType,
                    beforeSend: beforeRequestCallback,
                    xhrFields: {
                        withCredentials: true
                    }
                });
            };

            // wrapper function for HTTP GET
            var doDelete = function(url, dataType) {

                return $.ajax({
                    type: 'DELETE',
                    url: encodeURI(url),
                    beforeSend: beforeRequestCallback,
                    xhrFields: {
                        withCredentials: true
                    },
                    contentType: 'application/json',
                    dataType: dataType

                });
            };

            self.getAttachmentList = function(mode, id) {
                var serverPath;
                if (mode === 'task') {
                    serverPath = pcsUtil.getRestURL() + self.paths.taskAttachmentList.replace('{taskId}', id);
                } else if (mode === 'process') {
                    serverPath = pcsUtil.getRestURL() + self.paths.ProcessesAttachmentList.replace('{processId}', id);
                }
                return doGet(serverPath);
            };

            self.uploadAttachment = function(mode, id, payload, contentType) {
                var serverPath;
                if (mode === 'task') {
                    serverPath = pcsUtil.getRestURL() + self.paths.taskAttachmentList.replace('{taskId}', id);
                } else if (mode === 'process') {
                    serverPath = pcsUtil.getRestURL() + self.paths.ProcessesAttachmentList.replace('{processId}', id);
                }
                return doPost(serverPath, payload, contentType);
            };

            self.deleteAttachment = function(mode, id, attachmentName) {
                var serverPath;
                if (mode === 'task') {
                    serverPath = pcsUtil.getRestURL() + self.paths.taskAttachmentList.replace('{taskId}', id) + '/' + attachmentName;
                } else if (mode === 'process') {
                    serverPath = pcsUtil.getRestURL() + self.paths.ProcessesAttachmentList.replace('{processId}', id) + '/' + attachmentName;
                }
                return doDelete(serverPath,'text');
            };

            self.getAttachmentStream = function(uri, attachment, callback) {
                return doGetToArrayBuffer(uri, attachment, callback);
            };

            self.getDcsFolders = function(mode, id) {
                var serverPath;
                if (mode === 'task') {
                    serverPath = pcsUtil.getRestURL() + self.paths.taskDcsFolderList.replace('{taskId}', id);
                } else if (mode === 'dp') {
                    serverPath = pcsUtil.getDpRestURL() + self.paths.dpDcsFolderList.replace('{id}', id);
                } else if (mode === 'process') {
					serverPath = pcsUtil.getDpRestURL() + self.paths.processDcsFolderList.replace('{id}', id);
				}
                return doGet(serverPath);
            };

            self.getDcsFolderInfo = function(mode, id, folderId) {
                var serverPath;
                if (mode === 'task') {
                    serverPath = pcsUtil.getRestURL() + self.paths.taskDcsFolderInfo.replace('{taskId}', id).replace('{folderId}', folderId);
                } else if (mode === 'dp') {
                    serverPath = pcsUtil.getDpRestURL() + self.paths.dpDcsFolderInfo.replace('{id}', id).replace('{folderId}', folderId);
                }
				else if (mode === 'process') {
					serverPath = pcsUtil.getDpRestURL() + self.paths.processDcsFolderInfo.replace('{id}', id).replace('{folderId}', folderId);
				}
                return doGet(serverPath);
            };
        }

        return new AttachmentsDataService();
    }
);

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

/**
 * Created by lwagner on 3/14/2016.
 */

define('pcs/attachments/viewModel/attachmentsContainer',['ojs/ojcore', 'knockout', 'pcs/util/pcsUtil', 'pcs/attachments/services/attachmentsDataService', 'pcs/util/dateUtil',
        'ojs/ojknockout', 'ojs/ojdialog', 'ojs/ojbutton', '!text!pcs/attachments/view/attachmentsContainer.html', 'ojL10n!pcs/resources/nls/pcsSnippetsResource'
    ],
    function(oj, ko, pcsUtil, services,dateUtil) {

        'use strict';

        /**
         * The view model for the main content view template
         */
        function AttachmentsContainer(params) {
            var self = this;
            this.data = params.data;
			var loggerUtil =  require('pcs/util/loggerUtil');

            //Set the resourcebundle
            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

            self.attachmentList = ko.observableArray([]);
            self.dcsFolderList = ko.observableArray([]);
			self.isDcsFolderVisible = ko.observable(true); //toggle between document list and docs UI
            self.showDcsFolders = ko.observable(false);
            self.showAttachments = ko.observable(true);
            self.dscSelectedFolderName = ko.observable('');
            self.dscSelectedAppLink = ko.observable('');
            self.displayDcs = ko.observable(false);
            self.isSizeLimitExceeding = ko.observable(false);

            if (self.data.showDocsInline && (self.data.showDocsInline === true || self.data.showDocsInline === "true")){
				self.data.showDocsInline = true;
			}else{
				self.data.showDocsInline = false;
			}


            function createFolderList(folders) {

                if (folders) {
                    // if dcs folder count > 0 then
                    //    display folder list
                    //    launch URL of selected folder
                    //self.showDcsFolders(true);
                    self.displayDcs(true);
                    //self.showAttachments(false);
					//Display Folders if there are more than one folder or if showDocsInline is falsy
					for (var i = 0; i < folders.length; i++) {
						var folder = {
							folderId: folders[i].folderId,
							folderName: folders[i].folderName
						};
						if (folders[i].type && folders[i].type === 'd') {
							folder.isFolder = false;
						} else {
							folder.isFolder = true;
						}
						self.dcsFolderList.unshift(folder);
					}

					if (folders.length === 1 && self.data.showDocsInline) {
						//Display the attachments inline, dont show folders
						var folder = self.dcsFolderList()[0];
						if (folder.isFolder){
							self.openFolder(folder);
						}
					}

                }

                $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');
                self.rootElement.trigger('attachments:loaded');
            }

            function exceptionHandler(jqXHR, customMsg) {
                var msg = customMsg;

                if (jqXHR && jqXHR.status === 0) {
                    msg = self.bundle.pcs.common.server_not_reachable;
                }

                if (jqXHR && jqXHR.status === 500) {
                    msg = self.bundle.pcs.common.internal_server_err;
                } else if (jqXHR && jqXHR.status === 401) {
                    // reset valid authInfo as the current auth is invalid
                    msg = self.bundle.pcs.common.access_error_msg;
                }

                $('#pcs-attachments-error-msg', self.rootElement).text(msg);
                $('#pcs-attachments-error-msg-container', self.rootElement).show().delay(5000); //.fadeOut(2000);

                $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');

            }


            function createAttachmentsList(attachments) {
                if (attachments) {
                    for (var i = 0; i < attachments.length; i++) {

                        var tmpStr = '';
                        var updatedDate = dateUtil.getDateInUserTimezone(attachments[i].updatedDate);
						var updatedDateFormatted = dateUtil.getFormattedDate(updatedDate);
                        if (attachments[i].updatedDate && attachments[i].updatedBy) {
                            tmpStr = self.bundle.pcs.attachments.dateByUserText;
                            tmpStr = oj.Translations.applyParameters(tmpStr, {
                                '0': updatedDateFormatted,
                                '1': attachments[i].updatedBy
                            });
                        }

                        var attachment = {
                            filename: decodeURI(attachments[i].title || attachments[i].attachmentName || attachments),
                            fileInfoText: tmpStr,
                            serverUri: attachments[i].uri.href,
                            href: ko.observable('#'),
                            contentType: attachments[i].mimeType
                        };

                        self.attachmentList.unshift(attachment);

                    }
                }

                $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');
                self.rootElement.trigger('attachments:loaded');
            }

            function loadNativeAttachments(mode, id){
				self.displayDcs(false);
				// if dcs folder count == 0 then
				services.getAttachmentList(mode, id).done(
					function(data) {
						createAttachmentsList(data.items);
					}
				).fail(
					function(jqXHR, textStatus, errorThrown) {
						var msg = self.bundle.pcs.attachments.fetch_attachments_error;
						exceptionHandler(jqXHR, msg);
						self.rootElement.trigger('attachments:loaded');
					}
				);
			}

			function loadFolders(mode, id){
				//Add the event listerner
				addDCSEventListener();

				services.getDcsFolders(mode, id).done(
					function(data) {
						createFolderList(data.items);
					}
				).fail(
					function(jqXHR, textStatus, errorThrown) {
						var msg = self.bundle.pcs.attachments.fetch_attachments_error;
						exceptionHandler(jqXHR, msg);
						self.rootElement.trigger('attachments:loaded');
					}
				);
			}

            function loadAttachments(mode, id) {
                if (mode === 'task') {
                    $('#pcs-attachments-overlay').addClass('pcs-common-load-overlay');

                    // get dcs folders
                    if (self.data.isDocsEnabled) {
						loadFolders(mode, id);
                    } else {
						loadNativeAttachments(mode, id);
                    }
                } else if (mode === 'process') {
                    $('#pcs-attachments-overlay').addClass('pcs-common-load-overlay');

					// get dcs folders
					if (self.data.isDocsEnabled) {
						loadFolders(mode, id);
					} else {
						loadNativeAttachments(mode, id);
					}

                } else if (mode === 'dp') {
                    $('#pcs-attachments-overlay').addClass('pcs-common-load-overlay');

                    // get dcs folders
                    if (self.data.isDocsEnabled) {
						//Add the event listerner
						addDCSEventListener();

                        services.getDcsFolders(mode, id).done(
                            function(data) {
                                if (data.isDocsEnabledFlag) {
                                    createFolderList(data.folders);
                                } else {
                                    $('#pcs-attachments-docs-error', self.rootElement).text('Documents are not enabled for this instance.');
                                    $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');
                                }
                            }
                        ).fail(
                            function(jqXHR, textStatus, errorThrown) {
                                // var msg = self.bundle.pcs.attachments.fetch_attachments_error;
                                // exceptionHandler(jqXHR,msg);
                                // self.rootElement.trigger('attachments:loaded');
                                $('#pcs-attachments-docs-error', self.rootElement).text('You do not have access to the documents');
                                $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');

                            }
                        );
                    } else {
                        $('#pcs-attachments-docs-error', self.rootElement).text('You do not have access to the documents');
                        $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');
                    }
                }

            }

            if (this.data.isDocsEnabled) {
                self.showDcsFolders(true);
                self.showAttachments(false);
            } else {
                self.showDcsFolders(false);
                self.showAttachments(true);
            }
            if (this.data.startFolderName !== '' && this.data.mode !== 'task' && this.data.mode !== 'process') {
                //self.showDcsFolders(true);
                //self.showAttachments(false);
                self.displayDcs(false);
                var folder = {
                    folderId: '',
                    folderName: this.data.startFolderName,
                    isFolder: true
                };
                self.dcsFolderList.unshift(folder);
            }

            this.data.container = self;

            this.rootElement = self.data.rootElement;

            if (self.data.hideDelete) {
                $('.pcs-attachments-removeFile', self.rootElement).hide();
            }

            if (self.data.hideUploadLink) {
                $('.pcs-attachments-uploadLink', self.rootElement).hide();
            }

            if (self.data.hideTitle) {
                $('.pcs-attachments-title', self.rootElement).hide();
            }

            if (self.data.mode === 'task' || self.data.mode === 'process' || self.data.mode === 'dp') {
                loadAttachments(self.data.mode, self.data.id);
            } else {
                self.rootElement.trigger('attachments:loaded');
            }
            self.openUploadDialog = function() {
                $('.pcs-attachments-dialog-error-msg').css('display', 'none');
                $('#pcs-attachments-fileControl', this.element).val('');
                $('.pcs-attachments-modalDialog').ojDialog('open');
                $('.pcs-attachments-upload-btn').ojButton('option', 'disabled', true);
            };

            function createDocsUI(mafLink) {
                $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');
                if(self.data.showDocsInline){
					self.isDcsFolderVisible(false);
				} else {
					$('.pcs-attachments-dcsModalDialog').ojDialog('open');
				}


                self.msg = {
                    message: 'setAppLinkTokens',
                    appLinkRefreshToken: JSON.parse(mafLink).refreshToken,
                    appLinkAccessToken: JSON.parse(mafLink).accessToken,
                    appLinkRoleName: JSON.parse(mafLink).role,
                    embedPreview: true
                };

                //This doesnt work if DCS takes more than 10 sec to initialize
                //$('#pcs-attachment-iframe').off('load').on('load', function() {
                //    setTimeout(function() {
                //        document.getElementById('pcs-attachment-iframe').contentWindow.postMessage(msg, '*');
                //    }, 100);
                //});


                var appLink = JSON.parse(mafLink).appLinkUrl + '/cfg=hbr,evw,hdc,ndw';
                self.dscSelectedAppLink(appLink);
            }

            self.openFolder = function(data) {
                self.dscSelectedFolderName(data.folderName);
                if ((self.data.mode === 'task' || self.data.mode === 'dp'|| self.data.mode === 'process') && data.folderId !== '') {
                    $('#pcs-attachments-overlay').addClass('pcs-common-load-overlay');
                    services.getDcsFolderInfo(self.data.mode, self.data.id, data.folderId).done(
                        function(data) {
                            createDocsUI(data.appLink);
                        }
                    ).fail(
                        function(jqXHR, textStatus, errorThrown) {

                            var msg = self.bundle.pcs.attachments.fetch_attachments_error;
                            exceptionHandler(jqXHR, msg);
                        }
                    );
                } else {
                    self.showAttachments(true);
                }
            };

            self.dcsDialogClose = function() {
                loggerUtil.log('closing');
            };

			function OnDCSMessageEvent(evt) {
                if (evt.data.message === 'appLinkReady') {
                    loggerUtil.log('recieved');
                    var iframe = self.data.showDocsInline ? $('#pcs-attachment-iframe-inline')[0] : $('#pcs-attachment-iframe')[0];
                    var iframewindow = iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;
                    iframewindow.postMessage(self.msg, '*');
                }
            }

            function cleanDCSEventListener() {
                // Remove the PostMessage handler
                loggerUtil.log('removing');
                pcsUtil.eventHandler.removeHandler(window, 'message', OnDCSMessageEvent);
            }

            function addDCSEventListener() {
                // Add the PostMessage handler
                loggerUtil.log('adding');
                pcsUtil.eventHandler.addHandler(window, 'message', OnDCSMessageEvent);
            }

            self.closeFolder = function() {
                self.showAttachments(false);
            };

			self.showFolders = function() {
				self.isDcsFolderVisible(true);
			};

            self.iconClass = function(filename, contentType) {
                if (filename) {
                    if (contentType === 'application/pdf') {
                        return 'pcs-attachments-filepdf-icon';
                    }
                    if (contentType === 'application/zip') {
                        return 'pcs-attachments-filezip-icon';
                    }
                    if (contentType && contentType.startsWith('image')) {
                        return 'pcs-attachments-fileimage-icon';
                    }
                    if (contentType === 'text/plain') {
                        return 'pcs-attachments-filetxt-icon';
                    }
                    if (filename.endsWith('xls') || filename.endsWith('xlsx')) {
                        return 'pcs-attachments-filexls-icon';
                    }
                    if (filename.endsWith('doc') || filename.endsWith('docx')) {
                        return 'pcs-attachments-filedoc-icon';
                    }
                    if (filename.endsWith('ppt') || filename.endsWith('pptx')) {
                        return 'pcs-attachments-fileppt-icon';
                    } else {
                        return 'pcs-attachments-fileother-icon';
                    }
                }
            };

            self.removeFileFromList = function(data, event) {
                var parent = $(event.currentTarget).parent();
                parent.siblings().find('.pcs-attachments-delete-dialog').ojDialog('open');
            };

            // Method called when yes button clicked on the delete dialog
            self.yesDeleteDialog = function(data) {

                if (self.data.mode === 'task' || self.data.mode === 'process') {
                    var attachmentName = data.filename;
                    var attachmentItem = data;
                    $('#pcs-attachments-overlay').addClass('pcs-common-load-overlay');
                    services.deleteAttachment(self.data.mode, self.data.id, attachmentName).done(
                        function(data) {
                            self.attachmentList.remove(attachmentItem);
                            self.rootElement.trigger('attachments:attachmentRemoved', [attachmentItem]);
                            $('.pcs-attachments-delete-dialog').ojDialog('close');

                            var msg = self.bundle.pcs.attachments.upload_attachment_delete;
                            msg = oj.Translations.applyParameters(msg, {
                                '0': attachmentName
                            });

                            $('#pcs-attachments-success-msg', self.rootElement).text(msg);
                            $('#pcs-attachments-success-msg-container', self.rootElement).show().delay(5000).fadeOut(2000);

                            $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');
                        }
                    ).fail(
                        function(jqXHR, textStatus, errorThrown) {

                            var msg = self.bundle.pcs.attachments.delete_attachment_error;
                            exceptionHandler(jqXHR, msg);
                        }
                    );
                } else {
                    self.attachmentList.remove(data);
                    self.rootElement.trigger('attachments:attachmentRemoved', [data]);
                    $('.pcs-attachments-delete-dialog').ojDialog('close');
                }
            };

            // Method called when no button clicked on the delete dialog
            self.noDeleteDialog = function() {
                $('.pcs-attachments-delete-dialog').ojDialog('close');
            };

            var fileInfo = {};


            //Attach onload function to the iframe to redraw it after the contents are loaded
            var iframeElem = $('#pcs-attachment-iframe-inline');
			iframeElem.on('load', function() {
				redraw(iframeElem);
			});

			//Accessing the layout property of child elements will cause browser repaint of the element
			function redraw(elem){
				elem.height(elem.height());
				var outerHeight = elem[0].offsetHeight;
			}

            self.uploadAttachment = function() {
                if (fileInfo.name !== '') {
                    for (var i = 0; i < self.attachmentList().length; i++) {
                        if (self.attachmentList()[i].filename === fileInfo.name) {
                            $('.pcs-attachments-dialog-error-msg').css('display', 'block');
                            return;
                        }
                    }

                    var tmpStr = self.bundle.pcs.attachments.dateByUserTextTmp;

                    var attachment = {
                        filename: fileInfo.name,
                        fileInfoText: tmpStr,
                        href: fileInfo.src,
                        contentType: fileInfo.contentType,
                        content: fileInfo.content
                    };

                    if (self.data.mode === 'task' || self.data.mode === 'process') {

                        $('#pcs-attachments-overlay').addClass('pcs-common-load-overlay');
                        var boundary = 'Boundary_' + '123456789_123456789';
                        var header = '--' + boundary + '\r\n';

                        var footer = '\r\n--' + boundary + '--\r\n';

                        var contents = header;
                        contents += 'Content-Disposition: inline' + '\r\n';
                        contents += 'Content-Type: application/json' + '\r\n\r\n';

                        var payload = {
                            'attachmentName': attachment.filename,
                            'mimeType': attachment.contentType,
                            'attachmentScope': 'BPM'
                        };
                        contents += JSON.stringify(payload) + '\r\n';
                        contents += header;

                        contents += 'Content-Transfer-Encoding: binary\r\n\r\n';
                        contents += attachment.content;
                        contents += footer;
                        var contentType = 'multipart/mixed; boundary=' + boundary;

                        services.uploadAttachment(self.data.mode, self.data.id, contents, contentType).done(
                            function(data) {
                                self.attachmentList.unshift(attachment);
                                self.rootElement.trigger('attachments:attachmentUploaded', [attachment]);

                                var msg = self.bundle.pcs.attachments.upload_attachment_success;
                                msg = oj.Translations.applyParameters(msg, {
                                    '0': attachment.filename
                                });

                                $('#pcs-attachments-success-msg', self.rootElement).text(msg);
                                $('#pcs-attachments-success-msg-container', self.rootElement).show().delay(5000).fadeOut(2000);

                                $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');
                            }
                        ).fail(
                            function(jqXHR, textStatus, errorThrown) {

                                var msg = self.bundle.pcs.attachments.upload_attachment_error;
                                exceptionHandler(jqXHR, msg);
                            }
                        );
                    } else {
                        self.attachmentList.unshift(attachment);
                        self.rootElement.trigger('attachments:attachmentUploaded', [attachment]);
                    }
                }
                $('.pcs-attachments-modalDialog').ojDialog('close');
            };

            if (self.data.attachments) {
                for (var i = 0; i < self.data.attachments.length; i++) {

                    var textFile = null;
                    var makeTextFile = function(text, contentType) {

                        var bytes = new Uint8Array(text.length);
                        for (var i = 0; i < text.length; i++) {
                            bytes[i] = text.charCodeAt(i);
                        }

                        var data = new Blob([bytes], {
                            type: contentType
                        });

                        // If we are replacing a previously generated file we need to
                        // manually revoke the object URL to avoid memory leaks.
                        if (textFile !== null) {
                            window.URL.revokeObjectURL(textFile);
                        }

                        textFile = window.URL.createObjectURL(data);

                        // returns a URL you can use as a href
                        return textFile;
                    };

                    var attachment = self.data.attachments[i];

                    if (attachment.href === '') {
                        attachment.href = makeTextFile(attachment.content, attachment.contentType);
                    }
                    self.attachmentList.unshift(attachment);
                }

            }

            function abToStr(buffer) {
                var view = new Uint8Array(buffer);

                var CHUNK_SZ = 0x8000;
                var c = [];
                for (var i = 0; i < view.length; i += CHUNK_SZ) {
                    c.push(String.fromCharCode.apply(null, view.subarray(i, i + CHUNK_SZ)));
                }
                return c.join('');

            }

            $('#pcs-attachments-fileControl').change(function(evt) {
            	var uploadBtn = $('.pcs-attachments-upload-btn');
				uploadBtn.ojButton('option', 'disabled', true);
				self.isSizeLimitExceeding(false);
                var file = evt.target.files[0];
                //Set file size limit based on is documents folder enabled check
                var fileSizeLimit = self.showDcsFolders() ? 15000000 : 5000000;

                if (file && file.size <= fileSizeLimit) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        fileInfo.name = file.name;
                        //fileInfo.content = e.target.result;
                        fileInfo.content = abToStr(e.target.result);
                        if (file.type === '') {
                            // if empty then treat as binary
                            fileInfo.contentType = 'application/octet-stream';
                        } else {
                            fileInfo.contentType = file.type;
                        }
                        fileInfo.size = file.size;
                        fileInfo.src = window.URL.createObjectURL(file);
                    };
                    reader.readAsArrayBuffer(file);
					uploadBtn.ojButton('option', 'disabled', false);
                } else {
					self.isSizeLimitExceeding(true);
                    loggerUtil.log('Failed to load file');
                }
            });

            self.handleDialogClose = function (){
				self.isSizeLimitExceeding(false);
			};

			/**
			 * method to clean up everything
			 */
			self.dispose = function() {
				loggerUtil.log('dispose in attachment Containor');

				cleanDCSEventListener();
				// clean up the events
				$(self.rootElement).off();
				$('#pcs-attachment-iframe-inline').off();
			};

            self.viewAttachment = function(attachment, event) {
                var bytes, data, i;
                if (ko.isObservable(attachment.href)) {
                    var currentTarget = $(event.currentTarget);
                    var fetchAttachment = function(attachment, response) {
                        var data = new Blob([response], {
                            type: attachment.contentType
                        });
                        var textFile = window.URL.createObjectURL(data);

                        attachment.href(textFile);
                        attachment.content = abToStr(response);

                        $('#pcs-attachments-overlay').removeClass('pcs-common-load-overlay');
                        if (window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(data, attachment.filename);
                        } else {
                            currentTarget[0].click();
                        }
                    };

                    if (attachment.href() === '#') {
                        $('#pcs-attachments-overlay').addClass('pcs-common-load-overlay');
                        services.getAttachmentStream(attachment.serverUri, attachment, fetchAttachment, currentTarget);
                        return false;
                    } else {
                        if (window.navigator.msSaveOrOpenBlob) {
                            bytes = new Uint8Array(attachment.content.length);
                            for (i = 0; i < attachment.content.length; i++) {
                                bytes[i] = attachment.content.charCodeAt(i);
                            }
                            data = new Blob([bytes], {
                                type: attachment.contentType
                            });
                            window.navigator.msSaveOrOpenBlob(data, attachment.filename);
                            return false;
                        } else {
                            return true;
                        }

                        return true;
                    }
                } else {
                    if (window.navigator.msSaveOrOpenBlob) {
                        bytes = new Uint8Array(attachment.content.length);
                        for (i = 0; i < attachment.content.length; i++) {
                            bytes[i] = attachment.content.charCodeAt(i);
                        }
                        data = new Blob([bytes], {
                            type: attachment.contentType
                        });
                        window.navigator.msSaveOrOpenBlob(data, attachment.filename);
                        return false;
                    } else {
                        return true;
                    }
                }
            };
        }
        return AttachmentsContainer;
    });

/**
 * Created by lwagner on 3/11/2016.
 */

define('pcs/pcs.attachments',['ojs/ojcore', 'knockout', 'jquery', '!text!pcs/attachments/templates/pcs-attachments.html', 'ojL10n!pcs/resources/nls/pcsSnippetsResource',
		'!text!pcs/attachments/templates/pcs-attachments-error.html', '!text!pcs/attachments/view/attachmentsContainer.html',
        'pcs/attachments/viewModel/attachmentsContainer', 'pcs/util/loggerUtil','jqueryui-amd/widget'
    ],
    function(oj, ko, $, tmpl, bundle, errortmpl, attachmentsView,attachmentsVM,loggerUtil) {
        'use strict';
        // define your widget under pcs namespace
        $.widget('pcs.attachments', {

            //Options to be used as defaults
            options: {
                hideDelete: false,
                hideUploadLink: false,
                hideTitle: false,
                attachments: [],
                startFolderName: '',
                mode: 'start',
                id: -1,
                readOnly: false,
                isDocsEnabled: false,
				showDocsInline: false
            },

			// Check if the Required options are provided to the widget
			_isValid: function() {
            	if (this.options.mode === 'start'){
					return true;
				}
				else {
            		if(this.options.id === undefined || this.options.id === ''){
						return false;
					}
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

                if ($.pcsConnection === undefined) {
                    this.element.html('<div style=\'color:red\'>' + bundle.pcs.common.pcs_connection + ' </div>');
                    return;
                }

				// check if the the plugin is initialized correctly
				if (!this._isValid()) {
					this.element.html(errortmpl);
					return;
				}


				var data = {
                    rootElement: widget.element,
                    hideDelete: widget.options.hideDelete,
                    hideUploadLink: widget.options.hideUploadLink,
                    hideTitle: widget.options.hideTitle,
                    attachments: widget.options.attachments,
                    startFolderName: widget.options.startFolderName,
                    mode: widget.options.mode,
                    id: widget.options.id,
                    isDocsEnabled: widget.options.isDocsEnabled,
					showDocsInline: widget.options.showDocsInline
                };

                function Model() {
                    var self = this;

                    if (!ko.components.isRegistered('attachmentComponent')) {
                        ko.components.register('attachmentComponent', {
                            template: attachmentsView,
                            viewModel: attachmentsVM
                        });
                    }
                    self.data = data;

                    if (widget.options.readOnly) {
                        self.data.hideUploadLink = true;
                        self.data.hideDelete = true;
                    }
                }

                var vm = new Model();

                widget.model = vm;

                this.element.html(tmpl);

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
				loggerUtil.log('Destroying attachments');
				// clean everything up
				if (this.model && this.model.data && this.model.data.container) {
					this.model.data.container.dispose();
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
            },

            getAttachments: function() {
                var data = this.model.data.container.attachmentList();
                return data;
            }
        });
    });


//# sourceMappingURL=pcs.attachments.js.map