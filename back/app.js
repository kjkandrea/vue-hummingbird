const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('안녕 멈무')
});

app.get('/main', (req, res) => {
  res.send('나는 메인페이지야')
});

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중..`)
})