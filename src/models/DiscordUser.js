const firebase = require('firebase')

const database = firebase.database()

const UserSchema = [];

database.ref('/').once('value')
  .then(async function(snap) {
  	if (snap.val() != null) {
        UserSchema.push({
          user: await snap.val().user.id
        })
        console.log(UserSchema)
  	}
});

const user = module.exports = UserSchema.user;