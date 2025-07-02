import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../Database'; // adjust path to your Sequelize instance

// Define attributes for User
interface UserAttributes {
  id: number;
  email: string;
  passwordHash: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Fields required for creation (exclude auto-generated fields like id and passwordHash)
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'passwordHash' | 'isAdmin'> {
  password?: string; // plain-text password for registration
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public isAdmin?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance method to validate password
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}

// Sequelize model definition
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user: UserCreationAttributes & { password?: string }) => {
        if (user.password) {
          const hash = await bcrypt.hash(user.password, 10);
          (user as any).passwordHash = hash;
        }
      },
    },
  }
);

export default User;


