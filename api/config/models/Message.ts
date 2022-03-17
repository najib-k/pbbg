import {Table, Column, DataType, Model, ForeignKey} from 'sequelize-typescript';
import {Player} from "./Player";
import { Channel } from "./Channel"

@Table
export class Message extends Model {
    @Column ({
        type: DataType.STRING,
        allowNull: false})
    text!: string;


    @ForeignKey(() => Player)
    sender!: Player;

    @ForeignKey( () => Channel)
    channel!: Channel;

}