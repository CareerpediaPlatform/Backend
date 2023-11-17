import logger from '../../logger'
import {Admin,IAdmin, IMentor, Mentor ,Recruiter,IRecruiter,College,ICollege } from '../../models'


//Admin datamapping
export function AdminDataMapping (payload: any): IAdmin {
  logger.info('helpers.data_mapping.admin.adminDataMapping()')
  try {
    if (payload != null && payload !== undefined) {
      return new Admin(
        payload.email,
        payload.password,

      )
    }
    return payload
  } catch (error) {
    logger.error('ERROR occurred in helpers.data_mapping.admin.adminDataMapping()')
    throw error
  }
}

//mentor datamapping
export function mentorDataMapping (payload: any): IMentor {
  logger.info('helpers.data_mapping.mentor.mentorDataMapping()')
  try {
    if (payload != null && payload !== undefined) {
      return new Mentor(
        payload.email,
        payload.password,
        payload.type,
        payload.course,
        payload.status

      )
    }
    return payload
  } catch (error) {
    logger.error('ERROR occurred in helpers.data_mapping.mentor.mentorDataMapping()')
    throw error
  }
}

//recruiter data mapping
export function recruiterDataMapping (payload: any): IRecruiter {
  logger.info('helpers.data_mapping.recruiter.recruiterDataMapping()')
  try {
    if (payload != null && payload !== undefined) {
      return new Recruiter(
        payload.email,
        payload.password
      
      )
    }
    return payload
  } catch (error) {
    logger.error('ERROR occurred in helpers.data_mapping.recruiter.recruiterDataMapping()')
    throw error
  }
}
//college data mapping
export function collegeDataMapping (payload: any): ICollege {
  logger.info('helpers.data_mapping.college.collegeDataMapping()')
  try {
    if (payload != null && payload !== undefined) {
      return new College(
        payload.email,
        payload.password,

      )
    }
    return payload
  } catch (error) {
    logger.error('ERROR occurred in helpers.data_mapping.college.collegeDataMapping()')
    throw error
  }
}

