import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";

const TAG = 'data_stores_mysql_lib_user-collegeprofile'

export async function checkProfilExist(uid) {
  try {
    logger.info(`${TAG}.checkProfilExist() ==>`, uid);

    const basicQuery = 'SELECT * FROM `COLLEGE_BASIC_DETAILS` WHERE UID= :uid';
    const collegeQuery = 'SELECT * FROM `COLLEGE_PROFILE_DETAILS` WHERE UID= :uid';
    const contactQuery = 'SELECT * FROM `COLLEGE_CONTACT_DETAILS` WHERE UID= :uid';
    const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {uid:uid});
    const [college] = await executeQuery(collegeQuery, QueryTypes.SELECT, {uid:uid});
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid:uid});
    console.log(basic)
    return {basic,college,contact}; // Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}

export async function checkExist(uid) {
  try {
    logger.info(`${TAG}.checkExist() ==>`, uid);
    const contactQuery = 'SELECT * FROM `COLLEGE_CONTACT_DETAILS` WHERE UID=:uid';
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid:uid});
    return contact// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkExist()`, error);
    throw error;
  }
}

export async function isValid(uid) {
  console.log("jjjjjjjjjjjjjjjjjjjjjjjjj",uid)
  try {
    logger.info(`${TAG}.isValid() ==>`, uid);
    const contactQuery = 'SELECT * FROM `COLLEGE_ADMIN` WHERE UID=:uid';
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid:uid});
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk",contact)
    return contact// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.isValid()`, error);
    throw error;
  }
}

export async function collegeProfilePost(user) {
  const uid=user.id
  let basicDetails={...user.basicDetails,uid:user.uid}
  let contactDetails={...user.contactDetails,uid:user.uid}
  let collegeDetails={...user.collegeDetails,uid:user.uid}
  console.log(basicDetails)
  logger.info(`${TAG}.collegeProfilePost()`);
  try {
    const profileInsertQuery = `
    INSERT INTO COLLEGE_BASIC_DETAILS 
    (UID,INSTITUTE_LOGO, INSTITUTE_NAME, FOUNDER_NAME, EMAIL, PHONE_NUMBER, WEBSITE, LINKEDIN_PROFILE) 
    VALUES (:uid, :logo, :instituteName, :founderName, :email, :phoneNumber, :website, :linkedInProfile)`;

    const contactInsertQuery = `
    INSERT INTO COLLEGE_CONTACT_DETAILS 
    (UID,ADDRESS, CITY, DISTRICT, STATE, PIN_CODE, COUNTRY) 
    VALUES (:uid, :address, :city, :district, :state, :pinCode, :country)`;

    const collegeInsertQuery = `
    INSERT INTO COLLEGE_PROFILE_DETAILS (UID, ACCREDITATION, DEEMED, NUMBER_OF_STUDENTS, DEPARTMENTS, COLLEGE_CODE, START_YEAR)
    VALUES (:uid, :accreditation, :deemed, :numberOfStudents, :departments, :collegecode, :start);
    `;
    let [contact]=await executeQuery(contactInsertQuery, QueryTypes.INSERT, {
      ...contactDetails});

    let [profile]=await executeQuery(profileInsertQuery, QueryTypes.INSERT, {
        ...basicDetails});
    let [college]=await executeQuery(collegeInsertQuery, QueryTypes.INSERT, {
        ...collegeDetails});
      

    return {profile,contact,college};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.collegeProfilePost()`, error);
    throw error;
  }
}

export async function collegeProfileUpdate(user) {
  
  logger.info(`${TAG}.collegeProfileUpdate()`);
  try {
    const updateQuery = `
    UPDATE COLLEGE_BASIC_DETAILS
    SET
    INSTITUTE_LOGO=:logo,
    INSTITUTE_NAME=:instituteName,
    FOUNDER_NAME = :founderName,
    EMAIL = :email,
    PHONE_NUMBER = :phoneNumber,
    WEBSITE = :website,
    LINKEDIN_PROFILE = :linkedInProfile
        WHERE Id= :id;
  `;

   await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
    console.log("3246385723848349814",user)
    return user;
   
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.collegeProfileUpdate()`, error);
    throw error;
  }
}

export async function collegeContactUpdate(user) {
  logger.info(`${TAG}.collegeContactUpdate()`);
  
  try {
    const updateQuery = `
    UPDATE COLLEGE_CONTACT_DETAILS
    SET
    ADDRESS =:address,
    CITY = :city,
    DISTRICT =:district,
    STATE =:state,
    PIN_CODE =:pinCode,
    COUNTRY =:country
        WHERE Id= :id;
  `;

    await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
    return user;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.collegeContactUpdate()`, error);
    throw error;
  }
}

export async function collegeDetailUpdate(user) {
  logger.info(`${TAG}.collegeDetailUpdate()`);

  try {
    const updateQuery = `
    UPDATE COLLEGE_PROFILE_DETAILS
    SET
    ACCREDITATION = :accreditation,
    DEEMED = :deemed,
    NUMBER_OF_STUDENTS =:numberOfStudents,
    DEPARTMENTS = :departments,
    COLLEGE_CODE = :collegecode,
    START_YEAR  =:start
        WHERE Id= :id;
  `;

    await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
    return user;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.collegeDetailUpdate()`, error);
    throw error;
  }
}

export async function collegeProfileDelete(user) {
  logger.info(`${TAG}.collegeProfileDelete()`);
  try {
    const response=[]
    const deleteQueries = [
      "DELETE FROM COLLEGE_BASIC_DETAILS WHERE ID = :userID;",
      "DELETE FROM COLLEGE_CONTACT_DETAILS WHERE ID = :userID;",
      "DELETE FROM COLLEGE_PROFILE_DETAILS WHERE ID = :userID;",
      "DELETE FROM COLLEGE_ADMIN WHERE ID = :userID;",
    ];
    
    for (const query of deleteQueries) {
      const res=await executeQuery(query, QueryTypes.DELETE, {
        userID: user
      });
      response.push(res)
    }
    
    return {message:"college deleted",response};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.collegeProfileDelete()`, error);
    throw error;
  }
}


export async function getCollegeList(userID) {
  try {
    logger.info(`${TAG}.checkProfileExist() ==>`, userID);
    const personalQuery = 'SELECT logo,instituteName, founderName, email, phoneNumber, website FROM `COLLEGE_BASIC_DETAILS` WHERE userID= :userID';
    const [basic] = await executeQuery(personalQuery, QueryTypes.SELECT, {userID});
    return basic; 
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}
