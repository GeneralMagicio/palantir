import { Client } from "discord.js";

import { Bot } from "./interfaces/Bot";
import logger from "jet-logger";

import { IntentOptions } from "./config";
import { validateEnv } from "./utils/validateEnv";
import { handleEvents } from "./events/handleEvents";
import { loadCommands } from "./utils/loadCommands";
import { registerCommands } from "./utils/registerCommands";

(async () => {
  const bot = new Client({ intents: IntentOptions }) as Bot;
  bot.envConfigs = validateEnv();
  bot.commands = await loadCommands();

  logger.info("Logging in to Discord...");
  await bot.login(bot.envConfigs.token);
  handleEvents(bot);

  const registerSucess = await registerCommands(bot);
  if (registerSucess) {
    logger.info("Succesfully registered bot commands...");
  } else {
    logger.err("Failed to register bot commands...");
  }
})();
