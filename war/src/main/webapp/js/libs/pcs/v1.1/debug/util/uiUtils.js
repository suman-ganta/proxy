define(['jquery', 'ojs/ojcore', 'knockout', 'ojs/ojdialog'], function (
        $,
        oj,
        ko
        ) {
    'use strict';

    /**
     * UI Util Class
     * @constructor
     */
    var UIUtils = function () {
        appUtils.throwStaticClassError();
    };

    /**
     * Large screen above
     * @example if (uiUtils.lgScreen()){}
     */
    UIUtils.lgScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP));

    /**
     * Midium screen above
     */
    UIUtils.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP));

    /**
     * Midium screen only
     */
    UIUtils.mdOnlyScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_ONLY));

    /**
     * Small screen above
     */
    UIUtils.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_UP));
    /**
     * Small screen only
     */
    UIUtils.smOnlyScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));

    /**
     * Screen Range
     */
    UIUtils.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();

    /**
     * Device Orientation (portrait|landscape)
     * The orientation is set in the main.js
     */
    UIUtils.orientation = 'portrait';//portrait, landscape

    function getCleanMessage(msg) {
        var message, msgXML;
        if (msg.match(/^<MESSAGE>.*<\/MESSAGE>$/g)) {
            msgXML = $.parseXML(msg);
            message = $(msgXML).find("TEXT").text();
        } else {
            message = msg.split(/\S+\sfailed:\s*/).join('');
        }
        return message;
    }

    UIUtils.isMobileDevice = function (data) {
        var isMobile = false; //initiate as false
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            if (UIUtils.smOnlyScreen()) {
                isMobile = true;
            }
        }
        return  isMobile;
    };

    UIUtils.isIOSDevice = function (data) {
        var isIOSDevice = false; //initiate as false

        if (/ip(hone|od)|ipad/i.test(navigator.userAgent)) {
            isIOSDevice = true;
        }
        return isIOSDevice;
    };

    /**
     *
     * @param {object} data An object contains desire values among each screen size. data.default is mandatory. example: {default: 5, LG: 15, MD: 10, SM: 5}
     * @returns {ko.computed} a computed value based on screen size
     */
    UIUtils.generateResponsiveComputed = function (data) {
        if (!data.hasOwnProperty('default') || typeof data.default === 'undefined') {
            throw new Error('data.default is mandatory');
        }

        return ko.computed(function () {
            var value = data.default;

            if (oj.ResponsiveUtils.compare(UIUtils.screenRange(),
                    oj.ResponsiveUtils.SCREEN_RANGE.XL) === 0) {
                if (data.XL) {
                    value = data.XL;
                }
            } else if (oj.ResponsiveUtils.compare(UIUtils.screenRange(),
                    oj.ResponsiveUtils.SCREEN_RANGE.LG) === 0) {
                if (data.LG) {
                    value = data.LG;
                }
            } else if (oj.ResponsiveUtils.compare(UIUtils.screenRange(),
                    oj.ResponsiveUtils.SCREEN_RANGE.MD) === 0) {
                if (data.MD) {
                    value = data.MD;
                }
            } else if (oj.ResponsiveUtils.compare(UIUtils.screenRange(),
                    oj.ResponsiveUtils.SCREEN_RANGE.SM) === 0) {
                if (data.SM) {
                    value = data.SM;
                }
            }

            return value;
        });
    };

    /**
     *
     * @param {type} prop should have attribute: portrait and landscape, and the value is same with UIUtils.generateResponsiveComputed
     * @returns {ko.computed}
     */
    UIUtils.generateResponsiveComputedByOrien = function (prop) {

        if (!prop.hasOwnProperty('portrait') || !prop.portrait) {
            throw new Error('data.portrait is mandatory');
        } else if (!prop.hasOwnProperty('landscape') || !prop.landscape) {
            throw new Error('data.landscape is mandatory');
        }

        return ko.computed(function () {
            var data = prop[uiUtils.orientation];
            var value = data.default;

            if (oj.ResponsiveUtils.compare(UIUtils.screenRange(),
                    oj.ResponsiveUtils.SCREEN_RANGE.XL) === 0) {
                if (data.XL) {
                    value = data.XL;
                }
            } else if (oj.ResponsiveUtils.compare(UIUtils.screenRange(),
                    oj.ResponsiveUtils.SCREEN_RANGE.LG) === 0) {
                if (data.LG) {
                    value = data.LG;
                }
            } else if (oj.ResponsiveUtils.compare(UIUtils.screenRange(),
                    oj.ResponsiveUtils.SCREEN_RANGE.MD) === 0) {
                if (data.MD) {
                    value = data.MD;
                }
            } else if (oj.ResponsiveUtils.compare(UIUtils.screenRange(),
                    oj.ResponsiveUtils.SCREEN_RANGE.SM) === 0) {
                if (data.SM) {
                    value = data.SM;
                }
            }

            return value;
        });
    };

    /**
     * Alert a message
     * @param {string} message
     * @param {string} msgType
     */
    UIUtils.alert = function (message, msgType, isHtml) {
        this.alertNested(message, msgType, isHtml);
    };

    /**
     * Alert a message - Nested
     * @param {string} msgType
     * @param {string} message
     */
    UIUtils.alertNested = function (message, msgType, isHtml) {
        message = getCleanMessage(message);

        var idIdx = 0, selector = "", appendToEl = document.body, title, iconHTML;
        if (msgType === 'ERROR') {
            title = 'Error';
            iconHTML = '<span title="Error" role="img" class="oj-fwk-icon-status-error oj-fwk-icon"></span>';
        } else if (msgType === 'WARNING') {
            title = 'Warning';
            iconHTML = '<span title="Warning" role="img" class="oj-fwk-icon-status-warning oj-fwk-icon"></span>';
        } else if (msgType === 'INFO') {
            title = 'Information';
            iconHTML = '<span title="Information" role="img" class="oj-fwk-icon-status-info oj-fwk-icon"></span>';
        } else if (typeof msgType !== 'undefined'){
            title = msgType;
            iconHTML = '<span title="Error" role="img" class="oj-fwk-icon-status-error oj-fwk-icon"></span>';
        } else {
            title = 'Error';
            iconHTML = '<span title="Error" role="img" class="oj-fwk-icon-status-error oj-fwk-icon"></span>';
        }

        if ($("[id^=ojAlertDialog-]").length > 0) {
            idIdx = $("[id^=ojAlertDialog]").length - 1;
            selector = "#ojAlertDialog-" + idIdx + " .oj-dialog-body";
            appendToEl = $(appendToEl).get(0);
        }

        $(['<div id="ojAlertDialog-' + idIdx + '"',
            ' title="" data-bind="ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\', modality: \'modeless\'}">',
                '<div class="oj-dialog-header oj-helper-clearfix" aria-labelledby="dialogTitleId">',
                    '<span class="oj-dialog-title">' + iconHTML + ' ' + title + ' </span>',
                '</div>',
                '<div class="oj-dialog-body">',
                '</div>',
                '<div class="oj-dialog-footer">',
                    '<button id="ojAlertDialogOKBtn-' + idIdx + '">',
                    '</button>',
                '</div>',
            '</div>'
        ].join("")).appendTo(appendToEl);

        selector = "#ojAlertDialog-" + idIdx + " #ojAlertDialogOKBtn-" + idIdx;
        $(selector).ojButton({
            label: 'OK'
        }).on("click", function () {
            selector = "#ojAlertDialog-" + idIdx;
            $(selector).ojDialog("close");
            $(selector).remove();
        });

        selector = "#ojAlertDialog-" + idIdx;
        $(selector).ojDialog({cancelBehavior: "escape"});

        // This part will be managed by the PSC central CSS to handle in future.
        $(selector).parent().addClass('psc-model-dialog-alert');

        if (idIdx) {
            selector = "#ojAlertDialog-" + (idIdx - 1);
            $(selector).ojDialog({"position": {"at": "left+75 top", "of": $(selector)}});
        }

        selector = "#ojAlertDialog-" + idIdx + " .oj-dialog-body";
        if(isHtml) {
            $(selector).html(message);
        } else {
            $(selector).text(message);
        }


        selector = "#ojAlertDialog-" + idIdx;
        $(selector).ojDialog("open");
    };

    /**
     * Error a message
     * @deprecated suggest to use UIUtils.alert method.
     * @param {string} message
     */
    UIUtils.error = function (message) {
		message = getCleanMessage(message);
        if (!$("#ojErrorDialog")[0]) {
            $(['<div style="display:none" id="ojErrorDialog" title="" data-bind="ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\', modality: \'modeless\'}">',
                '<div class="oj-dialog-header oj-helper-clearfix" aria-labelledby="dialogTitleId">',
                '<span class="oj-dialog-title"> Error </span>',
                '</div>',
                '<div class="oj-dialog-body">',
                '</div>',
                '<div class="oj-dialog-footer">',
                '<button id="ojErrorDialogOKBtn"> </button>',
                '</div>',
                '</div>'
            ].join("")).appendTo(document.body);
            $("#ojErrorDialog #ojErrorDialogOKBtn").ojButton({
                label: 'OK'
            }).on("click", function () {
                $("#ojErrorDialog").ojDialog("close");
            });
            $("#ojErrorDialog").ojDialog();
        }
        $("#ojErrorDialog .oj-dialog-body").text(message);
        $("#ojErrorDialog").ojDialog("open");
        console.error(message);
    };

    /**
     * Notify a message
     * @param {string} message
     * @param {number} duration
     */
    UIUtils.notify = function (message, duration) {
		message = getCleanMessage(message);
        var dfDuration = 1000;
        if (typeof (duration) === 'number') {
            dfDuration = duration;
        }
        if (!$("#ojNotifyMessage")[0]) {
            $(['<div id= "ojNotifyMessage" class="oj-notify-message">',
                '<div class="oj-flex-bar">',
                '<div id="ojNotifyBody" class="oj-notify-body oj-flex-bar-middle oj-sm-justify-content-center">',
                '</div>',
                '<a id="ojNotifyClose" class="oj-flex-bar-end oj-notify-close">',
                '</a>',
                '</div>',
                '</div>'
            ].join("")).appendTo(document.body);

            $("#ojNotifyClose").click(function () {
                $('#ojNotifyMessage').css('display', 'none');
            });
        }
        $("#ojNotifyBody").text(message);
        $("#ojNotifyMessage").css({"top": -$('#ojNotifyMessage')
                    .outerHeight(), display: 'inherit'}).animate({top: "0"}, 500)
                .delay(dfDuration)
                .animate({top: -$('#ojNotifyMessage').outerHeight()}, 500);
//                $("#ojNotifyMessage").fadeIn(500).delay(1000).fadeOut();
    };

    /**
     * Confirm a message
     * @param {string} message
     */
    UIUtils.confirm = function (message, callBack, cbData) {
        var titleContent = "Confirm";
        var messageContent = "";
        var okLabel = 'OK';
        var cancelLabel = 'Cancel';

        switch ($.type(message)) {
            case "string":
                messageContent = message;
                break;
            case "object":
                if (message.title) {
                    titleContent = message.title;
                }

                if (message.message) {
                    messageContent = message.message;
                }

                if ((message.okLabel !== undefined) && (message.okLabel)) {
                    okLabel = message.okLabel;
                }

                if ((message.cancelLabel !== undefined) && (message.cancelLabel)) {
                    cancelLabel = message.cancelLabel;
                }

                break;
        }

        if (!$("#ojMessageDialog")[0]) {
            $(['<div style="display:none" id="ojMessageDialog" title="" data-bind="ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\', cancelBehavior: \'escape\', modality: \'modal\'}">',
                '<div class="oj-dialog-header oj-helper-clearfix" aria-labelledby="ojMessageDialog">',
                '<span id="ojMessageDialogTitle" class="oj-dialog-title">',
                '</span>',
                '</div>',
                '<div id="ojMessageDialogBody" class="oj-dialog-body">',
                '</div>',
                '<div class="oj-dialog-footer">',
                '<button id="ojMessageDialogOKBtn" class="oj-button-primary"></button>',
                '<button id="ojMessageDialogCancelBtn" style="margin-left: 1em;"></button>',
                '</div>',
                '</div>'
            ].join("")).appendTo(document.body);
            $("#ojMessageDialog").ojDialog({cancelBehavior: "escape"});
        }

        $("#ojMessageDialogOKBtn").ojButton({
            label: okLabel
        }).off('click').on("click", function () {
            if (callBack) {
                callBack(cbData);
            }
            $("#ojMessageDialog").ojDialog("close");
        });

        $("#ojMessageDialogCancelBtn").ojButton({
            label: cancelLabel
        }).on("click", function () {
            $("#ojMessageDialog").ojDialog("close");
        });

        $("#ojMessageDialogTitle").text(titleContent);
        $("#ojMessageDialog .oj-dialog-body").text(messageContent);
        $("#ojMessageDialog").ojDialog("open");
        $("#ojMessageDialogOKBtn").focus();
    };

    /**
     * Confirm a message
     * @param {string or object} message
     */
    UIUtils.confirmByPromise = function (message) {
        var defferdPromise = new $.Deferred();
        var titleContent = 'Confirm';
        var messageContent = '';
        var okLabel = 'OK';
        var cancelLabel = 'Cancel';

        switch ($.type(message)) {
            case "string":
                messageContent = message;
                break;
            case "object":
                if ((message.title !== undefined) && (message.title)) {
                    titleContent = message.title;
                }

                if ((message.message !== undefined) && (message.message)) {
                    messageContent = message.message;
                }

                if ((message.okLabel !== undefined) && (message.okLabel)) {
                    okLabel = message.okLabel;
                }

                if ((message.cancelLabel !== undefined) && (message.cancelLabel)) {
                    cancelLabel = message.cancelLabel;
                }

                break;
        }

        if (!$("#ojMessageDialog")[0]) {
            $(['<div style="display:none" id="ojMessageDialog" title="" data-bind="ojComponent:{component: \'ojDialog\', initialVisibility: \'hide\', cancelBehavior: \'escape\', modality: \'modal\'}">',
                '<div class="oj-dialog-header oj-helper-clearfix" aria-labelledby="ojMessageDialog">',
                '<span id="ojMessageDialogTitle" class="oj-dialog-title">',
                '</span>',
                '</div>',
                '<div id="ojMessageDialogBody" class="oj-dialog-body">',
                '</div>',
                '<div class="oj-dialog-footer">',
                '<button id="ojMessageDialogCancelBtn" style="margin-left: 1em;"></button>',
                '<button id="ojMessageDialogOKBtn" class="oj-button-primary"></button>',
                '</div>',
                '</div>'
            ].join("")).appendTo(document.body);
            $("#ojMessageDialog").ojDialog({cancelBehavior: "escape"});
        }

        $("#ojMessageDialogOKBtn").ojButton({
            label: okLabel
        }).off("click").on("click", function () {
            $("#ojMessageDialog").ojDialog("close");
            defferdPromise.resolve();
        });

        $("#ojMessageDialogCancelBtn").ojButton({
            label: cancelLabel
        }).off("click").on("click", function () {
            $("#ojMessageDialog").ojDialog("close");
            defferdPromise.reject();
        });

        $("#ojMessageDialogTitle").text(titleContent);
        $("#ojMessageDialog .oj-dialog-body").text(messageContent);
        $("#ojMessageDialog").ojDialog("open");
        $("#ojMessageDialogOKBtn").focus();

        return defferdPromise;
    };
    /**
     * Alert under development message
     * @param {string} message
     */
    UIUtils.alertUnderDevelop = function (message) {
        this.alert(appUtils.i18n('common.UnderDevelopment'));
    };

    /**
     * force the popup model to show the hidden validation message
     * @param {array} validateFieldsAndType
     * @param {string} containerId The element id of which contains the fields with validators
     * @param {boolean} validateInvisible determine if validate invisible fields
     * @returns {Boolean}
     */
    UIUtils.showModelValidateMessage = function (validateFieldsAndType, containerId, validateInvisible) {
        var isValid = true;
        var str = '';
        var field = null;

        for (var i = 0; i < validateFieldsAndType.length; i++) {


            if (validateFieldsAndType[i].type === 'ojSelect') {
                str = '#oj-select-choice-' + validateFieldsAndType[i].id;
            } else if (validateFieldsAndType[i].type === 'ojCombobox') {
                str = '#oj-combobox-choice-' + validateFieldsAndType[i].id;
            } else {
                str = '#' + validateFieldsAndType[i].id;
            }

            if (containerId) {
                str = '#' + containerId + " " + str;
            } else {
                str = "#dialog " + str;
            }

            if(validateInvisible)
                field = $(str);
            else
                field = $(str).filter(":visible");

            if (field && field.length > 0) {
                var ojFoo = validateFieldsAndType[i].type ? validateFieldsAndType[i].type : 'ojInputText';
                switch (ojFoo) {
                    case 'pscInputNumber':
                    case 'ojInputText':
                    case 'prompt':
                        if (!$(str).ojInputText("option", "value")) {
                            $(str).ojInputText("showMessages");
                        } else {
                            $(str).ojInputText("validate");
                        }
                        validateFieldsAndType[i].isValid = $(str).ojInputText("isValid");
                        isValid = (isValid === true) ? $(str).ojInputText("isValid") : false;
                        break;
                    case 'ojInputDate':
                        $(str).ojInputDate("showMessages");
                        validateFieldsAndType[i].isValid = $(str).ojInputDate("isValid");
                        isValid = (isValid === true) ? $(str).ojInputDate("isValid") : false;
                        break;
                    case 'ojInputTime':
                        $(str).ojInputTime("showMessages");
                        validateFieldsAndType[i].isValid = $(str).ojInputTime("isValid");
                        isValid = (isValid === true) ? $(str).ojInputTime("isValid") : false;
                        break;
                    case 'ojInputDateTime':
                        $(str).ojInputDateTime("showMessages");
                        validateFieldsAndType[i].isValid = $(str).ojInputDateTime("isValid");
                        isValid = (isValid === true) ? $(str).ojInputDateTime("isValid") : false;
                        break;
                    case 'ojInputNumber':
                        $(str).ojInputNumber("showMessages");
                        validateFieldsAndType[i].isValid = $(str).ojInputNumber("isValid");
                        isValid = (isValid === true) ? $(str).ojInputNumber("isValid") : false;
                        break;
                    case 'ojTextArea':
                        if (!$(str).ojTextArea("option", "value")) {
                            $(str).ojTextArea("showMessages");
                        } else {
                            $(str).ojTextArea("validate");
                        }
                        validateFieldsAndType[i].isValid = $(str).ojTextArea("isValid");
                        isValid = (isValid === true) ? $(str).ojTextArea("isValid") : false;
                        break;
                    case 'ojSelect':
                        str = str.replace("oj-select-choice-", "");
                        $(str).ojSelect("showMessages");
                        validateFieldsAndType[i].isValid = $(str).ojSelect("isValid");
                        isValid = (isValid === true) ? $(str).ojSelect("isValid") : false;
                        break;
                    case 'ojCombobox':
                        str = str.replace("oj-combobox-choice-", "");
                        $(str).ojCombobox("showMessages");
                        validateFieldsAndType[i].isValid = $(str).ojCombobox("isValid");
                        isValid = (isValid === true) ? $(str).ojCombobox("isValid") : false;
                        break;
                    case 'ojCheckboxset':
                        $(str).ojCheckboxset("validate");
                        validateFieldsAndType[i].isValid = $(str).ojCheckboxset("isValid");
                        isValid = (isValid === true) ? $(str).ojCheckboxset("isValid") : false;
                        break;
                }
            } else {
                continue;
            }
        }
        return isValid;
    };

    /**
     * reset validation message of the popup model
     * @param {array} requiredFields
     * @param {string} containerId The element id of which contains the fields with validators
     * @returns {undefined}
     */
    UIUtils.resetModelValidateMessage = function (validateFieldsAndType, containerId) {
        var str = '';
        var field = null;

        for (var i = 0; i < validateFieldsAndType.length; i++) {

            str = '#' + validateFieldsAndType[i].id;

            if (containerId) {
                str = '#' + containerId + " " + str;
            } else {
                str = "#dialog " + str;
            }

            field = $(str);

            if (field) {
                var ojFoo = validateFieldsAndType[i].type ? validateFieldsAndType[i].type : 'ojInputText';
                switch (ojFoo) {
                    case 'ojInputText':
                    case 'prompt':
                        $(str).ojInputText("reset");
                        break;
                    case 'ojInputDate':
                        $(str).ojInputDate("reset");
                        break;
                    case 'ojInputTime':
                        $(str).ojInputTime("reset");
                        break;
                    case 'ojInputDateTime':
                        $(str).ojInputDateTime("reset");
                        break;
                    case 'ojInputNumber':
                        $(str).ojInputNumber("reset");
                        break;
                    case 'ojTextArea':
                        $(str).ojTextArea("reset");
                        break;
                    case 'ojSelect':
                        $(str).ojSelect("reset");
                        break;
                    case 'ojCheckboxset':
                        $(str).ojCheckboxset("reset");
                        break;
                    case 'ojCombobox':
                        $(str).ojCombobox("reset");
                        break;
                    default:
                        break;
                }
            } else {
                continue;
            }
        }
    };
    return UIUtils;
});
