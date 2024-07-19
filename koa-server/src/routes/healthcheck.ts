import { Context } from "koa";
import Router from "koa-router";
const router = new Router();

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
router.get('/api/ping', async (ctx: Context) => {
    try {
        ctx.body = {
            code: 200,
            status: 'success',
            data: 'pong 🏓'
        }
    } catch (err) {
        console.error(err);
    }
});

export default router;