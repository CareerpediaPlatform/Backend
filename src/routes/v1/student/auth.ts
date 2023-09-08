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

 router.route('/google-signup')
     .post(validation.linkedInSignup,controller.signupUser);

 router.route('/number-signup')
     .post(validation.numberLogin,controller.signupPhonenumber);

     
    //  signin
 router.route('/form-signin')
     .post(validation.emailLogin,controller.signinUser);

 router.route('/google-signin')
     .post(validation.linkedInLogin,controller.signinUser);

 router.route('/number-signin')
     .post(validation.numberLogin,controller.signinUser);

    //  others
 router.route('/otp')
     .post(controller.verifyOTP);

 router.route('/forget-password')
     .post(controller.forgetPassword);

 router.route('/forget-password')
     .patch(controller.setForgetPassword);

export default router