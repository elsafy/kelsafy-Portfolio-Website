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

var ContactController = function($scope, $http, $sce){
	$scope.contact = {
        sendMsg: function() {
        	console.log("sdsdsd");
            console.log($scope.contact.name);
        }
    }	
};

	var app = angular.module("kelsafy", ['ngRoute']);
	app.config(function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "/about.html",
				controller: "AboutController"
			}).when("/contact", {
				templateUrl: "/contact.html",
				controller: "ContactController"
			}).otherwise({redirectTo: "/"});
	});

    app.controller("AboutController", ["$scope","$http","$sce", AboutController])
    	.controller("ContactController", ["$scope","$http","$sce", ContactController]);
})();
