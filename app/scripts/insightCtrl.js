/*global angular,$, toastr*/
(function() {
    'use strict';

    // define the controller for Home state
    angular.module('fbPageManager').controller('InsightCtrl', ['insights', 'body', '$uibModalInstance', 'usSpinnerService', 'resourceService', 'Confirm',
        function(insights, body, $uibModalInstance, usSpinnerService, resourceService, Confirm) {
            const self = this,
                id = body.id,
                token = body.token;
            self.postImpression = 0;
            self.postImpressionPeople = 0;
            self.postFanReached = 0;
            self.postFanEngaged = 0;
            self.feed = body.feed;

            $.each(insights.data, function(index, value) {
                switch (value.name) {
                    case 'post_impressions':
                        self.postImpression = value.values[0].value;
                        break;
                    case 'post_impressions_unique':
                        self.postImpressionPeople = value.values[0].value;
                        break;
                    case 'post_fan_reach':
                        self.postFanReached = value.values[0].value;
                        break;
                    case 'post_engaged_fan':
                        self.postFanEngaged = value.values[0].value;
                        break;
                    default:
                        self.postImpression = value.values[0].value;
                }
            });

            usSpinnerService.stop('spinner1');

            self.close = function() {
                $uibModalInstance.dismiss('cancel');
            };

            self.deletePost = function() {
                var callback = function() {
                    usSpinnerService.spin('spinner1');
                    resourceService.deletePost.delete({
                        token: token,
                        id: id
                    }, function() {
                        usSpinnerService.stop('spinner1');
                        $uibModalInstance.close();
                        toastr.success('You delete post: ' + self.feed, 'Succeed!');
                    }, function(err) {
                        toastr.error(err, 'Delete Failed!');
                    });
                };

                Confirm.openModal(
                    'Delete post?',
                    'Post that has been deleted cannot be restored, and all insight metrics associated with it will ' +
                    'be deleted as well. Are you sure you want to proceed?',
                    'Delete',
                    'Cancel',
                    callback
                );
            };
        }
    ]);
}());
