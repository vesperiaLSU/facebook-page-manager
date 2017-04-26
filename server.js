(function () {
    'use strict';
    const express = require('express'),
        bodyParser = require('body-parser'),
        router = require('./services/router.js'),
        passport = require('passport'),
        Strategy = require('passport-facebook').Strategy,
        config = require('./config/config.js'),
        ensureLogin = require('connect-ensure-login'),
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
                uri: config.facebookAPI.getPageAccessToken,
                qs: {
                    access_token: req.user
                }
            };
            request(options)
                .then(fbRes => {
                    const response = JSON.parse(fbRes);
                    res.redirect('/#!/home?access_token=' + response.access_token + '&user=' + req.authInfo.displayName);
                })
                .catch(error => {
                    console.log(error.message);
                });
        });

    // app.get('/profile',
    //     ensureLogin.ensureLoggedIn('/'),
    //     function(req, res) {
    //         res.render('profile', {
    //             user: req.user
    //         });
    //     });


    app.get("/", function (req, res) {
        res.render("index.html");
    });

    app.listen(8080);
}());
