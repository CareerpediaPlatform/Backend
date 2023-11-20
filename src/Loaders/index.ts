// import { sqlConnection } from 'data_stores/database'
import { Application } from 'express'
import log from '../logger'
import initializeRoutes from '../routes'
import { checkEnv } from '../Loaders/config'
import serverLoader from '../Loaders/server'
import { s3ConnectionLoader } from './s3_config'

export const initializeApp=async(app:Application):Promise<void>=>{
    try{
        await checkEnv()
        serverLoader(app)  
        initializeRoutes(app)
        s3ConnectionLoader()
    }
    catch (error) {
        log.error('ERROR occurred in initializeApp().', error)
        throw error
    }
}
