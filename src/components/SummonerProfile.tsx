type QueueStats = {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

type SummonerProfileProps = {
  summonerData: {
    profileIconId: number;
    summonerLevel: number;
  };
  submittedName: string;
  submittedTag: string;
  soloQueueStats?: QueueStats;
  flexQueueStats?: QueueStats;
};

function SummonerProfile({
  summonerData,
  submittedName,
  submittedTag,
  soloQueueStats,
  flexQueueStats,
}: SummonerProfileProps) {
  return (
    <div>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/15.13.1/img/profileicon/${summonerData.profileIconId}.png`}
        width={150}
        height={150}
      />
      <p>
        Riot ID: {submittedName}#{submittedTag}
      </p>
      <p>Summoner Level: {summonerData.summonerLevel}</p>

      {soloQueueStats ? (
        <p>
          Solo/Duo: {soloQueueStats?.tier} {soloQueueStats?.rank}{" "}
          {soloQueueStats?.leaguePoints} LP
        </p>
      ) : (
        "Solo/Duo: UNRANKED"
      )}

      {flexQueueStats ? (
        <p>
          Flex Queue: {flexQueueStats?.tier} {flexQueueStats?.rank}{" "}
          {flexQueueStats?.leaguePoints} LP
        </p>
      ) : (
        "Flex Queue: UNRANKED"
      )}
    </div>
  );
}

export default SummonerProfile;
