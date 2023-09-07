import {
  REST,
  RESTGetAPIApplicationCommandsResult,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import CommandStore from "../store/command-store.store";
import fs from "node:fs";

import path from "path";
import dotenv from "dotenv";

const registerCommands = async () => {
  const version = process.env.NODE_ENV;
  if (version === "production") {
    dotenv.config({ path: path.resolve(__dirname, "../../.env.production") });
  } else {
    dotenv.config({ path: path.resolve(__dirname, "../../.env.development") });
  }

  const commandFolder = fs.readdirSync(__dirname + "/../commands");
  const slashCommandData: RESTPostAPIApplicationCommandsJSONBody[] = [];
  for (const folder of commandFolder) {
    const commandFiles = fs.readdirSync(__dirname + `/../commands/./${folder}`);

    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      const slashCommand = command.default;

      const isDuplicated = CommandStore.has(slashCommand.name);
      if (isDuplicated) throw new Error("Duplicated slash command is found!");

      slashCommandData.push(slashCommand.data.toJSON());

      CommandStore.set(slashCommand.name, slashCommand);
    }
  }

  const rest = new REST({ version: "9" }).setToken(
    process.env.DISCORD_TOKEN as string
  );

  const guildId = process.env.GUILD_ID as string;
  const clientId = process.env.CLIENT_ID as string;

  if (process.env.NODE_ENV === "development") return;

  if (process.env.NODE_ENV === "development") {
    if (guildId) {
      const guildCommands = await rest.get(
        Routes.applicationGuildCommands(clientId, guildId)
      );

      for (const command of guildCommands as RESTGetAPIApplicationCommandsResult) {
        const deleteUrl = `${Routes.applicationGuildCommands(
          clientId,
          guildId
        )}/${command.id}`;
        await rest.delete(`/${deleteUrl}`);
      }

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: slashCommandData,
      });
    }
  } else {
    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: slashCommandData,
    });

    console.log(`Successfully reloaded ${data} application (/) commands.`);
  }
};

registerCommands();
