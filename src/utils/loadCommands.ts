import { readdir } from "fs/promises";
import { join } from "path";

import { Command } from "../interfaces/Command";

export const loadCommands = async (): Promise<Command[]> => {
  const result: Command[] = [];
  const files = await readdir(join(process.cwd(), "prod", "commands"));
  for (const file of files) {
    const name = file.split(".")[0];
    const mod = await import(join(process.cwd(), "prod", "commands", file));
    result.push(mod[name] as Command);
  }
  return result;
};
