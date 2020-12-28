const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get("/sort", (req, res) => {
  const type = req.query.type
  Restaurant.find()
    .lean()
    .sort(type)
    .then(restaurants => res.render('index', { restaurants, type }))
    .catch(err => console.log(err))
})


module.exports = router
