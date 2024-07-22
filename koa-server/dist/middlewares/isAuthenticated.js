"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthenticated = async (ctx, next) => {
    if (ctx.session && ctx.session.userId) {
        await next();
    }
    else {
        ctx.status = 401;
        ctx.body = {
            code: 401,
            status: 'error',
            message: 'Unauthorized access'
        };
    }
};
exports.default = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map