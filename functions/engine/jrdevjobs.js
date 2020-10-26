#!/usr/bin/node
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

async function createJobsFromJson(json) {
  const jrdevJobs = json.results
  const jolbyJobs = []
  for (offer of jrdevJobs) {
    const title = offer.position;
    if (filterOffer(title)) {
      const company = offer.company_name;
      const id = offer.id;
      const time = offer.posted;
      const image = "https://thirsty-bhaskara-9f8dd9.netlify.app/static/media/logo.2be84f51.png";
      const applyLink = offer.url;
      const description = offer.full_description;
      const tags = getTagsFrom(description);
      const job = new Job(title, id, company, time, image, applyLink, tags);
      const dic = {};
      dic[id] = JSON.stringify(job);
      jolbyJobs.push(dic);
    } else {
      continue;
    }
  }
  return jolbyJobs;
}
 
exports.jrdev = async function () {
  let response = await fetch('https://www.jrdevjobs.com/api/jobs?page=4', {
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'}
  });
  const res = await response.json();
  const offers = await createJobsFromJson(res);
  return JSON.stringify(offers);
};
