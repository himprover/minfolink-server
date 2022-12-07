/**
 * @swagger
 * /admin/profile/article/sequence:
 *   put:
 *     summary: "아티클 순서 수정"
 *     description: article 순서 수정
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
 *                   sequence:
 *                      type: string
 *                      description: "변경하고 싶은 순서 값"
 *
 *     responses:
 *       "200":
 *         description: "정상적으로 변경 됨"
 *       "400":
 *         description: "잘못 된 순서 값"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *       "404":
 *         description: "해당하는 Article ID 없음"
 *       "409":
 *         description: "중복 된 순서 값"
 *
 */
