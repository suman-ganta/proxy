/**
 * Created by sheshash on 3/21/2017.
 */
define(function() {
    'use strict';
    return function(data) {

		if(data.newRole){
			data.newRole= true;
		}else{
			data.newRole= false;
		}

		data.toString= data.displayName + data.id + data.scopeType + data.scopes;

        return {
            data: data,
            toString: function() {
                return data.toString;
            },
            getRoleDisplayName: function() {
                return data.displayName;
            },
            getRoleId: function() {
                return data.id;
            },
            getScopeType: function() {
                return data.scopeType;
            },
            getScopes: function() {
                return data.scopes;
            },
            getOverriddenRoleId: function() {
                return data.overriddenRoleId;
            },
			isNewRole: function(){
            	return data.newRole;
			}
        };
    };
});
