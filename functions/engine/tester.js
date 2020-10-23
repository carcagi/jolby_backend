#!/usr/bin/node
const { arc } = require("./arcdev.js");
const { Job, getDesc } = require("./constructor.js");
const { glassdoor } = require("./glassdoor.js");
const { jrdev } = require("./jrdevjobs.js");
const { stackoverflow } = require("./stackoverflow.js");
//const {jrdev} = require("./jrdevjobs.js");
async function main() {
  const ob = await jrdev();
  console.log(ob)
}
//const ob = new Job('Offer', 'Offer', 'Offer', 'Offer', 'Offer', 'Offer', ['Offer']);
//console.log(ob)

main();
/**
const {timeCalculator} = require("./timeCalculator.js");
console.log(timeCalculator(1596240000));*/