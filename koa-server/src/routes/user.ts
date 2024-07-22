import { Context } from "koa";
import Router from "koa-router";
import client from '../db';
import { User } from "../types/user";
import bcrypt from 'bcrypt';
import isAuthenticated from "../middlewares/isAuthenticated";
import jwt from 'jsonwebtoken';
import CONFIG from "../config";

const router = new Router();

// * Get All Users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/api/users', async (ctx: Context) => {
    try {
        const result = await client.query('SELECT * FROM users');
        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result.rows
        }
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

// * Get User by field
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieve a user by query parameters
 *     description: Retrieve user details based on query parameters. At least one query parameter is required.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: query
 *         name: first_name
 *         schema:
 *           type: string
 *         description: The user's first name
 *       - in: query
 *         name: last_name
 *         schema:
 *           type: string
 *         description: The user's last name
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: The user's username
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: The user's email
 *       - in: query
 *         name: phone_number
 *         schema:
 *           type: string
 *         description: The user's phone number
 *       - in: query
 *         name: exact_match
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Whether to perform an exact match (true) or a partial match (false) on query parameters
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. At least one query parameter is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/user', async (ctx: Context) => {
    const queryParams = ctx.query;
    const { id, first_name, last_name, username, email, phone_number, exact_match } = queryParams as Partial<User & { exact_match: 'true' | 'false' | undefined }>;

    if (!id && !first_name && !last_name && !username && !email && !phone_number) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'At least one query parameter is required'
        };
        return;
    }

    try {
        let query = 'SELECT * FROM users WHERE';
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
        if (first_name) addQueryPart('first_name', first_name, true);
        if (last_name) addQueryPart('last_name', last_name, true);
        if (username) addQueryPart('username', username, true);
        if (email) addQueryPart('email', email, true);
        if (phone_number) addQueryPart('phone_number', phone_number, true);

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

// * Create New User
/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Creates a new user with the provided details. Password is hashed before storing.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 description: User's last name
 *               username:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 description: User's email address
 *               phone_number:
 *                 type: string
 *                 description: User's phone number
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - first_name
 *               - last_name
 *               - username
 *               - email
 *               - phone_number
 *               - password
 *     responses:
 *       '201':
 *         description: User created successfully
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
 *                     id:
 *                       type: string
 *                       description: Unique identifier of the user
 *                     first_name:
 *                       type: string
 *                       description: User's first name
 *                     last_name:
 *                       type: string
 *                       description: User's last name
 *                     username:
 *                       type: string
 *                       description: User's username
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                     phone_number:
 *                       type: string
 *                       description: User's phone number
 *                     password_hash:
 *                       type: string
 *                       description: User's hashed password
 *                     profile_picture:
 *                       type: string
 *                       description: URL of the user's profile picture
 *                     bio:
 *                       type: string
 *                       description: User's bio or description
 *                     date_of_birth:
 *                       type: string
 *                       format: date
 *                       description: User's date of birth
 *                     street:
 *                       type: string
 *                       description: User's street address
 *                     country:
 *                       type: string
 *                       description: User's country
 *                     city:
 *                       type: string
 *                       description: User's city
 *                     state:
 *                       type: string
 *                       description: User's state
 *                     zipcode:
 *                       type: string
 *                       description: User's postal code
 *                     twitter_profile:
 *                       type: string
 *                       description: User's Twitter profile URL
 *                     facebook_profile:
 *                       type: string
 *                       description: User's Facebook profile URL
 *                     instagram_profile:
 *                       type: string
 *                       description: User's Instagram profile URL
 *                     snapchat_profile:
 *                       type: string
 *                       description: User's Snapchat profile URL
 *                     twitch_profile:
 *                       type: string
 *                       description: User's Twitch profile URL
 *                     youtube_profile:
 *                       type: string
 *                       description: User's YouTube profile URL
 *                   required:
 *                     - code
 *                     - status
 *                     - data
 *       '400':
 *         description: Bad request. All fields are required.
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
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *               required:
 *                 - code
 *                 - status
 *                 - message
 */
router.post('/api/user', async (ctx) => {
    const { first_name, last_name, username, email, phone_number, password } = ctx.request.body as Partial<User>; 
    if (!first_name || !last_name || !username || !email || !phone_number || !password) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'First Name, Last Name, Username, Email, Phone Number, and Password are required'
        };
        return;
    }

    try {
        const saltRounds = process.env.SALT_ROUNDS || 12;
        const password_hash = await bcrypt.hash(password, saltRounds);

        const result = await client.query(
            'INSERT INTO users (first_name, last_name, username, email, phone_number, password_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [first_name, last_name, username, email, phone_number, password_hash]
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

// * Update User (id is required)
/**
 * @swagger
 * /api/user:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     summary: Update an existing user
 *     description: Updates user information based on provided fields. At least one field to update is required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier of the user
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 description: User's last name
 *               username:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 description: User's email address
 *               phone_number:
 *                 type: string
 *                 description: User's phone number
 *               password_hash:
 *                 type: string
 *                 description: User's hashed password
 *               profile_picture:
 *                 type: string
 *                 description: URL of the user's profile picture
 *               bio:
 *                 type: string
 *                 description: User's bio or description
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: User's date of birth
 *               street:
 *                 type: string
 *                 description: User's street address
 *               country:
 *                 type: string
 *                 description: User's country
 *               city:
 *                 type: string
 *                 description: User's city
 *               state:
 *                 type: string
 *                 description: User's state
 *               zipcode:
 *                 type: string
 *                 description: User's postal code
 *               twitter_profile:
 *                 type: string
 *                 description: User's Twitter profile URL
 *               facebook_profile:
 *                 type: string
 *                 description: User's Facebook profile URL
 *               instagram_profile:
 *                 type: string
 *                 description: User's Instagram profile URL
 *               snapchat_profile:
 *                 type: string
 *                 description: User's Snapchat profile URL
 *               twitch_profile:
 *                 type: string
 *                 description: User's Twitch profile URL
 *               youtube_profile:
 *                 type: string
 *                 description: User's YouTube profile URL
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier of the user
 *                     first_name:
 *                       type: string
 *                       description: User's first name
 *                     last_name:
 *                       type: string
 *                       description: User's last name
 *                     username:
 *                       type: string
 *                       description: User's username
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                     phone_number:
 *                       type: string
 *                       description: User's phone number
 *                     password_hash:
 *                       type: string
 *                       description: User's hashed password
 *                     profile_picture:
 *                       type: string
 *                       description: URL of the user's profile picture
 *                     bio:
 *                       type: string
 *                       description: User's bio or description
 *                     date_of_birth:
 *                       type: string
 *                       format: date
 *                       description: User's date of birth
 *                     street:
 *                       type: string
 *                       description: User's street address
 *                     country:
 *                       type: string
 *                       description: User's country
 *                     city:
 *                       type: string
 *                       description: User's city
 *                     state:
 *                       type: string
 *                       description: User's state
 *                     zipcode:
 *                       type: string
 *                       description: User's postal code
 *                     twitter_profile:
 *                       type: string
 *                       description: User's Twitter profile URL
 *                     facebook_profile:
 *                       type: string
 *                       description: User's Facebook profile URL
 *                     instagram_profile:
 *                       type: string
 *                       description: User's Instagram profile URL
 *                     snapchat_profile:
 *                       type: string
 *                       description: User's Snapchat profile URL
 *                     twitch_profile:
 *                       type: string
 *                       description: User's Twitch profile URL
 *                     youtube_profile:
 *                       type: string
 *                       description: User's YouTube profile URL
 *                   required:
 *                     - code
 *                     - status
 *                     - data
 *       400:
 *         description: Bad request. User ID is required or no fields provided for update.
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/api/user', isAuthenticated, async (ctx: Context) => {
    const userUpdates = ctx.request.body as Partial<User>;
    const { id, first_name, last_name, username, email, phone_number, password_hash, profile_picture, bio, date_of_birth, street, country, city, state, zipcode, twitter_profile, facebook_profile, instagram_profile, snapchat_profile, twitch_profile, youtube_profile } = userUpdates;

    if (!id) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'User ID is required'
        };
        return;
    }

    try {
        let query = 'UPDATE users SET';
        let values: (string | number)[] = [];
        let queryParts: string[] = [];

        const addQueryPart = (field: string, value: string) => {
            queryParts.push(`${field} = $${queryParts.length + 1}`);
            values.push(value);
        };

        if (first_name) addQueryPart('first_name', first_name);
        if (last_name) addQueryPart('last_name', last_name);
        if (username) addQueryPart('username', username);
        if (email) addQueryPart('email', email);
        if (phone_number) addQueryPart('phone_number', phone_number);
        if (password_hash) addQueryPart('password_hash', password_hash);
        if (profile_picture) addQueryPart('profile_picture', profile_picture);
        if (bio) addQueryPart('bio', bio);
        if (date_of_birth) addQueryPart('date_of_birth', date_of_birth);
        if (street) addQueryPart('street', street);
        if (country) addQueryPart('country', country);
        if (city) addQueryPart('city', city);
        if (state) addQueryPart('state', state);
        if (zipcode) addQueryPart('zipcode', zipcode);
        if (twitter_profile) addQueryPart('twitter_profile', twitter_profile);
        if (facebook_profile) addQueryPart('facebook_profile', facebook_profile);
        if (instagram_profile) addQueryPart('instagram_profile', instagram_profile);
        if (snapchat_profile) addQueryPart('snapchat_profile', snapchat_profile);
        if (twitch_profile) addQueryPart('twitch_profile', twitch_profile);
        if (youtube_profile) addQueryPart('youtube_profile', youtube_profile);

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
                message: 'User not found'
            };
            return;
        }
        const updatedUser = await client.query('SELECT * FROM users where id = ' + id);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            message: 'User updated successfully',
            user: updatedUser.rows[0]
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

// * Delete User by id
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Delete a user
 *     description: Deletes a user based on their unique ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *       400:
 *         description: Bad request. User ID is required.
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/api/user/:id', isAuthenticated, async (ctx: Context) => {
    const queryParams = ctx.query;
    const { id } = queryParams as { id: string };

    if (!id) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'User ID is required'
        };
        return;
    }

    try {
        const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

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
            message: 'User deleted successfully',
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

// * Login User by email_or_username & password
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user by their username or email and password. Sets a session on successful authentication and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username_or_email:
 *                 type: string
 *                 description: Username or email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *             required:
 *               - username_or_email
 *               - password
 *     responses:
 *       200:
 *         description: 'Login successful'
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
 *                 jwt:
 *                   type: string
 *                   description: 'JWT token for authenticated user'
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier of the user
 *                     first_name:
 *                       type: string
 *                       description: User's first name
 *                     last_name:
 *                       type: string
 *                       description: User's last name
 *                     username:
 *                       type: string
 *                       description: User's username
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                     phone_number:
 *                       type: string
 *                       description: User's phone number
 *                     profile_picture:
 *                       type: string
 *                       description: URL of the user's profile picture
 *                     bio:
 *                       type: string
 *                       description: User's bio or description
 *                     date_of_birth:
 *                       type: string
 *                       format: 'date'
 *                       description: User's date of birth
 *                     street:
 *                       type: string
 *                       description: User's street address
 *                     country:
 *                       type: string
 *                       description: User's country
 *                     city:
 *                       type: string
 *                       description: User's city
 *                     state:
 *                       type: string
 *                       description: User's state
 *                     zipcode:
 *                       type: string
 *                       description: User's postal code
 *                     twitter_profile:
 *                       type: string
 *                       description: User's Twitter profile URL
 *                     facebook_profile:
 *                       type: string
 *                       description: User's Facebook profile URL
 *                     instagram_profile:
 *                       type: string
 *                       description: User's Instagram profile URL
 *                     snapchat_profile:
 *                       type: string
 *                       description: User's Snapchat profile URL
 *                     twitch_profile:
 *                       type: string
 *                       description: User's Twitch profile URL
 *                     youtube_profile:
 *                       type: string
 *                       description: User's YouTube profile URL
 *       400:
 *         description: Bad request. Username/Email and Password are required.
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
 *               required:
 *                 - code
 *                 - status
 *                 - message
 *       401:
 *         description: 'Unauthorized. Invalid password.'
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
 *               required:
 *                 - 'code'
 *                 - 'status'
 *                 - 'message'
 *       404:
 *         description: 'Not Found. User not found.'
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
 *               required:
 *                 - 'code'
 *                 - 'status'
 *                 - 'message'
 *       500:
 *         description: 'Internal Server Error'
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
 *               required:
 *                 - 'code'
 *                 - 'status'
 *                 - 'message'
 */
router.post('/api/login', async (ctx: Context) => {
    const { username_or_email, password } = ctx.request.body as { username_or_email: string, password: string };

    if (!username_or_email || !password) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'Username/Email and Password are required'
        };
        return;
    }

    try {
        let result = await client.query('SELECT * FROM users WHERE username = $1', [username_or_email]);
        let user = result.rows[0];

        if (!user) {
            result = await client.query('SELECT * FROM users WHERE email = $1', [username_or_email]);
            user = result.rows[0];
            if (!user) {
                ctx.status = 404;
                ctx.body = {
                    code: 404,
                    status: 'error',
                    message: 'User not found'
                };
                return;
            }
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                status: 'error',
                message: 'Invalid password'
            };
            return;
        }

        ctx.session!.userId = user.id;

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, CONFIG.JWT_SECRET, { expiresIn: '7d' });

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            message: 'Login successful',
            jwt: token,
            user
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

// * Logout user
/**
 * @swagger
 * /api/logout:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Log out a user
 *     description: Logs out the current user by clearing the session.
 *     responses:
 *       200:
 *         description: Logout successful
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
 *       500:
 *         description: Internal Server Error
 */
router.post('/api/logout', isAuthenticated, async (ctx: Context) => {
    ctx.session = null;
    ctx.status = 200;
    ctx.body = {
        code: 200,
        status: 'success',
        message: 'Logout successful'
    };
});

export default router;