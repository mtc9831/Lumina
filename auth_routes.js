function setup(app,handlers) {
	app.get('/auth/google',handlers.auth.googleSignIn);
	app.get('/auth/google/callback',handlers.auth.googleSignInCallback);
	app.get('/auth/facebook',handlers.auth.facebookSignIn);
	app.get('/auth/facebook/callback',handlers.auth.facebookSignInCallback);
	app.get('/auth/windowslive',handlers.auth.windowsliveSignIn);
	app.get('/auth/windowslive/callback',handlers.auth.windowsliveSignInCallback);
	app.get('/auth/linkedIn',handlers.auth.linkedInSignIn);
	app.get('/auth/linkedIn/callback',handlers.auth.linkedInSignInCallback);
	app.get('/auth/yahoo',handlers.auth.yahooSignIn);
	app.get('/auth/yahoo/return',handlers.auth.yahooSignInCallback);
	app.get('/auth/twitter',handlers.auth.twitterSignIn);
	app.get('/auth/twitter/callback',handlers.auth.twitterSignInCallback);
	
	app.get('/auth/local',handlers.auth.localSignIn);
	app.get('/auth/local/callback',handlers.auth.localSignInCallback);
	app.get('/user',handlers.ExternalUser.getExternalUsers);
	app.get('/user/:id',handlers.ExternalUser.getExternalUser);
	app.put('/user/:id',handlers.ExternalUser.updateExternalUser);
	app.get('/user/:first/:last/:email',handlers.ExternalUser.createExternalUser);
	console.log("Successfully set up routes");
};

exports.setup = setup;
