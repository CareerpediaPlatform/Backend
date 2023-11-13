import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto") 
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
    // let id=courseId
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

    // student
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
    // student
  export async function  getMyCourse(courseId) {
      try {
        logger.info(`${TAG}.getMyCourse()  ==>`);
        const query = 'SELECT * FROM courses WHERE course_id=:courseId';
        const results= await executeQuery(query, QueryTypes.SELECT,{courseId:courseId});
          return results;
      } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getMyCourse()`, error);
        throw error;
      }
    }

export async function  getAllCourses() {
      try {
        logger.info(`${TAG}.getAllCourses()  ==>`);
        const userIDs = [2];
        const query = 'SELECT * FROM course';
        const results= await executeQuery(query, QueryTypes.SELECT,[userIDs]);
          return results;
      } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getAllCourses()`, error);
        throw error;
      }
    }

// course
export async function uploadCourse(fileDetails:any,course:any,type:any): Promise<any> {
  logger.info(`${TAG}.uploadVideoFile()`)
  try {

  const data = {
    courseUID: crypto.randomUUID(),
      // thumbnail: imageDetails.fileUrl,
      video: fileDetails.fileUrl,
      title: course.title,
      description: course.description,
      mentor: course.mentor,
      lesson: course.lesson,
      exercises: course.exercises,
      test: course.test,
      price: course.price,
      discountprice: course.discountprice,
      filePath:fileDetails.filePath,
      learn: course.learn
    };
    console.log(data)
    console.log(data.courseUID)
    const videoInsertQuery = `INSERT INTO COURSE_OVERVIEW (COURSE_UID, VIDEO, TITLE, DESCRIPTION, MENTOR, LESSON, EXERCISES, TEST, PRICE, DISCOUNT, TYPE )
    VALUES(:courseUID,:video, :title, :description, :mentor, :lesson, :exercises, :test, :price, :discountprice, :type )`
    const response=[]
    
    const learnQuery = `INSERT INTO  WHAT_YOU_LEARN
    ( COURSE_UID,LEARN)
     values( :courseUID,:learn )`;
     let array=JSON.parse(course.learn)
     for( const singleData of array){

      const res=await executeQuery( learnQuery, QueryTypes.INSERT,{ learn:singleData,courseUID:data.courseUID})
      response.push(res)
     }
    const [coursedata] = await executeQuery(videoInsertQuery, QueryTypes.INSERT, {
      ...data,...type
    })
    return {response,coursedata}
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveFile()`, error)
    throw error
  }
}

export async function checkCourseIdExist(courseUID: any){
  console.log(courseUID)
  try {
    logger.info(`${TAG}.checkCourseIdExist() ==>`, courseUID);
    const checkQuery = 'SELECT * FROM `COURSE_OVERVIEW` WHERE COURSE_UID= :courseUID';
    const [basic] = await executeQuery(checkQuery, QueryTypes.SELECT, {courseUID});
    return basic// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkCourseIdExist()`, error);
    throw error;
  }
}

export async function getuploadCourse(courseUID){
  try {
    logger.info(`${TAG}.getuploadCourse() ==>`, courseUID);
    const checkQuery = 'SELECT * FROM `COURSE_OVERVIEW` WHERE COURSE_UID= :courseUID';
    const getQuery = 'SELECT * FROM `WHAT_YOU_LEARN` WHERE COURSE_UID= :courseUID';
    const query= ''
    const [basicCourse] = await executeQuery(checkQuery, QueryTypes.SELECT, {courseUID});
    const [basicCourseLearn] = await executeQuery(getQuery, QueryTypes.SELECT, {courseUID});
    return {basicCourse,basicCourseLearn}
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}

export async function updateuploadCourse(fileDetails: any,imageDetails: any,courseUID: any, course:any){
  try {
    logger.info(`${TAG}.getuploadCourse() ==>`, courseUID);
    const data = {
      thumbnail: imageDetails.fileUrl,
      video: fileDetails.fileUrl,
      title: course.title,
      description: course.description,
      mentor: course.mentor,
      lesson: course.lesson,
      exercises: course.exercises,
      test: course.test,
      price: course.price,
      discountprice: course.discountprice,
      learn: course.learn
    }
    console.log(course)

    console.log(data)
    const updateQuery = `UPDATE COURSE_OVERVIEW SET THUMBNAIL = :thumbnail, VIDEO= :video, TITLE= :title, DESCRIPTION=:description, MENTOR= :mentor, LESSON= :lesson, EXERCISES= :exercises, TEST= :test, PRICE= :price, DISCOUNTPRICE= :discountprice WHERE COURSE_UID=:courseUID`;

    const [basicCourse] = await executeQuery(updateQuery, QueryTypes.UPDATE, {...data,courseUID});
    const response=[]
    
    const learnQuery = `UPDATE WHAT_YOU_LEARN SET LEARN= :learn WHERE COURSE_UID= :courseUID`;
     let array=JSON.parse(course.learn)
     for( const singleData of array){

      const res=await executeQuery( learnQuery, QueryTypes.UPDATE,{ learn:singleData,courseUID})
      response.push(res)
     }
    return {basicCourse,response}
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateuploadCourse()`, error);
    throw error;
  }
}


export async function deleteuploadCourse(courseUID){
  try {
    logger.info(`${TAG}.deleteuploadCourse() ==>`, courseUID);
    const checkQuery = 'DELETE  FROM `COURSE_OVERVIEW` WHERE COURSE_UID=:courseUID';
    const basicCourse = await executeQuery(checkQuery, QueryTypes.DELETE, {courseUID});
    return basicCourse
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteuploadCourse()`, error);
    throw error;
  }
}

// courses
export async function coursesPost(user,coursetype) {
  const course_uid=crypto.randomUUID()
  logger.info(`${TAG}.coursesPost()`);
  try {
    const courseInsertQuery = `INSERT INTO COURSE_OVERVIEW(COURSE_UID, TITLE, DESCRIPTION, PRICE, DISCOUNT, THUMBNAIL, VIDEO, MENTOR, LESSON, EXERCISES,TEST,TYPE) 
VALUES (:course_uid,:title, :description, :price, :discountPrice,:thumbnail,:video, :mentor, :lesson, :exercises, :test,:type)`;
    let [course]=await executeQuery(courseInsertQuery, QueryTypes.INSERT, {
      ...user,coursetype,course_uid:course_uid});
    return course;


  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.coursesPost()`, error);
    throw error;
  }
}

export async function checkCoureUid(coureUid) {
  try {
    logger.info(`${TAG}.checkCoureUid()  ==>`, coureUid);

    let query = 'select * from COURSE_PART where COURSE_UID=:coureUid';
    const [userId] = await executeQuery(query, QueryTypes.SELECT, {
      coureUid
    });
    return userId;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkCoureUid()`, error); 
    throw error;
  }
}

export async function coursePartPost(user) {
  const partUid=crypto.randomUUID()
  logger.info(`${TAG}.coursePartPost()`);
  console.log(user)
  console.log(user.coureUid)
  
  try {
    const coursePartInsertQuery = `
    INSERT INTO COURSE_PART 
    (COURSE_UID,PART_UID,PART_TITLE, DESCRIPTION,LESSONS,DURATION,EXERCISES,TESTS) 
    VALUES (:courseUid, :partUid, :partTitle, :description, :lessons, :duration, :exercises, :tests)`;

    let [coursePart]=await executeQuery(coursePartInsertQuery, QueryTypes.INSERT, {
        ...user,partUid:partUid});
    return coursePart;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.coursePartPost()`, error);
    throw error;
  }
}

export async function getPart(partUid) {
  try {
    logger.info(`${TAG}.getPart()  ==>`, partUid);

    let query ="select * from COURSE_PART where PART_UID = :partUid";
    const [personalDetails] = await executeQuery(query, QueryTypes.SELECT, {
      partUid
    });
    return personalDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.getPart()`,
      error
    );
    throw error;
  }
}

export async function modulesPost(user) {
  const moduleUid=crypto.randomUUID()
  logger.info(`${TAG}.modulesPost()`);
  try {
    const coursePartInsertQuery = `
    INSERT INTO COURSE_MODULE 
    (PART_UID,MODULE_UID,MODULE_NAME,DESCRIPTION,MENTOR,LESSONS,EXERCISES,TESTS) 
    VALUES (:partUid, :moduleUid,:moduleName,:description,:mentor, :lesson,:exercises,:tests)`;

    let [coursePart]=await executeQuery(coursePartInsertQuery, QueryTypes.INSERT, {
        ...user,moduleUid:moduleUid});
    return coursePart;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.modulesPost()`, error);
    throw error;
  }
}

export async function checkPartUid(partUid) {
  try {
    logger.info(`${TAG}.checkPartUid()  ==>`, partUid);

    let query = 'select * from COURSE_MODULE where PART_UID=:partUid';
    const [userId] = await executeQuery(query, QueryTypes.SELECT, {
      partUid
    });
    return userId;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkPartUid()`, error); 
    throw error;
  }
}

export async function getModule(moduleUid) {
  try {
    logger.info(`${TAG}.getModule()  ==>`, moduleUid);

    let query ="select * from COURSE_MODULE where MODULE_UID = :moduleUid";
    const [personalDetails] = await executeQuery(query, QueryTypes.SELECT, {
      moduleUid
    });
    return personalDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.getModule()`,
      error
    );
    throw error;
  }
}

//lessonPost

export async function lessonPost(user) {
  
  logger.info(`${TAG}.lessonPost()`);
  const lessonUid=crypto.randomUUID()
  console.log(lessonUid)
  try {
    const lessonPartInsertQuery = `
    INSERT INTO LESSON_MODULES 
    (LESSON_UID, MODULE_UID, LESSON_NAME, POINTS, VIDEO, THUMBNAIL, ATTACHMENTS) 
    VALUES (:lessonUid, :moduleUid, :lessonName, :points, :video, :thumbnail, :attachments)`;

    let [testPart]=await executeQuery(lessonPartInsertQuery, QueryTypes.INSERT, {
      ...user,lessonUid:lessonUid});
  return testPart;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.lessonPost()`, error);
    throw error;
  }
}

export async function checkModuleUid(moduleUid) {
  try {
    logger.info(`${TAG}.checkModuleUid()  ==>`, moduleUid);

    let query = `
      SELECT MODULE_UID FROM LESSON_MODULES WHERE MODULE_UID = :moduleUid
      UNION ALL
      SELECT MODULE_UID FROM TEST_MODULES WHERE MODULE_UID = :moduleUid
      UNION ALL
      SELECT MODULE_UID FROM EXERCISE_MODULES WHERE MODULE_UID = :moduleUid
    `;
    const [result] = await executeQuery(query, QueryTypes.SELECT, {
      moduleUid
    });

    return result;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkModuleUid()`, error);
    throw error;
  }
}

export async function getLessonPost(lessonUid) {
  try {
    logger.info(`${TAG}.getLessonPost()  ==>`,lessonUid);

    let query ="select * from LESSON_MODULES where LESSON_UID = :lessonUid";
    const [lessonDetails] = await executeQuery(query, QueryTypes.SELECT, {
      lessonUid
    });
    return lessonDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.getLessonPost()`,
      error
    );
    throw error;
  }
}

export async function deleteLessonPost(lessonUid) {
  try {
    logger.info(`${TAG}.getLessonPost()  ==>`,lessonUid);

    let query = "DELETE FROM LESSON_MODULES WHERE LESSON_UID = :lessonUid";
    const lessonDetails = await executeQuery(query, QueryTypes.DELETE, {
      lessonUid
    });
    return lessonDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.getLessonPost()`,
      error
    );
    throw error;
  }
}

// testPost
export async function testPost(user) {
  const testUid=crypto.randomUUID()
  logger.info(`${TAG}.testPost()`);
  try {
    const testInsertQuery = `
    INSERT INTO TEST_MODULES 
    (TEST_UID,MODULE_UID,TEST_TYPE, MARKS,POINTS,TEST_NAME) 
    VALUES (:testUid, :moduleUid, :testType, :marks ,:points,:testName)`;

    let [testPart]=await executeQuery(testInsertQuery, QueryTypes.INSERT, {
        ...user,testUid:testUid});
    return testPart;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.testPost()`, error);
    throw error;
  }
}

export async function getTestPost(testUid) {
  try {
    logger.info(`${TAG}.getTestPost()  ==>`,testUid);

    let query ="select * from TEST_MODULES where TEST_UID = :testUid";
    const [testDetails] = await executeQuery(query, QueryTypes.SELECT, {
      testUid
    });
    return testDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.getTestPost()`,
      error
    );
    throw error;
  }
}

export async function deleteTestPost(testUid) {
  try {
    logger.info(`${TAG}.deleteTestPost()  ==>`,testUid);

    let query = "DELETE FROM TEST_MODULES WHERE TEST_UID = :testUid";
    const testDetails = await executeQuery(query, QueryTypes.DELETE, {
      testUid
    });
    return testDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.deleteTestPost()`,
      error
    );
    throw error;
  }
}

// exercisesPost
export async function exercisesPost(user) {
  const exerciseUid=crypto.randomUUID()
  logger.info(`${TAG}.exercisesPost()`);
  try {
    const exerciseInsertQuery = `
    INSERT INTO EXERCISE_MODULES 
    (EXERCISE_UID,MODULE_UID,QUESTION_NAME, QUESTION_TYPE,MARKS,POINTS,OPTION1,OPTION2,OPTION3,OPTION4,ANSWER) 
    VALUES (:exerciseUid, :moduleUid, :questionName, :questionType,:marks,:points,:option1,:option2,:option3,:option4,:answer)`;

    let [exercisePart]=await executeQuery(exerciseInsertQuery, QueryTypes.INSERT, {
        ...user,exerciseUid:exerciseUid});
    return exercisePart;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.exercisesPost()`, error);
    throw error;
  }
}

export async function getExercisePost(exerciseUid) {
  try {
    logger.info(`${TAG}.getTestPost()  ==>`,exerciseUid);

    let query ="select * from EXERCISE_MODULES where EXERCISE_UID = :exerciseUid";
    const [exerciseDetails] = await executeQuery(query, QueryTypes.SELECT, {
      exerciseUid
    });
    return exerciseDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.getTestPost()`,
      error
    );
    throw error;
  }
}

export async function deleteExercisePost(exerciseUid) {
  try {
    logger.info(`${TAG}.deleteExercisePost()  ==>`,exerciseUid);

    let query = "DELETE FROM EXERCISE_MODULES WHERE EXERCISE_UID = :exerciseUid";
    const [exerciseDetails] = await executeQuery(query, QueryTypes.DELETE, {
      exerciseUid
    });
    return exerciseDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.deleteExercisePost()`,
      error
    );
    throw error;
  }
}

//UPDATE QUERY

export async function updateCoursePartPost(user,part_id) {
  logger.info(`${TAG}.updateCoursePartPost()`);
  try {
    
    let updateCoursePartPostQuery = `UPDATE courses_parts SET
    partTitle= :partTitle, description = :description, lessons = :lessons, duration = :duration, exercises =:exercises, tests = :tests WHERE part_id = :part_id`;
  const updateCoursePartPosts= await executeQuery(
      updateCoursePartPostQuery,
      QueryTypes.UPDATE,{...user,part_id:part_id});
    
    return updateCoursePartPosts;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateCoursePartPost()`, error);
    throw error;
  }

}

export async function updateModulesPost(user,module_id) {
  logger.info(`${TAG}.updateModulesPost()`);
  try {
    let updateModulesPostQuery = `UPDATE modules SET
    module_name= :module_name, description = :description, lesson = :lesson, test = :test, exercises =:exercises, hours = :hours WHERE module_id = :module_id`;
  const updateModulesPort= await executeQuery(
    updateModulesPostQuery,
      QueryTypes.UPDATE,{...user,module_id}
    );
    return updateModulesPort;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateModulesPost()`, error);
    throw error;
  }
}

export async function checkLearnId(learnId: any){
  try {
    logger.info(`${TAG}.checkLearnId()  ==>`, learnId);

    let query = 'select * from whatyoulearn where ID= :learnId';
    const [learnID] = await executeQuery(query, QueryTypes.SELECT, {
      learnId:learnId.id
    });
    console.log("learn_id",[learnID])
    return learnID;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkLearnId()`, error); 

    throw error;
  }
}


export async function updateLessonPost(user,lesson_id) {
  logger.info(`${TAG}.updateLessonPost()`);
  try {
    let updateLessonPostQuery = `UPDATE lesson SET
    LESSON_NAME= :lesson_name, POINTS = :points, VIDEO = :video, THUMBNAIL = :thumbnail, ATTACHMENTS =:attachments WHERE LESSON_ID = :lesson_id`;
  const updateLessonPost= await executeQuery(
    updateLessonPostQuery,
      QueryTypes.UPDATE,{...user,lesson_id}
    );
    return updateLessonPost;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateLessonPost()`, error);
    throw error;
  }
}

export async function updateTestPost(user,test_id) {
  logger.info(`${TAG}.updateTestPost()`);
  try {
    let updateTestPostQuery = `UPDATE test SET
    TEST_TYPE= :test_type, MARKS = :marks, POINTS = :points, TEST_NAME = :test_name WHERE TEST_ID = :test_id`;
  const updateTestPost= await executeQuery(
    updateTestPostQuery,
      QueryTypes.UPDATE,{...user,test_id}
    );
    return updateTestPost;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateTestPost()`, error);
  }}

export async function deleteLearnId(learnId) {
  try {
    logger.info(`${TAG}.deleteLearnId()  ==>`,learnId);
    console.log(learnId)
    let query = "DELETE FROM whatyoulearn WHERE ID = :Id";
    const [learnDetails] = await executeQuery(query, QueryTypes.DELETE, {
      Id: learnId.id
    });
    return learnDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.deleteLearnId()`,
      error
    );

    throw error;
  }
}


export async function updateExercisesPost(user,exercise_id) {
  logger.info(`${TAG}.updateExercisesPost()`);
  try {
    let updateExercisesPostQuery = `UPDATE exercise SET
    QUESTION_NAME= :question_name, MARKS = :marks, QUESTION_TYPE = :question_type, points = :points WHERE EXERCISE_ID = :exercise_id`;
  const updateExercisesPost= await executeQuery(
    updateExercisesPostQuery,
      QueryTypes.UPDATE,{...user,exercise_id}
    );
    return updateExercisesPost;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateExercisesPost()`, error);
    throw error;
  }
}

