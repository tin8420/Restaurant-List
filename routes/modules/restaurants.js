const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


//  設定new頁面路由
router.get('/new', (req, res) => {
  res.render('new')
})



// 設定更新頁面路由
router.get('/:id/update', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('update', { restaurant }))
    .catch(err => console.log(err))
})


//  設定查看單一餐廳資訊路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// POST 修改表單資料資料接收
router.put('/:id', (req, res) => {
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

// POST 刪除特定餐廳資料接收
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(res.redirect('/'))
    .catch(err => console.log(err))

})


module.exports = router