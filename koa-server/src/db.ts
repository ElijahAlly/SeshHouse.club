import { Client } from 'pg';

const client = new Client({
    connectionString: process.env.DATABASE_URI || 'postgresql://postgres:uchjzVlEBVBpbzgWcJWHyhnmyeIofzhk@viaduct.proxy.rlwy.net:10959/railway'
});

client.connect();

export default client;
