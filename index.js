'use strict';
const http = require('http');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const host = `http://api.apixu.com`;
const ApiKey = `031e9ff47c244c51be165319182505`;
const app = express(); 

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/webhook', function (req, res) {
  // Get the city and date from the request
  let city = req.body.queryResult.parameters['geo-city']; // city is a required param
  let w = getWeather(city);
  //console.log(w);
  let response = " ";
  //console.log(response);
  let responseObj = {
                      "fulfillmentText":response,
                      "fulfillmentMessages":[{"text" :{"text": [w]}}],
                      "source":""
                    }
  
  //console.log(responseObj);
  return res.json(responseObj);
})

function getWeather (city) {
    const wwoApiKey = '031e9ff47c244c51be165319182505';
    let url = `http://api.apixu.com/v1/current.json?key=${wwoApiKey}&q=${city}`; 

    request(url, function (err, response, body) {
      if(err){
        console.log('error:', error);
      } else {
       let weather = JSON.parse(body);
      // console.log(weather);
       let message = `It's ${weather.current.temp_c} degrees in ${weather.location.name}!`;
       
       console.log(message);
       return message;       
      }
    });
}

app.listen((process.env.PORT || 8000), () => {
  console.log("Server is up and running...");
});

