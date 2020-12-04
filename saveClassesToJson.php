<?php
class User
    {
        var $name;
        var $surname;
        var $address;
        var $age;
        var $login;
        var $password; 

        function __construct($_name, $_surname ,$_address, $_age, $_login, $_password)
        {
            $this->name = $_name;
            $this->surname = $_surname;
            $this->address = $_address;
            $this->age = $_age;
            $this->login = $_login;
            $this->password = $_password;
        }
    }
    $people = array(
        new User("Andrzej","Kowalski","Gdansk","23","admin","admin"),
        new User("Joanna","Wisniewska","Poznan","50","user","1234567"),
        new User("Tomcio","Pociag","Warszawa","77","tester","tester"),
    );

    $fp = fopen('userDatabase.json','w');
    fwrite($fp,json_encode(["Users" => $people]));
    fclose($fp);
?>