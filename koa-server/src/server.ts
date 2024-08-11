require('dotenv').config();
import Koa from 'koa';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import { koaSwagger } from 'koa2-swagger-ui';
import logger from 'koa-logger';
import CONFIG from './config';

import healthcheckRouter from './routes/healthcheck';
import userRouter from './routes/user';
import eventRouter from './routes/event';
import eventToBookRouter from './routes/event_to_book';
import fileRouter from './routes/file';
import swaggerRouter from './routes/swagger';
import emailRouter from './routes/email';

const app = new Koa();

app.keys = [process.env.SESSION_SECRET || `session-secret-you-WILL-NEVER_guess:)-${(Math.random() * 1000).toFixed(0)}`];
app.use(bodyParser());
app.use(
    cors({
        origin: 'https://seshhouse.club', // dev http://localhost:4000 and rod https://seshhouse.club
        credentials: true,
    })
);
app.use(logger());

const PORT = CONFIG.port;
app.use(session(CONFIG.SESSION_CONFIG, app));

app.use(healthcheckRouter.routes());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(eventRouter.routes()).use(eventRouter.allowedMethods());
app.use(eventToBookRouter.routes()).use(eventToBookRouter.allowedMethods());
app.use(fileRouter.routes()).use(fileRouter.allowedMethods());
app.use(emailRouter.routes()).use(emailRouter.allowedMethods());

// TODO: Add blogs route
app.use(
    koaSwagger({
        routePrefix: '/docs',
        swaggerOptions: {
            url: '/swagger.json',
        },
    })
);
app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());

const server = app
    .listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    })
    .on('error', err => {
        console.error(err);
    });

export default server;
