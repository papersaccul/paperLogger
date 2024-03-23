import "reflect-metadata";
import { Client } from "discordx";
import { GatewayIntentBits } from "discord.js";
import loadEnv from './dotenv';
import { readdirSync } from "fs";
import { join } from "path";

loadEnv();

const botGuilds = process.env.GUILD_ID ? [process.env.GUILD_ID] : [];

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
    botGuilds: botGuilds
});

client.once("ready", async () => {
    console.log("\n");
    await client.initApplicationCommands();
    console.log(`\nLogged in as ${client.user!.tag}`);
});

client.on("interactionCreate", (interaction) => {
    client.executeInteraction(interaction);
});

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
    //importFiles(join(__dirname, "utils"));
    //importFiles(join(__dirname, "events"));


    await client.login(process.env.BOT_TOKEN as string);
}

start().catch(console.error);
