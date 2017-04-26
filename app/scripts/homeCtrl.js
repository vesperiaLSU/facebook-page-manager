/*global angular,toastr*/
(function () {
    'use strict';

    // define the controller for Home state
    angular.module('fbPageManager').controller('HomeCtrl', ['$state', 'resourceService', 'auth',
        function ($state, resourceService, auth) {
            const self = this;
            self.auth = auth;

            toastr.success('You just signed in as: ' + self.auth.user, 'Succeed!');
            self.post = function () {
                if (self.auth.access_token !== 'undefined') {
                    resourceService.postNewFeed.save({
                        feed: self.feed,
                        access_token: self.auth.access_token
                    });
                    toastr.success('You just made a post to Facebook: ' + self.feed, 'Succeed!');
                } else {
                    toastr.error('You are not authorized to post to this page', 'Warning!');
                }
            };

        }
    ]);
}());
