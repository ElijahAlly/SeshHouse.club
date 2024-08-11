import { Context } from "koa";
import Router from "koa-router";
import nodemailer from 'nodemailer';
import { EmailRequestBody, EmailResponseBody } from "../types/email";
import { AuthenticationTypeLogin } from "nodemailer/lib/smtp-connection";
import { htmlTemplate } from "../templates/email";

const router = new Router();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL, // your email address
        pass: process.env.EMAIL_APP_PASSWORD, // your email password or app password
        type: 'login' // This will use the `AuthenticationTypeLogin`
    } as AuthenticationTypeLogin
});

// Endpoint to send email
/**
 * @swagger
 * /api/send-email:
 *   post:
 *     tags:
 *       - Emails
 *     summary: Send an email
 *     description: Sends an email using the specified parameters.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: The recipient's email address
 *               subject:
 *                 type: string
 *                 description: The subject of the email
 *               first_name:
 *                 type: string
 *                 description: The first name of the recipient
 *               last_name:
 *                 type: string
 *                 description: The last name of the recipient
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 messageId:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */
router.post('/api/send-email', async (ctx: Context) => {
    const { to, subject, first_name, last_name } = ctx.request.body as EmailRequestBody;

    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html: htmlTemplate({
            first_name, 
            last_name 
        }),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        ctx.body = { success: true, messageId: info.messageId };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: `Could not send email '${subject}' to: ${to}`, error };
    }
});

// Endpoint to receive emails from SendGrid Inbound Parse
// /**
//  * @swagger
//  * /api/receive-email:
//  *   post:
//  *     tags:
//  *       - Emails
//  *     summary: Receive an email
//  *     description: Handles incoming emails from SendGrid Inbound Parse.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               from:
//  *                 type: string
//  *                 description: The sender's email address
//  *               subject:
//  *                 type: string
//  *                 description: The subject of the email
//  *               text:
//  *                 type: string
//  *                 description: The body of the email
//  *     responses:
//  *       200:
//  *         description: Email received successfully
//  *         content:
//  *           text/plain:
//  *             schema:
//  *               type: string
//  *       500:
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  */
// router.post('/api/receive-email', async (ctx: Context) => {
//     const { from, subject, text } = ctx.request.body as EmailResponseBody;

//     // Process the incoming email
//     console.log(`Email received from ${from}`);
//     console.log(`Subject: ${subject}`);
//     console.log(`Body: ${text}`);

//     ctx.status = 200;
//     ctx.body = 'Email received';
// });

export default router;