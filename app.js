const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
const db = mongoose.connection
const routes = require('./routes')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// POST 新增表單資料資料接收
app.post('/create', (req, res) => {
  const restaurant = req.body
  Restaurant.create(
    {
      name: restaurant.name,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    }
  )
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})

app.get("/sort", (req, res) => {
  const type = req.query.type
  Restaurant.find()
    .lean()
    .sort(type)
    .then(restaurants => res.render('index', { restaurants, type }))
    .catch(err => console.log(err))
})


handlebars.registerHelper('IsSortBy', function (sort, type, options) {
  if (sort === type) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})


// 搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const searchRestaurant = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLocaleLowerCase()))
  res.render('index', { restaurant: searchRestaurant, keyword: keyword })
})


app.listen(port, () => {
  console.log(`The Server is now listening to http//localhost:${port}`)
})

