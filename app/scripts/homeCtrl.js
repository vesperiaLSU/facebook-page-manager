/*global angular,toastr,$*/
(function() {
    'use strict';

    // define the controller for Home state
    angular.module('fbPageManager').controller('HomeCtrl', ['$state', 'resourceService', 'auth', 'feeds', 'fans', 'views', 'reaches', '$uibModal','usSpinnerService',
        function($state, resourceService, auth, feeds, fans, views, reaches, $uibModal,usSpinnerService) {
            const self = this;
            self.auth = auth;
            self.feeds = feeds.data;
            self.user = self.auth.user;
            self.profile = decodeURIComponent(self.auth.url);

            var len = fans.data[0].values.length;
            self.fans = fans.data[0].values[len - 1].value;
            len = views.data[2].values.length;
            self.views = views.data[2].values[len - 1].value;
            len = reaches.data[2].values.length;
            self.reaches = reaches.data[2].values[len - 1].value;

            toastr.success('You just signed in as: ' + self.auth.user, 'Succeed!');
            self.post = function() {
                if (self.auth.access_token !== 'undefined') {
                    if (self.feed) {
                        usSpinnerService.spin('spinner1');
                        resourceService.postNewFeed.save({
                                feed: self.feed,
                                access_token: self.auth.access_token,
                                isPublish: !self.isPublish
                            }, function() {
                                self.getAllFeeds();
                                toastr.success('You just made a post to Facebook: ' + self.feed, 'Succeed!');
                                self.feed = "";
                                $('.list-group.post li').each(function(index, value) {
                                    if (index != 0) {
                                        $(value).removeClass('active');
                                    }
                                    else {
                                        $(value).addClass('active');
                                    }
                                });
                            },
                            function(error) {
                                toastr.error(error.message, 'Error!');
                            });
                    }
                    else {
                        toastr.warning('Feed cannot be empty', 'Warning!');
                    }
                }
                else {
                    toastr.error('You are not authorized to post to this page', 'Warning!');
                }
            };

            self.getAllFeeds = function() {
                usSpinnerService.spin('spinner1');
                resourceService.getAllFeeds.get({
                    token: self.auth.access_token
                }, function(res) {
                    self.feeds = res.data;
                    usSpinnerService.stop('spinner1');
                }, function(err) {
                    toastr.error(err.message, 'Failed to get feeds!');
                    usSpinnerService.stop('spinner1');
                });
            };

            self.getFeeds = function(isPublish) {
                usSpinnerService.spin('spinner1');
                resourceService.getFeedsByMode.get({
                    token: self.auth.access_token,
                    isPublish: isPublish
                }, function(res) {
                    self.feeds = res.data;
                    usSpinnerService.stop('spinner1');
                }, function(err) {
                    toastr.error(err.message, 'Failed to get feeds!');
                    usSpinnerService.stop('spinner1');
                });
            };

            self.viewInsights = function(id, feed) {
                usSpinnerService.spin('spinner1');
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/insightModal.html',
                    controller: 'insightCtrl as in',
                    backdrop: true,
                    keyboard: true,
                    size: 'dynamic',
                    windowClass: 'pic-modal',
                    resolve: {
                        insights: resourceService.getPostInsights.get({
                            token: self.auth.access_token,
                            id: id
                        }).$promise,
                        body: function() {
                            return feed;
                        }
                    }
                });

                modalInstance.result.then(ret => {
                    // modal closed
                }, () => {
                    // modal dismissed
                });
            };
        }
    ]);
}());
