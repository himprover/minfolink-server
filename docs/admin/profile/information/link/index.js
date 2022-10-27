/**
 * @swagger
 * /admin/profile/information/link:
 *   put:
 *     summary: "내 고유 링크 수정"
 *     description: 내 고유 링크 수정
 *     tags: [Admin/Profile/Information]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
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
 *       "409":
 *         description: "중복 된 링크"
 *
 */
