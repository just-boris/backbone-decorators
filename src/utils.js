//Utility Decorators to support Backbone's class system
import _ from 'underscore';

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
