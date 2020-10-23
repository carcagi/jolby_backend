#!/usr/bin/node
const fetch = require('node-fetch');
const {getTagsFrom} = require("./tags_getter.js");
const {filterOffer} = require("./jobs_filter.js");
const {timeCalculator} = require("./timeCalculator.js");
const { Job } = require("./constructor");

// Api consummer of arc.dev
exports.arc = async function () {
  let response = await fetch('https://ximrnvjlq7-dsn.algolia.net/1/indexes/Pioneer_job_posts_production/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.0&x-algolia-application-id=XIMRNVJLQ7&x-algolia-api-key=7c36eb43e38ceee5bfa9cbfd641b9d92', {
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
               },
    body: JSON.stringify({"params":"filters=(experience_levels%3Ajunior%20OR%20experience_levels%3Agraduate)%20AND%20(NOT%20experience_levels%3Asenior)%20AND%20(is_closed%3D0)&offset=90&length=10"}),
  });
  const res = await response.json();
  const offers = await createJobsFromJson(res);
  return JSON.stringify(offers);
};

// Creates jobs objects pased a json string with the arc jovs dev info
// Returns a list of dectionaries { id: jobObject }
async function createJobsFromJson(json) {
  const arcJobs = json.hits
  const jolbyJobs = []
  for (offer of arcJobs) {
    const title = offer.title;
    if (filterOffer(title)) {
      const company = offer.company_name;
      const id = offer.objectID;
      const time = timeCalculator(offer.posted_timestamp);
      let image = offer.company_logo_url;
      image = (image === "") ? "https://thirsty-bhaskara-9f8dd9.netlify.app/static/media/logo.2be84f51.png" : image; // si true ejecuta codigo a la izq, false despues de los puntos
      const applyLink = offer.url;
      const description = offer.description;
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
