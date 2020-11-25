'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a first name."
        },
        notEmpty: {
          msg: "First name cannot be empty."
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a last name."
        },
        notEmpty: {
          msg: "Last name cannot be empty."
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide an e-mail address."
        },
        isEmail: {
          msg: "Please enter a valid e-mail address"
        }
      }
    },
    password_hash: {
      type: DataTypes.STRING,
      field: 'password',
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      set(val) {
          this.setDataValue('password', val);
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password_hash', hashedPassword);
      },
      validate: {
        notNull: {
          msg: "Please provide a password."
        },
        notEmpty: {
          msg: "Password cannot be empty."
        },
        len: {
          args: 8,
          msg: 'Password must be longer than 8 characters.'
        }
      },
      get() {
        return this.getDataValue('password_hash');
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = (models) => {
    User.hasMany(models.Course);
  }

  return User;
};