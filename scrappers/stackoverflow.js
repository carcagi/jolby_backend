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
    this.tags = tags;
  }
};
async function getDesc(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html2 = await res.text();
  const $$ = cheerio.load(html2);
  return $$('section.mb32.fs-body2.fc-medium.pr48 div').text();
};

async function createJobsFrom($) {
  return Promise.all(
    $('.-job').map(async function (elem) {
      const title = $(this).find('h2').text();
      const company = $(this).find('h3 span').first().text();
      const id = $(this).attr('data-jobid');
      const time = $(this).find('.fc-orange-400').text();
      const image = $(this).find('img').attr('src');
      const stackLink = $(this).find('h2 a').attr('href');
      const applyLink = 'https://www.stackoverflow.com' + stackLink;
      const description = stackLink ? await getDesc(applyLink) : ''; // si true ejecuta codigo a la izq, false despues de los puntos
      const tags = getTagsFrom(description);
      const job = new Job(title, id, company, time, image, applyLink, tags);
      const dic = {};
      dic[id] = JSON.stringify(job);
      return dic;
    }).toArray()
  );
}

async function main() {
  const response = await fetch('https://stackoverflow.com/jobs?l=remote&d=20&u=Km&r=true&c=cop&ms=Student&mxs=MidLevel', {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  const offers = await createJobsFrom($);
  //console.log(offers[0]);
  //console.log(offers.length);
  fs.writeFile('./data/stack_jobs.json', JSON.stringify(offers), (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
  });
};
main();
