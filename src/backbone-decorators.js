import _ from 'underscore';
import Backbone from 'backbone';

/* Ideally we'd want to just pass these exports through directly
 * but Babel complains about nesting exports, so we attach them
 * to a namespace
 */

function onDecoratorFactory(decoratorName, propertyName) {
    return function(eventName) {
         return function(target, name, descriptor) {
             if (!eventName) {
                 throw new Error(`The ${decoratorName} decorator requires an eventName argument`);
             }
             if (_.isFunction(target[propertyName])) {
                 throw new Error(`The ${decoratorName} decorator is not compatible with ${propertyName} as method form`);
                 return;
             }
             if (target[propertyName] && !_.has(target, propertyName)) {
                 target[propertyName] = _.clone(target[propertyName]);
             }
             if (!target[propertyName]) {
                 target[propertyName] = {};
             }
             target[propertyName][eventName] = name;
             return descriptor;
         };
     };
}

// Backbone Decorators

// Views

export const on = onDecoratorFactory('on', 'events');

export function tagName(value) {
    return function decorator(target) {
        target.prototype.tagName = value;
    };
}

//Collections

export function model(modelClass) {
    return function decorator(target) {
        if (modelClass.prototype instanceof Backbone.Model) {
            target.prototype.model = modelClass;
        } else {
            throw new Error('The model decorator takes either a single argument that should be an instance of Backbone.Model');
        }
    };
}

export function comparator(comparatorString) {
    return function decorator(target) {
        if (_.isString(comparatorString)) {
            target.prototype.comparator = comparatorString;
        } else {
            throw new Error('The comparator decorator takes either a single argument that should be a string');
        }
    };
}

//Models

export function defaults(...args) {
    return function decorator(target) {
        let defaults = target.prototype.defaults || {};
        let [key, value] = args;
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

export function route(routeName) {
    return function(target, name, descriptor) {
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

export const onModel = onDecoratorFactory('onModel', 'modelEvents');
export const onCollection = onDecoratorFactory('onCollection', 'modelEvents');
export const onChild = onDecoratorFactory('onChild', 'childEvents');

export function template(value) {
    return function decorator(target) {
        target.prototype.template = value;
    };
}

export function childView(value) {
    return function decorator(target) {
        target.prototype.childView = value;
    };
}

export function childViewContainer(value) {
    return function decorator(target) {
        target.prototype.childViewContainer = value;
    };
}

export function ui(...args) {
    return function decorator(target) {
        let ui = target.prototype.ui || {};
        let [key, value] = args;
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

export function useSuper(target, name, descriptor) {
    let superMethod = Object.getPrototypeOf(target)[name];
    if (_.isFunction(superMethod)) {
        descriptor.value = function(...args) {
            superMethod.apply(this, args);
        };
    } else {
        throw new Error('The useSuper method requires the parent class to implement this function somewhere on its prototype chain');
    }
    return descriptor;
}

//Backbone.LocalStorage Decorators

export function localStorage(storageKey) {
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

export function replyRadio(channel, requestString) {
    return function(target, name, descriptor) {
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
