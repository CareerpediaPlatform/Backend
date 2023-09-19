import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto")

const TAG = 'data_stores_mysql_lib_mentor_education_details'


export async function saveEducationDetails(user) {
    logger.info(`${TAG}.saveEducationDetails()`);
    console.log(user)
    try {
        const response=[]
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        const educationDetailsQuery = `INSERT INTO  MENTOR_EDUCATION_DETAILS
        (USER_ID, UID,DEGREE, DEPT_BRANCH, START_YEAR,END_YEAR)
         values(:userId, :uid,:degree ,:dept_branch, :start_year,:end_year)`;
         
      const updateEducationDetailQuery = `UPDATE MENTOR_EDUCATION_DETAILS SET
    DEGREE = :degree, DEPT_BRANCH = :dept_branch, START_YEAR = :start_year, END_YEAR = :end_year WHERE id = :id`;

      for (const data of user.data) {
        let uid=crypto.randomUUID()
        console.log(data)
        if(data.id){
            const res=await executeQuery(updateEducationDetailQuery, QueryTypes.UPDATE, {
                ...data
              });
              response.push(res)
        }else{
            const res=await executeQuery(educationDetailsQuery, QueryTypes.INSERT, {
                ...data,uid,userId:user.id
              });
              response.push(res)
        }
      }
    return {...response};
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.saveEducationDetails()`, error);
      throw error;
    }
  }


  export async function deleteRecruiter(uid) {
    try {
      logger.info(`${TAG}.deleteRecruiter() ==>`, uid);
      console.log(" **************************llib*************")
      console.log(uid)
      const response=[]
      const deleteQueries = [
        'DELETE FROM MENTOR_PERSONAL_DETAILS WHERE UID = :uid',
      ];
      for (const query of deleteQueries) {
        const res=await executeQuery(query, QueryTypes.DELETE, {
          uid
        });
        response.push(res)
      }
      return {message:"recruiter deleted",response}; 
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.deleteRecruiter()`, error);
      throw error;
    }
  }


















// export async function saveEducationDetail(user) {
//     logger.info(`${TAG}.saveEducationDetails()`);
//     console.log(user)
//     try {
//         const response=[]
//         const educationDetailsQuery = `INSERT INTO  MENTOR_EDUCATION_DETAILS
//         (USER_ID, UID,DEGREE, DEPT_BRANCH, START_YEAR,END_YEAR)
//          values(:userId, :uid,:degree ,:dept_branch, :start_year,:end_year)`;

//     //   const updateEducationDetailQuery = `UPDATE MENTOR_EDUCATION_DETAILS SET
//     // DEGREE = :degree, DEPT_BRANCH = :dept_branch, START_YEAR = :start_year, END_YEAR = :end_year WHERE id = :id`;
 
    
//       for (const data of user.data) {
//         console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
//         let uid=crypto.randomUUID()
//         console.log(data)
//         const res=await executeQuery(educationDetailsQuery, QueryTypes.INSERT, {
//             ...data,uid
//           });
//           response.push(res)
//       }
//     return {...response};
//     } catch (error) {
//       logger.error(`ERROR occurred in ${TAG}.saveEducationDetails()`, error);
//       throw error;
//     }
//   }
  

