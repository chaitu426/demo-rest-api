import { getJson } from "serpapi";
import config from "../src/config/config";

const webSearch = async (query: string) => {
   
    const response = await getJson({
      engine: "google",
      api_key: config.web_search_api_key, // Get your API_KEY from https://serpapi.com/manage-api-key
      q: query,
      location: "india",
    });
    return response;
    
}

export default webSearch;