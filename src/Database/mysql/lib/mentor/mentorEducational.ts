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
        const educationDetailsQuery = `INSERT INTO  MENTOR_EDUACTION_DETAILS
        ( UID,DEGREE, DEPT_BRANCH, START_YEAR,END_YEAR)
         values( :uid,:degree ,:deptBranch, :startYear,:endYear)`;
         
      const updateEducationDetailQuery = `UPDATE MENTOR_EDUACTION_DETAILS SET
    DEGREE = :degree, DEPT_BRANCH = :deptBranch, START_YEAR = :startYear, END_YEAR = :endYear WHERE USER_ID = :id`;
      
    let items:any = Object.values(user.data)
      for (const data of items) {
     
        console.log(data)
        if(data.id){
            const res=await executeQuery(updateEducationDetailQuery, QueryTypes.UPDATE, {
                ...data
              });
              response.push(res)
        }else{
            const res=await executeQuery(educationDetailsQuery, QueryTypes.INSERT, {
                ...data,uid:user.uid
              });
              response.push(res)
        }
      }
    return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.saveEducationDetails()`, error);
      throw error;
    }
  }


  export async function deleteEducationDetails(uid) {
    try {
      logger.info(`${TAG}.deleteEducationDetails() ==>`, uid);
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
//sigle object of education details
  export async function postEducationDetails(user) {
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    console.log(user)
    logger.info(`${TAG}.postEducationDetails()`);
    try {
       
      const insertQuery =`INSERT INTO  MENTOR_EDUACTION_DETAILS
      ( UID,DEGREE, DEPT_BRANCH, PERCENTAGE, START_YEAR,END_YEAR)
       values( :uid,:degree ,:deptBranch, :percentage, :startYear, :endYear)`
      let [profile]=await executeQuery(insertQuery, QueryTypes.INSERT, {
        ...user});
    
      return user;
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updateEducationDetails()`, error);
      throw error;
    }
  }

  export async function checkId(id){
    console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGggggg")
    console.log(id)
    logger.info(`${TAG}. checkId()`);
    try{
      const checkQuery=`SELECT * FROM MENTOR_EDUACTION_DETAILS WHERE USER_ID=:id`
      const [userId]=await executeQuery(checkQuery, QueryTypes.SELECT,{id})
      console.log(userId)
      return userId
    }
    catch(error){
      logger.error(`ERROR occurred in ${TAG}.checId()`, error);
      throw error;
    }
  }
  export async function updateEducationDetails(user) {
    logger.info(`${TAG}.updateEducationDetails()`);
    try {
       console.log("hsgdjASHCJahsjcASC")
       console.log(user)
      const updateQuery =`UPDATE MENTOR_EDUACTION_DETAILS SET
      DEGREE = :degree, DEPT_BRANCH = :deptBranch, PERCENTAGE= :percentage, START_YEAR = :startYear, END_YEAR = :endYear WHERE USER_ID = :userId`
      let [profile]=await executeQuery(updateQuery, QueryTypes.UPDATE, {
        ...user});
    
      return profile;
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.updateEducationDetails()`, error);
      throw error;
    }
  }

  export async function deleteEducation(user) {
    logger.info(`${TAG}.deleteEducation()`);
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    console.log(user)
    console.log(user.id)
    try {
       
      const insertQuery =`DELETE FROM MENTOR_EDUACTION_DETAILS WHERE USER_ID = :userId`
      let userId=await executeQuery(insertQuery, QueryTypes.DELETE, {
        userId:user.userId});
    
      return userId;
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.deleteEducation()`, error);
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
  

