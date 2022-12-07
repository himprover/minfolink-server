/**
 * @swagger
 * /admin/profile/information/image:
 *   put:
 *     summary: "내 프로필 이미지 수정"
 *     description: 내 프로필 이미지 링크 수정
 *     tags: [Admin/Profile/Information]
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   files:
 *                      type: object
 *                      description: "변경하고 싶은 이미지 파일"
 *
 *     responses:
 *       "200":
 *         description: "정상적으로 변경 됨"
 *       "400":
 *         description: "잘못 된 파일"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *
 */

/**
 * @swagger
 * /admin/profile/information/image:
 *   delete:
 *     summary: "내 프로필 이미지 삭제"
 *     description: 내 프로필 이미지 삭제
 *     tags: [Admin/Profile/Information]
 *     produces:
 *     - "application/json"
 *
 *     responses:
 *       "204":
 *         description: "정상적으로 삭제 됨"
 *       "401":
 *         description: "인증 정보 잘못 됨"
 *
 */
