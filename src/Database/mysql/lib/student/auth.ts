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
      id:user.id,
      uid: crypto.randomUUID(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword,
      status:"ACTIVE",
      terms_and_condition:user.terms_and_condition
    };
    let userInsertQuery = `
      INSERT INTO STUDENT_AUTH_FORM(id, uid, first_name, last_name, email, password,status,TERM_AND_CONDITIONS)
      VALUES (:id, :uid, :firstName, :lastName, :email, :password, :status, :terms_and_condition)
    `;
    await executeQuery(userInsertQuery, QueryTypes.INSERT, {
      ...data,
    });
    return data;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.signUp()`, error);
    throw error;
  }
}

// signup with email and linked in
export async function signupWithSocialAccount(user: IUser) {
  logger.info(`${TAG}.signupWithSocialAccount()`);
  try {
    const hashedPassword = await hashPassword(user.uuid);
    const data = {
      id:user.id,
      uid: crypto.randomUUID(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      uuid: hashedPassword,
      role:user.role,
      terms_and_condition:user.terms_and_condition,
      status:"ACTIVE"
    };
    let userInsertQuery = `
      INSERT INTO STUDENT_AUTH_GMAIL (id, uid, first_name, last_name, email, uniqId, status,role,TERM_AND_CONDITIONS)
      VALUES (:id , :uid, :firstName, :lastName, :email, :uuid, :status,:role,:terms_and_condition)
    `;

    await executeQuery(userInsertQuery, QueryTypes.INSERT, {
      ...data,
    });
    return data;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.signupWithSocialAccount()`, error);
    throw error;
  }
}

export async function changePassword(user:any){
  let hashedPassword=await hashPassword(user.password)
try{
  logger.info(`${TAG}.changePassword()  ==>`,user);

  let query = 'UPDATE STUDENT_AUTH_FORM SET password= :hashedPassword WHERE uid= :uid';
  const response= await executeQuery(query, QueryTypes.UPDATE, {
    hashedPassword,...user});
  return response;
}catch (error) {
  logger.error(`ERROR occurred in ${TAG}.changePassword()`, error);
  throw error;
}
}

export async function signupPhonenumber(user:any,transaction?:any){
try{
  logger.info(`${TAG}.signupPhonenumber()  ==>`,user);

  let query = 'UPDATE STUDENT_AUTH_FORM SET phone_number= :phoneNumber WHERE uid= :uid';
  const response= await executeQuery(query, QueryTypes.UPDATE, {
    ...user});
  return {response,transaction};
}catch (error) {
  logger.error(`ERROR occurred in ${TAG}.signupPhonenumber()`, error);
  throw error;
}
}

export async function signupPhonenumbers(user:any,transaction?:any){
try{
  logger.info(`${TAG}.signupPhonenumbers()  ==>`,user);

  let query = 'UPDATE STUDENT_AUTH_GMAIL SET phone_number= :phoneNumber WHERE uid= :uid';
  const response= await executeQuery(query, QueryTypes.UPDATE, {
    ...user});
  return {response,transaction};
}catch (error) {
  logger.error(`ERROR occurred in ${TAG}.signupPhonenumbers()`, error);
  throw error;
}
}
// getAllStudentList

export async function getAllStudentList(){
  const getTable1=`SELECT 
  id, uid, first_name, last_name, email, status
FROM
STUDENT_AUTH_FORM
UNION ALL SELECT 
  id, uid, first_name, last_name, email,status
FROM
  STUDENT_AUTH_GMAIL;`



    const res=await executeQuery(getTable1, QueryTypes.SELECT, {});
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh")
console.log(res)
   return await {...res};
}

// update status active and deactive
export async function findTable(uid){

  const updateQuery = `SELECT 
  CASE
      WHEN EXISTS (SELECT 1 FROM STUDENT_AUTH_FORM WHERE uid = :uid) THEN 'STUDENT_AUTH_FORM'
      ELSE 'STUDENT_AUTH_GMAIL'

  END AS table_name
  `

  const [res]=await executeQuery(updateQuery,QueryTypes.SELECT, {
  uid:uid
  });
  console.log(res)
  return res.tableName;
}

export async function studentUpdateStatus(user){
  logger.info(`${TAG}.studentUpdateStatus()`);
  try{
    const info={
      uid:user.uid,
      status:user.status,
    }
    let tableName=await findTable(user.uid)
    
    const updateQuery = `UPDATE ${tableName}
    SET status = :status
    WHERE uid = :uid;
    `
    const [res]=await executeQuery(updateQuery,QueryTypes.UPDATE, {
      ...info,
    });
    console.log(res)
    return res;
  }
  catch (error) {
    logger.error(`ERROR occurred in ${TAG}.studentUpdateStatus()`, error);
    throw error;
  }
}

  // otp generator
export async function saveOTP(user:userOTP,transaction?:any){
  logger.info(`${TAG}.saveOTP()`);
  try{
    const otp = await OTP();
    const info={
      student_id:user.id,
      otp:user.otp,
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
    return {info,transaction};
  }
  catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveOTP()`, error);
    throw error;
  }
}

export async function resendOTP(user,transaction?:any){
  logger.info(`${TAG}.resendOTP()`);
  try{
    const info={
      otp:user.newOtp,
      accesstoken:user.accessToken,
      phoneNumber:user.phoneNumber,
      type:user.type,
    }
    const updateQuery = `
    UPDATE  OTP_AUTH
    SET
    otp=:otp,
    access_token= :accesstoken,
    type= :type
        WHERE phone_number=:phoneNumber;
  `;
    const [res]=await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...info,
    });
    return {info,transaction};
  }
  catch (error) {
    logger.error(`ERROR occurred in ${TAG}.resendOTP()`, error);
    throw error;
  }
}

export async function  deleteOTP(userotp: any) {
  try {
    const otp=userotp.otp
    logger.info(`${TAG}.deleteOTP()  ==>`, otp);

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
    logger.error(`ERROR occurred in ${TAG}.deleteOTP()`, error);
    throw error;
  }
}


export async function  verifyOTP(userotp: any) {
  try {
    const phoneNumber=userotp.phoneNumber
    logger.info(`${TAG}.verifyOTP()  ==>`, phoneNumber);

    let query = 'select * from OTP_AUTH where phone_number= :phoneNumber';
    const [user] = await executeQuery(query, QueryTypes.SELECT,{
      ...userotp
    });
    if(user){
      return user;
    }
    else{
      return false
    }
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
      query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE email = :email OR phone_number = :phoneNumber';
      query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE email = :email OR phone_number = :phoneNumber';
      queries = [query1, query2];
    } else if (info.email) {
      query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE email = :email';
      query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE email = :email';
      queries = [query1, query2];
    } else if (info.phoneNumber) {
      query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE phone_number = :phoneNumber';
      query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE phone_number = :phoneNumber';
      queries = [query1, query2];
    } else if (info.uid) {
      query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE uid = :uid';
      query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE uid = :uid';
      queries = [query1, query2];
    }else if (info.id) {
      query1 = 'SELECT * FROM STUDENT_AUTH_FORM WHERE id= :id';
      query2 = 'SELECT * FROM STUDENT_AUTH_GMAIL WHERE id= :id';
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