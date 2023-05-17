import User from "../models/User.js"
import Doctor from "../models/Doctor.js"

class registrationController {

   async registration(req, res) {
      try {
         const { user_id, doctor_id, slot } = req.body

         const user = await User.findOne({ _id: user_id })
         const doctor = await Doctor.findOne({ _id: doctor_id })

         if (new Date(slot).getTime() < new Date().getTime()) {
            res.status(400).json({ message: 'We do not have the opportunity to rewrite the past now..' })
         } else if (!user) {
            res.status(400).json({ message: 'We have not such user..' })
         } else if (!doctor) {
            res.status(400).json({ message: 'We have not such doctor..' })
         } else {
            let answer = null

            for (let i = 0; i < doctor.slots.length; i++) {
               const time = new Date(slot).getTime()
               const dTime = time === new Date(doctor.slots[i].dt).getTime()
               const emptySlot = doctor.slots[i].user === 'null'

               if (dTime && emptySlot) {

                  answer = await Doctor.findOneAndUpdate(
                     { _id: doctor_id, "slots.dt": time, "slots.user": "null" },
                     { $set: { "slots.$.user": user_id } },
                     { new: true }
                  )

                  res.status(201).json(answer)
                  break
               }
            }
            if (!answer) {
               res.status(400).json("All slots reserved or date unavailable.")
            }
         }


      } catch (e) {
         console.log(e)
         res.status(400).json({ message: 'We have some error..', error: e.message })
      }
   }

   async getUsers(req, res) {
      try {
         const users = await User.find()
         res.status(200).json(users)
      } catch (e) {
         console.log(e)
         res.status(400).json({ message: 'We have some error..', error: e.message })
      }
   }

   async getDoctors(req, res) {
      try {
         const doctors = await Doctor.find()
         res.status(200).json(doctors)
      } catch (e) {
         console.log(e)
         res.status(400).json({ message: 'We have some error..', error: e.message })
      }
   }
}

export default new registrationController
