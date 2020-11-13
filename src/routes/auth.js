const router = require('express').Router();
const passport = require('passport');

// GET /auth 
router.get('/', passport.authenticate('discord'));

// GET /auth/logout
router.get('/logout', (req, res) => {
	if (re.user) {
		req.logout();
		res.redirect('/');
	}
});

// GET /auth/redirect 
router.get('/redirect', passport.authenticate('discord', {
	failureRedirect: '/forbidden',
	successRedirect: '/dashboard'
}), (req, res) => {
	res.send(req.user);
});

module.exports = router;