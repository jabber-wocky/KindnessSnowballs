const functions = require('../functions')
const {ObjectId} = require('mongodb')

module.exports = (() => {
  return {
    all : async () => {
    
      let client = await functions.getDbClient()
      try {
        var db = client.db('snowball')
        return await db.collection('stories').find({ active : { $ne: false }}).toArray()
      }  
      finally {
        client.close()
      }
    },
    add : async (story) => {
      let client = await functions.getDbClient()
      try {
        var db = client.db('snowball')
        story.posted = new Date();
        var insert_result = await db.collection('stories').insertOne(story)
        return insert_result.ops;
      }
      finally {
        client.close()
      }
    },
    remove : async(data) => {
      console.log("data", data)
      let client = await functions.getDbClient()
      try {
        var db = client.db('snowball')
        return await db.collection('stories').updateOne( { _id : ObjectId(data.id)}, { '$set' : { active: false}})
      }
      finally { 
        client.close()
      }
    },
    validate : async (data) => {
      try {
        await functions.validateRecaptcha(data.token)
      }
      catch(error) {
        return { isValid: false, errorMessage: 'failed recaptcha check' }
      }
    
      if (data.story === null || data.story.length <= 0)
        return { isValid: false, errorMessage: 'story is required.'}
    
      return { isValid: true }
    
    }
  }
})();