/**
 * Created by nisabhar on 7/18/17.
 */


define(['ojs/ojcore', 'knockout', 'jquery', 'pcs/dynamicProcess/services/DPRolesService',
		'pcs/dynamicProcess/services/DPInstanceService','pcs/dynamicProcess/model/DpRole' ,
		'pcs/dynamicProcess/roles/util/dpRolesUtil', 'pcs/util/pcsUtil', 'ojL10n!pcs/resources/nls/pcsSnippetsResource',
		'ojs/ojmenu', 'ojs/ojknockout','promise', 'ojs/ojlistview', 'ojs/ojinputtext', 'ojs/ojarraytabledatasource', 'ojs/ojtoolbar', 'ojs/ojselectcombobox', 'ojs/ojdialog'
	],
	function(oj, ko, $, DPRolesService, InstanceService, DpRole, dpRolesUtil,  pcsUtil) {

		'use strict';

		return function(params, componentInfo) {
			var self = this,
				roleService,
				element = componentInfo.element;

			var loggerUtil =  require('pcs/util/loggerUtil');

			//store the params
			self.properties = params;

			//Set the resourcebundle
			self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

			// for searching text
			self.searchText = ko.observable('');

			// type of consumer
			self.consumerType = ko.observable(dpRolesUtil.const.CONSUMER_TYPE.admin_roles);

			// list of roles
			self.roleListDS = ko.observable(new oj.ArrayTableDataSource([]));
			//Improves performance by executing subscribed function after a specified period of time
			self.roleListDS.extend({rateLimit: {timeout: 250, method: "notifyWhenChangesStop"}});

			// list of process definitions
			self.processDefinitionList= ko.observableArray([]);

			//Instance roles atributes
			self.instanceId = ko.observable();
			self.processDefinitionId = ko.observable();
			self.readOnly = ko.observable(false); // for instance roles which are readOnly

			//current selected Role Id
			self.selectedRole = ko.observable(null);

			/**
			 * the first method call to set up the Component
			 */
			self.initContext = function() {
				roleService = DPRolesService.getInstance();

				if(self.properties.hasOwnProperty('consumerType')){
					var paramConsumerType = ko.utils.unwrapObservable(self.properties.consumerType);
					if (paramConsumerType)
						self.consumerType(paramConsumerType);
				}

				if (self.properties.hasOwnProperty('instanceid') ) {
					var paramInstanceId = ko.utils.unwrapObservable(self.properties.instanceid);
					if (paramInstanceId)
						self.instanceId(paramInstanceId);
				}

				if (self.properties.hasOwnProperty('processdefinitionid') ) {
					self.processDefinitionId(ko.utils.unwrapObservable(self.properties.processdefinitionid));
				}

				if (self.properties.hasOwnProperty('readonly') ) {
					self.readOnly(ko.utils.unwrapObservable(self.properties.readonly));
				}

				//load process def
				self.fetchProcessDefinitions();

				// fetch roles
				self.fetchDPRoles();

			};


			/**
			 * method to fetch process definitions
			 */
			self.fetchProcessDefinitions = function(){
				if(self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.admin_roles){
					var instanceService = InstanceService.getInstance();

					//clear old defintition list
					self.processDefinitionList.removeAll();
					instanceService.fetchProcessDefinitions(false,'update').then(function(data) {
						for (var i = 0; data && i < data.length; i++) {
							self.processDefinitionList.push({
								'label': data[i].displayName,
								'value': data[i].id
							});
						}
					}).fail(function(error) {
						var msg = self.bundle.pcs.dp.roles.def_list_error;
						self.showContentErrorRegion(msg);
					});
				}
			};


			/**
			 * method to fetch role list
			 */
			self.fetchDPRoles = function (){
				//Start the loading indicator
				$('#pcs-dp-roles-overlay', element).addClass('pcs-common-load-overlay');

				var params = {};
				if (self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.instance_roles) {
					params =
						{
							processInstanceId: self.instanceId(),
							processDefinitionId: self.processDefinitionId()
						};
				}

				roleService.getRoles(true, params).then(function(roleItemsList) {
					self.populateRolesData(roleItemsList);

					//stop the loading indicator
					setTimeout(function(){
						$('#pcs-dp-roles-overlay', element).removeClass('pcs-common-load-overlay');
					},500);

				}).fail(function(error) {
					var msg = self.bundle.pcs.dp.roles.list_error;
					self.showContentErrorRegion(msg);
				});
			};


			/**
			 * method to populate Role List
			 */
			self.populateRolesData = function(roleItemsList) {

				var arr = [];

				for (var i = 0; roleItemsList && i < roleItemsList.length; i++) {
					if (self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.admin_roles) {
						if (roleItemsList[i].getScopeType() ===  dpRolesUtil.const.SCOPE_TYPE.INSTANCE || roleItemsList[i].getScopeType() === dpRolesUtil.const.SCOPE_TYPE.GLOBAL) {
							continue;
						}
					}
					//TODO: add appropriate logic here else remove the empty loop
					if(self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.instance_roles && roleItemsList[i].getScopeType() ===  dpRolesUtil.const.SCOPE_TYPE.DEFINITION) {

					}

					arr.push(roleItemsList[i]);
				}

				self.roleListDS( new oj.ArrayTableDataSource(arr, {
					idAttribute: 'getRoleId'
				}));
			};


			/**
			 * method to add a new role, called when add button is clicked
			 */
			self.addNewRole = function() {
				var role = new DpRole(dpRolesUtil.createNewRole(dpRolesUtil.const.SCOPE_TYPE.DEFINITION));
				self.selectedRole(role);
			};


			/**
			 * method called when user selects edit role
			 * @param data
			 * @param event
			 */
			self.selectEditInMenu = function(data,event){
				self.selectedRole(data);
			};

			/**
			 * method called when user selects delete role
			 * @param data
			 * @param event
			 */
			self.selectDeleteInMenu = function(data,event){
				self.deleteRole(data);
			};


			/**
			 * delete the required role
			 * @param role
			 */
			self.deleteRole = function(role) {

				// var index = -1;
				// for(var i = 0; self.roleList() && i < self.roleList().length; i++) {
				// 	if(self.roleList()[i].getRoleId() === role.getRoleId()){
				// 		index = i;
				// 	}
				// }

				var successMsg = self.bundle.pcs.dp.roles.delete_role_success.replace('{0}', role.getRoleDisplayName());

				// add loading indicator
				$('#pcs-dp-roles-overlay', element).addClass('pcs-common-load-overlay');
				roleService.removeRole(role.getRoleId()).then(function() {

					self.showContentSuccessRegion(successMsg);

					//fetch roles again from backend
					self.fetchDPRoles();

					// //if we are deleting a instannce role which has overriden
					// // the overridden role should show back again
					// if (self.consumerType()=== dpRolesUtil.const.CONSUMER_TYPE.instance_roles  && role.getOverriddenRoleId()){
					// 	roleService.getRole(true, role.getOverriddenRoleId()).then(function(parentRole) {
					// 		//remove the item from the list and replace with the new role
					// 		self.roleList.splice(index, 1, parentRole);
					// 		self.showContentSuccessRegion(successMsg);
                    //
					// 	}).fail(function(error) {
					// 		//remove the old item from the list
					// 		self.roleList.splice(index, 1);
					// 		self.showContentSuccessRegion(successMsg);
					// 	});
					// }else{
					// 	//remove the old item from the list
					// 	self.roleList.splice(index, 1);
					// 	self.showContentSuccessRegion(successMsg);
					// }
				}).fail(function(error) {

					var msg = self.bundle.pcs.dp.roles.delete_role_error.replace('{0}', role.getRoleDisplayName());
					self.showContentErrorRegion(msg);
				});

			};


			//method to search as soon as user type
			function searchRolesList(searchtext) {
				var promise = $.Deferred();
				roleService.searchRolesList(searchtext).then(function(roleItemsObj) {
					self.populateRolesData(roleItemsObj);
					promise.resolve();
				});
				return promise;
			}

			//method to search as soon as user type
			self.searchTextSubscription = self.searchText.subscribe(function(newValue) {

				searchRolesList(newValue);
			});

			/**
			 * method to clear search Text
			 */
			self.onSearchClearClick = function(){
				//Updating the observable doesnt clear text for rawValue, hence use OJ to set value
				$('#pcs-dp-roles-search-input', element).ojInputText({'value': ''});
			};


			/**
			 * method for error msg containor
			 * @param msg
			 */
			self.showContentErrorRegion = function(msg) {
				self.showContentMsgRegion (msg,false);
				$('#pcs-dp-roles-overlay', element).removeClass('pcs-common-load-overlay');

			};

			/**
			 * method for success msg containor
			 * @param msg
			 */
			self.showContentSuccessRegion = function (msg){
				self.showContentMsgRegion (msg,true);
				$('#pcs-dp-roles-overlay', element).removeClass('pcs-common-load-overlay');
			};

			/**
			 * method to show message containor
			 * @param msg
			 * @param success
			 */
			self.showContentMsgRegion = function(msg,success) {
				var successIcon ='';
				var addClass ='';
				var removeClass = '';
				if (success){
					successIcon = 'pcs-dp-roles-content-success-icon';
					addClass ='pcs-dp-roles-content-success';
					removeClass = 'pcs-dp-roles-content-error';
				}
				else{
					successIcon = 'pcs-dp-roles-content-error-icon';
					addClass = 'pcs-dp-roles-content-error';
					removeClass ='pcs-dp-roles-content-success';
				}

				var html ='<span class=\''+successIcon +'\' style=\'margin:20px\'>'+ msg + '</span>';
				$('#pcs-dp-roles-content-msg-container',element).show(0).html(html).addClass(addClass).removeClass(removeClass).delay(5000).hide(0);

			};


			/**
			 * event listener method called when role details is closed
			 * @param event
			 */
			self.closeDetails = function(event) {
				var data = event.detail;


				//get roles again from cache
				roleService.getRoles(false).then(function(roleItemsList) {
					self.populateRolesData(roleItemsList);

					//make selected Role as null
					self.selectedRole(null);

					$('#pcs-dp-roles-list',element).ojListView('refresh');
				});

			};


			/**
			 * event listener  method called when a new role save is success
			 * @param event
			 */
			self.addRoleCallback = function (event){
				var data = event.detail;
				var role = data.role;

				//make selected Role as null
				self.selectedRole(null);

				var successMsg = self.bundle.pcs.dp.roles.create_role_success.replace('{0}', role.getRoleDisplayName());
				self.showContentSuccessRegion(successMsg);

				//fetch roles again from backend
				self.fetchDPRoles();

				// //get roles again from cache
				// roleService.getRoles(false).then(function(roleItemsList) {
				// 	self.populateRolesData(roleItemsList);
                //
				// 	//remove the overridenId from the list if it exists
				// 	if(self.consumerType()=== dpRolesUtil.const.CONSUMER_TYPE.instance_roles && role.getOverriddenRoleId()){
				// 		var currentPosition = -1;
				// 		$.each(self.roleList(), function(index,item){
				// 			if(item.getRoleId() === role.getOverriddenRoleId()){
				// 				currentPosition = index;
				// 				return false;
				// 			}
				// 		});
				// 		if (currentPosition != -1){
				// 			//deleted the
				// 			self.roleList.splice(currentPosition, 1 );
				// 		}
				// 	}
                //
				// 	//make selected Role as null
				// 	self.selectedRole(null);
                //
				// 	$('#pcs-dp-roles-list',element).ojListView('refresh');
                //
				// 	var msg = self.bundle.pcs.dp.roles.create_role_success.replace('{0}', role.getRoleDisplayName());
				// 	self.showContentSuccessRegion(msg);
				// });
			};


			/**
			 * event listener  method called when a updating a role  is success
			 * @param event
			 */
			self.editRoleCallback = function (event){
				var data = event.detail;
				var role = data.role;

				//get roles again from cache
				roleService.getRoles(false ,null).then(function(roleItemsList) {
					self.populateRolesData(roleItemsList);

					//make selected Role as null
					self.selectedRole(null);

					$('#pcs-dp-roles-list',element).ojListView('refresh');

					var msg = self.bundle.pcs.dp.roles.edit_role_success.replace('{0}', role.getRoleDisplayName());
					self.showContentSuccessRegion(msg);
				});
			};


			//Handle on click of refresh button
			self.onRefreshBtnClick = function() {
				self.fetchDPRoles();
			};

			self.bindingsApplied = function() {
				//temp for Knockoutcomponet
				self.initContext();

				//Subscribe to the events
				pcsUtil.eventHandler.addHandler(element,'dproledetail:close', self.closeDetails);
				pcsUtil.eventHandler.addHandler(element,'dproledetail:addrole', self.addRoleCallback);
				pcsUtil.eventHandler.addHandler(element,'dproledetail:editrole', self.editRoleCallback);

			};

			/**
			 * Method to dispose the ocmponent
			 */
			self.dispose = function(){
				loggerUtil.log('dispose in case roles');
				self.searchTextSubscription.dispose();

				pcsUtil.eventHandler.removeHandler(element,'dproledetail:close', self.closeDetails);
				pcsUtil.eventHandler.removeHandler(element,'dproledetail:addrole', self.addRoleCallback);
				pcsUtil.eventHandler.removeHandler(element,'dproledetail:editrole', self.editRoleCallback);
			};

			self.bindingsApplied();
		}
	}
);
