<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

$con = new pdo_db();
$sql = "SELECT student_id FROM student_info WHERE student_username = '$_POST[student_username]' AND student_password = '$_POST[student_password]'";
$account = $con->getData($sql);
if (($con->rows) > 0) {
	session_start();
	$_SESSION['student_id'] = $account[0]['student_id'];
	echo json_encode(array("login"=>true));
} else {
	echo json_encode(array("login"=>false));
}

?>