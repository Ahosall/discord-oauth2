const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const firebase = require('firebase');

const DiscordUser = require('../models/DiscordUser');

const database = firebase.database()

passport.serializeUser((user, done) => {
	console.log("Serializing User")
	console.log(user)
	done(null, user.discordId)
});

passport.deserializeUser((id, done) => {
	
});

passport.use(new DiscordStrategy({
	
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: process.env.CLIENT_REDIRECT,
	scope: ['identify', 'guilds']

}, async (accessToken, refreshToken, profile, done) => {
	try	{
		const user = await DiscordUser.find(user => user.discordId == profile.id);

		console.log(user)
		if (user) 
			done(null, user);
		else {
			let id = Date.now().toString()
			await database.ref(`/user/discordID/${id}`).set({ avatar: profile.avatar, discordId: profile.id, username: profile.username });
			await database.ref(`/user/discordID/${id}`).once('value')
			 .then(async function(snap) { 
			 	let newUser = await snap.val()
				console.log('→', newUser)
				done(null, newUser);
			});

		}
	} 
	catch(err) {
		console.log(err);
		done(err, null)
	}
}));