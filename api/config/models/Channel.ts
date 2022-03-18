import {Table, Column, DataType, Model, HasMany} from 'sequelize-typescript';
import { Message } from './Message';

@Table
export class Channel extends Model {
    @Column ( {
        type: DataType.STRING,
        allowNull: false})
    name!: string;

    @Column ( {
        type: DataType.INTEGER})
    participants!: number;

    @Column ({
        type: DataType.TEXT})
    sockets!: string;

    @HasMany( () => Message)
    messages?: Message[];


}