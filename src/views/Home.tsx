import { useState, type FormEventHandler, type SyntheticEvent } from "react";
import {
  usePUUIDByRiotId,
  useSummonerByPUUID,
  useSummonerStatsByPUUID,
} from "../hooks/queryHooks";
import SummonerProfile from "../components/SummonerProfile";
import RiotIdSearchForm from "../components/RiotIdSearchForm";

function Home() {
  const [riotId, setRiotId] = useState("");
  const [name, tag] = riotId.split("#");
  const [puuidForm, setPuuidForm] = useState({
    name: "",
    tag: "",
  });

  const onRiotIdChange = (e) => {
    setRiotId(e.target.value);
  };

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    //take the shit from riotId -> (name, tag) -> puuidform
    e.preventDefault();
    console.log(e);
    setPuuidForm({ name: name, tag: tag });
  };

  const PuuidQuery = usePUUIDByRiotId(puuidForm.name, puuidForm.tag);
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

  return (
    <div>
      <RiotIdSearchForm
        riotId={riotId}
        onRiotIdChange={onRiotIdChange}
        onSubmit={onSubmit}
      />

      {summonerData && (
        <SummonerProfile
          summonerData={summonerData}
          submittedName={name}
          submittedTag={tag}
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
