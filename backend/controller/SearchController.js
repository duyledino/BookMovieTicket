import { createClient } from "redis";
import {pool} from "../utils/configPostgres.js";

const redisClient = createClient({ url: "redis://localhost:6379" });

const syncPostgresToRedis = async () => {
    try {
        const res = await pool.query("select film_name,film_id,active from film");
        const resUsername = await pool.query("select username from customer");
        await redisClient.del('autocomplete') ;//'autocomplete' is key , clear exists 'autocomplete'
        await redisClient.del('saveUsername');
        for (const row of res.rows){
            const value = JSON.stringify({film_name: row.film_name.toLowerCase(),film_id: row.film_id,active: row.active})
            await redisClient.zAdd('autocomplete',{score: 0,value});
        }
        for (const row of resUsername.rows){
            await redisClient.zAdd('saveUsername',{score: 0,value: row.username});
        }
        console.log('Synced PostgreSQL data to Redis');
    } catch (error) {
        console.error('Error syncing data:', error);
    }
};

const searchController = async (req,res)=>{
    const query = req.query.q?.toLowerCase() || "";
    if(!query) return res.status(200).json([]);
    const stringResult = await redisClient.zRange('autocomplete',0,-1); // [...]
    const result = stringResult.map(r=>JSON.parse(r));
    const match = result.filter( r => r.film_name.startsWith(query)).slice(0,5); // get 5 value matched
    return res.status(200).json(match);
}

const searchUsernameController = async(req,res)=>{
    const query = req.query.username || "";
    console.log("my query",query);
    const result = await redisClient.zRange('saveUsername',0,-1);
    const match = result.find(r=>r === query);
    console.log("match :", match);
    return res.status(200).json(match);
}



export {redisClient,syncPostgresToRedis,searchController,searchUsernameController};
 