/**
 * Created by nisabhar on 11/17/2016.
 */


define(['ojs/ojcore', 'knockout', 'jquery', 'underscore', 'pcs/dynamicProcess/services/DPDetailService', 'pcs/util/dateUtil', 'ojs/ojknockout', 'promise', 'ojs/ojpopup', 'ojs/ojtimeline',
		'ojL10n!pcs/resources/nls/pcsSnippetsResource'],
    function(oj, ko, $, _, InstanceDetail, dateUtil) {
        'use strict';

        return function(params, componentInfo) {
            var self = this,
                service, timelineComponents, timelineTotWidth;

			var loggerUtil =  require('pcs/util/loggerUtil');

            var element = componentInfo.element;
            self.properties = params;

            var eventsMinDistance = 40;
            var minDistanceFactor = 4;

            self.selectedView = ko.observable('');
            self.instanceId = ko.observable();
            self.startDate = ko.observable();
            self.popupData = ko.observable();
            self.stagePopupData = ko.observable();
            self.graphStartDate = ko.observable();
            self.graphEndDate = ko.observable();
            self.isMilestoneVisible = ko.observable(true);
            self.isStageVisible = ko.observable(true);
            self.isTimelineVisible = ko.observable(false);


            // List of actvities for this  instance
            self.completedMilestones = ko.observableArray([]);
            self.completedTimeEvents = ko.observableArray([]);
            self.incompleteMilestones = ko.observableArray([]);
            self.stages = ko.observableArray([]);

			self.views = ko.observableArray([]);



            //attribute to hold if the component is standalone or used inside details
            self.isConsumed = ko.observable(false);

            //Set the resourcebundle
            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

            self.populateViews = function () {
				var viewsArray = [
					{
						id: 'milestone',
						label: 'Milestone',
						classes: 'dp-milestone-icon',
						isVisible: self.isMilestoneVisible(),
						isEmpty : ko.observable(false)
					},
					{
						id: 'stage',
						label: 'Stage',
						classes: 'dp-stages-icon',
						isVisible: self.isStageVisible(),
						isEmpty : ko.observable(false)
					},
					{
						id: 'timeline',
						label: 'Milestone-Timeline',
						classes: 'dp-timeline-icon',
						isVisible: self.isTimelineVisible(),
						isEmpty : ko.observable(false)
					}
				];
				//Set the first visible view as selected view
				var visibleViews = _.filter(viewsArray, {isVisible: true});
				if (!_.isEmpty(visibleViews)){
					self.views(visibleViews);
					self.selectedView(visibleViews[0]['id']);
				}
			}

            // The props field on context is a Promise. Once that resolves,
            // we can access the properties that were defined in the composite metadata
            // and were initially set on the composite DOM element
            // context.props.then(function(properties) {
            //     self.properties = properties;
            //     self.initContex();
            // });

            self.initContext = function() {
                service = InstanceDetail.getInstance();
                var promises = [];

                if (self.properties.instanceid === undefined) {
                    return;
                }

                // check if instanceId is observable or plain variables
                if (ko.isObservable(self.properties.instanceid)) {
                    self.instanceId(self.properties.instanceid());
                } else {
                    self.instanceId(self.properties.instanceid);
                }

                //check if instanceId is passed or not
                if (self.instanceId() === '') {
                    return;
                }

                //set the param about how the component is being used
                if (self.properties.consumed) {
                    self.isConsumed(self.properties.consumed);
                }


                if (self.properties.instanceitem) {
                    if (ko.isObservable(self.properties.instanceitem)) {
                        self.populateData(self.properties.instanceitem());
                    } else {
                        self.populateData(self.properties.instanceitem);
                    }
                } else {
                    promises.push(self.fetchInstanceDetail());
                }

                if (self.properties.activities) {
                    if (ko.isObservable(self.properties.activities)) {
                        prepareData(self.properties.activities());
                        prepareTimelineData(self.properties.activities());
                        prepareStagesData(self.properties.activities());
                    } else {
                        prepareData(self.properties.activities);
                        prepareTimelineData(self.properties.activities);
                        prepareStagesData(self.properties.activities);
                    }
                } else {
                    promises.push(self.fetchExecutionList());
                }

                //Resolve all the promises
				resolvePromises(promises);

                self.isTimelineVisible(self.properties.showTimeline || false);
				self.isStageVisible(self.properties.showStages || false);
				self.isMilestoneVisible(self.properties.showMilestones || false);

                //Days converter
                var options = {
                    formatType: 'date',
                    pattern: 'MMM dd'
                };
                self.daysConverter = oj.Validation.converterFactory('datetime').createConverter(options);
            };


            //Method to populate instance detail data
            self.populateData = function(instanceitem) {
                if (instanceitem) {
                    self.startDate(instanceitem.getInstanceCreatedDate());
                }

            };

            //Method to do AJAX call to get instance detail
            self.fetchInstanceDetail = function() {
                return service.fetchInstanceItem(true, self.instanceId());
            };


            //Method to fetch  activities
            self.fetchExecutionList = function() {
                var param = {
                    'processInstanceId': self.instanceId()
                };
                return service.fetchExecutionList(true, param);
            };

            function prepareData(data) {

            	if(data.length === 0){
            		return;
				}
                //clean old activites
                self.completedMilestones.removeAll();
                self.incompleteMilestones.removeAll();

                //Filter Completed milestones
                var completedArr = data.filter(function(item) {
                    return item.getExecutionCompletedDate() !== '' && item.getExecutionCompletedDate() !== null && item.getActivityType() === 'milestone';
                });
                //Sort the Activities by Completed Date
                completedArr = completedArr.sort(function(a, b) {
                    return compareValue(a.getExecutionCompletedDate(), b.getExecutionCompletedDate());
                });
                ko.utils.arrayPushAll(self.completedMilestones, completedArr);

                //Filter incomplete Activities
                var incompleteArr = data.filter(function(item) {
                    return (item.getExecutionCompletedDate() === '' || item.getExecutionCompletedDate() === null) && item.getActivityType() === 'milestone';
                });
                //Sort the incomplete activities by Creation date
                incompleteArr = incompleteArr.sort(function(a, b) {
                    return compareValue(a.getExecutionCreatedDate(), b.getExecutionCreatedDate());
                });
                ko.utils.arrayPushAll(self.incompleteMilestones, incompleteArr);

                updateUI();
            }

            function prepareTimelineData(data) {

				if(data.length === 0){
					return;
				}
                //Filter Completed milestones
                var completedArr = data.filter(function(item) {
                    return item.getExecutionCompletedDate() !== '' && item.getExecutionCompletedDate() !== null && item.getActivityType() === 'milestone';
                });

                //Sort the Activities by Completed Date
                completedArr = completedArr.sort(function(a, b) {
                    return compareValue(a.getExecutionCompletedDate(), b.getExecutionCompletedDate());
                });

                //Set the graph start date to previous day of DP start date
				var startDate = new Date(self.startDate());
				startDate.setDate(startDate.getDate() - 1);
				self.graphStartDate(startDate.toISOString());

                //set the graph end date
				var tomorrowDate = new Date();
				tomorrowDate.setDate(tomorrowDate.getDate() + 1);
				self.graphEndDate(tomorrowDate.toISOString());

                //get the last milestone date
                if (completedArr.length > 0) {
                    var lastMilestoneDate = new Date(completedArr[completedArr.length - 1].getExecutionCompletedDate());
                    //Date after last milestone date
                    lastMilestoneDate.setDate(lastMilestoneDate.getDate() + 1);
                    var endDate = lastMilestoneDate.getTime() > self.getCurrentDateFormatted() ? lastMilestoneDate : tomorrowDate;
                    self.graphEndDate(endDate.toISOString());
                }

                var graphData = completedArr.map(function(item) {
                    var arrItem = {};
                    arrItem.id = item.getId();
                    arrItem.title = item.getActivityName();
                    arrItem.description = 'Activity : ' + item.getActivityTypeDisplayName() + '\n' +
                        ', Duration : ' + item.getDuration();
                    arrItem.start = item.getExecutionCompletedDate();
                    return arrItem;
                });
				graphData.unshift({id:'start', title: self.bundle.pcs.dp.milestone.start, start: new Date(self.startDate()).getTime()});
				graphData.unshift({id:'today', title: self.bundle.pcs.dp.milestone.today, start: new Date().getTime()});
                ko.utils.arrayPushAll(self.completedTimeEvents, graphData);
            }

            function hideStageDisplay(hide){
				$.each(self.views(),function(index,item){
					if(item.id === 'stage'){
						item.isEmpty(hide)
					}

				});
				var btnSet = $('#pcs-milestone-view-switch',element);
				if(oj.Components.getWidgetConstructor(btnSet, 'ojButtonset') ){
					btnSet.ojButtonset( "refresh" );
				}
			}

            function prepareStagesData(data) {
				if(data.length === 0){
					hideStageDisplay(true);
					return;
				}
                self.stages([]);
                //Variable saves
                self.stageTaskStatus = {};
                //Filter Stages from the data
                var stagesArr = data.filter(function(item) {
                    if (item.getActivityType() === 'stage') {
						var currentTime = (new Date()).getTime();
						var completedTime = (new Date(item.getExecutionCompletedDate())).getTime();
						var timeAgoMillis = currentTime - completedTime;
						var completedOnStr = self.bundle.pcs.dp.milestone.completedAgo.replace('{0}', dateUtil.getTimeDurationTxt(timeAgoMillis));
						self.stageTaskStatus[item.getExecutionId()] = {
                            completed: 0,
                            active: 0,
                            available: 0,
							completedOn: completedOnStr
                        };
                        return true;
                    } else {
                        return false;
                    }
                });

				if(!stagesArr || stagesArr.length === 0){
					hideStageDisplay(true);
				}else{
					hideStageDisplay(false);
				}

                //Calculate the number of completed,active,available tasks for each stage
                data.map(function(item) {
                	//retrieve the stage object relating to a activity
                    var stageObj = self.stageTaskStatus[item.getParentProcessActivityInstanceId()];
                    //ensure activity is not a milestone
                    if (stageObj && item.getActivityType() !== 'milestone') {
                        switch (item.getState()) {
                            case 'COMPLETED':
                                stageObj.completed = stageObj.completed + 1;
                                break;
                            case 'ACTIVE':
                                stageObj.active = stageObj.active + 1;
                                break;
							case 'FAILED':
								stageObj.active = stageObj.active + 1;
								break;
							// As we dont show available in activites panel now if it doesnt have any actions ,
							// so we dont show it in status bar
                            // case 'AVAILABLE':
                             //    stageObj.available = stageObj.available + 1;
                             //    break;
                            case 'ENABLED':
                                stageObj.available = stageObj.available + 1;
                                break;
							case 'DISABLED':
								stageObj.available = stageObj.available + 1;
								break;
                        }
                    }
                });

                // Sort the stages by weightage for maintaining display order in stages view
                stagesArr = stagesArr.sort(function(a, b) {
					var x = a.getWeightage(),
						y = b.getWeightage();
					if(x === y){
						if(a.getExecutionCompletedDate() !== '' && a.getExecutionCompletedDate() !== '' ){
							x = a.getExecutionCompletedDate();
							y = b.getExecutionCompletedDate();
						} else if(a.getExecutionCreatedDate() !== '' && a.getExecutionCreatedDate() !== '' ){
							x = a.getExecutionCreatedDate();
							y = b.getExecutionCreatedDate();
						}
					}
					if (x > y) {
						return -1;
					}
					if (x < y) {
						return 1;
					}
					return 0;
                });

                stagesArr = stagesArr.map(function(item) {
                    var css;
                    switch (item.getState()) {
                        case 'COMPLETED':
                            css = 'pcs-stage-completed';
                            break;
                        case 'ACTIVE':
                            css = 'pcs-stage-active';
                            break;
                        case 'AVAILABLE':
                            css = 'pcs-stage-available';
                            break;
                        case 'ENABLED':
                            css = 'pcs-stage-available';
                            break;
                    }
                    var arrItem = {};
                    arrItem.id = 'pcs-stage-' +  item.getActivityName().replace(' ', '') + item.getId();
                    arrItem.label = item.getActivityName();
                    arrItem.title = self.bundle.pcs.dp.detail[item.getState()] + ' : ' + item.getActivityName();
                    arrItem.state = item.getState() === 'ENABLED' ? 'AVAILABLE' : item.getState();
                    arrItem.css = css;
                    arrItem.execId = item.getExecutionId();
                    return arrItem;
                });
                ko.utils.arrayPushAll(self.stages, stagesArr);
            }

            //Compare to sort by date values
            function compareValue(date1, date2) {
                //calculate the time in millis
                var x = (new Date(date1).getTime()),
                    y = (new Date(date2).getTime());
                if (x > y) {
                    return 1;
                }
                if (x < y) {
                    return -1;
                }
                return 0;
            }

            //Implement Lifecyle method to fetch the data after the UI is attached
            self.attached = function() {

            };

            //Select the rendered dom elements to Stylize the completed milestones
            function updateUI() {
                var timelines = $('.cd-horizontal-timeline', element);
                timelines.each(function() {
                    var timeline = $(this, element);
                    timelineComponents = {};
                    //cache timeline components
                    timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
                    timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
                    timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
                    timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('.timelineEvent');
                    timelineComponents['timelineEventsTxt'] = timelineComponents['eventsWrapper'].find('.dateTxt');
                    timelineComponents['milestoneEventsTxt'] = timelineComponents['eventsWrapper'].find('.milestoneTxt');
                    timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');

                    //assign a left postion to the single events along the timeline
                    var totDistanceValue = setDatePosition(timelineComponents, eventsMinDistance);
                    //assign a width to the timeline
                    timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance, totDistanceValue);
                    //the timeline has been initialize - show it
                    timeline.addClass('loaded');
                });
            }

            function resolvePromises(promises){
				if (_.isEmpty(promises)){
					return;
				}

				Promise.all(promises)
					.then(function(response){
						if (response.length === 2) {
							//First object is instance item
							self.populateData(response[0]);
							//Second object is execution list
							prepareData(response[1]);
							prepareTimelineData(response[1]);
							prepareStagesData(response[1]);
						} else if (response.length === 1) {

							if (response[0].hasOwnProperty('getInstanceCreatedDate')){
								//Instance item
								self.populateData(response[0]);
							} else {
								//Execution list
								prepareData(response[0]);
								prepareTimelineData(response[0]);
								prepareStagesData(response[0]);
							}
						}
					})
					.catch(function(error){
						self.showErrorRegion();
					});
			}

            self.showMilestoneInfo = function(data, event) {
                self.popupData(data);
                var popup = $('#pcs-milestone-popup');
                showPopup(popup, event);
            };

            self.stagePopupTemplate = ko.observable();
            self.onStageUIClick = function(data, event) {
            	var template;
                switch(data.state){
					case 'AVAILABLE':
						template = 'stageAvailable';
						break;
					case 'COMPLETED':
						template = 'stageCompleted';
						break;
					default:
						template = 'stageData';
						break;
				}
                self.stagePopupTemplate(template);
                var stageData = self.stageTaskStatus[data.execId];
                self.stagePopupData(stageData);
                var popup = $('#pcs-stage-popup');
                showPopup(popup, event);
            };

            function showPopup(popup, event) {
                var position = {
                    'my': 'center top',
                    'at': 'center bottom',
                    'collision': 'none'
                };
                var id = '#' + event.target.id;
                popup.ojPopup('open', id, position);
                //loggerUtil.log(event.target.id);
            }

            self.clickNext = function(model, event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'next');
            };

            self.clickPrevious = function(model, event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'prev');
            };

            /* *** Third party code ignore jshint warnings *** */
            function updateSlide(timelineComponents, timelineTotWidth, string) {
                //retrieve translateX value of timelineComponents['eventsWrapper']
                var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
                    wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
                //translate the timeline to the left('next')/right('prev')
                if (string === 'next') {
                    translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth);
                } else {
                    translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
                }
            }

            //Update the timeline position to the last completed milestone
            function updateTimelinePosition(string, event, timelineComponents) {
                //translate timeline to the left/right according to the position of the selected event
                var eventStyle = window.getComputedStyle(event.get(0), null),
                    eventLeft = Number(eventStyle.getPropertyValue('left').replace('px', '')),
                    timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
                    timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
                var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

                if ((string === 'next' && eventLeft > timelineWidth - timelineTranslate) || (string === 'prev' && eventLeft < -timelineTranslate)) {
                    translateTimeline(timelineComponents, -eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
                }
            }

            function translateTimeline(timelineComponents, value, totWidth) {
                var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
                value = (value > 0) ? 0 : value; //only negative translate value
                value = ((typeof totWidth !== 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
                setTransformValue(eventsWrapper, 'translateX', value + 'px');
                //update navigation arrows visibility
                if (value === 0) {
                    timelineComponents['timelineNavigation'].find('.prev').addClass('inactive');
                } else {
                    timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
                }
                if (value === totWidth) {
                    timelineComponents['timelineNavigation'].find('.next').addClass('inactive');
                } else {
                    timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
                }
            }

            //Update the filling line of completed milestones
            function updateFilling(selectedEvent, filling, totWidth) {
                //change .filling-line length according to the selected event
                var eventStyle = window.getComputedStyle(selectedEvent.get(0), null);
                var eventLeft = eventStyle.getPropertyValue('left');
                eventLeft = Number(eventLeft.replace('px', ''));
                var scaleValue = (eventLeft + 15) / totWidth;
                setTransformValue(filling.get(0), 'scaleX', scaleValue);
            }

            //Calculate the position for milestones
            function setDatePosition(timelineComponents, min) {
                for (var i = 0, equiDistanceValue = 0; i < timelineComponents['timelineEvents'].length; i++) {
                    timelineComponents['timelineEvents'].eq(i).css('left', (equiDistanceValue * min) + 'px');
                    timelineComponents['timelineEventsTxt'].eq(i).css('left', (equiDistanceValue * min) + 'px');
                    timelineComponents['milestoneEventsTxt'].eq(i).css('left', ((equiDistanceValue * min)) + 'px');
                    equiDistanceValue += minDistanceFactor;
                }
                return equiDistanceValue;
            }

            //Calculate the width for the TimeLine
            function setTimelineWidth(timelineComponents, width, totDistanceValue) {
                var totalWidth = totDistanceValue * width;
                totalWidth = totalWidth < 1160 ? 1160 : totalWidth;
                timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
                var selectedEvent = timelineComponents['eventsWrapper'].find('a.currentDate');
                if (selectedEvent.length !== 0) {
                    updateFilling(selectedEvent, timelineComponents['fillingLine'], totalWidth);
                    updateTimelinePosition('next', selectedEvent, timelineComponents);
                }
                return totalWidth;
            }

            function getTranslateValue(timeline) {
                var timelineStyle = window.getComputedStyle(timeline.get(0), null),
                    timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
                    timelineStyle.getPropertyValue('-moz-transform') ||
                    timelineStyle.getPropertyValue('-ms-transform') ||
                    timelineStyle.getPropertyValue('-o-transform') ||
                    timelineStyle.getPropertyValue('transform'),
                    translateValue = 0;

                if (timelineTranslate.indexOf('(') >= 0) {
                    timelineTranslate = timelineTranslate.split('(')[1];
                    timelineTranslate = timelineTranslate.split(')')[0];
                    timelineTranslate = timelineTranslate.split(',');
                    translateValue = timelineTranslate[4];
                }
                return Number(translateValue);
            }

            function setTransformValue(element, property, value) {
                element.style['-webkit-transform'] = property + '(' + value + ')';
                element.style['-moz-transform'] = property + '(' + value + ')';
                element.style['-ms-transform'] = property + '(' + value + ')';
                element.style['-o-transform'] = property + '(' + value + ')';
                element.style['transform'] = property + '(' + value + ')';
            }


            self.getCurrentDateFormatted = function() {
                return (new Date()).getTime();
            };

            self.onViewClick = function(event, data) {
                if (self.selectedView() === 'timeline') {
                    $('#pcs-dp-timeline').ojTimeline('refresh');
                }

                //workaround as stage gets added in buttonSet later because of isEmpty
                if(!data.value){
					self.selectedView('stage');
				}
            };


            /**
             * When the rest call fails
             */
            self.showErrorRegion = function() {
                $('#pcs-dp-status-error', element).show();
                $('#pcs-dp-status-containor', element).hide();
            };

            // Public method to modify activity list
            // self.modifyActivityList = function(activityList) {
            //     loggerUtil.log('modifying activities');
            //     prepareData(activityList);
            // };

            //subscribe to changes in activity list
            if (self.properties.activities && ko.isObservable(self.properties.activities)) {
                self.activitiesSubscription = self.properties.activities.subscribe(function(newValue) {
                    prepareData(newValue);
                    prepareTimelineData(newValue);
                    prepareStagesData(newValue);
                });
            }

            //subscribe to changes in instanceitem
            if (self.properties.instanceitem && ko.isObservable(self.properties.instanceitem)) {
                self.instanceitemSubscription = self.properties.instanceitem.subscribe(function(newValue) {
                    self.populateData(newValue);
                });
            }

            self.bindingsApplied = function() {
                //temp for Knockoutcomponet
                self.initContext();
                self.populateViews();
            };

            //Dispose the computed,sbsrciption,event http://knockoutjs.com/documentation/component-binding.html
            self.dispose = function() {
                //loggerUtil.log('dispose in status');

                if (self.activitiesSubscription) {
                    self.activitiesSubscription.dispose();
                }

                if (self.instanceitemSubscription) {
                    self.instanceitemSubscription.dispose();
                }

                //De-Subscribe to the events

            };

            // Temp call the bindingApplied for knockout component
            self.bindingsApplied();
        };
    }
);
