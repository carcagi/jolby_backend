#!/usr/bin/node

// Calculates time in days since a job offer was posted in their original
// job board pased a unix timestamp.
exports.timeCalculator = function (timestamp) {
  dateNow = Date.now();
  var delta = Math.abs(dateNow - timestamp) / 1000;

  var seconds = Math.floor((delta)/1000);
  var minutes = Math.floor(seconds/60);
  var hours = Math.floor(minutes/60);
  var days = Math.floor(hours/24);
  return (days + "d");
}