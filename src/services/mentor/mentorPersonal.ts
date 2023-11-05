import {  mentorPersonalAndContactData,mentorWorkExperienceData } from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";
import { verifyAccessToken } from "src/helpers/authentication";



const TAG = 'services.mentor_PersonalAndContactDetails'


export async function savePersonalAndContactDetails(
    user: any,
  ) {
    log.info(`${TAG}.savePersonalAndContactDetails() ==> `, user);
  
    const serviceResponse: IServiceResponse = new ServiceResponse(
      HttpStatusCodes.CREATED,
      "",
      false
    );
    try {
      let decoded = await verifyAccessToken(user.headerValue);
      const uid = decoded[0].uid;
      console.log(user);
      
      console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
      const mentorUserId = await mentorPersonalAndContactData.isValid(uid);
      const mentor = await mentorPersonalAndContactData.isValids(uid)
      console.log(mentor);
      if (!mentor) {
        serviceResponse.message = "Invalid mentor ID";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        serviceResponse.addError(new APIError(serviceResponse.message, "", ""));
        return serviceResponse;
      }
  
      const existingPersonalDetails =
        await mentorPersonalAndContactData.getPersonalDetailsByMentorId(
            mentorUserId.userId
        );
      if (existingPersonalDetails) {
        existingPersonalDetails.profile_pic = user.profile_pic;
        existingPersonalDetails.first_name = user.first_name;
        existingPersonalDetails.last_name = user.last_name;
        existingPersonalDetails.email = user.email;
        existingPersonalDetails.mobile_number = user.mobile_number;
        existingPersonalDetails.date_of_birth = user.date_of_birth;
        existingPersonalDetails.linkedin_profile =user.linkedin_profile;
        existingPersonalDetails.address = user.address;
        existingPersonalDetails.city = user.city;
        existingPersonalDetails.district = user.district;
        existingPersonalDetails.state = user.state;
        existingPersonalDetails.pincode = user.pincode;
        existingPersonalDetails.country = user.country;
  
        const updatedPersonalDataResponse =
          await mentorPersonalAndContactData.updatePersonalAndContactDetails(
            mentorUserId.userId,
            existingPersonalDetails
          );
        serviceResponse.data = {
          mentorPersonalAndContactDetailsUid: updatedPersonalDataResponse,
        };
      } else {
        const personalDataResponse =
          await mentorPersonalAndContactData.savePersonalAndContactDetails(
            user,
            mentorUserId.userId
          );
          user.data = {
          mentorPersonaDetailsUid: personalDataResponse,
        };
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.savePersonalAndContactDetails`, error);
      serviceResponse.addServerError(
        "Failed to add mentor personal details due to technical difficulties"
      );
    }
    return serviceResponse;
  }
  

export async function getMentorProfile(userId) {
    log.info(`${TAG}.getRecruiterProfile() ==> `, userId);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedProfile=await mentorWorkExperienceData.checkProfilExist(userId)
      if(existedProfile){
        const data = {
          existedProfile
        }    
        serviceResponse.data = data
        return serviceResponse
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }

export async function getMentorList(userId) {
    log.info(`${TAG}.getMentorList() ==> `, userId);
      
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try {
      const existedProfile=await mentorPersonalAndContactData.getMentorList(userId)
      if(existedProfile){
        const data = {
          existedProfile
        }    
        serviceResponse.data = data
        return serviceResponse
      }
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.getRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse;
  }





