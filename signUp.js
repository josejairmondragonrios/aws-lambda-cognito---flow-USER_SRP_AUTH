'use strict'

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
global.fetch = require("node-fetch");

/**
 * Load environment variables - .env
 */
require('dotenv').config();

/**
 * Function main
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
exports.handler = async (event, context, callback) => {

    // Request
    let parameters = event.body || event;
    // let headers = event.headers || context.request.headers || [];
    console.info(parameters);

    let username = "",
        password = "";

    if (!validateParameter(parameters))
        return "Error: there are not parameters";

    if (!validateParameter(parameters.username))
        return "Error: parameter 'username' is empty";
    username = parameters.username;

    if (!validateParameter(parameters.password))
        return "Error: parameter 'password' is empty";
    password = parameters.password;

    await signUp(username, password)
        .then(function (result) {
            console.info(result);
            // return JSON.stringify(result);
            // callback(null, result);
        }, function (err) {
            console.info(err);
            // return JSON.stringify(err);
            // callback(null, err);
        });
    return;
}

/**
 * Validate parameters
 * @param {*} parameter 
 */
var validateParameter = function (parameter) {
    return (typeof parameter === undefined
        || parameter == null
        || parameter == ''
        || parameter.length == 0) ? false : true;
}

/**
 * Create user
 * @param {*} username 
 * @param {*} password 
 * @param {*} clientId 
 */
var signUp = async (username, password) => {
    return new Promise(function (resolve, reject) {

        const poolData = {
            UserPoolId: process.env.UserPoolId,
            ClientId: process.env.AppClientId
        };

        let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        /// custom parameters
        let attributeList = [];
        // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(
        //     {
        //         Name: "custom:customParameter",
        //         Value: customParameter
        //     }
        // ));

        userPool.signUp(username, password, attributeList, null, function (
            err,
            result
        ) {
            if (err) {
                //console.info(err.message || JSON.stringify(err));
                reject(err);
            } else {
                let cognitoUser = result.user;
                //console.log('user name is ' + cognitoUser.getUsername());
                resolve(cognitoUser);
            }
        });
    });
}