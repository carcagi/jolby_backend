#!/usr/bin/node
/**
 * Stackoverflow scrapper 
 * 
 */
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {getTagsFrom} = require("./tags_getter.js");
const {filterOffer} = require("./jobs_filter.js");

//Job objects constructor
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

//getDesc get the description from an offer to extract the tags from it
async function getDesc(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html2 = await res.text();
  const $$ = cheerio.load(html2);
  return $$('section.mb32.fs-body2.fc-medium.pr48 div').text();
};

//Return an array of dictionaries {id: job object}
async function createJobsFrom($) {
  return Promise.all(
    $('.-job').map(async function (elem) {
      const title = $(this).find('h2').text();
      if (filterOffer(title)) {
        const company = $(this).find('h3 span').first().text();
        const id = $(this).attr('data-jobid');
        const time = $(this).find('.fc-orange-400').text();
        let image = $(this).find('img').attr('src');
        image = (image === "") ? "https://thirsty-bhaskara-9f8dd9.netlify.app/static/media/logo.2be84f51.png" : image; // si true ejecuta codigo a la izq, false despues de los puntos
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

//Main function - Scrapper
exports.stackoverflow = async function () {
  const response = await fetch('https://stackoverflow.com/jobs?l=remote&d=20&u=Km&r=true&c=cop&ms=Student&mxs=MidLevel', {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  const offers = await createJobsFrom($);
  return JSON.stringify(offers);
};
