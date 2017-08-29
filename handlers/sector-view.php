<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$sectors = $con->getData("SELECT * FROM sectors WHERE sector_id = $_POST[sector_id]");

echo json_encode($sectors[0]);

?>