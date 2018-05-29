'use strict';
const http = require('http');
const request = require('request');
const host = `http://api.apixu.com`;
const ApiKey = `031e9ff47c244c51be165319182505`;
exports.WeatherWebhook = (req, res) => {
  // Get the city and date from the request
  let city = req.body.result.parameters['geo-city']; // city is a required param
  
  // Call the weather API
  callWeatherApi(city, date).then((output) => {
    // Return the results of the weather API to API.AI
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
  }).catch((error) => {
    // If there is an error let the user know
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
  });
};
function callWeatherApi (city, date) {
    const wwoApiKey = '031e9ff47c244c51be165319182505';
    let url = "http://api.apixu.com/v1/current.json?key=031e9ff47c244c51be165319182505&q=" + city; 

    request(url, function (err, response, body) {
      if(err){
        console.log('error:', error);
      } else {
       let weather = JSON.parse(body)
       let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
       return message;
      }
    });
}
