const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const {db, port} = require('./config/config')

// Настраиваем приложение
const app = express() // инициализируем фреймворк
const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs'
}) // настраиваем шаблонизатор
const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

app.engine('hbs', hbs.engine) // регистрируем движок
app.set('view engine', 'hbs') // устанавливаем движок по умолчанию
app.set('views', 'templates') // папка, из которой будут браться шаблоны

app.use(express.urlencoded({extended: true})) // парсим данные res.body
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect(db, dbOptions)
    app.listen(port || 3000, () => {
      console.log('Сервер запущен...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
