(function(){
	var app = angular.module('myApp', [
		'ngRoute']);

    app.config(function ($routeProvider) {
    	$routeProvider
        .when('/', {
            templateUrl: 'app.html',
            controller: 'ViewCtrl',
            resolve: {//延迟执行
                loadData: viewCtrl.loadData
            }
        })
        .otherwise({ redirectTo: '/' });

    });

    app.directive('error', function ($rootScope) {
        return {
            restrict: 'E',
            template: '<div class="alert-box alert" ng-show="isError">Error!!!</div>',
            link: function (scope) {
                $rootScope.$on("$routeChangeError", function(event, current, previous, rejection){
                    console.log(rejection);
                    scope.isError = true;
                });
            }
        };
    })

    app.controller('ErrCtrl', function ($rootScope) {
        $rootScope.$on("$routeChangeError", function(event, current, previous, rejection){
            console.log(rejection);
        });
    });


    var viewCtrl = app.controller('ViewCtrl', function ($scope, $route) {
        $scope.model = {
            message: "ASHU"
        };
    });

    viewCtrl.loadData = function($q, $timeout){
        var defer = $q.defer();
        $timeout(function(){
            //defer.resolve("data1");
            defer.reject("your network is down");//if http request fail to load
        }, 1000);
        return defer.promise;
    };

})();

/*
html: 

<!DOCTYPE html>
<html ng-app="myApp" ng-controller="ErrCtrl">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Angular</title>
    <link rel="stylesheet" href="css/foundation.css">
</head>
<body>
    <div>
        <error></error>
        <div ng-view></div>
    </div>

*/