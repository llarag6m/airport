import Flight from "./flight.model.js";

export class FlightService {

    async findOneFlight(id){
        return await Flight.findOne({
          where: {
            id,
            status: true,
          }
        })
      }
    
      async findAllFlight(){
        return await Flight.findAll({
          where: {
            status: true
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