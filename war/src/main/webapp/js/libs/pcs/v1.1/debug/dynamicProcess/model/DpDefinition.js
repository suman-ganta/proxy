/**
 * Created by nisabhar on 7/13/17.
 */

/**
 * Created by nisabhar on 1/18/2017.
 */


define(['ojs/ojcore','pcs/util/pcsUtil'], function(oj,pcsUtil) {
	'use strict';
	return function(data) {

		if (!data.name) {
			data.name = data.id;
		}

		//Check if dn exist and is a valid dn ex default/Campaign_Approval_Workflow!1*soa_de7e9bee-d166-4871-91e0-6733de705892
		var dn = data.category;
		if(!dn){
			data.displayName= data.name;
		}
		else{
			if(dn.indexOf("/")>0 &&  dn.indexOf("!")>0 && dn.indexOf("*")>0){
				var partition=  dn.substring(0, dn.indexOf("/"));

				var appName = dn.substring(dn.indexOf("/")+1, dn.indexOf("!"));

				var version = dn.substring(dn.indexOf("!")+1, dn.indexOf("*"));

				var label = dn.substring(dn.indexOf("*")+1, dn.length);

				data.displayName = data.name + " (" +appName +   " v" + version+ " )";
			}
			else{
				data.displayName= data.name;
			}
		}

		//Read the available actions and use it
		if( data.availableActions){

			if(data.availableActions.indexOf('create') > -1){
				data.canCreate = true;
			}
			if(data.availableActions.indexOf('update') > -1){
				data.canUpdate = true;
			}
			if(data.availableActions.indexOf('read') > -1){
				data.canRead = true;
			}
		}

		return data
	};
});
