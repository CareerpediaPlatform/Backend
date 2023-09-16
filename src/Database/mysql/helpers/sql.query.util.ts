import {sqlConnection} from "../../database";
import log from '../../../logger/'
import {toCamelCase} from "../../../utils/formatter";
import { Transaction } from 'sequelize'

export async function executeQuery(query, type, replacements = {}, transaction = null): Promise<any> {
    try {
        
        const connection = await sqlConnection();
        return toCamelCase(await connection.query(query,{
            replacements,
            type,
            transaction,
        }));
        
    } catch (error) {
        log.error(`ERROR in executeQuery() => ${error}`);
         throw error;
    }
}
export async function getTransaction() {
    try {
      const connection = await sqlConnection()
      return await connection.transaction({
        autoCommit: false,
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
      })
    } catch (error) {
      log.error('Error in getTransaction()', error)
      throw error
    }
  }
  