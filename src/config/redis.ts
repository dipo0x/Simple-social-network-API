import Redis from "ioredis"

const redis = new Redis({
    host: process.env.REDIS_HOST as string,
    port: process.env.REDIS_PORT as unknown as number,
    password: process.env.REDIS_PASSWORD as string
})

try{
    redis.on("connect", function() {
        console.log('Connected to Redis successfully!');
    })
} catch(error){
    console.error('Error connecting to Redis:', error);
}

export { redis }