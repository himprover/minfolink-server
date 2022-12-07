/**
 * @swagger
 * /admin/profile/information/name:
 *   put:
 *     summary: "내 정보 이름 수정"
 *     description: 내 정보 이름 수정
 *     tags: [Admin/Profile/Information]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   name:
 *                      type: string
 *                      description: "변경하고 싶은 이름"
 *
 *     responses:
 *       "200":
 *         description: "정상적으로 변경 됨"
 *       "400":
 *         description: "잘못 된 이름 규칙"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *
 */
