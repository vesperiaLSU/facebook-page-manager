/*global angular,toastr*/
(function() {
    'use strict';

    // initialize the duration time [milliseconds] of toastr
    toastr.options.timeOut = 3000;

    // initialize the configuration of app
    angular
        .module('fbPageManager', ['ui.router', 'ui.bootstrap', 'ngResource'])
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('login', {
                    url: '/',
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl as lg'
                })
                .state('home', {
                    url: '/home?access_token&user&url',
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl as home',
                    resolve: {
                        resource: 'resourceService',
                        auth: function($stateParams) {
                            return $stateParams;
                        },
                        feeds: function(resourceService, $stateParams) {
                            return resourceService.getAllFeeds.get({token : $stateParams.access_token}).$promise;
                        },
                        fans: function(resourceService, $stateParams) {
                            return resourceService.getPageFans.get({token : $stateParams.access_token}).$promise;
                        },
                        views: function(resourceService, $stateParams) {
                            return resourceService.getPageViews.get({token : $stateParams.access_token}).$promise;
                        },
                        reaches: function(resourceService, $stateParams) {
                            return resourceService.getPageReaches.get({token : $stateParams.access_token}).$promise;
                        }
                    }
                });
        });
}());
