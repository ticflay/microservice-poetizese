import { Sequelize } from "sequelize-typescript";
import { Post } from "../models/Post";

const connection: Sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'senha',
    database:  'poetizese_posts',
    logging: false,
    models: [Post]
})

export default connection;