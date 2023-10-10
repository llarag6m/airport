import { Sequelize } from "sequelize";
import { envs } from "../enviroments/enviroments.js";


const sequelize = new Sequelize(envs.DB_URI,{
    logging: false
})

export async function authenticate() {
    try{
       await sequelize.authenticate()
       console.log("Conexion se ha estabilizado correctamnete 😘")
    } catch(error) {
        throw new Error('Error al autenticar: ', error)
    }
}

export async function syncUp(){
    try{
        await sequelize.sync()
            console.log("Conexion se ha sincronizado correctamente")
    } catch (error) {
        throw new Error('Error al sincronizar: ', error)
    }
}
 
export default sequelize