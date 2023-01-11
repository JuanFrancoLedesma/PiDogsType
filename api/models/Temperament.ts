"use strict";
import { Model } from "sequelize";

interface TemperamentAttributes {
  // id: string;
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Temperament
    extends Model<TemperamentAttributes>
    implements TemperamentAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // id!: string;
    name!: string;
    static associate(models: any) {
      // define association here
      Temperament.belongsToMany(models.Dog, {
        through: 'DogTemperament'
      })
    }
  }
  Temperament.init(
    {
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Temperament",
    }
  );
  return Temperament;
};
