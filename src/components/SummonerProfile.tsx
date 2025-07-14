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
  puuid?: string;
};

function SummonerProfile({
  summonerData,
  submittedName,
  submittedTag,
  soloQueueStats,
  flexQueueStats,
  puuid,
}: SummonerProfileProps) {
  return (
    <div className="rounded-md shadow-md p-6 flex flex-col gap-2 items-center">
      <img
        className="rounded-full border-4 border-blue-500"
        src={`http://ddragon.leagueoflegends.com/cdn/15.13.1/img/profileicon/${summonerData.profileIconId}.png`}
        width={150}
        height={150}
      />

      <div className="text-center">
        <p className="text-xl font-semibold">
          Riot ID: {submittedName}#{submittedTag}
        </p>
        <p className="text-sm text-gray-600">
          Summoner Level: {summonerData.summonerLevel}
        </p>
      </div>

      <div className="w-full bg-gray-50 rounded-xl p-4">
        {soloQueueStats ? (
          <p>
            <span className="font-medium">Solo/Duo:</span>{" "}
            {soloQueueStats?.tier} {soloQueueStats?.rank}{" "}
            {soloQueueStats?.leaguePoints} LP
          </p>
        ) : (
          <p>
            <span className="font-medium">Solo/Duo:</span> UNRANKED
          </p>
        )}

        {flexQueueStats ? (
          <p>
            <span className="font-medium">Flex Queue: </span>{" "}
            {flexQueueStats?.tier} {flexQueueStats?.rank}{" "}
            {flexQueueStats?.leaguePoints} LP
          </p>
        ) : (
          <p>
            <span className="font-medium">Flex Queue:</span> UNRANKED
          </p>
        )}
        {puuid && <p>PUUID: {puuid}</p>}
      </div>
    </div>
  );
}

export default SummonerProfile;
