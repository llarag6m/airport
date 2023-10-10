import Passengers from "./passengers.model.js";

export class PassengerService {

  async findOnePassenger(id){
    return await Passengers.findOne({
      where: {
        id,
        status: true,
      }
    })
  }

  async findAllPassengers(){
    return await Passengers.findAll({
      where: {
        status: true
      }
    })  
  }

  async createPassenger(data){
    return await Passengers.create(data)
  }

  async updatePassenger(passenger, data){


    return await passenger.update(data)
  }

  async deletePassenger(passenger) {
    return await passenger.update({ status: false })
  }

}