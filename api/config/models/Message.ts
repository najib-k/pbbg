import {Table, Column, DataType, Model, HasOne} from 'sequelize-typescript';
import {Player} from "./Player";

@Table
export class Message extends Model {
    @Column ({
        type: DataType.STRING,
        allowNull: false})
    content!: string;

    @HasOne(() => Player)
    @Column({
        allowNull: false})
    origin!: Player;

    @Column({
        type: DataType.INTEGER,
        allowNull: false})
    room!: number;

}