import {  mentorPersonalAndContactData,mentorWorkExperienceData } from "src/Database/mysql";
import { HttpStatusCodes } from "src/constants/status_codes";
import log from "src/logger";
import { APIError } from "src/models/lib/api_error";
import { IServiceResponse, ServiceResponse } from "src/models/lib/service_response";


const TAG = 'services.mentor_PersonalAndContactDetails'


export async function savePersonalAndContactDetails(
    menPersonalData: any,
    mentorUid: string
  ) {
    log.info(`${TAG}.savePersonalAndContactDetails() ==> `, menPersonalData);
  
    const serviceResponse: IServiceResponse = new ServiceResponse(
      HttpStatusCodes.CREATED,
      "",
      false
    );
    try {
      console.log(mentorUid);
      console.log(menPersonalData);
      
      console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
      const mentorUserId = await mentorPersonalAndContactData.isValid(mentorUid);
      console.log(mentorUserId);
      if (!mentorUserId) {
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
        existingPersonalDetails.profile_pic = menPersonalData.profile_pic;
        existingPersonalDetails.first_name = menPersonalData.first_name;
        existingPersonalDetails.last_name = menPersonalData.last_name;
        existingPersonalDetails.email = menPersonalData.email;
        existingPersonalDetails.mobile_number = menPersonalData.mobile_number;
        existingPersonalDetails.date_of_birth = menPersonalData.date_of_birth;
        existingPersonalDetails.linkedin_profile =menPersonalData.linkedin_profile;
        existingPersonalDetails.address = menPersonalData.address;
        existingPersonalDetails.city = menPersonalData.city;
        existingPersonalDetails.district = menPersonalData.district;
        existingPersonalDetails.state = menPersonalData.state;
        existingPersonalDetails.pincode = menPersonalData.pincode;
        existingPersonalDetails.country = menPersonalData.country;
  
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
            menPersonalData,
            mentorUserId.userId
          );
          menPersonalData.data = {
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


export async function deleteRecruiterProfile(userId){
    console.log("SERvices**********************")
    console.log(userId)
    log.info(`${TAG}.deleteRecruiterProfile() ==> `, userId);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, '', false);
    try{
      const deleteProfile=await mentorWorkExperienceData.deleteRecruiter(userId)
      if(deleteProfile){
        serviceResponse.message="user deleted successfully"
        return serviceResponse  
      }
      else{
        serviceResponse.message="invalid user id"
        return serviceResponse
      }
    }
    catch(error){
      log.error(`ERROR occurred in ${TAG}.deleteRecruiterProfile`, error);
      serviceResponse.addServerError('Failed to create user due to technical difficulties');
    }
    return serviceResponse
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





