import { Table, Column, DataType, Model } from 'sequelize-typescript';

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

}