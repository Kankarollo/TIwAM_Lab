$(document).ready(() => {
    var filter = ""; 
    var city = "";
    const access_key = 'a0b0a17d96f3208eefbbb6ac3af7c505';
    $("#parameter").change(function () {
        filter = $(this).val();
        console.log(`filter = ${filter}`);
    });
    $("#city").change(function () {
        city = $(this).val();
        console.log(`city = ${city}`);
    });

    $("#apiButton").click(function() {
        var url = `http://api.weatherstack.com/current/?access_key=${access_key}&query=${city}`
        console.log(`url=${url}`);
        $.ajax({
            url: 'http://api.weatherstack.com/current',
            data: {
                access_key: 'a0b0a17d96f3208eefbbb6ac3af7c505',
                query: city
            },
            dataType: 'json',
            success: function (response) {
                console.log(response);
                console.log(`city=${city}, parameter=${filter}`)
                console.log(`filter = ${filter}`);
                switch (filter.toString()) {
                    case "Temperature":
                        console.log("Selected Temperature");
                        if (typeof response.location !== 'undefined' && typeof response.current !== 'undefined') {
                            $("#showPlace").html(`Current temperature in ${response.location.name} is ${response.current.temperature} Celsius.`)
                        }
                        else {
                            console.log("Response json don't have searched parameters.")
                            console.log(response)
                        }
                        break;
                        case "Wind Speed":
                            console.log("Selected Wind Speed");
                            if (typeof response.location.name !== 'undefined' && typeof response.current.wind_speed !== 'undefined') {
                            $("#showPlace").html(`Current wind speed in ${response.location.name} is ${response.current.wind_speed}.`)
                            }
                            else{
                                console.log("Response json don't have searched parameters.")
                                console.log(response)
                            }
                        break;
                    case "All":
                        console.log("Selected All");
                    default:
                        console.log(`Selected ${filter}`);
                        break;
                }
        
            },
            error: function(response){
                console.log("[ERROR] Something went wrong");
                console.log(response);
            }
        });
    })
})
