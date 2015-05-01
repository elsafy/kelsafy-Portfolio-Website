<?php  require 'config.php';
	$table = 'skills';
	$link = mysqli_connect($dbhost, $dbusername, $dbuserpass, $dbname) or die("Error " . mysqli_error($link));

//consultation:

$query = "SELECT name FROM mytable" or die("Error in the consult.." . mysqli_error($link)); 

	$json = array();
	$data = $json;
	$query = "SELECT * FROM {$table} order by 'percentage' desc" or die("Error in the consult.." . mysqli_error($link));
	$result = $link->query($query); 
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		$rows[] = $r;
	}
	print json_encode($rows);
?>