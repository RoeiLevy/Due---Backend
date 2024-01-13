var config;

// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  config = {
    dbURL : process.env.dbURL
  }
} else {
  // we are in development - return the dev keys!!!
  // config = require('./prod')
  config = require('./dev')
}

module.exports = config