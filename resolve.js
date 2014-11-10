(function(){
	var app = angular.module('myApp', [
		'ngRoute']);

    app.config(function ($routeProvider) {
    	$routeProvider
        .when('/', {
            templateUrl: 'app.html',
            controller: 'AppCtrl',
            resolve: {//延迟执行
                loadData: appCtrl.loadData,
                prepData: appCtrl.prepData
            }
        })
        .when('/pizza/:crust/:toppings', {
            redirectTo: function (routeParams, path, search) {
                console.log(routeParams);
                console.log(path);
                console.log(search);//?后的参数
                return "/" + routeParams.crust;
            }
        })
        .when('/ashu', {
            template: "haha,ashu"
        })
        .otherwise({ redirectTo: '/' });

    });

    var appCtrl = app.controller('AppCtrl', function ($scope, $route) {
        console.log($route);
/*       var defer = $q.defer();
        defer.promise
        .then(function(weapon){
            alert("promised..."+weapon);
            return "111";
        })
        .then(function(weapon){
            alert("promised2..."+ weapon);
        });

        defer.resolve("sword");*/
        $scope.model = {
            message: "ASHU"
        };


    });

    appCtrl.loadData = function($q, $timeout){
        var defer = $q.defer();
        $timeout(function(){
            defer.resolve("loadData1");
        }, 2000);
        return defer.promise;
    };

    appCtrl.prepData = function($q, $timeout){
        var defer = $q.defer();
        $timeout(function(){
            defer.resolve("prepData1");
        }, 2000);
        return defer.promise;
    };    

})();

