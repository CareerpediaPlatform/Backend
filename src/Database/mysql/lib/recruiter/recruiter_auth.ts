import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword } from "src/helpers/encryption";
import { IRecruiter } from "src/models/lib/auth";
var crypto=require("crypto")

const TAG = 'data_stores_mysql_lib_user'

export async function signUp(user: IRecruiter,transaction?: any) {
  logger.info(`${TAG}.saveUser()`);
  try {
    const hashedPassword = await hashPassword(user.password);
    const data = {
      uid: crypto.randomUUID(),
      email: user.email,
      password: hashedPassword,
      status:"ACTIVE"
    };
    let recruiterInsertQuery = `insert into RECRUITER(UID, EMAIL, PASSWORD, STATUS)
    values(:uid, :email, :password, :status)`;
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


  export async function checkUidExist(uid: string) {
    try {
      logger.info(`${TAG}.checkUidExist() ==>`, uid);
      let query = 'SELECT * FROM RECRUITER WHERE UID = :uid'; 
      const [user] = await executeQuery(query, QueryTypes.SELECT, {
        uid:uid
      });  
      return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkUidExist()`, error);
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
    console.log("uisjdfdfdkfldkf");
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

export async function updateStatusRecruiterActive(user) {
  logger.info(`${TAG}.updateStatusRecruiter()`);
  try {
    let statusUpdateQuery = `UPDATE RECRUITER SET STATUS = true WHERE USER_ID= ?`;
    await executeQuery(statusUpdateQuery, QueryTypes.UPDATE, [user]);
    return {...user};
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateStatusRecruiter()`, error);
    throw error;
  }
}

