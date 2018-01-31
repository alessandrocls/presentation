var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users')
var controllerTransactions = require('../controllers/transactions')
var passport = require('passport')

/* GET home page. */
router.get('/', UserController.isAuthenticate, UserController.viewDashboard);


router.get('/profile', UserController.isAuthenticate, UserController.viewProfile)

router.get('/profile/edit', UserController.isAuthenticate, UserController.viewEditProfile)
router.post('/profile/edit', UserController.editProfile)




router.get('/transaction', UserController.isAuthenticate, UserController.viewFormTransaction)

router.post('/transaction', UserController.insertTransaction)

router.get('/report', UserController.viewReport)

router.get('/report/delete/:id', UserController.deleteTransaction)

router.get('/logout', function (req, res) {
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router;
