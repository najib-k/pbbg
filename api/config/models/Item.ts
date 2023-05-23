import { Table, Column, DataType, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey } from 'sequelize-typescript';
import { Player } from './Player';
import { Inventory } from './Inventory';

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
        type: DataType.INTEGER,
        allowNull: false
    })
    rarity!: number;

    @Column({
        type: DataType.STRING
    })
    type!: string;

    @ForeignKey(() => Inventory)
    @Column({type: DataType.INTEGER})
    inventoryId?: number;

    @BelongsTo(() => Inventory)
    inventory!: Inventory;
}