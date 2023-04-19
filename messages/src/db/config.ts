import { Sequelize } from 'sequelize-typescript';

import { Conversations } from '../models/conversations';
import { Messages } from '../models/messages';
const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'senha',
    database: 'Message',
    logging: false,
    models: [Conversations, Messages]
})

export default connection;