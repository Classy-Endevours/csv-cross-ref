const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const ScrapController = require('./controller/ScrapController');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.get('/fallback', ScrapController.scrap);
// frontend deployment
app.get('/', (req, res) => {
  res.header('Cache-Control', 'max-age=-1');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// setting up the PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is listening at PORT ${PORT}`));
