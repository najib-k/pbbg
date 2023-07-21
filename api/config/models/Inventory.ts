import { Table, Column, DataType, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Player } from './Player';
import { Item } from './Item';

@Table
export class Inventory extends Model {

    @HasMany(() => Item)
    uuids?: Item[];

    @Column({
        type: DataType.JSON,
    })
    others?: JSON;

    @ForeignKey(() => Player)
    @Column({type: DataType.INTEGER})
    playerId?: number;

    @BelongsTo(() => Player)
    player!: Player;
}