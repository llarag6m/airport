import { AppError, catchAsync } from "../errors/index.js";
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

export const findAllPlanes = catchAsync(async(req, res, next) =>{
    const planes = await planeService.findAll()
    return res.status(200).json(planes)
})

export const findOnePlane = catchAsync(async(req, res, next) =>{
    const { id } = req.params;
    
    const plane = await planeService.findOne(id)

    if (!plane) {
        return next(new AppError(`No se encuentra el plane con id ${id}`, 404))
    }

    return res.status(200).json(plane)
})

export const updatePlane = catchAsync(async(req, res, next) =>{

    const { hasError, errorMessages, PlaneData } = validatePartialPlane(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    const { id } = req.params
    const plane = await planeService.findOne(id)

    if (!plane) {
        return next(new AppError(`Can't find plane with id: ${id}`, 404));
    }

    const planeUpdate = await planeService.updatePlane(plane, PlaneData)
    return res.status(200).json(planeUpdate)
})


export const deletePlane = catchAsync(async(req, res, next) => {
    const { id } = req.params

    const plane = await planeService.findOne(id)

    if (!plane) {
        return next(new AppError(`Can't find plane with id: ${id}`, 404));
      }

    await planeService.deletePlane(plane)
    return res.status(204).json(null)

})