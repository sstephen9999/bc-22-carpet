import dotenv from 'dotenv';
dotenv.config()

import { MongoClient, ServerApiVersion } from 'mongodb';
const mongoClient = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const isChatBotChannel = async (channelId, guildId) => {

    await mongoClient.connect();
    const db = mongoClient.db('bleep-db');


    const collection = db.collection(guildId);
    const result = await collection.findOne({ channelId });

    if (result == null) {
        return false;
    }

    return true;


}

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

import { Client, GatewayIntentBits, Partials, REST, SlashCommandBuilder, Routes } from 'discord.js'

const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.DirectMessages,
        ],
        partials: [Partials.Channel]
    }
)

client.login(process.env.DISCORD_TOKEN);



client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

    const commands = [
        new SlashCommandBuilder().setName('add-chat-channel').setDescription('Add chat bot channel.').setDMPermission(false).setDefaultMemberPermissions(0).addStringOption(option => option.setName('channel-id').setDescription('Channel ID')),
        new SlashCommandBuilder().setName('remove-chat-channel').setDescription('Remove chat bot channel.').setDMPermission(false).setDefaultMemberPermissions(0).addStringOption(option => option.setName('channel-id').setDescription('Channel ID')),
        new SlashCommandBuilder().setName('list-chat-channels').setDescription('List all chat channels.').setDMPermission(false).setDefaultMemberPermissions(0)

    ]
        .map(command => command.toJSON());


    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    rest.put(
        Routes.applicationCommands(process.env.DISCORD_APP_ID),
        { body: commands },
    );

})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    await mongoClient.connect();
    const db = mongoClient.db('bleep-db');
    const { commandName } = interaction;

    if (commandName === 'add-chat-channel') {

        const channelId = interaction.options.getString('channel-id');

        const guildId = interaction.guildId;


        const collection = db.collection(guildId);
        collection.insertOne({ channelId: channelId });

        await interaction.reply(`Channel ${channelId} added as chat bot channel.`);
        return;
    }

    if (commandName === 'remove-chat-channel') {
        const channelId = interaction.options.getString('channel-id');

        const guildId = interaction.guildId;

        const collection = db.collection(guildId);
        collection.deleteOne({ channelId: channelId });

        await interaction.reply(`Channel ${channelId} removed as chat bot channel.`);
        return;
    }

    if (commandName === 'list-chat-channels') {
        const guildId = interaction.guildId;

        const collection = db.collection(guildId);
        const result = await collection.find().toArray();

        if (result.length == 0) {
            await interaction.reply(`No chat bot channels found.`);
            return;
        }

        await interaction.reply(`Chat bot channels: ${result.map(x => x.channelId).join(', ')}`);
        return;
    }
});

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

        if (await isChatBotChannel(message.channelId, message.guildId)) {
            const questionResponse = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `My name is Bleep. I am a highly intelligent and friendly question answering bot designed to help stop hate speech. I only respond to questions related to hate speech. If you ask me a question that is not related to hate speech, I will respond with "?".\nQ: ${message.content}\nA:`,
                temperature: 0.7,
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




