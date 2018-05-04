/**
 * Created by srayker on 9/12/2016.
 */

define(['ojs/ojcore', 'knockout', 'jquery', '!text!pcs/tasksearch/templates/tasksearchContainer.html', '!text!pcs/tasklistActions/templates/pcs-task-actions.html',
		'pcs/tasksearch/viewModel/taskSearchVM','pcs/tasklistActions/viewModel/taskActionsVM',
		'pcs/pcs.taskactions', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojbutton', 'ojs/ojmenu', 'ojs/ojtoolbar',
		'ojL10n!pcs/resources/nls/pcsSnippetsResource'],
    function(oj, ko, $, taskSearchView, taskActionsView,taskSearchVM,taskActionsVM) {
        'use strict';

        function TasklistActionsViewModel(params, componentInfo) {

            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');

            self.rootElement = $(componentInfo.element);
            //Set the resourcebundle
            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');
            var options = {
                formatType: 'date',
                pattern: 'MMM d,h:mm a'
            };
            var dateConverter = oj.Validation.converterFactory('datetime').createConverter(options);
            self.refreshDate = ko.observable(dateConverter.format(oj.IntlConverterUtils.dateToLocalIso(new Date())));
            var srtDirection = params.selectedSortOrder.substring(0, (params.selectedSortOrder.length - 6)); //direction of sort 'ascending' or 'descending'
            self.sortTasksBy = [{
                id: 'dueDate',
                label: self.bundle.pcs.tasklist.dueDate
            }, {
                id: 'fromUserDisplayName',
                label: self.bundle.pcs.tasklist.fromUserDisplayName
            }, {
                id: 'processName',
                label: self.bundle.pcs.tasklist.processName
            }, {
                id: 'assignedDate',
                label: self.bundle.pcs.tasklist.assignedDate
            }, {
                id: 'updatedDate',
                label: self.bundle.pcs.tasklist.updatedDate
            }, {
                id: 'priority',
                label: self.bundle.pcs.tasklist.priority
            }, {
                id: 'title',
                label: self.bundle.pcs.tasklist.title
            }];

            //Prepare the title text for Sort
            function getSortTitleTxt(srtDirection) {
                return self.bundle.pcs.tasklist.sortTitleTxt + ' ' + self.bundle.pcs.tasklist[srtDirection];
            }

            function registerChildComponents() {
                if (!ko.components.isRegistered('task-search')) {
                    ko.components.register('task-search', {
                        template: taskSearchView,
                        viewModel: {
                            createViewModel: function(params, componentInfo) {
                                return new taskSearchVM(params, componentInfo);
                            }
                        }
                    });
                }
                if (!ko.components.isRegistered('task-actions')) {
                    ko.components.register('task-actions', {
                        template: taskActionsView,
                        viewModel: {
                            createViewModel: function(params, componentInfo) {
                                return new taskActionsVM(params, componentInfo);
                            }
                        }
                    });
                }
            }

            self.hideFilter = params.hideFilter;
            self.hideSystemActions = params.hideSystemActions;
            self.hideCustomActions = params.hideCustomActions;
            self.hideSearch = params.hideSearch;
            self.hideSort = params.hideSort;
            self.hideRefresh = params.hideRefresh;
            self.hideSelectAll = params.hideSelectAll;
            self.currentSort = ko.observableArray([params.selectedSortType]);
            self.sortTitleTxt = ko.observable(getSortTitleTxt(srtDirection));
            self.isTaskSelected = ko.observable(false);
            self.keywordSearchString = ko.observable('');
            self.isSelected = ko.observableArray([]);
            self.taskactionParams = {
                hideSystemActions: params.hideSystemActions,
                hideCustomActions: params.hideCustomActions,
                systemActions: params.systemActions
            };
            self.tasklistFilter = params.tasklistFilter;

            function init() {
                self.rootElement.trigger('tasklistAction:sortSelect', [self.currentSort()[0], srtDirection]);
                //registering task actions component
                registerChildComponents();
                //$('#taskactions').taskactions(self.taskactionParams);
            }

            //call init function on startup
            init();

            function handleTaskSelect(event, taskList) {
                if (!taskList) {
                    return;
                }
                var selectedTasks = taskList.filter(function(item) {
                    return item.isSelected();
                });
                self.isTaskSelected(selectedTasks.length > 0);
            }

            function handleSelect() {
                self.isSelected([]);
            }

            function handleSubmit(event, actionId) {
                self.isSelected([]);
				var actionLabel = self.bundle.pcs.taskActions[actionId]?self.bundle.pcs.taskActions[actionId]:actionId.toLowerCase();

				var msg = self.bundle.pcs.taskActions.actionPerformed;
                msg = oj.Translations.applyParameters(msg, {
                    '0': actionLabel
                });
                $('#pcs-tl-action-success-msg', self.rootElement).text(msg);
                $('#pcs-tl-action-success-msg-container', self.rootElement).show().delay(5000).fadeOut(2000);
            }

            /* Event Handlers */
            //TODO nisabhar
            $(document).on('tasklist:taskCheck', handleTaskSelect);
            //Event Handler for event TaskSelected

            //TODO nisabhar
            $(document).on('tasklist:taskSelect', handleSelect);

            //TODO nisabhar
            $(document).on('taskAction:submit', handleSubmit);

            //Event handler for click of Left Menu display button
            //Fires event ToggleLeftMenu
            self.onLeftMenuBtnClick = function() {
                self.rootElement.trigger('tasklistAction:leftMenuSelect', []);

            };

            //Event handler for click of Refresh button
            //Fires event RefreshTaskList
            self.onRefreshBtnClick = function() {
                var isoDate = oj.IntlConverterUtils.dateToLocalIso(new Date());
                self.refreshDate(dateConverter.format(isoDate));
                self.rootElement.trigger('tasklistAction:refresh', [isoDate, self.currentSort()[0], srtDirection]);
                self.isSelected([]);
            };

            //Event handler for option change of Sort
            //Fires event SortOptionChange
            self.onSortOptionChange = function(event, data) {
                if (data.option === 'value') {
                    var selectedSort = data.value[0];
                    self.rootElement.trigger('tasklistAction:sortSelect', [selectedSort, srtDirection]);
                }
            };

            //Event handler for click of Direction button
            //Fires SortOrderChange event
            self.onDirectionBtnClick = function(data, event) {
                srtDirection = srtDirection === 'asc' ? 'desc' : 'asc';
                var icon = srtDirection === 'asc' ? 'oj-fwk-icon pcs-tl-sorta-icon' : 'oj-fwk-icon pcs-tl-sortd-icon';
                $(event.currentTarget).ojButton('option', 'icons.start', icon);
                self.sortTitleTxt(getSortTitleTxt(srtDirection));
                self.rootElement.trigger('tasklistAction:sortSelect', [self.currentSort()[0], srtDirection]);
            };

			self.isSelectedSubscription = self.isSelected.subscribe(function(newValue) {
                self.rootElement.trigger('tasklistAction:selectAll', [newValue.length > 0]);

            });

			/**
			 * method to clean up everything
			 */
			self.dispose = function() {
				loggerUtil.log('dispose in tasklistToolbarVM');
				self.isSelectedSubscription.dispose();

				// clean up the events
			};
        }

        return TasklistActionsViewModel;

    });
