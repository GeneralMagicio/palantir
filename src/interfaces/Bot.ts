import { Client, IntentsString } from "discord.js";
import { Command } from "./Command";

export interface Bot extends Client {
    commands: Command[];
    envConfigs: {
        token: string;
        intents: IntentsString[];
        codaApiKey: string;
        homeGuildId?: string;
    }
}