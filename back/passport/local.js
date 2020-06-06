const passport = require('passport');
const bcrypt = require('bcrypt')
const { Strategy : LocalStrategy } = require('passport-local');
const db = require('../models')

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField : 'email', // req.body.email
    passwordField : 'password' // req.body.password
  }, async (email, password, done) => {
    try { 
      const exUser = await db.User.findOne({ where : { email } })
      if (!exUser) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' }) // 없는 회원이야
      }
      const result = await bcrypt.compare(password, exUser.password) // 패스워드 비교 (유저가 입력한 값, 데이터베이스의 값)
      if (result) {
        return done(null, exUser)
      } else {
        return done(null, false, { reason : '비밀번호가 틀립니다.' })
      }
    } catch (err) {
      console.error(err);
      return done(err)
    }
    
  }));
}