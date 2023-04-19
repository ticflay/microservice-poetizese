import { Sequelize } from "sequelize-typescript";
import { Comment } from "../models/Comment";

const connection: Sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'senha',
    database:  'poetizese_comments',
    logging: false,
    models: [Comment]
})

export default connection;