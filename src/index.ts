import "reflect-metadata";
import { Client } from "discordx";
import { GatewayIntentBits } from "discord.js";
import loadEnv from './dotenv';
import { readdirSync } from "fs";
import { join } from "path";
import { AppDataSource } from "./utils/dataSource";


loadEnv();

const botGuilds = process.env.GUILD_ID ? [process.env.GUILD_ID] : [];

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
    botGuilds: botGuilds
});

client.once("ready", async () => {
    console.log("\nLoading...");
    await client.initApplicationCommands();
    console.log(`\nLogged in as ${client.user!.tag}`);
});

client.on("interactionCreate", (interaction) => {
    client.executeInteraction(interaction);
});

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((error) => console.log(error));

function importFiles(dir: string) {
    const files = readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const path = join(dir, file.name);
        if (file.isDirectory()) {
            importFiles(path);
        } else if (file.name.endsWith(".ts") || file.name.endsWith(".js")) {
            require(path);
        }
    }
}

async function start() {
    importFiles(join(__dirname, "commands"));
    importFiles(join(__dirname, "locales"));
    importFiles(join(__dirname, "events"));
    importFiles(join(__dirname, "guards"));
    //importFiles(join(__dirname, "utils"));
    


    await client.login(process.env.BOT_TOKEN as string);
}

start().catch(console.error);
