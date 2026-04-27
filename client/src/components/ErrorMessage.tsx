type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
      {message}
    </p>
  );
}

export default ErrorMessage;
