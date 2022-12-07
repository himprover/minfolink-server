/**
 * @swagger
 * /admin/profile/article/font:
 *   put:
 *     summary: "아티클 폰트 색상 수정"
 *     description: article 폰트 색상 수정
 *     tags: [Admin/Profile/Article]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   articleId:
 *                      type: string
 *                      description: "변경하고 싶은 아티클 아이디"
 *                   color:
 *                      type: string
 *                      description: "변경하고 싶은 색상코드"
 *
 *     responses:
 *       "200":
 *         description: "정상적으로 변경 됨"
 *       "400":
 *         description: "잘못 된 색상코드"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *       "404":
 *         description: "해당하는 아티클 아이디 없음"
 *
 */
