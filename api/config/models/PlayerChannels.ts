import {Table, Column, BelongsTo, Model, ForeignKey, PrimaryKey, DataType} from 'sequelize-typescript';
import { Channel } from './Channel';
import { Player } from './Player';

@Table
export class PlayerChannels extends Model { 
    @ForeignKey(() => Player)
    @Column({type: DataType.INTEGER})
    playerId!: number;
  
  
    @ForeignKey(() => Channel)
    @Column({type: DataType.INTEGER})
    channelId!: number;
}