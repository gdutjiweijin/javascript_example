<?php
    $db = include 'db/data.php';
    $result = array();
	$page = isset($_GET['page'])?(int)$_GET['page']:0; 
    $start = $page*10;
	$result = array_slice($db,$start,10,true);
	$data = array();
	
	if(!empty($result)){
		$data['status'] = true;
		$data['result'] = $result;
	}else{
		$data['status'] = false;
	}
	exit(json_encode($data));
?>