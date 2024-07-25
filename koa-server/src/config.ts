import { DefaultContext, DefaultState } from "koa";
import session from "koa-session";

interface Config {
    port: number;
    DATABASE_URI: string;
    JWT_SECRET: string;
    SESSION_CONFIG: Partial<session.opts<DefaultState, DefaultContext, any>>;
}

const CONFIG: Config =  {
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

export default CONFIG;