import logger from "src/logger";
import { IUser } from "src/models";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword } from "src/helpers/encryption";
import { OTP } from "src/helpers/authentication";
import { userOTP } from "src/models";
var crypto=require("crypto") 


const TAG = 'data_stores_mysql_lib_user'

export async function signUp(user: IUser) {
  logger.info(`${TAG}.signUp()`);
  try {
    const hashedPassword = await hashPassword(user.password);
    const data = {
      uid: crypto.randomUUID(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword,
      role:"student"
    };
    let userInsertQuery = `
      INSERT INTO STUDENT_DETAILS(uid, first_name, last_name, email, password,role)
      VALUES (:uid, :firstName, :lastName, :email, :password, :role)
    `;

    await executeQuery(userInsertQuery, QueryTypes.INSERT, {
      ...data,
    });
    return data;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}

// signup with email and linked in
export async function signupWithSocialAccount(user: IUser) {
  logger.info(`${TAG}.signUp()`);
  try {
    const hashedPassword = await hashPassword(user.uuid);
    const data = {
      uid: crypto.randomUUID(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      uuid: hashedPassword,
    };
    let userInsertQuery = `
      INSERT INTO STUDENT_AUTH (uid, first_name, last_name, email, uniqId)
      VALUES (:uid, :firstName, :lastName, :email, :uuid)
    `;

    await executeQuery(userInsertQuery, QueryTypes.INSERT, {
      ...data,
    });
    return data;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}

export async function changePassword(user:any){
  let hashedPassword=await hashPassword(user.password)
try{
  logger.info(`${TAG}.changePassword()  ==>`,user);

  let query = 'UPDATE STUDENT_DETAILS SET password= :hashedPassword WHERE uid= :uid';
  const response= await executeQuery(query, QueryTypes.UPDATE, {
    hashedPassword,...user});
  return response;
}catch (error) {
  logger.error(`ERROR occurred in ${TAG}.checkEmailOrPhoneExist()`, error);
  throw error;
}
}
export async function signupPhonenumber(user:any){
try{
  logger.info(`${TAG}.signupPhonenumber()  ==>`,user);

  let query = 'UPDATE STUDENT_DETAILS SET phone_number= :phoneNumber WHERE uid= :uid';
  const response= await executeQuery(query, QueryTypes.UPDATE, {
    ...user});
  return response;
}catch (error) {
  logger.error(`ERROR occurred in ${TAG}.signupPhonenumber()`, error);
  throw error;
}
}
export async function signupPhonenumbers(user:any){
try{
  logger.info(`${TAG}.signupPhonenumber()  ==>`,user);

  let query = 'UPDATE STUDENT_Auth SET phone_number= :phoneNumber WHERE uid= :uid';
  const response= await executeQuery(query, QueryTypes.UPDATE, {
    ...user});
  return response;
}catch (error) {
  logger.error(`ERROR occurred in ${TAG}.signupPhonenumber()`, error);
  throw error;
}
}

  // otp generator


  export async function saveOTP(user:userOTP){
  logger.info(`${TAG}.saveOTP()`);
  try{
    const otp = await OTP();
    const info={
      student_id:user.id,
      otp:otp,
      phoneNumber:user.phoneNumber,
      type:user.type,
      accesstoken:user.accessToken
    }

    let userInsertQuery = `
    INSERT INTO OTP_AUTH(student_id, otp, phone_number, access_token, type)
    VALUES (:student_id, :otp, :phoneNumber, :accesstoken, :type)`;

    await executeQuery(userInsertQuery, QueryTypes.INSERT, {
      ...info,
    });
    return info;
  }
  catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveOTP()`, error);
    throw error;
  }
}
  export async function resendOTP(user){
  logger.info(`${TAG}.resendOTP()`);
  try{
    const otp = await OTP();
    const info={
      otp:otp,
      accesstoken:user.accessToken,
      resendOtp:user.resendOtp
    }
    const updateQuery = `
    UPDATE COLLEGE_BASIC_DETAILS
    SET
    otp=:instituteName,
    access_token= :founderName,
        WHERE otp=:resendOtp;
  `;
    const [res]=await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...info,
    });
    return res;
  }
  catch (error) {
    logger.error(`ERROR occurred in ${TAG}.resendOTP()`, error);
    throw error;
  }
}

export async function  deleteOTP(userotp: any) {
  try {
    const otp=userotp.otp
    logger.info(`${TAG}.checkEmailOrPhoneExist()  ==>`, otp);

    let query = 'DELETE FROM OTP_AUTH WHERE otp=:otp';
    const [user] = await executeQuery(query, QueryTypes.DELETE,{
      otp
    });
    if(user){
      return user;
    }
    else{
      return false
    }
    // console.log("error")
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.verifyOTP()`, error);
    throw error;
  }
}


export async function  verifyOTP(userotp: any) {
  try {
    const otp=userotp.otp
    logger.info(`${TAG}.checkEmailOrPhoneExist()  ==>`, otp);

    let query = 'select * from OTP_AUTH where otp=:otp';
    const [user] = await executeQuery(query, QueryTypes.SELECT,{
      otp
    });
    if(user){
      return user;
    }
    else{
      return false
    }
    // console.log("error")
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.verifyOTP()`, error);
    throw error;
  }
}


export async function checkEmailOrPhoneExist(info) {
  try {
    logger.info(`${TAG}.checkEmailOrPhoneExist() ==>`, info);

    let query1: string;
    let query2: string;
    let queries: string[] = [];
    let user;

    if (info.email && info.phoneNumber) {
      query1 = 'SELECT * FROM STUDENT_DETAILS WHERE email = :email OR phone_number = :phoneNumber';
      query2 = 'SELECT * FROM STUDENT_AUTH WHERE email = :email OR phone_number = :phoneNumber';
      queries = [query1, query2];
    } else if (info.email) {
      query1 = 'SELECT * FROM STUDENT_DETAILS WHERE email = :email';
      query2 = 'SELECT * FROM STUDENT_AUTH WHERE email = :email';
      queries = [query1, query2];
    } else if (info.phoneNumber) {
      query1 = 'SELECT * FROM STUDENT_DETAILS WHERE phone_number = :phoneNumber';
      query2 = 'SELECT * FROM STUDENT_AUTH WHERE phone_number = :phoneNumber';
      queries = [query1, query2];
    } else if (info.uid) {
      query1 = 'SELECT * FROM STUDENT_DETAILS WHERE uid = :uid';
      query2 = 'SELECT * FROM STUDENT_AUTH WHERE uid = :uid';
      queries = [query1, query2];
    }

    for (const query of queries) {
      user = await executeQuery(query, QueryTypes.SELECT, { ...info });
      if (user && user.length > 0) {
        return user[0]; // Return the first matching user found
      }
    }

    return null; // Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkEmailOrPhoneExist()`, error);
    throw error;
  }
}