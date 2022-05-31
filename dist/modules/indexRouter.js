"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const dataManager_1 = __importDefault(require("./dataManager"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.get('/', (req, res) => {
    res.sendFile(path_1.default.resolve('./public/index.html'));
});
router.get('/grab', (req, res) => {
    res.sendFile(path_1.default.resolve('./public/grab.html'));
});
router.post("/shorten", (req, res) => {
    const { url } = req.body;
    const newLink = dataManager_1.default.newLink(url);
    res.redirect(`/new?id=${newLink.id}`);
});
router.post("/newgrab", (req, res) => {
    const { url, name } = req.body;
    const newLink = dataManager_1.default.newLink(url, name);
    res.redirect(`/new?id=${newLink.id}&name=${name}`);
});
router.get("/new", (req, res) => {
    res.sendFile(path_1.default.resolve('./public/new.html'));
});
router.get("/view/:id", (req, res) => {
    res.send(dataManager_1.default.getLink(req.params.id) || { error: "Link not found" });
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const link = dataManager_1.default.useLink(id, req.ip);
    if (link) {
        res.redirect(link.url);
    }
    else {
        res.redirect("/");
    }
});
exports.default = router;
