import { catchAsync } from "../errors/index.js";
import { validatePartialPlane, validatePlane } from "./plane.schema.js";
import { PlaneService } from "./plane.services.js"

const planeService = new PlaneService();


export const createPlane = catchAsync(async(req, res, next) =>{
    const { hasError, errorMessages, PlaneData } = validatePlane(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const plane = await planeService.createPlane(PlaneData)
    return res.status(201).json(plane)
})

export const findAllPlanes = catchAsync(async(req, res) =>{
    const planes = await planeService.findAllPlane()
    return res.status(200).json(planes)
})

export const findOnePlane = catchAsync(async(req, res) =>{
    const { plane } = req
    return res.status(200).json(plane)
})

export const updatePlane = catchAsync(async(req, res) =>{
    const { plane } = req
    const { hasError, errorMessages, PlaneData } = validatePartialPlane(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    const planeUpdate = await planeService.updatePlane(plane, PlaneData)
    return res.status(200).json(planeUpdate)
})


export const deletePlane = catchAsync(async(req, res) => {
    const { plane } = req
    await planeService.deletePlane(plane)
    return res.status(204).json(null)

})