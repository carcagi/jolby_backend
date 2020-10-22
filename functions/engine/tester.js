#!/usr/bin/node
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {filterOffer} = require("./jobs_filter");

console.log(filterOffer('Senior Backend Software Engineer            '));

//cron.schedule('* * * * *', () => {
 // console.log('running a task every minute');
//});
//const job_list = [{"3671860242":"{\"title\":\"Junior Full Stack Developer\",\"id\":\"3671860242\",\"company\":\"Summitworks Technologies\",\"time\":\"15d\",\"image\":\"https://media.glassdoor.com/sql/259205/summitworks-technologies-squarelogo.png\",\"applyLink\":\"https://www.glassdoor.com/partner/jobListing.htm?pos=101&ao=983182&s=149&guid=0000017537bc9bd785c6a0c8d07a447e&src=GD_JOB_AD&t=SRFJ&vt=w&ea=1&cs=1_878c3a67&cb=1602957914838&jobListingId=3671860242\",\"tags\":[\"Python\",\"C++\",\"C#\",\"Java\",\"Java\",\"SQL\",\"AWS\",\"Full Stack\",\"Full Stack\",\"Frontend\"]}"},{"3671859495":"{\"title\":\"Junior AWS Engineer\",\"id\":\"3671859495\",\"company\":\"Summitworks Technologies\",\"time\":\"15d\",\"image\":\"https://media.glassdoor.com/sql/259205/summitworks-technologies-squarelogo.png\",\"applyLink\":\"https://www.glassdoor.com/partner/jobListing.htm?pos=102&ao=983182&s=149&guid=0000017537bc9bd785c6a0c8d07a447e&src=GD_JOB_AD&t=SRFJ&vt=w&ea=1&cs=1_e74e4eac&cb=1602957914843&jobListingId=3671859495\",\"tags\":[\"Python\",\"Java\",\"SQL\",\"NoSQL\",\"AWS\",\"DataBases\"]}"}]
/**for (let obj of job_list) {
  obj = JSON.parse(obj);
  job = JSON.parse(obj.id)
  console.log(job.title);
};

for (let i = 0; i in job_list; i++) {
  obj = Object.entries(job_list[i]);
  console.log(obj[0][0]);
};
async function main() {
  let response = await fetch('https://www.jrdevjobs.com/jobs#query=remote&page=1', {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html = await response.text();
  let $ = cheerio.load(html);
  const title = $('.card-subtitle').html();
  console.log(title);
  };
main();
/**'use strict';
const ofers = require('./data.json');
console.log(ofers[98874]);
for (let job in ofers) {
  ofers[job] = JSON.parse(ofers[job])
}
console.log(typeof(ofers[98874]))
ofers[98874].title = "Hola Mundo"
console.log(ofers[98874]) */
