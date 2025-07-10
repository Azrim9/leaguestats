import { useState } from "react";
import {
  usePUUIDByRiotId,
  useSummonerByPUUID,
  useSummonerStatsByPUUID,
} from "../hooks/queryHooks";
import SummonerProfile from "../components/SummonerProfile";
import RiotIdSearchForm from "../components/RiotIdSearchForm";

function Home() {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedTag, setSubmittedTag] = useState("");

  const PuuidQuery = usePUUIDByRiotId(submittedName, submittedTag);
  const puuid = PuuidQuery.data?.puuid;

  const {
    data: summonerData,
    error: summonerError,
    isLoading: summonerIsLoading,
  } = useSummonerByPUUID(puuid);

  const {
    data: summonerStats,
    error: summonerStatsError,
    isLoading: summonerStatsIsLoading,
  } = useSummonerStatsByPUUID(puuid);

  const soloQueueStats = summonerStats?.find(
    (entry) => entry.queueType === "RANKED_SOLO_5x5"
  );

  const flexQueueStats = summonerStats?.find(
    (entry) => entry.queueType === "RANKED_FLEX_SR"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedName(name.trim());
    setSubmittedTag(tag.trim());
    setName("");
    setTag("");
  };

  return (
    <div>
      <RiotIdSearchForm
        handleSubmit={handleSubmit}
        name={name}
        tag={tag}
        onNameChange={(e) => setName(e.target.value)}
        onTagChange={(e) => setTag(e.target.value)}
      />
      {summonerData && (
        <SummonerProfile
          summonerData={summonerData}
          submittedName={submittedName}
          submittedTag={submittedTag}
          soloQueueStats={soloQueueStats}
          flexQueueStats={flexQueueStats}
        />
      )}

      {PuuidQuery.isLoading && <p>Loading PUUID...</p>}
      {PuuidQuery.error && <p>Error:{(PuuidQuery.error as Error).message}</p>}
      {PuuidQuery.data && <p>PUUID: {puuid}</p>}

      {summonerError && <p> Error:{(summonerError as Error).message}</p>}
      {summonerIsLoading && <p> Loading Summoner...</p>}
    </div>
  );
}

export default Home;
