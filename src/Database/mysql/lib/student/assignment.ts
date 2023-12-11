import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";

const TAG = 'data_stores_mysql_lib_student_assignment';



export async function uploadAssignment(fileDetails:any,uid: any,partUid: any): Promise<any> {
    logger.info(`${TAG}.uploadAssignment()`)
    try {
    const data = {
        uid: uid,
        assignment: fileDetails.fileUrl,
        filePath: fileDetails.filePath,
        partUid: partUid.partUid 
      };
      const InsertQuery = `INSERT INTO STUDENT_ASSIGNMENT (UID, ASSIGNMENT, PART_UID)
      VALUES(:uid, :assignment, :partUid)`
  
      const assignmentdata = await executeQuery(InsertQuery, QueryTypes.INSERT, {
        ...data
      })
      return assignmentdata
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.uploadAssignment()`, error)
      throw error
    }
  }

  export async function getAllAssignments(partUid: any,uid: any){
    try {
      logger.info(`${TAG}.getAllAssignments() ==>`,uid);
      const checkQuery = 'SELECT * FROM STUDENT_ASSIGNMENT WHERE UID= :uid and PART_UID= :partUid';
      const getAllAssignments= await executeQuery(checkQuery, QueryTypes.SELECT,{
        uid,partUid:partUid.partUid
      });
    
      return getAllAssignments
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllAssignments()`, error);
      throw error;
    }
  }

  export async function uploadNote(partUid: any,uid:any,note:any): Promise<any> {
    logger.info(`${TAG}.uploadNote()`)
    try {
  
    const data = {
        uid: uid,
        note:note.note,
        partUid:partUid.partUid
      };
      console.log(data)
      const InsertQuery = `INSERT INTO STUDENT_NOTE (UID, NOTE, PART_UID)
      VALUES(:uid, :note, :partUid)`
  
      const [notedata] = await executeQuery(InsertQuery, QueryTypes.INSERT, {
        ...data
      })
      return data
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.uploadNote()`, error)
      throw error
    }
  }

  export async function getAllNotes(partUid: any,uid: any){
    try {
      logger.info(`${TAG}.getAllNotes() ==>`,partUid);
      console.log(partUid)
      const checkQuery = 'SELECT * FROM STUDENT_NOTE WHERE UID= :uid and PART_UID= :partUid';
      const getAllNotes= await executeQuery(checkQuery, QueryTypes.SELECT,{
        uid,partUid:partUid.partUid
      });
    
      return getAllNotes
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllNotes()`, error);
      throw error;
    }
  }

  export async function uploadThread(thread: any,uid:any, partUid: any): Promise<any> {
    logger.info(`${TAG}.uploadThread()`)
    try {
  
    const data = {
        uid: uid,
        title: thread.title,
        description: thread.description,
        partUid: partUid.partUid
      };
      console.log(data)
      const InsertQuery = `INSERT INTO STUDENT_THREAD (UID,  TITLE, DESCRIPTION, PART_UID)
      VALUES(:uid, :title, :description, :partUid)`
      const [threaddata] = await executeQuery(InsertQuery, QueryTypes.INSERT, {
        ...data
      })
      return threaddata
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.uploadThread()`, error)
      throw error
    }
  }
 //************************* Get Single ThreadId student uid************ */

  export async function getSingleThread(partUid: any,threadId: any,uid: any){

    try {
      console.log(partUid)
      console.log(threadId)
      logger.info(`${TAG}.getSingleThread() ==>`,partUid,threadId,uid);
      const query = `SELECT st.TITLE, st.DESCRIPTION, (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT('reply', tr.REPLY)
        ) FROM THREAD_REPLY tr WHERE tr.THREAD_ID = st.THREAD_ID
    ) AS replay FROM STUDENT_THREAD st WHERE st.UID = :uid AND st.THREAD_ID = :threadId AND st.PART_UID = :partUid;
    `
      const Thread = await executeQuery(query,QueryTypes.SELECT,{ partUid:partUid.partUid,THREAD_ID:threadId.threadId,uid})
      return Thread
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getSingleThread()`, error);
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
  

  export async function getAllThreadsCourse(courseUid){
    try {
      logger.info(`${TAG}.getAllThreadsCourse() ==>`,courseUid);
      
    //have to add thumbnail 
      const query = `SELECT c.TITLE, 'part', (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'part', cp.TITLE,
                'threads', (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'title', st.TITLE,
                            'description', st.DESCRIPTION,
                            'reply', (
                                SELECT JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'REPLY', tr.REPLY
                                    )
                                ) FROM THREAD_REPLY tr WHERE tr.THREAD_ID = st.THREAD_ID
                            )
                        )
                    ) FROM STUDENT_THREAD st WHERE st.PART_UID = cp.COURSE_UID
                )
            )
        ) FROM COURSE_OVERVIEW cp WHERE c.COURSE_UID = cp.COURSE_UID
    ) AS COURSE_PART FROM COURSE_OVERVIEW c WHERE c.COURSE_UID = :courseUid;
    `
      const Thread = await executeQuery(query,QueryTypes.SELECT,{courseUid:courseUid})
      return Thread
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllThreadsCourse()`, error);
      throw error;
    }
  }

  export async function getAllThreadsPart(partUid){
    try {
      logger.info(`${TAG}.getAllThreadsPart() ==>`,partUid);
      console.log(partUid)
    
      const query = `SELECT st.TITLE, st.DESCRIPTION,
      (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT('reply', tr.REPLY)
          ) 
          FROM THREAD_REPLY tr 
          WHERE tr.THREAD_ID = st.THREAD_ID
      ) AS replay 
  FROM STUDENT_THREAD st 
  WHERE st.PART_UID = :partUid;
  `
      const Thread = await executeQuery(query,QueryTypes.SELECT,{partUid:partUid.partUid})
      return {...Thread,partUid}
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllThreadsPart()`, error);
      throw error;
    }
  }

  export async function checkThreadId(threadId) {
    try {
      console.log(threadId)
      logger.info(`${TAG}.checkPartUid()  ==>`, threadId);
      let query = 'select * from STUDENT_THREAD where THREAD_ID=:threadId';
      const [userId] = await executeQuery(query, QueryTypes.SELECT, {
        threadId:threadId.threadId
      });
      return userId;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkPartUid()`, error); 
      throw error;
    }
  }
  