/*global angular,toastr,$*/
(function() {
    'use strict';

    // define the controller for Home state
    angular.module('fbPageManager').controller('LoginCtrl', ['$state', 'resourceService',
        function($state, resourceService) {
            var self = this;
            self.post = function() {
                $state.go('home');
            };
            self.loginToFacebook = function() {
                resourceService.loginToFacebook.get(function(entry) {
                    console.log(entry);
                });
            };
        }
    ]);
}());
