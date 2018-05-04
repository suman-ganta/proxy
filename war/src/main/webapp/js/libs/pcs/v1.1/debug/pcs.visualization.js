/**
 * Created by nisabhar on 11/20/2015.
 */


define(['ojs/ojcore', 'knockout', 'jquery','!text!pcs/charts/visualization/templates/pcs-visualization.html', 'pcs/util/pcsUtil', 'pcs/util/loggerUtil',
	'pcs/charts/visualization/viewModel/visualizationContainer','!text!pcs/charts/visualization/view/visualizationContainer.html',
	'ojs/ojmodule' , 'jqueryui-amd/widget'],
	function( oj, ko, $, tmpl,pcsUtil) {
		'use strict';
		// define your widget under pcs namespace
		$.widget('pcs.visualization', {
			//Options to be used as defaults
			options: {
				//data sources
				baseUri: '',
				baseRestUri : '/bpm/api/3.0/analytics/',
				username : 'weblogic',
				password : 'weblogic1',
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

				this.options.baseUri= pcsUtil.getServerURL();

				function rootViewModel() {
					var self = this;
					self.baseURL = widget.options.baseUri;
					self.baseRestURL = self.baseURL + widget.options.baseRestUri;
					self.processTrackingPage = self.baseURL + widget.options.processTrackingPage;
					self.tasksPage = self.baseURL + widget.options.tasksPage;
					self.authInfo = widget._authHeader(); // Login credentials
					self.rootElement= widget.element;
				}

				var vm = new rootViewModel();

				this.element.html(tmpl);

				//bind your ViewModel for the content of whole page body.
				ko.applyBindings(vm, this.element['0']);
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
