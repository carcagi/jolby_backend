#!/usr/bin/node
const cheerio = require('cheerio');
const fetch = require('node-fetch');
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
      if (filterOffer(title)) {
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
    } else {
      return null;
    }
    }).toArray()
  );
}

exports.glassdoor = async function () {
  const response = await fetch('https://www.glassdoor.com/Job/remote-junior-jobs-SRCH_IL.0,6_IS11047_KO7,13.htm?industryId=1059', {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  const offers = await createJobsFrom($);
  return JSON.stringify(offers);
};
