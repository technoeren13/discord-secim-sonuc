import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../../types";

const InviteCommand: SlashCommand = {
  name: "davet",
  id: "davet",
  category: "kullanıcı",

  data: new SlashCommandBuilder()
    .setName("davet")
    .setDescription("Botun davet bağlantısı hakkında bilgi verir."),
  func: async ({ interaction, client }) => {
    const InviteButton = new ButtonBuilder()
      .setLabel("Talep Et")
      .setURL("https://discord.gg/Ctr27N3Ntf")
      .setStyle(ButtonStyle.Link);

    const embed = new EmbedBuilder({
      title: "Seçim Bot - Davet",
      color: Colors.Green,
      description: `Esenlikler, ${interaction.user}. Seçim Bot'unu sunucuna davet etmek istemene çok sevindik! \n\nBot sadece talep edilen sunuculara eklenebilmektedir. \n\n\nEğer sende botu sunucunda görmek istiyorsan butona tıkla ve sende talep et!`,
    });

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      InviteButton
    );

    interaction.reply({ components: [row], embeds: [embed] });
  },
};

export default InviteCommand;
