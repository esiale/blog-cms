const ErrorMessage = (props) => {
  const { error } = props;
  return <div className="text-red-700">{error}</div>;
};

export default ErrorMessage;
