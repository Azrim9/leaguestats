const API_KEY = "RGAPI-464999f5-eb15-4cc5-9bf9-65cc41db568b";

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
