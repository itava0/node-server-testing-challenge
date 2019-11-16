const router = require("express").Router();

const workersRouter = require("../routes/workers-routes");

router.use("/workers", workersRouter);

module.exports = router;