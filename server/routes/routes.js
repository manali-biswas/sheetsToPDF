const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getAuth, listSheets, getSheetsMetadata, getSheetData } = require('../googleLogic');

router.get('/hello', (req, res) => {
    if (req.user == undefined) {
        res.json(null);
    }
    else {
        res.json("Hello " + req.user.name);
    }
});

router.get('/auth',
    passport.authenticate("google", {
        scope: process.env.SCOPES.split(',')
    })
);

router.get('/auth/callback',
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000"
    }),
    (req, res) => {
        res.redirect("http://localhost:3000/sheets")
    }
);

router.get('/logout', (req, res) => {
    res.redirect("http://localhost:3000");
});

router.get('/api/sheets', async (req, res) => {
    if (!req.user) res.send(null);
    const auth = getAuth(req.user.accessToken, req.user.refreshToken);
    const files = await listSheets(auth);
    res.json(files);
});

router.get('/api/sheetsMetaData/:id', async (req, res) => {
    const auth = getAuth(req.user.accessToken, req.user.refreshToken);
    const id = req.params.id;
    const metadata = await getSheetsMetadata(auth, id);
    res.json(metadata);
});

router.get('/api/headerData/:id/:sheetName/:row/:cols', async (req, res) => {
    const auth = getAuth(req.user.accessToken, req.user.refreshToken);
    const id = req.params.id;
    const sheetName = req.params.sheetName;
    const row = req.params.row;
    const cols = req.params.cols;
    const headerData = await getSheetData(auth, id, sheetName, row, cols);
    res.json(headerData);
})

module.exports = router;