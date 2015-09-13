//Decorators for Marionette Views
import _ from 'underscore';

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
