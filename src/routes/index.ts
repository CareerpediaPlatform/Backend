import { Application } from 'express'
import { SWAGGER_DOC_PATH } from '../Loaders/config'
import log from '../logger'
import { errorHandler } from '../middlewares/error_handler'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import v1Routes from './v1'
import {swaggerSpecification} from '../utils/swigger'


// const swaggerDocument = YAML.load(SWAGGER_DOC_PATH)

export default function initializeRoutes (app: Application): any {
  log.info('initializeRoutes()')
    // Set up Swagger documentation using the loaded YAML file
    // swaggerSpecification(app);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification))
  app.use('/api/v1/', v1Routes)
  app.get('*', function (req, res) {
    res.status(404).send('what???')
  })
  app.use(errorHandler)
}