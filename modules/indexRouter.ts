import { Router } from 'express';
import path from 'path';
import DataManager from './dataManager';
import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
})

router.get('/grab', (req, res) => {
    res.sendFile(path.resolve('./public/grab.html'));
})

router.post("/shorten", (req, res) => {
    const { url } = req.body;
    
    const newLink = DataManager.newLink(url);
    res.redirect(`/new?id=${newLink.id}`);
}) 

router.post("/newgrab", (req, res) => {
    const { url, name } = req.body;
    
    const newLink = DataManager.newLink(url, name);
    res.redirect(`/new?id=${newLink.id}&name=${name}`);
})

router.get("/new", (req, res) => {
    res.sendFile(path.resolve('./public/new.html'));
})

router.get("/view/:id", (req, res) => {
    res.send(DataManager.getLink(req.params.id) || {error: "Link not found"});
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const link = DataManager.useLink(id, req.ip);
    if (link) {
        res.redirect(link.url);
    } else {
        res.redirect("/");
    }
})

export default router;