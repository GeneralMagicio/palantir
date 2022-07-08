import { readdir } from "fs/promises";
import logger from "jet-logger";
import { join } from "path";

import { Command } from "../interfaces/Command";

export const loadCommands = async (): Promise<Command[]> => {
  const result: Command[] = [];
  const commandDirPath = join(
    process.cwd(),
    process.env.DEV_MODE && process.env.DEV_MODE === "manual" ? "prod" : "src",
    "commands"
  );
  const files = await readdir(commandDirPath);
  for (const file of files) {
    const name = file.split(".")[0];
    const mod = await import(join(commandDirPath, file));
    if (name !== Object.keys(mod)[0]) {
      logger.warn(
        `Exported Command and name of file differ.\n${join(
          process.cwd(),
          "prod",
          "commands",
          file
        )} should export ${name}: Command instead of ${
          Object.keys(mod)[0]
        }: Command`
      );
    }
    result.push(mod[name] as Command);
  }
  return result;
};
