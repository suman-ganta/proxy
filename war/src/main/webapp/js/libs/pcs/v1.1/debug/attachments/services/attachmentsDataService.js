/**
 * Created by lwagner on 4/9/2016.
 */


define(['jquery', 'pcs/util/pcsUtil'],
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
