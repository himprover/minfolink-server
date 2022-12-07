/**
 * @swagger
 * /admin/profile/article/item:
 *   post:
 *     summary: "아티클 새로 생성"
 *     description: article 새로 생성
 *     tags: [Admin/Profile/Article]
 *     produces:
 *     - "application/json"
 *
 *     responses:
 *       "201":
 *         description: "정상적으로 생성 됨"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *
 */

/**
 * @swagger
 * /admin/profile/article/item:
 *   delete:
 *     summary: "아티클 삭제"
 *     description: article 삭제
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
 *                      description: "삭제하고 싶은 아티클 아이디"
 *     responses:
 *       "204":
 *         description: "정상적으로 삭제 됨"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *       "404":
 *         description: "해당하는 아티클 id"
 *
 */
