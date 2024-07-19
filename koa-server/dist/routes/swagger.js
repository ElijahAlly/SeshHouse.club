"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerConfig_1 = __importDefault(require("../swaggerConfig"));
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
// Serve Swagger JSON
router.get('/swagger.json', async (ctx) => {
    ctx.type = 'json';
    ctx.body = swaggerConfig_1.default;
});
// Serve Swagger UI HTML
router.get('/docs', async (ctx) => {
    ctx.type = 'html';
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Documentation</title>
      <link rel="stylesheet" type="text/css" href="/swagger-ui.css">
      <style>
        html { box-sizing: border-box; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="/swagger-ui-bundle.js"></script>
      <script src="/swagger-ui-standalone-preset.js"></script>
      <script>
        window.onload = () => {
          const ui = SwaggerUIBundle({
            url: '/swagger.json',  // Path to your Swagger/OpenAPI spec
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            layout: 'StandaloneLayout'
          });
        };
      </script>
    </body>
    </html>
  `;
});
exports.default = router;
//# sourceMappingURL=swagger.js.map