module.exports = {

	'facebookAuth': {
		'clientID': 'your-secret-clientID-here', // your App ID
		'clientSecret': 'your-client-secret-here', // your App Secret
		'callbackURL': 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth': {
		'consumerKey': 'your-consumer-key-here',
		'consumerSecret': 'your-client-secret-here',
		'callbackURL': 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth': {
		'clientID': '1001825764156-oa42aphul3dbt6m9b1c4sqh4huf2mhbb.apps.googleusercontent.com',
		'clientSecret': '-ywKt_xfKayTkVZ2pK3zSJwi',
		'callbackURL': 'http://localhost:8080/auth/google/callback'
	}

};
