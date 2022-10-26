const { v4 } = require('uuid');

const uuidForDb = () => {
	const tokens = v4().split('-');
	return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

module.exports = { uuidForDb };
