/**
 * Created by nisabhar on 7/18/17.
 */


define(['ojs/ojcore', 'knockout', 'jquery', 'pcs/dynamicProcess/services/DPRolesService',
		'pcs/dynamicProcess/services/DPInstanceService','pcs/dynamicProcess/model/DpRole' ,
		'pcs/dynamicProcess/model/DpRoleMember', 'pcs/dynamicProcess/roles/viewModel/dpRolesPermissionVM',
		'pcs/dynamicProcess/roles/util/dpRolesUtil', 'pcs/util/pcsUtil', 'ojs/ojknockout-validation', 'ojL10n!pcs/resources/nls/pcsSnippetsResource',
		'ojs/ojmenu','ojs/ojknockout','promise', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdialog' , 'ojs/ojcheckboxset'
	],
	function(oj, ko, $, CaseRolesService, InstanceService,DpRole, DpRoleMember, PermissionVM, dpRolesUtil,  pcsUtil) {

		'use strict';

		return function (params, componentInfo) {
			var self = this,
				roleService,
				element = componentInfo.element;

			var loggerUtil =  require('pcs/util/loggerUtil');

			//store the params
			self.properties = params;

			//Set the resourcebundle
			self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

			//Component Params
			self.consumerType = ko.observable(dpRolesUtil.const.CONSUMER_TYPE.admin_roles); // type of consumer
			self.instanceId = ''; //Instance roles atributes
			self.instanceProcessDefinitionId = '';
			self.readOnly = ko.observable(false); // for instance roles which are readOnly

			//VM state attributes
			self.selectedRole = ko.observable(); //current selected Role Id
			self.editPermissionEnabled = ko.observable(false); //to control detail permissions
			self.displayName = ko.observable('');  // Role display name
			self.selectedProcessDef = ko.observableArray(); // selected Process def
			self.tracker = ko.observable(); // ERROR TRACKER

			// list of process definitions
			self.processDefinitionList= ko.observableArray([]);

			//Member related
			self.selectedIdentities = ko.observableArray([]);  // currently selected members
			self.initialMemberList = []; 	// to hold initital member list

			//Permissions related
			self.initialPermissionList = []; // to hold initial permissionList
			self.instancePermission = ko.observable(); //to hold instance permission
			self.selectedPermissionList= ko.observableArray([]); // to hold the detail permissions

			var resourceOptionsVar = {};
			resourceOptionsVar[dpRolesUtil.const.RESOURCE_TYPE.CASE_DATA] =ko.observableArray();
			resourceOptionsVar[dpRolesUtil.const.RESOURCE_TYPE.CASE_EXECUTION] =ko.observableArray();
			resourceOptionsVar[dpRolesUtil.const.RESOURCE_TYPE.CASE_DOCUMENT_FOLDER] =ko.observableArray();
			self.resourceOptions = ko.observable(resourceOptionsVar);

			self.resourceTypeOptions =[
				{value: dpRolesUtil.const.RESOURCE_TYPE.CASE_DOCUMENT_FOLDER, label: self.bundle.pcs.dp.roles.documents_label},
				{value: dpRolesUtil.const.RESOURCE_TYPE.CASE_DATA, label: self.bundle.pcs.dp.roles.data_label},
				{value: dpRolesUtil.const.RESOURCE_TYPE.CASE_EXECUTION, label: self.bundle.pcs.dp.roles.activities_label}
			];

			// different action list for different ResoirceType
			self.permissionsActionList = {};

			self.permissionsActionList[dpRolesUtil.const.RESOURCE_TYPE.CASE_EXECUTION] =
				[
					{value: 'READ', label: self.bundle.pcs.dp.roles.view_label, id: 'pcs-dp-roles-exec-perm-act-read'},
					{value: 'UPDATE', label: self.bundle.pcs.dp.roles.update_label, id: 'pcs-dp-roles-exec-perm-act-update'},
					// {value: 'ALL' , label : 'All' , id: 'pcs-dp-roles-exec-perm-act-all'},
					// {value: 'NONE' , label : 'None' , id: 'pcs-dp-roles-exec-perm-act-none'}
				];
			self.permissionsActionList[dpRolesUtil.const.RESOURCE_TYPE.CASE_DATA] =
				[
					{value: 'READ', label: self.bundle.pcs.dp.roles.view_label, id: 'pcs-dp-roles-data-perm-act-read'},
					{value: 'UPDATE', label: self.bundle.pcs.dp.roles.update_label, id: 'pcs-dp-roles-data-perm-act-update'},
					// {value: 'ALL' , label : 'All' , id: 'pcs-dp-roles-data-perm-act-all'},
					// {value: 'NONE' , label : 'None' , id: 'pcs-dp-roles-data-perm-act-none'}
				];
			self.permissionsActionList[dpRolesUtil.const.RESOURCE_TYPE.CASE_DOCUMENT_FOLDER] =
				[
					{value: 'ACCESS' , label : self.bundle.pcs.dp.roles.view_label , id: 'pcs-dp-roles-doc-perm-act-contr'},
					{value: 'DOCUMENT_DOWNLOAD' , label :self.bundle.pcs.dp.roles.download_label, id: 'pcs-dp-roles-doc-perm-act-down'},
					{value: 'DOCUMENT_CONTRIBUTE' , label : self.bundle.pcs.dp.roles.contribute_label , id: 'pcs-dp-roles-doc-perm-act-all'},
					// {value: 'NONE' , label : 'None' , id: 'pcs-dp-roles-doc-perm-act-none'}
				];

			self.permissionsActionList[dpRolesUtil.const.RESOURCE_TYPE.CASE_INSTANCE] =
				[
					{value: 'CREATE' , label : self.bundle.pcs.dp.roles.inst_create_label , id: 'pcs-dp-roles-inst-perm-act-create'},
					{value: 'READ' , label : self.bundle.pcs.dp.roles.inst_read_label , id: 'pcs-dp-roles-inst-perm-act-read'},
					{value: 'UPDATE' , label :self.bundle.pcs.dp.roles.inst_update_label  , id: 'pcs-dp-roles-inst-perm-act-update'},
					{value: 'ACCESS' , label : self.bundle.pcs.dp.roles.inst_access_label  , id: 'pcs-dp-roles-inst-perm-act-access'},
					{value: 'DOCUMENT_DOWNLOAD' , label : self.bundle.pcs.dp.roles.inst_download_label  , id: 'pcs-dp-roles-inst-perm-act-down'},
					{value: 'DOCUMENT_CONTRIBUTE' , label : self.bundle.pcs.dp.roles.inst_contribute_label  , id: 'pcs-dp-roles-inst-perm-act-contr'}
				];


			//subscript for ProcessDef changes
			self.selectedProcessDefSubscription = self.selectedProcessDef.subscribe(function() {
				if(self.selectedProcessDef() && self.selectedProcessDef().length === 1) {
					var defId = self.selectedProcessDef()[0];

					// fetch the new metadata
					self.fetchProcessDefinitionMetadata(defId);


					if(self.selectedRole().getRoleId() === -1){
						//if its a new role clean out the saved permissionList as definition changed
						self.selectedPermissionList.removeAll();
					}
				}
			});

			//Label for saveButton
			self.saveLabel = ko.pureComputed(function(){
				//its a new role being created
				if(self.selectedRole().getRoleId() === -1){
					return self.bundle.pcs.dp.roles.create_label;
				}
				// instance is overriding a role
				if(self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.instance_roles && !self.selectedRole().getOverriddenRoleId()){
					return self.bundle.pcs.dp.roles.override_label;
				}
				// editing an existing role
				return self.bundle.pcs.dp.roles.save_label;
			});


			/**
			 * the first method call to set up the Component
			 */
			self.initContext = function() {
				roleService = CaseRolesService.getInstance();

				if(self.properties.hasOwnProperty('consumerType')){
					self.consumerType (ko.utils.unwrapObservable(self.properties.consumerType));
				}

				if (self.properties.hasOwnProperty('instanceid') ) {
					self.instanceId =ko.utils.unwrapObservable(self.properties.instanceid);
				}

				if (self.properties.hasOwnProperty('role') ) {
					self.selectedRole(ko.utils.unwrapObservable(self.properties.role));
				}

				if (self.properties.hasOwnProperty('processdefinitionid') ) {
					self.instanceProcessDefinitionId = ko.utils.unwrapObservable(self.properties.processdefinitionid);
				}

				if (self.properties.hasOwnProperty('readonly') ) {
					self.readOnly(ko.utils.unwrapObservable(self.properties.readonly));
				}

				//load process def
				self.fetchProcessDefinitions();

				// populate roles data
				self.populateDPRoleData();
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
			 * method to populate DP role
			 */
			self.populateDPRoleData = function(){

				//set the displayName
				var name = self.selectedRole().getRoleDisplayName();
				// if we are overrding the role , modify the display name
				if(self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.instance_roles && self.selectedRole().getScopeType() === dpRolesUtil.const.SCOPE_TYPE.DEFINITION ){
					name = name +"_overridden"
				}
				self.displayName (name);

				//set selectedProcessDef
				if (self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.admin_roles){
					self.selectedProcessDef(self.selectedRole().getScopes());
				}else{
					self.selectedProcessDef([self.instanceProcessDefinitionId]);
				}


				if(self.selectedRole().getRoleId() != -1){
					//fetch members
					self.fetchRoleMembers(self.selectedRole().getRoleId());

					//fetch permissions
					self.fetchRolePermissions(self.selectedRole().getRoleId());
				}else{

					// add the instance permission
					self.instancePermission(new PermissionVM (dpRolesUtil.createInstancePermission()));
				}
			};


			/**
			 * method to fetch the process metadata
			 */
			self.fetchProcessDefinitionMetadata = function (defId){

				//Start the loading indicator
				$('#pcs-dp-roles-detail-overlay', element).addClass('pcs-common-load-overlay');

				roleService.getResources(defId).then(function(resourceData) {

					// iterate Data objects
					var optionObj = {value: '*', label: self.bundle.pcs.dp.roles.all_label, children: []};
					$.each(resourceData.dataObjects, function(index,data){
						optionObj.children.push({value: data.id, label: data.displayName});
					});

					//remove the old data
					self.resourceOptions()[dpRolesUtil.const.RESOURCE_TYPE.CASE_DATA].removeAll();
					//push new data
					self.resourceOptions()[dpRolesUtil.const.RESOURCE_TYPE.CASE_DATA].push(optionObj);

					// iterate folders
					var optionObj = {value: '*', label: self.bundle.pcs.dp.roles.all_label, children: []};
					if(resourceData.documents){
						$.each(resourceData.documents.documentDefinitions, function(index,folder){
							optionObj.children.push({value: folder.name, label: folder.name});
						});
					}
					//remove the old data
					self.resourceOptions()[dpRolesUtil.const.RESOURCE_TYPE.CASE_DOCUMENT_FOLDER].removeAll();
					//push new data
					self.resourceOptions()[dpRolesUtil.const.RESOURCE_TYPE.CASE_DOCUMENT_FOLDER].push(optionObj);


					// iterate plaItems
					$.each(resourceData.planItems, function(index,planItemJSON) {
						var optionObj = {value: '*', label: self.bundle.pcs.dp.roles.all_label, children: []};
						//self.setPlanItemResourceOptionsRecursively(planItemJSON, optionObj.children);
						$.each(planItemJSON.childPlanItems, function(index,childPlanItem){
							dpRolesUtil.setPlanItemResourceOptionsRecursively(childPlanItem, optionObj.children);
						});
						//remove the old data
						self.resourceOptions()[dpRolesUtil.const.RESOURCE_TYPE.CASE_EXECUTION].removeAll();
						//push new data
						self.resourceOptions()[dpRolesUtil.const.RESOURCE_TYPE.CASE_EXECUTION].push(optionObj);
					});

					self.showContentSuccessRegion();

				}).fail(function(error) {
					var msg = self.bundle.pcs.dp.roles.metadata_fetch_error;
					self.showContentErrorRegion(msg);
				});

			};


			/**
			 * method to fetch role members
			 * @param roleId
			 */
			self.fetchRoleMembers = function (roleId){
				//Start the loading indicator
				$('#pcs-dp-roles-detail-overlay', element).addClass('pcs-common-load-overlay');

				roleService.getMembers(roleId).then(function(membersList) {
					var tmp =[];
					self.initialMemberList = [];
					for (var i = 0; i < membersList.length; i++) {
						var selMember = membersList[i];
						tmp.push({
							'id': selMember.getMemberName(),
							'type': selMember.getMemberType().toLowerCase()
						});
						if(self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.instance_roles && self.selectedRole().getScopeType() === dpRolesUtil.const.SCOPE_TYPE.DEFINITION ){
							// if the instance is loading , a definition scope role , we will create a new member
						}else{
							self.initialMemberList.push(selMember);
						}

					}
					self.selectedIdentities(tmp);
					self.showContentSuccessRegion();
				}).fail(function(error) {
					var msg = self.bundle.pcs.dp.roles.members_fetch_error;
					self.showContentErrorRegion(msg);
				});
			};


			/**
			 * method to fetch role permissions
			 * @param roleId
			 */
			self.fetchRolePermissions = function (roleId){
				//Start the loading indicator
				$('#pcs-dp-roles-detail-overlay', element).addClass('pcs-common-load-overlay');

				roleService.getRolePermissions(roleId).then(function(permData) {
					self.populatePermissions(permData);
					self.showContentSuccessRegion();
				}).fail(function(error) {
					var msg = self.bundle.pcs.dp.roles.perm_fetch_error;
					self.showContentErrorRegion(msg);
				});
			};


			/**
			 * method to populate permissions
			 */
			self.populatePermissions = function (permData){
				//clean old list
				self.initialPermissionList = [];
				self.selectedPermissionList.removeAll();

				$.each(permData, function(index,permission) {

					if(self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.instance_roles && self.selectedRole().getScopeType() === dpRolesUtil.const.SCOPE_TYPE.DEFINITION ){
						// if the instance is loading , a definition scope role , we will create a new member
						permission.id = null;
					}

					var permissionVM = new PermissionVM(permission);
					if(permission.resources.length > 0 &&
						permission.resources[0].resourceType === dpRolesUtil.const.RESOURCE_TYPE.CASE_INSTANCE){
						self.instancePermission(permissionVM);
					} else {
						self.selectedPermissionList.push(permissionVM);
						// add it in local cache to be used later for saving
						self.initialPermissionList.push(permission);
					}
				});

				// if instance permission is not set add a dummy permission
				if(!self.instancePermission()){
					// add the instance permission
					self.instancePermission(new PermissionVM (dpRolesUtil.createInstancePermission()));
				}

			};


			/**
			 * method to delete a permission
			 */
			self.deletePermission = function (data,event){
				//remove the permission from the list
				self.selectedPermissionList.remove(data);
			};


			/**
			 * method to add a new permission
			 * in the perission detail section
			 */
			self.addNewPermission = function (){
				//Add the new item at the top
				self.selectedPermissionList.unshift(new PermissionVM ({}));
			};


			/**
			 * to cancel local permission changes
			 */
			self.cancelPermissionChanges = function(){
				//reload the original permission set
				self.populatePermissions(self.initialPermissionList.slice());
			};


			/**
			 * method to show detail permission
			 * @param data
			 * @param event
			 */
			self.showDetailPermissionUI = function(data,event) {
				self.editPermissionEnabled(true);
			};


			/**
			 * to close the role detail
			 */
			self.goBackButton = function() {
				if(self.editPermissionEnabled()){
					// don't let user close the ui if the data is invalid
					if(self.validateData()){
						self.editPermissionEnabled(false);
					}
				} else {
					self.discardRoleChanges();
				}
			};



			/**
			 * method to validate the data
			 */
			self.validateData = function (){
				return dpRolesUtil.validateInvalidComponentTracker(self.tracker);
			};


			/**
			 * Method called when  save role changes button is clocked
			 */
			self.saveRoleChanges = function() {
				//validate the data
				if(!self.validateData()){
					return;
				}

				var payload = {
					displayName: self.displayName(),
					scopes: self.selectedProcessDef(),
					scopeType: self.selectedRole().getScopeType()
				};

				if(self.selectedRole().getRoleId() === -1){
					self.saveNewRole(payload);
				}else{
					if(self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.instance_roles && self.selectedRole().getScopeType() === dpRolesUtil.const.SCOPE_TYPE.DEFINITION ){
						// create a new instance level role
						payload.scopeType = dpRolesUtil.const.SCOPE_TYPE.INSTANCE;
						payload.overriddenRoleId = self.selectedRole().getRoleId();
						payload.scopes = [self.selectedProcessDef()[0]+'.'+self.instanceId];
						self.saveNewRole(payload);
					}
					else if(self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.instance_roles && self.selectedRole().getScopeType() === dpRolesUtil.const.SCOPE_TYPE.INSTANCE){
						//set the existing roleID
						payload.id =self.selectedRole().getRoleId();
						payload.scopes = [self.selectedProcessDef()[0]+'.'+self.instanceId];
						self.saveExistingRole(payload);
					}
					else{
						//set the existing roleID
						payload.id =self.selectedRole().getRoleId();
						self.saveExistingRole(payload);
					}
				}
			};


			/**
			 * method to check if the role with givenName with different roleID already exist
			 * @param payload
			 * @returns {boolean}
			 */
			self.isDuplicateName= function(payload){

				var isDuplicate = false;

				//check if the changed name already exist . DO not create a new role with same name
				var existingRoles = roleService.getExistingRolesIdNameMap();

				for (var roleId in  existingRoles){

					if(existingRoles[roleId] === payload.displayName && roleId != payload.id){
						var msg = self.bundle.pcs.dp.roles.duplicate_role_name_error;
						self.showContentErrorRegion(msg);
						isDuplicate =true;
						break;
					}

				}

				return isDuplicate
			};


			/**
			 * method to update an existing role
			 * @param payload
			 */
			self.saveExistingRole = function (payload){

				//check if the changed name already exist . Do not save the role with same name
				if(self.isDuplicateName(payload)){
					return;
				}

				//if displayName has changed save the role first
				if(self.displayName() != self.selectedRole().getRoleDisplayName()){
					//Start the loading indicator
					$('#pcs-dp-roles-detail-overlay', element).addClass('pcs-common-load-overlay');
					//update the role
					roleService.updateRole(payload).then(function(role) {

						self.addOrEditRoleSuccess(role,'editrole');

					}).fail(function(error) {
						var msg = self.bundle.pcs.dp.roles.edit_role_error;
						self.showContentErrorRegion(msg);
					});
				}else{
					self.addOrEditRoleSuccess(self.selectedRole(),'editrole');
				}

			};

			/**
			 * method to add a new Role
			 * @param payload
			 */
			self.saveNewRole = function (payload){

				//check if the changed name already exist . Do not create a new role with same name
				if(self.isDuplicateName(payload)){
					return;
				}


				//Start the loading indicator
				$('#pcs-dp-roles-detail-overlay', element).addClass('pcs-common-load-overlay');
				roleService.addNewRole(payload).then(function(role) {

					self.addOrEditRoleSuccess(role,'addrole');

				}).fail(function(error) {
					var msg = self.bundle.pcs.dp.roles.create_role_error;
					self.showContentErrorRegion(msg);
				});
			};


			/**
			 * call back success method of add/edit role
			 * it saves the members and call permission save
			 * @param msg
			 */
			self.addOrEditRoleSuccess = function (role,type){

				var membersSavePromise = self.saveMembers(role.getRoleId());

				if(membersSavePromise){
					membersSavePromise.then(function(){
						self.addOrEditMemberSuccess(role,type);
					}).
					fail(function(error) {
						var msg = self.bundle.pcs.dp.roles.members_save_error;
						self.showContentErrorRegion(msg);
					});
				}else{
					self.addOrEditMemberSuccess(role,type);
				}
			};


			/**
			 * method called when member adding is saved
			 * it saves the permissions and dispatches save event
			 * @param role
			 * @param type
			 */
			self.addOrEditMemberSuccess = function (role,type){

				var permissionsSavePromise = self.savePermissions(role.getRoleId());

				if(permissionsSavePromise){
					permissionsSavePromise.then(function(){
						self.dispatchSaveEvent(role,type);
					}).
					fail(function(error) {
						var msg = self.bundle.pcs.dp.roles.perm_save_error;
						self.showContentErrorRegion(msg);
					});
				}else{
					self.dispatchSaveEvent(role,type);
				}
			};


			/**
			 * method to save members for the given role
			 */
			self.saveMembers = function(roleId){
				var promise = $.Deferred();

				var changedMembers = dpRolesUtil.getChangedMembersPayload(self.initialMemberList, self.selectedIdentities());
				if (changedMembers.length > 0) {
					//Start the loading indicator
					$('#pcs-dp-roles-detail-overlay', element).addClass('pcs-common-load-overlay');
					var payload = {actions : changedMembers};

					roleService.updateMembers(roleId, payload).then(function(data) {
						self.initialMemberList = data.slice();
						promise.resolve();
					}).fail(function(error) {
						promise.reject();
					});
				} else {
					return;
				}
				return promise;
			};


			/**
			 *  method to save the permissions
			 * @param role
			 * @param type
			 */
			self.savePermissions = function (roleId){
				var promise = $.Deferred();

				var initialPermissionList =self.initialPermissionList.slice();

				if(self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.instance_roles && self.selectedRole().getScopeType() === dpRolesUtil.const.SCOPE_TYPE.DEFINITION ){
					// if the instance is loading , a definition scope role , we will create a new member
					initialPermissionList = [];
				}

				// set the subresourceId in case of instance roles
				var subResourceId = self.consumerType() === dpRolesUtil.const.CONSUMER_TYPE.admin_roles ? '*': self.instanceId;
				var changedPermissions = dpRolesUtil.getChangedPermissionsPayload(initialPermissionList, self.selectedPermissionList(), subResourceId ,self.instancePermission());

				if (changedPermissions.length > 0) {
					//Start the loading indicator
					$('#pcs-dp-roles-detail-overlay', element).addClass('pcs-common-load-overlay');

					var payload = {actions : changedPermissions};

					roleService.updatePermission(roleId, payload).then(function(data) {

						//No need to update local permissions, as Ui will be closed now
						//self.populatePermissions(data);

						promise.resolve();
					}).fail(function(error) {
						promise.reject();
					});
				} else {
					return;
				}
				return promise;
			};


			/**
			 * method to show error region
			 * @param msg
			 */
			self.showContentErrorRegion = function(msg){
				//stop the loading indicator
				$('#pcs-dp-roles-detail-overlay', element).removeClass('pcs-common-load-overlay');

				$('#pcs-dp-roles-content-error-text',element).html(msg);
				$('#pcs-dp-roles-detail-error-containor',element).show().delay(8000).hide(0);
			};


			/**
			 * method to show success region
			 * @param msg
			 */
			self.showContentSuccessRegion = function(msg){
				//stop the loading indicator
				$('#pcs-dp-roles-detail-overlay', element).removeClass('pcs-common-load-overlay');

			};

			/**
			 * to sent the save message to parent
			 * @param role
			 * @param type
			 */
			self.dispatchSaveEvent = function(role,type){
				//stop the loading indicator
				$('#pcs-dp-roles-detail-overlay', element).removeClass('pcs-common-load-overlay');

				var params = {
					'bubbles': true,
					'detail': {
						'id': role.getRoleId(),
						'role' : role
					}
				};
				// loggerUtil.log('firing event for drilldown');
				element.dispatchEvent(new CustomEvent('dproledetail:'+ type, params));
			};




			/**
			 * Method to discard changes
			 */
			self.discardRoleChanges = function() {
				var params = {
					'bubbles': true,
					'detail': {
						'id': self.selectedRole().getRoleId()
					}
				};
				// loggerUtil.log('firing event for drilldown');
				element.dispatchEvent(new CustomEvent('dproledetail:close', params));
			};


			/**
			 * Method to dispose the ocmponent
			 */
			self.dispose = function(){
				loggerUtil.log('dispose in case roles details');

				if(self.selectedProcessDefSubscription){
					self.selectedProcessDefSubscription.dispose();
				}

				self.saveLabel.dispose();
			};

			self.bindingsApplied = function() {
				//temp for Knockoutcomponet
				self.initContext();
			};

			self.bindingsApplied();
		}
	}
);
