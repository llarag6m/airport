import { Router } from "express";
import { createPlane, deletePlane, findAllPlanes, updatePlane } from "./plane.controller.js";
import { validateExistPlane } from "./plane.middleware.js";


export const router = Router()

router
    .route("/")
    .get(findAllPlanes)
    .post(createPlane)
    
router
    .use('/:id', validateExistPlane)
    .route("/:id")
    .patch(updatePlane)
    .delete(deletePlane)