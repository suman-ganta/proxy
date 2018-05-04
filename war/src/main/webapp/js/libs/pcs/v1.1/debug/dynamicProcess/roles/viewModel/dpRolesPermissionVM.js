/**
 * Created by nisabhar on 7/19/17.
 */

define(['knockout', 'jquery', 'pcs/dynamicProcess/roles/util/dpRolesUtil', 'pcs/util/pcsUtil', 'ojs/ojknockout', 'promise', 'ojL10n!pcs/resources/nls/pcsSnippetsResource',],
	function(ko, $,  dpRolesUtil ,pcsUtil ) {

		//Set the resourcebundle
		var bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

		'use strict';

		return function(permission) {
			var self = this;
			//id of the permission
			self.id = permission.hasOwnProperty('id') ? permission.id : null;

			//selected actions of the permissison
			self.selectedActions = ko.observableArray([]);

			//selected resources of the permissison
			self.selectedResources = ko.observableArray([]);

			//selected condition of the permissison
			self.selectedCondition = ko.observable(permission.hasOwnProperty('condition') ? permission.condition : 'default');

			//selected resource type
			self.selectedResourceType = ko.observableArray([dpRolesUtil.const.RESOURCE_TYPE.CASE_EXECUTION]);

			//condition info text
			self.conditionText =  ko.observable('');

			//ui id
			self.randomId = pcsUtil.getRandomInt(0,1000);


			//set the selected actions
			if(permission.hasOwnProperty('id')){
				self.selectedActions.removeAll();
				for (var i = 0; permission.actions && i < permission.actions.length; i++) {
					self.selectedActions.push(permission.actions[i]);
				}
			}

			//set the selectesResource
			if(permission.hasOwnProperty('resources')) {
				//take the resource type of first element
				self.selectedResourceType([permission.resources[0].resourceType]);
				for (var i = 0; permission.resources && i < permission.resources.length; i++) {
					// add only same type of resource
					if (self.selectedResourceType()[0] === permission.resources[i].resourceType){
						self.selectedResources.push(permission.resources[i].resourceId);
					}
				}
			}

			//set the condition text
			if(permission.hasOwnProperty('condition')) {
				var condition = permission.condition ;
				var text = bundle.pcs.dp.roles.condition_info.replace('{0}', condition);
				self.conditionText(text);
			}

			/**
			 * when resource type option is cahnged
			 * @param event
			 * @param data
			 */
			self.resourceTypeOptionChangeHandler = function(event, data) {
				if (data.option == 'value') {
					//clear the selected resoures as type has changed
					self.selectedResources.removeAll();

					//clear the actions
					self.selectedActions.removeAll();

					var idIndex = event.currentTarget.id.lastIndexOf('-');    //pcs-dp-roles-perm-res-type-1
					var id = event.currentTarget.id.substring(idIndex+1);
					// Refresh the JEt bindings
					$('#pcs-dp-roles-perm-actions-chkbox-'+id).ojCheckboxset('refresh');
				}
			};


			/**
			 * when resource   is cahnged
			 * @param event
			 * @param data
			 */
			self.resourceOptionChangeHandler = function(event, data) {
				if (data.option == 'value') {
					// if the seleted values has fields other than * , replace all with just *
					if(data.value.indexOf('*') >= 0 && data.value.length > 1){
						self.selectedResources(['*']);
					}
				}
			};

			/**
			 * when action is cahnged
			 * @param event
			 * @param data
			 */
			self.actionChangeHandler = function(event, data) {
				if (data.option == 'value') {
					//when update is added , add read by default
					if(data.value.indexOf('UPDATE') >= 0 && data.previousValue.indexOf('UPDATE') === -1 && data.value.indexOf('READ') === -1){
						self.selectedActions.push('READ');
					}
					if(data.value.indexOf('CREATE') >= 0 && data.previousValue.indexOf('CREATE') === -1 && data.value.indexOf('READ') === -1 ){
						self.selectedActions.push('READ');
					}
				}
			};


			/**
			 * method to get the payload object for the current permission
			 * @param subResId
			 * @param operationType
			 * @returns {*}
			 */
			self.getPayloadObject = function(subResId) {
				var operationType;
				if(self.id){
					operationType= 'UPDATE';

					// if action list is removed it means delete the permission (mainly for instance permission)
					if(self.selectedActions().length === 0){
						operationType= 'DELETE';
					}
				}else{
					operationType= 'INSERT';

					//if actionList is empty , make NON as default
					if(self.selectedActions().length === 0 ){
						self.selectedActions(['NONE']);
					}
				}

				var payload = {
					object: {
						condition: self.selectedCondition(),
						actions: self.selectedActions(),
						resources: self.getResourcesPayloadObject(subResId)
					},
					type: operationType
				};

				if (operationType === 'UPDATE' || operationType === 'DELETE') {
					payload.object['id'] = self.id;
				}

				return payload;

			};

			self.getResourcesPayloadObject = function(subResId) {
				var retObj = [];
				$.each(self.selectedResources(), function(index,resource) {
					retObj.push({
						resourceId: resource,
						subResourceId: subResId,
						resourceType: self.selectedResourceType()[0]
					});
				});
				return retObj;
			};
		}
	}
);
