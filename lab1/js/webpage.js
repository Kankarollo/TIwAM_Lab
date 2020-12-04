$(document).ready(() => {
    $("#loginButton").on('click', () =>{
        console.log("Jestem w loginPage");
        window.location.href = "loginPage.html";
    })
    $("#registerButton").on('click', () => {
        console.log("Jestem w registerPage");
        window.location.href = "registerPage.html";
    })
    $("#homeButton").on('click', ()=>{
        location.href ='index.html';
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