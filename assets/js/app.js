// Code goes here
(function() {

var AboutController = function($scope, $http){
	$.getJSON("assets/data/info.json", function( data ) {
		$scope.$apply(function(){
	   		$scope.name = data.name;
	   		$scope.description = data.description;
	   	});
	});
};

	var app = angular.module("kelsafy", ['ngRoute']);
	app.config(function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "/about.html",
				controller: "AboutController"
			}).otherwise({redirectTo: "/"});
	});

    app.controller("AboutController", ["$scope","$http", AboutController]);
})();
