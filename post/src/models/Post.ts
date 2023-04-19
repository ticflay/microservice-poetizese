import { Table, Model, Column, DataType, IsEmail, PrimaryKey} from "sequelize-typescript";

@Table({
    tableName: 'posts'
})
export class Post extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    authorId!: number;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    content!: string;
}