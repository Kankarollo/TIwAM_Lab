<?php
header("Access-Contol-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
$czas = date("Y-m-d H:i:s",time());

$wynik["czas"] = $czas;
print(json_encode($wynik));

?>