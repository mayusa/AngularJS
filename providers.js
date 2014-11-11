(function(){
	var app = angular.module('myApp', []);
    //Registering a Service with app.provider
    app.provider('game', function() {
            var type;          
            return {
                setType : function(value){
                    type = value
                },
                $get: function(){
                    return {title: type + " provider ashu"};
                }
            };
    });
    app.config(function(gameProvider){
        gameProvider.setType("war");
    });

    // Using Service
    app.controller("AppCtrl", function ($scope, game) {
        $scope.title = game.title;
    });


})();

/*
html: 

<!DOCTYPE html>
<html ng-app="myApp" ng-controller="AppCtrl">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Angular</title>
    <link rel="stylesheet" href="css/foundation.css">
</head>
<body>
    <div>
        <div>{{title}}</div>
    </div>

*/