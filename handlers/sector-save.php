<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("sectors");

if ($_POST['sectors']['sector_id']) {
	
	$sectors = $con->updateData($_POST['sectors'],'sector_id');
	
} else {
	
	$sectors = $con->insertData($_POST['sectors']);
	echo $con->insertId;

}

?>