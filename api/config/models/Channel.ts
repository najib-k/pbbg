import {Table, Column, DataType, Model, HasMany, BelongsToMany} from 'sequelize-typescript';
import { Message } from './Message';
import { Player } from './Player';
import { PlayerChannels } from './PlayerChannels';

@Table
export class Channel extends Model {
    @Column ( {
        type: DataType.STRING,
        allowNull: false})
    name!: string;

    @Column ( {
        type: DataType.INTEGER,
    defaultValue: 0})
    participants!: number;

    @Column ({
        type: DataType.TEXT})
    sockets!: string;

    @HasMany( () => Message, 'channelId')
    messages?: Message[];

    @BelongsToMany(() => Player, () => PlayerChannels)
    players: Player[];


}