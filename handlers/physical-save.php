<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("macros");

if ($_POST['macros']['macros_id']) {
	
	$macros = $con->updateData($_POST['macros'],'macros_id');
	
} else {
	
	$macros = $con->insertData($_POST['macros']);
	echo $con->insertId;

}

?>