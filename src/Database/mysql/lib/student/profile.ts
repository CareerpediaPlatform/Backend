import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";

const TAG="student.service.profile"

export async function studentProfilePost(user) {
  const uid=crypto.randomUUID()
  logger.info(`${TAG}.studentProfilePost()`);
  try {
    const profileInsertQuery = `
    INSERT INTO COLLEGE_BASIC_DETAILS 
    (userID,uid,instituteName, founderName, email, phoneNumber, website, linkedInProfile) 
    VALUES (:userID, :uid, :instituteName, :founderName, :email, :phoneNumber, :website, :linkedInProfile)`;

    const contactInsertQuery = `
    INSERT INTO CONTACT_DETAILS 
    (userID,uid,address, city, district, state, pinCode, country) 
    VALUES (:userID, :uid, :address, :city, :district, :state, :pinCode, :country)`;

    let [contact]=await executeQuery(contactInsertQuery, QueryTypes.INSERT, {
      ...user.contactDetails,userID:user.userID,uid});

    let [profile]=await executeQuery(profileInsertQuery, QueryTypes.INSERT, {
        ...user.basicDetails,userID:user.userID,uid});

    return {profile,contact};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.studentProfilePost()`, error);
    throw error;
  }
}

export async function updateEducationDetails(user) {
    logger.info(`${TAG}.updateEducationDetails()`);
    try {
        const response=[]
      const insertQuery =`INSERT INTO EDUCATION_DETAILS (userID, uid, degree, field, college, score, start, end) 
      VALUES (:userId, :uid, :degree, :field, :college, :score, :start, :end)`

      const updateQuery=`UPDATE EDUCATION_DETAILS SET degree=:degree, field=:field, college=:college, score=:score, start=start, end=end WHERE id=id`

      
      for (const data of user.data) {
        let uid=crypto.randomUUID()
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
      logger.error(`ERROR occurred in ${TAG}.updateEducationDetails()`, error);
      throw error;
    }
  }

export async function updateWorkExperience(user) {
    logger.info(`${TAG}.updateWorkExperience()`);
    try {
        const response=[]
      const insertQuery =`INSERT INTO WORK_EXPERIENCE (userID, uid, company, role, start, end) VALUES (:userId, :uid, :company, :role, :start, :end)`

      const updateQuery=`UPDATE WORK_EXPERIENCE SET  company = :company,
      role = :role,
      start = :start,
      end = :end WHERE Id=:id`

      
      for (const data of user.data) {
        let uid=crypto.randomUUID()
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
      logger.error(`ERROR occurred in ${TAG}.updateWorkExperiencess()`, error);
      throw error;
    }
  }

  export async function studentProfileDelete(user) {
    logger.info(`${TAG}.studentProfileDelete()`);
    try {
      const response=[]
      const deleteQueries = [
        "DELETE FROM WORK_EXPERIENCE WHERE userID = :userID;",
        "DELETE FROM  EDUCATION_DETAILS WHERE userID = :userID;",
        // "DELETE FROM COLLEGE_DETAILS WHERE userID = :userID;",
        // "DELETE FROM college WHERE user_ID = :userID;",
      ];
      
      for (const query of deleteQueries) {
        const res=await executeQuery(query, QueryTypes.DELETE, {
          userID: user
        });
        response.push(res)
      }
      
      return {message:"student deleted",response};
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.studentProfileDelete()`, error);
      throw error;
    }
  }

  export async function studentEducationDelete(uid) {
    logger.info(`${TAG}.studentEducationDelete()`);
    try {
      const deleteQueries ="DELETE FROM EDUCATION_DETAILS WHERE uid = :uid;"
      
        const res=await executeQuery(deleteQueries, QueryTypes.DELETE, {
          uid: uid
        });
      
      return {message:"student eduaction details deleted deleted",res};
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.studentProfileDelete()`, error);
      throw error;
    }
  }

  export async function studentExperienceDelete(uid) {
    logger.info(`${TAG}.studentExperienceDelete()`);
    try {
      const deleteQueries ="DELETE FROM WORK_EXPERIENCE WHERE uid=:uid;"
        const res=await executeQuery(deleteQueries, QueryTypes.DELETE, {
          uid: uid
        });
      return {message:"student deleted",res};
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.studentProfileDelete()`, error);
      throw error;
    }
  }

  export async function checkExistEducationAndExperience(uid) {
    let query1: string;
    let query2: string;
    let user=[]
    try {
      logger.info(`${TAG}.checkExist() ==>`, uid);
      query1 = 'SELECT * FROM `WORK_EXPERIENCE` WHERE uid=:uid';
      user= await executeQuery(query1, QueryTypes.SELECT, { uid:uid });
      if(user.length<1){
        query2 = 'SELECT * FROM `EDUCATION_DETAILS` WHERE uid=:uid';
        user= await executeQuery(query2, QueryTypes.SELECT, { uid:uid });
      }
      return user// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkExist()`, error);
      throw error;
    }
  }

  export async function checkExist(userID) {
    try {
      logger.info(`${TAG}.checkExist() ==>`, userID);
      const contactQuery = 'SELECT * FROM `CONTACT_DETAILS` WHERE userID=:userID';
      const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {userID});
      return contact// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkExist()`, error);
      throw error;
    }
  }
