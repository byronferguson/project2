const Router = require("express").Router;
const exampleRoutes = require("./examples");

const apiRoutes = Router();

apiRoutes.use("/examples", exampleRoutes);

module.exports = apiRoutes;
