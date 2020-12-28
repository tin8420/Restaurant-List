const express = require('express')
const router = express.Router()


const Restaurant = require('../../models/restaurant')

//首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort('name_en')
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))

})

// POST 新增表單資料資料接收
router.post('create', (req, res) => {
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

module.exports = router
