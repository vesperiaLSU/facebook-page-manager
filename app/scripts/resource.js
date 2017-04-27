/* global angular*/
(function() {
    'use strict';
    angular.module('fbPageManager').factory('resourceService', ['$resource',
        function($resource) {
            return {
                postNewFeed: $resource('/api/postNewFeed', {}, {}),
                loginToFacebook: $resource('/auth/facebook', {}, {}),
                getAllFeeds: $resource('/api/getAllFeeds', {}, {}),
                getFeedsByMode: $resource('/api/getFeeds/:isPublish', {}, {})
            };
        }
    ]);
}());
