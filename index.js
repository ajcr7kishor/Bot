//'use strict';
const http = require('http');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/webhook', function (req, res) {
  // Get the city and date from the request
  
  let intent = req.body.queryResult.intent.displayName;
  
  let info;
  
  if(intent === "Weather") {
    
    let city = req.body.queryResult.parameters['geo-city']; // city is a required parameter
    let result;
    info = getWeather(city);

    

    function cb(err,response,body) {
      if(err){
        console.log('error:', error);
      } else {
      let weather =  JSON.parse(body); 
      result  =  `It's ${weather.current.temp_c} degrees in ${weather.location.name}!`;
      console.log(result);
    }
    }


    function getWeather (city) {
        result = undefined;
        const ApiKey = '031e9ff47c244c51be165319182505';
        let url = `http://api.apixu.com/v1/current.json?key=${ApiKey}&q=${city}`; 
        let req = request(url, cb);
        while(result === undefined){
            require('deasync').runLoopOnce();
        }
        return result;
    }


}

else if (intent === "MovieInfo"){
  let movieName = req.body.queryResult.parameters['movie'];
  let result;
  info = getinfo(movieName);

  

  function cb(err,response,body) {
    if(err){
      console.log('error:', error);
    } else {
    let movie =  JSON.parse(body); 
    result  =  `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;
    
  }
  }


  function getinfo (MovieName) {
      result = undefined;
      const ApiKey = '30f670e4';
      let url = `http://www.omdbapi.com/?t=${MovieName}&apikey=${ApiKey}`; 
      let req = request(url, cb);
      while(result === undefined){
          require('deasync').runLoopOnce();
      }
      return result;
  }

}
  let response = info;
  let responseObj = {
                      fulfillmentText: response,
                      fulfillmentMessages:[{text :{text: [info]}}],
                      source:""
                    }
    return res.json(responseObj);

} )

app.listen((process.env.PORT || 8000), () => {
  console.log("Server is up and running...");
});

