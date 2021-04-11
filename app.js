const express = require('express');
const app = express();
const routes = require('./routes/gitHubRoute');
require('dotenv').config();


app.use('/repos', routes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {console.log('running server on port: ' + PORT)})