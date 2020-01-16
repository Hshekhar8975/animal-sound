const express = require('express');
let app = express();

const homeRoutes = require("./routes/homeRoutes");

app.use('/', homeRoutes);

module.exports = app;