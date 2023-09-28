import * as nodeMailer from 'nodemailer';
import logger from '../logger';

import { SENDER_EMAIL_ID } from 'src/Loaders/config';
let transport;

export async function createTransport() {
    try {
        if (transport) {
            return transport;
        }
        transport = nodeMailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'beejtesting@gmail.com',
                pass: 'tqfgcphzkydkxpzn',
            },
        });
        return transport;
    } catch (error) {
        logger.error('Error occurred in createTransport() ', error);
        throw error;
    }
}

export async function sendmail(user: any) {
    console.log("fffddddddddddddddddddddddddddddf")
    const email=user.email
    console.log(email)
    try {
        const mailOptions = {
            from: SENDER_EMAIL_ID,
            to: email,
            subject: user.subject,
            html: user.message,
        };

        console.log(SENDER_EMAIL_ID)
        const transporter = await createTransport();
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        logger.error('Error occurred in sendmail() ', error);
        throw error;
    }
}


export async function sendSignupEmail(user) {
   
    try {
     
        user.message = `<p>Hi 
        <p style=fontSize:20px ; color:blue>Email:<b>${user.email},</b></p>
        <br>
        <p style=fontSize:20px; color:blue>Password:<b>${user.password}</b></p>
        <p>Thanks for signing up with carrierpadia.</p>
     
        <br>
        <br>
        <h4>Best Regards</h4>
        <p>Team  Carrierpedia</p>`;
      
        user.subject = 'Welcome';
        await sendmail(user);
        return;
    } catch (error) {
        logger.error('Error occurred in sendSignupEmail');
        logger.error(error);
        throw error;
    }
}

export async function studentOtpEmail(user) {
    try {
     
        user.message = `<p>Hi 
        <p style=fontSize:35px,fontWeight:600 ; color:blue><b>${user.type}</b></p>
        <p style=fontSize:20px ; color:blue>Email:<b>${user.email},</b></p>
        <br>
        <p style=fontSize:20px; color:blue>otp:<b>${user.otp}</b></p>
        <p>Thanks for signing up with carrierpadia.</p>
     
        <br>
        <br>
        <h4>Best Regards</h4>
        <p>Team  Carrierpedia</p>`;
      
        user.subject = 'Welcome';
        await sendmail(user);
        return;
    } catch (error) {
        logger.error('Error occurred in studentSignupEmail');
        logger.error(error);
        throw error;
    }
}

//**********notification */
export async function sendRegistrationNotification(user) {
    try {
       
        let emailFailed = '';
        
        if (user.email) {
          
            try {
           
                await sendSignupEmail(user);
            } catch (error) {
                logger.error(error);
                emailFailed = 'Failed to signup.';
                logger.error(error);
            }
        }
        return {
            emailFailed,
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}


export async function studentNotification(user) {
    try {
       
        let emailFailed = '';
        
        if (user.email) {
          
            try {
           
                await studentOtpEmail(user);
            } catch (error) {
                logger.error(error);
                emailFailed = 'Failed to signup.';
                logger.error(error);
            }
        }
        return {
            emailFailed,
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

