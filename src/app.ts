import express, { Application, Request, Response, NextFunction  } from 'express';
import compression from 'compression' 
import cors from 'cors' 
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface'
import errorMiddleware from './middlewares/error.middleware'
import helmet from 'helmet'
import { connectToDatabase } from './config/database';
import logger from './log/logger';
import userRoute from './modules/users/user.router'

class App {
    public express: Application;
    public port: number;

    constructor(port:number ){
        this.express = express()
        this.port = port;
        this.initializeMiddleware()
        this.initializeErrorHandling();
    }
    private initializeMiddleware(): void{
        this.express.use(helmet())
        this.express.use(cors())
        this.express.use(morgan('dev'))
        this.express.use(express.json())
        this.express.use(express.urlencoded({extended:false}))
        this.express.use(compression())
        this.express.disable("x-powered-by");
        this.express.use('/api/v1', userRoute)
    }
    private initializeErrorHandling(): void {
        this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
          logger.error(err);
        }),
        this.express.use((req, res, next) => {
            res.status(404).send({
                status: 404,
                success: false,
                message: "Endpoint not found"
            })
        })
        this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.log(err)
            res.status(500).send({
                status: 500,
                success: false,
                message: "Something went wrong"
            })
          })
      }
      
    
    public listen(): void{
        this.express.listen(this.port, async () => {
            await connectToDatabase()
            console.log(`App is listening on Port ${this.port}`)
            
        })
    }
}

export default App