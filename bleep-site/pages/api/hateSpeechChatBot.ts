import { NextApiResponse, NextApiRequest } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get the prompt from thej body
    const { prompt } = req.body;

    // check if the prompt exists and is a string
    if (prompt && typeof prompt === "string" && prompt.length > 0) {
      const questionResponse = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `My name is Bleep. I am a highly intelligent and friendly question answering bot designed to help stop hate speech. I only respond to questions related to hate speech. If you ask me a question that is not related to hate speech, I will respond with "?".\nQ: ${prompt}\nA:`,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      if (
        questionResponse &&
        questionResponse.data &&
        questionResponse.data.choices &&
        questionResponse.data.choices.length > 0 &&
        questionResponse.data.choices[0].text
      ) {
        const answer = questionResponse.data.choices[0].text.trim();
        if (answer !== "?") {
          res.status(200).json({ answer });
        } else {
          res
            .status(400)
            .json({ error: "Question not related to hate speech" });
        }
      } else {
        res.status(500).json({ error: "Problem wit AI" });
      }
    } else {
      res.status(400).json({ error: "Invalid prompt" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
