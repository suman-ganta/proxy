/**
 * Created by srayker on 01/12/2016.
 */

define(['ojs/ojcore', 'knockout', 'jquery','!text!pcs/charts/unifiedCharts/templates/pcs-unified-container.html',
		'pcs/util/pcsUtil', 'pcs/util/loggerUtil','ojs/ojknockout', 'ojs/ojtabs' , 'ojL10n!pcs/resources/nls/dashboardResource' ,
		'pcs/pcs.visualization', 'pcs/pcs.dashboard', 'jqueryui-amd/widget'],
	function( oj, ko, $, tmpl,pcsUtil) {
		'use strict';
		// define your widget under pcs namespace
		$.widget('pcs.unifiedCharts', {
            //Options to be used as defaults
            options: {
				processTrackingPage: 'processTracking.jspx',
				tasksPage          : 'worklist.jspx'
            },

			/**
			 * Creates basic auth header for given username and password
			 */
			_authHeader: function () {
				return pcsUtil.getAuthInfo();
			},

            //Setup widget (eg. element creation, apply theming
            // , bind events etc.)
            _create: function () {
                // _create will automatically run the first time
                // this widget is called. Put the initial widget
                // setup code here, then you can access the element
                // on which the widget was called via this.element.
                // The options defined above can be accessed
                // via this.options this.element.addStuff();
                var widget = this;

				function Model() {
					var self = this;
					self.bundle = require('ojL10n!pcs/resources/nls/dashboardResource');
				}

				var vm = new Model();

                this.element.html(tmpl);
                //bind your ViewModel for the content of whole page body.
                ko.applyBindings(vm, this.element['0']);

                $('#bpm-charts-dash').dashboard({
                	authInfo : widget._authHeader(),
					processTrackingPage: widget.options.processTrackingPage,
					tasksPage          : widget.options.tasksPage
                });
                $('#bpm-charts-vis').visualization({
                	authInfo : widget._authHeader(),
					processTrackingPage: widget.options.processTrackingPage,
					tasksPage          : widget.options.tasksPage
                });
            },



            // Respond to any changes the user makes to the option method
            _setOption: function (key, value) {
                this.options[key] = value;

                // For UI 1.8, _setOption must be manually invoked
                // from the base widget
                $.Widget.prototype._setOption.apply(this, arguments);
                // For UI 1.9 the _super method can be used instead
                // this._super( "_setOption", key, value );
            }
        });
    });
