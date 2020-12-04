<?php
    header("Access-Contol-Allow-Origin: *");
    header("Content-type: application/json; charset=utf-8");
    class User
    {
        var $name;
        var $surname;
        var $pesel;
        var $street;
        var $postcode;
        var $city;
        var $country;
        var $age;
        var $login;
        var $password; 
        var $email; 

        function __construct($_name, $_surname ,$_pesel,$_street,$_postcode,$_city,$_country,
            $_age, $_login, $_password, $_email)
        {
            $this->name = $_name;
            $this->surname = $_surname;
            $this->pesel = $_pesel;
            $this->street = $_street;
            $this->postcode = $_postcode;
            $this->city = $_city;
            $this->country = $_country;
            $this->age = $_age;
            $this->login = $_login;
            $this->password = $_password;
            $this->email = $_email;
        }
    }

    $people = loadDatabase("userDatabase.json");

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        if(!isset($_POST["name"],$_POST["surname"],$_POST["pesel"],$_POST["street"],
            $_POST["postcode"],$_POST["city"],$_POST["country"],$_POST["age"],
            $_POST["login"],$_POST["password"],$_POST["email"]))
        {
            print(json_encode(FALSE));
            return;
        }
        
        $name = strip_tags($_POST["name"]);
        $surname = strip_tags($_POST["surname"]);
        $pesel = strip_tags($_POST["pesel"]);
        $street = strip_tags($_POST["street"]);
        $postcode = strip_tags($_POST["postcode"]);
        $city = strip_tags($_POST["city"]);
        $country = strip_tags($_POST["country"]);
        $age = strip_tags($_POST["age"]);
        $login = strip_tags($_POST["login"]);
        $password = strip_tags($_POST["password"]);
        $email = strip_tags($_POST["email"]);
        
        foreach ($people as $user) {
            if($login == $user->login or $email == $user->email) {
                print(json_encode("EXIST"));
                return;
            }
        }
        $people[] = new User($name,$surname,$pesel,$street,$postcode,
        $city,$country,$age,$login,$password,$email);
        saveToDatabase("userDatabase.json",$people);
        
        print(json_encode(TRUE));
        return;
    }
    elseif ($_SERVER['REQUEST_METHOD'] === 'GET') 
    {
        $login = strip_tags($_GET["login"]);
        $password = strip_tags($_GET["pass"]);

        if(validateLogin($login, $password, $people)) 
        {
            print(json_encode(TRUE));
            return;
        }
        else {
            print(json_encode(FALSE));
            return;
        }
    }

    function loadDatabase($path)
    {
        $fileContent = file_get_contents($path);
        $peopleJson = json_decode($fileContent, true);
        $people = array();
        foreach ($peopleJson["Users"] as $user) {
            $people[] = new User($user["name"],$user["surname"],
                $user["pesel"],$user["street"],$user["postcode"],$user["city"],
                $user["country"],$user["age"],$user["login"],$user["password"],$user["email"]);
        }
        return $people;
    }

    function validateLogin($login,$password,$people) {
        foreach ($people as $user) {
            if($login == $user->login and $password ==$user->password) {
                return TRUE;
            }
        }
        return FALSE;
    }

    function saveToDatabase($path, $people)
    {
        $fp = fopen($path,'w');
        fwrite($fp,json_encode(["Users" => $people]));
        fclose($fp);
    }
?>