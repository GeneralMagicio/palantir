import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { Bot } from "../interfaces/Bot";

import logger from 'jet-logger';

export const registerCommands = async (Bot: Bot): Promise<boolean> => {
  try {
    if (!Bot.user?.id) {
      logger.err(
        "Can't Register commands. Discord Bot not logged in."
      );
      return false;
    }

    logger.info("Registering bot commands...");
    const rest = new REST({ version: "9" }).setToken(
      Bot.envConfigs.token || ""
    );

    const commandData = Bot.commands.map((el) => el.data.toJSON());
    if (Bot.commands.length === 0) {
      logger.info("No commands found to register...");
      return false;
    }
    if (Bot.envConfigs.homeGuildId) {
      logger.info("Registering commands to home-guild only...");
      await rest.put(
        Routes.applicationGuildCommands(
          Bot.user.id,
          Bot.envConfigs.homeGuildId
        ),
        {
          body: commandData,
        }
      );
      return true;
    }
    logger.info("Registering commands globally...");
    await rest.put(Routes.applicationCommands(Bot.user.id), {
      body: commandData,
    });

    return true;
  } catch (error) {
    logger.err(error);
    return false;
  }
};
