import { useQuery } from "@tanstack/react-query";
import { fetchPUUIDByRiotId, fetchSummonerByPUUID } from "../api/riotApi";

export function usePUUIDByRiotId(gameName: string, tagLine: string) {
  return useQuery({
    queryKey: ["puuidByRiotId", gameName, tagLine],
    queryFn: () => fetchPUUIDByRiotId(gameName, tagLine),
    enabled: Boolean(gameName) && Boolean(tagLine),
  });
}

export function useSummonerByPUUID(puuid: string) {
  return useQuery({
    queryKey: ["summonerByPUUID", puuid],
    queryFn: () => fetchSummonerByPUUID(puuid),
    enabled: Boolean(puuid),
  });
}
