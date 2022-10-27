/**
 * @swagger
 * /auth/singin:
 *   post:
 *     summary: "로그인"
 *     description: 로그인 accessToken, refreshToken 발급
 *     tags: [Auth]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "accessToken"
 *       in: "query"
 *       description: "facebook 로그인으로 받은 accessToken"
 *       type: "string"
 *     responses:
 *       "201":
 *         description: "정상 로그인, accessToken, refreshToken 반환"
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accessToken:
 *                     type: string
 *                   refreshToken:
 *                     type: string
 *       "400":
 *         description: "올바르지 않은 accessToken"
 *       "403":
 *         description: "회원가입이 안되어있음"
 *
 */
