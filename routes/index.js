const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

/* GET home page */
router.get('/', (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then(posts => {
      res.render('index', { posts })
    })
    .catch(error => {
      res.render('index', { error })
    })
})

module.exports = router
