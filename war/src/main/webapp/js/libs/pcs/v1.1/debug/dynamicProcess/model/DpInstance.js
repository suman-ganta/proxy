/**
 * Created by nisabhar on 1/4/2017.
 */

define(['ojs/ojcore','pcs/util/pcsUtil', 'pcs/util/dateUtil'], function(oj,pcsUtil,dateUtil) {
    'use strict';
    return function(data) {
    	var self = this;
		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

        //set state displayName
        if (data.state === 'ACTIVE') {
            data.stateDisplayName = self.bundle.pcs.dp.common.active;
            data.stateIconClass = 'pcs-dp-list-state-active';
        } else if (data.state === 'COMPLETED') {
            data.stateDisplayName = self.bundle.pcs.dp.common.completed;
			data.stateIconClass = 'pcs-dp-list-state-completed';
        } else if (data.state === 'TERMINATED') {
            data.stateDisplayName = self.bundle.pcs.dp.common.terminated;
			data.stateIconClass = 'pcs-dp-list-state-terminated';
        } else if (data.state === 'CLOSED') {
            data.stateDisplayName = self.bundle.pcs.dp.common.closed;
			data.stateIconClass = 'pcs-dp-list-state-closed';
        }


        //set initials and color
		var appName;
        if (data.processName) {
			appName = data.processName;

        } else {
			appName = data.processDefinitionId;
        }
		data.initials = pcsUtil.taskInitials(appName);
		data.colorCode = pcsUtil.taskIconColor(appName);

        //Create actionsList
        var availableActions = data.availableActions;
        var actionsList = [];
        if (availableActions) {
            availableActions.forEach(function(item, index) {
                var actionDisplayName = item;
                if (item === 'close') {
                    actionDisplayName = self.bundle.pcs.dp.common.close;
                } else if (item === 'complete') {
                    actionDisplayName = self.bundle.pcs.dp.common.complete;
                }
                var action = {
                    actionDisplayName: actionDisplayName,
                    action: item,
                    id: data.id,
                    title: data.title
                };
                actionsList.push(action);
            });
        }
        data.actionsList = actionsList;

        //stor the server dates
		data.serverCloseTime = data.closeTime;
		data.serverCreateTime = data.createTime;

		//convert dates into local timezone
		data.closeTime = dateUtil.getDateInUserTimezone(data.serverCloseTime);
		data.createTime =  dateUtil.getDateInUserTimezone(data.serverCreateTime);


		//set date specific variables
		data.duration = dateUtil.getTimeDurationTxt(data.durationInMillis);
		data.closeTimeFormatted = dateUtil.getFormattedDate(data.closeTime);
		data.createTimeFormatted = dateUtil.getFormattedDate(data.createTime);


		// for long instance desciption
        data.longText = '';
		if (data.userId) {
			data.longText = self.bundle.pcs.dp.common.instMsgWithUserId.replace('{id}', data.id).replace('{processName}', data.processName).replace('{userId}', data.userId).replace('{createTimeFormatted}', data.createTimeFormatted);
		} else {
			data.longText = self.bundle.pcs.dp.common.instMsgNoUserId.replace('{id}', data.id).replace('{processName}', data.processName).replace('{createTimeFormatted}', data.createTimeFormatted);

		}


        return {
            data: data,
            toString: function() {
                return data.title + data.description + data.id + data.longText;
            },
			getLongText : function (){
				return data.longText;
			},
            getTitle: function() {
                return data.title;
            },
            getNumber: function() {
                return data.id;
            },
			getId: function() {
				return data.id;
			},
            getDescription: function() {
                return data.description;
            },
			getProcessName: function(){
				return data.processName;
			},
			getUpdatedBy: function() {
                return data.userId;
            },
            getProcessDefinitionId: function() {
                return data.processDefinitionId;
            },
            getInstanceCreatedDate: function() {
                return data.createTime;
            },
            getInstanceCompletedDate: function() {
                return data.closeTime;
            },
			getInstanceCreatedDateFormatted: function() {
				return data.createTimeFormatted;
			},
			getInstanceCompletedDateFormatted: function() {
				return data.closeTimeFormatted;
			},
            getTotalTime: function() {
                return data.durationInMillis;
            },
			getDuration: function() {
				return data.duration;
			},
			getFormMetadataURL: function() {
                return data.formMetadataURL;
            },

            getFormName: function() {
                return data.formName;
            },

            getAvailableActions: function() {
                return data.actionsList;
            },
			getPermissionsList: function() {
				return data.availablePermissions;
			},
            // Dummy
            getApplication: function() {
                return data.processDefinitionId;
            },
            getInitials: function() {
                return data.initials;
            },
            getState: function() {
                return data.state;
            },
            getStateDisplayName: function() {
                return data.stateDisplayName;
            },
            getColorCode: function() {
                return data.colorCode;
            },
			getStateIconClass : function(){
				return data.stateIconClass;
			}
        };
    };
});
