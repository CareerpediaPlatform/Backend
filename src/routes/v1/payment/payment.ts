import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import {isAuthenticated} from '../../../middlewares/authentication'
import * as paymentControler from '../../../controller/payment/payment'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

 router.route('/payment')
     .post(paymentControler.paymentPay);
 router.route('/verify')
     .post(paymentControler.paymentVerify);

     export default router