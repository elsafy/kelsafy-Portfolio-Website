<?php  require 'config.php'; header('Access-Control-Allow-Origin: *'); 
	$dir = "../assets/img/reviews";
	if(file_exists("$dir")){
		$a = scandir($dir);
		$blacklist = array(".","..");
		foreach ($a as $value) {
			if (!in_array($value, $blacklist)) {
				$newarray[] = $value;
			}
		}
		$r = $newarray;
	}else
		$r = array();
	print json_encode($r);
?>