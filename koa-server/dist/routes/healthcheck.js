"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const router = new koa_router_1.default();
/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Ping endpoint
 *     description: Returns a simple 'pong' message to check if the server and database are both up and running properly.
 *     responses:
 *       200:
 *         description: Successful response with 'pong' message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: pong 🏓
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/ping', async (ctx) => {
    try {
        ctx.body = {
            code: 200,
            status: 'success',
            data: 'pong 🏓'
        };
    }
    catch (err) {
        console.error(err);
    }
});
/**
 * @swagger
 * /api/whisper:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Whisper endpoint
 *     description: Returns a simple 'shhh' message to check if server authentication middleware is working correctly.
 *     responses:
 *       200:
 *         description: Successful response with 'shhh' message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: shhh 🤫
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/whisper', isAuthenticated_1.default, async (ctx) => {
    try {
        ctx.body = {
            code: 200,
            status: 'success',
            data: 'shhh 🤫'
        };
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = router;
//# sourceMappingURL=healthcheck.js.map