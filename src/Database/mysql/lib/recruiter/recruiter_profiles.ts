import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";

const TAG = 'data_stores_mysql_lib_user-recruiterprofile'

export async function checkProfilExist(userID) {
  try {
    logger.info(`${TAG}.checkProfileExist() ==>`, userID);

    const basicQuery = 'SELECT * FROM `RECRUITER_BASIC_DETAILS` WHERE USER_ID= :userID';
    const companyQuery = 'SELECT * FROM `RECRUITER_COMPANY_DETAILS` WHERE USER_ID=:userID';
    const contactQuery = 'SELECT * FROM `RECRUITER_CONTACT_DETAILS` WHERE USER_ID=:userID';
    const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {userID});
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {userID});
    const [company] = await executeQuery(companyQuery, QueryTypes.SELECT, {userID});
    return {basic,contact,company}; // Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}

export async function checkExist(userID) {

  try {
    logger.info(`${TAG}.checkProfilExist() ==>`, userID);
    const checkQuery = 'SELECT * FROM `RECRUITER_BASIC_DETAILS` WHERE USER_ID=:userID';
    const [basic] = await executeQuery(checkQuery, QueryTypes.SELECT, {userID});
    return basic// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}

export async function isValid(userID) {
  try {
    logger.info(`${TAG}.checkProfilExist() ==>`, userID);
    const Query = 'SELECT * FROM `RECRUITER` WHERE USER_ID=:userID';
    const [contact] = await executeQuery(Query, QueryTypes.SELECT, {userID});
    return contact// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}

export async function recruiterProfilePost(user) {
  const uid=crypto.randomUUID()
  logger.info(`${TAG}.recruiterProfilePost()`);
  try {
    const basicInsertQuery = 
    `INSERT INTO RECRUITER_BASIC_DETAILS
    (USER_ID, UID, LOGO, COMPANYNAME, FOUNDERNAME, EMAIL, PHONENUMBER, WEBSITE, LINKEDINPROFILE )
      values(:userID, :uid, :logo, :companyName, :founderName, :email, :phoneNumber, :websiteUrl, :linkedInUrl)`;;

      const contactInsertQuery = `INSERT INTO recruiter_contact_details
      (USER_ID, UID, ADDRESS, CITY, DISRICT, STATE, PINCODE,COUNTRY)
        values(:recruiterUserId, :uid, :address, :city, :district, 
          :state, :pincode, :country)`;

    const companyInsertQuery = 
    `INSERT INTO recruiter_company_details
    (USER_ID, UID, ESTABLISHEDYEAR, NUMBEROFEMPLOYEES, DEPARTMENTS, STARTYEAR, ANNUALREVENUE)
      values(:userID, :uid, :establishedyear, :numberofemployees, :departments, :startyear, :annualrevenue)`;

   
     let [basic]=await executeQuery(basicInsertQuery, QueryTypes.INSERT, {
            ...user.basicDetails,userID:user.userID,uid});
     let [contact]=await executeQuery(contactInsertQuery, QueryTypes.INSERT, {
                ...user.contactDetails,userID:user.userID,uid});
    let [company]=await executeQuery(companyInsertQuery, QueryTypes.INSERT, {
      ...user.companyDetails,userID:user.userID,uid});


    return {basic,contact,company};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.collegeProfilePost()`, error);
    throw error;
  }
}

export async function recruitereBasicDetailsUpdate(user) {
  // console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrruuuuuuuuuuuuuuuuuuuuuuuuuuurrrrrrrrrrrr")
  // console.log(user)

  logger.info(`${TAG}.recruitereBasicDetailsUpdate()`);
  try {
    const updateQuery = `UPDATE RECRUITER_BASIC_DETAILS SET
    LOGO = :logo, COMPANYNAME = :companyName, FOUNDERNAME = :founderName, 
    EMAIL = :email, WEBSITE = :websiteUrl, LINKEDINPROFILE = :linkedInUrl WHERE USER_ID = :userID`;

    await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
    return user;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.recruitereBasicDetailsUpdate`, error);
    throw error;
  }
}

export async function recruiterContactUpdate(user) {
  logger.info(`${TAG}.recruiterContactUpdate()`);
  try {
    const updateQuery =`UPDATE RECRUITER_CONTACT_DETAILS SET
    ADDRESS = :address, CITY = :city, 
    DISRICT = :district, STATE = :state, 
    PINCODE = :pincode, COUNTRY = :country WHERE USER_ID = :userID`;

    await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
    return user;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.recruiterContactUpdate()`, error);
    throw error;
  }
}

export async function recruitercompanyDetailUpdate(user) {
  logger.info(`${TAG}.recruitercompanyDetailUpdate()`);
  try {
    const updateQuery = `UPDATE RECRUITER_COMPANY_DETAILS SET
    ESTABLISHEDYEAR = :establishedyear, NUMBEROFEMPLOYEES = :numberofemployees, DEPARTMENTS = :departments, 
    STARTYEAR = :startyear, ANNUALREVENUE = :annualrevenue WHERE USER_ID = :userID`;

    await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
    return user;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.recruitercompanyDetailUpdate()`, error);
    throw error;
  }
}