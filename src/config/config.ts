import {config as conf} from 'dotenv';
conf();

const config ={
    port: process.env.PORT || 3000,
    database_url: process.env.MONGO_URL,
    node_env: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
    web_search_api_key: process.env.SERPAPI_KEY,
    ai_key: process.env.GEMINI_API_KEY,
}

export default Object.freeze(config);