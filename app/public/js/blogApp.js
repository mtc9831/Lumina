'use strict';

// Declare app level module which depends on filters, and services
angular.module('blogApp', ['ngRoute', 'blogApp.filters', 'blogApp.services', 'blogApp.directives']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/blogpost',
                controller: IndexCtrl
            }).
            when('/addPost', {
                templateUrl: 'partials/addPost',
                controller: AddPostCtrl
            }).
            when('/readPost/:id', {
                templateUrl: 'partials/readPost',
                controller: ReadPostCtrl
            }).
            when('/editPost/:id', {
                templateUrl: 'partials/editPost',
                controller: EditPostCtrl
            }).
            when('/deletePost/:id', {
                templateUrl: 'partials/deletePost',
                controller: DeletePostCtrl
            }).
            when('/ViewBlogs', {
                templateUrl: 'partials/viewblogpost',
                controller: IndexCtrl
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);

angular.module('blogViewApp', ['ngRoute', 'blogApp.filters', 'blogApp.services', 'blogApp.directives']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/viewblogpost',
                controller: IndexCtrl
            }).
            when('/readPost/:id', {
                templateUrl: 'partials/readPost',
                controller: ReadPostCtrl
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);

/* Controllers */
function IndexCtrl($scope, $http) {
    $http.get('/blogController/posts').
        success(function(data, status, headers, config) {
            $scope.posts = data;
        });
}

function AddPostCtrl($scope, $http, $location) {
    $scope.form = {};
    $scope.submitPost = function () {
        $http.post('/blogController/post', $scope.form).
            success(function(data) {
                $location.path('/blog');
            });
    };
}

function ReadPostCtrl($scope, $http, $routeParams) {
    $http.get('/blogController/post/' + $routeParams.id).
        success(function(data) {
            $scope.post = data.post;
        });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/blogController/post/' + $routeParams.id).
        success(function(data) {
            $scope.form = data.post;
        });

    $scope.editPost = function () {
        $http.put('/blogController/post/' + $routeParams.id, $scope.form).
            success(function(data) {
                $location.url('/readPost/' + $routeParams.id);
            });
    };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
    $http.get('/blogController/post/' + $routeParams.id).
        success(function(data) {
            $scope.post = data;
        });

    $scope.deletePost = function () {
        $http.delete('/blogController/post/' + $routeParams.id).
            success(function(data) {
                $location.url('/');
            });
    };

    $scope.home = function () {
        $location.url('/');
    };
}

/* Directives */
angular.module('blogApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]);

/* Filters */
angular.module('blogApp.filters', []).
    filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]).
    filter('formatdatetime', function(){
        return function(text) {
            return String(text).replace(/T/,' ').replace(/.[0-9]+Z/, '');
        }
    })
/* Services */
angular.module('blogApp.services', []).
    value('version', '0.1');
