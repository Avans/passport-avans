# Passport-Avans

Passport strategy for authenticating with Avans using the OAuth 1.0 API.

This module lets you authenticate using Avans in your Node.js applications. By plugging into Passport, Avans authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.

## Installation

	$ npm install passport-avans

## Usage

### Configure Strategy

In order to identify your application to avans, specify the consumer key, consumer secret, and callback URL within options.
You can get and specify this options @ https://publicapi.avans.nl/newconsumer/


    var passport = require('passport')
    , AvansStrategy = require('passport-avans').Strategy;

    passport.use(new AvansStrategy({
        consumerKey: AVANS_CONSUMER_KEY,
        consumerSecret: AVANS_CONSUMER_SECRET,
        callbackURL: CALLBACK_URL
      },
      function(token, tokenSecret, profile, done) {

        done();
      }
    ));


#### Authenticate Requests

Use passport.authenticate(), specifying the 'avans' strategy, to authenticate requests.

For example, as route middleware in an Express application:

    app.get('/auth/avans', passport.authenticate('avans'));

    app.get('/auth/avans/callback',
      passport.authenticate('avans', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


## Credits
Paul Wagener

## License

[WTFPL](http://www.wtfpl.net/)
