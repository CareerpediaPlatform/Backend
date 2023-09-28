import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";

const TAG = 'data_stores_mysql_lib_user-coillegeprofile'

export async function checkProfilExist(userID) {
  try {
    logger.info(`${TAG}.checkProfilExist() ==>`, userID);

    const basicQuery = 'SELECT * FROM `COLLEGE_BASIC_DETAILS` WHERE userID= :userID';
    const collegeQuery = 'SELECT * FROM `COLLEGE_DETAILS` WHERE userID=:userID';
    const contactQuery = 'SELECT * FROM `CONTACT_DETAILS` WHERE userID=:userID';
    const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {userID});
    const [college] = await executeQuery(collegeQuery, QueryTypes.SELECT, {userID});
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {userID});
    return {basic,college,contact}; // Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
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

export async function isValid(userID) {
  try {
    logger.info(`${TAG}.isValid() ==>`, userID);
    const contactQuery = 'SELECT * FROM `COLLEGE` WHERE USER_ID=:userID';
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {userID});
    return contact// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.isValid()`, error);
    throw error;
  }
}

export async function collegeProfilePost(user) {
  const uid=crypto.randomUUID()
  logger.info(`${TAG}.collegeProfilePost()`);
  try {
    const profileInsertQuery = `
    INSERT INTO COLLEGE_BASIC_DETAILS 
    (userID,uid,instituteName, founderName, email, phoneNumber, website, linkedInProfile) 
    VALUES (:userID, :uid, :instituteName, :founderName, :email, :phoneNumber, :website, :linkedInProfile)`;

    const contactInsertQuery = `
    INSERT INTO CONTACT_DETAILS 
    (userID,uid,address, city, district, state, pinCode, country) 
    VALUES (:userID, :uid, :address, :city, :district, :state, :pinCode, :country)`;

    const collegeInsertQuery = `
    INSERT INTO COLLEGE_DETAILS (userID, uid, accreditation, deemed, numberOfStudents, departments, start)
    VALUES (:userID, :uid, :accreditation, :deemed, :numberOfStudents, :departments, :start);
    `;
    let [contact]=await executeQuery(contactInsertQuery, QueryTypes.INSERT, {
      ...user.contactDetails,userID:user.userID,uid});

    let [profile]=await executeQuery(profileInsertQuery, QueryTypes.INSERT, {
        ...user.basicDetails,userID:user.userID,uid});
    let [college]=await executeQuery(collegeInsertQuery, QueryTypes.INSERT, {
        ...user.collegeDetails,userID:user.userID,uid});


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
        instituteName=:instituteName,
        founderName = :founderName,
        email = :email,
        phoneNumber = :phoneNumber,
        website = :website,
        linkedInProfile = :linkedInProfile
        WHERE userID = :userID;
  `;

    await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
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
    UPDATE CONTACT_DETAILS
    SET
    address =:address,
    city = :city,
    district =:district,
    state =:state,
    pinCode =:pinCode,
    country =:country
        WHERE userID = :userID;
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
    UPDATE COLLEGE_DETAILS
    SET
    accreditation =:accreditation,
        deemed =:deemed,
        numberOfStudents =:numberOfStudents,
        departments =:departments,
        start =:start
        WHERE userID = :userID;
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
      "DELETE FROM COLLEGE_BASIC_DETAILS WHERE userID = :userID;",
      "DELETE FROM CONTACT_DETAILS WHERE userID = :userID;",
      "DELETE FROM COLLEGE_DETAILS WHERE userID = :userID;",
      "DELETE FROM college WHERE user_ID = :userID;",
    ];
    // const deleteQueries =`"DELETE FROM  COLLEGE WHERE user_ID = :userID";`
    
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
