'use strict'

/**
 * Function main
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
exports.handler = async (event, context, callback) => {

    // Request
    const body = event.body || event;
    // const headers = event.headers || context.request.headers || [];

    return body;
}