/**
 * @swagger
 * /admin/profile/article/link:
 *   put:
 *     summary: "아티클 링크 수정"
 *     description: article 링크 수정
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
 *                   link:
 *                      type: string
 *                      description: "변경하고 싶은 링크"
 *
 *     responses:
 *       "200":
 *         description: "정상적으로 변경 됨"
 *       "400":
 *         description: "잘못 된 링크 규칙"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *       "404":
 *         description: "해당하는 아티클 아이디 없음"
 *
 */
