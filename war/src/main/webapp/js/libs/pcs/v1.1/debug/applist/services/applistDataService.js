/**
 * Created by nisabhar on 3/7/2016.
 */


define(['jquery', 'pcs/util/pcsUtil'],
    function($, pcsUtil) {
        'use strict';

        function ApplistDataService() {
            var self = this;

            self.paths = {
                'startFormList': 'process-definitions', //?interfaceFilter=webForm',
				'dpFormList' :'dp-definitions?allowedAction=create'
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
                    beforeSend: beforeRequestCallback,
                    xhrFields: {
                        withCredentials: true
                    },
                    contentType: 'application/json',
                    dataType: 'json'
                });
            };

            self.getStartFormList = function(params) {
                var serverPath = pcsUtil.getRestURL() + self.paths.startFormList;
                return doGet(serverPath);
            };

            self.getDynamicProcessForms = function() {
                var serverPath = pcsUtil.getDpRestURL() + self.paths.dpFormList;
                return doGet(serverPath);
            };
        }

        return new ApplistDataService();
    }
);
