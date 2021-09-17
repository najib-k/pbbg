import {Table, Column, DataType, Model, HasMany} from 'sequelize-typescript';
import {Message} from "./Message";

@Table
export class Player extends Model {
    @Column ({
        type: DataType.STRING,
        allowNull: false})
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false})
    mail!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false})
    password!: string;

    @HasMany (() => Message)
    messages?: Message[];

}