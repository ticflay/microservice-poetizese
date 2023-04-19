import { Table, Model, Column, DataType, IsEmail, PrimaryKey} from "sequelize-typescript";

@Table({
    tableName: 'comments'
})
export class Comment extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    postId!: string;
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