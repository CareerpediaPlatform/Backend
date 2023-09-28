import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto");
import nodeUtil from 'util';
const TAG = 'data_stores_mysql_lib_user-recruiterprofile';

//get all profile details
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

// check uesrId in recruiter basic details
export async function checkExist(userID) {

  try {
    logger.info(`${TAG}.checkExist() ==>`, userID);
    const checkQuery = 'SELECT * FROM `RECRUITER_BASIC_DETAILS` WHERE USER_ID=:userID';
    const [basic] = await executeQuery(checkQuery, QueryTypes.SELECT, {userID});
    return basic// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}
//check userId in recruiter 
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
// post recruiter all profile data
export async function recruiterProfilePost(user) {
  console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrruuuuuuuuuuuuuuuuuuuuuuuuuuurrrrrrrrrrrr")
  console.log(user)
  const uid=crypto.randomUUID()
  logger.info(`${TAG}.recruiterProfilePost()`);
  try {

    const basicInsertQuery = 
    `INSERT INTO RECRUITER_BASIC_DETAILS
    (USER_ID, UID, LOGO, COMPANYNAME, FOUNDERNAME, EMAIL, PHONENUMBER, WEBSITE, LINKEDINPROFILE )
      values(:userID, :uid, :logo, :companyName, :founderName, :email, :phoneNumber, :websiteUrl, :linkedInUrl)`;

      const contactInsertQuery = `INSERT INTO RECRUITER_CONTACT_DETAILS
      (USER_ID, UID, ADDRESS, CITY, DISRICT, STATE, PINCODE, COUNTRY)
        values(:userID, :uid, :address, :city, :district, 
          :state, :pincode, :country)`;

    const companyInsertQuery = 
    `INSERT INTO RECRUITER_COMPANY_DETAILS
    (USER_ID, UID, ESTABLISHEDYEAR, NUMBEROFEMPLOYEES, DEPARTMENTS, STARTYEAR, ANNUALREVENUE)
      values(:userID, :uid, :establishedyear, :numberofemployees, :departments, :startyear, :annualrevenue)`;

   
     let [basic]=await executeQuery(basicInsertQuery, QueryTypes.INSERT, {
            ...user.Profile,userID:user.userID,uid});
     let [contact]=await executeQuery(contactInsertQuery, QueryTypes.INSERT, {
                ...user.Contact,userID:user.userID,uid});

             
    let [company]=await executeQuery(companyInsertQuery, QueryTypes.INSERT, {
      ...user.Company,userID:user.userID,uid});


    return {basic,contact,company};

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.recruiterProfilePost()`, error);
    throw error;
  }
}
//update basic details
export async function recruiterBasicDetailsUpdate(user) {
  
  logger.info(`${TAG}.recruiterBasicDetailsUpdate()`);
  console.log("888888888888888888888888888888888888888888888")
  console.log(user)
  try {
    const updateQuery = `UPDATE RECRUITER_BASIC_DETAILS SET
    LOGO = :logo, COMPANYNAME = :companyName, FOUNDERNAME = :founderName, 
    EMAIL = :email, PHONENUMBER= :phoneNumber, WEBSITE = :websiteUrl, LINKEDINPROFILE = :linkedInUrl WHERE USER_ID = :userID`;

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
//update company details
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
export async function getRecruiterFile(userID:any){
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