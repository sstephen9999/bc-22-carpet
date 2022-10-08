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
            GatewayIntentBits.DirectMessages,
        ]
    }
)

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    try {
        const isHateSpeechResponse = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `Decide whether this message is hate speech.\n\nMessage: \"${message.content}\"\nIs this message hate speech:`,
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        })
        const isHateSpeech = (isHateSpeechResponse.data.choices[0].text).trim()

        if (isHateSpeech === "Yes") {
            message.delete();
            message.author.send(`Your message: "${message.content}" was deleted because it was classified as hate speech. Please refrain from sending hate speech in the future.`);
            return;
        }

        if (message.channelId === "1028373704868102266") {
            const questionResponse = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `My name is Bleep. I am a highly intelligent question answering bot designed to help stop hate speech. I am also very friendly. I only respond to questions related to hate speech. If you ask me a question that is not related to hate speech, I will respond with "?".\nQ: ${message.content}\nA:`,
                temperature: 0,
                max_tokens: 100,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            })
            const answer = (questionResponse.data.choices[0].text).trim();
            if (answer !== "?") {
                message.reply(answer);
            }
        }
    } catch (err) {
        console.log(err)
    }

})