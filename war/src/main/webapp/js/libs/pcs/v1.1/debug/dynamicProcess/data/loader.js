/**
 * Created by nisabhar on 11/17/2016.
 */



define(['ojs/ojcore','knockout', '!text!pcs/dynamicProcess/data/view/dpDataView.html', './viewModel/dpDataVM'],

    function(oj, ko,view, viewModel) {
        'use strict';
        // oj.Composite.register('pcs-dpdata', {
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

        if (!ko.components.isRegistered('pcs-dpdata')) {
            ko.components.register('pcs-dpdata', {
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
