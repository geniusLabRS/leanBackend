import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface InterestAttributes {

    id?: number;
    label?: string;
    createdAt?: string;
    updateAt?: string;
}

export interface InterestInstance extends Sequelize.Instance<InterestAttributes> {}

export interface InterestModel extends BaseModelInterface, Sequelize.Model<InterestInstance, InterestAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): InterestModel => {

    const Interest: InterestModel = sequelize.define('Interest',{

        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        label:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
    },
    {
        tableName: 'interests',
    });

    return Interest;
}