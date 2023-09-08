import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto = require("crypto");

const TAG = "data_stores_mysql_lib_user";

export async function savePersonalDetails(
  mentorPersonalData: any,
  userId: number
) {
  logger.info(`${TAG}.saveUser()`);
  try {
    mentorPersonalData["uid"] = crypto.randomUUID()
    mentorPersonalData["mentorUserId"] = userId;

    let personalDetailQuery = `INSERT INTO MENTOR_PERSONAL_DETAILS
                                 (USER_ID, UID,PROFILE_PIC, FIRST_NAME, LAST_NAME)
                                 values(:mentorUserId, :uid,:profile_pic ,:first_name, :last_name)`;

    console.log(`mentor personal data in data store`, mentorPersonalData);
    await executeQuery(personalDetailQuery, QueryTypes.INSERT, {
      ...mentorPersonalData,
    });
    return mentorPersonalData.uid;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}


export async function getPersonalDetailsByMentorId(mentorId: number) {
    try {
      logger.info(`${TAG}.getPersonalDetailsByInvestorId()  ==>`, mentorId);
  
      let query =
        "select * from MENTOR_PERSONAL_DETAILS where USER_ID = :mentorId";
      const [personalDetails] = await executeQuery(query, QueryTypes.SELECT, {
        mentorId,
      });
      return personalDetails;
    } catch (error) {
      logger.error(
        `ERROR occurred in ${TAG}. getPersonalDetailsByMentorId()`,
        error
      );
      throw error;
    }
  }
  
