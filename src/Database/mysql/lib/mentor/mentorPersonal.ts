import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto")
const TAG = 'data_stores_mysql_lib_user-mentorprofile';

//get all personal details
export async function checkProfilExist(userID) {
    try {
      logger.info(`${TAG}.checkProfileExist() ==>`, userID);
  
      const basicQuery = 'SELECT * FROM `MENTOR_PERSONAL_DETAILS` WHERE USER_ID= :userID';
     
      const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {userID});
      
      return basic; // Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
      throw error;
    }
  }

  // check uesrId in mentor personal details
export async function checkExist(userID) {

    try {
      logger.info(`${TAG}.checkExist() ==>`, userID);
      const checkQuery = 'SELECT * FROM `MENTOR_PERSONAL_DETAILS` WHERE USER_ID=:userID';
      const [basic] = await executeQuery(checkQuery, QueryTypes.SELECT, {userID});
      return basic// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
      throw error;
    }
  }

  //check userId in mentor
export async function isValid(userID) {
    try {
      logger.info(`${TAG}.checkProfilExist() ==>`, userID);
      const Query = 'SELECT * FROM `MENTOR` WHERE USER_ID=:userID';
      const [profile] = await executeQuery(Query, QueryTypes.SELECT, {userID});
      return profile// Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
      throw error;
    }
  }


  // post mentor all profile data
export async function mentorProfilePost(user) {
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrruuuuuuuuuuuuuuuuuuuuuuuuuuurrrrrrrrrrrr")
    console.log(user)
    const uid=crypto.randomUUID()
    logger.info(`${TAG}.mentorProfilePost()`);
    try {
      const basicInsertQuery = 
      `INSERT INTO MENTOR_PERSONAL_DETAILS (USER_ID, UID, PROFILE_PIC, FIRST_NAME, LAST_NAME, EMAIL, MOBILE_NUMBER, DATE_OF_BIRTH, LINKEDIN_PROFILE, ADDRESS, CITY, DISTRICT, STATE, PINCODE, COUNTRY) values(:userID,:uid,:profile_pic ,:first_name, :last_name, :email, :mobile_number, :date_of_birth, :linkedin_profile, :address, :city, :district, :state, :pincode, :country)`;
    
      let [profile]=await executeQuery(basicInsertQuery, QueryTypes.INSERT, {
              ...user.personalDetails,userID:user.userID,uid});
   
     return profile;
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.mentorProfilePost()`, error);
      throw error;
    }
  }

  //update  mentor peronal details
export async function mentorPersonalDetailsUpdate(user) {
    logger.info(`${TAG}.mentorPersonalDetailsUpdate()`);
    try {
      const updateQuery = `UPDATE MENTOR_PERSONAL_DETAILS SET PROFILE_PIC= :profile_pic, FIRST_NAME = :first_name, LAST_NAME = :last_name, EMAIL = :email, MOBILE_NUMBER =:mobile_number, DATE_OF_BIRTH = :date_of_birth, LINKEDIN_PROFILE = :linkedin_profile ,
     ADDRESS = :address, CITY = :city, DISTRICT = :district, STATE = :state, PINCODE =:pincode, COUNTRY = :country WHERE USER_ID = :userID`
  
      await executeQuery(updateQuery, QueryTypes.UPDATE, {
        ...user,
      });
      return user;
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.mentorPersonalDetailsUpdate()`, error);
      throw error;
    }
  }

  //delete mentor
export async function deleteMentor(userID) {
    try {
      logger.info(`${TAG}.deleteMentor() ==>`, userID);
      console.log(" **************************llib*************")
      console.log(userID)
      const response=[]
  
      const deleteQueries = [
  
        "DELETE FROM MENTOR_PERSONAL_DETAILS WHERE USER_ID= :userID;",

        "DELETE FROM MENTOR WHERE USER_ID=:userID;",
  
      ];
  
      for (const query of deleteQueries) {
        const res=await executeQuery(query, QueryTypes.DELETE, {
          userID
        });
  
        response.push(res)
  
      }
  
      return {message:"mentor deleted",response};
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.deleteMentor()`, error);
      throw error;
    }
  }