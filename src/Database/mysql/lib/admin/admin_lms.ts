import logger from "../../../../logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto") 
const TAG = 'data_stores_mysql_lib_user_lms'

export async function  getCourseOverview(courseUid) {
  console.log(courseUid)
    try {
      logger.info(`${TAG}.getCourseOverview()  ==>`);
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  let query=`SELECT
  c.video AS video,
  c.title AS title,
  MAX(c.description) AS description,
  MAX(c.mentor) AS mentor,
  MAX(c.COURSE_UID) AS id,
  MAX(c.type) AS type,
  (
   select JSON_ARRAYAGG(
      JSON_OBJECT(
      'id',wyl.ID,
      'learn',wyl.LEARN
      )
      ) FROM WHAT_YOU_LEARN AS wyl WHERE wyl.COURSE_UID=c.COURSE_UID
  ) AS whatyoulearn,
    (
   select JSON_ARRAYAGG(
      JSON_OBJECT(
      'partUid',p.PART_UID,
      'title',p.PART_TITLE,
    'modules',(
     select JSON_ARRAYAGG(
      JSON_OBJECT(
        'moduleId',m.MODULE_UID,
      'name',m.MODULE_NAME,
      'Lessons',(
         select JSON_ARRAYAGG(
      JSON_OBJECT(
      'lessonId',l.LESSON_UID,
      'lesson',l.LESSON_NAME,
      'points',l.POINTS
      )) FROM LESSON_MODULES AS l WHERE l.MODULE_UID=m.MODULE_UID),
        'tests',(
         select JSON_ARRAYAGG(
      JSON_OBJECT(
      'testId',t.TEST_UID,
      'test',t.TEST_NAME,
      'points',t.POINTS,
      'marks',t.MARKS
      )) FROM TEST_MODULES AS t WHERE t.MODULE_UID=m.MODULE_UID),
            'exercise',(
         select JSON_ARRAYAGG(
      JSON_OBJECT(
      'exerciseId',e.EXERCISE_UID,
      'exercise',e.QUESTION_NAME,
      'points',e.POINTS,
      'marks',e.MARKS
      )) FROM EXERCISE_MODULES AS e WHERE e.MODULE_UID=m.MODULE_UID)
      )
      ) FROM COURSE_MODULE AS m  where m.PART_UID=p.PART_UID)
      )
      ) FROM COURSE_PART AS p  WHERE p.COURSE_UID=c.COURSE_UID
  ) AS courseParts
FROM COURSE_OVERVIEW AS c
WHERE c.COURSE_UID = :courseUid
GROUP BY
  c.video,
  c.title,
  c.mentor,
  c.COURSE_UID,
  c.type;`
      const results= await executeQuery(query, QueryTypes.SELECT,{courseUid:courseUid});
        return results;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getCourseOverview()`, error);
      throw error;
    }
  }

export async function  getCourses(type) {
 console.log(type)
      try {
        logger.info(`${TAG}.getCourses()  ==>`);
  
    let query=`SELECT * FROM COURSE_OVERVIEW WHERE TYPE=:type` 
        const results= await executeQuery(query, QueryTypes.SELECT,{type:type});
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
export async function  getMyCourse(courseUid) {
      try {
        logger.info(`${TAG}.getMyCourse()  ==>`);
        const query = 'SELECT * FROM COURSE_OVERVIEW WHERE COURSE_UID=:courseUid';
        const results= await executeQuery(query, QueryTypes.SELECT,{courseUid:courseUid});
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
export async function uploadCourses(fileDetails: any, course: any, type: any): Promise<any> {
  
  logger.info(`${TAG}.uploadVideoFile()`)
  try {
    const courseUid = crypto.randomUUID()
   console.log(courseUid)
    const data = {
      courseUid:courseUid,
      video: fileDetails.fileUrl,
      title: course.title,
      description: course.description,
      mentor: course.mentor,
      lesson: course.lesson,
      exercises: course.exercises,
      test: course.test,
      price: course.price,
      discount: course.discount,
      filePath: fileDetails.filePath,
    };

    const videoInsertQuery = `INSERT INTO COURSE_OVERVIEW (COURSE_UID, VIDEO, TITLE, DESCRIPTION, MENTOR, LESSON, EXERCISES, TEST, PRICE, DISCOUNT, TYPE )
    VALUES(:courseUid,:video, :title, :description, :mentor, :lesson, :exercises, :test, :price, :discount, :type )`
    const response = []

    const learnQuery = `INSERT INTO  WHAT_YOU_LEARN
    ( COURSE_UID,LEARN)
     values( :courseUid,:learn )`;

    let array = JSON.parse(course.learn);
    for (const singleData of array) {
      const res = await executeQuery(learnQuery, QueryTypes.INSERT, { learn: singleData, courseUid:courseUid })
      response.push(res)
    }
   
    const [coursedata] = await executeQuery(videoInsertQuery, QueryTypes.INSERT, {
      ...data ,...type
    })

    return {coursedata,courseUid,response};
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveFile()`, error)
    throw error
  }
}


export async function checkCourseIdExist(courseUid: any){
  console.log(courseUid)
  try {
    logger.info(`${TAG}.checkCourseIdExist() ==>`, courseUid);
    const checkQuery = 'SELECT * FROM `COURSE_OVERVIEW` WHERE COURSE_UID= :courseUid';
    const [basic] = await executeQuery(checkQuery, QueryTypes.SELECT, {courseUid});
    return basic// Return null if no user is found
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkCourseIdExist()`, error);
    throw error;
  }
}

export async function getuploadCourse(courseUid){
  try {
    logger.info(`${TAG}.getuploadCourse() ==>`, courseUid);
    const checkQuery = 'SELECT * FROM `COURSE_OVERVIEW` WHERE COURSE_UID= :courseUid';
    const getQuery = 'SELECT * FROM `WHAT_YOU_LEARN` WHERE COURSE_UID= :courseUid';
    const [basicCourse] = await executeQuery(checkQuery, QueryTypes.SELECT, {courseUid});
    const basicCourseLearn= await executeQuery(getQuery, QueryTypes.SELECT, {courseUid});
    return {basicCourse,basicCourseLearn}
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkProfilExist()`, error);
    throw error;
  }
}

export async function updateuploadCourse(fileDetails: any,courseUid: any, course:any){
  try {
    logger.info(`${TAG}.updateuploadCourse() ==>`, courseUid);
    const data = {
      courseUid:courseUid,
      // thumbnail: imageDetails.fileUrl,
      video: fileDetails.fileUrl,
      title: course.title,
      description: course.description,
      mentor: course.mentor,
      lesson: course.lesson,
      exercises: course.exercises,
      test: course.test,
      price: course.price,
      discount: course.discount,
      learn: course.learn
    }
    console.log(course)
    console.log(data)
    const updateQuery = `UPDATE COURSE_OVERVIEW SET  VIDEO= :video, TITLE= :title, DESCRIPTION=:description, MENTOR= :mentor, LESSON= :lesson, EXERCISES= :exercises, TEST= :test, PRICE= :price, DISCOUNT= :discount WHERE COURSE_UID=:courseUid`;

    const [basicCourse] = await executeQuery(updateQuery, QueryTypes.UPDATE, {...data,courseUid});
    const response=[]
    
    const learnQuery = `UPDATE WHAT_YOU_LEARN SET LEARN= :learn WHERE COURSE_UID= :courseUid`;
     let array=JSON.parse(course.learn)
     for( const singleData of array){
      const res=await executeQuery( learnQuery, QueryTypes.UPDATE,{ learn:singleData,courseUid})
      response.push(res)
     }
    return data;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateuploadCourse()`, error);
    throw error;
  }
}


export async function deleteuploadCourse(courseUid){
  try {
    logger.info(`${TAG}.deleteuploadCourse() ==>`, courseUid);
    const checkQuery = 'DELETE  FROM `COURSE_OVERVIEW` WHERE COURSE_UID=:courseUid';
    const basicCourse = await executeQuery(checkQuery, QueryTypes.DELETE, {courseUid});
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

    let query ="select * from LESSON_MODULES where MODULE_UID = :lessonUid";
    const lessonDetails = await executeQuery(query, QueryTypes.SELECT, {
      lessonUid
    });
    // const data={
    //   lessonDetails: Object.values(lessonDetails)
    // }
    return lessonDetails ;
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

export async function getTestPost(moduleUid) {
  try {
    logger.info(`${TAG}.getTestPost()  ==>`,moduleUid);

    let query ="select * from TEST_MODULES where MODULE_UID = :moduleUid";
    const testDetails = await executeQuery(query, QueryTypes.SELECT, {
      moduleUid
    });
    const data={
      testDetails: Object.values(testDetails)
    }
    return {...data};
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

export async function getExercisePost(moduleUid) {
  try {
    logger.info(`${TAG}.getTestPost()  ==>`,moduleUid);

    let query ="select * from EXERCISE_MODULES where MODULE_UID = :moduleUid";
    const exerciseDetails = await executeQuery(query, QueryTypes.SELECT, {
      moduleUid
    });
    const data={
      exerciseDetails: Object.values(exerciseDetails)
    }
    return {...data};
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
    const exerciseDetails = await executeQuery(query, QueryTypes.DELETE, {
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

export async function updateCoursePartPost(user,partUid) {
  logger.info(`${TAG}.updateCoursePartPost()`);
  try {

    let updateCoursePartPostQuery = `UPDATE COURSE_PART SET
    PART_TITLE= :partTitle, DESCRIPTION = :description, LESSONS = :lessons, DURATION = :duration, EXERCISES =:exercises, TESTS = :tests WHERE PART_UID = :partUid`;
  const updateCoursePartPosts= await executeQuery(
      updateCoursePartPostQuery,
      QueryTypes.UPDATE,{...user,partUid:partUid});
    
    return user;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateCoursePartPost()`, error);
    throw error;
  }

}

export async function updateModulesPost(user,moduleUid) {
  logger.info(`${TAG}.updateModulesPost()`);
  try {

    let updateModulesPostQuery = `UPDATE COURSE_MODULE SET
    MODULE_NAME= :moduleName, DESCRIPTION = :description, MENTOR = :mentor, LESSONS = :lesson, EXERCISES =:exercises, TESTS = :tests WHERE MODULE_UID = :moduleUid`;
  const updateModulesPort= await executeQuery(
    updateModulesPostQuery,
      QueryTypes.UPDATE,{...user,moduleUid}
    );
    return user;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateModulesPost()`, error);
    throw error;
  }
}

export async function checkLearnId(learnId: any){
  try {
    logger.info(`${TAG}.checkLearnId()  ==>`, learnId);

    let query = 'select * from WHAT_YOU_LEARN where ID= :learnId';
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


export async function updateLessonPost(user,lessonUid) {
  logger.info(`${TAG}.updateLessonPost()`);
  try {
    const data = {
      lessonUid:lessonUid,
      lessonName: user.lessonName,
      points: user.points,
      video: user.video,
      thumbnail: user.thumbnail,
      attachments: user.attachments

    }
    let updateLessonPostQuery = `UPDATE LESSON_MODULES SET
    LESSON_NAME= :lessonName, POINTS = :points, VIDEO = :video, THUMBNAIL = :thumbnail, ATTACHMENTS =:attachments WHERE LESSON_UID = :lessonUid`;
  const updateLessonPost= await executeQuery(
    updateLessonPostQuery,
      QueryTypes.UPDATE,{...data,lessonUid}
    );
    return data;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateLessonPost()`, error);
    throw error;
  }
}

export async function updateTestPost(user,testUid) {
  logger.info(`${TAG}.updateTestPost()`);
  try {
    let updateTestPostQuery = `UPDATE TEST_MODULES SET
    TEST_TYPE= :testType, MARKS = :marks, POINTS = :points, TEST_NAME = :testName WHERE TEST_UID = :testUid`;
  const updateTestPost= await executeQuery(
    updateTestPostQuery,
      QueryTypes.UPDATE,{...user,testUid}
    );
    return user;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateTestPost()`, error);
  }}

export async function deleteLearnId(learnId) {
  try {
    logger.info(`${TAG}.deleteLearnId()  ==>`,learnId);
    console.log(learnId)
    let query = "DELETE FROM WHAT_YOU_LEARN WHERE ID = :Id";
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

export async function updateExercisesPost(user,exerciseUid) {
  logger.info(`${TAG}.updateExercisesPost()`);
  try {

    let updateExercisesPostQuery = `UPDATE EXERCISE_MODULES SET
    QUESTION_NAME= :questionName, MARKS = :marks, POINTS = :points, OPTION1 = :option1,OPTION2 = :option2,OPTION3 = :option3,OPTION4 = :option4,ANSWER = :answer WHERE EXERCISE_UID = :exerciseUid`;
  const updateExercisesPost= await executeQuery(
    updateExercisesPostQuery,
      QueryTypes.UPDATE,{...user,exerciseUid}
    );
    return updateExercisesPost;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateExercisesPost()`, error);
    throw error;
  }
}


//DELETE

export async function deleteCoursePart(partUid){
  try {
    logger.info(`${TAG}.deleteCoursePart() ==>`, partUid);
    const checkQuery = 'DELETE  FROM `COURSE_PART` WHERE PART_UID=:partUid';
    const basicCourse = await executeQuery(checkQuery, QueryTypes.DELETE, {partUid});
    return basicCourse
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteCoursePart()`, error);
    throw error;
  }
}

export async function deleteCourseModule(moduleUid){
  try {
    logger.info(`${TAG}.deleteCourseModule() ==>`, moduleUid);
    const checkQuery = 'DELETE  FROM `COURSE_MODULE` WHERE MODULE_UID=:moduleUid';
    const basicCourse = await executeQuery(checkQuery, QueryTypes.DELETE, {moduleUid});
    return basicCourse
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.deleteCourseModule()`, error);
    throw error;
  }
}

export async function checkLessonUid(lessonUid) {
  try {
    logger.info(`${TAG}.checkLessonUid()  ==>`, lessonUid);
    let query ="select * from LESSON_MODULES where LESSON_UID = :lessonUid";
    const [lessonDetails] = await executeQuery(query, QueryTypes.SELECT, {
      lessonUid
    });
    return lessonDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.checkLessonUid()`,
      error
    );
    throw error;
  }
}

export async function checkTestUid(testUid) {
  try {
    logger.info(`${TAG}.checkTestUid()  ==>`, testUid);
    let query ="select * from TEST_MODULES where TEST_UID = :testUid";
    const [testDetails] = await executeQuery(query, QueryTypes.SELECT, {
      testUid
    });
    return testDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.checkTestUid()`,
      error
    );
    throw error;
  }
}

export async function checkExerciseUid(exerciseUid) {
  try {
    logger.info(`${TAG}.checkExerciseUid()  ==>`, exerciseUid);
    let query ="select * from EXERCISE_MODULES where EXERCISE_UID = :exerciseUid";
    const [exerciseDetails] = await executeQuery(query, QueryTypes.SELECT, {
      exerciseUid
    });
    return exerciseDetails;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.checkExerciseUid()`,
      error
    );
    throw error;
  }
}


export async function getAllCourseList(type) {
  try {
    logger.info(`${TAG}.getAllCourseList()  ==>`,type);
console.log(type)
    let query ="select * from COURSE_OVERVIEW where TYPE = :type";
    const courseList = await executeQuery(query, QueryTypes.SELECT, {
      type
    });
    // const data={
    //   exerciseDetails: Object.values(exerciseDetails)
    // }
    return courseList;
  } catch (error) {
    logger.error(
      `ERROR occurred in ${TAG}.getAllCourseList()`,
      error
    );
    throw error;
  }
}
