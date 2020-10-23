#!/usr/bin/node
const { glassdoor } = require("./glassdoor.js");
//const {jrdev} = require("./jrdevjobs.js");
async function main() {
  const jsonstr = await glassdoor();
  const ob = await JSON.parse(jsonstr);
  console.log(ob[1])
}
main();
/**
const {timeCalculator} = require("./timeCalculator.js");
console.log(timeCalculator(1596240000));*/