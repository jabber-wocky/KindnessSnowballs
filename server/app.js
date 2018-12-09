const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
app.set('port', process.env.PORT || 8080)
app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(cors())

const storyService = require('./services/story')
const authService = require('./services/auth')

app.get('/api/stories', async (req, res) => {
  res.send(
    await storyService.all()
  )
})

app.post(`/api/stories`, async (req, res) => {
  var result = await storyService.validate(req.body)
  if (result.isValid) {
    var result = await storyService.add(req.body)
    res.send(result)
  }
  else {
    res.status(400)
    res.send(result.message)
  }
})

app.delete('/api/stories', async (req, res) => {
  var result = await authService.validate(req)
  if (result.isValid) {
    try {
      var result = await storyService.remove(req.query)
      console.log("result", result)
      res.send(result)
    }
    catch(error) {
      res.status(400)
      res.send(error)  
    }
  }
  else {
    res.status(400)
    res.send(result.message)
  }
})

app.post('/api/auth', async (req, res) => {
  var result = await authService.login(req.body)
  
  if (result.isValid) {
    res.send("valid")
  }
  else {
    res.status(400)
    res.send(result.errorMessage)
  }
})


app.listen(app.get('port'))
