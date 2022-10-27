/**
 * @swagger
 * /admin/profile/sns/item:
 *   post:
 *     summary: "sns 새로 생성"
 *     description: sns 새로 생성
 *     tags: [Admin/Profile/Sns]
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
 * /admin/profile/sns/item:
 *   delete:
 *     summary: "sns 삭제"
 *     description: sns 삭제
 *     tags: [Admin/Profile/Sns]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   snsId:
 *                      type: string
 *                      description: "삭제하고 싶은 Sns 아이디"
 *     responses:
 *       "204":
 *         description: "정상적으로 삭제 됨"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *       "404":
 *         description: "해당하는 SNS id 없음"
 *
 */
