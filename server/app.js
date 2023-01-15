import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import {router} from './routers/index.js';
import {ApiError} from './error/ApiError.js'
// import {sequelize} from "./db.js";

dotenv.config();

const PORT = process.env.PORT || 7000;
const app = express();

app.use(cors({origin: _configCors}));
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))
app.use('/api', router)

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

function _configCors(origin, callback) {

    if (process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = process.env.ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ApiError('CORS is not allowed'), false);
    }

    return callback(null, true);
}
