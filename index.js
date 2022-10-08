import dotenv from 'dotenv';
dotenv.config()

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


import { Client, GatewayIntentBits } from 'discord.js'

const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ]
    }
)

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", async (message) => {
    console.log(message.content)
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Decide whether this message is promoting hate speech.\n\nMessage: \"${message.content}\"\nIs this message promoting hate speech:`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
    });
    const responseText = (response.data.choices[0].text).trim();
    if (responseText === "Yes") {
        message.delete();
    }

})