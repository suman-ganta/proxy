define("forms.renderer", ["underscore","knockout","jquery","ojL10n!rendererMsg/nls/renderer","ojs/ojcore","ojs/ojknockout","ojs/ojcollapsible","ojs/ojprogressbar","ojs/ojmenu","ojs/ojtabs","ojs/ojaccordion","ojs/ojcheckboxset","ojs/ojradioset","ojs/ojselectcombobox","ojs/ojinputnumber","ojs/ojdatetimepicker","ojs/ojknockout-validation","ojidentity"], function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_120__, __WEBPACK_EXTERNAL_MODULE_158__, __WEBPACK_EXTERNAL_MODULE_277__, __WEBPACK_EXTERNAL_MODULE_338__, __WEBPACK_EXTERNAL_MODULE_379__, __WEBPACK_EXTERNAL_MODULE_380__, __WEBPACK_EXTERNAL_MODULE_451__, __WEBPACK_EXTERNAL_MODULE_452__, __WEBPACK_EXTERNAL_MODULE_453__, __WEBPACK_EXTERNAL_MODULE_454__, __WEBPACK_EXTERNAL_MODULE_455__, __WEBPACK_EXTERNAL_MODULE_456__, __WEBPACK_EXTERNAL_MODULE_457__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "resources/js/node_modules/forms.renderer/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 166);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(195)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_getPrototypeOf) {
	'use strict';

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		'use strict';

		var _ = __webpack_require__(0);

		var initializing = false,

		//Inspired by John Ressig, detects if test treats a function like a String
		fnTest = /xyz/.test(function () {
			xyz;
		}) ? /\b_super\b/ : /.*/,

		/**
   * Augments an object prototype with the properties of another object. If a new property overwrites an existing
   * property of the target object it search for the existence of a _super method. If found, then bounds an
   * anonymous function with the super method.
   */
		_include = function _include(proto, _super, obj) {
			for (var k in obj) {
				proto[k] = typeof obj[k] === 'function' && typeof _super[k] === 'function' && fnTest.test(obj[k]) ? function (name, fn) {
					return function () {
						var tmp = this._super;
						this._super = _super[name];
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				}(k, obj[k]) : obj[k];
			}
		},
		    _extend = function _extend(parent, obj) {
			for (var k in obj) {
				parent[k] = obj[k];
			}
		};
		//Base Class
		var $Class = function $Class() {};
		/**
   * Takes a class and creates a derived class with the augmented static and instance members. If init function
   * is passed as a property in members it becomes the implicit constructor of the class instance. if <code>_super</code>
   * is found in any member function that overwrites a parent function(<code>init</code> included) is found then
   * is bound to the same function of the parent
   *
   * @param statics static class members
   * @param members instance members. If a property init is passed as a function then it initializes the instance
   * @return {Function}
   */

		var PROTECTED = '_protected';

		$Class.subClass = function subClass(statics, members) {
			var _super = this.prototype;
			initializing = true;
			var prototype = new this();
			initializing = false;

			/**
    * If the class has a _protected member object (with the protected variables inside)
    * then the subclasses _protected variables will be merged with the fathers protected variables.
    * NOTE: The protected objects will not be merged, the leave will be predominant.
    * @see ClassesSpec.js
    */
			function mergeProtected(obj) {
				// Gets the first parent Class
				var proto = (0, _getPrototypeOf2.default)((0, _getPrototypeOf2.default)(obj));
				while (proto) {
					if (_.has(proto, PROTECTED)) {
						// we copy the father protected because the _extend overwrites it
						var copy = _(proto[PROTECTED]).clone();
						obj[PROTECTED] = _.extend(proto[PROTECTED], obj[PROTECTED]);
						proto[PROTECTED] = copy;
					}
					// to continue with the prototypal chain of Classes
					proto = (0, _getPrototypeOf2.default)(proto);
				}
			}

			/**
    * If the class has an array member
    * then the subclasses array variables will be union with the fathers arrays.
    * @see ClassesSpec.js
    */
			function mergeArray(obj, arrayKey) {
				// Gets the first parent Class
				var proto = (0, _getPrototypeOf2.default)((0, _getPrototypeOf2.default)(obj));
				while (proto) {
					if (_.has(proto, arrayKey)) {
						// we copy the father protected because the _extend overwrites it
						var copy = _(proto[arrayKey]).clone();
						obj[arrayKey] = _.union(proto[arrayKey], obj[arrayKey]);
						proto[arrayKey] = copy;
					}
					// to continue with the prototypal chain of Classes
					proto = (0, _getPrototypeOf2.default)(proto);
				}
			}

			function Class() {
				if (!initializing && this.init) {

					for (var key in this) {
						//this iteration is correctly iterating over non members of this
						if (!_.isFunction(this[key])) {
							this[key] = _(this[key]).clone();
							if (key === PROTECTED) {
								mergeProtected(this);
							} else if (_.isArray(this[key])) {
								mergeArray(this, key);
							}
						}
					}
					this._class = Class;
					this.init.apply(this, arguments);
				}
			}
			if (this._super) {
				_extend(Class, this);
			}
			if (statics) {
				_extend(Class, statics);
			}
			if (members) {
				_include(prototype, this.prototype, members);
			}
			Class.prototype = prototype;
			Class.prototype.constructor = Class;
			Class._super = _super;
			Class.subClass = subClass;
			Class.extend = $Class.extend;
			Class.include = $Class.include;
			Class.prototype.parent = function (clazz, functionName) {
				// take all the arguments after functionName
				var args = Array.prototype.slice.call(arguments, 2);
				// call the function on super's prototype
				clazz.prototype[functionName].apply(this, args);
			};
			Class.prototype.proxy = function (fn) {
				var ctx = this;
				return function () {
					return fn.apply(ctx, arguments);
				};
			};
			Class.prototype.extend = function (obj) {
				_extend(this, obj);
			};
			Class.proxy = function (fn) {
				var ctx = this;
				return function () {
					return fn.apply(ctx, arguments);
				};
			};
			return Class;
		};
		/**
   * Extends the class with static members from obj
   * @param obj Mixed Object
   */
		$Class.extend = function (obj) {
			_extend(this, obj);
		};
		/**
   * Extends the class prototype with members from obj. Uses the same mechanics that subClass for _super binding
   * @param obj Mixed Object
   */
		$Class.include = function (obj) {
			_include.call(this, this.prototype, this._super, obj);
		};

		function createInit(init1, init2) {
			return function () {
				init1.apply(this, arguments);
				//init2.apply(this, arguments);
			};
		}

		$Class.extendClass = function (parent, obj) {
			for (var k in obj) {
				if (k === 'init') {
					parent[k] = createInit(parent[k], obj[k]);
				} else {
					parent[k] = parent[k] ? parent[k] : obj[k];
				}
			}
		};

		//Expose the class to the glabal module
		return $Class;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {

		'use strict';

		return {
			'FORM_PRESENTATION': 'FORM_PRESENTATION',
			'INPUT_TEXT': 'INPUT_TEXT',
			'TEXT_AREA': 'TEXT_AREA',
			'BUTTON': 'BUTTON',
			'SELECT': 'SELECT',
			'CHECKLIST': 'CHECKLIST',
			'CHECKBOX': 'CHECKBOX',
			'RADIO_BUTTON': 'RADIO_BUTTON',
			'NUMBER': 'NUMBER',
			'DATE': 'DATE',
			'TIME': 'TIME',
			'DATE_TIME': 'DATE_TIME',
			'EMAIL': 'EMAIL',
			'URL': 'URL',
			'MESSAGE': 'MESSAGE',
			'LINK': 'LINK',
			'MONEY': 'MONEY',
			'PHONE': 'PHONE',
			'IMAGE': 'IMAGE',
			'VIDEO': 'VIDEO',
			'IDENTITY_BROWSER': 'IDENTITY_BROWSER',
			'ROW': 'ROW',
			'PANEL': 'PANEL',
			'FORM_REFERENCE': 'FORM_REFERENCE',
			'SECTION': 'SECTION',
			'TAB': 'TAB',
			'TAB_CONTAINER': 'TAB_CONTAINER',
			'REPEATABLE_SECTION': 'REPEATABLE_SECTION',
			'REPEATABLE_SECTION_ROW': 'REPEATABLE_SECTION_ROW',
			'TABLE': 'TABLE',
			'TABLE_COLUMN': 'TABLE_COLUMN',
			'TABLE_ROW': 'TABLE_ROW',
			'BUSINESS_TYPE': 'BUSINESS_TYPE',
			'ENUM_SELECT': 'ENUM_SELECT',
			'STRING_REPEATABLE_SECTION': 'STRING_REPEATABLE_SECTION',
			'NUMBER_REPEATABLE_SECTION': 'NUMBER_REPEATABLE_SECTION',
			'BOOLEAN_REPEATABLE_SECTION': 'BOOLEAN_REPEATABLE_SECTION',
			'DATE_REPEATABLE_SECTION': 'DATE_REPEATABLE_SECTION',
			'TIME_REPEATABLE_SECTION': 'TIME_REPEATABLE_SECTION',
			'DATE_TIME_REPEATABLE_SECTION': 'DATE_TIME_REPEATABLE_SECTION'
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(170), __esModule: true };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);

		//endregion

		return Class.subClass({
			ACTION_NAME: 'DO_NOTHING'
		}, {
			init: function init(model, viewModel, scope, control) {
				this.viewModel = viewModel;
				this.scope = scope;
			},

			getType: function getType() {
				return this._class.ACTION_NAME;
			},

			template: function template() {
				return false;
			},
			component: function component() {
				return false;
			},

			execute: function execute(component) {
				//do nothing
			},

			toJS: function toJS() {
				return {
					type: this.getType()
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */
		//region dependencies

		var Class = __webpack_require__(3),
		    UUID = __webpack_require__(17),
		    EventActionsMap = __webpack_require__(86),
		    ControlPropertiesMap = __webpack_require__(87),
		    StyleControlMapper = __webpack_require__(146),
		    TranslatablePropertiesMap = __webpack_require__(147),
		    _ = __webpack_require__(0),
		    EventReference = __webpack_require__(148),
		    ColumnSpanType = __webpack_require__(149),
		    ControlEventsMap = __webpack_require__(151),
		    Value = __webpack_require__(15),
		    ValidationHelper = __webpack_require__(76),
		    koToJSUtil = __webpack_require__(21),
		    ko = __webpack_require__(1);

		__webpack_require__(338);

		//endregion
		return Class.subClass({}, {
			_parent: null,
			isValid: null,
			_registerProperties: function _registerProperties(container, element, properties) {
				for (var propertyName in element) {
					/* istanbul ignore else */
					if (element.hasOwnProperty(propertyName)) {
						var property = element[propertyName];
						container[propertyName] = property instanceof Function ? property(container, properties) : property;
					}
				}
			},
			/* jshint maxparams: 6 */
			init: function init(id, name, type, properties, context, parent) {

				//common properties
				this.id = id || UUID.createUuid();
				this.name = ko.observable(name); //ko.observable(type.id + '_' + this.id);
				this.type = type.id;
				this.validationHelper = ValidationHelper;
				this.context = context;
				this._parent = parent;
				this.isValid = ko.observable(true);

				//properties derived from specific type
				this._registerProperties(this, type.properties(), properties);
				//properties based on context (renderer or builder context
				this._registerProperties(this, context.properties(), properties);
				// Styles associated with the control.
				this.styles = this.styleHandler.getAllStyles(this, properties);
				//properties for the particular type
				var defaults = {
					position: 0,
					isRoot: false,
					label: name,
					autoFocus: false,
					disabled: false,
					required: false,
					hide: false,
					parsedStyle: '',
					formattedStyle: {},
					isBindable: type.isBindable(),
					binding: '',
					autoColSpan: true,
					connectorMapping: '',
					events: [],
					computed: false,
					filterEnabled: false,
					originalId: null,
					computedValue: null,
					hideBindings: false
				};
				defaults[ColumnSpanType.SMALL.propertyName] = 1;
				defaults[ColumnSpanType.MEDIUM.propertyName] = 1;
				defaults[ColumnSpanType.LARGE.propertyName] = 1;
				defaults[ColumnSpanType.EXTRA_LARGE.propertyName] = 1;

				_.defaults(properties, defaults);

				//TODO are position and isRoot necessary? (to be answered when doing layout stories)
				this.properties = {
					position: ko.observable(properties.position),
					isRoot: ko.observable(properties.isRoot),
					label: ko.observable(properties.label),
					autoFocus: ko.observable(properties.autoFocus),
					disabled: ko.observable(properties.disabled),
					required: ko.observable(properties.required),
					hide: ko.observable(properties.hide),
					parsedStyle: ko.observable(properties.parsedStyle),
					formattedStyle: ko.observable(properties.formattedStyle),
					isBindable: ko.observable(properties.isBindable),
					binding: ko.observable(properties.binding),
					autoColSpan: ko.observable(properties.autoColSpan),
					connectorMapping: ko.observable(properties.connectorMapping),
					computed: ko.observable(properties.computed),
					filterEnabled: ko.observable(properties.filterEnabled),
					originalId: properties.originalId,
					hideBindings: ko.observable(properties.hideBindings)
				};

				this.properties[ColumnSpanType.SMALL.propertyName] = ko.observable(properties[ColumnSpanType.SMALL.propertyName]);
				this.properties[ColumnSpanType.MEDIUM.propertyName] = ko.observable(properties[ColumnSpanType.MEDIUM.propertyName]);
				this.properties[ColumnSpanType.LARGE.propertyName] = ko.observable(properties[ColumnSpanType.LARGE.propertyName]);
				this.properties[ColumnSpanType.EXTRA_LARGE.propertyName] = ko.observable(properties[ColumnSpanType.EXTRA_LARGE.propertyName]);

				this.properties.formattedStyle = this.styleHandler.getFormattedStyle(this);
				this.properties.parsedStyle = this.styleHandler.getParsedStyle(this);

				var events = [];
				_.each(ko.unwrap(properties.events), function (event) {
					events.push(new EventReference(event.id, context.viewModel));
				}, this);
				this.events = ko.observableArray(events);

				var scope = new context.scopeFactory.Scope(context.viewModel.getCurrentGlobalScope());
				scope.controlId = this.id;
				this.properties.computedValue = new Value(properties.computedValue, context.viewModel, scope);
			},
			executeEvent: function executeEvent(trigger) {
				var events = [];
				_.each(this.events(), function (eventRef) {
					var eventTrigger = eventRef.event().trigger;
					if (trigger === eventTrigger()) {
						events.push(eventRef.execute(this));
					}
				}, this);
				this.context.viewModel.dependenciesExtension.reEvaluateOnControl(trigger, this);
				return _promise2.default.all(events);
			},
			findClosest: function findClosest(id) {
				return this.getParent().findClosest(id);
			},
			hasValueProperty: function hasValueProperty() {
				return true;
			},
			executeEventOnAll: function executeEventOnAll(trigger) {
				return this.executeEvent(trigger);
			},
			getValidEvents: function getValidEvents() {
				return ControlEventsMap[this.type];
			},
			makeCopy: function makeCopy() {
				var copy = this.toJS();
				copy.properties.originalId = this.properties.originalId ? this.properties.originalId : copy.id;
				copy.id = UUID.createUuid();
				if (this.controls) {
					var controls = [];
					_.each(this.controls(), function (control) {
						controls.push(control.makeCopy());
					});
					copy.controls = controls;
				}
				return copy;
			},
			getConnectorCall: function getConnectorCall() {
				return false;
			},
			isRepeatable: function isRepeatable() {
				return false;
			},
			getParent: function getParent() {
				return this._parent;
			},
			getFullBinding: function getFullBinding() {
				return this.getBindingContext() + this.properties.binding();
			},
			getBindingContext: function getBindingContext() {
				return this.getParent() ? this.getParent().getContextForChildren(this) : '';
			},
			getDataTemplate: function getDataTemplate() {
				return 'constantValueTypeTemplate';
			},
			getContextForChildren: function getContextForChildren(child) {
				return this.getBindingContext();
			},
			hasStyle: function hasStyle() {
				return this.styles().length > 0;
			},
			getStyleMapper: function getStyleMapper() {
				return StyleControlMapper[this.type];
			},
			getControlActions: function getControlActions() {
				return EventActionsMap[this.type];
			},
			getControlEventProperties: function getControlEventProperties() {
				return ControlPropertiesMap[this.type];
			},
			getTranslatableProperties: function getTranslatableProperties() {
				return TranslatablePropertiesMap[this.type];
			},
			//Overridable empty function
			saveValue: function saveValue() {},
			/**
    * Adds a custom error to the control and forces a validation
    * @param summary
    * @param detail
    */
			setError: function setError(summary, detail) {
				var ojComponentWidgetRef = this.getOjComponent();
				ojComponentWidgetRef('option', 'messagesCustom', [{
					summary: summary,
					detail: detail
				}]);
				this.validate();
			},
			_propertiesToJS: function _propertiesToJS() {
				return koToJSUtil.toJS(this.properties);
			},
			toJS: function toJS() {
				var events = [];
				_.each(this.events(), function (event) {
					events.push(event.toJS());
				});
				return {
					id: this.id,
					name: this.name(),
					type: this.type,
					properties: _.extend({}, this._propertiesToJS(), {
						events: events,
						computedValue: this.properties.computedValue.toJS()
					})
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0);

		//endregion

		return Class.subClass({}, {
			init: function init(id, dependencies) {
				this.id = id;
				this._dependencies = dependencies || [];
			},
			decorate: function decorate(control, context) {
				//check if the dependencies were applied, failed if not.
				_.each(this.dependencies(), function (dependency) {
					if (!dependency.isApplied(control)) {
						throw new Error('Need ' + dependency.id + 'to use decorator:' + this.id);
					}
				}, this);
				this._decorate(control, context);
			},
			_decorate: function _decorate(control, context) {
				throw new Error('Unsupported Operation Exception');
			},
			dependencies: function dependencies() {
				return this._dependencies;
			},
			isApplied: function isApplied(control) {
				throw new Error('Unsupported Operation Exception');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(71)('wks');
var uid = __webpack_require__(55);
var Symbol = __webpack_require__(11).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		'use strict';

		var Enum = __webpack_require__(114),
		    ControlTypeId = __webpack_require__(4);

		return Enum.subClass({

			ARRAY: {
				name: 'ARRAY',
				defaultControl: null
			},
			BOOLEAN: {
				name: 'BOOLEAN',
				defaultControl: ControlTypeId.CHECKBOX
			},
			DATE_TIME: {
				name: 'DATE_TIME',
				defaultControl: ControlTypeId.DATE_TIME
			},
			DATE: {
				name: 'DATE',
				defaultControl: ControlTypeId.DATE
			},
			ENUM: {
				name: 'ENUM',
				defaultControl: ControlTypeId.ENUM_SELECT
			},
			NUMBER: {
				name: 'NUMBER',
				defaultControl: ControlTypeId.NUMBER
			},
			OBJECT: {
				name: 'OBJECT',
				defaultControl: ControlTypeId.SECTION
			},
			OBJECT_REF: {
				name: 'OBJECT_REF',
				defaultControl: null
			},
			STRING: {
				name: 'STRING',
				defaultControl: ControlTypeId.INPUT_TEXT
			},
			TIME: {
				name: 'TIME',
				defaultControl: ControlTypeId.TIME
			},
			UNKNOWN: {
				name: 'UNKNOWN',
				defaultControl: null
			},
			equals: function equals(type1, type2) {
				return type1.name === type2.name;
			}

		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		var msg = __webpack_require__(5);

		return {
			ON_LOAD: {
				value: 'ON_LOAD',
				label: msg.ON_LOAD,
				event: 'load'
			},
			ON_CHANGE: {
				value: 'ON_CHANGE',
				label: msg.ON_CHANGE,
				event: 'change'
			},
			ON_FOCUS: {
				value: 'ON_FOCUS',
				label: msg.ON_FOCUS,
				event: 'focus'
			},
			ON_BLUR: {
				value: 'ON_BLUR',
				label: msg.ON_BLUR,
				event: 'blur'
			},
			ON_EXPAND_TOGGLE: {
				value: 'ON_EXPAND_TOGGLE',
				label: msg.ON_EXPAND_TOGGLE,
				event: 'expand'
			},
			ON_EXPAND: {
				value: 'ON_EXPAND',
				label: msg.ON_EXPAND,
				event: 'expand'
			},
			ON_COLLAPSE: {
				value: 'ON_COLLAPSE',
				label: msg.ON_COLLAPSE,
				event: 'expand'
			},
			ON_SELECTION_CHANGE: {
				value: 'ON_SELECTION_CHANGE',
				label: msg.ON_SELECTION_CHANGE,
				event: 'selectionChange'
			},
			ON_SELECTED: {
				value: 'ON_SELECTED',
				label: msg.ON_SELECTED,
				event: 'ojselect'
			},
			ON_UNSELECTED: {
				value: 'ON_UNSELECTED',
				label: msg.ON_UNSELECTED,
				event: 'ojdeselect'
			},
			ON_CLICK: {
				value: 'ON_CLICK',
				label: msg.ON_CLICK,
				event: 'click'
			},
			ON_SUBMIT: {
				value: 'ON_SUBMIT',
				label: msg.ON_SUBMIT,
				event: 'submit'
			},
			ON_ADD_ROW: {
				value: 'ON_ADD_ROW',
				label: msg.ON_ADD_ROW,
				event: 'addRow'
			},
			ON_REMOVE_ROW: {
				value: 'ON_REMOVE_ROW',
				label: msg.ON_REMOVE_ROW,
				event: 'removeRow'
			},
			ON_CHILDREN_CHANGE: {
				value: 'ON_CHILDREN_CHANGE',
				label: 'ON_CHILDREN_CHANGE',
				event: 'childrenChange'
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    FormsLogger = __webpack_require__(20),
		    PropertiesMap = __webpack_require__(77),
		    FunctionsMap = __webpack_require__(231),
		    DotExpressionResolver = __webpack_require__(23),
		    ValueTypes = __webpack_require__(61);

		//endregion
		var Value = Class.subClass({}, {
			type: null,
			expression: null,
			controlResolver: null,
			propertyParam: [],
			controlId: null,
			mapped: null,

			init: function init(model, viewModel, scope) {
				var defaults = _.extend({
					expression: '',
					propertyParam: [],
					type: ValueTypes.CONSTANT.value,
					controlResolver: {},
					mapped: '',
					controlId: null
				}, model);
				if (viewModel.context && viewModel.context.config && viewModel.context.config()) {
					this.translationsHandler = viewModel.context.config().translationsHandler;
				}

				this.viewModel = viewModel;
				this._translationIndex = 0; //translations for Value are stored in form of array. So index to iterate over it
				this.expression = ko.observable(defaults.expression);
				this.mapped = ko.observable(defaults.mapped);

				var params = [];
				_.each(defaults.propertyParam, function (param) {
					params.push(new Value(param, viewModel, scope));
				});
				this.propertyParam = ko.observableArray(params);

				var ControlResolver = __webpack_require__(121);

				this.type = ko.observable(ValueTypes[defaults.type]);
				this.controlResolver = new ControlResolver(defaults.controlResolver, viewModel, scope);
				this.scope = scope;

				this.control = ko.observable();
				this.controlId = defaults.controlId;
				if (this.controlId !== null) {
					if (viewModel.form()) {
						this.control(viewModel.form().findControl(this.controlId));
					}
					var subs = viewModel.form.subscribe(function (form) {
						this.control(form.findControl(this.controlId));
						subs.dispose();
					}.bind(this));
				}
			},

			getTemplate: function getTemplate() {
				var template = this.type().template;
				if (!template) {
					if (this.control()) {
						return this.control().getDataTemplate();
					} else {
						return 'constantValueTypeTemplate';
					}
				}
				return template;
			},

			toJS: function toJS() {
				var params = [];
				_.each(this.propertyParam(), function (param) {
					params.push(param.toJS());
				});
				return {
					expression: this.expression(),
					propertyParam: params,
					controlResolver: this.controlResolver.toJS(),
					type: this.type().value,
					mapped: this.mapped(),
					controlId: this.controlId
				};
			},

			_resolveMap: function _resolveMap(viewModel, value) {
				var _this = this;

				if (_.isArray(value) && this.mapped().length > 0) {
					return _.map(value, function (entry) {
						return ko.unwrap(entry[_this.mapped()]);
					});
				}
				return value;
			},

			resolve: function resolve(viewModel) {
				return this._resolveMap(viewModel, this[this.type().resolveFunction](viewModel));
			},

			_checkBundle: function _checkBundle(blockId, valueObj) {
				/* istanbul ignore else */
				if (this.translationsHandler) {
					var value = this.translationsHandler.getKeyProperty(blockId, valueObj._translationIndex);

					// For complex value such as when value.type= function, we need to iterate its propertyParam, so iterating over bundle
					//array. _translationindex keeps the check of index to be iterate and value object is common object used while iterating a single value.
					if (value) {
						valueObj._translationIndex = valueObj._translationIndex + 1;
						return value;
					}
				}
			},

			_resolveConstant: function _resolveConstant(viewModel) {
				return this.expression();
			},

			_resolveData: function _resolveData(viewModel) {
				return ko.unwrap(viewModel.context.payloadContext.getObservableValue(this.expression()));
			},

			_resolveControl: function _resolveControl(viewModel) {
				var form = viewModel.form();
				var control = this.controlResolver.resolve(form.presentation(), this.scope.eventControl);
				var property = PropertiesMap[this.expression()] || PropertiesMap.VALUE;
				if (control) {

					var params = [];
					_.each(this.propertyParam(), function (param) {
						params.push(param.resolve(viewModel));
					});
					//If there are multiple controls, map the values and return an array
					if (_.isArray(control)) {
						return _.map(control, function (ctrl) {
							return property.getValue.apply(property, [ctrl].concat(params));
						});
					} else {
						return property.getValue.apply(property, [control].concat(params));
					}
				} else {
					FormsLogger.getLogger().error('User Events Error: Value couldn\'t be resolved.');
				}
			},

			_resolveFunction: function _resolveFunction(viewModel) {
				var func = FunctionsMap[this.expression()];

				var params = [];
				_.each(this.propertyParam(), function (param) {
					params.push(param.resolve(viewModel));
				});
				return func.resolve.apply(func, params);
			},

			_resolveScope: function _resolveScope(viewModel) {
				return this.scope.getValue(this.expression());
			},

			_resolveFilter: function _resolveFilter(viewModel) {
				var filteredResponse = this.scope.getValue(this.expression());
				/* istanbul ignore else */
				if (filteredResponse && filteredResponse.length > 0) {
					var index = this.propertyParam()[0].resolve(viewModel);
					if (index !== '' && filteredResponse[index]) {
						return DotExpressionResolver.getValue(filteredResponse[index], this.mapped());
					}
					return this.mapped() ? DotExpressionResolver.getValue(filteredResponse, this.mapped()) : filteredResponse;
				}
			},

			_getBundle: function _getBundle() {
				var bundleArr = [];
				if (this.type().value === ValueTypes.CONSTANT.value) {
					bundleArr.push(this.expression());
				} else if (this.type().value === ValueTypes.FUNCTION.value) {
					_.each(this.propertyParam(), function (param) {
						bundleArr = _.union(bundleArr, param._getBundle());
					});
				}
				return bundleArr;
			},

			decorate: function decorate(viewModel, blockId, valueObj) {
				valueObj = valueObj || this;

				// Check decorateFunction for this value type i.e. decorate a constant or decorate a function
				var decorateFunction = this.type().decorateFunction;
				if (decorateFunction) {
					this[decorateFunction](viewModel, blockId, valueObj);
				}
			},

			_decorateConstant: function _decorateConstant(viewModel, blockId, valueObj) {
				this.expression(this._checkBundle(blockId, valueObj) || this.expression());
			},

			_decorateFunction: function _decorateFunction(viewModel, blockId, valueObj) {

				_.each(this.propertyParam(), function (param) {
					param.decorate(viewModel, blockId, valueObj);
				});
			},

			getParameterCount: function getParameterCount() {
				if (this.type() === ValueTypes.CONTROL) {
					return PropertiesMap[this.expression()].params;
				}
				if (this.type() === ValueTypes.FUNCTION) {
					return FunctionsMap[this.expression()].params.length;
				}
				if (this.type() === ValueTypes.FILTER) {
					return 1;
				}
				return 0;
			}
		});

		return Value;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);

		//endregion

		return Class.subClass({}, {
			value: '',
			label: '',
			accessor: '',
			params: 0,
			init: function init(value, label, accessor) {
				this.value = value;
				this.label = label;
				this.accessor = accessor;
			},

			template: function template() {
				return false;
			},

			getValue: function getValue(control) {
				return control.properties[this.accessor]();
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
		'use strict';

		return {
			createUuid: function createUuid() {
				function s4() {
					return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
				}
				return [s4() + s4(), s4(), s4(), s4(), s4() + s4() + s4()].join('-');
			},
			createSafeUuid: function createSafeUuid() {
				var id = 'ACT' + this.createUuid();
				return id.replace(/-/g, '');
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    ValueHelper = __webpack_require__(49);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('VALUE', dependencies);
			},
			_decorate: function _decorate(control) {
				this._doDecorate(control);
				control.initValue(control.value());
			},
			_doDecorate: function _doDecorate(control) {
				control.rawValue = ko.observable();
				if (control.type !== 'FORM_REFERENCE') {
					control.value = control.context.payloadContext.getObservableForBinding(control);
				} else {
					control.value = ko.observable({});
				}

				control._isNullEmptyOrUndefined = function (val) {
					return ValueHelper.isNullEmptyOrUndefined(val);
				};

				control.getControlValue = function () {
					var rawValue = control._getRawValue();

					var finalValue = ko.utils.unwrapObservable(control.value);

					//check if valid is present first and then check if the control is valid.
					var valid = !control.validate || control.validate();

					// if the value is not valid, we should return the rawValue
					if (!valid) {
						finalValue = rawValue;
					}

					return finalValue;
				};
				control.initValue = function (value) {
					var val = control._isNullEmptyOrUndefined(value) ? ko.unwrap(control.properties.defaultValue) : value;
					control.setValue(val);
				};
				control.setValue = function (value) {

					//Set the rawValue as well, to have them sync
					if (!control.rendered || !control.rendered()) {
						control.rawValue(value);
					} else {
						//If the element is already rendered, we need to set the value to jet directly
						control.getOjComponent()('option', 'value', value);
					}
					control.value(value);
				};
				control._getRawValue = function () {
					return ko.utils.unwrapObservable(control.rawValue);
				};

				/**
     * saves the current value into saveData[binding]
     * but if the control is invalid and [binding] has already been set
     * 	(ie. another control with same binding) the value is not overwritten
     * @param saveData
     */
				control.saveValue = function (saveData) {

					var binding = control.context.payloadContext.getFullBindingContextFor(control);
					if (!_.isEmpty(binding)) {
						var value = control.getControlValue();

						if (control.isValid() || _.isUndefined(saveData[binding])) {
							saveData[binding] = value;
						}
						//If the control is not valid and saveData[binding] has already been set
						//don't save the value
						//This means that some values are NOT saved
						//The invalid ones if the control shares a binding with another valid
					}
				};
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('value');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);

		/*globals console */
		//end region

		var FormsLogger = Class.subClass({
			logger: null,
			getLogger: function getLogger() {
				if (!FormsLogger.logger) {
					FormsLogger.logger = new FormsLogger();
				}
				return FormsLogger.logger;
			}
		}, {
			init: function init() {
				this.debug = window.formLoggerEnabled;
			},
			log: function log(value) {
				if (this.debug) {
					console.log(value); // eslint-disable-line no-console
				}
			},
			error: function error(value) {
				console.error(value); // eslint-disable-line no-console
			},
			count: function count(value) {
				if (this.debug) {
					console.count(value); // eslint-disable-line no-console
				}
			},
			time: function time(value) {
				if (this.debug) {
					console.time(value); // eslint-disable-line no-console
				}
			},
			timeEnd: function timeEnd(value) {
				if (this.debug) {
					console.timeEnd(value); // eslint-disable-line no-console
				}
			}
		});

		return FormsLogger;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ValueHelper = __webpack_require__(49),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1);

		//endregion

		function unwrapValue(value) {
			value = ko.unwrap(value);
			if (value && value.toJS) {
				return value.toJS();
			} else {
				return value;
			}
		}

		return Class.subClass({
			toJS: function toJS(object) {
				var js = _.isArray(object) ? [] : {};
				_.each(object, function (value, key) {
					js[key] = unwrapValue(value);
					if (_.isObject(js[key])) {
						js[key] = this.toJS(js[key]);
					}
				}, this);
				return js;
			},
			//TODO unify this with toJS
			toMinJS: function toMinJS(object) {
				var js = _.isArray(object) ? [] : {};
				_.each(object, function (value, key) {
					value = unwrapValue(value);
					if (!(_.isObject(value) ? _.isEmpty(value) : ValueHelper.isNullEmptyOrUndefined(value))) {
						js[key] = value;
						if (_.isObject(js[key])) {
							js[key] = this.toMinJS(js[key]);
						}
					}
				}, this);
				return js;
			}
		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(29);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		'use strict';

		//region dependencies

		var StringUtils = __webpack_require__(32),
		    _ = __webpack_require__(0);
		//endregion

		function getProperty(object, propertyName) {
			return object[propertyName];
		}

		//ToDo Remove when Catalog supports UpperCase and dashes (-)
		function camelize(string) {
			string = StringUtils.trim(string).replace(/[-\s]+(.)?/g, function (match, c) {
				return c ? c.toUpperCase() : '';
			});
			return StringUtils.decap(string);
		}

		var DotExpressionResolver = {
			//This regex will match a key followed by a square brackets with numbers inside
			//It also captures the key and the index, so we can access to the correct entry in the array
			arrayBracketRegex: /(\S*)\[(\d+)\]/,
			_getValue: function _getValue(object, properties, valueResolver) {
				var value = void 0;
				var propertyName = properties.shift();
				if (propertyName) {
					value = valueResolver(object, propertyName);
					if (value) {
						value = DotExpressionResolver._getValue(value, properties, valueResolver);
					}
				} else {
					//required value found.
					value = object;
				}
				return value;
			},
			getValue: function getValue(object, dottedExpression) {
				if (StringUtils.trim(dottedExpression).length > 0) {
					var properties = dottedExpression.split('.');
					return DotExpressionResolver._getValue(object, properties, getProperty);
				}
			},
			//ToDo Remove when Catalog supports UpperCase and dashes (-)
			/**
    * @deprecated
    * @param object
    * @param dottedExpression
    * @returns {*}
    */
			getPCSCompatibleValue: function getPCSCompatibleValue(object, dottedExpression) {
				if (StringUtils.trim(dottedExpression).length > 0) {
					var properties = dottedExpression.split('.');
					return DotExpressionResolver._getValue(object, properties, function (object, propertyName) {
						var sanitizedObject = {};
						//We need to do an each of the keys to avoid a nasty problem where,
						// if object has a 'length' property (which it might because we don't know)
						// it treats the object like an array, which we 100% don't want to do
						_.each(_.keys(object), function (key) {
							var value = object[key];
							var sanitizedKey = camelize(key);
							sanitizedObject[sanitizedKey] = value;
						});
						//Check if the property name includes an array bracket
						var indexMatch = propertyName.match(DotExpressionResolver.arrayBracketRegex);
						if (indexMatch) {
							//Get the array using the captured property name
							var arrayProperty = getProperty(sanitizedObject, camelize(indexMatch[1]));
							//return the correct entry in the array, using the captured index
							return arrayProperty && arrayProperty[parseInt(indexMatch[2])];
						} else {
							return getProperty(sanitizedObject, camelize(propertyName));
						}
					});
				}
			}
		};

		return DotExpressionResolver;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    TypeFactory = __webpack_require__(206),
		    NameGenerator = __webpack_require__(57),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2),
		    ObjectTypeRef = __webpack_require__(117),
		    DoNotResolveRefStrategy = __webpack_require__(118),
		    ResolveRefStrategy = __webpack_require__(215),
		    IdentityType = __webpack_require__(216),
		    ObjectAttribute = __webpack_require__(116);
		//endregion

		var addObjectType = function addObjectType(objectType) {
			TypeCatalog.getObjectTypes()[objectType.id()] = objectType;
		};

		var TypeCatalog = Class.subClass({

			initTypes: function initTypes() {
				this.objectTypes = undefined;
				this.objectTypesRefs = undefined;
			},

			getSimpleTypesDefinitions: function getSimpleTypesDefinitions() {
				if (this.simpleTypes === undefined) {
					this.simpleTypes = ko.observable({});
					this.simpleTypes().STRING = TypeFactory.createStringType();
					this.simpleTypes().NUMBER = TypeFactory.createNumberType();
					this.simpleTypes().BOOLEAN = TypeFactory.createBooleanType();
					this.simpleTypes().DATE = TypeFactory.createDateType();
					this.simpleTypes().TIME = TypeFactory.createTimeType();
					this.simpleTypes().DATE_TIME = TypeFactory.createDateTimeType();
					this.simpleTypes().ENUM = TypeFactory.createEnumType();
				}
				return this.simpleTypes();
			},

			getObjectTypesRefs: function getObjectTypesRefs() {
				if (this.objectTypesRefs === undefined) {
					this.objectTypesRefs = ko.observable({});
				}
				return this.objectTypesRefs();
			},

			getObjectTypes: function getObjectTypes() {
				if (this.objectTypes === undefined) {
					this.objectTypes = ko.observable({});
				}
				return this.objectTypes();
			},

			getArrayTypeDefinition: function getArrayTypeDefinition(itemType) {
				return this.getArrayType(itemType);
			},

			getArrayType: function getArrayType(itemType, name, items) {
				return TypeFactory.createArrayType(name, itemType, items);
			},

			//get specific identityType object
			getIdentityType: function getIdentityType() {
				addObjectType(IdentityType);
				return IdentityType;
			},

			parseRootType: function parseRootType(schemaKey, schema) {
				return this._doParseType(schemaKey, schema, new DoNotResolveRefStrategy());
			},

			parseTypePartially: function parseTypePartially(schemaKey, schema, depth) {
				return this._doParseType(schemaKey, schema, new ResolveRefStrategy(depth));
			},

			/* jshint maxcomplexity: 17 */
			//TODO improve this method!!!
			_doParseType: function _doParseType(schemaKey, schema, strategy) {
				if (schema === undefined) {
					return TypeFactory.createUnknownType({});
				}
				if (schema.$ref) {
					if (this.getObjectTypesRefs()[schema.$ref] === undefined) {
						this.getObjectTypesRefs()[schema.$ref] = TypeFactory.createObjectTypeRef(schema.$ref, schemaKey);
					}
					return strategy.resolveReference(schema.$ref, this);
				} else if (schema.enum) {
					return TypeFactory.createEnumType(schemaKey, schema.enum);
				} else {
					// The new Json translator returns an array like [ "number", null ] if the field is nullable.
					// If the field is not nullable it returns a string like "number";
					var schemaType = Array.isArray(schema.type) ? schema.type[0] : schema.type;
					switch (schemaType) {
						case 'string':
							var simpleType;
							switch (schema.format) {
								case 'string':
									simpleType = TypeFactory.createStringType(schemaKey);
									break;
								case 'date':
									simpleType = TypeFactory.createDateType(schemaKey);
									break;
								case 'time':
									simpleType = TypeFactory.createTimeType(schemaKey);
									break;
								case 'date-time':
									simpleType = TypeFactory.createDateTimeType(schemaKey);
									break;
								default:
									simpleType = TypeFactory.createStringType(schemaKey);
									break;
							}
							return simpleType;
						case 'boolean':
							return TypeFactory.createBooleanType(schemaKey);
						case 'number':
							var type;
							if (schema.format === 'base64Binary') {
								type = TypeFactory.createStringType(schemaKey);
							} else {
								type = TypeFactory.createNumberType(schemaKey);
							}
							return type;
						case 'array':
							var itemType = this._doParseType('itemType', schema.items, strategy);
							return this.getArrayType(itemType, schemaKey, schema.items);
						case 'object':
							var objectType;
							if (this.getObjectTypes()[schema.$id]) {
								objectType = this.getObjectTypes()[schema.$id] = strategy.getObjectType(schema, this);
							} else {
								var objectName = NameGenerator.generateName(schema.$name, this.objectTypes());
								objectType = strategy.createObjectType(schema, objectName, this);
								addObjectType(objectType);
							}
							return objectType;
						default:
							return TypeFactory.createUnknownType(schema);
					}
				}
			},

			_createObjectType: function _createObjectType(schema, objectName, strategy) {
				var attributes = [];

				_.each(_.keys(schema.properties), function (attributeKey) {
					var attribute = schema.properties[attributeKey];
					TypeCatalog.parseType(attribute);
					var dataType = this._doParseType(attributeKey, attribute, strategy);
					attributes.push(new ObjectAttribute(attributeKey, dataType));
				}, this);

				return TypeFactory.createObjectType(schema.$id, objectName, attributes);
			},

			resolveReference: function resolveReference(objectTypeRef) {
				return this._getOrResolveReference(objectTypeRef, new ResolveRefStrategy(1));
			},

			_getOrResolveReference: function _getOrResolveReference(objectTypeRef, strategy) {
				var objectType = _.find(this.getObjectTypes(), function (type) {
					return type.schema().$id === objectTypeRef.schema().$ref;
				}, this);

				if (objectType) {
					return objectType;
				} else {
					return this._doResolveReference(objectTypeRef, strategy);
				}
			},

			_doResolveReference: function _doResolveReference(objectTypeRef, strategy) {
				var schema = this.typeHandler.getResolvedControl(objectTypeRef.schema().$ref);

				if (!$.isEmptyObject(schema)) {
					return this._doParseType(objectTypeRef.name(), schema, strategy);
				} else {
					return TypeFactory.createUnknownType(objectTypeRef.schema());
				}
			},

			getConcreteType: function getConcreteType(schemaKey, schema) {
				var type = this._doParseType(schemaKey, schema, new DoNotResolveRefStrategy());

				if (type instanceof ObjectTypeRef) {
					type = this.resolveReference(type);
				}

				return type;
			},

			parseType: function parseType(attribute) {
				//TODO should we still support not array types? 27335275
				if (_.isArray(attribute.type) && !_.isEmpty(attribute.type)) {
					//Bug 27335275 workaround to support JSON Schemas
					// that are sending the type and null [“string”, “null”]
					attribute.type = attribute.type[0];
				}
			}

		}, {});

		return TypeCatalog;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		return {
			ACTION_BLOCK: 'ACTION_BLOCK',
			IF_BLOCK: 'IF_BLOCK',
			CONNECTOR_BLOCK: 'CONNECTOR_BLOCK',
			ERROR_BLOCK: 'ERROR_BLOCK',
			FILTER_BLOCK: 'FILTER_BLOCK',
			EVENT_FILTER_BLOCK: 'EVENT_FILTER_BLOCK',
			FILTER_IF_BLOCK: 'FILTER_IF_BLOCK'
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    ColumnSpan = __webpack_require__(370),
		    TreeUtil = __webpack_require__(40),
		    $ = __webpack_require__(2);

		//endregion

		return Class.subClass({}, {
			init: function init(data, context, controlFactory, controlContainer) {
				var self = this;
				this.viewModel = context.viewModel;

				_.defaults(data, {
					controls: []
				});

				self.controls = ko.observableArray(self._generateControls(controlContainer, data.controls, context, controlFactory));

				self.columnSpan = new ColumnSpan(self.controls, context);

				self.getAllControls = function (skipControlsInsideRepeatables) {
					//getControls calls the function, controls calls the observable with all children
					return TreeUtil.treeToList([this], skipControlsInsideRepeatables ? 'getControls' : 'controls');
				};
				self.getControls = function () {
					return ko.unwrap(self.controls);
				};

				controlContainer.isValid = ko.pureComputed({
					read: function read() {
						var controls = controlContainer.dataSource ? controlContainer.dataSource() : controlContainer.getControls();
						return _.every(controls, function (control) {
							return control.isValid();
						});
					},
					write: function write(value) {
						//ignore
					}
				});
			},
			hasValueProperty: function hasValueProperty() {
				return false;
			},
			getParent: function getParent() {
				return this._parent;
			},
			getBindingContext: function getBindingContext() {
				return this.getParent() ? this.getParent().getContextForChildren(this) : '';
			},
			getContextForChildren: function getContextForChildren(child) {
				return this.getBindingContext();
			},
			_generateControls: function _generateControls(controlContainer, jsonControls, context, ControlFactory) {
				var controls = [];
				$.each(jsonControls, function (index, controlData) {
					var control = ControlFactory.createControl(controlData.id, controlData.name, controlData.type, controlData, context, controlContainer);
					controls.push(control);
				});
				return controls;
			},
			findControl: function findControl(controlId) {
				var control = TreeUtil.find(this, 'controls', 'id', controlId);
				control = control == null ? TreeUtil.find(this, 'controls', 'properties.originalId', controlId) : control;
				return control !== null ? control.node : null;
			}

		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(28);
var createDesc = __webpack_require__(54);
module.exports = __webpack_require__(30) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var IE8_DOM_DEFINE = __webpack_require__(98);
var toPrimitive = __webpack_require__(68);
var dP = Object.defineProperty;

exports.f = __webpack_require__(30) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(44)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {

		'use strict';

		var escapeRegExp = function escapeRegExp(str) {
			return str.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
		};

		var defaultToWhiteSpace = function defaultToWhiteSpace(characters) {
			if (characters != null) {
				return '[' + escapeRegExp('' + characters) + ']';
			}
			return '\\s';
		};

		var StringUtils = {
			_nativeTrim: String.prototype.trim,

			/**
    * Converts a camelized or dasherized String into an underscored one
    * @param str {String}
    * @returns {String}
    */
			underscored: function underscored(str) {
				return this.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
			},

			/**
    * Trims defined characters from beginning and ending of the String. Defaults to whitespace characters.
    * @param str {String}
    * @param characters [Array]
    * @returns {String}
    */
			trim: function trim(str, characters) {
				str = this._makeString(str);
				if (!characters && this._nativeTrim) {
					return this._nativeTrim.call(str);
				}
				characters = defaultToWhiteSpace(characters);
				return str.replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
			},

			/**
    * Capitalizes the first word, turns underscores into spaces, and strips a trailing ‘_id’ if present.
    * @param str {String}
    * @returns {String}
    */
			humanize: function humanize(str) {
				return this.capitalize(this.underscored(str).replace(/_id$/, '').replace(/_/g, ' '));
			},

			/**
    * Capitalizes the first word.
    * @param str {String}
    * @returns {String}
    */
			capitalize: function capitalize(str) {
				str = this._makeString(str);
				return str.charAt(0).toUpperCase() + str.substring(1);
			},

			/**
    * Splits String by delimiter (String or RegExp), taking /\s+/ by default.
    * @param str {String}
    * @param delimiter [String] (or RegExp)
    * @returns {Array}
    */
			words: function words(str, delimiter) {
				return this.trim(str, delimiter).split(delimiter || /\s+/);
			},

			/**
    * Capitalizes all the words in the String and make a title version of it.
    * @param str {String}
    * @returns {String}
    */
			titleize: function titleize(str) {
				return ('' + str).replace(/\b./g, function (ch) {
					return ch.toUpperCase();
				});
			},

			/**
    * Converts the String to a camelize Class name.
    * @param str {String}
    * @returns {string}
    */
			classify: function classify(str) {
				str = this._makeString(str);
				return this.titleize(str.replace(/_/g, ' ')).replace(/\s/g, '');
			},

			/**
    * Converts underscored or dasherized string to a camelized one.
    * Begins with a lower case letter unless it starts with an underscore, dash or an upper case letter.
    * @param str {String}
    * @param [decapitalize] {boolean}
    * @returns {string}
    */
			camelize: function camelize(str, decapitalize) {
				str = this.trim(str).replace(/[-_\s]+(.)?/g, function (match, c) {
					return c ? c.toUpperCase() : '';
				});

				if (decapitalize === true) {
					return this.decap(str);
				} else {
					return str;
				}
			},

			replaceSymbol: function replaceSymbol(str, symbol, replaceStr) {
				str = this._makeString(str);
				var escapedSymbol = escapeRegExp(this._makeString(symbol));
				var newRe = new RegExp('[' + escapedSymbol + ']', 'g');
				return str.replace(newRe, this._makeString(replaceStr));
			},

			/**
    * Converts first letter of the string to lowercase.
    * @param str
    * @returns {string}
    */
			decap: function decap(str) {
				str = this._makeString(str);
				return str.charAt(0).toLowerCase() + str.slice(1);
			},

			/**
    * Returns a boolean value defining if the String starts with the given prefix
    * @param str {String}
    * @param prefix {String}
    * @returns {boolean}
    */
			startsWith: function startsWith(str, prefix) {
				str = this._makeString(str);
				return str.indexOf(prefix) === 0;
			},

			/**
    * Returns a boolean value defining if the String ends with the given suffix
    * @param str {String}
    * @param suffix {String}
    * @returns {boolean}
    */
			endsWith: function endsWith(str, suffix) {
				str = this._makeString(str);
				return str.indexOf(suffix, str.length - suffix.length) !== -1;
			},

			/**
    * Ensure some object is a coerced to a string
    **/
			_makeString: function _makeString(object) {
				if (object == null) {
					return '';
				}
				return '' + object;
			},

			/**
    * Wraps a string given number of characters
    * Taken from http://james.padolsey.com/snippets/wordwrap-for-javascript/
    * @param str {String} the input string
    * @param width {Number} The number of characters at which the string will be wrapped
    * @param cut {Boolean} If TRUE a word will be broken up if longer than width
    * @returns {*}
    */
			wordwrap: function wordwrap(str, width, cut) {
				str = this._makeString(str);

				if (str.length === 0) {
					return [];
				}
				width = width || 75;

				var regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');

				return str.match(RegExp(regex, 'g'));
			},

			/**
    * Formats a str, replacing {N} by argument #N
    * i.e. StringUtils.format('Hello {0}!' , 'World') => 'Hello World!'
    * @param str
    * @param [arguments]: strings
    * If an argument is not valid, it will be replaced by an empty string
    */
			format: function format(str) {
				var args = arguments;
				return str.replace(/{(\d+)}/g, function (match, number) {
					return StringUtils._makeString(args[Number(number) + 1]);
				});
			},

			/**
    * generates a string ending with '...' to make it shorter
    * @param str: string to shorten
    * @param maxIndex: maximum index of the wanted string
    */
			generateLabelWithDots: function generateLabelWithDots(str, maxIndex) {
				var result = '';
				str = this._makeString(str);
				maxIndex = maxIndex || 5;
				if (str.length >= maxIndex) {
					result = str.substring(0, maxIndex - 1) + '...';
				} else {
					result = str;
				}
				return result;
			},

			/**
    * Generates an valid XML element name from the provided string
    * Taken from https://www.w3schools.com/xml/xml_elements.asp
    * @param str {String} the input string
    * @returns {String} the valid xml element name
    */
			generateXmlElementName: function generateXmlElementName(str) {
				str = this.camelize(str);

				// Add starting underscore when string starts with number or the word 'xml'
				if (/^(\d|[xX][mM][lL])/g.test(str)) {
					str = '_' + str;
				}
				// Remove colon and dots (best practice)
				str = str.replace(/[.:]/g, '');

				return this.decap(str);
			}

		};

		return StringUtils;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Handler = __webpack_require__(255);
		//endregion

		return Handler.subClass({}, {
			init: function init(id) {
				this._super(id);
			},
			setContext: function setContext(context) {
				this.context = context;
			},
			resolveDependencies: function resolveDependencies(dependencies) {
				this.context.resolveDependencies(dependencies);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    ControlTypeId = __webpack_require__(4);

		//endregion

		return Control.subClass({}, {
			/* jshint maxparams: 6 */
			init: function init(id, name, properties, context, parent, controltype) {
				this._super(id, name, controltype || context.getControlDefinitionByType(ControlTypeId.INPUT_TEXT), properties, context, parent);

				_.defaults(properties, {
					autoComplete: false,
					help: '',
					hint: '',
					pattern: '',
					patternMessage: '',
					placeHolder: '',
					readonly: false,
					defaultValue: '',
					maxLength: null,
					minLength: null
				});

				this.properties.autoComplete = ko.observable(properties.autoComplete);
				this.properties.help = ko.observable(properties.help);
				this.properties.hint = ko.observable(properties.hint);
				this.properties.maxLength = ko.observable(properties.maxLength);
				this.properties.minLength = ko.observable(properties.minLength);
				this.properties.pattern = ko.observable(properties.pattern);
				this.properties.patternMessage = ko.observable(properties.patternMessage);
				this.properties.placeHolder = ko.observable(properties.placeHolder);
				this.properties.readonly = ko.observable(properties.readonly);
				this.properties.defaultValue = ko.observable(properties.defaultValue);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ControlFactory = __webpack_require__(88),
		    _ = __webpack_require__(0),
		    UUID = __webpack_require__(17);

		//endregion

		return Class.subClass({}, {
			init: function init(schemaKey, schema, context, businessControlFactory, parent) {
				var self = this;
				self.id = UUID.createUuid();
				self.name = schemaKey;
				self.parent = parent;
				self.context = context;
				self.schema = schema;
				self.businessControlFactory = businessControlFactory;
				self.data = schema.data || {};
				_.defaults(self.data, {
					properties: {}
				});
				_.defaults(self.data.properties, {
					binding: schemaKey
				});
			},
			create: function create() {
				return ControlFactory.createControl(this.id, this.name, this.type, this.data, this.context, this.parent);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(11);
var core = __webpack_require__(18);
var ctx = __webpack_require__(52);
var hide = __webpack_require__(27);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(174);
var defined = __webpack_require__(66);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var DataType = __webpack_require__(39);
		//endregion

		return DataType.subClass({}, {
			/* jshint maxparams: 6 */
			init: function init(name, label, icon, type, format) {
				this._super(this.getTypeName(), name, label, icon, {
					type: type,
					format: format
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return Class.subClass({}, {
			init: function init(id, name, label, icon, schema) {
				var self = this;
				self.id = ko.observable(id);
				self.name = ko.observable(name);
				self.label = ko.observable(label);
				self.icon = ko.observable(icon);
				self._schema = schema;
			},
			isObject: function isObject() {
				return this.hasOwnProperty('attributes') && !TypeDescription.equals(this.getTypeDescription(), TypeDescription.UNKNOWN);
			},
			isContainer: function isContainer() {
				return TypeDescription.equals(this.getTypeDescription(), TypeDescription.OBJECT);
			},
			isArray: function isArray() {
				return false;
			},
			isEnum: function isEnum() {
				return false;
			},
			getTypeDescription: function getTypeDescription() {
				throw new Error('This function must be overridden');
			},
			getTypeName: function getTypeName() {
				return this.getTypeDescription().name;
			},
			getDefaultControl: function getDefaultControl() {
				return this.getTypeDescription().defaultControl;
			},
			toJS: function toJS() {
				return this.schema();
			},
			isCompatible: function isCompatible(type) {
				return this.id() === type.id();
			},
			schema: function schema() {
				return this._schema;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    DotExpressionResolver = __webpack_require__(23),
		    _ = __webpack_require__(0);

		//endregion

		var TreeUtil = Class.subClass({
			/**
    * given the children of a given tree it will return a list of every node and leaf.
    * @param rootChildren tree children
    * @param recursiveProperty the name of the property that defines the node
    * @returns {Array} list of elements in the tree.
    */
			treeToList: function treeToList(rootChildren, recursiveProperty) {
				var plainList = [];

				for (var i = 0; i < rootChildren.length; i++) {
					var child = rootChildren[i];
					var collection = _.isFunction(child[recursiveProperty]) ? child[recursiveProperty]() : child[recursiveProperty];
					if (collection) {
						var items = ko.unwrap(collection);
						plainList = plainList.concat(items);
						plainList = plainList.concat(TreeUtil.treeToList(items, recursiveProperty));
					}
				}
				return plainList;
			},
			find: function find(tree, recursiveProperty, property, value) {
				var items = _.isFunction(tree[recursiveProperty]) ? tree[recursiveProperty]() : tree[recursiveProperty];
				if (items && items.constructor === Array) {
					return TreeUtil._find(items, recursiveProperty, property, value, tree);
				}
				return null;
			},
			/*jshint maxcomplexity:8 */
			_find: function _find(rootChildren, recursiveProperty, property, value, parent) {
				var found = null;
				for (var i = 0; i < rootChildren.length; i++) {
					var child = rootChildren[i];
					var propertyAccessor = DotExpressionResolver.getValue(child, property);
					var nodeValue = _.isFunction(propertyAccessor) ? propertyAccessor() : propertyAccessor;
					if (nodeValue === value) {
						found = {
							node: child,
							parent: parent
						};
						break;
					}

					var items = _.isFunction(child[recursiveProperty]) ? child[recursiveProperty]() : child[recursiveProperty];
					if (items && items.constructor === Array) {
						found = TreeUtil._find(items, recursiveProperty, property, value, child);
						if (found) {
							break;
						}
					}
				}
				return found;
			}
		}, {});
		return TreeUtil;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var OjSelectItem = __webpack_require__(42),
		    msg = __webpack_require__(5);

		//endregion

		return {
			STATIC: OjSelectItem.create('STATIC', msg.STATIC_LABEL),
			REST: OjSelectItem.create('REST', msg.REST_LABEL),
			DYNAMIC: OjSelectItem.create('DYNAMIC', msg.DYNAMIC_LABEL),
			CONNECTOR: OjSelectItem.create('CONNECTOR', msg.CONNECTOR_LABEL),
			EVENT_CONNECTOR: OjSelectItem.create('EVENT_CONNECTOR', ''),
			LIST_CONNECTOR: OjSelectItem.create('LIST_CONNECTOR', '')
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);
		//endregion

		/**
   * Constructs an Item to use in a OjSelect component
   */
		return Class.subClass({
			create: function create(value, label) {
				return {
					value: value,
					label: label
				};
			}
		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var UUID = __webpack_require__(17),
		    _ = __webpack_require__(0),
		    EventActionBlock = __webpack_require__(154),
		    EventIfBlock = __webpack_require__(155),
		    EventConnectorBlock = __webpack_require__(346),
		    EventFilterBlock = __webpack_require__(347),
		    EventErrorBlock = __webpack_require__(348),
		    FilterBlock = __webpack_require__(349),
		    FilterIfBlock = __webpack_require__(350),
		    ActionsMap = __webpack_require__(58);

		//endregion

		return {
			createBlock: function createBlock(viewModel, model, scope) {
				//Set default values
				model = _.extend({
					id: UUID.createUuid(),
					type: EventActionBlock.TYPE
				}, model);
				return this[model.type](viewModel, model, scope);
			},

			'ACTION_BLOCK': function ACTION_BLOCK(viewModel, model, scope) {
				model = _.extend({
					action: {
						type: ActionsMap.DO_NOTHING.value
					},
					controlResolver: {}
				}, model);
				return new EventActionBlock(model, viewModel, scope);
			},
			'IF_BLOCK': function IF_BLOCK(viewModel, model, scope) {
				return new EventIfBlock(model, viewModel, scope);
			},
			'CONNECTOR_BLOCK': function CONNECTOR_BLOCK(viewModel, model, scope) {
				model = _.extend({
					connectorFeedProperties: {}
				}, model);
				return new EventConnectorBlock(model, viewModel, scope);
			},
			'EVENT_FILTER_BLOCK': function EVENT_FILTER_BLOCK(viewModel, model, scope) {
				return new EventFilterBlock(model, viewModel, scope);
			},
			'ERROR_BLOCK': function ERROR_BLOCK(viewModel, model, scope) {
				model = _.extend({
					action: {
						type: ActionsMap.DO_NOTHING.value
					},
					controlResolver: {}
				}, model);
				return new EventErrorBlock(model, viewModel, scope);
			},
			'FILTER_BLOCK': function FILTER_BLOCK(viewModel, model, scope) {
				return new FilterBlock(model, viewModel, scope);
			},
			'FILTER_IF_BLOCK': function FILTER_IF_BLOCK(viewModel, model, scope) {
				return new FilterIfBlock(model, viewModel, scope);
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5),
		    ValidationHelper = __webpack_require__(76);

		//endregion
		return {
			'BACKGROUND_COLOR': {
				styleType: 'inline',
				controlType: 'color',
				name: 'backgroundColor',
				label: msg.LABEL_BACKGROUND_COLOR,
				help: null,
				attrName: 'background-color',
				group: 'color',
				default: '#fcfdfe',
				validators: ValidationHelper.hexValueValidator(msg.HEX_COLOR_FORMAT_ERROR_MESSAGE)
			},
			'COLOR': {
				styleType: 'inline',
				controlType: 'color',
				name: 'color',
				label: msg.LABEL_COLOR,
				help: null,
				attrName: 'color',
				group: 'color',
				default: '#333333',
				validators: ValidationHelper.hexValueValidator(msg.HEX_COLOR_FORMAT_ERROR_MESSAGE)
			},
			'SIZE': {
				styleType: 'inline',
				controlType: 'select',
				name: 'fontSize',
				label: msg.LABEL_FONT_SIZE,
				help: null,
				attrName: 'font-size',
				options: [{
					label: msg.LABEL_FONT_SIZE_XSMALL,
					value: 'x-small'
				}, {
					label: msg.LABEL_FONT_SIZE_SMALL,
					value: 'small'
				}, {
					label: msg.LABEL_FONT_SIZE_NORMAL,
					value: '14px'
				}, {
					label: msg.LABEL_FONT_SIZE_LARGE,
					value: 'large'
				}, {
					label: msg.LABEL_FONT_SIZE_XLARGE,
					value: 'x-large'
				}],
				default: '14px'
			},
			'TEXT_ALIGN': {
				styleType: 'inline',
				controlType: 'select',
				name: 'textAlign',
				label: msg.LABEL_TEXT_ALIGN,
				help: null,
				attrName: 'text-align',
				options: [{
					label: msg.LABEL_TEXT_ALIGN_LEFT,
					value: 'left'
				}, {
					label: msg.LABEL_TEXT_ALIGN_RIGHT,
					value: 'right'
				}, {
					label: msg.LABEL_TEXT_ALIGN_CENTER,
					value: 'center'
				}],
				default: 'left',
				group: 'align'
			},
			'WIDTH': {
				styleType: 'inline',
				controlType: 'text',
				name: 'width',
				label: msg.LABEL_WIDTH,
				help: msg.WIDTH_INLINE_HELP,
				attrName: 'width',
				group: 'size',
				validators: ValidationHelper.dimensionValidator(msg.INVALID_WIDTH)
			},
			'HEIGHT': {
				styleType: 'inline',
				controlType: 'text',
				name: 'height',
				label: msg.LABEL_HEIGHT,
				help: msg.HEIGHT_INLINE_HELP,
				attrName: 'height',
				group: 'size',
				validators: ValidationHelper.dimensionValidator(msg.INVALID_HEIGHT)
			},
			'BORDER_COLOR': {
				styleType: 'inline',
				controlType: 'color',
				name: 'borderColor',
				label: msg.LABEL_BORDER_COLOR,
				help: null,
				attrName: 'border-color',
				group: 'border',
				default: '#dfe4e7',
				validators: ValidationHelper.hexValueValidator(msg.HEX_COLOR_FORMAT_ERROR_MESSAGE)
			},
			'BORDER_STYLE': {
				styleType: 'inline',
				controlType: 'select',
				name: 'borderStyle',
				label: msg.LABEL_BORDER_STYLE,
				help: null,
				attrName: 'border-style',
				placeholder: '',
				options: [{
					label: msg.LABEL_SOLID,
					value: 'solid'
				}, {
					label: msg.LABEL_DOTTED,
					value: 'dotted'
				}, {
					label: msg.LABEL_DASHED,
					value: 'dashed'
				}],
				default: 'solid',
				group: 'border'
			},
			'BORDER_WIDTH': {
				styleType: 'inline',
				controlType: 'text',
				name: 'borderWidth',
				label: msg.LABEL_BORDER_WIDTH,
				help: null,
				attrName: 'border-width',
				group: 'border',
				validators: ValidationHelper.borderDimensionValidator(msg.INVALID_BORDER_WIDTH)
			},
			'BORDER_RADIUS': {
				styleType: 'inline',
				controlType: 'text',
				name: 'borderRadius',
				label: msg.LABEL_BORDER_RADIUS,
				help: null,
				attrName: 'border-radius',
				group: 'border',
				validators: ValidationHelper.dimensionValidator(msg.INVALID_BORDER_RADIUS)
			},
			'CONTROL_ALIGN': {
				styleType: '',
				controlType: 'select',
				name: 'controlAlign',
				label: msg.LABEL_CONTROL_ALIGNMENT,
				help: null,
				options: [{
					label: msg.LABEL_TEXT_ALIGN_LEFT,
					value: 'left'
				}, {
					label: msg.LABEL_TEXT_ALIGN_RIGHT,
					value: 'right'
				}, {
					label: msg.LABEL_TEXT_ALIGN_CENTER,
					value: 'center'
				}],
				useIfDefault: true,
				default: 'left',
				group: 'align'
			},
			'LABEL_COLOR': {
				styleType: '',
				controlType: 'color',
				name: 'labelColor',
				label: msg.LABEL_LABEL_COLOR,
				help: null,
				group: 'label',
				default: '#4f4f4f',
				validators: ValidationHelper.hexValueValidator(msg.HEX_COLOR_FORMAT_ERROR_MESSAGE)
			},
			'LABEL_SIZE': {
				styleType: '',
				controlType: 'select',
				name: 'labelSize',
				label: msg.LABEL_LABEL_SIZE,
				help: null,
				options: [{
					label: msg.LABEL_FONT_SIZE_XSMALL,
					value: 'x-small'
				}, {
					label: msg.LABEL_FONT_SIZE_SMALL,
					value: 'small'
				}, {
					label: msg.LABEL_FONT_SIZE_NORMAL,
					value: '15px'
				}, {
					label: msg.LABEL_FONT_SIZE_LARGE,
					value: 'large'
				}, {
					label: msg.LABEL_FONT_SIZE_XLARGE,
					value: 'x-large'
				}],
				useIfDefault: true,
				default: '15px',
				group: 'label'
			},
			'CLASS_NAME': {
				styleType: '',
				controlType: 'text',
				name: 'controlClassName',
				default: '',
				help: msg.CONTROL_CLASS_NAME_INLINE_HELP,
				label: msg.LABEL_CONTROL_CLASS_NAME,
				validators: ValidationHelper.cssClassNameValidator(msg.INVALID_CLASS_NAME)
			},
			'TABLE_WIDTH': {
				styleType: '',
				controlType: 'tableWidth',
				name: msg.LABEL_TABLE_COLUMNS_WIDTH,
				default: '',
				help: msg.TABLE_WIDTH_INLINE_HELP,
				label: msg.LABEL_TABLE_WIDTH,
				validators: ValidationHelper.cssClassNameValidator(msg.INVALID_CLASS_NAME)
			},
			'TABLE_COLUMN_WIDTH': {
				styleType: 'inline',
				controlType: 'tableColumnWidth',
				name: 'tableColumnWidth',
				label: msg.LABEL_WIDTH,
				help: msg.WIDTH_INLINE_HELP,
				attrName: 'width',
				group: 'size',
				validators: ValidationHelper.dimensionValidator(msg.INVALID_WIDTH)
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    Value = __webpack_require__(15),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'VALUE'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);

				var defaultValue = control ? ko.utils.unwrapObservable(control.properties.defaultValue) : null;
				var controlId = control ? control.id : null;

				this.value = new Value(model.value || {
					expression: defaultValue,
					controlResolver: {},
					controlId: controlId
				}, viewModel, this.scope);
			},

			template: function template() {
				return 'valueAccessorEventTemplate';
			},

			execute: function execute(control, blockId) {
				control.setValue(this.value.resolve(this.viewModel));
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					value: this.value.toJS()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var $ = __webpack_require__(2),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    oj = __webpack_require__(7);
		//endregion

		//Checks if the control has been rendered in the DOM
		function isRendered(control) {
			return ko.unwrap(control.rendered);
		}

		function _setRawValue(control, ojComponentType, valueString) {
			//If element is rendered, update it and trigger OJet validation
			//Otherwise set the _rawValue, which will be updated when it is
			if (isRendered(control)) {
				var $control = $(control.domId);
				$control.val(valueString);
				//Make sure the oj component is instanced before triggering validation
				if (!(ojComponentType === 'ojInputTime' && valueString === '') && $control[ojComponentType]('instance')) {
					$control[ojComponentType]('validate');
				}
				oj.ComponentBinding.deliverChanges();
			} else {
				control._rawValue = valueString;
			}
		}

		return {
			/**
    * get rawValue directly from the DOM input.
    * @param control
    * @returns {*|jQuery} rawValue.
    */
			getRawValue: function getRawValue(control) {
				return isRendered(control) ? $(control.domId).val() : control._rawValue;
			},
			/**
    * checking if value is a number before setting the value.
    * If it is not a number, then setting the value in the UI and triggering validation.
    * Note: updating the UI, will not update oj rawValue or value.
    * @param control
    * @param valueString value to be set.
    */
			setNumber: function setNumber(control, valueString) {
				if (isNaN(valueString)) {
					_setRawValue(control, 'ojInputNumber', valueString);
				} else {
					control.value(valueString);
					//If the control is not rendered, save the value in _rawValue
					if (!isRendered(control)) {
						control._rawValue = control.value();
					}
				}
			},
			/**
    * checking if the date provided is a valid date.
    * If not valid, setting the value in the UI and triggering validation.
    * Note: updating the UI, will not update oj rawValue or value.
    * @param control
    * @param ojComponentType
    * @param converter
    * @param valueString value to be set
    */
			setDate: function setDate(control, ojComponentType, converter, valueString) {
				try {
					//checking if it is a valid date.
					control.value(converter.parse(valueString));
					//If the control is not rendered, save the value in _rawValue
					if (!isRendered(control)) {
						control._rawValue = control.value();
					}
				} catch (ex) {
					//failed to parse string.
					_setRawValue(control, ojComponentType, valueString);
				}
			},
			setRawValue: function setRawValue(control, ojComponentType, valueString) {
				_setRawValue(control, ojComponentType, valueString);
			},
			isNullEmptyOrUndefined: function isNullEmptyOrUndefined(val) {
				return _.isNull(val) || _.isUndefined(val) || _.isArray(val) && val.length === 0 || !_.isArray(val) && val === '';
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    assert = __webpack_require__(59);

		//endregion

		return Class.subClass({}, {
			init: function init(model, viewModel, scope) {
				assert(!!this._class.TYPE);
				assert(!!scope);

				this.id = model.id;
				this.viewModel = viewModel;
				this.scope = scope;
			},

			getType: function getType() {
				return this._class.TYPE;
			},
			getComponentName: function getComponentName() {
				return this._class.TEMPLATE_NAME;
			},

			execute:
			/* istanbul ignore next */
			function execute() {
				throw 'Must be overriden';
			},

			toJS: function toJS() {
				return {
					id: this.id,
					type: this.getType()
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(53);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(28).f;
var has = __webpack_require__(31);
var TAG = __webpack_require__(12)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    StringUtils = __webpack_require__(32),
		    TreeUtil = __webpack_require__(40),
		    ko = __webpack_require__(1),
		    $ = __webpack_require__(2);

		//endregion

		//this camelize will leave _.
		var camelize = function camelize(str) {
			str = StringUtils.trim(str).replace(/[\s]+(.)?/g, function (match, c) {
				return c.toUpperCase();
			});

			return str;
		};

		var NameGenerator = Class.subClass({
			generateName: function generateName(baseName, collection, property, index) {
				baseName = camelize(baseName);
				var name = index ? baseName + index : baseName;
				index = index ? index : 0;
				var nameProperty = property || 'name';

				$.each(ko.unwrap(collection), function (i, element) {
					if (ko.unwrap(element[nameProperty]) === name) {
						index++;
						name = NameGenerator.generateName(baseName, collection, nameProperty, index);
						return false;
					}
				});
				return name;
			},
			generateNameFromTree: function generateNameFromTree(baseName, tree, recursiveProperty, property, index) {
				var plainList = TreeUtil.treeToList(tree, recursiveProperty);
				return NameGenerator.generateName(baseName, plainList, property, index);
			}
		}, {});
		return NameGenerator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5),
		    EventsId = __webpack_require__(14),
		    EventAction = __webpack_require__(8),
		    SetPropertyAction = __webpack_require__(218),
		    SetStateAction = __webpack_require__(232),
		    SetValueAction = __webpack_require__(48),
		    SetLabelBindingAction = __webpack_require__(233),
		    SetImageValueAction = __webpack_require__(234),
		    SetVideoValueAction = __webpack_require__(235),
		    SelectTabAction = __webpack_require__(236),
		    RefreshGlobalConnectorAction = __webpack_require__(237),
		    SetMessageValueAction = __webpack_require__(238),
		    RefreshConnectorAction = __webpack_require__(239),
		    AddRowAction = __webpack_require__(240),
		    SetRepeatableValueAction = __webpack_require__(241),
		    SetInvalidAction = __webpack_require__(242),
		    ClearValueAction = __webpack_require__(243),
		    SetOptionsAction = __webpack_require__(244),
		    SetDataAction = __webpack_require__(245),
		    PreventSubmitAction = __webpack_require__(246),
		    TriggerOutcomeAction = __webpack_require__(247),
		    HideColumnAction = __webpack_require__(123),
		    ShowColumnAction = __webpack_require__(248),
		    ChangePresentationAction = __webpack_require__(249).default,
		    RemoveRowAction = __webpack_require__(250);
		//endregion

		return {
			'DO_NOTHING': {
				value: 'DO_NOTHING',
				label: msg.DO_NOTHING,
				disabled: true,
				Action: EventAction
			},
			'VALUE': {
				value: 'VALUE',
				label: msg.LABEL_VALUE,
				Action: SetValueAction
			},
			'SHOW': {
				value: 'SHOW',
				label: msg.SHOW,
				Action: SetStateAction.createStateAction('SHOW', 'hide', false)
			},
			'HIDE': {
				value: 'HIDE',
				label: msg.LABEL_HIDE,
				Action: SetStateAction.createStateAction('HIDE', 'hide', true)
			},
			'ENABLE': {
				value: 'ENABLE',
				label: msg.ENABLE,
				Action: SetStateAction.createStateAction('ENABLE', 'disabled', false)
			},
			'DISABLE': {
				value: 'DISABLE',
				label: msg.DISABLE,
				Action: SetStateAction.createStateAction('DISABLE', 'disabled', true)
			},
			'REQUIRED': {
				value: 'REQUIRED',
				label: msg.LABEL_REQUIRED,
				Action: SetStateAction.createStateAction('REQUIRED', 'required', true)
			},
			'OPTIONAL': {
				value: 'OPTIONAL',
				label: msg.OPTIONAL,
				Action: SetStateAction.createStateAction('OPTIONAL', 'required', false)
			},
			'EXPAND': {
				value: 'EXPAND',
				label: msg.EXPAND,
				Action: SetStateAction.createStateAction('EXPAND', 'expanded', true)
			},
			'COLLAPSE': {
				value: 'COLLAPSE',
				label: msg.COLLAPSE,
				Action: SetStateAction.createStateAction('COLLAPSE', 'expanded', false)
			},
			'READONLY': {
				value: 'READONLY',
				label: msg.LABEL_READONLY,
				Action: SetStateAction.createStateAction('READONLY', 'readonly', true)
			},
			'EDITABLE': {
				value: 'EDITABLE',
				label: msg.EDITABLE,
				Action: SetStateAction.createStateAction('EDITABLE', 'readonly', false)
			},
			'LABEL': {
				value: 'LABEL',
				label: msg.LABEL_LABEL,
				Action: SetPropertyAction.createPropertyAction('LABEL', 'label')
			},
			'MESSAGE': {
				value: 'MESSAGE',
				label: msg.MESSAGE,
				Action: SetMessageValueAction
			},
			'IMAGE_URL': {
				value: 'IMAGE_URL',
				label: msg.IMAGE_URL,
				Action: SetImageValueAction
			},
			'VIDEO_SRC': {
				value: 'VIDEO_SRC',
				label: msg.LABEL_SOURCE_URL,
				Action: SetVideoValueAction
			},
			'ALTERNATIVE_TEXT': {
				value: 'ALTERNATIVE_TEXT',
				label: msg.LABEL_ALT_TEXT,
				Action: SetPropertyAction.createPropertyAction('ALTERNATIVE_TEXT', 'alt')
			},
			'HINT': {
				value: 'HINT',
				label: msg.LABEL_HINT,
				Action: SetPropertyAction.createPropertyAction('HINT', 'hint')
			},
			'HELP': {
				value: 'HELP',
				label: msg.LABEL_HELP,
				Action: SetPropertyAction.createPropertyAction('HELP', 'help')
			},

			'MIN_VALUE': {
				value: 'MIN_VALUE',
				label: msg.LABEL_MIN_VALUE,
				Action: SetPropertyAction.createPropertyAction('MIN_VALUE', 'minValue')
			},
			'MAX_VALUE': {
				value: 'MAX_VALUE',
				label: msg.LABEL_MAX_VALUE,
				Action: SetPropertyAction.createPropertyAction('MAX_VALUE', 'maxValue')
			},
			'MIN_LENGTH': {
				value: 'MIN_LENGTH',
				label: msg.LABEL_MIN_LENGTH,
				Action: SetPropertyAction.createPropertyAction('MIN_LENGTH', 'minLength')
			},
			'MAX_LENGTH': {
				value: 'MAX_LENGTH',
				label: msg.LABEL_MAX_LENGTH,
				Action: SetPropertyAction.createPropertyAction('MAX_LENGTH', 'maxLength')
			},

			'PATTERN': {
				value: 'PATTERN',
				label: msg.LABEL_PATTERN_VALUE,
				Action: SetPropertyAction.createPropertyAction('PATTERN', 'pattern')
			},
			'PLACEHOLDER': {
				value: 'PLACEHOLDER',
				label: msg.LABEL_PLACEHOLDER,
				Action: SetPropertyAction.createPropertyAction('PLACEHOLDER', 'placeHolder')
			},
			'SELECT': {
				value: 'SELECT',
				label: msg.SELECT,
				Action: SelectTabAction
			},
			'ADD_ROW': {
				value: 'ADD_ROW',
				label: msg.ADD_ROW,
				Action: AddRowAction
			},
			'REFRESH_CONNECTOR': {
				value: 'REFRESH_CONNECTOR',
				label: msg.REFRESH_CONNECTOR,
				Action: RefreshConnectorAction
			},
			'SET_INVALID': {
				value: 'SET_INVALID',
				label: msg.THROW_ERROR,
				Action: SetInvalidAction
			},
			'REPEATABLE_VALUE': {
				value: 'REPEATABLE_VALUE',
				label: msg.LABEL_VALUE,
				Action: SetRepeatableValueAction
			},
			'OPTIONS': {
				value: 'OPTIONS',
				label: msg.SET_OPTIONS,
				Action: SetOptionsAction
			},
			'LABEL_BINDING': {
				value: 'LABEL_BINDING',
				label: msg.LABEL_LABEL,
				Action: SetLabelBindingAction
			},
			'CLEAR_VALUE': {
				value: 'CLEAR_VALUE',
				label: msg.CLEAR_VALUE,
				Action: ClearValueAction
			},
			'REMOVE_ROW': {
				value: 'REMOVE_ROW',
				label: msg.REMOVE_ROW,
				Action: RemoveRowAction
			},
			'CAN_ADD_REMOVE_ROWS': {
				value: 'CAN_ADD_REMOVE_ROWS',
				label: msg.ENABLE_ADD_REMOVE_ROWS,
				Action: SetStateAction.createStateAction('CAN_ADD_REMOVE_ROWS', 'canAddDelete', true)
			},
			'CANT_ADD_REMOVE_ROWS': {
				value: 'CANT_ADD_REMOVE_ROWS',
				label: msg.DISABLE_ADD_REMOVE_ROWS,
				Action: SetStateAction.createStateAction('CANT_ADD_REMOVE_ROWS', 'canAddDelete', false)
			},
			'REFRESH_GLOBAL_CONNECTOR': {
				value: 'REFRESH_GLOBAL_CONNECTOR',
				label: msg.REFRESH_GLOBAL_CONNECTOR,
				Action: RefreshGlobalConnectorAction
			},
			'SET_DATA': {
				value: 'SET_DATA',
				label: msg.SET_DATA,
				Action: SetDataAction
			},

			'TRIGGER_OUTCOME': {
				value: 'TRIGGER_OUTCOME',
				label: msg.TRIGGER_OUTCOME,
				Action: TriggerOutcomeAction
			},
			'PREVENT_SUBMIT': {
				value: 'PREVENT_SUBMIT',
				label: msg.PREVENT_SUBMIT,
				eventTriggers: [EventsId.ON_SUBMIT.value],
				Action: PreventSubmitAction
			},
			'HIDE_COLUMN': {
				value: 'HIDE_COLUMN',
				label: msg.HIDE_COLUMN,
				Action: HideColumnAction
			},
			'SHOW_COLUMN': {
				value: 'SHOW_COLUMN',
				label: msg.SHOW_COLUMN,
				Action: ShowColumnAction
			},
			'CHANGE_PRESENTATION': {
				value: 'CHANGE_PRESENTATION',
				label: msg.CHANGE_PRESENTATION,
				Action: ChangePresentationAction
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
		'use strict';

		return function (condition, message) {
			if (!condition) {
				throw new Error(message || 'Assertion failed');
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16),
		    msg = __webpack_require__(5);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'VALUE',
			label: msg.LABEL_VALUE,
			init: function init() {},
			getValue: function getValue(control) {
				return control.getControlValue();
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		var msg = __webpack_require__(5);

		return {
			'CONSTANT': {
				value: 'CONSTANT',
				label: msg.CONSTANT,
				resolveFunction: '_resolveConstant',
				decorateFunction: '_decorateConstant',
				template: null
			},
			'DATA': {
				value: 'DATA',
				label: msg.DATA_DEFINITION,
				resolveFunction: '_resolveData',
				template: 'dataValueTypeTemplate'
			},
			'CONTROL': {
				value: 'CONTROL',
				label: msg.CONTROL,
				resolveFunction: '_resolveControl',
				template: 'controlValueTypeTemplate'
			},
			'FUNCTION': {
				value: 'FUNCTION',
				label: msg.FUNCTION,
				resolveFunction: '_resolveFunction',
				decorateFunction: '_decorateFunction',
				template: 'functionValueTypeTemplate'
			},
			'SCOPE': {
				value: 'SCOPE',
				label: msg.CONNECTOR_DATA,
				resolveFunction: '_resolveScope',
				template: 'dataValueTypeTemplate'
			},
			'FILTER': {
				value: 'FILTER',
				label: 'Filter',
				resolveFunction: '_resolveFilter',
				template: 'filterValueTypeTemplate'
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(257);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(259);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    OptionsPropertiesFactory = __webpack_require__(273),
		    ko = __webpack_require__(1);
		__webpack_require__(277);

		//endregion

		return Class.subClass({}, {
			init: function init(typeId, context, properties) {
				this.properties = ko.observable(OptionsPropertiesFactory.createProperties(typeId, properties));

				this.customValidationMessages = ko.observableArray();

				this.loading = ko.observable(false);
			},
			getOptions: function getOptions() {
				throw new Error('operation not supported exception');
			},
			getDefaultValue: function getDefaultValue() {
				throw new Error('operation not supported exception');
			},
			getDefaultValueOptions: function getDefaultValueOptions() {
				throw new Error('operation not supported exception');
			},
			getConnectorCall: function getConnectorCall(form) {
				return false;
			},
			getTranslationBundle: /* istanbul ignore next */function getTranslationBundle() {
				//Nothing by default, if an options resolver has translatable info it will override this
			},
			translate: /* istanbul ignore next */function translate() {
				//Nothing by default, if an options resolver has translatable info it will override this
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    OptionsFeed = __webpack_require__(89),
		    OptionsType = __webpack_require__(41),
		    EventsId = __webpack_require__(14),
		    Filter = __webpack_require__(153),
		    ko = __webpack_require__(1);

		//endregion

		return Control.subClass({}, {
			/* jshint maxparams: 6 */
			_autoFocusMustBeNull: false,
			init: function init(id, name, controlType, properties, context, parent) {
				this._super(id, name, controlType, properties, context, parent);

				_.defaults(properties, {
					multiple: false,
					optionsFeed: {},
					filter: {
						blocks: []
					}
				});

				this.properties.multiple = ko.observable(properties.multiple);

				this.properties.filter = ko.observable(new Filter(id, properties.filter.blocks, context.viewModel, this.properties.filterEnabled));

				this.properties.optionsFeed = ko.observable(new OptionsFeed(properties.optionsFeed.type, context, properties.optionsFeed.properties, this.id, this.properties.filter()));

				this.properties.defaultValue = ko.pureComputed(function () {
					var optionsFeed = this.properties.optionsFeed();
					return optionsFeed.optionsResolver().getDefaultValue();
				}, this);

				this.properties.computedOptions = ko.pureComputed(function () {
					var optionsFeed = this.properties.optionsFeed();
					var allOptionsArray = optionsFeed.optionsResolver().getOptions();
					var valuesArray = [];
					var nonRepeatedOptionsArray = [];
					allOptionsArray.forEach(function (element) {
						if (!(valuesArray.indexOf(element.value) > -1)) {
							valuesArray.push(element.value);
							nonRepeatedOptionsArray.push(element);
						}
					});
					return nonRepeatedOptionsArray;
				}, this);

				this.properties.autoFocus = ko.pureComputed({
					read: function read() {
						var val = this.properties.optionsFeed().optionsResolver().autoFocus();
						//In same cases (Checklist, RadioButtons) the autofocus is used in a oj select
						//in those cases, we need to return null, because "false" will be overriden by oj as the first option
						if (this._autoFocusMustBeNull && !val) return null;
						return val;
					},
					write: function write(value) {
						this.properties.optionsFeed().optionsResolver().autoFocus(value);
					},
					owner: this
				});

				var self = this;
				this.currentOptionsFeedType = ko.pureComputed({
					read: function read() {
						var optionsFeed = ko.unwrap(self.properties.optionsFeed).type();
						return optionsFeed ? optionsFeed.value : null;
					},
					write: function write() {}
				});

				this.properties.defaultValue.subscribe(function () {
					/* istanbul ignore else*/
					if (self.value) {
						var val = self.getControlValue();
						if (self._isNullEmptyOrUndefined(val)) {
							val = self.properties.defaultValue();
						}
						self.setValue(val);
						self.executeEvent(EventsId.ON_CHANGE.value);
					}
				});
			},
			getConnectorCall: function getConnectorCall() {
				return this.properties.optionsFeed().optionsResolver().getConnectorCall(this.viewModel.form());
			},
			refreshConnector: function refreshConnector() {
				if (this.properties.optionsFeed().type() === OptionsType.CONNECTOR) {
					this.properties.optionsFeed().optionsResolver().loadAndSetConnector(this.viewModel.form());
				}
			},
			reApplyFilter: function reApplyFilter() {
				this.properties.optionsFeed().optionsResolver().reApplyFilter();
			},
			getDataTemplate: function getDataTemplate() {
				return 'selectValueTypeTemplate';
			},
			toJS: function toJS() {
				var toJs = this._super();
				delete toJs.properties.defaultValue;
				delete toJs.properties.multiple;
				delete toJs.properties.computedOptions;
				delete toJs.properties.autoFocus;
				toJs.properties.optionsFeed = this.properties.optionsFeed().toJS();
				toJs.properties.filter = this.properties.filter().toJS();
				return toJs;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 65 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(29);
var document = __webpack_require__(11).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(29);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(101);
var enumBugKeys = __webpack_require__(72);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(71)('keys');
var uid = __webpack_require__(55);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(11);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(53);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);

		//endregion

		return Class.subClass({}, {

			init: function init(id, controlTemplate) {
				this.id = id;
				this.controlTemplate = controlTemplate;
			},
			properties: function properties() {
				return {
					controlTemplate: this.controlTemplate
				};
			},
			isBindable: function isBindable() {
				return false;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var StyleTypeId = __webpack_require__(47),
		    msg = __webpack_require__(5),
		    richTextEditorTemplate = __webpack_require__(217),
		    ActionsMap = __webpack_require__(58),
		    PropertiesMap = __webpack_require__(77),
		    EventsId = __webpack_require__(14);

		__webpack_require__(251)();

		//endregion

		return {
			RICH_TEXT_EDITOR: {
				id: 'RICH_TEXT_EDITOR',
				name: msg.CONTROL_RICH_TEXT_EDITOR,
				icon: 'TEXT_AREA',
				dataType: 'STRING',
				templateName: 'richTextEditorTemplate',
				properties: {
					label: msg.CONTROL_RICH_TEXT_EDITOR,
					defaultValue: '',
					readonly: false,
					help: '',
					hide: false
				},
				styles: [StyleTypeId.LABEL_SIZE],
				translatableProperties: ['label', 'defaultValue', 'help'],
				events: [EventsId.ON_LOAD, EventsId.ON_CHANGE, EventsId.ON_SUBMIT],
				eventActions: [ActionsMap.VALUE, ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.READONLY, ActionsMap.EDITABLE, ActionsMap.LABEL, ActionsMap.HELP],
				eventProperties: [PropertiesMap.VALUE, PropertiesMap.LABEL, PropertiesMap.HIDDEN],
				computable: true,
				template: richTextEditorTemplate
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    oj = __webpack_require__(7),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    TreeUtil = __webpack_require__(40),
		    msg = __webpack_require__(5);
		//endregion

		var URL_PATTERN = '^(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$';

		return Class.subClass({
			positiveValueValidator: function positiveValueValidator(message) {
				return [{
					validate: function validate(value) {
						if (value <= 0) {
							throw new oj.ValidatorError(msg.INCORRECT_FORMAT_MESSAGE, message);
						}
						return true;
					}
				}];
			},
			dimensionValidator: function dimensionValidator(message) {
				return [{
					type: 'regExp',
					options: {
						pattern: '^(auto|0)$|^[0-9]+(\\.[0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc)$',
						messageSummary: msg.INCORRECT_FORMAT_MESSAGE,
						messageDetail: message
					}
				}];
			},
			borderDimensionValidator: function borderDimensionValidator(message) {
				return [{
					type: 'regExp',
					options: {
						pattern: '^(auto|0)$|^[0-9]+(\\.[0-9]+)?(px|em|ex|in|cm|mm|pt|pc)$',
						messageSummary: msg.INCORRECT_FORMAT_MESSAGE,
						messageDetail: message
					}
				}];
			},
			hexValueValidator: function hexValueValidator(message) {
				return [{
					type: 'regExp',
					options: {
						pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
						messageSummary: msg.INCORRECT_FORMAT_MESSAGE,
						messageDetail: message
					}
				}];
			},
			cssClassNameValidator: function cssClassNameValidator(message) {
				return [{
					type: 'regExp',
					options: {
						pattern: '^((([a-zA-Z_]|-[a-zA-Z_-])[a-zA-Z0-9_-]*)\\s*)*$',
						messageSummary: msg.INCORRECT_FORMAT_MESSAGE,
						messageDetail: message
					}
				}];
			},
			urlPattern: URL_PATTERN,
			urlValidator: function urlValidator() {
				return [{
					type: 'regExp',
					options: {
						pattern: URL_PATTERN,
						messageDetail: msg.URL_FORMAT_ERROR_MESSAGE
					}
				}];
			},
			videoUrlValidator: function videoUrlValidator() {
				return [{
					type: 'regExp',
					options: {
						pattern: '^(https?:\\/\\/)?(player.|www.)?(vimeo\\.com|youtu(be\\.com|\\.be|be\\.googleapis\\.com))\\/(watch\\?v=|video\\/|embed\\/)?([A-Za-z0-9._%-]*)(\\&\\S+)?$',
						messageDetail: msg.URL_FORMAT_ERROR_MESSAGE
					}
				}];
			},
			optionsLengthValidator: function optionsLengthValidator(model, message) {
				return [{
					validate: function validate(value) {
						var compareTo = model.optionsNames.peek().split('\n').length,
						    formattedValue = value.split('\n').length;
						if (formattedValue !== compareTo) {
							throw new oj.ValidatorError(message);
						}
						return true;
					}
				}];
			},
			optionsBlankValueValidator: function optionsBlankValueValidator(message) {
				return [{
					validate: function validate(value) {
						var formattedValue = value.split('\n');
						for (var i = 0; i < formattedValue.length; i++) {
							if ($.trim(formattedValue[i]) === '') {
								throw new oj.ValidatorError(message);
							}
						}
						return true;
					}
				}];
			},
			optionsUniqueValueValidator: function optionsUniqueValueValidator(message) {
				return [{
					validate: function validate(value) {
						var formattedValue = value.split('\n');
						if (_.uniq(formattedValue).length !== formattedValue.length) {
							throw new oj.ValidatorError(message);
						}
						return true;
					}
				}];
			},
			uniqueControlNameValidator: function uniqueControlNameValidator(message, data) {
				return [{
					validate: function validate(value) {
						var plainList = TreeUtil.treeToList(data.viewModel.form().presentation().controls(), 'controls');
						// If the entered value is different than that in the view model and already assigned to another control in the tree,
						// throw an error.
						if (ko.unwrap(data.name).toLowerCase() !== value.toLowerCase() && _.find(plainList, function (control) {
							return ko.unwrap(control.name).toLowerCase() === value.toLowerCase();
						})) {
							throw new oj.ValidatorError(message);
						}
						return true;
					}
				}];
			}
		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5),
		    ControlProperty = __webpack_require__(16),
		    ControlValueProperty = __webpack_require__(60),
		    ControlIdentityValueProperty = __webpack_require__(219),
		    HasClassProperty = __webpack_require__(220),
		    IsValidProperty = __webpack_require__(221),
		    SelectedTabProperty = __webpack_require__(222),
		    ControlVideoSrcProperty = __webpack_require__(223),
		    ControlImageUrlProperty = __webpack_require__(224),
		    OptionsProperty = __webpack_require__(225),
		    IndexProperty = __webpack_require__(226),
		    RowCountProperty = __webpack_require__(227),
		    SelectedLabelProperty = __webpack_require__(228),
		    OutcomeProperty = __webpack_require__(229),
		    ControlMessageProperty = __webpack_require__(230);
		//endregion

		return {
			'VALUE': new ControlValueProperty(),
			'HAS_CLASS': new HasClassProperty(),
			'LABEL': new ControlProperty('LABEL', msg.LABEL_LABEL, 'label'),
			'MESSAGE': new ControlMessageProperty(),
			'VIDEO_SRC': new ControlVideoSrcProperty(),
			'IMAGE_URL': new ControlImageUrlProperty(),
			'PLACEHOLDER': new ControlProperty('PLACEHOLDER', msg.LABEL_PLACEHOLDER, 'placeHolder'),
			'HIDDEN': new ControlProperty('HIDDEN', msg.HIDDEN, 'hide'),
			'EXPANDED': new ControlProperty('EXPANDED', msg.LABEL_EXPANDED, 'expanded'),
			'DISABLED': new ControlProperty('DISABLED', msg.LABEL_DISABLED, 'disabled'),
			'REQUIRED': new ControlProperty('REQUIRED', msg.LABEL_REQUIRED, 'required'),
			'MIN_VALUE': new ControlProperty('MIN_VALUE', msg.LABEL_MIN_VALUE, 'minValue'),
			'MAX_VALUE': new ControlProperty('MAX_VALUE', msg.LABEL_MAX_VALUE, 'maxValue'),
			'IS_VALID': new IsValidProperty(),
			'OPTIONS': new OptionsProperty(),
			'SELECTED': new SelectedTabProperty(),
			'IDENTITY_VALUE': new ControlIdentityValueProperty(),
			'CAN_ADD_REMOVE_ROWS': new ControlProperty('CAN_ADD_REMOVE_ROWS', msg.ENABLED_ADD_REMOVE_ROWS, 'canAddDelete'),
			'INDEX': new IndexProperty(),
			'ROW_COUNT': new RowCountProperty(),
			'SELECTED_LABEL': new SelectedLabelProperty(),
			'OUTCOME': new OutcomeProperty()
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {

		'use strict';

		/**
   *
   *
   *
   *
   *
   *
   *
   *
   * DO NOT REMOVE THIS COMMENT
   * FOR PCS INTEGRATION (ADF DOESN'T INCLUDE SMALL FILES)
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */

		return {
			FORM_RENDERER: 'form-renderer'
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(12);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(11);
var core = __webpack_require__(18);
var LIBRARY = __webpack_require__(51);
var wksExt = __webpack_require__(79);
var defineProperty = __webpack_require__(28).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */

		//region dependencies

		var ContextualHandler = __webpack_require__(33),
		    _ = __webpack_require__(0);
		//endregion

		var DefaultTranslationsHandler = ContextualHandler.subClass({}, {
			init: function init(id) {
				this._super(id);
				this._bundles = {
					availableLanguages: [],
					initLocaleBundle: {},
					defaultBundle: {}
				};
				this._allBundles = [];
				//Cross-browser support for current language of the browser
				/* istanbul ignore next */
				var browserLanguage = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;
				var requireLocale;
				try {
					//If possible, get the locale from configuration
					requireLocale = requirejs.s.contexts._.config.locale;
				} catch (e) {
					//If there's an error, we'll use the browser language
				}
				this.currentLanguage = requireLocale || browserLanguage;
			},

			getKeyProperty: function getKeyProperty(key, property) {
				var value;
				var defaultBundle = this._bundles.defaultBundle;
				var initLocaleBundle = this._bundles.initLocaleBundle;
				if (initLocaleBundle && initLocaleBundle[key] && !_.isEmpty(initLocaleBundle[key][property])) {
					value = initLocaleBundle[key][property];
				} else if (defaultBundle && defaultBundle[key] && !_.isEmpty(defaultBundle[key][property])) {
					value = defaultBundle[key][property];
				}

				if (!_.isEmpty(value)) {
					return value;
				}
				return null;
			},

			getAllBundles: function getAllBundles() {
				return this._allBundles;
			},
			setAllBundles: function setAllBundles(allBundles) {
				this._allBundles = allBundles || [];
			},
			setAvailableLanguages: function setAvailableLanguages(availableLanguages) {
				this._bundles.availableLanguages = availableLanguages || [];
			},
			fetchCurrentLanguage: function fetchCurrentLanguage() {
				return this.fetchBundle(this.currentLanguage);
			},

			fetchBundle: function fetchBundle(languageId) {
				this._bundles.initLocaleBundle = {};
				this._bundles.defaultBundle = {};
				var specificLanguageId = this.getSpecificLanguageId(languageId);
				var genericLanguageId = this.getGenericLanguageId(languageId);
				_.each(this._allBundles, function (fetchedBundle) {
					if (this.getSpecificLanguageId(fetchedBundle.id) === specificLanguageId) {
						this._bundles.initLocaleBundle = fetchedBundle.bundle;
					}
					if (fetchedBundle.id === genericLanguageId) {
						this._bundles.defaultBundle = fetchedBundle.bundle;
					}
				}, this);
				if (_.isEmpty(this._bundles.initLocaleBundle) && !_.isEmpty(this._bundles.defaultBundle)) {
					this._bundles.initLocaleBundle = this._bundles.defaultBundle;
				}
				return _promise2.default.resolve(this._bundles);
			},

			clearAllBundles: function clearAllBundles() {
				this._allBundles = [];
			},

			saveBundles: function saveBundles(bundles) {
				var self = this;
				_.each(bundles, function (bundle, key) {
					var found = _.find(self._allBundles, function (item) {
						return item.id === key;
					});
					if (found) {
						found.bundle = bundle;
					} else {
						self._allBundles.push({
							id: key,
							bundle: bundle
						});
					}
				});
			},
			getSpecificLanguageId: function getSpecificLanguageId(id) {
				id = id || '';
				return id.replace(/[-_]/, '-');
			},
			getGenericLanguageId: function getGenericLanguageId(id) {
				return this.getSpecificLanguageId(id).split('-')[0];
			}
		});

		return {
			create: function create() {
				return new DefaultTranslationsHandler('DefaultTranslationsHandler');
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    koToJSUtil = __webpack_require__(21);

		//endregion

		return Class.subClass({}, {

			init: function init(properties) {},
			observables: function observables() {
				throw new Error('Not implemented operation exception');
			},
			toJS: function toJS() {
				return koToJSUtil.toJS(this.observables());
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    DynamicOptionType = __webpack_require__(133);

		//end region

		var DefaultValue = function DefaultValue(resolver) {
			this.read = function () {
				//get default Value based on dynamic default type
				var defaultValueList = resolver.properties().defaultValue();
				var realValues = [];
				$.each(defaultValueList, function () {
					var typeId = this;
					var dynamicOptionType = DynamicOptionType[typeId];
					var defaultValue = dynamicOptionType.getValue(resolver.getOptions());
					realValues = realValues.concat(defaultValue);
				});
				return realValues.length > 0 ? realValues : [];
			};
		};

		return {
			create: function create(resolver) {
				return ko.pureComputed(new DefaultValue(resolver));
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    ValidatorBuilder = __webpack_require__(290),
		    ValidatorTypeId = __webpack_require__(138),
		    ValidatorFactory = __webpack_require__(137),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('VALIDATION', dependencies);
			},
			_decorate: function _decorate(control) {

				control.silentlyValidated = false;

				//ignoring required as JET will automatically validate it.
				control.validators = ValidatorBuilder.getValidators(control.properties, [ValidatorTypeId.REQUIRED]);

				control.registerRenderListener(function (control) {
					if (control.silentlyValidated) {
						control.validate();
					}
				});
				control.validate = function () {
					var valid;
					if (control.rendered()) {
						//DO the component validation
						valid = this._validateComponent(control);
					} else {
						control.silentlyValidated = true;
						//DO silent validation.
						valid = this._validateSilently(control);
					}
					control.isValid(valid);
					return valid;
				}.bind(this);

				control.refreshValidators = function () {
					control.validators = ValidatorBuilder.getValidators(control.properties, [ValidatorTypeId.REQUIRED]);
					control.getOjComponent()('option', 'validators', control.validators);
				};
				if (ko.isSubscribable(control.properties.pattern)) {
					control.properties.pattern.subscribe(function (nv) {
						control.refreshValidators();
						control.validate();
					});
				}
			},
			_validateComponent: function _validateComponent(control) {
				throw 'Must be overwritten';
			},
			_validateSilently: function _validateSilently(control) {
				var valid = true;
				//Adding required when silently validating.
				var silentValidators = [ValidatorFactory.CREATE_REQUIRED(control.properties)];
				var typeValidators = ValidatorBuilder.getValidatorsForType(control.type, control.properties);
				silentValidators = silentValidators.concat(typeValidators);
				var validators = _.union(control.validators, silentValidators);

				_.each(validators, function (validator) {
					try {
						//having to validate both value and raw value because some cases
						// value will not be updated with rawValue until is rendered
						validator.validate(control.value());
						if (control._rawValue) {
							validator.validate(control._getRawValue());
						}
					} catch (ex) {
						valid = false;
					}
					return valid;
				});

				return valid && this._getDeferredCustomMessages(control).length === 0;
			},
			_getDeferredCustomMessages: function _getDeferredCustomMessages(control) {
				var customMessages = [];
				var deferredCalls = control.getOjComponent()();
				_.each(deferredCalls, function (call) {
					if (call[0] === 'option' && call[1] === 'messagesCustom' && call[2] !== undefined) {
						customMessages.push(call[2]);
					}
				});
				return customMessages;
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('silentlyValidated');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		// jshint maxstatements: 52

		//region dependencies

		var ControlTypeId = __webpack_require__(4);
		var _ = __webpack_require__(0);
		var ActionsMap = __webpack_require__(58);
		//endregion

		var basicControlActions = [ActionsMap.VALUE, ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.ENABLE, ActionsMap.DISABLE, ActionsMap.LABEL, ActionsMap.SET_INVALID, ActionsMap.CLEAR_VALUE];
		var inputActions = _.union(basicControlActions, [ActionsMap.REQUIRED, ActionsMap.OPTIONAL]);
		var inlineInputActions = _.union(inputActions, [ActionsMap.HELP, ActionsMap.HINT, ActionsMap.READONLY, ActionsMap.EDITABLE, ActionsMap.PLACEHOLDER]);
		var textActionsWithoutPattern = _.union(inlineInputActions, [ActionsMap.MIN_LENGTH, ActionsMap.MAX_LENGTH]);
		var textActions = _.union(textActionsWithoutPattern, [ActionsMap.PATTERN]);
		var valueActions = _.union(inlineInputActions, [ActionsMap.MIN_VALUE, ActionsMap.MAX_VALUE]);
		var lovActions = _.union(inputActions, [ActionsMap.REFRESH_CONNECTOR, ActionsMap.OPTIONS]);

		var actions = {};
		actions[ControlTypeId.INPUT_TEXT] = textActions;
		actions[ControlTypeId.TEXT_AREA] = textActions;
		actions[ControlTypeId.BUTTON] = [ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.ENABLE, ActionsMap.DISABLE, ActionsMap.LABEL];
		actions[ControlTypeId.SELECT] = lovActions;
		actions[ControlTypeId.CHECKLIST] = lovActions;
		actions[ControlTypeId.CHECKBOX] = inputActions;
		actions[ControlTypeId.RADIO_BUTTON] = lovActions;
		actions[ControlTypeId.NUMBER] = valueActions;
		actions[ControlTypeId.DATE] = valueActions;
		actions[ControlTypeId.TIME] = valueActions;
		actions[ControlTypeId.DATE_TIME] = valueActions;
		actions[ControlTypeId.EMAIL] = textActionsWithoutPattern;
		actions[ControlTypeId.URL] = textActionsWithoutPattern;
		actions[ControlTypeId.MESSAGE] = [ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.MESSAGE];
		actions[ControlTypeId.LINK] = [ActionsMap.DO_NOTHING, ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.LABEL_BINDING, ActionsMap.VALUE];
		actions[ControlTypeId.MONEY] = valueActions;
		actions[ControlTypeId.PHONE] = textActionsWithoutPattern;
		actions[ControlTypeId.IMAGE] = [ActionsMap.LABEL, ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.IMAGE_URL, ActionsMap.ALTERNATIVE_TEXT];
		actions[ControlTypeId.VIDEO] = [ActionsMap.LABEL, ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.VIDEO_SRC];
		actions[ControlTypeId.PANEL] = [ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.LABEL];
		actions[ControlTypeId.BUSINESS_TYPE] = [ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.LABEL];
		actions[ControlTypeId.SECTION] = [ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.LABEL, ActionsMap.EXPAND, ActionsMap.COLLAPSE];
		actions[ControlTypeId.FORM_REFERENCE] = [ActionsMap.LABEL, ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.CHANGE_PRESENTATION];
		actions[ControlTypeId.TAB_CONTAINER] = [ActionsMap.SHOW, ActionsMap.HIDE];
		actions[ControlTypeId.TAB] = [ActionsMap.SHOW, ActionsMap.SELECT, ActionsMap.HIDE, ActionsMap.ENABLE, ActionsMap.DISABLE, ActionsMap.LABEL];
		var repeatableActions = [ActionsMap.REPEATABLE_VALUE, ActionsMap.SHOW, ActionsMap.HIDE, ActionsMap.DISABLE, ActionsMap.ENABLE, ActionsMap.CAN_ADD_REMOVE_ROWS, ActionsMap.CANT_ADD_REMOVE_ROWS, ActionsMap.READONLY, ActionsMap.EDITABLE, ActionsMap.REFRESH_CONNECTOR, ActionsMap.ADD_ROW, ActionsMap.CLEAR_VALUE];
		actions[ControlTypeId.TABLE] = _.union(repeatableActions, [ActionsMap.HIDE_COLUMN, ActionsMap.SHOW_COLUMN]);
		actions[ControlTypeId.REPEATABLE_SECTION] = repeatableActions;
		actions[ControlTypeId.STRING_REPEATABLE_SECTION] = repeatableActions;
		actions[ControlTypeId.NUMBER_REPEATABLE_SECTION] = repeatableActions;
		actions[ControlTypeId.BOOLEAN_REPEATABLE_SECTION] = repeatableActions;
		actions[ControlTypeId.DATE_REPEATABLE_SECTION] = repeatableActions;
		actions[ControlTypeId.TIME_REPEATABLE_SECTION] = repeatableActions;
		actions[ControlTypeId.DATE_TIME_REPEATABLE_SECTION] = repeatableActions;
		actions[ControlTypeId.IDENTITY_BROWSER] = inputActions;

		var repeatedRowActions = [ActionsMap.REMOVE_ROW, ActionsMap.CLEAR_VALUE, ActionsMap.SHOW, ActionsMap.HIDE];
		actions[ControlTypeId.REPEATABLE_SECTION_ROW] = _.union(repeatedRowActions, [ActionsMap.LABEL]);
		actions[ControlTypeId.TABLE_ROW] = repeatedRowActions;

		actions[ControlTypeId.FORM_PRESENTATION] = [ActionsMap.SET_DATA, ActionsMap.CHANGE_PRESENTATION, ActionsMap.TRIGGER_OUTCOME, ActionsMap.PREVENT_SUBMIT, ActionsMap.REFRESH_GLOBAL_CONNECTOR];
		actions[ControlTypeId.ENUM_SELECT] = inputActions;

		return actions;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		/*jshint maxstatements: 49*/

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4);
		var _ = __webpack_require__(0);
		var PropertiesMap = __webpack_require__(77);
		//endregion

		var commonProperties = [PropertiesMap.VALUE, PropertiesMap.HAS_CLASS, PropertiesMap.LABEL, PropertiesMap.HIDDEN, PropertiesMap.DISABLED, PropertiesMap.IS_VALID];
		var inputCommonProperties = _.union(commonProperties, [PropertiesMap.REQUIRED]);
		var textProperties = _.union(inputCommonProperties, [PropertiesMap.PLACEHOLDER]);
		var valueProperties = _.union(inputCommonProperties, [PropertiesMap.MIN_VALUE, PropertiesMap.MAX_VALUE]);
		var lovProperties = _.union(inputCommonProperties, [PropertiesMap.OPTIONS, PropertiesMap.SELECTED_LABEL]);

		var properties = {};
		properties[ControlTypeId.INPUT_TEXT] = textProperties;
		properties[ControlTypeId.TEXT_AREA] = textProperties;
		properties[ControlTypeId.BUTTON] = [PropertiesMap.HIDDEN, PropertiesMap.LABEL, PropertiesMap.DISABLED];
		properties[ControlTypeId.SELECT] = lovProperties;
		properties[ControlTypeId.CHECKLIST] = lovProperties;
		properties[ControlTypeId.CHECKBOX] = inputCommonProperties;
		properties[ControlTypeId.RADIO_BUTTON] = _.union(commonProperties, [PropertiesMap.OPTIONS, PropertiesMap.SELECTED_LABEL]);
		properties[ControlTypeId.NUMBER] = valueProperties;
		properties[ControlTypeId.DATE] = valueProperties;
		properties[ControlTypeId.TIME] = valueProperties;
		properties[ControlTypeId.DATE_TIME] = valueProperties;
		properties[ControlTypeId.EMAIL] = textProperties;
		properties[ControlTypeId.URL] = textProperties;
		properties[ControlTypeId.MESSAGE] = [PropertiesMap.HIDDEN, PropertiesMap.MESSAGE];
		properties[ControlTypeId.LINK] = [PropertiesMap.VALUE, PropertiesMap.LABEL, PropertiesMap.HIDDEN, PropertiesMap.MESSAGE];
		properties[ControlTypeId.MONEY] = valueProperties;
		properties[ControlTypeId.PHONE] = textProperties;
		properties[ControlTypeId.IMAGE] = [PropertiesMap.HIDDEN, PropertiesMap.LABEL, PropertiesMap.IMAGE_URL];
		properties[ControlTypeId.VIDEO] = [PropertiesMap.HIDDEN, PropertiesMap.LABEL, PropertiesMap.VIDEO_SRC];
		properties[ControlTypeId.PANEL] = [PropertiesMap.HIDDEN, PropertiesMap.IS_VALID, PropertiesMap.LABEL];
		properties[ControlTypeId.BUSINESS_TYPE] = [PropertiesMap.HIDDEN, PropertiesMap.LABEL];
		properties[ControlTypeId.SECTION] = [PropertiesMap.HIDDEN, PropertiesMap.LABEL, PropertiesMap.IS_VALID, PropertiesMap.EXPANDED];
		properties[ControlTypeId.FORM_REFERENCE] = [PropertiesMap.HIDDEN, PropertiesMap.LABEL];

		properties[ControlTypeId.TAB] = [PropertiesMap.HIDDEN, PropertiesMap.LABEL, PropertiesMap.IS_VALID, PropertiesMap.DISABLED, PropertiesMap.SELECTED];

		properties[ControlTypeId.TAB_CONTAINER] = [PropertiesMap.HIDDEN, PropertiesMap.IS_VALID];

		var repeatableProperties = [PropertiesMap.VALUE, PropertiesMap.HIDDEN, PropertiesMap.CAN_ADD_REMOVE_ROWS, PropertiesMap.DISABLED, PropertiesMap.ROW_COUNT];
		properties[ControlTypeId.IDENTITY_BROWSER] = _.union([PropertiesMap.IDENTITY_VALUE], textProperties);
		properties[ControlTypeId.TABLE] = repeatableProperties;
		properties[ControlTypeId.REPEATABLE_SECTION] = repeatableProperties;
		properties[ControlTypeId.STRING_REPEATABLE_SECTION] = repeatableProperties;
		properties[ControlTypeId.NUMBER_REPEATABLE_SECTION] = repeatableProperties;
		properties[ControlTypeId.BOOLEAN_REPEATABLE_SECTION] = repeatableProperties;
		properties[ControlTypeId.DATE_REPEATABLE_SECTION] = repeatableProperties;
		properties[ControlTypeId.TIME_REPEATABLE_SECTION] = repeatableProperties;
		properties[ControlTypeId.DATE_TIME_REPEATABLE_SECTION] = repeatableProperties;

		var repeatedRowProperties = [PropertiesMap.VALUE, PropertiesMap.INDEX];
		properties[ControlTypeId.REPEATABLE_SECTION_ROW] = _.union(repeatedRowProperties, [PropertiesMap.LABEL]);
		properties[ControlTypeId.TABLE_ROW] = repeatedRowProperties;

		properties[ControlTypeId.ENUM_SELECT] = inputCommonProperties;

		properties[ControlTypeId.FORM_PRESENTATION] = [PropertiesMap.IS_VALID, PropertiesMap.OUTCOME];

		return properties;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ButtonControl = __webpack_require__(337),
		    InputTextControl = __webpack_require__(34),
		    TextAreaControl = __webpack_require__(339),
		    SelectControl = __webpack_require__(152),
		    ChecklistControl = __webpack_require__(351),
		    CheckboxControl = __webpack_require__(352),
		    RadioButtonControl = __webpack_require__(353),
		    NumberControl = __webpack_require__(354),
		    DateControl = __webpack_require__(355),
		    TimeControl = __webpack_require__(356),
		    LinkControl = __webpack_require__(357),
		    DateTimeControl = __webpack_require__(359),
		    EmailControl = __webpack_require__(360),
		    UrlControl = __webpack_require__(361),
		    MessageControl = __webpack_require__(362),
		    MoneyControl = __webpack_require__(363),
		    PhoneControl = __webpack_require__(364),
		    ImageControl = __webpack_require__(365),
		    VideoControl = __webpack_require__(366),
		    ControlTypeId = __webpack_require__(4),
		    IdentityControl = __webpack_require__(367),
		    Row = __webpack_require__(369),
		    PanelControl = __webpack_require__(371),
		    SectionControl = __webpack_require__(373),
		    StringRepeatableSectionControl = __webpack_require__(374),
		    TabControl = __webpack_require__(377),
		    TabContainerControl = __webpack_require__(378),
		    RepeatableSectionControl = __webpack_require__(159),
		    TableControl = __webpack_require__(381),
		    FormsLogger = __webpack_require__(20),
		    TableColumnControl = __webpack_require__(382),
		    FormReferenceControl = __webpack_require__(383),
		    CustomControl = __webpack_require__(384),
		    EnumSelectControl = __webpack_require__(385);

		//endregion

		var CREATE = 'CREATE_';

		var ControlFactory = Class.subClass({

			/* jshint maxparams: 6 */
			createControl: function createControl(id, name, typeId, data, context, parent) {
				var createFunction = ControlFactory[CREATE + typeId];
				if (CustomControl.isCustomControl(typeId)) {
					createFunction = ControlFactory.CREATE_CUSTOM_CONTROL;
				}
				if (createFunction) {
					var control = createFunction(id, name, data, context, parent, typeId);
					context.addControlDecorators(control);
					ControlFactory._log(typeId, control);
					return control;
				} else {
					throw new Error('Unsupported operation exception');
				}
			},
			CREATE_CUSTOM_CONTROL: function CREATE_CUSTOM_CONTROL(id, name, data, context, parent, typeId) {
				return new CustomControl(id, name, typeId, data.properties || {}, context, parent);
			},
			CREATE_INPUT_TEXT: function CREATE_INPUT_TEXT(id, name, data, context, parent) {
				return new InputTextControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_TEXT_AREA: function CREATE_TEXT_AREA(id, name, data, context, parent) {
				return new TextAreaControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_BUTTON: function CREATE_BUTTON(id, name, data, context, parent) {
				return new ButtonControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_SELECT: function CREATE_SELECT(id, name, data, context, parent) {
				return new SelectControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_CHECKLIST: function CREATE_CHECKLIST(id, name, data, context, parent) {
				return new ChecklistControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_CHECKBOX: function CREATE_CHECKBOX(id, name, data, context, parent) {
				return new CheckboxControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_RADIO_BUTTON: function CREATE_RADIO_BUTTON(id, name, data, context, parent) {
				return new RadioButtonControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_NUMBER: function CREATE_NUMBER(id, name, data, context, parent) {
				return new NumberControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_DATE: function CREATE_DATE(id, name, data, context, parent) {
				return new DateControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_TIME: function CREATE_TIME(id, name, data, context, parent) {
				return new TimeControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_DATE_TIME: function CREATE_DATE_TIME(id, name, data, context, parent) {
				return new DateTimeControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_EMAIL: function CREATE_EMAIL(id, name, data, context, parent) {
				return new EmailControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_URL: function CREATE_URL(id, name, data, context, parent) {
				return new UrlControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_MESSAGE: function CREATE_MESSAGE(id, name, data, context, parent) {
				return new MessageControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_LINK: function CREATE_LINK(id, name, data, context, parent) {
				return new LinkControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_MONEY: function CREATE_MONEY(id, name, data, context, parent) {
				return new MoneyControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_PHONE: function CREATE_PHONE(id, name, data, context, parent) {
				return new PhoneControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_IMAGE: function CREATE_IMAGE(id, name, data, context, parent) {
				return new ImageControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_VIDEO: function CREATE_VIDEO(id, name, data, context, parent) {
				return new VideoControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_IDENTITY_BROWSER: function CREATE_IDENTITY_BROWSER(id, name, data, context, parent) {
				return new IdentityControl(id, name, data.properties || {}, context, parent);
			},
			CREATE_ROW: function CREATE_ROW(id, name, data, context, parent) {
				return new Row(id, data, context, ControlFactory, parent);
			},
			CREATE_PANEL: function CREATE_PANEL(id, name, data, context, parent) {
				return new PanelControl(id, name, data, context, ControlFactory, parent);
			},
			CREATE_SECTION: function CREATE_SECTION(id, name, data, context, parent) {
				return new SectionControl(id, name, data, context, ControlFactory, parent);
			},
			CREATE_FORM_REFERENCE: function CREATE_FORM_REFERENCE(id, name, data, context, parent) {
				return new FormReferenceControl(id, name, data, context, parent);
			},
			CREATE_TAB: function CREATE_TAB(id, name, data, context, parent) {
				return new TabControl(id, name, data, context, ControlFactory, parent);
			},
			CREATE_TAB_CONTAINER: function CREATE_TAB_CONTAINER(id, name, data, context, parent) {
				return new TabContainerControl(id, name, data, context, ControlFactory, parent);
			},
			CREATE_REPEATABLE_SECTION: function CREATE_REPEATABLE_SECTION(id, name, data, context, parent) {
				return new RepeatableSectionControl(id, name, data, context, ControlFactory, parent);
			},
			CREATE_STRING_REPEATABLE_SECTION: function CREATE_STRING_REPEATABLE_SECTION(id, name, data, context, parent, typeId) {
				return new StringRepeatableSectionControl(id, name, data, context, ControlFactory, parent, typeId);
			},
			CREATE_NUMBER_REPEATABLE_SECTION: function CREATE_NUMBER_REPEATABLE_SECTION(id, name, data, context, parent, typeId) {
				return new StringRepeatableSectionControl(id, name, data, context, ControlFactory, parent, typeId);
			},
			CREATE_BOOLEAN_REPEATABLE_SECTION: function CREATE_BOOLEAN_REPEATABLE_SECTION(id, name, data, context, parent, typeId) {
				return new StringRepeatableSectionControl(id, name, data, context, ControlFactory, parent, typeId);
			},
			CREATE_DATE_REPEATABLE_SECTION: function CREATE_DATE_REPEATABLE_SECTION(id, name, data, context, parent, typeId) {
				return new StringRepeatableSectionControl(id, name, data, context, ControlFactory, parent, typeId);
			},
			CREATE_TIME_REPEATABLE_SECTION: function CREATE_TIME_REPEATABLE_SECTION(id, name, data, context, parent, typeId) {
				return new StringRepeatableSectionControl(id, name, data, context, ControlFactory, parent, typeId);
			},
			CREATE_DATE_TIME_REPEATABLE_SECTION: function CREATE_DATE_TIME_REPEATABLE_SECTION(id, name, data, context, parent, typeId) {
				return new StringRepeatableSectionControl(id, name, data, context, ControlFactory, parent, typeId);
			},
			CREATE_TABLE: function CREATE_TABLE(id, name, data, context, parent) {
				return new TableControl(id, name, data, context, ControlFactory, parent);
			},
			CREATE_TABLE_COLUMN: function CREATE_TABLE_COLUMN(id, name, data, context, parent) {
				return new TableColumnControl(id, name, data, context, ControlFactory, parent);
			},
			CREATE_BUSINESS_TYPE: function CREATE_BUSINESS_TYPE(id, name, data, context, parent) {
				return new SectionControl(id, name, data, context, ControlFactory, parent);
			},
			CREATE_ENUM_SELECT: function CREATE_ENUM_SELECT(id, name, data, context, parent) {
				return new EnumSelectControl(id, name, data.properties || {}, context, parent);
			},
			_log: function _log(typeId, control) {
				var logger = FormsLogger.getLogger();
				if (logger.debug && typeId !== ControlTypeId.ROW) {
					logger.count('[COUNT] [CONTROL]' + typeId);
					control.registerRenderListener(function () {
						logger.count('[COUNT] [RENDERED]' + typeId);
						return true;
					});
				}
			}

		}, {});
		return ControlFactory;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    OptionsType = __webpack_require__(41);
		//endregion

		return Class.subClass({}, {
			init: function init(typeId, context, properties, controlId, filter) {
				typeId = typeId ? typeId : OptionsType.STATIC.value;
				this.type = ko.observable(OptionsType[typeId]);
				this.optionsResolver = ko.observable(context.optionsResolverFactory.createResolver(typeId, context, properties, controlId, filter));

				this.availableTypes = [OptionsType.STATIC, OptionsType.DYNAMIC, OptionsType.CONNECTOR];

				this.template = ko.pureComputed(function () {
					return this.type().value.toLowerCase() + 'OptionsTemplate';
				}, this);

				this.properties = this.optionsResolver().properties;
			},
			observables: function observables() {
				return {
					type: this.type,
					properties: this.properties
				};
			},
			toJS: function toJS() {
				return {
					type: this.type().value,
					properties: this.optionsResolver().properties().toJS()
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    ko = __webpack_require__(1),
		    StyleTypeId = __webpack_require__(47),
		    _ = __webpack_require__(0);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'TOGGLE_CLASS',
			STYLE: StyleTypeId.CLASS_NAME
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);

				this.value = ko.observable(model.value || '');
			},

			template: function template() {
				return 'styleValueEventTemplate';
			},

			style: function style() {
				return this._class.STYLE;
			},

			execute: function execute(control) {
				var style = _.find(control.styles(), function (s) {
					return s.type.name === this.style().name;
				}, this);
				var classes = style.value().split(' ');

				if (_.contains(classes, this.value())) {
					style.value(_.without(classes, this.value()).join(' '));
				} else {
					style.value(classes.concat([this.value()]).join(' '));
				}
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					value: this.value()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		'use strict';

		var $ = __webpack_require__(2);

		return {
			$: $,
			fadeIn: function fadeIn(condition) {
				var $spinner = this.$('.spinnerContainer');
				if ((arguments.length === 0 || !!condition) && !$spinner.is(':visible')) {
					$spinner.stop().fadeIn();
				}
			},
			fadeOut: function fadeOut() {
				this.$('.spinnerContainer').stop().fadeOut();
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(93), __webpack_require__(6), __webpack_require__(94)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_regenerator, _promise, _asyncToGenerator2) {
	'use strict';

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _promise2 = _interopRequireDefault(_promise);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		'use strict';

		//region dependencies

		var RendererContext = __webpack_require__(193),
		    msg = __webpack_require__(5),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2),
		    Form = __webpack_require__(145),
		    EventsId = __webpack_require__(14),
		    DefaultTranslationsHandler = __webpack_require__(82),
		    RendererLoadPreProcessor = __webpack_require__(334),
		    RendererForm = __webpack_require__(335),
		    DependenciesExtension = __webpack_require__(390),
		    FormsLogger = __webpack_require__(20),
		    FormValidator = __webpack_require__(139),
		    BusinessControlFactory = __webpack_require__(391),
		    RendererId = __webpack_require__(78);
		__webpack_require__(399);
		//endregion

		/* global Promise */

		return function (params) {
			var awaitTimeout = function () {
				var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
					var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									return _context.abrupt('return', new _promise2.default(function (resolve) {
										return setTimeout(resolve, time);
									}));

								case 1:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this);
				}));

				return function awaitTimeout() {
					return _ref.apply(this, arguments);
				};
			}();

			var waitForLoadingAndResolve = function () {
				var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(outcomeType) {
					var payload, valid;
					return _regenerator2.default.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									_context2.next = 2;
									return Form.resolveOnLoaded(self.form());

								case 2:
									_context2.next = 4;
									return self.rendererContext.eventsQueue.resolveWhenEmpty();

								case 4:

									self.form().updateBindings();

									payload = {};

									if (!outcomeType) {
										_context2.next = 22;
										break;
									}

									self.form().outcomeType = outcomeType;
									self.form().canceledOutcome = false;
									_context2.next = 11;
									return self.form().executeEventOnAll(EventsId.ON_SUBMIT.value);

								case 11:
									_context2.next = 13;
									return self.rendererContext.eventsQueue.resolveWhenEmpty();

								case 13:

									self.form().updateBindings();
									//outcomeType is empty only when saving
									//The form is valid when the form is valid and has not been canceled
									_context2.next = 16;
									return awaitTimeout();

								case 16:
									valid = self.validateData() && !self.form().canceledOutcome;

									if (valid) {
										_context2.next = 19;
										break;
									}

									throw {
										externalMetadata: self.externalMetadata,
										id: self.form().canceledOutcome ? 'CANCELED' : 'INVALID',
										message: self.form().canceledOutcome ? msg.CANCELED_MESSAGE : msg.INVALID_FORM_MESSAGE
									};

								case 19:
									payload = self.form().payload.toJS();
									_context2.next = 23;
									break;

								case 22:
									payload = self.form().saveValue();

								case 23:
									return _context2.abrupt('return', {
										externalMetadata: self.externalMetadata,
										payload: payload
									});

								case 24:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee2, this);
				}));

				return function waitForLoadingAndResolve(_x2) {
					return _ref2.apply(this, arguments);
				};
			}();

			var self = this;
			//static forms only show the UI, no events are executed and no Data is passed to the controls.
			this.staticForm = ko.unwrap(params.staticForm);
			//We need to have the real form id, if this is a reference, to call the correct connector calls
			this.formId = ko.unwrap(params.formId) || ko.unwrap(params.value).form.id;
			this.presentationId = ko.unwrap(params.presentationId) || null;

			this.onValidStateChange = params.onValidStateChange || function () {};

			self.form = ko.observable();
			self.dependenciesExtension = new DependenciesExtension(self);

			self.load = function (modelData, loadedCallback) {
				modelData = modelData || {};
				self.externalMetadata = modelData.externalMetadata;
				FormsLogger.getLogger().time('[LOAD]');
				var rendererModel = RendererLoadPreProcessor.preProcess(modelData);

				self.rendererContext = new RendererContext(rendererModel, self, ko.unwrap(params.value).controlBindings, ko.unwrap(params.value).bindingContext);
				self.context = self.rendererContext;

				return self.loadForm(rendererModel, loadedCallback);
			};

			self.loadForm = function (rendererModel, loadedCallback) {
				FormsLogger.getLogger().time('[LOAD_FORM]');

				var allBundles = ko.unwrap(params.value).allBundles;
				if (!_.isEmpty(allBundles)) {
					// If the params have an allBundles property, then we are inside a form reference
					var currentLanguage = self.rendererContext.config().translationsHandler.currentLanguage;
					// We create a new translationsHandler for this reference, so the bundles are not conflicting
					self.rendererContext.config().translationsHandler = DefaultTranslationsHandler.create();
					// Set the same language than the parent, to avoid having the forms in different languages
					self.rendererContext.config().translationsHandler.currentLanguage = currentLanguage;
					// Set the bundles for the form
					rendererModel.form.allBundles = allBundles;
				}
				self.form(null);
				self.form(new RendererForm(rendererModel.form, self.rendererContext));

				if (!self.staticForm) {
					self.form().initPayloadAndRunEvents();
				}
				var loadedSubscription = self.form().loaded.subscribe(function () {
					loadedSubscription.dispose();
					if (loadedCallback) {
						loadedCallback();
					}
				});

				//Subscribe to the isValid of the form, which is a pureComputed, and trigger the callback
				self.form().isValid.subscribe(function (newValue) {
					self.onValidStateChange(newValue);
				});
				self.onValidStateChange(self.form().isValid());

				//Return a promise that resolves when the form finish loading
				//To get this promise, it is needed to trigger the event using:
				// $('form-renderer').triggerHandler('load', formData)
				return RendererForm.resolveOnLoaded(self.form());
			};

			self.generate = function (modelData, loadedCallback) {
				FormsLogger.getLogger().time('[GENERATE]');
				var rendererModel = RendererLoadPreProcessor.preProcess(modelData);
				self.rendererContext = new RendererContext(rendererModel, self, ko.unwrap(params.value).controlBindings, ko.unwrap(params.value).bindingContext);
				self.context = self.rendererContext;
				var parentOfAll = {
					id: 'ParentOfAll',
					isRepeatable: function isRepeatable() {
						return true;
					}
				};
				var businessControls = BusinessControlFactory.createRowControl(rendererModel.form.schema.$name, rendererModel.form.schema, self.context, parentOfAll);
				rendererModel.form.controls.push(businessControls.toJS());
				return self.loadForm(rendererModel, loadedCallback);
			};

			self.getValues = function () {
				self.form().updateBindings();
				self.form().executeEventOnAll(EventsId.ON_SUBMIT.value);
				return {
					payload: self.form().payload.toJS()
				};
			};

			//ToDo: Move this to common


			self.submit = function (event, outcome) {
				return waitForLoadingAndResolve(outcome || 'SUBMIT');
			};

			self.save = function () {
				return waitForLoadingAndResolve(null);
			};

			self.getCurrentGlobalScope = function () {
				return self.globalScope;
			};

			self.getBindings = function () {
				return self.form().getBindings();
			};

			//using always readOnlyFormValidator to avoid a OJET bug.
			//http://myforums.oracle.com/jive3/thread.jspa?threadID=2136163
			//when bug is fixed FormValidator should be used.
			self.formValidator = new FormValidator();

			self.validateData = function () {
				return self.formValidator.validate(self.form().getAllControls(true), self.rendererContext);
			};

			function getRendererTag(elements) {
				var $divs = $($(elements).find('div')[0]);
				return $divs.closest(RendererId.FORM_RENDERER);
			}

			self.changePresentation = function () {
				var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(presentationId) {
					var data;
					return _regenerator2.default.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.next = 2;
									return this.context.config().screenflowHandler.getPresentationData(this.formId, presentationId);

								case 2:
									data = _context3.sent;

									//Use th current bindings as payload, so no information is lost
									data.form.payload = this.getBindings();
									//re use the current config
									data.config = this.context.config();
									//trigger the load of the form using the new data
									this.load(data);

								case 6:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, this);
				}));

				return function (_x3) {
					return _ref3.apply(this, arguments);
				};
			}();

			self.registerCustomEvents = function (elements) {
				var formRendererTag = getRendererTag(elements);
				//registering getValues
				$(formRendererTag).on('getValues', self.getValues);
				$(formRendererTag).on('submit', self.submit);
				$(formRendererTag).on('save', self.save);

				//registering getBindings
				$(formRendererTag).on('getBindings', self.getBindings);

				//registering changePresentation
				// This will be used by the formReferenceControl to trigger the change from an action outside the form
				$(formRendererTag).on('changePresentation', function (e, presentationId) {
					return self.changePresentation(presentationId);
				});

				//registering validateData
				$(formRendererTag).on('validateData', self.validateData);

				//registering load
				$(formRendererTag).on('load', function (event, data) {
					return self.load(data);
				});

				//registering generate
				$(formRendererTag).on('generate', function (event, data) {
					return self.generate(data);
				});
			};

			/* istanbul ignore next */
			self.detachCustomListeners = function (elements) {
				var formRendererTag = getRendererTag(elements);
				//removing getValues listener
				var $formRenderer = $(formRendererTag);
				$formRenderer.off('getValues');
				$formRenderer.off('submit');
				$formRenderer.off('save');
				//removing getBindings listener
				$formRenderer.off('getBindings');
				$formRenderer.off('changePresentation');
				//removing validateData listener
				$formRenderer.off('validateData');
				//removing load listener
				$formRenderer.off('load');

				//cleaning everything to avoid a memory leak.
				$formRenderer.find('*').each(function () {
					$(this).unbind();
				});
			};

			//loading the model with the parameters.
			self.load(params.value, params.loadedCallback);
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(168);


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 95 */
/***/ (function(module, exports) {



/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(171)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(97)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(51);
var $export = __webpack_require__(36);
var redefine = __webpack_require__(99);
var hide = __webpack_require__(27);
var has = __webpack_require__(31);
var Iterators = __webpack_require__(45);
var $iterCreate = __webpack_require__(172);
var setToStringTag = __webpack_require__(56);
var getPrototypeOf = __webpack_require__(104);
var ITERATOR = __webpack_require__(12)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(30) && !__webpack_require__(44)(function () {
  return Object.defineProperty(__webpack_require__(67)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(27);


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(22);
var dPs = __webpack_require__(173);
var enumBugKeys = __webpack_require__(72);
var IE_PROTO = __webpack_require__(70)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(67)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(103).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(31);
var toIObject = __webpack_require__(37);
var arrayIndexOf = __webpack_require__(175)(false);
var IE_PROTO = __webpack_require__(70)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(65);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(11).document;
module.exports = document && document.documentElement;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(31);
var toObject = __webpack_require__(105);
var IE_PROTO = __webpack_require__(70)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(66);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(177);
var global = __webpack_require__(11);
var hide = __webpack_require__(27);
var Iterators = __webpack_require__(45);
var TO_STRING_TAG = __webpack_require__(12)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(46);
var TAG = __webpack_require__(12)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(22);
var aFunction = __webpack_require__(53);
var SPECIES = __webpack_require__(12)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(52);
var invoke = __webpack_require__(186);
var html = __webpack_require__(103);
var cel = __webpack_require__(67);
var global = __webpack_require__(11);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(46)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var isObject = __webpack_require__(29);
var newPromiseCapability = __webpack_require__(73);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDefinition = __webpack_require__(74),
		    _ = __webpack_require__(0);

		//endregion
		return ControlDefinition.subClass({}, {

			init: function init(id, dataType, controlTemplate) {
				this._super(id, controlTemplate);
				this.dataType = dataType;
			},
			properties: function properties() {
				return _.extend(this._super(), {
					dataType: this.dataType
				});
			},
			isBindable: function isBindable() {
				return true;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SimpleType = __webpack_require__(38),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return SimpleType.subClass({}, {
			init: function init(name) {
				this._super(name, 'String', '', 'string', 'string');
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.STRING;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		'use strict';

		var _ = __webpack_require__(0),
		    Class = __webpack_require__(3);

		/**
   * @enum java like enum
   */
		return Class.subClass({

			valueOf: function valueOf(property) {
				var key = _.find(_.keys(this), function (key) {
					return key === property;
				});
				return this[key];
			}

		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var DataType = __webpack_require__(39),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    TypeDescription = __webpack_require__(13),
		    NameGenerator = __webpack_require__(57),
		    ObjectAttribute = __webpack_require__(116),
		    StringUtils = __webpack_require__(32);
		//endregion

		return DataType.subClass({}, {
			init: function init(qname, name, attributes) {
				this._super(qname, name, name, '', {
					$schema: 'http://json-schema.org/draft-04/schema#',
					$id: qname,
					$name: name,
					type: 'object',
					properties: {}
				});
				this.attributes = ko.observableArray(attributes);
			},
			isCompatible: function isCompatible(data) {
				return data.isObject();
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.OBJECT;
			},
			addAttribute: function addAttribute(name, dataType) {
				name = NameGenerator.generateName(StringUtils.decap(name), _.keys(this.schema().properties));
				this.attributes.push(new ObjectAttribute(name, dataType));
				this.schema().properties[name] = dataType.toJS();
				return name;
			},
			getAttribute: function getAttribute(attributeName) {
				return _.find(this.attributes(), function (a) {
					return a.name() === attributeName;
				});
			},
			removeAttribute: function removeAttribute(attributeName) {
				this.attributes.remove(this.getAttribute(attributeName));
				delete this.schema().properties[attributeName];
			},

			/** @override */
			toJS: function toJS() {
				return {
					$ref: this.schema().$id
				};
			},
			schema: function schema() {
				var properties = {};
				_.each(this.attributes(), function (attribute) {
					properties[attribute.name()] = attribute.toJS();
				}, this);
				var schema = this._super();
				schema.properties = properties;
				return schema;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1);
		//endregion

		return Class.subClass({}, {
			init: function init(name, dataType) {
				this.name = ko.observable(name);
				this.dataType = ko.observable(dataType);
			},
			toJS: function toJS() {
				return this.dataType().toJS();
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var DataType = __webpack_require__(39),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return DataType.subClass({}, {
			init: function init(ref, name) {
				this._super(ref, name, name, '', {
					$ref: ref
				});
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.OBJECT_REF;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ParseStrategy = __webpack_require__(119);
		//endregion

		return ParseStrategy.subClass({}, {
			init: function init() {},
			/** @override */
			resolveReference: function resolveReference($ref, parser) {
				return parser.getObjectTypesRefs()[$ref];
			},
			/** @override */
			getObjectType: function getObjectType(schema, parser) {
				return parser.getObjectTypes()[schema.$id];
			},
			/** @override */
			createObjectType: function createObjectType(schema, objectName, parser) {
				return parser._createObjectType(schema, objectName, this);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);
		//endregion

		return Class.subClass({}, {
			init: function init() {},
			/** @abstract */
			resolveReference: function resolveReference($ref, parser) {
				throw new Error('This function must be overridden');
			},
			/** @abstract */
			getObjectType: function getObjectType(schema, parser) {
				throw new Error('This function must be overridden');
			},
			/** @abstract */
			createObjectType: function createObjectType(schema, objectName, parser) {
				throw new Error('This function must be overridden');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_120__;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    ControlReferenceMap = __webpack_require__(122),
		    _ = __webpack_require__(0);

		//endregion
		var ControlResolver = Class.subClass({}, {

			id: null,
			reference: null,
			childControl: null,

			init: function init(model, viewModel, scope) {
				var defaults = _.extend({
					id: '',
					reference: ControlReferenceMap.SELF.value,
					childControl: {}
				}, model);
				this.id = ko.observable(defaults.id);
				this.reference = ko.observable(defaults.reference);
				var childControl = model.childControl ? new ControlResolver(defaults.childControl, viewModel, scope) : null;
				this.childControl = ko.observable(childControl);
				this.scope = scope;
				this.viewModel = viewModel;
				this.value = ko.observable(null);

				if (model.value) {
					this.createValueObject(model.value);
				}
				var self = this;
				this.reference.subscribe(function (newReference) {
					if (newReference === ControlReferenceMap.INDEX.value) {
						self.createValueObject();
					} else {
						self.value(null);
					}
				});
			},

			createValueObject: function createValueObject(model) {
				var Value = __webpack_require__(15);
				this.value(new Value(model || {}, this.viewModel, this.scope));
			},

			toJS: function toJS() {
				var data = {
					id: this.id(),
					reference: this.reference(),
					childControl: this.childControl() ? this.childControl().toJS() : null
				};
				if (this.value()) {
					data.value = this.value().toJS();
				}
				return data;
			},

			/**
    * Returns the current control that this resolver points, to without resolving any further
    * @param context
    * @returns {*}
    */
			getControl: function getControl(context) {
				var ctxt = ko.unwrap(context);
				if (ctxt.findControl) {
					return ctxt.findControl(this.id());
				}
			},

			/**
    * Resolves the child context, not recursivly
    */
			resolveChildContext: function resolveChildContext(context, eventControl) {
				var control;
				if (this.id() === '__SELF__') {
					control = context;
				} else if (_.isArray(context)) {
					//If this is an array, return an array with the final controls
					//in some cases, we may end up with arrays inside arrays (ie. forEach inside forEach)
					// so, it's safer to flatten it before continuing
					return _.map(_.flatten(context), function (ctxt) {
						control = this.getControl(ctxt);
						return ControlReferenceMap[this.reference()].resolve(control, this.childControl(), eventControl, this);
					}, this);
				} else {
					control = this.getControl(context);
				}
				return ControlReferenceMap[this.reference()].resolve(control, eventControl, this);
			},

			/**
    * resolves the whole controlResolver, recursivly until SELF is found
    */
			resolve: function resolve(context, eventControl) {
				var control = this.resolveChildContext(context, eventControl);
				if (this.childControl()) {
					if (control) {
						return this.childControl().resolve(control, eventControl);
					} else {
						return null;
					}
				} else {
					return control;
				}
			},

			/**
    * returns an array of the ids which have a particular reference, as we need those in order to
    * do some extra stuff, ie:
    *      For SELECTED and FOR_EACH, we need to know that we can display the CURRENT_ITERATION
    */
			getControlsWithRef: function getControlsWithRef(ref) {
				var array = [];
				if (this.reference() === ref) {
					array = [this.id()];
				}
				if (this.childControl()) {
					array = _.union(array, this.childControl().getControlsWithRef(ref));
				}
				return array;
			},

			/**
    * Checks that a control is iterable in the current control resolver
    * A control is iterable if it was selected with FOR_EACH, or if it has multiple Selection and is selected with SELECTED
    */
			isIterableControl: function isIterableControl(control) {
				var selectedControls = this.getControlsWithRef(ControlReferenceMap.SELECTED.value),
				    forEachControls = this.getControlsWithRef(ControlReferenceMap.FOR_EACH.value);
				var isForEach = _.contains(forEachControls, control.id),
				    isMultipleSelected = _.contains(selectedControls, control.id) && ko.unwrap(control.properties.multipleSelection);

				return isForEach || isMultipleSelected;
			}

		});

		return ControlResolver;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5);
		//endregion

		function isRepeatable(control) {
			return !!control && control.isRepeatable();
		}

		function findRepeatableRow(repeatable, eventControl) {
			if (!eventControl.getParent) {
				//We went all the way to the form! Is not inside repeatable
				return;
			}
			if (eventControl.getParent() === repeatable) {
				//We found our index!
				return eventControl;
			}
			return findRepeatableRow(repeatable, eventControl.getParent());
		}

		var ControlReferenceMap = {
			'SELF': {
				value: 'SELF',
				label: msg.SELF,
				resolve: function resolve(control) {
					return control;
				}
			},
			'FIRST': {
				value: 'FIRST',
				label: msg.FIRST,
				resolve: function resolve(control, eventControl) {
					if (!isRepeatable(control)) {
						return;
					}
					return control.getRows()[0];
				}
			},
			'LAST': {
				value: 'LAST',
				label: msg.LAST,
				resolve: function resolve(control, eventControl) {
					if (!isRepeatable(control)) {
						return;
					}
					return control.getRows()[control.getRows().length - 1];
				}
			},
			'SELECTED': {
				value: 'SELECTED',
				//We need to change the label of this according to context
				labelFunction: function labelFunction(controlAccessor) {
					if (controlAccessor.controlResolver.getControl(controlAccessor.context).properties.multipleSelection()) {
						if (controlAccessor.isActionControl) {
							return msg.FOR_EACH_SELECTED;
						} else {
							return msg.ALL_SELECTED;
						}
					}
					return msg.SELECTED_ROW;
				},
				resolve: function resolve(control) {
					if (!isRepeatable(control)) {
						return;
					}
					return control.getSelectedRows();
				}
			},
			'FOR_EACH': {
				value: 'FOR_EACH',
				label: msg.FOR_EACH,
				resolve: function resolve(control) {
					if (!isRepeatable(control)) {
						return;
					}
					return control.getAllRows();
				}
			},
			'INDEX': {
				value: 'INDEX',
				label: msg.INDEX,
				template: 'controlIndexTemplate',
				resolve: function resolve(control, eventControl, resolver) {
					if (!isRepeatable(control)) {
						return;
					}
					if (!eventControl) {
						//We need a default row for builder
						return ControlReferenceMap.FIRST.resolve(control);
					}
					var index = resolver.value().resolve(resolver.viewModel);
					return control.getRows()[index];
				}
			},
			'CURRENT': {
				value: 'CURRENT',
				label: msg.CURRENT,
				resolve: function resolve(control, eventControl) {
					if (!isRepeatable(control)) {
						return;
					}
					if (!eventControl) {
						//We need a default row for builder
						return ControlReferenceMap.FIRST.resolve(control);
					}
					return findRepeatableRow(control, eventControl);
				}
			},
			'CURRENT_ITERATION': {
				value: 'CURRENT_ITERATION',
				label: msg.CURRENT_ITERATION_ROW,
				resolve: function resolve(control, eventControl, resolver) {
					if (!isRepeatable(control)) {
						return;
					}
					if (!eventControl) {
						//We need a default row for builder
						return ControlReferenceMap.FIRST.resolve(control);
					}
					return findRepeatableRow(control, resolver.scope.currentRowControl);
				}
			}
		};

		return ControlReferenceMap;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'HIDE_COLUMN'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
				this.selectedColumnName = ko.observable(model.selectedColumnName || '');
				this.hideBoolean = true;
			},

			template: function template() {
				return 'selectColumnTemplate';
			},

			execute: function execute(table, blockId) {
				var _this = this;

				var self = this;
				var columns = table.controls();
				var columnIndex;
				var selected = self.selectedColumnName()[0];
				for (var i = 0; i < columns.length; i++) {
					if (columns[i].name() === selected) {
						columns[i].properties.hide(this.hideBoolean);
						columnIndex = i;
						break;
					}
				}
				table.getRows().forEach(function (row) {
					var tr = row.controls()[columnIndex];
					tr.properties.hide(_this.hideBoolean);
				});
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					selectedColumnName: this.selectedColumnName()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */

		//region dependencies

		var ContextualHandler = __webpack_require__(33),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2);
		//endregion

		var DefaultFormHandler = ContextualHandler.subClass({}, {
			init: function init(id) {
				this._super(id);
				this._references = [];
				this._forms = [];
			},

			/** @override */
			listControls: function listControls(start, end) {
				end = end ? end + 1 : this._references.length;
				return _promise2.default.resolve(this._references.slice(start, end));
			},

			/** @override */
			getControl: function getControl(id) {
				return _promise2.default.resolve($.extend(true, {}, _.find(this._forms, function (form) {
					return form.id === id;
				}, this)));
			},

			_findForm: function _findForm(formId, presentationId) {
				return _.find(this._forms, function (form) {
					var sameId = form.id === formId;
					var samePresentation = !presentationId || !form.viewId || form.viewId === presentationId;
					return sameId && samePresentation;
				});
			},

			/** @override */
			getResolvedControl: function getResolvedControl(formId, presentationId) {
				return $.extend(true, {}, this._findForm(formId, presentationId));
			},

			/** @override */
			addOrUpdateControl: function addOrUpdateControl(control) {
				var originalForm = this._findForm(control.id, control.presentationId);

				if (originalForm) {
					var index = this._forms.indexOf(originalForm);
					this._forms.splice(index, 1, control);
				} else {
					this._forms.push(control);
				}
			},

			/** @override */
			addResolvedControl: function addResolvedControl(control) {
				this.addOrUpdateControl(control);
			},

			/** @override */
			removeControl: function removeControl(id) {
				throw new Error('Unsupported operation');
			},

			/** @override */
			search: function search(text) {
				return _promise2.default.resolve(_.filter(this._references, function (reference) {
					return reference.formName.toLowerCase().indexOf(text.toLowerCase()) > -1;
				}, this));
			}
		});

		return {
			create: function create() {
				return new DefaultFormHandler('DefaultFormHandler');
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */

		//region dependencies

		var ContextualHandler = __webpack_require__(33),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2);
		//endregion

		var DefaultCssHandler = ContextualHandler.subClass({}, {
			init: function init(id) {
				this._super(id);
				this._references = [];
				this._stylesheets = [];
			},

			/** @override */
			listControls: function listControls(start, end) {
				end = end ? end + 1 : this._references.length;
				return _promise2.default.resolve(this._references.slice(start, end));
			},

			/** @override */
			getControl: function getControl(id) {
				return _promise2.default.resolve($.extend(true, {}, _.find(this._stylesheets, function (stylesheet) {
					return stylesheet.id === id;
				}, this)));
			},

			/** @override */
			getResolvedControl: function getResolvedControl(id) {
				var stylesheet = _.find(this._stylesheets, function (stylesheet) {
					return stylesheet.id === id;
				}, this);
				// if stylesheet exists in cache, return it as promise else fetch it from server.
				if (stylesheet) {
					return _promise2.default.resolve($.extend(true, {}, stylesheet, this));
				}
				return this.getControl(id);
			},

			/** @override */
			addOrUpdateControl: function addOrUpdateControl(stylesheet) {
				var originalStylesheet = _.find(this._stylesheets, function (ss) {
					return ss.id === stylesheet.id;
				}, this),
				    index;

				if (originalStylesheet) {
					index = this._stylesheets.indexOf(originalStylesheet);
					this._stylesheets.splice(index, 1, stylesheet);
				} else {
					this._stylesheets.push(stylesheet);
				}

				var originalStylesheetRef = _.find(this._references, function (ss) {
					return ss.id === stylesheet.id;
				}, this);

				if (originalStylesheetRef) {
					index = this._references.indexOf(originalStylesheetRef);
					this._references.splice(index, 1, {
						id: stylesheet.id
					});
				} else {
					this._references.push({
						id: stylesheet.id
					});
				}
			},

			/** @override */
			addResolvedControl: function addResolvedControl(stylesheet) {
				this.addOrUpdateControl(stylesheet);
			},

			/** @override */
			removeControl: function removeControl(id) {
				for (var i = this._stylesheets.length - 1; i >= 0; i--) {
					if (this._stylesheets[i].id === id) {
						this._stylesheets.splice(i, 1);
						this._references.splice(i, 1);
					}
				}
			}
		});

		return {
			create: function create() {
				return new DefaultCssHandler('DefaultCssHandler');
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */

		//region dependencies

		var ContextualHandler = __webpack_require__(33),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2);
		//endregion

		var DefaultTypeHandler = ContextualHandler.subClass({}, {
			init: function init(id) {
				this._super(id);
				this._references = [];
				this._types = [];
			},

			/** @override */
			listControls: function listControls(start, end) {
				end = end ? end + 1 : this._references.length;
				return _promise2.default.resolve(this._references.slice(start, end));
			},

			/** @override */
			getControl: function getControl(id) {
				return _promise2.default.resolve($.extend(true, {}, _.find(this._types, function (type) {
					return type.$id === id;
				}, this)));
			},

			/** @override */
			getResolvedControl: function getResolvedControl(id) {
				return $.extend(true, {}, _.find(this._types, function (type) {
					return type.$id === id;
				}, this));
			},

			/** @override */
			addOrUpdateControl: function addOrUpdateControl(control) {
				var originalType = _.find(this._types, function (type) {
					return type.$id === control.$id;
				}, this);

				if (originalType) {
					var index = this._types.indexOf(originalType);
					this._types.splice(index, 1, control);
				} else {
					this._types.push(control);
				}
			},

			/** @override */
			addResolvedControl: function addResolvedControl(control) {
				this.addOrUpdateControl(control);
			},

			/** @override */
			removeControl: function removeControl(id) {
				throw new Error('Unsupported operation');
			},

			/** @override */
			search: function search(text) {
				return _promise2.default.resolve(_.filter(this._references, function (reference) {
					return reference.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
				}, this));
			}
		});

		return {
			create: function create() {
				return new DefaultTypeHandler('DefaultTypeHandler');
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 127 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(101);
var hiddenKeys = __webpack_require__(72).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ContextualHandler = __webpack_require__(33);
		//endregion

		var DefaultOutcomeHandler = ContextualHandler.subClass({}, {
			init: function init(id) {
				this._super(id);
			},
			triggerOutcome: /* istanbul ignore next */function triggerOutcome(outcome) {
				// Do Nothing by default
				// The handler should do something like:
				// $('form-renderer').triggerHandler('submit', outcome).then(...);
			}
		});

		return {
			create: function create() {
				return new DefaultOutcomeHandler('DefaultOutcomeHandler');
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var OptionsProperties = __webpack_require__(83),
		    ResponseMapping = __webpack_require__(131),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return OptionsProperties.subClass({}, {
			init: function init(properties) {
				properties = properties || {};
				_.defaults(properties, {
					defaultValue: [],
					simple: true,
					autoFocus: false
				});

				this.response = ko.observable(new ResponseMapping(properties.response || {}));
				this.defaultValue = ko.observableArray(properties.defaultValue);
				this.simple = ko.observable(properties.simple);
				this.autoFocus = ko.observable(properties.autoFocus);
			},
			observables: function observables() {
				return {
					defaultValue: this.defaultValue,
					simple: this.simple(),
					response: this.response,
					autoFocus: this.autoFocus
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0),
		    koToJSUtil = __webpack_require__(21),
		    ko = __webpack_require__(1);

		//rendregion

		return Class.subClass({}, {

			init: function init(jsonModel) {
				jsonModel = jsonModel || {};
				_.defaults(jsonModel, {
					optionsListBinding: '',
					valueBinding: '',
					labelBinding: ''
				});

				this.optionsListBinding = ko.observable(jsonModel.optionsListBinding);
				this.valueBinding = ko.observable(jsonModel.valueBinding);
				this.labelBinding = ko.observable(jsonModel.labelBinding);
			},
			observables: function observables() {
				return {
					optionsListBinding: this.optionsListBinding,
					valueBinding: this.valueBinding,
					labelBinding: this.labelBinding
				};
			},
			toJS: function toJS() {
				return koToJSUtil.toJS(this.observables());
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    DynamicOptionType = __webpack_require__(133);

		//end region

		var AutoFocus = function AutoFocus(resolver) {
			this.read = function () {
				var autoFocus = [];
				var typeId = resolver.properties().autoFocus()[0];
				if (typeId) {
					var autoFocusType = DynamicOptionType[typeId];
					autoFocus = autoFocusType.getValue(resolver.getOptions());
				}
				return autoFocus;
			};
		};

		return {
			create: function create(resolver) {
				return ko.pureComputed(new AutoFocus(resolver));
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var OjSelectItem = __webpack_require__(42),
		    msg = __webpack_require__(5),
		    _ = __webpack_require__(0);

		//endregion

		return {
			FIRST: _.extend(OjSelectItem.create('FIRST', msg.FIRST_LABEL), {
				getValue: function getValue(options) {
					var first = options[0];
					return first ? [first.value] : [];
				}
			}),
			LAST: _.extend(OjSelectItem.create('LAST', msg.LAST_LABEL), {
				getValue: function getValue(options) {
					var last = options[options.length - 1];
					return last ? [last.value] : [];
				}
			})
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(93), __webpack_require__(94), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_regenerator, _asyncToGenerator2, _promise) {
	'use strict';

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ConnectorResolver = __webpack_require__(135),
		    ko = __webpack_require__(1);

		//endregion

		function executeOnTrue(observable) {
			return new _promise2.default(function (resolve) {
				var value = ko.unwrap(observable);
				if (value) {
					resolve(value);
				} else {
					var sub = observable.subscribe(function (newValue) {
						sub.dispose();
						resolve(newValue);
					});
				}
			});
		}

		return ConnectorResolver.subClass({}, {
			init: function init(typeId, context, properties, controlId, filter) {
				var _this = this;

				this._super(typeId, context, properties, controlId, filter);

				executeOnTrue(context.viewModel.form).then(function () {
					var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(form) {
						var skipDuringLoad, isStaticForm;
						return _regenerator2.default.wrap(function _callee$(_context) {
							while (1) {
								switch (_context.prev = _context.next) {
									case 0:
										skipDuringLoad = ko.unwrap(ko.unwrap(_this.properties).skipDuringLoad);
										isStaticForm = context.viewModel.staticForm;

										if (!(!skipDuringLoad && !isStaticForm)) {
											_context.next = 7;
											break;
										}

										_this.loading(true);
										_context.next = 6;
										return executeOnTrue(form.loaded);

									case 6:
										_this.loadAndSetConnector(form);

									case 7:
									case 'end':
										return _context.stop();
								}
							}
						}, _callee, _this);
					}));

					return function (_x) {
						return _ref.apply(this, arguments);
					};
				}());
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var OptionsResolver = __webpack_require__(63),
		    DynamicDefaultValue = __webpack_require__(84),
		    DotExpressionResolver = __webpack_require__(23),
		    ko = __webpack_require__(1),
		    oj = __webpack_require__(7),
		    FormsLogger = __webpack_require__(20),
		    msg = __webpack_require__(5),
		    $ = __webpack_require__(2),
		    DynamicAutoFocus = __webpack_require__(132);

		//endregion

		return OptionsResolver.subClass({}, {
			init: function init(typeId, context, properties, controlId, filter) {
				this.controlId = controlId;
				this.requiredFormValues = [];
				this.formId = context.viewModel.formId;
				this.presentationId = context.viewModel.presentationId;
				properties = this._fetchProperties(context, properties);
				this._super(typeId, context, properties);

				this._filter = filter;

				this.autoFocus = DynamicAutoFocus.create(this);
				this.getDefaultValue = DynamicDefaultValue.create(this);

				this._options = ko.observableArray(null);

				this.getOptions = ko.pureComputed(function () {
					return this._options();
				}.bind(this));

				this._callConnector = function (callPayload) {
					FormsLogger.getLogger().count('[COUNT] [CONNECTOR]');
					return context.config().connectorHandler.execute(callPayload);
				};
			},

			loadAndSetConnector: function loadAndSetConnector(form) {
				this.loading(true);
				var self = this;
				self.control = form.findControl && form.findControl(self.controlId);
				this.loadConnector(form).then(function (response) {
					if (this.control) {
						this.control._datasource = response;
					}
					_promise2.default.resolve(this._buildOptions(response)).then(function (builtResponse) {
						self._options(builtResponse);
						self.loading(false);
						self.customValidationMessages([]);
					});
				}.bind(this)).catch(function (error) {
					//ToDo 16.4.5 This should come parsed from the handler
					error = JSON.parse(error);
					this.customValidationMessages([new oj.Message(msg.FAILED_TO_FETCH_CONNECTOR, error.defaultMessage)]);
					this.loading(false);
				}.bind(this));
			},

			reApplyFilter: function reApplyFilter() {
				var datasource = this.control._datasource,
				    self = this;
				this.loading(true);
				_promise2.default.resolve(this._buildOptions(datasource)).then(function (builtResponse) {
					self._options(builtResponse);
					self.loading(false);
				});
			},

			loadConnector: function loadConnector(form) {
				this._findControl = form.findControlInsideRepeatable.bind(form);
				return this._fetchOptions();
			},

			_fetchOptions: function _fetchOptions() {
				var formValues = this._buildArguments();
				var callPayload = {
					id: this.properties().id,
					listBinding: this.properties().response().optionsListBinding().replace('response.', ''),
					formValues: formValues,
					formId: this.formId,
					presentationId: this.presentationId
				};
				return this._callConnector(callPayload);
			},
			_buildArguments: function _buildArguments() {
				var formValues = {};
				var self = this;
				$.each(this.requiredFormValues, function () {
					//debugger;
					var foundNode = self._findControl(self.controlId);
					if (foundNode) {
						var realControl = foundNode.findClosest(this);
						formValues[this] = realControl ? realControl.getControlValue() : null;
					}
				});
				return formValues;
			},
			_buildOptions: function _buildOptions(response) {
				response = response || {};
				var optionsListBinding = this.properties().response().optionsListBinding(),
				    list = DotExpressionResolver.getPCSCompatibleValue(response, optionsListBinding) || [],
				    executePromise = this._filter ? this._filter.execute(list) : _promise2.default.resolve(list);

				return executePromise;
			},
			_fetchProperties: function _fetchProperties(context, properties) {
				var callDefinition = context.findCallDefinition(properties.id);
				if (callDefinition) {
					this.requiredFormValues = callDefinition.formValues || [];
					properties.response = callDefinition.response().toJS();
				}
				return properties;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValidationDecorator = __webpack_require__(85);

		//endregion

		return ValidationDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_decorate: function _decorate(control) {
				this._super(control);
				control.afterOjComponentInit = this._addValidationOptionChange.bind(this, control);
			},
			_componentValidation: function _componentValidation(ojComponentWidgetRef) {
				return ojComponentWidgetRef('validate');
			},
			_validateComponent: function _validateComponent(control) {
				var ojComponentWidgetRef = control.getOjComponent();

				//If the control is not loaded it has been rendered but oj is still unavailable (it may be during REST calls, ie)
				//We should validate silently
				if (ojComponentWidgetRef.isNotLoaded) {
					return this._validateSilently(control);
				}

				//Save the custom errors before validation, otherwise the custom errors would be cleared
				//The custom errors are only cleared when the control's value changes
				var customMsgs = ojComponentWidgetRef('option', 'messagesCustom');
				//Make sure control is not disabled and read only
				var wasDisabled = false,
				    wasReadOnly = false;
				if (ojComponentWidgetRef('option', 'disabled')) {
					ojComponentWidgetRef('option', 'disabled', false);
					wasDisabled = true;
				}
				if (ojComponentWidgetRef('option', 'readOnly')) {
					ojComponentWidgetRef('option', 'readOnly', false);
					wasReadOnly = true;
				}
				//Do the real validation
				var isValid = this._componentValidation(ojComponentWidgetRef);
				//Set readonly and disabled again
				if (wasReadOnly) {
					ojComponentWidgetRef('option', 'readOnly', true);
				}
				if (wasDisabled) {
					ojComponentWidgetRef('option', 'disabled', true);
				}
				//Set the custom errors again
				ojComponentWidgetRef('option', 'messagesCustom', customMsgs);
				//return if isvalid and there are not custom errors
				return isValid && customMsgs.length === 0;
			},
			_addValidationOptionChange: function _addValidationOptionChange(control) {
				//If the component doesnt have messagesShown, then it wont have validation,
				// so we can avoid the unnecesary/possible (definitely) broken call
				// We ignore the else, as this shouldn't happen, but it's better to have the prevention
				/* istanbul ignore else */
				if (control.getOjComponent()('option', 'messagesShown')) {
					control.getOjComponent()({
						optionChange: function optionChange(event, properties) {
							//When there's a change in the messages Shown, recheck the validation and update the observable
							//Skip the validation if there's a validation already happening, as the validation calls messagesShown
							//and we want to avoid an infinite loop
							if (!control._isValidating && properties.option === 'messagesShown') {
								control._isValidating = true;
								//Defer the validation until so the control is updated (sometimes valuechange is called after messagesShown)
								setTimeout(function () {
									control.isValid(control.validate());
									//Defer the clear of _isValidating because 'messagesShown' are async, so we need to wait for those to be sent
									setTimeout(function () {
										delete control._isValidating;
									});
								});
							}
						}
					});
				}
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    MinLengthValidator = __webpack_require__(291),
		    MaxLengthValidator = __webpack_require__(292),
		    RequiredValidator = __webpack_require__(293),
		    OptionsFeedValidator = __webpack_require__(294),
		    PatternValidator = __webpack_require__(295);

		//endregion

		var CREATE = 'CREATE_';

		var ValidatorFactory = Class.subClass({

			createValidator: function createValidator(typeId, properties) {
				var createFunction = ValidatorFactory[CREATE + typeId];
				if (createFunction) {
					return createFunction(properties);
				} else {
					throw new Error('Unsupported operation exception');
				}
			},
			CREATE_MIN_LENGTH: function CREATE_MIN_LENGTH(properties) {
				return new MinLengthValidator(properties);
			},
			CREATE_MAX_LENGTH: function CREATE_MAX_LENGTH(properties) {
				return new MaxLengthValidator(properties);
			},
			CREATE_PATTERN: function CREATE_PATTERN(properties) {
				return new PatternValidator(properties);
			},
			CREATE_OPTIONS_FEED: function CREATE_OPTIONS_FEED(properties) {
				return new OptionsFeedValidator(properties);
			},
			CREATE_REQUIRED: function CREATE_REQUIRED(properties) {
				return new RequiredValidator(properties);
			}
		}, {});
		return ValidatorFactory;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {

		'use strict';

		return {
			'MIN_LENGTH': 'MIN_LENGTH',
			'MAX_LENGTH': 'MAX_LENGTH',
			'PATTERN': 'PATTERN',
			'OPTIONS_FEED': 'OPTIONS_FEED',
			'REQUIRED': 'REQUIRED'
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1);

		//endregion

		return Class.subClass({}, {

			init: function init() {},
			validate: function validate(controls, rendererContext) {
				var validData = true;

				// Validate all the controls that have properties
				var controlsList = this._filterControls(controls);

				var self = this;
				// Go through all the controls and run the custom validations.
				_.each(controlsList, function (control) {
					validData = self._validateControl(validData, rendererContext, control);
				});

				return this._checkTracker(rendererContext, validData);
			},
			validateControl: function validateControl(control, rendererContext) {
				return this.validate([control], rendererContext);
			},
			_filterControls: function _filterControls(controls) {
				return _.filter(controls, function (control) {
					return control.properties && control.validate;
				});
			},
			_validateControl: function _validateControl(validData, rendererContext, control) {
				//order is important because we want to always validate all the controls.
				return control.validate() && validData;
			},
			_checkTracker: function _checkTracker(rendererContext, validData) {
				var invalidTracker = ko.utils.unwrapObservable(rendererContext.tracker);
				if (invalidTracker) {
					// Explicitly show the validation messages.
					invalidTracker.showMessages();
				}
				// Focus on the first invalid control, if any.
				return validData;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		//end region

		return {
			load: function load(formModel) {
				var RendererViewModel = __webpack_require__(92);
				var wholeModel = {
					value: formModel
				};
				var rendererViewModel = new RendererViewModel(wholeModel);
				rendererViewModel.form().initPayloadAndRunEvents();

				return rendererViewModel;
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var _ = __webpack_require__(0),
		    $ = __webpack_require__(2),
		    ko = __webpack_require__(1),
		    JSONConverter = __webpack_require__(315),
		    TreeUtil = __webpack_require__(40),
		    ControlTypeId = __webpack_require__(4),
		    Class = __webpack_require__(3);
		//endregion

		var jsonConverter = new JSONConverter();

		return Class.subClass({}, {
			convertJSON: false,
			payloadContext: {},

			init: function init(json, context) {
				this._schema = json.payload || {};
				if (context) {
					this.convertJSON = context.config().convertJSON;
					if (this.convertJSON) {
						this._schema = jsonConverter.toKeyValue(this._schema);
					}
					this.payloadContext = context.payloadContext;
				}
			},

			/**
    * Fetches all the controls recursively and updates the payload schema using the provided list of controls
    * @param controlsAccessor ObservableArray with all the Controls
    */
			updateBindings: function updateBindings(controlsAccessor) {
				//getting all the controls, except rows
				var controls = _.filter(TreeUtil.treeToList(controlsAccessor(), 'getControls'), function (control) {
					return control.properties && control.properties.isBindable();
				});

				this.doUpdateBindings(controls);
			},

			/**
    * Updates the payload schema using the provided list of controls
    * @param controls {Array} with all the controls
    */
			doUpdateBindings: function doUpdateBindings(controls) {
				// Go through all the bindings and assign them with the associated control's values.
				_.each(controls, function (control) {
					var binding = ko.utils.unwrapObservable(control.properties.binding);
					if (binding && binding.trim() !== '') {
						if (control.type === ControlTypeId.FORM_REFERENCE && control.isValidReference()) {
							var formBindings = control.getBindings();
							_.each(_.keys(formBindings), function (key) {
								this.setBindingValue([binding + '.' + key], formBindings[key]);
							}, this);
						} else {
							// Assign the value by first checking for 'value' then 'default value' then check for the value in the existing payload.
							var value = control.getControlValue();
							this.setBindingValue(binding, value);
						}
					}
				}, this);
			},

			getBindings: function getBindings() {
				return $.extend(true, {}, this._schema);
			},

			getBindingValue: function getBindingValue(binding) {
				return this._schema && this._schema[binding];
			},

			setBindingValue: function setBindingValue(binding, value) {
				this._schema[binding] = value;
			},

			toJS: function toJS() {
				var schema = this._schema;
				if (this.convertJSON) {
					schema = jsonConverter.toJSON(schema);
				}
				return schema;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    ControlTypeId = __webpack_require__(4),
		    StringUtils = __webpack_require__(32);

		//endregion

		var PayloadUtil = Class.subClass({

			/**
    * Initializes the value of the control from the value in the payload
    * @param control. The control
    * @param payload. {Object} The payload containing all the values
    */
			initValueFromPayload: function initValueFromPayload(control, payload) {
				var initValue = PayloadUtil.getControlValueFromPayload(control, payload);

				/* istanbul ignore else */
				if (control.hasOwnProperty('value')) {
					control.initValue(ko.unwrap(initValue));
				}
			},

			/**
    * Gets the value of the control from the provided payload
    * @param control. The control
    * @param payload. {Object} The payload containing all the values
    * @returns value || null
    */
			getControlValueFromPayload: function getControlValueFromPayload(control, payload) {
				var value;
				if (control.properties.isBindable() && !_.isEmpty(control.properties.binding())) {
					if (control.type === ControlTypeId.FORM_REFERENCE) {
						value = {};
						var context = control.properties.binding() + '.';
						_.each(_.keys(payload), function (binding) {
							if (StringUtils.startsWith(binding, context)) {
								var innerBinding = binding.substring(context.length);
								value[innerBinding] = payload[binding];
							}
						}, this);
					} else if (control.type === ControlTypeId.LINK) {
						value = {};
						value['value'] = payload[control.properties.binding()];
						/* istanbul ignore else*/
						if (control.properties.isLabelBindable() === 'true') {
							value['label'] = payload[control.properties.labelBinding()];
						}
					} else {
						value = payload[control.properties.binding()];
					}
				}

				return _.isUndefined(value) ? null : value;
			}

		}, {});
		return PayloadUtil;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValueDecorator = __webpack_require__(19),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return ValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_doDecorate: function _doDecorate(control) {
				this._super(control);
				/**
               * We need different observables for the oj element,
              * because the select only works with arrays, and we don't want an array if it's single
              */
				control._ojValue = ko.pureComputed({
					read: function read() {
						var value = control.value();
						return !!value && !_.isArray(value) ? [value] : value;
					},
					write: function write(newValue) {
						if (!ko.unwrap(control.properties.multiple) && _.isArray(newValue)) {
							control.value(newValue[0]);
						} else {
							control.value(newValue);
						}
					}
				});

				//@override setValue, but keep reference
				var __superSetValue = control.setValue;
				control.setValue = function (value) {
					if (!ko.unwrap(control.properties.multiple) && _.isArray(value)) {
						__superSetValue.call(control, value[0] || null);
					} else {
						__superSetValue.call(control, value);
					}
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('TRANSLATIONS_DECORATOR', dependencies);
			},
			_decorate: function _decorate(control, context) {

				var translateProperties = function translateProperties(control) {
					var handler = context.config().translationsHandler;
					var controlProperties = control.getTranslatableProperties();

					_.each(controlProperties, function (property) {
						var value = handler.getKeyProperty(control.id, property);
						if (value) {
							control.properties[property](value);
						}
					});
					return true;
				};

				control.translated = ko.observable(translateProperties(control));
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('translated');
			}

		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies
		/* globals Promise */

		var ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    FormsLogger = __webpack_require__(20),
		    RendererCallDefinition = __webpack_require__(332),
		    Class = __webpack_require__(3);

		//endregion

		return Class.subClass({
			resolveOnLoaded: function resolveOnLoaded(form) {
				//Return a promise that resolves when the form finish loading
				return new _promise2.default(function (resolve, reject) {
					/**
      * this else code IS tested, but in builder, so it doesn't show as covered
      */
					/* istanbul ignore else */
					if (!form.loaded()) {
						var sub = form.loaded.subscribe(function () {
							FormsLogger.getLogger().timeEnd('[LOAD]');
							sub.dispose();
							resolve();
						});
					} else {
						FormsLogger.getLogger().timeEnd('[LOAD]');
						resolve();
					}
				});
			}
		}, {
			init: function init(json) {
				this.id = json.id;

				this.properties = {
					name: ko.observable(json.name),
					description: ko.observable(json.description)
				};

				this.calls = ko.observableArray(this._buildCalls(json.calls || []));
			},
			/** abstract */
			getAllControls: function getAllControls() {
				throw new Error('This function must be overridden');
			},
			/** abstract */
			findControl: function findControl(controlId) {
				throw new Error('This function must be overridden');
			},
			_createCallDefinition: function _createCallDefinition(call) {
				return new RendererCallDefinition(call);
			},
			_buildCalls: function _buildCalls(calls) {
				var callList = [];
				var self = this;
				$.each(calls, function (i, call) {
					callList.push(self._createCallDefinition(call));
				});
				return callList;
			},
			_callsToJS: function _callsToJS() {
				var calls = [];
				_.each(this.calls(), function (call) {
					calls.push(call.toJS());
				});
				return calls;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var StyleTypeId = __webpack_require__(47),
		    $ = __webpack_require__(2);

		//endregion
		var CONTROL_STYLES = [StyleTypeId.CONTROL_ALIGN],
		    LABEL_STYLES = [StyleTypeId.LABEL_SIZE, StyleTypeId.LABEL_COLOR],
		    INPUT_STYLES = LABEL_STYLES.concat([StyleTypeId.BACKGROUND_COLOR, StyleTypeId.COLOR, StyleTypeId.WIDTH, StyleTypeId.HEIGHT, StyleTypeId.SIZE, StyleTypeId.TEXT_ALIGN, StyleTypeId.BORDER_COLOR, StyleTypeId.BORDER_WIDTH, StyleTypeId.BORDER_STYLE, StyleTypeId.BORDER_RADIUS]);

		// Call to this function returns Style object with 'Important' property, so that the style will be applied with ' !important'
		var addImportant = function addImportant(style) {
			var styleClone = $.extend(true, {}, style);
			styleClone.important = true;
			return styleClone;
		};

		return {
			'INPUT_TEXT': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'TEXT_AREA': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'BUTTON': CONTROL_STYLES.concat([StyleTypeId.BACKGROUND_COLOR, StyleTypeId.COLOR, StyleTypeId.WIDTH, StyleTypeId.HEIGHT, StyleTypeId.SIZE, StyleTypeId.TEXT_ALIGN, StyleTypeId.BORDER_WIDTH, StyleTypeId.BORDER_STYLE, StyleTypeId.BORDER_COLOR, StyleTypeId.BORDER_RADIUS], StyleTypeId.CLASS_NAME),
			'SELECT': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'IDENTITY_BROWSER': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'CHECKLIST': CONTROL_STYLES.concat(LABEL_STYLES, [StyleTypeId.BACKGROUND_COLOR, StyleTypeId.COLOR, StyleTypeId.SIZE], StyleTypeId.CLASS_NAME),
			'CHECKBOX': CONTROL_STYLES.concat(LABEL_STYLES, [StyleTypeId.BACKGROUND_COLOR, StyleTypeId.COLOR, StyleTypeId.SIZE], StyleTypeId.CLASS_NAME),
			'RADIO_BUTTON': CONTROL_STYLES.concat(LABEL_STYLES, [StyleTypeId.BACKGROUND_COLOR, StyleTypeId.COLOR, StyleTypeId.SIZE], StyleTypeId.CLASS_NAME),
			'NUMBER': CONTROL_STYLES.concat(LABEL_STYLES, [StyleTypeId.BACKGROUND_COLOR, StyleTypeId.COLOR, StyleTypeId.WIDTH, StyleTypeId.HEIGHT, StyleTypeId.SIZE, StyleTypeId.TEXT_ALIGN, StyleTypeId.BORDER_COLOR, StyleTypeId.BORDER_WIDTH, StyleTypeId.BORDER_STYLE], StyleTypeId.CLASS_NAME),
			'DATE': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'TIME': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'DATE_TIME': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'EMAIL': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'URL': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'MESSAGE': CONTROL_STYLES.concat([StyleTypeId.BACKGROUND_COLOR, StyleTypeId.COLOR, StyleTypeId.SIZE], StyleTypeId.CLASS_NAME),
			'LINK': CONTROL_STYLES.concat([StyleTypeId.BACKGROUND_COLOR, addImportant(StyleTypeId.COLOR), StyleTypeId.SIZE, StyleTypeId.TEXT_ALIGN], StyleTypeId.CLASS_NAME),
			'MONEY': CONTROL_STYLES.concat(LABEL_STYLES, [StyleTypeId.BACKGROUND_COLOR, StyleTypeId.COLOR, StyleTypeId.WIDTH, StyleTypeId.HEIGHT, StyleTypeId.SIZE, StyleTypeId.TEXT_ALIGN, StyleTypeId.BORDER_COLOR, StyleTypeId.BORDER_WIDTH, StyleTypeId.BORDER_STYLE], StyleTypeId.CLASS_NAME),
			'PHONE': CONTROL_STYLES.concat(INPUT_STYLES, StyleTypeId.CLASS_NAME),
			'IMAGE': CONTROL_STYLES.concat(LABEL_STYLES, [StyleTypeId.BACKGROUND_COLOR, StyleTypeId.WIDTH, StyleTypeId.HEIGHT], StyleTypeId.CLASS_NAME),
			'VIDEO': CONTROL_STYLES.concat(LABEL_STYLES, [StyleTypeId.BACKGROUND_COLOR], StyleTypeId.CLASS_NAME),
			'PANEL': LABEL_STYLES.concat([StyleTypeId.BACKGROUND_COLOR, StyleTypeId.BORDER_COLOR, StyleTypeId.BORDER_WIDTH, StyleTypeId.BORDER_STYLE, StyleTypeId.BORDER_RADIUS], StyleTypeId.CLASS_NAME),
			'SECTION': [StyleTypeId.BACKGROUND_COLOR, StyleTypeId.COLOR, StyleTypeId.BORDER_COLOR, StyleTypeId.BORDER_WIDTH, StyleTypeId.BORDER_STYLE, StyleTypeId.BORDER_RADIUS, StyleTypeId.CLASS_NAME],
			'REPEATABLE_SECTION': LABEL_STYLES,
			'TABLE': LABEL_STYLES.concat([StyleTypeId.TABLE_WIDTH]),
			'TABLE_COLUMN': [StyleTypeId.TABLE_COLUMN_WIDTH],
			'FORM_REFERENCE': LABEL_STYLES,

			//ToDo Nico We need a small refactor of the Presentation to be compatible with this Events
			'FORM_PRESENTATION': [] //StyleTypeId.BORDER_WIDTH, StyleTypeId.BORDER_STYLE, StyleTypeId.BORDER_COLOR,StyleTypeId.BACKGROUND_COLOR]
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4);

		//endregion
		//Any property added here needs to also be translated into TranslatableProperty in the builder!

		var properties = {};
		properties[ControlTypeId.INPUT_TEXT] = ['label', 'defaultValue', 'placeHolder', 'hint', 'help'];
		properties[ControlTypeId.TEXT_AREA] = ['label', 'defaultValue', 'placeHolder', 'hint', 'help'];
		properties[ControlTypeId.BUTTON] = ['label'];
		properties[ControlTypeId.SELECT] = ['label', 'placeHolder', 'hint', 'help'];
		properties[ControlTypeId.CHECKLIST] = ['label', 'help'];
		properties[ControlTypeId.CHECKBOX] = ['label', 'help'];
		properties[ControlTypeId.RADIO_BUTTON] = ['label', 'help'];
		properties[ControlTypeId.NUMBER] = ['label', 'hint', 'help'];
		properties[ControlTypeId.DATE] = ['label', 'placeHolder', 'help'];
		properties[ControlTypeId.TIME] = ['label', 'placeHolder', 'help'];
		properties[ControlTypeId.DATE_TIME] = ['label', 'placeHolder', 'help'];
		properties[ControlTypeId.EMAIL] = ['label', 'defaultValue', 'placeHolder', 'hint', 'help'];
		properties[ControlTypeId.URL] = ['label', 'defaultValue', 'placeHolder', 'hint', 'help'];
		properties[ControlTypeId.MESSAGE] = ['defaultValue'];
		properties[ControlTypeId.LINK] = ['defaultLabel'];
		properties[ControlTypeId.MONEY] = ['label', 'hint', 'help'];
		properties[ControlTypeId.PHONE] = ['label', 'defaultValue', 'placeHolder', 'hint', 'help'];
		properties[ControlTypeId.IMAGE] = ['label', 'alt'];
		properties[ControlTypeId.VIDEO] = ['label'];
		properties[ControlTypeId.IDENTITY_BROWSER] = ['label', 'placeholder', 'hint', 'help'];
		properties[ControlTypeId.PANEL] = ['label'];
		properties[ControlTypeId.SECTION] = ['label'];
		properties[ControlTypeId.TABLE] = ['label'];
		properties[ControlTypeId.TABLE_COLUMN] = ['label'];
		properties[ControlTypeId.TAB] = ['label'];
		properties[ControlTypeId.FORM_REFERENCE] = ['label'];
		return properties;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);

		//endregion

		return Class.subClass({}, {
			init: function init(id, viewModel) {
				this.id = id;
				this.viewModel = viewModel;
				this._event = null;
			},

			event: function event() {
				//Cache to not repeat the same search over and over
				if (!this._event) {
					this._event = this.viewModel.form().extensions.findEvent(this.id);
				}
				return this._event;
			},

			execute: function execute(control) {
				return this.event().execute(control);
			},

			toJS: function toJS() {
				return {
					id: this.id
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var MediaQueryType = __webpack_require__(150),
		    $ = __webpack_require__(2);

		//endregion
		var _getStyleClass = function _getStyleClass(mediaQueryType, colSpan, full) {
			var supportedMedias = full ? mediaQueryType.supportedMedias : [mediaQueryType.mediaValue];
			var styleClass = '';
			$.each(supportedMedias, function () {
				styleClass += this + '-' + colSpan + ' ';
			});
			return styleClass;
		};

		return {
			SMALL: {
				propertyName: 'smColSpan',
				getStyleClass: function getStyleClass(colSpan, full) {
					return _getStyleClass(MediaQueryType.SMALL, colSpan, full);
				}
			},
			MEDIUM: {
				propertyName: 'mdColSpan',
				getStyleClass: function getStyleClass(colSpan, full) {
					return _getStyleClass(MediaQueryType.MEDIUM, colSpan, full);
				}
			},
			LARGE: {
				propertyName: 'lgColSpan',
				getStyleClass: function getStyleClass(colSpan, full) {
					return _getStyleClass(MediaQueryType.LARGE, colSpan, full);
				}
			},
			EXTRA_LARGE: {
				propertyName: 'xlColSpan',
				getStyleClass: function getStyleClass(colSpan, full) {
					return _getStyleClass(MediaQueryType.EXTRA_LARGE, colSpan, full);
				}
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var $ = __webpack_require__(2);

		//endregion

		var ONLY_APPEND = '-only';

		var sm = 'oj-sm'; //max-width: 767px
		var md = 'oj-md'; //min-width: 768px
		var lg = 'oj-lg'; //min-width: 1024px
		var xl = 'oj-xl'; //min-width: 1280px
		var print = 'print';

		var _accept = function _accept(mediaQuery) {
			var accepted = false;
			if (mediaQuery.indexOf(ONLY_APPEND) > 0) {
				accepted = mediaQuery === this.mediaValue + ONLY_APPEND;
			} else {
				accepted = $.inArray(mediaQuery, this.supportedMedias) >= 0;
			}
			return accepted;
		};

		return {
			PRINT: {
				mediaValue: print,
				supportedMedias: [print],
				query: 'print',
				accept: function accept(mediaQuery) {
					return _accept.call(this, mediaQuery);
				}
			},
			SMALL: {
				mediaValue: sm,
				supportedMedias: [sm],
				query: '(max-width: 767px)',
				accept: function accept(mediaQuery) {
					return _accept.call(this, mediaQuery);
				}
			},
			MEDIUM: {
				mediaValue: md,
				query: '(min-width: 768px)',
				supportedMedias: [sm, md],
				accept: function accept(mediaQuery) {
					return _accept.call(this, mediaQuery);
				}
			},
			LARGE: {
				mediaValue: lg,
				supportedMedias: [sm, md, lg],
				query: '(min-width: 1024px)',
				accept: function accept(mediaQuery) {
					return _accept.call(this, mediaQuery);
				}
			},
			EXTRA_LARGE: {
				mediaValue: xl,
				query: '(min-width: 1280px)',
				supportedMedias: [sm, md, lg, xl],
				accept: function accept(mediaQuery) {
					return _accept.call(this, mediaQuery);
				}
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		// jshint maxstatements: 40

		//region dependencies

		var EventsId = __webpack_require__(14),
		    ControlTypeId = __webpack_require__(4);
		//endregion

		var textEvents = [EventsId.ON_LOAD, EventsId.ON_CHANGE, EventsId.ON_FOCUS, EventsId.ON_BLUR, EventsId.ON_SUBMIT];

		var properties = {};
		properties[ControlTypeId.INPUT_TEXT] = textEvents;
		properties[ControlTypeId.TEXT_AREA] = textEvents;
		properties[ControlTypeId.BUTTON] = [EventsId.ON_LOAD, EventsId.ON_CLICK, EventsId.ON_SUBMIT];
		properties[ControlTypeId.SELECT] = [EventsId.ON_LOAD, EventsId.ON_CHANGE, EventsId.ON_SUBMIT];
		properties[ControlTypeId.CHECKLIST] = [EventsId.ON_LOAD, EventsId.ON_CHANGE, EventsId.ON_SUBMIT];
		properties[ControlTypeId.CHECKBOX] = [EventsId.ON_LOAD, EventsId.ON_CHANGE, EventsId.ON_SUBMIT];
		properties[ControlTypeId.RADIO_BUTTON] = [EventsId.ON_LOAD, EventsId.ON_CHANGE, EventsId.ON_SUBMIT];
		properties[ControlTypeId.NUMBER] = textEvents;
		properties[ControlTypeId.DATE] = textEvents;
		properties[ControlTypeId.TIME] = textEvents;
		properties[ControlTypeId.DATE_TIME] = textEvents;
		properties[ControlTypeId.EMAIL] = textEvents;
		properties[ControlTypeId.URL] = textEvents;
		properties[ControlTypeId.MESSAGE] = [EventsId.ON_LOAD];
		properties[ControlTypeId.LINK] = [EventsId.ON_LOAD, EventsId.ON_CLICK];
		properties[ControlTypeId.MONEY] = textEvents;
		properties[ControlTypeId.PHONE] = textEvents;
		properties[ControlTypeId.IMAGE] = [EventsId.ON_LOAD];
		properties[ControlTypeId.VIDEO] = [EventsId.ON_LOAD];
		properties[ControlTypeId.PANEL] = [EventsId.ON_LOAD];
		properties[ControlTypeId.BUSINESS_TYPE] = [EventsId.ON_LOAD];
		properties[ControlTypeId.SECTION] = [EventsId.ON_LOAD, EventsId.ON_EXPAND, EventsId.ON_COLLAPSE, EventsId.ON_EXPAND_TOGGLE];
		properties[ControlTypeId.FORM_REFERENCE] = [EventsId.ON_LOAD, EventsId.ON_SUBMIT];
		properties[ControlTypeId.TAB_CONTAINER] = [EventsId.ON_LOAD];
		properties[ControlTypeId.TAB] = [EventsId.ON_LOAD, EventsId.ON_SELECTED, EventsId.ON_UNSELECTED];
		properties.PRESENTATION = [EventsId.ON_LOAD, EventsId.ON_SUBMIT];
		properties.TABLE = [EventsId.ON_LOAD, EventsId.ON_SELECTION_CHANGE, EventsId.ON_ADD_ROW, EventsId.ON_REMOVE_ROW];
		properties.REPEATABLE_SECTION = [EventsId.ON_LOAD, EventsId.ON_SELECTION_CHANGE, EventsId.ON_ADD_ROW, EventsId.ON_REMOVE_ROW];
		properties.STRING_REPEATABLE_SECTION = properties.REPEATABLE_SECTION;
		properties.NUMBER_REPEATABLE_SECTION = properties.REPEATABLE_SECTION;
		properties.BOOLEAN_REPEATABLE_SECTION = properties.REPEATABLE_SECTION;
		properties.DATE_REPEATABLE_SECTION = properties.REPEATABLE_SECTION;
		properties.TIME_REPEATABLE_SECTION = properties.REPEATABLE_SECTION;
		properties.DATE_TIME_REPEATABLE_SECTION = properties.REPEATABLE_SECTION;
		properties[ControlTypeId.IDENTITY_BROWSER] = [EventsId.ON_LOAD, EventsId.ON_CHANGE, EventsId.ON_SUBMIT];
		properties[ControlTypeId.ENUM_SELECT] = [EventsId.ON_LOAD, EventsId.ON_CHANGE, EventsId.ON_SUBMIT];

		return properties;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var LOVControl = __webpack_require__(64),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    TypeCatalog = __webpack_require__(24),
		    ControlTypeId = __webpack_require__(4),
		    ko = __webpack_require__(1);

		//endregion

		return LOVControl.subClass({}, {
			/* jshint maxparams: 6 */
			init: function init(id, name, properties, context, parent, controlType) {
				this._super(id, name, controlType || context.getControlDefinitionByType(ControlTypeId.SELECT), properties, context, parent);

				_.defaults(properties, {
					placeHolder: '',
					help: '',
					hint: '',
					readonly: false
				});

				this.properties.help = ko.observable(properties.help);
				this.properties.hint = ko.observable(properties.hint);
				this.properties.placeHolder = ko.observable(properties.placeHolder);
				this.properties.readonly = ko.observable(properties.readonly); // when dropped inside Parents (Repeatable or table), they have a Inheritable property 'readonly'

				// Setting styling options after component creation has no effect. At that time, the root element already exists,
				// and can be accessed directly via the widget method. Hence, adding the styling by using manual subscription to the style and hide properties.
				this.properties.parsedStyle.subscribe(function (newVal) {
					this._setStyle(id, context, newVal);
				}, this);

				this.properties.autoFocus.subscribe(function (newVal) {
					this._setAutoFocus(id, context, newVal);
				}, this);

				this.properties.multiple.subscribe(this._checkType.bind(this, context));

				var self = this;

				this.afterRenderSelect = function () {
					// Apply style
					setTimeout(function () {
						self._setStyle(id, context);
						self._setAutoFocus(id, context);
					}, 0);
				};

				this._checkType(context, this.properties.multiple());
			},
			_checkType: function _checkType(context, newVal) {
				if (newVal) {
					this.dataType = TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().STRING);
				} else {
					this.dataType = TypeCatalog.getSimpleTypesDefinitions().STRING;
				}
				// Need to reapply the style. The style should be set only after it has finished rendering the multiple select box, hence setTimeout.
				var that = this;
				setTimeout(function () {
					that._setStyle(that.id, context);
				}, 0);
			},
			_setStyle: function _setStyle(id, context, value) {
				var widget = $(context.getScope() + ' #' + context.config().domIdPrefix + id).ojSelect('widget'),
				    formattedStyle = this.properties.formattedStyle();
				widget.attr('style', value || this.properties.parsedStyle());
				widget.find('.oj-select-choice, .oj-select-choices').css('background-color', formattedStyle.backgroundColor || '');
				widget.find('.oj-select-choice, .oj-select-selected-choice-label').css('color', formattedStyle.color || '');
				var self = this;

				$('#' + id).ojSelect({
					'beforeExpand': function beforeExpand(event) {
						var formattedStyle = self.properties.formattedStyle();
						$(context.getScope() + ' #oj-listbox-results-' + id + ', .oj-listbox-drop').css('background-color', formattedStyle.backgroundColor || '');
						$(context.getScope() + ' #oj-listbox-results-' + id + ', .oj-listbox-drop').css('color', formattedStyle.color || '');
					}
				});
			},
			_setAutoFocus: function _setAutoFocus(id, context, value) {
				var autofocus = value || this.properties.optionsFeed().properties().autoFocus(),
				    widget = this.getOjComponent()('widget');
				if (widget && !_.isArray(widget)) {
					if (autofocus) {
						widget.attr('autofocus', 'autofocus');
					} else {
						widget.removeAttr('autofocus');
					}
					// If it is the first element with autofocus set, we need to focus on the oj-select div manually.
					if ($(context.getScope() + ' [autofocus]').first().is('.oj-select')) {
						context.focusControl(widget.find('.oj-select-choice'));
					}
				}
			},
			toJS: function toJS() {
				var toJs = this._super();
				toJs.properties.multiple = this.properties.multiple();
				return toJs;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    BlockFactory = __webpack_require__(43),
		    BlockTypes = __webpack_require__(25),
		    _ = __webpack_require__(0);

		//endregion

		return Class.subClass({}, {
			init: function init(controlId, blocks, viewModel, enabled) {
				this.controlId = controlId;

				this.scope = new viewModel.context.scopeFactory.Scope(viewModel.getCurrentGlobalScope());
				this.scope.controlId = controlId;
				this.viewModel = viewModel;
				var blocksArray = [];
				_.each(blocks, function (block) {
					blocksArray.push(BlockFactory.createBlock(viewModel, block, this.scope));
				}, this);
				this.blocks = ko.observableArray(blocksArray);
				this._propertyEnabled = enabled;
				this.enabled = ko.pureComputed(function () {
					return this._propertyEnabled();
				}, this);
			},

			execute: function execute(list) {
				var blocks = this.blocks(),
				    values = [],
				    promises = [];

				if (!this.enabled()) {
					return _promise2.default.resolve(list);
				}
				_.each(blocks, function (block) {
					promises.push(_promise2.default.resolve(block.execute(list)).then(function (value) {
						values.push(value);
					}));
				});
				return _promise2.default.all(promises).then(function () {
					return blocks.length ? _.unique(_.flatten(values)) : list;
				});
			},

			getAllConditionalValues: function getAllConditionalValues() {
				var values = [];
				_.each(this.blocks(), function (block) {
					if (block._class.TYPE === BlockTypes.FILTER_IF_BLOCK) {
						block.conditions().forEach(function (condition) {
							values.push(condition.value);
						});
					}
					if (block._class.TYPE === BlockTypes.FILTER_BLOCK) {
						// Only adding second operand since the first operand is not a dependant value.
						values.push(block.condition.value2);
					}
				});
				return values;
			},

			toJS: function toJS() {
				var blocks = [];
				_.each(this.blocks(), function (block) {
					blocks.push(block.toJS());
				});
				return {
					blocks: blocks
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		/* globals Promise */

		var EventBlock = __webpack_require__(50),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    BlockTypes = __webpack_require__(25),
		    ControlResolver = __webpack_require__(121),
		    Value = __webpack_require__(15),
		    FormsLogger = __webpack_require__(20),
		    ActionFactory = __webpack_require__(340);

		//endregion

		return EventBlock.subClass({
			TYPE: BlockTypes.ACTION_BLOCK,
			TEMPLATE_NAME: 'event-block'
		}, {
			init: function init(model, viewModel, scope) {
				this._super(model, viewModel, scope);

				this.controlResolver = new ControlResolver(model.controlResolver, viewModel, scope);

				this.action = ko.observable(ActionFactory.createAction(viewModel, this.scope, model.action, this.control(), model.action.type));
			},

			control: function control() {
				var form = this.viewModel.form();
				if (form) {
					return this.controlResolver.resolve(form.presentation(), this.scope.eventControl);
				}
			},

			execute: function execute() {
				var self = this;
				var controls = this.control();
				if (!_.isArray(controls)) {
					controls = [controls];
				}
				var promise = _promise2.default.resolve();
				//Execute for each control, to allow iteration
				_.each(_.flatten(controls), function (control) {
					var eventControl = self.scope.eventControl;
					promise = promise.then(function () {
						try {
							//Set the value of the control in the scope, to allow for CURRENT_ITERATION resolver
							self.scope.currentRowControl = control;
							//Set the eventControl, as it may have been lost due to asynchronicity
							self.scope.eventControl = eventControl;
							return ko.unwrap(self.action).execute(control) || _promise2.default.resolve();
						} catch (e) {
							FormsLogger.getLogger().error('User Events Error: Error executing action."');
						}
					});
				}, this);
				return promise;
			},

			getBundle: function getBundle() {
				var bundle = {};
				var blockId = this.id;
				var action = this.action();
				if (action && action.value && ko.utils.unwrapObservable(action.value) instanceof Value) {
					var bundleArr = action.value._getBundle();
					if (bundleArr.length > 0) {
						bundle[blockId] = bundleArr;
					}
				}
				return bundle;
			},

			decorate: function decorate() {
				var blockId = this.id;
				var action = this.action();
				if (action && action.value && ko.utils.unwrapObservable(action.value) instanceof Value) {
					action.value.decorate(this.viewModel, blockId);
				}
				return true;
			},

			toJS: function toJS() {
				return _.extend(this._super(), {
					action: this.action().toJS(),
					controlResolver: this.controlResolver.toJS()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		/* global Promise */

		//region dependencies

		var EventBlock = __webpack_require__(50);
		var ko = __webpack_require__(1);
		var _ = __webpack_require__(0);
		var BlockTypes = __webpack_require__(25);
		var EventCondition = __webpack_require__(156);

		//endregion

		return EventBlock.subClass({
			TYPE: BlockTypes.IF_BLOCK,
			TEMPLATE_NAME: 'event-if-block',
			ELSE_ACTIONS: 'elseActions',
			THEN_ACTIONS: 'thenActions'
		}, {
			init: function init(model, viewModel, scope) {
				var BlockFactory = __webpack_require__(43);
				this._super(model, viewModel, scope);

				var conditions = [];
				var self = this;
				_.each(model.conditions, function (condition) {
					conditions.push(new EventCondition(condition, viewModel, scope, self.id));
				});
				if (conditions.length === 0) {
					conditions.push(new EventCondition({}, viewModel, scope, this.id));
				}
				this.conditions = ko.observableArray(conditions);

				var thenActions = [];
				_.each(model.thenActions, function (block) {
					thenActions.push(BlockFactory.createBlock(viewModel, block, scope));
				});
				this.thenActions = ko.observableArray(thenActions);

				var elseActions = [];
				_.each(model.elseActions, function (block) {
					elseActions.push(BlockFactory.createBlock(viewModel, block, scope));
				});
				this.elseActions = ko.observableArray(elseActions);
			},

			isTrue: function isTrue() {
				var unionStrings = {
					'AND': ' && ',
					'OR': ' || '
				};
				var booleanString = 'true';
				_.each(this.conditions(), function (condition) {
					var union = unionStrings[condition.union()];
					booleanString = booleanString + union + (!!condition.isTrue()).toString();
				});
				/**
     * We are calling eval to evaluate the logical string that we just made
     * It won't allow the execution of harmful code, because the string is created in the previous function,
     * and it can only be logical connectors (|| and &&) or logical statements (true and false)
     * It is created using the string concatenation of this values
     * Regardless of what condition.isTrue return, the double negation (!!) converts that to a boolean value, then converted to a string ('true' or 'false')
     * if condition.union() is not 'AND' or 'OR', then the union will be 'undefined', which will throw an error, but won't allow code to run.
     */
				return eval(booleanString); // jshint ignore:line
			},

			execute: function execute(list) {

				var actions = this.isTrue() ? this.thenActions() : this.elseActions();
				var eventControl = this.scope.eventControl;
				var self = this;

				var p = _promise2.default.resolve();
				_.each(ko.unwrap(actions), function (block) {
					p = p.then(function () {
						//Make sure we have not lost the control
						self.scope.eventControl = eventControl;
						return block.execute(list) || _promise2.default.resolve();
					});
				});
				return p;
			},
			getElseActionsJS: function getElseActionsJS() {
				var elseActions = [];
				_.each(this.elseActions(), function (block) {
					elseActions.push(block.toJS());
				});
				return elseActions;
			},

			getBundle: function getBundle() {
				var bundle = {};
				_.each(this.conditions(), function (block) {
					_.extend(bundle, block.getBundle());
				});
				_.each(this.thenActions(), function (block) {
					_.extend(bundle, block.getBundle());
				});
				_.each(this.elseActions(), function (block) {
					_.extend(bundle, block.getBundle());
				});

				return bundle;
			},

			decorate: function decorate() {
				_.each(this.conditions(), function (block) {
					block.decorate();
				});
				_.each(this.thenActions(), function (block) {
					block.decorate();
				});
				_.each(this.elseActions(), function (block) {
					block.decorate();
				});

				return true;
			},

			toJS: function toJS() {
				var conditions = [];
				_.each(this.conditions(), function (condition) {
					conditions.push(condition.toJS());
				});

				var thenActions = [];
				_.each(this.thenActions(), function (block) {
					thenActions.push(block.toJS());
				});

				return _.extend(this._super(), {
					conditions: conditions,
					thenActions: thenActions,
					elseActions: this.getElseActionsJS()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_typeof2) {
	'use strict';

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);
		var Value = __webpack_require__(15);
		var ko = __webpack_require__(1);
		var ValueTypes = __webpack_require__(61);
		var DotExpressionResolver = __webpack_require__(23);
		var _ = __webpack_require__(0);
		var ComparatorMap = __webpack_require__(345);

		//endregion

		return Class.subClass({}, {
			init: function init(model, viewModel, scope, ifBlockId) {
				this.viewModel = viewModel;
				this.scope = scope;
				var defaultValue = _.extend({
					type: ValueTypes.CONTROL.value
				}, model.value);

				this.value = new Value(defaultValue, viewModel, scope);
				this.comparator = ko.observable(model.comparator || ComparatorMap.EQUALS.value);
				this.value2 = new Value(model.value2, viewModel, scope);
				this.union = ko.observable(model.union || 'AND');
				this.ifBlockId = ifBlockId;
			},

			isTrue: function isTrue(value) {
				return ComparatorMap[this.comparator()].isTrue(this._evaluateOperand(value), this.value2.resolve(this.viewModel));
			},

			_evaluateOperand: function _evaluateOperand(value) {
				// If a value is supplied, then resolve the value based on if its an object or a primitive value.
				// Otherwise resolve the property value/operand.
				if (value) {
					return (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' ? DotExpressionResolver.getValue(value, this.value.expression()) : value;
				}
				return this.value.resolve(this.viewModel);
			},

			getBundle: function getBundle() {
				var bundle = {};
				var conditionBundle = _.union(this.value._getBundle(), this.value2._getBundle());
				/* istanbul ignore else */
				if (conditionBundle.length) {
					bundle[this.ifBlockId] = conditionBundle;
				}
				return bundle;
			},

			decorate: function decorate() {
				this.value.decorate(this.viewModel, this.ifBlockId, this.value);
				this.value2.decorate(this.viewModel, this.ifBlockId, this.value);
				return true;
			},

			toJS: function toJS() {
				return {
					value: this.value.toJS(),
					comparator: this.comparator(),
					value2: this.value2.toJS(),
					union: this.union()
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5);

		//endregion

		var HeadingType = {
			PARAGRAPH: {
				value: 'MessageTypeParagraph',
				label: msg.MESSAGE_TYPE_PARAGRAPH
			},
			H1: {
				value: 'MessageTypeHeading1',
				label: msg.MESSAGE_TYPE_HEADING1
			},
			H2: {
				value: 'MessageTypeHeading2',
				label: msg.MESSAGE_TYPE_HEADING2
			},
			H3: {
				value: 'MessageTypeHeading3',
				label: msg.MESSAGE_TYPE_HEADING3
			},
			H4: {
				value: 'MessageTypeHeading4',
				label: msg.MESSAGE_TYPE_HEADING4
			},
			H5: {
				value: 'MessageTypeHeading5',
				label: msg.MESSAGE_TYPE_HEADING5
			},
			H6: {
				value: 'MessageTypeHeading6',
				label: msg.MESSAGE_TYPE_HEADING6
			},
			values: function values() {
				return [HeadingType.PARAGRAPH, HeadingType.H1, HeadingType.H2, HeadingType.H3, HeadingType.H4, HeadingType.H5, HeadingType.H6];
			}
		};
		return HeadingType;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_158__;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    RepeatableControl = __webpack_require__(160);

		//endregion

		return RepeatableControl.subClass({}, {
			/* jshint maxparams: 7 */
			init: function init(id, name, data, context, controlFactory, parent, typeId) {
				this._triggerBindableReeval = ko.observable(false);
				var self = this;
				self._super(id, name, data, context, controlFactory, typeId || ControlTypeId.REPEATABLE_SECTION, parent);

				_.defaults(data.properties, {
					labelBinding: '',
					labelMapping: ''
				});
				this.properties.labelBinding = ko.observable(data.properties.labelBinding);
				this.properties.labelMapping = ko.observable(data.properties.labelMapping);
				this._triggerBindableReeval(!this._triggerBindableReeval());
				context.LoVMappingAutoComplete.initialize(this, context);
			},
			_getAllBindableControls: function _getAllBindableControls() {
				this._triggerBindableReeval();
				var controls = this._super();
				return [{
					id: this.id,
					name: this.msg.LABEL_LABEL,
					properties: {
						connectorMapping: this.properties.labelMapping,
						binding: this.properties.labelBinding
					}
				}].concat(controls);
			},
			colStyle: function colStyle() {
				return 'pcs-forms-row';
			},
			_initRow: function _initRow(row, value) {
				this._super(row, value);
				row.properties.label = ko.observable(ko.unwrap(value[this.properties.labelBinding()]));
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		/* globals Promise */

		//region dependencies

		var _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    ControlContainer = __webpack_require__(26),
		    RepeatableRowControl = __webpack_require__(375),
		    EventsId = __webpack_require__(14),
		    Filter = __webpack_require__(153),
		    UUID = __webpack_require__(17),
		    OptionsFeed = __webpack_require__(89),
		    OptionsType = __webpack_require__(41),
		    InheritableProperty = __webpack_require__(376),
		    Control = __webpack_require__(9);

		//endregion

		return Control.subClass({}, {
			// jshint maxparams:7
			init: function init(id, name, data, context, controlFactory, controlType, parent) {
				// jshint maxstatements: 31

				var self = this;
				self.data = data;
				self.context = context;
				self.controlFactory = controlFactory;
				self._super(id, name, context.getControlDefinitionByType(controlType), data.properties, context, parent);

				self.container = new ControlContainer(data, context, controlFactory, this);
				//Some Controls (i.e. Rows) inherit directly from ControlContainer
				//Here we need to add the important functions to this, because we inherit from Control
				self.controls = self.container.controls;
				self.getAllControls = self.container.getAllControls.bind(self.container);
				self.findControl = self.container.findControl.bind(self.container);
				//Wrapping the private method as an observable, otherwise it was not possible to override the method
				self.getAllBindableControls = ko.computed(function () {
					return self._getAllBindableControls();
				});
				/**
     * @override
     * getControls is used to populate the events controls, and we need to stop
     * the list at the repeatable, as it has its own properties
     */
				self.getControls = function () {
					return [];
				};

				_.defaults(data.properties, {
					canAddDelete: false,
					multipleSelection: false,
					fromConnector: false,
					maxRows: 200,
					minRows: 0,
					invalidRepeatableClass: '',
					optionsFeed: {
						type: OptionsType.STATIC.value,
						properties: {}
					},
					filter: {
						blocks: []
					}
				});
				this.properties.canAddDelete = ko.observable(data.properties.canAddDelete);
				this.properties.multipleSelection = ko.observable(data.properties.multipleSelection);
				this.properties.maxRows = ko.observable(data.properties.maxRows);
				this.properties._minRows = ko.observable(data.properties.minRows);
				this.properties.minRows = ko.pureComputed({
					read: function read() {
						var value = this.properties._minRows();
						if (value > this.properties.maxRows()) {
							this.properties._minRows(this.properties.maxRows()); //Set min row so that it will retain its value in future
							return this.properties.maxRows();
						}

						return value;
					},
					write: function write(value) {
						this.properties._minRows(value);
					},
					owner: this
				});
				this.properties.invalidRepeatableClass = ko.observable(data.properties.invalidRepeatableClass);
				this.properties.fromConnector = ko.observable();
				this.properties.optionsFeed = ko.observable();
				this.properties.errorMsg = ko.observableArray([]);
				this.properties.filter = ko.observable(new Filter(id, data.properties.filter.blocks, context.viewModel, this.properties.filterEnabled));
				this.properties.fromConnector.subscribe(function (newValue) {
					if (newValue) {
						self.properties.optionsFeed(new OptionsFeed(OptionsType.LIST_CONNECTOR.value, context, data.properties.optionsFeed.properties, self.id, self.properties.filter()));
					} else {
						self.properties.optionsFeed(new OptionsFeed(OptionsType.STATIC.value, context, {}));
					}
				});
				this.properties.fromConnector(data.properties.fromConnector);

				context.LoVMappingAutoComplete.createAutoCompletes(this, context);

				self.createRow = function (value) {
					var row = new RepeatableRowControl(UUID.createUuid(), self.controls, self.context, self.controlFactory, self, value);
					self.context.addControlDecorators(row);
					self._initRow(row, value || {});
					if (value && context.viewModel.form() && context.viewModel.form().loadEventsExecuted()) {
						//We need to defer the execution of the events until the controls are added to the table, which is executed
						// all at once after this point
						// a setTimeout of time 0 makes this code execute immediately after the adding row code is run
						setTimeout(function () {
							$.each(row.getAllControls(true), function (i, control) {
								control.executeEvent(EventsId.ON_LOAD.value);
							});
						});
					}
					return row;
				};

				self.canAddRows = ko.pureComputed(function () {
					return self.dataSource().length < self.properties.maxRows();
				});

				/**
     * Selection
     */
				self.selectedRows = ko.observableArray([]);

				//Special table properties
				self.properties._disabled = ko.observable(self.properties.disabled());
				self.properties.disabled = InheritableProperty.createInheritableProperty(self, self.properties._disabled, 'disabled');
				self.properties._readonly = ko.observable(data.properties.readonly);
				self.properties.readonly = InheritableProperty.createInheritableProperty(self, ko.pureComputed({
					//When the form is readOnly, the whole table MUST be read only
					read: function read() {
						return ko.unwrap(self.readOnly) || ko.unwrap(self.properties._readonly) || !!(self.disabled && ko.unwrap(self.disabled));
					},
					write: function write(newValue) {
						return self.properties._readonly(newValue);
					}
				}), 'readonly');

				//Subscribe to selection changes
				self.selectedRows.subscribe(function () {
					self.eventsQueue.execute(self, EventsId.ON_SELECTION_CHANGE);
				});
				self.inValidRepeatableClassName = 'invalid-repeatable';
			},
			hasValueProperty: function hasValueProperty() {
				return false;
			},
			refreshConnector: function refreshConnector() {
				if (this.properties.fromConnector()) {
					this.properties.optionsFeed().optionsResolver().loadAndSetConnector(this.viewModel.form());
				}
			},
			reApplyFilter: function reApplyFilter() {
				this.properties.optionsFeed().optionsResolver().reApplyFilter();
			},

			findControlInsideRepeatable: function findControlInsideRepeatable(controlId) {
				var control = null;
				_.any(this.getRows(), function (row) {
					control = row.findControlInsideRepeatable(controlId);
					return !!control;
				});
				return control;
			},
			getConnectorCall: function getConnectorCall() {
				return this.properties.optionsFeed().optionsResolver().getConnectorCall(this.viewModel.form());
			},

			/**
    * Used for events
    */
			isRepeatable: function isRepeatable() {
				return true;
			},

			/**
    * Gets the list of all controls that have a binding, used for REST mapping
    */
			_getAllBindableControls: function _getAllBindableControls() {
				return _.filter(this.getAllControls(true), function (control) {
					return !!control.properties.binding();
				});
			},
			executeEventOnAll: function executeEventOnAll(trigger) {
				var events = [this.executeEvent(trigger)];
				_.each(this.getRows(), function (row) {
					_.each(row.getAllControls(true), function (control) {
						events = events.concat(control.executeEventOnAll(trigger));
					});
				});
				return _promise2.default.all(events);
			},

			_initRow: function _initRow() {},

			toJS: function toJS() {
				var controls = [];
				_.each(this.controls(), function (column) {
					controls.push(column.toJS());
				});
				var toJs = _.extend(this._super(), {
					controls: controls,
					readonly: this.properties.readonly()
				});
				toJs.properties.optionsFeed = this.properties.optionsFeed().toJS();
				toJs.properties.filter = this.properties.filter().toJS();
				return toJs;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4);
		//endregion

		return {
			'string': ControlTypeId.INPUT_TEXT,
			'date': ControlTypeId.DATE,
			'time': ControlTypeId.TIME,
			'date-time': ControlTypeId.DATE_TIME,
			'number': ControlTypeId.NUMBER,
			'base64Binary': ControlTypeId.INPUT_TEXT
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 162 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(404);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = "<img alt=\"\" class=\"icon\" data-bind=\"attr:{src: icon.getDataValue(), alt: alt}, css: styleClass\"/>\n<img alt=\"\" class=\"icon-hover\" data-bind=\"attr:{src: icon.getDataHover(), alt: alt}, css: styleClass + '-hover'\"/>\n<img alt=\"\" class=\"icon-active\" data-bind=\"attr:{src: icon.getDataActive(), alt: alt}, css: styleClass + '-active'\"/>";

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pcs-forms-row form-container\" id=\"form-renderer-container\" data-bind=\"subscribe:{afterRender: registerCustomEvents, beforeRemove: detachCustomListeners}, clean: rendererContext.getScope()\">\n    <div class=\"oj-sm-12 oj-md-12 pcs-forms-col\">\n        <form id=\"rForm\" class=\"form-horizontal\" role=\"form\">\n            <div class=\"canvas-container\">\n                <div class=\"canvas\" data-bind=\"with: form()\">\n                    <div id=\"creatorLoading\" class=\"spinnerContainer\" style=\"display: none\">\n                        <div id=\"spinner\" class=\"spinner\">\n                            <div id=\"bounce1\" class=\"spinner__bounce spinner-object spinner-object-1\"></div>\n                            <div id=\"bounce2\" class=\"spinner__bounce spinner-object spinner-object-2\"></div>\n                            <div id=\"bounce3\" class=\"spinner__bounce spinner-object spinner-object-3\"></div>\n                        </div>\n                    </div>\n                    <div class=\"canvas__header\"></div>\n                    <div class=\"canvas__content oj-panel js-renderer-container\"\n                         data-bind=\"style: {'border-color' : properties.borderColor ? properties.borderColor() : 'null',\n                                                                                         'border-width': properties.borderWidth ? properties.borderWidth() : 'null',\n                                                                                         'border-style' : properties.borderStyle? properties.borderStyle() : 'null',\n                                                                                         'background-color' : properties.backgroundColor? properties.backgroundColor() : 'null'}\">\n                        <!--  if: shouldRender -->\n                        <div data-bind=\"asyncTemplate:{name: 'rendererControl', foreach: controls(), afterLazyRenderAll: afterRenderingRowControls.bind($data), pageSize: 1, hideLoading: true}\"></div>\n                        <!-- / -->\n                    </div>\n                    <div class=\"canvas__footer\"></div>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>";

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		'use strict';
		/* global FORMS_RENDERER_VERSION */

		var $ = __webpack_require__(2);
		var ko = __webpack_require__(1);

		return {
			init: /* istanbul ignore next */function init(publicPath) {
				window.FORMS_RENDERER_VERSION = "1.7.0-next.74";
				// if consumed in another place (like composer), the consumer needs to specify
				// where the imgs (and any other resource that is loaded dynamically) will be
				// it no public path is specified, the default will be used (defined in our
				// front-end-config.js publicPath property.
				if (publicPath) __webpack_require__.p = publicPath;
				//Initialize Components
				var RendererComponent = __webpack_require__(167);

				RendererComponent();
			},

			applyBindings: /* istanbul ignore next */function applyBindings(viewModel, div) {
				// This apply binding is needed for the standalone forms editor
				//We store this is global variables so we can debug in the standalone app
				window._$ = $;
				window._ko = ko;
				ko.applyBindings(viewModel, div);
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var RendererViewModel = __webpack_require__(92),
		    IconComponent = __webpack_require__(400),
		    rendererCss = __webpack_require__(401),
		    ojMigrationCss = __webpack_require__(405),
		    ko = __webpack_require__(1);

		var RendererTemplateLoader = __webpack_require__(407);
		var mediaBindingHandler = __webpack_require__(458);
		var HandleEventsBinding = __webpack_require__(460);
		var knockoutExtensions = __webpack_require__(464);
		var formKnockoutExtensions = __webpack_require__(465);

		//endregion

		return function () {
			RendererTemplateLoader();
			mediaBindingHandler();
			HandleEventsBinding();
			knockoutExtensions();
			formKnockoutExtensions();

			if (!ko.components.isRegistered('form-renderer')) {
				rendererCss.use();
				ojMigrationCss.use();
				//cannot use just icon due to a bug in ko 3.4 - https://github.com/knockout/knockout/issues/1935
				ko.components.register('actionable-icon', {
					viewModel: IconComponent,
					template: __webpack_require__(164)
				});

				ko.components.register('form-renderer', {
					viewModel: RendererViewModel,
					template: __webpack_require__(165)
				});
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(169);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 169 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
__webpack_require__(96);
__webpack_require__(106);
__webpack_require__(180);
__webpack_require__(191);
__webpack_require__(192);
module.exports = __webpack_require__(18).Promise;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(65);
var defined = __webpack_require__(66);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(100);
var descriptor = __webpack_require__(54);
var setToStringTag = __webpack_require__(56);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(27)(IteratorPrototype, __webpack_require__(12)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(28);
var anObject = __webpack_require__(22);
var getKeys = __webpack_require__(69);

module.exports = __webpack_require__(30) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(46);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(37);
var toLength = __webpack_require__(102);
var toAbsoluteIndex = __webpack_require__(176);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(65);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(178);
var step = __webpack_require__(179);
var Iterators = __webpack_require__(45);
var toIObject = __webpack_require__(37);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(97)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(51);
var global = __webpack_require__(11);
var ctx = __webpack_require__(52);
var classof = __webpack_require__(107);
var $export = __webpack_require__(36);
var isObject = __webpack_require__(29);
var aFunction = __webpack_require__(53);
var anInstance = __webpack_require__(181);
var forOf = __webpack_require__(182);
var speciesConstructor = __webpack_require__(108);
var task = __webpack_require__(109).set;
var microtask = __webpack_require__(187)();
var newPromiseCapabilityModule = __webpack_require__(73);
var perform = __webpack_require__(110);
var promiseResolve = __webpack_require__(111);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(12)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(188)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(56)($Promise, PROMISE);
__webpack_require__(189)(PROMISE);
Wrapper = __webpack_require__(18)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(190)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(52);
var call = __webpack_require__(183);
var isArrayIter = __webpack_require__(184);
var anObject = __webpack_require__(22);
var toLength = __webpack_require__(102);
var getIterFn = __webpack_require__(185);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(22);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(45);
var ITERATOR = __webpack_require__(12)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(107);
var ITERATOR = __webpack_require__(12)('iterator');
var Iterators = __webpack_require__(45);
module.exports = __webpack_require__(18).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 186 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(11);
var macrotask = __webpack_require__(109).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(46)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(27);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(11);
var core = __webpack_require__(18);
var dP = __webpack_require__(28);
var DESCRIPTORS = __webpack_require__(30);
var SPECIES = __webpack_require__(12)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(12)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(36);
var core = __webpack_require__(18);
var global = __webpack_require__(11);
var speciesConstructor = __webpack_require__(108);
var promiseResolve = __webpack_require__(111);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(36);
var newPromiseCapability = __webpack_require__(73);
var perform = __webpack_require__(110);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var FormContext = __webpack_require__(194),
		    RendererControlType = __webpack_require__(203),
		    RendererId = __webpack_require__(78),
		    msg = __webpack_require__(5),
		    ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    Icon = __webpack_require__(253),
		    EventsId = __webpack_require__(14),
		    Configuration = __webpack_require__(254),
		    OptionsResolverFactory = __webpack_require__(271),
		    LoVMappingAutoComplete = __webpack_require__(282),
		    EventsQueue = __webpack_require__(283),
		    ObservablePayloadContext = __webpack_require__(284),
		    FormReferenceFactory = __webpack_require__(285),
		    RendererDecoratorsCatalog = __webpack_require__(288);

		var REMOVE_COLUMN_BLUE = __webpack_require__(330),
		    ADD_COLUMN_BLUE = __webpack_require__(331);

		//endregion

		return FormContext.subClass({}, {
			controlBindings: {},
			init: function init(rendererModel, viewModel, controlBindings, bindingContext) {
				this._super(new Configuration(rendererModel.config), rendererModel.dependencies, viewModel);
				this.tracker = ko.observable();

				this.optionsResolverFactory = new OptionsResolverFactory();
				this.LoVMappingAutoComplete = LoVMappingAutoComplete;
				this.eventsQueue = new EventsQueue();
				this.decoratorsCatalog = new RendererDecoratorsCatalog();
				this.payloadContext = new ObservablePayloadContext(controlBindings, bindingContext);

				//list of running async Templates (this list will be empty when everything is rendered)
				this.runningAsyncTemplates = ko.observable(-1);
			},
			getScope: function getScope() {
				return RendererId.FORM_RENDERER;
			},
			getControlDefinitionByType: function getControlDefinitionByType(controlTypeId) {
				return RendererControlType[controlTypeId];
			},
			getFormReferenceControlDefinition: function getFormReferenceControlDefinition(reference, handler) {
				return RendererControlType.FORM_REFERENCE(FormReferenceFactory.create(reference), handler);
			},
			addControlDecorators: function addControlDecorators(control) {
				this.decoratorsCatalog.addToControl(control, this);
			},
			focusControl: function focusControl($control) {
				if ($control.length > 0) {
					$control.first().focus();
					ko.contextFor($control[0]).control.executeEvent(EventsId.ON_FOCUS.value);
				}
			},
			registerAsyncTemplate: function registerAsyncTemplate(context, foreachList) {
				var list = ko.unwrap(foreachList);
				var callback;
				if (list.length > 0) {
					//if no controls to render we don't register it.
					if (this.runningAsyncTemplates() === -1) {
						this.runningAsyncTemplates(1); //registering first asyncTemplate;
					} else {
						//registering asyncTemplate
						this.runningAsyncTemplates(this.runningAsyncTemplates() + 1);
					}
					//callback when asyncTemplate finishes.
					callback = function () {
						this.runningAsyncTemplates(this.runningAsyncTemplates() - 1);
					}.bind(this);
				}
				return callback;
			},
			properties: function properties() {
				var _readOnly = this.config().readOnly; // Similar to BuilderContext, readOnly parameter should come in config
				var _disabled = this.config().disabled;
				return _.extend({}, this._super(), {
					config: this.config(),
					msg: msg,
					removeColumnIcon: function removeColumnIcon() {
						return new Icon(REMOVE_COLUMN_BLUE, REMOVE_COLUMN_BLUE, REMOVE_COLUMN_BLUE);
					},
					addColumnIcon: function addColumnIcon() {
						return new Icon(ADD_COLUMN_BLUE, ADD_COLUMN_BLUE, ADD_COLUMN_BLUE);
					},
					tracker: $.proxy(function () {
						return this.tracker;
					}, this),
					readOnly: function readOnly() {
						return _readOnly;
					},
					disabled: function disabled() {
						return _disabled;
					}
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    ColumnSpanTypeId = __webpack_require__(199),
		    ValueScope = __webpack_require__(200),
		    _StringUtils = __webpack_require__(32),
		    StyleHandler = __webpack_require__(201),
		    ControlTypeId = __webpack_require__(4);

		//endregion

		/* istanbul ignore next */
		return Class.subClass({}, {
			init: function init(config, dependencies, viewModel) {
				this.viewModel = viewModel;
				this.config = ko.observable(config);
				this.payload = ko.observable();
				this.config().resolveDependencies(dependencies || []);
				this.styleHandler = new StyleHandler();

				var selectedMedia;
				if (config && config.selectedMedia && ColumnSpanTypeId[config.selectedMedia]) {
					selectedMedia = ColumnSpanTypeId[config.selectedMedia];
				} else {
					selectedMedia = this._getDefaultSelectedMedia();
				}
				this.selectedMedia = ko.observable(selectedMedia);

				this.scopeFactory = {
					Scope: ValueScope,
					ErrorScope: ValueScope
				};
			},
			getControlDefinition: function getControlDefinition(control) {
				if (control.type === ControlTypeId.FORM_REFERENCE) {
					var formReference = control.properties.reference;
					var reference = ko.isObservable(formReference) ? formReference().get() : formReference;
					return this.getFormReferenceControlDefinition(reference, this.config().formHandler);
				} else {
					return this.getControlDefinitionByType(control.type);
				}
			},
			getControlDefinitionByType: function getControlDefinitionByType(controlTypeId) {
				throw new Error('Unsupported operation');
			},
			getFormReferenceControlDefinition: function getFormReferenceControlDefinition(reference, handler) {
				throw new Error('Unsupported operation');
			},
			properties: function properties() {
				return {
					eventsQueue: this.eventsQueue,
					domIdPrefix: this.config().domIdPrefix,
					styleHandler: this.styleHandler,
					viewModel: this.viewModel,
					selectedMedia: function () {
						return this.selectedMedia;
					}.bind(this),
					StringUtils: function StringUtils() {
						//Have to create a function, otherwise StringUtils is tried to be initialized
						return _StringUtils;
					},
					helpDefinition: function helpDefinition() {
						return function (help) {
							return ko.pureComputed(function () {
								var helpMsg = ko.unwrap(help);
								return {
									definition: _.isEmpty(helpMsg) ? null : helpMsg
								};
							});
						};
					}
				};
			},
			addControlDecorators: function addControlDecorators(control) {
				throw new Error('Unsupported operation');
			},
			_getDefaultSelectedMedia: function _getDefaultSelectedMedia() {
				return ColumnSpanTypeId.ALL;
			},
			findCallDefinition: function findCallDefinition(id) {
				return _.find(this.calls(), function (callDef) {
					return callDef.id === id;
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(196), __esModule: true };

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(197);
module.exports = __webpack_require__(18).Object.getPrototypeOf;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(105);
var $getPrototypeOf = __webpack_require__(104);

__webpack_require__(198)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(36);
var core = __webpack_require__(18);
var fails = __webpack_require__(44);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5);
		//endregion

		return {
			SMALL: {
				value: 'SMALL',
				cssStyle: 'media__icon media__small-icon',
				label: msg.MEDIA_SMALL
			},
			MEDIUM: {
				value: 'MEDIUM',
				cssStyle: 'media__icon media__medium-icon',
				label: msg.MEDIA_MEDIUM
			},
			LARGE: {
				value: 'LARGE',
				cssStyle: 'media__icon media__large-icon',
				label: msg.MEDIA_LARGE
			},
			EXTRA_LARGE: {
				value: 'EXTRA_LARGE',
				cssStyle: 'media__icon media__extra-large-icon',
				label: msg.MEDIA_EXTRA_LARGE
			},
			ALL: {
				value: 'ALL',
				cssStyle: 'media__icon media__all-icon',
				label: msg.MEDIA_ALL
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0),
		    DotExpressionResolver = __webpack_require__(23);

		//endregion

		return Class.subClass({}, {
			eventControl: null,
			init: function init(globalScope) {
				this.scopes = globalScope ? [globalScope] : [];
				this.values = {};
			},

			clearValues: function clearValues() {
				this.values = {};
			},
			setValue: function setValue(name, value) {
				this.values[name] = value;
			},

			getAttributes: function getAttributes() {
				return [];
			},

			getFilterAttributes: function getFilterAttributes() {
				return [];
			},

			getValue: function getValue(name) {
				var value = DotExpressionResolver.getPCSCompatibleValue(this.values, name);
				_.each(this.scopes, function (scope) {
					if (_.isUndefined(value)) {
						value = scope.getValue(name);
					}
				});
				return value;
			},

			getRootType: function getRootType() {
				return this.rootType;
			},

			getFilterRootType: function getFilterRootType() {
				return this.filterRootType;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    Class = __webpack_require__(3),
		    Style = __webpack_require__(202),
		    StyleImportant = ' !important';

		//endregion

		return Class.subClass({}, {

			init: function init() {},
			getAllStyles: function getAllStyles(container, properties) {
				var styles = [];
				var styleMap = container.getStyleMapper();
				// Check if the control type is present in the mapper.
				/* istanbul ignore else*/
				if (styleMap) {
					var groupStyles = _.groupBy(styleMap, 'group');

					_.each(groupStyles, function (groupStyle, group) {
						_.each(groupStyle, function (styleType) {
							var colCount = group === 'undefined' ? 12 : Math.ceil(12 / groupStyle.length),
							    preloadedValue;
							if (properties.formattedStyle) {
								preloadedValue = properties.formattedStyle[styleType.name];
							}
							styleType.computedClass = 'pcs-forms-col oj-sm-' + colCount;
							styles.push(new Style(container.id, styleType, preloadedValue));
						}, this);
					}, this);
				}
				return ko.observableArray(styles);
			},
			getParsedStyle: function getParsedStyle(control) {
				return ko.computed(function () {
					var styles = ko.utils.unwrapObservable(control.styles),
					    parsedStyle = '';

					styles.forEach(function (style) {
						var value = ko.utils.unwrapObservable(style.rawValue);
						value = value instanceof Array ? value[0] : value;
						if (style.type.styleType === 'inline' && !_.isUndefined(value) && !_.isNull(value) && value !== '' && value !== style.type.default) {
							if (!_.isUndefined(style.type.important) && style.type.important) {
								parsedStyle += style.type.attrName + ':' + value + StyleImportant + ';';
							} else {
								parsedStyle += style.type.attrName + ':' + value + ';';
							}
						}
					});
					return parsedStyle;
				}, control);
			},
			getFormattedStyle: function getFormattedStyle(control) {
				return ko.computed(function () {
					var styles = ko.utils.unwrapObservable(control.styles),
					    formattedStyle = {};

					styles.forEach(function (style) {
						var value = ko.utils.unwrapObservable(style.rawValue);
						value = value instanceof Array ? value[0] : value;

						if (!_.isEmpty(value) && (style.type.useIfDefault || value !== style.type.default)) {
							formattedStyle[style.type.name] = value;
						}
					});
					return formattedStyle;
				}, control);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1);

		//endregion

		return Class.subClass({}, {
			init: function init(id, type, value) {
				this.type = type;
				this.domId = id + type.name;

				// Value that is assigned from the property inspector.
				this.rawValue = ko.observable(value || '');

				// Value that is used to display on the property inspector (need to display default value, if present).
				this.value = ko.computed({
					read: function read() {
						// return the default value (if present), if actualValue is not present.
						return this.rawValue() || type.default;
					},
					write: function write(value) {
						if (value !== null && value !== undefined) {
							this.rawValue(value);
						}
					},
					owner: this
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var InputControlDefinition = __webpack_require__(112),
		    RegisterCustomControls = __webpack_require__(204),
		    ControlDefinition = __webpack_require__(74),
		    ControlTypeId = __webpack_require__(4),
		    TypeCatalog = __webpack_require__(24),
		    FormControlDefinition = __webpack_require__(252);
		//end region

		var Controls = {
			'INPUT_TEXT': new InputControlDefinition(ControlTypeId.INPUT_TEXT, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererTextControl'),
			'TEXT_AREA': new InputControlDefinition(ControlTypeId.TEXT_AREA, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererTextAreaControl'),
			'BUTTON': new ControlDefinition(ControlTypeId.BUTTON, 'rendererButtonControl'),
			'SELECT': new InputControlDefinition(ControlTypeId.SELECT, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererSelectControl'),
			'CHECKLIST': new InputControlDefinition(ControlTypeId.CHECKLIST, TypeCatalog.getArrayType(TypeCatalog.getSimpleTypesDefinitions().STRING), 'rendererChecklistControl'),
			'CHECKBOX': new InputControlDefinition(ControlTypeId.CHECKBOX, TypeCatalog.getSimpleTypesDefinitions().BOOLEAN, 'rendererCheckboxControl'),
			'RADIO_BUTTON': new InputControlDefinition(ControlTypeId.RADIO_BUTTON, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererRadioButtonControl'),
			'NUMBER': new InputControlDefinition(ControlTypeId.NUMBER, TypeCatalog.getSimpleTypesDefinitions().NUMBER, 'rendererNumberControl'),
			'DATE': new InputControlDefinition(ControlTypeId.DATE, TypeCatalog.getSimpleTypesDefinitions().DATE, 'rendererDateControl'),
			'TIME': new InputControlDefinition(ControlTypeId.TIME, TypeCatalog.getSimpleTypesDefinitions().TIME, 'rendererTimeControl'),
			'DATE_TIME': new InputControlDefinition(ControlTypeId.DATE_TIME, TypeCatalog.getSimpleTypesDefinitions().DATE_TIME, 'rendererDateTimeControl'),
			'EMAIL': new InputControlDefinition(ControlTypeId.EMAIL, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererEmailControl'),
			'URL': new InputControlDefinition(ControlTypeId.URL, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererUrlControl'),
			'MESSAGE': new InputControlDefinition(ControlTypeId.MESSAGE, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererMessageControl'),
			'LINK': new InputControlDefinition(ControlTypeId.LINK, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererLinkControl'),
			'MONEY': new InputControlDefinition(ControlTypeId.MONEY, TypeCatalog.getSimpleTypesDefinitions().NUMBER, 'rendererMoneyControl'),
			'PHONE': new InputControlDefinition(ControlTypeId.PHONE, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererPhoneControl'),
			'IMAGE': new InputControlDefinition(ControlTypeId.IMAGE, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererImageControl'),
			'VIDEO': new InputControlDefinition(ControlTypeId.VIDEO, TypeCatalog.getSimpleTypesDefinitions().STRING, 'rendererVideoControl'),
			'IDENTITY_BROWSER': new InputControlDefinition(ControlTypeId.IDENTITY_BROWSER, TypeCatalog.getArrayType(TypeCatalog.getSimpleTypesDefinitions().STRING), 'rendererIdentityControl'),
			'PANEL': new ControlDefinition(ControlTypeId.PANEL, 'rendererPanelControl'),
			'SECTION': new ControlDefinition(ControlTypeId.SECTION, 'rendererSectionControl'),
			'TAB': new ControlDefinition(ControlTypeId.TAB, 'rendererTabControl'),
			'TAB_CONTAINER': new ControlDefinition(ControlTypeId.TAB_CONTAINER, 'rendererTabContainerControl'),
			'REPEATABLE_SECTION': new InputControlDefinition(ControlTypeId.REPEATABLE_SECTION, TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().STRING), 'rendererRepeatableSectionControl'),
			'STRING_REPEATABLE_SECTION': new InputControlDefinition(ControlTypeId.REPEATABLE_SECTION, TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().STRING), 'rendererRepeatableSectionControl'),
			'NUMBER_REPEATABLE_SECTION': new InputControlDefinition(ControlTypeId.REPEATABLE_SECTION, TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().NUMBER), 'rendererRepeatableSectionControl'),
			'BOOLEAN_REPEATABLE_SECTION': new InputControlDefinition(ControlTypeId.REPEATABLE_SECTION, TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().BOOLEAN), 'rendererRepeatableSectionControl'),
			'DATE_REPEATABLE_SECTION': new InputControlDefinition(ControlTypeId.REPEATABLE_SECTION, TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().DATE), 'rendererRepeatableSectionControl'),
			'TIME_REPEATABLE_SECTION': new InputControlDefinition(ControlTypeId.REPEATABLE_SECTION, TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().TIME), 'rendererRepeatableSectionControl'),
			'DATE_TIME_REPEATABLE_SECTION': new InputControlDefinition(ControlTypeId.REPEATABLE_SECTION, TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().DATE_TIME), 'rendererRepeatableSectionControl'),
			'TABLE': new InputControlDefinition(ControlTypeId.TABLE, TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().STRING), 'rendererTableControl'),
			'TABLE_COLUMN': new ControlDefinition(ControlTypeId.TABLE_COLUMN, ''),
			/**
    * @param reference {Object} instance of Reference.js
    * @param handler {Object} instance of Handler.js
    * @returns {FormControlDefinition}
    */
			'FORM_REFERENCE': function FORM_REFERENCE(reference, handler) {
				return new FormControlDefinition(ControlTypeId.FORM_REFERENCE, reference, handler, 'rendererFormReferenceControl');
			},
			'ENUM_SELECT': new InputControlDefinition(ControlTypeId.ENUM_SELECT, TypeCatalog.getSimpleTypesDefinitions().NUMBER, 'rendererSelectControl')
		};

		RegisterCustomControls.init(Controls);

		return Controls;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var CustomControlDefinition = __webpack_require__(205),
		    CustomControlList = __webpack_require__(75);

		//endregion

		return {
			init: function init(controlList) {
				controlList[CustomControlList.RICH_TEXT_EDITOR.id] = new CustomControlDefinition(CustomControlList.RICH_TEXT_EDITOR);
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDefinition = __webpack_require__(74),
		    TypeCatalog = __webpack_require__(24),
		    _ = __webpack_require__(0),
		    oj = __webpack_require__(7),
		    ko = __webpack_require__(1);
		//endregion
		__webpack_require__(120);

		oj.koStringTemplateEngine.install();
		return ControlDefinition.subClass({}, {

			/*jshint maxparams: 6 */
			init: function init(customControlEntry) {
				this._super(customControlEntry.id, customControlEntry.templateName);
				this.customControlEntry = customControlEntry;
				if (customControlEntry.dataType) {
					this.dataType = TypeCatalog.getSimpleTypesDefinitions()[customControlEntry.dataType];
				}

				ko.templates[customControlEntry.templateName] = customControlEntry.template;
			},
			properties: function properties() {
				return _.extend(this._super(), {
					dataType: this.dataType
				});
			},
			isBindable: function isBindable() {
				return !!this.dataType;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    StringType = __webpack_require__(113),
		    NumberType = __webpack_require__(207),
		    BooleanType = __webpack_require__(208),
		    DateType = __webpack_require__(209),
		    TimeType = __webpack_require__(210),
		    DateTimeType = __webpack_require__(211),
		    ArrayType = __webpack_require__(212),
		    EnumType = __webpack_require__(213),
		    ObjectType = __webpack_require__(115),
		    ObjectTypeRef = __webpack_require__(117),
		    UnknownType = __webpack_require__(214);
		//endregion

		return Class.subClass({

			createStringType: function createStringType(name) {
				return new StringType(name);
			},

			createNumberType: function createNumberType(name) {
				return new NumberType(name);
			},

			createBooleanType: function createBooleanType(name) {
				return new BooleanType(name);
			},

			createDateType: function createDateType(name) {
				return new DateType(name);
			},

			createTimeType: function createTimeType(name) {
				return new TimeType(name);
			},

			createDateTimeType: function createDateTimeType(name) {
				return new DateTimeType(name);
			},

			createArrayType: function createArrayType(name, itemType, items) {
				return new ArrayType(name, itemType, items);
			},

			createEnumType: function createEnumType(name, items) {
				return new EnumType(name, items);
			},

			createObjectType: function createObjectType(qname, name, attributes) {
				return new ObjectType(qname, name, attributes);
			},

			createObjectTypeRef: function createObjectTypeRef(ref, name) {
				return new ObjectTypeRef(ref, name);
			},

			createUnknownType: function createUnknownType(schema) {
				return new UnknownType(schema);
			}

		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SimpleType = __webpack_require__(38),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return SimpleType.subClass({}, {
			init: function init(name) {
				this._super(name, 'Number', '', 'number', '');
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.NUMBER;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SimpleType = __webpack_require__(38),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return SimpleType.subClass({}, {
			init: function init(name) {
				this._super(name, 'Boolean', '', 'boolean', '');
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.BOOLEAN;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SimpleType = __webpack_require__(38),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return SimpleType.subClass({}, {
			init: function init(name) {
				this._super(name, 'Date', '', 'string', 'date');
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.DATE;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SimpleType = __webpack_require__(38),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return SimpleType.subClass({}, {
			init: function init(name) {
				this._super(name, 'Time', '', 'string', 'time');
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.TIME;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SimpleType = __webpack_require__(38),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return SimpleType.subClass({}, {
			init: function init(name) {
				this._super(name, 'Date Time', '', 'string', 'date-time');
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.DATE_TIME;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var DataType = __webpack_require__(39),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    ControlTypeId = __webpack_require__(4),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return DataType.subClass({}, {
			init: function init(name, itemType, items) {
				this._super(this.getTypeName() + '#' + itemType.id(), name, itemType.label() + ' [ ]', '', {
					type: 'array',
					items: items || itemType.schema()
				});

				this.itemType = ko.observable(itemType);

				if (this.itemType().isObject()) {
					this.attributes = ko.pureComputed(function () {
						return this.itemType().attributes();
					}.bind(this));
				}
			},
			isCompatible: function isCompatible(data) {
				return data.isArray() && this.itemType().isCompatible(data.itemType());
			},
			isArray: function isArray() {
				return true;
			},
			isObject: function isObject() {
				return this.itemType().isObject();
			},
			isContainer: function isContainer() {
				return true;
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.ARRAY;
			},
			/* jshint maxcomplexity: 8 */
			getDefaultControl: function getDefaultControl() {
				if (this.itemType().isObject()) {
					return ControlTypeId.REPEATABLE_SECTION;
				} else {
					var typeId = ControlTypeId.REPEATABLE_SECTION;
					switch (this.itemType().id()) {
						case 'STRING':
							typeId = ControlTypeId.STRING_REPEATABLE_SECTION;
							break;
						case 'NUMBER':
							typeId = ControlTypeId.NUMBER_REPEATABLE_SECTION;
							break;
						case 'BOOLEAN':
							typeId = ControlTypeId.BOOLEAN_REPEATABLE_SECTION;
							break;
						case 'DATE':
							typeId = ControlTypeId.DATE_REPEATABLE_SECTION;
							break;
						case 'TIME':
							typeId = ControlTypeId.TIME_REPEATABLE_SECTION;
							break;
						case 'DATE_TIME':
							typeId = ControlTypeId.DATE_TIME_REPEATABLE_SECTION;
							break;
						default:
							typeId = ControlTypeId.REPEATABLE_SECTION;
					}
					return typeId;
				}
			},
			//        getDefaultControl: function() {
			//            return TypeDescription.getControlForArray(this.itemType().getTypeDescription());
			//        },
			removeAttribute: function removeAttribute(attributeName) {
				this.itemType(undefined);
			},
			schema: function schema() {
				var schema = this._super();

				if (this.itemType().isObject()) {
					var properties = {};
					_.each(this.attributes(), function (attribute) {
						properties[attribute.name()] = attribute.toJS();
					}, this);
					schema.items.properties = properties;
				}
				return schema;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var DataType = __webpack_require__(39),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return DataType.subClass({}, {
			init: function init(name, items, dataType) {
				var id = this.getTypeName();
				this._super(id, name, 'Enum', '', {
					enum: items
				});
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.ENUM;
			},
			isCompatible: function isCompatible(data) {
				return data.isEnum();
			},
			isEnum: function isEnum() {
				return true;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var DataType = __webpack_require__(39),
		    ko = __webpack_require__(1),
		    TypeDescription = __webpack_require__(13);
		//endregion

		return DataType.subClass({}, {
			init: function init(schema) {
				this._super(this.getTypeName(), 'Unknown', 'Unknown', '', schema);
				this.attributes = ko.observable([]);
			},
			getTypeDescription: function getTypeDescription() {
				return TypeDescription.UNKNOWN;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ParseStrategy = __webpack_require__(119),
		    DoNotResolveRefStrategy = __webpack_require__(118);
		//endregion

		var DEFAULT_DEPTH = 2;

		return ParseStrategy.subClass({}, {
			init: function init(depth) {
				this.depth = depth || DEFAULT_DEPTH;
				this.objectsCache = {};
			},
			/** @override */
			resolveReference: function resolveReference($ref, parser) {
				return parser._doResolveReference(parser.getObjectTypesRefs()[$ref], this);
			},
			/** @override */
			getObjectType: function getObjectType(schema, parser) {
				return this.createObjectType(schema, parser.getObjectTypes()[schema.$id].name(), parser);
			},
			/** @override */
			createObjectType: function createObjectType(schema, objectName, parser) {
				this.cacheObject(schema.$id);
				if (this.depth >= this.objectsCache[schema.$id]) {
					return parser._createObjectType(schema, objectName, this);
				} else {
					return parser._createObjectType(schema, objectName, new DoNotResolveRefStrategy());
				}
			},
			cacheObject: function cacheObject($id) {
				if (this.objectsCache[$id]) {
					this.objectsCache[$id]++;
				} else {
					this.objectsCache[$id] = 1;
				}
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		var StringType = __webpack_require__(113),
		    ObjectType = __webpack_require__(115);

		var identityObject = new ObjectType('IdentityBrowser', 'IdentityBrowser', []);
		var identityProperties = {
			id: new StringType(),
			title: new StringType(),
			firstName: new StringType(),
			lastName: new StringType(),
			type: new StringType(),
			email: new StringType(),
			mobile: new StringType()
		};

		for (var key in identityProperties) {
			/* istanbul ignore else */
			if (identityProperties.hasOwnProperty(key)) {
				identityObject.addAttribute(key, identityProperties[key]);
			}
		}

		return identityObject;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 217 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n<help-icon data-bind=\"visible: help().length > 0\" params=\"msg: help\"></help-icon>\n<textarea data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, style: parsedStyle},\n                    ckEditor: {\n                        value: $parent.getValueObservable(),\n                        readOnly: $parent.readOnly() || readonly(),\n                        disableUndo: $parent.isInBuilder,\n                        required: required,\n                        control: $parent\n                    }, handleEvents: $parent\"></textarea>\n<!-- /ko -->";

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    assert = __webpack_require__(59),
		    Value = __webpack_require__(15),
		    _ = __webpack_require__(0);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: '',
			ACCESSOR: '',
			createPropertyAction: function createPropertyAction(actionName, accessor) {
				return this.subClass({
					ACTION_NAME: actionName,
					ACCESSOR: accessor
				}, {
					init: function init(model, viewModel, scope, control) {
						this._super(model, viewModel, scope, control);
					}
				});
			}
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
				assert(this._class.ACCESSOR.length > 0, 'SetPropertyAction class is abstract');

				var defaultValue = control ? control.properties[this._class.ACCESSOR]() : null;

				this.value = new Value(model.value || {
					expression: defaultValue,
					controlResolver: {}
				}, viewModel, this.scope);
			},

			template: function template() {
				return 'valueAccessorEventTemplate';
			},

			execute: function execute(control) {
				control.properties[this._class.ACCESSOR](this.value.resolve(this.viewModel));
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					value: this.value.toJS()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16),
		    msg = __webpack_require__(5);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'IDENTITY_VALUE',
			label: msg.IDENTITY_VALUE,
			init: function init() {},
			getValue: function getValue(control) {
				return control.getIdentityValue();
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16);
		var msg = __webpack_require__(5);
		var StyleTypeId = __webpack_require__(47);
		var _ = __webpack_require__(0);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'HAS_CLASS',
			label: msg.HAS_CLASS,
			init: function init() {},
			template: function template() {
				return 'classValueAccessorTemplate';
			},
			params: 1,
			getValue: function getValue(control, className) {
				var style = _.find(control.styles(), function (s) {
					return s.type.name === StyleTypeId.CLASS_NAME.name;
				}, this);
				var classes = style.value().split(' ');
				return _.contains(classes, className);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16);
		var msg = __webpack_require__(5);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'IS_VALID',
			label: msg.IS_VALID,
			init: function init() {},
			getValue: function getValue(control) {
				control.viewModel.validateData();
				return control.isValid();
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16);
		var msg = __webpack_require__(5);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'SELECTED',
			label: msg.SELECTED,
			init: function init() {},
			getValue: function getValue(control) {
				var parent = control.viewModel.form().findControlAndParent(control.id).parent;
				var index = parent.controls().indexOf(control);
				return parent.properties.selectedPosition() === index;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlValueProperty = __webpack_require__(60);
		var msg = __webpack_require__(5);

		//endregion

		return ControlValueProperty.subClass({}, {
			value: 'VIDEO_SRC',
			label: msg.LABEL_SOURCE_URL,
			init: function init() {}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlValueProperty = __webpack_require__(60);
		var msg = __webpack_require__(5);

		//endregion

		return ControlValueProperty.subClass({}, {
			value: 'IMAGE_URL',
			label: msg.IMAGE_URL,
			init: function init() {}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16),
		    msg = __webpack_require__(5);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'OPTIONS',
			label: msg.OPTIONS,
			init: function init() {},
			getValue: function getValue(control) {
				return control.properties.computedOptions();
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16),
		    _ = __webpack_require__(0),
		    msg = __webpack_require__(5);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'INDEX',
			label: msg.INDEX,
			init: function init() {},
			getValue: function getValue(control) {
				return _.isUndefined(control.indexBeforeRemove) ? control.getParent().dataSource().indexOf(control) : control.indexBeforeRemove;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16),
		    msg = __webpack_require__(5);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'ROW_COUNT',
			label: msg.ROW_COUNT,
			init: function init() {},
			getValue: function getValue(control) {
				return control.getRows().length;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16),
		    _ = __webpack_require__(0),
		    msg = __webpack_require__(5);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'SELECTED_LABEL',
			label: msg.SELECTED_LABEL,
			init: function init() {},
			_findLabel: function _findLabel(control, value) {
				var selectedOption = _.find(control.properties.computedOptions(), function (option) {
					return option.value === value;
				});
				return selectedOption ? selectedOption.label : '';
			},
			getValue: function getValue(control) {
				var value = control.getControlValue();
				if (_.isArray(value)) {
					return _.map(value, function (val) {
						return this._findLabel(control, val);
					}, this);
				} else {
					return this._findLabel(control, value);
				}
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlProperty = __webpack_require__(16),
		    EventsId = __webpack_require__(14),
		    msg = __webpack_require__(5);

		//endregion

		return ControlProperty.subClass({}, {
			value: 'OUTCOME',
			label: msg.OUTCOME,
			eventTriggers: [EventsId.ON_SUBMIT.value],
			init: function init() {},
			getValue: function getValue(form) {
				return form.outcomeType;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlValueProperty = __webpack_require__(60);
		var msg = __webpack_require__(5);

		//endregion

		return ControlValueProperty.subClass({}, {
			value: 'MESSAGE',
			label: msg.MESSAGE,
			init: function init() {}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5),
		    UUID = __webpack_require__(17),
		    StringUtils = __webpack_require__(32),
		    _ = __webpack_require__(0);
		//endregion

		var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
		function getISOString() {
			//Correct the time by the timezone offset, as the ISO String, that oj uses, is in UTC+0
			return new Date(Date.now() - tzoffset).toISOString();
		}

		function currentTime() {
			return getISOString().slice(10, 19);
		}

		function currentDate() {
			return getISOString().slice(0, 10);
		}

		var timeParseRegex = /(\d{4}-\d{2}-\d{2})?(T?\d{2}:\d{2}:\d{2})?/;

		function parseTime(timeString) {
			var matches = StringUtils._makeString(timeString).match(timeParseRegex);
			var time = {
				date: matches[1] || currentDate(),
				time: matches[2] || currentTime()
			};
			return new Date('' + time.date + time.time);
		}

		function applyToArray(array, applyFunction) {
			_.each(array, function (number) {
				if (_.isArray(number)) {
					applyToArray(number, applyFunction);
				} else {
					applyFunction(number);
				}
			});
		}

		function fixedNumber(number) {
			return parseFloat(number.toFixed(10));
		}

		var FunctionsMap = {
			'CREATE_UUID': {
				value: 'CREATE_UUID',
				label: msg.CREATE_UUID,
				resolve: function resolve() {
					return UUID.createUuid();
				},
				params: [],
				category: 'FUNCTIONS_OTHER'
			},
			'CURRENT_DATE': {
				value: 'CURRENT_DATE',
				label: msg.CURRENT_DATE,
				resolve: function resolve() {
					return currentDate();
				},
				params: [],
				category: 'FUNCTIONS_DATE'
			},
			'CURRENT_TIME': {
				value: 'CURRENT_TIME',
				label: msg.CURRENT_TIME,
				resolve: function resolve() {
					return currentTime();
				},
				params: [],
				category: 'FUNCTIONS_DATE'
			},
			'CURRENT_DATE_TIME': {
				value: 'CURRENT_DATE_TIME',
				label: msg.CURRENT_DATE_TIME,
				resolve: function resolve() {
					return getISOString().slice(0, 19);
				},
				params: [],
				category: 'FUNCTIONS_DATE'
			},
			'NOT': {
				value: 'NOT',
				label: msg.NOT,
				resolve: function resolve(booleanValue) {
					return !booleanValue;
				},
				params: [{
					type: 'BOOL'
				}],
				category: 'FUNCTIONS_LOGIC'
			},
			'TERNARY': {
				value: 'TERNARY',
				label: msg.INLINE_IF,
				resolve: function resolve(condition, ifValue, elseValue) {
					return condition ? ifValue : elseValue;
				},
				params: [{
					type: 'BOOL'
				}, {
					type: 'ANY'
				}, {
					type: 'ANY'
				}],
				category: 'FUNCTIONS_LOGIC'
			},
			'SIMPLE_SUM': {
				value: 'SIMPLE_SUM',
				label: msg.SUM,
				resolve: function resolve(a, b) {
					var valueA = parseFloat(a),
					    valueB = parseFloat(b);
					return fixedNumber(valueA + valueB);
				},
				params: [{
					type: 'NUMBER'
				}, {
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_MATH'
			},
			'SUM': {
				value: 'SUM',
				label: msg.SUMMATION,
				resolve: function resolve() {
					var sum = 0;
					applyToArray(arguments, function (number) {
						sum = fixedNumber(sum + parseFloat(number));
					});
					return sum;
				},
				multipleParams: true,
				params: [{
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_MATH'
			},
			'SUB': {
				value: 'SUB',
				label: msg.SUB,
				resolve: function resolve(a, b) {
					var valueA = parseFloat(a),
					    valueB = parseFloat(b);
					return fixedNumber(valueA - valueB);
				},
				params: [{
					type: 'NUMBER'
				}, {
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_MATH'
			},
			'MULTIPLY': {
				value: 'MULTIPLY',
				label: msg.MULTIPLY,
				resolve: function resolve() {
					var val = 1;
					applyToArray(arguments, function (number) {
						var value = parseFloat(number);
						val = fixedNumber(val * value);
					});
					return val;
				},
				multipleParams: true,
				params: [{
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_MATH'
			},
			'DIVISION': {
				value: 'DIVISION',
				label: msg.DIVISION,
				resolve: function resolve(a, b) {
					var valueA = parseFloat(a),
					    valueB = parseFloat(b);
					return fixedNumber(valueA / valueB);
				},
				params: [{
					type: 'NUMBER'
				}, {
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_MATH'
			},
			'INTEGER_DIVISION': {
				value: 'INTEGER_DIVISION',
				label: msg.INTEGER_DIVISION,
				resolve: function resolve(a, b) {
					var val = FunctionsMap.DIVISION.resolve(a, b);
					if (val < 0) {
						return Math.ceil(val);
					}
					return Math.floor(val);
				},
				params: [{
					type: 'NUMBER'
				}, {
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_MATH'
			},
			'MOD': {
				value: 'MOD',
				label: msg.MODULO,
				resolve: function resolve(a, b) {
					var valueA = parseFloat(a),
					    valueB = parseFloat(b);
					return fixedNumber(valueA % valueB);
				},
				params: [{
					type: 'NUMBER'
				}, {
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_MATH'
			},
			'MIN': {
				value: 'MIN',
				label: msg.MIN,
				resolve: function resolve() {
					var min = Number.MAX_VALUE;
					applyToArray(arguments, function (number) {
						min = Math.min(min, number);
					});
					return min;
				},
				multipleParams: true,
				params: [{
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_ARRAY'
			},
			'MAX': {
				value: 'MAX',
				label: msg.MAX,
				resolve: function resolve() {
					var max = Number.MIN_VALUE;
					applyToArray(arguments, function (number) {
						max = Math.max(max, number);
					});
					return max;
				},
				multipleParams: true,
				params: [{
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_ARRAY'
			},
			'COUNT': {
				value: 'COUNT',
				label: msg.COUNT,
				resolve: function resolve() {
					var count = 0;
					applyToArray(arguments, function () {
						count++;
					});
					return count;
				},
				multipleParams: true,
				allowComplex: true,
				params: [{
					type: 'ANY'
				}],
				category: 'FUNCTIONS_ARRAY'
			},
			'AVERAGE': {
				value: 'AVERAGE',
				label: msg.AVERAGE,
				resolve: function resolve() {
					var sum = 0,
					    count = 0;
					applyToArray(arguments, function (number) {
						var value = parseFloat(number);
						sum = fixedNumber(sum + value);
						count++;
					});
					if (count > 0) {
						return fixedNumber(sum / count);
					}
					return 0;
				},
				multipleParams: true,
				params: [{
					type: 'NUMBER'
				}],
				category: 'FUNCTIONS_ARRAY'
			},
			'CONCAT': {
				value: 'CONCAT',
				label: msg.CONCAT,
				resolve: function resolve() {
					var text = '';
					applyToArray(arguments, function (moreText) {
						text += moreText;
					});
					return text;
				},
				multipleParams: true,
				params: [{
					type: 'STRING'
				}],
				category: 'FUNCTIONS_TEXT'
			},
			'SPLIT': {
				value: 'SPLIT',
				label: msg.SPLIT,
				resolve: function resolve(text, splitter) {
					return StringUtils._makeString(text).split(StringUtils._makeString(splitter));
				},
				params: [{
					type: 'STRING'
				}, {
					type: 'STRING'
				}],
				category: 'FUNCTIONS_TEXT'
			},
			'JOIN': {
				value: 'JOIN',
				label: msg.JOIN,
				resolve: function resolve(array, joint) {
					if (!_.isArray(array)) {
						array = [array];
					}
					return array.join(StringUtils._makeString(joint));
				},
				params: [{
					type: 'STRING'
				}, {
					type: 'STRING'
				}],
				category: 'FUNCTIONS_TEXT'
			},
			'TO_LOWERCASE': {
				value: 'TO_LOWERCASE',
				label: msg.TO_LOWERCASE,
				resolve: function resolve(a) {
					return StringUtils._makeString(a).toLowerCase();
				},
				params: [{
					type: 'STRING'
				}],
				category: 'FUNCTIONS_TEXT'
			},
			'TO_UPPERCASE': {
				value: 'TO_UPPERCASE',
				label: msg.TO_UPPERCASE,
				resolve: function resolve(a) {
					return StringUtils._makeString(a).toUpperCase();
				},
				params: [{
					type: 'STRING'
				}],
				category: 'FUNCTIONS_TEXT'
			},
			'LENGTH': {
				value: 'LENGTH',
				label: msg.LENGTH,
				resolve: function resolve(a) {
					return _.size(StringUtils._makeString(a));
				},
				params: [{
					type: 'STRING'
				}],
				category: 'FUNCTIONS_TEXT'
			},
			'TRIM': {
				value: 'TRIM',
				label: msg.TRIM,
				resolve: function resolve(a) {
					return StringUtils.trim(a);
				},
				params: [{
					type: 'STRING'
				}],
				category: 'FUNCTIONS_TEXT'
			},
			'CONTAINS': {
				value: 'CONTAINS',
				label: msg.CONTAINS,
				resolve: function resolve(a, b) {
					if (!a || !a.indexOf) {
						a = StringUtils._makeString(a);
					}
					return a.indexOf(b) > -1;
				},
				params: [{
					type: 'STRING'
				}, {
					type: 'STRING'
				}],
				category: 'FUNCTIONS_TEXT'
			},
			'REPLACE': {
				value: 'REPLACE',
				label: msg.REPLACE,
				resolve: function resolve(str, search, replacement) {
					str = (str || '').toString();
					search = new RegExp((search || '').toString(), 'g');
					replacement = (replacement || '').toString();
					return str.replace(search, replacement);
				},
				params: [{
					type: 'STRING'
				}, {
					type: 'STRING'
				}, {
					type: 'STRING'
				}],
				category: 'FUNCTIONS_TEXT'
			},
			'DURATION_MINUTES': {
				value: 'DURATION_MINUTES',
				label: msg.DURATION_MINUTES,
				resolve: function resolve(a, b) {
					var date1 = parseTime(a);
					var date2 = parseTime(b);
					var timeDiff = Math.abs(date2.getTime() - date1.getTime());
					return Math.ceil(timeDiff / (1000 * 60)); //It makes more sense to return as a number, so it can be used in computations
				},
				params: [{
					type: 'DATETIME'
				}, {
					type: 'DATETIME'
				}],
				category: 'FUNCTIONS_INTERVAL'
			},
			'DURATION_HOURS': {
				value: 'DURATION_HOURS',
				label: msg.DURATION_HOURS,
				resolve: function resolve(a, b) {
					var date1 = parseTime(a);
					var date2 = parseTime(b);
					var timeDiff = Math.abs(date2.getTime() - date1.getTime());
					return Math.ceil(timeDiff / (1000 * 3600)); //It makes more sense to return as a number, so it can be used in computations
				},
				params: [{
					type: 'DATETIME'
				}, {
					type: 'DATETIME'
				}],
				category: 'FUNCTIONS_INTERVAL'
			},
			'DURATION_DAYS': {
				value: 'DURATION_DAYS',
				label: msg.DURATION_DAYS,
				resolve: function resolve(a, b) {
					var date1 = new Date(a);
					var date2 = new Date(b);
					var timeDiff = Math.abs(date2.getTime() - date1.getTime());
					return Math.ceil(timeDiff / (1000 * 3600 * 24)); //It makes more sense to return as a number, so it can be used in computations
				},
				params: [{
					type: 'DATETIME'
				}, {
					type: 'DATETIME'
				}],
				category: 'FUNCTIONS_INTERVAL'
			},
			'DURATION_MONTHS': {
				value: 'DURATION_MONTHS',
				label: msg.DURATION_MONTHS,
				resolve: function resolve(a, b) {
					var date1 = new Date(a);
					var date2 = new Date(b);
					var d1Y = date1.getFullYear();
					var d2Y = date2.getFullYear();
					var d1M = date1.getMonth();
					var d2M = date2.getMonth();
					return Math.abs(d2M + 12 * d2Y - (d1M + 12 * d1Y)); //It makes more sense to return as a number, so it can be used in computations
				},
				params: [{
					type: 'DATETIME'
				}, {
					type: 'DATETIME'
				}],
				category: 'FUNCTIONS_INTERVAL'
			},
			'DURATION_YEARS': {
				value: 'DURATION_YEARS',
				label: msg.DURATION_YEARS,
				resolve: function resolve(a, b) {
					var date1 = new Date(a);
					var date2 = new Date(b);
					return Math.abs(date2.getFullYear() - date1.getFullYear()); //It makes more sense to return as a number, so it can be used in computations
				},
				params: [{
					type: 'DATETIME'
				}, {
					type: 'DATETIME'
				}],
				category: 'FUNCTIONS_INTERVAL'
			}
		};

		return FunctionsMap;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    assert = __webpack_require__(59);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: '',
			ACCESSOR: '',
			VALUE: false,
			createStateAction: function createStateAction(actionName, accessor, value) {
				return this.subClass({
					ACTION_NAME: actionName,
					ACCESSOR: accessor,
					VALUE: value
				}, {
					init: function init(model, viewModel, scope, control) {
						this._super(model, viewModel, scope, control);
					}
				});
			}
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
				assert(this._class.ACCESSOR.length > 0, 'SetPropertyAction class is abstract');
			},

			execute: function execute(control) {
				control.properties[this._class.ACCESSOR](this._class.VALUE);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Value = __webpack_require__(15),
		    SetValueAction = __webpack_require__(48),
		    ko = __webpack_require__(1);

		//endregion

		return SetValueAction.subClass({
			ACTION_NAME: 'LABEL_BINDING'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);

				var defaultLabel = control ? ko.utils.unwrapObservable(control.properties.defaultLabel) : null;
				var controlId = control ? control.id : null;

				this.value = new Value(model.value || {
					expression: defaultLabel,
					controlResolver: {},
					controlId: controlId
				}, viewModel, this.scope);
			},

			execute: function execute(control) {
				control.setLabelVal(this.value.resolve(this.viewModel));
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SetValueAction = __webpack_require__(48);

		//endregion

		return SetValueAction.subClass({
			ACTION_NAME: 'IMAGE_URL'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SetValueAction = __webpack_require__(48);

		//endregion

		return SetValueAction.subClass({
			ACTION_NAME: 'VIDEO_SRC'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'SELECT'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			},

			execute: function execute(control) {
				var parent = this.viewModel.form().findControlAndParent(control.id).parent;
				var newIndex = parent.controls().indexOf(control);
				parent.properties.selectedPosition(newIndex);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'REFRESH_GLOBAL_CONNECTOR'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
				this.value = ko.observable(model.value || '');
			},

			template: function template() {
				return 'globalConnectorSelectTemplate';
			},

			execute: function execute(control) {
				var self = this;
				var id = this.value()[0];
				var connector = _.find(control.globalConnectors(), function (c) {
					return c.id === id;
				});
				return connector.execute().then(function () {
					self.viewModel.dependenciesExtension.reEvaluateOnScope(id);
				});
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					value: this.value()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SetValueAction = __webpack_require__(48);

		//endregion

		return SetValueAction.subClass({
			ACTION_NAME: 'MESSAGE'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'REFRESH_CONNECTOR'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			},

			execute: function execute(control) {
				control.refreshConnector();
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'ADD_ROW'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			},

			execute: function execute(control) {
				control.addRow();
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    Value = __webpack_require__(15),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'REPEATABLE_VALUE'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);

				var controlId = control ? control.id : null;

				this.value = new Value(model.value || {
					expression: '',
					controlResolver: {},
					controlId: controlId
				}, viewModel, this.scope);

				this.mapping = ko.observable(model.mapping || {});
			},

			component: function component() {
				return 'repeatable-value-mapping';
			},

			execute: function execute(control) {

				//Resolve the value
				var value = this.value.resolve(this.viewModel);

				/**
     * mapping is [controlId]:newValuePropertyName
     * valueMapper is [controlBinding]:newValuePropertyName
     * We need to do it this way, to provide multiple bindings to different controls
     */
				var bindings = {};
				_.each(this.mapping(), function (mapped, key) {
					if (key === control.id) {
						bindings[control.properties.labelBinding()] = mapped;
					} else {
						var childControl = control.findControl(key);
						if (childControl) {
							bindings[childControl.properties.binding()] = mapped;
						}
					}
				});

				/**
     * value is [newValuePropertyName]:value
     * mappedValue is [controlBinding]:value
     */
				var mappedValue = [];
				_.each(value, function (entry) {
					var mappedEntry = {};
					//For each property in the entry, get the mapped binding
					_.each(entry, function (v, key) {
						_.each(bindings, function (mapped, binding) {
							if (mapped === key) {
								mappedEntry[binding] = v;
							}
						});
					});
					mappedValue.push(mappedEntry);
				});

				control.setValue(mappedValue);
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					value: this.value.toJS(),
					mapping: this.mapping()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'SET_INVALID'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
				this.summary = ko.observable(model.summary || '');
				this.detail = ko.observable(model.detail || '');
			},

			template: function template() {
				return 'errorValueEventTemplate';
			},

			execute: function execute(control) {
				control.setError(this.summary(), this.detail());
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					summary: this.summary(),
					detail: this.detail()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'CLEAR_VALUE'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			},

			execute: function execute(control) {
				control.setValue('');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    Value = __webpack_require__(15),
		    ko = __webpack_require__(1),
		    OptionsType = __webpack_require__(41),
		    _ = __webpack_require__(0);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'OPTIONS'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);

				var controlId = control ? control.id : null;

				this.value = new Value(model.value || {
					expression: '',
					controlResolver: {},
					controlId: controlId
				}, viewModel, this.scope);

				this.mappingLabel = ko.observable(model.mappingLabel || '');
				this.mappingValue = ko.observable(model.mappingValue || '');
			},

			component: function component() {
				return 'repeatable-value-mapping';
			},

			execute: function execute(control) {
				//Resolve the value
				var value = this.value.resolve(this.viewModel);
				var properties = {
					optionsNames: '',
					optionsValues: '',
					defaultValue: control.properties.optionsFeed().properties.defaultValue
				};

				_.each(value, function (entry, i) {
					var label = entry,
					    value = entry;
					if (_.isObject(entry)) {
						label = entry[this.mappingLabel()] || entry.label;
						value = entry[this.mappingValue()] || entry.value;
					}
					if (i === 0) {
						properties.optionsNames = label;
						properties.optionsValues = value;
					} else {
						properties.optionsNames += '\n' + label;
						properties.optionsValues += '\n' + value;
					}
				}, this);

				var context = this.viewModel.context;
				var newOptionsResolver = context.optionsResolverFactory.createResolver(OptionsType.STATIC.value, context, properties);
				control.properties.optionsFeed().optionsResolver(newOptionsResolver);
				control.properties.optionsFeed().properties = newOptionsResolver.properties;
				control.properties.optionsFeed().type(OptionsType.STATIC);
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					value: this.value.toJS(),
					mappingLabel: this.mappingLabel(),
					mappingValue: this.mappingValue()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    Value = __webpack_require__(15),
		    ValueTypes = __webpack_require__(61),
		    _ = __webpack_require__(0);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'SET_DATA'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);

				this.dataAccessor = new Value({
					expression: model.dataAccessor || '',
					type: ValueTypes.DATA.value,
					controlResolver: {},
					controlId: null
				}, viewModel, this.scope);

				this.value = new Value(model.value || {
					expression: '',
					controlResolver: {},
					controlId: null
				}, viewModel, this.scope);
			},

			template: function template() {
				return 'setDataEventTemplate';
			},

			execute: function execute(control) {
				var dataName = this.dataAccessor.expression(),
				    newValue = this.value.resolve(this.viewModel);

				this.viewModel.context.payload().setBindingValue(dataName, newValue);
				this.viewModel.context.payloadContext.setValue(dataName, newValue);
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					dataAccessor: this.dataAccessor.expression(),
					value: this.value.toJS()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'PREVENT_SUBMIT'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			},

			execute: function execute(form) {
				form.canceledOutcome = true;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'TRIGGER_OUTCOME'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);

				this.outcome = ko.observable(model.outcome || '');
			},

			template: function template() {
				return 'outcomeValueEventTemplate';
			},

			execute: function execute(control) {
				this.viewModel.context.config().outcomeHandler.triggerOutcome(this.outcome());
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					outcome: this.outcome()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var HideColumnEventAction = __webpack_require__(123);

		//endregion

		return HideColumnEventAction.subClass({
			ACTION_NAME: 'SHOW_COLUMN'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
				this.hideBoolean = false;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(8), __webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (exports, _EventAction, _knockout, _underscore) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _EventAction2 = _interopRequireDefault(_EventAction);

	var _knockout2 = _interopRequireDefault(_knockout);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var ChangePresentationAction = _EventAction2.default.subClass({
		ACTION_NAME: 'CHANGE_PRESENTATION'
	}, {
		init: function init(model, viewModel, scope, control) {
			this._super(model, viewModel, scope, control);
			this.presentation = _knockout2.default.observable(model.presentation || '');
		},
		template: function template() {
			return 'presentationSelectTemplate';
		},
		execute: function execute(control) {
			//This will work for both the FormReferenceControl and the Presentation
			return control.changePresentation(this.presentation()[0]);
		},
		toJS: function toJS() {
			return _underscore2.default.extend({}, this._super(), {
				presentation: this.presentation()
			});
		}
	});

	exports.default = ChangePresentationAction;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: 'REMOVE_ROW'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			},

			execute: function execute(control) {
				control.getParent().removeRow(control);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    FormsLogger = __webpack_require__(20),
		    _ = __webpack_require__(0);
		//endregion

		function addValueBinding(editor, valueObservable, control) {
			//make sure that the valueObservable is an observable...
			if (!ko.isObservable(valueObservable)) {
				valueObservable = ko.observable(valueObservable);
			}
			//set the starting data
			editor.setData('' + valueObservable());

			//This are needed to avoid triggering changes with every keypress, which was resetting the cursor and wreaking havoc
			var hasFocus = false;
			var isDirty = false;
			editor.on('focus', function () {
				hasFocus = true;
				//Trigger ON_FOCUS?
			});
			editor.on('blur', function () {
				hasFocus = false;
				if (isDirty) {
					// if the editor changed while focused, save the changes at the end
					control.context.eventsQueue.clearDirtyControl(control);
					valueObservable(editor.getData());
					isDirty = false;
				}
				//Trigger ON_BLUR?
			});
			editor.on('change', function () {
				if (!hasFocus) {
					//if the editor is not focus, we can safely change the data
					valueObservable(editor.getData());
				} else {
					//otherwise, set as dirty so we save all together after the fact
					isDirty = true;
					control.context.eventsQueue.setDirtyControl(control);
				}
			});
			//Update the editor whenever the data changes
			editor.subscriptions.push(valueObservable.subscribe(function (newValue) {
				editor.setData('' + newValue);
			}));
		}

		function addReadOnlyBinding(editor, readOnly) {
			//make sure that the valueObservable is an observable...
			if (!ko.isObservable(readOnly)) {
				readOnly = ko.observable(readOnly);
			}
			var setReadOnlyFx = function setReadOnlyFx() {
				if (editor.editable()) {
					editor.setReadOnly(readOnly());
				} else {
					setTimeout(setReadOnlyFx);
				}
			};
			setTimeout(setReadOnlyFx);

			editor.subscriptions.push(readOnly.subscribe(function (newValue) {
				editor.setReadOnly(newValue);
			}));
		}

		function initCkEditor(ckEditor) {
			if (ckEditor) {
				ckEditor.config.removePlugins = 'about,maximize';
				return true;
			}
		}

		return function () {
			ko.bindingHandlers.ckEditor = {
				init: function init(element, updatedObservable, allBindings) {
					//Delay the initialization of ckEditor until the rich text editor is needed
					// this makes it possible to delay the loading of ckeditor.js
					if (initCkEditor(window['CKEDITOR'])) {
						var editor = window['CKEDITOR'].replace(element);
						if (updatedObservable().disableUndo) {
							editor.config.removePlugins += ',undo';
						}
						var control = updatedObservable().control;
						editor.subscriptions = [];
						addValueBinding(editor, updatedObservable().value, control);
						addReadOnlyBinding(editor, updatedObservable().readOnly);

						ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
							_.each(editor.subscriptions, function (sub) {
								sub.dispose();
							});
							editor.removeAllListeners();
							editor.destroy();
						});
					} else {
						FormsLogger.getLogger().error('Attempted to use RichTextEditor without loading');
					}
				}
			};
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var InputControlDefinition = __webpack_require__(112),
		    ko = __webpack_require__(1),
		    TypeCatalog = __webpack_require__(24);
		//endregion

		return InputControlDefinition.subClass({}, {

			init: function init(id, reference, formHandler, controlTemplate) {
				this._super(id, null, controlTemplate);
				this.reference = reference;
				this.formHandler = formHandler;
				var referenceProperties = this.reference.get();
				this.form = this.formHandler.getResolvedControl(referenceProperties.formId, referenceProperties.presentationId);
				this.dataType = TypeCatalog.parseTypePartially('definition', this.form.definition);
			},
			properties: function properties() {
				return ko.utils.extend(this._super(), {
					reference: this.reference,
					form: this.form,
					dataType: this.dataType
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);

		//endregion

		return Class.subClass({}, {
			init: function init(icon, hoverIcon, activeIcon) {
				this.value = icon;
				this.hover = hoverIcon;
				this.active = activeIcon;
			},
			getDataValue: function getDataValue() {
				return this.value;
			},
			getDataHover: function getDataHover() {
				return this.hover;
			},
			getDataActive: function getDataActive() {
				return this.active;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    DefaultFormHandler = __webpack_require__(124),
		    DefaultCssHandler = __webpack_require__(125),
		    DefaultTypeHandler = __webpack_require__(126),
		    DefaultRestHandler = __webpack_require__(256),
		    DefaultOutcomeHandler = __webpack_require__(129),
		    DependencyType = __webpack_require__(269),
		    TypeCatalog = __webpack_require__(24),
		    DefaultConnectorHandler = __webpack_require__(270),
		    DefaultTranslationsHandler = __webpack_require__(82),
		    _ = __webpack_require__(0);
		//endregion

		return Class.subClass({}, {
			init: function init(config) {
				config = config || {};
				var unwrappedReadOnly = ko.utils.unwrapObservable(config.readOnly); // If config.readOnly is itself a function then it should be unwrap, otherwise it keeps on wrapping in observable.
				this._initHandlers(config);
				this.selectedMedia = config.selectedMedia;
				this.convertJSON = config.convertJSON;
				this.readOnly = ko.observable(unwrappedReadOnly);
				this.disabled = ko.observable(ko.utils.unwrapObservable(config.disabled));
				this.domIdPrefix = config.domIdPrefix || '';
			},

			_initHandlers: function _initHandlers(config) {
				this.formHandler = this.isUndefined(config.formHandler);
				this.cssHandler = this.isUndefined(config.cssHandler);
				this.typeHandler = this.isUndefined(config.typeHandler);
				this.outcomeHandler = this.isUndefined(config.outcomeHandler);
				this.connectorHandler = this.isUndefined(config.connectorHandler);
				this.screenflowHandler = this.isUndefined(config.screenflowHandler);
				this.restHandler = this.isUndefined(config.restHandler);
				this.translationsHandler = this.isUndefined(config.translationsHandler);

				_.defaults(this.formHandler, DefaultFormHandler.create());
				_.defaults(this.cssHandler, DefaultCssHandler.create());
				_.defaults(this.typeHandler, DefaultTypeHandler.create());
				_.defaults(this.connectorHandler, DefaultConnectorHandler.create());
				_.defaults(this.restHandler, DefaultRestHandler.create());
				_.defaults(this.outcomeHandler, DefaultOutcomeHandler.create());
				_.defaults(this.translationsHandler, DefaultTranslationsHandler.create());

				this.formHandler.setContext(this);
				this.cssHandler.setContext(this);
				this.typeHandler.setContext(this);
				TypeCatalog.initTypes();
				TypeCatalog.typeHandler = this.typeHandler;

				this.connectorHandler.setContext(this);
				this.restHandler.setContext(this);
				this.translationsHandler.setContext(this);
			},

			isUndefined: function isUndefined(handler) {
				if (!handler) {
					return {};
				}
				return handler;
			},
			resolveDependencies: function resolveDependencies(dependencies) {
				_.each(dependencies, function (dependency) {
					var type = DependencyType.fromType(dependency.type);
					this[type.handler].addResolvedControl(dependency.object);
				}, this);
			},
			toJS: function toJS() {
				return {
					formHandler: this.formHandler.toJS(),
					cssHandler: this.cssHandler.toJS(),
					typeHandler: this.typeHandler.toJS(),
					translationsHandler: this.translationsHandler.toJS(),
					selectedMedia: this.selectedMedia
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);
		//endregion

		/** @interface
   * Subclass Handler.js and implement every abstract operation in your particular Handler
   * */
		return Class.subClass({}, {
			init: function init(id) {
				this._id = id;
			},

			/** @abstract
    * @param {int} start: The start index
    * @param {int} end: The end index
    * @return Promise (the list of controls from start to end).
    * This list should contain a preview of the controls with only this basic information: id, name, icon;
    * */
			listControls: function listControls(start, end) {
				throw new Error('This function must be overridden');
			},

			/** @abstract
    * @param {string} id: The id of the control
    * @return Promise (The full model of the control with the provided id).
    *         Promise.then doesn't return undefined. If the form is not there, it returns an empty Object {}
    * */
			getControl: function getControl(id) {
				throw new Error('This function must be overridden');
			},

			/** @abstract
    * @param {string} id: The id of the control
    * @return The full model of the control with the provided id. It doesn't return a Promise object. 
    *         It doesn't return undefined. If the form is not there, it returns an empty Object {}
    * */
			getResolvedControl: function getResolvedControl(id) {
				throw new Error('This function must be overridden');
			},

			/** @abstract
    * @param {string} control: The full model of the control. It goes to the server if necessary.
    * */
			addOrUpdateControl: function addOrUpdateControl(control) {
				throw new Error('This function must be overridden');
			},

			/** @abstract
    * @param {string} control: The full model of the control. It does it immediately without going to the server
    * */
			addResolvedControl: function addResolvedControl(control) {
				throw new Error('This function must be overridden');
			},

			/** @abstract
    * @param {string} id: The id of the control to remove
    * */
			removeControl: function removeControl(id) {
				throw new Error('This function must be overridden');
			},

			/** @abstract
    * @param {string} text: The text to search across all controls
    * @return Promise (the list of controls which name attribute contains the provided text)
    * */
			search: function search(text) {
				throw new Error('This function must be overridden');
			},

			toJS: function toJS() {
				return this._id;
			}

		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_typeof2, _promise) {
	'use strict';

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise, window */

		//region dependencies

		var ContextualHandler = __webpack_require__(33),
		    msg = __webpack_require__(5),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2);
		//endregion

		var url = function () {
			/* istanbul ignore if */
			if (!window.location.origin) {
				window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
			}
			return window.location.origin;
		}();

		var getJWTCookie = function getJWTCookie() {
			var matchStr = '(?:^|; )' + encodeURIComponent('jwt') + '=([^;]*)';
			var jwtCookie = new RegExp(matchStr).exec(document.cookie);

			return jwtCookie ? jwtCookie[1] : null;
		};

		var DefaultRestHandler = ContextualHandler.subClass({}, {
			init: function init(id) {
				this._super(id);
				this.restBaseUrl = url + '/bpm/api/4.0/';
			},
			getAuthInfo: function getAuthInfo() {
				var jwtCookie = getJWTCookie();

				if (jwtCookie) {
					return 'Bearer ' + jwtCookie;
				} else {
					return null;
				}
			},
			execute: function execute(rest, params) {
				var url = this.restBaseUrl + rest.name;
				var authInfo = this.getAuthInfo();

				_.defaults(rest, {
					type: 'GET'
				});

				/* istanbul ignore next */
				return new _promise2.default(function (resolve, reject) {
					$.ajax({
						url: url,
						type: rest.type,
						dataType: 'json',
						data: params,
						traditional: true,
						beforeSend: function beforeSend(xhr) {
							xhr.setRequestHeader('content-type', 'application/json; charset=utf-8');

							/* istanbul ignore else */
							if (authInfo) {
								xhr.setRequestHeader('Authorization', authInfo);
							}
						},
						xhrFields: {
							withCredentials: true
						},
						success: function success(response) {
							resolve(response[rest.optionsListBinding]);
						},
						error: function error(response) {
							if ((typeof response === 'undefined' ? 'undefined' : (0, _typeof3.default)(response)) === 'object' && response.title) {
								reject(response.title, response.detail);
							} else {
								reject(msg.FAILED_TO_FETCH_REST);
							}
						}
					});
				});
			}
		});

		return {
			create: function create() {
				return new DefaultRestHandler('DefaultRestHandler');
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(258), __esModule: true };

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
__webpack_require__(106);
module.exports = __webpack_require__(79).f('iterator');


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(260), __esModule: true };

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(261);
__webpack_require__(95);
__webpack_require__(267);
__webpack_require__(268);
module.exports = __webpack_require__(18).Symbol;


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(11);
var has = __webpack_require__(31);
var DESCRIPTORS = __webpack_require__(30);
var $export = __webpack_require__(36);
var redefine = __webpack_require__(99);
var META = __webpack_require__(262).KEY;
var $fails = __webpack_require__(44);
var shared = __webpack_require__(71);
var setToStringTag = __webpack_require__(56);
var uid = __webpack_require__(55);
var wks = __webpack_require__(12);
var wksExt = __webpack_require__(79);
var wksDefine = __webpack_require__(80);
var enumKeys = __webpack_require__(263);
var isArray = __webpack_require__(264);
var anObject = __webpack_require__(22);
var isObject = __webpack_require__(29);
var toIObject = __webpack_require__(37);
var toPrimitive = __webpack_require__(68);
var createDesc = __webpack_require__(54);
var _create = __webpack_require__(100);
var gOPNExt = __webpack_require__(265);
var $GOPD = __webpack_require__(266);
var $DP = __webpack_require__(28);
var $keys = __webpack_require__(69);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(128).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(81).f = $propertyIsEnumerable;
  __webpack_require__(127).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(51)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(27)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(55)('meta');
var isObject = __webpack_require__(29);
var has = __webpack_require__(31);
var setDesc = __webpack_require__(28).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(44)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(69);
var gOPS = __webpack_require__(127);
var pIE = __webpack_require__(81);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(46);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(37);
var gOPN = __webpack_require__(128).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(81);
var createDesc = __webpack_require__(54);
var toIObject = __webpack_require__(37);
var toPrimitive = __webpack_require__(68);
var has = __webpack_require__(31);
var IE8_DOM_DEFINE = __webpack_require__(98);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(30) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80)('asyncIterator');


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80)('observable');


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Enum = __webpack_require__(114),
		    _ = __webpack_require__(0);
		//endregion

		return Enum.subClass({
			FORM: {
				type: 'FORM',
				handler: 'formHandler'
			},
			STYLESHEET: {
				type: 'STYLESHEET',
				handler: 'cssHandler'
			},
			BUSINESS_TYPE: {
				type: 'BUSINESS_TYPE',
				handler: 'typeHandler'
			},

			fromType: function fromType(type) {
				var key = _.find(_.keys(this), function (key) {
					return key === type;
				});
				return this[key];
			}
		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */

		//region dependencies

		var ContextualHandler = __webpack_require__(33),
		    $ = __webpack_require__(2);
		//endregion

		var DefaultConnectorHandler = ContextualHandler.subClass({}, {
			init: function init(id) {
				this._super(id);
				this._connectors = [];
				this._resources = [];
				this._operations = [];
				this._operationDefinitions = [];
			},
			listConnectors: function listConnectors() {
				return _promise2.default.resolve(this._connectors);
			},
			listResources: function listResources(connectorId) {
				var resources = [];
				$.each(this._resources, function (i, resource) {
					if (resource.connectorId === connectorId) {
						resources.push(resource);
					}
				});
				return _promise2.default.resolve(resources);
			},
			listOperations: function listOperations(connectorId, resourceId) {
				var ops = [];
				$.each(this._operations, function (i, operation) {
					if (operation.connectorId === connectorId && operation.resourceId === resourceId) {
						ops.push(operation);
					}
				});
				return _promise2.default.resolve(ops);
			},
			getOperationDefinition: function getOperationDefinition(connectorId, resourcedId, operationId) {
				var definition = null;
				$.each(this._operationDefinitions, function (i, def) {
					if (def.connectorId === connectorId && def.id === operationId) {
						definition = def;
						return false;
					}
				});
				return _promise2.default.resolve(definition);
			},
			execute: function execute(callPayload) {
				return _promise2.default.resolve({});
			}
		});

		return {
			create: function create() {
				return new DefaultConnectorHandler('DefaultConnectorHandler');
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    DynamicOptionsResolver = __webpack_require__(272),
		    ConnectorOptionsResolver = __webpack_require__(278),
		    ConnectorResolver = __webpack_require__(135),
		    ListConnectorResolver = __webpack_require__(134),
		    RestOptionsResolver = __webpack_require__(279),
		    StaticOptionsResolver = __webpack_require__(281);

		//endregion

		return Class.subClass({}, {

			createResolver: function createResolver(typeId, context, properties, controlId, filter) {
				var createFunction = this[typeId];
				return createFunction(typeId, context, properties, controlId, filter);
			},
			STATIC: function STATIC(typeId, context, properties) {
				return new StaticOptionsResolver(typeId, context, properties);
			},
			REST: function REST(typeId, context, properties, controlId) {
				return new RestOptionsResolver(typeId, context, properties, controlId);
			},
			DYNAMIC: function DYNAMIC(typeId, context, properties, controlId, filter) {
				return new DynamicOptionsResolver(typeId, context, properties, filter);
			},
			CONNECTOR: function CONNECTOR(typeId, context, properties, controlId, filter) {
				return new ConnectorOptionsResolver(typeId, context, properties, controlId, filter);
			},
			LIST_CONNECTOR: function LIST_CONNECTOR(typeId, context, properties, controlId, filter) {
				return new ListConnectorResolver(typeId, context, properties, controlId, filter);
			},
			EVENT_CONNECTOR: function EVENT_CONNECTOR(typeId, context, properties, controlId) {
				return new ConnectorResolver(typeId, context, properties, controlId);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var OptionsResolver = __webpack_require__(63),
		    OjSelectItem = __webpack_require__(42),
		    DynamicAutoFocus = __webpack_require__(132),
		    DotExpressionResolver = __webpack_require__(23),
		    DynamicDefaultValue = __webpack_require__(84),
		    $ = __webpack_require__(2),
		    ko = __webpack_require__(1);

		//endregion

		return OptionsResolver.subClass({}, {
			init: function init(typeId, context, properties, filter) {
				this._super(typeId, context, properties);
				this.context = context;
				this.filter = filter;
				this._options = ko.observableArray(null);
				this.autoFocus = DynamicAutoFocus.create(this);
				this.getDefaultValue = DynamicDefaultValue.create(this);
				this.getOptions = ko.pureComputed(function () {
					return this._options();
				}.bind(this));

				ko.computed(function () {
					this._applyFilter();
				}, this);
			},
			_applyFilter: function _applyFilter() {
				var options = [],
				    list = this._getPayloadList(this.properties().response().optionsListBinding()),
				    self = this;
				return this.filter.execute(list).then(function (filteredList) {
					var simple = self.properties().simple();
					var valueBinding = self.properties().response().valueBinding();
					var labelBinding = self.properties().response().labelBinding();
					$.each(filteredList, function () {
						if (simple) {
							options.push(OjSelectItem.create(this, this));
						} else {
							var value = DotExpressionResolver.getValue(this, valueBinding);
							var label = DotExpressionResolver.getValue(this, labelBinding);
							options.push(OjSelectItem.create(value, label));
						}
					});
					self._options(options);
				});
			},
			_getPayloadList: function _getPayloadList(binding) {
				return this.context.payload() ? this.context.payload().getBindingValue(binding) || [] : [];
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    StaticProperties = __webpack_require__(274),
		    RestProperties = __webpack_require__(275),
		    ConnectorProperties = __webpack_require__(276),
		    DynamicProperties = __webpack_require__(130);

		//endregion

		return Class.subClass({
			createProperties: function createProperties(typeId, properties) {
				var createFunction = this[typeId];
				return createFunction(properties);
			},
			STATIC: function STATIC(properties) {
				return new StaticProperties(properties);
			},
			REST: function REST(properties) {
				return new RestProperties(properties);
			},
			DYNAMIC: function DYNAMIC(properties) {
				return new DynamicProperties(properties);
			},
			CONNECTOR: function CONNECTOR(properties) {
				return new ConnectorProperties(properties);
			},
			LIST_CONNECTOR: function LIST_CONNECTOR(properties) {
				return new ConnectorProperties(properties);
			},
			EVENT_CONNECTOR: function EVENT_CONNECTOR(properties) {
				return new ConnectorProperties(properties);
			}
		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var OptionsProperties = __webpack_require__(83),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return OptionsProperties.subClass({}, {
			init: function init(properties) {

				properties = properties || {};
				_.defaults(properties, {
					optionsNames: 'option 1\noption 2',
					optionsValues: 'option1\noption2',
					defaultValue: [],
					autoFocus: false
				});

				this.optionsNames = ko.observable(properties.optionsNames);
				this.optionsValues = ko.observable(properties.optionsValues);
				this.defaultValue = ko.observableArray(properties.defaultValue);
				this.autoFocus = ko.observable(properties.autoFocus);
			},
			observables: function observables() {
				return {
					optionsNames: this.optionsNames,
					optionsValues: this.optionsValues,
					defaultValue: this.defaultValue,
					autoFocus: this.autoFocus
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var OptionsProperties = __webpack_require__(83),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return OptionsProperties.subClass({}, {
			init: function init(properties) {

				properties = properties || {};
				_.defaults(properties, {
					defaultValue: [],
					autoFocus: false
				});

				this.defaultValue = ko.observableArray(properties.defaultValue);
				this.autoFocus = ko.observable(properties.autoFocus);
			},
			observables: function observables() {
				return {
					defaultValue: this.defaultValue,
					autoFocus: this.autoFocus
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var DynamicProperties = __webpack_require__(130),
		    _ = __webpack_require__(0),
		    UUID = __webpack_require__(17),
		    ko = __webpack_require__(1);

		//endregion

		return DynamicProperties.subClass({}, {
			init: function init(properties) {
				this._super(properties);

				properties = properties || {};
				_.defaults(properties, {
					id: UUID.createUuid(),
					connectorId: '_NONE_',
					resource: '_NONE_',
					operationId: '_NONE_',
					headerParams: [],
					templateParams: [],
					queryParams: [],
					skipDuringLoad: false
				});

				this.id = properties.id;
				this.connectorId = ko.observable(properties.connectorId);
				this.resource = ko.observable(properties.resource);
				this.operationId = ko.observable(properties.operationId);
				this.skipDuringLoad = ko.observable(properties.skipDuringLoad);
				this.queryParams = ko.observableArray(properties.queryParams);
				this.headerParams = ko.observableArray(properties.headerParams);
				this.templateParams = ko.observableArray(properties.templateParams);
			},
			clone: function clone() {
				return {
					id: this.id,
					queryParams: this.queryParams(),
					headerParams: this.headerParams(),
					templateParams: this.templateParams(),
					skipDuringLoad: this.skipDuringLoad(),
					connector: {
						name: this.connectorId(),
						resource: this.resource(),
						method: this.operationId()
					},
					response: this.response().toJS()
				};
			},
			observables: function observables() {
				var observables = this._super();
				return _.extend(observables, {
					skipDuringLoad: this.skipDuringLoad
				});
			},
			toJS: function toJS() {
				return {
					id: this.id,
					skipDuringLoad: ko.unwrap(this.skipDuringLoad),
					defaultValue: ko.unwrap(this.defaultValue),
					autoFocus: ko.unwrap(this.autoFocus)
				};
			},
			toFullJS: function toFullJS() {
				var templateParams = _.map(this.templateParams(), function (param) {
					return param.toJS();
				});
				var headerParams = _.map(this.headerParams(), function (param) {
					return param.toJS();
				});
				var queryParams = _.map(this.queryParams(), function (param) {
					return param.toJS();
				});
				return _.extend({}, this.toJS(), {
					connectorId: ko.unwrap(this.connectorId),
					resource: ko.unwrap(this.resource),
					operationId: ko.unwrap(this.operationId),

					templateParams: ko.unwrap(templateParams),
					queryParams: ko.unwrap(queryParams),
					headerParams: ko.unwrap(headerParams)
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 277 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_277__;

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_typeof2, _promise) {
	'use strict';

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ListConnectorResolver = __webpack_require__(134),
		    DotExpressionResolver = __webpack_require__(23),
		    OjSelectItem = __webpack_require__(42),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2);

		//endregion

		return ListConnectorResolver.subClass({}, {
			init: function init(typeId, context, properties, controlId, filter) {
				this._super(typeId, context, properties, controlId, filter);
			},
			_buildOptions: function _buildOptions(response) {
				var options = [];
				var optionsListBinding = this.properties().response().optionsListBinding();
				var valueBinding = this.properties().response().valueBinding();
				var labelBinding = this.properties().response().labelBinding();
				/* istanbul ignore next */
				response = response || {};

				var list = DotExpressionResolver.getPCSCompatibleValue(response, optionsListBinding) || [];

				var executePromise = this._filter ? this._filter.execute(list) : /*istanbul ignore next*/_promise2.default.resolve(list),
				    simple = _.every(list, function (e) {
					return (typeof e === 'undefined' ? 'undefined' : (0, _typeof3.default)(e)) !== 'object';
				});

				return executePromise.then(function (filteredList) {
					$.each(filteredList, function (i, item) {
						if (simple) {
							options.push(OjSelectItem.create(item, item));
						} else {
							var value = DotExpressionResolver.getPCSCompatibleValue(item, valueBinding);
							var label = DotExpressionResolver.getPCSCompatibleValue(item, labelBinding);
							/* istanbul ignore else */
							if (value !== undefined && label !== undefined) {
								options.push(OjSelectItem.create(value, label));
							}
						}
					});

					return options;
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var RestResolver = __webpack_require__(280);

		//endregion

		return RestResolver.subClass({}, {
			init: function init(typeId, context, properties, controlId) {
				this._super(typeId, context, properties, controlId);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var OptionsResolver = __webpack_require__(63),
		    DynamicDefaultValue = __webpack_require__(84),
		    ko = __webpack_require__(1),
		    oj = __webpack_require__(7);

		//endregion

		return OptionsResolver.subClass({}, {
			init: function init(typeId, context, properties, controlId) {
				this._super(typeId, context, properties);
				this.controlId = controlId;

				this.autoFocus = ko.pureComputed({
					read: function read() {
						return this.properties().autoFocus();
					},
					owner: this
				});

				this.getDefaultValue = DynamicDefaultValue.create(this);

				this._options = ko.observableArray(null);

				this.getOptions = ko.pureComputed(function () {
					return this._options();
				}.bind(this));

				this._callRest = function (rest, params) {
					return context.config().restHandler.execute(rest, params);
				};
			},

			loadAndSetRest: function loadAndSetRest(rest, params) {
				this.callRest(rest, params).then(function (response) {
					this._options(response[rest.optionsListBinding]);
					this.customValidationMessages([]);
				}.bind(this)).catch(function (error) {
					this.customValidationMessages([new oj.Message(error)]);
				}.bind(this));
			},

			callRest: function callRest(rest, params) {
				return this._callRest(rest, params);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var OptionsResolver = __webpack_require__(63),
		    OjSelectItem = __webpack_require__(42),
		    koToJSUtil = __webpack_require__(21),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1);

		//endregion
		var OPTION_PROPERTY = 'option__';

		return OptionsResolver.subClass({}, {
			init: function init(typeId, context, properties) {
				this._super(typeId, context, properties);

				this.autoFocus = ko.pureComputed({
					read: function read() {
						return this.properties().autoFocus();
					},
					write: function write(value) {
						this.properties().autoFocus(value);
					},
					owner: this
				});
			},
			getOptions: function getOptions() {
				var properties = koToJSUtil.toJS(this.properties());
				// Split this into an array of names/value pairs wrt to enter key to fill the dropdown.
				var names = properties.optionsNames.split('\n'),
				    values = properties.optionsValues.split('\n'),
				    options = [];
				for (var i = 0; i < names.length; i++) {
					//Don't add empty values. They don't work correctly in oj, and they falsly report the 'Options' property as not empty
					if (!_.isEmpty(values[i])) {
						options.push(OjSelectItem.create(values[i], names[i]));
					}
				}
				return options;
			},
			getDefaultValue: function getDefaultValue() {
				return this.properties().defaultValue();
			},
			getDefaultValueOptions: function getDefaultValueOptions() {
				return this.getOptions();
			},
			getTranslationBundle: function getTranslationBundle(control, formBundle) {
				var optionsNames = this.properties().optionsNames().split('\n');
				formBundle[control.id] = formBundle[control.id] || {};
				_.each(optionsNames, function (optionName, i) {
					formBundle[control.id][OPTION_PROPERTY + i] = optionName;
				});
			},
			translate: function translate(control, context) {
				var handler = context.config().translationsHandler;
				var optionsNames = this.properties().optionsNames().split('\n');
				_.each(optionsNames, function (optionName, i) {
					var value = handler.getKeyProperty(control.id, OPTION_PROPERTY + i);
					if (value) {
						optionsNames[i] = value;
					}
				});
				this.properties().optionsNames(optionsNames.join('\n'));
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);
		//endregion

		return Class.subClass({
			createAutoCompletes: function createAutoCompletes(control, context) {
				//Do nothing in renderer!
			},
			initialize: function initialize(control, context) {
				//Do nothing in renderer!
			}
		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0),
		    FormsLogger = __webpack_require__(20),
		    ko = __webpack_require__(1);
		//endregion
		/* global Promise */

		/* istanbul ignore next */
		return Class.subClass({}, {
			eventDepthCount: 0,
			currentPromise: false,
			MAX_RECURSIVE_EVENTS: 1000,

			init: function init() {
				this.dirtyControls = ko.observableArray([]);
				this.eventDepthCount = 0;
				this.resolvedPromises = 0;
				this.isExecuting = ko.observable(false);
				var self = this;

				self.execute = function (control, event) {
					if (!control.viewModel.form() || !control.viewModel.form().loadEventsExecuted()) {
						return;
					}

					if (self.eventDepthCount > self.MAX_RECURSIVE_EVENTS) {
						FormsLogger.getLogger().error('User Events Error: Too many recursive events. Aborting.');
						return;
					}

					self.eventDepthCount++;
					self.isExecuting(true);

					//Make sure we run the events after jet events (i.e. for selected rows)
					setTimeout(function () {
						FormsLogger.getLogger().count('[COUNT] [EVENT]');
						var promise = control.executeEvent(event.value);

						if (self.eventDepthCount === 1) {
							//This is the first event, it cant be resolved until all events created by this are resolved
							self.resolvedPromises = 0;
						}

						promise.then(function () {
							self.resolvedPromises++;
							if (self.resolvedPromises === self.eventDepthCount) {
								//All events are resolved, we are not waiting for any other, so no recursive loop can happen

								self.eventDepthCount = 0;
								self.resolvedPromises = 0;
								self.isExecuting(false);
							}
						});
					});

					return true;
				};
			},

			setDirtyControl: function setDirtyControl(control) {
				this.dirtyControls(_.unique(this.dirtyControls().concat(control)));
			},
			clearDirtyControl: function clearDirtyControl(control) {
				this.dirtyControls(_.without(this.dirtyControls(), control));
			},
			_resolveDirtyControls: function _resolveDirtyControls() {
				var _this = this;

				return new _promise2.default(function (resolve) {
					if (_this.dirtyControls().length > 0) {
						var sub = _this.dirtyControls.subscribe(function () {
							if (_this.dirtyControls().length === 0) {
								sub.dispose();
								resolve();
							}
						});
					} else {
						resolve();
					}
				});
			},

			resolveWhenEmpty: function resolveWhenEmpty() {
				var _this2 = this;

				var self = this;
				//Return a promise that resolves when the events queue is empty
				return new _promise2.default(function (resolve, reject) {
					_this2._resolveDirtyControls().then(function () {
						if (self.isExecuting()) {
							var sub = self.isExecuting.subscribe(function () {
								sub.dispose();
								resolve();
							});
						} else {
							resolve();
						}
					});
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_typeof2) {
	'use strict';

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    ControlTypeId = __webpack_require__(4),
		    _ = __webpack_require__(0);

		//endregion

		return Class.subClass({}, {
			controlBindings: {},
			init: function init(controlBindings, bindingContext) {

				this.controlBindings = controlBindings || {};
				this.bindingContext = ko.unwrap(bindingContext) || '';
			},
			_hasEmptyBinding: function _hasEmptyBinding(binding) {
				return _.isEmpty(binding) || _.any(binding.split('.'), function (partialBinding) {
					return _.isEmpty(partialBinding);
				});
			},

			_getParentWithBinding: function _getParentWithBinding(control) {
				var parent = control.getParent();
				while (parent.type !== ControlTypeId.FORM_PRESENTATION && !parent.isRepeatable() && !parent._bindingValue) {
					parent = parent.getParent();
				}
				return parent;
			},
			getBindingControlFor: function getBindingControlFor(control) {
				//Find a parent that has a bindingValue (repeatable row)
				var parent = this._getParentWithBinding(control);

				//But if there's a row, we use that context
				if (parent._bindingValue) {
					return parent._bindingValue;
				} else {
					//By default (not inside a repeatable, we add the observable to the global bindings
					return ko.unwrap(this.controlBindings);
				}
			},
			getFullBindingContextFor: function getFullBindingContextFor(control) {
				var bindingValue = this.getBindingControlFor(control);
				var parent = this._getParentWithBinding(control);
				var bindingContext = this.bindingContext;

				if (parent.isRepeatable() || _.isArray(ko.unwrap(bindingValue[bindingContext]))) {
					//If the parent were a row of the repeatable, it would have exited before
					//This only happens for the elements that describe rows, but have no data
					return '';
				}

				if (parent.type === ControlTypeId.FORM_PRESENTATION) {
					if (bindingContext.length > 0) {
						bindingContext = bindingContext + '.';
					}
					return bindingContext + control.getFullBinding();
				} else {
					return control.properties.binding();
				}
			},

			_getObservable: function _getObservable(control, creator, defaultValue) {
				var bindingValue = this.getBindingControlFor(control);

				if ((0, _typeof3.default)(ko.unwrap(bindingValue)) === 'object') {
					bindingValue = ko.unwrap(bindingValue);
					var binding = this.getFullBindingContextFor(control);
					if (this._hasEmptyBinding(binding)) {
						//Creator can be either observable or observableArray
						//This is dynamic to avoid the code repetition
						return ko[creator](defaultValue);
					} else {

						//If there's no binding, we create one (dynamically observable or observableArray)
						if (_.isUndefined(bindingValue[binding])) {
							bindingValue[binding] = ko[creator](defaultValue);
						} else if (!ko.isObservable(bindingValue[binding])) {
							//If there's a value, but not an observable (ie. it came from the payload),
							//we create an observable with that value
							bindingValue[binding] = ko[creator](ko.unwrap(bindingValue[binding]));
						}
						//return the observable
						return bindingValue[binding];
					}
				} else if (ko.isObservable(bindingValue)) {
					//If the bindingValue is an observable, reuse that directly, and ignore the binding
					// This will be the case inside of repeatables of String[] (or other simple type)
					return bindingValue;
				} else {
					//In case of Business object of array type, binding for control is not needed
					return ko[creator](bindingValue);
				}
			},
			getObservableForBinding: function getObservableForBinding(control) {
				return this._getObservable(control, 'observable');
			},
			getObservableArrayForBinding: function getObservableArrayForBinding(control) {
				return this._getObservable(control, 'observableArray', []);
			},
			getObservableValue: function getObservableValue(binding, shouldCreate) {
				if (!this.isObservableDefined(binding) && shouldCreate) {
					this.controlBindings[binding] = ko.observable(this.controlBindings[binding]);
				}
				return this.controlBindings[binding];
			},
			isObservableDefined: function isObservableDefined(key) {
				return ko.isObservable(this.controlBindings[key]);
			},
			setValue: function setValue(key, value) {
				if (this.isObservableDefined(key)) {
					this.controlBindings[key](value);
				} else {
					this.controlBindings[key] = value;
				}
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    StaticFormReference = __webpack_require__(286);
		//endregion

		var CREATE = 'CREATE_';

		var FormReferenceFactory = Class.subClass({

			create: function create(reference) {
				var type = reference.type || 'STATIC';
				var createFunction = FormReferenceFactory[CREATE + type];
				if (createFunction) {
					return createFunction(reference);
				} else {
					throw new Error('Unsupported reference type exception');
				}
			},
			CREATE_STATIC: function CREATE_STATIC(reference) {
				return new StaticFormReference(reference);
			}

		}, {});
		return FormReferenceFactory;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Reference = __webpack_require__(287),
		    ko = __webpack_require__(1);
		//endregion

		return Reference.subClass({}, {
			init: function init(reference) {
				this._super(reference);
				this.formId = ko.observable(reference.formId);
				this.formName = ko.observable(reference.formName);
				this.presentationId = ko.observable(reference.presentationId);
				this.icon = ko.observable(reference.icon);
			},
			/** @override */
			get: function get() {
				return {
					formId: this.formId(),
					formName: this.formName(),
					presentationId: this.presentationId(),
					icon: this.icon()
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3);
		//endregion

		/** @abstract */
		return Class.subClass({}, {
			init: function init(reference) {
				this._reference = reference;
			},
			get: function get() {
				throw new Error('This function must be overridden');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		// jshint maxstatements:155

		//region dependencies

		var DecoratorsCatalog = __webpack_require__(289),
		    JetValidationDecorator = __webpack_require__(136),
		    RepeatableValidationDecorator = __webpack_require__(302),
		    FormReferenceValidationDecorator = __webpack_require__(303),
		    LazyRenderingDecorator = __webpack_require__(304),
		    TabRenderingDecorator = __webpack_require__(305),
		    TabContainerRenderingDecorator = __webpack_require__(306),
		    SectionRenderingDecorator = __webpack_require__(307),
		    SectionAsyncRenderCallbackDecorator = __webpack_require__(308),
		    ControlTypeId = __webpack_require__(4),
		    TimeValidationDecorator = __webpack_require__(309),
		    RawDataDecorator = __webpack_require__(310),
		    VideoValueDecorator = __webpack_require__(311),
		    IdentityValueDecorator = __webpack_require__(312),
		    CheckboxValueDecorator = __webpack_require__(313),
		    RepeatableRowValueDecorator = __webpack_require__(314),
		    FormReferenceValueDecorator = __webpack_require__(316),
		    ValueDecorator = __webpack_require__(19),
		    SelectValueDecorator = __webpack_require__(143),
		    RadioButtonValueDecorator = __webpack_require__(317),
		    LinkValueDecorator = __webpack_require__(318),
		    DateValueDecorator = __webpack_require__(319),
		    TimeValueDecorator = __webpack_require__(320),
		    NumberValueDecorator = __webpack_require__(321),
		    RepeatableValueDecorator = __webpack_require__(322),
		    BuildFormReferenceDecorator = __webpack_require__(323),
		    ReferenceLazyRenderingDecorator = __webpack_require__(324),
		    ReferencePresentationDecorator = __webpack_require__(325).default,
		    TranslationsDecorator = __webpack_require__(144),
		    TranslationsLoVDecorator = __webpack_require__(326),
		    ComputedValueDecorator = __webpack_require__(327),
		    GetOJComponentDecorator = __webpack_require__(328),
		    CustomControlList = __webpack_require__(75),
		    EnumSelectValueDecorator = __webpack_require__(329);

		//end region

		return DecoratorsCatalog.subClass({}, {

			init: function init() {

				// jshint maxstatements:158
				this._super();
				this.valueDecorator = new ValueDecorator();
				this.numberValueDecorator = new NumberValueDecorator();
				this.dateValueDecorator = new DateValueDecorator();
				this.repeatableValueDecorator = new RepeatableValueDecorator();
				this.lazyRenderingDecorator = new LazyRenderingDecorator();
				this.getOJComponentDecorator = new GetOJComponentDecorator();
				this.jetValidationDecorator = new JetValidationDecorator([this.valueDecorator, this.lazyRenderingDecorator, this.getOJComponentDecorator]);
				this.repeatableValidationDecorator = new RepeatableValidationDecorator([this.lazyRenderingDecorator, this.getOJComponentDecorator]);
				this.formReferenceValidationDecorator = new FormReferenceValidationDecorator([this.lazyRenderingDecorator, this.getOJComponentDecorator]);
				this.tabRenderingDecorator = new TabRenderingDecorator([this.lazyRenderingDecorator]);
				this.sectionRenderingDecorator = new SectionRenderingDecorator();
				this.sectionAsyncRenderCallbackDecorator = new SectionAsyncRenderCallbackDecorator();
				this.tabContainerRenderingDecorator = new TabContainerRenderingDecorator([this.lazyRenderingDecorator]);
				this.rawDataDecorator = new RawDataDecorator([this.lazyRenderingDecorator]);
				this.referenceLazyRenderingDecorator = new ReferenceLazyRenderingDecorator([this.lazyRenderingDecorator]);

				this.translationsDecorator = new TranslationsDecorator([this.lazyRenderingDecorator]);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.INPUT_TEXT);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.TEXT_AREA);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.BUTTON);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.CHECKBOX);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.NUMBER);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.DATE);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.TIME);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.DATE_TIME);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.EMAIL);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.URL);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.MESSAGE);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.LINK);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.MONEY);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.PHONE);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.IMAGE);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.VIDEO);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.IDENTITY_BROWSER);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.PANEL);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.SECTION);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.TABLE);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.TABLE_COLUMN);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.TAB);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.ENUM_SELECT);
				this.registerDecorator(this.translationsDecorator, ControlTypeId.FORM_REFERENCE);
				this.translationsLoVDecorator = new TranslationsLoVDecorator([this.lazyRenderingDecorator]);
				this.registerDecorator(this.translationsLoVDecorator, ControlTypeId.SELECT);
				this.registerDecorator(this.translationsLoVDecorator, ControlTypeId.CHECKLIST);
				this.registerDecorator(this.translationsLoVDecorator, ControlTypeId.RADIO_BUTTON);

				this.registerDecorator(this.lazyRenderingDecorator);
				this.registerDecorator(this.getOJComponentDecorator);

				this.registerDecorator(this.referenceLazyRenderingDecorator, ControlTypeId.FORM_REFERENCE);
				this.registerDecorator(new ReferencePresentationDecorator(), ControlTypeId.FORM_REFERENCE);

				this.registerDecorator(this.valueDecorator, ControlTypeId.INPUT_TEXT);
				this.registerDecorator(this.valueDecorator, ControlTypeId.TEXT_AREA);
				this.registerDecorator(this.valueDecorator, ControlTypeId.CHECKLIST);
				this.registerDecorator(this.valueDecorator, ControlTypeId.RADIO_BUTTON);
				this.registerDecorator(this.valueDecorator, ControlTypeId.EMAIL);
				this.registerDecorator(this.valueDecorator, ControlTypeId.URL);
				this.registerDecorator(this.valueDecorator, ControlTypeId.MESSAGE);
				this.registerDecorator(this.valueDecorator, ControlTypeId.PHONE);
				this.registerDecorator(this.valueDecorator, ControlTypeId.IMAGE);
				this.registerDecorator(this.valueDecorator, ControlTypeId.VIDEO);
				this.registerDecorator(this.numberValueDecorator, ControlTypeId.NUMBER);
				this.registerDecorator(this.numberValueDecorator, ControlTypeId.MONEY);
				this.registerDecorator(this.dateValueDecorator, ControlTypeId.DATE);
				this.registerDecorator(this.dateValueDecorator, ControlTypeId.DATE_TIME);
				this.registerDecorator(new TimeValueDecorator([]), ControlTypeId.TIME);
				this.registerDecorator(new FormReferenceValueDecorator([]), ControlTypeId.FORM_REFERENCE);
				this.registerDecorator(new CheckboxValueDecorator([]), ControlTypeId.CHECKBOX);
				this.registerDecorator(new IdentityValueDecorator([]), ControlTypeId.IDENTITY_BROWSER);
				this.registerDecorator(new SelectValueDecorator([]), ControlTypeId.SELECT);
				this.registerDecorator(new RadioButtonValueDecorator([]), ControlTypeId.RADIO_BUTTON);
				this.registerDecorator(new EnumSelectValueDecorator([]), ControlTypeId.ENUM_SELECT);
				this.registerDecorator(new LinkValueDecorator([]), ControlTypeId.LINK);

				this.registerDecorator(new RepeatableRowValueDecorator([]), ControlTypeId.TABLE_ROW);
				this.registerDecorator(new RepeatableRowValueDecorator([]), ControlTypeId.REPEATABLE_SECTION_ROW);

				this.registerDecorator(this.repeatableValueDecorator, ControlTypeId.REPEATABLE_SECTION);
				this.registerDecorator(this.repeatableValueDecorator, ControlTypeId.TABLE);

				this.registerDecorator(new VideoValueDecorator([this.valueDecorator]), ControlTypeId.VIDEO);
				this.registerDecorator(new BuildFormReferenceDecorator([this.valueDecorator]), ControlTypeId.FORM_REFERENCE);

				this.registerDecorator(this.rawDataDecorator, ControlTypeId.INPUT_TEXT);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.TEXT_AREA);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.SELECT);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.CHECKLIST);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.CHECKBOX);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.RADIO_BUTTON);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.NUMBER);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.DATE);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.TIME);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.DATE_TIME);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.EMAIL);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.URL);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.MESSAGE);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.LINK);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.MONEY);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.PHONE);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.IMAGE);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.VIDEO);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.REPEATABLE_SECTION);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.TABLE);
				this.registerDecorator(this.rawDataDecorator, ControlTypeId.ENUM_SELECT);

				this.computedValueDecorator = new ComputedValueDecorator([this.lazyRenderingDecorator]);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.INPUT_TEXT);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.TEXT_AREA);
				//            this.registerDecorator(this.computedValueDecorator, ControlTypeId.BUTTON);   do not have computed Value
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.SELECT);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.CHECKLIST);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.CHECKBOX);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.RADIO_BUTTON);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.NUMBER);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.DATE);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.TIME);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.DATE_TIME);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.EMAIL);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.URL);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.MESSAGE);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.LINK);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.MONEY);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.PHONE);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.IMAGE);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.VIDEO);
				this.registerDecorator(this.computedValueDecorator, ControlTypeId.ENUM_SELECT);

				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.IDENTITY_BROWSER);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.INPUT_TEXT);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.TEXT_AREA);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.SELECT);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.CHECKLIST);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.CHECKBOX);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.RADIO_BUTTON);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.NUMBER);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.DATE);
				//ToDo Jet 2.3.0 Remove this validator and use the common
				var timeValidationDecorator = new TimeValidationDecorator([this.lazyRenderingDecorator, this.getOJComponentDecorator]);
				this.registerDecorator(timeValidationDecorator, ControlTypeId.TIME);
				this.registerDecorator(timeValidationDecorator, ControlTypeId.DATE_TIME);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.EMAIL);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.URL);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.MONEY);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.PHONE);
				this.registerDecorator(this.jetValidationDecorator, ControlTypeId.ENUM_SELECT);

				this.registerDecorator(this.repeatableValidationDecorator, ControlTypeId.REPEATABLE_SECTION);
				this.registerDecorator(this.repeatableValidationDecorator, ControlTypeId.TABLE);

				this.registerDecorator(this.formReferenceValidationDecorator, ControlTypeId.FORM_REFERENCE);

				this.registerDecorator(this.tabContainerRenderingDecorator, ControlTypeId.TAB_CONTAINER);
				this.registerDecorator(this.tabRenderingDecorator, ControlTypeId.TAB);
				this.registerDecorator(this.sectionRenderingDecorator, ControlTypeId.SECTION);
				this.registerDecorator(this.sectionAsyncRenderCallbackDecorator, ControlTypeId.SECTION);

				//This should be dynamic
				this.registerDecorator(this.translationsDecorator, CustomControlList.RICH_TEXT_EDITOR.id);
				this.registerDecorator(this.valueDecorator, CustomControlList.RICH_TEXT_EDITOR.id);
				this.registerDecorator(this.computedValueDecorator, CustomControlList.RICH_TEXT_EDITOR.id);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0);

		//end region
		return Class.subClass({}, {

			init: function init() {
				this._decorators = {};
			},
			addToControl: function addToControl(control, context) {
				var decorators = this.getDecorators(control);

				_.each(decorators, function (decorator) {
					decorator.decorate(control, context);
				});
			},
			registerDecorator: function registerDecorator(decorator, controlType) {
				if (!controlType) {
					//registering a decorator for all the controls.
					controlType = 'all';
				}
				var defaultList = {};
				defaultList[controlType] = [];
				_.defaults(this._decorators, defaultList);

				var decorators = this._decorators[controlType];

				decorators.push(decorator);
			},
			getDecorators: function getDecorators(control) {
				var decorators = this._decorators[control.type];
				return _.union([], this._decorators.all, decorators);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    koToJSUtil = __webpack_require__(21),
		    _ = __webpack_require__(0),
		    StringUtils = __webpack_require__(32),
		    ValidatorFactory = __webpack_require__(137),
		    TypeValidatorFactory = __webpack_require__(296),
		    ValidatorTypeId = __webpack_require__(138);

		//endregion

		return Class.subClass({

			getValidators: function getValidators(properties, toIgnore) {
				var controlValidators = [],
				    propertiesJson = koToJSUtil.toJS(properties);
				//add generalised set of validators depending upon properties.
				_.each(propertiesJson, function (value, key) {
					// Capitalize and convert to underscore case from camel.
					key = StringUtils.underscored(key).toUpperCase();
					var isValueForValidatorDefined = !_.isEmpty(value) || value > 0; //we should not add validators if properties are not set.
					if (ValidatorTypeId.hasOwnProperty(key) && isValueForValidatorDefined && toIgnore.indexOf(key) < 0) {
						controlValidators.push(ValidatorFactory.createValidator(ValidatorTypeId[key], properties));
					}
				}, this);

				return controlValidators;
			},
			getValidatorsForType: function getValidatorsForType(type, properties) {
				return TypeValidatorFactory.createValidators(type, properties);
			}
		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7),
		    msg = __webpack_require__(5);

		//endregion

		var MinLengthValidator = function MinLengthValidator(properties) {
			this.validate = function (value) {
				var min = properties.minLength();
				//If the value is empty, we don't check for minimum, it depends if it's required or not
				if (value.length < min && value.length > 0) {
					throw new oj.ValidatorError(msg.MIN_LENGTH_VALIDATION_MESSAGE_SUMMARY, msg.MIN_LENGTH_VALIDATION_MESSAGE_DETAIL + min);
				}
				return true;
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(MinLengthValidator, oj.Validator, 'MinLengthValidator');

		return MinLengthValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7),
		    msg = __webpack_require__(5);

		//endregion

		var MaxLengthValidator = function MaxLengthValidator(properties) {
			this.validate = function (value) {
				var max = properties.maxLength();
				if (value.length > max) {
					throw new oj.ValidatorError(msg.MAX_LENGTH_VALIDATION_MESSAGE_SUMMARY, msg.MAX_LENGTH_VALIDATION_MESSAGE_DETAIL + max);
				}
				return true;
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(MaxLengthValidator, oj.Validator, 'MaxLengthValidator');

		return MaxLengthValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7);

		//endregion

		var RequiredValidator = function RequiredValidator(properties) {
			this.validate = function (value) {
				if (properties.required()) {
					var requiredValidator = oj.Validation.validatorFactory(oj.ValidatorFactory.VALIDATOR_TYPE_REQUIRED).createValidator();
					requiredValidator.validate(value);
				}
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(RequiredValidator, oj.Validator, 'RequiredValidator');

		return RequiredValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7);

		//endregion

		var OptionsFeedValidator = function OptionsFeedValidator(properties) {
			this.validate = function () {
				var customMessages = properties.optionsFeed().optionsResolver().customValidationMessages();
				if (customMessages.length > 0) {
					var validationMessage = customMessages[0];
					throw new oj.ValidatorError(validationMessage.summary, validationMessage.detail);
				}
				return true;
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(OptionsFeedValidator, oj.Validator, 'OptionsFeedValidator');

		return OptionsFeedValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7),
		    $ = __webpack_require__(2),
		    msg = __webpack_require__(5);

		//endregion

		var PatternValidator = function PatternValidator(properties) {
			this.validate = function (value) {
				var pattern = properties.pattern(),
				    regEx = new RegExp(pattern);
				if ($.trim(value) && !regEx.test(value)) {
					var patternMessage = properties.patternMessage() || msg.PATTERN_VALIDATION_MESSAGE_DETAIL + pattern;
					throw new oj.ValidatorError(msg.PATTERN_VALIDATION_MESSAGE_SUMMARY, patternMessage);
				}
				return true;
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(PatternValidator, oj.Validator, 'PatternValidator');

		return PatternValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    NumberValidator = __webpack_require__(297),
		    DateValidator = __webpack_require__(298),
		    MoneyValidator = __webpack_require__(299),
		    DateRangeValidator = __webpack_require__(300),
		    NumberRangeValidator = __webpack_require__(301);

		//endregion

		var CREATE = 'CREATE_';

		var ValidatorFactory = Class.subClass({

			createValidators: function createValidators(typeId, properties) {
				var validators = [];
				var createFunction = ValidatorFactory[CREATE + typeId];
				if (createFunction) {
					validators = createFunction(properties);
				}
				return validators;
			},
			CREATE_DATE: function CREATE_DATE(properties) {
				return [new DateValidator(properties), new DateRangeValidator(properties)];
			},
			CREATE_DATE_TIME: function CREATE_DATE_TIME(properties) {
				return ValidatorFactory.CREATE_DATE(properties);
			},
			CREATE_TIME: function CREATE_TIME(properties) {
				return ValidatorFactory.CREATE_DATE(properties);
			},
			CREATE_NUMBER: function CREATE_NUMBER(properties) {
				return [new NumberValidator(properties), new NumberRangeValidator(properties)];
			},
			CREATE_MONEY: function CREATE_MONEY(properties) {
				return [new MoneyValidator(properties), new NumberRangeValidator(properties)];
			}
		}, {});
		return ValidatorFactory;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7);

		//endregion

		var NumberValidator = function NumberValidator() {
			this.validate = function (value) {
				var converter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_NUMBER).createConverter();
				converter.parse(value);
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(NumberValidator, oj.Validator, 'NumberValidator');

		return NumberValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7);

		//endregion

		var DateValidator = function DateValidator(properties) {
			this.validate = function (value) {
				var converter = properties.dateConverter();
				converter.parse(value);
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(DateValidator, oj.Validator, 'DateValidator');

		return DateValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7);

		//endregion

		var DateValidator = function DateValidator(properties) {
			this.validate = function (value) {
				var converter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_NUMBER).createConverter(properties.converterOptions());
				converter.parse(value);
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(DateValidator, oj.Validator, 'DateValidator');

		return DateValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7);

		//endregion

		var DateValidator = function DateValidator(properties) {
			this.validate = function (value) {
				var dateConverter = properties.dateConverter();
				var dateTimeRangeValidator = oj.Validation.validatorFactory(oj.ValidatorFactory.VALIDATOR_TYPE_DATETIMERANGE).createValidator({
					min: properties.minValue(),
					max: properties.maxValue(),
					converter: dateConverter
				});
				dateTimeRangeValidator.validate(value);
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(DateValidator, oj.Validator, 'DateValidator');

		return DateValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var oj = __webpack_require__(7);

		//endregion

		var DateValidator = function DateValidator(properties) {
			this.validate = function (value) {
				var min = properties.minValue();
				var max = properties.maxValue();
				var options = {};
				if (min) {
					options.min = min;
				}
				if (max) {
					options.max = max;
				}
				var rangeValidator = oj.Validation.validatorFactory(oj.ValidatorFactory.VALIDATOR_TYPE_NUMBERRANGE).createValidator(options);
				rangeValidator.validate(value);
			};
		};

		//Need to be a subclass of oj.Validator.
		oj.Object.createSubclass(DateValidator, oj.Validator, 'DateValidator');

		return DateValidator;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValidationDecorator = __webpack_require__(85),
		    _ = __webpack_require__(0),
		    oj = __webpack_require__(7),
		    FormValidator = __webpack_require__(139),
		    msg = __webpack_require__(5),
		    TreeUtil = __webpack_require__(40);

		//endregion

		return ValidationDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_validateComponent: function _validateComponent(control) {
				var dataSource = TreeUtil.treeToList(control.dataSource(), 'getControls');
				var valid = true;
				var formValidator = new FormValidator();

				_.each(dataSource, function (childControl) {
					valid = formValidator.validateControl(childControl, childControl.context) && valid;
				});

				valid = valid && this._validateRepeatableRows(control);
				return valid;
			},
			_validateSilently: function _validateSilently(control) {
				var valid = true;
				var dataSource = TreeUtil.treeToList(control.dataSource(), 'getControls');
				dataSource = _.filter(dataSource, function (control) {
					return control.validate;
				});
				var validate = this._super.bind(this);
				_.each(dataSource, function (childControl) {
					valid = validate(childControl) && valid;
				});
				return valid;
			},
			_validateRepeatableRows: function _validateRepeatableRows(control) {
				//Validate that repeatable should have minimum rows.
				var valid = true,
				    errorMsg = [],
				    invalidRepeatableClass = '';
				if (control.dataSource().length < control.properties.minRows()) {
					errorMsg.push({
						summary: msg.NEED_MORE_ROWS,
						severity: oj.Message.SEVERITY_TYPE['ERROR']
					});
					invalidRepeatableClass = control.inValidRepeatableClassName;
					valid = false;
				}
				control.properties.errorMsg(errorMsg);
				control.properties.invalidRepeatableClass(invalidRepeatableClass);
				return valid;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValidationDecorator = __webpack_require__(85),
		    SilentLoader = __webpack_require__(140),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2);

		//endregion

		return ValidationDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_decorate: function _decorate(control) {
				this._super(control);
				control._silentForm = _.extend({}, _.clone(control.selectedPresentation()));
			},
			_validateComponent: function _validateComponent(control) {
				var $control = $('#' + control.domIdPrefix + control.id);
				return $control.triggerHandler('validateData');
			},
			_validateSilently: function _validateSilently(control) {
				control._silentForm.payload = control.getControlValue();
				control._silentModel = SilentLoader.load({
					form: control._silentForm,
					config: _.clone(control.getConfig())
				});
				return !control._silentModel || control._silentModel.validateData();
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init() {
				this._super('LAZY_RENDERING');
			},
			_decorate: function _decorate(control, context) {
				control.renderListeners = [];
				control.rendered = ko.observable(false);
				control.registerRenderListener = function (listener) {
					control.renderListeners.push(listener);
				};
				control.detachRenderListener = function (listener) {
					control.renderListeners.splice(this.renderListeners.indexOf(listener), 1);
				};

				control.afterRender = function () {
					control.rendered(true);

					var toDetach = [];
					_.each(control.renderListeners, function (listener) {
						if (listener(control, context)) {
							toDetach.push(listener);
						}
					});
					_.each(toDetach, function (listener) {
						control.detachRenderListener(listener);
					});
				};
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('rendered');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    ko = __webpack_require__(1);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('LAZY_RENDERING', dependencies);
			},
			_decorate: function _decorate(tab) {
				//is lazyLoading option is selected the the tab should not be rendered until it is selected.
				tab.rendered = ko.observable(!tab.properties.lazyLoading());
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('rendered');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('LAZY_RENDERING', dependencies);
			},
			_decorate: function _decorate(tabContainer) {
				var renderedTabsCount = 0;

				tabContainer._renderSelectedTab = function (selectedTabPosition) {
					var tab = tabContainer.controls()[selectedTabPosition];
					if (tab && tab.rendered && !tab.rendered()) {
						tab.rendered(true);
						renderedTabsCount += 1;
					}
				};

				var selectedTabSubscription = tabContainer.properties.selectedPosition.subscribe(function (newValue) {
					tabContainer._renderSelectedTab(newValue);
					if (renderedTabsCount === tabContainer.controls().length) {
						//all the tabs have been rendered, no need to keep listening.
						selectedTabSubscription.dispose();
					}
				});
				var notifySelectedTabToRender = function notifySelectedTabToRender() {
					tabContainer._renderSelectedTab(tabContainer.properties.selectedPosition());
					return true;
				};
				tabContainer.registerRenderListener(notifySelectedTabToRender);
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('_renderSelectedTab');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    ko = __webpack_require__(1);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init() {
				this._super('LAZY_RENDERING');
			},
			_decorate: function _decorate(section) {
				var lazyLoading = section.properties.lazyLoading();
				section.renderContent = ko.observable(!lazyLoading);
				if (lazyLoading) {
					section.properties.expanded(false);
					var expandSubscription = section.properties.expanded.subscribe(function () {
						section.renderContent(true);
						expandSubscription.dispose();
					});
				}
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('renderContent');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init() {
				this._super('ASYNC_RENDER_CALLBACK');
			},
			_decorate: function _decorate(section) {
				section.registerAsyncTemplate = function (context, controls) {
					var callback = context.registerAsyncTemplate(context, controls);

					return function () {
						section._refresh();
						callback();
					};
				};
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('registerAsyncTemplate');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var JetValidationDecorator = __webpack_require__(136);

		//endregion

		//ToDo Jet 2.3.0 Remove this Decorator
		return JetValidationDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_decorate: function _decorate(control) {
				this._super(control);
			},
			_componentValidation: function _componentValidation(ojComponentWidgetRef) {
				//Execute the validation
				//Time and Datetime don't return values in validate, so we check for isValid after triggering it
				ojComponentWidgetRef('validate');
				return ojComponentWidgetRef('isValid');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('INPUT_DECORATOR', dependencies);
			},
			_decorate: function _decorate(control) {

				var afterRender = function afterRender(control) {
					if (control._rawValue) {
						control.setValue(control._rawValue);
						delete control._rawValue;
					}
					return true;
				};

				control.registerRenderListener(afterRender);
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('rendered');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    ko = __webpack_require__(1);

		//endregion

		var getVimeoCode = /vimeo\.com\/(video\/)?(.*)/,
		    getYouTubeCode = /(youtu\.be\/|youtube\.com\/watch\?v=|youtube.com\/embed\/)(.*)/;

		function parseVideoLink(link, loop, showControls, autoPlay) {
			var parsedLink = '',
			    vidCode,
			    matches;

			matches = getVimeoCode.exec(link);
			if (matches) {
				vidCode = matches[2];
				parsedLink = 'https://player.vimeo.com/video/' + vidCode;
			}
			matches = getYouTubeCode.exec(link);
			if (matches) {
				vidCode = matches[2];
				parsedLink = 'https://www.youtube.com/embed/' + vidCode;
			}

			if (parsedLink) {
				parsedLink = parsedLink + '?loop=' + Number(loop) + '&controls=' + Number(showControls);
				if (loop) {
					// The loop parameter only works in the AS3 player when used in conjunction with the playlist parameter.
					// playlist parameter for a single video should have the video code as its value.
					parsedLink += '&playlist=' + vidCode;
				}
				// Append autoplay attribute only in case of renderer.
				parsedLink += '&autoplay=' + Number(autoPlay);
			}
			return parsedLink;
		}

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('VIDEO_VALUE', dependencies);
			},
			_parseVideoLink: parseVideoLink,
			_decorate: function _decorate(control) {
				var self = this;

				control.properties.parsedVideoSrcLink = ko.pureComputed(function () {
					return self._parseVideoLink(this.getControlValue(), this.properties.loop(), this.properties.showControls(), this.properties.autoPlay());
				}, control);
			},
			isApplied: function isApplied(control) {
				return control.properties.hasOwnProperty('parsedVideoSrcLink');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValueDecorator = __webpack_require__(19);

		//endregion

		return ValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_doDecorate: function _doDecorate(control) {
				this._super(control);

				//@override setValue, but keep reference
				var __superSetValue = control.setValue;
				control.setValue = function (value) {
					if (typeof value === 'string') {
						value = []; //set empty array as string cannot be supported
					}
					__superSetValue.call(control, value);
				};

				control.ojIdentityObj.value = control.value;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValueDecorator = __webpack_require__(19),
		    _ = __webpack_require__(0);

		//endregion

		return ValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_doDecorate: function _doDecorate(control) {
				this._super(control);

				control.setValue = function (value) {
					if (_.isArray(value)) {
						value = value[0] === 'true';
					}
					control.value(!!value);
					var ojComponent = control.getOjComponent();
					ojComponent('option', 'value', [!!value + '']);
				};
				control.value.subscribe(function (newValue) {
					control.setValue(newValue);
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    Payload = __webpack_require__(141),
		    ko = __webpack_require__(1),
		    PayloadUtil = __webpack_require__(142),
		    _ = __webpack_require__(0);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('VALUE', dependencies);
			},
			_decorate: function _decorate(control) {

				control.setValue = function (value) {
					//We want to skip controls inside repeatables, as they are initialized by its parent directly
					_.each(control.getAllControls(true), function (innerControl) {
						PayloadUtil.initValueFromPayload(innerControl, value);
					});
				};
				control.initRow = function (value, repeatableControl) {
					if (repeatableControl.properties.fromConnector()) {
						control.setValue(value);
					} else {
						//init when receiving from payload.
						//This keeps the payload as _payload to get it in getControlValue
						control.initValue(value);
					}
				};
				control.initValue = function (value) {
					control._payload = new Payload({
						payload: value
					});
					control.setValue(value);
				};
				control.getControlValue = function () {
					var rowPayload = control._payload || new Payload({});
					rowPayload.doUpdateBindings(control.getAllControls(true));
					return rowPayload.getBindings();
				};

				control.isRowSelected = ko.pureComputed({
					read: function read() {
						return _.contains(control._parent.selectedRows(), control);
					},
					write: function write(value) {
						var isSelected = control.isRowSelected();
						if (value && !isSelected) {
							if (control._parent.properties.multipleSelection()) {
								control._parent.selectedRows.push(control);
							} else {
								//If this is selected, but we don't have multiple selection, set the value to override the previous value
								control._parent.selectedRows([control]);
							}
						} else if (!value && isSelected) {
							control._parent.selectedRows.remove(control);
						}
					}
				});
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('getControlValue');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0);

		//endregion

		function escapeKey(key) {
			return key.replace(/\./g, '\\.');
		}

		function unescapeKey(key) {
			return key.replace(/\\\./g, '.');
		}

		/**
   * this regex will match any key except the dots used for separating json levels
   * Here is a more detailed explanation:
   * https://regex101.com/r/urk7iV/1
   */
		var splitRegex = /((?:\\\.|[^.])+)/g;

		function splitKeys(keys) {
			var splittedKeys = keys.match(splitRegex);

			return {
				first: unescapeKey(splittedKeys[0]),
				rest: splittedKeys.slice(1).join('.')
			};
		}

		return Class.subClass({}, {
			init: function init() {},
			toKeyValue: function toKeyValue(json) {
				var keyValue;

				if (_.isArray(json)) {
					keyValue = [];
					_.each(json, function (row) {
						keyValue.push(this.toKeyValue(row));
					}, this);
				} else if (_.isObject(json)) {
					keyValue = {};
					_.each(_.keys(json), function (key) {
						this._setKeyValue(keyValue, escapeKey(key), json[key]);
					}, this);
				} else {
					keyValue = json;
				}

				return keyValue;
			},
			toJSON: function toJSON(keyValue) {
				var json;
				if (_.isArray(keyValue)) {
					json = [];
					_.each(keyValue, function (row) {
						json.push(this.toJSON(row));
					}, this);
				} else if (_.isObject(keyValue)) {
					json = {};
					_.each(_.keys(keyValue), function (key) {
						var keys = splitKeys(key);
						this._setJSON(json, keys.first, keys.rest, keyValue[key]);
					}, this);
				} else {
					json = keyValue;
				}

				return json;
			},

			_setKeyValue: function _setKeyValue(keyValue, key, value) {
				if (_.isArray(value)) {
					keyValue[key] = this.toKeyValue(value);
				} else if (_.isObject(value)) {
					if (_.size(value) > 0) {
						_.each(_.keys(value), function (innerKey) {
							var newKey = key + '.' + escapeKey(innerKey);
							this._setKeyValue(keyValue, newKey, value[innerKey]);
						}, this);
					} else {
						keyValue[key] = {};
					}
				} else {
					keyValue[key] = value;
				}
			},

			_setJSON: function _setJSON(json, firstKey, otherKeys, value) {

				if (_.isEmpty(otherKeys)) {
					if (_.isArray(value)) {
						json[firstKey] = [];
						_.each(value, function (row) {
							json[firstKey].push(this.toJSON(row));
						}, this);
					} else {
						json[firstKey] = value;
					}
				} else {
					json[firstKey] = json[firstKey] || {};
					var keys = splitKeys(otherKeys);
					this._setJSON(json[firstKey], keys.first, keys.rest, value);
				}
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValueDecorator = __webpack_require__(19);

		//endregion

		return ValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_decorate: function _decorate(control) {
				this._super(control);

				control.getControlValue = function () {
					return control.value();
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValueDecorator = __webpack_require__(19),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return ValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_doDecorate: function _doDecorate(control) {
				this._super(control);

				//@override setValue, but keep reference
				var __superSetValue = control.setValue;
				control.setValue = function (value) {
					if (!ko.unwrap(control.properties.multiple) && _.isArray(value)) {
						__superSetValue.call(control, value[0]);
					} else {
						__superSetValue.call(control, value);
					}
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValueDecorator = __webpack_require__(19),
		    ko = __webpack_require__(1);

		//endregion

		return ValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_doDecorate: function _doDecorate(control) {
				this._super(control);
				control.initValue = function (value) {
					var defaultLinkValue = this.properties.anchor() ? this.resolvePreviewId(ko.utils.unwrapObservable(this.properties.defaultOption)[0]) : ko.utils.unwrapObservable(this.properties.defaultValue);
					var valBinding = !this._isNullEmptyOrUndefined(value) && !this._isNullEmptyOrUndefined(value.value) ? value.value : defaultLinkValue;
					this.setValue(valBinding);
					var labelBindVal = !this._isNullEmptyOrUndefined(value) && !this._isNullEmptyOrUndefined(value.label) ? value.label : ko.utils.unwrapObservable(this.properties.defaultLabel);
					this.setLabelVal(labelBindVal);
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValueDecorator = __webpack_require__(19),
		    ValueHelper = __webpack_require__(49);

		//endregion

		return ValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_doDecorate: function _doDecorate(control) {
				this._super(control);

				control.setValue = function (value) {
					ValueHelper.setDate(control, 'ojInputDate', control.properties.dateConverter(), value);
				};
				control._getRawValue = function () {
					return ValueHelper.getRawValue(control);
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValueDecorator = __webpack_require__(19),
		    ValueHelper = __webpack_require__(49);

		//endregion

		return ValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_doDecorate: function _doDecorate(control) {
				this._super(control);

				control.setValue = function (value) {
					ValueHelper.setRawValue(control, 'ojInputTime', value);
				};

				control._getRawValue = function () {
					return ValueHelper.getRawValue(control);
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ValueDecorator = __webpack_require__(19),
		    ValueHelper = __webpack_require__(49);

		//endregion

		return ValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_doDecorate: function _doDecorate(control) {
				this._super(control);

				control.setValue = function (value) {
					ValueHelper.setNumber(control, value);
				};
				control._getRawValue = function () {
					return ValueHelper.getRawValue(control);
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    ko = __webpack_require__(1),
		    koToJSUtil = __webpack_require__(21),
		    DotExpressionResolver = __webpack_require__(23),
		    EventsId = __webpack_require__(14),
		    _ = __webpack_require__(0);

		//endregion

		function doAddRow(control, row) {
			var newRow = control.createRow(row);
			control.eventsQueue.execute(newRow, EventsId.ON_ADD_ROW);
			control.dataSource.push(newRow);
		}

		function doRemoveRow(control, index) {
			var removedRow = control.dataSource()[index];
			removedRow.indexBeforeRemove = index;
			control.eventsQueue.execute(removedRow, EventsId.ON_REMOVE_ROW);
			control.dataSource.remove(removedRow);
			control.selectedRows([]);
		}

		function _initValueFromRest(repeatableControl) {
			var array = [];
			_.each(repeatableControl.properties.optionsFeed().optionsResolver()._options(), function (value) {
				var mapped = {};
				_.each(repeatableControl._getAllBindableControls(), function (control) {
					mapped[control.properties.binding()] = DotExpressionResolver.getPCSCompatibleValue(value, control.properties.connectorMapping());
				});
				array.push(mapped);
			});
			repeatableControl.setValue(array);
			repeatableControl.executeEvent(EventsId.ON_CHANGE.value);
		}

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('VALUE', dependencies);
			},
			_decorate: function _decorate(control) {

				control.dataSource = ko.observableArray([]);
				control.dataSourcePage = ko.pureComputed(function () {
					return control.dataSource();
				});
				control.getRows = function () {
					return control.dataSource();
				};
				control.getAllRows = control.getRows;

				control.value = control.context.payloadContext.getObservableArrayForBinding(control);
				//Create a new row
				control.addRow = function () {
					var v = {};
					if (control.properties.hideBindings && control.properties.hideBindings()) {
						//When the array is of type String[] (or other simple type),
						// we don't want to have an object, but the observable directly
						v = ko.observable();
					}
					control.value.push(v);
				};
				control.removeRow = function (row) {
					var index = control.dataSource().indexOf(row);
					control.value.remove(control.value()[index]);
				};
				control.removeSelectedRow = function () {
					var value = control.value();
					_.each(control.selectedRows(), function (row) {
						var index = control.dataSource().indexOf(row);
						value = _.without(value, control.value()[index]);
					});
					control.value(value);
				};

				control.getControlValue = function () {
					return koToJSUtil.toJS(control.value());
				};

				control.getSelectedRows = function () {
					var selection = control.selectedRows();
					if (control.properties.multipleSelection()) {
						//If multiple selection, returned it ordered
						return _.sortBy(selection, function (row) {
							return control.dataSource.indexOf(row);
						});
					} else if (selection.length > 0) {
						//If single selection and something is selected, return it as an element, not an array
						return selection[0];
					}
					//Default value should be empty, to avoid breaking events
					return [];
				};

				control.setValue = function (array) {
					var valueArray = [];
					_.each(_.first(array, control.properties.maxRows()), function (value) {
						var v = value || {};
						if (control.properties.hideBindings && control.properties.hideBindings() && !ko.isObservable(value)) {
							//When the array is of type String[] (or other simple type),
							// we don't want to have an object, but the observable directly
							v = ko.observable(value);
						}
						valueArray.push(v);
					}, this);
					control.value(valueArray);
				};

				control.initValue = function (array) {
					if (!control.properties.fromConnector()) {
						control.setValue(array);
					}
				};

				//If the repeatable has to hideBindings, make sure that the value is valid,
				// setValue has some processing that corrects any issue
				if (control.properties.hideBindings && control.properties.hideBindings()) {
					control.setValue(control.value());
				}

				//Subsribing to array change allows us to avoid extra processing when the values are set
				// to the same old value
				control.value.subscribe(function (changes) {
					//Remove rows in reverse order
					_.each(_.sortBy(changes, function (change) {
						return -change.index;
					}), function (change) {
						if (change.status === 'deleted') {
							doRemoveRow(control, change.index);
						}
					});

					//Add rows in regular order
					_.each(changes, function (change) {
						if (change.status === 'added') {
							doAddRow(control, change.value);
						}
					});
				}, control, 'arrayChange');

				//Initialize the value to create the controls
				_.each(control.value(), function (row) {
					doAddRow(control, row);
				});

				control.getContextForChildren = function (child) {
					var index = this.getRows().indexOf(child);
					if (index > -1) {
						return this.getBindingContext() + this.properties.binding() + '[' + index + '].';
					}
					return this.getBindingContext() + this.properties.binding() + '.';
				};

				if (control.properties.fromConnector() && !control._restSubscription) {
					control._restSubscription = control.properties.optionsFeed().optionsResolver()._options.subscribe(_initValueFromRest.bind(this, control));
				}

				control.saveValue = function (saveData) {
					var binding = control.context.payloadContext.getFullBindingContextFor(control);
					if (!_.isEmpty(binding)) {
						saveData[binding] = saveData[binding] || [];
						_.each(control.getRows(), function (row, i) {
							saveData[binding][i] = saveData[binding][i] || {};
							_.each(row.getAllControls(), function (childControl) {
								if (control.properties.hideBindings && control.properties.hideBindings()) {
									saveData[binding][i] = childControl.getControlValue();
								} else {
									childControl.saveValue(saveData[binding][i]);
								}
							});
						});
					}
				};
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('value');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    _ = __webpack_require__(0);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_decorate: function _decorate(control) {

				control._buildForm = function (form, presentation) {
					return _.extend(presentation, {
						eventActions: form.eventActions,
						calls: form.calls,
						payload: control.getControlValue()
					});
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    SilentLoader = __webpack_require__(140),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('REFERENCE_LAZY_DECORATOR', dependencies);
			},
			_decorate: function _decorate(control) {

				var _getBindings = control.getBindings;
				control.getBindings = function () {
					if (control.rendered()) {
						return _getBindings.call(control);
					} else {
						control._silentModel = SilentLoader.load({
							form: _.extend({}, control.selectedPresentation(), {
								payload: control.value()
							}),
							config: _.clone(control.getConfig())
						});
						return control._silentModel.getBindings();
					}
				};

				var _rendered = control.rendered;

				control.rendered = ko.pureComputed({
					read: function read() {
						return _rendered() && control.controlsLoaded();
					},
					write: function write(value) {
						_rendered(value);
					}
				});
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('getBindings');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (exports, _ControlDecorator) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ControlDecorator2 = _interopRequireDefault(_ControlDecorator);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	exports.default = _ControlDecorator2.default.subClass({}, {
		init: function init(dependencies) {
			this._super('REFERENCE_PRESENTATION_DECORATOR', dependencies);
		},
		_decorate: function _decorate(control) {
			control.selectedPresentation = function () {
				return control.form;
			};
			control._getPresentation = function (id) {
				return this.form;
			};
		},
		isApplied: function isApplied(control) {
			return control.hasOwnProperty('selectedPresentation');
		}
	});
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var TranslationsDecorator = __webpack_require__(144);

		//endregion

		return TranslationsDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_decorate: function _decorate(control, context) {
				this._super(control, context);

				control.properties.optionsFeed().optionsResolver().translate(control, context);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super('COMPUTED_VALUE_DECORATOR', dependencies);
				this.computedSuffix = '_computed';
			},
			_decorate: function _decorate(control, context) {
				var self = this;
				var afterInitValue = function afterInitValue(control) {

					if (control.properties.computed && control.properties.computed() && control.properties.computedValue) {
						var key = control.id + self.computedSuffix;
						control.properties.computedValue.decorate(context.viewModel, key);
					}
					return true;
				};

				afterInitValue(control);
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('value');
			}

		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlDecorator = __webpack_require__(10),
		    oj = __webpack_require__(7),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1);

		//endregion

		return ControlDecorator.subClass({}, {
			init: function init() {
				this._super('GET_OJ_COMPONENT');
			},
			_decorate: function _decorate(control) {
				control._deferredOjComponentCalls = [];
				var defaultOjComponent = function defaultOjComponent() {
					control._deferredOjComponentCalls.push(arguments);
					return control._deferredOjComponentCalls;
				};
				//TODO add domIdPrefix as a decorator and as a dependency on this one.
				control.getOjComponent = function () {
					var ojComponentWidgetRef = oj.Components.getWidgetConstructor($('#' + this.domIdPrefix + ko.utils.unwrapObservable(this.id))[0]);
					if (ojComponentWidgetRef && ojComponentWidgetRef()) {
						return ojComponentWidgetRef;
					}
					return defaultOjComponent;
				};

				var afterRender = function afterRender(control) {
					defaultOjComponent = function defaultOjComponent() {};
					//If the default oj component is returned after the control is renderered, it means that the control is loading or somehow invalid.
					//The validation checks for this and validates silently if not loaded
					defaultOjComponent.isNotLoaded = true;

					var ojComponent = control.getOjComponent();
					_.each(control._deferredOjComponentCalls, function (callArguments) {
						ojComponent.apply(ojComponent, callArguments);
					});
					control._deferredOjComponentCalls = [];
					if (control.afterOjComponentInit) {
						control.afterOjComponentInit();
					}
					return true; //returning true so the listener is detached.
				};

				control.registerRenderListener(afterRender);
			},
			isApplied: function isApplied(control) {
				return control.hasOwnProperty('getOjComponent');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SelectValueDecorator = __webpack_require__(143),
		    _ = __webpack_require__(0);

		//endregion

		return SelectValueDecorator.subClass({}, {
			init: function init(dependencies) {
				this._super(dependencies);
			},
			_decorate: function _decorate(control) {
				this._super(control);

				//@override setValue, but keep reference
				var __superSetValue = control.setValue;
				control.setValue = function (value) {
					if (_.isArray(value)) {
						value = _.map(value, function (v) {
							return v.toString();
						});
					} else {
						value = value.toString();
					}
					__superSetValue.call(control, value);
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 330 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiDQoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ig0KCSB2aWV3Qm94PSItNi41IC0zLjUgMzIgMzIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTYuNSAtMy41IDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiMwNTcyQ0UiIGQ9Ik0wLjk4Myw3Ljk3NFY1Ljk4N2MwLTEuMTA0LDAuODY0LTIsMS45NjktMkg0Ljk5VjIuMDQ2YzAtMS4xMDUsMC43MTktMiwxLjYwNi0yaDYuNzg4DQoJYzAuODg4LDAsMS42MDYsMC44OTUsMS42MDYsMnYxLjk0MWgyLjAxMWMxLjEwNCwwLDEuOTcsMC44OTYsMS45NywydjIuMDA1TDAuOTgzLDcuOTc0eiBNMTEuMDYyLDEuOTI1SDguOTgyDQoJQzguMTczLDEuOTA5LDguMDM4LDIuMjA2LDcuOTksMi44NzVDNy45NTIsMy4zOTksNy45OTIsNC4wNTgsNy45OTIsNC4wNThoMy45OTJjMCwwLDAuMDI5LTAuNjU4LDAuMDI5LTEuMTgzDQoJUzEyLjAxNiwxLjg3NiwxMS4wNjIsMS45MjV6IE0xNy4wMTgsMjMuMDE4YzAsMC41NTMtMC40NzksMS0xLjAzMSwxSDQuMDU2Yy0wLjU1MSwwLTEuMDMtMC40NDctMS4wMy0xVjkuMDQxaDEzLjk5MlYyMy4wMTh6Ii8+DQo8L3N2Zz4NCg=="

/***/ }),
/* 331 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiDQoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ig0KCSB2aWV3Qm94PSItMy41IC0zLjUgMzIgMzIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTMuNSAtMy41IDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiMwNTcyQ0UiIGQ9Ik0yMy44OTYsMTQuOTAyaC04Ljk5NHY4Ljk4OGMwLDAuNTUzLTAuNDQ3LDEtMSwxaC0xLjk2Yy0wLjU1MiwwLTEtMC40NDctMS0xdi04Ljk4OEgxLjk1Mw0KCWMtMC41NTMsMC0xLTAuNDQ3LTEtMXYtMS45NmMwLTAuNTUyLDAuNDQ3LTEsMS0xaDguOTg5VjEuOTQ4YzAtMC41NTIsMC40NDgtMSwxLTFoMS45NmMwLjU1MywwLDEsMC40NDgsMSwxdjguOTk0aDguOTk0DQoJYzAuNTUyLDAsMSwwLjQ0OCwxLDF2MS45NkMyNC44OTYsMTQuNDU1LDI0LjQ0OCwxNC45MDIsMjMuODk2LDE0LjkwMnoiLz4NCjwvc3ZnPg0K"

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var AbstractCallDefinition = __webpack_require__(333),
		    _ = __webpack_require__(0);

		//endregion

		return AbstractCallDefinition.subClass({}, {

			init: function init(jsonModel) {
				this._super(jsonModel);
				this.formValues = jsonModel.formValues;
			},
			toJS: function toJS() {
				return _.extend(this._super(), {
					formValues: this.formValues
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    ResponseMapping = __webpack_require__(131);

		//endregion

		return Class.subClass({}, {

			init: function init(jsonModel) {
				this.id = jsonModel.id;
				this.response = ko.observable(new ResponseMapping(jsonModel.response));
			},
			toJS: function toJS() {
				return {
					id: this.id,
					response: this.response().toJS()
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    UUID = __webpack_require__(17),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    DefaultFormHandler = __webpack_require__(124),
		    DefaultCssHandler = __webpack_require__(125),
		    DefaultOutcomeHandler = __webpack_require__(129),
		    DefaultTranslationsHandler = __webpack_require__(82),
		    DefaultTypeHandler = __webpack_require__(126);

		//endregion

		return Class.subClass({
			preProcess: function preProcess(json) {
				json = ko.utils.unwrapObservable(json);
				json.form = json.form || {};
				json.config = json.config || {};

				var id = UUID.createUuid();
				_.defaults(json.form, {
					id: id,
					name: id,
					description: '',
					controls: [],
					calls: [],
					allBundles: []
				});
				_.defaults(json.config, {
					formHandler: DefaultFormHandler.create(),
					cssHandler: DefaultCssHandler.create(),
					typeHandler: DefaultTypeHandler.create(),
					outcomeHandler: DefaultOutcomeHandler.create(),
					translationsHandler: DefaultTranslationsHandler.create(),
					readOnly: false,
					domIdPrefix: ''
				});
				_.defaults(json, {
					dependencies: []
				});
				return json;
			}
		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var _ = __webpack_require__(0),
		    $ = __webpack_require__(2),
		    Presentation = __webpack_require__(336),
		    EventsId = __webpack_require__(14),
		    LoadingSpinner = __webpack_require__(91),
		    EventsTranslator = __webpack_require__(386),
		    ko = __webpack_require__(1),
		    Payload = __webpack_require__(141),
		    FormExtensions = __webpack_require__(387),
		    PayloadUtil = __webpack_require__(142);

		//endregion

		return Presentation.subClass({}, {
			init: function init(json, context) {
				context.config().translationsHandler.setAllBundles(json.allBundles);
				context.config().translationsHandler.fetchCurrentLanguage();
				this._super(json, context);

				this.extensions = new FormExtensions(json, context);
				this.payload = new Payload(json, context);
				//adding payload to the context, used to get options dynamically.
				context.payload(this.payload);

				this.controlsLoaded = ko.observable(this.controls().length === 0);
				this.loadEventsExecuted = ko.observable(!!this.viewModel.staticForm);

				var self = this;
				this.loaded = ko.pureComputed({
					read: function read() {
						return self.controlsLoaded() && self.loadEventsExecuted();
					}
				});
			},
			initPayloadAndRunEvents: function initPayloadAndRunEvents() {
				var self = this;
				self.populateValues();

				EventsTranslator.translate(self.extensions.eventActions());
				//Finally run the onLoad event
				setTimeout(function () {
					self.executeOnLoadEvents();
				});
			},
			populateValues: function populateValues() {

				var payloadBindings = this.payload.getBindings();
				if (_.size(payloadBindings) > 0) {
					//Skip the controls inside repeatables, as they are set by its parent
					_.each(this.getAllControls(true), function (control) {
						PayloadUtil.initValueFromPayload(control, payloadBindings);
					}, this);

					//set the values in the payload Context
					_.each(payloadBindings, function (value, key) {
						//Only set values that are not observables,
						// as values that are observables are already set by controls
						// and each control may have a custom setValue (ie. DateValueDecorator)
						// overriding that can create issues
						if (!this.payload.payloadContext.isObservableDefined(key)) {
							this.payload.payloadContext.setValue(key, value);
						}
					}, this);
				}
			},
			updateBindings: function updateBindings() {
				this.payload.updateBindings(this.controls);
			},
			saveValue: function saveValue() {
				var saveDataPayload = this.payload.toJS();
				var saveData = {};

				_.each(this.getAllControls(), function (control) {
					control.saveValue(saveData);
				});
				return _.extend({}, saveDataPayload, saveData);
			},
			getBindings: function getBindings() {
				this.updateBindings();
				return this.payload.getBindings();
			},
			changePresentation: function changePresentation(presentationId) {
				this.viewModel.changePresentation(presentationId);
			},
			executeOnLoadEvents: function executeOnLoadEvents() {
				var self = this;

				return this.executeGlobalConnectors().then(function () {
					return self.executeEventOnAll(EventsId.ON_LOAD.value).then(function () {
						self.loadEventsExecuted(true);
						LoadingSpinner.fadeOut();
					});
				}).catch( /*istanbul ignore next*/function () {
					LoadingSpinner.fadeOut();
				});
			},
			afterRenderingRowControls: function afterRenderingRowControls(dom) {
				var self = this;
				var subscribe = self.viewModel.context.runningAsyncTemplates.subscribe(function (val) {
					if (val === 0) {
						subscribe.dispose();
						self.viewModel.context.focusControl($(dom).parents('form-renderer').find('[autofocus]'));
						self.controlsLoaded(true);
					}
				});
			},
			toJS: function toJS() {
				return _.extend(this._super(), this.extensions.toJS(), {
					payload: this.payload.toJS(),
					calls: this._callsToJS()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		/* globals Promise */

		//region dependencies

		var ko = __webpack_require__(1),
		    Form = __webpack_require__(145),
		    ControlTypeId = __webpack_require__(4),
		    _ = __webpack_require__(0),
		    EventActionsMap = __webpack_require__(86),
		    ControlPropertiesMap = __webpack_require__(87),
		    ControlFactory = __webpack_require__(88),
		    BlockFactory = __webpack_require__(43),
		    EventReference = __webpack_require__(148),
		    TreeUtil = __webpack_require__(40),
		    $ = __webpack_require__(2),
		    ControlEventsMap = __webpack_require__(151),
		    UUID = __webpack_require__(17);

		//endregion

		var DEFAULT_BORDER_COLOR = '#d6dfe6',
		    DEFAULT_BACKGROUND_COLOR = '#ffffff';

		return Form.subClass({}, {
			type: ControlTypeId.FORM_PRESENTATION,
			init: function init(json, context) {
				this._super(json);
				this.viewModel = context.viewModel;
				context.calls = this.calls;

				_.defaults(json, {
					borderColor: DEFAULT_BORDER_COLOR,
					borderStyle: null,
					borderWidth: null,
					backgroundColor: DEFAULT_BACKGROUND_COLOR,
					properties: {}
				});

				_.extend(this.properties, {
					borderColor: ko.observable(json.borderColor),
					borderStyle: ko.observable(json.borderStyle),
					borderWidth: ko.observable(json.borderWidth),
					backgroundColor: ko.observable(json.backgroundColor)
				});
				this.name = this.properties.name;

				this.globalConnectors = ko.observableArray();
				this.globalScope = new context.scopeFactory.Scope(null, this.globalConnectors);
				this.globalScope.eventControl = this;
				this.viewModel.globalScope = this.globalScope;
				var globalConnectors = [];
				_.each(ko.unwrap(json.properties.globalConnectors), function (connector) {
					globalConnectors.push(BlockFactory.createBlock(context.viewModel, connector, this.viewModel.globalScope));
				}, this);
				this.globalConnectors(globalConnectors);

				var controls = [];
				_.each(json.controls, function (controlData) {
					var row = ControlFactory.createControl(controlData.id, controlData.name, controlData.type, controlData, context, this);
					controls.push(row);
				}, this);

				this.controls = ko.observableArray(controls);

				this.isValid = ko.pureComputed(function () {
					return _.every(this.controls(), function (control) {
						return control.isValid();
					});
				}.bind(this));

				var events = [];
				_.each(ko.unwrap(json.properties.events), function (event) {
					events.push(new EventReference(event.id, context.viewModel));
				}, this);
				this.events = ko.observableArray(events);

				this.computedPresentations = ko.pureComputed(function () {
					return _.map(ko.unwrap(context.viewModel.form().presentations), function (presentation) {
						return {
							value: presentation.id,
							label: ko.unwrap(presentation.name)
						};
					});
				});
			},

			executeGlobalConnectors: function executeGlobalConnectors() {
				var connectorPromise = [];

				_.each(this.globalConnectors(), function (con) {
					if (!con.connectorFeed.properties().skipDuringLoad()) {
						connectorPromise.push(con.execute());
					}
				});

				return _promise2.default.all(connectorPromise);
			},
			/**
    * Return the current presentation
    * This allows to do form.presentation() in both builder (in which form is a form that has presentations) and renderer (in which form is the presentation)
    * @returns Presentation
    */
			presentation: function presentation() {
				return this;
			},

			executeEvent: function executeEvent(trigger) {
				var events = [];
				_.each(this.events(), function (eventRef) {
					var eventTrigger = eventRef.event().trigger;
					if (trigger === eventTrigger()) {
						events.push(eventRef.execute(this));
					}
				}, this);
				return _promise2.default.all(events);
			},
			executeEventOnAll: function executeEventOnAll(trigger) {
				var events = [this.executeEvent(trigger)];
				var self = this;
				$.each(self.getAllControls(true), function (i, control) {
					events = events.concat(control.executeEventOnAll(trigger));
				});
				return _promise2.default.all(events);
			},
			getValidEvents: function getValidEvents() {
				return ControlEventsMap.PRESENTATION;
			},
			/** override */
			getAllControls: function getAllControls(skipControlsInsideRepeatables) {
				//getControls calls a function, in which repeatables skip the children
				//controls calls directly the observable
				return TreeUtil.treeToList(this.controls(), skipControlsInsideRepeatables ? 'getControls' : 'controls');
			},
			/** override */
			findControl: function findControl(controlId) {
				if (controlId === this.id) {
					return this;
				}
				var control = this.findControlAndParent(controlId);
				return control !== null ? control.node : null;
			},
			findClosest: function findClosest(id) {
				return this.findControl(id);
			},
			findControlInsideRepeatable: function findControlInsideRepeatable(controlId) {
				var control = this.findControl(controlId);
				if (!control) {
					_.any(this.getAllControls(true), function (childControl) {
						if (childControl.isRepeatable()) {
							control = childControl.findControlInsideRepeatable(controlId);
							return !!control;
						}
					});
				}
				return control;
			},
			/** override */
			getAllPresentationControls: function getAllPresentationControls() {
				return _.union([this], this.getAllControls());
			},
			findControlAndParent: function findControlAndParent(controlId) {
				return TreeUtil.find(this, 'controls', 'id', controlId);
			},
			getContextForChildren: function getContextForChildren(child) {
				return '';
			},
			getStyleMapper: function getStyleMapper() {
				return [];
			},
			getControlActions: function getControlActions() {
				return EventActionsMap[ControlTypeId.FORM_PRESENTATION];
			},
			getControlEventProperties: function getControlEventProperties() {
				return ControlPropertiesMap[ControlTypeId.FORM_PRESENTATION];
			},
			makeCopy: function makeCopy() {
				var copy = this.toJS();
				copy.id = UUID.createUuid();
				var controls = [];
				_.each(this.controls(), function (control) {
					controls.push(control.makeCopy());
				});
				copy.controls = controls;
				return copy;
			},
			isRepeatable: function isRepeatable() {
				return false;
			},
			toJS: function toJS() {
				var controls = [];
				_.each(this.controls(), function (control) {
					controls.push(control.toJS());
				});
				var events = [];
				_.each(this.events(), function (event) {
					events.push(event.toJS());
				});
				var globalConnectors = [];
				_.each(this.globalConnectors(), function (connector) {
					globalConnectors.push(connector.toJS());
				});

				return {
					id: this.id,
					name: this.properties.name(),
					description: this.properties.description(),
					borderColor: this.properties.borderColor(),
					borderWidth: this.properties.borderWidth(),
					borderStyle: this.properties.borderStyle(),
					backgroundColor: this.properties.backgroundColor(),
					controls: controls,
					properties: {
						events: events,
						globalConnectors: globalConnectors
					}
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    ControlTypeId = __webpack_require__(4);

		//endregion

		return Control.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, context.getControlDefinitionByType(ControlTypeId.BUTTON), properties, context, parent);
				_.defaults(properties, {
					readonly: false
				});

				this.properties.readonly = ko.observable(properties.readonly); // when dropped inside Parents (Repeatable or table), they have a Inheritable property 'readonly'
			},
			hasValueProperty: function hasValueProperty() {
				return false;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 338 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_338__;

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var InputTextControl = __webpack_require__(34),
		    _ = __webpack_require__(0),
		    ControlTypeId = __webpack_require__(4),
		    ko = __webpack_require__(1);

		//endregion

		return InputTextControl.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, properties, context, parent, context.getControlDefinitionByType(ControlTypeId.TEXT_AREA));

				_.defaults(properties, {
					rows: null
				});

				this.properties.rows = ko.observable(properties.rows);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ActionsMap = __webpack_require__(58);
		var _ = __webpack_require__(0);
		var StyleActionsMap = __webpack_require__(341);

		//endregion

		return {
			createAction: function createAction(viewModel, scope, model, control, actionName) {
				var action = ActionsMap[actionName] || StyleActionsMap[actionName] || ActionsMap.DO_NOTHING;
				//If control is an array, we keep only the first, as we need it for a default value and type check only
				// the only case for this being an array is multiple selection, and all controls would be the same type
				control = _.isArray(control) ? control[0] : control;
				return new action.Action(model, viewModel, scope, control);
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5);
		var SetStyleAction = __webpack_require__(342);
		var StyleTypeId = __webpack_require__(47);
		var ToggleClassAction = __webpack_require__(90);
		var AddClassAction = __webpack_require__(343);
		var RemoveClassAction = __webpack_require__(344);
		//endregion

		return {
			'BACKGROUND_COLOR': {
				value: 'BACKGROUND_COLOR',
				label: StyleTypeId.BACKGROUND_COLOR.label,
				Action: SetStyleAction.createStyleAction('BACKGROUND_COLOR', StyleTypeId.BACKGROUND_COLOR)
			},
			'COLOR': {
				value: 'COLOR',
				label: StyleTypeId.COLOR.label,
				Action: SetStyleAction.createStyleAction('COLOR', StyleTypeId.COLOR)
			},
			'SIZE': {
				value: 'SIZE',
				label: StyleTypeId.SIZE.label,
				Action: SetStyleAction.createStyleAction('SIZE', StyleTypeId.SIZE)
			},
			'TEXT_ALIGN': {
				value: 'TEXT_ALIGN',
				label: StyleTypeId.TEXT_ALIGN.label,
				Action: SetStyleAction.createStyleAction('TEXT_ALIGN', StyleTypeId.TEXT_ALIGN)
			},
			'WIDTH': {
				value: 'WIDTH',
				label: StyleTypeId.WIDTH.label,
				Action: SetStyleAction.createStyleAction('WIDTH', StyleTypeId.WIDTH)
			},
			'HEIGHT': {
				value: 'HEIGHT',
				label: StyleTypeId.HEIGHT.label,
				Action: SetStyleAction.createStyleAction('HEIGHT', StyleTypeId.HEIGHT)
			},
			'BORDER_COLOR': {
				value: 'BORDER_COLOR',
				label: StyleTypeId.BORDER_COLOR.label,
				Action: SetStyleAction.createStyleAction('BORDER_COLOR', StyleTypeId.BORDER_COLOR)
			},
			'BORDER_STYLE': {
				value: 'BORDER_STYLE',
				label: StyleTypeId.BORDER_STYLE.label,
				Action: SetStyleAction.createStyleAction('BORDER_STYLE', StyleTypeId.BORDER_STYLE)
			},
			'BORDER_WIDTH': {
				value: 'BORDER_WIDTH',
				label: StyleTypeId.BORDER_WIDTH.label,
				Action: SetStyleAction.createStyleAction('BORDER_WIDTH', StyleTypeId.BORDER_WIDTH)
			},
			'BORDER_RADIUS': {
				value: 'BORDER_RADIUS',
				label: StyleTypeId.BORDER_RADIUS.label,
				Action: SetStyleAction.createStyleAction('BORDER_RADIUS', StyleTypeId.BORDER_RADIUS)
			},
			'CONTROL_ALIGN': {
				value: 'CONTROL_ALIGN',
				label: StyleTypeId.CONTROL_ALIGN.label,
				Action: SetStyleAction.createStyleAction('CONTROL_ALIGN', StyleTypeId.CONTROL_ALIGN)
			},
			'LABEL_COLOR': {
				value: 'LABEL_COLOR',
				label: StyleTypeId.LABEL_COLOR.label,
				Action: SetStyleAction.createStyleAction('LABEL_COLOR', StyleTypeId.LABEL_COLOR)
			},
			'LABEL_SIZE': {
				value: 'LABEL_SIZE',
				label: StyleTypeId.LABEL_SIZE.label,
				Action: SetStyleAction.createStyleAction('LABEL_SIZE', StyleTypeId.LABEL_SIZE)
			},

			'TOGGLE_CLASS': {
				value: 'TOGGLE_CLASS',
				label: msg.TOGGLE_CLASS,
				Action: ToggleClassAction
			},
			'ADD_CLASS': {
				value: 'ADD_CLASS',
				label: msg.ADD_CLASS,
				Action: AddClassAction
			},
			'REMOVE_CLASS': {
				value: 'REMOVE_CLASS',
				label: msg.REMOVE_CLASS,
				Action: RemoveClassAction
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventAction = __webpack_require__(8),
		    assert = __webpack_require__(59),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return EventAction.subClass({
			ACTION_NAME: '',
			STYLE: null,
			createStyleAction: function createStyleAction(actionName, styleType) {
				return this.subClass({
					ACTION_NAME: actionName,
					STYLE: styleType
				}, {
					init: function init(model, viewModel, scope, control) {
						this._super(model, viewModel, scope, control);
					}
				});
			}
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
				assert(!!this.style(), 'SetStyleAction class is abstract');

				var defaultValue = control ? ko.unwrap(control.properties.formattedStyle()[this.style().name]) : null;
				defaultValue = defaultValue || this.style().default;

				this.value = ko.observable(model.value || defaultValue);
			},

			template: function template() {
				return 'styleValueEventTemplate';
			},

			style: function style() {
				return this._class.STYLE;
			},

			execute: function execute(control) {
				var style = _.find(control.styles(), function (s) {
					return s.type.name === this.style().name;
				}, this);
				style.value(this.value());
			},

			toJS: function toJS() {
				return _.extend({}, this._super(), {
					value: this.value()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ToggleClassAction = __webpack_require__(90),
		    _ = __webpack_require__(0);

		//endregion

		return ToggleClassAction.subClass({
			ACTION_NAME: 'ADD_CLASS'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			},

			execute: function execute(control) {
				var style = _.find(control.styles(), function (s) {
					return s.type.name === this.style().name;
				}, this);
				var classes = style.value().split(' ');
				style.value(classes.concat([this.value()]).join(' '));
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ToggleClassAction = __webpack_require__(90),
		    _ = __webpack_require__(0);

		//endregion

		return ToggleClassAction.subClass({
			ACTION_NAME: 'REMOVE_CLASS'
		}, {
			init: function init(model, viewModel, scope, control) {
				this._super(model, viewModel, scope, control);
			},

			execute: function execute(control) {
				var style = _.find(control.styles(), function (s) {
					return s.type.name === this.style().name;
				}, this);
				var classes = style.value().split(' ');
				style.value(_.without(classes, this.value()).join(' '));
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5);
		//endregion

		var Comparators = {
			'IS_TRUE': {
				value: 'IS_TRUE',
				label: msg.IS_TRUE,
				isTrue: function isTrue(v1) {
					return !!v1;
				}
			},
			'IS_FALSE': {
				value: 'IS_FALSE',
				label: msg.IS_FALSE,
				isTrue: function isTrue(v1) {
					return !Comparators.IS_TRUE.isTrue(v1);
				}
			},
			'EQUALS': {
				value: 'EQUALS',
				label: msg.EQUALS,
				isTrue: function isTrue(v1, v2) {
					/* jshint eqeqeq: false */
					//We are intentionally using the == comparator
					//So the user can compare with numbers, as the constant value will always be a string
					return v1 == v2;
				}
			},
			'NOT_EQUALS': {
				value: 'NOT_EQUALS',
				label: msg.NOT_EQUALS,
				isTrue: function isTrue(v1, v2) {
					return !Comparators.EQUALS.isTrue(v1, v2);
				}
			},
			'IS_GREATER': {
				value: 'IS_GREATER',
				label: msg.IS_GREATER,
				isTrue: function isTrue(v1, v2) {
					return v1 > v2;
				}
			},
			'IS_NOT_GREATER': {
				value: 'IS_NOT_GREATER',
				label: msg.IS_NOT_GREATER,
				isTrue: function isTrue(v1, v2) {
					return !Comparators.IS_GREATER.isTrue(v1, v2);
				}
			},
			'IS_LESS': {
				value: 'IS_LESS',
				label: msg.IS_LESS,
				isTrue: function isTrue(v1, v2) {
					return v1 < v2;
				}
			},
			'IS_NOT_LESS': {
				value: 'IS_NOT_LESS',
				label: msg.IS_NOT_LESS,
				isTrue: function isTrue(v1, v2) {
					return !Comparators.IS_LESS.isTrue(v1, v2);
				}
			},
			'IS_EMPTY': {
				value: 'IS_EMPTY',
				label: msg.IS_EMPTY,
				isTrue: function isTrue(v1) {
					return v1 instanceof Array && v1.length === 0 || v1 !== 0 && !v1;
				}
			}
		};

		return Comparators;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */
		//region dependencies

		var EventBlock = __webpack_require__(50),
		    ko = __webpack_require__(1),
		    BlockTypes = __webpack_require__(25),
		    _ = __webpack_require__(0),
		    LoadingSpinner = __webpack_require__(91),
		    OptionsFeed = __webpack_require__(89),
		    NameGenerator = __webpack_require__(57),
		    OptionsType = __webpack_require__(41);

		//endregion

		return EventBlock.subClass({
			TYPE: BlockTypes.CONNECTOR_BLOCK,
			TEMPLATE_NAME: 'event-connector-block'
		}, {
			init: function init(model, viewModel, scope) {
				var BlockFactory = __webpack_require__(43);
				this._super(model, viewModel, scope);

				this.connectorFeed = new OptionsFeed(OptionsType.EVENT_CONNECTOR.value, viewModel.context, model.connectorFeedProperties, scope.controlId);

				this.preventLoadingSpinner = ko.observable(model.preventLoadingSpinner);
				this.responseName = ko.observable(model.responseName || NameGenerator.generateName('response', scope.getAttributes()));

				var errorBlocks = [];
				_.each(model.errorBlocks, function (block) {
					errorBlocks.push(BlockFactory.createBlock(viewModel, block, scope));
				});
				this.errorBlocks = ko.observableArray(errorBlocks);

				this.form = viewModel.form();
				viewModel.form.subscribe(function (newForm) {
					this.form = newForm;
				}, this);
			},

			execute: function execute() {

				var self = this;
				LoadingSpinner.fadeIn(!this.preventLoadingSpinner());

				return new _promise2.default(function (resolve, reject) {

					self.connectorFeed.optionsResolver().controlId = self.scope.eventControl.id;
					self.connectorFeed.optionsResolver().loadConnector(self.form).then(function (response) {
						var valueResponse = response ? response.response : null;

						self.scope.setValue(self.responseName(), valueResponse);

						resolve();
					}).catch(function (e) {

						//ToDo 16.4.5 This should come parsed from the handler
						var error = JSON.parse(e);

						_.each(self.errorBlocks(), function (errorBloq) {
							errorBloq.execute(error);
						});

						reject();
					});
				});
			},

			getBundle: function getBundle() {
				var bundle = {};
				_.each(this.errorBlocks(), function (block) {
					_.extend(bundle, block.getBundle());
				});

				return bundle;
			},

			decorate: function decorate() {
				_.each(this.errorBlocks(), function (block) {
					block.decorate();
				});

				return true;
			},

			toJS: function toJS() {
				var errorBlocks = [];
				_.each(this.errorBlocks(), function (block) {
					errorBlocks.push(block.toJS());
				});

				return _.extend(this._super(), {
					connectorFeedProperties: this.connectorFeed.properties().toFullJS(),
					errorBlocks: errorBlocks,
					preventLoadingSpinner: this.preventLoadingSpinner(),
					responseName: this.responseName()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */
		//region dependencies

		var EventBlock = __webpack_require__(50),
		    ko = __webpack_require__(1),
		    BlockTypes = __webpack_require__(25),
		    _ = __webpack_require__(0),
		    ValueTypes = __webpack_require__(61),
		    NameGenerator = __webpack_require__(57),
		    Value = __webpack_require__(15);

		//endregion

		return EventBlock.subClass({
			TYPE: BlockTypes.EVENT_FILTER_BLOCK,
			TEMPLATE_NAME: 'event-filter-block'
		}, {
			init: function init(model, viewModel, scope) {
				var BlockFactory = __webpack_require__(43);
				this._super(model, viewModel, scope);

				_.defaults(model, {
					isExecute: false,
					filterName: NameGenerator.generateName('filter', scope.getFilterAttributes())
				});
				var defaultValue = _.extend({
					type: ValueTypes.CONTROL.value
				}, model.source);

				this.source = new Value(defaultValue, viewModel, scope);

				this.valueType = ko.observable();
				this.rootType = ko.observable();
				this.isExecute = ko.observable(model.isExecute);
				this.filterName = ko.observable(model.filterName);

				var blocks = [];
				_.each(model.blocks, function (block) {
					blocks.push(BlockFactory.createBlock(viewModel, block, scope));
				});

				this.blocks = ko.observableArray(blocks);

				this.form = viewModel.form();
				viewModel.form.subscribe(function (newForm) {
					this.form = newForm;
				}, this);
			},

			execute: function execute() {
				var self = this;
				var sourceType = self.source.type(),
				    response = [],
				    values = [];
				switch (sourceType) {
					case ValueTypes.SCOPE:
					case ValueTypes.DATA:
						response = self.source.resolve(this.viewModel, this.scope);
						break;
					case ValueTypes.CONTROL:
					default:
						var control = self.source.controlResolver.resolve(self.form.presentation());
						response = control._datasource.response;
						break;
				}

				return new _promise2.default(function (resolve, reject) {
					var promises = [];
					_.each(ko.unwrap(self.blocks), function (block) {
						promises.push(_promise2.default.resolve(block.execute(response)).then(function (value) {
							values.push(value);
						}));
					});
					return _promise2.default.all(promises).then(function () {
						var filteredResponse = self.blocks().length ? _.unique(_.flatten(values)) : response;
						self.scope.setValue(self.filterName(), filteredResponse);
						resolve();
					});
				});
			},

			getBundle: function getBundle() {
				var bundle = {};
				_.each(this.blocks(), function (block) {
					_.extend(bundle, block.getBundle());
				});

				return bundle;
			},

			decorate: function decorate() {
				_.each(this.blocks(), function (block) {
					block.decorate();
				});

				return true;
			},

			toJS: function toJS() {
				var blocks = [];
				_.each(this.blocks(), function (block) {
					blocks.push(block.toJS());
				});

				return _.extend(this._super(), {
					source: this.source.toJS(),
					blocks: blocks,
					isExecute: this.isExecute(),
					filterName: this.filterName()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventActionBlock = __webpack_require__(154),
		    ko = __webpack_require__(1),
		    BlockTypes = __webpack_require__(25),
		    _ = __webpack_require__(0);

		//endregion

		return EventActionBlock.subClass({
			TYPE: BlockTypes.ERROR_BLOCK,
			TEMPLATE_NAME: 'event-error-block'
		}, {
			init: function init(model, viewModel, scope) {
				this._super(model, viewModel, new viewModel.context.scopeFactory.ErrorScope(viewModel.getCurrentGlobalScope()));
				this.errorCode = ko.observable(model.errorCode || 0);
			},

			execute: function execute(error) {
				/* jshint eqeqeq: false */
				//We are intentionally using the == comparator
				//Because the errorCode in the server is a string, but we store it as a number
				if (!this.errorCode() || this.errorCode() == error.errorCode) {
					this.scope.setValue('error', error);
					this._super();
				}
			},

			toJS: function toJS() {
				return _.extend(this._super(), {
					errorCode: this.errorCode()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		/* globals Promise */

		var EventBlock = __webpack_require__(50),
		    _ = __webpack_require__(0),
		    BlockTypes = __webpack_require__(25),
		    EventCondition = __webpack_require__(156);

		//endregion

		return EventBlock.subClass({
			TYPE: BlockTypes.FILTER_BLOCK,
			TEMPLATE_NAME: 'filter-block'
		}, {
			init: function init(model, viewModel, scope) {
				this._super(model, viewModel, scope);

				_.defaults(model, {
					condition: {}
				});
				this.condition = new EventCondition(model.condition, viewModel, scope);
			},

			execute: function execute(list) {
				var self = this;
				if (list) {
					return _.filter(list, function (item) {
						return self.condition.isTrue(item);
					});
				}
				return [];
			},

			getBundle: function getBundle() {
				return this.condition.getBundle();
			},

			decorate: function decorate() {
				this.condition.decorate();
			},

			toJS: function toJS() {
				return _.extend(this._super(), {
					condition: this.condition.toJS()
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		/* global Promise */

		//region dependencies

		var EventIfBlock = __webpack_require__(155);
		var BlockTypes = __webpack_require__(25);

		//endregion

		return EventIfBlock.subClass({
			TYPE: BlockTypes.FILTER_IF_BLOCK,
			TEMPLATE_NAME: 'filter-if-block'
		}, {
			init: function init(model, viewModel, scope) {
				this._super(model, viewModel, scope);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var LOVControl = __webpack_require__(64),
		    _ = __webpack_require__(0),
		    ControlTypeId = __webpack_require__(4),
		    ko = __webpack_require__(1);

		//endregion

		return LOVControl.subClass({}, {
			_autoFocusMustBeNull: true,
			init: function init(id, name, properties, context, parent) {
				_.defaults(properties, {
					help: '',
					inline: false,
					multiple: true,
					readonly: false
				});

				this._super(id, name, context.getControlDefinitionByType(ControlTypeId.CHECKLIST), properties, context, parent);

				this.properties.help = ko.observable(properties.help);
				this.properties.inline = ko.observable(properties.inline);
				this.properties.readonly = ko.observable(properties.readonly); // when dropped inside Parents (Repeatable or table), they have a Inheritable property 'readonly'
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ControlTypeId = __webpack_require__(4),
		    koToJSUtil = __webpack_require__(21),
		    ko = __webpack_require__(1);

		//endregion

		return Control.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				_.defaults(properties, {
					help: '',
					hint: '',
					defaultValue: false,
					readonly: false
				});
				var self = this;
				self._super(id, name, context.getControlDefinitionByType(ControlTypeId.CHECKBOX), properties, context, parent);

				self.properties.help = ko.observable(properties.help);
				self.properties.hint = ko.observable(properties.hint);
				self.properties.defaultValue = ko.observableArray(self.getInitialValue(properties.defaultValue));
				self.properties.defaultValue.subscribe(function (value) {
					self.defaultValue(value[0] === 'true');
				});

				self.defaultValue = ko.observable(properties.defaultValue);
				self.checkboxValue = ko.observableArray(self.getInitialValue(properties.defaultValue));
				self.checkboxValue.subscribe(function (value) {
					self.setValue(value);
				});
				self.properties.readonly = ko.observable(properties.readonly); // when dropped inside Parents (Repeatable or table), they have a Inheritable property 'readonly'
			},
			getInitialValue: function getInitialValue(defaultValue) {
				return defaultValue ? ['true'] : ['false'];
			},
			getDataTemplate: function getDataTemplate() {
				return 'booleanValueTypeTemplate';
			},
			_propertiesToJS: function _propertiesToJS() {
				var properties = koToJSUtil.toJS(this.properties);
				properties.defaultValue = this.defaultValue();
				return properties;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var LOVControl = __webpack_require__(64),
		    ControlTypeId = __webpack_require__(4),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1);

		//endregion

		return LOVControl.subClass({}, {
			_autoFocusMustBeNull: true,
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, context.getControlDefinitionByType(ControlTypeId.RADIO_BUTTON), properties, context, parent);

				_.defaults(properties, {
					help: '',
					inline: false,
					readonly: false
				});

				this.properties.help = ko.observable(properties.help);
				this.properties.inline = ko.observable(properties.inline);
				this.properties.readonly = ko.observable(properties.readonly); // when dropped inside Parents (Repeatable or table), they have a Inheritable property 'readonly'

				var defaultValue = this.properties.defaultValue;

				this.properties.defaultValue = ko.pureComputed({
					read: function read() {
						return defaultValue()[0];
					},
					owner: this
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var InputTextControl = __webpack_require__(34),
		    ControlTypeId = __webpack_require__(4),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1);

		//endregion

		return InputTextControl.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				var self = this;
				self._super(id, name, properties, context, parent, context.getControlDefinitionByType(ControlTypeId.NUMBER));

				_.defaults(properties, {
					step: 1,
					maxValue: null,
					minValue: null,
					showUpDownArrow: false
				});

				self.properties.step = ko.observable(properties.step);
				self.properties.maxValue = ko.observable(properties.maxValue);
				self.properties.minValue = ko.observable(properties.minValue);
				self.properties.showUpDownArrow = ko.observable(properties.showUpDownArrow);

				// Setting styling options after component creation has no effect. At that time, the root element already exists,
				// and can be accessed directly via the widget method. Hence, adding the styling by using manual subscription to the style and hide properties.
				self.properties.parsedStyle.subscribe(function (newVal) {
					self._applyStyle(newVal);
				}, self);

				self.afterRenderNumber = function () {
					self._applyStyle();
				};

				self.domId = context.getScope() + ' #' + context.config().domIdPrefix + id;
			},
			_applyStyle: function _applyStyle(value) {
				var widget = $(this.domId).ojInputNumber('widget'),
				    parsedStyle = value || this.properties.parsedStyle();

				widget.attr('style', parsedStyle);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ControlTypeId = __webpack_require__(4),
		    $ = __webpack_require__(2),
		    ko = __webpack_require__(1),
		    oj = __webpack_require__(7);

		//endregion

		return Control.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				var self = this;
				self._super(id, name, context.getControlDefinitionByType(ControlTypeId.DATE), properties, context, parent);

				_.defaults(properties, {
					help: '',
					hint: '',
					readonly: false,
					placeHolder: '',
					defaultValue: '',
					minValue: null,
					maxValue: null,
					preventFreeInput: false,
					format: ['yy-MM-dd']
				});

				self.properties.help = ko.observable(properties.help);
				self.properties.hint = ko.observable(properties.hint);
				self.properties.placeHolder = ko.observable(properties.placeHolder);
				self.properties.minValue = ko.observable(properties.minValue);
				self.properties.maxValue = ko.observable(properties.maxValue);
				self.properties.readonly = ko.observable(properties.readonly);
				self.properties.defaultValue = ko.observable(properties.defaultValue);
				self.properties.preventFreeInput = ko.observable(properties.preventFreeInput);
				self.properties.format = ko.observableArray(properties.format);

				//TODO should self be part of the properties? Is Something that the user changes?
				self.properties.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({
					pattern: self.properties.format()[0]
				}));

				//Note that ojCombobox's value is always encapsulated in an array
				self.properties.format.subscribe(function (newValue) {
					self.properties.dateConverter(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({
						pattern: newValue[0]
					}));
				}, self);

				// Setting styling options after component creation has no effect. At that time, the root element already exists,
				// and can be accessed directly via the widget method. Hence, adding the styling by using manual subscription to the style and hide properties.
				self.properties.parsedStyle.subscribe(function (newVal) {
					self._applyStyle(id, newVal);
				}, self);

				self.afterRenderDate = function () {
					self._applyStyle(id);
				};
				self.domId = context.getScope() + ' #' + context.config().domIdPrefix + id;
			},
			_applyStyle: function _applyStyle(id, value) {
				var widget = $('#' + id).ojInputDate('widget'),
				    formattedStyle = this.properties.formattedStyle(),
				    parsedStyle = value || this.properties.parsedStyle(),
				    triggerInputElement = widget.find('.oj-inputdatetime-input-trigger');

				widget.attr('style', parsedStyle);

				if (formattedStyle.borderWidth) {
					triggerInputElement.css('border-width', formattedStyle.borderWidth);
				}
				if (formattedStyle.borderStyle) {
					triggerInputElement.css('border-style', formattedStyle.borderStyle);
				}
				if (formattedStyle.borderColor) {
					triggerInputElement.css('border-color', formattedStyle.borderColor);
				}
				if (formattedStyle.borderRadius) {
					triggerInputElement.css('border-top-right-radius', formattedStyle.borderRadius);
					triggerInputElement.css('border-bottom-right-radius', formattedStyle.borderRadius);
				}
			},
			_propertiesToJS: function _propertiesToJS() {
				var properties = this._super();
				delete properties.dateConverter;
				return properties;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    ControlTypeId = __webpack_require__(4),
		    ko = __webpack_require__(1),
		    oj = __webpack_require__(7);

		//endregion

		return Control.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				var self = this;
				self._super(id, name, context.getControlDefinitionByType(ControlTypeId.TIME), properties, context, parent);

				_.defaults(properties, {
					help: '',
					hint: '',
					readonly: false,
					placeHolder: '',
					defaultValue: '',
					minValue: null,
					maxValue: null,
					preventFreeInput: false,
					step: ['00:30:00:00']
				});

				self.properties.help = ko.observable(properties.help);
				self.properties.hint = ko.observable(properties.hint);
				self.properties.placeHolder = ko.observable(properties.placeHolder);
				self.properties.minValue = ko.observable(properties.minValue);
				self.properties.maxValue = ko.observable(properties.maxValue);
				self.properties.readonly = ko.observable(properties.readonly);
				self.properties.defaultValue = ko.observable(properties.defaultValue);
				self.properties.preventFreeInput = ko.observable(properties.preventFreeInput);
				self.properties.step = ko.observable(properties.step);

				self.properties.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter());

				// Setting styling options after component creation has no effect. At that time, the root element already exists,
				// and can be accessed directly via the widget method. Hence, adding the styling by using manual subscription to the style and hide properties.
				self.properties.parsedStyle.subscribe(function (newVal) {
					self._applyStyle(id, newVal);
				}, self);

				self.afterRenderTime = function () {
					self._applyStyle(id);
				};

				this.domId = context.getScope() + ' #' + context.config().domIdPrefix + id;
			},
			_applyStyle: function _applyStyle(id, value) {
				var widget = $(this.domId).ojInputTime('widget'),
				    formattedStyle = this.properties.formattedStyle(),
				    parsedStyle = value || this.properties.parsedStyle(),
				    triggerInputElement = widget.find('.oj-inputdatetime-input-trigger');

				widget.attr('style', parsedStyle);

				if (formattedStyle.borderWidth) {
					triggerInputElement.css('border-width', formattedStyle.borderWidth);
				}
				if (formattedStyle.borderStyle) {
					triggerInputElement.css('border-style', formattedStyle.borderStyle);
				}
				if (formattedStyle.borderColor) {
					triggerInputElement.css('border-color', formattedStyle.borderColor);
				}
				if (formattedStyle.borderRadius) {
					triggerInputElement.css('border-top-right-radius', formattedStyle.borderRadius);
					triggerInputElement.css('border-bottom-right-radius', formattedStyle.borderRadius);
				}
			},
			_propertiesToJS: function _propertiesToJS() {
				var properties = this._super();
				delete properties.dateConverter;
				return properties;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */
		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    EventsId = __webpack_require__(14),
		    ControlTypeId = __webpack_require__(4),
		    TargetType = __webpack_require__(358);

		//endregion

		return Control.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, context.getControlDefinitionByType(ControlTypeId.LINK), properties, context, parent);

				_.defaults(properties, {
					target: [TargetType.NEWTAB.value],
					isLabelBindable: 'false',
					defaultLabel: name,
					labelVal: '',
					labelBinding: '',
					defaultValue: '',

					anchor: false,
					//                options: [],
					defaultOption: []
				});

				this.properties.target = ko.observable(properties.target);
				this.properties.defaultValue = ko.observable(properties.defaultValue);
				this.properties.labelVal = ko.observable(properties.labelVal);
				this.properties.defaultLabel = ko.observable(properties.defaultLabel);

				this.properties.isLabelBindable = ko.observable(properties.isLabelBindable);
				this.properties.labelBinding = ko.observable(properties.labelBinding);

				this.properties.anchor = ko.observable(properties.anchor);
				//            this.properties.options = ko.observable(properties.options);
				this.properties.defaultOption = ko.observableArray(properties.defaultOption);

				this.computedOptions = ko.pureComputed(function () {
					var self = this;
					var anchor = this.properties.anchor();
					var optionControls = [];
					/* istanbul ignore else */
					if (anchor) {
						var form = this.context.viewModel.form();
						/* istanbul ignore else */
						if (form) {
							var controls = form.getAllControls(true);
							_.each(controls, function (control) {
								var unSupportedControlType = [ControlTypeId.TABLE, ControlTypeId.REPEATABLE_SECTION, ControlTypeId.SECTION, ControlTypeId.TAB_CONTAINER, ControlTypeId.TAB, ControlTypeId.PANEL];
								var unSupportedControlParentType = [ControlTypeId.TABLE, ControlTypeId.REPEATABLE_SECTION, ControlTypeId.TAB_CONTAINER];
								/* istanbul ignore else*/
								if (!_.contains(unSupportedControlType, control.type) && !_.contains(unSupportedControlParentType, control._parent.type) && control.id !== self.id) {
									optionControls.push({
										label: control.name(),
										value: control.id
									});
								}
							});
						}
					}
					return optionControls;
				}.bind(this));
			},
			setLabelVal: function setLabelVal(value) {
				this.properties.labelVal(value);
			},
			resolvePreviewId: function resolvePreviewId(controlId) {
				var form = this.context.viewModel.form();
				var control = form ? form.findControlAndParent(controlId) : null;
				var previewId = ''; // if user did not select anything i.e. control == null
				if (control) {
					switch (control.node.type) {
						case ControlTypeId.SELECT:
							previewId = '#oj-select-choice-' + control.node.domIdPrefix + control.node.id;
							break;
						//It can point to first element in checklist n  radio button using this code
						//To do : discuss should we need to do this or pointing to their div is fine. If yes, Please uncomment the already written test cases
						//                    case ControlTypeId.CHECKBOX:
						//                        previewId = '#' + control.node.id + '_checked';
						//                        break;
						//                    case ControlTypeId.CHECKLIST:
						//                        previewId = '#' + control.node.id + '_choice0';
						//                        break;
						//                    case ControlTypeId.RADIO_BUTTON:
						//                        previewId = '#' + control.node.id + '0';
						//                        break;
						default:
							previewId = '#' + control.node.domIdPrefix + control.node.id;
					}
				}
				return previewId;
			},
			executeEvent: function executeEvent(trigger) {
				if (trigger === EventsId.ON_CLICK.value && this.readOnly()) {
					return _promise2.default.all([]);
				}

				return this._super(trigger);
			},
			targetTypes: TargetType.values()
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5);

		//endregion

		var TargetType = {
			PARENT: {
				value: '_parent',
				label: msg.TARGET_TYPE_PARENT
			},
			NEWTAB: {
				value: '_blank',
				label: msg.TARGET_TYPE_NEWTAB
			},
			values: function values() {
				return [TargetType.NEWTAB, TargetType.PARENT];
			}
		};
		return TargetType;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ControlTypeId = __webpack_require__(4),
		    $ = __webpack_require__(2),
		    ko = __webpack_require__(1),
		    oj = __webpack_require__(7);

		//endregion

		return Control.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				var self = this;
				self._super(id, name, context.getControlDefinitionByType(ControlTypeId.DATE_TIME), properties, context, parent);

				_.defaults(properties, {
					help: '',
					hint: '',
					readonly: false,
					placeHolder: '',
					defaultValue: '',
					minValue: null,
					maxValue: null,
					format: ['yy-MM-dd hh:mm:ss a'],
					preventFreeInput: false,
					step: ['00:30:00:00']
				});

				self.properties.help = ko.observable(properties.help);
				self.properties.hint = ko.observable(properties.hint);
				self.properties.placeHolder = ko.observable(properties.placeHolder);
				self.properties.minValue = ko.observable(properties.minValue);
				self.properties.maxValue = ko.observable(properties.maxValue);
				self.properties.readonly = ko.observable(properties.readonly);
				self.properties.defaultValue = ko.observable(properties.defaultValue);
				self.properties.format = ko.observableArray(properties.format);
				self.properties.preventFreeInput = ko.observable(properties.preventFreeInput);
				self.properties.step = ko.observable(properties.step);

				self.properties.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({
					pattern: self.properties.format()[0]
				}));

				//Note that ojCombobox's value is always encapsulated in an array
				self.properties.format.subscribe(function (newValue) {
					self.properties.dateConverter(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({
						pattern: newValue[0]
					}));
				}, self);

				// Setting styling options after component creation has no effect. At that time, the root element already exists,
				// and can be accessed directly via the widget method. Hence, adding the styling by using manual subscription to the style and hide properties.
				self.properties.parsedStyle.subscribe(function (newVal) {
					self._applyStyle(id, newVal);
				}, self);

				self.afterRenderTime = function () {
					self._applyStyle(id);
				};

				this.domId = context.getScope() + ' #' + context.config().domIdPrefix + id;
			},
			_applyStyle: function _applyStyle(id, value) {
				var widget = $(this.domId).ojInputDateTime('widget'),
				    formattedStyle = this.properties.formattedStyle(),
				    parsedStyle = value || this.properties.parsedStyle(),
				    triggerInputElement = widget.find('.oj-inputdatetime-input-trigger');

				widget.attr('style', parsedStyle);

				if (formattedStyle.borderWidth) {
					triggerInputElement.css('border-width', formattedStyle.borderWidth);
				}
				if (formattedStyle.borderStyle) {
					triggerInputElement.css('border-style', formattedStyle.borderStyle);
				}
				if (formattedStyle.borderColor) {
					triggerInputElement.css('border-color', formattedStyle.borderColor);
				}
				if (formattedStyle.borderRadius) {
					triggerInputElement.css('border-top-right-radius', formattedStyle.borderRadius);
					triggerInputElement.css('border-bottom-right-radius', formattedStyle.borderRadius);
				}
			},
			_propertiesToJS: function _propertiesToJS() {
				var properties = this._super();
				delete properties.dateConverter;
				return properties;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var InputTextControl = __webpack_require__(34),
		    msg = __webpack_require__(5),
		    ControlTypeId = __webpack_require__(4);

		//endregion

		return InputTextControl.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, properties, context, parent, context.getControlDefinitionByType(ControlTypeId.EMAIL));

				var emailPattern = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

				this.properties.pattern(emailPattern);
				this.properties.patternMessage(msg.MESSAGE_INVALID_EMAIL);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var InputTextControl = __webpack_require__(34),
		    msg = __webpack_require__(5),
		    ValidationHelper = __webpack_require__(76),
		    ControlTypeId = __webpack_require__(4);

		//endregion

		return InputTextControl.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, properties, context, parent, context.getControlDefinitionByType(ControlTypeId.URL));

				this.properties.pattern(ValidationHelper.urlPattern);
				this.properties.patternMessage(msg.MESSAGE_INVALID_URL);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    ControlTypeId = __webpack_require__(4),
		    HeadingType = __webpack_require__(157),
		    ko = __webpack_require__(1),
		    _ = __webpack_require__(0);

		//endregion

		return Control.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, context.getControlDefinitionByType(ControlTypeId.MESSAGE), properties, context, parent);

				_.defaults(properties, {
					type: [HeadingType.PARAGRAPH.value],
					defaultValue: name
				});

				this.properties.type = ko.observable(properties.type);
				this.properties.defaultValue = ko.observable(properties.defaultValue);
			},
			headingTypes: HeadingType.values()
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var InputTextControl = __webpack_require__(34),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2),
		    ko = __webpack_require__(1),
		    msg = __webpack_require__(5),
		    ControlTypeId = __webpack_require__(4);
		//endregion

		return InputTextControl.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				var self = this;
				self._super(id, name, properties, context, parent, context.getControlDefinitionByType(ControlTypeId.MONEY));

				_.defaults(properties, {
					currency: [msg.DEFAULT_CURRENCY],
					step: 1,
					defaultValue: null,
					maxValue: null,
					minValue: null,
					showUpDownArrow: false
				});

				self.properties.currency = ko.observable(properties.currency);
				self.properties.step = ko.observable(properties.step);
				self.properties.defaultValue = ko.observable(properties.defaultValue);
				self.properties.maxValue = ko.observable(properties.maxValue);
				self.properties.minValue = ko.observable(properties.minValue);
				self.properties.showUpDownArrow = ko.observable(properties.showUpDownArrow);

				// Setting styling options after component creation has no effect. At that time, the root element already exists,
				// and can be accessed directly via the widget method. Hence, adding the styling by using manual subscription to the style and hide properties.
				self.properties.parsedStyle.subscribe(function (newVal) {
					self._applyStyle(id, newVal);
				}, self);

				self.afterRenderMoney = function () {
					self._applyStyle(id);
				};

				self.domId = context.getScope() + ' #' + context.config().domIdPrefix + id;

				self.properties.converterOptions = ko.pureComputed(function () {
					return {
						type: 'number',
						options: {
							style: 'currency',
							currency: self.properties.currency()[0],
							currencyDisplay: 'symbol',
							pattern: msg.CURRENCY_PATTERN
						}
					};
				});
			},
			_applyStyle: function _applyStyle(id, value) {
				var widget = $('#' + id).ojInputNumber('widget'),
				    parsedStyle = value || this.properties.parsedStyle();

				widget.attr('style', parsedStyle);
			},
			_propertiesToJS: function _propertiesToJS() {
				var properties = this._super();
				delete properties.converterOptions;
				return properties;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var InputTextControl = __webpack_require__(34),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    msg = __webpack_require__(5),
		    ControlTypeId = __webpack_require__(4);

		//endregion

		return InputTextControl.subClass({}, {
			FORMAT_INTERNATIONAL: 'International',
			FORMAT_US: 'US',

			init: function init(id, name, properties, context, parent) {
				this._super(id, name, properties, context, parent, context.getControlDefinitionByType(ControlTypeId.PHONE));

				_.defaults(properties, {
					format: [this.FORMAT_US],
					defaultValue: ''
				});

				this.properties.format = ko.observable(properties.format);
				this.properties.defaultValue = ko.observable(properties.defaultValue);

				this._updateProperties(this.properties.format);

				this.properties.format.subscribe(function (newValue) {
					this._updateProperties(newValue);
				}, this);
			},
			_updateProperties: function _updateProperties(format) {
				var US_REGEX_PATTERN = '^((((([0-9]{3})-)|((([0-9]{3}))\\s))([0-9]{3})-([0-9]{4}))|(([0-9]{3})-([0-9]{4})))$',
				    INTERNATIONAL_REGEX_PATTERN = '^((\\+)?[1-9]{1,2})?([-\\s.])?((\\(\\d{1,4}\\))|\\d{1,4})(([-\\s.])?[0-9]{1,12}){1,2}$';

				switch (ko.utils.unwrapObservable(format)[0]) {
					case msg.PHONE_FORMAT_INTERNATIONAL:
						this.properties.pattern(INTERNATIONAL_REGEX_PATTERN);
						this.properties.patternMessage(msg.FORMAT_ERROR_MESSAGE_INTERNATIONAL);
						this.properties.placeHolder('');
						break;
					case msg.PHONE_FORMAT_US:
					default:
						this.properties.pattern(US_REGEX_PATTERN);
						this.properties.patternMessage(msg.FORMAT_ERROR_MESSAGE_US);
						this.properties.placeHolder('xxx-xxx-xxxx');
						break;
				}
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    msg = __webpack_require__(5),
		    ControlTypeId = __webpack_require__(4);

		//endregion

		return Control.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, context.getControlDefinitionByType(ControlTypeId.IMAGE), properties, context, parent);

				_.defaults(properties, {
					defaultValue: '',
					alt: msg.TEXT_NO_IMAGE
				});

				this.properties.defaultValue = ko.observable(properties.defaultValue);
				this.properties.alt = ko.observable(properties.alt);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    ControlTypeId = __webpack_require__(4);

		//endregion

		return Control.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, context.getControlDefinitionByType(ControlTypeId.VIDEO), properties, context, parent);

				_.defaults(properties, {
					showControls: true,
					loop: false,
					autoPlay: false,
					defaultValue: '',
					allowFullScreen: true
				});

				this.properties.showControls = ko.observable(properties.showControls);
				this.properties.loop = ko.observable(properties.loop);
				this.properties.autoPlay = ko.observable(properties.autoPlay);
				this.properties.defaultValue = ko.observable(properties.defaultValue);
				this.properties.allowFullScreen = ko.observable(properties.allowFullScreen);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var LOVControl = __webpack_require__(64),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    ControlTypeId = __webpack_require__(4),
		    TypeDescription = __webpack_require__(13),
		    ScopeType = __webpack_require__(368),
		    OptionsType = __webpack_require__(41),
		    ko = __webpack_require__(1);

		//endregion

		return LOVControl.subClass({}, {
			init: function init(id, name, properties, context, parent) {

				//setting default values. Will add new if not exists
				_.defaults(properties, {
					optionsFeed: {
						type: OptionsType.REST.value
					}, //needed to set default type REST for first time
					help: '',
					hint: '',
					allowSelectAll: true, //allow user to select multiple option. applicable only when multiple is true
					defaultScope: [ScopeType.USER.value], //default scope to search into
					showScopeFilter: false //hide the scope filter
				});

				this._super(id, name, context.getControlDefinitionByType(ControlTypeId.IDENTITY_BROWSER), properties, context, parent);

				var self = this;
				var optionsResolver = this.properties.optionsFeed().optionsResolver();

				//add required observable properties
				$.extend(true, this.properties, {
					help: ko.observable(properties.help),
					hint: ko.observable(properties.hint),
					placeholder: ko.observable(properties.placeholder),
					multiple: ko.observable(properties.multiple),
					allowSelectAll: ko.observable(properties.allowSelectAll),
					defaultScope: ko.observableArray(properties.defaultScope),
					options: optionsResolver.callRest.bind(optionsResolver, { //check DefaultRestHandler.js
						name: 'identities',
						optionsListBinding: 'items'
					}),
					showScopeFilter: ko.observable(properties.showScopeFilter)
				});

				// Setting styling options after component creation has no effect. At that time, the root element already exists,
				// and can be accessed directly via the widget method. Hence, adding the styling by using manual subscription to the style and hide properties.
				this.properties.parsedStyle.subscribe(function (newVal) {
					this._setStyle(id, context, newVal);
				}, this);

				//subscribe change for autoFocus
				this.properties.autoFocus.subscribe(function (newVal) {
					this._setAutoFocus(id, context, newVal);
				}, this);

				//subscribe change for multiple
				this.properties.multiple.subscribe(this._componentType.bind(this, context));

				//subscribe change for showScopeFilter
				this.properties.showScopeFilter.subscribe(function (newVal) {
					//set showScopeFilter and refresh the component
					self.setOptions({
						showScopeFilter: newVal
					});
				});

				//subscribe change for default scope
				//defaultScope is used by component to set the defaultScope while searching the identities
				this.properties.defaultScope.subscribe(function (newVal) {
					//set defaultScope and refresh the component
					self.setOptions({
						defaultScope: newVal
					});
				});

				//call this when knockout finishes the rendering and check for autoFocus and style
				this.afterRenderIdentity = function () {
					// Apply style
					setTimeout(function () {
						self._setStyle(id, context);
						self._setAutoFocus(id, context);
					}, 0);
				};

				//store the component reference id
				this._identityId = context.getScope() + ' #' + context.config().domIdPrefix + id;

				//init the component selection type single or multiple
				this._componentType(context, this.properties.multiple());

				//supported data element
				var IdentityType = ['id', 'title', 'firstName', 'lastName', 'type', 'email', 'mobile'];

				//overriding to check compatible dataType for identity component
				this.dataType.isCompatible = function (data) {
					var compatible = data.isArray() && data.hasOwnProperty('attributes');

					/* istanbul ignore else */
					if (compatible) {
						var attrLen = data.attributes().length;
						//check for id attribute
						for (var i = 0; i < attrLen; i++) {
							/* istanbul ignore else */
							if (data.attributes()[i] && data.attributes()[i].hasOwnProperty('name') && IdentityType.indexOf(data.attributes()[i].name()) === -1) {
								compatible = false;
								break;
							}
						}
					}

					return compatible && !TypeDescription.equals(data.getTypeDescription(), TypeDescription.UNKNOWN);
				};

				var help = this.properties.help;
				var disabled = this.properties.disabled() || this.disabled();
				//used in ojComponent. see identityControl.tmpl.html & rendererIdentityControl.tmpl.html
				this.ojIdentityObj = {
					component: 'ojIdentity',
					disabled: this.readOnly() ? this.readOnly : disabled,
					title: this.properties.hint,
					help: ko.pureComputed(function () {
						var helpMsg = ko.unwrap(help);
						return {
							definition: _.isEmpty(helpMsg) ? null : helpMsg
						};
					}),
					placeholder: this.properties.placeholder,
					required: this.properties.required,
					//value is set in the IdentityValueDecorator
					value: null,
					options: this.properties.options,
					multiple: this.properties.multiple,
					selectAll: this.properties.allowSelectAll,
					defaultScope: this.properties.defaultScope(),
					showScopeFilter: this.properties.showScopeFilter,
					scopesOptions: ScopeType.values(),
					selectLabel: this.msg.IDENTITY_SELECT_ALL,
					noMatchesFound: this.msg.IDENTITY_NO_MATCHES_FOUND,
					invalidComponentTracker: this.tracker,
					validators: this.validators
				};
			},
			//return the template for value accessor in event dialog for action's constant value
			getDataTemplate: function getDataTemplate() {
				return 'identityValueTypeTemplate';
			},
			//populate scope. see usage identityPropertyInspector.tmpl.html
			scopeValues: ScopeType.values(),
			//set the options for ojIdentity component
			setOptions: function setOptions(option) {
				//set the provided option
				$(this._identityId)['ojIdentity']('option', option);

				//refresh the component
				this._refresh();
			},
			//refresh the component
			_refresh: function _refresh() {
				setTimeout(function () {
					$(this._identityId)['ojIdentity']('refresh');
				}.bind(this), 0);
			},
			//set component type selection- single or multiple
			_componentType: function _componentType(context, newVal) {
				//set multiple option
				this.setOptions({
					multiple: newVal
				});

				// Need to reapply the style. The style should be set only after it has finished rendering the multiple select box, hence setTimeout.
				var that = this;
				setTimeout(function () {
					that._setStyle(that.id, context);
				}, 0);
			},
			//get identities using events. see ControlPropertiesMap.js -> PropertiesMap.js -> ControlIdentityValueProperty.js
			getIdentityValue: function getIdentityValue() {
				var value = this.getControlValue();
				var strValue = [];

				for (var i = 0; i < value.length; i++) {
					strValue.push(value[i].id);
				}

				return strValue.join();
			},
			//set style
			_setStyle: function _setStyle(id, context, value) {
				var widget = $(this._identityId)['ojIdentity']('widget'),
				    formattedStyle = this.properties.formattedStyle();
				widget.attr('style', value || this.properties.parsedStyle());
				widget.find('.oj-select-choice, .oj-select-choices').css('background-color', formattedStyle.backgroundColor || '');
				widget.find('.oj-select-choice, .oj-select-selected-choice-label').css('color', formattedStyle.color || '');
			},
			//set autoFocus
			_setAutoFocus: function _setAutoFocus(id, context, value) {
				var autofocus = value || this.properties.optionsFeed().properties().autoFocus(),
				    widget = $(this._identityId)['ojIdentity']('widget');
				if (autofocus) {
					widget.attr('autofocus', 'autofocus');
				} else {
					widget.removeAttr('autofocus');
				}
				// If it is the first element with autofocus set, we need to focus on the oj-select div manually.
				if ($(context.getScope() + ' [autofocus]').first().is('.oj-identity')) {
					widget.find('.oj-select-choice').focus();
				}
			},
			toJS: function toJS() {
				var toJs = this._super();
				toJs.properties.multiple = this.properties.multiple();
				return toJs;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		'use strict';

		//region dependencies

		var msg = __webpack_require__(5);

		//endregion

		var ScopeType = {
			USER: {
				label: msg.SCOPE_USER,
				value: 'user'
			},
			GROUP: {
				label: msg.SCOPE_GROUP,
				value: 'group'
			},
			ROLE: {
				label: msg.SCOPE_ROLE,
				value: 'role'
			},
			values: function values() {
				return [ScopeType.USER, ScopeType.GROUP, ScopeType.ROLE];
			}
		};

		return ScopeType;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    ControlTypeId = __webpack_require__(4),
		    $ = __webpack_require__(2),
		    ControlContainer = __webpack_require__(26),
		    _ = __webpack_require__(0),
		    UUID = __webpack_require__(17);

		//endregion

		return ControlContainer.subClass({}, {
			init: function init(id, data, context, controlFactory, parent) {
				var self = this;
				self.id = id || UUID.createUuid();
				self._parent = parent;
				self._super(data, context, controlFactory, this);

				self.context = context;

				self.type = ControlTypeId.ROW;

				self.hide = ko.pureComputed(function () {
					var hide = true;
					$.each(self.controls(), function () {
						hide = this.properties.hide();
						return hide; //break if there is there is one element shown.
					});
					return hide;
				});
			},
			makeCopy: function makeCopy() {
				var copy = this.toJS();
				copy.id = UUID.createUuid();
				var controls = [];
				_.each(this.controls(), function (control) {
					controls.push(control.makeCopy());
				});
				copy.controls = controls;
				return copy;
			},
			toJS: function toJS() {
				var controls = [];

				$.each(this.controls(), function (i, control) {
					controls.push(control.toJS());
				});
				return {
					id: this.id,
					type: this.type,
					controls: controls
				};
			},
			isRepeatable: function isRepeatable() {
				return false;
			},
			findClosest: function findClosest(id) {
				return this.getParent().findClosest(id);
			},
			onDrop: function onDrop(dropHandler, dropCoordinates) {
				dropHandler.moveRow(this, dropCoordinates);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    $ = __webpack_require__(2),
		    RendererId = __webpack_require__(78),
		    ColumnSpanType = __webpack_require__(149);

		//endregion

		return Class.subClass({}, {

			init: function init(controlsObservable, context) {
				this.controls = controlsObservable;
				this.context = context;
			},
			getStyle: function getStyle(control, columnSpanTypeId) {
				var style = '';
				if (control.properties.hide() && this.context.getScope() === RendererId.FORM_RENDERER) {
					return style;
				}
				if (columnSpanTypeId === 'ALL') {
					style = this._getAllStyles(control, false);
				} else {
					style = this._getStyle(control, columnSpanTypeId, true);
				}
				return style.trim();
			},
			_getAllStyles: function _getAllStyles(control, full) {
				var allStyles = '';
				for (var type in ColumnSpanType) {
					/* istanbul ignore else*/
					if (ColumnSpanType.hasOwnProperty(type)) {
						allStyles += this._getStyle(control, type, full);
					}
				}
				return allStyles;
			},
			_getStyle: function _getStyle(control, columnSpanTypeId, full) {
				var colSpan = 0;
				var columnSpanType = ColumnSpanType[columnSpanTypeId];
				if (control.properties.autoColSpan()) {
					colSpan = this._calculateColSpan(this.controls(), columnSpanType);
				} else {
					colSpan = control.properties[columnSpanType.propertyName]();
				}
				return columnSpanType.getStyleClass(colSpan, full);
			},
			_calculateColSpan: function _calculateColSpan(controls, columnSpanType) {
				var colSpan = 0;
				if (columnSpanType !== ColumnSpanType.SMALL) {
					var visibleControls = controls;
					/* istanbul ignore else */
					if (this.context.getScope() === RendererId.FORM_RENDERER) {
						visibleControls = this._getVisibleControls(controls);
					}

					var totalManualColSpan = 0;
					var controlsLength = 0;
					$.each(visibleControls, function () {
						if (!this.properties.autoColSpan()) {
							totalManualColSpan += this.properties[columnSpanType.propertyName]();
						} else {
							controlsLength++;
						}
					});
					colSpan = Math.floor((12 - totalManualColSpan) / controlsLength);
					if (colSpan <= 0) {
						colSpan = 1;
					}
				} else {
					colSpan = 12;
				}
				return colSpan;
			},
			_getVisibleControls: function _getVisibleControls(controls) {
				var visibleControls = [];
				$.each(controls, function () {
					if (!this.properties.hide()) {
						visibleControls.push(this);
					}
				});
				return visibleControls;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    koToJSUtil = __webpack_require__(21),
		    LayoutType = __webpack_require__(372),
		    ControlContainer = __webpack_require__(26),
		    Control = __webpack_require__(9);

		//endregion

		/**
   * Container that lets the use group controls vertically/horizontally.
   * Each control will be in a new row/col inside this panel.
   */
		return Control.subClass({}, {
			/* jshint maxparams: 6 */
			init: function init(id, name, data, context, controlFactory, parent) {

				var self = this;
				_.defaults(data.properties, {
					layout: [LayoutType.VERTICAL.value],
					label: ''
				});

				self._super(id, name, context.getControlDefinitionByType(ControlTypeId.PANEL), data.properties, context, parent);
				self.container = new ControlContainer(data, context, controlFactory, this);
				//Some Controls (i.e. Rows) inherit directly from ControlContainer
				//Here we need to add the important functions to this, because we inherit from Control
				self.controls = self.container.controls;
				self.getAllControls = self.container.getAllControls.bind(self.container);
				self.getControls = self.container.getControls.bind(self.container);
				self.findControl = self.container.findControl.bind(self.container);

				self.properties.layout = ko.observableArray(data.properties.layout);

				self.isVertical = ko.pureComputed(function () {
					return self.properties.layout()[0] === LayoutType.VERTICAL.value;
				});
			},
			hasValueProperty: function hasValueProperty() {
				return false;
			},
			toJS: function toJS() {

				var events = [];
				$.each(this.events(), function (i, event) {
					events.push(event.toJS());
				});
				var controls = [];
				$.each(this.controls(), function (i, control) {
					controls.push(control.toJS());
				});
				return {
					id: this.id,
					name: this.name(),
					type: this.type,
					properties: _.extend({}, koToJSUtil.toJS(this.properties), {
						events: events
					}),
					controls: controls
				};
			},
			layoutOptions: function layoutOptions() {
				return [LayoutType.VERTICAL, LayoutType.HORIZONTAL];
			},
			colStyle: function colStyle(control, columnSpanTypeId) {
				var layoutStyle = '';
				if (this.properties.layout()[0] === LayoutType.VERTICAL.value) {
					layoutStyle = 'pcs-forms-row pcs-col-padding';
				} else {
					layoutStyle = 'pcs-forms-col ' + this.container.columnSpan.getStyle(control, columnSpanTypeId);
				}
				return layoutStyle;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var msg = __webpack_require__(5);

		//endregion

		return {
			VERTICAL: {
				value: 'VERTICAL',
				label: msg.LAYOUT_VERTICAL
			},
			HORIZONTAL: {
				value: 'HORIZONTAL',
				label: msg.LAYOUT_HORIZONTAL
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    HeadingType = __webpack_require__(157),
		    koToJSUtil = __webpack_require__(21),
		    _ = __webpack_require__(0),
		    ControlContainer = __webpack_require__(26),
		    Control = __webpack_require__(9);
		__webpack_require__(158);

		//endregion

		/**
   * Container that lets the use group controls vertically/horizontally.
   * Each control will be in a new row/col inside this panel.
   */
		return Control.subClass({}, {
			/* jshint maxparams: 6 */
			init: function init(id, name, data, context, controlFactory, parent) {
				data.properties = data.properties || {};

				var self = this;
				_.defaults(data.properties, {
					label: name,
					expanded: true,
					headerType: [HeadingType.PARAGRAPH.value],
					lazyLoading: false
				});

				self._super(id, name, context.getControlDefinitionByType(ControlTypeId.SECTION), data.properties, context, parent);
				self.container = new ControlContainer(data, context, controlFactory, this);
				//Some Controls (i.e. Rows) inherit directly from ControlContainer
				//Here we need to add the important functions to this, because we inherit from Control
				self.controls = self.container.controls;
				self.getAllControls = self.container.getAllControls.bind(self.container);
				self.getControls = self.container.getControls.bind(self.container);
				self.findControl = self.container.findControl.bind(self.container);

				this.properties.expanded = ko.observable(data.properties.expanded);
				this.properties.headerType = ko.observableArray(data.properties.headerType);
				this.properties.lazyLoading = ko.observable(data.properties.lazyLoading);

				this.domId = context.getScope() + ' #' + context.config().domIdPrefix + id;

				self.properties.label.subscribe(function () {
					setTimeout(function () {
						self._refresh();
					}, 0);
				});
				self.properties.headerType.subscribe(function () {
					setTimeout(function () {
						self._refresh();
					}, 0);
				});
			},
			hasValueProperty: function hasValueProperty() {
				return false;
			},
			_refresh: function _refresh() {
				var self = this;
				$('#section-' + self.id).ojCollapsible('refresh');
			},
			toJS: function toJS() {
				var events = [];
				$.each(this.events(), function (i, event) {
					events.push(event.toJS());
				});

				var controls = [];
				$.each(this.controls(), function (i, control) {
					controls.push(control.toJS());
				});
				return {
					id: this.id,
					name: this.name(),
					type: this.type,
					properties: _.extend({}, koToJSUtil.toJS(this.properties), {
						events: events
					}),
					controls: controls
				};
			},
			headingTypes: HeadingType.values()
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var RepeatableSectionControl = __webpack_require__(159);

		//endregion

		return RepeatableSectionControl.subClass({}, {
			/* jshint maxparams: 7 */
			init: function init(id, name, data, context, controlFactory, parent, typeId) {
				var self = this;
				self._super(id, name, data, context, controlFactory, parent, typeId);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		/* globals Promise */

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0),
		    ControlContainer = __webpack_require__(26),
		    ControlTypeIds = __webpack_require__(4),
		    EventActionsMap = __webpack_require__(86),
		    TranslatablePropertiesMap = __webpack_require__(147),
		    ControlPropertiesMap = __webpack_require__(87),
		    StyleControlMapper = __webpack_require__(146),
		    ko = __webpack_require__(1);

		//endregion

		return Class.subClass({}, {
			// jshint maxparams:7
			type: null, //Will be set in constructor according to parent
			properties: {},
			init: function init(id, controlsAccessor, context, controlFactory, repeatableParent, value) {
				var self = this;
				this.viewModel = context.viewModel;
				this.context = context;

				self._bindingValue = value || {};
				self.id = id;
				this.properties.hide = ko.observable(false);
				self._parent = repeatableParent;

				if (this.getParent().type === ControlTypeIds.TABLE) {
					this.type = ControlTypeIds.TABLE_ROW;
				} else {
					this.type = ControlTypeIds.REPEATABLE_SECTION_ROW;
				}

				var data = {
					controls: []
				};
				if (value) {
					_.each(controlsAccessor(), function (control) {
						data.controls.push(control.makeCopy());
					});
				}
				self.container = new ControlContainer(data, context, controlFactory, this);
				if (!value) {
					self.container.controls = controlsAccessor;
				}
				//Some Controls (i.e. Rows) inherit directly from ControlContainer
				//Here we need to add the important functions to this, because we inherit from Control
				self.controls = self.container.controls;
				self.getAllControls = self.container.getAllControls.bind(self.container);
				self.getControls = self.container.getControls.bind(self.container);
				self.findControl = self.container.findControl.bind(self.container);

				self.executeEventOnAll = self.executeEvent.bind(self);
			},
			executeEvent: function executeEvent(trigger) {
				var events = [];
				_.each(this.getParent().events(), function (eventRef) {
					var eventTrigger = eventRef.event().trigger;
					if (trigger === eventTrigger()) {
						events.push(eventRef.execute(this));
					}
				}, this);
				this.context.viewModel.dependenciesExtension.reEvaluateOnControl(trigger, this);
				return _promise2.default.all(events);
			},
			getParent: function getParent() {
				return this._parent;
			},
			getBindingContext: function getBindingContext() {
				return this.getParent() ? this.getParent().getContextForChildren(this) : '';
			},
			getContextForChildren: function getContextForChildren(child) {
				return this.getBindingContext();
			},
			getStyleMapper: function getStyleMapper() {
				return StyleControlMapper[this.type];
			},
			getControlActions: function getControlActions() {
				return EventActionsMap[this.type];
			},
			getControlEventProperties: function getControlEventProperties() {
				return ControlPropertiesMap[this.type];
			},
			getTranslatableProperties: function getTranslatableProperties() {
				return TranslatablePropertiesMap[this.type];
			},
			findClosest: function findClosest(id) {
				var control = this.findControl(id);
				if (control) {
					return control;
				} else {
					return this.getParent().findClosest(id);
				}
			},
			findControlInsideRepeatable: function findControlInsideRepeatable(controlId) {
				var control = this.findControl(controlId);
				if (!control) {
					_.any(this.getAllControls(true), function (childControl) {
						if (childControl.isRepeatable()) {
							control = childControl.findControlInsideRepeatable(controlId);
							return !!control;
						}
					});
				}
				return control;
			},
			isRepeatable: function isRepeatable() {
				return false;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1);
		var _ = __webpack_require__(0);
		//endregion

		return {
			/**
    * Creates a computed property that, when changed, propagates the change to all its childs
    * @param repeatableControl: a repeatable that will have the property
    * @param property: the ko observable where the real value of the property is stored
    * @param accessor: the string to access the property in children
    * @returns {*}
    */
			createInheritableProperty: function createInheritableProperty(repeatableControl, property, accessor) {
				return ko.computed({
					read: function read() {
						var value = property();

						//Modify all controls, to save the changes in designtime
						_.each(repeatableControl.getAllControls(true), function (control) {
							if (control.properties[accessor]) {
								//Don't overwrite the property if it's already set
								control.properties[accessor](control.properties[accessor]() || value);
							}
						});

						//Modify all the rows, to apply the changes in runtime
						if (repeatableControl.getRows) {
							_.each(repeatableControl.getRows(), function (row) {
								_.each(row.getAllControls(true), function (control) {
									if (control.properties[accessor]) {
										//Don't overwrite the property if it's already set
										control.properties[accessor](control.properties[accessor]() || value);
									}
								});
							});
						}

						return value;
					},
					write: function write(value) {
						property(value);
					}
				});
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2),
		    ControlContainer = __webpack_require__(26),
		    ko = __webpack_require__(1),
		    Control = __webpack_require__(9);

		//endregion

		return Control.subClass({}, {
			/* jshint maxparams: 6 */
			init: function init(id, name, data, context, controlFactory, parent) {

				var self = this;

				self._super(id, name, context.getControlDefinitionByType(ControlTypeId.TAB), data.properties, context, parent);
				self.container = new ControlContainer(data, context, controlFactory, this);
				//Some Controls (i.e. Rows) inherit directly from ControlContainer
				//Here we need to add the important functions to this, because we inherit from Control
				self.controls = self.container.controls;
				self.getAllControls = self.container.getAllControls.bind(self.container);
				self.getControls = self.container.getControls.bind(self.container);
				self.findControl = self.container.findControl.bind(self.container);

				_.defaults(data.properties, {
					lazyLoading: false
				});

				self.properties.lazyLoading = ko.observable(data.properties.lazyLoading);
			},
			hasValueProperty: function hasValueProperty() {
				return false;
			},
			toJS: function toJS() {
				var controls = [];

				$.each(this.controls(), function (i, control) {
					controls.push(control.toJS());
				});
				return _.extend(this._super(), {
					controls: controls
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    ControlContainer = __webpack_require__(26),
		    Control = __webpack_require__(9);
		__webpack_require__(379);
		__webpack_require__(158);
		__webpack_require__(380);

		//endregion

		return Control.subClass({}, {
			/* jshint maxparams: 6 */
			init: function init(id, name, data, context, controlFactory, parent) {

				var self = this;

				self._super(id, name, context.getControlDefinitionByType(ControlTypeId.TAB_CONTAINER), data.properties, context, parent);
				self.container = new ControlContainer(data, context, controlFactory, this);
				//Some Controls (i.e. Rows) inherit directly from ControlContainer
				//Here we need to add the important functions to this, because we inherit from Control
				self.controls = self.container.controls;
				self.getAllControls = self.container.getAllControls.bind(self.container);
				self.getControls = self.container.getControls.bind(self.container);
				self.findControl = self.container.findControl.bind(self.container);

				_.defaults(data.properties, {
					selectedPosition: 0
				});

				self.properties.selectedPosition = ko.observable(data.properties.selectedPosition);

				self.properties.selectedPositionStringComputed = ko.pureComputed({
					read: function read() {
						return [String(self.properties.selectedPosition())];
					},
					write: function write(value) {
						self.properties.selectedPosition(Number(value[0]));
					}
				});
				self.properties.selectedPositionAsArrayComputed = ko.pureComputed({
					read: function read() {
						return [self.properties.selectedPosition()];
					},
					write: function write(value) {
						self.properties.selectedPosition(value[0]);
					}
				});

				self.disabledTabs = ko.pureComputed(function () {
					var disabledTabs = [];
					$.each(self.controls(), function (i, control) {
						if (control.properties.disabled() && !control.properties.hide()) {
							disabledTabs.push(i);
						}
					});
					return disabledTabs;
				});
			},
			hasValueProperty: function hasValueProperty() {
				return false;
			},
			hasStyle: function hasStyle() {
				return true;
			},
			toJS: function toJS() {
				var controls = [];

				$.each(this.controls(), function (i, control) {
					controls.push(control.toJS());
				});
				return _.extend(this._super(), {
					controls: controls
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 379 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_379__;

/***/ }),
/* 380 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_380__;

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    RepeatableControl = __webpack_require__(160),
		    ko = __webpack_require__(1),
		    msg = __webpack_require__(5),
		    _ = __webpack_require__(0);

		//endregion

		return RepeatableControl.subClass({}, {
			/* jshint maxparams: 6 */
			init: function init(id, name, data, context, controlFactory, parent) {

				var self = this;
				self._super(id, name, data, context, controlFactory, ControlTypeId.TABLE, parent);

				_.defaults(data.properties, {
					hideLabels: true,
					hideRowCheckbox: false
				});

				this.properties.hideLabels = ko.observable(data.properties.hideLabels);
				this.properties.hideRowCheckbox = ko.observable(data.properties.hideRowCheckbox);

				context.LoVMappingAutoComplete.initialize(this, context);

				_.each(self.styles(), function (style) {
					if (style.type.label === msg.LABEL_TABLE_WIDTH) {
						// This computed function is for change in column width (i.e. control Styles) from User Screen. Everytime we change the column width
						//it will calculate and change the TableWidth style so that Reset link will be enabled
						style.controlValue = ko.computed(function () {
							var val = [];
							_.each(self.controls(), function (control) {
								val.push(control.properties.formattedStyle().tableColumnWidth);
							});
							var listWithoutUndefined = _.without(val, undefined);
							/* istanbul ignore else */
							if (listWithoutUndefined.length === 0) {
								style.rawValue(listWithoutUndefined.toString());
								return listWithoutUndefined.toString();
							}
							style.rawValue(val.toString());
							return val.toString();
						}, this);
						// This computed function is for change in rawValue of TableWidth style in case of ResetStyle or Undo command. So everytime the
						//TableWidth changes, it will change the column width (i.e. control styles)
						style.newRawValue = ko.computed(function () {
							var rawValue = style.rawValue();
							if (rawValue === '') {
								_.each(self.controls(), function (control) {
									_.each(control.styles(), function (style) {
										/* istanbul ignore else */
										if (style.type.label === msg.LABEL_WIDTH) {
											style.rawValue('');
										}
									});
								});
							} else {
								var controls = self.controls();
								var rawValArray = rawValue.split(',');
								var arrayLength = controls.length;
								for (var i = 0; i < arrayLength; i++) {
									controls[i].styles()[0].rawValue(rawValArray[i]);
								}
							}
							return rawValue;
						}, this);
					}
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    _ = __webpack_require__(0),
		    ControlContainer = __webpack_require__(26),
		    Control = __webpack_require__(9);

		//endregion

		return Control.subClass({}, {
			/* jshint maxparams: 6 */
			init: function init(id, name, data, context, controlFactory, parent) {

				var self = this;
				self._super(id, name, context.getControlDefinitionByType(ControlTypeId.TABLE_COLUMN), data.properties, context, parent);

				self.container = new ControlContainer(data, context, controlFactory, this);
				//Some Controls (i.e. Rows) inherit directly from ControlContainer
				//Here we need to add the important functions to this, because we inherit from Control
				self.controls = self.container.controls;
				self.getAllControls = self.container.getAllControls.bind(self.container);
				self.getControls = self.container.getControls.bind(self.container);
				self.findControl = self.container.findControl.bind(self.container);
			},
			hasValueProperty: function hasValueProperty() {
				return false;
			},

			toJS: function toJS() {
				var controls = [];
				_.each(this.controls(), function (control) {
					controls.push(control.toJS());
				});
				return _.extend(this._super(), {
					controls: controls
				});
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    OjSelectItem = __webpack_require__(42),
		    TypeCatalog = __webpack_require__(24);

		//endregion

		return Control.subClass({}, {
			$: $,

			init: function init(id, name, data, context, parent) {
				var controlDefinition = context.getFormReferenceControlDefinition(data.properties.reference, context.config().formHandler);
				this._super(id, name, controlDefinition, data.properties, context, parent);
				var self = this;

				self.form = context.config().formHandler.getResolvedControl(data.properties.reference.formId, data.properties.reference.presentationId); //Form should be resolved by now
				self.dataType = TypeCatalog.parseRootType('definition', self.form.definition);
				self.allBundles = self.form.allBundles;

				_.extend(self.properties, {
					reference: ko.observable(controlDefinition.reference),
					presentation: ko.observableArray([]),
					defaultValue: {}
				});

				self.presentations = ko.observableArray([]);
				self.computedPresentations = ko.computed(function () {
					var presentations = [];
					_.each(self.presentations(), function (presentation) {
						presentations.push(OjSelectItem.create(presentation.id, presentation.name));
					});
					return presentations;
				});

				self.isValidReference = function () {
					return !$.isEmptyObject(self.form);
				};

				self.getConfig = function () {
					var config = {};
					_.extend(config, context.config(), {
						domIdPrefix: context.config().domIdPrefix + self.id + '-'
					});
					//Only the first form should handle the convertion, to avoid double convertion
					config.convertJSON = false;
					return config;
				};

				if (data.properties.reference.presentationId) {
					self._initPresentations(data.properties.reference.presentationId);
				}

				self.properties.presentation.subscribe(function (ids) {
					var id = ids[0];
					self.properties.reference().presentationId(id);
					self.loadPresentation(id);
				});

				//Callback for the form reference to update the isValid property
				self.onValidStateChange = function (newValue) {
					self.isValid(newValue);
				};

				self.controlsLoaded = ko.observable(false);

				self.loadedCallback = function () {
					self.controlsLoaded(true);
				};

				self.translationsHandler = context.config().translationsHandler;
			},
			hasValueProperty: function hasValueProperty() {
				return false;
			},
			loadPresentation: function loadPresentation(id) {
				var $formRenderer = this.$('#' + this.id);
				_.extend(this.translationsHandler._bundles.defaultBundle, this.form.defaultBundle);
				var form = this._buildForm(this.form, this._getPresentation(id));
				if (_.size($formRenderer) === 1) {
					$formRenderer.trigger('load', {
						form: form,
						config: this.getConfig()
					});
				}
			},
			_initPresentations: function _initPresentations(presentation) {
				this.presentations(this.form.presentations);
				this.properties.presentation.push(presentation || this.form.defaultPresentation);
			},
			/** @overrides */
			_propertiesToJS: function _propertiesToJS() {
				var properties = this._super();
				delete properties.presentation;
				properties.reference = this.properties.reference().get();
				return properties;
			},
			getBindings: function getBindings() {
				return $('#' + this.domIdPrefix + this.id).triggerHandler('getBindings');
			},
			changePresentation: function changePresentation(presentationId) {
				//This will trigger the event for changing the presentation directly in the rendererViewModel of the reference
				return $('#' + this.domIdPrefix + this.id).triggerHandler('changePresentation', presentationId);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Control = __webpack_require__(9),
		    _ = __webpack_require__(0),
		    ko = __webpack_require__(1),
		    CustomControlList = __webpack_require__(75);

		//endregion

		return Control.subClass({
			isCustomControl: function isCustomControl(typeId) {
				return _.contains(_.keys(CustomControlList), typeId);
			}
		}, {
			init: function init(id, name, typeId, properties, context, parent) {
				var _this = this;

				var definition = context.getControlDefinitionByType(typeId);
				this.customControlEntry = definition.customControlEntry;
				this._super(id, name, definition, properties, context, parent);

				_.defaults(properties, this.customControlEntry.properties);

				_.each(this.customControlEntry.properties, function (property, propertyName) {
					if (!ko.isObservable(_this.properties[propertyName])) {
						_this.properties[propertyName] = ko.observable(properties[propertyName]);
					}
				});
			},
			getValueObservable: function getValueObservable() {
				if (this.value) {
					return this.value;
				} else {
					return this.properties.defaultValue;
				}
			},
			getStyleMapper: function getStyleMapper() {
				return this.customControlEntry.styles;
			},
			getValidEvents: function getValidEvents() {
				return this.customControlEntry.events;
			},
			getControlActions: function getControlActions() {
				return this.customControlEntry.eventActions;
			},
			getControlEventProperties: function getControlEventProperties() {
				return this.customControlEntry.eventProperties;
			},
			getTranslatableProperties: function getTranslatableProperties() {
				return this.customControlEntry.translatableProperties;
			},
			hasProperty: function hasProperty(key) {
				return _.contains(_.keys(this.customControlEntry.properties), key);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var SelectControl = __webpack_require__(152),
		    TypeCatalog = __webpack_require__(24),
		    ControlTypeId = __webpack_require__(4);

		//endregion

		return SelectControl.subClass({}, {
			init: function init(id, name, properties, context, parent) {
				this._super(id, name, properties, context, parent, context.getControlDefinitionByType(ControlTypeId.ENUM_SELECT));
			},
			_checkType: function _checkType(context, newVal) {
				if (newVal) {
					this.dataType = TypeCatalog.getArrayTypeDefinition(TypeCatalog.getSimpleTypesDefinitions().ENUM);
				} else {
					this.dataType = TypeCatalog.getSimpleTypesDefinitions().ENUM;
				}
				// Need to reapply the style. The style should be set only after it has finished rendering the multiple select box, hence setTimeout.
				var that = this;
				setTimeout(function () {
					that._setStyle(that.id, context);
				}, 0);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var _ = __webpack_require__(0);

		//end region

		return {
			translate: function translate(eventActions) {
				_.each(eventActions, function (eventAction) {
					var blocks = eventAction.blocks();
					_.each(blocks, function (block) {
						block.decorate();
					});

					var connectors = eventAction.connectors();
					_.each(connectors, function (connector) {
						connector.decorate();
					});

					var filters = eventAction.filters();
					_.each(filters, function (filter) {
						filter.decorate();
					});
				});
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    EventTrigger = __webpack_require__(388),
		    StylePreprocessor = __webpack_require__(389),
		    Class = __webpack_require__(3);

		//endregion

		return Class.subClass({}, {
			init: function init(json, context) {
				_.defaults(json, {
					eventActions: [],
					stylesheet: {}
				});

				this.stylesheet = ko.observable(json.stylesheet);

				var eventActions = [];
				_.each(json.eventActions, function (event) {
					eventActions.push(new EventTrigger(event.id, event.name, event.trigger, event.controlId, event.blocks, event.connectors, event.filters, context.viewModel));
				}, this);
				this.eventActions = ko.observableArray(eventActions);

				this.applyStylesheet(this.stylesheet(), context);
			},
			findEvent: function findEvent(id) {
				return _.find(this.eventActions(), function (e) {
					return e.id === id;
				});
			},
			applyStylesheet: function applyStylesheet(stylesheet, context) {
				var className = context.getScope() + '-applied-stylesheet';
				if (_.isEmpty(context.config().domIdPrefix)) {
					//only remove if root renderer/builder tag.
					$('.' + className).remove();
				}
				if (!_.isEmpty(stylesheet) && stylesheet.id) {
					//need to fetch style content
					var self = this;
					context.config().cssHandler.getResolvedControl(stylesheet.id).then(function (stylesheetData) {
						if (!$.isEmptyObject(stylesheetData)) {
							self._addStyleSheetTag(className, stylesheetData.content);
						}
					});
				} else {
					//style content sent directly
					this._addStyleSheetTag(className, stylesheet);
				}
			},
			_addStyleSheetTag: function _addStyleSheetTag(className, cssContent) {
				if (!_.isEmpty(cssContent)) {
					var style = document.createElement('style');
					style.className = className + ' applied-stylesheet';
					var stylesheetContent = StylePreprocessor.sanitize(cssContent, '.canvas-container');
					style.appendChild(document.createTextNode(stylesheetContent));
					document.head.appendChild(style);
				}
			},
			toJS: function toJS() {
				var eventActions = [];
				_.each(this.eventActions(), function (event) {
					eventActions.push(event.toJS());
				});
				return {
					eventActions: eventActions,
					stylesheet: $.isEmptyObject(this.stylesheet()) ? this.stylesheet() : {
						id: this.stylesheet().id
					}
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_promise) {
	'use strict';

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		/* globals Promise */

		//region dependencies

		var Class = __webpack_require__(3),
		    ko = __webpack_require__(1),
		    BlockFactory = __webpack_require__(43),
		    LoadingSpinner = __webpack_require__(91),
		    _ = __webpack_require__(0);

		//endregion

		return Class.subClass({}, {
			// jshint maxparams:7
			init: function init(id, name, trigger, controlId, blocks, connectors, filters, viewModel) {
				this.id = id;
				this.name = name;
				this.controlId = controlId;
				this.trigger = ko.observable(trigger);
				this.viewModel = viewModel;

				this.connectors = ko.observableArray();
				this.filters = ko.observableArray();
				this.scope = new viewModel.context.scopeFactory.Scope(viewModel.getCurrentGlobalScope(), this.connectors, this.filters);
				this.scope.controlId = controlId;

				var connectorArray = [];
				_.each(connectors, function (connector) {
					connectorArray.push(BlockFactory.createBlock(viewModel, connector, this.scope));
				}, this);
				this.connectors(connectorArray);

				var filterArray = [];
				_.each(filters, function (filter) {
					filterArray.push(BlockFactory.createBlock(viewModel, filter, this.scope));
				}, this);
				this.filters(filterArray);

				var blocksArray = [];
				_.each(blocks, function (block) {
					blocksArray.push(BlockFactory.createBlock(viewModel, block, this.scope));
				}, this);
				this.blocks = ko.observableArray(blocksArray);
			},

			execute: function execute(eventControl) {

				this.scope.clearValues();
				var self = this;

				var promises = [];
				_.each(self.connectors(), function (connector) {
					self.scope.eventControl = eventControl;
					promises.push(connector.execute());
				});

				return new _promise2.default(function (resolve) {
					_promise2.default.all(promises).then(function () {
						var filterPromises = [];
						_.each(self.filters(), function (filter) {
							// Only add filters for which the isExecute flag is set.
							if (filter.isExecute()) {
								self.scope.eventControl = eventControl;
								filterPromises.push(filter.execute());
							}
						});
						_promise2.default.all(filterPromises).then(function () {
							//Create a new promise
							var promise = _promise2.default.resolve();
							_.each(ko.unwrap(self.blocks()), function (block) {
								//For each block, execute the block
								promise = promise.then(function () {
									//Make sure that the eventControl is correct
									self.scope.eventControl = eventControl;
									//If the block doesn't return a promise, create and resolve a new promise
									return block.execute() || _promise2.default.resolve();
								});
							});
							//After all blocks have run, stop the spinner
							promise.then(function () {
								LoadingSpinner.fadeOut();
								resolve();
							});
						});
					}.bind(self)).catch(function () {
						LoadingSpinner.fadeOut();
						resolve();
					}.bind(self));
				});
			},

			toJS: function toJS() {
				var blocks = [];
				_.each(this.blocks(), function (block) {
					blocks.push(block.toJS());
				});
				var connectors = [];
				_.each(this.connectors(), function (connector) {
					connectors.push(connector.toJS());
				});
				var filters = [];
				_.each(this.filters(), function (filter) {
					filters.push(filter.toJS());
				});
				return {
					id: this.id,
					name: this.name,
					trigger: this.trigger(),
					controlId: this.controlId,
					blocks: blocks,
					connectors: connectors,
					filters: filters
				};
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    _ = __webpack_require__(0);

		//endregion

		return Class.subClass({
			sanitize: function sanitize(styleContent, selector) {
				selector = selector ? selector + ' ' : '';
				var processedStyle = '';
				var rules = this.rulesForCssText(styleContent);

				for (var i = 0; i < rules.length; i++) {
					processedStyle += this.getRulesRecursively(rules[i], selector);
				}
				return processedStyle;
			},
			getRulesRecursively: function getRulesRecursively(cssRule, selector) {
				var _this = this;

				var processedStyle = '';
				if (cssRule.type === CSSRule.STYLE_RULE) {
					//  Base case: Type CSSStyleRule
					processedStyle += this.getProcessedCssTextFromRule(cssRule, selector);
				} else if (cssRule.cssRules) {
					var ruleType = cssRule.cssText.split('{')[0];
					processedStyle += ruleType + '{ ';
					_.each(cssRule.cssRules, function (rule) {
						processedStyle += _this.getRulesRecursively(rule, selector);
					});
					processedStyle += '}';
				} else {
					processedStyle += cssRule.cssText;
				}
				return processedStyle + ' ';
			},
			getProcessedCssTextFromRule: function getProcessedCssTextFromRule(rule, selector) {
				var cssSelectors = rule.selectorText.split(','),
				    formattedSelector = rule.cssText;
				for (var j = 0; j < cssSelectors.length; j++) {
					formattedSelector = formattedSelector.replace(cssSelectors[j], selector + cssSelectors[j]);
				}
				return formattedSelector;
			},
			rulesForCssText: function rulesForCssText(styleContent) {
				var doc = document.implementation.createHTMLDocument(''),
				    styleElement = document.createElement('style');

				styleElement.textContent = styleContent;
				// the style will only be parsed once it is added to a document
				doc.body.appendChild(styleElement);

				return styleElement.sheet.cssRules;
			}
		}, {});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var EventsId = __webpack_require__(14),
		    _ = __webpack_require__(0),
		    FormsLogger = __webpack_require__(20),
		    ControlReferenceMap = __webpack_require__(122),
		    ko = __webpack_require__(1),
		    Class = __webpack_require__(3);

		//endregion

		var RemoveBracketsRegex = /\[\d*\]/;

		var CHANGE_EVENTS = [EventsId.ON_CHANGE.value, EventsId.ON_CHILDREN_CHANGE.value, EventsId.ON_ADD_ROW.value, EventsId.ON_REMOVE_ROW.value];

		var structuralReferences = [ControlReferenceMap.FIRST.value, ControlReferenceMap.LAST.value, ControlReferenceMap.INDEX.value, ControlReferenceMap.SELECTED.value];

		function pushUnique(array, newElement) {
			array = array || [];
			if (!_.contains(array, newElement)) {
				array.push(newElement);
			}
			return array;
		}
		return Class.subClass({}, {
			/**
    * Map with [controlId]: computedControl
    */
			structuralControlDependencies: {},
			controlDependencies: {},
			scopeDependencies: {},
			dataDependencies: {},
			subscriptions: [],
			viewModel: undefined,
			init: function init(viewModel) {
				this.viewModel = viewModel;
			},

			/*jshint camelcase: false */
			_register_CONSTANT: function _register_CONSTANT() {
				//Nothing to Do, a constant never changes
			},
			/*jshint camelcase: false */
			_register_DATA: function _register_DATA(control, value) {
				var _this = this;

				var valueName = value.expression();
				//make sure the value we are listening is an observable
				this.viewModel.context.payloadContext.getObservableValue(valueName, true);
				var observableValue = ko.pureComputed(function () {
					return value.resolve(_this.viewModel);
				});

				this.subscriptions.push(observableValue.subscribe(this.reEvaluateOnData.bind(this, control)));

				this.dataDependencies[valueName] = pushUnique(this.dataDependencies[valueName], control);
			},
			/*jshint camelcase: false */
			_register_CONTROL: function _register_CONTROL(control, value) {
				this._registerControlDependency(value.controlResolver, control);
			},
			/*jshint camelcase: false */
			_register_FUNCTION: function _register_FUNCTION(control, value) {
				_.each(value.propertyParam(), function (paramValue) {
					this[this._getRegisterFunction(paramValue)](control, paramValue);
				}, this);
			},
			/*jshint camelcase: false */
			_register_SCOPE: function _register_SCOPE(control, value) {
				var scopeName = value.expression().split('.')[0].replace(RemoveBracketsRegex, '');

				var connector = _.find(this.viewModel.form().globalConnectors(), function (c) {
					return c.responseName() === scopeName;
				});
				if (!connector) {
					FormsLogger.getLogger().error('Error: Connector not found');
				} else {
					this.scopeDependencies[connector.id] = pushUnique(this.scopeDependencies[connector.id], control);
				}
			},

			/**
    * registers the control as a dependency of controlResolver, to be updated when the value of controlResolver changes
    * */
			_registerControlDependency: function _registerControlDependency(controlResolver, control) {
				var depControl = controlResolver.resolve(control.viewModel.form(), control);
				// By default use __undefined__, to indicate a control that is not possible to resolve now,
				//  but may be valid in the future (ie. a FRIST selector of an empty table
				var depControlIds = ['__undefined__'];
				if (!_.isEmpty(depControl)) {
					if (!_.isArray(depControl)) {
						depControlIds = [depControl.id];
					} else {
						depControlIds = _.map(depControl, function (ctrl) {
							return ctrl.id;
						});
					}
				}
				//use depControlsIds as an array, to allow multiple dependencies (ie. multiple selection)
				_.each(depControlIds, function (depControlId) {
					this.controlDependencies[depControlId] = pushUnique(this.controlDependencies[depControlId], control);
				}, this);

				this._registerStructuralControlDependency(controlResolver, control.viewModel.form(), control, depControlIds);
			},

			/**
    * register controls that when the  structure changes, we need to recalculate the dependencies
    * ie. a selector inside a table, when the table changes, we need to recalulate the dependencies of the FIRST, LAST, etc
    */
			_registerStructuralControlDependency: function _registerStructuralControlDependency(controlResolver, context, control, depControlIds) {
				//If context is empty (because resolveChildContext didnt find anything) or this is SELF reference
				//  dont add a structural dependency
				if (!_.isEmpty(context) && _.contains(structuralReferences, controlResolver.reference())) {

					var parentControl = controlResolver.getControl(context);
					if (!_.isEmpty(parentControl)) {
						//Add the dependency
						_.each(depControlIds, function (depControlId) {
							this.structuralControlDependencies[parentControl.id] = pushUnique(this.structuralControlDependencies[parentControl.id], depControlId);
						}, this);

						//recursive
						this._registerStructuralControlDependency(controlResolver.childControl(), controlResolver.resolveChildContext(context, control), control, depControlIds);
					}
				}
			},
			_getRegisterFunction: function _getRegisterFunction(value) {
				return '_register_' + value.type().value;
			},
			_evaluateControl: function _evaluateControl(control) {
				this._evaluateComputed(control);
				this._evaluateFilter(control);
			},

			_evaluateComputed: function _evaluateComputed(control) {
				FormsLogger.getLogger().count('[COUNT] [COMPUTED]');
				control.properties.computedValue.scope.eventControl = control;
				control.setValue(control.properties.computedValue.resolve(this.viewModel));
			},
			_evaluateFilter: function _evaluateFilter(control) {
				if (control.properties.filter && control.properties.filter()) {
					control.reApplyFilter();
				}
			},
			_evaluateOnLoad: function _evaluateOnLoad(control) {
				if (control.properties.computed && control.properties.computed()) {
					//Register the dependencies
					this[this._getRegisterFunction(control.properties.computedValue)](control, control.properties.computedValue);
					this._evaluateComputed(control);
				}
				if (control.properties.filter && control.properties.filter() && ko.unwrap(control.properties.filterEnabled)) {
					//Register the dependencies for each value in the if blocks of the filters.
					var conditionalValues = control.properties.filter().getAllConditionalValues();
					conditionalValues.forEach(function (value) {
						this[this._getRegisterFunction(value)](control, value);
					}, this);
				}
			},

			reEvaluateOnControl: function reEvaluateOnControl(trigger, control) {
				if (trigger === EventsId.ON_LOAD.value) {
					//If this is ON_LOAD, we need to evaluate the control if it is computed, and register the dependencies
					this._evaluateOnLoad(control);
				} else if (!!control && _.contains(CHANGE_EVENTS, trigger)) {
					this._reEvaluateOnControl(trigger, control);
				} else if (!!control && trigger === EventsId.ON_SELECTION_CHANGE.value) {
					//trigger check for recalculation, if we have some SELECTED dependency
					this._reCalculateDependencies(control);
				}
			},
			_reCalculateDependencies: function _reCalculateDependencies(control) {
				var depIds = this.structuralControlDependencies[control.id];
				this.structuralControlDependencies[control.id] = [];
				_.each(depIds, function (depControlId) {
					var controls = this.controlDependencies[depControlId];
					this.controlDependencies[depControlId] = [];
					_.each(controls, function (control) {
						this._evaluateOnLoad(control);
					}, this);
				}, this);
			},
			_reEvaluateOnControl: function _reEvaluateOnControl(trigger, control) {
				//If this is a Change event, we need to get the list of all dependant controls to re-evaluate them
				var controlsToReEvaluate = [];
				//Get the controls that depend on this
				controlsToReEvaluate = _.union(controlsToReEvaluate, this.controlDependencies[control.id]);

				//Execute the re-evaluations

				_.each(controlsToReEvaluate, function (dependantControl) {
					this._evaluateControl(dependantControl);
				}, this);

				//If this control has a parent, we need to trigger an event to make sure that all controls are re-evaluated
				//An example of this is A SUMMATION function of a table. A change in any of the controls will trigger the need for the table to re-evaluate as a whole
				if (control.getParent) {
					this.reEvaluateOnControl(EventsId.ON_CHILDREN_CHANGE.value, control.getParent());
				}

				//check if we need to recalculate some dependecy
				this._reCalculateDependencies(control);
			},
			reEvaluateOnScope: function reEvaluateOnScope(scopeChanged) {
				_.each(this.scopeDependencies[scopeChanged], function (dependantControl) {
					this._evaluateControl(dependantControl);
				}, this);
			},
			reEvaluateOnData: function reEvaluateOnData(control) {
				this._evaluateControl(control);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var Class = __webpack_require__(3),
		    UUID = __webpack_require__(17),
		    ControlTypeId = __webpack_require__(4),
		    ControlFactory = __webpack_require__(88),
		    StringBusinessControl = __webpack_require__(392),
		    BooleanBusinessControl = __webpack_require__(393),
		    NumberBusinessControl = __webpack_require__(394),
		    ObjectBusinessControl = __webpack_require__(395),
		    ArrayBusinessControl = __webpack_require__(396),
		    EnumBusinessControl = __webpack_require__(397),
		    ReferenceBusinessControl = __webpack_require__(398);

		//endregion

		var BusinessControlFactory = Class.subClass({

			/* jshint maxparams: 6 */
			createRowControl: function createRowControl(schemaKey, schema, context, parent) {

				var generatedControls = BusinessControlFactory.createControl(schemaKey, schema, context, parent);
				var row = {
					id: UUID.createUuid(),
					type: ControlTypeId.ROW,
					controls: [generatedControls.toJS()]
				};
				return ControlFactory.createControl(row.id, row.name, row.type, row, context, parent);
			},
			createControl: function createControl(schemaKey, schema, context, parent) {
				if (schema.$ref) {
					schema.type = 'reference';
				} else if (schema.enum) {
					schema.type = 'enum';
				}

				return BusinessControlFactory.createControlUsingType(schemaKey, schema, context, parent);
			},
			createControlUsingType: function createControlUsingType(schemaKey, schema, context, parent) {
				var createFunction = BusinessControlFactory[schema.type];
				/*istanbul ignore else*/
				if (createFunction) {
					var controlFunction = createFunction(schemaKey, schema, context, parent);
					return controlFunction.create();
				} else {
					throw new Error('Unsupported operation exception');
				}
			},
			string: function string(schemaKey, schema, context, parent) {
				return new StringBusinessControl(schemaKey, schema, context, BusinessControlFactory, parent);
			},
			boolean: function boolean(schemaKey, schema, context, parent) {
				return new BooleanBusinessControl(schemaKey, schema, context, BusinessControlFactory, parent);
			},
			number: function number(schemaKey, schema, context, parent) {
				return new NumberBusinessControl(schemaKey, schema, context, BusinessControlFactory, parent);
			},
			object: function object(schemaKey, schema, context, parent) {
				return new ObjectBusinessControl(schemaKey, schema, context, BusinessControlFactory, parent);
			},
			array: function array(schemaKey, schema, context, parent) {
				return new ArrayBusinessControl(schemaKey, schema, context, BusinessControlFactory, parent);
			},
			enum: function _enum(schemaKey, schema, context, parent) {
				return new EnumBusinessControl(schemaKey, schema, context, BusinessControlFactory, parent);
			},
			reference: function reference(schemaKey, schema, context, parent) {
				return new ReferenceBusinessControl(schemaKey, schema, context, BusinessControlFactory, parent);
			}

		}, {});
		return BusinessControlFactory;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var FormatControlMap = __webpack_require__(161),
		    BusinessControl = __webpack_require__(35);

		//endregion

		return BusinessControl.subClass({}, {
			init: function init(schemaKey, schema, context, businessControlFactory, parent) {
				var self = this;
				self._super(schemaKey, schema, context, businessControlFactory, parent);

				self.format = schema.format || 'string';
				self.type = FormatControlMap[self.format];
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    BusinessControl = __webpack_require__(35);

		//endregion

		return BusinessControl.subClass({}, {
			init: function init(schemaKey, schema, context, businessControlFactory, parent) {
				var self = this;
				self._super(schemaKey, schema, context, businessControlFactory, parent);

				self.type = ControlTypeId.CHECKBOX;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var FormatControlMap = __webpack_require__(161),
		    BusinessControl = __webpack_require__(35);

		//endregion

		return BusinessControl.subClass({}, {
			init: function init(schemaKey, schema, context, businessControlFactory, parent) {
				var self = this;
				self._super(schemaKey, schema, context, businessControlFactory, parent);

				self.format = schema.format || 'number';
				self.type = FormatControlMap[self.format];
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    _ = __webpack_require__(0),
		    TypeCatalog = __webpack_require__(24),
		    BusinessControl = __webpack_require__(35);

		//endregion

		return BusinessControl.subClass({}, {
			init: function init(schemaKey, schema, context, businessControlFactory, parent) {
				var self = this;
				self._super(schemaKey, schema, context, businessControlFactory, parent);

				self.type = ControlTypeId.SECTION;
				self.controls = [];

				_.each(_.keys(schema.properties), function (attributeKey) {
					var attribute = schema.properties[attributeKey];
					TypeCatalog.parseType(attribute);
					var innerControlSchema = self._addBindingContext(attributeKey, attribute);
					var innerControl = businessControlFactory.createControl(attributeKey, innerControlSchema, context, parent);
					self.controls.push(innerControl.toJS());
				}, this);

				self.data.controls = self.controls;
			},
			_addBindingContext: function _addBindingContext(attributeKey, schema) {
				var bindingContext = this.data.properties.binding;
				schema.data = {
					properties: {
						binding: bindingContext + '.' + attributeKey
					}
				};
				return schema;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    _ = __webpack_require__(0),
		    BusinessControl = __webpack_require__(35);

		//endregion

		return BusinessControl.subClass({}, {
			init: function init(schemaKey, schema, context, businessControlFactory, parent) {
				var self = this;
				self._super(schemaKey, schema, context, businessControlFactory, parent);

				self.type = ControlTypeId.REPEATABLE_SECTION;
				_.defaults(self.data.properties, {
					canAddDelete: true,
					hideBindings: true
				});
				self.controls = [];

				var innerControlSchema = self._setHideBindingFlag(schema.items);
				var innerControl = businessControlFactory.createControl('itemType', innerControlSchema, context, parent);
				self.controls.push(innerControl.toJS());

				self.data.controls = self.controls;
			},
			_setHideBindingFlag: function _setHideBindingFlag(schema) {
				schema.data = {
					properties: {
						hideBindings: true
					}
				};
				return schema;
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ControlTypeId = __webpack_require__(4),
		    _ = __webpack_require__(0),
		    BusinessControl = __webpack_require__(35);

		//endregion

		return BusinessControl.subClass({}, {
			init: function init(schemaKey, schema, context, businessControlFactory, parent) {
				var self = this;
				self._super(schemaKey, schema, context, businessControlFactory, parent);

				self.type = ControlTypeId.SELECT;
				var properties = self.data.properties;
				_.defaults(properties, {
					optionsFeed: {}
				});
				_.defaults(properties.optionsFeed, {
					properties: {}
				});
				properties.optionsFeed.type = 'STATIC';
				properties.optionsFeed.properties.optionsNames = schema.enum.join('\n');
				properties.optionsFeed.properties.optionsValues = schema.enum.join('\n');
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var BusinessControl = __webpack_require__(35);

		//endregion

		return BusinessControl.subClass({}, {
			init: function init(schemaKey, schema, context, businessControlFactory, parent) {
				var self = this;
				self.schema = context.config().typeHandler.getResolvedControl(schema.$ref);
				self.schema.data = schema.data;
				self._super(schemaKey, self.schema, context, businessControlFactory, parent);
			},
			create: function create() {
				var self = this;
				return self.businessControlFactory.createControl(self.name, self.schema, self.context, self.parent);
			}
		});
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
		'use strict';

		/* global Element*/

		var _ = __webpack_require__(0);

		/**
   * Each property inside of polifills is a different element to which functions will be added (named to be easier to test)
   * Each has an element, which will be extended, and an object of functions (named to be easier to test)
   */
		var polyfills = {
			'Element': {
				'element': Element.prototype,
				'functions': {
					'remove': function remove() {
						/* valid this */
						var parentNode = this.parentNode;
						if (parentNode) {
							parentNode.removeChild(this);
						}
					}
				}
			}
		};

		_.each(polyfills, function (polyfill) {
			_.each(polyfill.functions, function (method, key) {
				if (!polyfill.element[key]) {
					polyfill.element[key] = method;
				}
			});
		});

		return polyfills;
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1);
		//endregion

		return function (params) {
			var self = this;
			self.styleClass = params.styleClass;
			self.icon = ko.utils.unwrapObservable(params.icon);
			self.alt = params.alt || '';
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

var refs = 0;
var dispose;
var content = __webpack_require__(402);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) exports.locals = content.locals;
exports.use = exports.ref = function() {
	if(!(refs++)) {
		dispose = __webpack_require__(163)(content, {"hmr":true});
	}
	return exports;
};
exports.unuse = exports.unref = function() {
       if(refs > 0 && !(--refs)) {
		dispose();
		dispose = null;
	}
};
// Hot Module Replacement
if(false) {
	var lastRefs = module.hot.data && module.hot.data.refs || 0;
	if(lastRefs) {
		exports.ref();
		if(!content.locals) {
			refs = lastRefs;
		}
	}
	if(!content.locals) {
		module.hot.accept();
	}
	module.hot.dispose(function(data) {
		data.refs = content.locals ? 0 : refs;
		if(dispose) {
			dispose();
		}
	});
}

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(162)(false);
// imports


// module
exports.push([module.i, ".oj-popup .oj-popup-content{max-width:450px;word-wrap:break-word}form-renderer a,form-renderer a:hover,form-renderer a:visited{color:#045fab!important}form-renderer a.oj-clickable-icon,form-renderer a .oj-clickable-icon,form-renderer a.oj-clickable-icon-nocontext,form-renderer a.oj-tabs-tab-icon,form-renderer a .oj-tabs-tab-icon,form-renderer a.oj-tabs-tab-icon:visited,form-renderer a:visited.oj-clickable-icon,form-renderer a:visited .oj-clickable-icon,form-renderer a:visited.oj-clickable-icon-nocontext,form-renderer a:visited .oj-tabs-tab-icon{color:#878c90!important}form-renderer a.oj-clickable-icon-nocontext:hover,form-renderer a.oj-clickable-icon:hover,form-renderer a .oj-clickable-icon:hover,form-renderer a.oj-tabs-tab-icon:hover,form-renderer a .oj-tabs-tab-icon:hover,form-renderer a.oj-tabs-tab-icon:visited:hover,form-renderer a:visited.oj-clickable-icon-nocontext:hover,form-renderer a:visited.oj-clickable-icon:hover,form-renderer a:visited .oj-clickable-icon:hover,form-renderer a:visited .oj-tabs-tab-icon:hover{color:#85bbe7!important}form-renderer .canvas .oj-component,form-renderer .canvas .oj-component-initnode{max-width:none;min-width:0}form-renderer .section--header{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}form-renderer .oj-label-group{max-width:100%}form-renderer .button-control{margin-top:21px}form-renderer .oj-inputdatetime-input{border-top-right-radius:0!important;border-bottom-right-radius:0!important}form-renderer .pcs-forms-row{padding:10px 0}form-renderer .pcs-forms-row.form-container{padding:0}form-renderer .row-control{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}form-renderer .image-control{width:100%}form-renderer .wrapper{position:relative;padding-bottom:56.25%;padding-top:25px;height:0}form-renderer .wrapper iframe{position:absolute;top:0;left:0;width:100%;height:100%}form-renderer .pcs-forms-row.panel{padding:0;margin-top:-1px}form-renderer .pcs-forms-row.tablepanel{padding-bottom:0}form-renderer .form-reference-container,form-renderer .panel .pcs-forms-row:first-of-type{padding:0}form-renderer .broken-reference{background-color:#fafafa;border:2px dashed #bdc3c7;color:#7f8c8d;height:35px;line-height:35px;text-align:center;width:100%;padding:0 5px}form-renderer .broken-reference-text{color:#7f8c8d;width:100%;display:inline-block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}form-renderer .oj-label-help-def{max-width:calc(100% - 24px)!important}form-renderer .panel>.pcs-forms-col:first-of-type{padding-left:0}form-renderer .panel>.pcs-forms-col:last-child{padding-right:0}form-renderer .canvas .oj-label{white-space:nowrap}form-renderer .canvas label,form-renderer .canvas label.oj-label{font-size:15px;font-weight:400;text-overflow:ellipsis;overflow:hidden;max-width:100%!important;display:inline-block;float:none}form-renderer .canvas .panel .pcs-forms-row:last-child{padding-bottom:0}form-renderer .oj-inputpassword.oj-invalid .oj-inputpassword-input,form-renderer .oj-inputtext.oj-invalid .oj-inputtext-input,form-renderer .oj-textarea.oj-invalid .oj-textarea-input{border:2px solid #d66!important}form-renderer .definition-action{float:right;border:none;background-color:transparent}form-renderer .table-control{table-layout:fixed}form-renderer .table-control .oj-table-column-header-acc-select-row{width:0}form-renderer .disabled{opacity:.3}form-renderer actionable-icon .icon-active,form-renderer actionable-icon .icon-hover{display:none}form-renderer actionable-icon:hover .icon-hover{display:inline}form-renderer actionable-icon:hover:active .icon-hover{display:none}form-renderer actionable-icon:active .icon-active{display:inline}form-renderer actionable-icon:active .icon,form-renderer actionable-icon:hover .icon{display:none}form-renderer .definition-img,form-renderer .definition-img-active,form-renderer .definition-img-hover{width:22px;height:22px;vertical-align:middle}form-renderer .repeatable-section{padding:10px}form-renderer .repeatable-section.oj-selected{background-color:#e4f0fa}form-renderer .oj-choice-row.oj-choice-row-inline{padding-left:10px;padding-right:0}form-renderer .hideTableLabels .oj-label,form-renderer .hideTableLabels .oj-label-group{display:none!important}form-renderer .table-container{display:inline-block;overflow-x:auto}form-renderer .table-control .oj-table-column-header-text{overflow:hidden;text-overflow:ellipsis;width:100%}form-renderer .canvas .oj-label.oj-component.oj-checkboxset-label{margin-bottom:0}form-renderer .oj-checkbox,form-renderer .oj-radio{min-width:10px!important;min-height:10px!important;clip:auto!important}form-renderer .pcs-form-panel{width:100%;min-height:50px;margin-left:-10px}form-renderer .pcs-col-padding{padding-right:10px!important;padding-left:10px!important}form-renderer .spinnerContainer{background:rgba(0,0,0,.1);width:100%;height:100%;position:absolute;z-index:99999;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}form-renderer .spinner{text-align:center}form-renderer .spinner__bounce{width:18px;height:18px;background-color:#045fab;border-radius:100%;display:inline-block;-webkit-animation:sk-bouncedelay 1.4s infinite ease-in-out both;animation:sk-bouncedelay 1.4s infinite ease-in-out both}form-renderer .spinner-object-1{-webkit-animation-delay:-.32s;animation-delay:-.32s}form-renderer .spinner-object-2{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes sk-bouncedelay{0%,80%,to{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes sk-bouncedelay{0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}form-renderer .anchorLink{display:block}form-renderer .isContentInvalid{color:#de6666}form-renderer .isContentInvalid h1,form-renderer .isContentInvalid h2,form-renderer .isContentInvalid h3,form-renderer .isContentInvalid h4,form-renderer .isContentInvalid h5,form-renderer .isContentInvalid h6,form-renderer .isContentInvalid p,form-renderer span.isContentInvalid{color:#de6666;background:url(" + __webpack_require__(403) + ") no-repeat 5px;padding-left:25px}form-renderer .loading__placeholder{background:#efeff1;opacity:.5;min-height:30px;margin:10px;border-radius:2px}form-renderer .oj-collapsible-header .oj-collapsible-header-icon,form-renderer .oj-collapsible-header a{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}form-renderer .oj-collapsible-header p{margin:0;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}form-renderer .oj-collapsible-content{padding:0}form-renderer .hide-up-down-arrow~.oj-buttonset{display:none}form-renderer .hide-up-down-arrow{border-right-width:1px!important}form-renderer .canvas__footer,form-renderer .canvas__header{display:none}form-renderer .invalid-repeatable{border:2px solid #d66}form-renderer form-renderer .spinnerContainer{display:none!important}", ""]);

// exports


/***/ }),
/* 403 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHZpZXdCb3g9IjAgMCAyMCAyMSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzI0IC01MjIuNzMpIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODQ3LjYgLTE2NDMpIj4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI2MwMzkyYiIgZD0ibS0xNTAzLjYgMjE3Ni43YzAgNS41MjMtNC40NzcgMTAtMTAgMTAtNS41MjI4IDAtMTAtNC40NzctMTAtMTAgMC01LjUyMjggNC40NzcyLTEwIDEwLTEwIDUuNTIzIDAgMTAgNC40NzcyIDEwIDEweiIvPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjZTc0YzNjIiBkPSJtLTE1MDMuNiAyMTc1LjdjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMC01LjUyMjggMC0xMC00LjQ3Ny0xMC0xMCAwLTUuNTIyOCA0LjQ3NzItMTAgMTAtMTAgNS41MjMgMCAxMCA0LjQ3NzIgMTAgMTB6Ii8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNjMDM5MmIiIGQ9Im0tMTUxOC41IDIxNzMuMSAzLjUzNTcgMy42LTMuNTM1NyAzLjUgMS40MTQyIDEuNCAzLjUzNTUtMy41IDMuNTM2IDMuNSAxLjQxNC0xLjQtMy41MzYtMy41IDMuNTM2LTMuNi0xLjQxNC0xLjQtMy41MzYgMy41LTMuNTM1NS0zLjUtMS40MTQyIDEuNHoiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI2VjZjBmMSIgZD0ibS0xNTE4LjUgMjE3Mi4xIDMuNTM1NyAzLjYtMy41MzU3IDMuNSAxLjQxNDIgMS40IDMuNTM1NS0zLjUgMy41MzYgMy41IDEuNDE0LTEuNC0zLjUzNi0zLjUgMy41MzYtMy42LTEuNDE0LTEuNC0zLjUzNiAzLjUtMy41MzU1LTMuNS0xLjQxNDIgMS40eiIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="

/***/ }),
/* 404 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

var refs = 0;
var dispose;
var content = __webpack_require__(406);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) exports.locals = content.locals;
exports.use = exports.ref = function() {
	if(!(refs++)) {
		dispose = __webpack_require__(163)(content, {"hmr":true});
	}
	return exports;
};
exports.unuse = exports.unref = function() {
       if(refs > 0 && !(--refs)) {
		dispose();
		dispose = null;
	}
};
// Hot Module Replacement
if(false) {
	var lastRefs = module.hot.data && module.hot.data.refs || 0;
	if(lastRefs) {
		exports.ref();
		if(!content.locals) {
			refs = lastRefs;
		}
	}
	if(!content.locals) {
		module.hot.accept();
	}
	module.hot.dispose(function(data) {
		data.refs = content.locals ? 0 : refs;
		if(dispose) {
			dispose();
		}
	});
}

/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(162)(false);
// imports


// module
exports.push([module.i, ".pcs-forms-row{margin:0 auto;max-width:1440px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.pcs-forms-row:after,.pcs-forms-row:before{content:\" \";display:table;clear:both}.pcs-forms-col{padding-left:10px;padding-right:10px;width:100%;float:left;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.pcs-forms-panel-alig{display:inline-grid;float:none}.pcs-forms-editable-input{color:#333!important;background-color:#fcfdfe!important;border:1px solid #dfe4e7!important;border-radius:2px!important}h4{font-size:1rem!important}h5{font-size:.857rem}.oj-checkbox-nocomp{margin-right:.74rem}.no-extra-margin{-webkit-box-flex:0!important;-ms-flex-positive:0!important;flex-grow:0!important}", ""]);

// exports


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';
		//region dependencies

		var ko = __webpack_require__(1),
		    oj = __webpack_require__(7),
		    templates = {
			iconTemplate: __webpack_require__(164),
			rendererControl: __webpack_require__(408),
			rendererMoneyControl: __webpack_require__(409),
			rendererButtonControl: __webpack_require__(410),
			rendererChecklistControl: __webpack_require__(411),
			rendererCheckboxControl: __webpack_require__(412),
			rendererDateControl: __webpack_require__(413),
			rendererDateTimeControl: __webpack_require__(414),
			rendererEmailControl: __webpack_require__(415),
			rendererLinkControl: __webpack_require__(416),
			rendererMessageControl: __webpack_require__(417),
			rendererMessageTypeParagraphTemplate: __webpack_require__(418),
			rendererMessageTypeHeading1Template: __webpack_require__(419),
			rendererMessageTypeHeading2Template: __webpack_require__(420),
			rendererMessageTypeHeading3Template: __webpack_require__(421),
			rendererMessageTypeHeading4Template: __webpack_require__(422),
			rendererMessageTypeHeading5Template: __webpack_require__(423),
			rendererMessageTypeHeading6Template: __webpack_require__(424),
			rendererNumberControl: __webpack_require__(425),
			rendererRadioButtonControl: __webpack_require__(426),
			rendererSelectControl: __webpack_require__(427),
			rendererSingleSelectTemplate: __webpack_require__(428),
			rendererMultiSelectTemplate: __webpack_require__(429),
			rendererTextAreaControl: __webpack_require__(430),
			rendererTextControl: __webpack_require__(431),
			rendererTimeControl: __webpack_require__(432),
			rendererUrlControl: __webpack_require__(433),
			rendererPhoneControl: __webpack_require__(434),
			rendererImageControl: __webpack_require__(435),
			rendererFormReferenceControl: __webpack_require__(436),
			rendererVideoControl: __webpack_require__(437),
			rendererIdentityControl: __webpack_require__(438),
			rendererTemplate: __webpack_require__(165),
			rendererPanelControl: __webpack_require__(439),
			rendererSectionControl: __webpack_require__(440),
			rendererTableControl: __webpack_require__(441),
			rendererRepeatableSectionControl: __webpack_require__(442),
			rendererTabControl: __webpack_require__(443),
			rendererTableRow: __webpack_require__(444),
			rendererRepeatableRow: __webpack_require__(445),
			columnControl: __webpack_require__(446),
			rendererSectionRow: __webpack_require__(447),
			rendererPanelItem: __webpack_require__(448),
			rendererRepeatableItem: __webpack_require__(449),
			rendererTabContainerControl: __webpack_require__(450)
		};

		__webpack_require__(120);
		__webpack_require__(451);
		__webpack_require__(452);
		__webpack_require__(453);
		__webpack_require__(454);
		__webpack_require__(455);
		__webpack_require__(456);
		__webpack_require__(457);

		//endregion
		oj.koStringTemplateEngine.install();

		return function () {

			for (var name in templates) {
				/*istanbul ignore else*/
				if (templates.hasOwnProperty(name)) {
					ko.templates[name] = templates[name];
				}
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 408 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pcs-forms-row row-control\" data-bind=\"asyncTemplate: {name:'columnControl', foreach: $data.controls, as: 'control',pageSize: 1, afterLazyRenderAll: context.registerAsyncTemplate(context, $data.controls())},visible: !hide()\">\n\n</div>\n";

/***/ }),
/* 409 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<div data-bind=\"template:{afterRender: $parent.afterRenderMoney}\">\n    <label data-bind=\"attr: {for : $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n    <input data-bind=\"css: {'hide-up-down-arrow': !showUpDownArrow()}, attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, autofocus: autoFocus() ? 'autofocus' : null, autocomplete: autoComplete() ? 'on' : 'off', style: parsedStyle},\n                        ojComponent: {\n                                        component: 'ojInputNumber',\n                                        title: hint,\n                                        validators: $parent.validators,\n                                        readOnly: $parent.readOnly() || readonly(),\n                                        value: $parent.value,\n                                        rawValue: $parent.rawValue,\n                                        max: maxValue,\n                                        min: minValue,\n                                        step: step,\n                                        required: required,\n                                        disabled: $parent.readOnly() ? !$parent.readOnly() : disabled() || $parent.disabled(),\n                                        help: $parent.helpDefinition(help),\n                                        converter: converterOptions()\n                                      }, handleEvents: $parent\"/>\n</div>\n<!-- /ko -->";

/***/ }),
/* 410 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<div>\n    <button type=\"button\" data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, autofocus: autoFocus() ? 'autofocus' : null, style: parsedStyle},\n                                    ojComponent: {component: 'ojButton', label: label, disabled: $parent.readOnly() ||disabled() ||readonly() || $parent.disabled()}, handleEvents: $parent\" class=\"button-control\">\n    </button>\n</div>\n<!-- /ko -->";

/***/ }),
/* 411 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<label data-bind =\"attr: {for: $parent.domIdPrefix + $parent.id, id: $parent.id + '_mainLabel'}, text: label(), style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n<div data-bind = \"attr: {id: $parent.domIdPrefix + $parent.id, style: parsedStyle}, ojComponent: {\n    component: 'ojCheckboxset',\n    validators: $parent.validators,\n\tinvalidComponentTracker: $parent.tracker,\n\tdisabled: $parent.readOnly() || disabled() ||readonly() || $parent.disabled(),\n\tvalue: $parent.value,\n\trawValue: $parent.rawValue,\n\thelp: $parent.helpDefinition(help),\n    required: required}, handleEvents: $parent,\n    refresh: computedOptions\">\n\t<!-- ko foreach: computedOptions -->\n\t    <span class =\"oj-choice-row\" data-bind=\"attr: {id: $parents[1].id + '_row' + $index()}, css: {'oj-choice-row-inline': $parent.inline() === true}\">\n\t      <input data-bind=\"value: value, attr:{id: $parents[1].id + '_choice' +  $index(), autofocus: ($parent.autoFocus() && $parent.autoFocus()[0] === value) ? 'autofocus' : null}\"  type =\"checkbox\">\n\t      <label data-bind=\"for: $parents[1].id + '_choice' + $index(), text: label, style: {'fontSize': $parent.formattedStyle().fontSize}\"></label>\n\t    </span>\n\t<!-- /ko -->\n</div>\n<!-- /ko -->\n";

/***/ }),
/* 412 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<div data-bind = \"attr: {id: $parent.domIdPrefix + $parent.id, style: parsedStyle}, ojComponent: {\n    component: 'ojCheckboxset',\n    validators: $parent.validators,\n\tinvalidComponentTracker: $parent.tracker,\n\tdisabled: $parent.readOnly() || disabled() ||readonly() || $parent.disabled(),\n\tvalue: $parent.checkboxValue,\n\trawValue: $parent.rawValue,\n\thelp: $parent.helpDefinition(help),\n    required: required}, handleEvents: $parent\">\n\t<span class =\"oj-choice-item\" data-bind=\"attr: {id: $parent.id + '_check'}\">\n\t\t<input data-bind=\"value: 'true', attr:{id: $parent.id + '_checked'}\"  type =\"checkbox\">\n\t\t<label data-bind =\"attr: {for: $parent.domIdPrefix + $parent.id, id: $parent.id + '_mainLabel'}, text: label(), style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n\t</span>\n</div>\n<!-- /ko -->";

/***/ }),
/* 413 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<div data-bind=\"template:{afterRender: $parent.afterRenderDate}\">\n    <label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n    <input data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, style: parsedStyle, autofocus: autoFocus() ? 'autofocus' : null},\n                        ojComponent: {component: 'ojInputDate',\n                            validators: $parent.validators,\n                            disabled: disabled() || $parent.disabled(),\n                            placeholder: placeHolder,\n                            readOnly: $parent.readOnly() || readonly(),\n                            required: required,\n                            help: $parent.helpDefinition(help),\n                            value: $parent.value,\n                            rawValue: $parent.rawValue,\n                            max: maxValue,\n                            min: minValue,\n                            invalidComponentTracker: $parent.tracker,\n                            converter: dateConverter,\n                            keyboardEdit: preventFreeInput()? 'disabled':'enabled',\n\n                            datePicker: {\n                              changeMonth: 'none',\n                              changeYear: 'none',\n                              showOn: preventFreeInput()? 'focus':'image'\n                            }\n                        }, handleEvents: $parent\"/>\n    </div>\n\n<!-- /ko -->";

/***/ }),
/* 414 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<div data-bind=\"template:{afterRender: $parent.afterRenderTime}\">\n    <label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n    <input data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, style: parsedStyle, autofocus: autoFocus() ? 'autofocus' : null},\n                        ojComponent: {component: 'ojInputDateTime',\n                            validators: $parent.validators,\n                            disabled: disabled() || $parent.disabled(),\n                            placeholder: placeHolder,\n                            readOnly: $parent.readOnly() || readonly(),\n                            required: required,\n                            value: $parent.value,\n                            rawValue: $parent.rawValue,\n                            invalidComponentTracker: $parent.tracker,\n                            max: maxValue,\n                            min: minValue,\n                            help: $parent.helpDefinition(help),\n                            converter: dateConverter,\n                            keyboardEdit: preventFreeInput()? 'disabled':'enabled',\n                            datePicker: {\n                              changeMonth: 'none',\n                              changeYear: 'none',\n                              showOn: preventFreeInput()? 'focus':'image'\n                            },\n                            timePicker: {\n                                timeIncrement: step()[0],\n                                showOn: preventFreeInput()? 'focus':'image'\n                            }\n                        }, handleEvents: $parent\"/>\n</div>\n<!-- /ko -->";

/***/ }),
/* 415 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n<input data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, autocomplete: autoComplete() ? 'on' : 'off', style: parsedStyle, autofocus: autoFocus() ? 'autofocus' : null},\n\t\t\t\t\tojComponent: {\n\t\t\t\t\t\t\t\t\tcomponent: 'ojInputText',\n\t\t\t\t\t\t\t\t \ttitle: hint,\n\t\t\t\t\t\t\t\t \tplaceholder: placeHolder,\n\t\t\t\t\t\t\t\t \tvalidators: $parent.validators,\n\t\t\t\t\t\t\t\t \treadOnly: $parent.readOnly() || readonly(),\n\t\t\t\t\t\t\t\t \trequired: required,\n\t\t\t\t\t\t\t\t \tinvalidComponentTracker: $parent.tracker,\n\t\t\t\t\t\t\t\t \tvalue: $parent.value,\n\t\t\t\t\t\t\t\t \trawValue: $parent.rawValue,\n\t\t\t\t\t\t\t\t \tdisabled: disabled() || $parent.disabled(),\n\t\t\t\t\t\t\t\t \thelp: $parent.helpDefinition(help)\n\t\t\t\t\t\t\t\t }, handleEvents: $parent\"/>\n<!-- /ko -->";

/***/ }),
/* 416 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\r\n<div>\r\n\t<a class=\"anchorLink\" data-bind=\"text: (labelVal() === '') ? defaultLabel : labelVal  , attr: {id: $parents[1].domIdPrefix + $parents[1].id, name: $parents[1].name, style: parsedStyle,\r\n\t\t href : ($parent.value() === '') ? undefined : $parent.value ,\r\n\t\t target: anchor() ? null : target},  handleEvents: $parent\" />\r\n\r\n</div>\r\n<!-- /ko -->";

/***/ }),
/* 417 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n    <!-- ko template: {name: 'renderer' +  type()[0] + 'Template', data: {properties: $data, message: $parent.value()}} -->\n    <!-- /ko -->\n<!-- /ko -->";

/***/ }),
/* 418 */
/***/ (function(module, exports) {

module.exports = "<p data-bind=\"attr: {id: $parents[1].domIdPrefix + $parents[1].id, name: $parents[1].name, style: properties.parsedStyle}, text: message\"></p>";

/***/ }),
/* 419 */
/***/ (function(module, exports) {

module.exports = "<h1 data-bind=\"attr: {id: $parents[1].domIdPrefix + $parents[1].id, name: $parents[1].name, style: properties.parsedStyle}, text: message\"></h1>";

/***/ }),
/* 420 */
/***/ (function(module, exports) {

module.exports = "<h2 data-bind=\"attr: {id: $parents[1].domIdPrefix + $parents[1].id, name: $parents[1].name, style: properties.parsedStyle}, text: message\"></h2>";

/***/ }),
/* 421 */
/***/ (function(module, exports) {

module.exports = "<h3 data-bind=\"attr: {id: $parents[1].domIdPrefix + $parents[1].id, name: $parents[1].name, style: properties.parsedStyle}, text: message\"></h3>";

/***/ }),
/* 422 */
/***/ (function(module, exports) {

module.exports = "<h4 data-bind=\"attr: {id: $parents[1].domIdPrefix + $parents[1].id, name: $parents[1].name, style: properties.parsedStyle}, text: message\"></h4>";

/***/ }),
/* 423 */
/***/ (function(module, exports) {

module.exports = "<h5 data-bind=\"attr: {id: $parents[1].domIdPrefix + $parents[1].id, name: $parents[1].name, style: properties.parsedStyle}, text: message\"></h5>";

/***/ }),
/* 424 */
/***/ (function(module, exports) {

module.exports = "<h6 data-bind=\"attr: {id: $parents[1].domIdPrefix + $parents[1].id, name: $parents[1].name, style: properties.parsedStyle}, text: message\"></h6>";

/***/ }),
/* 425 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<div data-bind=\"template:{afterRender: $parent.afterRenderNumber}\">\n    <label data-bind=\"attr: {for:$parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n    <input data-bind=\"css: {'hide-up-down-arrow': !showUpDownArrow()}, attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, autocomplete: autoComplete() ? 'on' : 'off', style: parsedStyle, autofocus: autoFocus() ? 'autofocus' : null},\n                        ojComponent: {\n                                        component: 'ojInputNumber',\n                                        title: hint,\n                                        validators: $parent.validators,\n                                        readOnly: $parent.readOnly() || readonly(),\n                                        required: required,\n                                        max: maxValue,\n                                        min: minValue,\n                                        step: step,\n                                        invalidComponentTracker: $parent.tracker,\n                                        value: $parent.value,\n                                        rawValue: $parent.rawValue,\n                                        disabled: $parent.readOnly() ? !$parent.readOnly() : disabled() || $parent.disabled(),\n                                        help: $parent.helpDefinition(help)\n                                     }, handleEvents: $parent\"/>\n</div>\n<!-- /ko -->";

/***/ }),
/* 426 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<label data-bind =\"attr: {for: $parent.domIdPrefix + $parent.id, id: $parent.id + '_mainLabel'}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n<!-- ko if: !optionsFeed().optionsResolver().loading() -->\n<div data-bind = \"attr: {id: $parent.domIdPrefix + $parent.id, style: parsedStyle}, ojComponent: {\n    component: 'ojRadioset',\n    validators: $parent.validators,\n\tdisabled: $parent.readOnly() ||disabled() ||readonly() || $parent.disabled(),\n\trequired: required,\n\thelp: $parent.helpDefinition(help),\n\tmessagesCustom: optionsFeed().optionsResolver().customValidationMessages(),\n\tvalue: $parent.value}, handleEvents: $parent,\n    refresh: computedOptions\">\n    <!-- ko foreach: computedOptions -->\n\t    <span class =\"oj-choice-row\" data-bind=\"css: {'oj-choice-row-inline': $parent.inline() === true}\">\n\t      <input data-bind=\"value: value, attr:{id: $parents[1].id + $index(), name: $parents[1].id, autofocus: ($parent.autoFocus() && $parent.autoFocus()[0] === value) ? 'autofocus' : null}\" type =\"radio\">\n\t      <label data-bind=\"for: $parents[1].id + $index(), text: label, style: {'fontSize': $parent.formattedStyle().fontSize}\"></label>\n\t    </span>\n    <!-- /ko -->\n</div>\n<!-- /ko -->\n\n<!-- ko if: optionsFeed().optionsResolver().loading -->\n<div class=\"loadingControl\" data-bind=\"ojComponent:{\n\t  component: 'ojProgressbar',\n\t  value: -1}\">\n</div >\n<!-- /ko -->\n\n<!-- /ko -->\n";

/***/ }),
/* 427 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<div data-bind=\"template:{afterRender: $parent.afterRenderSelect}\">\n    <label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n    <!-- ko if: !optionsFeed().optionsResolver().loading() -->\n\n    <!-- ko template: multiple() ? 'rendererMultiSelectTemplate' : 'rendererSingleSelectTemplate'-->\n    <!-- /ko -->\n    <!-- /ko -->\n</div>\n\n<!-- ko if: optionsFeed().optionsResolver().loading -->\n<div class=\"loadingControl\" data-bind=\"ojComponent:{\n\t  component: 'ojProgressbar',\n\t  value: -1}\">\n</div >\n<!-- /ko -->\n\n<!-- /ko -->";

/***/ }),
/* 428 */
/***/ (function(module, exports) {

module.exports = "<select data-bind=\"attr: {autofocus: autoFocus() ? 'autofocus' : null, id: $parent.domIdPrefix + $parent.id, name: $parent.name}, ojComponent: {component: 'ojSelect',\n                                    disabled: $parent.readOnly() ||disabled() ||readonly() || $parent.disabled(),\n                                    title: hint,\n                                    help: $parent.helpDefinition(help),\n                                    placeholder: placeHolder,\n                                    required: required,\n                                    value: $parent._ojValue,\n                                    rawValue: $parent.rawValue,\n                                    invalidComponentTracker: $parent.tracker,\n                                    messagesCustom: optionsFeed().optionsResolver().customValidationMessages(),\n                                    validators: $parent.validators}, handleEvents: $parent\">\n    <!-- ko foreach: computedOptions() -->\n        <option data-bind=\"value: value, text:label\"></option>\n    <!-- /ko -->\n</select>";

/***/ }),
/* 429 */
/***/ (function(module, exports) {

module.exports = "<select data-bind=\"attr: {autofocus: autoFocus() ? 'autofocus' : null, id: $parent.domIdPrefix + $parent.id, name: $parent.name}, ojComponent: {component: 'ojSelect',\n                                    disabled: $parent.readOnly() ||disabled() ||readonly() || $parent.disabled(),\n                                    title: hint,\n                                    placeholder: placeHolder,\n                                    help: $parent.helpDefinition(help),\n                                    required: required,\n                                    value: $parent._ojValue,\n                                    rawValue: $parent.rawValue,\n                                    multiple: true,\n                                    invalidComponentTracker: $parent.tracker,\n                                    messagesCustom: optionsFeed().optionsResolver().customValidationMessages(),\n                                    validators: $parent.validators}, handleEvents: $parent\">\n    <!-- ko foreach: computedOptions() -->\n        <option data-bind=\"value: value, text:label\"></option>\n    <!-- /ko -->\n</select>";

/***/ }),
/* 430 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\r\n<label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\r\n<textarea data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, autocomplete: autoComplete() ? 'on' : 'off', autofocus: autoFocus() ? 'autofocus' : null, rows: rows, style: parsedStyle},\r\n                    ojComponent: {\r\n                        component: 'ojTextArea',\r\n                        title: hint,\r\n                        placeholder: placeHolder,\r\n                        validators: $parent.validators,\r\n                        readOnly: $parent.readOnly() || readonly(),\r\n                        required: required,\r\n                        value: $parent.value,\r\n                        rawValue: $parent.rawValue,\r\n                        disabled: disabled() || $parent.disabled(),\r\n                        invalidComponentTracker: $parent.tracker,\r\n                        help: $parent.helpDefinition(help)\r\n                        }, handleEvents: $parent\"></textarea>\r\n<!-- /ko -->";

/***/ }),
/* 431 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\r\n<label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\r\n<input data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, autofocus: autoFocus() ? 'autofocus' : null, autocomplete: autoComplete() ? 'on' : 'off', style: parsedStyle},\r\n\t\t\t\t\tojComponent: {\r\n\t\t\t\t\t\t\t\t\tcomponent: 'ojInputText',\r\n\t\t\t\t\t\t\t\t \ttitle: hint,\r\n\t\t\t\t\t\t\t\t \tplaceholder: placeHolder,\r\n\t\t\t\t\t\t\t\t \tvalidators: $parent.validators,\r\n\t\t\t\t\t\t\t\t \treadOnly: $parent.readOnly() || readonly(),\r\n\t\t\t\t\t\t\t\t \trequired: required,\r\n\t\t\t\t\t\t\t\t \tvalue: $parent.value,\r\n\t\t\t\t\t\t\t\t \tdisabled: disabled() || $parent.disabled(),\r\n\t\t\t\t\t\t\t\t \thelp: $parent.helpDefinition(help),\r\n\t\t\t\t\t\t\t\t \trawValue: $parent.rawValue,\r\n\t\t\t\t\t\t\t\t \tinvalidComponentTracker: $parent.tracker\r\n\t\t\t\t\t\t\t\t }, handleEvents: $parent\"/>\r\n<!-- /ko -->";

/***/ }),
/* 432 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<div data-bind=\"template:{afterRender: $parent.afterRenderTime}\">\n    <label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n    <input data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, style: parsedStyle, autofocus: autoFocus() ? 'autofocus' : null},\n                        ojComponent: {component: 'ojInputTime',\n                            validators: $parent.validators,\n                            disabled: disabled() || $parent.disabled(),\n                            placeholder: placeHolder,\n                            readOnly: $parent.readOnly() || readonly(),\n                            required: required,\n                            value: $parent.value,\n                            rawValue: $parent.rawValue,\n                            max: maxValue,\n                            min: minValue,\n                            invalidComponentTracker: $parent.tracker,\n                            help: $parent.helpDefinition(help),\n                            keyboardEdit: preventFreeInput()? 'disabled':'enabled',\n                            timePicker: {\n                                timeIncrement: step()[0],\n                                showOn: preventFreeInput()? 'focus':'image'\n                            }},\n                        }, handleEvents: $parent\"/>\n</div>\n<!-- /ko -->";

/***/ }),
/* 433 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize} \"></label>\n<input data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, autocomplete: autoComplete() ? 'on' : 'off', style: parsedStyle, autofocus: autoFocus() ? 'autofocus' : null},\n\t\t\t\t\tojComponent: {\n\t\t\t\t\t\t\t\t\tcomponent: 'ojInputText',\n\t\t\t\t\t\t\t\t \ttitle: hint,\n\t\t\t\t\t\t\t\t \tplaceholder: placeHolder,\n\t\t\t\t\t\t\t\t \tvalidators: $parent.validators,\n\t\t\t\t\t\t\t\t \treadOnly: $parent.readOnly() || readonly(),\n\t\t\t\t\t\t\t\t \trequired: required,\n\t\t\t\t\t\t\t\t \tvalue: $parent.value,\n\t\t\t\t\t\t\t\t \trawValue: $parent.rawValue,\n\t\t\t\t\t\t\t\t \tinvalidComponentTracker: $parent.tracker,\n\t\t\t\t\t\t\t\t \tdisabled: disabled() || $parent.disabled(),\n\t\t\t\t\t\t\t\t \thelp: $parent.helpDefinition(help)\n\t\t\t\t\t\t\t\t }, handleEvents: $parent\"/>\n<!-- /ko -->";

/***/ }),
/* 434 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<label data-bind=\"attr: {for : $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n<input data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id, name: $parent.name, autocomplete: autoComplete() ? 'on' : 'off', style: parsedStyle, autofocus: autoFocus() ? 'autofocus' : null},\n\t\t\t\t\tojComponent: {\n\t\t\t\t\t\t\t\t\tcomponent: 'ojInputText',\n\t\t\t\t\t\t\t\t \tplaceholder: placeHolder,\n\t\t\t\t\t\t\t\t \ttitle: hint,\n\t\t\t\t\t\t\t\t \tvalidators: $parent.validators,\n\t\t\t\t\t\t\t\t \treadOnly: $parent.readOnly() ||readonly(),\n\t\t\t\t\t\t\t\t \trequired: required,\n\t\t\t\t\t\t\t\t \tvalue: $parent.value,\n\t\t\t\t\t\t\t\t \trawValue: $parent.rawValue,\n\t\t\t\t\t\t\t\t \tdisabled: disabled() || $parent.disabled(),\n\t\t\t\t\t\t\t\t \thelp: $parent.helpDefinition(help)\n\t\t\t\t\t\t\t\t }, handleEvents: $parent\"/>\n<!-- /ko -->\n";

/***/ }),
/* 435 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<label class='oj-label' data-bind=\"attr: {for : $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n<img class=\"image-control\" data-bind=\"attr: {\n                    id: $parent.domIdPrefix + $parent.id,\n                    name: $parent.name,\n                    style: parsedStyle,\n                    alt : alt,\n                    src: $parent.value}, handleEvents: $parent\"/>\n\n<!-- /ko -->\n\n\n";

/***/ }),
/* 436 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n    <!-- ko if: $parent.isValidReference() -->\n        <label data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\" class=\"oj-label oj-component oj-inputtext-label\"></label>\n        <form-renderer data-bind=\"attr: {id: $parent.domIdPrefix + $parent.id}\" params=\"value: { form: $parent.selectedPresentation(),\n            allBundles: $parent.allBundles,\n            controlBindings: $parent.context.payloadContext.getBindingControlFor($parent),\n            bindingContext: $parent.context.payloadContext.getFullBindingContextFor($parent),\n            config: $parent.getConfig()\n            }, formId: $parent.properties.reference().formId,\n            onValidStateChange: $parent.onValidStateChange,\n            presentationId: $parent.properties.reference().presentationId,\n            loadedCallback: $parent.loadedCallback\">\n        </form-renderer>\n    <!-- /ko -->\n\n    <!-- ko if: !$parent.isValidReference() -->\n        <label data-bind=\"text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\" class=\"oj-label oj-component oj-inputtext-label\"></label>\n        <div class=\"broken-reference\">\n            <span class=\"broken-reference-text\" data-bind=\"text: $parent.msg.FAILED_TO_LOAD_FORM_CONTENT, attr: {title: $parent.msg.FAILED_TO_LOAD_FORM_CONTENT}\">Failed to load form content</span>\n        </div>\n    <!-- /ko -->\n<!-- /ko -->";

/***/ }),
/* 437 */
/***/ (function(module, exports) {

module.exports = "<!-- ko with: properties -->\n<label class=\"oj-label\" data-bind=\"attr: {for: $parent.domIdPrefix + $parent.id}, text: label, style: {'color': formattedStyle().labelColor, 'font-size': formattedStyle().labelSize}\"></label>\n\n<div class=\"wrapper\" data-bind=\"attr: {'style': parsedStyle}\">\n    <iframe data-bind=\"attr: {\n                        id: $parent.domIdPrefix + $parent.id,\n                        name: $parent.name,\n                    allowfullscreen : allowFullScreen() ? 'allowfullscreen' : null,\n                    msallowfullscreen : allowFullScreen() ? 'msallowfullscreen' : null,\n                    mozallowfullscreen : allowFullScreen() ? 'mozallowfullscreen' : null,\n                    oallowfullscreen : allowFullScreen() ? 'oallowfullscreen' : null,\n                    webkitallowfullscreen : allowFullScreen() ? 'webkitallowfullscreen' : null,\n                    src: parsedVideoSrcLink\n                    }, handleEvents: $parent\">\n    </iframe>\n</div>\n<!-- /ko -->\n";

/***/ }),
/* 438 */
/***/ (function(module, exports) {

module.exports = "<div data-bind=\"template:{afterRender: afterRenderIdentity}\">\r\n    <label data-bind=\"attr: {for: domIdPrefix + id},\r\n                            text: properties.label,\r\n                            style: {'color': properties.formattedStyle().labelColor,\r\n                                'font-size': properties.formattedStyle().labelSize}\"></label>\r\n    <select data-bind=\"attr: {autofocus: properties.autoFocus() ? 'autofocus' : null,\r\n                            id: domIdPrefix + id, name: name}, ojComponent: ojIdentityObj, handleEvents: $parent\">\r\n    </select>\r\n</div>";

/***/ }),
/* 439 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pcs-forms-row panel pcs-form-panel\" data-bind=\"attr: {style: $data.properties.parsedStyle}\">\n    <label class=\"oj-label\" data-bind=\"text:  $data.properties.label, visible: $data.properties.label() !== ''\"></label>\n    <div style=\"margin-right: -20px;\" data-bind=\"asyncTemplate: {name:'rendererPanelItem', foreach: $data.controls(), as: 'control', pageSize: 2, afterLazyRenderAll: context.registerAsyncTemplate(context, $data.controls())}\"></div>\n</div>";

/***/ }),
/* 440 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pcs-forms-row panel\" style=\"width:100%; min-height: 50px;\" data-bind=\"ojComponent: {component: 'ojCollapsible',\n    expanded: $data.properties.expanded}, attr: {id: 'section-' + id, style: $data.properties.parsedStyle}, handleEvents: $data\" >\n    <div class=\"section--header\" data-bind=\"template: { name: 'renderer' + properties.headerType()[0] + 'Template', data: {properties: properties, message: properties.label }}, css:{isContentInvalid:!isValid()}\"></div>\n\n    <div>\n    <!-- ko if: $data.renderContent -->\n    <div data-bind=\"asyncTemplate: {name:'rendererSectionRow', foreach: $data.controls(), pageSize: 2, afterLazyRenderAll: $data.registerAsyncTemplate(context, $data.controls()),hideLoading: true}\">\n    </div>\n    <!-- /ko -->\n    </div>\n</div>\n";

/***/ }),
/* 441 */
/***/ (function(module, exports) {

module.exports = "\n\n<div style=\"height: 25px; z-index: 1000\" data-bind=\"visible: properties.canAddDelete\">\n    <button type=\"button\" class=\"definition-action delete remove-row\" data-bind=\"event: {click: removeSelectedRow.bind($data), touchend: removeSelectedRow.bind($data)},\n    disable: (selectedRows().length === 0 || properties.readonly()), css: {disabled: (selectedRows().length === 0 || properties.readonly())}\">\n        <actionable-icon params=\"{icon: removeColumnIcon, styleClass:  'definition-img', alt: msg.DELETE}\"></actionable-icon>\n    </button>\n    <button type=\"button\" class=\"definition-action add add-row\" data-bind=\"disable: (!canAddRows() || properties.readonly()), css: {disabled: (!canAddRows() || properties.readonly())},\n    event:{click: addRow.bind($data),touchend: addRow.bind($data)}\">\n        <actionable-icon params=\"{icon: addColumnIcon, styleClass:  'definition-img', alt: msg.CREATE}\"></actionable-icon>\n    </button>\n</div>\n\n<div class=\"oj-table oj-table-container table-container\" style=\"width: 100%; max-height: 100%; table-layout: fixed\">\n    <!-- ko if: dataSource().length > 0 -->\n    <div class=\"oj-panel pcs-forms-row tablepanel\" data-bind=\"css: properties.invalidRepeatableClass\">\n        <label class=\"oj-label\" data-bind=\"text:  properties.label, visible: properties.label() !== '', style: {'color': properties.formattedStyle().labelColor, 'font-size': properties.formattedStyle().labelSize}\"></label>\n        <table class=\"table-control table-control-renderer oj-table-element\">\n            <thead class=\"oj-table-header\">\n            <tr class=\"oj-table-header-row\">\n                <th style=\"width: 10px\"></th>\n                <!-- ko foreach: controls -->\n                    <!-- ko ifnot: properties.hide()-->\n                    <th class=\"oj-table-column-header-cell\" data-bind=\"attr:{title: properties.label}, style: {'width': properties.formattedStyle().tableColumnWidth}\">\n                        <div class=\"oj-table-column-header\">\n                            <div class=\"oj-table-column-header-text\" data-bind=\"text: properties.label\"></div>\n                        </div>\n                    </th>\n                    <!-- /ko -->\n                <!-- /ko -->\n            </tr>\n            </thead>\n            <tbody class=\"oj-table-body\" data-bind=\"css: {hideTableLabels: properties.hideLabels()}, asyncTemplate:{name:'rendererTableRow', foreach: dataSource, pageSize: 5, afterLazyRenderAll: context.registerAsyncTemplate(context, dataSource), hideLoading: true}\">\n            </tbody>\n        </table>\n    </div>\n    <!-- /ko -->\n\n    <!-- ko if: dataSource().length === 0 -->\n    <div class=\"oj-table-body-row oj-table-hgrid-lines\" style=\"padding-top: 20px\"  data-bind=\"css: properties.invalidRepeatableClass\">\n        <span style=\"padding: 5px;\" data-bind=\"text: msg.NO_ROWS\"></span>\n    </div>\n    <!-- /ko -->\n    <!-- ko if: dataSource().length > properties.maxRows() -->\n    <div class=\"oj-table-body-row oj-table-hgrid-lines\" style=\"padding-top: 20px\">\n        <span style=\"padding: 5px;\" data-bind=\"text: StringUtils.format(msg.TOO_MANY_ROWS, properties.maxRows(), dataSource().length)\"></span>\n    </div>\n    <!-- /ko -->\n    <input data-bind=\"visible: false, ojComponent: {component: 'ojInputText', messagesCustom: properties.errorMsg()}\"/>\n</div>\n\n<script type=\"text/html\" id=\"renderer-table-cell\">\n    <!-- ko if: controls().length > 0 -->\n    <!-- ko with: controls()[0] -->\n    <div class=\"pcs-forms-row\">\n        <div data-bind=\"attr: { id: 'renderer-control-' + id }\">\n            <div data-bind=\"template: {name: controlTemplate, data: $data, as: 'control', afterRender: $data.afterRender}, visible: !properties.hide()\"></div>\n        </div>\n    </div>\n    <!-- /ko -->\n    <!-- /ko -->\n</script>";

/***/ }),
/* 442 */
/***/ (function(module, exports) {

module.exports = "\n\n<div data-bind=\"visible: properties.canAddDelete\" style=\"z-index: 1000\">\n    <button type=\"button\" class=\"definition-action delete remove-row\" data-bind=\"event: {click: removeSelectedRow.bind($data), touchend: removeSelectedRow.bind($data)},\n    disable: (selectedRows().length === 0 || properties.readonly()), css: {disabled: (selectedRows().length === 0 || properties.readonly())}\">\n        <actionable-icon params=\"{icon: removeColumnIcon, styleClass:  'definition-img', alt: msg.DELETE}\"></actionable-icon>\n    </button>\n    <button type=\"button\" class=\"definition-action add add-row\" data-bind=\"disable: (!canAddRows() || properties.readonly()), css: {disabled: (!canAddRows() || properties.readonly())},\n    event: {click: addRow.bind($data), touchend: addRow.bind($data)}\">\n        <actionable-icon params=\"{icon: addColumnIcon, styleClass:  'definition-img', alt: msg.CREATE}\"></actionable-icon>\n    </button>\n</div>\n<!-- ko if: dataSource().length > 0 -->\n<div class=\"oj-panel pcs-forms-row panel\" data-bind=\"css: properties.invalidRepeatableClass\">\n    <div data-bind=\"asyncTemplate:{name:'rendererRepeatableRow', foreach: dataSource, pageSize: 1, afterLazyRenderAll: context.registerAsyncTemplate(context, dataSource), hideLoading: true}\">\n    </div>\n</div>\n<!-- /ko -->\n\n<!-- ko if: dataSource().length === 0 -->\n<div class=\"oj-panel pcs-forms-row panel repeatable-section\" style=\"padding: 20px 20px 20px 30px;\" data-bind=\"css: properties.invalidRepeatableClass\">\n    <span data-bind=\"text: msg.NO_ROWS\"></span>\n</div>\n<!-- /ko -->\n<!-- ko if: dataSource().length > properties.maxRows() -->\n<div class=\"oj-panel pcs-forms-row panel repeatable-section\" style=\"padding: 20px 20px 20px 30px;\">\n    <span data-bind=\"text: StringUtils.format(msg.TOO_MANY_ROWS, properties.maxRows(), dataSource().length)\"></span>\n</div>\n<!-- /ko -->\n<input data-bind=\"visible: false, ojComponent: {component: 'ojInputText', messagesCustom: properties.errorMsg()}\"/>\n";

/***/ }),
/* 443 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pcs-forms-row panel\" style=\"width:100%; min-height: 50px;\"\n     data-bind=\"asyncTemplate: {name:'rendererSectionRow', foreach: $data.controls(), pageSize: 2, afterLazyRenderAll: context.registerAsyncTemplate(context, $data.controls()), hideLoading: true}\">\n</div>\n\n";

/***/ }),
/* 444 */
/***/ (function(module, exports) {

module.exports = "<tr class=\"oj-table-body-row oj-table-hgrid-lines\"\n    data-bind=\"css:{'oj-selected': isRowSelected},visible: !properties.hide(),\n                attr: {id: 'renderer-control-' + $parent.domIdPrefix + id}\"> <!--oj-hover && oj-selected -->\n    <td>\n        <input class=\"js-row-checkbox\" type=\"checkbox\" data-bind=\"checked: isRowSelected, visible: !$parent.properties.readonly() && !$parent.properties.hideRowCheckbox()\"/>\n    </td>\n    <!-- ko foreach: controls -->\n        <!-- ko ifnot: properties.hide()-->\n        <td class=\"table-cell oj-table-data-cell oj-table-vgrid-lines\" data-bind=\"\n                    css:{'oj-selected': $parent.isRowSelected},\n                    template:{name: 'renderer-table-cell', data: $data}\"></td>\n        <!-- /ko -->\n    <!-- /ko -->\n</tr>";

/***/ }),
/* 445 */
/***/ (function(module, exports) {

module.exports = "<div class=\"oj-panel pcs-forms-row panel repeatable-section\" data-bind=\"attr: {style: $parent.properties.parsedStyle, id: 'renderer-control-' + $parent.domIdPrefix + id},\n            visible: !properties.hide(),css:{'oj-selected': isRowSelected}\" style=\"width:100%; min-height: 50px;\">\n    <span>\n        <input type=\"checkbox\" data-bind=\"checked: isRowSelected, visible: !$parent.properties.readonly()\"/>\n        <label class=\"oj-label\" data-bind=\"text:  properties.label, visible: properties.label() !== '',style: {'color': $parent.properties.formattedStyle().labelColor, 'font-size': $parent.properties.formattedStyle().labelSize}\"></label>\n    </span>\n    <div data-bind=\"asyncTemplate: {name:'rendererRepeatableItem', foreach: $data.controls(), pageSize: 2, afterLazyRenderAll: context.registerAsyncTemplate(context, $data.controls())}\"></div>\n</div>";

/***/ }),
/* 446 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pcs-forms-col\" data-bind=\"css: $parent.columnSpan.getStyle($data, $data.selectedMedia().value)\">\n    <div class=\"control-container-renderer\" data-bind=\"attr: { id: 'renderer-control-' + domIdPrefix + $data.id }\">\n        <div data-bind=\"template: {name: $data.controlTemplate, data: $data, afterRender: $data.afterRender}, visible: !$data.properties.hide(), style: {'text-align' : $data.properties.formattedStyle().controlAlign}, css: $data.properties.formattedStyle().controlClassName\"></div>\n    </div>\n</div>";

/***/ }),
/* 447 */
/***/ (function(module, exports) {

module.exports = "<div data-bind=\"visible: !$data.properties.hide() || $data.properties.visible && $data.properties.visible()\">\n    <div data-bind=\"attr: { id: 'renderer-control-' + domIdPrefix + $data.id }\">\n        <div data-bind=\"template: {name: $data.controlTemplate, data: $data, afterRender: $data.afterRender}, style: {'text-align' : $data.properties.formattedStyle().controlAlign}, css: $data.properties.formattedStyle().controlClassName\"></div>\n    </div>\n</div>";

/***/ }),
/* 448 */
/***/ (function(module, exports) {

module.exports = "<div class= \"pcs-forms-panel-alig\" data-bind=\"css: $parent.colStyle($data, $data.selectedMedia().value)\">\n    <div data-bind=\"attr: { id: 'renderer-control-' + domIdPrefix + $data.id }\">\n        <div data-bind=\"template: {name: $data.controlTemplate, data: $data, afterRender: $data.afterRender}, visible: !$data.properties.hide(), style: {'text-align' : $data.properties.formattedStyle().controlAlign}, css: $data.properties.formattedStyle().controlClassName\"></div>\n    </div>\n</div>";

/***/ }),
/* 449 */
/***/ (function(module, exports) {

module.exports = "<div data-bind=\"css: $parents[1].colStyle($data, $data.selectedMedia().value)\">\n    <div data-bind=\"attr: { id: 'renderer-control-' + domIdPrefix + $data.id }\">\n        <div data-bind=\"template: {name: $data.controlTemplate, data: $data, afterRender: $data.afterRender}, visible: !$data.properties.hide()\"></div>\n    </div>\n</div>\n\n<!--TODO check how to merge with rendererPanelItem-->";

/***/ }),
/* 450 */
/***/ (function(module, exports) {

module.exports = "<!-- tablet and desktop version -->\n<div data-bind=\"ifMedia: 'oj-md'\" data-bind=\"handleEvents: $data\">\n    <div class=\"tab-container\" data-bind=\"ojComponent:{component: 'ojTabs', disabledTabs: $data.disabledTabs, 'selected': properties.selectedPosition}\">\n        <!-- tab bar -->\n        <ul>\n            <!-- ko foreach: { data: $data.controls(), as: 'control'} -->\n                <li data-bind=\"visible: !control.properties.hide()\">\n                    <span data-bind=\"text: control.properties.label, css:{isContentInvalid:!control.isValid()}\"></span>\n                </li>\n            <!-- /ko -->\n        </ul>\n\n        <!-- tab contents -->\n        <!-- ko foreach: { data: $data.controls(), as: 'control'} -->\n            <div data-bind=\"visible: !control.properties.hide(), style: {'text-align' : control.properties.formattedStyle().controlAlign}, css: control.properties.formattedStyle().controlClassName, handleEvents: control\">\n                <!-- ko if: control.rendered -->\n                <div data-bind=\"template: {name: control.controlTemplate, data: control, afterRender: control.afterRender}\"></div>\n                <!-- /ko -->\n            </div>\n        <!-- /ko -->\n    </div>\n</div>\n\n<!-- mobile version (accordion) -->\n<div data-bind=\"ifMedia: 'oj-sm-only'\">\n    <div class=\"tab-container\" data-bind=\"ojComponent: {component: 'ojAccordion', 'expanded': properties.selectedPositionAsArrayComputed}\">\n        <!-- ko foreach: { data: $data.controls(), as: 'control'} -->\n        <div data-bind=\"visible: !control.properties.hide(), ojComponent: {component: 'ojCollapsible', disabled: control.properties.disabled}\">\n            <span data-bind=\"text: control.properties.label\"></span>\n            <div data-bind=\"style: {'text-align' : control.properties.formattedStyle().controlAlign}, css: control.properties.formattedStyle().controlClassName\">\n                <!-- ko if: control.rendered -->\n                <div data-bind=\"template: {name: control.controlTemplate, data: control, afterRender: control.afterRender}\"></div>\n                <!-- /ko -->\n            </div>\n        </div>\n        <!-- /ko -->\n    </div>\n</div>";

/***/ }),
/* 451 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_451__;

/***/ }),
/* 452 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_452__;

/***/ }),
/* 453 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_453__;

/***/ }),
/* 454 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_454__;

/***/ }),
/* 455 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_455__;

/***/ }),
/* 456 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_456__;

/***/ }),
/* 457 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_457__;

/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    MediaQueryInspector = __webpack_require__(459);

		//endregion

		return function () {
			ko.bindingHandlers.ifMedia = {
				init: function init(element) {
					var mediaQueryInspector = ko.bindingHandlers.ifMedia.mediaQueryInspector;
					$(window).on('resize orientationchange load', mediaQueryInspector.mediaQueryChanged);
					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						$(window).off('resize orientationchange load', mediaQueryInspector.mediaQueryChanged);
					});
				},
				preprocess: function preprocess(val, name, addBinding) {
					addBinding('if', 'ko.bindingHandlers.ifMedia.mediaQueryInspector.mediaQuery().accept(' + val + ')');
					return val;
				}
			};

			ko.bindingHandlers.ifMedia.mediaQueryInspector = new MediaQueryInspector();
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var MediaQueryType = __webpack_require__(150),
		    ko = __webpack_require__(1);

		//end region

		return function () {
			var self = this;

			self.findMediaQuery = function () {
				var mediaQuery = MediaQueryType.EXTRA_LARGE;
				for (var type in MediaQueryType) {
					if (MediaQueryType.hasOwnProperty(type) && self._mediaMatches(MediaQueryType[type].query)) {
						mediaQuery = MediaQueryType[type];
						break;
					}
				}
				return mediaQuery;
			};

			self.mediaQueryChanged = function () {
				self.mediaQuery(self.findMediaQuery());
			};

			self._mediaMatches = function (media) {
				return window.matchMedia(media).matches;
			};

			self.mediaQuery = ko.observable(self.findMediaQuery());
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    AsyncTemplateBinding = __webpack_require__(461);

		//endregion

		return function () {

			/* istanbul ignore next */
			ko.bindingHandlers.clean = {
				init: function init(element, scope) {
					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						$('.' + scope() + '-applied-stylesheet').remove();
					});
				}
			};

			/**
          * render a particular template foreach element using timeout to avoid freezing the UI thread.
          * It is recommended for large lists that will not change much after being rendered.
          * Following properties are supported:
          * - name: template name
          * - foreach: list of elements.
          * - afterLazyRenderAll[optional]: to be called when all the elements have been rendered
          * - pageSize [optional]: Number of elements to be rendered in one cycle. Default value is 1.
          * - hideLoading: By default a loading placeholder is shown, to avoid it set this flag to true.
          * @type {{init: init}}
          */
			ko.bindingHandlers.asyncTemplate = AsyncTemplateBinding;
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var RenderingQueue = __webpack_require__(462),
		    AsyncRenderer = __webpack_require__(463);

		//end region

		return {
			init: function init(element, valueAccessor, allBindings, viewModel, bindingContext) {
				var templateData = valueAccessor();
				var asyncRenderer = new AsyncRenderer(templateData, element);

				if (templateData.foreach.subscribe) {
					asyncRenderer.subscribeToChanges(element, bindingContext);
				}

				var queue = new RenderingQueue(element, bindingContext, asyncRenderer);

				//start executing the templates.
				queue.execute();

				//descendant bindings are managed by the AsyncTemplateRenderer
				return {
					'controlsDescendantBindings': true
				};
			}
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    $ = __webpack_require__(2);

		//end region

		return function (element, bindingContext, asyncRenderer) {
			var templateData = asyncRenderer.getTemplateData();
			var list = ko.unwrap(templateData.foreach);
			var afterLazyRenderAll = templateData.afterLazyRenderAll || function () {};
			var pageSize = ko.unwrap(templateData.pageSize) || 1;
			var queue = [];

			//render temporary placeholders.
			var temp = $(asyncRenderer.getPlaceholder());
			for (var i = 0; i < list.length; i++) {
				var innerBindingContext = bindingContext.createChildContext(list[i]);
				var newNode = $(asyncRenderer.getPlaceholder());
				temp.append(newNode);
				queue.push(asyncRenderer.renderTemplate.bind(asyncRenderer, innerBindingContext, newNode, i));
			}
			temp.children().appendTo(element);

			/**
          * render the current Page.
          * If all the elements have been rendered, then will execute the callback.
          * @param queue elements in queue
          * @param i the current index (beginning of page)
          * @param pageSize the amount of elements per page
          * @param afterLazyRenderAll callback when all the elements have been executed.
          */
			var executeQueuePage = function executeQueuePage(queue, i, pageSize, afterLazyRenderAll) {
				for (var j = 0; j < pageSize; j++) {
					queue[i + j]();
					if (i + j === queue.length - 1) {
						afterLazyRenderAll(element);
					}
				}
			};

			/**
          * will start rendering the controls in intervals, based on a page size.
          */
			this.execute = function () {
				setTimeout(function () {
					for (var i = 0; i < queue.length;) {
						var remaining = queue.length - i;
						if (remaining >= pageSize) {
							setTimeout(executeQueuePage.bind(null, queue, i, pageSize, afterLazyRenderAll), 10);
							i += pageSize;
						} else {
							setTimeout(executeQueuePage.bind(null, queue, i, 1, afterLazyRenderAll), 10);
							i++;
						}
					}
				}, 10);
			};
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    UUID = __webpack_require__(17),
		    $ = __webpack_require__(2);
		//end region

		/**
      * Converts the children of a node into a string, so it can be used as a template
      * @param element
      * @returns {string}
      */
		function nodesToHtml(element) {
			var outerHtml = '';
			_.forEach($(element).children(), function (node) {
				outerHtml += node.nodeValue || $(node).prop('outerHTML');
			});
			return outerHtml;
		}

		/**
      * Goes through each child and sets the indexObservable
      * If indexObservable is not set, it will save the new value
      * (this is beacause we don't have a way to access the newly created node, so we execute this
      *  after each node is created, and assume that the only one without the data set is the new one)
      */

		function updateAndSetIndex(indexes) {
			var nextIndex = 0;
			var newIndexes = [];
			for (var i = 0; i < indexes.length; i++) {
				if (indexes[i]) {
					newIndexes[nextIndex] = indexes[i];
					newIndexes[nextIndex](nextIndex);
					nextIndex++;
				}
			}
			return newIndexes;
		}

		return function (templateData, element) {
			var _this = this;

			this._templateData = templateData;
			this._removeTemplate = false;
			this._subscriptions = [];
			this._indexes = [];

			// If name is not set, assume that we want the child nodes as template
			if (!this._templateData.name) {
				//Create a unique name
				this._templateData.name = UUID.createSafeUuid();
				//Get the children as a template and add it to knockout
				ko.templates[this._templateData.name] = nodesToHtml(element);
				//Empty the element (so that the template doesn't affect us
				ko.virtualElements.emptyNode(element);
				//Set the tempalte to be delated
				this._removeTemplate = true;
			}

			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				//Dispose of any subscription that we have created
				_.each(_this._subscriptions, function (subscription) {
					subscription.dispose();
				});
				//If we used temp template (or TEMP-late), we need to remove it from the list
				if (_this._removeTemplate) {
					delete ko.templates[_this._templateData.name];
				}
			});

			/**
          * render a template using ths ko.renderTemplate method.
          * @param innerBindingContext
          * @param node
          * @param index
          */
			this.renderTemplate = function (innerBindingContext, node, index) {
				if (this._templateData.as) {
					innerBindingContext[this._templateData.as] = innerBindingContext.$data;
				}
				//Create a new $index observable, with a value of index
				var indexObservable = ko.observable(index);
				innerBindingContext['$index'] = indexObservable;
				ko.renderTemplate(ko.unwrap(this._templateData.name), innerBindingContext, this._templateData, node, 'replaceNode');
				//After the template has been renderer, update all the indexes
				//Also, send the observable, so the new node (which wont have a indexObservable data) is set
				var currentIndex = this._indexes.length - 1;
				while (currentIndex >= index && this._indexes[currentIndex]) {
					this._indexes[currentIndex + 1] = this._indexes[currentIndex];
					this._indexes[currentIndex + 1](currentIndex + 1);
					currentIndex--;
				}
				this._indexes[index] = indexObservable;
			};

			/**
          * listen and react to modification changes (add, remove, sort)
          * @param element
          * @param bindingContext
          */
			this.subscribeToChanges = function (element, bindingContext) {
				var self = this;
				this._subscriptions.push(this._templateData.foreach.subscribe(function (changes) {

					var removeChanges = [];
					var addChanges = [];
					ko.utils.arrayForEach(changes, function (change) {
						switch (change.status) {
							case 'added':
								addChanges.push(change);
								break;
							case 'deleted':
								removeChanges.push(change);
								break;
						}
					});

					//first remove elements in reverse order to preserve the index.
					removeChanges = removeChanges.reverse();
					for (var b = 0; b < removeChanges.length; b++) {
						$($(element).children().get(removeChanges[b].index)).remove();
						self._indexes[removeChanges[b].index] = null;
					}
					//Update the indexes after the removed elments
					self._indexes = updateAndSetIndex(self._indexes);

					//add changes in the order they came.
					for (var i = 0; i < addChanges.length; i++) {
						var change = addChanges[i];
						var innerBindingContext = bindingContext.createChildContext(change.value);
						var newNode = $(self.getPlaceholder());

						if (change.index) {
							var beforeNode = $($(element).children().get(change.index - 1));
							newNode.insertAfter(beforeNode);
						} else {
							$(element).prepend(newNode);
						}

						setTimeout(self.renderTemplate.bind(self, innerBindingContext, newNode, change.index), 10);
					}
					//We don't update the indexes after the create because:
					// * They are executed with a timeout, so they are not there yet
					// * The renderTemplate function does it after each node is created
				}, self, 'arrayChange'));
			};

			/**
          * template for placeholder elements (displayed while the real node is in the queue).
          * @returns {string} the template.
          */
			this.getPlaceholder = function () {
				var temporaryNodeClass = ko.unwrap(this._templateData.hideLoading) ? '' : 'loading__placeholder';
				return '<div class="' + temporaryNodeClass + '"></div>';
			};

			this.getTemplateData = function () {
				return this._templateData;
			};
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    $ = __webpack_require__(2),
		    _ = __webpack_require__(0),
		    EventsId = __webpack_require__(14);

		//endregion

		var EVENTS_TO_IGNORE = [
		//This events are subscribed on ON_EXPAND_TOGGLE
		EventsId.ON_EXPAND.value, EventsId.ON_COLLAPSE.value,
		//onLoad is not bind to element, is called when the form finishes loading (load on RendererViewModel)
		EventsId.ON_LOAD.value,
		//onSubmit is triggered by the submit of the form (getValues on RendererViewModel)
		EventsId.ON_SUBMIT.value,
		//This event is subscribed during ON_SELECT
		EventsId.ON_UNSELECTED.value,
		//This event is executed directly by the table
		EventsId.ON_ADD_ROW.value, EventsId.ON_REMOVE_ROW.value];

		return function () {
			/**
    * The handle events binding adds the JQuery events binding of the form
    * to the control
    * The expected parameter is the control that will execute the event
    * The valid list of events is deduced by the control type
    * @type {{init: Function}}
    */
			ko.bindingHandlers.handleEvents = {
				init: function init(element, valueAccessor) {
					var control = ko.unwrap(valueAccessor()),
					    $el = $(element);

					var events = control.getValidEvents();
					var subscriptions = [];
					_.each(events, function (event) {
						var executeThisEvent = control.eventsQueue.execute.bind(this, control, event);

						if (_.contains(EVENTS_TO_IGNORE, event.value)) {
							return;
						}

						switch (event.value) {
							case EventsId.ON_CHANGE.value:
								if (ko.isObservable(control.value)) {
									subscriptions.push(control.value.subscribe(executeThisEvent));
								}
								break;
							case EventsId.ON_EXPAND_TOGGLE.value:
								subscriptions.push(control.properties.expanded.subscribe(function (newValue) {
									/**
         	 * Execute the expand Toggle,
         	 * then execute the correct event
         	 */
									executeThisEvent();
									if (newValue) {
										control.eventsQueue.execute(control, EventsId.ON_EXPAND);
									} else {
										control.eventsQueue.execute(control, EventsId.ON_COLLAPSE);
									}
								}));
								break;
							case EventsId.ON_SELECTED.value:
								var parent = control.getParent();
								var index = parent.controls().indexOf(control);
								subscriptions.push(parent.properties.selectedPosition.subscribeChanged(function (newValue, oldValue) {
									if (oldValue === index) {
										control.eventsQueue.execute(control, EventsId.ON_UNSELECTED);
									}
									if (newValue === index) {
										control.eventsQueue.execute(control, EventsId.ON_SELECTED);
									}
								}));

								break;
							default:
								$el.on(event.event, executeThisEvent);
						}
					});

					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						//Dispose of the subscriptions
						_.each(subscriptions, function (subs) {
							subs.dispose();
						});
					});
				}
			};
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

		'use strict';

		//region dependencies

		var ko = __webpack_require__(1),
		    _ = __webpack_require__(0),
		    $ = __webpack_require__(2);

		//endregion

		return function () {
			ko.subscribable.fn.subscribeChanged = function (callback) {
				var oldValue;
				var oldValueSubscription = this.subscribe(function (_oldValue) {
					oldValue = _.clone(_oldValue);
				}, this, 'beforeChange');

				var newValueSubscription = this.subscribe(function (newValue) {
					callback(newValue, oldValue);
				});

				return {
					dispose: function dispose() {
						oldValueSubscription.dispose();
						newValueSubscription.dispose();
					}
				};
			};

			ko.bindingHandlers.refresh = {
				init: function init(element, updatedObservable, allBindings) {
					var subscription = updatedObservable().subscribe(function () {
						var componentType = allBindings().ojComponent.component;
						$(element)[componentType]('refresh');
					});

					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						subscription.dispose();
					});
				}
			};

			/**
    * subscribe to a DOM element render and remove.
    * afterRender will be called as soon as the binding is initialized.
    * beforeRemove will be called when the node is being disposed.
    * @type {{init: init}}
    */
			ko.bindingHandlers.subscribe = {
				init: function init(element, valueAccessor) {
					var callbacks = valueAccessor();

					callbacks.afterRender(element);

					ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
						callbacks.beforeRemove(element);
					});
				}
			};

			/**
    * Opposite to apply bindings. Use this to clean the ko and oj context for a previously applied binding.
    * It also clears any jquery event bind registered.
    * @param $node jquery node where pointing to the DOM element where the binding was originally applied
    * @param remove true to remove the DOM element, false just to clean the context.
    */
			ko.unApplyBindings = function ($node, remove) {
				// unbind events
				$node.find('*').each(function () {
					$(this).off();
					$(this).unbind();
				});

				$node.off();

				// Remove KO subscriptions and references
				ko.cleanNode($node[0]);
				$node.find('*').each(function () {
					$(this).remove();
				});

				if (remove) {
					ko.removeNode($node[0]);
				}
			};
		};
	}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
/******/ ])});;
//# sourceMappingURL=forms.renderer-lib.js.map