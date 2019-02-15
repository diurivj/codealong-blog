const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const passport = require('passport')

function isLogged(req, res, next) {
  if (req.isAuthenticated()) return next()
  return res.redirect('/login')
}

router.get('/signup', (req, res, next) => {
  res.render('auth/signup')
})

router.post('/signup', (req, res, next) => {
  if (req.body.password != req.body.password2) {
    return res.render('auth/signup', { error: 'Please type the same password' })
  }
  User.register({ ...req.body }, req.body.password)
    .then(() => {
      passport.authenticate('local')(req, res, () => {
        return res.redirect('/profile')
      })
    })
    .catch(error => {
      res.render('auth/signup', { error })
    })
})

router.get('/login', (req, res, next) => {
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/profile')
})

router.get('/profile', isLogged, (req, res, next) => {
  User.findById(req.user._id).populate('posts')
    .then(user => {
      res.render('auth/profile', user)
    })
    .catch(error => {
      res.render('auth/profile', { error })
    })
})

router.get('/logout', (req, res, next) => {
  req.logOut()
  res.redirect('/')
})

module.exports = router
