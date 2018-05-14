/**
 * Created by nisabhar on 3/17/2016.
 */
requirejs.config({
	urlArgs: "bust=1526153198931",
    waitSeconds : 30,
    config: {
        text: {
          useXhr: function (url, protocol, hostname, port) {
            return true;
          }
        }
    },
    // Path mappings for the logical module names
	paths:
		{
			'knockout': 'libs/knockout/knockout-3.4.0',
			'jquery': 'libs/jquery/jquery-3.1.1.min',
			'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
			'promise': 'libs/es6-promise/es6-promise-4.0.5.min',
			'hammerjs': 'libs/hammer/hammer-2.0.8.min',
			'underscore' : 'libs/underscore/underscore-1.8.3.min',
			'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
			'ojs': 'libs/oj/v3.2.0/min',
			'ojL10n': 'libs/oj/v3.2.0/ojL10n',
			'ojtranslations': 'libs/oj/v3.2.0/resources',
			'signals': 'libs/js-signals/signals.min',
			'text': 'libs/require/text',
			'customElements': 'libs/webcomponents/CustomElements.min',
			'proj4': 'libs/proj4js/dist/proj4',
			'pcs' : 'libs/pcs/v1.1/debug'
		},

	// Shim configurations for modules that do not expose AMD
	shim: {
		'jquery': {
			exports: ['jQuery', '$']
		}
	}
});


    require(['jquery', 'pcs/pcs.startform'],
        function ($) { // this callback gets executed when all required modules are loaded

            var pcsUtil = require('pcs/util/pcsUtil');

            // Read url parameters
            var options = pcsUtil.getUrlParametersObject();

            //replace:internaljs
            $.pcsConnection = {
                serverURL: 'http://localhost:7001/p/proxy'
                //authInfo: 'Basic d2VibG9naWM6d2VibG9naWMx'
            };

            if ($.isEmptyObject(options) || $.isEmptyObject(options.startformData)) {
                options = {
                    startformData: {
                        processDefId: 'oracleinternalpcs~Basic_Form_Approval!1.0~FormApprovalProcess',
                        processName: 'FormApprovalProcess',
                        serviceName: 'FormApprovalProcess.service',
                        title: 'Form Approval',
                        description: 'StartFormApp description',
                        operation: 'submitRequest'
                    }
                }
            }
            ;
            //endreplace

            var element = $("#startform");
            var loadComponent = function () {
                element.startform(options);
            };

            pcsUtil.initComponentForIFrame(options, loadComponent, element);
        }
    );