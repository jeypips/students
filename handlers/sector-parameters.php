<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$where = ($_POST['sector_id'] == 0)?"":" WHERE parameter_no = ".$_POST['sector_id'];
$sql = "SELECT * FROM parameters$where";

$parameters = $con->getData($sql);

echo json_encode($parameters);

?>