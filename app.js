const express = require('express');
require('dotenv').config();
const app = express();

const http = require('http');
const https = require('https');

const cors = require('cors');
require('better-module-alias')(__dirname);

const router = require('./routers/index');

const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

app.use(cors());

// 포트번호 5000으로 실행
app.set('port', 5000);

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 listen 시작');
});

app.use(express.json());

// passport 초기화
const passport = require('passport');
app.use(passport.initialize());

app.use(router);

// swagger
const { swaggerUi, specs } = require('@swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
