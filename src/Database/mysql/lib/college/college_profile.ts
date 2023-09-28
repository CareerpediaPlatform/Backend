import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";

const TAG = 'data_stores_mysql_lib_user-collegeprofile'

export async function checkProfilExist(uid) {
  try {
    logger.info(`${TAG}.checkProfilExist() ==>`, uid);

    const basicQuery = 'SELECT * FROM `COLLEGE_BASIC_DETAILS` WHERE user_uid= :uid';
    const collegeQuery = 'SELECT * FROM `COLLEGE_DETAILS` WHERE user_uid= :uid';
    const contactQuery = 'SELECT * FROM `CONTACT_DETAILS` WHERE user_uid= :uid';
    const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {uid:uid});
    const [college] = await executeQuery(collegeQuery, QueryTypes.SELECT, {uid:uid});
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid:uid});
    return {basic,college,contact}; // Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}

export async function checkExist(uid) {
  try {
    logger.info(`${TAG}.checkExist() ==>`, uid);
    const contactQuery = 'SELECT * FROM `CONTACT_DETAILS` WHERE user_uid=:uid';
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid:uid});
    return contact// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkExist()`, error);
    throw error;
  }
}

export async function isValid(uid) {
  try {
    logger.info(`${TAG}.isValid() ==>`, uid);
    const contactQuery = 'SELECT * FROM `COLLEGE` WHERE uid=:uid';
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid:uid});
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
    (user_uid,institute_logo,instituteName, founderName, email, phoneNumber, website, linkedInProfile) 
    VALUES (:uid, :logo, :instituteName, :founderName, :email, :phoneNumber, :website, :linkedInProfile)`;

    const contactInsertQuery = `
    INSERT INTO CONTACT_DETAILS 
    (user_uid,address, city, district, state, pinCode, country) 
    VALUES (:uid, :address, :city, :district, :state, :pinCode, :country)`;

    const collegeInsertQuery = `
    INSERT INTO COLLEGE_DETAILS (user_uid, accreditation, deemed, numberOfStudents, departments, start)
    VALUES (:uid, :accreditation, :deemed, :numberOfStudents, :departments, :start);
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
    institute_logo=:logo,
        instituteName=:instituteName,
        founderName = :founderName,
        email = :email,
        phoneNumber = :phoneNumber,
        website = :website,
        linkedInProfile = :linkedInProfile
        WHERE id= :id;
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
        WHERE id= :id;;
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
        WHERE id= :id;
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