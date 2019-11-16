const middlewareConfig = require("../config/middleware-config");

const apiRouter = require("./api-router");

const server = require("express")();

middlewareConfig(server);
server.use("/api", apiRouter);

server.get("/", (req, res) => res.status(200).json({ api: "running" }));

module.exports = server;