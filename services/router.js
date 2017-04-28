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
                uri: config.facebookAPI + '/feed',
                qs: {
                    access_token: req.body.access_token,
                    message: req.body.feed,
                    published: req.body.isPublish
                }
            };

            sendRequest(postTextOptions, res);
        });

    router.route('/getAllFeeds')
        .get(function(req, res, next) {
            const getFeedsOptions = {
                method: 'GET',
                uri: config.facebookAPI + '/promotable_posts',
                qs: {
                    access_token: req.query.token,
                    fields: 'likes,message,story,created_time,full_picture'
                }
            };

            sendRequest(getFeedsOptions, res);
        });

    router.route('/getFeeds/:isPublish')
        .get(function(req, res, next) {
            const getFeedsOptions = {
                method: 'GET',
                uri: config.facebookAPI + '/promotable_posts',
                qs: {
                    access_token: req.query.token,
                    is_published: req.params.isPublish,
                    fields: 'likes,message,story,created_time,full_picture'
                }
            };

            sendRequest(getFeedsOptions, res);
        });

    router.route('/getPageFans')
        .get(function(req, res, next) {
            const insightsOptions = {
                method: 'GET',
                uri: config.facebookAPI + '/insights/page_fans',
                qs: {
                    access_token: req.query.token,
                    until: getDate()
                }
            };

            sendRequest(insightsOptions, res);
        });

    router.route('/getPageViews')
        .get(function(req, res, next) {
            const insightsOptions = {
                method: 'GET',
                uri: config.facebookAPI + '/insights/page_views_total',
                qs: {
                    access_token: req.query.token,
                    until: getDate()
                }
            };

            sendRequest(insightsOptions, res);
        });

    router.route('/getPageReaches')
        .get(function(req, res, next) {
            const insightsOptions = {
                method: 'GET',
                uri: config.facebookAPI + '/insights/page_impressions_unique',
                qs: {
                    access_token: req.query.token,
                    until: getDate()
                }
            };

            sendRequest(insightsOptions, res);
        });

    router.route('/getPostInsights/:id')
        .get(function(req, res, next) {
            const postOptions = {
                method: 'GET',
                uri: config.facebookPostAPI + req.params.id + '/insights/post_impressions,post_impressions_unique,post_fan_reach,post_engaged_fan',
                qs: {
                    access_token: req.query.token,
                    until: getDate(),
                    fields: 'name,values'
                }
            };

            sendRequest(postOptions, res);
        });

    function sendRequest(option, res) {
        request(option).then(function(fbRes) {
            res.status(200).send(fbRes);
        }).catch(function(err) {
            res.status(404).send({
                message: err
            });
        });
    }

    function getDate() {
        var today = new Date();
        var y = today.getFullYear(),
            m = today.getMonth() + 1,
            d = today.getDate() + 1;
        var until = y + '-' + m + '-' + d;
        return until;
    }

    module.exports = router;
}());
