"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONFIG = {
    port: Number(process.env.PORT) || 3000,
    DATABASE_URI: process.env.DATABASE_URI || '',
    JWT_SECRET: process.env.JWT_SECRET || `secret-key-u-would-never-ever-guess...but-plz-dont-try-:)-${(Math.random() * 1000).toFixed(0)}`,
    SESSION_CONFIG: {
        key: 'koa:sess', // Cookie key
        maxAge: 86400000, // 7 day
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        secure: false, // Set this to true when in prod
        sameSite: 'lax'
    }
};
exports.default = CONFIG;
//# sourceMappingURL=config.js.map