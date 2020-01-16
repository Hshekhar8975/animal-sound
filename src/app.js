const express = require('express');
let app = express();

const homeRoutes = require("./routes/homeRoutes");
const feedRoute = require('./routes/feedRoutes');

app.use('/', homeRoutes);
app.use('/feed', feedRoute);

module.exports = app;