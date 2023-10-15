import { Router } from "express";
import { createFlight, deleteFlight, findAllFlight, updateFlight, approveFlight } from "./flight.controller.js";
import { validateExistFlight } from "./flight.middleware.js";
import { restrictTo } from "../auth/auth.middleware.js";


export const router = Router()

router.route("/")
    .get(findAllFlight)
    .post(createFlight)

router.patch(
    '/approve-takeoff/:id',
    restrictTo('admin','developer'),
    approveFlight
)

router
    .use('/:id', validateExistFlight)
    .route("/:id")
    .patch(updateFlight)
    .delete(deleteFlight)