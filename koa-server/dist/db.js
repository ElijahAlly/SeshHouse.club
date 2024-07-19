"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: process.env.DATABASE_URI || 'postgresql://postgres:uchjzVlEBVBpbzgWcJWHyhnmyeIofzhk@viaduct.proxy.rlwy.net:10959/railway'
});
client.connect();
exports.default = client;
//# sourceMappingURL=db.js.map