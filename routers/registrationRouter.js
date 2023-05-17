import { Router } from "express"
import registrationController from "../controllers/registrationController.js"

const routerAPI = new Router()

routerAPI.post('/registration', registrationController.registration)
routerAPI.get('/users', registrationController.getUsers)
routerAPI.get('/doctors', registrationController.getDoctors)


export default routerAPI
