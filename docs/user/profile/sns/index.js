/**
 * @swagger
 * /user/profile/sns:
 *   get:
 *     summary: "유저 SNS 정보 조회"
 *     description: 유저 sns(sns 링크) 정보 조회
 *     tags: [User]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "link"
 *       in: "query"
 *       description: "조회 할 유저의 고유 link 값"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "정상적으로 response"
 *       "404":
 *         description: "해당 link에 맞는 유저 없음"
 *
 */
