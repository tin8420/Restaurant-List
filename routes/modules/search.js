// 搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const searchRestaurant = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLocaleLowerCase()))
  res.render('index', { restaurant: searchRestaurant, keyword: keyword })
})
