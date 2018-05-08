/**
 * Created by nisabhar on 8/26/2016.
 */

define(['jquery', 'pcs/util/pcsUtil'],
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
