import "./style.css";
const Spinner = ({ className, sm, testid = "spinner" }) => {
  return (
    <div className={`${className ? className : ""}`} data-testid={testid}>
      <div
        data-testid="spinner-body"
        className={`spinner ${sm ? "spinner-sm" : "spinner-md"}`}
      />
    </div>
  );
};
export default Spinner;

