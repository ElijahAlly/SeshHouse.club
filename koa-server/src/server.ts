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
import fileRouter from './routes/file';
import swaggerRouter from './routes/swagger';

const app = new Koa();

app.keys = [process.env.SESSION_SECRET || 'session-secret-you-WILL-NEVER_guess:)'];
app.use(session({}, app));
app.use(bodyParser());
app.use(
    cors({
        origin: '*'
    })
);
app.use(logger());

const PORT = CONFIG.port;

app.use(healthcheckRouter.routes());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(eventRouter.routes()).use(eventRouter.allowedMethods());
app.use(fileRouter.routes()).use(fileRouter.allowedMethods());
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
