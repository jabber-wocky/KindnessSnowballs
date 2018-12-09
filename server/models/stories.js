const options = { useNewUrlParser: true}
module.exports = (appsettings) => {
  var module = {};
  
  module.all = async () => {
    var mongoClient = require("mongodb").MongoClient

    let client = await mongoClient.connect(appsettings.connectionString, options)
    try {
      var db = client.db('snowball')
      return await db.collection('stories').find().toArray()
    }  
    finally {
      client.close()
    }
  }


  module.add = async (story) => {


    var mongoClient = require("mongodb").MongoClient
    let client = await mongoClient.connect(appsettings.connectionString, options)
    try {
      var db = client.db('snowball')
      story.posted = new Date();
      var insert_result = await db.collection('stories').insertOne(story)
      console.log("insert_result", insert_result)
      return insert_result.ops;
    }
    finally {
      client.close()
    }
  }

  return module
}