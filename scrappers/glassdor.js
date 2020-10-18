#!/usr/bin/node
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const {getTagsFrom} = require("./regex.js");

class Job {
  constructor(title, id, company, time, image, applyLink, tags = []) {
    this.title = title;
    this.id = id;
    this.company = company;
    this.time = time;
    this.image = image;
    this.applyLink = applyLink;
    //this.description = description;
    this.tags = tags;
  }
};
async function getDesc(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html2 = await res.text();
  const $$ = cheerio.load(html2);
  return $$('#JobDescriptionContainer').text();
};

async function createJobsFrom($) {
  return Promise.all(
    $('li.jl').map(async function (elem) {
      const title = $(this).find('.jobInfoItem span').text();
      const company = $(this).find('.jobHeader span').text();
      const id = $(this).attr('data-id');
      const time = $(this).find('.d-flex div.pl-std').text();
      const image = $(this).find('img').attr('src');
      const glassLink = $(this).find('.e1rrn5ka2 a').attr('href');
      const applyLink = 'https://www.glassdoor.com' + glassLink;
      const description = glassLink ? await getDesc(applyLink) : ''; // si true ejecuta codigo a la izq, false despues de los puntos
      const tags = getTagsFrom(description);
      const job = new Job(title, id, company, time, image, applyLink, tags);
      const dic = {};
      dic[id] = JSON.stringify(job);
      return dic;
    }).toArray()
  );
}

async function main() {
  const response = await fetch('https://www.glassdoor.com/Job/remote-junior-jobs-SRCH_IL.0,6_IS11047_KO7,13.htm?industryId=1059', {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  const offers = await createJobsFrom($);
  //console.log(offers);
  //console.log(offers.length);
  fs.writeFile('./data/glass_jobs.json', JSON.stringify(offers), (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
  };
main();
