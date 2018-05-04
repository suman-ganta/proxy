/**
 * Created by nisabhar on 11/17/2016.
 */



define(['ojs/ojcore','knockout',  '!text!pcs/dynamicProcess/history/view/dpHistoryView.html', './viewModel/dpHistoryVM'],

    function(oj,ko, view, viewModel) {
        'use strict';
        // oj.Composite.register('pcs-dphistory', {
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

        if (!ko.components.isRegistered('pcs-dphistory')) {
            ko.components.register('pcs-dphistory', {
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
