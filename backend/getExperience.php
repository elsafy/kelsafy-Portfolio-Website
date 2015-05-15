<?php  require 'config.php'; header('Access-Control-Allow-Origin: *'); 
	$table = 'experience';
	$tableProjects = 'projects';
	$link = mysqli_connect($dbhost, $dbusername, $dbuserpass, $dbname) or die("Error " . mysqli_error($link));
	$json = array();
	$data = $json;
	$query = "SELECT e.*, COUNT(p.id) AS projects_count FROM {$table} e Left JOIN {$tableProjects} p ON p.companyId = e.id group by e.id order by e.id desc" or die("Error in the consult.." . mysqli_error($link));
	$result = $link->query($query); 
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		if($r["projects_count"] != NULL)
			$r["projects_count"] = "Worked in " . $r["projects_count"] . " Projects";
		if($r["startdate"] !== NULL && $r["enddate"] == NULL) {
			$r["enddate"] = "current";
		}
		$rows[] = $r;
	}
	print json_encode($rows);
?>