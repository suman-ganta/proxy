/**
 * Created by nisabhar on 11/17/2016.
 */



define(['ojs/ojcore','knockout', '!text!pcs/dynamicProcess/list/view/dpListView.html', './viewModel/dpListVM'],

    function(oj, ko,view, viewModel) {
        'use strict';
        // oj.Composite.register('pcs-dplist', {
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


        if (!ko.components.isRegistered('pcs-dplist')) {
            ko.components.register('pcs-dplist', {
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
