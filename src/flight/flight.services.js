import Flight from "./flight.model.js";
import { Op } from "sequelize";

export class FlightService {

 

    async findOneFlight(id){

      let whereClause = {
        id: id,
        status: status
      }

      if (!status) {
         whereClause.status ={
          [Op.in]: ["pending", "inProgress", "done"]
         }
      }
        return await Flight.findOne({
          where: whereClause
        })
      }
    
      async findAllFlight(){
        return await Flight.findAll({
          where: {
            status: {
              [Op.notIn]: ['done','cancelled']
            }
          }
        })  
      }

    async createFlight(data){
        return await Flight.create(data)
      }

    async updateFlight(flight, data){
        return await flight.update(data)
      }
    
    async deleteFlight(flight) {
        return await flight.update({ status: false })
    }
}