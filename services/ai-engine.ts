import { GoogleGenAI } from "@google/genai";
import config from "../src/config/config";

const ai = new GoogleGenAI({ apiKey: config.ai_key });

const aiEngine = async (context: any, query: string) => {

    try {
        
        const aicontext = JSON.stringify(context, null, 2);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `
            You are an AI researcher with access to a large knowledge base and reasoning capabilities.
    
            Below is real-time context I gathered from the web. Use this information **as your main source**, and **augment it** with your own knowledge to provide a detailed, fact-checked, and well-structured answer.
    
            ## Instructions:
            - Answer in a style similar to Perplexity.ai or a research analyst report.
            - Use the real-time context provided below as **primary**, and fill in gaps using your own LLM knowledge.
            - Mention key facts with supporting links or source attribution (use markdown format if possible).
            - Provide multiple viewpoints if relevant, and clearly organize the answer with headers or bullet points.
            - If any parts of the query aren't fully addressed in the context, use your own expertise to fill them in.
    
            ## Real-time context:${aicontext}
    
            ## Query:${query}
    
        `,
        });
        console.log(aicontext)
        return response.text;
    } catch (error) {
        console.log(error)
    }

}


export default aiEngine;