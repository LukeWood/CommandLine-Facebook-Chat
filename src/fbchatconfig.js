#! /usr/bin/env node
var fs = require("fs");
if(process.argv.length == 2){
  console.log("Please provide your email address as an argument to this script.");
  process.exit();
}
fs.writeFile(__dirname+"/config.json", JSON.stringify({user:process.argv.slice(2).join(" ")}), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("email address updated to "+process.argv.slice(2).join(" "));
});
