import { useState } from "react";
import { usePUUIDByRiotId } from "../hooks/queryHooks";

function Home() {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedTag, setSubmittedTag] = useState("");

  const { data, error, isLoading } = usePUUIDByRiotId(
    submittedName,
    submittedTag
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedName(name);
    setSubmittedTag(tag);
  };

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
          placeholder="Name"
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {isLoading && <p>Loading PUUID...</p>}
      {error && <p>Error:{(error as Error).message}</p>}
      {data && <p>PUUID: {data.puuid}</p>}

      <p>
        Submitted RiotID: {submittedName}#{submittedTag}
      </p>
    </div>
  );
}

export default Home;
