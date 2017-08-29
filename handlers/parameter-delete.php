<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db("parameters");

$delete = $con->deleteData(array("parameter_id"=>implode(",",$_POST['parameter_id'])));	

?>