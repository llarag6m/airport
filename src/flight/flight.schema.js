import z from "zod"
import { extractValidationData } from "../common/utils/extractErrorData.js" 

const flightSchema = z.object({
    origin_id: z.number(),
    destination_id: z.number(),
    plane_id: z.number(),
    departure_time: z.string(),
    check_in: z.date().optional(),
    status: z.enum(['pending','inProgress','done','cancelled','delayed']),
})


export function validateFlight(data){
    const result = flightSchema.safeParse(data)
    
    const { 
      hasError, 
      errorMessages, 
      data: flightData 
    } = extractValidationData(result)
    
    return {
      hasError,
      errorMessages,
      flightData
    }
  }


  export function validatePartialFlight(data){
    const resul = flightSchema.partial().safeParse(data)
    
    const { 
      hasError, 
      errorMessages, 
      data: flightData 
    } = extractValidationData(resul)
    
    return {
      hasError,
      errorMessages,
      flightData
    }
  }