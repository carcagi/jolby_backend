const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {loadData} = require("./webScanner");
const {scan} = require("./webScanner");
const serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jolby-dda21.firebaseio.com",
});

async function refresh() {
    try {
      const data = await scan();
      await loadData(admin.firestore(), data);
    } catch (error) {
        console.log(error);
    }
    } 
refresh();