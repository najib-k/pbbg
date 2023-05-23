import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Player } from './Player';

@Table
export class Action extends Model {

    @Column({type: DataType.STRING})
    type!: string;

    @Column({type: DataType.JSON})
    data!: JSON;

    @ForeignKey(() => Player)
    @Column({type: DataType.INTEGER})
    playerId!: Player;

    @BelongsTo(() => Player)
    player!: Player;

}