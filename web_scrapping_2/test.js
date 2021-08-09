let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/rajasthan-royals-vs-mumbai-indians-45th-match-1216541/full-scorecard";

let fs  = require("fs");
let cheerio = require("cheerio");
let request = require("request");

// request(matchLink,cb);
// function cb(error, response,data) 
// {
//     fs.writeFileSync("./matchData.html",data); // to write the data of match html file in the new file

// }
let matchData = fs.readFileSync("./matchData.html","utf8");
let myDocument = cheerio.load(matchData);
let matchInfo = myDocument(".batsman-cell.text-truncate").text();
console.log(matchInfo);