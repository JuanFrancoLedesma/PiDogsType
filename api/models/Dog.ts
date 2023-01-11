"use strict";
import { Model, UUIDV4 } from "sequelize";
import { DogAttributes } from "../utils/types";

module.exports = (sequelize: any, DataTypes: any) => {
  class Dog extends Model<DogAttributes> implements DogAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    metric_weight!: number[]
    imperial_weight!: number[]
    metric_height!: number[]
    imperial_height!: number[]
    life_span!:number[]
    createdByUser!: boolean;
    password?: string;
    image!: string;
    static associate(models: any) {
      // define association here
      Dog.belongsToMany(models.Temperament, {
        through: "DogTemperament",
      });
    }
  }
  Dog.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metric_weight: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      imperial_weight: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      metric_height: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      imperial_height: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      life_span: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull:false
      },
      createdByUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://i.pinimg.com/236x/72/d7/2d/72d72dba8a8a0b4ff38edf2f6f1087c9--beagle-svg-beagle-silhouette.jpg",
      },
    },
    {
      sequelize,
      modelName: "Dog",
    }
  );
  return Dog;
};
