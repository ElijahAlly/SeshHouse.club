"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const db_1 = __importDefault(require("../db"));
const file_1 = require("../types/file");
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const router = new koa_router_1.default();
/**
 * @swagger
 * /api/file:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Files
 *     summary: Upload a file and save metadata
 *     description: Uploads a file to UploadThing and saves the metadata in PostgreSQL.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *               user_id:
 *                 type: string
 *                 description: The ID of the user uploading the file
 *               type:
 *                 type: string
 *                 enum:
 *                   - profile_picture
 *                   - event_thumbnail
 *                   - event_image
 *                   - cafe_item_thumbnail
 *                   - cafe_item_image
 *                   - hero_image
 *                 description: The type of the file being uploaded
 *     responses:
 *       '201':
 *         description: File uploaded and metadata saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     file_url:
 *                       type: string
 *                       description: URL of the uploaded file
 *                     user_id:
 *                       type: string
 *                       description: User ID of the file uploader
 *                     uploaded_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of when the file was uploaded
 *                     type:
 *                       type: string
 *                       description: Type of the uploaded file
 *       '400':
 *         description: Bad request. Missing required fields or file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.post('/api/file', isAuthenticated_1.default, async (ctx) => {
    const { user_id, file_url, uploaded_at, type } = ctx.request.body;
    if (!file_url || !user_id || !uploaded_at || !type) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'File_url, user_id, uploaded_at, and type are required'
        };
        return;
    }
    try {
        const result = await db_1.default.query('INSERT INTO files (user_id, file_url, uploaded_at, type) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, file_url, uploaded_at, type]);
        let user = null;
        if (type === file_1.FileType.PROFILE_PICTURE) {
            await db_1.default.query('UPDATE users SET profile_picture = $1 WHERE id = ' + user_id, [file_url]);
            user = (await db_1.default.query('SELECT * FROM users where id = ' + user_id)).rows[0];
        }
        console.log(user);
        ctx.status = 201;
        ctx.body = {
            code: 201,
            status: 'success',
            data: {
                file: result.rows[0],
                user
            }
        };
    }
    catch (err) {
        console.error(err);
        ctx.status = 500;
        ctx.body = {
            code: 500,
            status: 'error',
            message: 'Internal Server Error'
        };
    }
});
exports.default = router;
//# sourceMappingURL=file.js.map