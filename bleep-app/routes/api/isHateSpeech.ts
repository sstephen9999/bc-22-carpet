import { HandlerContext } from "$fresh/server.ts";
import { config } from "https://deno.land/std/dotenv/mod.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.0.0";

const configuration = new Configuration({
  apiKey: (await config()).OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const handler = async (
  _req: Request,
  _ctx: HandlerContext
): Response => {
  if (_req.method === "POST") {
    const requestBody = await _req.json();
    const prompt = requestBody.prompt;

    try {
      const isHateSpeechResponse = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Decide whether this message is hate speech.\n\nMessage: \"${prompt}\"\nIs this message hate speech:`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      });
      const isHateSpeech = isHateSpeechResponse.data.choices[0].text.trim();

      if (isHateSpeech === "Yes") {
        return new Response("true");
      }

      return new Response("false");
    } catch (error) {
      console.log(error);
      return new Response("error");
    }
  }
};
