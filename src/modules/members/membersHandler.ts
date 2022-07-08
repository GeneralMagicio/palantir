import { Coda } from "coda-js";
import { CommandHandler } from "../../interfaces/CommandHandler";
import { UserData } from "../../interfaces/UserData";
import {
  Message,
  MessageActionRow,
  Interaction,
  ButtonInteraction,
  ModalSubmitFieldsResolver,
} from "discord.js";
import { nextButton, previousButton } from "./controlButtons";
import { renderMemberDataEmbed } from "./renderMemberDataEmbed";

export const membersHandler: CommandHandler = async (Bot, interaction) => {
  const coda = new Coda(Bot.envConfigs.codaApiKey);
  const dbUsersTable = await (
    await coda.getTable("rsaK-ocy6k", "grid-nzVATcsM5j")
  ).listRows({ useColumnNames: true });

  const users: UserData[] = [];

  for (const row of dbUsersTable) {
    users.push(row.values);
  }

  let index = 0;

  if (!users || users.length === 0) {
    await interaction.editReply("No members found");
  } else {
    const msg = (await interaction.editReply({
      embeds: [renderMemberDataEmbed(users[index])],
      components: [new MessageActionRow().addComponents(nextButton)],
    })) as Message;

    const collector = interaction.channel?.createMessageComponentCollector({
      filter: (i: Interaction) =>
        i.isButton() && (i.customId === "next" || i.customId === "previous"),
      componentType: "BUTTON",
    });

    collector?.on("collect", async (i: ButtonInteraction) => {
      if (i.customId === "next") {
        index = index != users.length - 1 ? index + 1 : 0;
      } else {
        index = index != 0 ? index - 1 : users.length - 1;
      }
      await i.update({
        embeds: [
          renderMemberDataEmbed(users[index]).setFooter({
            text: `Showing #${index + 1} from ${users.length}`,
          }),
        ],
        components: [
          new MessageActionRow().addComponents(previousButton, nextButton),
        ],
      });
    });
  }
};
