const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API FIKSIKI en ligne !");
});

app.get("/server", async (req, res) => {
  try {
    const gamedigModule = await import("gamedig");
    const GameDig = gamedigModule.GameDig;

    const state = await GameDig.query({
      type: "dayz",
      host: "149.202.82.212",
      port: 4712,
      givenPortOnly: true,
      socketTimeout: 5000,
      attemptTimeout: 15000
    });

    res.json({
      online: true,
      name: state.name || "FIKSIKI",
      map: state.map || "chernarusplus",
      players: state.numplayers ?? state.players?.length ?? 0,
      maxPlayers: state.maxplayers ?? 64,
      ping: state.ping ?? null,
      version: state.version || state.raw?.version || null,
      queryPort: state.queryPort ?? 4712
    });
  } catch (err) {
    console.error("Erreur GameDig :", err);

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
