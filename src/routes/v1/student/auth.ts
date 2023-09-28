import * as controller from '../../../controller/student/auth'
import { Router } from 'express'
import { passportConfiguration } from '../../../middlewares/passport'
import passport from 'passport'
import * as validation from '../../../validations/auth'

passportConfiguration(passport)

const router = Router()
 router.use(passport.initialize())

    // signup
 router.route('/form-signup')
     .post(validation.formSignup,controller.signupUser);

 router.route('/gmail-signup')
     .post(validation.linkedInSignup,controller.signupUser);

 router.route('/verify-number')
     .post(validation.numberLogin,controller.signupPhonenumber);

     
    //  signin
 router.route('/email-login')
     .post(validation.emailLogin,controller.signinUser);

 router.route('/google-signin')
     .post(validation.linkedInLogin,controller.signinUser);

 router.route('/number-login')
     .post(validation.numberLogin,controller.signinUser);

    //  others
 router.route('/verify-otp')
     .post(controller.verifyOTP);
 router.route('/resend-otp')
     .patch(controller.resendOTP);

 router.route('/forget-password')
     .post(controller.forgetPassword);

 router.route('/forget-password')
     .patch(controller.setForgetPassword);
     router.route('/change-password')
     .patch(controller.changePassword);

export default router