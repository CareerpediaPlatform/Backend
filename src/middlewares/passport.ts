import logger from '../logger'

export function passportConfiguration (passport): any {
  logger.info('passportConfiguration()')
  try {
    passport.serializeUser(function (user, done) {
      done(null, user)
    })

    passport.deserializeUser(function (user, done) {
      done(null, user)
    })

  } catch (e) {
    logger.error('Error in passportConfiguration()', e)
  }
}
