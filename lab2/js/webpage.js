$(document).ready(() => {
    var login;
    var password;
    var is_login = false;
    $(".dropdown").on("show.bs.dropdown", function(event){
        var x = $(event.relatedTarget).text(); // Get the text of the element
        }); 
    $("#after_login").hide();
    $("#popup_success").hide();
    $("#popup_alert").hide();
    $("#loginButton").on('click', () =>{
        location.href = "loginPage.html";
    })
    $("#registerButton").on('click', () => {
        location.href = "registerPage.html";
    })
    $("#homeButton").on('click', ()=>{
        location.href ='index.html';
    })
    $("#loginForm").on('submit', (event)=>{
        event.preventDefault();
        var formValues = $("#loginForm").serialize();
        login = $("#loginInput").val();
        password = $("#passwordInput").val();
        console.log(login);
        console.log(password);
        $.get("server.php", formValues,
            function (data, textStatus, jqXHR) {
                $("#after_login").show();
                $("#carousel-name").text(data.name);
                $("#carousel-pesel").text(data.pesel);
                $("#carousel-street").text(data.street);
                $("#carousel-postcode").text(data.postcode);
                $("#carousel-city").text(data.city);
                $("#carousel-country").text(data.country);
                $("#carousel-age").text(data.age);
                $("#carousel-surname").text(data.surname);
                $("#carousel-email").text(data.email);
                is_login = true;
                $("#popup_success").show();
                $("#popup_alert").hide();
            },
        ).fail(function() {
            $("#popup_success").hide();
            $("#popup_alert").show();
        });
    })
    $("#registerForm").on('submit', (event)=>{
        event.preventDefault();
        var formValues = $("#registerForm").serialize();
        $.post("server.php", formValues,
            function (data, textStatus, jqXHR) {
                response = JSON.stringify(data);
                $("#registerForm").hide();
                console.log(response);
                if(response === "true"){
                    $("#hellomsg").text("Welcome new user!");
                }
                else if(response == "\"EXIST\"") {
                    $("#hellomsg").text("User already exist!");
                }
                else {
                    $("#hellomsg").text("Sorry, something went wrong!");
                }
            },
        );
        console.log("Rejestrowanie");
    })
    
    // function validatePassword(input) {
    //     console.log("IM HERE!!!");
    //     if (input.value != document.getElementById('password_one').value) {
    //         input.setCustomValidity('Password Must be Matching.');
    //     } else {
    //         // input is valid -- reset the error message
    //         input.setCustomValidity('');
    //     }
    // }
});

