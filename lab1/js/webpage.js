$(document).ready(() => {
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
        console.log("Logowanie");
        $.get("server.php", formValues,
            function (data, textStatus, jqXHR) {
                response = JSON.stringify(data);
                $("#loginForm").hide();
                if(response === "true"){
                    $("#hellomsg").text("Logged In!");
                }
                else {
                    $("#hellomsg").text("Access denied!");
                }
            },
        );
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