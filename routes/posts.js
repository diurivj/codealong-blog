const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const uploadCloud = require('../helpers/cloudinary')

function isAuth(req, res, next) {
  if (req.isAuthenticated()) return next()
  return res.redirect('/login')
}

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Post.findById(id)
    .then(post => {
      res.render('posts/post', post)
    })
    .catch(error => {
      res.render('posts/post', { error })
    })
})

router.post(
  '/create',
  isAuth,
  uploadCloud.single('cover'),
  (req, res, next) => {
    Post.create({ ...req.body, cover: req.file.url })
      .then(doc => {
        User.findByIdAndUpdate(
          req.user._id,
          { $push: { posts: doc } },
          { new: true },
        ).then(() => {
          res.redirect('/profile')
        })
      })
      .catch(error => {
        res.render('/profile', { error })
      })
  },
)

module.exports = router
