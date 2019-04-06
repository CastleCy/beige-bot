const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
});

var delaynotify = ( function() {
    var timernotify = 0;
    return function(callback, ms) {
        clearTimeout (timernotify);
        timernotify = setTimeout(callback, ms);
    };
})();
var delaynotify2 = ( function() {
    var timernotify2 = 0;
    return function(callback, ms) {
        clearTimeout (timernotify2);
        timernotify2 = setTimeout(callback, ms);
    };
})();
var delaymute = ( function() {
    var timermute = 0;
    return function(callback, ms) {
        clearTimeout (timermute);
        timermute = setTimeout(callback, ms);
    };
})();
var delaymute2 = ( function() {
    var timermute2 = 0;
    return function(callback, ms) {
        clearTimeout (timermute2);
        timermute2 = setTimeout(callback, ms);
    };
})();

client.on("message", async message => {
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "notify") {
	  if(message.member.roles.has('564127523974152242')) {
			const alreadyrecieve = await message.channel.send("You already recieve notifications!");
			const alreadyrecievehint = await message.channel.send("Use 'b mute' when this message is deleted to stop the pings.");
			message.delete();
			delaynotify(function(){
				alreadyrecieve.delete();
				alreadyrecievehint.delete();
			}, 10000 );
		} else {
			message.member.addRole('564127523974152242')
			const willrecieve = await message.channel.send("You'll recieve notifications now!");
			const willrecievehint = await message.channel.send("Use 'b mute' when this message is deleted to leave the notification squad.");
			message.delete();
			delaynotify2(function(){
				willrecieve.delete();
				willrecievehint.delete();
			}, 10000 );
		}
  }
  if(command === "mute") {
	  if(message.member.roles.has('564127523974152242')) {
			message.member.removeRole('564127523974152242')
			const willmute = await message.channel.send("You won't recieve any notifications anymore!");
			const willmutehint = await message.channel.send("Use 'b notify' when this message is deleted to rejoin the notification squad.");
			message.delete();
			delaymute(function(){
				willmute.delete();
				willmutehint.delete();
			}, 10000 );
		} else {
			const alreadymuted = await message.channel.send("You already muted video notifications!");
			const alreadymutedhint = await message.channel.send("Use 'b notify' when this message is deleted to join the notification squad.");
			message.delete();
			delaymute2(function(){
				alreadymuted.delete();
				alreadymutedhint.delete();
			}, 10000 );
		}
  }
  
  if(command === "huzzah") {
    message.channel.send("Hoorah!");
  }
});

client.login(config.token);