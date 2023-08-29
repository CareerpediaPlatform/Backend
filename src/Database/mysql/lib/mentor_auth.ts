import logger from "src/logger";
import { IUser } from "src/models";
import { executeQuery } from "../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword } from "src/helpers/encryption";
var crypto=require("crypto") 

const TAG = 'data_stores_mysql_lib_user'

export async function signUp(user: IUser) {
  logger.info(`${TAG}.saveUser()`);
  try {


    const hashedPassword = await hashPassword(user.password);
    const data = {
      uid: crypto.randomUUID(),
      email: user.email,
      password: hashedPassword
    };
    let mentorInsertQuery = `insert into MENTOR(UID, EMAIL, PASSWORD)
    values(:uid, :email, :password)`;

    await executeQuery(mentorInsertQuery, QueryTypes.INSERT, {
      ...data,
    });
    return data;

  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
    throw error;
  }
}


export async function checkEmailExist(email: string) {
    try {
      logger.info(`${TAG}.checkEmailOrPhoneExist()  ==>`, email);
  
      let query = 'select * from MENTOR where EMAIL=:email ';
      const [user] = await executeQuery(query, QueryTypes.SELECT, {
        email
      });
      return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkEmailOrPhoneExist()`, error);
      throw error;
    }
  }