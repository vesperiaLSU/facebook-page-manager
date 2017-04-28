(function () {
    'use strict';
    const express = require('express'),
        bodyParser = require('body-parser'),
        router = require('./services/router.js'),
        passport = require('passport'),
        Strategy = require('passport-facebook').Strategy,
        config = require('./config/config.js'),
        request = require("request-promise");


    passport.use(new Strategy({
            clientID: config.facebookAuth.clientID,
            clientSecret: config.facebookAuth.clientSecret,
            callbackURL: config.facebookAuth.callBackUrl
        },
        (accessToken, refreshToken, profile, callback) => {
            return callback(null, accessToken, profile);
        }));

    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj, cb) => cb(null, obj));

    const app = express();
    app.engine('.html', require('ejs').renderFile);
    app.use(express.static(__dirname + "/app"));
    app.use(bodyParser.json());
    app.use('/api', router);
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['publish_pages', 'manage_pages']
        }));

    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
            failureRedirect: '/'
        }),
        function (req, res, user) {
            const options = {
                method: 'GET',
                uri: config.facebookAPI + '?fields=access_token',
                qs: {
                    access_token: req.user
                }
            };
            const profileOptions = {
                method: 'GET',
                uri: 'https://graph.facebook.com/v2.9/' + req.authInfo.id + '/picture',
                qs: {
                    width:121,
                    height:100,
                    access_token: req.user,
                    redirect: false
                }
            };
            request(profileOptions).then(profileRes => {
                const data = JSON.parse(profileRes);
                const url = encodeURIComponent(data.data.url);
                request(options)
                    .then(fbRes => {
                        const response = JSON.parse(fbRes);
                        const redirectUrl = '/#!/home?';
                        var query = 'access_token=' + response.access_token + '&user=' + req.authInfo.displayName + '&url=' + url;
                        res.redirect(redirectUrl + query);
                    })
                    .catch(error => {
                        console.log(error.message);
                    });
            }).catch(error => {
                console.log(error.message);
            });


        });

    app.get("/", function (req, res) {
        res.render("index.html");
    });

    //push to codeship for deployment
    app.listen(process.env.PORT, process.env.IP);
}());
