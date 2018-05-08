var city = "";
$(function () {
    var city = "San+Diego";
    currentWeather(city);
});

$('#selectedCityBut').keydown(function (event) {
    if (event.which == 13) {
        city = event.target.value;
        console.log(city);

        if (city) {
            currentWeather(city);
        }
    }
});

function fivedayForecast(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&mode=json&units=imperial&APPID=918cfc46242bc81cb15e16cd0fb9a5f0", function (json) {
        var forecast = [];

        for (var i = 0; i < json['list'].length; i++) {
            var date = new Date(json['list'][i]['dt_txt']);
            forecast[date.getDay()] = json['list'][i];
        }

        var forecastDay = 1;

        forecast.forEach(function (weather) {
            var day = new Date(weather["dt_txt"]).toDateString().split(" ");
            var temp = weather["main"]["temp"];
            var iconCode = weather["weather"][0]["icon"];
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

            $('#day' + forecastDay).text(day[0]);
            $('#temp' + forecastDay).text(temp);
            $('#img' + forecastDay).attr("src", iconUrl);
            $('#weather' + forecastDay).text(weather["weather"][0]["description"]);

            forecastDay++;
        });
    });
}

function currentWeather(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&mode=json&units=imperial&APPID=918cfc46242bc81cb15e16cd0fb9a5f0", function (json) {
        var iconCode = json['weather'][0]["icon"]
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        $('#cityName').text(json['name']);
        $('#ambientWeather').text(json['weather'][0]['description']);
        $('#iconDay').attr("src", iconUrl);
        $('#temp').text(json["main"]["temp"]);

        fivedayForecast(city);
        setBackgroundColor(json['weather'][0]['id']);

    });
}

function setBackgroundColor(condition) {
    var color = 'white';

    switch (true) {
        case (condition >= 200 && condition <= 299): // Group 2xx: Thunderstorm
            break;
        case (condition >= 300 && condition <= 399): // Group 3xx: Drizzle
            break;
        case (condition >= 500 && condition <= 599): // Group 5xx: Rain
            break;
        case (condition >= 600 && condition <= 699): // Group 6xx: Snow
            break;
        case (condition >= 700 && condition <= 799): // Group 7xx: Atmosphere
            break;
        case (condition == 800): // Group 800: Clear
            break;
        case (condition >= 801 && condition <= 899): // Group 80x: Clouds
            break;
        default:
            color = 'white';
    }

    $('.container1').css('background', 'linear-gradient(' + color + ', white 97%)');
};
