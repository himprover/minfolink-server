/**
 * @swagger
 * /admin/profile/information/email:
 *   put:
 *     summary: "이메일 공개여부 수정"
 *     description: 내 프로필 이메일 공개여부 수정
 *     tags: [Admin/Profile/Information]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "disable"
 *       in: "query"
 *       type: boolean
 *       description: "이메일 공개 여부 값"
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
