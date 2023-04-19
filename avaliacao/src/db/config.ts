import { Sequelize } from "sequelize-typescript";
import { Avaliacao } from "../models/Avaliacao";

const connection: Sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'senha',
    database:  'poetizese_avaliacao',
    logging: false,
    models: [Avaliacao]
})

export default connection;