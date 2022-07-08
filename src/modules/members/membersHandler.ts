import { Coda } from "coda-js";
import { CommandHandler } from "../../interfaces/CommandHandler";
import { UserData } from "../../interfaces/UserData";

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

  if (!users || users.length === 0) {
    await interaction.editReply("No members found");
  } else {
    let index = 0;
    await interaction.editReply({
      embeds: [renderMemberDataEmbed(users[index])],
    });
  }
};
