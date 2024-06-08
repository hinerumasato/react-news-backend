import * as redis from 'redis';
import { configDotenv } from 'dotenv';
configDotenv();
export const redisClient: redis.RedisClientType = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT as string),
    }
});

// Check connection
redisClient.connect();
redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('flushall', () => {
    console.log('Redis cache cleared');
})

setInterval(async () => {
    const now = new Date();
    // format now to HH:MM:SS
    const nowString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    if(nowString === '00:00:00') {
        console.log('Clearing cache');
        await redisClient.flushAll();
    }

}, 1000);