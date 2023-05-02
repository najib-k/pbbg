import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Player } from "./Player";
import { Channel } from "./Channel"

@Table
export class Message extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    text!: string;

    @ForeignKey(() => Channel)
    channelId!: Channel;

    @ForeignKey(() => Player)
    playerId!: Player;

    @BelongsTo(() => Player, 'playerId')
    player!: Player;

    @BelongsTo(() => Channel, 'channelId')
    channel!: Channel;

}