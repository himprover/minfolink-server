const { pool, isArrayEmpty } = require('../../../utils/postgres');

/*
	링크 설정 규칙
    3글자 이상, 20글자 이하
    영어, 숫자, '_' 만 허용
*/
const linkReg = /^[A-Za-z0-9_]{3,20}$/;

const linkCheck = async (link) => {
	if (!linkReg.test(link)) {
		return { status: 400, message: '올바르지 않은 규칙' };
	}

	const getLinkSql = 'SELECT * FROM minfolink_user where link = $1';
	let dbLink;
	try {
		dbLink = (await pool.query(getLinkSql, [link])).rows;
	} catch (error) {
		return { status: 500, message: 'DB 조회 에러' + error };
	}

	// 유저 DB 조회 결과가 있으면 중복
	if (!isArrayEmpty(dbLink)) {
		return { status: 409, message: '중복된 링크' };
	}

	return { status: 200, message: '사용가능' };
};

module.exports = { linkCheck };
