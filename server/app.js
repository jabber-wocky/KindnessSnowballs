const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const appsettings = require('./appsettings.secret.json')
const stories = require('./models/stories')(appsettings)

const app = express()
app.set('port', process.env.PORT || 8080)
app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(cors())

const axios = require("axios")
const http = axios.create({
  withCredentials: false,
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }
})

var validateAddStory = async (req) => {

  try {
    var recaptcha = await http.request('https://www.google.com/recaptcha/api/siteverify',
      {
        method:'post',
        params: {
          'secret': appsettings.recaptchaKey,
          'response': req.body.token
        }
      }
    )
  }
  catch(error) {
    return { isValid: false, errorMessage: 'failed recaptcha check' }
  }
  if (req.body.story === null || req.body.story.length <= 0)
    return { isValid: false, errorMessage: 'story is required.'}

  return { isValid: true }
}

app.get('/api/stories', async (req, res) => {
  res.send(
    await stories.all()
  )
})

app.post(`/api/stories`, async (req, res) => {
  var result = await validateAddStory(req)
  if (result.isValid) {
    console.log("valid")
    var story = {
      name: req.body.name,
      story: req.body.story,
    }
    var result = await stories.add(story)
    res.send(result)

  }
  else {
    res.status(400)
    res.send(result.message)
  }
})

app.listen(app.get('port'))
