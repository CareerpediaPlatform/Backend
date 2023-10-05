import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";

const TAG = 'data_stores_mysql_lib_mentor_lms';

export async function getAllAssignments(partId: any, ){
    try {
      logger.info(`${TAG}.getAllAssignments() ==>`,partId);
      const checkQuery = 'SELECT * FROM ASSIGNMENT WHERE PART_ID= :partId';
      const getAllAssignments= await executeQuery(checkQuery, QueryTypes.SELECT,{
      partId: partId.partId
      });
    
      return getAllAssignments
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllAssignments()`, error);
      throw error;
    }
  }

  export async function giveRemark(remark: any,assignmentId: any, uid:any){
    try{
      logger.info(`${TAG}.getAllAssignments() ==>`,assignmentId);
      const query = `UPDATE ASSIGNMENT SET REMARKS= :remark,MENTOR_ID= :uid WHERE ASSIGNMENT_ID= :assignmentId`;
      const Remark = await executeQuery(query, QueryTypes.UPDATE,{...remark,assignmentId,uid});
      return Remark
    }
    catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllAssignments()`, error);
      throw error;
    }
  }
  export async function checkAssignmentId(id: any){
    try{
      logger.info(`${TAG}.checkAssignmentId() ==>`,id);
      const query = `SELECT * FROM ASSIGNMENT WHERE ASSIGNMENT_ID= :id`;
      const result = await executeQuery(query, QueryTypes.SELECT,{id})
      return result
    }
    catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllAssignments()`, error);
      throw error;
    }
  }
  export async function postThreadreply(reply:any,threadId:any,uid: any,partId: any) {
    logger.info(`${TAG}.posthtreadreply()`);

    try {
        const response=[]
      const insertQuery =`INSERT INTO thread_reply (THREAD_ID,Uid,REPLY, REPLYTO, PART_ID) 
      VALUES (:threadId, :uid, :reply, :replyto, :partId)`
  
      for (const data of reply) {
   
            const res=await executeQuery(insertQuery, QueryTypes.INSERT, {
                ...data,uid,threadId:threadId.threadID,partId:partId.partId
              });
              response.push(res)    
      } 
      return {...response};
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.posthtreadreply()`, error);
      throw error;
    }
  }