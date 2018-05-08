/**
 * Created by lwagner on 4/12/2016.
 */


define(['jquery', 'pcs/util/pcsUtil'],
    function($, pcsUtil) {
        'use strict';

        function CommentsDataService() {
            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');

            self.paths = {
                'taskCommentList': 'tasks/{taskId}/comments',
                'ProcessesCommentList': 'processes/{processId}/comments'
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

            // wrapper function for HTTP POST
            var doPost = function(url, payload, contentType) {

                loggerUtil.log(payload);

                //var bytes = new Uint8Array(payload.length);
                //for (var i=0; i<payload.length; i++)
                //  bytes[i] = payload.charCodeAt(i);

                return $.ajax({
                    type: 'POST',
                    url: url,
                    //cache : false,
                    //processData : false,
                    data: payload,
                    contentType: contentType,
                    dataType: 'json',
                    beforeSend: beforeRequestCallback,
                    xhrFields: {
                        withCredentials: true
                    }
                });
            };

            self.getCommentList = function(mode, id) {
                var serverPath;
                if (mode === 'task') {
                    serverPath = pcsUtil.getRestURL() + self.paths.taskCommentList.replace('{taskId}', id);
                } else if (mode === 'process') {
                    serverPath = pcsUtil.getRestURL() + self.paths.ProcessesCommentList.replace('{processId}', id);
                }
                return doGet(serverPath);
            };

            self.postComment = function(mode, id, payload, contentType) {
                var serverPath;
                if (mode === 'task') {
                    serverPath = pcsUtil.getRestURL() + self.paths.taskCommentList.replace('{taskId}', id);
                } else if (mode === 'process') {
                    serverPath = pcsUtil.getRestURL() + self.paths.ProcessesCommentList.replace('{processId}', id);
                }
                return doPost(serverPath, payload, contentType);
            };

        }

        return new CommentsDataService();
    }
);
