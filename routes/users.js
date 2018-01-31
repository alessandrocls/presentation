var express = require('express');
var router = express.Router();
var userController = require('../controllers/users')
var passport = require('passport')

/* GET users listing. */
router.get('/', userController.viewProfile)



// router.post('/login', passport.authenticate('local'), userController.localLogin)

module.exports = router;
