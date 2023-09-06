import cors from 'cors'
import express,{Application} from 'express'
import { API_CALL_LOG_FORMAT } from './config'

// import 

// 
export default (app:Application):void=>{
    const corsOptions = {
        origin: '*', // Set the allowed origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
        optionsSuccessStatus: 204 // Set the status code for successful preflight requests
      };

      app.use(express.urlencoded({extended: true}));
      //app.use(express.json())
      app.use(express.json({ strict: false }))
      app.use(cors(corsOptions))

}
