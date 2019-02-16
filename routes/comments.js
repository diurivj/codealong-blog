const router = require('express').Router()
const Comment = require('../models/Comment')
const Post = require('../models/Post')

router.post('/new/:id', (req, res, next) => {
  const { _id } = req.user
  const { id } = req.params
  Comment.create({ ...req.body, owner: _id })
    .then(doc => {
      console.log(doc)
      Post.findByIdAndUpdate(id, { $push: { comments: doc._id } }, { new: true })
      .then((updated) => {
        console.log(updated)
        res.redirect(`/posts/${id}`)
      })
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router
