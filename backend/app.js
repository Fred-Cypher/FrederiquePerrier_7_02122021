require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({ windows : 15 * 60 * 1000, max: 200});

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

module.exports = app;