$(document).ready(() => {
    var filter = $("#parameter option:selected").toString(); 
    var city = $("#city option:selected").toString(); 
    const access_token = "a0b0a17d96f3208eefbbb6ac3af7c505"
    const allCities = ["Kathmandu", "Punakha", "Dhaka"]

    $("#parameter").change(function () {
        filter = $(this).val();
        console.log(`filter = ${filter}`);
    });
    $("#city").change(function () {
        city = $(this).val();
        console.log(`city = ${city}`);
    });

    $("#apiButton").click(function() {
        if(filter === "" || city==="")
        {
            console.log("Select city and parameter.");
            return;
        }
        if(filter ==="All"){
            getManyWeatherJson(allCities);
        }
        else {
            getOneWeatherJson(filter,city);
        }
        
    })

    function getManyWeatherJson (citiesArray)
    {
        var jsonDataArray = [];
        var iterator = 0;
        citiesArray.forEach(city => {
            $.ajax({
                url: 'http://api.weatherstack.com/current',
                data: {
                    access_key: 'a0b0a17d96f3208eefbbb6ac3af7c505',
                    query: city
                },
                dataType: 'json',
                success: function (response) {
                    jsonDataArray.push(response);
                },
                error: function(response){
                    console.log("[ERROR] Something went wrong");
                    console.log(response);
                }
            }).done(()=>{
                iterator++;
                if(iterator === citiesArray.length){
                    var table = $('<table class="table"/>');
                    var table_head = $('<thead/>');
                    var head_row = $('<tr/>');
                    var table_body = $('<tbody/>');
                    var body_row = [];
                    
                    $.each(jsonDataArray[0], function (key, jsonCategory) {
                        $.each(jsonCategory, function (key, value) { 
                            head_row.append(`<th scope="col">${key}</th>`);
                        }); 
                    })
                    $.each(jsonDataArray, function (index, jsonData) {
                        body_row[index] = $('<tr/>');
                        $.each(jsonData, function (key, jsonCategory) { 
                            $.each(jsonCategory, function (key, value) { 
                                body_row[index].append('<td>' + value + '</td>');
                            });
                        }); 
                    })
                    table_head.append(head_row);
                    table_body.append(body_row)
                    table.append(table_head);
                    table.append(table_body);
                    $("#showPlace").html(table)
                }
            });
            
        });
    }

    function getOneWeatherJson(filter,city)
    {
        $.ajax({
            url: 'http://api.weatherstack.com/current',
            data: {
                access_key: 'a0b0a17d96f3208eefbbb6ac3af7c505',
                query: city
            },
            dataType: 'json',
            success: function (response) {
                switch (filter.toString()) {
                    case "Temperature":
                        console.log("Selected Temperature");
                        $("#showPlace").html(`Current temperature in ${response.location.name} is ${response.current.temperature} Celsius.`)
                        break;
                    case "Wind Speed":
                        console.log("Selected Wind Speed");
                        $("#showPlace").html(`Current wind speed in ${response.location.name} is ${response.current.wind_speed}.`)
                    break;
                    
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
    }
})
