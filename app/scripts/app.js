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
                    url: '/home?access_token&user',
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl as home',
                    resolve: {
                        auth: function($stateParams) {
                            return $stateParams;
                        }
                    }
                });
        });
}());