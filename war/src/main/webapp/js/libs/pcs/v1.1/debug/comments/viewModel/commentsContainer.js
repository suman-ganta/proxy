/**
 * Created by lwagner on 5/12/2016.
 */

define(['ojs/ojcore', 'knockout', 'pcs/util/pcsUtil', 'pcs/comments/services/commentsDataService', 'pcs/util/dateUtil', 'ojs/ojknockout',
        'ojs/ojdialog', 'ojs/ojbutton', 'ojs/ojinputtext', '!text!pcs/comments/view/commentsContainer.html', 'ojL10n!pcs/resources/nls/pcsSnippetsResource'
    ],
    function(oj, ko, pcsUtil, services, dateUtil) {
        'use strict';
        /**
         * The view model for the main content view template
         * The view model for the main content view template
         */
        function CommentsContainer(params) {
            var self = this;
            this.data = params.data;
			var loggerUtil =  require('pcs/util/loggerUtil');

            //Set the resourcebundle
            self.bundle = require('ojL10n!pcs/resources/nls/pcsSnippetsResource');

            this.data.container = self;

            this.rootElement = self.data.rootElement;

            if (self.data.readOnly) {
                $('.pcs-comments-inputCommentContainer', self.rootElement).hide();
            }

            if (self.data.hideTitle) {
                $('.pcs-comments-titleBox', self.rootElement).hide();
            }

            self.comments = ko.observableArray([]);
            self.commentStr = ko.observable('');

            function loadComments(mode, id) {
                if (id && id !== '') {
                    if (mode === 'task' || mode === 'process') {
                        $('#pcs-comments-overlay').addClass('pcs-common-load-overlay');
                        services.getCommentList(mode, id).done(
                            function(data) {
                                if (data.items) {
                                    for (var i = data.items.length - 1; i >= 0; i--) {
                                        self._addCommentItem(data.items[i]);
                                    }
                                }
                                $('#pcs-comments-overlay').removeClass('pcs-common-load-overlay');
                                self.rootElement.trigger('comments:loaded');
                            }
                        ).fail(function(jqXHR, textStatus, errorThrown) {
                            $('#pcs-comments-overlay').removeClass('pcs-common-load-overlay');
                            self.rootElement.trigger('comments:loaded');
                        });
                    }
                }
            }

            if (self.data.mode === 'task' || self.data.mode === 'process') {
                loadComments(self.data.mode, self.data.id);
            }

            var commentObj = function(commentStr, updatedBy, userId, updatedDate) {
                this.commentStr = commentStr;
                this.updatedBy = updatedBy;
                this.userId = userId;
                this.updatedDate = dateUtil.getDateInUserTimezone(updatedDate);
                this.updatedDateFormatted = dateUtil.getFormattedDate(this.updatedDate);
            };

            var addCommentObj = function(commentStr, commentScope) {
                this.commentStr = commentStr;
                this.commentScope = commentScope;
            };

            self._addCommentItem = function(commentItem) {
                var comment = new commentObj(commentItem.commentStr, commentItem.updatedBy, commentItem.userId,
                    commentItem.updateddDate);
                self.comments.unshift(comment);
            };


			/**
			 * method to clean up everything
			 */
			self.dispose = function() {
				loggerUtil.log('dispose in comments Containor');

				// clean up the events
			};

            self.postComment = function() {

				//check for empty comment
				if(self.commentStr().length === 0 || self.commentStr().trim().length === 0){
					$('#pcs-comments-error-msg', self.rootElement).text(self.bundle.pcs.comments.empty_comment);
					$('#pcs-comments-error-msg-container', self.rootElement).show().delay(3000).fadeOut(2000);
					return;
				}

                var comment = new addCommentObj(self.commentStr(), 'BPM');
                var contentType = 'application/json';
                $('#pcs-comments-overlay').addClass('pcs-common-load-overlay');
                services.postComment(self.data.mode, self.data.id, JSON.stringify(comment), contentType).done(
                    function(data) {
                        //self.commentList.unshift(comment);
                        if (data.comment) {
                            self.comments.removeAll();
                            for (var i = data.comment.length - 1; i >= 0; i--) {
                                self._addCommentItem(data.comment[i]);
                            }
                        }
                        self.rootElement.trigger('comments:commentAdded', [comment]);

                        var msg = self.bundle.pcs.comments.add_comment_success;
                        $('#pcs-comments-success-msg', self.rootElement).text(msg);
                        $('#pcs-comments-success-msg-container', self.rootElement).show().delay(5000).fadeOut(2000);

                        self.commentStr('');
                        $('#pcs-comments-overlay').removeClass('pcs-common-load-overlay');
                    }
                ).fail(
                    function(jqXHR, textStatus, errorThrown) {

                        var msg = self.bundle.pcs.comments.post_error;

                        if (jqXHR && jqXHR.status === 0) {
                            msg = self.bundle.pcs.common.server_not_reachable;
                        }

                        if (jqXHR && jqXHR.status === 500) {
                            msg = self.bundle.pcs.common.internal_server_err;
                        } else if (jqXHR && jqXHR.status === 401) {
                            // reset valid authInfo as the current auth is invalid
                            msg = self.bundle.pcs.common.access_error_msg;
                        }

                        $('#pcs-comments-error-msg', self.rootElement).text(msg);
                        $('#pcs-comments-error-msg-container', self.rootElement).show().delay(5000).fadeOut(2000);

                        //$('#pcs-comments-error',self.rootElement).show();
                        //$('#pcs-comments-error-msg',self.rootElement).text(msg);

                        $('#pcs-comments-overlay', self.rootElement).removeClass('pcs-common-load-overlay');
                    }
                );
            };
        }
        return CommentsContainer;
    });
