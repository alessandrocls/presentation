var express = require('express');
var router = express.Router();
var controller = require('../controllers/users')
var passport = require('passport')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'TADA - iExpend' });
});

router.get('/login', function(req, res, next) {
    res.render('login', {});
});

// router.get('/register', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/register', controller.localRegister);
router.post('/login', passport.authenticate('local'), controller.localLogin);

module.exports = router;