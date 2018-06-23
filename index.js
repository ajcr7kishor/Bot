//'use strict';
const https = require('https');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/webhook', function (req, res) {
  
  
  let intent = req.body.queryResult.intent.displayName;
  
  let info;
  
  if(intent === "Weather" || intent === 'Weather_1') {
    
    let city = req.body.queryResult.parameters['geo-city'];
    if (city=== undefined || city==="" || city===null){
      info="Null";
    }// city is a required parameter
    else{
      let result;
      info = getWeather(city);
    } 

    function cb(err,response,body) {
      if(err){
        console.log('error:', error);
      } else {
      let weather =  JSON.parse(body); 
      result  =  `It's ${weather.current.condition.text} with ${weather.current.temp_c} degrees Celsius in ${weather.location.name}!`;
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
    
  
  let fromPlace = req.body.queryResult.parameters['FromPlace']; 
  let toPlace= req.body.queryResult.parameters['ToPlace'];
  // city is a required parameter
  if (fromPlace=== undefined || fromPlace==="" || fromPlace===null){
    info="Routeswithoutfromplace####"+toPlace+"###";
  }
  else{
    
    let path='driving';
    if (req.body.queryResult.parameters['TravelWay']){
      path= req.body.queryResult.parameters['TravelWay'];
    }
    let result;
    info = "Route####"+toPlace+"###"+fromPlace; //Done till here
  } 

  

  function route (err,response,body) {
    if(err){
      console.log('error:', error);
    } else {
    let bodyy =  JSON.parse(body); 
    travelDistance = bodyy.resourceSets[0].resources[0].travelDistance;
    travelTime= bodyy.resourceSets[0].resources[0].travelDuration;
    travelTime= travelTime/60;
    startDirection=bodyy.resourceSets[0].resources[0].routeLegs[0].itineraryItems[0].instruction.text;//.text;
    console.log(travelDistance);
    console.log(travelTime);
   // console.log(result);
   console.log(startDirection);
    
    //let commonPart= bodyy.resourceSets[0];//.routelegs[0].itineraryItems[0];
      var i = 0;
      var length= bodyy.resourceSets[0].resources[0].routeLegs[0].itineraryItems.length;
      result  =  `ROUTES` +length +`####It's ${bodyy.resourceSets[0].resources[0].travelDistance} kms and you will approximately take` + travelTime+ ` mins to reach there.####`;
   
      //console.log(length);
    // while (i+1)
            // header keys are lower-cased by Node.js
            //console.log(itineraryItem);
            //if (itineraryItem.startsWith("instruction") )
      for (i=0; i< length; i++){
        result+= bodyy.resourceSets[0].resources[0].routeLegs[0].itineraryItems[i].maneuverPoint.coordinates[0]+";"+ bodyy.resourceSets[0].resources[0].routeLegs[0].itineraryItems[i].maneuverPoint.coordinates[1] +";"+ bodyy.resourceSets[0].resources[0].routeLegs[0].itineraryItems[i].instruction.text+"###";
        //console.log(bodyy.resourceSets[0].resources[0].routeLegs[0].itineraryItems[i].instruction.text);
      }
                   


   // ${bodyy.resourceSets[0].resources[0].routeLegs[0].itineraryItems[0].instruction.text}\n${bodyy.resourceSets[0].resources[0].routeLegs[0].itineraryItems[1].instruction.text}`;
    console.log(result);
    
  }
  }


  function getRoute (fromPlace, toPlace, path) {
      var url;
      reuslt= undefined;
      const Apikey='AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU';
      
      url = "http://dev.virtualearth.net/REST/v1/Routes/"+path+ "?wp.0="+fromPlace+ "&wp.1="+ toPlace+ "&key=AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU" ;
      console.log(url);
      let req = request(url, route);

        while(result === undefined){
            require('deasync').runLoopOnce();
        }
        return result;
  }

}


else if(intent === "Traffic") {
    let city = req.body.queryResult.parameters['area']; 
        let lat;
        let lon;
      let result;
      let urltraffic;
      
        if (city===undefined || city==="" || city===null){
            console.log("Entered!");
//          lat = req.body.queryResult.parameters['latitude']; 
//          lon = req.body.queryResult.parameters['longitude']; 
          
//          urltraffic = "https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/"+lat+","+lon+"/15?mapSize=500,500&pp="+lat+","+lon+";21;AA&pp="+lat+","+lon+";;AB&pp="+lat+","+lon+";22&key=AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU";
//           console.log(urltraffic);      
        //   return url;
        info="Null";
          console.log("hey")
      //info= getCoordinate;s(lat, lon);
        }
      else{
          console.log("Nope");
        console.log(urltraffic); 
        urltraffic="https://dev.virtualearth.net/REST/V1/Imagery/Map/Road/"+city+"?mapLayer=TrafficFlow&key=AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU";
        
          info= urltraffic;
      }

//   let city = req.body.queryResult.parameters['area']; 
//   //return city;
//   console.log(city);
//   //return city;// city is a required parameter
//   let result;
//   let res=undefined;
//   if (city === undefined ){
//     let latitude = req.body.queryResult.parameters['latitude']; 
//     let longitude = req.body.queryResult.parameters['longitude']; 
//     console.log("tt3");
//     //return "tt3";
//     info=tt2(latitude-0.5, longitude-0.5, latitude+0.5, longitude+0.5);
    
//   }
//   else{
//     info = traffic1(city);
//   }  

//   function tt1(err,response,body) {
//     if(err){
//       console.log('error:', error);
//     } else {
//     var bodyy =  JSON.parse(body); 
//     var lat1  =  bodyy.resourceSets[0].resources[0].bbox[0]; //bbox[1];
//     console.log(lat1);
  
//    var lon1  =  bodyy.resourceSets[0].resources[0].bbox[1];
//    var lat2  =  bodyy.resourceSets[0].resources[0].bbox[2];
//    var lon2  =  bodyy.resourceSets[0].resources[0].bbox[3];
//     tt2(lat1,lon1, lat2, lon2);
  
//   }
//   }

//   function tt3(err, response, body){
//     console.log("tt3");
//     if(err){
//       console.log('error:', error);
//     } else {
//     var bodyy =  JSON.parse(body); 
//     res= "TRAFFIC///"
//     var len=bodyy.resourceSets[0].resources.length;
//     for (var i=0; i<len ;i++){
//       res+=bodyy.resourceSets[0].resources[i].point.coordinates[0]+";"+bodyy.resourceSets[0].resources[i].point.coordinates[1]+";"+bodyy.resourceSets[0].resources[i]['description']+";"+bodyy.resourceSets[0].resources[i]['detour']+"///";
//     }
//     if (res===null){
//       res="Sorry can't help you with that";
//     }
    
    
//   }
// }

//   function tt2(lat1,lon1,lat2,lon2){
    
//     res = undefined;
//     url= "http://dev.virtualearth.net/REST/v1/Traffic/Incidents/"+lat1+","+lon1+","+lat2+","+lon2+"?key=AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU";
//     let req=request(url,tt3);
    
    
//   }

//   function traffic1 (area) {
//       result = undefined;
//       res=undefined;
//       // const ApiKey = '031e9ff47c244c51be165319182505';
//       // let url = `http://api.apixu.com/v1/current.json?key=${ApiKey}&q=${city}`; 
//       url = "http://dev.virtualearth.net/REST/v1/Locations/"+area+ "?key=AnVhYPW82DyARXaZcuaJNpaNm9ydV-SwkQBWSX9ofuorRkE-z7kCCvNao6_kSvPU" ;
//       let req = request(url, tt1);
//       while(res === undefined){
//           require('deasync').runLoopOnce();
//       }
//       console.log(res);
//       return res;
//   }


  }
  else if (intent === "MovieInfo"){
  let movieName = req.body.queryResult.parameters['movie'];
  let result;
  info = getinfo(movieName);

  function cb(err,response,body) {
    if(err){
      console.log('error:', err);
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


else if(intent === "Search")
{
  let q = req.body.queryResult.parameters['SearchEntity'];
  console.log(q);
  let result;
  info = getinfo(q);
  console.log(info);

  function cb(err,response,body) {
    if(err){
      console.log('error:', err);
    } else {
    let res =  JSON.parse(body); 
    result  = res.entities.value[0].description;
    
  }
  }
  
  function getinfo(query)
  {
    let subscriptionKey = '4b7e2fc6f92544f591979be883c74675';
    let host = 'https://api.cognitive.microsoft.com';
    let path = '/bing/v7.0/entities/';
    let mkt = 'en-us';
    let params = '?mkt=' + mkt + '&q=' + encodeURI(query);

    var options = {
     uri : host+path+params,
     headers : { 'Ocp-Apim-Subscription-Key' : subscriptionKey ,
                 'Host' : 'api.cognitive.microsoft.com',
                 'Content-Type' : 'application/json'
                }

    };
    result = undefined;
    let req = request(options, cb);
    while(result === undefined){
        require('deasync').runLoopOnce();
    }
    console.log(result);
    return result;

  }
}

else if( intent === "Recommendations")
{
  let result;
  let q = req.body.queryResult.queryText;
  
  info = getreco(q);
  
  function cb(err,response,body) {
    if(err){
      console.log('error:', err);
    } else {
    let res =  JSON.parse(body); 
    
    result  = res;
    console.log(result);
  }
  }
  
  function getreco(query)
  {
    let host = 'https://developers.zomato.com/api/v2.1/search?';
    let mkt = 'en-us';
    let user_key= 'b72880668e965dba942036fa10a81b93';
    let entity_id = '6';
    let entity_type = 'city';
    let count = '10';
    let params = `&entity_id=${entity_id}&entity_type=${entity_type}&count=${count}`;
    var options = {
     uri : host+params,
     headers : { 'user-key' : user_key ,
                 'Content-Type' : 'application/json',
                }

    };
    result = undefined;
    let req = request(options, cb);
    while(result === undefined){
        require('deasync').runLoopOnce();
    }
    console.log(result);
    return result;
  }
}
else{
  var query=req.body.queryResult;
  
  info= searchinfo(query);

  function searchinfo (query) {

    'use strict';

    let https = require('https');
    
    let subscriptionKey = 'cc196f4baa8044c5bdaf1a715cd49c90';
  
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/search';
    
    let term = query;
    
    let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            console.log('\nRelevant Headers:\n');
            body = JSON.parse(body);
            let result=`${body.webPages.value[0].snippet} \nTo read further, checkout: ${body.webPages.value[0].url}`;
            return result;
            console.log(body);
        });
        response.on('error', function (e) {
            console.log('Error: ' + e.message);
        });
    };
    
    let bing_web_search = function (search) {
      console.log('Searching the Web for: ' + term);
      let request_params = {
            method : 'GET',
            hostname : host,
            path : path + '?q=' + encodeURIComponent(search),
            headers : {
                'Ocp-Apim-Subscription-Key' : subscriptionKey,
            }
        };
    
        let req = https.request(request_params, response_handler);
        req.end();
    }
    
    if (subscriptionKey.length === 32) {
        bing_web_search(term);
    } else {
        console.log('Invalid Bing Search API subscription key!');
        console.log('Please paste yours into the source code.');
    }
    
  }
}

  let response = info;
  if(intent === "Recommendations")
  {
    response = "Here's some recommendation for you";
    let responseObj = {
                      fulfillmentText: [JSON.stringify(info)],
                      fulfillmentMessages:[
                        {text :{text: [JSON.stringify(info)]}}
                      ],
                      source:"",
                      payload : info
                    }
    return res.json(responseObj);
  }
  else
  {
    let responseObj = {
      fulfillmentText: response,
      fulfillmentMessages:[{text :{text: [info]}}],
      source:""
    }
    return res.json(responseObj);

  }

});




app.listen((process.env.PORT || 8000), () => {
  console.log("Server is up and running...");
});

