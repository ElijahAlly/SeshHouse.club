"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const db_1 = __importDefault(require("../db"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const router = new koa_router_1.default();
/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve a list of events
 *     description: Fetches a list of events from the database. This route requires authentication.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: Status code of the response
 *                 status:
 *                   type: string
 *                   description: Response status
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier of the event
 *                       title:
 *                         type: string
 *                         description: Title of the event
 *                       description:
 *                         type: string
 *                         description: Description of the event
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time of the event
 *                       location:
 *                         type: string
 *                         description: Location where the event takes place
 *                       capacity:
 *                         type: integer
 *                         description: Maximum number of participants
 *                       organizer_id:
 *                         type: integer
 *                         description: ID of the event organizer
 *                       type:
 *                         type: string
 *                         description: Type or category of the event
 *                       registration_deadline:
 *                         type: string
 *                         format: date-time
 *                         description: Deadline for event registration
 *                       registration_fee:
 *                         type: number
 *                         format: float
 *                         description: Fee required for event registration
 *                       tags:
 *                         type: string
 *                         description: Tags or keywords related to the event
 *                       status:
 *                         type: string
 *                         description: Current status of the event
 *                       attendees_count:
 *                         type: integer
 *                         description: Number of attendees registered for the event
 *                       thumbnail:
 *                         type: string
 *                         description: URL of the event thumbnail image
 *                       documents:
 *                         type: array
 *                         items:
 *                           type: string
 *                           format: uri
 *                         description: List of document URLs related to the event
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: Status code of the response
 *                 status:
 *                   type: string
 *                   description: Response status
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get('/api/events', isAuthenticated_1.default, async (ctx) => {
    try {
        const result = await db_1.default.query('SELECT * FROM events');
        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result.rows
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
//# sourceMappingURL=event.js.map