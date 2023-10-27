import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword } from "src/helpers/encryption";
import { IRecruiter } from "src/models/lib/auth";
var crypto=require("crypto")

const TAG = 'data_stores_mysql_lib_user'

export async function signUp(user: IRecruiter,generatePassword:any,transaction?: any) {
  logger.info(`${TAG}.saveUser()`);
  try {
    console.log(generatePassword)
    const hashedPassword = await hashPassword(generatePassword);
    const data = {
      uid: crypto.randomUUID(),
      email: user.email,
      password: hashedPassword,
      status:"ACTIVE"
    };

    let recruiterInsertQuery = `insert into RECRUITER(UID, EMAIL, PASSWORD,STATUS)
    values(:uid, :email, :password,:status)`;


    await executeQuery(recruiterInsertQuery, QueryTypes.INSERT, {
      ...data,transaction
    });
    return data;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}


export async function checkEmailExist(email: string) {
    try {
      logger.info(`${TAG}.checkEmailExist()  ==>`, email);
  
      let query = 'select * from RECRUITER where EMAIL=:email ';
      const [user] = await executeQuery(query, QueryTypes.SELECT, {
        email
      });
      return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkEmailExist()`, error);
      throw error;
    }
  }

export async function getRecruiterUid(uid){
  console.log("333333333333333",uid)
    try {

      console.log(uid)
      logger.info(`${TAG}.getRecruiterUid()  ==>`, uid);
      let query = 'select * from RECRUITER where UID=:uid';
      const [userId] = await executeQuery(query, QueryTypes.SELECT, {
        uid
      });

      return userId;

    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getMentorUid()`, error); 
      throw error;
    }
  }

  
  export async function getRECRUITERUid(uid){
    try {
      logger.info(`${TAG}.getRECRUITERUid()  ==>`, uid);
      let query = 'select * from RECRUITER where UID=:uid';
      const [userId] = await executeQuery(query, QueryTypes.SELECT, {
        uid:uid.uid
      });
      return userId;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getRECRUITERUid()`, error); 
      throw error;
    }
  }

export async function login(user:IRecruiter) {
  
  try{
    logger.info(`${TAG}.saveUser()`);
    let query = 'SELECT * FROM RECRUITER WHERE EMAIL=:email'
    const recruiterloginQuery  = await executeQuery(query,QueryTypes.SELECT,{
      email: user.email
    })
    return recruiterloginQuery
  }catch(error){
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}


export async function changePassword(user:any): Promise<void> {
  try {
    let hashedPassword=await hashPassword(user.password)
    // Update the mentor's password in the database
    const query = `UPDATE RECRUITER SET PASSWORD = :hashedPassword WHERE UID = :uid`;
    const recruiterChangePassword = await executeQuery(query, QueryTypes.UPDATE, {hashedPassword ,...user});
    return recruiterChangePassword;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.changePassword()`, error);
    throw error;
  }
}
export async function getUserId(uid:string) {
  try {
    
    logger.info(`${TAG}.getUserId()  ==>`, uid);
    // console.log("uisjdfdfdkfldkf");
console.log(uid)
    let query = 'select USER_ID from RECRUITER where USER_ID=:uid';
    const [recruiterId] = await executeQuery(query, QueryTypes.SELECT, {
      uid
    });
    console.log(recruiterId)
    return recruiterId;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getUserId`, error);
    throw error;
  }
}


// //remove access recuriter -active or deactive

export async function recruiterUpdateStatus(user){
  logger.info(`${TAG}.recruiterUpdateStatus()`);
  try{
    const info={
      uid:user.uid,
      status:user.status,
    }
    const updateQuery = `UPDATE RECRUITER
    SET status = :status
    WHERE uid = :uid;
    `
    const [response]=await executeQuery(updateQuery,QueryTypes.UPDATE, {
      ...info,
    });
    console.log(response)
    return response;
  }
  catch (error) {
    logger.error(`ERROR occurred in ${TAG}.recruiterUpdateStatus()`, error);
    throw error;
  }
}

