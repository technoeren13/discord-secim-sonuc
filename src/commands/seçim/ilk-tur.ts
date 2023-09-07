import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import axios from "axios";

const IlkTur: SlashCommand = {
  name: "ilk-tur",
  id: "ilk-tur",
  category: "ilk-tur",

  data: new SlashCommandBuilder()
    .setName("ilk-tur")
    .setDescription("14 Mayıs İlk Tue Seçim Sonuçarlını Gösterir."),
  func: async ({ interaction, client }) => {
    const getJson = await axios.get(
      "https://secim-storage-cdn.ntv.com.tr/election2023/president/general.json?v=20230522200250"
    );

    const adaylarListe = getJson.data.data.cdts as any[];

    const embed = new EmbedBuilder({
      title: "14 Mayıs 2023 - 1. Tur Seçim Sonuçları",
      color: Colors.Blue,
      image: {
        url: "https://media.discordapp.net/attachments/1076129590185041930/1110277261384503296/3582528_baed4d7904734598ffc91cfc264cb42c.png",
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

export default IlkTur;
