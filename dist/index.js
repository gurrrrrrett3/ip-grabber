"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const indexRouter_1 = __importDefault(require("./modules/indexRouter"));
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const httpsServer = https_1.default.createServer({
    key: fs_1.default.readFileSync(path_1.default.resolve('./auth/key.pem')),
    cert: fs_1.default.readFileSync(path_1.default.resolve('./auth/cert.pem'))
}, app);
app.use("/", indexRouter_1.default);
httpServer.listen(8080, () => {
    console.log('HTTP server listening on port 8080');
});
httpsServer.listen(8443, () => {
    console.log('HTTPS server listening on port 8443');
});
