const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('./config/mongoose')

const handlebars = require('handlebars')
const routes = require('./routes')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


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

