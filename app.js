const express = require('express');
const app = express();
const routes = require('./routes/gitHubRoute');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/repos', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('running server on port: ' + PORT);
});

// Waking up containers at an interval
const NUMBER_OF_MINUTES = 10;
const PING_INTERVAL = 60 * 1000 * NUMBER_OF_MINUTES;
const LIVE_BRIDGE_URL = 'https://adammajorbridge-9715f4d2160d.herokuapp.com/';
const LIVE_REPLAYS_URL = 'https://amajreplays.herokuapp.com';
const GROCIFY_BFF_URL = 'https://grocify-bff-ac27c2662495.herokuapp.com/';
const URLS_TO_PING = [
  `${GROCIFY_BFF_URL}/ping`,
  LIVE_BRIDGE_URL,
  LIVE_REPLAYS_URL
];

async function makeCalls () {
  console.log('Making calls to wake up containers...');
  const promises = [];
  for (const url of URLS_TO_PING) {
    promises.push(
      fetch(url, {
        mode: 'no-cors'
      })
    );
  }
  await Promise.allSettled(promises);
  console.log('Finished making calls to wake up containers...');
}

makeCalls();
setInterval(() => {
  (async () => {
    await makeCalls();
  })();
}, PING_INTERVAL);
