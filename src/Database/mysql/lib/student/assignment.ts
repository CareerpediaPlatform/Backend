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


  export async function postThreadreply(reply:any,threadId:any,uid: any) {
    logger.info(`${TAG}.posthtreadreply()`);

    try {
        const response=[]
      const insertQuery =`INSERT INTO thread_reply (THREAD_ID,Uid,REPLY, REPLYTO) 
      VALUES (:threadId, :uid, :reply, :replyto)`
  
      for (const data of reply) {
   
            const res=await executeQuery(insertQuery, QueryTypes.INSERT, {
                ...data,uid:uid.uid,threadId:threadId.threadID
              });
              response.push(res)    
      } 
      return {...response};
  
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.posthtreadreply()`, error);
      throw error;
    }
  }

  export async function getAllThreadsCourse(courseId){
    try {
      logger.info(`${TAG}.getAllThreadsCourse() ==>`,courseId);
    
      const query = `SELECT c.thumbnail,c.title,'part',(
        SELECT JSON_ARRAYAGG(
                           JSON_OBJECT(
                           'part', cp.partTitle,'threads',(
                            SELECT JSON_ARRAYAGG(
                           JSON_OBJECT(
                           'title',st.TITLE,
                           'description',st.DESCRIPTION,
                           'reply',(
                           SELECT JSON_ARRAYAGG(
                           JSON_OBJECT(
                            'REPLY', tr.REPLY
                           ))FROM thread_reply tr WHERE TR.THREAD_ID=ST.THREAD_ID
                           ))
                           ) FROM student_thread st WHERE ST.PART_ID=cp.part_id
                           ) 
                           )
                       )  FROM Courses_Parts cp where c.course_id = cp.course_id 
       ) AS part FROM courses c WHERE course_id=:courseId`
      const Thread = await executeQuery(query,QueryTypes.SELECT,{courseId:courseId})
      return Thread
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllThreadsCourse()`, error);
      throw error;
    }
  }

  export async function getAllThreadsPart(partId){
    try {
      logger.info(`${TAG}.getAllThreadsPart() ==>`,partId);
    
      const query = `SELECT st.TITLE,st.DESCRIPTION,(
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                             'reply', tr.REPLY
            )
        ) FROM thread_reply tr WHERE TR.THREAD_ID=ST.THREAD_ID
        )AS replay FROM student_thread st WHERE ST.PART_ID=:partId;
  `
      const Thread = await executeQuery(query,QueryTypes.SELECT,{partId:partId})
      return Thread
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllThreadsPart()`, error);
      throw error;
    }
  }

