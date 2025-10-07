import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../Database';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare price: number;
  declare imageUrl: string;
  declare category: string;
  declare subcategory: string;
  declare stock: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('price') ?? 0;
      }

    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    subcategory: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'Products',
    freezeTableName: true,
    timestamps: true,
  }
);

export default Product;

