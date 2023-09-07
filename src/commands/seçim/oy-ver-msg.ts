import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  GuildMember,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import { Emoji, SlashCommand } from "../../types";

const SonucCommand: SlashCommand = {
  name: "oy-ver-msg",
  id: "oy-ver-msg",
  category: "oy-ver",

  data: new SlashCommandBuilder()
    .setName("oy-ver-msg")
    .setDescription("28 Mayıs 2023 2. Tur Seçim Sonuçları"),
  func: async ({ interaction, client }) => {
    const member = interaction.member as GuildMember;

    if (!member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      interaction.reply({
        content: `${Emoji.cross} Gerekli yetkiye sahip değilsin.`,
        ephemeral: true,
      });

      return;
    }
    const SonucButton = new ButtonBuilder()
      .setCustomId("anket-sonuc")
      .setLabel("Anket Sonucu")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>();

    row.addComponents(SonucButton);

    const embed = new EmbedBuilder({
      title: "28 Mayıs 2023 - 2. Tur Seçim Sonuçları",
      color: Colors.Red,
      image: {
        url: "https://cdn.discordapp.com/attachments/1076129590185041930/1110268190140923914/0.png",
      },
      description: "28 Mayıs 2023 seçimleri 2. tur seçim sonuçları",
      fields: [
        {
          name: "Sunucuna Ekle",
          value: "[Davet Et](https://discord.gg/Ctr27N3Ntf)",
        },
      ],
    });

    interaction.channel?.send({ components: [row], embeds: [embed] });
  },
};

export default SonucCommand;
