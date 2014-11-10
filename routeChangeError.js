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

    app.controller('ErrCtrl', function ($rootScope) {
        $rootScope.$on("$routeChangeError", function(){
            console.log("failed to change routes");
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
            defer.reject("loadData1");
        }, 2000);
        return defer.promise;
    };

})();

/*
html: 

<!DOCTYPE html>
<html ng-app="myApp" ng-controller="ErrCtrl">
<head>

*/