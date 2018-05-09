/**
 * Created by nisabhar on 3/11/2016.
 */

define(['jquery', 'pcs/util/pcsUtil'],
    function($, pcsUtil) {
        'use strict';

        function StartformDataService() {

            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');

            self.paths = {
                // For getting the formURL and attachments for a form
                'startForm': 'process-definitions/',
                // For submitting and saving a process instance
                'createProcessInstance': 'processes',
                // For getting the start folder name
                'startFolderName': 'process-definitions/{0}/startFolderName',
                //Excetue PCS form
                'executePCSFormRest': 'webforms/{formDefId}/executeRest/{restExecutionId}',
                //DP form
                'createDPInstance': 'dp-instances?processDefinitionId={processDefinitionId}'
            };

            // get to array buffer for binary data. Must be used for attachments
            var doGetToArrayBuffer = function(url, callback, errorCallback) {
            	url = url + "&uncache=" + new Date().getTime();
                var oReq = new XMLHttpRequest();
                oReq.withCredentials = true;
                oReq.onload = callback;
                oReq.onerror = errorCallback;
                oReq.open('GET', url, true);
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
            var doGet = function(url, dataType) {

                return $.ajax({
                    type: 'GET',
                    url: url,
                    beforeSend:  beforeRequestCallback,
                    contentType: 'multipart/form-data',
                    dataType: dataType,
                    cache: false
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
                    beforeSend: beforeRequestCallback,
                    contentType: contentType,
                });
            };

            var doRestGet = function(url, params, contentType) {

                return $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    data: params,
                    beforeSend: beforeRequestCallback,
                    contentType: contentType,
                    cache: false
                });
            };

            // wrapper function for HTTP POST
            var doRestPost = function(url, payload, contentType) {
                //Dummy ADF call
                pcsUtil.adfProxyCall();

                loggerUtil.log(payload);

                return $.ajax({
                    type: 'POST',
                    url: url,
                    //cache : false,
                    //processData : false,
                    data: payload,
                    contentType: contentType,
                    dataType: 'json',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', pcsUtil.getAuthInfo());
                        if (pcsUtil.isTestMode()) {
                            xhr.setRequestHeader('pcs_mode', 'dev');
                        }
                    },
                });
            };

            var replacePlaceHolders = function(str, paramsObj) {
                return str.replace(/{\w+}/g,
                    function(placeHolder) {
                        return paramsObj[placeHolder];
                    }
                );
            };

            //To get the startForm object to get the list of attachemnts and frevvo form URL
            self.getStartFormObject = function(processDefId, serviceName, operation, startType, callback, errorCallback) {
                var formType;
                if (startType && startType === 'START_PCS_FORM') {
                    formType = 'webform';
                } else {
                    formType = 'form';
                }
                var serverPath = pcsUtil.getRestURL() + self.paths.startForm + processDefId + '/' + serviceName + '/' + formType + '?operation=' + operation;
                doGetToArrayBuffer(serverPath, callback, errorCallback);
            };

            self.getFormMetaDataByURL = function(formMetadataUrl) {
                return doGet(formMetadataUrl, 'json');
            };

            self.executePCSFormRest = function(params, payload) {
                var serverPath = pcsUtil.getRestURL() + self.paths.executePCSFormRest;
                serverPath = replacePlaceHolders(serverPath, params);
                return doPost(serverPath, payload, 'application/json');
            };

            self.executeRest = function(restAPI, payload) {
                var serverPath = pcsUtil.getRestURL() + restAPI;
                return doRestGet(serverPath, payload, 'application/json');
            };

            // To get the current payload of the frevvo form
            self.getFormPayload = function(processDefId, serviceName, operation, formURL) {
                var serverPath = pcsUtil.getRestURL() + self.paths.startForm + processDefId + '/' + serviceName + '/form/payload?operation=' + operation + '&formInstanceURL=' + formURL;
                return doGet(serverPath, 'text');
            };

            // to submit or save a process instance
            self.createProcessInstance = function(payload, contentType) {
                var serverPath = pcsUtil.getRestURL() + self.paths.createProcessInstance;
                return doPost(serverPath, payload, contentType);
            };

            //To get the startFolderName
            self.getStartFolderName = function(processDefId) {
                var serverPath = pcsUtil.getRestURL() + self.paths.startFolderName.replace('{0}', processDefId);
                return doGet(serverPath, 'text');
            };

            self.createDPInstance = function(params, payload) {
                var serverPath = pcsUtil.getDpRestURL() + self.paths.createDPInstance;
                serverPath = replacePlaceHolders(serverPath, params);
                return doRestPost(serverPath, payload, 'application/json');
            };
        }

        return new StartformDataService();

    }
);
