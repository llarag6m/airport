import z from "zod"
import { extractValidationData } from "../common/utils/extractErrorData.js"

const planeSchema = z.object({
    plane_number: z.string().min(10).max(20),
    model: z.string().min(100).max(200),
    max_capacity: z.string().min(1000).max(2000),
    arline: z.enum(['AeroGlobe','AeroTronix','VelocityAir','AirQuest','StarLink']),
    status: z.string().min(10).max(20),
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