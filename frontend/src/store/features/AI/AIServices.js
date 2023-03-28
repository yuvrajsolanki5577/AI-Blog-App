import { STATUSES } from "../blog/blogSlice"
import { setBlog, setStatus, setTitle } from "./AISlice"
import { Configuration, OpenAIApi }  from "openai";

  const configuration = new Configuration({
    apiKey : process.env.REACT_APP_OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);

export function AIGenerateBlog(value){
    return async function AIGenerateThunk(dispatch,getState){
        dispatch(setStatus(STATUSES.LOADING));
        try {

            const res = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Generate a blog on a topic ${value}`,
                temperature: 0.8,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              });
            console.log(res.data.choices[0].text);
            dispatch(setBlog(res.data.choices[0].text));
            dispatch(setStatus(STATUSES.SUCCESS));
            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}


export function AIGenerateTitle(value){
  return async function AIGenerateThunk(dispatch,getState){
      dispatch(setStatus(STATUSES.LOADING));
      try {
        
        // await new Promise((resolve,reject) => {
        //         setTimeout(() => {
        //           dispatch(setTitle(`
        //             1. Exploring the Benefits of Backend Technologies for Web Development
        //             2. Introduction to the Basics of Backend Development
        //             3. Investigating the Latest Trends in Backend Technologies
        //             4. Understanding the Advantages of Serverless Computing
        //             5. Building Your First Backend Service with NodeJS
        //             6. Automating Your Backend Development with Cloud Services
        //             7. Securing Your Backend Services with Authentication and Authorization
        //             8. What Are the Best Practices for Database Design?
        //             9. Optimizing Performance of Your Backend System
        //             10. Building Scalable Backend Services with Microservices
        //             11. Troubleshooting Common Issues with Backend Technologies
        //             12. Scaling Your Backend Services for Maximum Efficiency
        //             13. Exploring the Benefits of GraphQL for Backend Development
        //             14. Picking the Right Backend Technology for Your Project
        //           `));
        //           dispatch(setStatus(STATUSES.SUCCESS));
        //           resolve();
        //     }, 2000);
        // });

          const res = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: `Genrate 10+ blog titles on a topic ${value}`,
              temperature: 0.8,
              max_tokens: 200,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
            });
          console.log(res.data.choices[0].text);
          dispatch(setTitle(res.data.choices[0].text));
          dispatch(setStatus(STATUSES.SUCCESS));
          
      } catch (error) {
          console.log(error);
          dispatch(setStatus(STATUSES.ERROR));
      }
  }
}
