const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const db = mongoose.connection
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

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
  ).then(res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/restaurants/:id/update', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('update', { restaurant }))
    .catch(err => console.log(err))
})

app.post('/restaurants/:id/update', (req, res) => {
  const id = req.params.id
  const request = req.body
  Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = request.name
      restaurant.category = request.category
      restaurant.image = request.image
      restaurant.location = request.location
      restaurant.phone = request.phone
      restaurant.google_map = request.google_map
      restaurant.rating = request.rating
      restaurant.description = request.description
      return restaurant.save()
    }).then(res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))

})
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const searchRestaurant = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLocaleLowerCase()))
  res.render('index', { restaurant: searchRestaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`The Server is now listening to http//localhost:${port}`)
})

