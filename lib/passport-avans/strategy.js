/**
 * Module dependencies.
 */
var util = require('util')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The Avans authentication strategy authenticates requests by delegating to
 * Avans using the OAuth protocol.
 *
 * Options:
 *   - `consumerKey`     identifies client to Avans
 *   - `consumerSecret`  secret used to establish ownership of the consumer key
 *   - `callbackURL`     URL to which Avans will redirect the user after obtaining authorization
 *
 * Examples:
 *
 *     passport.use(new AvansStrategy({
 *         consumerKey: '123-456-789',
 *         consumerSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/avans/callback'
 *       },
 *       function(token, tokenSecret, profile, done) {
 *         return done();
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'https://publicapi.avans.nl/oauth/request_token';
  options.accessTokenURL = options.accessTokenURL || 'https://publicapi.avans.nl/oauth/access_token';
  options.userAuthorizationURL = options.userAuthorizationURL || 'https://publicapi.avans.nl/oauth/saml.php';

  OAuthStrategy.call(this, options, verify);
  this.name = 'avans';
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);

/**
 * Retrieve user profile from Avans.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 * @param {String} token
 * @param {String} tokenSecret
 * @param {Object} params
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {
    this._oauth.get('https://publicapi.avans.nl/oauth/people/@me', token, tokenSecret, function (err, body, res) {
      if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
      if (!body) { return done(new InternalOAuthError('Empty body')); }

      try {
        done(null, JSON.parse(body));
      } catch(e) {
        done(e);
      }
    });
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
