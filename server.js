const express = require('express');
var morgan = require('morgan')
var logger = require("./logger");
var cookieParser = require('cookie-parser');
const app = express();
var history = require('connect-history-api-fallback');
const path = require('path')
const port = process.env.PORT || 5222;
logger.info("Listening on " + port);
logger.debug("Overriding 'Express' logger");
app.use(morgan('combined'));
const auth = require('./authenticator')
const router = express.Router();
app.use(cookieParser());

app.use('/v3', auth, express.static(`${__dirname}`))
app.use(history('index.html', `${__dirname}`));



router.use(clientErrorHandler);

function clientErrorHandler(err, req, res, next) {
    logger.log("error", "Something wrong with an XHR request", err.stack);

    if (req.xhr) {
        res.send(500, {
            error: 'Something blew up!'
        });
    } else {
        next(err);
    }
}


app.listen(port, function () {
    logger.info("Listening on " + port);
});