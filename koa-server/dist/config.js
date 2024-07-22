"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONFIG = {
    port: Number(process.env.PORT) || 3000,
    DATABASE_URI: process.env.DATABASE_URI || '',
    JWT_SECRET: process.env.JWT_SECRET || 'secret-key-u-would-never-ever-guess...but-plz-dont-try-:)',
};
exports.default = CONFIG;
//# sourceMappingURL=config.js.map