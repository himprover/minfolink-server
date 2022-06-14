const express = require('express');
const app = express();

// 포트번호 5000으로 실행
app.set('port', 5000);

app.get('/', (req, res) => {
	res.send('기본 / response');
});

app.listen(app.get('port'), () => {
	console.log(app.get('port'), '번 포트에서 listen 시작');
});
