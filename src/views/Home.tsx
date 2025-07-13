import { useState } from "react";
import {
  usePUUIDByRiotId,
  useSummonerByPUUID,
  useSummonerStatsByPUUID,
} from "../hooks/queryHooks";
import SummonerProfile from "../components/SummonerProfile";
import RiotIdSearchForm from "../components/RiotIdSearchForm";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

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

  console.log(summonerStats);
  console.log(summonerData);

  return (
    <div className="min-w-screen mx-auto p-3 min-h-screen bg-gray-300">
      <div className="max-w-2/3 bg-gray-100 flex flex-col gap-6">
        <RiotIdSearchForm
          name={name}
          tag={tag}
          handleSubmit={handleSubmit}
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
            puuid={puuid}
          />
        )}
        {PuuidQuery.isLoading && <Loading message="Loading PUUID..." />}
        {PuuidQuery.error && <ErrorMessage error={PuuidQuery.error} />}

        {summonerIsLoading && <Loading message="Loading Summoner..." />}
        {summonerError && <p> Error:{(summonerError as Error).message}</p>}
      </div>
    </div>
  );
}

export default Home;
