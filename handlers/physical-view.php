<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$macros = $con->getData("SELECT * FROM macros WHERE macros_id = $_POST[macros_id]");

echo json_encode($macros[0]);

?>