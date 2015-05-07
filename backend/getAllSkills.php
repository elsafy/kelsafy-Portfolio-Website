<?php  require 'config.php'; header('Access-Control-Allow-Origin: *'); 
	$table = 'skills';
	$tableLinks = 'projects_skills';
	$tableProjects = 'projects';
	$link = mysqli_connect($dbhost, $dbusername, $dbuserpass, $dbname) or die("Error " . mysqli_error($link));
	$json = array();
	$data = $json;
	$projectId = $_GET["projectId"];
	if($projectId == NULL){
		$query = "SELECT s.*, COUNT(l.skillId) AS projects_count FROM {$table} s Left JOIN {$tableLinks} l ON l.skillId =s.id group by s.id order by s.id" or die("Error in the consult.." . mysqli_error($link));
		$projectName = "all";
	}else{
		$query = "SELECT s.*  FROM {$table} s Left JOIN {$tableLinks} l ON l.skillId = s.id where l.projectId = $projectId group by s.id order by l.id" or die("Error in the consult.." . mysqli_error($link));
		$projectNameQuery = "select p.name FROM {$tableProjects} p where p.id = $projectId" or die("Error in the consult.." . mysqli_error($link));
		$projectNameResult = $link->query($projectNameQuery); 
		$r = mysqli_fetch_assoc($projectNameResult);
		$projectName = $r["name"];
	}
	$result = $link->query($query); 
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		if($r["projects_count"] != NULL)
			$r["projects_count"] = "Used in " . $r["projects_count"] . " Projects";
		$rows[] = $r;
	}
	$obj = new stdClass();
	$obj->name = $projectName;
	$obj->skills = $rows;
	print json_encode($obj);
?>