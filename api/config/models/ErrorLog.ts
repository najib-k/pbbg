import {Table, Column, DataType, Model} from 'sequelize-typescript';

@Table
export class ErrorLog extends Model {
    @Column ( {
        type: DataType.STRING,
        allowNull: false})
    type?: string;

    @Column ( {
        type: DataType.JSON,
    allowNull: false})
    details?: number;


}