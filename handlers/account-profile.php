<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../db.php';

session_start();

$con = new pdo_db();

$profile = [];

$sql = "SELECT student_id, CONCAT(student_firstname, ' ', student_lastname) fullname FROM student_info WHERE student_id = $_SESSION[student_id]";

$staff = $con->getData($sql);

$profile['fullname'] = $staff[0]['fullname'];

$dir = "pictures/";
$avatar = $dir."avatar.png";

$picture = $dir.$staff[0]['student_id'].".jpg";
if (!file_exists("../".$picture)) $picture = $avatar;

$profile['picture'] = $picture;

echo json_encode($profile);

?>