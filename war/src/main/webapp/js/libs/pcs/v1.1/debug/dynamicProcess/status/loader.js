/**
 * Created by nisabhar on 11/17/2016.
 */



define(['ojs/ojcore','knockout',  '!text!pcs/dynamicProcess/status/view/statusView.html', './viewModel/statusVM'],

    function(oj,ko, view, viewModel) {
        'use strict';
        // oj.Composite.register('pcs-dpstatus', {
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

        if (!ko.components.isRegistered('pcs-dpstatus')) {
            ko.components.register('pcs-dpstatus', {
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
