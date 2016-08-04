var express = require('express');
var path = require('path');
var app = express();

var app = express();
app.use(express.static(__dirname + "/public"));

// Listen for requests
// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

var Botkit = require('botkit');
var chapter1 = require('./chapter1/chapter1');

var controller = Botkit.slackbot({
  debug: false,
  json_file_store: 'history'
});

// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-65948641505-W3Sp6QzRyTb11SqL6FGp2orH',
}).startRTM();


controller.hears('start',['direct_message'],function(bot,message) {
  bot.reply(message,{
    attachments: [
        {
            "text": "Help! I tried to reset my password but nothing happened!",
            "color": "#7CD197",
            //"image_url": "http://localhost/hobbit1.png"
            "image_url": "http://thehobbit.herokuapp.com/img/hobbit1.png"
        }
    ]});

  controller.storage.users.save({id: message.user, step:'1_1'}, function(err) {  });

  chapter1.init(controller);

});