'use strict';

const express = require('express');
const cors = require('cors');
const router = require('./routes/post.route');
const app = express();
app.use(cors());
app.use(router);


app.get('/',(req, res) => {
    res.status(200).send('server is live');
});


function start(port) {
    app.listen(port, () => {
        console.log(`Server is listening on PORT ${port}`);
    });
}

module.exports = {
    app:app,
    start:start
}