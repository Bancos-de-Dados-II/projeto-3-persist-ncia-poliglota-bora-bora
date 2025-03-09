import redis from "redis";

//@ts-ignore
export const redisClient = redis.createClient(6379,"host")