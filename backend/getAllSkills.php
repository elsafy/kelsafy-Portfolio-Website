<?php  require 'config.php'; header('Access-Control-Allow-Origin: *'); 
	$table = 'skills';
	$link = mysqli_connect($dbhost, $dbusername, $dbuserpass, $dbname) or die("Error " . mysqli_error($link));
	$json = array();
	$data = $json;
	$query = "SELECT * FROM {$table} order by `id`" or die("Error in the consult.." . mysqli_error($link));
	$result = $link->query($query); 
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		$rows[] = $r;
	}
	print json_encode($rows);
?>