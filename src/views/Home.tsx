import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RiotIdSearchForm from "../components/RiotIdSearchForm";
import { fetchPUUIDByRiotId } from "../api/riotApi";

function Home() {
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

  return (
    <div className="min-w-screen mx-auto p-3 min-h-screen bg-gray-300">
      <div className="max-w-2/3 bg-gray-100 flex flex-col gap-6">
        <RiotIdSearchForm
          name={name}
          tag={tag}
          handleSubmit={handleSubmit}
          onNameChange={(e) => setName(e.target.value)}
          onTagChange={(e) => setTag(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Home;
