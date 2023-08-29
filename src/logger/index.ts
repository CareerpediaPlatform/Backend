import { LOG_LEVEL } from '../Loaders/config'
import path from 'path'
import { createLogger, format, transports, Logger } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const objectifyError = format((info: any, error?: any) => {
  if (error instanceof Error) {
    info = Object.assign({
      message: info.message,
      stack: error.stack
    }, info)
  }
  return info
})

const printf = (info: any) => {
  return `${info.timestamp} ${info.label}[${info.level}]: ${info.message} ${info.stack ?? ''}`
}

function logger (): Logger {
  return createLogger({
    exitOnError: false,
    level: LOG_LEVEL,
    format: format.combine(
      objectifyError(),
      format.label({
        label: path.basename((process.mainModule != null) ? process.mainModule.filename : '')
      }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(printf)
    ),
    silent: process.env.NODE_ENV === 'test',
    transports: [
      new transports.Console({
        format: format.combine(
          objectifyError(),
          format.colorize(),
          format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          format.printf(printf)
        )
      }),
      new DailyRotateFile({
        filename: path.resolve('./logs', 'beej-api-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '50m',
        maxFiles: '15d'
      })
    ]
  })
}

export default logger()
