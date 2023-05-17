import winston from "winston"


const logger = winston.createLogger({
   // levels: logLevels,
   // level: 'info',
   format: winston.format.combine(
      winston.format.timestamp({
         format: 'YYYY-MM-DD HH:mm',
      }),
      winston.format.json()
   ),
   transports: [
      // new winston.transports.Console(),
      new winston.transports.File({ filename: 'main.log' })
   ],
});

export default logger
