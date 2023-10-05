import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes, UUID } from "sequelize";

const TAG="student.database-lib.profile"

// creating new student with form data with
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

    let [contact]=await executeQuery(contactUpdateQuery, QueryTypes.UPDATE, {
      ...user.contactDetails,uid:user.uid});

    let [profile]=await executeQuery(profileUpdateQuery, QueryTypes.UPDATE, {
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
    const [contact]= await executeQuery(contactQuery, QueryTypes.SELECT, {uid});
    const education= await executeQuery(educationQuery, QueryTypes.SELECT, {uid});
    const experience= await executeQuery(experienceQuery, QueryTypes.SELECT, {uid});
    const data={
      basic,contact,education: Object.values(education),experience:Object.values(experience)
    }
    return {...data}; // Return null if no user is found
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

  export async function uploadResume(uid) {
    try {
      logger.info(`${TAG}.uploadResume() ==>`, uid);
      const query = `INSERT INTO student_resume (user_uid,source, doc_id) VALUES(:uid,:source, :doc_id)`
      const resume= await executeQuery(query, QueryTypes.INSERT, {uid});
      return resume// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.uploadResume()`, error);
      throw error;
    }
  }

  export async function updateResume(uid) {
    try {
      logger.info(`${TAG}.updateResume() ==>`, uid);
      const query = `UPDATE student_resume SET source=:source, doc_id=:doc_id WHERE user_id=uid`
      const resume= await executeQuery(query, QueryTypes.UPDATE, {uid});
      return resume// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updateResume()`, error);
      throw error;
    }
  }

  export async function checkResume(uid) {
    try {
      logger.info(`${TAG}.checkResume() ==>`, uid);
      const query = `SELECT * From student_resume WHERE user_uid=uid`
      const resume= await executeQuery(query, QueryTypes.SELECT, {uid});
      return resume
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkResume()`, error);
      throw error;
    }
  }

  