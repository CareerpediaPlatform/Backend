import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";

const TAG = 'data_stores_mysql_lib_student_assignment';



export async function uploadAssignment(fileDetails:any,uid: any,partId: any): Promise<any> {
    logger.info(`${TAG}.uploadAssignment()`)
    try {
  console.log("****************************")
  console.log(partId)
    const data = {
          uid: uid,
        assignment: fileDetails.fileUrl,
        filePath: fileDetails.filePath,
        partId: partId.partId 
      };
      console.log(data)
      const InsertQuery = `INSERT INTO ASSIGNMENT (UID,  ASSIGNMENT, PART_ID)
      VALUES(:uid, :assignment, :partId)`
  
      const assignmentdata = await executeQuery(InsertQuery, QueryTypes.INSERT, {
        ...data
      })
      return assignmentdata
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.uploadAssignment()`, error)
      throw error
    }
  }
  export async function getAllAssignments(partId: any,uid: any){
    try {
      logger.info(`${TAG}.getAllAssignments() ==>`,uid);
      const checkQuery = 'SELECT * FROM ASSIGNMENT WHERE UID= :uid and PART_ID= :partId';
      const getAllAssignments= await executeQuery(checkQuery, QueryTypes.SELECT,{
        uid,partId:partId.partId
      });
    
      return getAllAssignments
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllAssignments()`, error);
      throw error;
    }
  }

  export async function uploadNote(student: any,uid:any): Promise<any> {
    logger.info(`${TAG}.uploadNote()`)
    try {
  
    const data = {
        uid: uid,
        note:student.note
      };
      console.log(data)
      const InsertQuery = `INSERT INTO NOTE (UID,  NOTE)
      VALUES(:uid, :note)`
  
      const [notedata] = await executeQuery(InsertQuery, QueryTypes.INSERT, {
        ...data
      })
      return notedata
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.uploadNote()`, error)
      throw error
    }
  }
  export async function getAllNotes(uid: any){
    try {
      logger.info(`${TAG}.getAllNotes() ==>`,uid);
   
      const checkQuery = 'SELECT * FROM NOTE WHERE UID= :uid';
      const getAllNotes= await executeQuery(checkQuery, QueryTypes.SELECT,{
        uid
      });
    
      return getAllNotes
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllNotes()`, error);
      throw error;
    }
  }

  export async function uploadThread(thread: any,uid:any, partId: any): Promise<any> {
    logger.info(`${TAG}.uploadThread()`)
    try {
  
    const data = {
        uid: uid,
        title: thread.title,
        description: thread.description,
        partId: partId.partId
      };
      console.log(data)
      const InsertQuery = `INSERT INTO STUDENT_THREAD (UID,  TITLE, DESCRIPTION, PART_ID)
      VALUES(:uid, :title, :description, :partId)`
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
  export async function getSingleThread(partId: any,threadId: any,uid: any){

    try {
      logger.info(`${TAG}.getSingleThread() ==>`,partId,threadId,uid);
      const query = `SELECT st.TITLE,st.DESCRIPTION,(
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT( 'reply', tr.REPLY  )
        ) FROM thread_reply tr WHERE TR.THREAD_ID=ST.THREAD_ID)AS replay FROM student_thread st WHERE ST.UID= :uid AND ST.THREAD_ID= :THREAD_ID AND PART_ID= :partId`
      const Thread = await executeQuery(query,QueryTypes.SELECT,{ partId:partId.partId,THREAD_ID:threadId.threadID,uid})
      return Thread
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getSingleThread()`, error);
      throw error;
    }
  }

  