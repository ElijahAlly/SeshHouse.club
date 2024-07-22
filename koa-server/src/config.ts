interface Config {
    port: number;
    DATABASE_URI: string;
    JWT_SECRET: string;
}

const CONFIG: Config =  {
    port: Number(process.env.PORT) || 3000,
    DATABASE_URI: process.env.DATABASE_URI || '',
    JWT_SECRET: process.env.JWT_SECRET || 'secret-key-u-would-never-ever-guess...but-plz-dont-try-:)',
};

export default CONFIG;