const admin = require("firebase-admin");
const app = express();
const cors = require("cors");
const express = require("express");
const functions = require("firebase-functions");
const {loadData} = require("./engine/webScanner");
const {scan} = require("./engine/webScanner");
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jolby-dda21.firebaseio.com",
});

app.use(cors({ origin: true }));


app.get("/api/v1/refresh", (req, res) => {
  (async () => {
    try {
      const data = await scan();
      await loadData(admin.firestore(), data);
      return res.status(200).send("Jolby has been refresh successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

// Routes
app.use(require("./routes/jobs_routes"));
app.use(require("./routes/users_routes"));

exports.app = functions.https.onRequest(app);