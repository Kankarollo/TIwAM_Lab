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

    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') 
    {
        echo json_encode($people);
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
?>