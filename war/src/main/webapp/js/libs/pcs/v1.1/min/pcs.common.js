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
 * Created by nisabhar on 2/6/18.
 */

define ('pcs/util/PropertyChangeHelper',['jquery'] , function ($) {
	'use strict';

	var _observe = function(composite, property, observable){
		var prop = property + '-changed';
		$(composite).on(prop, function(event)  {
			if(event.detail.updatedFrom === 'external'){
				observable(event.detail.value);
			}
		});
	};

	return {

		observe : _observe
	}
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
 * Created by nisabhar on 2/12/18.
 */

define('pcs/pcs.common',[
		'pcs/util/pcsUtil',
		'pcs/util/dateUtil',
		'pcs/util/loggerUtil',
		'pcs/util/PropertyChangeHelper',
		'pcs/data-services/DataServices'
	],

	function(oj) {
		'use strict';
		//loggerUtil.log('loaded utils');
	}
);


//# sourceMappingURL=pcs.common.js.map