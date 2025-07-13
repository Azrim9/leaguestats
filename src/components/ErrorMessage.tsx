function ErrorMessage({ error }) {
  const message = error instanceof Error ? error.message : "Unknown Error";

  return (
    <p className="text-red-700 bg-red-100 border border-red-300 rounded max-w-1/8">
      Error: {message}
    </p>
  );
}

export default ErrorMessage;
