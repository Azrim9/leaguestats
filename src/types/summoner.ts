export type QueueStats = {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

export type SummonerProfileProps = {
  summonerData: {
    profileIconId: number;
    summonerLevel: number;
  };
  submittedName: string;
  submittedTag: string;
  soloQueueStats?: QueueStats;
  flexQueueStats?: QueueStats;
};
