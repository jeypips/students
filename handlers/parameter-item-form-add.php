<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$parameter_items = $con->getData("SELECT item_parameter, item_attribute FROM parameter_items");
$_parameter_items = [];

$_parameter_items[] = array("item_parameter"=>0,"item_attribute"=>"");
foreach ($parameter_items as $parameter_item) {
	$_parameter_items[] = $parameter_item;
}

echo json_encode($_parameter_items);

?>