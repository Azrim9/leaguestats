import { useNavigate, useParams } from "react-router-dom";
import {
  useSummonerByPUUID,
  useSummonerStatsByPUUID,
} from "../hooks/queryHooks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SummonerProfile from "../components/SummonerProfile";
import { useState } from "react";
import { fetchPUUIDByRiotId } from "../api/riotApi";
import RiotIdSearchForm from "../components/RiotIdSearchForm";

export default function Profile() {
  const { puuid } = useParams<{ puuid: string }>();

  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { puuid } = await fetchPUUIDByRiotId(name, tag);
      if (puuid) {
        navigate(`/profile/${puuid}`);
      }
    } catch (err) {
      console.error("Error fetching PUUID", err);
    }
    setName("");
    setTag("");
  };

  const {
    data: summonerData,
    isLoading: summonerLoading,
    error: summonerError,
  } = useSummonerByPUUID(puuid!);

  const {
    data: summonerStats,
    isLoading: statsLoading,
    error: statsError,
  } = useSummonerStatsByPUUID(puuid!);

  const soloQueueStats = summonerStats?.find(
    (entry) => entry.queueType === "RANKED_SOLO_5x5"
  );

  const flexQueueStats = summonerStats?.find(
    (entry) => entry.queueType === "RANKED_FLEX_SR"
  );

  if (summonerLoading || statsLoading) {
    return <Loading message="Loading profile..." />;
  }

  if (summonerError || statsError) {
    return <ErrorMessage error={summonerError || statsError} />;
  }

  if (!summonerData) return <p>No summoner found.</p>;

  return (
    <div className="p-6">
      <RiotIdSearchForm
        name={name}
        tag={tag}
        handleSubmit={handleSubmit}
        onNameChange={(e) => setName(e.target.value)}
        onTagChange={(e) => setTag(e.target.value)}
      />
      <SummonerProfile
        summonerData={summonerData}
        submittedName={summonerData.name}
        submittedTag={summonerData.tagLine}
        soloQueueStats={soloQueueStats}
        flexQueueStats={flexQueueStats}
        puuid={puuid!}
      />
    </div>
  );
}
