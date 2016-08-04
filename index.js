var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, '/img')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
});

var Botkit = require('botkit');
var chapter1 = require('./chapter1/chapter1');

var controller = Botkit.slackbot({
  debug: true,
  json_file_store: 'history'
});

// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxp-65935158950-65935159094-66097948724-14037759ce',
}).startRTM();


controller.hears('start',['direct_message'],function(bot,message) {
  bot.reply(message,{
    attachments: [
        {
            "text": "Help! I tried to reset my password but nothing happened!",
            "color": "#7CD197",
            "image_url": "http://thehobbit.herokuapp.com:3000/hobbit1.png"
        }
    ]});

  controller.storage.users.save({id: message.user, step:'1_1'}, function(err) {  });

  chapter1.init(controller);

});