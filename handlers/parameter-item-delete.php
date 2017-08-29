<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db("parameter_items");

$delete = $con->deleteData(array("item_id"=>implode(",",$_POST['item_id'])));	

?>