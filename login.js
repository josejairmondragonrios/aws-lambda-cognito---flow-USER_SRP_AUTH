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
    const parameters = event.body || event;
    // const headers = event.headers || context.request.headers || [];

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

    await login(username, password)
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
 * Login
 * @param {*} username 
 * @param {*} password 
 */
function login(username, password) {
    return new Promise(function (resolve, reject) {

        var authenticationData = {
            Username: username,
            Password: password,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationData
        );

        /// asigna los datos del user-pool del archivo .env
        const poolData = {
            UserPoolId: process.env.UserPoolId,
            ClientId: process.env.AppClientId
        };

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username: username,
            Pool: userPool,
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                // var accessToken = result.getAccessToken().getJwtToken();
                resolve(result);
            },
            onFailure: function (err) {
                console.log(err.message || JSON.stringify(err));
                reject(err);
            },
        });

    });
}