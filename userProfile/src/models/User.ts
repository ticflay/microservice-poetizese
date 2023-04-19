import { Table, Model, Column, DataType, IsEmail, PrimaryKey} from "sequelize-typescript";

@Table({
    tableName: 'users',
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: false
    })
    userId!: number;
    @Column({
        type: DataType.STRING
    })
    description?: string;
}