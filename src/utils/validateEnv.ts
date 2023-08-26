import { cleanEnv, str, port, url, num  } from "envalid";

function validateEnv(): void{
    cleanEnv(process.env, {
        DATABASE_URL: str(),
        PORT: port({ default: 3000 }),
        NODE_ENV: str({ 
            choices: ["development", "production"]
        }),
        ACCESSTOKENKEY: str(),
        REDIS_HOST: str(),
        ACCESSTOKENEXPIRESIN: num()
    })
}

export default validateEnv