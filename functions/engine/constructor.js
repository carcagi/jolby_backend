#!/usr/bin/node
// Class constructor for job offers
const cheerio = require('cheerio');
const fetch = require('node-fetch');


// Class constructor for Jolby's objects
exports.Job = class Job { constructor(title, id, company, time, image, applyLink, tags = []) {
  this.title = title;
  this.id = id;
  this.company = company;
  this.time = time;
  this.image = image;
  this.applyLink = applyLink;
  this.tags = tags;
  }
};

// Returns the descrption of an offer pased its url and a Jquery string
exports.getDesc = async function (url, queryString) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
  const html2 = await res.text();
  const $$ = cheerio.load(html2);
  return $$(queryString).text();
};
