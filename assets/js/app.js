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
		var url = 'backend/getAllSkills.php';
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
		var url = 'backend/getAllProjects.php';
		if($routeParams.projectId == undefined && $routeParams.experienceId == undefined){
			$scope.headline = "My Projects";
		} else if($routeParams.projectId != undefined ){
			url += "?skillId=" + $routeParams.projectId;
		} else if($routeParams.experienceId != undefined ){
			url += "?companyId=" + $routeParams.experienceId;
		}
		$http({
			method  : 'GET',
			dataType: 'jsonp',
			url     : url,
		}).success(function(data){
			if($scope.headline == undefined && data["name"] != null)
				$scope.headline = "projects used skill: " + data["name"];
			if($scope.headline == undefined && data["companyName"] != null)
				$scope.headline = "projects at: " + data["companyName"];
			$scope.projectsArray = data["projects"];
		});
	};

	var listExperienceController = function($scope, $http, $sce){
		var url = 'backend/getExperience.php';
		$http({
			method  : 'GET',
			dataType: 'jsonp',
			url     : url,
		}).success(function(data){
			$scope.experienceArray = data;
			$.getJSON("assets/data/info.json", function( data ) {
				$scope.$apply(function(){
					$scope.education = data.education;
					$scope.education_date = data.education_date;
				});
			});
		});
	};
	
	var projectDetailsController = function($scope, $http, $routeParams, $sce){
		var url = 'backend/projectDetails.php?id='+$routeParams.projectId;;
		$http({
			method  : 'GET',
			dataType: 'jsonp',
			url     : url,
		}).success(function(data){
			var startdate = data.startdate,
			enddate = data.enddate;

			$scope.projectId = data.id;
			$scope.projectName = data.name;
			$scope.projectImage = data.image;

			if(startdate == null)
				startdate = '-';
			if(enddate == null)
				enddate = '-';

			$scope.projectStartdate = startdate;
			$scope.projectEnddate = enddate;
			$scope.projectDescription = data.description && $sce.trustAsHtml(data.description.replace(new RegExp('\r?\n','g'), '<br />'));
			$scope.projectFunctionality = data.functionality && $sce.trustAsHtml(data.functionality.replace(new RegExp('\r?\n','g'), '<br />'));
			$scope.projectScreenshoots = data.screenshoots;
		});
	};
	
	var thisWebsiteController = function($scope, $http, $sce){
		$.getJSON("assets/data/thisweb.json", function( data ) {
			$scope.$apply(function(){
				$scope.trustAsHtml = $sce.trustAsHtml;
				$scope.thisWebsite = $sce.trustAsHtml(data.thisWebsite);
				$scope.cool = $sce.trustAsHtml(data.cool.replace(new RegExp('\r?\n','g'), '<br />'));
				$scope.pagesArray = data.pages;
				$scope.nextArray = data.next;
				$scope.creditsArray = data.credits;
				
			});
		});
	};
	
	var reviewsController = function($scope, $http, $routeParams){
		var url = 'backend/reviews.php';
		$http({
			method  : 'GET',
			dataType: 'jsonp',
			url     : url,
		}).success(function(data){
			$scope.reviews = data;
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
			}).when("/listProjects/experience/:experienceId", {
				templateUrl: "/listProjects.html",
				controller: "ListProjectsController"
			}).when("/listExperience", {
				templateUrl: "/listExperience.html",
				controller: "listExperienceController"
			}).when("/projectDetails/:projectId", {
				templateUrl: "/projectDetails.html",
				controller: "projectDetailsController"
			}).when("/thisWebsite", {
				templateUrl: "/thisWebsite.html",
				controller: "thisWebsiteController"
			}).when("/reviews", {
				templateUrl: "/reviews.html",
				controller: "reviewsController"
			}).otherwise({redirectTo: "/"});
	});

    app.controller("mainController", ["$scope","$rootScope","$sce", mainController])
		.controller("AboutController", ["$scope","$http","$sce", AboutController])
    	.controller("ContactController", ["$scope","$http","$sce", ContactController])
		.controller("ListSkillsController", ["$scope","$http", "$routeParams", ListSkillsController])
		.controller("ListProjectsController", ["$scope","$http", "$routeParams", ListProjectsController])
		.controller("listExperienceController", ["$scope","$http", "$sce", listExperienceController])
		.controller("projectDetailsController", ["$scope","$http", "$routeParams", "$sce", projectDetailsController])
		.controller("thisWebsiteController", ["$scope","$http", "$sce", thisWebsiteController])
		.controller("reviewsController", ["$scope","$http", "$sce", reviewsController]);
	
})();
