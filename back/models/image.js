module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    src: {
      type: DataTypes.STRING(200),
      allowNull: false
    }, // createdAt, updateAt 자동 생성
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
    db.Image.hasMany(db.Comment);
  };
  return Image;
}