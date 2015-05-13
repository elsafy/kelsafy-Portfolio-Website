<?php  require 'config.php'; header('Access-Control-Allow-Origin: *'); 
	$table = 'projects';
	$link = mysqli_connect($dbhost, $dbusername, $dbuserpass, $dbname) or die("Error " . mysqli_error($link));
	$json = array();
	$data = $json;
	$id = $_GET["id"];
	$query = "SELECT p.* FROM {$table} p where p.id = $id" or die("Error in the consult.." . mysqli_error($link));
	$result = $link->query($query); 
	if($r = mysqli_fetch_assoc($result)) {
		$dir = "../assets/img/projects/$id";
		if(file_exists("$dir")){
			$a = scandir($dir);
			$blacklist = array(".","..");
			foreach ($a as $value) {
				if (!in_array($value, $blacklist)) {
					$newarray[] = $value;
				}
			}
			$r['screenshoots'] = $newarray;
		}else
			$r['screenshoots'] = array();
		$jsonObject = json_encode($r);
		print $jsonObject;
	}
	print "";
?>