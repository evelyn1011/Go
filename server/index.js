const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

// const cors = require('cors')
// app.use(cors())

app.use(express.static('upload'))

const router = require('./router')
const order = require('./order')
const advert = require('./advert')
const role = require('./role')

app.use('/',router)
app.use('/order',order)
app.use('/advert',advert)
app.use('/role',role)

app.listen(8089, ()=> {
  console.log('8089 connected')
})