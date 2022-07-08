import { MessageButton } from "discord.js";

export const nextButton = new MessageButton()
  .setCustomId("next")
  .setLabel("Next")
  .setStyle("PRIMARY");

export const previousButton = new MessageButton()
  .setCustomId("previous")
  .setLabel("Previous")
  .setStyle("PRIMARY");
