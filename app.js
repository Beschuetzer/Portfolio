const express = require('express');
const app = express();
require('dotenv').config();

app.get('/githubkey', (req, res) => {
  res.send(process.env.REACT_APP_GITHUB)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {console.log('running server on port: ' + PORT)})