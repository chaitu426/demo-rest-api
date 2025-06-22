import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import webSearch from "../../services/web-search";
import aiEngine from "../../services/ai-engine";


export const ask = async (req:Request, res:Response, next:NextFunction) =>{
  try{
    const {query} = req.body;
    // Validate the request body
    if(!query){
        const err = createHttpError(400, "query is required");
        return next(err);
    }
    //web search for this query
    const response = await webSearch(query);

    if(!response){
        const err = createHttpError(500, "web search failed");
        return next(err);
    }
    //send web sources + query to llm
    const aiResponse = await aiEngine(response, query);

    res.json({
        status: "success",
        message: "query sent to web search",
        ans:`${aiResponse}`
    });
    
    //store query + sources + ans in db 


    
  }catch{
    const err = createHttpError(500, `server error`,);
    return next(err)
    
  }
}