import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes, UUID } from "sequelize";

const TAG="student.database-lib.profile"

// creating new student with form data with
export async function studentProfilePost(user) {
  // const uid=crypto.randomUUID()
  console.log(user)
  console.log(user.basicDetails)
  logger.info(`${TAG}.studentProfilePost()`);
  try {
    const profileInsertQuery = `

   INSERT INTO STUDENT_PERSONAL_DETAILS (UID,FIRST_NAME, LAST_NAME, EMAIL, DATE_OF_BIRTH,GENDER, PHONE_NUMBER, PROFILE_PIC ,LINKEDIN_PROFILE)
   INSERT INTO STUDENT_PERSONAL_DETAILS (UID,FIRST_NAME, LAST_NAME, EMAIL, DATE_OF_BIRTH,GENDER, PHONE_NUMBER, PROFILE_PIC ,LINKEDIN_PROFILE)
    VALUES
  (:uid, :firstName, :lastName, :email, :dateOfBirth,:gender, :phoneNumber, :profilePic, :linkedinProfile)`;


    const contactInsertQuery = `
    INSERT INTO STUDENT_CONTACT_DETAILS 
    (UID, ADDRESS, DISTRICT, CITY, STATE, PIN_CODE, COUNTRY) 
    VALUES (:uid, :address, :district, :city,  :state, :pinCode, :country)`;

    
    let [profile]=await executeQuery(profileInsertQuery, QueryTypes.INSERT, {
      ...user.basicDetails,uid:user.uid});

    let [contact]=await executeQuery(contactInsertQuery, QueryTypes.INSERT, {
      ...user.contactDetails,uid:user.uid});


    return {profile,contact};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.studentProfilePost()`, error);
    throw error;
  }
}

export async function studentProfileUpdate(user) {
  logger.info(`${TAG}.studentProfileUpdate()`);
  try {
    const profileUpdateQuery = `UPDATE STUDENT_PERSONAL_DETAILS
    SET FIRST_NAME = :firstName,LAST_NAME = :lastName, EMAIL = :email,DATE_OF_BIRTH = :dateOfBirth,GENDER =:gender,PHONE_NUMBER = :phoneNumber,
    PROFILE_PIC = :profilePic,
    LINKEDIN_PROFILE =:linkedinProfile

    WHERE
    UID = :uid;
    `;

    const contactUpdateQuery = `UPDATE STUDENT_CONTACT_DETAILS
    SET
    ADDRESS = :address,
    DISTRICT = :district,
    CITY = :city, 
    STATE = :state,
    PIN_CODE = :pinCode,
    COUNTRY = :country
    WHERE
    UID = :uid;
    `;

    let [contact]=await executeQuery(contactUpdateQuery, QueryTypes.UPDATE, {
      ...user.contactDetails,uid:user.uid});

    let [profile]=await executeQuery(profileUpdateQuery, QueryTypes.UPDATE, {
        ...user.basicDetails,uid:user.uid});

    return user;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.studentProfileUpdate()`, error);
    throw error;
  }
}

export async function checkProfilExist(uid) {
  try {
    logger.info(`${TAG}.checkProfilExist() ==>`, uid);

    const basicQuery = 'SELECT * FROM `STUDENT_PERSONAL_DETAILS` WHERE UID= :uid';
    const contactQuery = 'SELECT * FROM `STUDENT_CONTACT_DETAILS` WHERE UID=:uid';
    const educationQuery = 'SELECT * FROM `STUDENT_EDUCATION_DETAILS` WHERE UID=:uid';
    const experienceQuery = 'SELECT * FROM `STUDENT_WORK_EXPERIENCE` WHERE UID=:uid';
    const resumeQuery = 'SELECT * FROM `STUDENT_RESUME` WHERE UID=:uid';
    const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {uid});
    const [contact]= await executeQuery(contactQuery, QueryTypes.SELECT, {uid});
    const education= await executeQuery(educationQuery, QueryTypes.SELECT, {uid});
    const experience= await executeQuery(experienceQuery, QueryTypes.SELECT, {uid});
    const resume= await executeQuery(resumeQuery, QueryTypes.SELECT, {uid});
    const data={
      basic,contact,education: Object.values(education),experience:Object.values(experience),resume
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
      const insertQuery =`INSERT INTO STUDENT_EDUCATION_DETAILS (UID, DEGREE, DEPT_BRANCH, COLLEGE, SCORE, START_YEAR, END_YEAR) 
      VALUES (:uid, :degree, :branch, :college, :score, :start, :end)`

      const updateQuery=`UPDATE STUDENT_EDUCATION_DETAILS SET DEGREE=:degree, DEPT_BRANCH=:branch, COLLEGE=:college, SCORE=:score, START_YEAR=start, END_YEAR=end WHERE USER_ID=:userId`

      let items:any=Object.values(user.data)
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
      const insertQuery =`INSERT INTO STUDENT_WORK_EXPERIENCE (UID, COMPANY,OCCUPATION, ROLE,SKILLS, START_YEAR, END_YEAR) VALUES (:uid, :PreviousCompanyName,:occupation ,:JobRole, :skills ,:startDate, :endDate)`

      const updateQuery=`UPDATE STUDENT_WORK_EXPERIENCE SET  COMPANY = :PreviousCompanyName,
      OCCUPATION= :occupation,
      ROLE = :JobRole,
      SKILLS = :skills,
      START_YEAR = :startDate,
      END_YEAR = :endDate WHERE ID=:id`

      let items:any=Object.values(user.data)

      for (const data of items) {
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
      const deleteQueries ="DELETE FROM STUDENT_EDUCATION_DETAILS WHERE  ID=:id;"
      
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
      const deleteQueries ="DELETE FROM STUDENT_WORK_EXPERIENCE WHERE  ID=:id;"
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
    console.log(id);
    let query1;
    let query2;
    let user = [];
    try {
      logger.info(`${TAG}.checkExistEducationAndExperience() ==>`, id);
  
      // Use ? as a placeholder for the parameter and pass the actual value separately
      query1 = 'SELECT * FROM `STUDENT_WORK_EXPERIENCE` WHERE ID = ?';
      user = await executeQuery(query1, QueryTypes.SELECT, [id]);
  
      if (user.length < 1) {
        // Use ? as a placeholder for the parameter and pass the actual value separately
        query2 = 'SELECT * FROM `STUDENT_EDUCATION_DETAILS` WHERE ID = ?';
        user = await executeQuery(query2, QueryTypes.SELECT, [id]);
      }
  
      return user; // Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkExistEducationAndExperience()`, error);
      throw error;
    }
  }
  

  export async function checkExist(uid) {
    try {
      logger.info(`${TAG}.checkExist() ==>`, uid);
      const contactQuery = 'SELECT * FROM `STUDENT_CONTACT_DETAILS` WHERE UID=:uid';
      const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid});
      return contact// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkExist()`, error);
      throw error;
    }
  }

  export async function uploadResume(source: any,uid: any) {
    console.log("********SDFASDFA************")
    console.log(source,uid)
    
    try {
      logger.info(`${TAG}.uploadResume() ==>`, source,uid);
      const query = `INSERT INTO STUDENT_RESUME (UID,SOURCE_URL ) VALUES(:uid,:file)`
      const resume= await executeQuery(query, QueryTypes.INSERT, {file:source.fileUrl,uid});
      return resume// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.uploadResume()`, error);
      throw error;
    }
  }

  export async function updateResume(source,uid) {
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    console.log(uid)
    console.log(source.fileUrl)
    
    try {
      logger.info(`${TAG}.updateResume() ==>`, source,uid);
      const query = `UPDATE STUDENT_RESUME SET SOURCE_URL= :file  WHERE UID= :uid`
      const resume= await executeQuery(query, QueryTypes.UPDATE, {file:source.fileUrl,uid});
      return resume// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updateResume()`, error);
      throw error;
    }
  }

  export async function checkResume(uid:any) {
    
    try {
      logger.info(`${TAG}.checkResume() ==>`, uid);
 
      const query = `SELECT * From STUDENT_RESUME WHERE UID= :uid`
      const resume= await executeQuery(query, QueryTypes.SELECT, {uid:uid});
      return resume
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkResume()`, error);
      throw error;
    }
  }
export async function getStudentResume(uid:any){
  try{
    logger.info(`${TAG}.getStudentResume() ==>`,uid);
    const query = `SELECT * FROM STUDENT_RESUME WHERE UID= :uid`
    const resume= await executeQuery(query, QueryTypes.SELECT,{uid:uid});
    return resume
  } catch(error){
    logger.error(`ERROR occurred in ${TAG}.getStudentResume()`,error);
    throw error;
  }
}
  