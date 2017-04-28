/*global angular,$*/
(function() {
    'use strict';

    // define the controller for Home state
    angular.module('fbPageManager').controller('insightCtrl', ['insights', '$uibModalInstance',
        function(insights, $uibModalInstance) {
            const self = this;
            self.postImpression = 0;
            self.postImpressionPeople = 0;
            self.postFanReached = 0;
            self.postFanEngaged = 0;

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
            
            self.close = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);
}());
