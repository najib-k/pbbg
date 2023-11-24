import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Player } from "./Player";

@Table
export class Abilities extends Model {
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    maxP!: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    currentP!: number;

    //string: id,lvl,xp:id,lvl,xp:id,lvl,xp:...
    @Column({
        type: DataType.STRING,
        defaultValue: ""
    })
    passives?: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    maxA!: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    currentA!: number;

    //string: id,lvl,xp:id,lvl,xp:id,lvl,xp:...
    @Column({
        type: DataType.STRING,
        defaultValue: ""
    })
    actives?: string;

    @ForeignKey(() => Player)
    @Column({type: DataType.INTEGER})
    playerId!: number

}