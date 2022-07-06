import { Interaction } from "discord.js";

import { Bot } from "../interfaces/Bot";
import logger from 'jet-logger';

/**
 * Bootstraps the event handlers to be mounted all at once.
 *
 * @param {Bot} bot The bot's Discord instance.
 */
export const handleEvents = (bot: Bot) => {
  bot.on("ready", () => {
    logger.info(`Logged in as "${bot.user?.tag}" ✨:
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░        ░░░░░░░░░░░░░░   ░░░░░░░░░░░░░░░░░░░░░░░░   ░░░░░░░░░░░░░░
▒   ▒▒▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ▒▒▒▒  ▒▒▒▒▒▒▒▒
▒   ▒▒▒▒   ▒▒▒▒   ▒▒▒▒▒   ▒▒▒▒   ▒▒▒▒▒   ▒   ▒▒▒    ▒  ▒▒▒▒▒  ▒    
▓        ▓▓▓▓   ▓▓   ▓▓   ▓▓   ▓▓   ▓▓▓   ▓▓   ▓▓▓   ▓▓▓   ▓▓   ▓▓▓
▓   ▓▓▓▓▓▓▓▓   ▓▓▓   ▓▓   ▓   ▓▓▓   ▓▓▓   ▓▓   ▓▓▓   ▓▓▓   ▓▓   ▓▓▓
▓   ▓▓▓▓▓▓▓▓   ▓▓▓   ▓▓   ▓   ▓▓▓   ▓▓▓   ▓▓   ▓▓▓   ▓ ▓   ▓▓   ▓▓▓
█   ██████████   █    █   ███   █    █    ██   ████   ██   █    ███
███████████████████████████████████████████████████████████████████`);
  });

  bot.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand()) {
      try {
        const command = bot.commands.find(
          (el) => el.data.name === interaction.commandName
        );
        if (!command) {
          await interaction.reply(
            "Bad Interaction: Bot can't find the Command."
          );
          return;
        }
        command.run(bot, interaction);
      } catch (error) {
        await interaction.reply(
          "Internal Bot Error: There was an error while running this command."
        );
        logger.warn(`${interaction.commandName} command failed...`);
      }
    }
  });
};
