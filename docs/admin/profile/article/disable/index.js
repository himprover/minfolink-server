/**
 * @swagger
 * /admin/profile/article/disable:
 *   put:
 *     summary: "아티클 공개여부 수정"
 *     description: article 공개여부
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
 *                   disable:
 *                      type: boolean
 *                      description: "변경하고 싶은 공개여부"
 *     responses:
 *       "200":
 *         description: "정상적으로 변경 됨"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *       "404":
 *         description: "해당하는 아티클 id 없음"
 *
 */
