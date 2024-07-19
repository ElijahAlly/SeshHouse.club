interface Config {
    port: number;
    DATABASE_URI: string;
}

const CONFIG: Config =  {
    port: Number(process.env.PORT) || 3000,
    DATABASE_URI: process.env.DATABASE_URI || '',
};

export default CONFIG;