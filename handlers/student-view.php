<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$student_info = $con->getData("SELECT * FROM student_info WHERE student_id = $_POST[student_id]");

echo json_encode($student_info[0]);

?>