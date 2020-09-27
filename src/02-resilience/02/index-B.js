const express = require('express');
const got = require('got');
const app = express();
const port = process.env.PORT || 3001;

async function requestRetry (maxRetryCount = 1) {
  const url = `http://localhost:${3000}/`;
  return got(url, { retry: maxRetryCount });
}

// add retry inteligence route to express
app.get('/retry', async (req, res) => {
  
  try {
    await requestRetry();
    res.send('OK');
  } catch (err) {
    res.status(500).send('Algo quebrou!');
  }
});

// start application server
app.listen(port, () => {
  console.log(`App executando na URL http://localhost:${port}`);
});