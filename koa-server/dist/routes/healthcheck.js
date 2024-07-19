"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
router.get('/api/ping', async (ctx) => {
    try {
        ctx.body = {
            code: 200,
            status: 'success',
            data: 'pong 🏓'
        };
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = router;
//# sourceMappingURL=healthcheck.js.map