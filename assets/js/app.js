// Code goes here
(function() {
	
	var mainController = function($scope, $rootScope, $sce) {
		$.getJSON("assets/data/info.json", function( data ) {
			$scope.$apply(function(){
				$scope.name = data.name;
				$scope.facebook = $sce.trustAsHtml(data.facebook);
				$scope.linkedin = $sce.trustAsHtml(data.linkedin);
				$scope.email = $sce.trustAsHtml(data.email);
				$scope.phone = $sce.trustAsHtml(data.phone);
				$scope.location = $sce.trustAsHtml(data.location);
			});
		});
	};
	
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

	var ListSkillsController = function($scope, $http, $routeParams){
		var url = 'http://kelsafy.com/backend/getAllSkills.php';
		if($routeParams.skillId == undefined){
			$scope.headline = "My Skills";
		} else{
			url += "?projectId=" + $routeParams.skillId;
		}
		$http({
			method  : 'GET',
			dataType: 'jsonp',
			url     : url,
		}).success(function(data){
			if($scope.headline == undefined)
				$scope.headline = "Skills for project: " + data["name"];
			$scope.skillsArray = data["skills"];
		});
	};
	
	var ListProjectsController = function($scope, $http, $routeParams){
		var url = 'http://kelsafy.com/backend/getAllProjects.php';
		if($routeParams.projectId == undefined){
			$scope.headline = "My Projects";
		} else{
			url += "?skillId=" + $routeParams.projectId;
		}
		$http({
			method  : 'GET',
			dataType: 'jsonp',
			url     : url,
		}).success(function(data){
			if($scope.headline == undefined)
				$scope.headline = "projects used skill: " + data["name"];
			$scope.projectsArray = data["projects"];
		});
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
			}).when("/listSkills", {
				templateUrl: "/listSkills.html",
				controller: "ListSkillsController"
			}).when("/listSkills/:skillId", {
				templateUrl: "/listSkills.html",
				controller: "ListSkillsController"
			}).when("/listProjects", {
				templateUrl: "/listProjects.html",
				controller: "ListProjectsController"
			}).when("/listProjects/:projectId", {
				templateUrl: "/listProjects.html",
				controller: "ListProjectsController"
			}).otherwise({redirectTo: "/"});
	});

    app.controller("mainController", ["$scope","$rootScope","$sce", mainController])
		.controller("AboutController", ["$scope","$http","$sce", AboutController])
    	.controller("ContactController", ["$scope","$http","$sce", ContactController])
		.controller("ListSkillsController", ["$scope","$http", "$routeParams", ListSkillsController])
		.controller("ListProjectsController", ["$scope","$http", "$routeParams", ListProjectsController]);
	
})();
