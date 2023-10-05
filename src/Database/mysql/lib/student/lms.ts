import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";


const TAG = 'data_stores_mysql_lib_user_lms'

export async function  getCourseOverview(courseId) {
    let id=courseId
      try {
        logger.info(`${TAG}.getCourseOverview()  ==>`);
  
    let query=`SELECT
    c.thumbnail AS thumbnail,
    c.video AS video,
    c.title AS title,
  MAX(c.description) AS description,
  MAX(c.mentor) AS mentor,
  MAX(c.id) AS id,
  MAX(c.type) AS type,
    GROUP_CONCAT(DISTINCT wyl.point) AS whatYouLearn,
  (
   select JSON_ARRAYAGG(
        JSON_OBJECT(
            'part', cp.partTitle,
            'description', cp.description,
            'modules', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'name', m.moduleName,
                        'desc', m.moduleDescription,
                         'lesson', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                     'name', l.lessonName,
                                    'points', l.lessonPoints,
                                    'duration', l.lessonDuration
                    )
                ) 
                FROM lesson AS l WHERE m.id = l.moduleId
            ),
                            'exercises', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                                     'name', e.exerciseName,
                            'points', e.exercisePoints
                    )
                ) 
                FROM Exercise AS e WHERE m.id = e.moduleId
            ),
                        'test', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                      'name', t.testName,
                            'points', t.testPoints
                    )
                ) 
                FROM Test AS t WHERE m.id = t.moduleId
            )
                    )
                ) 
                FROM Module AS m 
                WHERE cp.id = m.coursePartId
            )
        ) 
    ) FROM CoursePart cp where c.id = cp.courseId 
  )AS part
  FROM Course AS c 
  LEFT JOIN WhatYouLearn AS wyl ON c.id = wyl.courseId WHERE c.id=:id
  GROUP BY
    c.thumbnail,
    c.video,
    c.title,
    c.description,
    c.mentor,c.id,c.type;`
        const results= await executeQuery(query, QueryTypes.SELECT,{id:id});
          return results;
      } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getCourseOverview()`, error);
        throw error;
      }
    }
 
export async function  getCourses(courseType) {
      try {
        logger.info(`${TAG}.getCourses()  ==>`);
  
    let query=`SELECT * FROM COURSE WHERE TYPE=:type`
        const results= await executeQuery(query, QueryTypes.SELECT,{type:courseType});
          return results;
      } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getCourses()`, error);
        throw error;
      }
    }

    export async function  getMyCourses(list) {
      // let id=courseId
        try {
          logger.info(`${TAG}.getMyCourses()  ==>`);
          const userIDs = [...list];
          const query = 'SELECT * FROM course WHERE id IN (?)';
          const results= await executeQuery(query, QueryTypes.SELECT,[list]);
            return results;
        } catch (error) {
          logger.error(`ERROR occurred in ${TAG}.getMyCourses()`, error);
          throw error;
        }
      }

      export async function  getPartDetail() {
        // let id=courseId
          try {
            logger.info(`${TAG}.getPartDetail()  ==>`);
      
        let query=`   select
        'part', cp.partTitle,
        'description', cp.description,
        'modules', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'name', m.moduleName,
                    'desc', m.moduleDescription,
                     'exercises', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                                 'name', e.exerciseName,
                        'points', e.exercisePoints
                )
            ) 
            FROM Exercise AS e WHERE m.id = e.moduleId
        ),
                     'lesson', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                 'name', l.lessonName,
                                'points', l.lessonPoints,
                                'duration', l.lessonDuration
                )
            ) 
            FROM lesson AS l WHERE m.id = l.moduleId
        ),
                  'test', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                  'name', t.testName,
                        'points', t.testPoints
                )
            ) 
            FROM Test AS t WHERE m.id = t.moduleId
        )
                )
            ) 
            FROM Module AS m 
            WHERE cp.id = m.coursePartId
    ) AS module FROM CoursePart cp WHERE id = ? AND cp.courseId  = ?;`
            const results= await executeQuery(query, QueryTypes.SELECT,[1,1]);
              return results;
          } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.getPartDetail()`, error);
            throw error;
          }
        }
    
 
