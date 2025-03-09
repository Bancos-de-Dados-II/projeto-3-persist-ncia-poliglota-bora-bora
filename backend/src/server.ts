import app from "./app";
import { redisClient } from "./database/redis";

try {
    await redisClient.connect();
    app.listen(3000,()=>{
        console.log("Conectado");
    })
} catch (error) {
    console.error("Unable to connect to the database:", error)
}
