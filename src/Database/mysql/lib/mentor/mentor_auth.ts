import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword } from "src/helpers/encryption";
import { IMentor } from "src/models/lib/auth";
var crypto=require("crypto")

const TAG = 'data_stores_mysql_lib_user'

export async function signUp(user: IMentor) {
  logger.info(`${TAG}.saveUser()`);
  try {
    const hashedPassword = await hashPassword(user.password);
    const data = {
      uid: crypto.randomUUID(),
      email: user.email,
      password: hashedPassword,
      oldPassword:hashedPassword
    };
    let mentorInsertQuery = `insert into MENTOR(UID, EMAIL, PASSWORD)
    values(:uid, :email, :password)`;
    await executeQuery(mentorInsertQuery, QueryTypes.INSERT, {
      ...data,
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
      let query = 'select * from MENTOR where EMAIL=:email ';
      const [user] = await executeQuery(query, QueryTypes.SELECT, {
        email
      });
      return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkEmailExist()`, error);
      throw error;
    }
  }

  export async function getMentorUid(uid: string) {
    try {
      logger.info(`${TAG}.checkUidExist() ==>`, uid);
      let query = 'SELECT * FROM MENTOR WHERE UID = :uid'; 
      const [user] = await executeQuery(query, QueryTypes.SELECT, {
        uid
      });  
      return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkUidExist()`, error);
      throw error;
    }
  }

  
export async function login(user:IMentor) {
    try{
    logger.info(`${TAG}.saveUser()`);
    let query = 'SELECT * FROM MENTOR WHERE EMAIL=:email'
    const mentorloginQuery  = await executeQuery(query,QueryTypes.SELECT,{
      email: user.email
    })
    return mentorloginQuery
  }catch(error){
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}


export async function changePassword(user:any): Promise<void> {
  try {
    let hashedPassword=await hashPassword(user.password)
    // Update the mentor's password in the database
    const query = `UPDATE MENTOR SET PASSWORD = :hashedPassword WHERE UID = :uid`;
    const mentorChangePassword = await executeQuery(query, QueryTypes.UPDATE, {hashedPassword ,...user});
    return mentorChangePassword;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.changePassword()`, error);
    throw error;
  }
}
