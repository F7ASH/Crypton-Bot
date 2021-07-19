import { SapphireClient } from "@sapphire/framework";
import { Intents } from "discord.js";
import setupEnv from "./utils/setupEnv";

// Setup env using custom script
setupEnv();

/**
 * The client made using SapphireClient
 * @type {SapphireClient}
 */
const client: SapphireClient = new SapphireClient({
	intents: [ Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS ],
	defaultPrefix: "?",
	caseInsensitiveCommands: true,
	caseInsensitivePrefixes: true,
});

/**
 * Color escape sequence for console.log
 */
const redColorCode = "\x1b[31m";
const whiteColorCode = "\x1b[0m";

// Provide the token for client and login
client.login(process.env.DISCORD_TOKEN);

// Handle all rejections
process.on("unhandledRejection", err => console.log(`${redColorCode} ${err} ${whiteColorCode}`));