import express, { Application } from 'express';

class App {
    public express: Application;
    public port: number;

    constructor(port:number ){
        this.express = express()
        this.port = port;
    }
    public listen(): void{
        this.express.listen(this.port, ()=>{
            console.log(`App is listening on Port ${this.port}`)
        })
    }
}

export default App