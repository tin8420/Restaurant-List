const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const showRestaurant = restaurantList.results.filter(item => item.id === Number(id))
  res.render('show', { restaurant: showRestaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const serchRestautant = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLocaleLowerCase()))
  res.render('index', { restaurant: serchRestautant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`The Server is now listening to http//localhost:${port}`)
})

