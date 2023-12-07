import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword , generatePasswordWithPrefixAndLength } from "src/helpers/encryption";
import { IMentor } from "src/models/lib/auth";
var crypto=require("crypto")

const TAG = 'data_stores_mysql_lib_mentorAuth'


export async function signUp(user: IMentor,generatePassword:any,transaction?:any) {
  logger.info(`${TAG}.saveUser()`);
  try {
    console.log(generatePassword)
    const hashedPassword = await hashPassword(generatePassword);
    const data = {
      uid: crypto.randomUUID(),
      email: user.email,
      password: hashedPassword,
      type:user.type,
      course:user.course,
      status:"ACTIVE"
    };
        let mentorInsertQuery = `insert into MENTOR(UID, EMAIL, PASSWORD,TYPE,COURSE,STATUS)
        values(:uid, :email, :password,:type,:course,:status)`;
        await executeQuery(mentorInsertQuery, QueryTypes.INSERT, {
          ...data,transaction
        });
        return data;

    }
    catch (error) {
      logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
      throw error;
    }
    }
 

// export async function signUp(user: IMentor, transaction?: any) {
//   const TAG = 'MentorService'; 
//   logger.info(`${TAG}.signUp()`);
//   try {
//     // Hash the user's password
//     const hashedPassword = await hashPassword(user.password);
//     // Find the course_id based on the provided course name
//     const courseQuery = `SELECT course_id FROM courses_parts WHERE partTitle= :partTitle`;
//     const selectedCourseType = user.course;
//     console.log(selectedCourseType)
  
//     const courseResult = await executeQuery(courseQuery, { partTitle : selectedCourseType });
//     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    
//     if (courseResult.length === 0) {
//       throw new Error('Course not found'); // Handle course not found error
//     }

//     const course_id = courseResult[0].course_id;

//     // Prepare mentor data for insertion
//     const mentorData = {
//       course_id: course_id, // Associate mentor with the course using course_id
//       uid: crypto.randomUUID(),
//       email: user.email,
//       password: hashedPassword,
//       type: user.type,
//       course:user.course,
//       status: user.status
//     };

//     // Insert mentor data into the "MENTOR" table
//     const mentorInsertQuery = `
//     INSERT INTO MENTOR (course_id, UID, EMAIL, PASSWORD, TYPE, COURSE, STATUS)
//     VALUES (:course_id, :uid, :email, :password, :type, :course, :status)
//   `;

//     await executeQuery(mentorInsertQuery, mentorData, QueryTypes.INSERT, {
//       transaction
//     });

//     return mentorData;
//   } catch (error) {
//     logger.error(`ERROR occurred in ${TAG}.signUp()`, error);
//     throw error;
//   }
// }


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

  export async function getMentorUid(uid){
    try {
      logger.info(`${TAG}.getMentorUid()  ==>`, uid);
      console.log(uid)
      let query = 'select * from MENTOR where UID=:uid';
      const [userId] = await executeQuery(query, QueryTypes.SELECT, {
        uid:uid.uid
      });
      return userId;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getMentorUid()`, error); 
      throw error;
    }
  }

  export async function checkMentorUid(uid){
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

export async function mentorUpdateStatus(user){
  logger.info(`${TAG}.mentorUpdateStatus()`);
  try{
    const info={
      uid:user.uid,
      status:user.status,
    }
    
    const updateQuery = `UPDATE MENTOR
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
    logger.error(`ERROR occurred in ${TAG}.mentorUpdateStatus()`, error);
    throw error;
  }
}
