import logger from "src/logger";
import { IAdmin } from "src/models";
import { executeQuery } from "../../helpers/sql.query.util";
import { QueryTypes } from "sequelize";
import { hashPassword } from "src/helpers/encryption";
var crypto=require("crypto") 

const TAG = 'data_stores_mysql_lib_user'


export async function signUp(user: IAdmin) {
  logger.info(`${TAG}.saveUser()`);
  try {
    const hashedPassword = await hashPassword(user.password);
    const data = {
      uid: crypto.randomUUID(),
      email: user.email,
      password: hashedPassword
    };
    let AadminInsertQuery = `insert into ADMIN(UID, EMAIL, PASSWORD)
    values(:uid, :email, :password)`;

    await executeQuery(AadminInsertQuery, QueryTypes.INSERT, {
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
      logger.info(`${TAG}.checkEmailExist()  ==>`, email);
  
      let query = 'select * from ADMIN where EMAIL=:email ';
      const [user] = await executeQuery(query, QueryTypes.SELECT, {
        email
      });
      return user;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.checkEmailExist()`, error);
      throw error;
    }
  }

  export async function login(user: IAdmin) {
    try {
      logger.info(`${TAG}.saveUser()`, user.email);
  
      // Check if the user with the given email exists
      let query = "select * from ADMIN where EMAIL=:email ";
      const adminloginQuery = await executeQuery(query, QueryTypes.SELECT, {
        email: user.email,
      });
      return adminloginQuery;
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.saveUser()`, error);
      throw error;
    }
  }
  
