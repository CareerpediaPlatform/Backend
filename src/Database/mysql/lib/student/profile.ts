import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes, UUID } from "sequelize";

const TAG="student.database-lib.profile"

export async function studentProfilePost(user) {
  // const uid=crypto.randomUUID()
  logger.info(`${TAG}.studentProfilePost()`);
  try {
    const profileInsertQuery = `
   INSERT INTO student_personal_details (user_uid,firstName, lastName, email, dob, phoneNumber, linkedInProfile, profilePic, resume)
    VALUES
  (:uid,:firstName, :lastName, :email, :dob, :phoneNumber, :linkedInProfile, :profilePic, :resume)`;

    const contactInsertQuery = `
    INSERT INTO CONTACT_DETAILS 
    (user_uid,address, city, district, state, pinCode, country) 
    VALUES (:uid, :address, :city, :district, :state, :pinCode, :country)`;

    let [contact]=await executeQuery(contactInsertQuery, QueryTypes.INSERT, {
      ...user.contactDetails,uid:user.uid});

    let [profile]=await executeQuery(profileInsertQuery, QueryTypes.INSERT, {
        ...user.basicDetails,uid:user.uid});

    return {profile,contact};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.studentProfilePost()`, error);
    throw error;
  }
}

export async function studentProfileUpdate(user) {
  logger.info(`${TAG}.studentProfileUpdate()`);
  try {
    const profileUpdateQuery = `UPDATE student_personal_details
    SET firstName = :firstName,lastName = :lastName, email = :email,dob = :dob,phoneNumber = :phoneNumber,
      linkedInProfile = :linkedInProfile,
      profilePic = :profilePic,
      resume = :resume
    WHERE
    user_uid = :uid;
    `;

    const contactUpdateQuery = `UPDATE CONTACT_DETAILS
    SET
      address = :address,
      city = :city,
      district = :district,
      state = :state,
      pinCode = :pinCode,
      country = :country
    WHERE
    user_uid = :uid;
    `;

    let [contact]=await executeQuery(contactUpdateQuery, QueryTypes.INSERT, {
      ...user.contactDetails,uid:user.uid});

    let [profile]=await executeQuery(profileUpdateQuery, QueryTypes.INSERT, {
        ...user.basicDetails,uid:user.uid});

    return {profile,contact};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.studentProfileUpdate()`, error);
    throw error;
  }
}

export async function checkProfilExist(uid) {
  try {
    logger.info(`${TAG}.checkProfilExist() ==>`, uid);

    const basicQuery = 'SELECT * FROM `student_personal_details` WHERE user_uid= :uid';
    const contactQuery = 'SELECT * FROM `CONTACT_DETAILS` WHERE user_uid=:uid';
    const educationQuery = 'SELECT * FROM `EDUCATION_DETAILS` WHERE user_uid=:uid';
    const experienceQuery = 'SELECT * FROM `WORK_EXPERIENCE` WHERE user_uid=:uid';
    const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {uid});
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid});
    const [education] = await executeQuery(educationQuery, QueryTypes.SELECT, {uid});
    const [experience] = await executeQuery(experienceQuery, QueryTypes.SELECT, {uid});
    return {basic,education,contact,experience}; // Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}
export async function updateEducationDetails(user) {
    logger.info(`${TAG}.updateEducationDetails()`);
    try {
        const response=[]
      const insertQuery =`INSERT INTO EDUCATION_DETAILS (user_uid, degree, field, college, score, start, end) 
      VALUES (:uid, :degree, :field, :college, :score, :start, :end)`

      const updateQuery=`UPDATE EDUCATION_DETAILS SET degree=:degree, field=:field, college=:college, score=:score, start=start, end=end WHERE id=:id`

      
      for (const data of user.data) {
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
      const insertQuery =`INSERT INTO WORK_EXPERIENCE (user_uid, company, role, start, end) VALUES (:uid, :company, :role, :start, :end)`

      const updateQuery=`UPDATE WORK_EXPERIENCE SET  company = :company,
      role = :role,
      start = :start,
      end = :end WHERE id=:id`

      
      for (const data of user.data) {
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
      
      return {...response};
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updateWorkExperiencess()`, error);
      throw error;
    }
  }

  // export async function studentProfileDelete(user) {
  //   logger.info(`${TAG}.studentProfileDelete()`);
  //   try {
  //     const response=[]
  //     const deleteQueries = [
  //       "DELETE FROM WORK_EXPERIENCE WHERE userID = :userID;",
  //       "DELETE FROM  EDUCATION_DETAILS WHERE userID = :userID;",
  //       // "DELETE FROM COLLEGE_DETAILS WHERE userID = :userID;",
  //       // "DELETE FROM college WHERE user_ID = :userID;",
  //     ];
      
  //     for (const query of deleteQueries) {
  //       const res=await executeQuery(query, QueryTypes.DELETE, {
  //         userID: user
  //       });
  //       response.push(res)
  //     }
      
  //     return {message:"student deleted",response};
  
  //   } catch (error) {
  //     logger.error(`ERROR occurred in ${TAG}.studentProfileDelete()`, error);
  //     throw error;
  //   }
  // }

  export async function studentEducationDelete(id) {
    logger.info(`${TAG}.studentEducationDelete()`);
    try {
      const deleteQueries ="DELETE FROM EDUCATION_DETAILS WHERE  id= :id;"
      
        const res=await executeQuery(deleteQueries, QueryTypes.DELETE, {
          id:id
        });
      
      return {message:"student eduaction details deleted deleted",res};
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.studentProfileDelete()`, error);
      throw error;
    }
  }

  export async function studentExperienceDelete(id) {
    logger.info(`${TAG}.studentExperienceDelete()`);
    try {
      const deleteQueries ="DELETE FROM WORK_EXPERIENCE WHERE id= :id;"
        const res=await executeQuery(deleteQueries, QueryTypes.DELETE, {
          id:id
        });
      return {message:"student deleted",res};
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.studentProfileDelete()`, error);
      throw error;
    }
  }

  export async function checkExistEducationAndExperience(id) {
    let query1: string;
    let query2: string;
    let user=[]
    try {
      logger.info(`${TAG}.checkExistEducationAndExperience() ==>`, id);
      query1 = 'SELECT * FROM `WORK_EXPERIENCE` WHERE id=:id';
      user= await executeQuery(query1, QueryTypes.SELECT, { id:id });
      if(user.length<1){
        query2 = 'SELECT * FROM `EDUCATION_DETAILS` WHERE id=:id';
        user= await executeQuery(query2, QueryTypes.SELECT, { id:id });
      }
      return user// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkExistEducationAndExperience()`, error);
      throw error;
    }
  }

  export async function checkExist(uid) {
    try {
      logger.info(`${TAG}.checkExist() ==>`, uid);
      const contactQuery = 'SELECT * FROM `CONTACT_DETAILS` WHERE user_uid=:uid';
      const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid});
      return contact// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkExist()`, error);
      throw error;
    }
  }
