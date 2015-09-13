import _ from 'underscore';

/* Ideally we'd want to just pass these exports through directly
 * but Babel complains about nesting exports, so we attach them
 * to a namespace
 */

// Backbone Decorators

// Views

export function on(eventName) {
    return function(target, name, descriptor) {
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

export function tagName(value) {
    return function decorator(target) {
        target.prototype.tagName = value;
    };
}

// Marionette Decorators

// Views

export function onModel(eventName) {
    return function(target, name, descriptor) {
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

export function onCollection(eventName) {
    return function(target, name, descriptor) {
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
