<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$physicals = $con->getData("SELECT * FROM macros");

echo json_encode($physicals);

?>