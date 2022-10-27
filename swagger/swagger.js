const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'Minfolink API',
			description: 'MINFOLINK Backend Server API Docs',
		},
		servers: [
			{
				url: 'http://localhost:5000', // 요청 URL
			},
		],
	},
	apis: ['./docs/**/*.js'], //Swagger 파일 연동
};
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
