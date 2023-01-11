import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import path from 'path';

import {router} from './routers/index.js';
// import {sequelize} from "./db.js";

dotenv.config();

const PORT = process.env.PORT || 7000;
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
