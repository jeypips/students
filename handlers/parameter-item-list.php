<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$parameterItem = $con->getData("SELECT item_id, item_attribute, parameter_name FROM parameter_items, parameters WHERE parameter_id = item_parameter");

echo json_encode($parameterItem);

?>