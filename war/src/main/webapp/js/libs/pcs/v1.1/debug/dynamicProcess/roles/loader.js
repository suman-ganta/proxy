define(['ojs/ojcore','knockout', '!text!pcs/dynamicProcess/roles/view/dpRoles.html',
		'./viewModel/dpRolesVM', './viewModel/dpRolesDetailVM', '!text!pcs/dynamicProcess/roles/view/dpRolesDetail.html'],

    function(oj, ko, rolesView, rolesViewModel, rolesDetailVM,rolesDetailView) {
        'use strict';
        //oj.Composite.register('pcs-dproles', {
        //    view: {
        //        inline: view
        //    },
        //    viewModel: {
        //        inline: viewModel
        //    },
        //    metadata: {
        //        inline: JSON.parse(metadata)
        //    }
        //});

		// register the details
		if (!ko.components.isRegistered('pcs-dproles-details')) {
			ko.components.register('pcs-dproles-details', {
				template: rolesDetailView,
				viewModel: {
					createViewModel: function(params, componentInfo) {
						return new rolesDetailVM(params, componentInfo);
					}
				}
			});
		}


		if (!ko.components.isRegistered('pcs-dproles')) {
			ko.components.register('pcs-dproles', {
				template: rolesView,
				viewModel: {
					createViewModel: function(params, componentInfo) {
						return new rolesViewModel(params, componentInfo);
					}
				}
			});
		}


    }
);
