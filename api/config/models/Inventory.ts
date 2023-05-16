import { Table, Column, DataType, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Player } from './Player';
import { Item } from './Items';

@Table
export class Inventory extends Model {

    @HasMany(() => Item)
    uuids?: Item[];

    @Column({
        type: DataType.JSON,
        defaultValue: {}
    })
    others?: JSON;

    @ForeignKey(() => Player)
    playerId!: Player;

    @BelongsTo(() => Player, 'playerId')
    player!: Player;
}