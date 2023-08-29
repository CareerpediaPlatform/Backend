import logger from "../logger";

const {
    forEach,
    camelCase,
    isPlainObject,
    isArray,
} = require('lodash');

function formCamelCaseForArray(data) {
    return  data.map(toCamelCase);
}


export function toCamelCase(object) {
    const camelCaseObject = {};
    try {
        if (Array.isArray(object)) {
            return formCamelCaseForArray(object);
        } else if (!isNaN(object)) {
            return object;
        }
        forEach(object,
            (value, key, i) => {
                if (isPlainObject(value)) {
                    value = toCamelCase(value);
                } else if (isArray(value)) {
                    value = formCamelCaseForArray(value);
                }
                camelCaseObject[camelCase(key)] = value;
            });
        return camelCaseObject;
    } catch (err) {
        logger.error('ERROR in toCamelCase()', err);
        return object;
    }
}
