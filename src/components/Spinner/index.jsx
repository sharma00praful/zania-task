import "./style.css";
const Spinner = ({ className, sm }) => {
  return (
    <div className={`${className ? className : ""}`}>
      <div className={`spinner ${sm ? "spinner-sm" : "spinner-md"}`} />
    </div>
  );
};
export default Spinner;

