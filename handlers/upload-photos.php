<?php

$pictures = "../pictures";

foreach ($_POST['pictures'] as $key => $picture) {

if ($picture == "") continue;

$imgData = str_replace(' ','+',$picture);
$imgData =  substr($imgData,strpos($imgData,",")+1);
$imgData = base64_decode($imgData);
$filePath = "$pictures/".$_POST['student_id']."_$key.png";
$file = fopen($filePath, 'w');
fwrite($file, $imgData);
fclose($file);

}

?>