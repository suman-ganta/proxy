/**
 * Created by nisabhar on 3/11/2016.
 */

define(['ojs/ojcore', 'knockout', 'jquery','ojL10n!pcs/resources/nls/pcsSnippetsResource',
        'pcs/startform/viewModel/startformContainer', 'pcs/util/loggerUtil', 'jqueryui-amd/widget'
    ],
    function(oj, ko, $, bundle, startform, loggerUtil) {
        'use strict';
        // define your widget under pcs namespace
        var tmpl = '<div id=\"pcs-startform-mainContainer\" class=\"oj-row oj-panel\"><div style=\"display:none\" id=\"pcs-startform-discard-dialog\" class=\"pcs-startform-discard-dialog\" data-bind=\"attr : { title : bundle.pcs.startform.dialog_confirm }, ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\'}\"><div class=\"oj-dialog-body\"><div data-bind=\"text : bundle.pcs.startform.dialog_discard_msg\"\/><\/div><div class=\"oj-dialog-footer\"> <button data-bind=\"click : yesDiscardDialog , ojComponent: {component: \'ojButton\', label: bundle.pcs.startform.dialog_yes}\"><\/button> <button data-bind=\"click : noDiscardDialog , ojComponent: {component: \'ojButton\', label: bundle.pcs.startform.dialog_no}\"><\/button><\/div><\/div><h1><div id=\"pcs-startform-title\" class=\"pcs-startform-title\" data-bind=\"text :startformData.title\"><\/div><\/h1><div id=\"pcs-startform-description\" class=\"pcs-startform-description\" data-bind=\"text:startformData.description\" style=\"margin-bottom: 20px\"><\/div><div class=\"oj-sm-text-align-end\" id=\"pcs-startform-button-bar\"> <button id=\"pcs-startform-submit\" data-bind=\"ojComponent: { component:\'ojButton\', label: submitLabel, chroming: \'full\', }, click :submitForm\"> <\/button> <button id=\"pcs-startform-save\" data-bind=\"ojComponent: { component:\'ojButton\', label: bundle.pcs.startform.save, chroming: \'full\', } , click :saveForm\"> <\/button> <button id=\"pcs-startform-discard\" data-bind=\"ojComponent: { component:\'ojButton\', label: bundle.pcs.startform.discard, chroming: \'full\', }, click :discardForm\"> <\/button><\/div><div id=\"pcs-startform-success-msg\" class=\"pcs-startform-success-msg\"><\/div><div id=\"pcs-startform-error-msg-container\" style=\"display: none\"> <span class=\"oj-component-icon oj-message-status-icon oj-message-error-icon\" role=\"img\" id=\"pcs-startform-error-msg-icon\" style=\"float: left ;margin-right:10px\" ><\/span><pre id=\"pcs-startform-error-msg\" class=\"pcs-startform-error-msg\"><\/pre><\/div><div id=\"pcs-startform-form-frame\" class=\"oj-row\"><div class=\"oj-sm-12 pcs-common-center-align\" id=\"pcs-startform-loading\"><div class=\"pcs-common-center-align pcs-common-loading\"\/><\/div><div class=\"oj-xl-12 oj-lg-12 oj-md-12 oj-col\" id=\"pcs-startform-iframe-container\" > <iframe id=\"pcs-startform-iframe\" data-bind=\"attr: {src: formURL}\" frameborder=\"0\" seamless=\"seamless\" scrolling=\"auto\" style=\"overflow-x:hidden; width:100%\" width=\"100%\" ><p>Your browser does not support iframes.<\/p> <\/iframe><\/div><\/div><div id=\"pcs-startform-attachment-area\" style=\"margin-top:30px\"><h3 ><span id=\"pcs-startform-attachment-title\" data-bind=\" text: bundle.pcs.startform.attachments\"><\/span><\/h3><div id=\"pcs-startform-attachment\"><\/div><\/div><div id=\"pcs-startform-overlay\"\/><\/div><div id=\"pcs-startform-mainContainer-submitted\" style=\"display:none\" class=\"oj-row oj-panel\"><div style=\"margin:20px\"> <span data-bind=\"attr :{title : bundle.pcs.startform.success}\" role=\"img\" class=\"oj-fwk-icon-status-confirmation oj-fwk-icon\"><\/span> <span id=\"pcs-startform-success-msg-submitted\" class=\"pcs-startform-success-msg\"><\/span><\/div><\/div>';
        var errortmpl = '<div class=\"oj-message oj-message-error\"> <span class=\"oj-component-icon oj-message-status-icon oj-message-error-icon\" role=\"img\"> <\/span> <span class=\"oj-message-content\"><div class=\"oj-message-summary\"> Required parameters are missing<\/div><div class=\"oj-message-detail\"> <span>This component requires these values -<\/span><pre> *startformData : { *processDefId : \'\', processName : \'\', *serviceName : \'\', title : \'\', description : \'\', *operation : \'\', startType : \'\' } <\/pre><\/div> <\/span><\/div>';
        $.widget('pcs.startform', {

            //Options to be used as defaults
            options: {
                //Data Object needed to get the startForm object
                startformData: {
                    processDefId: '',
                    processName: '',
                    serviceName: '',
                    title: '',
                    description: '',
                    operation: '',
                    startType: 'START_PCS_FORM',
                    isDocsEnabled: false
                },
                //Hidden option for PM's to pre populate form data
                payload: {},
                // to hide submit button or not
                hideSubmit: false,
                /**/
                // to hide save button or not
                hideSave: false,
                // to hide discard button or not
                hideDiscard: false,
                // to hide hideAttachment or not
                hideAttachment: false,
				//to automatically reload after submit
				reloadOnSubmit: true,
				//to automatically reload after save
				reloadOnSave: true,
                //Height for the form Iframe
                formHeight: '',
                // submit button label string
                submitLabel: bundle.pcs.startform.submit,
				//to be used for internally, when this is being used internally in appList
				consumed: false
            },


            // Check if the Required options are provided to the widget
            _isValid: function() {
                if (this.options.startformData === undefined || this.options.startformData.processDefId === undefined ||
                    this.options.startformData.serviceName === undefined || this.options.startformData.operation === undefined) {
                    return false;
                }
                if (this.options.startformData.processDefId === '' || this.options.startformData.serviceName === '' || this.options.startformData.operation === '') {
                    return false;
                }
                return true;
            },

            _create: function() {
                // _create will automatically run the first time
                // this widget is called. Put the initial widget
                // setup code here, then you can access the element
                // on which the widget was called via this.element.
                // The options defined above can be accessed
                // via this.options this.element.addStuff();
                var widget = this;

                // Check if PCSConenction is set
                if ($.pcsConnection === undefined) {
                    this.element.html('<div style=\'color:red\'>' + bundle.pcs.common.pcs_connection + ' </div>');
                    return;
                }

                // check if the the plugin is initialized correctly
                if (!this._isValid()) {
                    this.element.html(errortmpl);
                    return;
                }

                var data = this.options;
                data.rootElement = widget.element;

                var params = {
                    data: data
                };

                this.element.html(tmpl);
                var vm = new startform(params);
                this.model = vm;

                //ko.cleanNode(this.element['0']);
                ko.applyBindings(vm, this.element['0']);
            },

            // Destroy an instantiated plugin and clean up modifications
            // that the widget has made to the DOM
            destroy: function() {
                //t his.element.removeStuff();
                // For UI 1.8, destroy must be invoked from the base
                // widget

                $.Widget.prototype.destroy.call(this);
                // For UI 1.9, define _destroy instead and don't worry
                // about calling the base widget
            },

			_destroy: function (){
				loggerUtil.log('Destroying startform');
				// clean everything up
				if (this.model) {
					this.model.dispose();
				}
			},

            // Respond to any changes the user makes to the option method
            _setOption: function(key, value) {
                this.options[key] = value;

                // For UI 1.8, _setOption must be manually invoked
                // from the base widget
                $.Widget.prototype._setOption.apply(this, arguments);
                // For UI 1.9 the _super method can be used instead
                // this._super( '_setOption', key, value );
            }
        });
    });
