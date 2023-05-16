import { Table, Column, DataType, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey } from 'sequelize-typescript';
import { Player } from './Player';

@Table
export class Item extends Model {
    
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id: any;

    @Column({
        type: DataType.JSON,
        defaultValue: {}
    })
    stats?: JSON;

    @Column({
        type: DataType.NUMBER,
        allowNull: false
    })
    rarity?: number;

    @ForeignKey(() => Player)
    playerId!: Player;

    @BelongsTo(() => Player, 'playerId')
    player!: Player;
}