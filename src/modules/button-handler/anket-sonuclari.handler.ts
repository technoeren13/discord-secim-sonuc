import { Colors, EmbedBuilder, Interaction } from "discord.js";
import { DiscordEvent } from "../../types";
import axios from "axios";

const AnketSonuclari: DiscordEvent = {
  id: "anketSonuc",
  on: "interactionCreate",
  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    const customId = interaction.customId.split("-");

    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (interaction.customId === "anket-sonuc") {
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

      interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    if (customId[1] === "erdogan") {
      const getJson = await axios.get(
        "https://secim-storage-cdn.ntv.com.tr/election2023/second/president/general.json?v=20230528192420"
      );
      const adaylarListe = getJson.data.data.cdts as any[];
      const embed = new EmbedBuilder({
        title: "28 Mayıs 2023 - 2. Tur Seçim Sonuçları",
        color: Colors.Blue,
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
      return;
    }

    if (customId[1] === "kilicdaroglu") {
      const getJson = await axios.get(
        "https://secim-storage-cdn.ntv.com.tr/election2023/second/president/general.json?v=20230528192420"
      );
      const adaylarListe = getJson.data.data.cdts as any[];
      const embed = new EmbedBuilder({
        title: "28 Mayıs 2023 - 2. Tur Seçim Sonuçları",
        color: Colors.Blue,
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
      return;
    }
  },
};
export default AnketSonuclari;
