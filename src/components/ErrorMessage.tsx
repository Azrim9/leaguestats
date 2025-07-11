function ErrorMessage({ error }) {
  const message = error instanceof Error ? error.message : "Unknown Error";

  return <p>Error: {message}</p>;
}

export default ErrorMessage;
