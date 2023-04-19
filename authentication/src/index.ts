import express from 'express';
import connection from './db/config';
import authenticationRoutes from './routes/auth';

import cors from 'cors';
import { urlencoded } from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));

app.use('/', authenticationRoutes)

connection.sync().then(() => {
    console.log("Database successfully connected");
}).catch((err) => console.log('err', err));

app.listen(3000, () => {
    console.log("Server started on port 3000");
})