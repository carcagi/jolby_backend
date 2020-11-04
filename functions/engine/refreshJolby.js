#!/usr/bin/node

/** 
 * Script to refresh the data in Jolby App manually (Endpoint equivalent)
 */ 

const admin = require("firebase-admin");
const {loadData} = require("./webScanner");
const {scan} = require("./webScanner");
const serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jolby-dda21.firebaseio.com",
});

// Refres the data in Jolby app
async function refresh() {
    try {
      const data = await scan();
      await loadData(admin.firestore(), data);
    } catch (error) {
        console.log(error);
    }
    } 
refresh();
