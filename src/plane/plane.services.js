import Plane from "./plane.model.js";

export class PlaneService {

    async findOne(id){
        return await Plane.findOne({
          where: {
            id,
            status: true,
          }
        })
      }
    
      async findAll(){
        return await Plane.findAll({
          where: {
            status: true
          }
        })  
      }

    async createPlane(PlaneData){
        return await Plane.create(PlaneData)
      }

    async updatePlane(plane, PlaneData){
        return await plane.update(PlaneData)
      }
    
    async deletePlane(plane) {
        return await plane.update({ status: false })
    }
}