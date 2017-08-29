<?php

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../db.php';

$con = new pdo_db("students");

if ($_POST['students']['student_id']) {
	
	$students = $con->updateData($_POST['students'],'student_id');
	
} else {
	
	$students = $con->insertData($_POST['students']);
	echo $con->insertId;

}

?>