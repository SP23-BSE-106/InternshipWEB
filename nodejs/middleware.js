const express = require('express')
const app = express()
// app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)

app.use((req, res, next) => {
  console.log(' middleware 1')
  next()
})

app.use((req, res, next) => {
  console.log(' middleware 2')
  next()
})

app.use((req, res, next) => {
  console.log(' middleware 3')
  next()
})