import { SlashCommandBuilder } from "@discordjs/builders";

import { Command } from "../interfaces/Command";
import logger from "jet-logger";
import { membersHandler } from "../modules/members/membersHandler";

export const members: Command = {
  data: new SlashCommandBuilder()
    .setName("members")
    .setDescription("Command to fetch member data from Coda"),
  async run(bot, interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });
      await membersHandler(bot, interaction);
    } catch (err) {
      logger.err(err);
    }
  },
};
