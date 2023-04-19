import { Table, Model, Column, DataType, IsEmail, Scopes, HasMany} from "sequelize-typescript";
import { Messages } from "./messages";


@Table({
    tableName: 'conversations'
}
)
export class Conversations extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;
    @Column({
        type: DataType.STRING,
    })
    description: string = ''; 
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    participant1!: number; 
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    participant2!: number; 
    @HasMany(() => Messages)
    messages: Messages[] = [];
}