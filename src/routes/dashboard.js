const router = require('express').Router();

function isAuthorized(req, res, next) {
	if (req.user) {
		console.log("user is logged in.");
		console.log(req.user)
		next();
	} else {
		console.log("User is not logged in.")
		res.redirect('/auth');
	}
}

// GET /dashboard
router.get('/', isAuthorized, (req, res) => {
	res.render('pages/dashboard', { page: "Dashboard", data: req})
});

router.get('/settings', isAuthorized, (req, res) => {
	res.send(200)
});

module.exports = router;