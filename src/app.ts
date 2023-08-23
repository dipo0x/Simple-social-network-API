import express, { Application } from 'express';
import compression from 'compression' 
import cors from 'cors' 
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware'
import helmet from 'helmet'
import { connectToDatabase } from './config/database';

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
    }
    private initializeErrorHandling(): void{
        this.express.use(errorMiddleware)
    }
    public listen(): void{
        this.express.listen(this.port, async () => {
            await connectToDatabase()
            console.log(`App is listening on Port ${this.port}`)
            
        })
    }
}

export default App