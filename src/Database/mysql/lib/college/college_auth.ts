import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword } from "src/helpers/encryption";
import { ICollege } from "src/models/lib/auth";
var crypto=require("crypto")

const TAG = 'data_stores_mysql_lib_user'


export async function signUp(user: ICollege,generatePassword:any,transaction?:any) {
  logger.info(`${TAG}.saveUser()`);
  try {
    const hashedPassword = await hashPassword(generatePassword);
    const data = {
      uid: crypto.randomUUID(),
      email: user.email,
      password: hashedPassword,
      status:"ACTIVE"
    };
    let collegeInsertQuery = `insert into COLLEGE_ADMIN(UID, EMAIL, PASSWORD,STATUS)
    values(:uid, :email, :password, :status)`;

    await executeQuery(collegeInsertQuery, QueryTypes.INSERT, {
      ...data,transaction
    });
    return data;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}


export async function checkEmailExist(email) {
    try {
      logger.info(`${TAG}.checkEmailExist()  ==>`, email);
  
      let query = 'select * from COLLEGE_ADMIN where EMAIL=:email ';
      const [user] = await executeQuery(query, QueryTypes.SELECT, {
        email
      });
      return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkEmailExist()`, error);
      throw error;
    }
  }


  export async function checkUidExist(uid) {
    try {
      logger.info(`${TAG}.checkUidExist() ==>`, uid);
      let query = 'SELECT * FROM COLLEGE_ADMIN WHERE UID = :uid'; 
      const [user] = await executeQuery(query, QueryTypes.SELECT, {
        uid
      });  
      return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkUidExist()`, error);
      throw error;
    }
  }
  export async function getCollegeAdminUid(uid){
    try {
      console.log(uid)
      logger.info(`${TAG}.getCollegeAdminUid()  ==>`, uid);
      let query = 'select * from COLLEGE_ADMIN where UID=:uid';
      const [userId] = await executeQuery(query, QueryTypes.SELECT, {
        uid:uid.uid
      });
      return userId;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getCollegeAdminUid()`, error); 
      throw error;
    }
  }


export async function login(user:ICollege) {
  
  try{
    logger.info(`${TAG}.saveUser()`);
    let query = 'SELECT * FROM COLLEGE_ADMIN WHERE EMAIL=:email'
    const collgeloginQuery  = await executeQuery(query,QueryTypes.SELECT,{
      email: user.email
    })
    return collgeloginQuery
  }catch(error){
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}

export async function changePassword(user:any): Promise<void> {
  try {
    let hashedPassword=await hashPassword(user.password)
    // Update the mentor's password in the database
    const query = `UPDATE COLLEGE_ADMIN SET PASSWORD = :hashedPassword WHERE UID = :uid`;
    const collegeChangePassword = await executeQuery(query, QueryTypes.UPDATE, {hashedPassword ,...user});
    return collegeChangePassword;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.changePassword()`, error);
    throw error;
  }
}

export async function collegeUpdateStatus(user){
  logger.info(`${TAG}.studentUpdateStatus()`);
  try{
    const info={
      uid:user.uid,
      status:user.status,
    }
    
    const updateQuery = `UPDATE COLLEGE_ADMIN
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




 
