
"use strict"
var Client = require('node-rest-client').Client;
var logger = require("./logger");
const config = require('./constantes')
let auth = function autenticacao(req, res, next) {
    var client = new Client();
    var args = {
        headers: { [process.env.AUTORIZACAO_NOME_HEADER]: (req.cookies[[process.env.AUTORIZACAO_NOME_TOKEN]] === undefined || req.cookies[[process.env.AUTORIZACAO_NOME_TOKEN]] === null ? "" : req.cookies[[process.env.AUTORIZACAO_NOME_TOKEN]]) }
    };

    client.get(process.env.AUTORIZACAO_URL_PERMISSAO, args, function (data, response) {
        if (response.statusCode !== 200) {
            logger.info("Autorizacao Status Code:", response.statusCode, ":::", "Autorizacao Status Message:", response.statusMessage, ":::", "Token:", req.cookies[[process.env.AUTORIZACAO_NOME_TOKEN]], ":::", "Redirecionado para:", process.env.AUTORIZACAO_URL_PERMISSAO_NEGADA);
            res.redirect(process.env.AUTORIZACAO_URL_PERMISSAO_NEGADA);
        } else {
            next();
        }
    });
}

module.exports = auth;
