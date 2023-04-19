import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";

const connection: Sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'senha',
    database:  'poetizese_profile',
    logging: false,
    models: [User]
})

export default connection;