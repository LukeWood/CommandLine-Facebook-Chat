#! /usr/bin/env node
var login = require("facebook-chat-api");
var readline = require("readline");
var read = require('read')

var config = require(__dirname+"/config.json");

if(process.argv.length == 2){
	console.log("Please provide a person to chat with");
	process.exit();
}

var user = config.user;
read({ prompt: 'Password for '+user+": ", silent: true }, function(er, password) {
	var who = process.argv.slice(2).join(" ");
	login({email:user,password:password},function(err,api)
		{
			if(err) return console.error(err);

			api.setOptions({logLevel:"silent"});

			api.getUserID(who,function(err,data){
				if(err) return console.error(err);
				var listenfor = data[0].userID;
				api.listen(function(err, event){
					if(err) return console.error(err);
					if(event.type !== "message" || event.threadID !== listenfor)
						return;
					console.log("\n"+who+": "+ event.body);
					process.stdout.write("> ");
				});
				process.stdout.write("> ");
				rl.on("line",function(line){
				api.sendMessage(line,listenfor);
				process.stdout.write("> ");
				});
			});
			var rl = readline.createInterface({input:process.stdin,output:process.stdout,terminal:false});
	});

})
