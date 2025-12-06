import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        const whiteList = [process.env.FRONTEND_URL, process.env.BACKEND_URL, process.env.URL_HOST] as string[];

        if(process.argv[2] === "--api"){
            whiteList.push(process.env.API_URL as string);
        }

        if(whiteList.includes(origin)){
            callback(null, true);
        }else {
            callback(new Error("Error de CORS"));
        }
    }
}
