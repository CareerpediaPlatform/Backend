import { AdminAuth } from "src/Database/mysql";
import { checkEmailExist } from "src/Database/mysql/lib/admin/admin_auth";
import { HttpStatusCodes } from "src/constants/status_codes";
import { generateAccessToken ,verifyAccessToken} from "src/helpers/authentication";
import { comparePasswords } from "src/helpers/encryption";
import log from "src/logger";
import { IAdmin } from "src/models";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";



const TAG = 'services.auth'


//Admin signup

export async function signupUser(user: IAdmin) {
    log.info(`${TAG}.signupUser() ==> `, user);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedUser = await checkEmailExist(user.email);
      if(existedUser) {
        serviceResponse.message = 'Email  is already exist';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
      const Admin = await AdminAuth.signUp(user);
      const data = { Admin  }
     
      serviceResponse.data = data
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create Admin due to technical difficulties');
    }
    return serviceResponse;
  }

//Admin login

export async function loginAdmin(user:IAdmin) {
    log.info(`${TAG}.loginAdmin() ==> `, user);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedUser = await checkEmailExist(user.email);
      const user_id = existedUser.id

  //checking email exist or not
      if(!existedUser) {
        serviceResponse.message = 'Email is not exist please register';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }
  //comaparing password
      const isPasswordValid = await comparePasswords(existedUser.password ,user.password);
      if(!isPasswordValid ){
        serviceResponse.message = 'password is does not match';
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, '', ''));
        return serviceResponse;
      }else{
      const Admin = await AdminAuth.login(user);
      const accessToken = await generateAccessToken({uid:Admin[0].uid,role:"admin"})
      const data = { 
      accessToken,
      Admin,
      user_id
        }
        serviceResponse.data = data

      }
       
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.signupUser`, error);
      serviceResponse.addServerError('Failed to create Admin due to technical difficulties');
    }
    return serviceResponse;
    
  }


