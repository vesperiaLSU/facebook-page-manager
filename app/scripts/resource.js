/* global angular*/
(function() {
    'use strict';
    angular.module('fbPageManager').factory('resourceService', ['$resource',
        function($resource) {
            return {
                postNewFeed: $resource('/api/postNewFeed', {}, {}),
                loginToFacebook: $resource('/auth/facebook', {}, {}),
                getAllFeeds: $resource('/api/getAllFeeds', {}, {}),
                getFeedsByMode: $resource('/api/getFeeds/:isPublish', {}, {}),
                getPageFans: $resource('/api/getPageFans', {}, {}),
                getPageViews: $resource('/api/getPageViews', {}, {}),
                getPageReaches: $resource('/api/getPageReaches', {}, {}),
                getPostInsights: $resource('/api/getPostInsights/:id', {}, {}),
                deletePost: $resource('/api/deletePost/:id', {}, {})
            };
        }
    ]);
}());
