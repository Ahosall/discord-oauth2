require('dotenv').config();

const express = require('express');
const firebase = require('firebase');
const chalk = require('chalk');
const session = require('express-session');
const passport = require('passport');

const firebaseConfig = {
	apiKey: process.env.APIKEY,
	authDomain: process.env.PROJECTID + ".firebaseapp.com",
	databaseURL: "https://" + process.env.PROJECTID + ".firebaseio.com",
	projectId: process.env.PROJECTID,
	storageBucket: process.env.PROJECTID + ".appspot.com",
	messagingSenderId: process.env.MESSAGINGSENDERID,
	appId: "1:" + process.env.MESSAGINGSENDERID + ":web:" + process.env.APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const port = process.env.PORT || 3000;
const app = express();

const discordStrategy = require('./strategies/discordstrategy');


// Routes
const auth = require('./routes/auth.js');
const index = require('./routes/index.js');

app.use(session({
	secret: process.env.SECRET_KEY,
	cookie: {
		maxAge: 60000 * 60 * 24
	},
	saveUninitialized: false
}))

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/', index);
app.use('/auth', auth);

app.listen(port, () => {
	console.log(`[ ${chalk.yellow('LOG')} ]`, 'Now listening to requests on http://localhost:' + port);
})

