import { Context } from "koa";
import express, { Request, Response, NextFunction } from 'express';
import Router from "koa-router";
import client from '../db';
import { BookEventType } from "../types/event";
import isAuthenticated from "../middlewares/isAuthenticated";

// const router = new Router();


const router = express.Router();

// * Get All Events To Book
/**
 * @swagger
 * /api/events-to-book:
 *   get:
 *     tags:
 *       - EventsToBook
 *     summary: Retrieve a list of events to book
 *     description: Fetches a list of events to book from the database. This route requires authentication.
 *     responses:
 *       200:
 *         description: A list of events to book
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
 *                         type: object
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
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Tags or keywords related to the event
 *                       rooms:
 *                         type: array
 *                         items:
 *                           type: string
 *                           enum: 
 *                             - CAFE
 *                             - MUSIC_STUDIO
 *                             - PODCAST_ROOM
 *                             - UPSTAIRS_BAR
 *                             - STAGE_HALL
 *                             - UPSTAIRS_BACK_ROOM
 *                         description: Rooms for the event
 *                       attendees_count:
 *                         type: number
 *                         description: Number of attendees registered for the event
 *                       thumbnail:
 *                         type: string
 *                         description: URL of the event thumbnail image
 *                       documents:
 *                         type: object
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
router.get('/api/events-to-book', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await client.query('SELECT * FROM events_to_book');
        res.status(200).json({
            code: 200,
            status: 'success',
            data: result.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            code: 500,
            status: 'error',
            message: 'Internal Server Error'
        });
    }
});

// // * Get Event To Book by field
// /**
//  * @swagger
//  * /api/event-to-book:
//  *   get:
//  *     tags:
//  *       - EventsToBook
//  *     summary: Retrieve an event to book by query parameters
//  *     description: Retrieve event to book details based on query parameters. At least one query parameter is required.
//  *     parameters:
//  *       - in: query
//  *         name: id
//  *         schema:
//  *           type: number
//  *         description: The event ID
//  *       - in: query
//  *         name: title
//  *         schema:
//  *           type: string
//  *         description: The event's title
//  *       - in: query
//  *         name: tags
//  *         schema:
//  *           type: string
//  *         description: The event's associated tags
//  *       - in: query
//  *         name: rooms 
//  *         schema:
//  *           type: array
//  *           items:
//  *             type: string
//  *             enum:
//  *               - CAFE
//  *               - MUSIC_STUDIO
//  *               - PODCAST_ROOM
//  *               - UPSTAIRS_BAR
//  *               - STAGE_HALL
//  *               - UPSTAIRS_BACK_ROOM
//  *         description: The event's associated rooms
//  *       - in: query
//  *         name: type 
//  *         schema:
//  *           type: string
//  *         description: The event's associated type
//  *       - in: query
//  *         name: date
//  *         schema:
//  *           type: string
//  *           format: date
//  *         description: The event's date
//  *       - in: query
//  *         name: exact_match
//  *         schema:
//  *           type: string
//  *           enum: [true, false]
//  *         description: Whether to perform an exact match (true) or a partial match (false) on query parameters
//  *     responses:
//  *       200:
//  *         description: An event to book object
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/BookEventType'
//  *       400:
//  *         description: Bad request. At least one query parameter is required
//  *       500:
//  *         description: Internal Server Error
//  */
// router.get('/api/event-to-book', async (ctx: Context) => {
//     ctx.type = 'application/json';    

//     const queryParams = ctx.query;
//     const { id, title, tags, exact_match, type, rooms } = queryParams as Partial<BookEventType & { exact_match: 'true' | 'false' | undefined }>;

//     if (!id && !title && !tags && !type && !rooms) {
//         ctx.status = 400;
//         ctx.body = {
//             code: 400,
//             status: 'error',
//             message: 'At least one query parameter is required'
//         };
//         return;
//     }

//     try {
//         let query = 'SELECT * FROM events_to_book WHERE';
//         let values: (string | number | {rooms: string[]})[] = [];
//         let queryParts: string[] = [];

//         const addQueryPart = (field: string, value: string | number | {rooms: string[]}, isString: boolean) => {
//             if (exact_match && exact_match === 'true') {
//                 queryParts.push(`${field} = $${queryParts.length + 1}`);
//                 values.push(value);
//             } else if (isString) {
//                 queryParts.push(`${field} LIKE $${queryParts.length + 1}`);
//                 values.push(`%${value}%`);
//             } else {
//                 queryParts.push(`${field} = $${queryParts.length + 1}`);
//                 values.push(value);
//             }
//         };

//         if (id) addQueryPart('id', id, false);
//         if (title) addQueryPart('title', title, true);
//         if (tags) addQueryPart('tags', JSON.stringify(tags), true);
//         if (type) addQueryPart('type', type, false);
//         if (rooms) addQueryPart('rooms', rooms, false);

//         query += ' ' + queryParts.join(` ${exact_match && exact_match === 'true' ? 'AND' : 'OR'} `);

//         const result = await client.query(query, values);

//         if (result.rows.length === 0) {
//             ctx.status = 200;
//             ctx.body = {
//                 code: 200,
//                 status: 'success',
//                 message: 'Event to book not found',
//                 data: []
//             };
//             return;
//         }

//         ctx.status = 200;
//         ctx.body = {
//             code: 200,
//             status: 'success',
//             data: result.rows
//         };
//     } catch (err) {
//         console.error(err);
//         ctx.status = 500;
//         ctx.body = {
//             code: 500,
//             status: 'error',
//             message: 'Internal Server Error'
//         };
//     }
// });


// // * Create New Event To Book
// /**
//  * @swagger
//  * /api/event-to-book:
//  *   post:
//  *     tags:
//  *       - EventsToBook
//  *     summary: Create a new event to book
//  *     description: Creates a new event to book with the provided details.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 description: Event's title
//  *               description:
//  *                 type: string
//  *                 description: Description of the Event
//  *               dates:
//  *                 type: object 
//  *                 description: Date of the Event 
//  *               organizer_id:
//  *                 type: number
//  *                 description: User ID who created the Event
//  *               location:
//  *                 type: string
//  *                 description: Location of the Event
//  *               capacity:
//  *                 type: number
//  *                 description: Capacity of the Event
//  *               type:
//  *                 type: string
//  *                 description: Event type
//  *               registration_deadline:
//  *                 type: string
//  *                 format: date-time
//  *                 description: Deadline to register for the Event to book
//  *               registration_fee:
//  *                 type: number
//  *                 format: float
//  *                 description: Fee to register for the Event to book
//  *               tags:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                 description: Tags related to the Event to book (separated by `,`)
//  *               rooms:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   enum: ['CAFE', 'MUSIC_STUDIO', 'PODCAST_ROOM', 'UPSTAIRS_BAR', 'STAGE_HALL', 'UPSTAIRS_BACK_ROOM']
//  *                 description: Rooms for the Event to book
//  *               attendees_count:
//  *                 type: number
//  *                 description: Count of attendees currently registered for the Event to book
//  *               thumbnail:
//  *                 type: string
//  *                 description: URL of the Event to book thumbnail
//  *               documents:
//  *                 type: object
//  *                 description: URLs of the Event to book documents
//  *             required:
//  *               - title
//  *               - description
//  *               - rooms
//  *               - type
//  *     responses:
//  *       200:
//  *         description: Created event
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 code:
//  *                   type: number
//  *                   description: Status code of the response
//  *                 status:
//  *                   type: string
//  *                   description: Response status
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: number
//  *                       description: Unique identifier of the event
//  *                     title:
//  *                       type: string
//  *                       description: Title of the event
//  *                     description:
//  *                       type: string
//  *                       description: Description of the event
//  *                     dates:
//  *                       type: string
//  *                       format: date-time
//  *                       description: Date and time of the event
//  *                     location:
//  *                       type: string
//  *                       description: Location where the event takes place
//  *                     capacity:
//  *                       type: number
//  *                       description: Maximum number of participants
//  *                     organizer_id:
//  *                       type: number
//  *                       description: ID of the event organizer
//  *                     type:
//  *                       type: string
//  *                       description: Type or category of the event
//  *                     registration_deadline:
//  *                       type: string
//  *                       format: date-time
//  *                       description: Deadline for event registration
//  *                     registration_fee:
//  *                       type: number
//  *                       format: float
//  *                       description: Fee required for event registration
//  *                     tags:
//  *                       type: array
//  *                       items:
//  *                         type: string
//  *                       description: Tags or keywords related to the event to book
//  *                     rooms:
//  *                       type: array
//  *                       items:
//  *                         type: string
//  *                         enum: ['CAFE', 'MUSIC_STUDIO', 'PODCAST_ROOM', 'UPSTAIRS_BAR', 'STAGE_HALL', 'UPSTAIRS_BACK_ROOM']
//  *                       description: Rooms for the event
//  *                     attendees_count:
//  *                       type: number
//  *                       description: Number of attendees registered for the event to book
//  *                     thumbnail:
//  *                       type: string
//  *                       description: URL of the event thumbnail image
//  *                     documents:
//  *                       type: array
//  *                       items:
//  *                         type: string
//  *                       description: List of document URLs related to the event to book
//  *       '400':
//  *         description: Bad request. Required fields are missing.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 code:
//  *                   type: number
//  *                 status:
//  *                   type: string
//  *                 message:
//  *                   type: string
//  *               required:
//  *                 - code
//  *                 - status
//  *                 - message
//  *       '500':
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 code:
//  *                   type: number
//  *                 status:
//  *                   type: string
//  *                 message:
//  *                   type: string
//  *               required:
//  *                 - code
//  *                 - status
//  *                 - message
//  */
// router.post('/api/event-to-book', async (ctx) => {
//     const { title, description, dates, organizer_id, location, capacity, type, registration_deadline, registration_fee, tags, attendees_count, thumbnail, documents, rooms } = ctx.request.body as Partial<BookEventType>;
//     if (!title || !description || !rooms || !type) {
//         ctx.status = 400;
//         ctx.body = {
//             code: 400,
//             status: 'error',
//             message: 'Title, Description, Type, and Rooms are required'
//         };
//         return;
//     }

//     try {
//         const result = await client.query(
//             'INSERT INTO events_to_book (title, description, dates, location, capacity, organizer_id, type, registration_deadline, registration_fee, tags, attendees_count, thumbnail, documents, rooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
//             [title, description, dates, location, capacity, organizer_id, type, registration_deadline, registration_fee, tags, attendees_count, thumbnail, documents, {rooms}]
//         );

//         ctx.status = 201;
//         ctx.body = {
//             code: 201,
//             status: 'success',
//             data: result.rows[0]
//         };
//     } catch (err) {
//         console.error(err);
//         ctx.status = 500;
//         ctx.body = {
//             code: 500,
//             status: 'error',
//             message: 'Internal Server Error'
//         };
//     }
// });

// // * Update Event to book (id is required)
// /**
//  * @swagger
//  * /api/event-to-book:
//  *   put:
//  *     security:
//  *       - BearerAuth: []
//  *     tags:
//  *       - EventsToBook
//  *     summary: Update an existing event to book
//  *     description: Updates an existing event to book with the provided details. The event to book ID is required in the request body.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               id:
//  *                 type: number
//  *                 description: Unique identifier of the event
//  *               title:
//  *                 type: string
//  *                 description: Event's title
//  *               description:
//  *                 type: string
//  *                 description: Description of the event
//  *               date:
//  *                 type: string
//  *                 description: Date of the event
//  *               location:
//  *                 type: string
//  *                 description: Location of the event
//  *               capacity:
//  *                 type: number
//  *                 description: Capacity of the event
//  *               organizer_id:
//  *                 type: number
//  *                 description: User ID who created the event
//  *               type:
//  *                 type: string
//  *                 description: Event type
//  *               registration_deadline:
//  *                 type: string
//  *                 format: date-time
//  *                 description: Deadline to register for the event
//  *               registration_fee:
//  *                 type: number
//  *                 format: float
//  *                 description: Fee to register for the event
//  *               tags:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                 description: Event tags (separated by `,`)
//  *               rooms:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   enum:
//  *                     - CAFE
//  *                     - MUSIC_STUDIO
//  *                     - PODCAST_ROOM
//  *                     - UPSTAIRS_BAR
//  *                     - STAGE_HALL
//  *                     - UPSTAIRS_BACK_ROOM
//  *                 description: Rooms for the event
//  *               attendees_count:
//  *                 type: number
//  *                 description: Count of attendees currently registered for the event
//  *               thumbnail:
//  *                 type: string
//  *                 description: Event thumbnail
//  *               documents:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   format: uri
//  *                 description: Event documents
//  *             required:
//  *               - id
//  *     responses:
//  *       200:
//  *         description: Updated event
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 code:
//  *                   type: number
//  *                   description: Status code of the response
//  *                 status:
//  *                   type: string
//  *                   description: Response status
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: number
//  *                       description: Unique identifier of the event
//  *                     title:
//  *                       type: string
//  *                       description: Title of the event
//  *                     description:
//  *                       type: string
//  *                       description: Description of the event
//  *                     date:
//  *                       type: string
//  *                       format: date-time
//  *                       description: Date and time of the event
//  *                     location:
//  *                       type: string
//  *                       description: Location where the event takes place
//  *                     capacity:
//  *                       type: number
//  *                       description: Maximum number of participants
//  *                     organizer_id:
//  *                       type: number
//  *                       description: ID of the event organizer
//  *                     type:
//  *                       type: string
//  *                       description: Type or category of the event
//  *                     registration_deadline:
//  *                       type: string
//  *                       format: date-time
//  *                       description: Deadline for event registration
//  *                     registration_fee:
//  *                       type: number
//  *                       format: float
//  *                       description: Fee required for event registration
//  *                     tags:
//  *                       type: array
//  *                       items:
//  *                         type: string
//  *                       description: Tags or keywords related to the event
//  *                     rooms:
//  *                       type: array
//  *                       items:
//  *                         type: string
//  *                         enum:
//  *                           - CAFE
//  *                           - MUSIC_STUDIO
//  *                           - PODCAST_ROOM
//  *                           - UPSTAIRS_BAR
//  *                           - STAGE_HALL
//  *                           - UPSTAIRS_BACK_ROOM
//  *                       description: Rooms for the event
//  *                     attendees_count:
//  *                       type: number
//  *                       description: Number of attendees registered for the event
//  *                     thumbnail:
//  *                       type: string
//  *                       description: URL of the event thumbnail image
//  *                     documents:
//  *                       type: array
//  *                       items:
//  *                         type: string
//  *                         format: uri
//  *                       description: List of document URLs related to the event
//  *       400:
//  *         description: Bad request. ID is required.
//  *       500:
//  *         description: Internal Server Error
//  */
// router.put('/api/event-to-book', isAuthenticated, async (ctx) => {
//     const {
//         id,
//         title,
//         description,
//         location,
//         capacity,
//         organizer_id,
//         type,
//         registration_deadline,
//         registration_fee,
//         tags,
//         rooms,
//         attendees_count,
//         thumbnail,
//         documents
//     } = ctx.request.body as Partial<BookEventType>;

//     if (!id) {
//         ctx.status = 400;
//         ctx.body = {
//             code: 400,
//             status: 'error',
//             message: 'Event to book ID is required'
//         };
//         return;
//     }

//     try {
//         let query = 'UPDATE events_to_book SET';
//         let values: (string | number | Date | { rooms: string[]} )[] = [];
//         let queryParts: string[] = [];

//         const addQueryPart = (field: string, value: string | number | Date | { rooms: string[]}) => {
//             queryParts.push(`${field} = $${queryParts.length + 1}`);
//             values.push(value);
//         };

//         if (title) addQueryPart('title', title);
//         if (description) addQueryPart('description', description);
//         if (location) addQueryPart('location', location);
//         if (capacity) addQueryPart('capacity', capacity);
//         if (organizer_id) addQueryPart('organizer_id', organizer_id);
//         if (type) addQueryPart('type', type);
//         if (registration_deadline) addQueryPart('registration_deadline', registration_deadline);
//         if (registration_fee) addQueryPart('registration_fee', registration_fee);
//         if (tags) addQueryPart('tags', JSON.stringify(tags));
//         if (rooms) addQueryPart('rooms', rooms);
//         if (attendees_count) addQueryPart('attendees_count', attendees_count);
//         if (thumbnail) addQueryPart('thumbnail', thumbnail);
//         if (documents) addQueryPart('documents', JSON.stringify(documents));

//         if (queryParts.length === 0) {
//             ctx.status = 400;
//             ctx.body = {
//                 code: 400,
//                 status: 'error',
//                 message: 'At least one field to update is required'
//             };
//             return;
//         }

//         query += ' ' + queryParts.join(', ');
//         query += ` WHERE id = $${queryParts.length + 1}`;
//         values.push(id);

//         const result = await client.query(query, values);
//         if (result.rowCount === 0) {
//             ctx.status = 404;
//             ctx.body = {
//                 code: 404,
//                 status: 'error',
//                 message: 'Event to book not found'
//             };
//             return;
//         }

//         ctx.status = 200;
//         ctx.body = {
//             code: 200,
//             status: 'success',
//             data: result.rows[0]
//         };
//     } catch (err) {
//         console.error(err);
//         ctx.status = 500;
//         ctx.body = {
//             code: 500,
//             status: 'error',
//             message: 'Internal Server Error'
//         };
//     }
// });


// // * Delete event to book by id
// /**
//  * @swagger
//  * /api/event-to-book/{id}:
//  *   delete:
//  *     security:
//  *       - BearerAuth: []
//  *     tags:
//  *       - EventsToBook
//  *     summary: Delete an event to book
//  *     description: Deletes an event to book by its ID.
//  *     parameters:
//  *       - in: query
//  *         name: id
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: Unique identifier of the event to be deleted
//  *     responses:
//  *       200:
//  *         description: Event deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 code:
//  *                   type: number
//  *                   description: Status code of the response
//  *                 status:
//  *                   type: string
//  *                   description: Response status
//  *       400:
//  *         description: Bad request. ID is required.
//  *       500:
//  *         description: Internal Server Error
//  */
// router.delete('/api/event-to-book/:id', isAuthenticated, async (ctx) => {
//     const { id } = ctx.params;

//     try {
//         const result = await client.query('DELETE FROM events_to_book WHERE id = $1 RETURNING *', [id]);

//         if (result.rowCount === 0) {
//             ctx.status = 404;
//             ctx.body = {
//                 code: 404,
//                 status: 'error',
//                 message: 'Event to book not found'
//             };
//             return;
//         }

//         ctx.status = 200;
//         ctx.body = {
//             code: 200,
//             status: 'success',
//             data: result.rows[0]
//         };
//     } catch (err) {
//         console.error(err);
//         ctx.status = 500;
//         ctx.body = {
//             code: 500,
//             status: 'error',
//             message: 'Internal Server Error'
//         };
//     }
// });

export default router;