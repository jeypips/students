<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db("macros");

$delete = $con->deleteData(array("macros_id"=>implode(",",$_POST['macros_id'])));	

?>