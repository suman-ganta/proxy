/**
 * Created by nisabhar on 5/9/2016.
 */

define(['ojs/ojcore', 'knockout', 'pcs/taskdetail/services/taskdetailDataService','pcs/util/pcsUtil', 'pcs/util/dateUtil', 'ojs/ojknockout'],
    function(oj, ko, services, pcsUtil,dateUtil) {
        'use strict';
        /**
         * The view model for the main content view template
         */
        function TaskHistoryContainer(params) {
            var self = this;
            self.taskNumber = params.taskNumber;
            self.rootElement = params.rootElement;

            //list of available history
            self.taskHistory = ko.observableArray([]);

            self.initTaskHistory = function() {
                services.getTaskHistory(self.taskNumber).done(
                    function(data, textStatus, jqXHR) {
                        $('#pcs-td-history-error', self.rootElement).hide();
                        self.populateTaskHistory(data);
                    }
                ).fail(
                    function(jqXHR) {
                        $('#pcs-td-history-error', self.rootElement).show();
                    }
                );
            };

            self.populateTaskHistory = function(data) {
                //clear old history
                self.taskHistory.removeAll();

                var historyList = data.taskHistory;
                if (historyList) {
                    for (var i = 0; i < historyList.length; i++) {
                    	var updatedDate =  dateUtil.getDateInUserTimezone(historyList[i].updatedDate);
						var updatedDateFormatted = dateUtil.getFormattedDate(updatedDate);
                        var item = {
                            displayName: historyList[i].displayName,
                            actionName: historyList[i].actionName,
                            updatedDate: updatedDate,
                            secondLine: historyList[i].actionName + ', ' + updatedDateFormatted
                        };
                        self.taskHistory.push(item);
                    }
                    self.taskHistory.reverse();
                }
            };

            // Defining the event listeners --
            self.rootElement.on('taskdetail:commentAdded', function(event, comment) {
                self.initTaskHistory();
            });

			self.rootElement.on('taskdetail:attachmentUploaded', function(event, comment) {
				self.initTaskHistory();
			});

			self.rootElement.on('taskdetail:attachmentRemoved', function(event, comment) {
				self.initTaskHistory();
			});

            self.initTaskHistory();
        }
        return TaskHistoryContainer;
    });
