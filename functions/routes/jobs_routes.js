#!/usr/bin/node

const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

// Get all jobs
router.get('/api/v1/jobs', (req, res) => {
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
router.get('/api/v1/jobs/:item_id', (req, res) => {
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
router.delete('/api/v1/jobs/:item_id', (req, res) => {
  (async () => {
    try {
        const document = db.collection('Jobs').doc(req.params.item_id);
        await document.delete();
        return res.status(200).send('Deleted successfully!');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
  });

// Create a Job
router.post('/api/v1/jobs', (req, res) => {
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
});


// update job
router.put('/api/v1/jobs/:item_id', (req, res) => {
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

module.exports = router;