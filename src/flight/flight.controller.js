import { CityService } from "../city/city.services.js";
import { envs } from "../config/enviroments/enviroments.js";
import { httpClient } from "../config/plugins/http-client.plugin.js";
import { AppError, catchAsync } from "../errors/index.js";
import { validateFlight, validatePartialFlight } from "./flight.schema.js";
import { FlightService } from "./flight.services.js";


const flightService = new FlightService()
const cityService = new CityService

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


export const findAllFlight = catchAsync(async(req, res, next) =>{

    const flights = await flightService.findAllFlight()
    return res.status(200).json(flights)
})

export const findOneFlight = catchAsync(async(req, res, next) =>{

    const { id } = req.params
    const { status } = req.query

    const flight = await flightService.findOneFlight(id, status)

    if (!flight) {
        return next(new AppError(`flight with id: ${id} not found!`, 400));
    }

    return res.status(200).json(flight)
})

export const updateFlight = catchAsync(async(req, res, next) => {
   
    const { hasError, errorMessages, flightData } = validatePartialFlight(req.body)
    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const {id} = req.params
    const flight = await flightService.findOneFlight(id)

    if (!flight) {
        return next(new AppError(`flight with id: ${id} not found!`));
    }

    const flightUpdate = await flightService.updateFlight(flight, flightData)
    return res.status(200).json(flightUpdate)
})

export const deleteFlight = catchAsync(async(req, res, next) =>{
    const { id } = req.params
    const flight = await flightService.findOneFlight(id, 'pending')
    
    if (!flight) {
        return next(new AppError(`can't find flight with id: ${id}`));
    }

    await flightService.deleteFlight(flight)
    return res.status(204).json(null)
})


export const approveFlight = catchAsync(async(req, res, next) =>{
const {id} = req.params

const flight = await flightService.findOneFlight(id, 'pending')

    if(!flight){
    return next(new AppError())
    }

    const originCity = await cityService.findOneCity(flight.origin_id)

    if (!originCity) {
        return next(new AppError(`flight with id: ${id} not found!`, 404))
    }

    const destinationCity = await cityService.findOneCity(flight.destination_id)

    if (!destinationCity) {
        
        return next(new AppError(`city of destiny doesn't exists`))
    }

    const weaterConditions = await httpClient.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${originCity.lat}&lon=${originCity.long}&appid=${envs}`
    )

    console.log(weaterConditions)

    if(weaterConditions.weather[0].main === 'Rain'){
        return next(
          new AppError('weather conditions do not meet the requeriments for tokeoff', 400)
        )
      }
    
      const updatedFlight = await flightService.update(flight, {
        status: 'inProgress',
        checkIn: new Date()
      })
    
      return res.status(200).json(updatedFlight)

})