<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("student_info");

if ($_POST['student_info']['student_id']) {
	
	$student_info = $con->updateData($_POST['student_info'],'student_id');
	
} else {
	
	$student_info = $con->insertData($_POST['student_info']);
	echo $con->insertId;

}

?>