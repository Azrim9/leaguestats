import { useParams } from "react-router-dom";
import { useMatchIdsByPUUID } from "../hooks/queryHooks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Matches() {
  const { puuid } = useParams<{ puuid: string }>();

  const { data: matchIds, isLoading, error } = useMatchIdsByPUUID(puuid!, 10);

  if (isLoading) return <Loading message="Loading matches..." />;
  if (error) return <ErrorMessage error={error} />;

  console.log(matchIds);
  console.log("Puuid from params:", puuid);

  return (
    <div>
      <h2>Recent Matches</h2>
      <ul>
        {matchIds.map((id: string) => (
          <li key={id}>Match ID: {id}</li>
        ))}
      </ul>
    </div>
  );
}
