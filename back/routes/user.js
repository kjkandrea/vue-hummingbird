const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isNotLoggedIn, async (req, res, next) => {
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

    await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname
    });
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      if (info) {
        return res.status(401).send(info.reason)
      }
      return req.login(user, async (err) => { // 세션에 사용자 정보 저장 (어떻게? : serializeUser)
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.json(user)
      });
    })(req, res, next);
  } catch (err) {
    console.log(err)
    return next(err)
  }
});

router.post('/login',isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    if (info) {
      return res.status(401).send(info.reason)
    }
    return req.login(user, async (err) => { // 세션에 사용자 정보 저장 (어떻게? : serializeUser)
      if (err) {
        console.error(err);
        return next(err);
      }
      return res.json(user)
    });
  })(req, res, next)
});

router.post('/logout', isLoggedIn, (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    req.session.destroy(); // 선택 사항
    return res.status(200).send('로그아웃 되었습니다.');
  }
})

module.exports = router;