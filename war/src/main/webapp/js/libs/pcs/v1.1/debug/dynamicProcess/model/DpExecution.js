/**
 * Created by nisabhar on 1/18/2017.
 */


define(['ojs/ojcore','pcs/util/pcsUtil', 'pcs/util/dateUtil'], function(oj,pcsUtil,dateUtil) {
    'use strict';
    return function(data) {

    	var self = this;
		//Set the resourcebundle
		self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

        // if(data.activityType === 'stage'){
		// 	data.activityType = 'pcsprocess';
		// }

        //Set Icon Class
        var activityType = data.activityType.toLowerCase();
        if (activityType === 'humanTask'.toLowerCase() || activityType === 'task' || activityType === 'pcsTask'.toLowerCase()) {
            data.iconClass = 'pcs-dp-act-humantask-icon';
            data.activityTypeDisplayName = 'Human task' ;
        } else if (activityType === 'processTask'.toLowerCase() || activityType === 'process' || activityType === 'pcsProcess'.toLowerCase()) {
            data.iconClass = 'pcs-dp-act-process-icon';
			data.activityTypeDisplayName = 'Process' ;
        } else if (activityType === 'caseTask'.toLowerCase()) {
            data.iconClass = 'pcs-dp-act-case-icon';
			data.activityTypeDisplayName = 'Case' ;
        } else if (activityType === 'stage') {
            data.iconClass = 'pcs-dp-act-stage-icon';
			data.activityTypeDisplayName = 'Stage' ;
        } else if (activityType === 'milestone') {
            data.iconClass = 'pcs-dp-act-milestone-icon';
			data.activityTypeDisplayName = 'Milestone' ;
        }

        // Set displayName for State
        var state = data.state;
        if (state === 'ACTIVE') {
            data.stateDisplayName = self.bundle.pcs.dp.common.running;
			data.statusIconClass = '';
			data.statusBarClass= 'pcs-dp-hist-state-running';
			data.weightage = 2;
        } else if (state === 'COMPLETED') {
            data.stateDisplayName = self.bundle.pcs.dp.common.completed;
            data.statusIconClass = 'pcs-dp-act-completed-icon';
			data.statusBarClass= 'pcs-dp-hist-state-completed';
			data.weightage = 3;
        } else if (state === 'AVAILABLE') {
            data.stateDisplayName = self.bundle.pcs.dp.common.available;
			data.statusIconClass = '';
			data.statusBarClass= 'pcs-dp-hist-state-available';
			data.weightage = 1;
        } else if (state === 'ENABLED') {
            data.stateDisplayName = self.bundle.pcs.dp.common.enabled;
			data.statusIconClass = '';
			data.statusBarClass= 'pcs-dp-hist-state-available';
			data.weightage = 1;
        } else if (state === 'DISABLED') {
            data.stateDisplayName = self.bundle.pcs.dp.common.disabled;
			data.statusIconClass = '';
			data.statusBarClass= 'pcs-dp-hist-state-available';
			data.weightage = 1;
        } else if (state === 'TERMINATED') {
            data.stateDisplayName = self.bundle.pcs.dp.common.terminated;
			data.statusIconClass = 'pcs-dp-act-terminated-icon';
			data.statusBarClass= 'pcs-dp-hist-state-completed';
			data.weightage = 3;
        } else if (state === 'FAILED') {
            data.stateDisplayName = self.bundle.pcs.dp.common.failed;
			data.statusIconClass = 'pcs-dp-act-failed-icon';
			data.statusBarClass= 'pcs-dp-hist-state-running';
			data.weightage = 2;
        } else {
            data.stateDisplayName = state;
			data.weightage = 0;
        }

		//Set history drill down boolean
		var drillDown = false;
		if (data.state === 'ACTIVE' || data.state === 'COMPLETED' || data.state === 'TERMINATED') {
			activityType = data.activityType.toLowerCase();
			if (activityType !== 'stage' && activityType !== 'milestone') {
				drillDown = true;
			}
		}
		data.showHistoryDrillDown = drillDown;

        //Create actionsList
        var availableActions = data.availableActions;
        var actionsList = [];
		if(data.showHistoryDrillDown){
			var action = {
				//NOTE : Do not forget to add in actiitYView, in action dropdown
				actionDisplayName: 'Open',
				action: 'drilldown',
				executionId: data.executionId,
				activityName: data.activityName,
				activityId : data.activityId,
				activityType : data.activityType
			};
			actionsList.push(action);
		}
        if (availableActions) {
            availableActions.forEach(function(item, index) {
                var actionDisplayName = item;
                if (item === 'manual-start') {
                    actionDisplayName = self.bundle.pcs.dp.common.start;
                } else if (item === 'disable') {
                    actionDisplayName = self.bundle.pcs.dp.common.disableTxt;
                } else if (item === 'reenable') {
                    actionDisplayName = self.bundle.pcs.dp.common.enableTxt;
                } else if (item === 'complete') {
                    actionDisplayName = self.bundle.pcs.dp.common.forceComplete;
                } else if (item === 'reactivate') {
                    actionDisplayName = self.bundle.pcs.dp.common.retry;
                }
                var action = {
                	//NOTE : Do not forget to add in actiitYView, in action dropdown
                    actionDisplayName: actionDisplayName,
                    action: item,
                    executionId: data.executionId,
                    activityName: data.activityName,
					activityId : data.activityId,
					activityType : data.activityType
                };
                actionsList.push(action);
            });
        }

        data.actionsList = actionsList;


		//stor the server dates
		data.serverEndTime = data.endTime;
		data.serverCreateTime = data.createTime;

		//convert dates into local timezone
		data.endTime = dateUtil.getDateInUserTimezone(data.serverEndTime);
		data.createTime =  dateUtil.getDateInUserTimezone(data.serverCreateTime);


        //set date specific variables
        data.duration = dateUtil.getTimeDurationTxt(data.durationInMillis);
        data.endTimeFormatted = dateUtil.getFormattedDate(data.endTime);
        data.createTimeFormatted = dateUtil.getFormattedDate(data.createTime);


		if (data.state === 'ACTIVE' || data.state === 'FAILED') {
			data.infoText = 'Started on ' +  data.createTimeFormatted;
		}else if(data.state === 'AVAILABLE' || data.state === 'ENABLED' || data.state === 'DISABLED'){
			data.infoText = 'Available for starting';
		}

        return {
            data: data,
            toString: function() {
                return data.activityName + data.stageName; //+ data.activityDescription;
            },
            getId: function() {
                return data.id;
            },
			getParentProcessActivityInstanceId: function() {
				return data.parentProcessActivityInstanceId;
			},
			getActivityId: function() {
				return data.activityId;
			},
			getActivityName: function() {
				return data.activityName;
			},
            getActivityDescription: function() {
                return ''; //data.activityDescription;
            },
			getActivityType: function() {
				return data.activityType;
			},
			getActivityTypeDisplayName: function() {
				return data.activityTypeDisplayName;
			},
            getProcessDefinitionId: function() {
                return data.processDefinitionId;
            },
            getProcessInstanceId: function() {
                return data.processInstanceId;
            },
			getExecutionId: function() {
				return data.executionId;
			},
            getUserId: function() {
                return data.userId === '' || data.userId === null ? '' : data.userId;
            },
			getInfoText : function(){
				return data.infoText;
			},

            //Dates
            getExecutionCreatedDate: function() {
                return data.createTime;
            },
			getExecutionCompletedDate: function() {
                return data.endTime;
            },
			getExecutionCreatedDateFormatted: function() {
				return data.createTimeFormatted;
			},
			getExecutionCompletedDateFormatted: function() {
				return data.endTimeFormatted;
			},
            getTotalTime: function() {
                return data.durationInMillis;
            },
            getDuration: function() {
                return data.duration;
            },

            getDisplayState: function() {
                var suffix = '';
                var retVal;
                if (this.getExecutionCompletedDate().length > 0) {
                    suffix = ': ';
                }
                retVal = data.stateDisplayName;
                return retVal + suffix;
            },

            getAvailableActions: function() {
                return data.actionsList;
            },
            isRequired: function() {
                return data.required;
            },
            getState: function() {
                return data.state;
            },
			getStatusIconClass : function (){
				return data.statusIconClass ;
			},
			getStateDisplayName :function (){
				return data.stateDisplayName;
			},
            getWeightage: function() {
                return data.weightage;
            },
            // local variables
            getIconClass: function() {
                return data.iconClass;
            },
			getStatusBarClass : function(){
				return data.statusBarClass;
			},
            showHistoryDrillDown: function() {
                return data.showHistoryDrillDown;
            },
            getRunningInfoText: function() {
                return '';
            },
			setStageName: function(stageName){
				data.stageName = stageName;
			},
			getStageName: function(){
				return data.stageName;
			}
        };
    };
});
