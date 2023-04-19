import { Table, Model, Column, DataType,  BelongsTo, ForeignKey} from "sequelize-typescript";
import { Conversations } from "./conversations";


@Table({
    tableName: 'messages'
})
export class Messages extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    senderId!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    receiverId!: number;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    message!: string;
    @ForeignKey(() => Conversations)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    conversationId!: number;
    @BelongsTo(() => Conversations)
    conversation!: Conversations;
}