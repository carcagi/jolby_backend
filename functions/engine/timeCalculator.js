#!/usr/bin/node
exports.timeCalculator = function (timestamp) {
  // get the days of published
  dateNow = Date.now();
  var delta = Math.abs(dateNow - timestamp) / 1000;

  var seconds = Math.floor((delta)/1000);
  var minutes = Math.floor(seconds/60);
  var hours = Math.floor(minutes/60);
  var days = Math.floor(hours/24);
  return (days + "d");
}