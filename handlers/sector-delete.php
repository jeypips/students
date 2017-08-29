<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db("sectors");

$delete = $con->deleteData(array("sector_id"=>implode(",",$_POST['sector_id'])));	

?>