const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	avatar: { type: String, required: true },
	discordId: { type: String, required: true },
	username: { type: String, required: true },
	guilds: { type: Array, required: true }
})

const DiscordUser = module.exports = mongoose.model('User', UserSchema);