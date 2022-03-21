const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res) {
    
    const query = req.body.cityName;
    const apiKey = 'fe6b30e824eae7ae2d86d661c998ba3e'
    const units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query +'&units=' + units + '&appid=' + apiKey;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write('<h1>The Temperature in ' + query + ' is ' + temp + ' degrees celcius</h1>');
            res.write('<br> <p>The weather feels like ' + weatherDescription + '</p>');
            res.write('<img src=http://openweathermap.org/img/wn/' + icon + '@2x.png>');
            res.send();
            
        })

    });
});



app.listen(3000, function() {
    console.log('The server is running on port: 3000');
});