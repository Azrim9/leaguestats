const API_KEY = "RGAPI-936b6b45-bf80-4af1-b226-66d6a3282e8b";

export async function fetchPUUIDByRiotId(gameName: string, tagLine: string) {
  const res = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch PUUID");
  }

  return res.json();
}

export async function fetchSummonerByPUUID(puuid: string) {
  const res = await fetch(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(
      puuid
    )}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch summoner data");
  }

  return res.json();
}
