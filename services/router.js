(function () {
    const express = require("express");
    const bodyParser = require("body-parser");
    const request = require("request-promise");
    const config = require("../config/config.js");
    const router = express.Router();

    router.use(bodyParser.json());
    router.route('/postNewFeed')
        .post(function (req, res, next) {
            const postTextOptions = {
                method: 'POST',
                uri: config.facebookAPI.postFeed,
                qs: {
                    access_token: req.body.access_token,
                    message: req.body.feed,
                    published: req.body.isPublish
                }
            };

            request(postTextOptions).then(function (fbRes) {
                res.status(200).send({data: fbRes});
            }).catch(function (err) {
                res.status(500).send({message: err});
            });
        });

    router.route('/getAllFeeds')
        .get(function (req, res, next) {
            const getFeedsOptions = {
                method: 'GET',
                uri: config.facebookAPI.getAllFeeds,
                qs: {
                    access_token: req.query.token
                }
            };

            request(getFeedsOptions).then(function (fbRes) {
                res.send(fbRes);
            }).catch(function (err) {
                res.status(404).send({
                    message: err
                });
            });
        });

    router.route('/getFeeds/:isPublish')
        .get(function (req, res, next) {
            const getFeedsOptions = {
                method: 'GET',
                uri: config.facebookAPI.getAllFeeds,
                qs: {
                    access_token: req.query.token,
                    is_published: req.params.isPublish
                }
            };

            request(getFeedsOptions).then(function (fbRes) {
                res.send(fbRes);
            }).catch(function (err) {
                res.status(404).send({
                    message: err
                });
            });
        });

    module.exports = router;
}());
