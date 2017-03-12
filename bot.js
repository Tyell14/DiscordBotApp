/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// import the discord.js module
const Discord = require('discord.js');
const auth = require("./auth.json");
const music = require('./musicPlayer');

// create an instance of a Discord Client, and call it bot
var bot = new Discord.Client();
music(bot,{
    prefix: '.', 
    global: false,   // Server-specific queues.
    maxQueueSize: 10 // Maximum queue size of 10.
});

// the token of your bot - https://discordapp.com/developers/applications/me
const token = auth.token;

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('I am ready!');
});

// create an event listener for messages
bot.on('message', message => {
	if (message.content.search(".help") === 0) {
		let text = "aait, here's the commands:\n\n" 
		+ ".quote:\n   Descrizione: Quota del testo (u don't say).\n   Usage: .quote testo da quotare\n          .quote 'utente' testo da quotare\n"
		+ ".play:\n   Descrizione: Cerca un video su youtube e ritorna il primo risultato.\n   Usage: .play nome video\n";
		
		let msg = "```" + text + "```" ;
        message.delete();
		message.channel.sendMessage(msg);
    }


    if (message.content === "guess who's bad?" || message.content === "guess who's bad" || message.content === "who's bad") {
        message.channel.sendMessage('SINBAD');
    }

    // quote
    if (message.content.search(".quote ") === 0) {
        let res = message.content.slice(7).split("'");
        // console.log(res);
        if (res.length >2){
            // first split is an empy string
            let author = res.splice(0,2).join("'").slice(1);
            let text = res.join("'").slice(1);
            var quote = ("```\n" + "By : " + author + "\n\n" + text + "```");
        }
        else
            var quote = "```" + message.content.slice(6) + "```" ;

        // message.edit(quote)
        //  .then(msg => console.log('Updated the content of a message'))
        //  .catch(console.error);
         message.delete();
         message.channel.sendMessage(quote);
    }  
});

// log our bot in
bot.login(token);