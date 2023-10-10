import z from "zod"
import { extractValidationData } from "../common/utils/extractErrorData.js" 

const flightSchema = z.object({
    origin_id: z.string().min(8).max(10),
    destination_id: z.string().min(8).max(10),
    plane_id: z.string().min(8).max(10),
    departure_time: z.string({
        invalid_type_error: "Formato de salida incorrecto",
        required_error: "Registro de salida requerido"
      }),
    check_in: z.string({
        invalid_type_error: "Registro de formato incorrecto",
        required_error: "Registro requerido"
      }),
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