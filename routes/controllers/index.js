var passport = require('passport')
var Transaction = require('../models/transactions')
var User = require('../models/users')

function localRegister (req, res, next) {
    User.register(new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function (err) {
        if (err) {
            return res.render('login', {})
        }

        console.log('user registered!');
        passport.authenticate('local')(req, res, function () {
            console.log("..............", req.session)
            req.session.save(function (err) {
                if (err) {
                    return next(err)
                }
                res.redirect('dashboard/profile')
            })
            // res.redirect('dashboard/profile')
        })
    })
}


function isAuthenticate (req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

function isLogin (req, res, next) {
    if (req.isAuthenticated())
        res.redirect('/profile');

    return next();
}

function logout (req, res) {
    req.session.destroy()
    res.redirect('/')
}


module.exports = {
    viewProfile: viewProfile,
    localRegister: localRegister,
    isAuthenticate: isAuthenticate,
    isLogin: isLogin,
    logout: logout
}