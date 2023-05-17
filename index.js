import express from 'express'
import mongoose from 'mongoose'
import routerAPI from './routers/registrationRouter.js'
import routerNotification from './routers/notificationRouter.js'
import keys from './config/keys.js'

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.get('/', (req, res) => { res.json('Welcome to Server') })
app.use('/api', routerAPI)
app.use('/notification', routerNotification)

async function startApp() {
   try {
      await mongoose.connect(keys.mongoURI)
         .then(() => { console.log('MongoDB connected') })
         .catch(err => { console.log(err) })
      app.listen(PORT, () => {
         console.log('SERVER WORKS ON PORT ' + PORT)
      })
   }
   catch (e) { console.log(e) }
}

startApp()
