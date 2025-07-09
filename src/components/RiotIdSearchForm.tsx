function RiotIdSearchForm({ riotId, onRiotIdChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input value={riotId} placeholder="Riot ID" onChange={onRiotIdChange} />
      <button type="submit"> Submit</button>
    </form>
  );
}

export default RiotIdSearchForm;
