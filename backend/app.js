require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({ windows : 15 * 60 * 1000, max: 200 });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(helmet());
app.use(limiter);

const userRoutes = require('./routes/users');
const messageRoutes =  require('./routes/messages');
const commentRoutes = require('./routes/comments');
const articleRoutes = require('./routes/articles');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/articles', articleRoutes);

module.exports = app;