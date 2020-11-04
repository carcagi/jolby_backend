#!/usr/bin/node
/**
 * Glassdoor scrappers file
 */

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { getTagsFrom } = require("./tags_getter.js");
const { filterOffer } = require("./jobs_filter.js");
const { getDesc, Job } = require("./constructor");


//Main function for Glassdoor
exports.glassdoor = async function () {
  const response = await fetch('https://www.glassdoor.com/Job/remote-junior-jobs-SRCH_IL.0,6_IS11047_KO7,13.htm?industryId=1059', {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  const offers = await createJobsFrom($);
  return JSON.stringify(offers);
};


// Glassdoor's Scrapper
// Creates job objects pased a cheerio instance
// Returns a list of dectionaries { id: jobObject }
async function createJobsFrom($) {
  return Promise.all(
    $('li.jl').map(async function (elem) {
      const title = $(this).find('.jobInfoItem span').text();
      if (filterOffer(title)) {
        const company = $(this).find('.jobHeader span').text();
        const id = $(this).attr('data-id');
        const time = $(this).find('.d-flex div.pl-std').text();
        let image = $(this).find('img').attr('src');
        image = (image === "") ? "https://thirsty-bhaskara-9f8dd9.netlify.app/static/media/logo.2be84f51.png" : image; // si true ejecuta codigo a la izq, false despues de los puntos
        const glassLink = $(this).find('.e1rrn5ka2 a').attr('href');
        const applyLink = 'https://www.glassdoor.com' + glassLink;
        const descQuery = '#JobDescriptionContainer';
        const description = glassLink ? await getDesc(applyLink, descQuery) : ''; // si true ejecuta codigo a la izq, false despues de los puntos
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
