/**
 * Created by sheshash on 3/20/2017.
 */
define(['jquery','pcs/data-services/DataServices',
		'pcs/dynamicProcess/model/DpRole','pcs/dynamicProcess/model/DpRoleMember' ],

	function($,DataServices, RoleItem,MemberItem ) {
	'use strict';
		var resourceUrlConfig = {
			'rolesList': '/dp-roles',
			'metadata': '/dp-definitions/{defId}/metadata',
			'permissions': '/dp-roles/{roleId}/permissions',
			'membersList': '/dp-roles/{roleId}/members'
		};

		var _state = {
			roleItemsMap: {},
			metadata: {}
		};

		//making it a singleton
		var instance;

		var dataServices = DataServices.getInstance();

		function createErrorResponse(error) {
			var msg;
			switch (error.status) {
				case 204:
					msg = 'Action completed successfully.';
					break;
				case 400:
					msg = 'Invalid Action Performed.';
					break;
				case 403:
					msg = 'Invalid Action Performed.';
					break;
				case 404:
					msg = 'Internal Error. Please contact the admin.';
					break;
			}
			return {
				'code': error.status,
				'message': msg
			};
		}

		function init(options) {

			// Do a server call to get the list
			return {
				//fetch a single role
				// getRole: function(refresh, roleId) {
				// 	var url = resourceUrlConfig.rolesList + '/' + roleId;
                //
				// 	var promise = $.Deferred();
                //
				// 	var options = {};
                //
				// 	if (!refresh) {
				// 		promise.resolve(_state.roleItemsMap[roleId]);
				// 		return promise;
				// 	}
                //
				// 	dataServices.get(url, options, 'dp').done(function(data) {
				// 		var roleItem = new RoleItem(data);
				// 		//put in cache
				// 		_state.roleItemsMap[data.id] = roleItem;
				// 		promise.resolve(roleItem);
				// 	}).fail(function(error) {
				// 		promise.reject(error);
				// 	});
				// 	return promise;
				// },

				//get existing role names
				getExistingRolesIdNameMap: function (){

					var roleItemsMap = {};

					Object.keys(_state.roleItemsMap).map(function(item) {
						var roleItems = _state.roleItemsMap[item];
						roleItemsMap[roleItems.getRoleId()] = roleItems.getRoleDisplayName();
					});

					return roleItemsMap;
				},

				//fetch all roles
				getRoles: function(refresh, params) {
					var url = resourceUrlConfig.rolesList;
					var promise = $.Deferred();
					var options = {
						queryParams: params
					};


					if (!refresh) {
						var roleItems = Object.keys(_state.roleItemsMap).map(function(item) {
							return _state.roleItemsMap[item]
						});
						promise.resolve(roleItems);
						return promise;
					}
					dataServices.get(url, options, 'dp').done(function(result) {
						_state.roleItemsMap ={};
						var roleItems = [];
						var data = result.items;
						for (var i = 0; i < data.length; i++) {
							var roleItem = new RoleItem(data[i]);
							roleItems.push(roleItem);
							_state.roleItemsMap[data[i].id] = roleItem;
						}

						promise.resolve(roleItems);
					}).fail(function(error) {
						promise.reject(error);
					});
					return promise;
				},

				//Do a client search search of the instance list
				searchRolesList: function(searchText) {
					var promise = $.Deferred();
					var list = _state.roleItemsMap;

					if (list === undefined) {
						return promise.resolve([]);
					}
					var prunedList = [];

					$.each(list, function(key, value) {
						if (value.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
							prunedList.push(value);
						}
					});
					promise.resolve(prunedList);
					return promise;
				},

				//add new role
				addNewRole: function(payloadData) {
					var promise = $.Deferred();

					var url = resourceUrlConfig.rolesList;

					var options = {
						contentType: 'application/json',
						payload: payloadData
					};
					dataServices.post(url, options, 'dp').done(function(data) {
						var roleItem = new RoleItem(data);
						_state.roleItemsMap[data.id] = roleItem;
						promise.resolve(roleItem);
					}).fail(function(error) {
						promise.reject(createErrorResponse(error));
					});

					return promise;
				},

				//update existing role
				updateRole: function(payloadData) {
					var promise = $.Deferred();

					var url = resourceUrlConfig.rolesList;

					url = url + '/' + payloadData.id;
					var options = {
						contentType: 'application/json',
						payload: payloadData
					};
					dataServices.put(url, options, 'dp').done(function(data) {

						var roleItem = new RoleItem(data);
						_state.roleItemsMap[data.id] = roleItem;

						promise.resolve(roleItem);
					}).fail(function(error) {
						promise.reject(createErrorResponse(error));
					});

					return promise;
				},

				// remove existing role
				removeRole: function(roleName) {
					var promise = $.Deferred();
					var url = resourceUrlConfig.rolesList;
					var options = {
						contentType: 'application/json',
						payload: roleName
					};
					dataServices.delete(url, options, 'dp').done(function() {
						delete _state.roleItemsMap[roleName];
						promise.resolve();
					}).fail(function(error) {
						promise.reject(createErrorResponse(error));
					});

					return promise;
				},

				// get process metadata
				getResources: function(defId) {
					var url = resourceUrlConfig.metadata.replace('{defId}', defId);

					var promise = $.Deferred();

					var options = {

					};
					if(_state.metadata[defId]){
						promise.resolve(_state.metadata[defId]);
					} else {
						dataServices.get(url, options, 'dp').done(function(data) {
							_state.metadata[defId] = data;
							promise.resolve(data);
						}).fail(function(error) {
							promise.reject(error);
						});
					}
					return promise;
				},

				//get role permission
				getRolePermissions: function(roleId) {
					var url = resourceUrlConfig.permissions.replace('{roleId}', roleId);

					var promise = $.Deferred();
					var options = {};

					dataServices.get(url, options, 'dp').done(function(data) {
						promise.resolve(data.items);
					}).fail(function(error) {
						promise.reject(error);
					});
					return promise;
				},

				//update permission
				updatePermission: function(roleId, payloadData) {
					var promise = $.Deferred();

					var url = resourceUrlConfig.permissions.replace('{roleId}', roleId);

					var options = {
						contentType: 'application/json',
						payload: payloadData
					};
					dataServices.post(url, options, 'dp').done(function(data) {
						promise.resolve(data.items);
					}).fail(function(error) {
						promise.reject(createErrorResponse(error));
					});

					return promise;
				},

				//get members
				getMembers: function(roleId) {

					var url = resourceUrlConfig.membersList.replace('{roleId}', roleId);

					var promise = $.Deferred();

					var options = {
						//queryParams: params
					};

					dataServices.get(url, options, 'dp').done(function(result) {
						var data = result.items;
						var memberItems = [];
						for (var i = 0; i < data.length; i++) {
							var memberItem = new MemberItem(data[i]);
							memberItems.push(memberItem);
						}
						promise.resolve(memberItems);
					}).fail(function(error) {
						promise.reject(error);
					});
					return promise;
				},

				//update Members
				updateMembers: function(roleId, payloadData) {
					var promise = $.Deferred();

					var url = resourceUrlConfig.membersList.replace('{roleId}', roleId);

					var options = {
						contentType: 'application/json',
						payload: payloadData
					};
					dataServices.post(url, options, 'dp').done(function(result) {
						var data = result.items;
						var memberItems = [];
						for (var i = 0; i < data.length; i++) {
							var memberItem = new MemberItem(data[i]);
							memberItems.push(memberItem);
						}
						promise.resolve(memberItems);
					}).fail(function(error) {
						promise.reject(createErrorResponse(error));
					});
					return promise;
				}

			}
		}


	return {
		// Get the Singleton instance if one exists
		// or create one if it doesn't
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	};


});
