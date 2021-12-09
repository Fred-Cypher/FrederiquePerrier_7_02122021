require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({ windows : 15 * 60 * 1000, max: 200});
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

const userRoute = require('./routes/users');
const messageRoute = require('./routes/messages');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoute);
app.use('/api/messages', messageRoute);

module.exports = app;