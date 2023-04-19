"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const messages_1 = __importDefault(require("./routes/messages"));
const cors_1 = __importDefault(require("cors"));
const authentication_1 = require("./controllers/authentication");
const config_1 = __importDefault(require("./db/config"));
const app = (0, express_1.default)();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use('/', messages_1.default);
app.get('/auth', authentication_1.verifyToken, (req, res) => {
    console.log(req.headers);
    res.send("Token validado!");
});
config_1.default.sync().then(() => {
    console.log("Database successfully connected");
})
    .catch((err) => {
    console.log("Error", err);
});
io.on('connection', (socket) => {
    console.log('usuario conectou');
    socket.on('join', (conversationId) => {
        console.log('user joined conversation');
        socket.join(conversationId);
    });
    socket.on('new message', (data) => {
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
