import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import axios from "axios";

const IkinciTur: SlashCommand = {
  name: "ikinci-tur",
  id: "ikinci-tur",
  category: "ikinci-tur",

  data: new SlashCommandBuilder()
    .setName("ikinci-tur")
    .setDescription("28 Mayıs İkinci Tur Seçim Sonuçarlını Gösterir."),
  func: async ({ interaction, client }) => {
    const getJson = await axios.get(
      "https://secim-storage-cdn.ntv.com.tr/election2023/second/president/general.json?v=20230528192420"
    );
    const adaylarListe = getJson.data.data.cdts as any[];
    const embed = new EmbedBuilder({
      title: "28 Mayıs 2023 - 2. Tur Seçim Sonuçları",
      color: Colors.Orange,
      image: {
        url: "https://cdn.discordapp.com/attachments/1076129590185041930/1112292682950254672/votebot.png",
      },
      description: `[Davet Et](https://discord.gg/Ctr27N3Ntf)`,
      fields: [
        ...adaylarListe.map((aday) => ({
          name: `${aday.cn} (%${aday.vp})`,
          value: `Oy Sayısı: ${aday.vc.toLocaleString()}`,
        })),
      ],
    });
    interaction.reply({ embeds: [embed] });
  },
};

export default IkinciTur;
