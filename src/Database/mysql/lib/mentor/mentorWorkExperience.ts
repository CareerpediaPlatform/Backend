import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto = require("crypto");

const TAG = "data_stores_mysql_lib_mentor_work_experience";


export async function saveWorkExperienceDetails(user) {
    logger.info(`${TAG}.saveWorkExperienceDetails()`);
    console.log(user)
    try {
        const response=[]
      const insertQuery =`INSERT INTO  MENTOR_WORK_EXPERIENCE
      ( UID,OCCUPATION, JOB_ROLE, START_DATE,END_DATE,YEAR_OF_EXPERIENCE)
       values( :uid,:occupation ,:jobRole, :startDate,:endDate,:yearOfExperience)`;

      const updateQuery=`UPDATE MENTOR_WORK_EXPERIENCE SET
      OCCUPATION = :occupation, JOB_ROLE = :jobRole, START_DATE = :startDate, END_DATE = :endDate , YEAR_OF_EXPERIENCE = :yearOfExperience WHERE USER_ID = :id`;
      let items:any = Object.values(user.data)
      for (const data of items) {

        console.log(data)
        if(data.id){
            const res=await executeQuery(updateQuery, QueryTypes.UPDATE, {
                ...data
              });
              response.push(res)
              
        }else{
            const res=await executeQuery(insertQuery, QueryTypes.INSERT, {
                ...data,uid:user.uid
              });
              response.push(res)
        }
      }
    return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.saveWorkExperienceDetails()`, error);
      throw error;
    }
  }
  
  

  export async function isValid(userId) {
    console.log("asdfghjklkjhgfdsdfghmjhgfdsdfghj")
    console.log(userId)
    try {
      logger.info(`${TAG}.checkProfilExist() ==>`, userId);
      console.log("1234567890")
      const contactQuery = 'SELECT * FROM `MENTOR` WHERE USER_ID=:userId';
      const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {userId:userId});
      return contact// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
      throw error;
    }
  }

//geting all data  

export async function checkProfilExist(uid) {
    try {
      logger.info(`${TAG}.checkProfileExist() ==>`, uid);
  
      const basicQuery = 'SELECT * FROM `MENTOR_PERSONAL_DETAILS` WHERE UID= :uid';
      const contactQuery = 'SELECT * FROM `MENTOR_CONTACT_DETAILS` WHERE UID= :uid' 
      const educationQuery = 'SELECT * FROM MENTOR_EDUACTION_DETAILS WHERE UID= :uid';
      const workQuery = 'SELECT * FROM `MENTOR_WORK_EXPERIENCE` WHERE UID= :uid';
      const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {uid});
      const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid})
      const work= await executeQuery(workQuery, QueryTypes.SELECT, {uid});
      const eduaction = await executeQuery(educationQuery, QueryTypes.SELECT, {uid});
      const data={
        basic,contact,education: Object.values(eduaction),experience:Object.values(work)
      }
      return {...data};
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
      throw error;
    }
  }

  ///userid in mentor

export async function checkExist(userId) {

    try {
      logger.info(`${TAG}.checkExist() ==>`, userId);
      const checkQuery = 'SELECT * FROM `MENTOR_PERSONAL_DETAILS` WHERE USER_ID=:userId';
      const [basic] = await executeQuery(checkQuery, QueryTypes.SELECT, {userId});
      return basic// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
      throw error;
    }
  }


  // export async function deleteWorkExperience(uid) {
  //   try {
  //     logger.info(`${TAG}.deleteRecruiter() ==>`, uid);
  //     console.log(" **************************llib*************")
  //     console.log(uid)
  //     const response=[]
  //     const deleteQueries = [
  //       'DELETE FROM MENTOR_PERSONAL_DETAILS WHERE UID = :uid',
  //     ];
  //     for (const query of deleteQueries) {
  //       const res=await executeQuery(query, QueryTypes.DELETE, {
  //         uid
  //       });
  //       response.push(res)
  //     }
  //     return {message:"recruiter deleted",response}; 
  //   } catch (error) {
  //     logger.error(`ERROR occurred in ${TAG}.deleteRecruiter()`, error);
  //     throw error;
  //   }
  // }

  
//sigle object of work experience

  export async function postWorkExperience(user) {
    logger.info(`${TAG}.postWorExperience()`);
    try {
       
      const insertQuery =`INSERT INTO  MENTOR_WORK_EXPERIENCE
      ( UID,OCCUPATION, JOB_ROLE, START_DATE,END_DATE,YEAR_OF_EXPERIENCE)
       values( :uid,:occupation ,:jobRole, :startDate,:endDate,:yearOfExperience)`
      let [profile]=await executeQuery(insertQuery, QueryTypes.INSERT, {
        ...user});
    
      return profile;
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.postWorExperience()`, error);
      throw error;
    }
  }

  export async function checkId(id){
    logger.info(`${TAG}. checkId()`);
    try{
      const checkQuery=`SELECT * FROM MENTOR_WORK_EXPERIENCE WHERE USER_ID=:id`
      const [userId]=await executeQuery(checkQuery, QueryTypes.SELECT,{id})
      return userId
    }
    catch(error){
      logger.error(`ERROR occurred in ${TAG}.checId()`, error);
      throw error;
    }
  }
  export async function updateWorKExperience(user) {
    logger.info(`${TAG}.updateWorKExperience()`);
    try {
       
      const insertQuery =`UPDATE MENTOR_WORK_EXPERIENCE SET
      OCCUPATION = :occupation, JOB_ROLE = :jobRole, START_DATE = :startDate, END_DATE = :endDate , YEAR_OF_EXPERIENCE = :yearOfExperience WHERE USER_ID = :userId`
      let [profile]=await executeQuery(insertQuery, QueryTypes.UPDATE, {
        ...user});
    
      return profile;
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updateWorKExperience()`, error);
      throw error;
    }
  }


export async function deleteWorkExperience(user) {
  logger.info(`${TAG}.deleteWorkExperience()`);
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  console.log(user)
  console.log(user.userId)
  try {
     
    const insertQuery =`DELETE FROM MENTOR_WORK_EXPERIENCE WHERE USER_ID = :userId`
    let userId=await executeQuery(insertQuery, QueryTypes.DELETE, {
      userId:user.userId});
      
    return user.userId;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteEducation()`, error);
    throw error;
  }
}






  
  
