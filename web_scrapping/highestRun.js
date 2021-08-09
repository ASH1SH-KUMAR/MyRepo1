let matchLink ="https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-kolkata-knight-riders-28th-match-1216540/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request(matchLink , cb);
let matchData;

function cb(error , response , data)
{
   matchkadata(data);
}
function matchkadata(data)
{
  let myDocument = cheerio.load(data);
  let batTable = myDocument(".table.batsman");
  let name;
  let runs = -1;
  let strikeRate;
  for(let j = 0; j<batTable.length; j++)
  {
    let rows = myDocument(batTable[j]).find("tbody tr");
    for(let i = 0; i < rows.length-1; i++)
    {
       let alltd = myDocument(rows[i]).find("td");
       if(alltd.length>2)
       {
          let current = parseInt(myDocument(alltd[2]).text()); // use to convert string into int
          if(current>runs)
          {
            name = myDocument(alltd[0]).text();
            runs = current;
            strikeRate = myDocument(alltd[7]).text();
          }
      }
    }
}
  console.log(name);
  console.log(runs);
  console.log(strikeRate);
  
}