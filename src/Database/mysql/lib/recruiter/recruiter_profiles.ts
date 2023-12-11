import logger from "../../../../logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto");
import nodeUtil from 'util';
const TAG = 'data_stores_mysql_lib_user-recruiterprofile';

//get all profile details
export async function getRecruiterProfile(uid: any) {
  try {
    logger.info(`${TAG}.checkProfileExist() ==>`, uid);

    const basicQuery = 'SELECT * FROM `RECRUITER_BASIC_DETAILS` WHERE UID= :uid';
    const contactQuery = 'SELECT * FROM `RECRUITER_CONTACT_DETAILS` WHERE UID= :uid';
    const companyQuery = 'SELECT * FROM `RECRUITER_COMPANY_DETAILS` WHERE UID= :uid';
    const [basic] = await executeQuery(basicQuery, QueryTypes.SELECT, {uid:uid});
    const [contact] = await executeQuery(contactQuery, QueryTypes.SELECT, {uid:uid});
    const [company] = await executeQuery(companyQuery, QueryTypes.SELECT, {uid:uid});

    return {basic,contact,company}; // Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}

// check uesrId in recruiter basic details
export async function checkExist(uid: any) {

  try {
    logger.info(`${TAG}.checkExist() ==>`, uid);
    const checkQuery = 'SELECT * FROM `RECRUITER_BASIC_DETAILS` WHERE UID=:uid';
    const [basic] = await executeQuery(checkQuery, QueryTypes.SELECT, {uid});
    return basic// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}
//check userId in recruiter 
export async function isValid(uid) {
  try {
    logger.info(`${TAG}.checkProfilExist() ==>`, uid);
    const Query = 'SELECT * FROM `RECRUITER` WHERE UID=:uid';
    const [contact] = await executeQuery(Query, QueryTypes.SELECT, {uid});
    return contact// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}
// post recruiter all profile data
export async function recruiterProfilePost(user: any) {
  console.log(user)
  const uid=user.uid
  logger.info(`${TAG}.recruiterProfilePost()`);
  try {

    const basicInsertQuery = 
    `INSERT INTO RECRUITER_BASIC_DETAILS
    ( UID, LOGO, COMPANY_NAME, FOUNDER_NAME, EMAIL, PHONE_NUMBER, WEBSITE, LINKEDIN_PROFILE )
      values( :uid, :logo, :companyName, :founderName, :email, :phoneNumber, :website, :linkedinProfile)`;

      const contactInsertQuery = `INSERT INTO RECRUITER_CONTACT_DETAILS
      ( UID, ADDRESS, CITY, DISRICT, STATE, PINCODE, COUNTRY)
        values( :uid, :address, :city, :disrict, 
          :state, :pincode, :country)`;

    const companyInsertQuery = 
    `INSERT INTO RECRUITER_COMPANY_DETAILS
    ( UID, ESTABLISHED_YEAR, NUMBER_OF_EMPLOYEES, DEPARTMENTS, START_YEAR, ANNUAL_REVENUE)
      values( :uid, :establishedYear, :numberOfEmployees, :departments, :startYear, :annualRevenue)`;

   
     let [basic]=await executeQuery(basicInsertQuery, QueryTypes.INSERT, {
            ...user.Profile,uid});
     let [contact]=await executeQuery(contactInsertQuery, QueryTypes.INSERT, {
                ...user.Contact,uid});         
    let [company]=await executeQuery(companyInsertQuery, QueryTypes.INSERT, {
      ...user.Company,uid});


    return {basic,contact,company};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.recruiterProfilePost()`, error);
    throw error;
  }
}

//update basic details
export async function recruiterBasicDetailsUpdate(user: any) {

  logger.info(`${TAG}.recruiterBasicDetailsUpdate()`);

  try {
    const updateQuery = `UPDATE RECRUITER_BASIC_DETAILS SET
    LOGO = :logo, COMPANY_NAME = :companyName, FOUNDER_NAME = :founderName, 
    EMAIL = :email, PHONE_NUMBER= :phoneNumber, WEBSITE = :website, LINKEDIN_PROFILE = :linkedinProfile WHERE UID = :uid`;

    await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
    return user;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.recruiterBasicDetailsUpdate`, error);
    throw error;
  }
}
// update contact details
export async function recruiterContactUpdate(user: any) {
  logger.info(`${TAG}.recruiterContactUpdate()`);
  try {
    const updateQuery =`UPDATE RECRUITER_CONTACT_DETAILS SET
    ADDRESS = :address, CITY = :city, 
    DISRICT = :disrict, STATE = :state, 
    PINCODE = :pincode, COUNTRY = :country WHERE UID = :uid`;

    await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
    return user;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.recruiterContactUpdate()`, error);
    throw error;
  }
}
//update company details
export async function recruitercompanyDetailUpdate(user: any) {
  logger.info(`${TAG}.recruitercompanyDetailUpdate()`);
  try {
    const updateQuery = `UPDATE RECRUITER_COMPANY_DETAILS SET
    ESTABLISHED_YEAR = :establishedYear, NUMBER_OF_EMPLOYEES = :numberOfEmployees, DEPARTMENTS = :departments, 
    START_YEAR = :startYear, ANNUAL_REVENUE = :annualRevenue WHERE UID = :uid`;

    await executeQuery(updateQuery, QueryTypes.UPDATE, {
      ...user,
    });
    return user;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.recruitercompanyDetailUpdate()`, error);
    throw error;
  }
}
//delete recruiter
export async function deleteRecruiter(userID) {
  try {
    logger.info(`${TAG}.deleteRecruiter() ==>`, userID);
    console.log(" **************************llib*************")
    console.log(userID)
    const response=[]

    const deleteQueries = [

      "DELETE FROM RECRUITER_BASIC_DETAILS WHERE USER_ID= :userID;",

      "DELETE FROM RECRUITER_CONTACT_DETAILS WHERE USER_ID=:userID;",

      "DELETE FROM RECRUITER_COMPANY_DETAILS WHERE USER_ID=:userID;",

      "DELETE FROM RECRUITER WHERE USER_ID=:userID;",

    ];

    for (const query of deleteQueries) {
      const res=await executeQuery(query, QueryTypes.DELETE, {
        userID
      });

      response.push(res)

    }

    return {message:"recruiter deleted",response};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteRecruiter()`, error);
    throw error;
  }
}


//*******************companylogo******************* */
export async function saveFile(fileDetails: any): Promise<any> {
  logger.info(`${TAG}.saveFile()`)

  try {
    fileDetails['uid'] = crypto.randomUUID()
 
    fileDetails['metaData'] = JSON.stringify(fileDetails?.metaData || {})

    const fileInsertQuery = `INSERT INTO FILE_DETAILS
(UID, FILE_NAME,ORIGINAL_FILE_NAME, CONTENT_TYPE, S3_BUCKET, FILE_PATH, FILE_URL, IS_PUBLIC, METADATA, CREATED_AT)
VALUES(:uid,:fileName,:originalFileName, :contentType, :s3Bucket, :filePath, :fileUrl, :isPublic, :metaData, CURRENT_TIMESTAMP)`

    const [id] = await executeQuery(fileInsertQuery, QueryTypes.INSERT, {
      ...fileDetails
    })
    return { id: id, uid: fileDetails.uid }
    
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveFile()`, error)
    throw error
  }
}

export async function getRecruiterFile(userID){
  logger.info(`${TAG}.getRecruiterFile() ==>`, userID);
  try{
    const getQuery=`SELECT * FROM FILE_DETAILS WHERE USER_ID= :userID`
    const [filedetails] = await executeQuery(getQuery, QueryTypes.SELECT,{ userID})
 return filedetails
  }
  catch(error){
    logger.error(`ERROR occurred in ${TAG}.getRecruiterFile()`, error)
    throw error
  }
}

export async function updateCompanylogo(fileDetails:any, userID:any,):Promise<any>{
  
  logger.info(`${TAG}.updateCompanylogo() ==>`, userID,fileDetails);
  console.log("ffffffffffffffffffffffffffffffffffffffff")
  console.log(fileDetails)


  try{
    const updateQuery = `UPDATE FILE_DETAILS SET FILE_NAME=:fileName,ORIGINAL_FILE_NAME=:originalFileName,FILE_PATH=:filePath WHERE USER_ID= :userID`
    const updatedLogoRecords = await executeQuery( updateQuery, QueryTypes.UPDATE, {
      ...fileDetails,userID
    })
    logger.debug('updatedLogoRecords: '+ nodeUtil.inspect(updatedLogoRecords))
    return updatedLogoRecords
  }
  catch(error){
    logger.error(`ERROR occurred in ${TAG}.updateCompanylogo()`, error)
    throw error
  }
}


//*******************************VIDEO**************************** */

export async function uploadVideoFile(fileDetails: any): Promise<any> {
  logger.info(`${TAG}.uploadVideoFile()`)
  console.log("44444444444444444444444444444444444444444")
   console.log(fileDetails)

  try {
    fileDetails['uid'] = crypto.randomUUID()
 
    fileDetails['metaData'] = JSON.stringify(fileDetails?.metaData || {})

    const videoInsertQuery = `INSERT INTO VIDEO (UID,  VIDEO_URL)VALUES(:uid, :fileUrl)`

    const [id] = await executeQuery(videoInsertQuery, QueryTypes.INSERT, {
      ...fileDetails
    })
    return { id: id, uid: fileDetails.uid }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveFile()`, error)
    throw error
  }
}



export async function getRecruiterList(userId) {
    try {
      logger.info(`${TAG}.getRecruiterList() ==>`, userId);
  
      const personalQuery = 'SELECT LOGO, COMPANYNAME, FOUNDERNAME, EMAIL, PHONENUMBER FROM `RECRUITER_BASIC_DETAILS` WHERE USER_ID = :userID';
      const wokrQuery = 'SELECT NUMBEROFEMPLOYEES FROM `RECRUITER_COMPANY_DETAILS` WHERE USER_ID = :userID';
      const query = `SELECT
            pd.LOGO,
            pd.COMPANYNAME,
            pd.FOUNDERNAME,
            pd.EMAIL,
            pd.PHONENUMBER,
            we.NUMBEROFEMPLOYEES
            FROM RECRUITER_BASIC_DETAILS pd
            INNER JOIN RECRUITER_COMPANY_DETAILS we ON pd.USER_ID = we.USER_ID
            WHERE pd.USER_ID = :userID`;
      const [basic] = await executeQuery(personalQuery, QueryTypes.SELECT, {userId});
      const [work] = await executeQuery(wokrQuery, QueryTypes.SELECT, {userId});
      const [conactquery] = await executeQuery(query, QueryTypes.SELECT, {userId});
      return conactquery; // Return null if no user is found
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getRecruiterList()`, error);
      throw error;
    }
  }

  
