require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

const discordStrategy = require('./strategies/discordstrategy');
const db = require('./database/database.js');

db.then(() => console.log(`[ ${chalk.yellow('LOG')} ]`, 'Connected to MongoDB.')).catch((err) => { console.log(`[ ${chalk.yellow('LOG')} ]`, err) });


// Routes
const auth = require('./routes/auth.js');
const dashboard = require('./routes/dashboard.js');
const users = require('./routes/users.js');
const index = require('./routes/index.js');

app.use(session({
	secret: process.env.SECRET_KEY,
	cookie: {
		maxAge: 60000 * 60 * 24
	},
	saveUninitialized: false,
	name: 'discord.oauth2'
}));

app.use(express.static(path.join(__dirname, 'public')));

// Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);
app.use('/dashboard', dashboard);

app.listen(port, () => { console.log(`[ ${chalk.yellow('LOG')} ]`, 'Now listening to requests on http://localhost:' + port); });