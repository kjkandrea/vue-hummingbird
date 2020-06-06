const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const app = express();

db.sequelize.sync();
// db.sequelize.sync({ force : true });
passportConfig();

app.use(morgan('dev'));
app.use(cors( 'http://localhost:3000' ));
app.use(express.json()); // 요청해서 온 json데이터를 파싱
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'cookiesecret'
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).send('안녕 멈무')
});

app.get('/main', (req, res) => {
  res.send('나는 메인페이지야')
});

app.post('/user', async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (exUser) { // 이미 회원가입 되어있으면
      return res.status(403).json({  // 거절
        errorCode: 1,
        message: '이미 회원가입 되어있습니다'
      });
    }

    const newUser = await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname
    });
    return res.status(201).json(newUser)
  } catch (err) {
    console.log(err)
    return next(err)
  }
});

const user = [

]

app.post('/user/login', (req, res) => {
})

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중..`)
})