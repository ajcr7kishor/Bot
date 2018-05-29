
var request = require('request');
var builder = require('botbuilder'); 
var apiairecognizer = require('api-ai-recognizer'); 
var request = require('request'); 
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector); 
var recognizer = new apiairecognizer('bdafa2ddfd104affb00277dec16dbe94'); 
var intents = new builder.IntentDialog({ recognizers: [recognizer] }); 
bot.dialog('/',intents); 

intents.matches('Weather',[ function(session,args){ var city = builder.EntityRecognizer.findEntity(args.entities,'cities'); 
if (city)
{ var city_name = city.entity; var url = "http://api.apixu.com/v1/current.json?key=031e9ff47c244c51be165319182505&q=" + city_name; 
request(url,function(error,response,body){ body = JSON.parse(body); temp = body.current.temp_c; session.send("It's " + temp + " degrees celsius in " + city_name); }); }
else
{ builder.Prompts.text(session, 'Which city do you want the weather for?'); } }, 
function(session,results){ var city_name = results.response; var url = "http://api.apixu.com/v1/current.json?key=031e9ff47c244c51be165319182505&q=" + city_name; 
request(url,function(error,response,body){ body = JSON.parse(body); temp = body.current.temp_c; session.send("It's " + temp + " degrees celsius in " + city_name); }); } ]);

intents.matches('BookMovie',function(session, args){ var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
if (fulfillment){ var speech = fulfillment.entity; session.send(speech); }else{ session.send('Sorry...not sure how to respond to that'); } });

intents.matches('smalltalk.greetings',function(session, args){ var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
if (fulfillment){ var speech = fulfillment.entity; session.send(speech); }else{ session.send('Sorry...not sure how to respond to that'); } });

intents.onDefault(function(session){ session.send("Sorry...can you please rephrase?"); });