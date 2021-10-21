const { RESPONSE_CODE } = require('./constant/');
const { rootRouter } = require('./routers/root.routers');

const config = require('./config/config.json')['development'];
const path = require('path');

const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(RESPONSE_CODE.OK).send("Hello from HieuDo'project 2");
});

const pathPublicDirectory = path.join(__dirname, './public');
app.use('/public', express.static(pathPublicDirectory));

app.use('/api', rootRouter);


app.listen(config.serverPort, () => {
    console.log(`App running on port ${config.serverPort}`);
});