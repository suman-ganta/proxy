/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['ojs/ojcore', 'jquery', 'promise', 'ojs/ojcomponentcore', 
        'ojs/ojpopupcore', 'ojs/ojanimation'], 
       function(oj, $)
{

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */
/*!
 * jQuery UI Popup @VERSION
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.position.js
 */
(function ()
{

  /**
   * List of all pseudo marker selectors that defines rules for where a tail is aligned.
   * @private
   * @const
   */
  var _TAIL_STYLES = ["oj-left", "oj-center", "oj-right", "oj-top", "oj-middle", "oj-bottom"];

  /**
   * Mapping of horizontal-vertical (x,y) positon using alignment to jet tail pseudo marker
   * selectors.
   *
   * horizontal: right, left, center
   * vertical: top, bottom, middle
   *
   * @private
   * @const
   */
  var _TAIL_ALIGN_RULES =
    {
      'right-top' : 'oj-right oj-top',
      'right-middle' : 'oj-right oj-middle',
      'right-bottom' : 'oj-right oj-bottom',
      'left-top' : 'oj-left oj-top',
      'left-middle' : 'oj-left oj-middle',
      'left-bottom' : 'oj-left oj-bottom',
      'center-top' : 'oj-center oj-top',
      'center-middle' : 'oj-left oj-middle',
      'center-bottom' : 'oj-center oj-bottom'
    };

  /**
   * @ojcomponent oj.ojPopup
   * @augments oj.baseComponent
   *
   * @classdesc
   * <h3 id="popupOverview-section">
   *   JET Popup Component
   *  <a class="bookmarkable-link" title="Bookmarkable Link" href="#popupOverview-section"></a></h3>
   *
   * <p>Description: Themeable, WAI-ARIA-compliant popup that can display arbitrary content.</p>
   *
   * <p>A JET popup can be created from a block ( <code class="prettyprint">&lt;div&gt;</code> ),
   * inline element ( <code class="prettyprint">&lt;span&gt;</code> ) or custom element
   * ( <code class="prettyprint">&lt;oj-popup&gt;</code> ).  This element will become the
   * root - outer chrome of the popup.  The content of the popup will be relocated under an
   * element marked with the <code class="prettyprint">.oj-popup-content</code> selector.
   * Dynamic content can be inserted under the element identified by the
   * <code class="prettyprint">.oj-popup-content</code> selector.  However, page developers
   * are encouraged to create their own content element to anchor dynamic content changes
   * versus using <code class="prettyprint">.oj-popup-content</code> as the marker selector.</p>
   *
   * <pre class="prettyprint">
   * <code>&lt;oj-popup id="popup"&gt;
   *   &lt;span class="mycontent"&gt;
   *     Hello World!
   *   &lt;/span class="mycontent"&gt;
   * &lt;/oj-popup&gt;
   * </code></pre>
   *
   * <p>The following is an example of dynamically changing the content of the popup defined above.</p>
   *
   * <pre class="prettyprint">
   * <code>var content = $( "#popup" ).find( ".mycontent" ).first();
   * content.text("Hello Universe!");
   * </code></pre>
   *
   * <p>For WAI-ARIA compliance, JET automatically adds
   * <code class="prettyprint">role="tooltip"</code> to the root popup dom element by default.  The
   * <code class="prettyprint">role</code> option controls the WAI-ARIA role. The popup also adds
   * the <code class="prettyprint">aria-describedby="popup-id"</code> to the launcher while the
   * popup is open.
   * </p>
   *
   * <h3 id="touch-section">
   *   Touch End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#touch-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"touchDoc"}
   *
   *
   * <h3 id="keyboard-section">
   *   Keyboard End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#keyboard-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"keyboardDoc"}
   *
   * <br/><br/>
   *
   * <h3 id="accessibility-section">
   *   Accessibility
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#accessibility-section"></a>
   * </h3>
   *
   * <p>One point often overlooked is making the gestures that launch a popup accessible.
   *   There are no constraints to what events a page developer might choose to trigger opening a
   *   popup.  The choice should be accessible for screen reader users.  Page
   *   developers should take care when using mouse events to trigger opening of a popup.
   *   This is especially important if the content of the popup can't be derived from other
   *   visible areas on the page. In cases that mouseover, mouseout, mouseenter, mouseleave and
   *   hover events are used to launch popups, there needs to be a keyboard functional equivalency.
   * </p>
   *
   * <p>See also the <a href="#styling-section">oj-focus-highlight</a> discussion.
   *
   * <h3 id="pseudos-section">
   *   Pseudo-selectors
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#pseudos-section"></a>
   * </h3>
   *
   * <p>The <code class="prettyprint">:oj-popup</code> pseudo-selector can be used in jQuery
   * expressions to select JET Popups.  For example:</p>
   *
   * <pre class="prettyprint">
   * <code>var popups = $( ":oj-popup" )
   * </code></pre>
   *
   * <h3 id="reparenting-section">
   *   Reparenting
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#reparenting-section"></a>
   * </h3>
   *
   *  <p id="reparenting-strategy">
   *     When popups are open, they will be reparented in the document and reparented back when
   *     closed. When open, the location of the popup within the document will be in context of
   *     how it's used. Popups open from other popups will be relocated in the document into the
   *     nearest parent popup's layer. The popups layer defines its z-index weight "stacking
   *     context".  The ojPopup's layer is marked with the "oj-popup-layer" style.
   *     The context of opening is defined by the launcher argument passed to the open method.  If
   *     not open from another popup, the popup will be reparented to a container in the document
   *     body. Popups of the same type are assigned the same z-index values.  The layering between
   *     peer popups reflect the opening order. The popup that has active focus will be assigned a
   *     greater z-index value. This is applied to the popup's layer by way of the "oj-focus-within"
   *     pseudo selector applied with "oj-popup-layer" selector. The page author has control over
   *     z-index weights by way of the "oj-popup-layer" selector.
   *  </p>
   *  <p>
   *     There are known caveats with this design. However, these scenarios are considered "bad use"
   *     based on our JET popup strategy.
   *  </p>
   *  <ol>
   *    <li>Events raised within the popup will not bubble up to the popup's original ancestors.
   *        Instead, listeners for popup events should be applied to either the popup's root
   *        element, or the document.</li>
   *    <li>Likewise, developers should not use CSS descendant selectors, or similar logic, that
   *        assumes that the popup will remain a child
   *        of its original parent.</li>
   *    <li>Popups containing iframes are problematic.  The iframe elements "may" fire a HTTP GET
   *        request for its src attribute each time the iframe is reparented in the document.</li>
   *    <li>In some browsers, reparenting a popup that contains elements having overflow, will cause
   *        these overflow elements to reset their scrollTop.</li>
   *  </ol>
   *
   * <h3 id="styling-section">
   *   Styling
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"stylingDoc"}
   *
   * <h3 id="eventHandling-section">
   *   Event Handling
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#eventHandling-section"></a>
   * </h3>
   * <ul>
   *  <li>beforeClose(event, ui) - Triggered before a popup closes. Event can prevent closing the
   *      popup; However, there are cases the framework must veto, such as when the popup is
   *      destroyed.</li>
   *  <li>beforeOpen(event, ui) - Triggered before a popup closes. Event can prevent opening the
   *      popup.</li>
   *  <li>close(event, ui) - Triggered after the popup has closed.</li>
   *  <li>create(event, ui) - Triggered after the component has been bound to an associated dom
   *      element.</li>
   *  <li>focus(event, ui) - Triggered when initial focus is established on opening, depending on
   *      the value of the initalFocus option, or <kbd>F6</kbd> focus toggle from the associated
   *      launcher.</li>
   *  <li>open(event, ui) - Triggered after the popup has been made visible.</li>
   * </ul>
   *
   * @desc Creates a JET Popup.
   *
   * @param {Object=} options a map of option-value pairs to set on the component
   *
   * @example <caption>Initialize the popup with no options specified:</caption>
   * $( ".selector" ).ojPopup();
   *
   * @example <caption>Initialize the popup with behaviors of a notewindow:</caption>
   * $( ".selector" ).ojPopup({initialFocus: 'none', autoDismiss: 'focusLoss', tail: 'simple'});
   *
   * @example <caption>Initialize a popup via the JET <code class="prettyprint">ojComponent</code>
   *          binding:</caption>
   * &lt;div id="popup1" data-bind="ojComponent: {component: 'ojPopup'}">This is a popup!&lt;/div>
   *
   */
  oj.__registerWidget("oj.ojPopup", $['oj']['baseComponent'],
    {
      widgetEventPrefix : "oj",
      options :
        {
          /**
           *
           * @private
           * @memberof! oj.ojPopup
           * @instance
           */
          'animation' : null,
          /**
           * Defines conditions that will cause an open popup to auto close dismiss.  A value of
           * <code class="prettyprint">focusLoss</code> defines the dismissal condition where focus
           * has left the content of the popup or from the associated launcher or if what the popup
           * is aligned to is not fully visible within an overflow area.
           *
           * @expose
           * @memberof! oj.ojPopup
           * @instance
           * @type {string}
           * @default <code class="prettyprint">"focusLoss"</code>
           * @ojvalue {string} "none" disables auto dismissal behaviors.
           * @ojvalue {string} "focusLoss" defines auto dismissal behavior when focus leaves the
           *   content of the popup or associated launcher.  In addition, if what the popup is
           *   positioned to is clipped within an overflow area, the popup will auto close dismiss.
           *
           * @example <caption>Initialize the popup with
           *          <code class="prettyprint">autoDismiss</code> option specified:</caption>
           * $( ".selector" ).ojPopup( { "autoDismiss": "focusLoss" } );
           *
           * @example <caption>Get or set the <code class="prettyprint">autoDismiss</code> option,
           *          after initialization:</caption>
           * // getter
           * var autoDismiss = $( ".selector" ).ojPopup( "option", "autoDismiss" );
           * // setter
           * $( ".selector" ).ojPopup( "option", "autoDismiss", "none" );
           */
          autoDismiss : 'focusLoss',
          /**
           * Defines the presents of border, shadow and background color of the root popup dom.
           * Value of <code class="prettyprint">none</code> applies the
           * <code class="prettyprint">oj-popup-no-chrome</code> selector defined by the active
           * theme to the root dom of the popup to remove the default chrome.
           *
           * @expose
           * @memberof! oj.ojPopup
           * @instance
           * @type {string}
           * @default <code class="prettyprint">"default"</code>
           * @ojvalue {string} "default" describes the popups border, shadow, and background color
           *           defined by the active theme.
           * @ojvalue {string} "none" turns off the outer chrome defined by the active theme.
           *
           * @example <caption>Initialize the popup with <code class="prettyprint">chrome</code>
           *          option specified:</caption>
           * $( ".selector" ).ojPopup( { "chrome": "none" } );
           *
           * @example <caption>Get or set the <code class="prettyprint">chrome</code> option, after
           *          initialization:</caption>
           * // getter
           * var chrome = $( ".selector" ).ojPopup( "option", "chrome" );
           *
           * // setter
           * $( ".selector" ).ojPopup( "option", "chrome", "none" );
           */
          chrome : 'default',
          /**
           * Determines if the popup should steal focus to its content when initially open. A value
           * of <code class="prettyprint">none</code> prevents the popup from grabbing focus when
           * open.
           *
           * @expose
           * @memberof! oj.ojPopup
           * @instance
           * @type {string}
           * @default <code class="prettyprint">"auto"</code>
           * @ojvalue {string} "auto" option is derived from the values of the modality and
           *          autoDismiss options
           * @ojvalue {string} "none" prevents the popup from stealing focus when open.
           * @ojvalue {string} "firstFocusable" defines that a popup should grab focus to the first
           *          focusable element within the popup's content.
           * @ojvalue {string} "popup" focus to the root popup container (good choice for touch
           *          platforms).
           *
           * @example <caption>Initialize the popup with
           *           <code class="prettyprint">initialFocus</code> option specified:</caption>
           * $( ".selector" ).ojPopup( { "initialFocus": "none" } );
           *
           * @example <caption>Get or set the <code class="prettyprint">initialFocus</code> option,
           *          after initialization:</caption>
           * // getter
           * var initialFocus = $( ".selector" ).ojPopup( "option", "initialFocus" );
           *
           * // setter
           * $( ".selector" ).ojPopup( "option", "initialFocus", "none" );
           */
          initialFocus : 'auto',
          /**
           * <p>Position object is used to establish the location the popup will appear relative to
           * another element. Positioning defines "my" alignment "at" the alignment "of" some other
           * thing which can be "offset" by so many pixels.</p>
           *
           * <p>The "my" and "at" properties defines aligment points relative to the popup and other
           * element.  The "my" property represents the popups alignment where the "at" property
           * represents the other element that can be identified by "of" or defauts to the launcher
           * when the popup opens.  The values of these properties describe horizontal and
           * vertical alignments.</p>
           *
           * @deprecated <a href="http://api.jqueryui.com/position/">jQuery UI
           * position</a> syntax is deprectated in v3.0.0; Use of a percent unit with
           * "my" or "at" is not supported.
           * @expose
           * @memberof! oj.ojPopup
           * @instance
           * @type {Object}
           * @example <caption>Initialize the popup with <code class="prettyprint">position</code>
           *           option specified:</caption>
           * $( ".selector" ).ojPopup( { "position": {"my": {"horizontal":"left", "vertical": "top"},
           *                                    "at": {"horizontal":"right", "vertical": "top"} } );
           *
           * @example <caption>Get or set the <code class="prettyprint">position</code> option,
           *          after initialization:</caption>
           * // getter
           * var position = $( ".selector" ).ojPopup( "option", "position" );
           *
           * // setter
           * $( ".selector" ).ojPopup( "option", "position",
           *    {"my": {"horizontal": "start", "vertical": "bottom"},
           *     "at": {"horizontal": "end", "vertical": "top" },
           *     "offset": {"x": 0, "y":5}} );
           */
          position :
            {
              /**
               * Defines which edge on the popup to align with the target ("of") element.
               *
               * @expose
               * @memberof! oj.ojPopup
               * @instance
               * @alias position.my
               * @type {{horizontal:string, vertical:string}}
               * @default <code class="prettyprint">{"horizontal":"start","vertical":"top"}</code>
               */
              'my' : {
                /**
                 * @expose
                 * @memberof! oj.ojPopup
                 * @instance
                 * @alias position.my.horizontal
                 * @type {string}
                 * @default <code class="prettyprint">start</code>
                 * @ojvalue {string} "start" evaluates to "left" in LTR mode and "right" in RTL mode.
                 * @ojvalue {string} "end" evaluates to "right" in LTR mode and "left" in RTL mode.
                 * @ojvalue {string} "left"
                 * @ojvalue {string} "center"
                 * @ojvalue {string} "right"
                 */
                'horizontal': 'start',
                /**
                 * @expose
                 * @memberof! oj.ojPopup
                 * @instance
                 * @alias position.my.vertical
                 * @type {string}
                 * @default <code class="prettyprint">top</code>
                 * @ojvalue {string} "top"
                 * @ojvalue {string} "center"
                 * @ojvalue {string} "bottom"
                 */
                'vertical': 'top'
              },
              /**
               * Defines a point offset in pixels from the ("my") alignment.
               * @expose
               * @memberof! oj.ojPopup
               * @instance
               * @alias position.offset
               * @type {{x:number, y:number}}
               */
              'offset': {
                /**
                 * @expose
                 * @memberof! oj.ojPopup
                 * @instance
                 * @alias position.offset.x
                 * @type {number}
                 * @default <code class="prettyprint">0</code>
                 */
                'x': 0,
                /**
                 * @expose
                 * @memberof! oj.ojPopup
                 * @instance
                 * @alias position.offset.y
                 * @type {number}
                 * @default <code class="prettyprint">0</code>
                 */
                'y': 0
              },
              /**
               * Defines which position on the target element ("of") to align the positioned element
               * against.
               *
               * @expose
               * @memberof! oj.ojPopup
               * @instance
               * @alias position.at
               * @type {{horizontal:string, vertical:string}}
               * @default <code class="prettyprint">{"horizontal":"start","vertical":"bottom"}</code>
               */
              'at' : {
                /**
                 * @expose
                 * @memberof! oj.ojPopup
                 * @instance
                 * @alias position.at.horizontal
                 * @type {string}
                 * @default <code class="prettyprint">start</code>
                 * @ojvalue {string} "start" evaluates to "left" in LTR mode and "right" in RTL mode.
                 * @ojvalue {string} "end" evaluates to "right" in LTR mode and "left" in RTL mode.
                 * @ojvalue {string} "left"
                 * @ojvalue {string} "center"
                 * @ojvalue {string} "right"
                 */
                'horizontal': 'start',
                /**
                 * @expose
                 * @memberof! oj.ojPopup
                 * @instance
                 * @alias position.at.vertical
                 * @type {string}
                 * @default <code class="prettyprint">top</code>
                 * @ojvalue {string} "top"
                 * @ojvalue {string} "center"
                 * @ojvalue {string} "bottom"
                 */
                'vertical': 'bottom'
              },
              /**
               * Which element to position the popup against.  The default is the
               * <code class="prettyprint">launcher</code> argument passed to the
               * <code class="prettyprint">open</code> method.
               *
               * If the value is a string, it should be a selector or the literal string value
               * of <code class="prettyprint">window</code>.  Otherwise, a point of x,y.  When a point
               * is used, the values are relative to the whole document.  Page horizontal and vertical
               * scroll offsets need to be factored into this point - see UIEvent
               * <a href="https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/pageX">pageX</a>,
               * <a href="https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/pageY">pageY</a>.
               *
               * @example <caption>Finding the point for an svg element:</caption>
               * var rect = svgDom.getBoundingClientRect();
               * var position = {of:{x:rect.left + window.pageXOffset, y:rect.top + window.pageYOffset}};
               *
               * @expose
               * @memberof! oj.ojPopup
               * @instance
               * @alias position.of
               * @type {string|{x, number, y: number}|undefined}
               */
              'of' : undefined,
              /**
               * Defines rules for alternate alignment.
               *
               * @expose
               * @memberof! oj.ojPopup
               * @instance
               * @alias position.collision
               * @type {string}
               * @default <code class="prettyprint">flip</code>
               * @ojvalue {string} "flip" the element to the opposite side of the target and the
               *  collision detection is run again to see if it will fit. Whichever side
               *  allows more of the element to be visible will be used.
               * @ojvalue {string} "fit" shift the element away from the edge of the window.
               * @ojvalue {string} "flipfit" first applies the flip logic, placing the element
               *  on whichever side allows more of the element to be visible. Then the fit logic
               *  is applied to ensure as much of the element is visible as possible.
               * @ojvalue {string} "none" no collision detection.
               */
              'collision' : 'flip'
            },
          /**
           * Determines if a decoration will be displayed from the popup that points to the element
           * the popup is aligned to. The <code class="prettyprint">simple</code> value enables the
           * tail defined by the current theme.  In addtion, the
           * <code class="prettyprint">oj-popup-tail-simple</code> selector will be applied to the
           * root dom element.  This is to allow the box-shadow, z-index and other chrome styling to
           * vary per tail decoration.
           *
           * @expose
           * @memberof! oj.ojPopup
           * @instance
           * @type {string}
           * @default <code class="prettyprint">"none"</code>
           * @ojvalue {string} "none" no decoration will be displayed from the popup pointing to the
           *          launcher.
           * @ojvalue {string} "simple" enables showing the tail defined by the current theme.
           *
           * @example <caption>Initialize the popup with <code class="prettyprint">tail</code>
           *          option specified:</caption>
           * $( ".selector" ).ojPopup( { "tail": "simple" } );
           *
           * @example <caption>Get or set the <code class="prettyprint">tail</code> option, after
           *          initialization:</caption>
           * // getter
           * var tail = $( ".selector" ).ojPopup( "option", "tail" );
           *
           * // setter
           * $( ".selector" ).ojPopup( "option", "tail", "simple" );
           */
          tail : 'none',
          /**
           * Determines if the popup should block user input of the page behind with a blocking
           * overlay pane.
           *
           * <p>The default modality varies by theme.  Each theme can set its default by setting
           * <code class="prettyprint">$popupModalityOptionDefault</code> as seen in the example
           * below.
           *
           * @expose
           * @memberof oj.ojPopup
           * @instance
           * The modality of the popup. Valid values are:
           * @default Varies by theme. <code class="prettyprint">"modless"</code> if not specified
           *          in theme
           * @ojvalue {string} "modeless" defines a modeless popup.
           * @ojvalue {string} "modal" The popup is modal. Interactions with other page elements are
           *          disabled. Modal popups overlay other page elements.
           * @type {string}
           *
           * @example <caption>Initialize the popup to have modality
           *          <code class="prettyprint">modality</code></caption>
           * $(".selector" ).ojPopup( {modality: "modal" } );
           *
           * @example <caption>Get or set the <code class="prettyprint">modality</code> option,
           *          after initialization:</caption>
           * // getter
           * var modality = $(".selector" ).ojPopup( "option", "modality" );
           *
           * // setter
           * $(".selector" ).ojPopup( "option", "modality", "modal");
           *
           * @example <caption>Set the default in the theme (SCSS) :</caption>
           * $popupModalityOptionDefault: modal !default;
           */
          modality : "modeless",
          /**
           *
           * The WAI-ARIA role of the popup. By default, role="tooltip" is added to the generated
           * HTML markup that surrounds the popup.
           *
           * @expose
           * @memberof oj.ojPopup
           * @instance
           * @type {string}
           * @default <code class="prettyprint">"tooltop"</code>
           * @ojvalue {string} "tooltip" defines contextual popup that displays a description for an
           *          element.
           * @ojvalue {string} "dialog" defines an application window that is designed to interrupt
           *          the current processing of an application in order to prompt the user to enter
           *          information or require a response.
           * @ojvalue {string} "alertdialog" defines type of dialog that contains an alert message,
           *          where initial focus goes to an element within the dialog.
           *
           * @example <caption>Initialize the popup with the
           *          <code class="prettyprint">role</code></caption> option specified:</caption>
           * $(".selector" ).ojPopup( {role: "alertdialog" } );
           *
           * @example <caption>Get or set the <code class="prettyprint">role</code> option, after
           *          initialization:</caption>
           * // getter
           * var role = $(".selector" ).ojPopup( "option", "role" );
           *
           * // setter
           * $(".selector" ).ojDialog( "option", "role", "alertdialog");
           */
          role : "tooltip",
          // Events
          /**
           * Triggered before the popup is launched via the <code class="prettyprint">open()</code>
           * method. The launch can be cancelled by calling
           * <code class="prettyprint">event.preventDefault()</code>.
           *
           * @expose
           * @event
           * @memberof! oj.ojPopup
           * @instance
           * @property {Event} event <code class="prettyprint">jQuery</code> event object
           * @property {Object} ui currently empty
           *
           * @example <caption>Initialize the popup with the
           *          <code class="prettyprint">beforeOpen</code> callback specified:</caption>
           * $( ".selector" ).ojPopup({
           *     "beforeOpen": function( event, ui ) {}
           * });
           *
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">ojbeforeopen</code> event:</caption>
           * $( ".selector" ).on( "ojbeforeopen", function( event, ui )
           *   {
           *     // verify that the component firing the event is a component of interest
           *     if ($(event.target).is(".mySelector")) {}
           * } );
           */
          beforeOpen : null,
          /**
           * Triggered after the popup is launched via the <code class="prettyprint">open()</code>
           * method.
           *
           * @expose
           * @event
           * @memberof! oj.ojPopup
           * @instance
           * @property {Event} event <code class="prettyprint">jQuery</code> event object
           * @property {Object} ui currently empty
           *
           * @example <caption>Initialize the popup with the <code class="prettyprint">open</code>
           *          callback specified:</caption>
           * $( ".selector" ).ojPopup({
           *     "open": function( event, ui ) {}
           * });
           *
           * @example <caption>Bind an event listener to the <code class="prettyprint">ojopen</code>
           *          event:</caption>
           * $( ".selector" ).on( "ojopen", function( event, ui )
           *   {
           *     // verify that the component firing the event is a component of interest
           *     if ($(event.target).is(".mySelector")) {}
           *   } );
           */
          open : null,
          /**
           * Triggered before the popup is dismissed via the
           * <code class="prettyprint">close()</code> method. The close can be cancelled by calling
           * <code class="prettyprint">event.preventDefault()</code>.
           *
           * @expose
           * @event
           * @memberof! oj.ojPopup
           * @instance
           * @property {Event} event <code class="prettyprint">jQuery</code> event object
           * @property {Object} ui currently empty
           *
           * @example <caption>Initialize the popup with the
           *          <code class="prettyprint">beforeClose</code> callback specified:</caption>
           * $( ".selector" ).ojPopup({
           *     "beforeClose": function( event, ui ) {}
           * });
           *
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">ojbeforeclose</code> event:</caption>
           * $( ".selector" ).on( "ojbeforeclose", function( event, ui )
           *  {
           *    // verify that the component firing the event is a component of interest
           *    if ($(event.target).is(".mySelector")) {}
           *  } );
           */
          beforeClose : null,
          /**
           * Triggered after the popup is dismissed via the
           * <code class="prettyprint">close()</code> method.
           *
           * @expose
           * @event
           * @memberof! oj.ojPopup
           * @instance
           * @property {Event} event <code class="prettyprint">jQuery</code> event object
           * @property {Object} ui currently empty
           *
           * @example <caption>Initialize the popup with the <code class="prettyprint">close</code>
           *          callback specified:</caption>
           * $( ".selector" ).ojPopup({
           *     "close": function( event, ui ) {}
           * });
           *
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">ojclose</code> event:</caption>
           * $( ".selector" ).on( "ojclose", function( event, ui )
           *  {
           *    // verify that the component firing the event is a component of interest
           *    if ($(event.target).is(".mySelector")) {}
           *  } );
           */
          close : null,
          /**
           * Triggered after focus has been transfered to the popup. This will occur after the
           * <code class="prettyprint">open()</code> method is called, depending on the value
           * of the <code class="prettyprint">initialFocus</code> option.  It's also triggered when
           * using the <kbd>F6</kbd> key to toggle focus from the associated launcher element to the
           * content of the popup.
           *
           * @expose
           * @event
           * @memberof! oj.ojPopup
           * @instance
           * @property {Event} event <code class="prettyprint">jQuery</code> event object
           * @property {Object} ui currently empty
           *
           * @example <caption>Initialize the popup with the <code class="prettyprint">focus</code>
           *          callback specified:</caption>
           * $( ".selector" ).ojPopup({
           *     "focus": function( event, ui ) {}
           * });
           *
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">ojfocus</code> event:</caption>
           * $( ".selector" ).on( "ojfocus", function( event, ui )
           *   {
           *     // verify that the component firing the event is a component of interest
           *     if ($(event.target).is(".mySelector")) {}
           *   } );
           */
          focus : null,
          /**
           * Triggered when a default animation is about to start, such as when the component is
           * being opened/closed or a child item is being added/removed. The default animation can
           * be cancelled by calling <code class="prettyprint">event.preventDefault</code>.
           *
           * @expose
           * @event
           * @memberof! oj.ojPopup
           * @instance
           * @property {Event} event <code class="prettyprint">jQuery</code> event object
           * @property {Object} ui Parameters
           * @property {string} ui.action The action that is starting the animation. The number of
           *            actions can vary from component to component. Suggested values are:
           *                    <ul>
           *                      <li>"open" - when a popup component is opened</li>
           *                      <li>"close" - when a popup component is closed</li>
           *                    </ul>
           * @property {Element} ui.element target of animation
           * @property {function} ui.endCallback If the event listener calls event.preventDefault to
           *            cancel the default animation, It must call the endCallback function when it
           *            finishes its own animation handling and any custom animation has ended.
           *
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">animatestart</code> event to override the default
           *          "open" animation:</caption>
           * $( ".selector" ).ojPopup({"animateStart": function( event, ui )
           *   {
           *     // verify that the component firing the event is a component of interest and action
           *      is open
           *     if ($(event.target).is(".mySelector") && ui.action === "open") {
           *       event.preventDefault();
           *       oj.AnimationUtils.slideIn(ui.element).then(ui.endCallback);
           *   }
           * } );
           *
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">ojanimatestart</code> event to override the default
           *          "close" animation:</caption>
           * $( ".selector" ).on( "ojanimatestart", function( event, ui )
           *   {
           *     // verify that the component firing the event is a component of interest and action
           *      is close
           *     if ($(event.target).is(".mySelector") && ui.action == "close") {
           *       event.preventDefault();
           *       oj.AnimationUtils.slideOut(ui.element).then(ui.endCallback);
           *   } );
           *
           * @example <caption>The default open and close animations are controlled via the theme
           *          (SCSS) :</caption>
           * $popupOpenAnimation: ((effect: "zoomIn"), "fadeIn")  !default;
           * $popupCloseAnimation: ((effect: "zoomOut", persist: "all"), "fadeOut")  !default;
           */
          animateStart : null,
          /**
           * Triggered when a default animation has ended, such as when the component is being
           * opened/closed or a child item is being added/removed. This event is not triggered if
           * the application has called preventDefault on the animateStart
           * event.
           *
           * @expose
           * @event
           * @memberof! oj.ojPopup
           * @instance
           * @property {Event} event <code class="prettyprint">jQuery</code> event object
           * @property {Object} ui.element target of animation
           * @property {string} ui.action The action that is starting the animation. The number of
           *                    actions can vary from component to component. Suggested values are:
           *                    <ul>
           *                      <li>"open" - when a popup component is opened</li>
           *                      <li>"close" - when a popup component is closed</li>
           *                    </ul>
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">animateend</code> event to listen for "open" ending
           *          animation:</caption>
           * $( ".selector" ).ojPopup({"animateEnd": function( event, ui )
           *   {
           *     // verify that the component firing the event is a component of interest and action
           *     is open
           *     if (ui.action === "open") {}
           *   }
           * } );
           *
           * @example <caption>Bind an event listener to the
           *          <code class="prettyprint">ojanimateend</code> event to listen for the "close"
           *          ending animation:</caption>
           * $( ".selector" ).on( "ojanimateend", function( event, ui )
           *   {
           *     // verify that the component firing the event is a component of interest and action
           *      is close
           *     if ($(event.target).is(".mySelector") && ui.action == "close") {}
           *   } );
           *
           * @example <caption>The default open and close animations are controlled via the theme
           *          (SCSS) :</caption>
           * $popupOpenAnimation: (effect: "zoomIn", fade: true)  !default;
           * $popupCloseAnimation: (effect: "zoomOut", fade: true)  !default;
           */
          animateEnd : null
        },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @protected
       * @override
       */
      _ComponentCreate : function ()
      {
        this._super();

        var rootStyle = this._getRootStyle();
        var element = this.element;
        element.hide().addClass(rootStyle).attr("aria-hidden", "true");
        element.addClass("oj-component");

        // Creates a content element and moves the children of the root to the content element
        // and then appends the content element to the root element.
        var content = $("<div>");
        content.addClass([rootStyle, "content"].join("-"));
        content.attr("role", "presentation");
        content.append(element[0].childNodes);    // @HTMLUpdateOK move children to content
        content.appendTo(element);   // @HTMLUpdateOK
        this._content = content;

        this._setChrome();
        this._setupFocus(element);

        // fixup the position option set via the widget constructor
        var options = this.options;
        options["position"] = oj.PositionUtils.coerceToJet(options["position"]);
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @protected
       * @override
       */
      _AfterCreate: function ()
      {
        // first apply rootAttributes that might define an id if unspecified
        this._super();

        // aria-describedby needs an id.  Assign an id to the popup root if not already defined.
        this.element.uniqueId();

        // create the tail with a subid
        this._createTail();
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @protected
       * @override
       */
      _destroy : function ()
      {
        if (this.isOpen())
          this._closeImplicitly();

        this._setWhenReady("none");
        this._destroyTail();
        delete this._popupServiceEvents;

        // make sure the root element is hidden
        var element = this.element;
        element.hide().attr("aria-hidden", "true").removeUniqueId();

        // Move the children back under the root node removing the content node.
        var content = this._content;
        delete this._content;
        element.append(content[0].childNodes);  // @HTMLUpdateOK move childeren back under root
        content.remove();

        var closeDelayTimer = this._closeDelayTimer;
        if (!isNaN(closeDelayTimer))
        {
          delete this._closeDelayTimer;
          window.clearTimeout(closeDelayTimer);
        }

        this._destroyVoiceOverAssist();
        this._super();
      },
      /**
       * Opens the popup. This method accepts two arguments but both are optional.
       *
       *
       * @expose
       * @method
       * @name oj.ojPopup#open
       * @memberof oj.ojPopup
       * @instance
       * @param {?(string|jQuery|Element)} launcher jquery object, jquery selector or dom element
       *        that is associated with the popup.
       * @param {?Object} position an element relative to another
       * @fires oj.ojPopup#beforeOpen
       * @fires oj.ojPopup#open
       * @fires oj.ojPopup#animationStart
       * @fires oj.ojPopup#animationEnd
       *
       * @example <caption>Invoke the <code class="prettyprint">open</code> method:</caption>
       * var open = $( ".selector" ).ojPopup( "open" );
       */
      open : function (launcher, position)
      {
        if (this._isOperationPending("open", [launcher, position]))
          return;

        if (this.isOpen())
        {
          this._closeImplicitly();
        }

        this._setLauncher(launcher);

        var element = this.element;
        launcher = this._launcher;

        if (this._trigger("beforeOpen") === false)
          return;

        this._setWhenReady("open");

        var options = this.options;
        position = position ? position : options["position"];
        if (!position["of"])
        {
          this._hasPositionOfLauncherOverride = true;
          position["of"] = launcher;
        }

        this._setPosition(position);

        this._setAutoDismiss(options["autoDismiss"]);
        this._addDescribedBy();

        if (!this._IsCustomElement() || !element[0].hasAttribute["role"])
          element.attr("role", options["role"]);

        // convert to the jquery ui position format
        position = this._getPositionAsJqUi();

        // build layer class selectors applied to the popup layer
        var rootStyle = this._getRootStyle();
        var layerClass = [rootStyle, "layer"].join("-");
        var tailDecoration = options['tail'];
        if ("none" !== tailDecoration)
          layerClass += " " + [rootStyle, "tail", tailDecoration].join("-");

        /** @type {!Object.<oj.PopupService.OPTION, ?>} */
        var psOptions = {};
        psOptions[oj.PopupService.OPTION.POPUP] = element;
        psOptions[oj.PopupService.OPTION.LAUNCHER] = launcher;
        psOptions[oj.PopupService.OPTION.POSITION] = position;
        psOptions[oj.PopupService.OPTION.EVENTS] = this._getPopupServiceEvents();
        psOptions[oj.PopupService.OPTION.LAYER_SELECTORS] = layerClass;
        psOptions[oj.PopupService.OPTION.MODALITY] = options["modality"];
        oj.PopupService.getInstance().open(psOptions);

      },
      /**
       * Before open callback is called after the popup has been reparented into the
       * zorder container. Open animation is performed here.
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for opening the popup
       * @return {Promise|void}
       */
      _beforeOpenHandler : function (psOptions)
      {
        var element = psOptions[oj.PopupService.OPTION.POPUP];
        var position = psOptions[oj.PopupService.OPTION.POSITION];

        element.show();
        element["position"](position);

        // TODO might want to add fadeIn for the modal overlay in the future.
        var animationOptions = this.options["animation"];
        if (animationOptions && animationOptions["open"])
        {
          return oj.AnimationUtils.startAnimation(element[0], "open",
            oj.PositionUtils.addTransformOriginAnimationEffectsOption(element,
            animationOptions["open"]), this);
        }
        else
        {
          return void(0);
        }
      },
      /**
       * Called after the popup is shown. Perform open finalization.
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for opening the popup
       * @return {void}
       */
      _afterOpenHandler : function (psOptions)
      {
        var element = psOptions[oj.PopupService.OPTION.POPUP];
        var launcher = psOptions[oj.PopupService.OPTION.LAUNCHER];

        this._trigger("open");

        this._intialFocus();

        this._initVoiceOverAssist();

        this._on(element, {'keydown' : this._keyHandler, 'keyup' : this._keyHandler});
        if (launcher && launcher.length > 0)
          this._on(launcher, {'keydown' : this._keyHandler, 'keyup' : this._keyHandler});

        this._isOpen = true;
      },
      /**
       * Closes the popup. This method does not accept any arguments.
       *
       * @expose
       * @method
       * @name oj.ojPopup#close
       * @memberof oj.ojPopup
       * @instance
       * @fires oj.ojPopup#beforeClose
       * @fires oj.ojPopup#close
       * @fires oj.ojPopup#animationStart
       * @fires oj.ojPopup#animationEnd
       *
       * @example <caption>Invoke the <code class="prettyprint">close</code> method:</caption>
       * var close = $( ".selector" ).ojPopup( "close" );
       */
      close : function ()
      {
        if (this._isOperationPending("close", []))
          return;

        if (!this.isOpen())
          return;

        if (this._trigger("beforeClose") === false && !this._ignoreBeforeCloseResultant)
          return;

        this._setWhenReady("close");
        delete this._isOpen;

        // if the content has focus, restore the the launcher
        this._restoreFocus();

        var launcher = this._launcher;
        var element = this.element;

        this._off(element, "keydown keyup");
        if (launcher && launcher.length > 0)
          this._off(launcher, "keydown keyup");

        //clean up voice over assist
        this._destroyVoiceOverAssist();

        /** @type {!Object.<oj.PopupService.OPTION, ?>} */
        var psOptions = {};
        psOptions[oj.PopupService.OPTION.POPUP] = element;
        oj.PopupService.getInstance().close(psOptions);

      },
      /**
       * Before callback is invoked while the popup is still visible and still parented in the
       * zorder container. Close animation is performed here.
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for closing the popup
       * @return {Promise|void}
       */
      _beforeCloseHandler : function (psOptions)
      {
        var element = psOptions[oj.PopupService.OPTION.POPUP];

        //TODO might want to add fadeOut for the modal overlay in the future.
        var animationOptions = this.options["animation"];

        if (!this._ignoreBeforeCloseResultant && animationOptions && animationOptions["close"])
        {
          var style = element.attr("style");
          /** @type {?} */
          var promise = oj.AnimationUtils.startAnimation(element[0], "close",
            oj.PositionUtils.addTransformOriginAnimationEffectsOption(element,
              animationOptions["close"]), this)
            .then(function ()
            {
              element.attr("style", style);
              element.hide();
            });
          return promise;
        }
        else
        {
          element.hide();
          return void(0);
        }
      },
      /**
       * Close finalization callback.
       *
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {!Object.<oj.PopupService.OPTION, ?>} psOptions property bag for closing the popup
       * @return {void}
       */
      _afterCloseHandler : function (psOptions)
      {
        this._removeDescribedBy();
        this._setAutoDismiss();

        delete this._launcher;
        this._trigger("close");

        if (this._hasPositionOfLauncherOverride)
        {
          var options = this.options;
          options["position"]["of"] = null;
          delete this._hasPositionOfLauncherOverride;
        }
      },
      /**
       * Returns the state of whether the popup is currently open. This method does not accept any
       * arguments.
       *
       * @expose
       * @method
       * @name oj.ojPopup#isOpen
       * @memberof oj.ojPopup
       * @instance
       * @return {boolean} <code>true</code> if the popup is open.
       *
       * @example <caption>Invoke the <code class="prettyprint">isOpen</code> method:</caption>
       * var isOpen = $( ".selector" ).ojPopup( "isOpen" );
       */
      isOpen : function ()
      {
        return this._isOpen ? true : false;
      },
      /**
       * Causes the popup to reevaluate its position.  Call this function after
       * the content of the popup has dynamically changed while the popup is open.
       *
       * <p>This method does not accept any arguments.</p>
       *
       * @expose
       * @method
       * @name oj.ojPopup#refresh
       * @memberof oj.ojPopup
       * @instance
       * @override
       *
       * @example <caption>Invoke the <code class="prettyprint">refresh</code> method:</caption>
       * $( ".selector" ).ojPopup( "refresh" );
       */
      refresh : function ()
      {
        this._super();

        if (!this.isOpen())
          return;

        if (!this._reposition())
          return;

        // trigger refresh of descendents if reposition was successful
        var element = this.element;
        oj.PopupService.getInstance().triggerOnDescendents(element,
          oj.PopupService.EVENT.POPUP_REFRESH);
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @protected
       * @param {string} key option name
       * @param {?Object} value of the target option identified by the key
       * @override
       */
      _setOption : function (key, value)
      {

        var options = this.options;
        switch (key)
        {
          case "tail":
            if (value !== options["tail"])
            {
              this._setTail(value);
            }
            break;
          case "chrome":
            if (value !== options["chrome"])
              this._setChrome(value);
            break;
          case "position":
            this._setPosition(value);
            this.refresh();
            // don't call super because setPosition sets the option after creating a new
            // instance.  This prevents the same position instance from getting registered
            // with multiple component instances.
            return;
          case "autoDismiss":
            if (this.isOpen() && value !== options["autoDismiss"])
              this._setAutoDismiss(value);
            break;
          case "modality":
            if (this.isOpen())
            {
              var element = this.element;
              /** @type {!Object.<oj.PopupService.OPTION, ?>} */
              var psOptions = {};
              psOptions[oj.PopupService.OPTION.POPUP] = element;
              psOptions[oj.PopupService.OPTION.MODALITY] = value;
              oj.PopupService.getInstance().changeOptions(psOptions);
            }
            break;
        }

        this._superApply(arguments);
      },
      /**
       * Returns the root selector prefix for the popup components.  In the future if the popup is
       * subcassed, this method can be made protected and override to change the root selector names
       * for the target component.
       *
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @return {string}
       */
      _getRootStyle : function ()
      {
        return "oj-popup";
      },
      /**
       * Handles setting up the target tail.
       *
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {string} tail option value
       */
      _setTail : function (tail)
      {
        this._destroyTail();
        this._createTail(tail);
        this._reposition();
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {string} tail option value
       */
      _createTail : function (tail)
      {
        var tailDecoration = tail ? tail : this.options['tail'];
        if ("none" === tailDecoration)
          return;

        var rootStyle = this._getRootStyle();
        var tailMarkerStyle = [rootStyle, "tail"].join("-");
        var tailStyle = [tailMarkerStyle, tailDecoration].join("-");

        var tailDom = $("<div>").hide();
        tailDom.addClass(tailMarkerStyle).addClass(tailStyle);
        tailDom.attr("role", "presentation");

        // id over "marker style" due to nesting popups in popups
        this._tailId = tailDom.attr("id", this._getSubId("tail")).attr("id");
        var element = this.element;
        tailDom.appendTo(element);  // @HTMLUpdateOK

        // tail "value" style is applied to the root dom for shadow and z-index adjustments
        element.addClass(tailStyle);

        // The tail can change the z-index of the layer that defines the stacking context
        // of the popup.  If the popup is open, update the layers class.
        if (this.isOpen())
        {
          var layerClass = [rootStyle, "layer"].join("-");
          layerClass += " " + tailStyle;

          /** @type {!Object.<oj.PopupService.OPTION, ?>} */
          var options = {};
          options[oj.PopupService.OPTION.POPUP] = element;
          options[oj.PopupService.OPTION.LAYER_SELECTORS] = layerClass;
          oj.PopupService.getInstance().changeOptions(options);
        }

      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @return {jQuery}
       */
      _getTail : function ()
      {
        var tailId = this._tailId;
        if (!tailId)
          return null;

        return $(document.getElementById(tailId));
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       */
      _destroyTail : function ()
      {

        var tail = this._getTail();
        if (tail)
          tail.remove();

        delete this._tailId;

        var tailDecoration = this.options['tail'];
        var rootStyle = this._getRootStyle();
        var tailStyle = [rootStyle, "tail", tailDecoration].join("-");

        var element = this.element;
        element.removeClass(tailStyle);

        // if the popup is open, reseed the layer class removing the
        // tail style.
        if (this.isOpen())
        {
          var layerClass = [rootStyle, "layer"].join("-");
          /** @type {!Object.<oj.PopupService.OPTION, ?>} */
          var options = {};
          options[oj.PopupService.OPTION.POPUP] = element;
          options[oj.PopupService.OPTION.LAYER_SELECTORS] = layerClass;
          oj.PopupService.getInstance().changeOptions(options);
        }

      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {string} chrome option value
       */
      _setChrome : function (chrome)
      {
        var chromeDecoration = (chrome ? chrome : this.options["chrome"]);
        var noChromeStyle = [this._getRootStyle(), "no-chrome"].join("-");
        var element = this.element;

        if ("default" === chromeDecoration && element.hasClass(noChromeStyle))
          element.removeClass(noChromeStyle);
        else if ("none" === chromeDecoration && !element.hasClass(noChromeStyle))
          element.addClass(noChromeStyle);
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {string|Node|jQuery|null} launcher provided when the popup is open
       */
      _setLauncher : function (launcher)
      {
        if (!launcher)
          launcher = $(document.activeElement);
        else if ($.type(launcher) === "string")//id jquery selector
          launcher = $(launcher);
        else if (launcher.nodeType === 1)//dom element
          launcher = $(launcher);

        // if a jquery collection, select the first dom node not in the popups content
        if (launcher instanceof $ && launcher.length > 1)
        {
          var element = this.element;

          for (var i = 0; i < launcher.length; i++)
          {
            var target = launcher[0];
            if (!oj.DomUtils.isAncestorOrSelf(element[0], target))
            {
              launcher = $(target);
              break;
            }
          }
        }
        else if (!(launcher instanceof $) || //object is not a jq
          ((launcher instanceof $) && launcher.length === 0))// empty jq collection
          launcher = $(document.activeElement);

        this._launcher = launcher;
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {?Object} position object set as an option or passed as an argument to the open
       *                  method.
       */
      _setPosition : function (position)
      {
        var options = this.options;

        // new position extends the existing object
        // covert to jet internal position format
        if (position)
        {
          options["position"] = oj.PositionUtils.coerceToJet(position, options["position"]);
        }
      },

      /**
       * Returns a jQuery UI position object from the internal object.
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @returns {Object}
       */
      _getPositionAsJqUi: function ()
      {
        var options = this.options;
        var position = oj.PositionUtils.coerceToJqUi(options["position"]);
        var isRtl = this._GetReadingDirection() === "rtl";
        position = oj.PositionUtils.normalizeHorizontalAlignment(position, isRtl);

        var origUsing = position["using"];
        origUsing = $.isFunction(origUsing) ? origUsing : null;

        // override with our proxy to handle positioning of the tail
        // overload the callback arguments forcing the original using as the first argument
        position["using"] = this._usingHandler.bind(this, origUsing);

        return position;
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {Function} origUsing position using hander if already provided
       * @param {Object} pos "my" element associated with the position object
       * @param {Object} props directions as to where the element should be moved
       */
      _usingHandler : function (origUsing, pos, props)
      {
        var element = props["element"]["element"];

        // do nothing if the position is the same
        if (pos["top"] === element.css("top") && pos["left"] === element.css("left"))
          return;

        var tail = this._getTail();
        if (!tail)
          element.css(pos);
        else
        {
          tail.hide();
          for (var i = 0; i < _TAIL_STYLES.length; i++)
          {
            tail.removeClass(_TAIL_STYLES[i]);
            element.removeClass(_TAIL_STYLES[i]);
          }
          tail.removeAttr("style");

          // 
          // Check if "of" alignment is to a x,y versus a dom element.  The horizontal
          // rule returned from jquery UI position defaults to "left" or "right".  The height and
          // width of the target will be zero when the "of" is not a DOM element.
          // Use the position.my alignment rules over what jquery returns when aligned to a point.
          //
          // jQuery 3.1 made changes to the offset.  The basic refactor was to switch over to using
          // "Element.getBoundingClientRect()".  Part of this refactor will return a offset rect of
          // {top: 0, left: 0} for any element that doesn't have a bounding box
          // "Element.getClientRects()". Many types of SVG elements such as <g> fall into this
          // category.  The popup will appear in the top left of the browser.
          //
          if (props["target"] && props["target"]["height"] === 0 && props["target"]["width"] === 0)
          {
            var isRtl = this._GetReadingDirection() === "rtl";
            var position = oj.PositionUtils.normalizeHorizontalAlignment(this.options["position"], isRtl);
            var myrule = position["my"];
            if (!oj.StringUtils.isEmptyOrUndefined(myrule))
            {
              // If the original horizontal rule is center, use it; otherwise, use the calculated
              // hint. The left/right rules reflect the actual positioning but center is never
              // represented correctly aligned to a point even though the alignment is correct.
              var suggestedHrule = "center" === myrule["horizontal"] ? myrule["horizontal"] : props["horizontal"];
              var suggestedVrule = ("center" === myrule["vertical"]) ? "middle" : myrule["vertical"];
              props['horizontal'] = suggestedHrule;
              props['vertical'] = suggestedVrule;
            }
          }

          var alignMnemonic = [props["horizontal"], props["vertical"]].join("-");
          var tailStyle = _TAIL_ALIGN_RULES[alignMnemonic];
          tail.addClass(tailStyle);
          element.addClass(tailStyle);
          tail.show();

          // adjust the vertical and horizontal positioning to account for the tail
          // so that the page developer doesn't have to factor that in
          var borderFactor = 2; // factor in a little extra so the borders overlap
          if ("left" === props["horizontal"])
          {
            var tailHOffset = tail.outerWidth();
            tailHOffset -= (tailHOffset + oj.DomUtils.getCSSLengthAsInt(tail.css("left")));
            pos["left"] = pos["left"] + (tailHOffset - borderFactor);
          }
          else if ("right" === props["horizontal"])
          {
            var tailHOffset = tail.outerWidth();
            tailHOffset -= (tailHOffset + oj.DomUtils.getCSSLengthAsInt(tail.css("right")));
            pos["left"] = pos["left"] - (tailHOffset - borderFactor);
          }

          // tail adjustments when the offset of the image is not the total size of the image
          if ("top" === props["vertical"])
          {
            var tailVOffset = tail.outerHeight();
            tailVOffset -= (tailVOffset +
              oj.DomUtils.getCSSLengthAsInt(tail.css(props["vertical"])));
            pos["top"] = pos["top"] + (tailVOffset - borderFactor);
          }
          else if ("bottom" === props["vertical"])
          {
            var tailVOffset = tail.outerHeight();
            tailVOffset -= (tailVOffset +
              oj.DomUtils.getCSSLengthAsInt(tail.css(props["vertical"])));
            pos["top"] = pos["top"] - (tailVOffset - borderFactor);
          }
          element.css(pos);

          // adjustments to the vertical or horizontal centering.  The 50% alignment is from
          // the edge of the tail versus the center of the image.  The tail can't be located
          // at "center, middle". In this case (dead center), horizintal center looks better
          // on small viewports (_TAIL_ALIGN_RULES["center-middle"] === 'oj-left oj-middle')
          if ("center" === props["horizontal"] && "middle" !== props["vertical"])
          {
            var rootWidth = element.width();
            var leftPercent = Math.round((((rootWidth / 2) - (tail.outerWidth() / 2))
              / rootWidth) * 100);
            tail.css(
              {
                left : leftPercent + '%'
              });
          }
          else if ("middle" === props["vertical"])
          {
            var rootHeight = element.height();
            var topPercent = Math.round((((rootHeight / 2) - (tail.outerHeight() / 2))
              / rootHeight) * 100);
            tail.css(
              {
                top : topPercent + '%'
              });
          }
        }

        oj.PositionUtils.captureTransformOriginAnimationEffectsOption(element, props);

        // call on the original using regardless of the tail
        if (origUsing)
          origUsing(pos, props);

        var options = this.options;

        // The "origUsing" could alter the positon.  This check needs to be last.
        // When focusLoss auto dismissal is enabled, implicitly close the popup when the
        // position.of is clipped in an overflow container.
        if ("focusLoss" === options["autoDismiss"])
        {
          if (oj.PositionUtils.isAligningPositionClipped(props))
          {
            // Ignore focus back to what had focus before the popup was open. Focus
            // restore could fight scroll if the popup was closed due to the aligning
            // element being clipped.
            this._ignoreRestoreFocus = true;
            this._closeDelayTimer = this._delay(this._closeImplicitly.bind(this), 1);
          }
        }
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @return {boolean} <code>false</code> if the position was skipped
       */
      _reposition : function ()
      {
        var element = this.element;
        var position = this._getPositionAsJqUi();

        // verify selector is valid; otherwise, skip the reposition
        if (oj.StringUtils.isString(position["of"]))
        {
          var jqOf = $(position["of"]);
          if (jqOf.length === 0)
            return false;

          position["of"] = jqOf;
        }

        element.position(position);
        return true;
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {boolean=} waiAriaAssisted focus established via keyboard or voice over versus from
       *        open API
       */
      _intialFocus : function (waiAriaAssisted)
      {
        var initialFocus = this._deriveInitialFocus();

        // We are toggling focus into the popup due to F6 or voice over skip link.
        if (waiAriaAssisted && "none" === initialFocus)
          initialFocus = "popup";

        if ("firstFocusable" === initialFocus)
        {
          var content = this._content;
          var nodes = content.find(":focusable");
          var first;
          for (var i = 0; i < nodes.length; i++)
          {
            if (oj.FocusUtils.isFocusable(nodes[i]))
            {
              first = nodes[i];
              break;
            }
          }

          if (first)
          {
            first.focus();
            this._trigger("focus");
          }
          else  // nothing to set focus to, default to "popup"
            initialFocus = "popup";
        }

        // Establish focus to the root element of the popup.  It's not a natural focus stop
        if ("popup" === initialFocus)
        {
          var element = this.element;
          element.attr("tabindex", "-1");
          element.focus();
          this._trigger("focus");
        }
      },
      /**
       * @memberof oj.ojPopup
       * @private
       * @return {string} derives the target initialFocus option when the default is auto
       */
      _deriveInitialFocus : function ()
      {
        var options = this.options;
        var initialFocus = options["initialFocus"];

        if ("auto" === initialFocus)
        {
          var modality = options["modality"];
          if (modality === "modal")
          {
            if (oj.DomUtils.isTouchSupported())
              initialFocus = "popup";
            else
              initialFocus = "firstFocusable";
          }
          else
            initialFocus = "none";
        }

        return initialFocus;
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {Element} activeElement from the event being handled
       * @param {boolean!} includeChildren when true the focus test will include the scope of any
       *                   child popups.
       * @return {boolean} <code>true</code> if the active element is within the content of the
       *                   popup
       */
      _isFocusInPopup : function (activeElement, includeChildren)
      {
        if (!activeElement)
          activeElement = document.activeElement;

        // added to avoid automation issues where an active element is not established
        if (!activeElement)
          return false;

        var element = this.element;

        // popups that are children are siblings to the parent popup within the
        // layer that defines the stacking context.
        if (includeChildren)
          element = element.parent();

        return oj.DomUtils.isAncestorOrSelf(element[0], activeElement);
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {Element} activeElement from the event being handled
       * @return {boolean} <code>true</code> if the active element the launcher or a decedent of the
       *         launcher
       */
      _isFocusInLauncher : function (activeElement)
      {
        if (!activeElement)
          activeElement = document.activeElement;

        var launcher = this._launcher;
        return oj.DomUtils.isAncestorOrSelf(launcher[0], activeElement);
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       */
      _restoreFocus : function ()
      {
        if (this._ignoreRestoreFocus)
        {
          delete this._ignoreRestoreFocus;
          return;
        }

        // extend the focus check to include popups that are children
        if (this._isFocusInPopup(null, true))
        {
          var launcher = this._launcher;
          launcher.focus();
        }
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {jQuery.Event|Event} event keydown
       */
      _keyHandler : function (event)
      {
        if (event.isDefaultPrevented())
          return;

        var eventType = event.type;
        var content = this._content;

        /** @type {?} */
        var target = event.target;
        if ("keyup" === eventType && event.keyCode === $.ui.keyCode.ESCAPE &&
          (this._isFocusInPopup(target) || this._isFocusInLauncher(target)))
        {
          event.preventDefault();
          this.close();
        }
        else if ("keydown" === eventType && event.keyCode === 117)
        {
          //F6 - toggle focus to launcher or popup
          if (this._isFocusInPopup(target))
          {
            // If this is a modeless popup, toggle focus to the launcher;
            // otherwise, close the popup as we can't set focus under the
            // modal glass pane.
            var options = this.options;
            if ("modeless" === options['modality'])
            {
              event.preventDefault();
              var launcher = this._launcher;
              launcher.focus();
            }
            else
              this.close();
          }
          else if (this._isFocusInLauncher(target))
          {
            event.preventDefault();
            this._intialFocus(true);
          }
        }
        else if ("keydown" === eventType && event.keyCode === $.ui.keyCode.TAB &&
          this._isFocusInPopup(target))
        {
          // TAB within popup
          var nodes = content.find(":tabbable");
          if (nodes.length > 0)
          {
            var firstNode = nodes[0];
            var lastNode = nodes[nodes.length - 1];
            var element = this.element;

            if ((firstNode === target || element[0] === target) && event.shiftKey)
            {
              //tabbing backwards, cycle focus to last node
              event.preventDefault();
              // If the first and last tab stops are the same,
              // force focus to the root popup dom.  This will
              // cause the blur to fire on any input components.
              // If we are back tabbing on the popup dom, jump to the
              // last tab stop.
              if (firstNode === lastNode && firstNode === target)
              {
                element.attr("tabindex", "-1");
                element.focus();
              }
              else
                $(lastNode).focus();  //tabbing backwards, cycle focus to last node
            }
            else if (lastNode === target && !event.shiftKey)
            {
              event.preventDefault();
              // If the first and last tab stops are the same,
              // force focus to the root popup dom.  This will
              // cause the blur to fire on any input components.
              if (lastNode === firstNode)
              {
                element.attr("tabindex", "-1");
                element.focus();
              }
              else
                $(firstNode).focus(); //tabbing forwards, cycle to the first node
            }
          }
          else
          {
            event.preventDefault();
            var options = this.options;
            if ("modeless" === options['modality'])
            {
              // if there is nothing in the popup that is tabbable, handle as a F6
              // toggle to the launcher
              var launcher = this._launcher;
              launcher.focus();
            }
            else
            {
              // Modal popup can't set focus to something under the overlay,
              // implicitly close.
              this.close();
            }
          }
        }
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {string|null} autoDismiss option value
       */
      _setAutoDismiss : function (autoDismiss)
      {

        // unregister any existing handlers, might need to add mouseOut in the future
        var focusLossCallback = this._focusLossCallback;
        var events = this._getPopupServiceEvents();
        if (focusLossCallback)
        {
          delete events[oj.PopupService.EVENT.POPUP_AUTODISMISS];
          delete this._focusLossCallback;
        }

        if ("focusLoss" === autoDismiss)
        {
          focusLossCallback = this._focusLossCallback = this._dismissalHandler.bind(this);
          events[oj.PopupService.EVENT.POPUP_AUTODISMISS] = focusLossCallback;
        }

        if (this.isOpen())
        {
          var element = this.element;
          /** @type {!Object.<oj.PopupService.OPTION, ?>} */
          var options = {};
          options[oj.PopupService.OPTION.POPUP] = element;
          options[oj.PopupService.OPTION.EVENTS] = events;
          oj.PopupService.getInstance().changeOptions(options);
        }
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {Event} event native doc
       */
      _dismissalHandler : function (event)
      {
        if (!this.isOpen())
          return;

        var launcher = this._launcher;
        var element = this.element;

        // child popups are siblings to the parent in the layer.
        var layer = element.parent();

        /** @type {?} */
        var target = event.target;

        // if the target is on the focus skip link next to the launcher, ignore.
        var focusSkipLink = this._focusSkipLink;
        if (focusSkipLink)
        {
          var link = focusSkipLink.getLink();
          if (link && oj.DomUtils.isAncestorOrSelf(link[0], target))
            return;
        }

        // if event target is not under the laucher or popup root dom subtrees, dismiss
        if (!oj.DomUtils.isAncestorOrSelf(launcher[0], target) &&
          !oj.DomUtils.isAncestorOrSelf(layer[0], target))
        {
          if (oj.FocusUtils.isFocusable(target))
          {
            // If the dismissal event target can take focus and the
            // event type is a mousedown or touchstart, wait for the focus event
            // to trigger dismissal.  This allows the blur to happen
            // on input components which triggers validation.
            if ("mousedown" === event.type || "touchstart" === event.type)
              return;

            this._ignoreRestoreFocus = true;
          }

          // invoke standard close dismissal that can be canceled via the beforeclose
          // event.
          this.close();
        }
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       */
      _addDescribedBy : function ()
      {
        var launcher = this._launcher;
        var element = this.element;

        var popupId = element.attr("id");
        var describedby = launcher.attr("aria-describedby");
        var tokens = describedby ? describedby.split(/\s+/) : [];
        tokens.push(popupId);
        describedby = $.trim(tokens.join(" "));
        launcher.attr("aria-describedby", describedby);
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       */
      _removeDescribedBy : function () {
        var launcher = this._launcher;
        var element = this.element;

        if (!launcher || launcher.length === 0)
          return;

        var popupId = element.attr("id");
        var describedby = launcher.attr("aria-describedby");
        var tokens = describedby ? describedby.split(/\s+/) : [];
        var index = $.inArray(popupId, tokens);
        if (index !== -1)
          tokens.splice(index, 1);

        describedby = $.trim(tokens.join(" "));
        if (describedby)
          launcher.attr("aria-describedby", describedby);
        else
          launcher.removeAttr("aria-describedby");
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       */
      _initVoiceOverAssist : function ()
      {
        var isIOSVOSupported = (oj.AgentUtils.getAgentInfo()['os'] === oj.AgentUtils.OS.IOS);
        var liveRegion = this._liveRegion;
        if (!liveRegion)
          liveRegion = this._liveRegion = new oj.PopupLiveRegion();

        var message;
        if (isIOSVOSupported)
          message = this.getTranslatedString("none" === this.options["initialFocus"] ?
            "ariaLiveRegionInitialFocusNoneTouch" :
            "ariaLiveRegionInitialFocusFirstFocusableTouch");
        else
          message = this.getTranslatedString("none" === this.options["initialFocus"] ?
            "ariaLiveRegionInitialFocusNone" :
            "ariaLiveRegionInitialFocusFirstFocusable");
        liveRegion.announce(message);

        if (isIOSVOSupported)
        {
          var focusSkipLink = this._focusSkipLink;
          if (!focusSkipLink)
          {
            var focusSkipLinkId = this._getSubId("focusSkipLink");
            var launcher = this._launcher;
            var callback = this._intialFocus.bind(this, true);
            message = this.getTranslatedString("ariaFocusSkipLink");
            this._focusSkipLink = new oj.PopupSkipLink(launcher, message, callback,
              focusSkipLinkId);
          }

          var closeSkipLink = this._closeSkipLink;
          if (!closeSkipLink)
          {
            var closeSkipLinkId = this._getSubId("closeSkipLink");
            var content = this._content;
            var callback = this._closeImplicitly.bind(this);
            message = this.getTranslatedString("ariaCloseSkipLink");
            this._closeSkipLink = new oj.PopupSkipLink(content, message, callback, closeSkipLinkId);
          }
        }
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       */
      _destroyVoiceOverAssist : function ()
      {
        var liveRegion = this._liveRegion;
        if (liveRegion)
        {
          liveRegion.destroy();
          delete this._liveRegion;
        }
        var focusSkipLink = this._focusSkipLink;
        if (focusSkipLink)
        {
          focusSkipLink.destroy();
          delete this._focusSkipLink;
        }
        var closeSkipLink = this._closeSkipLink;
        if (closeSkipLink)
        {
          closeSkipLink.destroy();
          delete this._closeSkipLink;
        }
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {string} sub id that will become a composite id prefixed with the components uuid
       * @return {string}
       */
      _getSubId : function (sub)
      {
        /** @type {?} */
        var id = this.element.attr("id");
        if (oj.StringUtils.isEmptyOrUndefined(id))
          id = this["uuid"];
        return [id, sub].join("_");
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       */
      _surrogateRemoveHandler : function ()
      {
        var element = this.element;
        element.remove();
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @return {!Object.<oj.PopupService.EVENT, function(...)>}
       */
      _getPopupServiceEvents : function ()
      {
        if (!this._popupServiceEvents)
        {
          /** @type {!Object.<oj.PopupService.EVENT, function(...)>} **/
          var events = this._popupServiceEvents = {};
          events[oj.PopupService.EVENT.POPUP_CLOSE] = this._closeImplicitly.bind(this);
          events[oj.PopupService.EVENT.POPUP_REMOVE] = this._surrogateRemoveHandler.bind(this);
          events[oj.PopupService.EVENT.POPUP_REFRESH] = this.refresh.bind(this);
          events[oj.PopupService.EVENT.POPUP_BEFORE_OPEN] = this._beforeOpenHandler.bind(this);
          events[oj.PopupService.EVENT.POPUP_AFTER_OPEN] = this._afterOpenHandler.bind(this);
          events[oj.PopupService.EVENT.POPUP_BEFORE_CLOSE] = this._beforeCloseHandler.bind(this);
          events[oj.PopupService.EVENT.POPUP_AFTER_CLOSE] = this._afterCloseHandler.bind(this);
        }
        return this._popupServiceEvents;
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       */
      _closeImplicitly : function ()
      {
        this._ignoreBeforeCloseResultant = true;
        this.close();
        delete this._ignoreBeforeCloseResultant;
      },
      /**
       * Creates a Promise exposed by the {@link oj.ojPopup#whenReady} method.
       *
       * @param {string} operation valid values are "open", "close" or "none"
       * @memberof oj.ojPopup
       * @instance
       * @private
       */
      _setWhenReady : function (operation)
      {
        /** @type {oj.PopupWhenReadyMediator} */
        var mediator = this._whenReadyMediator;
        if (mediator)
        {
          mediator.destroy();
          delete this._whenReadyMediator;
        }

        // operation === none
        if (["open", "close"].indexOf(operation) < 0)
          return;

        this._whenReadyMediator = new oj.PopupWhenReadyMediator(this.element, operation, "ojPopup",
          this._IsCustomElement());
      },

      /**
       * Checks to see if there is a pending "open" or "close" operation.  If pending and it
       * is the same as the requested operation, the request silently fails.  If the current
       * operation is the inverse operation, we queue the current operation after the pending
       * operation is resolved.
       *
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {string} operation currently requested
       * @param {Array} args passed to a queue operation
       * @returns {boolean} <code>true</code> if a close or open operation is pending completion.
       */
      _isOperationPending : function (operation, args)
      {
        /** @type {oj.PopupWhenReadyMediator} **/
        var mediator = this._whenReadyMediator;
        if (mediator)
          return mediator.isOperationPending(this, operation, operation, args);
        else
          return false;
      },
      /**
       * @memberof oj.ojPopup
       * @instance
       * @private
       * @param {jQuery} elem to manage the focus ring on
       */
      _setupFocus : function (elem) {

        var self = this;
        this._focusable({
          'applyHighlight' : true,
          'setupHandlers' : function (focusInHandler, focusOutHandler) {
            self._on(elem, {
              focus : function (event) {
                focusInHandler($(event.currentTarget));
              },
              blur : function (event) {
                focusOutHandler($(event.currentTarget));
              }
            });
          }
        });
      }
    });

    // sets the default modality option from the current theme
    oj.Components.setDefaultOptions(
      {
        'ojPopup' :
          {
            'modality' : oj.Components.createDynamicPropertyGetter(
              function ()
              {
                return (oj.ThemeUtils.parseJSONFromFontFamily('oj-popup-option-defaults')
                  || {})["modality"];
              }),
            'animation' : oj.Components.createDynamicPropertyGetter(
              function ()
              {
                return (oj.ThemeUtils.parseJSONFromFontFamily('oj-popup-option-defaults')
                  || {})["animation"];
              })
          }
      });
}());

// Fragments:

  /**
   * <table class="keyboard-table">
   *   <thead>
   *     <tr>
   *       <th>Target</th>
   *       <th>Gesture</th>
   *       <th>Action</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td>Outside popup or launcher</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td>Close the popup.</td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * <p>Disabled items do not allow any touch interaction.
   *
   * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
   * @memberof oj.ojPopup
   */

  /**
   * <table class="keyboard-table">
   *   <thead>
   *     <tr>
   *       <th>Target</th>
   *       <th>Key</th>
   *       <th>Action</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td rowspan = "3">Focus within Popup</td>
   *       <td><kbd>Tab</kbd> or <kbd>Shift + Tab</kbd></td>
   *       <td>Navigate the content of the popup. Close the open popup if there are no tab stops in
   *           the popup.</td>
   *     </tr>
   *     <tr>
   *       <td><kbd>F6</kbd></td>
   *       <td>Move focus to the launcher for a popup with modeless modality.  Close the open popup
   *           if the modality is modal.</td>
   *     </tr>
   *     <tr>
   *       <td><kbd>Esc</kbd></td>
   *       <td>Close the open popup.</td>
   *     </tr>
   *     <tr>
   *       <td rowspan = "1">Popup Launcher</td>
   *       <td><kbd>F6</kbd></td>
   *       <td>Move focus to the first tab stop within the open popup.  If there is not a tab stop
   *           within the content, focus is established on the popup.</td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
   * @memberof oj.ojPopup
   */

  /**
   * {@ojinclude "name":"ojStylingDocIntro"}
   *
   * <table class="generic-table styling-table">
   *   <thead>
   *     <tr>
   *       <th>{@ojinclude "name":"ojStylingDocClassHeader"}</th>
   *       <th>{@ojinclude "name":"ojStylingDocDescriptionHeader"}</th>
   *       <th>{@ojinclude "name":"ojStylingDocExampleHeader"}</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td>oj-focus-highlight</td>
   *       <td>{@ojinclude "name":"ojFocusHighlightDoc"}</td>
   *       <td>
   * <pre class="prettyprint">
   * <code>&lt;oj-popup class="oj-focus-highlight">
   *  &lt;input id="blueopt" type="checkbox" value="blue">
   *  &lt;label for="blueopt">Blue&lt;/label>
   * &lt;/oj-popup>
   * </code></pre>
   *       </td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
   * @memberof oj.ojPopup
   */

(function () {
  var propertyParser = function (value, name, meta, defaultParseFunction)
  {
    // Passthru to the jQuery UI component for parsing.  The parsing can't be done here
    // due to not having all of the position object.  The new position structure changes
    // position.start = "left+5 top-3" to:
    //
    // position.start.horizontal = "left"
    // position.start.vertical = "top"
    // position.offset.x = 5
    // position.offset.y = -3
    //
    if (/^position/.test(name))
    {
      return value;
    }
    else
    {
      return defaultParseFunction(value);
    }
  };

  var ojPopupMeta = {
    "properties" : {
      "autoDismiss" : {
        "type" : "string",
        "enumValues" : ["focusLoss", "none"]
      },
      "chrome" : {
        "type" : "string",
        "enumValues" : ["default", "none"]
      },
      "initialFocus" : {
        "type" : "string",
        "enumValues" : ["auto", "none", "firstFocusable", "popup"]
      },
      "modality" : {
        "type" : "string",
        "enumValues" : ["modeless", "modal"]
      },
      "position" : {
        "type" : "object",
        "properties" : {
          "my" : {
            "type" : "object",
            "properties" : {
              "horizontal" : {
                "type" : "string",
                "enumValues" : ["start", "end", "left", "center", "right"]
              },
              "vertical" : {
                "type" : "string",
                "enumValues" : ["top", "center", "bottom"]
              }
            }
          },
          "at" : {
            "type" : "object",
            "properties" : {
              "horizontal" : {
                "type" : "string",
                "enumValues" : ["start", "end", "left", "center", "right"]
              },
              "vertical" : {
                "type" : "string",
                "enumValues" : ["top", "center", "bottom"]
              }
            }
          },
          "offset" : {
            "type" : "object",
            "properties" : {
              "x" : {
                "type" : "number"
              },
              "y" : {
                "type" : "number"
              }
            }
          },
          "of" : {
            "type" : "string|{x:number, y:number}"
          },
          "collision" : {
            "type" : "string",
            "enumValues" : ["flip", "fit", "flipfit", "flipcenter", "none"]
          }
        }
      },
      "tail" : {
        "type" : "string",
        "enumValues" : ["simple", "none"]
      }
    },
    "events" : {
      "beforeOpen" : {},
      "open" : {},
      "beforeClose" : {},
      "close" : {},
      "focus" : {},
      "animateStart" : {},
      "animateEnd" : {}
    },
    "methods" : {
      "close" : {},
      "isOpen" : {},
      "open" : {}
    },
    "extension" : {
      _WIDGET_NAME : "ojPopup"
    }
  };
  oj.CustomElementBridge.registerMetadata('oj-popup', 'baseComponent', ojPopupMeta);
  oj.CustomElementBridge.register('oj-popup', {'metadata' :
      oj.CustomElementBridge.getMetadata('oj-popup'), 'parseFunction' : propertyParser});
})();
});
