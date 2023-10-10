import { Router } from "express";
import { createFlight, deleteFlight, findAllFlight, updateFlight } from "./flight.controller.js";
import { validateExistFlight } from "./flight.middleware.js";


export const router = Router()

router.route("/")
    .get(findAllFlight)
    .post(createFlight)

router
    .use('/:id', validateExistFlight)
    .route("/:id")
    .patch(updateFlight)
    .delete(deleteFlight)