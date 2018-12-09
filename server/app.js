const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const appsettings = require('./appsettings.json')

const app = express()
app.set('port', process.env.PORT || 8080)
app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(cors())

var stories = [
  {
    id: 1,
    name: null,
    posted: new Date(Date.UTC(2018, 11, 1, 3, 24, 0, 0)),
    story: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat finibus ligula et tincidunt. Aenean suscipit nec nulla vel lobortis. Duis at risus libero. Nam sit amet diam aliquam, lobortis dolor ut, pellentesque dolor. Vivamus consequat, nisi scelerisque aliquam facilisis, dui mi semper lectus, eu egestas tortor sapien eget enim. Phasellus velit purus, consectetur a lorem et, efficitur iaculis urna. Nam sit amet ullamcorper metus, hendrerit blandit nunc. Nullam mollis eros sed tellus posuere, sit amet faucibus libero tincidunt. Vestibulum tempus odio mattis felis feugiat semper. Praesent rutrum pharetra feugiat. Mauris posuere, nisl quis maximus ultricies, felis augue ultrices mauris, ac bibendum purus nunc vel tellus. Nulla a egestas nisi. Duis pretium ut ante vitae consectetur. Fusce sed dolor sed dolor consequat lacinia."
  },
  {
    id: 2,
    name: 'Donec imperdiet',
    posted: new Date(Date.UTC(2018, 11, 1, 3, 12, 0, 0)),
    story: 'Proin enim enim, ullamcorper at neque blandit, congue ornare metus. Donec id urna eu ligula bibendum consectetur. Morbi fermentum gravida erat rutrum luctus. Nam malesuada libero sed sem condimentum pellentesque. Donec quis diam augue. In dapibus, nisl ut dapibus iaculis, lorem lectus imperdiet metus, non gravida mauris purus at velit. Suspendisse efficitur dui arcu, at condimentum diam eleifend eget. Pellentesque aliquam nibh sed condimentum tincidunt. Duis velit est, malesuada sit amet vulputate auctor, aliquam ac purus. Donec consectetur quis felis et fringilla. Donec porttitor, ligula ac maximus convallis, augue nisl semper tellus, vitae hendrerit sapien urna eget tellus. Maecenas quis ullamcorper lacus. Nunc sit amet aliquam velit. Suspendisse fermentum metus turpis.'
  },
  {
    id: 3,
    name: null,
    posted: new Date(Date.UTC(2018, 10, 17, 2, 43, 0, 0)),
    story: 'Praesent molestie in nisi eget imperdiet. Morbi at rutrum felis. In hac habitasse platea dictumst. Fusce velit quam, fringilla vitae congue auctor, mollis vel diam. Curabitur sed dapibus enim. Phasellus suscipit bibendum metus, vel pharetra lectus fringilla ac. Sed non dapibus orci, eu condimentum dolor. Curabitur mollis et nisi ac sagittis. Ut volutpat, felis vitae blandit euismod, purus augue tristique libero, et finibus tellus metus et ex. Donec scelerisque, erat in semper convallis, libero libero finibus erat, sit amet maximus orci arcu quis odio. Ut venenatis eros at aliquam faucibus.'
  },
  {
    id: 4,
    name: 'Aenean ullamcorper',
    posted: new Date(Date.UTC(2018, 10, 12, 23, 11, 0, 0)),
    story: 'In suscipit elementum metus, non vulputate eros vulputate sit amet. Vestibulum a leo fermentum, pulvinar nisl sit amet, fermentum augue. Ut ante sem, ornare vitae risus ut, fermentum eleifend justo. Cras dapibus tortor non ante semper euismod. Nullam at euismod nisi. Donec in nisl porta, mollis est eu, porta leo. Quisque scelerisque orci neque, accumsan interdum est dignissim vitae. Fusce tempor tempor arcu, vitae tincidunt orci feugiat ac. Vivamus quis erat nibh. Maecenas a semper dui. Nulla tincidunt dui vitae elit sagittis interdum.'
  },
  {
    id: 5,
    name: 'Nunc',
    posted: new Date(Date.UTC(2018, 10, 1, 6, 22, 0, 0)),
    story: 'Quisque at ipsum aliquet, tempor tortor et, vestibulum tortor. Morbi iaculis neque felis. Sed at nibh dictum, euismod metus quis, aliquam nisi. Nam fringilla facilisis rutrum. Donec sit amet suscipit neque. Phasellus tempor sem ac efficitur lacinia. Nulla ac elementum nunc. Vivamus sed rutrum risus. Nullam at tincidunt ligula, pretium tincidunt justo.'
  }

];

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

app.get('/api/stories', (req, res) => {
  res.send(
    stories
  )
})

app.post(`/api/stories`, async (req, res) => {
  var result = await validateAddStory(req)
  if (result.isValid) {
    console.log("valid")
    var story = {
      name: req.body.name,
      story: req.body.story,
      id: stories.length + 1,
      posted: new Date().getTime()
    }
    stories.push(story)
    res.send(story)

  }
  else {
    res.status(400)
    res.send(result.message)
  }
})

app.listen(app.get('port'))
