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
console.log("Logged in to Discord");

client.on("messageCreate", async (message) => {
    console.log(message)
})