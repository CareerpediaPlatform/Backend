import {sqlConnection} from "../../database";
import log from '../../../logger/'
import {toCamelCase} from "../../../utils/formatter";

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