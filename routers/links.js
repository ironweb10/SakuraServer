const express = require("express");
const app = express.Router();

app.get("/links/api/fn/mnemonic/:playlist_id/related", async (req, res) => {
    const response = {
        "parentLinks": [],
        "links": {}
    };

    if (req.params.playlist_id.toLowerCase() == "playlist_playgroundv2") {
        response.links.playlist_playgroundv2 = require("../links/playlist_playgroundv2.json");
    }

    res.json(response);
});

app.post("/links/api/fn/mnemonic", async (req, res) => {
    const response = {
        "parentLinks": [],
        "links": {}
    };

    req.body.forEach(mnemonic => {
        if (mnemonic.mnemonic == "playlist_playgroundv2") {
            response.links.playlist_playgroundv2 = require("../links/playlist_playgroundv2.json");
        }
    });

    res.json(response);
});

module.exports = app;