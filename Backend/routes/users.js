var express = require('express');
var router = express.Router();
const { mongodb, dbName, dbUrl, MongoClient } = require('./../config/dbConfig')
const { hashPassword, hashCompare, createToken, validate } = require('../common/auth');
const { ObjectId } = require('mongodb');

// get all users
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

// get one users
router.get('/get', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = client.db(dbName)
    const collection = db.collection('All Accounts')
    let user = await collection.findOne({ email: req.query.email })
    // console.log(user);
    if (user) {
      res.status(200).send(user)
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

// user login
router.get('/login', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = client.db(dbName)
    const collection = db.collection('All Accounts')
    let user = await collection.aggregate([{ $match: { email: req.query.email } }]).toArray()
    if (user.length) {
      if (req.query.password === undefined || req.query.password === null) {
        let token = createToken({ name: user[0].name, email: user[0].email })
        res.status(200).send({ message: 'Login successful', userData: user, tokenData: token })
      }
      else {
        // let passwordCheck = await hashCompare(req.query.password, user[0].password)
        if (await hashCompare(req.query.password, user[0].password)) {
          let token = createToken({ name: user[0].name, email: user[0].email })
          res.status(200).send({ message: 'Login successful', userData: user, tokenData: token })
        }
        else {
          res.status(400).send({ message: 'Invalid login credentials' })
        }
      }
    }
    else {
      res.status(400).send({ message: 'Invalid login credentials' })
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

// user signup
router.post('/signup', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = client.db(dbName)
    const collection = db.collection('All Accounts')
    await collection.insertOne(req.body)
    res.status(201).send({ message: 'Signup successful', data: req.body })
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
router.put('/update', async (req, res) => {
  const client = new MongoClient(dbUrl)
  await client.connect()
  try {
    const db = client.db(dbName)
    const collection = db.collection('All Accounts')
    req.body.age = parseInt(req.body.age)
    let resData = await collection.findOneAndUpdate({ email: req.query.email }, { $set: req.body })
    let userData = await collection.findOne({ _id: new mongodb.ObjectId(resData.value._id) })
    res.status(200).send({ message: 'User profile successfully updated', data: userData })
  }
  catch (error) {
    console.log(error);
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