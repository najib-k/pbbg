import { Table, Column, DataType, Model, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
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
        type: DataType.JSON,
        defaultValue: {}
    })
    quality?: JSON;

    @Column({
        type: DataType.JSON,
        defaultValue: {}
    })
    affixes?: JSON;

    @Column({
        type: DataType.JSON,
        defaultValue: {}
    })
    keywords?: JSON;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    rarity!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    lvl!: number;

    @Column({
        type: DataType.STRING
    })
    type!: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    equipped!: Boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    ownerId!: number;

    @ForeignKey(() => Inventory)
    @Column({type: DataType.INTEGER})
    inventoryId?: number;

    @BelongsTo(() => Inventory)
    inventory!: Inventory;
}