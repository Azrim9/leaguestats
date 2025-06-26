import { useState } from "react";
import { usePUUIDByRiotId, useSummonerByPUUID } from "../hooks/queryHooks";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedName(name.trim());
    setSubmittedTag(tag.trim());
    setName("");
    setTag("");
  };

  console.log(summonerData);
  console.log(summonerError);
  console.log(summonerIsLoading);
  console.log(summonerData.summonerLevel);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={tag}
          placeholder="Tag"
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {PuuidQuery.isLoading && <p>Loading PUUID...</p>}
      {PuuidQuery.error && <p>Error:{(PuuidQuery.error as Error).message}</p>}
      {PuuidQuery.data && <p>PUUID: {puuid}</p>}

      {summonerData && (
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
        </div>
      )}
      {summonerError && <p> Error:{(summonerError as Error).message}</p>}
      {summonerIsLoading && <p> Loading Summoner...</p>}
    </div>
  );
}

export default Home;
