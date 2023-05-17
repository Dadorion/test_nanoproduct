import { Router } from "express"
import notificationController from "../controllers/notificationController.js"

const routerNotification = new Router()

routerNotification.post('/check_time', notificationController.checkTime)


export default routerNotification
