
var init = function(controller){

    controller.hears('go (.*)',['direct_message'],function(bot,message) {

    bot.reply(message,'You go to the ' + message.match[1]);

    controller.storage.users.save({id: message.user, step:'1_1'}, function(err) {  });
  });

};

exports.init = init;