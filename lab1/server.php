<?php

    class User
    {
        var $name;
        var $surname;
        var $address;
        var $age;
        var $login;
        var $password; 
        var $email; 

        function __construct($_name, $_surname ,$_address, $_age, $_login, $_password, $_email)
        {
            $this->name = $_name;
            $this->surname = $_surname;
            $this->address = $_address;
            $this->age = $_age;
            $this->login = $_login;
            $this->password = $_password;
            $this->email = $_email;
        }
    }

    $people = loadDatabase("userDatabase.json");

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        if(!isset($_POST["name"],$_POST["surname"],$_POST["address"],
            $_POST["age"],$_POST["login"],$_POST["password"],$_POST["email"]))
        {
            echo "<h1>Blad! Brak danych</h1>";
            return;
        }

        $name = strip_tags($_POST["name"]);
        $surname = strip_tags($_POST["surname"]);
        $address = strip_tags($_POST["address"]);
        $age = strip_tags($_POST["age"]);
        $login = strip_tags($_POST["login"]);
        $password = strip_tags($_POST["password"]);
        $email = strip_tags($_POST["email"]);
        
        $people[] = new User($name,$surname,$address,$age,$login,$password,$email);
        saveToDatabase("userDatabase.json",$people);

        echo "<h1>New user registered - $login</h1>";

    }
    elseif ($_SERVER['REQUEST_METHOD'] === 'GET') 
    {
        $login = strip_tags($_GET["login"]);
        $password = strip_tags($_GET["pass"]);

        if(validateLogin($login, $password, $people)) 
        {
            print("<h1>Logged in</h1>");
        }
        else {
            print("<h1>Access denied</h1>");
        }
    }

    function loadDatabase($path)
    {
        $fileContent = file_get_contents($path);
        $peopleJson = json_decode($fileContent, true);
        $people = array();
        foreach ($peopleJson["Users"] as $user) {
            $people[] = new User($user["name"],$user["surname"],
                $user["address"],$user["age"],$user["login"],$user["password"],$user["email"]);
        }
        return $people;
    }

    function validateLogin($login,$password,$people) {
        foreach ($people as $user) {
            // echo "$user</br>";
            // var_dump($user);
            if($login == $user->login and $password ==$user->password) {
                return TRUE;
            }
            else {
            }
        }
        // echo "Login: $login, password: $password";
        return FALSE;
    }

    function saveToDatabase($path, $people)
    {
        $fp = fopen($path,'w');
        fwrite($fp,json_encode(["Users" => $people]));
        fclose($fp);
    }
?>