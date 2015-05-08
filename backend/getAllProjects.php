<?php  require 'config.php'; header('Access-Control-Allow-Origin: *'); 
	$table = 'projects';
	$tableLinks = 'projects_skills';
	$tableSkills = 'skills';
	$tableCompany = 'experience';
	$link = mysqli_connect($dbhost, $dbusername, $dbuserpass, $dbname) or die("Error " . mysqli_error($link));
	$json = array();
	$data = $json;
	$skillId = $_GET["skillId"];
	$companyId = $_GET["companyId"];
	if($skillId == NULL && $companyId == NULL){
		$query = "SELECT p.*, COUNT(l.skillId) AS skills_count FROM {$table} p Left JOIN {$tableLinks} l ON l.projectId =p.id group by p.id order by p.id" or die("Error in the consult.." . mysqli_error($link));
		$skillName = "all";
	} else{
		if($skillId != NULL){
			$query = "SELECT p.*  FROM {$table} p Left JOIN {$tableLinks} l ON l.projectId = p.id where l.skillId = $skillId group by p.id order by l.id" or die("Error in the consult.." . mysqli_error($link));;
			$skillNameQuery = "select s.name FROM {$tableSkills} s where s.id = $skillId" or die("Error in the consult.." . mysqli_error($link));
			$skillNameResult = $link->query($skillNameQuery); 
			$r = mysqli_fetch_assoc($skillNameResult);
			$skillName = $r["name"];
		}
		if($companyId != NULL){
			$query = $query = "SELECT p.*, COUNT(l.skillId) AS skills_count FROM {$table} p Left JOIN {$tableLinks} l ON l.projectId =p.id where p.companyid = $companyId group by p.id order by p.id" or die("Error in the consult.." . mysqli_error($link));
			$companyNameQuery = "select c.company FROM {$tableCompany} c where c.id = $companyId" or die("Error in the consult.." . mysqli_error($link));
			$companyNameResult = $link->query($companyNameQuery); 
			$r = mysqli_fetch_assoc($companyNameResult);
			$companyName = $r["company"];
		}
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
	if($skillName != null)
		$obj->name = $skillName;
	if($companyName != null)
		$obj->companyName = $companyName;
	$obj->projects = $rows;
	print json_encode($obj);
?>