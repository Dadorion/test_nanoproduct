import User from "../models/User.js"
import Doctor from "../models/Doctor.js"
import logger from "../logger/logger.js"

class notificationController {
   async checkTime(req, res) {
      try {
         const now = new Date(req.body.today).getTime()

         let remindersCount = 0

         const doctors = await Doctor.find()
         for (let j = 0; j < doctors.length; j++) {
            const doctor = doctors[j]

            for (let i = 0; i < doctor.slots.length; i++) {
               const dTime = Math.floor((doctor.slots[i].dt.getTime() - now) / (60 * 60 * 1000))

               const
                  emptySlot = doctor.slots[i].user === 'null',
                  user = await User.findOne({ _id: doctor.slots[i].user }),
                  doctorSpec = doctor.spec,
                  t = doctor.slots[i].dt,
                  slotTime = `${t.getHours() - 4}:${t.getMinutes()}`

               if (dTime <= 24 && dTime > 2 && !emptySlot && !doctor.slots[i].isNotified_24) {
                  await Doctor.findOneAndUpdate(
                     { "slots.dt": t },
                     { $set: { "slots.$.isNotified_24": true } },
                     { new: true }
                  )
                  remindersCount += 1

                  logger.info(`Привет, ${user.name}! Напоминаем что вы записаны к ${doctorSpec}у завтра в ${slotTime}!`)
               }

               if (dTime <= 2 && dTime > 1 && !emptySlot && !doctor.slots[i].isNotified_2) {
                  await Doctor.findOneAndUpdate(
                     { "slots.dt": t },
                     { $set: { "slots.$.isNotified_2": true } },
                     { new: true }
                  )
                  remindersCount += 1

                  logger.info(`Привет, ${user.name}! Вам через 2 часа к ${doctorSpec}у в ${slotTime}!`)
               }
            }
         }
         res.status(200).json(`We sent reminders: ${remindersCount}.`)
      } catch (e) {
         console.log(e)
         res.status(400).json({ message: 'We have some error..', error: e.message })
      }
   }
}

export default new notificationController
