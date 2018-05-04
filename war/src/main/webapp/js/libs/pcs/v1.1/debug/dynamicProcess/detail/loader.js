/**
 * Created by nisabhar on 11/17/2016.
 */



define(['ojs/ojcore','knockout', '!text!pcs/dynamicProcess/detail/view/dpDetailView.html', './viewModel/dpDetailVM'],

    function(oj, ko,view, viewModel) {
        'use strict';
        // oj.Composite.register('pcs-dpdetail', {
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


        if (!ko.components.isRegistered('pcs-dpdetail')) {
            ko.components.register('pcs-dpdetail', {
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
