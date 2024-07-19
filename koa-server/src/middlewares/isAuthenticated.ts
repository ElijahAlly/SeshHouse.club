import { Context, Next } from 'koa';

const isAuthenticated = async (ctx: Context, next: Next) => {
    if (ctx.session && ctx.session.userId) {
        await next();
    } else {
        ctx.status = 401;
        ctx.body = {
            code: 401,
            status: 'error',
            message: 'Unauthorized access'
        };
    }
};

export default isAuthenticated;
