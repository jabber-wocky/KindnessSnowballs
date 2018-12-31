const appsettings = process.env.NODE_ENV === 'production' ? process.env : require('./appsettings.secret.json')
const axios = require("axios")
const http = axios.create({
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})


module.exports = (() => {
  return {
    appsettings: appsettings,
    validateRecaptcha : (token) => {
      return http.request('https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'post',
          params: {
            'secret': appsettings.recaptchaKey,
            'response': token
          }
        }
      )

    },
    getDbClient : () => {
      var mongoClient = require("mongodb").MongoClient
      return mongoClient.connect(appsettings.MONGODB_URI, { useNewUrlParser: true })
    },
    getDbName : () => {
      return appsettings.MONGODB_DATABASE
    }
  }
})();