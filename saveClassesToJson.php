<?php
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
    $people = array(
        new User("Andrzej","Kowalski",strval(rand(10000000000,99999999999)),"Jana Pawla","80-111","Gdansk","Polska",
            "23","admin","admin","admin@adminowski.com"),
        new User("Joanna","Wisniewska",strval(rand(10000000000,99999999999)),"Piusudzkiego","12-130","Warszawa","Polska",
            "66","user","1234567","ultramen@gmail.com"),
        new User("Tomcio","Pociag",strval(rand(10000000000,99999999999)),"Komorowskiego","123-456","Berlin","Niemcy",
            "45","tester","tester","tester@gmail.com"),
    );

    $fp = fopen('userDatabase.json','w');
    fwrite($fp,json_encode(["Users" => $people]));
    fclose($fp);
?>