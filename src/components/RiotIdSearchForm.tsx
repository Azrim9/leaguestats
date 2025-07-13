type Form = {
  name: string;
  tag: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function RiotIdSearchForm({
  handleSubmit,
  name,
  tag,
  onNameChange,
  onTagChange,
}: Form) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input value={name} placeholder="Name" onChange={onNameChange} />
      <input value={tag} placeholder="Tag" onChange={onTagChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RiotIdSearchForm;
