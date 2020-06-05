module.exports = (sequelize, DataTypes) => {
  // User 테이블을 생성하기 위해
  const User = sequelize.define('User' , {
    email : {
      type: DataTypes.STRING(40), // 40자 이내
      allowNull : false, // required
      unique: true, // 중복금지
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull : false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull : false
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci' // 한글 받기 위해서
  });
  User.associate = (db) => {

  };
  return User
}