import { STATUSES } from "../blog/blogSlice"
import { setBlog, setStatus } from "./AISlice"
import { Configuration, OpenAIApi }  from "openai";

  const configuration = new Configuration({
    apiKey : process.env.REACT_APP_OPENAI_API_KEYS,
  });
  
  const openai = new OpenAIApi(configuration);

export function AIGenerate({command,userInput,words}){
    return async function AIGenerateThunk(dispatch,getState){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            
            const res = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${command} : ${userInput}`,
                temperature: 0.8,
                max_tokens: words,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              });

            console.log(res);
            dispatch(setBlog(res.data.choices[0].text));
            dispatch(setStatus(STATUSES.SUCCESS));
            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

// For Testing

// await new Promise((resolve,reject) => {
//         setTimeout(() => {
//                 resolve();
//         dispatch(setBlog("Hello Jain"));
//     }, 5000);
//     });