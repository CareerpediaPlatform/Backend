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

  export async function postThreadreply(reply, uid, partUid, threadId) {
    logger.info(`${TAG}.posthtreadreply()`);
  
    try {
      const response = [];
      const insertQuery = `INSERT INTO THREAD_REPLY (THREAD_ID, UID, PART_UID, REPLY, REPLYTO) 
        VALUES (:threadId, :uid, :partUid, :reply, :replyto)`;
  
      for (const data of reply) {
        const postData = {
          threadId: threadId.threadId,
          uid: uid,
          reply: data.reply,     
          replyto: data.replyto, 
          partUid: partUid.partUid,
        };
  
        const res = await executeQuery(insertQuery, QueryTypes.INSERT, postData);
        response.push(res);
      }
  
      return { ...response };
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.posthtreadreply()`, error);
      throw error;
    }
  }
  
  export async function getSingleRemark(uid: any,remarkId: any){
    console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
    console.log(remarkId)
    try {
      logger.info(`${TAG}.getSingleRemark() ==>`,remarkId,uid);
      const checkQuery = 'SELECT * FROM ASSIGNMENT WHERE MENTOR_ID= :uid AND REMARKS= :remarkId';
      const getAllAssignments= await executeQuery(checkQuery, QueryTypes.SELECT,{
      remarkId:remarkId.remark_id,uid
      });
    
      return getAllAssignments
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getSingleRemark()`, error);
      throw error;
    }
  }