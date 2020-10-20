#!/usr/bin/node
const discard_keys = [ 
  /Senior/ig,
  /Sr/ig,
  /Marketing/ig,
  /Manager/ig,
  /Lead/ig,
  /Salesforce/ig,
  /Communications/ig,
  /Business/ig,
  /Analyst/ig,
  /Media/ig,
  /QA/g,
  /Experiencied/ig,
  /legal/ig,
  /Consultant/ig,
]
exports.filterOffer = function (title) {
    for(let i = 0; discard_keys[i]; i++) {
      if (discard_keys[i].test(title))
        return false;
    }
    return true;
};