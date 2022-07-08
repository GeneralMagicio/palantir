import { MessageEmbed } from "discord.js";
import { UserData } from "../../interfaces/UserData";

export const renderMemberDataEmbed = (userData: UserData): MessageEmbed => {
  const memberDataEmbed = new MessageEmbed()
    .setTitle("GM Members")
    .setDescription(`Showing data for ${userData.Name || "name not found"}`)
    .setThumbnail(
      userData["Photo from Coda"] ||
        "https://cdn.discordapp.com/embed/avatars/0.png"
    );
  if (userData["Coda user"])
    memberDataEmbed.addField("Name", userData["Coda user"]);
  if (userData.Role)
    memberDataEmbed.addField(
      "Role",
      `${userData.Role}${
        userData["Role description"] && userData["Role description"].length
          ? `:\n${userData["Role description"]}`
          : ""
      }`
    );
  if (userData.Email) memberDataEmbed.addField("Email", userData.Email);
  if (userData["Time zone"])
    memberDataEmbed.addField("Timezone", userData["Time zone"], true);
  if (userData.Country)
    memberDataEmbed.addField("Country", userData.Country, true);
  if (userData.Address)
    memberDataEmbed.addField("Address", userData.Address, true);
  if (userData.Discord)
    memberDataEmbed.addField("Discord", userData.Discord, true);
  if (userData.Telegram)
    memberDataEmbed.addField("Telegram", userData.Telegram, true);
  if (userData.Github)
    memberDataEmbed.addField("Github", userData.Github, true);
  if (userData.Buddies)
    memberDataEmbed.addField("Buddies", userData.Buddies, false);
  if (userData["Mentor buddy"])
    memberDataEmbed.addField("Mentor Buddy", userData["Mentor buddy"], false);
  if (userData["Active?"] !== undefined && userData["Active?"] === true)
    memberDataEmbed.setColor("#00ff00");
  if (userData["Active?"] !== undefined && userData["Active?"] === false)
    memberDataEmbed.setColor("#ff0000");
  return memberDataEmbed;
};
