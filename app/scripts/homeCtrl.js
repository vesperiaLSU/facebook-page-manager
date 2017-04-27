/*global angular,toastr*/
(function () {
    'use strict';

    // define the controller for Home state
    angular.module('fbPageManager').controller('HomeCtrl', ['$state', 'resourceService', 'auth', 'feeds',
        function ($state, resourceService, auth, feeds) {
            const self = this;
            self.auth = auth;
            self.feeds = feeds.data;
            self.user = self.auth.user;
            self.profile = decodeURIComponent(self.auth.url);

            toastr.success('You just signed in as: ' + self.auth.user, 'Succeed!');
            self.post = function () {
                if (self.auth.access_token !== 'undefined') {
                    resourceService.postNewFeed.save({
                        feed: self.feed,
                        access_token: self.auth.access_token,
                        isPublish: !self.isPublish
                    }, function () {
                        toastr.success('You just made a post to Facebook: ' + self.feed, 'Succeed!');
                        self.feed = "";
                    }, function (error) {
                        toastr.error(error.message, 'Error!');
                    });
                } else {
                    toastr.error('You are not authorized to post to this page', 'Warning!');
                }
            };

            self.getAllFeeds = function () {
                resourceService.getAllFeeds.get({
                    token: self.auth.access_token
                }, function (res) {
                    self.feeds = res.data;
                }, function (err) {
                    toastr.error(err.message, 'Failed to get feeds!');
                });
            };

            self.getFeeds = function (isPublish) {
                resourceService.getFeedsByMode.get({
                    token: self.auth.access_token,
                    isPublish: isPublish
                }, function (res) {
                    self.feeds = res.data;
                }, function (err) {
                    toastr.error(err.message, 'Failed to get feeds!');
                });
            };

        }
    ]);
}());
