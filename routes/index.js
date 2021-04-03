const express = require("express");

const apiRouter = require("./api");
const errorMiddleware = require("../middlewares/error");
const notFoundMiddleware = require("../middlewares/notFound");

const router = express.Router();

router.use("/api", apiRouter);
router.use(errorMiddleware);
router.use(notFoundMiddleware);

module.exports = router;
