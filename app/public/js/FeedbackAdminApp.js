'use strict';

angular.module('fbAdminApp', ['ngRoute', 'fbAdminApp.factory', 'fbAdminApp.filters', 'ui.bootstrap']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/partials/feedbackAdmin',
                controller: ListCtrl
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);

angular.module("fbAdminApp.factory", []).
    factory('FeedbackFactory', function($http){
        return {
            getFeedbacks: function() {
                return $http.get('/feedbackController/Feedbacks/');
            },
            getFeedback: function(id) {
                return $http.get('/feedbackController/Feedback/' + id);
            },
            updateFeedback: function(id, Feedback) {
                return $http.put('/feedbackController/Feedback/' + id, Feedback);
            },
            deleteFeedback: function(id) {
                return $http.delete('/feedbackController/Feedback/' + id);
            }
        }
    });

angular.module("fbAdminApp.filters", []).
    filter('capitalise', function() {
        return function(input) {
            if(input != null) {
                return input.substring(0,1).toUpperCase() + input.substring(1);
            }
        }
    }).
    filter('formatdatetime', function(){
        return function(text) {
            return String(text).replace(/T/,' ').replace(/.[0-9]+Z/, '');
        }
    });

function ListCtrl($scope, $modal, FeedbackFactory) {
    $scope.headers = ["Type", "Name", "Contact No.", "Email", "Date", "IsDisplayed"];
    $scope.columnSort = { sortColumn: 'Name', reverse: false };

    FeedbackFactory.getFeedbacks().success(function(Feedbacks) {
        $scope.Feedbacks = Feedbacks;
    });

    $scope.view = function(c) {
        var id = c._id;
        var modalInstance = $modal.open({
            templateUrl: 'viewFeedbackModal',
            controller: viewFeedbackModalCtrl,
            resolve: {
                Feedback: function() {
                    return FeedbackFactory.getFeedback(id);
                }
            }
        });
    };

    $scope.edit = function(c) {
        var id = c._id;
        var modalInstance = $modal.open({
            templateUrl: 'editFeedbackModal',
            controller: editFeedbackModalCtrl,
            resolve: {
                Feedback: function() {
                    return FeedbackFactory.getFeedback(id);
                }
            }
        });
    };

    $scope.delete = function(c) {
        var id = c._id;
        var modalInstance = $modal.open({
            templateUrl: 'deleteFeedbackModal',
            controller: deleteFeedbackModalCtrl,
            resolve: {
                Feedback: function() {
                    return FeedbackFactory.getFeedback(id);
                }
            }
        });
    }
}


var viewFeedbackModalCtrl = function($scope, $modalInstance, Feedback) {
    $scope.allheaders = ["Type", "Name", "Contact No.", "Email", "Date"];
    $scope.Feedback = Feedback.data.Feedback;

    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };
};

var editFeedbackModalCtrl = function($scope, $modalInstance, $window, Feedback, FeedbackFactory) {
    $scope.form = {};
    $scope.allheaders = ["Name", "Contact No.", "Email", "Feedback", "Date"];
    $scope.form.edit = Feedback.data.Feedback;
    $scope.Feedback = Feedback.data.Feedback.Feedback;

    $scope.editFeedback = function() {
        FeedbackFactory.updateFeedback(Feedback.data.Feedback._id, $scope.form.edit).success(function() {
            $modalInstance.close();
            window.location = "/feedbackAdmin";
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
};

var deleteFeedbackModalCtrl = function($scope, $route, $modalInstance, $window, Feedback, FeedbackFactory) {
    $scope.Feedback = Feedback.data.Feedback.Feedback;

    $scope.deleteFeedback = function() {
        FeedbackFactory.deleteFeedback(Feedback.data.Feedback._id).success(function() {
            $modalInstance.close();
            alert("Feedback deleted successfully!")
            FeedbackFactory.getFeedbacks().success(function(Feedbacks) {
                return $scope.Feedbacks = Feedbacks;
            });
            window.location = "/feedbackAdmin";
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel')
    };
};

