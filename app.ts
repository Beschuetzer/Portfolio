const express = require('express');
const app = express();
const routes = require('./routes/gitHubRoute');
const path = require('path');
require('dotenv').config();


app.use('/repos', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {console.log('running server on port: ' + PORT)})