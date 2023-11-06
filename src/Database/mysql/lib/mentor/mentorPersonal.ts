import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto")


const TAG = 'data_stores_mysql_lib_mentorPersonal'

export async function mentorProfilePost(user) {

  // const uid=crypto.randomUUID()
  console.log(user)
  // console.log(user.basicDetails)
  logger.info(`${TAG}.mentorProfilePost()`);
  try {
    const profileInsertQuery = `
    INSERT INTO MENTOR_PERSONAL_DETAILS (UID, FIRST_NAME, LAST_NAME, EMAIL, DATE_OF_BIRTH, GENDER, PHONE_NUMBER, PROFILE_PIC, LINKEDIN_PROFILE)
    VALUES (:uid, :firstName, :lastName, :email, :dateOfBirth, :gender, :phoneNumber, :profilePic, :linkedinProfile)`;
  

    const contactInsertQuery = `
    INSERT INTO MENTOR_CONTACT_DETAILS 
    (UID, ADDRESS, DISTRICT, CITY, STATE, PIN_CODE, COUNTRY) 
    VALUES (:uid, :address, :district, :city,  :state, :pinCode, :country)`;

    
    let [profile]=await executeQuery(profileInsertQuery, QueryTypes.INSERT, {
      ...user.basicDetails,uid:user.uid});

    let [contact]=await executeQuery(contactInsertQuery, QueryTypes.INSERT, {
      ...user.contactDetails,uid:user.uid});


    return {profile,contact};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.mentorProfilePost()`, error);
    throw error;
  }
}

export async function mentorProfileUpdate(user) {
    logger.info(`${TAG}.mentorProfileUpdate()`);
  try {
    const profileUpdateQuery = `UPDATE MENTOR_PERSONAL_DETAILS
    SET FIRST_NAME = :firstName,LAST_NAME = :lastName, EMAIL = :email,DATE_OF_BIRTH = :dateOfBirth,PHONE_NUMBER = :phoneNumber, GENDER=:gender,
    PROFILE_PIC = :profilePic,
    LINKEDIN_PROFILE = :linkedinProfile
    WHERE
    UID = :uid;
    `;

    const contactUpdateQuery = `UPDATE MENTOR_CONTACT_DETAILS
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
        const contactDetails=user.contactDetails
        const basicDetails=user.basicDetails

    return {contactDetails,basicDetails};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.mentorProfileUpdate()`, error);
    throw error;
  }
}

export async function getPersonalDetailsByMentorId(mentorId: number) {
    try {
      logger.info(`${TAG}.getPersonalDetailsByMentorId()  ==>`, mentorId);
  
      let query ="select * from MENTOR_PERSONAL_DETAILS where USER_ID = :mentorId";
      const [personalDetails] = await executeQuery(query, QueryTypes.SELECT, {
        mentorId,
      });
      return personalDetails;
    } catch (error) {
      logger.error(
        `ERROR occurred in ${TAG}.getPersonalDetailsByMentorId()`,
        error
      );
      throw error;
    }
  }

export async function checkMentorUid(uid){
  
    try {
      logger.info(`${TAG}.checkMentorUid()  ==>`, uid);
      let query = 'select * from MENTOR where UID=:uid';
      const [userId] = await executeQuery(query, QueryTypes.SELECT, {
        uid
      });
      return userId;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkMentorUid()`, error); 
      throw error;
    }
  }

export async function checkExist(uid: any) {

    try {
      logger.info(`${TAG}.checkExist() ==>`, uid);
      const checkQuery = 'SELECT * FROM `MENTOR_PERSONAL_DETAILS` WHERE UID=:uid';
      const [basic] = await executeQuery(checkQuery, QueryTypes.SELECT, {uid});
      return basic// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
      throw error;
    }
  }

export async function getMentorList(userId) {
    try {
      logger.info(`${TAG}.checkProfileExist() ==>`, userId);
      const personalQuery = 'SELECT PROFILE_PIC,FIRST_NAME,LAST_NAME,EMAIL,MOBILE_NUMBER FROM `MENTOR_PERSONAL_DETAILS` WHERE USER_ID= :userId';
      const wokrQuery = 'SELECT YEAR_OF_EXPERIENCE FROM `MENTOR_WORK_EXPERIENCE` WHERE USER_ID= :userId';
      const query = `SELECT
            pd.PROFILE_PIC,
            CONCAT(pd.FIRST_NAME, ' ', pd.LAST_NAME) AS NAME,
            pd.EMAIL,
            pd.MOBILE_NUMBER,
            we.YEAR_OF_EXPERIENCE
            FROM MENTOR_PERSONAL_DETAILS pd
            INNER JOIN MENTOR_WORK_EXPERIENCE we ON pd.USER_ID = we.USER_ID
            WHERE pd.USER_ID = :userId`;
      const [basic] = await executeQuery(personalQuery, QueryTypes.SELECT, {userId});
      const [work] = await executeQuery(wokrQuery, QueryTypes.SELECT, {userId});
      const [conactquery] = await executeQuery(query, QueryTypes.SELECT, {userId});
      return conactquery; 
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
      throw error;
    }
  }


  
