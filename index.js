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

else if(intent === "route") {
    
  let fromPlace = req.body.queryResult.parameters['FromPlace']; // city is a required parameter
  let toPlace= req.body.queryResult.parameters['ToPlace'];
  let path;
  if (req.body.queryResult.parameters['TravelWay']){
    path= req.body.queryResult.parameters['TravelWay'];
  }
  let result;
  info = getRoute(fromPlace,toPlace,path); //Done till here

  

  function route (err,response,body) {
    if(err){
      console.log('error:', error);
    } else {
    let body =  JSON.parse(body); 
    travelDistance = body.resourceSets[0].travelDistance;
    travelTime= body.resourceSets[0].travelTime;
    result  =  `It's ${body.resourceSets[0].travelDistance} kms and you will approximately take ${body.resourceSets[0].travelTime} time to reach there.`;
    console.log(result);
    let commonPart= body.resourceSets[0].routelegs[0].itineraryItems[0];
    for (var detail in commonPart.details) 
    {
      console.log(detail.instruction.text);
    }
  }
  }


  function getRoute (fromPlace, toPlace, path) {
      // result = undefined;
      // const ApiKey = '031e9ff47c244c51be165319182505';
      // let url = `http://api.apixu.com/v1/current.json?key=${ApiKey}&q=${city}`; 
      // let req = request(url, cb);
      // while(result === undefined){
      //     require('deasync').runLoopOnce();
      // }
      // return result;
      reuslt= undefined;
      const Apikey='AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU';
      if (path){
        url = "http://dev.virtualearth.net/REST/v1/Routes/"+path+ "?wp.0="+fromPlace+ "&wp.1="+ toPlace+ "&key=AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU" ;
      }
      else{
        url = "http://dev.virtualearth.net/REST/v1/Routes?wp.0="+fromPlace+ "&wp.1="+ toPlace+ "&key=AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU" ;
      }
      let req = request(url, route);

        while(result === undefined){
            require('deasync').runLoopOnce();
        }
        return result;

  }


}


  else if(intent === "Traffic") {
    
  let city = req.body.queryResult.parameters['area']; // city is a required parameter
  let result;
  info = traffic1(area);

  

  function tt1(err,response,body) {
    if(err){
      console.log('error:', error);
    } else {
    var bodyy =  JSON.parse(body); 
    var lat1  =  `${bodyy.resourcesSets[0].resources[0].bbox[0]}`;
    var lon1  =  `${bodyy.resourcesSets[0].resources[0].bbox[1]}`;
    var lat2  =  `${bodyy.resourcesSets[0].resources[0].bbox[2]}`;
    var lon2  =  `${bodyy.resourcesSets[0].resources[0].bbox[3]}`;
    tt2(lat1,lon1, lat2, lon2);
    //console.log(result);
  }
  }

  function tt3(err, response, body){
    if(err){
      console.log('error:', error);
    } else {
    var bodyy =  JSON.parse(body); 
    var desc1  =  `${bodyy.resourcesSets[0].description}`;
    var desc2  =  `${bodyy.resourcesSets[1].description}`;
    var desc3  =  `${bodyy.resourcesSets[2].description}`;
    console.log(desc1);
    console.log(desc2);
    console.log(desc3);
    }
  }

  function tt2(lat1,lon1,lat2,lon2){
    result = undefined;
    url= "http://dev.virtualearth.net/REST/v1/Traffic/Incidents/"+lat1+","+lon1+","+lat2+","+lon2+"?key=AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU";
    let req=request(url,tt3);
       while(result === undefined){
        require('deasync').runLoopOnce();
    }
    return result;
    
  }



  function traffic1 (area) {
      result = undefined;
      // const ApiKey = '031e9ff47c244c51be165319182505';
      // let url = `http://api.apixu.com/v1/current.json?key=${ApiKey}&q=${city}`; 
      url = "http://dev.virtualearth.net/REST/v1/Locations/"+area+ "?key=AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU" ;
      let req = request(url, tt1);
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

