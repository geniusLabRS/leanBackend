import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface ProfileAttributes {
    id?: number;
    name?: string;
    biography?: string;
    fk_user?:number;
    createdAt?: string;
    updateAt?: string;
}

export interface ProfileInstance extends Sequelize.Instance<ProfileAttributes> {}

export interface ProfileModel extends BaseModelInterface, Sequelize.Model<ProfileInstance, ProfileAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ProfileModel => {

    const Profile: ProfileModel = sequelize.define('Profile',{

        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(50),
            allowNull: true
        },
        biography:{
            type: DataTypes.STRING(512),
            allowNull: true
        }
    },
    {
        tableName: 'profiles',
    });

    Profile.associate = (models: ModelsInterface): void => {
        Profile.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'fk_user',
                name: 'fk_user',
            }
        });
    }

    return Profile;
}