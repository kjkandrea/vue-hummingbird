const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const app = express();

db.sequelize.sync();
// db.sequelize.sync({ force : true });
passportConfig();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // 요청해서 온 json데이터를 파싱
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'cookiesecret',
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).send('안녕 멈무')
});

app.get('/main', (req, res) => {
  res.send('나는 메인페이지야')
});

app.use('/user', userRouter);

app.post('/post', (req, res) => {
  if (req.isAuthenticated()) { // 로그인 되어있는지 검사


  }
})

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중..`)
})