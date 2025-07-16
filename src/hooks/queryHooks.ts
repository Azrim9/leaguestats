import { useQuery } from "@tanstack/react-query";
import {
  fetchMatchIdsByPUUID,
  fetchPUUIDByRiotId,
  fetchSummonerByPUUID,
  fetchSummonerStatsByPUUID,
} from "../api/riotApi";

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

export function useSummonerStatsByPUUID(puuid: string) {
  return useQuery({
    queryKey: ["summonerStatsByPUUID", puuid],
    queryFn: () => fetchSummonerStatsByPUUID(puuid),
    enabled: Boolean(puuid),
  });
}

export function useMatchIdsByPUUID(puuid: string, count = 10) {
  return useQuery({
    queryKey: ["matchIds", puuid, count],
    queryFn: () => fetchMatchIdsByPUUID(puuid, count),
    enabled: Boolean(puuid),
  });
}
