import { Router } from "express";
import { 
    getallUpcomingUserEvent,
    getallUpcomingEvent,   
} from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/getUpcomingEvents").get(verifyJWT, getallUpcomingEvent)
router.route("/getUpcomingUserEvents").get(verifyJWT, getallUpcomingUserEvent)

export default router