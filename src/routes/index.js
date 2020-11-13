const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('pages/home', { page: "home", data: req });
});

module.exports = router;