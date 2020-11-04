#!/usr/bin/node
/**
 * Stackoverflow scrappers file 
 * 
 */

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {filterOffer} = require("./jobs_filter.js");
const { getDesc, Job } = require("./constructor");
const {getTagsFrom} = require("./tags_getter.js");

//Main scrapper function for stackoverflow
exports.stackoverflow = async function () {
  const response = await fetch('https://stackoverflow.com/jobs?l=remote&d=20&u=Km&r=true&c=cop&ms=Student&mxs=MidLevel', {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  const offers = await createJobsFrom($);
  return JSON.stringify(offers);
};

// Creates job objects pased a cheerio instance
// Returns a list of dectionaries { id: jobObject }
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
        const descQuery = 'section.mb32.fs-body2.fc-medium.pr48 div';
        const description = stackLink ? await getDesc(applyLink, descQuery) : ''; // si true ejecuta codigo a la izq, false despues de los puntos
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
