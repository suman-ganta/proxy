/**
 * Created by nisabhar on 11/17/2016.
 */


define(['ojs/ojcore', 'knockout', 'jquery', 'pcs/util/pcsUtil', 'ojs/ojknockout', 'promise'],
    function(oj, ko, $, pcsUtil) {

        'use strict';

        return function(params, componentInfo) {
            var self = this;
			var loggerUtil =  require('pcs/util/loggerUtil');

            var element = componentInfo.element;

            //Used if we add the top breadcrumbs
            self.selectedView = ko.observable('CONSOLE');

            // Track currently selected isntance
            self.selectedInstance = ko.observable({});
            self.selectedInstanceId = ko.observable();


            //Called when console is selected
            self.consoleSelection = function(event, data) {
                loggerUtil.log('consoleSelection');
                $('#pcs-dp-mgmt-dplist', element).hide();
                $('#pcs-dp-mgmt-dpdetail', element).hide();
                self.selectedView('CONSOLE');
            };

            // Called when listing is selected
            self.listingSelection = function(event, data) {
                loggerUtil.log('listingSelection');
                $('#pcs-dp-mgmt-dplist', element).show(('puff', 1));
                $('#pcs-dp-mgmt-dpdetail', element).hide(('fade', 1));
                self.selectedView('LISTING');
            };

            // Called when details is selected
            self.detailSelection = function(event) {
                var instanceId = event.detail.instanceId;
                var instanceItem = event.detail.instanceItem;

                self.selectedInstanceId(instanceId);
                self.selectedInstance(instanceItem);

                $('#pcs-dp-mgmt-dplist', element).hide(('fade', 1));
                $('#pcs-dp-mgmt-dpdetail', element).show();
                self.selectedView('DETAILS');
            };


            self.bindingsApplied = function() {
                //Event fired by dplist
                pcsUtil.eventHandler.addHandler(element, 'dplist:instanceSelect', self.detailSelection);

                //Event fired by instance Detail
                pcsUtil.eventHandler.addHandler(element, 'dpdetail:closeView', self.listingSelection);

            };

            //Dispose the computed,sbsrciption,event http://knockoutjs.com/documentation/component-binding.html
            self.dispose = function() {
                loggerUtil.log('dispose in dpmgmt');
                pcsUtil.eventHandler.removeHandler(element, 'dplist:instanceSelect', self.detailSelection);
                pcsUtil.eventHandler.removeHandler(element, 'dpdetail:closeView', self.listingSelection);

            };

            // Temp call the bindingApplied for knockout component
            self.bindingsApplied();
        };
    }
);
