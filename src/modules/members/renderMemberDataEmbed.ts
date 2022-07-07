import { MessageEmbed } from "discord.js";
import { UserData } from "../../interfaces/UserData";

export const renderMemberDataEmbed = (userData: UserData): MessageEmbed => {
  return new MessageEmbed()
    .setTitle("GM Members")
    .setDescription(`Showing data for ${userData.Name || "name-undefined"}`);
};
