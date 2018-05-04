/**
 * Created by nisabhar on 11/17/2016.
 */



define(['ojs/ojcore', 'knockout', '!text!pcs/dynamicProcess/mgmt/view/dpMgmtView.html', './viewModel/dpMgmtVM'],

    function(oj, ko, view, viewModel) {
        'use strict';
        // oj.Composite.register('pcs-dpmgmt', {
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


        if (!ko.components.isRegistered('pcs-dpmgmt')) {
            ko.components.register('pcs-dpmgmt', {
                template: view,
                viewModel: {
                    createViewModel: function(params, componentInfo) {
                        return new viewModel(params, componentInfo);
                    }
                }
            });
        }
    }
);
