import {
  REST,
  RESTGetAPIApplicationCommandsResult,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import CommandStore from "../store/command-store.store";
import fs from "node:fs";

const registerCommands = async () => {
  const commandFolder = fs.readdirSync(__dirname + "/../commands");
  const slashCommandData: RESTPostAPIApplicationCommandsJSONBody[] = [];

  for (const folder of commandFolder) {
    const commandFiles = fs.readdirSync(__dirname + `/../commands/./${folder}`);

    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      const slashCommand = command.default;

      const isDuplicated = CommandStore.has(slashCommand.name);
      if (isDuplicated)
        throw new Error(
          "Duplicated slash command is found! Command Name: " +
            slashCommand.name
        );

      slashCommandData.push(slashCommand.data.toJSON());

      CommandStore.set(slashCommand.name, slashCommand);
    }
  }

  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_TOKEN as string
  );

  const guildId = process.env.GUILD_ID;
  const clientId = process.env.CLIENT_ID as string;

  if (process.env.NODE_ENV === "development") return;

  console.log(slashCommandData);

  await rest.put(Routes.applicationCommands(clientId), {
    body: slashCommandData,
  });

  console.log(`Successfully reloaded application (/) commands., 1`);
};

export default registerCommands;
