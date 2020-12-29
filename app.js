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



app.listen(port, () => {
  console.log(`The Server is now listening to http//localhost:${port}`)
})

