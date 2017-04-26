(function() {
    const express = require("express");
    const bodyParser = require("body-parser");
    const request = require("request-promise");
    const config = require("../config/config.js");
    const router = express.Router();

    router.use(bodyParser.json());
    router.route('/postNewFeed')
        .post(function(req, res, next) {
            const postTextOptions = {
                method: 'POST',
                uri: config.facebookAPI.postFeed,
                qs: {
                    access_token: req.body.access_token,
                    message: req.body.feed
                }
            };

            request(postTextOptions).then(function(res) {
                console.log(res);
            }).catch(function(err) {
                console.log(err);
            })
        });

    module.exports = router;
}());
