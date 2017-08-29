<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("student_info");

if ($_POST['student']['student_id']) {
	
	$student = $con->updateData($_POST['student'],'student_id');
	
} else {
	
	$student = $con->insertData($_POST['student']);
	echo $con->insertId;

}

?>