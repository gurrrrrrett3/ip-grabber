import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import indexRouter from "./modules/indexRouter";

const app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
    key: fs.readFileSync(path.resolve('./auth/key.pem')),
    cert: fs.readFileSync(path.resolve('./auth/cert.pem'))
}, app);

app.use("/", indexRouter)


httpServer.listen(8080, () => {
    console.log('HTTP server listening on port 8080');
})

httpsServer.listen(8443, () => {
    console.log('HTTPS server listening on port 8443');
})



