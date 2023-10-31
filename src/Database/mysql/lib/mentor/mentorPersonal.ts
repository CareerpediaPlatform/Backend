import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto")


const TAG = 'data_stores_mysql_lib_mentorPersonal'

export async function savePersonalAndContactDetails(
    mentorPersonalData: any,
    userId: number
  ) {
    logger.info(`${TAG}.savePersonalAndContactDetails()`);
    try {
      
      mentorPersonalData["mentorUserId"] = userId;
      let personalDetailQuery = `INSERT INTO MENTOR_PERSONAL_DETAILS 
                                   (USER_ID,UID, PROFILE_PIC, FIRST_NAME, LAST_NAME, EMAIL, MOBILE_NUMBER, DATE_OF_BIRTH, LINKEDIN_PROFILE, ADDRESS, 
                                    CITY, DISTRICT, STATE, PINCODE, COUNTRY)
                                   values(:mentorUserId,:uid,:profile_pic ,:first_name, :last_name, :email, :mobile_number, :date_of_birth, :linkedin_profile, 
                                          :address, :city, :district, :state, :pincode, :country)`;
  
      console.log(`mentor personal data in data store`, mentorPersonalData);
      await executeQuery(personalDetailQuery, QueryTypes.INSERT, {
        ...mentorPersonalData
      });
      return mentorPersonalData.uid;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.savePersonalAndContactDetails()`, error);
      throw error;
    }
  }

export async function updatePersonalAndContactDetails(
    userId: number,
    mentorPersonalData: any
  ) {
    logger.info(`${TAG}.updatePersonalAndContactDetails()`);
    try {
        // mentorPersonalData["updatedBy"] = userId;
      let updatePersonalDetailQuery = `UPDATE MENTOR_PERSONAL_DETAILS SET
      PROFILE_PIC= :profile_pic, FIRST_NAME = :first_name, LAST_NAME = :last_name, EMAIL = :email, MOBILE_NUMBER =:mobile_number, DATE_OF_BIRTH = :date_of_birth, LINKEDIN_PROFILE = :linkedin_profile ,
      ADDRESS = :address, CITY = :city, DISTRICT = :district, STATE = :state, PINCODE =:pincode, COUNTRY = :country WHERE UID = :uid`;
  
      await executeQuery(
        updatePersonalDetailQuery,
        QueryTypes.UPDATE,
        mentorPersonalData
      );
      return mentorPersonalData.uid;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updatePersonalAndContactDetails()`, error);
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

export async function isValid(uid) {
    console.log("asdfghjklkjhgfdsdfghmjhgfdsdfghj")
    console.log(uid)
    try {
      logger.info(`${TAG}.isValid() ==>`, uid);
      console.log("1234567890")
      const contactQuery = 'SELECT USER_ID FROM `MENTOR` WHERE UID=:uid';
      const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid:uid});
      return contact// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.isValid()`, error);
      throw error;
    }
  }

  export async function isValids(uid) {
    console.log("asdfghjklkjhgfdsdfghmjhgfdsdfghj")
    console.log(uid)
    try {
      logger.info(`${TAG}.isValid() ==>`, uid);
      console.log("1234567890")
      const contactQuery = 'SELECT * FROM `MENTOR` WHERE UID=:uid';
      const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid:uid});
      return contact// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.isValid()`, error);
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


  
