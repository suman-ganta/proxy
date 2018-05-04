/**
 * Created by srayker on 05/23/2016.
 */

requirejs.config(
	{
		shim: {
			'pcs/identityBrowser/viewModel/IdentityViewModel': {
				deps: ['pcs/config/debug-config']
			}
		}
	}
);


define(['ojs/ojcore', 'knockout', '!text!pcs/identityBrowser/view/idBrowser.html', 'pcs/identityBrowser/viewModel/IdentityViewModel'],

    function(oj, ko, view, viewModel) {
        'use strict';
        // oj.Composite.register('pcs-idBrowser', {
        //     view: {
        //         inline: view
        //     },
        //     viewModel: {
        //         inline: viewModel
        //     },
        //     metadata: {
        //         inline: JSON.parse(metadata)
        //     }
        // });

		var loggerUtil =  require('pcs/util/loggerUtil');

        if (!ko.components.isRegistered('pcs-identity-browser')) {
            ko.components.register('pcs-identity-browser', {
                template: view,
                viewModel: {
                    createViewModel: function(params, componentInfo) {
                        return new viewModel(params, componentInfo);
                    }
                }
            });
            loggerUtil.log('pcs-idBrowser registered');
        }
    }
);
