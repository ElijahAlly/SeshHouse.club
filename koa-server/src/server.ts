import Koa from 'koa';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';
import serve from 'koa-static';
import path from 'path';
import CONFIG from './config';

import healthcheckRouter from './routes/healthcheck';
import userRouter from './routes/user';
import eventRouter from './routes/event';
import swaggerRouter from './routes/swagger';

const app = new Koa();

app.use(serve(path.join(__dirname, '../node_modules/swagger-ui-dist')));

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
app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());

const server = app
    .listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    })
    .on('error', err => {
        console.error(err);
    });

export default server;
