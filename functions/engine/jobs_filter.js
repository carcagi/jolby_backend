#!/usr/bin/node
const discard_keys = [ 
  /Senior/img,
  /\nSenior/img,
  /Sr/ig,
  /Head/ig,
  /Marketing/ig,
  /Manager/ig,
  /Lead/ig,
  /Director/ig,
  /Salesforce/ig,
  /Sales/ig,
  /Expert/ig,
  /Executive/ig,
  /Communications/ig,
  /Business/ig,
  /Analyst/ig,
  /Media/ig,
  /QA/g,
  /Experienced/ig,
  /legal/ig,
  /Consultant/ig,
]

// Discards non related offers
exports.filterOffer = function (title) {
    for(let i = 0; discard_keys[i]; i++) {
      if (discard_keys[i].test(title))
        return false;
    }
    return true;
};