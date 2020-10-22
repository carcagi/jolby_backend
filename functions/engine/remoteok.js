#!/usr/bin/node
const cheerio = require('cheerio');
fetch = require('node-fetch');
const fs = require('fs');

function Job(title, id, company, tags, time, image, applyLink) {
  this.title = title;
  this.id = id;
  this.company = company;
  this.tags = tags;
  this.time = time;
  this.image = image;
  this.applyLink = applyLink;
};

async function main() {
  let response = await fetch('https://remoteok.io/remote-jobs', {
    headers: { 'User-Agent': 'Chrome/51.0.2704.103' }
  });
    html = await response.text();
  let $ = cheerio.load(html)
  const ofers = {};
  $('tr.job').each(function(i, elem) {
    const title = $(this).find('.preventLink h2').text();
    const company = $(this).find('.companyLink h3').text();
    const tags = []
    $(this).find('td.tags h3').each(function(j, el) {
      tags[j] = $(this).text();
    });
    const id = $(this).attr('data-id');
    const time = $(this).find('time').attr('datetime');
    const image = $(this).find('img').attr('src');
    const applyLink = "https://remoteok.io/l/" + id;
    const job = new Job(title, id, company, tags, time, image, applyLink);
    json = JSON.stringify(job);
    ofers[id] = json;
  });
  console.log(ofers);
  console.log(ofers.length);
  fs.writeFile('data.json', JSON.stringify(ofers), (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
  console.log("JSON data is saved.");
  };
main();