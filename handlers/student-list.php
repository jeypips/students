<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$student_infos = $con->getData("SELECT * FROM student_info");

echo json_encode($student_infos);

?>