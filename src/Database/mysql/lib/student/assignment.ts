import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto");

const TAG = 'data_stores_mysql_lib_student_assignment';

export async function uploadAssignment(fileDetails:any): Promise<any> {
    logger.info(`${TAG}.uploadAssignment()`)
    try {
    const data = {
        uid: crypto.randomUUID(),
        assignment: fileDetails.fileUrl,
        filePath:fileDetails.filePath,
      };
      console.log(data)
      const InsertQuery = `INSERT INTO ASSIGNMENT (UID,  ASSIGNMENT)
      VALUES(:uid, :assignment)`
  
      const [assignmentdata] = await executeQuery(InsertQuery, QueryTypes.INSERT, {
        ...data
      })
      return assignmentdata
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.uploadAssignment()`, error)
      throw error
    }
  }
  
  export async function getAllAssignments(user){
    try {
      logger.info(`${TAG}.getAllAssignments() ==>`,user);
      const checkQuery = 'SELECT * FROM ASSIGNMENT';
      const getAllAssignments= await executeQuery(checkQuery, QueryTypes.SELECT,{
        user
      });
    
      return getAllAssignments
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllAssignments()`, error);
      throw error;
    }
  }

  export async function uploadNote(student: any): Promise<any> {
    logger.info(`${TAG}.uploadNote()`)
    try {
  
    const data = {
        uid: crypto.randomUUID(),
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

  export async function getAllNotes(user){
    try {
      logger.info(`${TAG}.getAllNotes() ==>`,user);
   
      const checkQuery = 'SELECT * FROM NOTE';
      const getAllNotes= await executeQuery(checkQuery, QueryTypes.SELECT,{
        user
      });
    
      return getAllNotes
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllNotes()`, error);
      throw error;
    }
  }

  export async function uploadThread(thread: any,): Promise<any> {
    logger.info(`${TAG}.uploadThread()`)
    try {
  
    const data = {
        uid: crypto.randomUUID(),
        title: thread.title,
        description: thread.description
      };
      console.log(data)
      const InsertQuery = `INSERT INTO THREAD (UID,  TITLE, DESCRIPTION)
      VALUES(:uid, :title, :description)`

  
      const [threaddata] = await executeQuery(InsertQuery, QueryTypes.INSERT, {
        ...data
      })
      return threaddata
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.uploadThread()`, error)
      throw error
    }
  }
 //************************* Get All Threads based student uid************ */
  export async function getAllThreads(threadId,uid){

    try {
      logger.info(`${TAG}.getAllThreads() ==>`,threadId,uid);
    
    
      const query = `SELECT 
      CONCAT(sp.firstName, ' ', sp.lastName) AS NAME, 
      th.title, 
      th.description, 
      th.posted_at, 
      'replies', 
      (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT('reply', tr.reply)
          ) 
          FROM STUDENT_PERSONAL_DETAILS sp 
          INNER JOIN THREAD th ON sp.user_uid = th.Uid 
          LEFT JOIN thread_reply tr ON th.THREAD_ID = tr.THREAD_ID AND sp.user_uid = tr.Uid 
          WHERE sp.user_uid = :uid
      ) AS replies
  FROM 
      STUDENT_PERSONAL_DETAILS sp 
  INNER JOIN 
      THREAD th ON sp.user_uid = th.Uid 
  WHERE 
      sp.user_uid = :uid;
  `
      const Thread = await executeQuery(query,QueryTypes.SELECT,{ THREAD_ID:threadId.threadID,uid:uid.uid})
      return Thread
    
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getAllThreads()`, error);
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
