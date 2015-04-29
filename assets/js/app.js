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
	$scope.sendMsg = function(contactForm) {
		if(contactForm.$valid){
        	$http({
                method  : 'POST',
                url     : 'backend/contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
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
