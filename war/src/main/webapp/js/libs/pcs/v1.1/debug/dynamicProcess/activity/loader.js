/**
 * Created by nisabhar on 11/17/2016.
 */



define(['ojs/ojcore','knockout', '!text!pcs/dynamicProcess/activity/view/dpActivityView.html', './viewModel/dpActivityVM'],

    function(oj,ko, view, viewModel) {
        'use strict';
        // oj.Composite.register('pcs-dpactivity', {
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

        if (!ko.components.isRegistered('pcs-dpactivity')) {
            ko.components.register('pcs-dpactivity', {
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
