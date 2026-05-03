require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const engine = require('ejs-mate');
const { checkDbConnection } = require('./config/db');
const indexRoutes = require('./routes');

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRoutes);

const PORT = Number(process.env.PORT || 3000);

(async () => {
  try {
    await checkDbConnection();
    app.locals.dbConnected = true;
    console.log('✅ Database connected');
  } catch (error) {
    app.locals.dbConnected = false;
    console.warn('⚠️  Database not connected:', error.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
