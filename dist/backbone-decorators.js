(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('underscore')) : typeof define === 'function' && define.amd ? define(['exports', 'underscore'], factory) : factory(global.Decorators = {}, global._);
})(this, function (exports, _) {
    'use strict';

    _ = 'default' in _ ? _['default'] : _;

    /* Ideally we'd want to just pass these exports through directly
     * but Babel complains about nesting exports, so we attach them
     * to a namespace
     */

    // Backbone Decorators

    // Views

    function on(eventName) {
        return function (target, name, descriptor) {
            if (!target.events) {
                target.events = {};
            }
            if (_.isFunction(target.events)) {
                throw new Error('The on decorator is not compatible with an events method');
                return;
            }
            if (!eventName) {
                throw new Error('The on decorator requires an eventName argument');
            }
            target.events[eventName] = name;
            return descriptor;
        };
    }

    function tagName(value) {
        return function decorator(target) {
            target.prototype.tagName = value;
        };
    }

    // Marionette Decorators

    // Views

    function onModel(eventName) {
        return function (target, name, descriptor) {
            if (!target.modelEvents) {
                target.modelEvents = {};
            }
            if (_.isFunction(target.modelEvents)) {
                throw new Error('The onModel decorator is not compatible with a modelEvents method');
                return;
            }
            if (!eventName) {
                throw new Error('The onModel decorator requires an eventName argument');
            }
            target.modelEvents[eventName] = name;
            return descriptor;
        };
    }

    function onCollection(eventName) {
        return function (target, name, descriptor) {
            if (!target.collectionEvents) {
                target.collectionEvents = {};
            }
            if (_.isFunction(target.collectionEvents)) {
                throw new Error('The onCollection decorator is not compatible with a collectionEvents method');
                return;
            }
            if (!eventName) {
                throw new Error('The onCollection decorator requires an eventName argument');
            }
            target.collectionEvents[eventName] = name;
            return descriptor;
        };
    }

    function template(value) {
        return function decorator(target) {
            target.prototype.template = value;
        };
    }

    function childView(value) {
        return function decorator(target) {
            target.prototype.childView = value;
        };
    }

    function childViewContainer(value) {
        return function decorator(target) {
            target.prototype.childViewContainer = value;
        };
    }

    function ui() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return function decorator(target) {
            var ui = target.prototype.ui || {};
            var key = args[0];
            var value = args[1];

            if (_.isObject(key)) {
                _.extend(ui, args[0]);
            } else if (_.isString(key) && _.isString(value)) {
                ui[key] = value;
            } else {
                throw new Error('The ui decorator takes either a single object as an argument or a key and value string');
            }
            target.prototype.ui = ui;
        };
    }

    // Utility Decorators

    function useSuper(target, name, descriptor) {
        var superMethod = Object.getPrototypeOf(target)[name];
        if (_.isFunction(superMethod)) {
            descriptor.value = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                superMethod.apply(this, args);
            };
        } else {
            throw new Error('The useSuper method requires the parent class to implement this function somewhere on its prototype chain');
        }
        return descriptor;
    }

    exports.on = on;
    exports.tagName = tagName;
    exports.onModel = onModel;
    exports.onCollection = onCollection;
    exports.template = template;
    exports.childView = childView;
    exports.childViewContainer = childViewContainer;
    exports.ui = ui;
    exports.useSuper = useSuper;
});
//# sourceMappingURL=backbone-decorators.js.map