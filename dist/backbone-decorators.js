(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('underscore'), require('backbone')) : typeof define === 'function' && define.amd ? define(['exports', 'underscore', 'backbone'], factory) : factory(global.Decorators = {}, global._, global.Backbone);
})(this, function (exports, _, Backbone) {
    'use strict';

    _ = 'default' in _ ? _['default'] : _;
    Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;

    /* Ideally we'd want to just pass these exports through directly
     * but Babel complains about nesting exports, so we attach them
     * to a namespace
     */

    // Backbone Decorators

    // Views

    function on(eventName) {
        return function (target, name, descriptor) {
            if (target.events && !_.has(target, 'events')) {
                target.events = _.clone(target.events);
            }
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

    //Collections

    function model(modelClass) {
        return function decorator(target) {
            if (modelClass.prototype instanceof Backbone.Model) {
                target.prototype.model = modelClass;
            } else {
                throw new Error('The model decorator takes either a single argument that should be an instance of Backbone.Model');
            }
        };
    }

    function comparator(comparatorString) {
        return function decorator(target) {
            if (_.isString(comparatorString)) {
                target.prototype.comparator = comparatorString;
            } else {
                throw new Error('The comparator decorator takes either a single argument that should be a string');
            }
        };
    }

    //Models

    function defaults() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return function decorator(target) {
            var defaults = target.prototype.defaults || {};
            var key = args[0];
            var value = args[1];

            if (_.isObject(key)) {
                _.extend(defaults, key);
            } else if (_.isString(key) && !_.isUndefined(value)) {
                defaults[key] = value;
            } else {
                throw new Error('The defaults decorator takes either a single object as an argument or a key and value');
            }
            target.prototype.defaults = defaults;
        };
    }

    //Router

    function route(routeName) {
        return function (target, name, descriptor) {
            if (!target.routes) {
                target.routes = {};
            }
            if (_.isFunction(target.routes)) {
                throw new Error('The route decorator is not compatible with a route method');
                return;
            }
            if (!routeName) {
                throw new Error('The route decorator requires an route string argument');
            }
            target.routes[routeName] = name;
            return descriptor;
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
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
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
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                superMethod.apply(this, args);
            };
        } else {
            throw new Error('The useSuper method requires the parent class to implement this function somewhere on its prototype chain');
        }
        return descriptor;
    }

    //Backbone.LocalStorage Decorators

    function localStorage(storageKey) {
        return function decorator(target) {
            if (Backbone.LocalStorage) {
                if (_.isString(storageKey)) {
                    target.prototype.localStorage = new Backbone.LocalStorage(storageKey);
                } else {
                    throw new Error('The localStorage decorator requires a single string argument which will serve as the localStorage key');
                }
            } else {
                throw new Error('The localStorage decorator requires Backbone.LocalStorage to have been loaded before use');
            }
        };
    }

    //Marionette-service Decorators

    function replyRadio(channel, requestString) {
        return function (target, name, descriptor) {
            if (!target.radioRequests) {
                target.radioRequests = {};
            }
            if (_.isFunction(target.radioRequests)) {
                throw new Error('The replyRadio decorator is not compatible with a radioRequests method');
                return;
            }
            if (!_.isString(channel) || !_.isString(requestString)) {
                throw new Error('The replyRadio decorator requires 2 arguments, a channel and a request string.');
            }
            target.radioRequests[channel + ' ' + requestString] = name;
            return descriptor;
        };
    }

    exports.on = on;
    exports.tagName = tagName;
    exports.model = model;
    exports.comparator = comparator;
    exports.defaults = defaults;
    exports.route = route;
    exports.onModel = onModel;
    exports.onCollection = onCollection;
    exports.template = template;
    exports.childView = childView;
    exports.childViewContainer = childViewContainer;
    exports.ui = ui;
    exports.useSuper = useSuper;
    exports.localStorage = localStorage;
    exports.replyRadio = replyRadio;
});
//# sourceMappingURL=backbone-decorators.js.map