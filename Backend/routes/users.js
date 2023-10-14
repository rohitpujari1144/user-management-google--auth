var express = require('express');
var router = express.Router();
const { mongodb, dbName, dbUrl, MongoClient } = require('./../config/dbConfig')
const { hashPassword, hashCompare, createToken, validate } = require('../common/auth');
const { ObjectId } = require('mongodb');

// get all users using
router.get('/', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = client.db(dbName)
    const collection = db.collection('All Accounts')
    let allUsers = await collection.find().toArray()
    console.log(allUsers.length);
    if (allUsers.length) {
      res.status(200).send(allUsers)
    }
    else {
      res.status(404).send({ message: "No Users Found" })
    }
  }
  catch (error) {
    // console.log(error);
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
});

// get one users using
router.get('/get', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = client.db(dbName)
    const collection = db.collection('All Accounts')
    let user = await collection.findOne({ email: req.query.email })
    if (user) {
      let token = createToken({ name: user.name, email: user.email })
      // console.log(token);
      res.status(200).send({ data: user, token: token })
    }
    else {
      res.status(404).send({ message: "No Users Found" })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
});

// user signup using
router.post('/signup', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = client.db(dbName)
    const collection = db.collection('All Accounts')
    await collection.insertOne(req.body)
    let token = createToken({ name: req.body.name, email: req.body.email })
    // console.log(token);
    res.status(201).send({ message: 'Signup successful', data: req.body, token: token })
  }
  catch (error) {
    // console.log(error);    
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
})

// update user info
router.put('/update', validate, async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = client.db(dbName)
    const collection = db.collection('All Accounts')
    // console.log(req.body);
    req.body.age = parseInt(req.body.age)
    let resData = await collection.findOneAndUpdate({ email: req.query.email }, { $set: req.body })
    let userData = await collection.findOne({ _id: new mongodb.ObjectId(resData.value._id) })
    res.status(200).send({ message: 'User profile successfully updated', data: userData })
  }
  catch (error) {
    // console.log(error);
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
})

// delete user
router.delete('/delete-user', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = client.db(dbName)
    const collection = db.collection('All Accounts')
    await collection.deleteOne({ _id: new mongodb.ObjectId(req.query.docId) })
    res.status(200).send({ message: 'User successfully deleted' })
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error', error })
  }
  finally {
    client.close()
  }
})

module.exports = router;
