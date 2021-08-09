let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-kolkata-knight-riders-16th-match-1216515/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request(matchLink , cb);

function cb(error , response , data)
{
    matchdata(data);
}

function matchdata(data)
{
    let highestWicketTaker;
    let wickets = -1;
    let economy;
    let myDocument = cheerio.load(data);

    let bowlerTable = myDocument(".table.bowler");
    for(let i = 0; i <bowlerTable.length;i++)
    {
        let allRows = myDocument(bowlerTable[i]).find("tbody tr");

        for(let j = 0; j < allRows.length;j++)
        {
            let alltd = myDocument(allRows[j]).find("td");

            let currentwk = parseFloat(myDocument(alltd[4]).text());
            let currentEcn = parseFloat(myDocument(alltd[5]).text());
            if(currentwk>wickets || (currentwk==wickets && currentEcn<economy))
            {
                highestWicketTaker = myDocument(alltd[0]).text();
                wickets = currentwk;
                economy = currentEcn;
            }

        }
    }

    console.log(highestWicketTaker);
    console.log(wickets);
    console.log(economy);
}