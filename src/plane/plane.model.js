import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Plane = sequelize.define("plane",{
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
    plane_number:{
        type: DataTypes.INTEGER,  
        allowNull: false,
    },
    model:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    max_capacity:{
        type: DataTypes.INTEGER,  
        allowNull: false,
    },
    arline:{
        type: DataTypes.ENUM(
            'AeroGlobe',
            'AeroTronix',
            'VelocityAir',
            'AirQuest',
            'StarLink'
          ),
          allowNull: false,
          defaultValue: 'AeroGlobe'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      } 
})


export default Plane