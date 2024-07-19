"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_static_1 = __importDefault(require("koa-static"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const healthcheck_1 = __importDefault(require("./routes/healthcheck"));
const user_1 = __importDefault(require("./routes/user"));
const event_1 = __importDefault(require("./routes/event"));
const swagger_1 = __importDefault(require("./routes/swagger"));
const app = new koa_1.default();
// Serve static files from swagger-ui-dist
app.use((0, koa_static_1.default)(path_1.default.join(__dirname, '../node_modules/swagger-ui-dist')));
app.keys = [process.env.SESSION_SECRET || 'session-secret-you-WILL-NEVER_guess:)'];
app.use((0, koa_session_1.default)({}, app));
app.use((0, koa_bodyparser_1.default)());
app.use((0, koa2_cors_1.default)({
    origin: '*'
}));
app.use((0, koa_logger_1.default)());
const PORT = config_1.default.port;
app.use(healthcheck_1.default.routes());
app.use(user_1.default.routes()).use(user_1.default.allowedMethods());
app.use(event_1.default.routes()).use(event_1.default.allowedMethods());
app.use(swagger_1.default.routes()).use(swagger_1.default.allowedMethods());
const server = app
    .listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})
    .on('error', err => {
    console.error(err);
});
exports.default = server;
//# sourceMappingURL=server.js.map