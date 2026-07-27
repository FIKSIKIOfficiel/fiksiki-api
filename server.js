const express = require("express");
const cors = require("cors");
const { GameDig } = require("gamedig");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("API FIKSIKI en ligne !");
});

app.get("/server", async (req, res) => {
    try {
        const state = await GameDig.query({
            type: "dayz",
            host: "149.202.82.212",
            port: 4712
        });

        res.json({
            online: true,
            name: state.name,
            map: state.map,
            players: state.players.length,
            maxPlayers: state.maxplayers,
            ping: state.ping,
            version: state.raw.version
        });

    } catch (err) {
        res.json({
            online: false,
            erreur: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API démarrée sur le port ${PORT}`);
});
