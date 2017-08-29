<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$parameter = $con->getData("SELECT parameter_id, parameter_name, sector_description FROM parameters, sectors WHERE sector_id = parameter_no");


echo json_encode($parameter);

?>