<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");

if(isset($_GET['filtr']))
{
    $f = $_GET["filtr"];
    $f= substr(strip_tags($f),0,20);
    $f = $f . '%';
}
else
{
    $f = '%';
}
//Polaczenie z baza
$db = new PDO("sqlite:imiona.db");

//Przygotowanie polecenia
$sql = "SELECT * FROM imiona WHERE imie LIKE :f ORDER BY pozycja";
$res = $db->prepare($sql);
$res->bindValue(':f',$f);

$res->execute();
while($res->fetch(PDO::FETCH_ASSOC))
{
    $wynik[] = $res;
}
print(json_encode(array("imiona"=>$wynik)));
?>