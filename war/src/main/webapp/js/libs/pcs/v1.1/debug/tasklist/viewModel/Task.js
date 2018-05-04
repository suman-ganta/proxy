define(['pcs/util/dateUtil'], function(dateUtil) {
    'use strict';
    return function(data) {

		//store the server dates
		data.serverAssignedDate = data.assignedDate;
		data.serverDueDate = data.dueDate;
		data.serverUpdatedDate = data.updatedDate;
		data.serverCreateDate = data.createdDate;

		//convert to local dates
		data.assignedDate = dateUtil.getDateInUserTimezone(data.serverAssignedDate);
		data.dueDate =  dateUtil.getDateInUserTimezone(data.serverDueDate);
		data.updatedDate = dateUtil.getDateInUserTimezone(data.serverUpdatedDate);
		data.createdDate =  dateUtil.getDateInUserTimezone(data.serverCreateDate);

        return {
            getTitle: function() {
                return data.title;
            },
            getNumber: function() {
                return data.number;
            },
            getFromUser: function() {
                return data.fromUserDisplayName;
            },
            getState: function() {
                return data.state;
            },
            getAssignees: function() {
                return data.assignees.items;
            },
            getCreator: function() {
                return data.creatorName;
            },
            getAssignedDate: function() {
                return data.assignedDate;
            },
            getCreatedDate: function() {
                return data.createdDate;
            },
            getPriority: function() {
                return data.priority;
            },
            getFromUserName: function() {
                return data.fromUserName;
            },
            getFromUserDisplayName: function() {
                return data.fromUserDisplayName;
            },
            getShortSummary: function() {
                return data.shortSummary;
            },
            getDueDate: function() {
                return data.dueDate;
            },
            getProcessName: function() {
                return data.processName;
            },
            getUpdatedDate: function() {
                return data.updatedDate;
            },
            getActionList: function() {
                return data.actionList;
            }
        };
    };
});
