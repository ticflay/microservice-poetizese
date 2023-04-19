import { Table, Model, Column, DataType, IsEmail, PrimaryKey} from "sequelize-typescript";

@Table({
    tableName: 'avaliacao'
})
export class Avaliacao extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {min: 1, max: 5}
    })
    avaliacao!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    authorId!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    postId!: number;
}