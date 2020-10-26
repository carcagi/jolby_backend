const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

// Get all users
router.get('/api/v1/users', (req, res) => {
(async () => {
    try {
        let jobPosts = db.collection('Users');
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

// Get a user
router.get('/api/v1/users/:item_id', (req, res) => {
(async () => {
try {
    const document = db.collection('Users').doc(req.params.item_id);
    let item = await document.get();
    const response = item.data();
    return res.status(200).send(response);
} catch (error) {
    console.log(error);
    return res.status(500).send(error);
}
})();
});

// Delete user
router.delete('/api/v1/users/:item_id', (req, res) => {
(async () => {
try {
    const document = db.collection('Users').doc(req.params.item_id);
    await document.delete();
    return res.status(200).send('Deleted succesfully!');
} catch (error) {
    console.log(error);
    return res.status(500).send(error);
}
})();
});

// Create an user
router.post('/api/v1/users', (req, res) => {
(async () => {
try {
    await db.collection('Users').doc(req.body.id)
        .set(req.body);
    return res.status(200).send('User created succesfully');
} catch (error) {
    console.log(error);
    return res.status(500).send(error);
}
})();
});


// Update an user
router.put('/api/v1/users/:item_id', (req, res) => {
(async () => {
try {
const document = db.collection('Users').doc(req.params.item_id);
let item = req.body
await document.update({
    name: req.body.name
});
return res.status(200).send("Edited succesfully");
} catch (error) {
console.log(error);
return res.status(500).send(error);
}
})();
});
  
module.exports = router;