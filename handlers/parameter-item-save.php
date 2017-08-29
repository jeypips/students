<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("parameter_item");

if ($_POST['parameter_item']['item_id']) {
	
	$parameter_item = $con->updateData($_POST['parameter_item'],'item_id');
	
} else {
	
	$parameter_item = $con->insertData($_POST['parameter_item']);
	echo $con->insertId;

}

?>