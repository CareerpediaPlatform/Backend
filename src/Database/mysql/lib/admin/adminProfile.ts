import logger from "src/logger";
import { IAdmin } from "src/models";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword } from "src/helpers/encryption";
var crypto=require("crypto") 

const TAG = 'data_stores_mysql_lib_user'



//remove access recuriter -active

export async function updateStatusRecruiterActive(userId) {
    logger.info(`${TAG}.updateStatusRecruiter()`);
    try {
      let statusUpdateQuery = `UPDATE RECRUITER SET STATUS = true WHERE USER_ID= ?`;
      await executeQuery(statusUpdateQuery, QueryTypes.UPDATE, [userId]);
      return userId;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updateStatusRecruiter()`, error);
      throw error;
    }
  }


//remove access recuriter -deactive

export async function updateStatusRecruiterDeactive(userId) {
    logger.info(`${TAG}.updateStatusRecruiter()`);
    try {
      let statusUpdateQuery = `UPDATE RECRUITER SET STATUS = false WHERE USER_ID= ?`;
      await executeQuery(statusUpdateQuery, QueryTypes.UPDATE, [userId]);
      return userId;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updateStatusRecruiter()`, error);
      throw error;
    }
  }
    






  //remove access mentor

// export async function updateStatusMentor(user) {
//     logger.info(`${TAG}.saveUser()`);
//     try { 
//       let statusUpdateQuery = `UPDATE myproject_db.recruiter SET STATUS = true WHERE USER_ID = :userId;`;
//       await executeQuery(statusUpdateQuery, QueryTypes.UPDATE, {
//         user
//       });
//       return user;
  
//     } catch (error) {
//       logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
//       throw error;
//     }
//   }


  //remove access college

// export async function updateStatusCollege(user) {
//     logger.info(`${TAG}.saveUser()`);
//     try { 
//       let statusUpdateQuery = `UPDATE myproject_db.recruiter SET STATUS = true WHERE USER_ID = :userId;`;
//       await executeQuery(statusUpdateQuery, QueryTypes.UPDATE, {
//         user
//       });
//       return user;
  
//     } catch (error) {
//       logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
//       throw error;
//     }
//   }


