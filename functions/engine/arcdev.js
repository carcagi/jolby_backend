#!/usr/bin/node
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const {getTagsFrom} = require("./tags_getter.js");
const {filterOffer} = require("./jobs_filter.js");

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
    method: 'POST',
    headers: { 'Accept': 'application/json',
               'Accept-Encoding': 'gzip, deflate, br',
               'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
               'Connection': 'keep-alive',
               'Content-Length': '172',
               'content-type': 'application/json',
               'Host': 'ximrnvjlq7-dsn.algolia.net',
               'Origin': 'https://arc.dev',
               'Referer': 'https://arc.dev/',
               'Sec-Fetch-Dest': 'empty',
               'ec-Fetch-Mode': 'cors',
               'Sec-Fetch-Site': 'cross-site',
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'
               }
  });
  const html2 = await res.text();
  const $$ = cheerio.load(html2);
  return $$('section.mb32.fs-body2.fc-medium.pr48 div').text();
};

async function createJobsFrom($) {
  return Promise.all(
    $('.-job').map(async function (elem) {
      const title = $(this).find('h2').text();
      if (filterOffer(title)) {
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
      } else {
        return null;
      }  
    }).toArray()
  );
}

async function main() {
  const response = await fetch('https://ximrnvjlq7-dsn.algolia.net/1/indexes/Pioneer_job_posts_production/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.0&x-algolia-application-id=XIMRNVJLQ7&x-algolia-api-key=7c36eb43e38ceee5bfa9cbfd641b9d92', {
    method: 'POST',
    //JSON.stringify
    body: {"params":"filters=(experience_levels%3Ajunior%20OR%20experience_levels%3Agraduate)%20AND%20(NOT%20experience_levels%3Asenior)%20AND%20(is_closed%3D0)&offset=90&length=10"},
    headers: { 'Accept': 'application/json',
               'Accept-Encoding': 'gzip, deflate, br',
               'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
               'Connection': 'keep-alive',
               'Content-Length': '172',
               'content-type': 'application/json',
               'Host': 'ximrnvjlq7-dsn.algolia.net',
               'Origin': 'https://arc.dev',
               'Referer': 'https://arc.dev/',
               'Sec-Fetch-Dest': 'empty',
               'ec-Fetch-Mode': 'cors',
               'Sec-Fetch-Site': 'cross-site',
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'
               }
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
