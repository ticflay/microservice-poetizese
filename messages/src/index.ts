import express, { Request, Response } from 'express';
import { urlencoded } from 'body-parser';
import messageRoutes from './routes/messages';


import cors from 'cors';
import connection from './db/config';
import { Messages } from './models/messages';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
})

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}


app.use(cors())
app.use(express.json());
app.use(urlencoded({extended: true}));



app.use('/', messageRoutes);


connection.sync().then(() => {
  console.log("Database successfully connected")
})
.catch((err) => {
  console.log("Error", err);
});


io.on('connection', (socket: any) => {
  console.log('usuario conectou');

  socket.on('join', (conversationId: number) => {
    console.log('user joined conversation');
    socket.join(conversationId);
  });
  socket.on('new message', (data: Messages) => {
    console.log('New message', data);
    io.to(data.conversationId).emit('receive message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
