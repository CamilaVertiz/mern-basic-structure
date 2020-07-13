const usersRouter = require('./routes/users');
const moodsRouter = require('./routes/moods');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Server Connection Config
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connected successfully');
});

//Routes
app.use('/users', usersRouter);
app.use('/moods', moodsRouter);

app.listen(port, () => {
    console.log('Server running on port:' + port);
});