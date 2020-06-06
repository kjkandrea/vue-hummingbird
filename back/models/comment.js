module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // 테이블 명 posts
    content: {
      type: DataTypes.TEXT, // 매우 긴 글
      allowNull: false
    }, // createdAt, updateAt 자동 생성
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // UserId
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
}