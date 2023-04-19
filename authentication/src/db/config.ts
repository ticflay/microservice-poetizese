import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";

const connection: Sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'senha',
    database:  'poetizese_authentication',
    logging: false,
    models: [User]
})

export default connection;