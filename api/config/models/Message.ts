import {Table, Column, DataType, Model, ForeignKey} from 'sequelize-typescript';
import {Player} from "./Player";

@Table
export class Message extends Model {
    @Column ({
        type: DataType.STRING,
        allowNull: false})
    content!: string;


    @ForeignKey(() => Player)
    origin!: Player;

    @Column({
        type: DataType.INTEGER,
        allowNull: false})
    room!: number;


}