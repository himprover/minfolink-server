const express = require('express');
require('dotenv').config();
const app = express();

const cors = require('cors');

const router = require('./routers/index');

const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

// 포트번호 5000으로 실행
app.set('port', 5000);

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 listen 시작');
});

app.use(express.json());
app.use(cors());
app.use(router);
