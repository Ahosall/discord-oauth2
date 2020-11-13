const router = require('express').Router();

router.get('/', (req, res) => {
	res.status(200).end();
});

module.exports = router;