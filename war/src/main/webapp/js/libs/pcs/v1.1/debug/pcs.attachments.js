/**
 * Created by lwagner on 3/11/2016.
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'ojL10n!pcs/resources/nls/pcsSnippetsResource',
		'pcs/attachments/viewModel/attachmentsContainer', 'pcs/util/loggerUtil','jqueryui-amd/widget'
    ],
    function(oj, ko, $, bundle, attachmentsVM,loggerUtil) {
        'use strict';
        // define your widget under pcs namespace
        var tmpl = '<div data-bind=\'component: { name: \"attachmentComponent\", params : {data : data} }\'><\/div>';
        var errortmpl = '<div class=\"oj-message oj-message-error\"> <span class=\"oj-component-icon oj-message-status-icon oj-message-error-icon\" role=\"img\"> <\/span> <span class=\"oj-message-content\"><div class=\"oj-message-summary\"> Required parameters are missing<\/div><div class=\"oj-message-detail\"> <span>This component requires these values -<\/span><pre> *id : \'\' <\/pre><\/div> <\/span><\/div>';
        var attachmentsView = '<div class=\"oj-margin pcs-attachments-detailBox\"><div data-bind=\"if:showAttachments() && showDcsFolders()\"><div class=\"oj-flex oj-sm-flex-items-initial\"><div class=\"oj-flex-item pcs-attachments-caret-icon\" role=\"img\" data-bind=\"attr:{title:bundle.pcs.attachments.foldersText}\"><\/div><div class=\"oj-flex-item pcs-attachments-folders-text\"><a href=\"#\" data-bind=\"click : closeFolder,text:bundle.pcs.attachments.foldersText\"><\/a><\/div><\/div><\/div><div data-bind=\"if:showAttachments()\"><div class=\"oj-flex oj-flex-bar\"><div data-bind=\"ifnot:showDcsFolders\" class=\"pcs-attachments-title oj-flex-bar-start\"> <label class=\"pcs-attachments-title\" data-bind=\"text:bundle.pcs.attachments.title\"><\/label><\/div><div data-bind=\"if:showDcsFolders\" class=\"pcs-attachments-title oj-flex-bar-start\"> <label class=\"pcs-attachments-title\" data-bind=\"text:dscSelectedFolderName\"><\/label><\/div><div class=\"pcs-attachments-uploadLink oj-flex-bar-end\" style=\"padding-right:10px;\" data-bind=\"ifnot:$data.displayDcs()\"> <a href=\"#\" data-bind=\"click : openUploadDialog, text:bundle.pcs.attachments.uploadLink\"><\/a><\/div><\/div><\/div><div id=\"pcs-attachments-success-msg-container\" style=\"display: none;margin-bottom:20px\"> <span title=\"Success\" role=\"img\" class=\"oj-fwk-icon-status-confirmation oj-fwk-icon\"><\/span> <span id=\"pcs-attachments-success-msg\" class=\"pcs-attachments-success-msg\"><\/span><\/div><div id=\"pcs-attachments-error-msg-container\" class=\"pcs-attachments-error-msg-container\" style=\"display: none\"> <span class=\"oj-component-icon oj-message-status-icon oj-message-error-icon\" role=\"img\" id=\"pcs-attachments-error-msg-icon\" style=\"float: left ;margin-right:10px\" ><\/span><pre id=\"pcs-attachments-error-msg\" class=\"pcs-attachments-error-msg\"><\/pre><\/div><\/div><div class=\"pcs-attachments-actionBox oj-panel oj-margin\"><div data-bind=\"ifnot:showAttachments()\"><div class=\"oj-flex oj-sm-flex-items-initial\" data-bind=\"visible:isDcsFolderVisible\"><ul class=\"pcs-attachments-attachmentsList\" data-bind=\"foreach:dcsFolderList \"><li><div class=\"oj-flex oj-flex-bar\"><div class=\"oj-flex-bar-start\"><div class=\"oj-flex-item pcs-attachments-folder-icon\" role=\"img\" data-bind=\"attr:{title:$parent.bundle.pcs.attachments.folderText}\"><\/div><div class=\"oj-flex-item pcs-attachments-file-icon\" role=\"img\" data-bind=\"attr:{title:$parent.bundle.pcs.attachments.fileText}\"><\/div><div class=\"oj-flex-item\"><a href=\"#\" data-bind=\"click : $parent.openFolder,text:folderName\"><\/a><\/div><\/div><\/div><\/li><\/ul><div id=\"pcs-attachments-docs-error\"><\/div><\/div><div class=\"pcs-attachment-inline-div\" data-bind=\"visible:!isDcsFolderVisible()\"><div data-bind=\"visible:dcsFolderList().length > 1\" style=\"display: none;\"> <span class=\"pcs-attachments-folders-back\" data-bind=\"click:showFolders\"><\/span> <a class=\"pcs-attachments-folders-text\" data-bind=\"click:showFolders , text : bundle.pcs.attachments.foldersText\"><\/a><\/div><div class=\"pcs-attachment-iframe-inline\"> <iframe id=\"pcs-attachment-iframe-inline\" style=\"width: 100%;min-height: 550px\" target=\"_top\" data-bind=\"attr: {src: $data.dscSelectedAppLink}\" frameborder=\"0\" seamless=\"seamless\" scrolling=\"auto\"><p>Your browser does not support iframes.<\/p> <\/iframe><\/div><\/div><\/div><div data-bind=\"if:showAttachments()\"><div data-bind=\"if:attachmentList().length == 0\"> <span data-bind=\"text:bundle.pcs.attachments.noItemsText\"><\/span><\/div><ul class=\"pcs-attachments-attachmentsList\" data-bind=\"foreach:attachmentList \"><li><div class=\"oj-flex oj-flex-bar\"><div class=\"oj-flex-bar-start\"><div data-bind=\"attr:{class:$parent.iconClass(filename, contentType)}\"> <span>&nbsp;&nbsp;<\/span><\/div><div class=\"pcs-attachments-text\"> <a data-bind=\"attr :{href:href , download : filename }, click:$parent.viewAttachment\" target=\"_blank\"><p class=\"\"> <span data-bind=\"text: filename\"><\/span><\/p> <\/a> <span class=\"date pcs-attachments-sub-text\"> <span data-bind=\"text: fileInfoText\"><\/span> <\/span><\/div><\/div><div class=\"pcs-attachments-removeFile oj-flex-bar-end\"> <a href=\"#\" data-bind=\"click:$parent.removeFileFromList\"> <span class=\"oj-icon pcs-attachments-remove-icon\" role=\"img\" data-bind=\"attr:{title:$parent.bundle.pcs.attachments.removeFile}\"><\/span> <\/a><\/div><div style=\"display:none\" class=\"pcs-attachments-delete-dialog\" data-bind=\"attr : { title : $parent.bundle.pcs.attachments.dialog_confirm}, ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\'}\"><div class=\"oj-dialog-body\"><div data-bind=\"text : $parent.bundle.pcs.attachments.dialog_discard_msg\"\/><\/div><div class=\"oj-dialog-footer\"> <button data-bind=\"click : $parent.yesDeleteDialog , ojComponent: {component: \'ojButton\', label: $parent.bundle.pcs.attachments.dialog_yes}\"><\/button> <button data-bind=\"click : $parent.noDeleteDialog , ojComponent: {component: \'ojButton\', label: $parent.bundle.pcs.attachments.dialog_no}\"><\/button><\/div><\/div><\/div><hr\/><\/li><\/ul><\/div><div id=\"pcs-attachments-overlay\"\/><\/div><div style=\"display:none\" class=\"pcs-attachments-modalDialog\" data-bind=\"attr: {title: bundle.pcs.attachments.uploadDialogTitle}, ojComponent:{ component: \'ojDialog\', initialVisibility: \'hide\', close: handleDialogClose, rootAttributes: { style: \'width: 500px; min-width: 200px; max-width 500px;\'} }\"><div class=\"oj-dialog-body oj-form\"><div class=\"oj-flex\"><div class=\"oj-flex-item\"><div data-bind=\"ifnot:showDcsFolders\"><div class=\"pcs-attachments-note-txt\" data-bind=\"text:bundle.pcs.attachments.uploadSizeLimitText\"><\/div><\/div><div data-bind=\"if:showDcsFolders\"><div class=\"pcs-attachments-note-txt\" data-bind=\"text:bundle.pcs.attachments.docsUploadSizeLimitText\"><\/div><\/div><div class=\"pcs-attachments-error-txt\" data-bind=\"visible:isSizeLimitExceeding, text:bundle.pcs.attachments.fileSizeExceeded\"><\/div><\/div><\/div><div class=\"oj-flex pcs-attachments-dialog-error-msg\"> <span class=\"oj-fwk-icon oj-fwk-icon-status-error oj-flex-item\"><\/span> <span class=\"oj-flex-item\" data-bind=\"text: bundle.pcs.attachments.fileExists\"><\/span><\/div><div class=\"oj-flex oj-sm-odd-cols-12 oj-md-odd-cols-4 oj-md-labels-inline oj-form-cols-labels-inline oj-form-cols-max2\"><div class=\"oj-flex-item\"> <label for=\"pcs-attachments-fileControl\" data-bind=\"text:bundle.pcs.attachments.browseToUploadLabel\"><\/label><\/div><div class=\"oj-flex-item\"> <input id=\"pcs-attachments-fileControl\" type=\"file\" class=\"pcs-attach-file-name\" title=\"Upload file\" style=\"float:left;\" \/><div class=\"pcs-empty-file-name-text\" style=\"display: none;color:red;clear: both;\" class=\"text-error\" data-bind=\"text:bundle.pcs.attachments.emptyAddFileText\"><\/div><\/div><\/div><\/div><div class=\"oj-dialog-footer\"> <button class=\"pcs-attachments-upload-btn\" data-bind=\"click: uploadAttachment, ojComponent: {component: \'ojButton\', label: bundle.pcs.attachments.upload, disabled : \'true\'} , attr : { title : bundle.pcs.attachments.upload}\"> <\/button><\/div><\/div><div style=\"display:none\" class=\"pcs-attachments-dcsModalDialog\" data-bind=\"attr: {title: bundle.pcs.attachments.documents_dialog_title}, ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\', close :dcsDialogClose, rootAttributes: { style: \'width: 800px; min-width: 300px; max-width 800px;\'}}\"><div class=\"oj-dialog-body\" style=\"height:600px\"> <iframe id=\"pcs-attachment-iframe\" target=\"_top\" data-bind=\"attr: {src: $data.dscSelectedAppLink}\" frameborder=\"0\" seamless=\"seamless\" scrolling=\"auto\" style=\"overflow-x:hidden; width:100%;\" height=550px\" ><p>Your browser does not support iframes.<\/p> <\/iframe><\/div><\/div>';
        $.widget('pcs.attachments', {

            //Options to be used as defaults
            options: {
                hideDelete: false,
                hideUploadLink: false,
                hideTitle: false,
                attachments: [],
                startFolderName: '',
                mode: 'start',
                id: -1,
                readOnly: false,
                isDocsEnabled: false,
				showDocsInline: false
            },

			// Check if the Required options are provided to the widget
			_isValid: function() {
            	if (this.options.mode === 'start'){
					return true;
				}
				else {
            		if(this.options.id === undefined || this.options.id === ''){
						return false;
					}
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

                if ($.pcsConnection === undefined) {
                    this.element.html('<div style=\'color:red\'>' + bundle.pcs.common.pcs_connection + ' </div>');
                    return;
                }

				// check if the the plugin is initialized correctly
				if (!this._isValid()) {
					this.element.html(errortmpl);
					return;
				}


				var data = {
                    rootElement: widget.element,
                    hideDelete: widget.options.hideDelete,
                    hideUploadLink: widget.options.hideUploadLink,
                    hideTitle: widget.options.hideTitle,
                    attachments: widget.options.attachments,
                    startFolderName: widget.options.startFolderName,
                    mode: widget.options.mode,
                    id: widget.options.id,
                    isDocsEnabled: widget.options.isDocsEnabled,
					showDocsInline: widget.options.showDocsInline
                };

                function Model() {
                    var self = this;

                    if (!ko.components.isRegistered('attachmentComponent')) {
                        ko.components.register('attachmentComponent', {
                            template: attachmentsView,
                            viewModel: attachmentsVM
                        });
                    }
                    self.data = data;

                    if (widget.options.readOnly) {
                        self.data.hideUploadLink = true;
                        self.data.hideDelete = true;
                    }
                }

                var vm = new Model();

                widget.model = vm;

                this.element.html(tmpl);

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
				loggerUtil.log('Destroying attachments');
				// clean everything up
				if (this.model && this.model.data && this.model.data.container) {
					this.model.data.container.dispose();
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
            },

            getAttachments: function() {
                var data = this.model.data.container.attachmentList();
                return data;
            }
        });
    });
