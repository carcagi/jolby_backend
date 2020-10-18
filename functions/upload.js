  
/* eslint-disable no-loop-func */
/* eslint-disable consistent-return */
var admin =  require('firebase-admin');
var serviceAccount = require('./permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jolby-dda21.firebaseio.com"
});

const firestore = admin.firestore();
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../scrappers/data')

fs.readdir(directoryPath, (err, data) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err)
    }

    for (let file of data) {
        //var lastDotIndex = file.lastIndexOf('.')

        var job_list = require('../scrappers/data/' + file);

        for (let i = 0; i in job_list; i++) {
          obj = Object.entries(job_list[i]);
          console.log();  
          //const object = JSON.parse(obj[0])
            firestore
                //.collection(file.substring(0, lastDotIndex))
                .collection('Jobs')
                .doc(obj[0][0])
                .set(JSON.parse(obj[0][1]))
                // eslint-disable-next-line promise/always-return
                .then((docRef) => {
                    console.log('Document written with ID: ', docRef.id)
                })
                .catch((error) => {
                    console.error('Error adding document: ', error)
                });
        }
    }
});