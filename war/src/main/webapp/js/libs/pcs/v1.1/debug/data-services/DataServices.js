define(function(require) {
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
