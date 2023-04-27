require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const groutes = require('./routes/api');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋', req.path, req.method);
    next();
});

app.use('/api/groups', groutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected...')
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port', process.env.PORT );
          });
        })
    .catch(err => console.log(err));
