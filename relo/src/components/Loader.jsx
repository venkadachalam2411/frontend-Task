import "../styles/Loader.css";
function Loader({ message = "Loading..." }) {
  return (
    <div
      className="loader-container"
      role="status"
      aria-live="polite"
    >
      <div className="loader-spinner"></div>
      <p>{message}</p>
    </div>
  );
}
export default Loader;
