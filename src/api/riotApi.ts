const API_KEY = "RGAPI-10f77ff0-56bb-4da8-afaf-5ce35dab9f42";

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

export async function fetchSummonerStatsByPUUID(puuid: string) {
  const res = await fetch(
    `https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/${encodeURIComponent(
      puuid
    )}`,
    {
      headers: {
        "X-Riot-Token": API_KEY,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch summoner stats");
  }
  return res.json();
}
