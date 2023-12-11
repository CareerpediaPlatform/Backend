import { NextFunction, Response } from 'express'
import { responseBuilder } from '../../helpers/response_builder'
import log from '../../logger'
import {IServiceResponse} from '../../models'
import { IRecruiter} from '../../models/lib/auth'
import Razorpay from 'razorpay'
import crypto from 'crypto'
const TAG = 'controller .paymnet'

const KEY_ID = 'rzp_test_HIgqE35QoaWO4Y'
const KEY_SECRET = 'ZDnlMUsws7C38oFTtuczCwJs'

export async function paymentPay (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        var instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })

        instance.orders.create({
          amount: req.body.amount*100,
          currency: "INR",
          receipt: "receipt#1",
          notes: {
            key1: "value3",
            key2: "value2"
          }
        },(err,order)=>{
            if(err){
                return res.send({code:500,message:'server err'})
            }
            return res.send({code:200,message:'order created',data:order})
        })
    // res.send({status:500 })
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.paymentPay() `, error)
      next(error)
    }
  }
  

export async function paymentVerify (req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

      var expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
          .update(body.toString())
          .digest('hex');
  
      if (expectedSignature === req.body.response.razorpay_signature) {
          res.send({ code: 200, message: 'Sign Valid' });
      } else {
  
          res.send({ code: 500, message: 'Sign Invalid' });
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.paymentPay() `, error)
      next(error)
    }
  }