<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$sectors = $con->getData("SELECT sector_id, sector_description FROM sectors");
$_sectors = [];

$_sectors[] = array("sector_id"=>0,"sector_description"=>"");
foreach ($sectors as $sector) {
	$_sectors[] = $sector;
}

echo json_encode($_sectors);

?>