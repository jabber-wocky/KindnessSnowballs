const functions = require('../functions')
var btoa = require('btoa')

module.exports = (() => {
  return {
    login : async (data) => {
      try {
        await functions.validateRecaptcha(data.token)
      }
      catch(error) {
        console.error(error)
        return { isValid: false, errorMessage: 'Failed recaptcha check' }
      }

      if (data.username !== functions.appsettings.admin_username 
        || data.password !== functions.appsettings.admin_password) {
        return { isValid: false, errorMessage: 'Invalid credentials' }
      }
      
      return { isValid: true }
    },
    validate: async (req) => {
      var base64Credentials = "Basic " + btoa(functions.appsettings.admin_username+":"+functions.appsettings.admin_password)
      if (req.headers.authorization !== base64Credentials) 
        return { isValid: false, errorMessage: 'Invalid credentials' }
      return { isValid: true }
    }
  }
})();