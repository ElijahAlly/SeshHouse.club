import { Context } from "koa";
import Router from "koa-router";
import client from '../db';
import { CafeItem } from "../types/cafeitem";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = new Router();

// * Get All Cafe Items
/**
 * @swagger
 * /api/cafeitems:
 *   get:
 *     tags:
 *       - Cafe Items
 *     summary: Retrieve a list of cafe items
 *     description: Fetches a list of cafe items from the database.
 *     responses:
 *       200:
 *         description: A list of cafe items
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
 *                     $ref: '#/components/schemas/CafeItem'
 *       500:
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
 */
router.get('/api/cafeitems', async (ctx: Context) => {
    try {
        const result = await client.query('SELECT * FROM cafeitems');
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

// * Get CafeItem by field
/**
 * @swagger
 * /api/cafeitem:
 *   get:
 *     tags:
 *       - Cafe Items
 *     summary: Retrieve a cafe item by query parameters
 *     description: Retrieve cafe item details based on query parameters. At least one query parameter is required.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: The cafe item ID
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The cafe item's title
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: The cafe item's associated tags
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: The cafe item's type
 *       - in: query
 *         name: exact_match
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Whether to perform an exact match (true) or a partial match (false) on query parameters
 *     responses:
 *       200:
 *         description: A cafe item object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CafeItem'
 *       400:
 *         description: Bad request. At least one query parameter is required
 *       404:
 *         description: Cafe item not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/cafeitem', async (ctx: Context) => {
    const queryParams = ctx.query;
    const { id, title, tags, type, exact_match } = queryParams as Partial<CafeItem & { exact_match: 'true' | 'false' | undefined }>;

    if (!id && !title && !tags && !type) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'At least one query parameter is required'
        };
        return;
    }

    try {
        let query = 'SELECT * FROM cafeitems WHERE';
        let values: (string | number)[] = [];
        let queryParts: string[] = [];

        const addQueryPart = (field: string, value: string | number, isString: boolean) => {
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
        if (type) addQueryPart('type', type, true);

        query += ' ' + queryParts.join(` ${exact_match && exact_match === 'true' ? 'AND' : 'OR'} `);

        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            ctx.status = 404;
            ctx.body = {
                code: 404,
                status: 'error',
                message: 'Cafe item not found'
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

// * Create New CafeItem
/**
 * @swagger
 * /api/cafeitem:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Cafe Items
 *     summary: Create a new cafe item
 *     description: Creates a new cafe item with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Cafe item's title
 *               description:
 *                 type: string
 *                 description: Description of the cafe item
 *               type:
 *                 type: string
 *                 description: Type of the cafe item (e.g., beverage, pastry)
 *               tags:
 *                 type: string
 *                 description: Tags associated with the cafe item
 *               thumbnail:
 *                 type: string
 *                 description: URL of the cafe item thumbnail image
 *               online_purchase_fee:
 *                 type: number
 *                 format: float
 *                 description: Fee applied for online purchases of the cafe item
 *               stock_quantity:
 *                 type: number
 *                 description: Stock quantity of the cafe item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the cafe item
 *               is_available:
 *                 type: boolean
 *                 description: Indicates whether the cafe item is available
 *               ingredients:
 *                 type: string
 *                 description: List of ingredients in the cafe item
 *               brand:
 *                 type: string
 *                 description: Brand associated with the cafe item
 *               expiration_date:
 *                 type: string
 *                 format: date-time
 *                 description: Expiration date of the cafe item
 *               nutritional_info:
 *                 type: object
 *                 description: Nutritional information of the cafe item
 *                 properties:
 *                   calories:
 *                     type: number
 *                     format: float
 *                     description: Calories in the cafe item
 *                   fat:
 *                     type: number
 *                     format: float
 *                     description: Fat content in grams
 *                   carbohydrates:
 *                     type: number
 *                     format: float
 *                     description: Carbohydrates content in grams
 *                   protein:
 *                     type: number
 *                     format: float
 *                     description: Protein content in grams
 *             required:
 *               - title
 *               - description
 *               - price
 *     responses:
 *       201:
 *         description: Created cafe item
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
 *                   $ref: '#/components/schemas/CafeItem'
 *       400:
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
 *       500:
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
router.post('/api/cafeitem', isAuthenticated, async (ctx: Context) => {
    const { title, description, type, tags, thumbnail, online_purchase_fee, stock_quantity, price, is_available, ingredients, brand, expiration_date, nutritional_info } = ctx.request.body as CafeItem;

    if (!title || !description || price === undefined) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'Title, description, and price are required'
        };
        return;
    }

    try {
        const result = await client.query(
            `INSERT INTO cafeitems (title, description, type, tags, thumbnail, online_purchase_fee, stock_quantity, price, is_available, ingredients, brand, expiration_date, nutritional_info) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
            RETURNING *`,
            [title, description, type, tags, thumbnail, online_purchase_fee, stock_quantity, price, is_available, ingredients, brand, expiration_date, nutritional_info]
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

// * Update CafeItem by id
/**
 * @swagger
 * /api/cafeitem:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Cafe Items
 *     summary: Update a cafe item by ID
 *     description: Updates a cafe item with the provided details based on the given ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Cafe item's id
 *               title:
 *                 type: string
 *                 description: Cafe item's title
 *               description:
 *                 type: string
 *                 description: Description of the cafe item
 *               type:
 *                 type: string
 *                 description: Type of the cafe item (e.g., beverage, pastry)
 *               tags:
 *                 type: string
 *                 description: Tags associated with the cafe item
 *               thumbnail:
 *                 type: string
 *                 description: URL of the cafe item thumbnail image
 *               online_purchase_fee:
 *                 type: number
 *                 format: float
 *                 description: Fee applied for online purchases of the cafe item
 *               stock_quantity:
 *                 type: number
 *                 description: Stock quantity of the cafe item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the cafe item
 *               is_available:
 *                 type: boolean
 *                 description: Indicates whether the cafe item is available
 *               ingredients:
 *                 type: string
 *                 description: List of ingredients in the cafe item
 *               brand:
 *                 type: string
 *                 description: Brand associated with the cafe item
 *               expiration_date:
 *                 type: string
 *                 format: date-time
 *                 description: Expiration date of the cafe item
 *               nutritional_info:
 *                 type: object
 *                 description: Nutritional information of the cafe item
 *                 properties:
 *                   calories:
 *                     type: number
 *                     format: float
 *                     description: Calories in the cafe item
 *                   fat:
 *                     type: number
 *                     format: float
 *                     description: Fat content in grams
 *                   carbohydrates:
 *                     type: number
 *                     format: float
 *                     description: Carbohydrates content in grams
 *                   protein:
 *                     type: number
 *                     format: float
 *                     description: Protein content in grams
 *     responses:
 *       200:
 *         description: Updated cafe item
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
 *                   $ref: '#/components/schemas/CafeItem'
 *       400:
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
 *       404:
 *         description: Cafe item not found
 *       500:
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
router.put('/api/cafeitem', isAuthenticated, async (ctx: Context) => {
    const { id, title, description, type, tags, thumbnail, online_purchase_fee, stock_quantity, price, is_available, ingredients, brand, expiration_date, nutritional_info } = ctx.request.body as Partial<CafeItem>;

    if (!id) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'Cafe Item ID is required'
        };
        return;
    }

    if (!title && !description && !type && !tags && !thumbnail && online_purchase_fee === undefined && stock_quantity === undefined && price === undefined && is_available === undefined && !ingredients && !brand && !expiration_date && !nutritional_info) {
        ctx.status = 400;
        ctx.body = {
            code: 400,
            status: 'error',
            message: 'At least one field to update must be provided'
        };
        return;
    }

    try {
        const queryParts: string[] = [];
        const values: (string | number | boolean | object | null)[] = [];

        if (title !== undefined) {
            queryParts.push(`title = $${queryParts.length + 1}`);
            values.push(title);
        }
        if (description !== undefined) {
            queryParts.push(`description = $${queryParts.length + 1}`);
            values.push(description);
        }
        if (type !== undefined) {
            queryParts.push(`type = $${queryParts.length + 1}`);
            values.push(type);
        }
        if (tags !== undefined) {
            queryParts.push(`tags = $${queryParts.length + 1}`);
            values.push(tags);
        }
        if (thumbnail !== undefined) {
            queryParts.push(`thumbnail = $${queryParts.length + 1}`);
            values.push(thumbnail);
        }
        if (online_purchase_fee !== undefined) {
            queryParts.push(`online_purchase_fee = $${queryParts.length + 1}`);
            values.push(online_purchase_fee);
        }
        if (stock_quantity !== undefined) {
            queryParts.push(`stock_quantity = $${queryParts.length + 1}`);
            values.push(stock_quantity);
        }
        if (price !== undefined) {
            queryParts.push(`price = $${queryParts.length + 1}`);
            values.push(price);
        }
        if (is_available !== undefined) {
            queryParts.push(`is_available = $${queryParts.length + 1}`);
            values.push(is_available);
        }
        if (ingredients !== undefined) {
            queryParts.push(`ingredients = $${queryParts.length + 1}`);
            values.push(ingredients);
        }
        if (brand !== undefined) {
            queryParts.push(`brand = $${queryParts.length + 1}`);
            values.push(brand);
        }
        if (expiration_date !== undefined) {
            queryParts.push(`expiration_date = $${queryParts.length + 1}`);
            values.push(expiration_date);
        }
        if (nutritional_info !== undefined) {
            queryParts.push(`nutritional_info = $${queryParts.length + 1}`);
            values.push(nutritional_info);
        }

        values.push(id);
        const query = `UPDATE cafeitems SET ${queryParts.join(', ')} WHERE id = $${values.length} RETURNING *`;
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            ctx.status = 404;
            ctx.body = {
                code: 404,
                status: 'error',
                message: 'Cafe item not found'
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

// * Delete CafeItem by id
/**
 * @swagger
 * /api/cafeitem/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Cafe Items
 *     summary: Delete a cafe item by ID
 *     description: Deletes a cafe item based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The cafe item ID
 *     responses:
 *       200:
 *         description: Deleted cafe item
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
 *       404:
 *         description: Cafe item not found
 *       500:
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
router.delete('/api/cafeitem/:id', isAuthenticated, async (ctx: Context) => {
    const id = ctx.params.id;

    try {
        const result = await client.query(`DELETE FROM cafeitems WHERE id = $1 RETURNING *`, [id]);

        if (result.rows.length === 0) {
            ctx.status = 404;
            ctx.body = {
                code: 404,
                status: 'error',
                message: 'Cafe item not found'
            };
            return;
        }

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            message: 'Cafe item deleted successfully'
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
