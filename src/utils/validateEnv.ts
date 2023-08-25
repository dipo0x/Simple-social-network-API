import { cleanEnv, str, port, url, num  } from "envalid";

function validateEnv(): void{
    cleanEnv(process.env, {
        DATABASE_URL: str(),
        PORT: port({ default: 3000 }),
        NODE_ENV: str({ 
            choices: ["development", "production"]
        }),
        AccessTokenKey: str(),
        REDIS_HOST: str(),
        accessTokenExpiresIn: num()
    })
}

export default validateEnv