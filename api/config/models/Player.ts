import { Table, Column, DataType, Model, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { Message } from "./Message";
import { PlayerChannels } from './PlayerChannels';
import { Channel } from './Channel';
import { Inventory } from './Inventory';
import { Action } from './Action';
import { ActionGroup } from './ActionGroup';

@Table
export class Player extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    mail?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password?: string;

    @Column({
        type: DataType.JSON
    })
    stats?: JSON;

    @HasMany(() => Action)
    actions?: Action[];

    @HasMany(() => Inventory)
    inventories?: Inventory[];

    @HasMany(() => Message, 'playerId')
    messages?: Message[];

    @BelongsToMany(() => Channel, () => PlayerChannels)
    channels?: Channel[];

}