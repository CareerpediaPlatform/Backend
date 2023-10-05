import logger from "src/logger";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
var crypto=require("crypto") 

const TAG = 'data_stores_mysql_lib_courses'


export async function coursesPost(user,coursetype) {
  const course_id=crypto.randomUUID()
  logger.info(`${TAG}.coursesPost()`);
  try {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(user)
    console.log(coursetype)
    console.log(course_id)
    const courseInsertQuery = `INSERT INTO courses(course_id, thumbnail, title, description, mentor, lesson, exercises, test, price, discountPrice,video,type) 
VALUES (:course_id,:thumbnail,:title, :description, :mentor, :lesson, :exercises, :test, :price, :discountPrice,:video,:type)`;
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    let [course]=await executeQuery(courseInsertQuery, QueryTypes.INSERT, {
      ...user,coursetype,course_id:course_id});
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    return course;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.coursesPost()`, error);
    throw error;
  }
}

export async function checkCoureUid(course_id) {
  try {
    logger.info(`${TAG}.checkCoureUid()  ==>`, course_id);

    let query = 'select * from courses_parts where course_id=:course_id';
    const [userId] = await executeQuery(query, QueryTypes.SELECT, {
      course_id
    });
    return userId;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkCoureUid()`, error); 
    throw error;
  }
}
export async function coursePartPost(user) {
  const part_id=crypto.randomUUID()
  logger.info(`${TAG}.coursePartPost()`);
  try {
    const coursePartInsertQuery = `
    INSERT INTO courses_parts 
    (course_id,part_id,partTitle, description) 
    VALUES (:course_id, :part_id, :partTitle, :description)`;

    let [coursePart]=await executeQuery(coursePartInsertQuery, QueryTypes.INSERT, {
        ...user,part_id:part_id});
    return coursePart;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.coursePartPost()`, error);
    throw error;
  }
}

export async function getPart(part_id) {
  try {
    logger.info(`${TAG}.getPart()  ==>`, part_id);

    let query ="select * from courses_parts where part_id = :part_id";
    const [personalDetails] = await executeQuery(query, QueryTypes.SELECT, {
      part_id
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
  const module_id=crypto.randomUUID()
  logger.info(`${TAG}.modulesPost()`);
  try {
    const coursePartInsertQuery = `
    INSERT INTO modules 
    (part_id,module_id,module_name,description,lesson,test,exercises,hours) 
    VALUES (:part_id, :module_id,:module_name,:description,:lesson, :test,:exercises,:hours)`;

    let [coursePart]=await executeQuery(coursePartInsertQuery, QueryTypes.INSERT, {
        ...user,module_id:module_id});
    return coursePart;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.modulesPost()`, error);
    throw error;
  }
}

export async function checkPartUid(part_id) {
  try {
    logger.info(`${TAG}.checkPartUid()  ==>`, part_id);

    let query = 'select * from modules where part_id=:part_id';
    const [userId] = await executeQuery(query, QueryTypes.SELECT, {
      part_id
    });
    return userId;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkPartUid()`, error); 
    throw error;
  }
}

export async function getModule(module_id) {
  try {
    logger.info(`${TAG}.getModule()  ==>`, module_id);

    let query ="select * from modules where module_id = :module_id";
    const [personalDetails] = await executeQuery(query, QueryTypes.SELECT, {
      module_id
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

export async function lessonPost(lessonData) {
  
  logger.info(`${TAG}.lessonPost()`);
  const lesson_id=crypto.randomUUID()
  console.log(lesson_id)
  try {
    const lessonPartInsertQuery = `
    INSERT INTO lesson 
    (LESSON_ID, MODULE_ID, LESSON_NAME, POINTS, VIDEO, THUMBNAIL, ATTACHMENTS) 
    VALUES (:lesson_id, :module_id, :lesson_name, :points, :video, :thumbnail, :attachments)`;

    let [testPart]=await executeQuery(lessonPartInsertQuery, QueryTypes.INSERT, {
      ...lessonData,lesson_id:lesson_id});
  return testPart;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.lessonPost()`, error);
    throw error;
  }
}

export async function checkModuleUid(module_id) {
  try {
    logger.info(`${TAG}.checkModuleUid()  ==>`, module_id);

    let query = `
      SELECT module_id FROM lesson WHERE MODULE_ID = :module_id
      UNION ALL
      SELECT module_id FROM test WHERE MODULE_ID = :module_id
      UNION ALL
      SELECT module_id FROM exercise WHERE MODULE_ID = :module_id
    `;
    const [result] = await executeQuery(query, QueryTypes.SELECT, {
      module_id
    });

    return result;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.checkModuleUid()`, error);
    throw error;
  }
}

export async function getLessonPost(lesson_id) {
  try {
    logger.info(`${TAG}.getLessonPost()  ==>`,lesson_id);

    let query ="select * from lesson where LESSON_ID = :lesson_id";
    const [lessonDetails] = await executeQuery(query, QueryTypes.SELECT, {
      lesson_id
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

export async function deleteLessonPost(lesson_id) {
  try {
    logger.info(`${TAG}.getLessonPost()  ==>`,lesson_id);

    let query = "DELETE FROM lesson WHERE LESSON_ID = :lesson_id";
    const lessonDetails = await executeQuery(query, QueryTypes.DELETE, {
      lesson_id
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
  const test_id=crypto.randomUUID()
  logger.info(`${TAG}.testPost()`);
  try {
    const testInsertQuery = `
    INSERT INTO test 
    (TEST_ID,MODULE_ID,TEST_TYPE, MARKS,POINTS,TEST_NAME) 
    VALUES (:test_id, :module_id, :test_type, :marks ,:points,:test_name)`;

    let [testPart]=await executeQuery(testInsertQuery, QueryTypes.INSERT, {
        ...user,test_id:test_id});
    return testPart;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.testPost()`, error);
    throw error;
  }
}

export async function getTestPost(test_id) {
  try {
    logger.info(`${TAG}.getTestPost()  ==>`,test_id);

    let query ="select * from test where TEST_ID = :test_id";
    const [testDetails] = await executeQuery(query, QueryTypes.SELECT, {
      test_id
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

export async function deleteTestPost(test_id) {
  try {
    logger.info(`${TAG}.deleteTestPost()  ==>`,test_id);

    let query = "DELETE FROM test WHERE TEST_ID = :test_id";
    const testDetails = await executeQuery(query, QueryTypes.DELETE, {
      test_id
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
  const exercise_id=crypto.randomUUID()
  logger.info(`${TAG}.exercisesPost()`);
  try {
    const exerciseInsertQuery = `
    INSERT INTO exercise 
    (EXERCISE_ID,MODULE_ID,QUESTION_NAME, MARKS,QUESTION_TYPE,POINTS) 
    VALUES (:exercise_id, :module_id, :question_name, :marks,:question_type,points)`;

    let [exercisePart]=await executeQuery(exerciseInsertQuery, QueryTypes.INSERT, {
        ...user,exercise_id:exercise_id});
    return exercisePart;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.exercisesPost()`, error);
    throw error;
  }
}

export async function getExercisePost(exercise_id) {
  try {
    logger.info(`${TAG}.getTestPost()  ==>`,exercise_id);

    let query ="select * from exercise where EXERCISE_ID = :exercise_id";
    const [exerciseDetails] = await executeQuery(query, QueryTypes.SELECT, {
      exercise_id
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

export async function deleteExercisePost(exercise_id) {
  try {
    logger.info(`${TAG}.deleteExercisePost()  ==>`,exercise_id);

    let query = "DELETE FROM exercise WHERE EXERCISE_ID = :exercise_id";
    const [exerciseDetails] = await executeQuery(query, QueryTypes.DELETE, {
      exercise_id
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