import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto = require("crypto");

const TAG = "data_stores_mysql_lib_mentor_work_experience";


// export async function saveWorkExperienceDetails(mentorWorkExperienceData: any, userId: number) {
//     logger.info(`${TAG}.saveUser()`)
//     try {
//       let workDetails = [];
//       const mentorWorkExperienceData = []
//       mentorWorkExperienceData.forEach((workData:any) => {
//         workData['uid'] = crypto.randomUUID();
//         workDetails.push(
          
//               userId,
//               workData.uid,
//               workData.occupation,
//               workData.job_role,
//               workData.start_date,
//               workData.end_date 
//         );
//       });
//       console.log("assssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    
//       const educationDetailsQuery = `INSERT INTO  MENTOR_WORK_EXPERIENCE
//       (USER_ID, UID,OCCUPATION, JOB_ROLE, START_DATE,END_DATE)
//        values(:userId, :uid,:occupation ,:job_role, :start_date,:end_date)`;

//       await executeQuery(educationDetailsQuery, QueryTypes.INSERT, [workDetails]);
//       return mentorWorkExperienceData;
  
//     } catch (error) {
//       logger.error(`ERROR occurred in ${TAG}.saveUser()`, error)
//       throw error;
//     }
//   }


export async function saveWorkExperienceDetails(user) {
    logger.info(`${TAG}.saveWorkExperienceDetails()`);
    console.log(user)
    try {
        const response=[]
      const insertQuery =`INSERT INTO  MENTOR_WORK_EXPERIENCE
      (USER_ID, UID,OCCUPATION, JOB_ROLE, START_DATE,END_DATE,YEAR_OF_EXPERIENCE)
       values(:userId, :uid,:occupation ,:job_role, :start_date,:end_date,:year_of_experience)`;

      const updateQuery=`UPDATE MENTOR_WORK_EXPERIENCE SET
      OCCUPATION = :occupation, JOB_ROLE = :job_role, START_DATE = :start_date, END_DATE = :end_date , YEAR_OF_EXPERIENCE = :year_of_experience WHERE id = :id`;

      for (const data of user.data) {
        let uid=crypto.randomUUID()
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        console.log(data)
        if(data.id){
            const res=await executeQuery(updateQuery, QueryTypes.UPDATE, {
                ...data
              });
              response.push(res)
              
        }else{
            const res=await executeQuery(insertQuery, QueryTypes.INSERT, {
                ...data,uid,userId:user.id
              });
              response.push(res)
        }
      }
    return {...response};
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

export async function checkProfilExist(userId) {
    try {
      logger.info(`${TAG}.checkProfileExist() ==>`, userId);
  
      const basicQuery = 'SELECT * FROM `MENTOR_PERSONAL_DETAILS` WHERE USER_ID= :userId';
      const educationQuery = 'SELECT * FROM MENTOR_EDUCATION_DETAILS WHERE USER_ID=:userId';
      const workQuery = 'SELECT * FROM `MENTOR_WORK_EXPERIENCE` WHERE USER_ID=:userId';
      

      const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {userId});
      const [work] = await executeQuery(workQuery, QueryTypes.SELECT, {userId});
      const [eduaction] = await executeQuery(educationQuery, QueryTypes.SELECT, {userId});
      return {basic,eduaction,work}; // Return null if no user is found
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



export async function deleteRecruiter(userId) {
    try {
      logger.info(`${TAG}.deleteRecruiter() ==>`, userId);
      console.log(" **************************llib*************")
      console.log(userId)
      const response=[]
      const deleteQueries = [
        'DELETE FROM MENTOR_PERSONAL_DETAILS WHERE USER_ID = :userId',
        'DELETE FROM MENTOR_WORK_EXPERIENCE WHERE USER_ID = :userId',
        'DELETE FROM MENTOR WHERE USER_ID = :userId'
  
      ];
      for (const query of deleteQueries) {
        const res=await executeQuery(query, QueryTypes.DELETE, {
          userId
        });
        response.push(res)
      }
      return {message:"recruiter deleted",response}; 
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.deleteRecruiter()`, error);
      throw error;
    }
  }







  
  
