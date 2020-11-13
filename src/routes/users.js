const router = require('express').Router();

function isAuthorized(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/auth');
	}
}

// GET /users
router.get('/', isAuthorized, (req, res) => {
	res.render('pages/users', { page: 'Account', data: req })
});

module.exports = router;