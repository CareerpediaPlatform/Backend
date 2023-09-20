import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword , generatePasswordWithPrefixAndLength } from "src/helpers/encryption";
import { IMentor } from "src/models/lib/auth";
var crypto=require("crypto")

const TAG = 'data_stores_mysql_lib_mentorAuth'



export async function signUp(user: IMentor) {
  logger.info(`${TAG}.saveUser()`);
  try {
    // const generatePassword = await generatePasswordWithPrefixAndLength(25, "Careerpedia-Mentor");
    const hashedPassword = await hashPassword(user.password);
    // console.log(generatePassword)
    // const hashedPassword = await hashPassword(generatePassword);
    console.log(hashedPassword)
   
    const data = {
      uid: crypto.randomUUID(),
      email: user.email,
      password: hashedPassword,
      type:user.type,
      course:user.course,
      status:user.status
    };
    let mentorInsertQuery = `insert into MENTOR(UID, EMAIL, PASSWORD,TYPE,COURSE,STATUS)
    values(:uid, :email, :password,:type,:course,:status)`;
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
      logger.info(`${TAG}.getMentorUid()  ==>`, uid);
  
      let query = 'select * from MENTOR where UID=:uid';
      const [userId] = await executeQuery(query, QueryTypes.SELECT, {
        uid
      });
      return userId;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getMentorUid()`, error); 
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

export async function getUserId(uid: string) {
  try {
    logger.info(`${TAG}.getUserId()  ==>`, uid);

    let query = `select USER_ID from MENTOR where USER_ID=:uid`;
    const [userId] = await executeQuery(query, QueryTypes.SELECT, {
      uid
    });
    return userId;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getUserId()`, error);
    throw error;
  }
}

