const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))

})
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const showRestaurant = restaurantList.results.filter(item => item.id === Number(id))
  res.render('show', { restaurant: showRestaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const searchRestaurant = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLocaleLowerCase()))
  res.render('index', { restaurant: searchRestaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`The Server is now listening to http//localhost:${port}`)
})

