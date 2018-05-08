/**
 * Created by nisabhar on 7/20/17.
 */

/**
 * Created by nisabhar on 3/11/2016.
 */

define(['ojs/ojcore', 'knockout', 'jquery'], function(oj,ko, $) {
	'use strict';

	return {

		/**
		 * iterate over plaItems
		 * @param planItem
		 * @param children
		 */
		setPlanItemResourceOptionsRecursively: function(planItem, children) {
			var dpRolesUtil =this;

			var nextChildren = [];
			if(planItem.childPlanItems.length > 0){
				children.push({value: planItem.id, label: planItem.displayName, children: nextChildren});
			} else {
				children.push({value: planItem.id, label: planItem.displayName});
			}

			$.each(planItem.childPlanItems, function(index,childPlanItem){
				dpRolesUtil.setPlanItemResourceOptionsRecursively(childPlanItem, nextChildren);
			});
		},

		/**
		 * Method to validate the tracker object
		 * and show its data
		 * @param tracker
		 */
		validateInvalidComponentTracker: function (tracker){
			var trackerObj = ko.utils.unwrapObservable(tracker);
			if (trackerObj === undefined)
				return true;
			else
			{
				if (trackerObj instanceof oj.InvalidComponentTracker)
				{
					// showMessages first (this will show any hidden messages)
					trackerObj.showMessages();
					trackerObj.focusOnFirstInvalid();

					if (tracker()['invalidShown']) {
						return false;
					}else {
						return true;
					}
				}
			}
			return true;
		},


		/**
		 * Method to create the payload of changed members
		 * @param initialMemberList
		 * @param selectedIdentities
		 */
		getChangedMembersPayload : function(initialMemberList, selectedIdentities) {
			var changedMembers = [];

			//TODO: CHECK for overrriden

			// the intital members list
			var initialObject = {};
			for (var j = 0; initialMemberList && j < initialMemberList.length; j++) {
				var memData = initialMemberList[j];
				var id = memData.getMemberName() + '_' + memData.getMemberType();
				initialObject[id.toUpperCase()] = memData;
			}

			//iterate through current selected identites list
			for (var i = 0; selectedIdentities && i < selectedIdentities.length; i++) {
				var selData = selectedIdentities[i];
				var selDataId = selData.id +  '_' + selData.type;
				if (initialObject.hasOwnProperty(selDataId.toUpperCase())) {
					//this member is not change remove from initialobjeect
					delete initialObject[selDataId.toUpperCase()];
				} else {
					var payload = {
						'object': {
							'memberName': selData.id,
							'memberType': selData.type.toUpperCase()
						},
						'type': 'INSERT'
					};
					changedMembers.push(payload);
				}
			}
			//remaining items in the list will have to be deleted
			for (var p in initialObject) {
				var payload = {
					'object': {
						'memberName': initialObject[p].getMemberName(),
						'memberType': initialObject[p].getMemberType(),
						'id': initialObject[p].getId()
					},
					'type': 'DELETE'
				};
				changedMembers.push(payload);
			}
			return changedMembers;
		},


		/**
		 * Method to create the payload of changed permissions
		 * @param initialPermissionList
		 * @param selectedPermissionList
		 * @param subResourceId
		 * @returns {Array}
		 */
		getChangedPermissionsPayload : function(initialPermissionList, selectedPermissionList,subResourceId , instancePermission) {
			var changedPermissions = [];

			// the intitial permissions list
			var initialObject = {};
			for (var j = 0;initialPermissionList && j < initialPermissionList.length; j++) {
				var permission = initialPermissionList[j];
				var id = permission.id;
				initialObject[id.toUpperCase()] = permission;
			}

			//TODO: CHECK for overrriden
			//iterate through current selected permissions list
			$.each(selectedPermissionList, function(index, permission) {
				// if the permission was always there see if we need to UPDATE
				if (permission.id && initialObject.hasOwnProperty(permission.id.toUpperCase())) {
					//this permission is not deleted remove from initialobjeect
					delete initialObject[permission.id.toUpperCase()];
				}

				// get the payload if its changed or if its new
				var payload = permission.getPayloadObject(subResourceId);
				if(payload){
					changedPermissions.push(payload);
				}
			});

			//remaining items in the initial list will have to be deleted
			for (var p in initialObject) {
				var payload = {
					'object': initialObject[p],
					'type': 'DELETE'
				};
				changedPermissions.push(payload);
			}

			//Add instance permission payload
			if(instancePermission){
				var payload = instancePermission.getPayloadObject(subResourceId);
				if(payload){
					changedPermissions.push(payload);
				}
			}


			return changedPermissions;
		},

		/**
		 *
		 * @returns {{condition: string, actions: Array, resources: [*]}}
		 */
		createInstancePermission : function(){
			var dpRolesUtil =this;

			var permission ={
					condition:'default',
					actions:[],
					resources:[
						{
							resourceId:'*',
							subResourceId:'*',
							resourceType: dpRolesUtil.const.RESOURCE_TYPE.CASE_INSTANCE
						}
					]
			};

			return permission
		},

		/**
		 * create new Role
		 */
		createNewRole: function(type){
			var newRole ={
				displayName: '',
				id: -1,
				newRole: true,
				scopes : []
			};

			newRole['scopeType'] = type;

			return newRole;
		},

		/**
		 * list of all constants used
		 */
		const : {
			SCOPE_TYPE :{
				GLOBAL : 'GLOBAL',
				INSTANCE : 'INSTANCE',
				DEFINITION : 'DEFINITION'
			},
			CONSUMER_TYPE :{
				instance_roles : 'instance_roles',
				admin_roles : 'admin_roles'
			},
			RESOURCE_TYPE :{
				CASE_INSTANCE :'CASE_INSTANCE',
				CASE_DOCUMENT_FOLDER : 'CASE_DOCUMENT_FOLDER',
				CASE_EXECUTION : 'CASE_EXECUTION',
				CASE_DATA : 'CASE_DATA'
			}
		}
	};
});
