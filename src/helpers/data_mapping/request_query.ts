import logger from '../../logger'
import {
  BaseListAPIRequest,
  IBaseListAPIRequest,
} from '../../models'

export function requestQueryDataMapping (query: any): IBaseListAPIRequest {
  logger.info('helpers.data_mapping.request_query.requestQueryDataMapping()')

  try {
    return new BaseListAPIRequest(
      query?.searchText,
      query?.offset,
      query?.limit,
      query?.queryId,
      query?.sortBy,
      query?.sortOrder
    )
  } catch (error) {
    logger.error('ERROR occurred in helpers.request_query.requestQueryDataMapping()')
  }
}

