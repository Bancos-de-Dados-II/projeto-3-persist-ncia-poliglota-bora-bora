import { FindAllEventsUseCase } from "./findAllEventsUseCase";
import { Request,Response } from "express";
import { redisClient } from "../../database/redis";


export class FindAllEventsController{
    constructor(private findAllEventsUsecase:FindAllEventsUseCase){}

    async handle(request:Request,response:Response){
        try {

            const cache = await redisClient.exists('eventos');
            if(cache){
                const eventsRedis =  await redisClient.get('eventos');
                return response.json(JSON.parse(eventsRedis as string));
            }
            
            let events =  await this.findAllEventsUsecase.execute();
            let eventRedis = await redisClient.set("eventos",JSON.stringify(events));
            response.status(200).json(eventRedis);
            return;
        } catch (error:any) {
            response.status(400).json({error:error.message});
        }
    }
}
