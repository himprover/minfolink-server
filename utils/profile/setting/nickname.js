/*
	링크 설정 규칙
    2글자 이상, 10글자 이하
    영어, 숫자, 한글, '_' 만 허용
*/
const Reg = /^[A-Za-z가-힣0-9_]{2,10}$/;

const nicknameCheck = async (nickname) => {
	if (!Reg.test(nickname)) {
		return { status: 400, message: '올바르지 않은 규칙' };
	}

	return { status: 200, message: '사용가능' };
};

module.exports = { nicknameCheck };
