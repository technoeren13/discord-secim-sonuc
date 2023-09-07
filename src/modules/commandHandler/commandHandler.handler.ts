import { Interaction } from "discord.js";
import CommandStore from "../../store/command-store.store";
import { DiscordEvent, SlashCommand } from "../../types";

const CommandHandler: DiscordEvent = {
  id: "commandHandler",
  on: "interactionCreate",
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand() || !interaction.guild) return;

    const returnOfInter = async (content: string, ephemeral = true) => {
      await interaction.reply({ content, ephemeral });
    };

    const { commandName } = interaction;

    const slashCollection = CommandStore;

    const slash = slashCollection.get(commandName) as SlashCommand;

    if (!slashCollection.has(commandName) || !slash) {
      return returnOfInter("Command not found!");
    }

    try {
      return slash.func({ interaction });
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  },
};
export default CommandHandler;
