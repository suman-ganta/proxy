/**
 * Created by nisabhar on 5/11/17.
 */

requirejs.config(
	{
		paths: {
			'ckeditor': 'libs/ckeditor/ckeditor'
		},
		map: {
			'*': {
				'rendererMsg': 'pcs/composer/pcsform/rendererMsg'
			}
		},
		shim: {
			'pcs/composer/pcsform/forms.renderer-lib': {
				deps: ['pcs/config/debug-config']
			}
		}

	}
);

/**
 * it takes a form url and replace the last 2 parts, the formId and presentationId
 */
function replaceFormAndPresentation(metaDataUrl, formId, presentationId){
	return metaDataUrl.replace(/(~([^~]*)){2}$/, '~'+formId+'~'+presentationId);
}


define(['ojs/ojcore', 'knockout','pcs/util/pcsUtil', 'pcs/pcsform/PCSFormService', 'pcs/composer/pcsform/forms.renderer-lib', 'ckeditor' ],
	function(oj, ko,pcsUtil,PCSFormService) {
		'use strict';
		/**
		 * The view model for the main content view template
		 */
		function PCSformUtil() {
			var self = this;

			var service = PCSFormService.getInstance();

			self.getConnector  = function(formDefId , outcomeCallback) {
				var connector = {};
				connector['connectorHandler'] = {
					'execute': function(callpayload) {
						return new Promise(function(sucess, reject) {
							var formValues = callpayload['formValues'];
							var payloadJson = {};
							if (formValues) {
								payloadJson['formValues']  = formValues ;
							}
							var payload = JSON.stringify(payloadJson);

							var formDefToCall = formDefId;
							//If presentationId is defined, we need to regenerate the formDefId to be called (as the call comes from a form reference)
							if (callpayload.presentationId) {
								formDefToCall = replaceFormAndPresentation(formDefToCall, callpayload.formId, callpayload.presentationId);
							}

							service.executePCSFormRest({
									'{formDefId}': formDefToCall,
									'{restExecutionId}': callpayload.id
								},
								payload).done(function(responseJson) {
								var responseContainer = {
									response: {}
								};
								if (responseJson instanceof Array) {
									//we need to add the binding wrapper to support current PCS design limitation on response arrays
									responseContainer.response[callpayload.listBinding||'topLevelArray'] = responseJson;
								} else {
									responseContainer.response = responseJson;
								}
								sucess(responseContainer);
							}).fail(function(jqXHR) {
								reject(jqXHR.responseText);
							});
						});
					},
					setContext: function(context) {
						this.context = context;
					}
				};
				connector['restHandler'] = {
					execute: function(rest, params) {
						return new Promise(function(sucess, reject) {
							service.executeRest(rest.name, params).done(function(responseJson) {
								sucess(responseJson[rest.optionsListBinding]);
							}).fail(function(jqXHR) {
								reject(jqXHR.responseText);
							});
						});
					},
					setContext: function(context) {
						this.context = context;
					}
				};

				if (outcomeCallback){
					connector['outcomeHandler'] = {
						triggerOutcome: function(outcome) {
							outcomeCallback('submit',outcome , 'FORMS');
						}
					};
				}
				return connector;
			};


			// Check if the webform data is valid
			self.isValidWebForm = function (formRender) {
				var isValid = true;
				if (formRender.length === 1) {
					isValid = formRender.triggerHandler('validateData');
				}
				return isValid;
			};

			self.loadPCSForm =function (properties) {
				var promise = $.Deferred();

				var formMetadataUrl = properties.formMetadataUrl;
				var payload = properties.payload;
				var webFormContainer = properties.webFormContainer;
				var prefix = properties.formRendererId;

				//Sinclair temp workaround to replace the form metadata url since it returns actual 
				//PCS server host name in URL
				console.log('Old:-' +formMetadataUrl);
				var splitOn = "/bpm/api/4.0/webforms/";
				var splitArray = formMetadataUrl.split(splitOn);
				formMetadataUrl = pcsUtil.getServerURL() + splitOn + splitArray[1];
				console.log('New:-' +formMetadataUrl);

				if (formMetadataUrl && webFormContainer && prefix) {
					service.getFormMetaData(formMetadataUrl)
						.then(
							function(formmetadata) {
								webFormContainer['0'].innerHTML = '<div class=\'oj-row\' style=\'margin-top:20px\'><form-renderer id=\'' + prefix +'\' params=\'value: data\'></form-renderer></div>';

								var viewModel = {};
								var formAndPayloadModel = {};
								var form = {};
								for (var key in formmetadata) {
									if (formmetadata.hasOwnProperty(key)) {
										form[key] = formmetadata[key];
									}
								}
								var lastIndexOfSlash = formMetadataUrl.lastIndexOf('/');
								var formDefId = formMetadataUrl.substr(lastIndexOfSlash + 1);
								formAndPayloadModel['form'] = form.form;

								if(payload === undefined){
									payload = {};
								}

								form['payload'] = payload;
								formAndPayloadModel['form']['payload'] = form.payload;


								formAndPayloadModel['config'] = self.getConnector(formDefId , properties.outcomeCallback);
								formAndPayloadModel.config.screenflowHandler = {
									getPresentationData: function(formId, presentationId){
										var newFormMetaData = replaceFormAndPresentation(formMetadataUrl, formId, presentationId);
										return service.getFormMetaData(newFormMetaData);
									}
								};
								formAndPayloadModel['config']['domIdPrefix'] = prefix + '-';

                                if(properties.readOnly){
                                    formAndPayloadModel['config']['readOnly'] = true;
                                }

                                if(properties.convertJSON){
									formAndPayloadModel['config']['convertJSON'] = true;
								}

								if (form.dependencies) {
									formAndPayloadModel.dependencies = form.dependencies;
								}

								viewModel['data'] = formAndPayloadModel;
								ko.cleanNode(webFormContainer['0']);

								//TODO: Temp Workaround work with form team to fix this
								// FormRendered doesnt get loaded sometime
								require(['forms.renderer'], function(formsRenderer) {
									formsRenderer.init();
									ko.cleanNode(webFormContainer['0']);
									ko.applyBindings(viewModel, webFormContainer['0']);

									promise.resolve();
								});
							}
							,function(jqXHR) {
								promise.reject(jqXHR);
							}
						);
				}

				return promise;
			};


			self.saveOrSubmitPCSForm = function(formRender,action ,outcome){
				var promise = $.Deferred();

				formRender.triggerHandler(action , outcome).then(function(data) {
					//Here send data.payload to the server
					try {
						var payloadToUpdate = JSON.stringify(data.payload);
						promise.resolve(payloadToUpdate);
					} catch (err) {
						promise.reject(error);
					}
				}).catch(function(error) {
					promise.reject(error);
				});

				return promise;
			}
		}

		return new PCSformUtil;
	});
