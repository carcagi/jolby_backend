#!/usr/bin/node
const { arc } = require("./arcdev.js");
const {glassdoor} = require("./glassdoor.js");
const { jrdev } = require("./jrdevjobs.js");
const { stackoverflow } = require('./stackoverflow.js');


const scrappers = [glassdoor, stackoverflow, arc, jrdev];

// Scanns and srapps the websites available, and return a list of lists with the data founded
exports.scan = async function () {
  const jsonList = [];
  for (let jobBoard of scrappers) {
    try {
      const jsonJobs = await jobBoard();
      jsonList.push(jsonJobs);
    } catch (error) {
      console.log(error);
    }
  }
  return jsonList;
};

// Load data to the database pased a firestore instance, and the data to load
exports.loadData = async function (firestore, data) {
  for (let jobCollection of data) {
    jobCollection = JSON.parse(jobCollection);
    for (let i in jobCollection) {
      if (jobCollection[i] != null) {
        obj = Object.entries(jobCollection[i]);
        firestore
          .collection('Jobs')
          .doc(obj[0][0])
          .set(JSON.parse(obj[0][1]))
          .then( (doc) => {
              console.log('Document written with ID: ', doc.id)
          })
          .catch((error) => {
              console.error('Error adding document: ', error)
          });
      }
    }
  }
}
