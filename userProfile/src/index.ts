import express from 'express';
import connection from './db/config';

import cors from 'cors';
import { urlencoded } from 'body-parser';
import userRoutes from './routes';
const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));

app.use('/', userRoutes)

declare global {
    namespace Express {
      interface Request {
        userId: string
      }
    }
  }
  

connection.sync().then(() => {
    console.log("Database successfully connected");
}).catch((err) => console.log('err', err));

app.listen(3000, () => {
    console.log("Server started on port 3000");
})