import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { puuid } = await fetchPUUIDByRiotId(name, tag);
      if (puuid) {
        navigate(`/profile/${puuid}`);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching PUUID", err);
      setError("Could not find the name");
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
      {error && <ErrorMessage error={error} />}
      <RiotIdSearchForm
        name={name}
        tag={tag}
        handleSubmit={handleSubmit}
        onNameChange={(e) => {
          setName(e.target.value);
          setError(null);
        }}
        onTagChange={(e) => {
          setTag(e.target.value);
          setError(null);
        }}
      />
      <SummonerProfile
        summonerData={summonerData}
        submittedName={summonerData.name}
        submittedTag={summonerData.tagLine}
        soloQueueStats={soloQueueStats}
        flexQueueStats={flexQueueStats}
        puuid={puuid!}
      />

      <Link to={`/matches/${puuid}`}>Match History</Link>
    </div>
  );
}
