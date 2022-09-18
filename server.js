'use strict';

const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const userRouter = require('./routes/user.route');
const errorHandler = require('./error-handlers/500');
const notFound = require('./error-handlers/404');

const app = express();
app.use(express.json());
app.use(cors());
app.use(postRouter);
app.use(commentRouter);
app.use(userRouter);



app.get('/',(req, res) => {
    res.status(200).send('server is live');
});


function start(port) {
    app.listen(port, () => {
        console.log(`Server is listening on PORT ${port}`);
    });
}
app.use(errorHandler);
app.use('*',notFound);

module.exports = {
    app:app,
    start:start
}