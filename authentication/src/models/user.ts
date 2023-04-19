import { Table, Model, Column, DataType, IsEmail } from "sequelize-typescript";

@Table({
    tableName: 'users',
    scopes: {
        noPassword: {
            attributes: { exclude: ['password']}
        }
    }
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    username!: string;
    @IsEmail
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;
}