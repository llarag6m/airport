import { catchAsync } from "../errors/index.js";
import { validateFlight, validatePartialFlight } from "./flight.schema.js";
import { FlightService } from "./flight.services.js";


const flightService = new FlightService()

export const createFlight = catchAsync(async(req, res, next) =>{
    const { hasError, errorMessages, flightData } = validateFlight(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const flight = await flightService.createFlight(flightData)
    return res.status(201).json(flight)
})


export const findAllFlight = catchAsync(async(req, res) =>{
    const flights = await flightService.findAllFlight()
    return res.status(200).json(flights)
})

export const findOneFlight = catchAsync(async(req, res) =>{
    const { flight } = req
    return res.status(200).json(flight)
})

export const updateFlight = catchAsync(async(req, res) => {
    const { flight } = req
    const { hasError, errorMessages, flightData } = validatePartialFlight(req.body)
    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    const flightUpdate = await flightService.updateFlight(flight, flightData)
    return res.status(200).json(flightUpdate)
})

export const deleteFlight = catchAsync(async(req, res) =>{
    const { flight } = req
    await flightService.deleteFlight(flight)
    return res.status(204).json(null)
})
