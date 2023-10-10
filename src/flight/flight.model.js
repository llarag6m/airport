import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Flight = sequelize.define("flight",{
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      origin_id:{
        type: DataTypes.INTEGER,  
        allowNull: false,
      },
      destination_id:{
        type: DataTypes.INTEGER,  
        allowNull: false,
      },
      plane_id:{
        type: DataTypes.INTEGER,  
        allowNull: false,
      },
      departure_time:{
        type: DataTypes.DATE,
        allowNull: false,
      },
      check_in:{
        type: DataTypes.DATE,
        allowNull: false,
      },
      status:{
        type: DataTypes.ENUM(
            'pending',
            'inProgress',
            'done',
            'cancelled',
            'delayed'
          ),
          allowNull: false,
          defaultValue: 'done'
      } 
})

export default Flight