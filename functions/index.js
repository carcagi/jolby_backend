#!/usr/bin/node

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jolby-dda21.firebaseio.com"
});
const db = admin.firestore();

// Get all jobs
app.get('/api/v1/jobs', (req, res) => {
  (async () => {
      try {
          let jobPosts = db.collection('Jobs');
          let response = [];
          await jobPosts.get().then(querySnapshot => {
          let docs = querySnapshot.docs;
          for (let doc of docs) {
              const selectedItem = doc.data();
              response.push(selectedItem);
          }
          return response;
          });
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
  });

// Get a job
app.get('/api/v1/jobs/:item_id', (req, res) => {
  (async () => {
      try {
          const document = db.collection('Jobs').doc(req.params.item_id);
          let item = await document.get();
          const response = item.data();
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
  });

// Delete job
app.delete('/api/v1/delete/:item_id', (req, res) => {
  (async () => {
    try {
        const document = db.collection('Jobs').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send('Deleted succesfully!');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
  });

// Create a Job
app.post('/api/v1/create', (req, res) => {
  (async () => {
      try {
        await db.collection('Jobs').doc('/' + req.body.id + '/')
            .create({item: req.body.item});
        return res.status(200).send('Job offer created succesfully');
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
});


// update job
app.put('/api/update/:item_id', (req, res) => {
(async () => {
  try {
      const document = db.collection('Jobs').doc(req.params.item_id);
      await document.update({
          item: req.body.item
      });
      return res.status(200).send();
  } catch (error) {
      console.log(error);
      return res.status(500).send(error);
  }
  })();
});

exports.app = functions.https.onRequest(app); 