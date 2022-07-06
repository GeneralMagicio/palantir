import { Bot } from "../interfaces/Bot";
import logger from 'jet-logger';
import { IntentOptions } from "../config";

export const validateEnv = (): Bot["envConfigs"] => {
    if (!process.env.DISCORD_BOT_TOKEN) {
        logger.err("Env variable DISCORD_BOT_TOKEN not set");
        process.exit(1);
    }
    if (!process.env.CODA_API_KEY) {
        logger.err("Env variable CODA_API_KEY not set.")
        process.exit(1);
    }
    if (!IntentOptions) {
        logger.warn("IntentOptions config not set");
    }
    if (!process.env.DISCORD_GUILD_ID) {
        logger.warn("Env variable DISCORD_GUILD_ID not set. Commands will be registered globally");
    }

    return {
        token: process.env.DISCORD_BOT_TOKEN,
        intents: IntentOptions,
        codaApiKey: process.env.CODA_API_KEY,
        homeGuildId: process.env.DISCORD_GUILD_ID,
    };
}