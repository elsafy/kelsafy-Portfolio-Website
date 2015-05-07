<?php  require 'config.php'; header('Access-Control-Allow-Origin: *'); 
	$table = 'projects';
	$tableLinks = 'projects_skills';
	$tableSkills = 'skills';
	$link = mysqli_connect($dbhost, $dbusername, $dbuserpass, $dbname) or die("Error " . mysqli_error($link));
	$json = array();
	$data = $json;
	$skillId = $_GET["skillId"];
	if($skillId == NULL){
		$query = "SELECT p.*, COUNT(l.skillId) AS skills_count FROM {$table} p Left JOIN {$tableLinks} l ON l.projectId =p.id group by p.id order by p.id" or die("Error in the consult.." . mysqli_error($link));
		$skillName = "all";
	} else{
		$query = "SELECT p.*  FROM {$table} p Left JOIN {$tableLinks} l ON l.projectId = p.id where l.skillId = $skillId group by p.id order by l.id" or die("Error in the consult.." . mysqli_error($link));
		$skillNameQuery = "select s.name FROM {$tableSkills} s where s.id = $skillId" or die("Error in the consult.." . mysqli_error($link));
		$skillNameResult = $link->query($skillNameQuery); 
		$r = mysqli_fetch_assoc($skillNameResult);
		$skillName = $r["name"];
	}
	$result = $link->query($query); 
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		if($r["skills_count"] != NULL)
			$r["skills_count"] = $r["skills_count"] . " Skills Used"; 
		if($r["startdate"] !== NULL && $r["enddate"] == NULL) {
			$r["enddate"] = "current";
		}
		$rows[] = $r;
	}
	$obj = new stdClass();
	$obj->name = $skillName;
	$obj->projects = $rows;
	print json_encode($obj);
?>