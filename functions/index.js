const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");

const app = express();

const serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jolby-dda21.firebaseio.com",
});

app.use(cors({ origin: true }));

// Create a Job
app.post('/api/v1/create', (req, res) => {
  (async () => {
      try {
        await db.collection('Jobs').doc(req.body.id)
            .set(req.body);
        return res.status(200).send('Job offer created succesfully');
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
app.get("/hello-world", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

// Routes
app.use(require("./routes/jobs_routes"));

exports.app = functions.https.onRequest(app);