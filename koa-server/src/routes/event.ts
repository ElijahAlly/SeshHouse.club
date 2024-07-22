import { Context } from "koa";
import Router from "koa-router";
import client from '../db';
import { Event } from "../types/event";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = new Router();

// * Get All Events
/**
 * @swagger
 * /api/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retrieve a list of events
 *     description: Fetches a list of events from the database. This route requires authentication.
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
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
 *                         type: number
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
 *                         type: number
 *                         description: Maximum number of participants
 *                       organizer_id:
 *                         type: number
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
 *                         type: number
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
 *                   type: number
 *                   description: Status code of the response
 *                 status:
 *                   type: string
 *                   description: Response status
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get('/api/events', async (ctx: Context) => {
    try {
        const result = await client.query('SELECT * FROM events');
        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result.rows
        };
    } catch (err) {
        console.error(err);
        ctx.status = 500;
        ctx.body = {
            code: 500,
            status: 'error',
            message: 'Internal Server Error'
        };
    }
});

// * Get Event by field
/**
 * @swagger
 * /api/event:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retrieve a event by query parameters
 *     description: Retrieve event details based on query parameters. At least one query parameter is required.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: The event ID
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The event's title
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: The event's associated tags
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: The event's date
 *       - in: query
 *         name: exact_match
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Whether to perform an exact match (true) or a partial match (false) on query parameters
 *     responses:
 *       200:
 *         description: A event object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Bad request. At least one query parameter is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/event', async (ctx: Context) => {
    const queryParams = ctx.query;
    const { id, title, date, tags, exact_match } = queryParams as Partial<Event & { exact_match: 'true' | 'false' | undefined }>;

    if (!id && !title && !date && !tags) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'At least one query parameter is required'
        };
        return;
    }

    try {
        let query = 'SELECT * FROM events WHERE';
        let values: (string | number)[] = [];
        let queryParts: string[] = [];

        const addQueryPart = (field: string, value: string, isString: boolean) => {
            if (exact_match && exact_match === 'true') {
                queryParts.push(`${field} = $${queryParts.length + 1}`);
                values.push(value);
            } else if (isString) {
                queryParts.push(`${field} LIKE $${queryParts.length + 1}`);
                values.push(`%${value}%`);
            } else {
                queryParts.push(`${field} = $${queryParts.length + 1}`);
                values.push(value);
            }
        };

        if (id) addQueryPart('id', id, false);
        if (title) addQueryPart('title', title, true);
        if (tags) addQueryPart('tags', tags, true);
        if (date) addQueryPart('date', date, true);

        query += ' ' + queryParts.join(` ${exact_match && exact_match === 'true' ? 'AND' : 'OR'} `);

        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            ctx.status = 404;
            ctx.body = {
                code: 404,
                status: 'error',
                message: 'User not found'
            };
            return;
        }

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result.rows
        };
    } catch (err) {
        console.error(err);
        ctx.status = 500;
        ctx.body = {
            code: 500,
            status: 'error',
            message: 'Internal Server Error'
        };
    }
});

// * Create New Event
/**
 * @swagger
 * /api/event:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Events
 *     summary: Create a new event
 *     description: Creates a new event with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Event's title
 *               description:
 *                 type: string
 *                 description: Description of the Event
 *               date:
 *                 type: string
 *                 description: Date of the Event 
 *               organizer_id:
 *                 type: number
 *                 description: User id who created the Event
 *               location:
 *                 type: string
 *                 description: Location of Event
 *               capacity:
 *                 type: number
 *                 description: Capacity of Event
 *               type:
 *                 type: string
 *                 description: Event type
 *               registration_deadline:
 *                 type: string
 *                 description: Deadline to register for Event
 *               registration_fee:
 *                 type: number
 *                 format: float
 *                 description: Fee to register for Event
 *               tags:
 *                 type: string
 *                 description: Event tags (separated by `,`)
 *               status:
 *                 type: string
 *                 description: Event status
 *               attendees_count:
 *                 type: number
 *                 description: Count of attendees currently registered for Event
 *               thumbnail:
 *                 type: string
 *                 description: Event thumbnail
 *               documents:
 *                 type: string
 *                 description: Event documents
 *             required:
 *               - title
 *               - description
 *               - date
 *               - organizer_id
 *     responses:
 *       200:
 *         description: Created event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code of the response
 *                 status:
 *                   type: string
 *                   description: Response status
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Unique identifier of the event
 *                     title:
 *                       type: string
 *                       description: Title of the event
 *                     description:
 *                       type: string
 *                       description: Description of the event
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time of the event
 *                     location:
 *                       type: string
 *                       description: Location where the event takes place
 *                     capacity:
 *                       type: number
 *                       description: Maximum number of participants
 *                     organizer_id:
 *                       type: number
 *                       description: ID of the event organizer
 *                     type:
 *                       type: string
 *                       description: Type or category of the event
 *                     registration_deadline:
 *                       type: string
 *                       format: date-time
 *                       description: Deadline for event registration
 *                     registration_fee:
 *                       type: number
 *                       format: float
 *                       description: Fee required for event registration
 *                     tags:
 *                       type: string
 *                       description: Tags or keywords related to the event
 *                     status:
 *                       type: string
 *                       description: Current status of the event
 *                     attendees_count:
 *                       type: number
 *                       description: Number of attendees registered for the event
 *                     thumbnail:
 *                       type: string
 *                       description: URL of the event thumbnail image
 *                     documents:
 *                       type: string
 *                       description: List of document URLs related to the event
 *       '400':
 *         description: Bad request. Required fields are missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *               required:
 *                 - code
 *                 - status
 *                 - message
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *               required:
 *                 - code
 *                 - status
 *                 - message
 */
router.post('/api/event', isAuthenticated, async (ctx) => {
    const { title, description, date, organizer_id, location, capacity, type, registration_deadline, registration_fee, tags, status, attendees_count, thumbnail, documents } = ctx.request.body as Partial<Event>;

    if (!title || !description || !date || !organizer_id) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'Title, Description, Date, and Organizer ID are required'
        };
        return;
    }

    try {
        const result = await client.query(
            'INSERT INTO events (title, description, date, location, capacity, organizer_id, type, registration_deadline, registration_fee, tags, status, attendees_count, thumbnail, documents) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
            [title, description, date, location, capacity, organizer_id, type, registration_deadline, registration_fee, tags, status, attendees_count, thumbnail, documents]
        );

        ctx.status = 201;
        ctx.body = {
            code: 201,
            status: 'success',
            data: result.rows[0]
        };
    } catch (err) {
        console.error(err);
        ctx.status = 500;
        ctx.body = {
            code: 500,
            status: 'error',
            message: 'Internal Server Error'
        };
    }
});

// * Update event (id is required)
/**
 * @swagger
 * /api/event:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Events
 *     summary: Update an existing event
 *     description: Updates an existing event with the provided details. The event ID is required in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Unique identifier of the event
 *               title:
 *                 type: string
 *                 description: Event's title
 *               description:
 *                 type: string
 *                 description: Description of the event
 *               date:
 *                 type: string
 *                 description: Date of the event
 *               location:
 *                 type: string
 *                 description: Location of the event
 *               capacity:
 *                 type: number
 *                 description: Capacity of the event
 *               organizer_id:
 *                 type: number
 *                 description: User ID who created the event
 *               type:
 *                 type: string
 *                 description: Event type
 *               registration_deadline:
 *                 type: string
 *                 description: Deadline to register for the event
 *               registration_fee:
 *                 type: number
 *                 format: float
 *                 description: Fee to register for the event
 *               tags:
 *                 type: string
 *                 description: Event tags (separated by `,`)
 *               status:
 *                 type: string
 *                 description: Event status
 *               attendees_count:
 *                 type: number
 *                 description: Count of attendees currently registered for the event
 *               thumbnail:
 *                 type: string
 *                 description: Event thumbnail
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 description: Event documents
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Updated event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code of the response
 *                 status:
 *                   type: string
 *                   description: Response status
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Unique identifier of the event
 *                     title:
 *                       type: string
 *                       description: Title of the event
 *                     description:
 *                       type: string
 *                       description: Description of the event
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time of the event
 *                     location:
 *                       type: string
 *                       description: Location where the event takes place
 *                     capacity:
 *                       type: number
 *                       description: Maximum number of participants
 *                     organizer_id:
 *                       type: number
 *                       description: ID of the event organizer
 *                     type:
 *                       type: string
 *                       description: Type or category of the event
 *                     registration_deadline:
 *                       type: string
 *                       format: date-time
 *                       description: Deadline for event registration
 *                     registration_fee:
 *                       type: number
 *                       format: float
 *                       description: Fee required for event registration
 *                     tags:
 *                       type: string
 *                       description: Tags or keywords related to the event
 *                     status:
 *                       type: string
 *                       description: Current status of the event
 *                     attendees_count:
 *                       type: number
 *                       description: Number of attendees registered for the event
 *                     thumbnail:
 *                       type: string
 *                       description: URL of the event thumbnail image
 *                     documents:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uri
 *                       description: List of document URLs related to the event
 *       400:
 *         description: Bad request. ID is required.
 *       500:
 *         description: Internal Server Error
 */
router.put('/api/event', isAuthenticated, async (ctx) => {
    const {
        id,
        title,
        description,
        date,
        location,
        capacity,
        organizer_id,
        type,
        registration_deadline,
        registration_fee,
        tags,
        status,
        attendees_count,
        thumbnail,
        documents
    } = ctx.request.body as Partial<Event>;

    if (!id) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'Event ID is required'
        };
        return;
    }

    try {
        let query = 'UPDATE events SET';
        let values: (string | number)[] = [];
        let queryParts: string[] = [];

        const addQueryPart = (field: string, value: string | number) => {
            queryParts.push(`${field} = $${queryParts.length + 1}`);
            values.push(value);
        };

        if (title) addQueryPart('title', title);
        if (description) addQueryPart('description', description);
        if (date) addQueryPart('date', date);
        if (location) addQueryPart('location', location);
        if (capacity) addQueryPart('capacity', capacity);
        if (organizer_id) addQueryPart('organizer_id', organizer_id);
        if (type) addQueryPart('type', type);
        if (registration_deadline) addQueryPart('registration_deadline', registration_deadline);
        if (registration_fee) addQueryPart('registration_fee', registration_fee);
        if (tags) addQueryPart('tags', tags);
        if (status) addQueryPart('status', status);
        if (attendees_count) addQueryPart('attendees_count', attendees_count);
        if (thumbnail) addQueryPart('thumbnail', thumbnail);
        if (documents) addQueryPart('documents', documents);

        if (queryParts.length === 0) {
            ctx.status = 400;
            ctx.body = {
                code: 400,
                status: 'error',
                message: 'At least one field to update is required'
            };
            return;
        }

        query += ' ' + queryParts.join(', ');
        query += ` WHERE id = $${queryParts.length + 1}`;
        values.push(id);

        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            ctx.status = 404;
            ctx.body = {
                code: 404,
                status: 'error',
                message: 'Event not found'
            };
            return;
        }

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result.rows[0]
        };
    } catch (err) {
        console.error(err);
        ctx.status = 500;
        ctx.body = {
            code: 500,
            status: 'error',
            message: 'Internal Server Error'
        };
    }
});

// * Delete event by id
/**
 * @swagger
 * /api/event/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Events
 *     summary: Delete an event
 *     description: Deletes an event by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Unique identifier of the event to be deleted
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code of the response
 *                 status:
 *                   type: string
 *                   description: Response status
 *       400:
 *         description: Bad request. ID is required.
 *       500:
 *         description: Internal Server Error
 */
router.delete('/api/event/:id', isAuthenticated, async (ctx) => {
    const { id } = ctx.params;

    try {
        const result = await client.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            ctx.status = 404;
            ctx.body = {
                code: 404,
                status: 'error',
                message: 'Event not found'
            };
            return;
        }

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result.rows[0]
        };
    } catch (err) {
        console.error(err);
        ctx.status = 500;
        ctx.body = {
            code: 500,
            status: 'error',
            message: 'Internal Server Error'
        };
    }
});

export default router;