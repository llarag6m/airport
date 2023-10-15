import { Router }  from 'express'
import { findAllPassengers,createPassenger,findOnePassenger,updatePassenger,deletePassenger } from './passengers.controller.js';


export const router = Router();

// router.use(protect)

router
  .route("/")
  .get(findAllPassengers)
  .post(createPassenger);

router
  .route("/:id")
  .get(findOnePassenger)
  .patch(updatePassenger)
  .delete(deletePassenger)