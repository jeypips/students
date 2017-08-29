<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$parameters = $con->getData("SELECT parameter_id, parameter_name FROM parameters");
$_parameters = [];

$_parameters[] = array("parameter_id"=>0,"parameter_name"=>"");
foreach ($parameters as $parameter) {
	$_parameters[] = $parameter;
}

echo json_encode($_parameters);

?>