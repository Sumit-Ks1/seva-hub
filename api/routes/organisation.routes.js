import { Router } from "express";
import { 
    registerOrganisation,
    loginOrganisation,
    logoutOrganisation,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentOrganisation,
    addEvent,
    pastEvents,
    upcomingEvents,
    getAllEvents,
    
} from "../controllers/organisation.controller.js";

import { orgverifyJWT } from "../middlewares/orgAuth.middleware.js";
const router = Router()

router.route("/").get((req, res) => {
    console.log("Hello World");
    res.send("Hello World")
})
router.route("/register").post(registerOrganisation)


router.route("/login").post(loginOrganisation)

//secured routes
router.route("/logout").post(orgverifyJWT,  logoutOrganisation)
router.route("/current-org").get(orgverifyJWT, getCurrentOrganisation)
router.route("/add-event").post(orgverifyJWT, addEvent)
router.route("/past-events").get(orgverifyJWT, pastEvents)
router.route("/upcoming-events").get(orgverifyJWT, upcomingEvents)
router.route("/get-all-events").get(orgverifyJWT, getAllEvents)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(orgverifyJWT, changeCurrentPassword)


export default router