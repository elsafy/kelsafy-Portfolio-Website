// Code goes here
(function() {

var AboutController = function($scope, $http, $sce){
	$.getJSON("assets/data/info.json", function( data ) {
		$scope.$apply(function(){
	   		$scope.name = data.name;
	   		$scope.description = $sce.trustAsHtml(data.description);
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

    app.controller("AboutController", ["$scope","$http","$sce", AboutController]);
})();
