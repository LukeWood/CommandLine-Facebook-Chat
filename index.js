var login = require("facebook-chat-api");
var readline = require("readline");

var prompt = require('prompt');
var properties = [
	{name:"username"},
	    {
      name: 'password',
      hidden: true
    },
	{
		name:'who'
	}
  ];
  prompt.start();
  prompt.get(properties, function (err, result) {
    if (err) { return console.error(err); }
	var user = result.username;
    	var password = result.password;	
	var who = result.who;
    login({email:user,password:password},function(err,api)
	{
		if(err) return console.error(err);
		api.setOptions({logLevel:"silent"});
		api.getUserID(who,function(err,data){
			if(err) return console.error(err);
			var listenfor = data[0].userID;
			console.log("Listening for: "+listenfor);
			api.listen(function(err, event){
				if(err) return console.error(err);
				if(event.type !== "message" || event.threadID !== listenfor)
					return;
				console.log(who+": "+ event.body);
				process.stdout.write("> ");
			});
			process.stdout.write("> ");
			rl.on("line",function(line){
			api.sendMessage(line,listenfor);
			console.log("Message sent");
			process.stdout.write("> ");
			});
		});
		var rl = readline.createInterface({input:process.stdin,output:process.stdout,terminal:false});
		
	});
	
});
