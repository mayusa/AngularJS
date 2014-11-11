(function(){
	var app = angular.module('myApp', [
		'ngRoute']);

    app.config(function ($routeProvider, $locationProvider) {
    	$routeProvider
        .when('/', {
            templateUrl: 'app.html',
            controller: 'ViewCtrl'
        })
        .when('/new', {
            templateUrl: 'changeRoute.html',
            controller: 'NewCtrl',
            resolve: {//延迟执行
                loadData: viewCtrl.loadData
            }
        })
        .otherwise({ redirectTo: '/' });

    });

    app.controller('RouteCtrl', function ($scope, $rootScope, $route, $location) {
        // route error
        $rootScope.$on("$routeChangeError", function(event, current, previous, rejection){
            console.log("failed:\n",rejection);
        });
        // route change start
        $rootScope.$on("$routeChangeStart", function(event, current, previous, rejection){
            console.log("start:");
            console.log("$scope:",$scope);
            console.log("$rootScope:",$rootScope);
            console.log("$route:",$route);
            console.log("$location:",$location);
        });
        // route change success
        $rootScope.$on("$routeChangeSuccess", function(event, current, previous, rejection){
            console.log("success:");
            console.log("$scope:",$scope);
            console.log("$rootScope:",$rootScope);
            console.log("$route:",$route);
            console.log("$location:",$location);
        });
    });

    var viewCtrl = app.controller('ViewCtrl', function ($scope, $route) {
        $scope.model = {
            message: "ASHU"
        };
    });

    app.controller('NewCtrl', ['$scope', function ($scope, loadData, $template) {
        console.log($scope, loadData, $template);
    }]);


    viewCtrl.loadData = function($q, $timeout){
        var defer = $q.defer();
        $timeout(function(){
            defer.resolve("data1");
            //defer.reject("your network is down");//if http request fail to load
        }, 3000);
        return defer.promise;
    };

})();

/*
html: 

<!DOCTYPE html>
<html ng-app="myApp" ng-controller="RouteCtrl">
<head>

*/