import z from "zod"
import { extractValidationData } from "../common/utils/extractErrorData.js"

const planeSchema = z.object({
    plane_number: z.number(),
    model: z.string().min(100).max(200),
    max_capacity: z.number(),
    arline: z.enum(['AeroGlobe','AeroTronix','VelocityAir','AirQuest','StarLink']),
})


export function validatePlane(data){
    const result = planeSchema.safeParse(data)
    
    const { 
      hasError, 
      errorMessages, 
      data: PlaneData 
    } = extractValidationData(result)
    
    return {
      hasError,
      errorMessages,
      PlaneData
    }
  }


  export function validatePartialPlane(data){
    const resul = planeSchema.partial().safeParse(data)
    
    const { 
      hasError, 
      errorMessages, 
      data: PlaneData 
    } = extractValidationData(resul)
    
    return {
      hasError,
      errorMessages,
      PlaneData
    }
  }