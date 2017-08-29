<?php

session_start();

if (isset($_SESSION['student_id'])) unset($_SESSION['student_id']);

echo "Logout Successful";

header("location: ../index.php");

?>