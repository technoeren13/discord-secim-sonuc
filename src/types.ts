import {
  Client,
  ClientEvents,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

interface GuessTheMusicGameStateInterface {
  playerList: string[];
  voiceChannelId: string;
  textChannelId: string;
  lobyMessageId: string | null;
  gameStatus: "WAITING_PLAYER" | "STARTED";
  scorePerPlayer?: any;
  songCount?: number;
  trackList?: any[];
  currentTrackIndex?: number;

  currentTrack?: any;
  foundTrackName?: null | any;
  foundTrackArtist?: null | any;
}

interface GuessTheMusicGameStatsInterface {
  totalPoints: number;
  totalCorrectAnswerCount: number;
  totalWrongAnswerCount: number;
  totalPlayingCount: number;
}

enum Emoji {
  cross = "<:techno_bot_x:829452386263236650>",
  check = "<:techno_bot_check:829452385537228851>",
  tada = "<:techno_bot_blink:829452386573090816>",
  warning = "<:techno_bot_warning:829452386392604792>",
  toggle_on = "<:toggle_on:1094175264688320552>",
  toggle_off = "<:toggle_off:1094175266496061450>",
  premiumTechnoBot = "<:techno_bot_logo_premium_emoji:803916130259042334>",
  skip = "⏩",
  erdogan = "<:erdogan:1110262147725918258>",
  kilicdaroglu = "<:kilicdaroglu:1110262142847963287>",
}

interface SlashCommandExecution {
  interaction: CommandInteraction;
  client?: Client;
}
export interface DiscordEvent {
  id: string;
  on: keyof ClientEvents;
  once?: boolean;
  execute: (...arguments_: any[]) => Promise<void> | void;
}

interface SlashCommand {
  name: string;
  id: string;
  category: string;
  data: SlashCommandBuilder;
  func: ({ client, interaction }: SlashCommandExecution) => Promise<void>;
}

export {
  GuessTheMusicGameStateInterface,
  GuessTheMusicGameStatsInterface,
  Emoji,
  SlashCommand,
};
